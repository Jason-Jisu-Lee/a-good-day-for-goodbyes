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
- **Survivor FACES: USER'S OWN ART is canonical (2026-07-07).** The
  actual assets are person_man.png + person_woman.png (the user's
  assetFace.png with the circle removed programmatically, pixel-perfect).
  Do NOT hand-redraw these; a hand recreation was rejected for wrong
  proportions. Style = tiny BUST: navy hair+eyes, pale (now white) face,
  gray shoulders, two small eyes, no nose/mouth. Face is the light
  background showing through the hair gap, so busts need a LIGHT panel
  behind them in UI. To make more survivors, produce variants in this
  exact style/proportions (edit from the user's pixels, not from scratch).
  labs/survivor-faces.html displays the isolated art.
- **Survivors read as SLIGHTLY depressed** (user): quiet, low mood, shown
  ONLY through subtly downcast eyes. Careful and subtle, never a frown,
  tears, or caricature. Fits the melancholy of the premise (goodbyes,
  permadeath, rewind).

## Tone / audio direction
- **Deliberate contrast is a PILLAR** (user, 2026-07-07): classy,
  understated JAZZ as the whole-game background, set against playful,
  "silly" 1-bit pixel art. The mismatch is the point (elegant ear,
  toy-like eye). Keep both honest: art stays cute/minimal, audio stays
  classy. Neither side should drift toward the other and flatten it.
- Jazz is the primary background bed (jazz noir + classical, TO-DO.md).
- **RESOLVED (2026-07-07):** music ships as pre-made audio FILES (user
  already has them: AI-generated + royalty-free). The no-samples house
  law bends for MUSIC; sound EFFECTS stay procedural WebAudio. Apply the
  tracks later when audio work starts (needs a small music player: load,
  loop, crossfade, volume, mute, resume after tab-switch).
- Keep a license/commercial-use record per track (royalty-free terms and
  AI-generator terms vary); matters for itch/Steam release.

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
(none)
