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
- First horde timing: TBD. The first phase should last quite a bit.

## Ground phase loop (locked 2026-07-09)
- Start: 4 survivors on a small circle of land, heavy fog of war beyond.
- Survivors on the map are small circles with the name above the head,
  moving around (marker style: labs/tiles.html pick pending).
- The player ASSIGNS survivors to tasks by clicking; work then runs
  automatically (player is never labor). Example: assign to wood, the
  survivor gathers whatever wood is around on that tile.
- Resource nodes do NOT run out. Throughput is the limit, not the stock.
- The map is made of square TILES: resource tiles, survivor (rescue)
  tiles, building tiles, more types later. Many tiles spawn with enemies
  that must be cleared. New tiles appear after the early game.
- Tile counts per type are FIXED per run; their placement is randomized
  at run start. Goal: high variance run to run without it feeling like
  pure luck.
- Time: days. No pressure UI. Each survivor can gather only so much per
  day (fatigue cap). Daily output is limited by the survivor, not the
  node.
- Zoom: slight zoom-out becomes available as the map grows; the design
  minimizes how much the player needs it.
- Phase arc on the ground:
  1. Self-sustain: food, water, shelter secured.
  2. Sustain under continuous, worsening zombie attacks (designed to
     eventually become unholdable).
  3. Escape to the mysterious bunker that was found (mechanic shift).
- Expansion motive: more resources, and crucially finding more survivors
  to combine forces, which is what makes taking the bunker possible.
- Skill philosophy: optimization skill should matter a LOT. Perfect play
  goes far. The deepest mechanic remains prestige (time rewind).

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
- **Survivor FACES: USER'S OWN ART is canonical (2026-07-07).** Style =
  a person in a navy-ringed CIRCLE (KEEP the circle): navy hair+eyes, pale
  off-white face (the interior showing through the hair gap, not drawn),
  gray shoulders, two small eyes, no nose/mouth. Source = assetFace.png.
  5 avatars in project root (final set, user picked 2026-07-09):
  face_man, face_woman (user's exact originals, untouched) + 3 variants
  on the exact extracted base: face_man2 (crew cut), face_man3
  (side-combed), face_woman2 (jaw bob). face_all.png = preview.
  HOW to add more: draw hair as whole ~4px logical grid cells (pitch
  251/63), hard edges, NO antialiasing, on the bald base; hair never
  below the shoulder line; normal conservative styles only. First
  attempt used 1px antialiased shapes and was rejected as granulated;
  full-length hair was rejected as horror-like. Built in PowerShell/.NET,
  not a browser lab.
- **Survivors read as SLIGHTLY depressed** (user): quiet, low mood, shown
  ONLY through subtly downcast eyes. Careful and subtle, never a frown,
  tears, or caricature. Fits the melancholy of the premise (goodbyes,
  permadeath, rewind).

## Main menu (built 2026-07-09, index.html)
- Pure black background, white bitmap type. Black and white theme.
- Buttons: ENTER (starts the game, currently fades to a black placeholder
  screen), SETTINGS (placeholder, no action yet), QUIT GAME (window
  close).
- Bottom row: Steam-icon WISHLIST and DISCORD buttons, intentionally
  non-functional for now, dimmed until hover.
- Landscape 960x540 and portrait 540x960 layouts, same stage law.
- Esc returns from the game screen to the menu (silent, no text).

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
- GAME IDENTITY (deciding 2026-07-09): turn-based days (Rebuild) vs
  real-time incremental ticking vs hybrids. Claude recommends
  action-gated threat: real-time economy, hordes triggered by player
  expansion filling a visible threat meter, never by wall clock; late
  game flips to time-creep by design to force the bunker act. Runner-up:
  auto-rolling day pulse with pre-announced sieges. References given:
  A Dark Room (reveal pacing), Rusty's Retirement, Loop Hero. User
  deciding; nothing locked.
- Enemy identity (zombies vs AI robots; zombies currently assumed in
  ground-phase wording).
- Final title.
- Stat system (axes above are placeholder).
- Target survivor count.
- First horde timing (first phase should last quite a bit).
- SURVIVOR MARKER (refined 2026-07-09): plain pencil-line circle
  OUTLINE, never filled, THICK stroke (~30px ring, ~5px line at map
  scale). Name above in the 5x7 font at scale 2. NO shake or jitter on
  units ever (user read it as a bug); movement is steady constant-speed,
  smooth per frame.
- FONT LAW: the 5x7 pixel font is the standard for all readable text
  (names, buttons, labels). The old 3x5 font was too hard to read; keep
  it only for tiny dev readouts.
- TILES ARE TOP-DOWN (map view, player looks down on minions). No side
  elevations on the map.
- FOG: the white dither halo was rejected ("looks like a tile with white
  outline"). New principle: unexplored space is pure black; fog reads as
  the tile edge dissolving into darkness (style board candidate B).
- Background question OPEN: black-dominant vs white-dominant world (both
  demoed on the style board, C is the white option). Some color arrives
  later regardless; this is about the dominant field.
- Style set board (labs/tiles.html, 2026-07-09): STYLES.md numbers 2
  dither, 3 silhouette, 4 geometric, 5 bitmap-type, 6 outline, each
  rendered over the same asset set: top-down forest tile, enemy mass,
  fire + sword icons, resource readout with bar, ENTER button. No fog,
  no survivors (marker locked separately). #1 chunky seen earlier.
  Awaiting style pick (mixing styles per layer is allowed, e.g. world
  in one style, UI in another).
- Resource types list for ground phase (wood confirmed; food, water,
  shelter materials implied by self-sustain goal).

## Parked
(none)
