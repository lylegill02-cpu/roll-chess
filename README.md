# ROLL CHESS

**Train decisions that matter on the mat *and* the board.**

ROLL CHESS is a hybrid training and competition system that combines Brazilian Jiu-Jitsu rounds with chess. Physical performance sets the clock you take to the board — one mat score, one scaled adjustment.

## Live Site

| Page | GitHub Pages | Inkwell |
|------|--------------|---------|
| **Landing** | [lylegill02-cpu.github.io/roll-chess](https://lylegill02-cpu.github.io/roll-chess) | [inkwell.wiki/roll-chess](https://inkwell.wiki/roll-chess) |
| **Trainer v0.6** | […/trainer.html](https://lylegill02-cpu.github.io/roll-chess/trainer.html) | [inkwell.wiki/roll-chess-trainer](https://inkwell.wiki/roll-chess-trainer) |
| **Rules v1.2** | […/rules.html](https://lylegill02-cpu.github.io/roll-chess/rules.html) | [inkwell.wiki/roll-chess-rules](https://inkwell.wiki/roll-chess-rules) |

Related: [Kick Chess](https://lylegill02-cpu.github.io/kick-chess/) (kickboxing variation) · `/chess` on inkwell reserved for Hippo Trainer

## What is it?

- **Mat** = Physical round performance → one Round Mat Score (RMS, −25 to +20)
- **Board** = Tactical decisions under a clock scaled by that RMS at your tier

## Features (v0.6 + rules v1.2)

- 12 realistic BJJ scenarios (guard, mount, back, clinch, scrambles)
- **12-second mat-round timer** with live **tap-out penalty curve** (instant tap = max −25; hold longer = cheaper exit)
- **v1.2 clock engine** — RMS converts continuously to board time (% of base, tier caps, 60% floor)
- Tiered Recovery Mode (Light / Medium / Heavy)
- Live Mat → Board spectrum (display + tiebreak; clock owned by RMS)
- Session summary with mat quality, board accuracy, tap count

## How to Use

1. Open the [trainer](https://lylegill02-cpu.github.io/roll-chess/trainer.html)
2. **Training Mode** — practice scenarios with fixed board time, no clock consequences
3. **Recovery Mode** — pick a tier; mat RMS scales your board seconds with live readout
4. Work the timed mat round: pick a line, tap out (penalty eases over 12s), or ride to timeout
5. Review the session summary before class or competition

## Competition Rules

Full rules: [rules.html](./rules.html) · [rules.md](./rules.md)

Key v1.2 change: spectrum no longer sets the clock. One mat score → one scaled adjustment. No double penalties.

## Deploy

**GitHub Pages** — push to `main`; Pages serves from repo root.

**Inkwell** (from this folder):

```powershell
node deploy-inkwell.cjs
```

Pull live inkwell edits back into local files:

```powershell
node sync-from-inkwell.cjs
```

Requires `../shapedqr/deploy-auth.js` and `SUPABASE_SERVICE_ROLE_KEY` in `dirt-pod-cron.env`.

## Repo Structure

```
index.html           → Landing page
trainer.html         → Mat → Board Trainer v0.6
rules.html           → Hybrid Competition Rules v1.2 (canonical)
rules.md             → Same rules in markdown
deploy-inkwell.cjs   → Deploy to inkwell.wiki
sync-from-inkwell.cjs → Pull inkwell HTML → local (GitHub link paths)
patch-inkwell-nav.cjs → Add Roll/Kick Chess to inkwell home nav
chess-placeholder.html → Reserved /chess slug for Hippo Trainer
```

## Philosophy

Most training separates physical skill from mental pressure.  
ROLL CHESS trains the connection between them.

## License

Open source. Use, adapt, and run events — credit ROLL CHESS.
