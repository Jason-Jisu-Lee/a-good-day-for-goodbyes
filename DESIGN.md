# A Good Day for Goodbyes
*(working title, placeholder)*

Third game. Survival + incremental hybrid. 1-bit minimalist house style.
Authored at 960x540 (16:9), desktop first, itch.io then Steam.
This file is canonical. It updates with every design decision.

---

## The fantasy
Never labor. Attention and decisions only. Gather a handful of survivors,
learn who they are, keep them alive, and spend the whole game deciding who
to save. The game is a complete story with a real ending, not endless.

## Shape of a run (acts)
1. **Early** land on open ground with almost nothing. A tiny origin plot.
   Scavenge, survive the first small attacks.
2. **Mid** expand the plot outward in a rough circle. Recruit survivors.
   Automate production. Reach a maintainable equilibrium against
   escalating pressure.
3. **Late** the equilibrium starts to break. Attacks outgrow what open
   ground can ever hold. One plot contains the sealed bunker.
4. **Late-late (separate act)** before the ground becomes unholdable,
   take the bunker. Clear it section by section. Make it self sustaining.
   That is the win.

## Ground (early + mid core)
- Circular expansion from a small origin (about 2x2). Claim adjacent
  cells outward, ring by ring.
- Cells host production, housing, and defense.
- Ground is inherently exposed. It can be optimized but never made
  permanently safe. It is a countdown, not a home.

## The bunker (endgame goal)
- Sits on one of the ground cells. Sealed. Permanently defensible once
  cleared.
- The true objective. Taken section by section (room by room / level by
  level), not all at once.
- Ground buys time. The bunker is the destination. When ground control
  becomes impossible, the run is lost unless the bunker is secured first.

## Survivors (the heart of the game)
- Recruiting is a major event, not a stat bump.
- Each has a name, age, role, a short personal story, unique base stats,
  and a face.
- **Permadeath**: anyone can die, forever.
- Placeholder stat axes: GRIT / HANDS / NERVE / HEART (not locked).
- Placeholder roster of 10 lives in the labs; user personalizes later.

## Prestige (the time rewind)
- A time rewinding device. Story driven. Rewinding means saying goodbye
  to survivors.
- Grants permanent buffs that attach to specific survivors.
- Because a buff lives on a survivor, a later permanent death loses that
  buff. So prestige value is mostly permanent but not entirely.

## Pressure (the hordes)
- Recurring attacks, progressively harder.
- Every attack damages survivors (injury / attrition).
- Missing an event costs nothing: absence of reward, never penalty
  (progression doctrine).

## Enemy (UNDECIDED, placeholder only)
- **Placeholder**: commercial helper robots that malfunctioned and turned
  on humans. Set after an AI collapse; only stray malfunctioning units
  remain, no smart AI left.
- Intent: the real enemy should be **scientifically factual** and not feel
  lame. Robots currently feel lame to the user. Brainstorm is ongoing.
- Hard constraints for the real enemy:
  - discrete, countable enemies (no abstract phenomena like noise or tides)
  - not plain humans
  - ideally not robots
  - zombies are the simplest accepted fallback
- Everything else is being architected around a placeholder so the enemy
  can be swapped in later without rework.

## Art and UI direction
- **Very minimalist** (user emphasis). 1-bit black and white, dark theme.
  Color earned slowly.
- House pixel-craft, animation, and 16:9 stage laws apply (see working
  agreements).
- **Art-law exception under review: survivor FACES.** House law is "cute
  without faces, nobody on screen." Faces are being introduced for
  survivor portraits to give personality beyond names. Pending
  confirmation after the face lab. Faces would be confined to portraits
  (UI), not walking bodies on the play stage.

## Audio direction
- Jazz noir + classical (user, TO-DO.md).
- Tension with house law (procedural WebAudio only, no samples). Resolve
  when audio work begins: generative jazz/classical, or the law bends for
  music.

## Labs (delete once locked)
- `lab-icons.html` resource / enemy icon pipeline proof.
- `lab-survivors.html` avatar styles A/B/C over 10 placeholder profiles.
- `lab-faces.html` face capability demo, 10 survivor portraits.

## Open questions
- Enemy identity (real, scientifically factual).
- Final title.
- Survivor identity style: avatar A/B/C vs faces.
- Stat system (axes above are placeholder).
- Target survivor count.

## Parked
- Music vs procedural-audio law.
