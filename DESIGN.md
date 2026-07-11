# A Good Day for Goodbyes
*(TITLE LOCKED 2026-07-11; repo
github.com/Jason-Jisu-Lee/a-good-day-for-goodbyes)*

Third game. Survival + incremental hybrid. 1-bit minimalist house style.
Authored at 960x540 (16:9), desktop first, itch.io then Steam.
This file is canonical. It updates with every design decision.

---

## The fantasy
Never labor. Attention and decisions only. Gather a handful of survivors,
learn who they are, keep them alive, and spend the whole game deciding who
to save. The game is a complete story with a real ending, not endless.

## Design principles (canonical guardrails, user 2026-07-10)
Claude polices these during ALL design work: flag any violation
immediately so the user can pull back or push further, and volunteer
improvement suggestions along the way.
1. IMPORTANT, FUN DECISIONS. Never boring, annoying, or
   mind-cluttering ones. Not too many decisions at once, but always
   some real ones.
2. DEPTH REVEALS GRADUALLY. The game constantly evolves, showing more
   and more depth as it goes, without ever overwhelming. Lots of
   content, zero boredom.
3. NO EARLY PUNISHMENT. Real consequences arrive around mid game
   (extends the missing-an-event-costs-nothing doctrine).

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
- **Permadeath**: anyone can die, forever. (UNDER REVIEW 2026-07-10:
  user wants to rethink the concept; revisit before building death.)
- Placeholder stat axes: GRIT / HANDS / NERVE / HEART (not locked).
- Face style proven with 3 (labs/survivor-faces.html), names only, no
  stats. Expand to full roster once signed off; user personalizes later.

## Prestige (the time rewind)
- A time rewinding device. Story driven. Rewinding means saying goodbye
  to survivors.
- Grants permanent buffs that attach to specific survivors.
- Because a buff lives on a survivor, a later permanent death loses that
  buff. So prestige value is mostly permanent but not entirely.
- The device is FOUND on a late-game tile (a discovery, not a purchase).
- Buffs are MARGINAL on purpose: one point here, one point there. Small
  bounded numbers make each +1 huge (Slice and Dice pip logic; the
  bounded-axes doctrine keeps this true by construction).
- A lucky, near-optimal run can reach the bunker act with ZERO
  prestiges. Prestige is a compulsion, never a hard wall (user
  2026-07-10).

## Pressure (the hordes)
- Recurring attacks, progressively harder.
- Every attack damages survivors (injury / attrition).
- Missing an event costs nothing: absence of reward, never penalty
  (progression doctrine).
- First horde timing: TBD. The first phase should last quite a bit.

## Ground phase loop (locked 2026-07-09)
- Start: 2 survivors on a 4-tile origin plot (2x2), heavy fog of war
  beyond (2 survivors per user 2026-07-10, supersedes the earlier 4).
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

## Early game flow (LOCKED 2026-07-10)
- ORIGIN (2x2, 4 tiles): FOOD, RESIDENT (shelter), MYSTERY (fogged,
  the natural first scout target, randomized reveal), RUBBLE (blocked,
  costs Materials to clear; the visible Material sink from minute one).
  NO Material tile in the origin.
- GUARANTEES: food and shelter only. Everything else, including
  Material tiles and recruits, is RNG from the fixed-count pool.
  (Ring-1 floor guarantee REJECTED by user. Noted risk, accepted: a
  roll with no ring-1 Material tile delays rubble until ring 2;
  acceptable while rubble gates nothing critical.)
- FOOD is the single sustenance resource. Water folds into it (locked).
- OPENING BEAT: 2 survivors, BOTH idle at start (no auto-assignment).
  The player assigns one to food and sends the other to scout,
  naturally the mystery tile first. Two real decisions at minute zero.
  No instructional text ever; idle survivors and fog do the pull.
- SAFE FIRST RING: no zombies; 1 or 2 recruitable survivors can appear
  (RNG count). Every tile beyond ring 1 can hold zombies.
- DEADLOCK GUARD: rubble needs Materials -> Materials need ring 1 ->
  ring 1 needs claiming. Therefore claiming/scouting early tiles costs
  survivor TIME only, never Materials.
- Early hunger (no-punishment doctrine): a hungry survivor stops
  working and sits until fed; visible, fixable, never lethal early.
- Mystery reveal table PARKED (decide contents later).
- Mid/late game wants lots of fun, exciting RNG decisions and factors
  (Slice and Dice inspiration); parked until the early game is built.

## Action model (LOCKED 2026-07-10, Rebuild-style)
- One pattern for every tile action: hover/select the tile -> click the
  action (SCOUT / GATHER / CLEAR / RECLAIM) -> choose which survivors
  to send.
- CREW SIZE + DIMINISHING RETURNS (applies to MOST actions): more
  survivors = faster, each added survivor helps less. Standard form:
  time = base / (1 + r + r^2 + ...), r tuned in playtest (~0.6-0.7).
  4 survivors feel much faster than 1, never 4x. Exact timings parked
  for playtest.
- SCOUTED is not RECLAIMED: scouting clears the fog (tile art becomes
  visible) but the tile is not yours; an at-a-glance visual state must
  mark unreclaimed tiles. Candidate treatment lives in the Color plan
  (mono until reclaimed).
- PARKED: input accelerators arrive later (e.g. click-drag
  assignment); the first slice ships the plain tile->action->crew
  flow.

## Identity: REAL-TIME, ACTION-GATED (LOCKED 2026-07-09)
- Real time. Resources tick per second, visibly. No turn structure, no
  END DAY button. Rebuild-style turns are definitively rejected.
- Days pass automatically; a subtle, de-emphasized day counter exists
  (time is present but never a pressure).
- Threat is ACTION-GATED: danger triggers when the player pushes into a
  new tile, never by wall clock (early and mid game).
- SCOUTING: tile strength is hinted, not shown. A scout action reveals
  info. Survivors differ in scouting ability (per-survivor metrics),
  forcing who-do-I-send decisions.
- ENTERING A TILE = ENCOUNTER: the camera zooms quickly into that tile.
  Time keeps running. If the tile is much stronger than expected,
  player control is DISABLED and survivors act autonomously: some flee
  back to town, others rush in to help, dramatic saves, real permanent
  losses. The game keeps going through all of it.
- PRESTIGE COMPULSION: when the next tile feels too slow or expensive to
  crack, that is the designed moment the player chooses to rewind.
- TOWN GRID like Rebuild: the map is a town, tiles separated by streets.
  Expansion = reclaiming the town tile by tile. RECLAIM becomes
  available once a tile is fully seen/known.
- LATE-GAME RULE-BREAKS are story beats: the action-gating promise
  breaks before the bunker act, zombies start coming uninvited, players
  are MEANT to be caught off guard. Rules the player believed were
  guaranteed break on purpose: the signal that the ground cannot be
  held forever.
- SURVIVOR CHAT BUBBLES: survivors randomly say things in small speech
  bubbles; players learn each personality slowly through them. No text
  walls; the map stays minimal.
- Reference feel confirmed by user: A Dark Room's reveal pacing ("YES
  thats exactly what i mean"), Rebuild's town reclaim, minus turns and
  minus text walls.

## Pricing (user, 2026-07-09)
- Deliberately odd price, e.g. 9.73, never 9.99. The number itself
  appears in-game as a tribute / fun thing. Steam custom pricing allows
  this (regional auto-rounds may vary); itch allows any price. Exact
  number decided later.

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

## Color plan (60-30-10, direction updated 2026-07-10)
- 60% near-black #0a0a0c (world, fog, backgrounds).
- 30% off-white #f2f2f0 (tile art, text, survivors).
- 10% = PER-CATEGORY TILE COLOR (user direction, Gnorp Apologist
  reference): each tile category carries a small dose of its own hue
  so the board reads instantly and never becomes a hard-to-parse
  black and white wall. Hues muted/dusty, small surface per tile, few
  categories (4-6 hues max).
- SEMANTIC RED ~#d4382c stays reserved for danger only (horde, injury,
  stronger-than-expected tile). Red never decorates, so no red-leaning
  category hue.
- Claude recommendation (pending user OK): bind color to RECLAIM.
  Scouted tiles render mono (visible, not yours); reclaiming pours the
  category hue in. Color is earned piece by piece (house art law made
  mechanical) and doubles as the scouted-vs-reclaimed state read.
- The earlier single-warm-amber accent is superseded as the 10%;
  selection/hover treatment gets decided in the tile color lab.
- Grays (streets, panels, fog) belong to the neutral 60/30 family.
- Exact hues picked by feel in a lab once tiles are sprited (design by
  demo).

## Survivor maintenance metrics (user, 2026-07-10)
- EARLY: food, shelter, MATERIALS. Materials is the ONE universal
  resource category: rebuilding tiles, empowering weapons, artifacts,
  everything. (Earlier HUD mock showed WOOD/WATER; those fold into
  Materials.) Assumption to confirm: shelter = housing capacity granted
  by tiles, not a consumable.
- MID: defense begins, health (sickness, medication, hospitals),
  recruiting starts (restated 2026-07-10).
- LATE: defense at full pressure, plus an overall HAPPINESS metric
  (planned; happiness moved from mid to late 2026-07-10).
- Certain tiles give random ITEMS.
- Material tile candidates offered: scrapyard, construction site,
  hardware store, warehouse, rubble lot (doubles as destroyed-tile
  state), lumber yard. Claude's picks: scrapyard + hardware store +
  rubble lot. Awaiting user pick before spriting.
- Game pace and overall identity still being felt out by user.

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

## First slice (BUILT 2026-07-10, game.js + index.html)
- Menu -> ENTER -> live town. Origin 2x2 (grocery, house, rubble,
  mystery cell, arrangement randomized per run) + safe ring 1 (12
  tiles: 2 scrapyard, 1 grocery, 1 house, 1-2 camps, rest empty lots,
  shuffled) + fog dissolve beyond. Streets per locked treatment.
- Actions live: SCOUT (15s base), RECLAIM (20s, lots/caches 10s),
  CLEAR rubble (20s, costs 20 Materials, refunds on stop), GATHER
  (persistent; food 1 per 8s, materials 1 per 10s per effective
  worker). Crew picker with diminishing returns r=0.65.
- Mystery reveal v1: grocery 40 / cache 35 / lot 25. Cache pays 25
  Materials on reclaim. Camp reclaim = recruit joins (bag: JUNE OKON
  IVY CALEB NOOR SAGE; face variants), tile becomes lot.
- Color-on-reclaim IS IMPLEMENTED as the candidate treatment: owned
  tiles get a category-hue ground line (food green, house tan,
  materials ochre), scouted tiles render gray on dark. Reclaim pours
  the line left to right. Awaiting user feel-test.
- Hunger: eat 1 food per 40s; at zero food a survivor pauses work and
  sits (never dies); hungry survivors still work grocery tiles so
  starvation can always be dug out of. Day = 90s, dim counter.
- Save: localStorage, autosave 10s + visibilitychange, wipe guarded by
  autosave gag. Debug panel (backtick / #debug): grants, time scale
  x1/x5/x20 (resets on hide), save/wipe. #game hash skips menu (dev).
- FOG VISIBILITY FIXED (2026-07-11, was: whole 4x4 board + streets
  visible at minute zero): unexplored space renders pure black;
  streets exist only beside explored tiles (stubs grow with the town);
  scoutable frontier tiles show as near-black slabs eroding into the
  dark, no borders (checker-edge treatment dead, aligned-band
  violation); the hash dissolve wraps the explored silhouette only;
  deep-fog tiles ignore hover/click. Scout adjacency tightened to
  EDGE-adjacent (was 8-way with diagonals), so board corners stay
  invisible until a neighboring tile is owned.
- Dual orientation per stage law; 44px buttons and rows.
- NOT in slice (parked): fatigue caps, park tiles (perspective pick
  pending), SFX, player-facing reset (debug wipe only), shelter
  capacity effect, zombies/ring 2. Menu still uses the old 3x5 face.
- All numbers are first-pass; tune by feel with the debug time scale.

## Project structure
- Root: CLAUDE.md (local), DESIGN.md, TO-DO.md, README.md.
- `labs/` design-by-demo HTML labs (standalone, deleted once locked).
- Game source/assets folders arrive when the build starts.

## Labs (delete once locked)
- `labs/survivor-faces.html` face style proof (3 faces), current style.
- Connection-systems lab (A plug-in plots / B sidewalk ribbon / C
  shared horizon / D wall to wall) REJECTED whole (user 2026-07-11,
  "really bad"; also reused existing sprites, which defeated the
  point). Deleted.
- Flat style board origin8 (styles 1-8, front-view) SUPERSEDED same
  day by the oblique perspective change. Deleted. Standing findings
  from it: abstract styles #5 TYPE / #7 EMBLEM / #8 PATTERN fail the
  user's filter "minimal but something a survivor could actually
  interact with"; #4 GEOMETRIC converges with solid once volumes
  exist. Tile-style candidates narrowed to #1 CHUNKY / #2 DITHER /
  #3 SOLID (silhouette adapted to volume) / #6 OUTLINE.
- Oblique board REJECTED same day (user: too complicated, and it
  re-skinned ONE shared building geometry across styles, which the
  user explicitly forbids; every candidate must be its own design).
  Deleted. KEPT from it: the side view (user likes it) and the block
  model ground language.
- Block board (six worlds, 2x2) narrowed by user 2026-07-11 to
  A FLAT BOXES / C SHADOW MASS / F DITHERWORK; then the 3x3 finalist
  board settled it: A FLAT BOXES locked (see WORLD STYLE LOCKED).
  Both boards deleted. Kept findings: C-lot learned that corner
  brackets are reserved for the selection UI; the block/lot-seam
  connection experiment is dead (Rebuild street grid re-locked).
- `labs/opening.html` OPENING MOCK (2026-07-11, v4, "i can live with
  that" on the diagonal direction): 2x2 in the locked flat-box world
  and locked true-square diagonal view. Tiles: HOUSE (normal single
  house: flat-roof cube, door, right-wall window, chimney pipe
  breaking the roof silhouette), APARTMENT (tall tower, four floors
  of window pairs on both visible walls, ground door, roof unit;
  user asked for a normal house + relatively tall apartment after
  the oversized grocery was rejected), RUBBLE (reads as a destroyed
  building: 1px foundation rim, dark exposed floor, white debris
  chunks inside, jagged standing back-wall fragments with a window
  hole, leaning beam; the pyramid-pile and two mound attempts are
  dead), MYSTERY dark diamond. Streets with curbs/dashes absent on
  the mystery's unexplored sides; fog hugs the rotated silhouette.
  Grocery sprite retired with the size complaint; food tile gets
  designed later in this system. Awaiting feel pass; then wire into
  game.js.
- Earlier exploratory labs (icons, avatar styles, first faces, busts)
  deleted 2026-07-07 for a clean start.

## Open questions
- Enemy identity (zombies vs AI robots; zombies currently assumed in
  ground-phase wording).
- Stat system (axes above are placeholder).
- Target survivor count.
- Pacing tuning: threat is action-gated, so "first horde" = first
  defended tile the player cracks; how long the safe opening lasts
  before defended tiles dominate still needs tuning (user wants the
  first phase to last quite a bit).
- SURVIVOR MARKER (refined 2026-07-09): plain pencil-line circle
  OUTLINE, never filled, THICK stroke (~30px ring, ~5px line at map
  scale). Name above in the 5x7 font at scale 2. NO shake or jitter on
  units ever (user read it as a bug); movement is steady constant-speed,
  smooth per frame.
- FONT LAW: the 5x7 pixel font is the standard for all readable text
  (names, buttons, labels). The old 3x5 font was too hard to read; keep
  it only for tiny dev readouts.
- TILE PERSPECTIVE (user 2026-07-11, supersedes the front-view
  billboard direction): Rebuild-style TOP-DOWN OBLIQUE. Each building
  shows roof plane + south facade + east side sliver (cavalier skew,
  1px right per row of depth), glued to the ground by a black drop
  shadow to the south-east. Minimal but volumetric: something a
  survivor could walk up to and enter. Priority one unchanged: the
  player can tell what a tile is INSTANTLY.
- FOG: the white dither halo was rejected ("looks like a tile with white
  outline"). New principle: unexplored space is pure black; fog reads as
  the tile edge dissolving into darkness (style board candidate B).
- Background question OPEN: black-dominant vs white-dominant world (both
  demoed on the style board, C is the white option). Some color arrives
  later regardless; this is about the dominant field.
- Style demos so far (labs/tiles.html is the rolling style lab):
  #1 chunky (seen), #2 dither / #3 silhouette / #4 geometric / #5 type
  / #6 outline over a shared asset set, then #7 emblem / #8 pattern /
  #9 micro sprite / #10 sigil over POLICE + APARTMENT tiles
  (2026-07-09). Forest tile read "wonky" to the user; redo the forest
  in the final chosen style.
- ICONS LOCKED (user): silhouette-to-geometric range (#3-#4 or between).
  Exact blend decided later; type (#5) or dither (#2) may join as
  accents.
- STYLE SELECTION MODEL (user): one MAJOR style + one MINOR style + one
  ACCENT style will be chosen. UI is a major work area and gets heavy
  attention.
- **MAJOR WORLD STYLE LOCKED: #9 MICRO SPRITE** (user 2026-07-09). Tiles
  are tiny top-down dioramas. Liked-style pool for minor/accent: #3
  silhouette, #4 geometric, #5 type, #2 dither.
- WORKFLOW SWITCH (user): build CHRONOLOGICALLY along the play timeline
  from now on, starting with the first ~10 minutes. Assets first, then
  slowly the game.
- TILE CATEGORY SYSTEM: each category has multiple tile variations
  (house: apartment / single house / ...; defense: police station /
  military facility / ...; wood: park / forest edge / ...; hospital:
  clinic / hospital / ...). First-asset picks: single house, city park,
  police station, hospital with cross pad.
- First-10-minutes asset board: 4 categories x 5 styles + fog column
  (half-scouted dissolve and known-edge unknown tile). Fog = darkness
  dissolve, hash-scattered, never an outline.
- SIGIL SET (#10) extended (labs/tiles.html, 2026-07-09): one rune
  family, 2px strokes: house (door square + dot), wood (branch), defense
  (diamond between bars), hospital (open cross), zombie (three claw
  slashes), magic hat (triangle on bar + spark), sword, bow (arc +
  string + arrow). Candidate use: fog-hint marks, item icons, map runes.
- CONNECTION TREATMENT RE-LOCKED (user 2026-07-11): LIKE REBUILD.
  The block/lot-seam model was rejected ("connecting them a little
  weird"). Streets run between EVERY tile (locked palette: road
  #161616, curbs #3d3d3d, dash #5a5a5a), lots are #1a1a1a ground
  planes, black drop shadows glue buildings down. Merged stays dead.
- VIEW LOCKED: DIAGONAL, TILES STAY TRUE SQUARES (user 2026-07-11,
  settled by the user's Rebuild screenshot "diagonal view.png", kept
  LOCAL in the repo root, gitignored, never pushed; then corrected
  once more: 2:1 foreshortening REJECTED, "the tiles are still not
  squares"): the square world grid is drawn rotated 45 degrees with
  EQUAL DIAGONALS (military projection, no vertical squash). Screen
  mapping sx = wx - wy, sy = wx + wy; the ground (lots, streets,
  curbs, dashes, dark cells, fog erosion) is rendered by
  inverse-mapping every screen pixel back to world space, so all
  ground detail follows the diagonal automatically. Tiles read as
  rotated SQUARES, streets run diagonally like Rebuild. Buildings
  are prisms: rotated-square roof on top + two visible walls facing
  down-left and down-right with 45-degree base edges, verticals
  straight down, 1px dark seams between planes, mono, centered on
  their lots, dark shadow diamond underneath. Three earlier misreads
  (ground shear; square grid + billboard 3/4 sprites; 2:1 diamonds)
  are dead.
- WORLD STYLE LOCKED: A FLAT BOXES (user 2026-07-11 "use flatbox
  only"), minimalistic and impactful, sprites authored at 51px
  blitted x2, mono, CENTERED in the tile: grocery = flat-roof store
  (awning slab, mullioned display window, glass door, skylight + AC
  on the roof); house = flat-roof box (chimney pipe, cross-mullion
  window, stoop); rubble = one OBVIOUS stepped debris mound with
  block joints, a protruding beam, outlier chunks (user rejected the
  earlier "collapsed structure" composition as unreadable; rubble =
  simple pile, full stop).
- ACCENT COLOR REJECTED (user 2026-07-11: "dont do accent color. go
  back"). Tiles render MONO. The 60-30-10 per-category color plan
  remains an open question for a later dedicated lab; it does not
  live on the buildings for now.
- TILE DESIGN RULES (from user feedback, locked):
  - Tiles are designed FOR connection: every connector (driveway,
    walkway, lot) is a SOLID strip that runs to the tile edge facing a
    street and meets it through a small curb gap.
  - NEVER dashed/broken lines inside tile art (dashes read as stray
    street fragments and look messy). Paths, lots, driveways are solid
    fills in the lot-gray #2a2a2a.
  - Parking = a pavement patch with cars ON it, not floating dashes.
  - Buildings keep a margin from tile edges; props (trees) stay 2px+
    clear of streets.
  - Current set (labs/tiles.html, V3 FRONT-VIEW 2026-07-10; v1 and v2
    top-down sets both rejected): HOUSE = classic gable house with
    chimney, door, window. WOOD = round tree + pine + bush on a ground
    line. POLICE = wide civic facade, central door, windows, badge sign
    above the door. HOSPITAL = tall building with a large cross panel.
    Variation examples proving the system: APARTMENT (window grid),
    PINES (three pines), MILITARY (chevron sign + antenna), CLINIC
    (small building, small cross). All stand on a dim ground line,
    generous margins, dark cutouts for doors/windows/signs.
  - PARK perspective board (labs/tiles.html 2026-07-10): the same park
    as TOP DOWN (plan: path, plaza, pond ring, canopy discs), FRONT
    (trees + bench on ground line), HYBRID (plan ground + front-view
    standing trees, Zelda-style), plus content variations in hybrid:
    POND, PLAYGROUND (swing set + sandbox + ball), PLAZA (fountain +
    benches), OVERGROWN (dense trees + tall grass, no path). Awaiting
    perspective pick for parks/nature tiles.
- FOG LOCKED (user 2026-07-10): the organic hash-scatter darkness
  dissolve from labs/layout.html. Never outlines, never aligned bands.
- DARK PROFILE VARIANT: face_man_dark.png (user's man avatar remapped
  for black backgrounds: white ring + hair, dark slate face field,
  white eyes, gray shoulders). Generate the rest of the cast the same
  way once approved.
- LAYOUT MOCK: labs/layout.html, Rebuild-emulating town grid: 3x3 block,
  streets with faint center dashes between tiles, 4 known micro-sprite
  tiles, unknown tiles as near-black cells, organic fog dissolve beyond,
  HUD top bar (resources left, DAY counter small and dim at right),
  Rebuild-style selected-tile panel (name, UNSCOUTED, DANGER ?, SCOUT /
  RECLAIM buttons), survivor rings with names on the map, one chat
  bubble, avatar portrait strip bottom-left.
- UNIT NAME RULE: map names get a small black backing bar so they read
  over any tile art (5x7 font, scale 1 on the map; scale 2 stays the
  minimum for menus/UI).
- Resource list early game LOCKED: MATERIALS + FOOD, shelter as
  housing capacity (wood folds into Materials, water folds into FOOD,
  2026-07-10).

## Parked
(none)
