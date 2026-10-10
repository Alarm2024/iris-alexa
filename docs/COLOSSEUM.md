# Iris Desk Voice — Colosseum Solana World’s Fair

**Track:** Solana / Crypto World’s Fair  
**Primary submission:** **Iris Desk Voice** — Android wallet app (phone-first; defaults to **devnet**; **never handles private keys**)  
**Optional companion:** [iris-alexa](https://github.com/elghaly-dev/iris-alexa) — read-only Solana safety triage (link check, transaction explain, scam patterns, cleanup steps). **No wallet.**  
**Public person:** Wyndham Heaven · **Company:** elghaly · **Site:** https://elghaly.dev  

## Repos

| Piece | Repo | Notes |
|-------|------|--------|
| **Android wallet (main entry)** | https://github.com/Alarm2024/iris-mobile | **Iris Desk Voice** — APK **[v0.1.0](https://github.com/Alarm2024/iris-mobile/releases/tag/v0.1.0)**; defaults to devnet; never handles private keys |
| Voice / MCP / `/sim` (optional) | https://github.com/elghaly-dev/iris-alexa | Companion only: read-only safety triage; no wallet connect, no keys |
| Web triage page | https://iris-35.elghaly.dev | Read-only; public RPC; no wallet connect / no keys |

## What judges should open

1. **Wallet repo:** https://github.com/Alarm2024/iris-mobile  
2. **APK:** iris-mobile release **v0.1.0** (devnet by default)  
3. **Optional companion repo:** https://github.com/elghaly-dev/iris-alexa — run locally → `/sim` (hold-to-talk Web Speech when available; text box always works)  
4. **Live triage page:** https://iris-35.elghaly.dev  

## Honest scope

**Iris Desk Voice (wallet app)**  
- Primary Colosseum product: Android wallet experience on devnet.  
- Never handles private keys (no extraction, logging, or server-side custody).  

**iris-alexa (optional companion)**  
- Read-only MCP + `/sim` stand-in for an MCP host. Does **not** claim to run on a real Alexa+ device.  
- No Amazon / Alexa logos or sounds.  
- Seed phrases are refused by the server; tooling is read-only / safety-oriented.  
- Label findings: AI-assisted analysis of public pages where applicable.  

## Media (Colosseum + YouTube Unlisted)

Copies under `docs/media/` (`iris-demo.mp4`, `iris-pitch.mp4`; scripts in `demo-script.md`, `pitch-script.md`).

## YouTube (Unlisted)

- Demo: https://youtu.be/fj_CTDCyNsc  
- Pitch: https://youtu.be/8mVTWrI32zQ  

## Checklist before submit (deadline Tue Oct 13, 06:59 UTC)

- [ ] iris-mobile **v0.1.0** APK linked in Colosseum  
- [ ] Demo + pitch videos Unlisted on YouTube; URLs pasted into Colosseum  
- [ ] Optional: iris-alexa linked as companion (not primary repo)  
- [ ] Public times in **UTC only** on any post or event text  

## Related docs in-repo

- `docs/DEVPOST.md` — Alexa+ / Devpost narrative for iris-alexa  
- `docs/FRICTION_LOG.md` — build friction notes  
