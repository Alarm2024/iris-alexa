# Iris for Alexa+ — "Build, Ship, Shape" mini-challenge (draft)

Deadline: Fri Oct 23, 19:00 UTC. This is a draft for the owner. Nothing here has been submitted.

Lines marked **[after merge]** describe work planned for Oct 11–21. Keep such a line once its pull request is merged, and put in the merge date.

---

## Devpost text

### Project name
Iris for Alexa+

### Tagline
Ask Alexa+ whether a crypto message, link or Solana transaction is a scam. Iris answers in one spoken sentence, is read-only, and never touches a wallet.

### What it is
Iris is a self-hosted, read-only MCP server (spec 2025-11-25, Streamable HTTP) with five tools an Alexa+ host can call:

- **check_scam** — reads a message or a description of what happened and matches it against nine fixed scam patterns (seed-phrase request, fake support, fake airdrop, doubling giveaway, unlimited approval, authority change, urgent "verify wallet" link, "validate or be deactivated", QR code to scan with the wallet).
- **check_link** — gives a verdict on a URL or domain without opening it: official, lookalike, punycode, lure words, a reported host, or a short link it cannot see through.
- **explain_transaction** — decodes one public Solana signature into programs, findings and balance changes, with one call to a public RPC.
- **safety_tip** — one short reminder, short enough to say in one breath.
- **clean_up_steps** — a checklist the person follows themselves on an iPhone, an Android phone or a wallet.

Every result carries a one-sentence `summary` written to be read aloud. A pasted seed phrase is refused before any rule reads it. Price questions and requests to connect, sign or approve are refused in one fixed shape. A clean result says "This is not a clearance."

### The simulated Alexa+ experience
We had no Alexa+ device or host to test on, so the repo includes a **simulated** Alexa+ page at `/sim`. Its title and first line say "Simulated Alexa+ page — not a real Alexa device". Hold to talk uses the browser's Web Speech API; a fixed, model-free router picks one tool; the page sends the same JSON-RPC `tools/call` a host would send to `/mcp`, shows the result and speaks the `summary`. No Amazon or Alexa logos or sounds.

### What changed between Aug 31 and Oct 23
The repository's first commit is Sep 12, so all of it was built in the window.

| Date (UTC) | Change |
| --- | --- |
| Sep 12 | Repository created. |
| Sep 30 | Read-only Iris MCP server with the five tools; hardened `/mcp` (Host and Origin checks, 405, 406, 400, 415, 413, 202, fixed error text); simulated page at `/sim`; spoken `summary` on every result; offline transaction fixtures; link-check hardening; test corpus of real, synthetic and normal messages. |
| Oct 1–2 | `/sim` reads event-stream answers; `safety_tip` topics from a fixed list of six; a tool error shows as an error; Devpost text and friction log. |
| Oct 7 | Voice on `/sim`: hold to talk, deterministic utterance router, one tool call per utterance. |
| Oct 10 | Spec fixes: a JSON-RPC batch from a 2025-06-18-or-later client gets 400 (batches were removed in 2025-06-18); the server binds to loopback unless `HOST` says otherwise. |
| Oct 11–21 **[after merge]** | Structured results, spoken follow-ups on `/sim`, and a spec conformance check (see below). |

### New in this round **[after merge]**
1. **Structured results.** Each tool declares an `outputSchema` and returns `structuredContent` (verdict, spoken line, card fields) next to the text, so a host can speak one line and show a card. `/sim` shows the two side by side.
2. **Spoken follow-ups on `/sim`.** After an answer, "what now?" gives the clean-up steps that match it, "say that again" repeats the spoken line, and "stop" ends. Same fixed router, no model.
3. **Conformance check.** `npm run conformance` runs the 2025-11-25 Streamable HTTP checklist against a running server and prints a pass/fail table; a free GitHub Actions job runs it on every pull request.

### How it follows MCP 2025-11-25 (Streamable HTTP)
| Request | Answer |
| --- | --- |
| `initialize` with `protocolVersion` 2025-11-25 | 200, negotiated 2025-11-25 |
| `notifications/initialized` | 202, no body |
| `GET` or `DELETE /mcp` (no server stream, no sessions) | 405, `Allow: POST` |
| `Origin` not on the allow list | 403 |
| Unknown `MCP-Protocol-Version` | 400 (absent is accepted, per spec) |
| `Accept` without both `application/json` and `text/event-stream` | 406 |
| JSON-RPC batch from a 2025-06-18+ client | 400 |
| Non-JSON body / over 64 KB | 415 / 413 |

Tool inputs use JSON Schema 2020-12, and every tool is annotated `readOnlyHint: true`, `destructiveHint: false`.

### Built with
TypeScript, Node.js 22, the official MCP TypeScript SDK (`@modelcontextprotocol/server`, `@modelcontextprotocol/node`), Zod, tsx, Solana JSON-RPC (public endpoint), the browser Web Speech API. No paid services.

### Try it
```bash
git clone https://github.com/elghaly-dev/iris-alexa.git
cd iris-alexa && npm install && npm start
# MCP endpoint:       http://127.0.0.1:3000/mcp
# Simulated Alexa+:   http://127.0.0.1:3000/sim
npm test        # 262 tests
```

### Note for judges
This entry is a working MCP server plus a **simulated** Alexa+ web page. It was tested with MCP Inspector and the simulated page, not on a real Alexa+ device. Iris gives no financial, legal or medical advice, stores no personal data, takes no payments, and has no code path that can sign, send, connect or approve.

---

## Demo video script (about 2:45, under 3:00)

Narration can be the owner's voice or a text-to-speech voice. If it is synthetic, the first slide says "AI voice". No face, name, address, phone or country on screen.

| Time | On screen | Narration |
| --- | --- | --- |
| 0:00–0:10 | Title slide: "Iris for Alexa+ · MCP server + simulated Alexa+ page" | "This is Iris for Alexa+: a read-only MCP server, and a simulated Alexa+ page to try it by voice. It is not a real Alexa device." |
| 0:10–0:25 | One slide: a fake "support" DM asking for 24 words | "A message says it's wallet support and asks for your seed phrase. Away from a screen, the natural move is to ask out loud: is this real?" |
| 0:25–0:50 | Terminal: `npm start`, then `curl /health` showing `mcp_spec: 2025-11-25`; MCP Inspector CLI listing five tools with `readOnlyHint: true` | "Iris is a Streamable HTTP MCP server on spec 2025-11-25. Five tools, all read-only." |
| 0:50–1:30 | `/sim` with the "Simulated Alexa+ page" banner in view. Hold to talk: "Someone from Phantom support asked for my seed phrase." Result card + spoken line. Then: "Is phantom-app dot support safe?" → lookalike. | "On the simulated page I hold to talk. A fixed router picks one tool, the page sends the same call a host would, and Iris answers in one sentence." |
| 1:30–1:45 | Paste a 12-word test phrase into the text box → fixed refusal | "A pasted seed phrase is refused before any rule reads it. It is never sent, stored or logged." |
| 1:45–2:10 | Timeline slide, the table "What changed between Aug 31 and Oct 23" | "Everything here was built after August 31. The repo starts on September 12; the server and five tools came on September 30; voice on the page on October 7; spec fixes on October 10." |
| 2:10–2:35 | **[after merge]** `npm run conformance` printing a pass table; `/sim` showing card and spoken line side by side; say "what now?" → clean-up steps | "New this round: structured results a host can show as a card, spoken follow-ups like 'what now?', and a conformance check for the Streamable HTTP rules." |
| 2:35–2:45 | Closing slide: repo URL, "read-only · no keys · simulated page, not a real Alexa device" | "Iris is open source under MIT, self-hosted, and costs nothing to run. Thanks for watching." |

Before recording: run `npm test` and `npm run conformance` on the same commit you link in Devpost, and keep the "Simulated Alexa+ page" banner visible in every `/sim` shot.
