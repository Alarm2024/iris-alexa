# Iris Desk Voice — Colosseum Solana World’s Fair

**Track:** Solana / Crypto World’s Fair  
**Product:** Iris Desk Voice — read-only Solana safety triage (link check, tx explain, scam patterns, cleanup steps)  
**Owner plan:** Submit **Sat Oct 11 UTC** (hard before **Mon Oct 13 ~06:59 UTC**)  
**Public person:** Wyndham Heaven · **Company:** elghaly · **Site:** https://elghaly.dev  

## Repos

| Piece | Repo | Notes |
|-------|------|--------|
| **Main entry: Iris (iris-35)** | https://iris-35.elghaly.dev · repo https://github.com/elghaly-dev/iris-35 | Free, phone-first, read-only safety triage; public RPC; never connects a wallet, never asks for keys or seed phrases. Iris page (iPhone + Android checklists), chain read (Solana / Bitcoin / Ethereum, seed phrases refused), Ask IRIS with offline answers in six languages, Solana decoder (54 tests on 6 mainnet fixtures), voice desk on AssemblyAI |
| Voice / MCP / /sim surface | https://github.com/elghaly-dev/iris-alexa | Voice / MCP / `/sim` surface |

**Also built:** iris-mobile — Android voice app, APK **v0.1.0** · https://github.com/Alarm2024/iris-mobile

## What judges should open

1. **Main entry (iris-35):** https://iris-35.elghaly.dev  
2. **Repo:** https://github.com/elghaly-dev/iris-alexa  
3. **Sim (voice/text stand-in for MCP host):** run locally → open `/sim` (hold-to-talk Web Speech when available; text box always works)  
4. **APK:** iris-mobile release **v0.1.0**  

## Honest scope

- `/sim` is a **stand-in** for an MCP host. It does **not** claim to run on a real Alexa+ device.  
- No Amazon / Alexa logos or sounds.  
- Seed phrases are refused by the server; tooling is read-only / safety-oriented.  
- Label findings: AI-assisted analysis of public pages where applicable.  

## Media (upload to Colosseum + YouTube Unlisted)

Local build folder (on Bot box): `/workspace/colosseum-iris/`

- `iris-demo.mp4` — product demo  
- `iris-pitch.mp4` — ~2.5 min pitch  
- Scripts: `demo-script.md`, `pitch-script.md`  

Push copies under `docs/media/` when uploading to GitHub so the submission links stay stable.

## Checklist before submit (Sat Oct 11 UTC)

- [ ] iris-mobile demo-video PR merged (#4 done 2026-10-07)  
- [ ] iris-alexa voice-router (#6) reviewed / merged or linked as draft with green tests  
- [ ] Demo + pitch videos Unlisted on YouTube; URLs pasted into Colosseum  
- [ ] Team / contact / Demo Day row filled if required  
- [ ] Public times in **UTC only** on any post or event text  

## Related docs in-repo

- `docs/DEVPOST.md` — Alexa+ / Devpost narrative  
- `docs/FRICTION_LOG.md` — build friction notes  

## YouTube (Unlisted)

- Demo: https://youtu.be/fj_CTDCyNsc
- Pitch: https://youtu.be/8mVTWrI32zQ