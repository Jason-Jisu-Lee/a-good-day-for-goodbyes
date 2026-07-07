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
- Face style proven with 3 (labs/survivor-faces.html), names only, no
  stats. Expand to full roster once signed off; user personalizes later.

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

## Enemy (UNDECIDED, two candidates)
- Down to two, user picks later:
  1. **Zombies** (simplest, cheapest to build).
  2. **AI robots** (machines with working AI that turned on humans).
- The scientifically-factual / swarm direction is DROPPED for now (user
  reversed). Not "not robots" anymore; AI robots are back on the table.
- Everything else is architected around a placeholder so the enemy swaps
  in later without rework.

## Art and UI direction
- **Very minimalist** (user emphasis). 1-bit black and white, dark theme.
  Color earned slowly.
- House pixel-craft, animation, and 16:9 stage laws apply (see working
  agreements).
- **Survivor FACES: LOCKED IN (2026-07-07).** Old no-faces law removed.
  Style: simple, FLAT (no shading), NEUTRAL. Head only, cropped at the
  chin (no neck, no shoulders). Round head, simple hair (short cap or a
  face-framing bob), two block eyes, one flat mouth. NO nose, brows,
  shadow, or expression. People differ by hair style + color + skin tone.
  Industry-standard simple avatar look. No stats/labels in the art. Faces
  stay in portraits/UI, never bodies on the play stage. Proven with 3
  (REED/MARA/HALE) in labs/survivor-faces.html; expand to full roster
  once the style is signed off.

## Audio direction
- Jazz noir + classical (user, TO-DO.md).
- Tension with house law (procedural WebAudio only, no samples). Resolve
  when audio work begins: generative jazz/classical, or the law bends for
  music.

## Project structure
- Root: CLAUDE.md (local), DESIGN.md, TO-DO.md, README.md.
- `labs/` design-by-demo HTML labs (standalone, deleted once locked).
- Game source/assets folders arrive when the build starts.

## Labs (delete once locked)
- `labs/survivor-faces.html` face style proof (3 faces), current style.
- Earlier exploratory labs (icons, avatar styles, first faces, busts)
  deleted 2026-07-07 for a clean start.

## Open questions
- Enemy identity (real, scientifically factual).
- Final title.
- Stat system (axes above are placeholder).
- Target survivor count.

## Parked
- Music vs procedural-audio law.
