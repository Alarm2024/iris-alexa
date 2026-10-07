# Iris Desk Voice — Colosseum Solana World’s Fair

**Track:** Solana / Crypto World’s Fair  
**Product:** Iris Desk Voice — read-only Solana safety triage (link check, tx explain, scam patterns, cleanup steps)  
**Owner plan:** Submit **Sat Oct 11 UTC** (hard before **Mon Oct 13 ~06:59 UTC**)  
**Public person:** Wyndham Heaven · **Company:** elghaly · **Site:** https://elghaly.dev  

## Repos

| Piece | Repo | Notes |
|-------|------|--------|
| Voice / MCP /sim | https://github.com/elghaly-dev/iris-alexa | Main Colosseum entry surface |
| Android APK | https://github.com/Alarm2024/iris-mobile | APK **v0.1.0** released ([release page](https://github.com/Alarm2024/iris-mobile/releases/tag/v0.1.0)); CI demo recording on the [demo-video release](https://github.com/Alarm2024/iris-mobile/releases/tag/demo-video) |
| Web triage page | https://iris-35.elghaly.dev | Read-only; public RPC; no wallet connect / no keys |

## What judges should open

1. **Repo:** https://github.com/elghaly-dev/iris-alexa  
2. **Sim (voice/text stand-in for MCP host):** run locally → open `/sim` (hold-to-talk Web Speech when available; text box always works)  
3. **APK:** iris-mobile release **v0.1.0**  
4. **Web page:** https://iris-35.elghaly.dev  

## Honest scope

- `/sim` is a **stand-in** for an MCP host. It does **not** claim to run on a real Alexa+ device.  
- No Amazon / Alexa logos or sounds.  
- Seed phrases are refused by the server; tooling is read-only / safety-oriented.  
- Label findings: AI-assisted analysis of public pages where applicable.  

## Media (upload to Colosseum + YouTube Unlisted)

- `iris-demo.mp4` — product demo  
- `iris-pitch.mp4` — ~2.5 min pitch  
- Scripts: `demo-script.md`, `pitch-script.md`  

Push copies under `docs/media/` when uploading to GitHub so the submission links stay stable.

## Checklist before submit (Sat Oct 11 UTC)

- [x] iris-mobile demo-video PR merged (#4, 2026-10-07 UTC)  
- [x] iris-alexa voice-router (#6) merged (2026-10-07 UTC)  
- [x] Demo + pitch videos Unlisted on YouTube (links below)  
- [ ] Same two URLs pasted into the Colosseum form  
- [ ] Team / contact / Demo Day row filled if required  
- [ ] Public times in **UTC only** on any post or event text  

## Related docs in-repo

- `docs/DEVPOST.md` — Alexa+ / Devpost narrative  
- `docs/FRICTION_LOG.md` — build friction notes  

## YouTube (Unlisted)

- Demo: https://youtu.be/fj_CTDCyNsc
- Pitch: https://youtu.be/8mVTWrI32zQ