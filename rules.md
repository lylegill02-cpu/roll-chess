# ROLL CHESS Hybrid Competition Rules v1.2

**Effective:** June 2026  
**Format:** Alternating mat rounds and chess games with a single, scaled clock link. Supersedes v1.1.

---

## 1. Overview

ROLL CHESS is a hybrid competition where **mat performance sets the clock you take to the board**. Competitors alternate between a **Mat Phase** (timed BJJ sparring or positional rounds) and a **Board Phase** (standard chess, rapid or blitz per tier). One mat score drives one clock adjustment — no second penalty system.

---

## 2. Equipment

- Standard chess set and clock (digital required for sub-second scaling)
- BJJ gi or no-gi per event rules
- Mat area and board area separated but visible to both competitors
- ROLL CHESS clock card or trainer app to compute the adjustment

---

## 3. Match Structure

### 3.1 Default Format (Standard Hybrid)

| Segment | Duration | Notes |
|---------|----------|-------|
| Mat Round 1 | 5 min | Neutral positional start |
| Board Game 1 | 10+5 base | Clock adjusted by Mat 1 |
| Mat Round 2 | 5 min | Neutral positional start |
| Board Game 2 | 10+5 base | Clock adjusted by Mat 2 |

### 3.2 Sprint Format

One 4-minute mat round → one 5+3 blitz game. Used for brackets and open mat nights.

---

## 4. The Clock Engine

### 4.1 One mat score (RMS)

Each mat round produces a single **Round Mat Score** from −25 to +20. This is the only mat output.

| Round outcome | RMS |
|---------------|-----|
| Dominant control / clean submission attempt | +15 to +20 |
| Solid positional maintenance | +5 to +10 |
| Neutral round | 0 |
| Repeated defensive errors | −5 to −10 |
| Tap, stalling, or safety violation | −15 to −25 |

### 4.1.1 Tap timing (anti-gaming)

A tap is scored on a clock so it cannot be used to skip a hard round cheaply. An **immediate tap is the maximum −25**; the penalty eases the longer you genuinely defend, down to a floor of −15 for a tap in the final stretch of the round.

```
RMS_tap = −25 + 10 × ( time survived ÷ round length )
```

You can never tap your way to a soft landing — bailing early costs the most.

### 4.2 Conversion to board time

The RMS converts **continuously** into a starting-time adjustment, expressed as a fraction of the game's base time — so it scales correctly across every time control and has no band cliffs.

```
Δt = base × cap × ( RMS ÷ max )
  max = 20 for gains, 25 for losses
  cap = the tier swing (gain cap on +RMS, loss cap on −RMS)
```

| Tier | Gain cap | Loss cap |
|------|----------|----------|
| Light | +3% of base | −5% of base |
| Medium | +5% of base | −8% of base |
| Heavy | +6% of base | −12% of base |

The loss cap is deliberately larger than the gain cap: a mistake on the mat costs more than dominance pays. The asymmetry is fixed and bounded — it can no longer stack into a runaway deficit.

### 4.3 Scaling examples (Medium tier)

| Time control | Base | Max gain | Max loss |
|--------------|------|----------|----------|
| 5+3 blitz | 300s | +15s | −24s |
| 10+5 rapid | 600s | +30s | −48s |
| 15+10 rapid | 900s | +45s | −72s |

**Worked example**, Medium, 10+5: a dominant Mat 1 (RMS +18) gives Δt = 600 × 5% × (18÷20) = **+27s**, so Board 1 starts at 10:27. A tap in Mat 2 (RMS −20) gives 600 × 8% × (20÷25) = **−38s**, so Board 2 starts at 9:22.

### 4.4 Floor

Starting time never drops below **60% of base**. Every board game stays real chess.

### 4.5 Heavy-tier increment clause (optional)

On a tap at Heavy tier, the first 5 board moves earn no increment, so the deficit cannot be instantly refilled.

---

## 5. The Readiness Spectrum (display & tiebreak)

A 0–100 readiness gauge starts at 50 and is nudged by **RMS ÷ 2** each round (clamped 0–100). In v1.2 it is a running picture of your night and a tiebreaker only — it no longer sets the clock. The Clock Engine (Section 4) owns time. This removes the v1.1 problem where the spectrum and a separate penalty table both taxed the same mat event.

---

## 6. Carryover

- The **mat** resets to a neutral start every round.
- Each board game's time adjustment comes **only from the mat round immediately before it**. Adjustments do not stack across the match.
- The **readiness spectrum** is the one value that accumulates across the night, for display and the aggregate-spectrum tiebreak.

---

## 7. Winning the Match

Most board points (win = 1, draw = 0.5 each). Tiebreakers, in order: aggregate spectrum, total RMS, then an Armageddon blitz.

---

## 8. Divisions

| Division | Mat | Board base | Tier |
|----------|-----|------------|------|
| Youth | Positional, 3 min | 5+3 | Light |
| Adult Rec | 5 min roll | 10+5 | Light / Medium |
| Competitive | 5 min roll | 10+5 | Medium |
| Open | 6 min roll | 5+3 | Medium / Heavy |

---

## 9. Trainer Alignment

The [ROLL CHESS Trainer v0.6](https://lylegill02-cpu.github.io/roll-chess/trainer.html) simulates these rules:

- **Training Mode** — fixed board time, no RMS consequences
- **Recovery Mode** — Clock Engine at chosen tier, live RMS readout, 12s mat-round timer with tap-out curve

Competition tiers map directly to trainer Recovery tiers for pre-event rehearsal.

---

*ROLL CHESS v1.2 — One mat score, one scaled clock. Mat performance is board preparation.*
