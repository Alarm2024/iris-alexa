// Utterance -> one MCP tool call. Deterministic rules, no network and no model:
// the same words map to the same call every time. A seed phrase is not stopped
// here. The server refuses it.

const BASE58 = "[1-9A-HJ-NP-Za-km-z]";
const SIGNATURE = new RegExp(`(?<![1-9A-HJ-NP-Za-km-z])${BASE58}{87,88}(?![1-9A-HJ-NP-Za-km-z])`);

// Same shape as the host finder in src/links.ts: scheme, www, or a dotted host.
const URL_IN_TEXT =
  /(?:https?:\/\/|www\.)[^\s<>"'()]+|\b(?:[a-z0-9-]+\.)+(?:[a-z]{2,24}|xn--[a-z0-9-]+)(?:\/[^\s<>"'()]*)?/i;

// Spoken "phantom dot com". The right-hand label has to be a real suffix,
// so "clean up dot wallet" does not become a domain.
const SPOKEN_TLDS = new Set([
  "com",
  "org",
  "net",
  "io",
  "app",
  "ag",
  "so",
  "dev",
  "xyz",
  "cc",
  "ly",
  "me",
  "co",
  "ai",
  "gg",
  "link",
  "info",
  "site",
  "pw",
  "to",
  "is",
  "top",
  "pro",
  "us",
  "fun",
  "network",
  "finance",
  "trade",
]);

/**
 * @typedef {"check_link" | "explain_transaction" | "safety_tip" | "clean_up_steps" | "check_scam"} ToolName
 * @typedef {{ name: ToolName, arguments: Record<string, string> }} ToolCall
 */

function trimTrail(value) {
  return value.replace(/[.,;:!?)]+$/g, "");
}

function spokenHost(text) {
  if (!/\sdot\s/i.test(text)) return null;
  const spoken = text.replace(/\s+dot\s+/gi, ".");
  const match = spoken.match(URL_IN_TEXT);
  if (!match) return null;
  const candidate = trimTrail(match[0]);
  const host = candidate.replace(/^https?:\/\//i, "").replace(/^www\./i, "").split("/")[0];
  const tld = host.split(".").pop();
  if (!tld || !SPOKEN_TLDS.has(tld.toLowerCase())) return null;
  return candidate;
}

/** First URL or domain in the utterance, or null. */
function findUrl(text) {
  const literal = text.match(URL_IN_TEXT);
  if (literal) return trimTrail(literal[0]);
  return spokenHost(text);
}

/** An 87- or 88-character base58 token, the length of a Solana transaction signature. */
function findSignature(text) {
  const match = text.match(SIGNATURE);
  return match ? match[0] : null;
}

function isTip(text) {
  return /\btips?\b/i.test(text) || /\bremind me\b/i.test(text);
}

/** Topic id the safety_tip tool accepts. Missing topic stays general. */
function tipTopic(text) {
  const lower = text.toLowerCase();
  if (/\bseed[\s_-]?phrases?\b/.test(lower)) return "seed_phrase";
  if (/\bqr[\s_-]?codes?\b/.test(lower)) return "qr_codes";
  if (/\bapprovals?\b/.test(lower)) return "approvals";
  if (/\blinks?\b/.test(lower)) return "links";
  if (/\bsupport\b/.test(lower)) return "support";
  return "general";
}

/** iphone, android, or wallet when the utterance is a clean-up request. Otherwise null. */
function cleanupTarget(text) {
  const lower = text.toLowerCase();
  if (!/\bclean[\s-]?up\b/.test(lower) && !/\bi got hacked\b/.test(lower)) return null;
  const found = [
    ["iphone", lower.search(/\bi[\s-]?phones?\b/)],
    ["android", lower.search(/\bandroids?\b/)],
    ["wallet", lower.search(/\bwallets?\b/)],
  ].filter((entry) => entry[1] >= 0);
  if (found.length === 0) return null;
  found.sort((a, b) => a[1] - b[1]);
  return found[0][0];
}

/**
 * Map one utterance to one tools/call. Order is fixed:
 * URL or domain, then an 87/88-char signature, then a tip, then clean-up, else check_scam.
 * @param {string} utterance
 * @returns {ToolCall}
 */
export function route(utterance) {
  const text = String(utterance ?? "").trim();
  const url = findUrl(text);
  if (url) return { name: "check_link", arguments: { url } };
  const signature = findSignature(text);
  if (signature) return { name: "explain_transaction", arguments: { signature } };
  if (isTip(text)) return { name: "safety_tip", arguments: { topic: tipTopic(text) } };
  const target = cleanupTarget(text);
  if (target) return { name: "clean_up_steps", arguments: { target } };
  return { name: "check_scam", arguments: { situation: text } };
}
