import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { TIP_TOPICS } from "../src/tips.js";

const PAGE = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "../sim/alexa-page.html"), "utf8");

interface Rendered {
  error: boolean;
  text: string;
}

/** The page's pure render block, run on its own: no DOM, no network. */
function renderBlock(): { renderReply: (reply: unknown) => Rendered } {
  const match = PAGE.match(/<script id="sim-render">([\s\S]*?)<\/script>/);
  assert.ok(match, "the page must keep its render logic in <script id=\"sim-render\">");
  return new Function(`${match[1]}\nreturn { renderReply };`)();
}

/** A tools/call reply as the server sends it: one JSON text block. */
function toolReply(payload: unknown, isError = false): unknown {
  return {
    jsonrpc: "2.0",
    id: 1,
    result: { content: [{ type: "text", text: JSON.stringify(payload) }], isError },
  };
}

describe("/sim page", () => {
  const { renderReply } = renderBlock();

  it("shows a tool error as an error, never as a verdict", () => {
    // Tester, PR #3 at 65a6b18: "seed phrase" came back isError and the page
    // printed "No known pattern. undefined".
    const rendered = renderReply(
      toolReply({ refused: false, message: `topic must be one of: ${TIP_TOPICS.join(", ")}.` }, true),
    );
    assert.equal(rendered.error, true);
    assert.match(rendered.text, /^Error: topic must be one of: general, seed_phrase/);
    assert.doesNotMatch(rendered.text, /No known pattern/);
    assert.doesNotMatch(rendered.text, /undefined/);
  });

  it("shows a refusal summary, not the raw JSON", () => {
    const rendered = renderReply(
      toolReply(
        {
          refused: true,
          reason: "seed_phrase",
          warning: "long warning",
          summary: "Refused: that looks like a seed phrase, and this server will not handle it.",
        },
        true,
      ),
    );
    assert.equal(rendered.error, true);
    assert.equal(rendered.text, "Error: Refused: that looks like a seed phrase, and this server will not handle it.");
    assert.doesNotMatch(rendered.text, /\{/);
  });

  it("shows a JSON-RPC error as an error", () => {
    const rendered = renderReply({ jsonrpc: "2.0", id: 1, error: { code: -32602, message: "Invalid params" } });
    assert.deepEqual(rendered, { error: true, text: "Error: Invalid params" });
  });

  it("speaks a tip's summary", () => {
    const rendered = renderReply(toolReply({ refused: false, topic: "links", tip: "t", summary: "Type the address yourself." }));
    assert.deepEqual(rendered, { error: false, text: "Type the address yourself." });
  });

  it("never prints undefined for a verdict without a reason", () => {
    const rendered = renderReply(toolReply({ verdict: "no_known_pattern" }));
    assert.equal(rendered.error, false);
    assert.equal(rendered.text, "No known pattern.");
  });

  it("offers exactly the six safety_tip topics, and sends the chosen one", () => {
    const options = [...PAGE.matchAll(/<option value="([a-z_]+)">/g)].map((m) => m[1]);
    assert.deepEqual(options, [...TIP_TOPICS]);
    assert.match(PAGE, /if \(tool === "safety_tip"\) args\.topic = topicSelect\.value;/);
  });

  it("holds to talk with the Web Speech API and routes the words", () => {
    assert.match(PAGE, /window\.SpeechRecognition \|\| window\.webkitSpeechRecognition/);
    assert.match(PAGE, /rec\.lang = "en-US"/);
    assert.match(PAGE, /import \{ route \} from "\/sim\/route\.js"/);
    assert.match(PAGE, /id="mic" hidden/);
    assert.match(PAGE, /mic\.hidden = true/);
    assert.match(PAGE, /const call = route\(text\)/);
    assert.match(PAGE, /callTool\(call\.name, call\.arguments, true\)/);
    assert.match(PAGE, /speechSynthesis\.speak\(new SpeechSynthesisUtterance/);
  });
});
