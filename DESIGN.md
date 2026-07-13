# A Good Day for Goodbyes

TITLE LOCKED 07-11. Repo github.com/Jason-Jisu-Lee/a-good-day-for-goodbyes.
All dates = 2026. 3rd game. Survival + incremental. 1-bit minimalist.
960x540 16:9, desktop first, itch then Steam. Canonical file; updates
with every design decision.

## IDENTITY REWORK (07-13, IN PROGRESS)
User is reworking the core-loop identity. During this brainstorm the
principles/doctrine below are SOFT PREFERENCES, not filters; challenge
freely, no market-data arguments. Current taste: ACTIVE gameplay (no
idle identity at all), some SILENT time constraint (felt pressure, no
countdown UI), zombies cooling, "the black" itself as enemy candidate.
Fixed skeleton: tiers 0-8, prestige tile at tier 4, bunker after tier
8 (harder remix, finale), multiple prestiges expected; material +
resident tiles core; early food bleed intended. Concepts in play:
vault runs (strip town, bank in timeless vault, rewind), sacrifice-to-
advance, the-black-pushes-back. Nothing else locked.

## Fantasy
Never labor: attention + decisions only. Gather survivors, learn them,
keep them alive, decide who to save. Complete story, real ending, not
endless.

## Design principles (guardrails, 07-10; Claude polices, flags
violations, volunteers improvements)
1. IMPORTANT FUN DECISIONS: never boring/annoying/mind-cluttering; not
   too many at once; always some real ones.
2. DEPTH REVEALS GRADUALLY: constant evolution, never overwhelming.
3. NO EARLY PUNISHMENT: real consequences ~mid game.
4. CONCEPTS ONE BY ONE (07-11): UI/metric/mechanic appears when first
   real (MATERIALS hidden till first material). Every future system.
5. CLEAN NUMBERS: player-facing integers only.

## Run shape (acts)
1. Early: land with nothing, tiny origin, scavenge.
2. Mid: expand ring by ring, recruit, automate, hold equilibrium vs
   escalating pressure.
3. Late: equilibrium breaks; ground unholdable; one plot hides the
   sealed bunker.
4. Late-late: take bunker section by section, self-sustaining = win.

## Survivors (the heart)
- Recruiting = major event, not a stat bump. Each: name, age, role,
  short story, unique stats, face.
- Permadeath UNDER REVIEW (07-10; revisit before building death).
  Stat axes GRIT/HANDS/NERVE/HEART = placeholder.

## Prestige (time rewind)
- Story device, FOUND on a late tile. Rewind = goodbyes.
- Buffs permanent but attached to survivors; that death loses the buff.
- Buffs MARGINAL (bounded axes; +1 huge).
- Lucky run wins with ZERO prestiges: compulsion, never a wall.
  Designed moment = next tile feels too slow/expensive.

## Pressure
- Recurring attacks, harder over time, damage survivors.
- Missing an event costs nothing (absent reward, never penalty).
- Threat ACTION-GATED early/mid: danger only when player pushes in,
  never wall clock.
- LATE RULE-BREAKS = story beats: uninvited attacks, players meant to
  be caught off guard = the ground is ending.

## Identity (LOCKED 07-09)
- REAL TIME. No turns, no END DAY, ever. De-emphasized day counter.
- Rebuild-style town grid; reclaim tile by tile.
- Scouting reveals hinted info; survivors differ in scouting ability
  (who-do-I-send decisions).
- Tile entry = quick camera zoom encounter; if much stronger than
  expected: control DISABLED, survivors autonomous (flee / rush in /
  dramatic saves / real losses), game keeps running.
- Feel: A Dark Room reveal pacing + Rebuild reclaim, minus turns,
  minus text walls.

## Early flow (LOCKED 07-10)
- Origin 2x2 (user 07-12): 2 HOUSE / FOOD / MYSTERY. RUBBLE dropped
  from origin; FLAGGED: rubble spawns nowhere now, CLEAR + early
  material sink dormant until rubble joins a tier pool.
- Guarantees: food + shelter only; all else fixed-count RNG pools
  (high variance, never pure luck).
- FOOD = single sustenance (water folded in).
- Opening: 2 survivors, BOTH idle. No instructional text; idle
  survivors + the unknown do the pull.
- Ring 1 safe: no enemies, 1-2 recruits possible. Beyond ring 1 =
  enemies possible.
- Early claims cost TIME only, never Materials (deadlock guard).
- Hunger pauses GATHERING only (survivor sits at the tile); temp
  tasks (scout/reclaim/clear) run through hunger so locked crews
  always finish = no deadlock, no stuck progress bar (07-11 bug fix).
  Never lethal early; food-tile work always allowed; survivor eats
  the moment food exists (starvation escape).

## Action model (LOCKED 07-10, Rebuild-style)
- Tile -> action (SCOUT/RECLAIM/CLEAR/GATHER) -> pick crew.
- Diminishing returns on TIMED actions only:
  time = base/(1+r+r^2+...), r=0.65. Gathering = +2/min per
  stationed survivor, additive (07-12); default food/scrap tiles
  capped at 1 slot.
- Temp tasks (scout/reclaim/clear) LOCK the survivor till done (or
  death); gather interruptible.
- Scouted != reclaimed: dim 0.55 till owned.
- Input accelerators (drag assign) parked.

## Reveal rule (07-11; fog REMOVED)
- No fog. Undiscovered = pure black, nothing drawn, unclickable.
- Adjacent unknowns = dim "?" diamonds.
- Reveal (scout) populates "?" on EDGE-adjacent neighbors (never
  diagonal). Persists all game EXCEPT start: origin four only
  (3 known + mystery "?"); the 8 edge-adjacent ring tiles appear
  when the mystery tile is RECLAIMED (user 07-12; on scout they
  appeared as "?" that could not be scouted yet, mystery not owned).
  By reclaim all origin four are owned, so every ring tile is
  scoutable the moment it shows.
- STREETS FINAL (user 07-12): faint yellow dashed road markings
  rgba(214,192,118) 55%, width 1.3, on CONTINUOUS STRAIGHT LANES:
  one stroke per maximal run of adjacent drawn pairs along a
  corridor, dead center between the visual edges (midpoint + 3.75px
  art-anchor offset), 4 dashes per tile span flush at cell bounds
  (dash=span/5.8, gap=0.6 dash). Alpha profile along the lane via
  gradient: revealed-revealed 0.55, frontier pairs 0.26 easing to 0
  at open lane ends over a full tile span (slow fade; hard stops
  dead). Both-"?" pairs break the lane.
- SURVIVORS (user 07-12): PERFECT circles, geometric arc fill with
  AA, radius 6 (slightly smaller than the street corridor), solid
  survivor color, hungry = dimmed shade. Sprite rings dead.
- Day counter bottom-left, dim.

## Balance v1 (tune by feel)
- Start 10 food (07-11, was 8).
- AUTO-GENERATION v2 (user 07-12, Rebuild-style, ADDITIVE): owned
  FOOD/SCRAPYARD tiles produce 1/min passive; each stationed
  survivor ADDS +2/min (1 surv = 3/min, 2 = 5/min). Default tiles
  cap at 1 station slot for now (GATHER_SLOTS in balance.js); slot
  indicator = "N/1" in picker header + panel, extra picker rows
  lock when full. Replaces per-gatherer rates (was FOOD 5/min,
  MATERIALS 3/min per gatherer). Eating unchanged: 2
  food/min/survivor (1 per 30s). EARLY BLEED INTENDED (user 07-13):
  2 survivors eat 4/min vs 3/min staffed food tile; the 10 start
  food is the grace window, income catches up as tiles come online.
- GATHER PICKER RATE LINE (user 07-13, "give me the delta"): the
  line always shows and reads as the tile's rate: "+1/MIN" with
  nobody selected, updates to "+3/MIN" when a survivor is checked.
  Gather picker opens with NO preselected survivor (other actions
  keep the 1-idle preselect).
- SCOUT 15s; RECLAIM 20s (lot/cache 10s); origin mystery tile (tier
  0) = 5s scout + 5s reclaim base (user 07-12, first-tile pacing);
  CLEAR 20s + 20 Materials
  (refund on cancel). Day 90s. Walk speed 40 px/s (07-11; the tuned
  feel carried across every board rescale).
- Mystery roll: FOOD 40 / cache 35 / lot 25. SUPPLY CACHE pays 10
  Materials (07-11, was 25; cache accepted by user). Camp reclaim =
  recruit (bag JUNE OKON IVY CALEB NOOR SAGE), tile -> lot. Max 6
  survivors.
- TIERS (user 07-12, replaces "ring"; map in TILES.md): tier 0 =
  origin 4; tier 1 = 8 edge tiles, scout 12s, >=2 danger tiles (1
  zombie each, draft); tier 2 = 4 corners + next ring, 24s,
  unscavenged renders slightly red (danger hint); tier 3 = next
  ring, 36s. +12s per tier. Grid names: chess A-L x 1-12, origin =
  F6 G6 F7 G7, prepared for 12x12.
- Zombie draft: dark intense red, 1 per danger tile, speed 6 px/s
  ABSOLUTE (speeds never derived from other actors; upgrades never
  leak). Not built; user playtesting the tier-1 feel first.
- Shelter (TILES.md, user 07-12): house 1, apartment 2. Not
  implemented yet.

## Visual language (LOCKED, extracted from user's 123.png)
- Diamond lattice, military projection (sx=wx-wy, sy=wx+wy), grid
  45deg; pitch (48,24) = TRUE 2:1 (07-12: pitch must equal the art's
  edge slope or corridors stagger; the old (48,30) 1.6:1 lattice vs
  2:1 art edges caused the street zigzag). Tile diamond 69x34.5
  (hit hw34.5 hh17.25); corridors ~12px parallel strips; portrait
  sc 1.
- WORLD GRID 6x6 (07-12; was 4x4): origin block at (2..3,2..3),
  tier 1 = 8 edge tiles, tier 2 = corners + border ring (24), all
  present so the reveal rule has tiles to reveal. Tier via Manhattan
  distance to the origin block. Scout need: tier<=1 12s, tier2 24s.
  Tier-2 pool = PLACEHOLDER (3 scrap, 2 food, 2 camp, 3 cache, rest
  lots) pending the TILES.md pass. Save v4 (older saves discarded).
- SMOOTH RENDER EVERYWHERE (user 07-12): stamps draw through a
  bilinear high-quality path at float coords (nearest-neighbor
  downscale killed), hover lift is sub-pixel smooth (rounding
  removed), canvas CSS upscale always smooth (pixelated hint dead).
- TEXT + ICONS VECTOR (user 07-12, "everything not pixelated"): the
  5x7/3x5 bitmap fonts are DEAD; all text renders as real
  anti-aliased type (Segoe UI stack; body 600 weight 10px/scale,
  display 700 8px/scale). Gear, note, speaker, steam, discord =
  canvas-path vector icons. Nothing on the stage rasterizes from
  pixel tables anymore.
- DANGER TILES VISUAL (user 07-12): every tier-2 tile carries 1
  zombie (z=1 stored); unscouted tier-2 "?" renders RED (#c8493f
  tinted tile lines + red "?", alpha 0.6). Combat itself not built.
- STREET FADE RULE v2 (user 07-12): corridors flanked by at least
  one REVEALED tile = full 0.55 (they outline the town, never fade).
  Fade-outs exist ONLY as lane extensions: a corridor between two
  "?" tiles gets a fading stroke only when the previous corridor on
  the same lane is revealed-revealed (the town road continuing away
  and dying over one tile span). Everything else = no line.
- CORNER TAILS (user 07-12): every road run END that is not a full
  extension gets a SHORT aggressive fade (0.4 tile span) past the
  last corridor, so outline roads die softly at outer corners (the
  G7/G8/H7/H8 corner case) instead of hard-stopping. Board-edge ends
  get no tail.
- WORLD SCALE FINAL (user 07-11 "when i full screen its way too big;
  itch size is perfect; later 12x12"): world ships at HALF stamps
  (native x1). FULLSCREEN k=2 then renders EXACTLY the approved
  density (2 screen px per art px = the itch-perfect look) with 4x
  the world area for the 12x12 plan; itch k=1 = same art at fine
  1px-per-art-px, crisp. The requested 75% is impossible cleanly
  (off-grid = grit); half at k=2 IS the stated perfect size.
- PITCH TRUTH (07-11): reference art pixel = 8.0 source px exactly
  (approved 155 stamps = source/4 = exact 2 px per art px). Clean
  sizes are ONLY native x2 (150/155 set, kept in asset/tiles/) and
  native x1 (75/77 set, live). Anything between resamples off-grid =
  gritty. Earlier 12.2 and 8.28 pitch estimates were wrong.
- CANONICAL ART = lossless 123.png crops: x2 set ref_house150
  (150x128), ref_apt155 (155x158), ref_tile155 (155x158, from the
  apartment's own base edges) via bicubic 1:4 + threshold 100
  (reproduces the approved originals to 99+%); x1 LIVE set
  ref_house75 (75x63), ref_apt77 (77x78), ref_tile77 (77x78) via
  exact 2x2 majority downscale of the x2 set with phase detection.
  Sources in ref/ (gitignored, never pushed): 123.png, ref_house.png,
  ref_apt.png, ref_tileA.png. Never redraw, never runtime-resample;
  resize = re-derive from sources. Building:tile ratio fixed forever.
- Unknown "?" = 0.45-alpha tile stamp + 5x7 "?". Icon-less kinds =
  5x7 labels (FOOD SCRAP RUBBLE CAMP CACHE; SCRAPYARD/CAMP/CACHE =
  placeholder names, user names later).
- SMOOTH ART LIVE (user 07-12, "the smooth version works,
  implement"): the game renders the SMOOTH set: smooth_house +
  smooth_apt extracted VERBATIM from the user's smooth.png (sources
  in ref/), smooth_tile drawn to match (thin straight diamond, line
  weight from their art). Alpha baked offline: outside = transparent
  (gap-sealed flood), building bodies + grounds = opaque; tiles =
  lines only. Stamps draw SOURCE-OVER (additive dead for smooth);
  painter order (gx+gy) gives true occlusion: front buildings cover
  lines behind (user's apartment-overlap fix). PIXEL set retained in
  asset/tiles (ref_house75/150 from user's house.png = default
  pixel house) as the fallback art mode.
- BUILDING SHRINK (user 07-12, "hiding too much of nearby tiles"):
  house + apartment stamps draw at 80% (55.2x46.4 / 55.2x51.6
  logical), scaled around the baked slab midline (measured: both
  sprites' slab center sits at tile center y-0.5). Full-size
  smooth_tile draws UNDER both buildings, so tile footprint is
  unchanged. Supersedes "building:tile ratio fixed forever" for the
  smooth set.
- BUILDING ISOLATION (user 07-13, "remove the extra tile"): the
  sprites' baked white diamond ring is gone. New assets
  smooth_house_only.png / smooth_apt_only.png = originals with the
  ring line recolored into the baked black ground (geometry-bounded
  pixel surgery: front V full, back edges only up to the measured
  building junction, despeckle pass; buildings untouched). Black
  ground kept opaque so painter occlusion is identical. Originals
  retained in asset/tiles. Result: building sits directly on the
  real smooth_tile, no inner diamond.
- HOVER = LIFT, final (3px ease). Selection = NO map marker (white
  outline rejected 07-11); panel is the selection feedback.
- SURVIVOR COLORS (user 07-11): each survivor gets a color, shown on
  the map ring FROM THE FIRST FRAME. #1 light red #e08b8b, #2 light
  blue #8bb4e0 (locked). Recruits 3-6 = light green/yellow/purple/
  orange pool, Claude placeholder pending user. Hungry = DIMMED shade
  of the same color (neutral-gray hungry ring dead; it masked colors
  on hungry continues).
- Survivors = 10px rings in corridors; no map names; work spots in
  front of tiles; idle at town crossing. No anatomy on stage; faces =
  portraits/UI only (asset/faces/).
- DISPLAY MODES (user 07-11, 3-way toggle in the gear panel top row,
  persisted in goodbyes_opts, dev button synced):
  - WINDOWED (default) = fixed 960x540 itch-size stage, centered,
    pixel-exact.
  - BORDERLESS = fill the window/screen with an ADAPTIVE VIEWPORT
    (industry standard, user 07-12 "fill whatever screen, best for
    selling"): render at integer device scale, logical stage extends
    from 960x540 up to 1720x720 (portrait 540x960 -> 720x1280) to
    match the screen aspect, so wider or taller monitors SEE MORE
    WORLD; UI anchors to real edges; the sub-integer remainder
    stretches smoothly (sharp bilinear); exact fits (1080p x2,
    1440p x2, 2560x1080 x2, 3440x1440 x2, 4K x4) are pixel-perfect;
    letterbox only past 21.5:9 (32:9 gets bars, industry standard).
    Phones already covered: portrait layout, pointer events, 44px
    targets; itch embed covered by WINDOWED.
  - FULLSCREEN = borderless + browser fullscreen API. Esc exits ->
    setting drops to BORDERLESS. Stored FULLSCREEN reboots as
    BORDERLESS (browsers need a click to re-enter fullscreen).
  Never render fractional directly (uneven pixels).
- Stage edge: barely visible #1c1c1c outline, WINDOWED ONLY (07-11:
  at F11 it framed the whole screen and read as a border; hidden
  whenever the window covers the screen).

## Art/UI direction
- Very minimalist 1-bit, dark. Color earned slowly.
- FACES: user's art (asset/faces/): navy-ringed circle, navy
  hair/eyes, no nose/mouth, gray shoulders; whole-grid-cell edits
  only. Read SLIGHTLY depressed via subtly downcast eyes only; never
  frown/tears/caricature.
- Color plan 60-30-10: near-black 60 / off-white 30 / 10 =
  per-category muted tile hues (Gnorp-style small doses, 4-6 max);
  red reserved for danger. Claude proposal pending user OK: color
  arrives on RECLAIM (mono when scouted). Hues via lab later.
- Tone: classy understated jazz vs playful minimal art; the contrast
  is a pillar, neither side drifts. Music = pre-made files (keep
  license record per track); SFX procedural WebAudio.
- MENU MUSIC LIVE (user 07-12): asset/soundtrack/main_screen.mp3
  (user's track, compressed 112kbps 6.2->2.7MB, source in ref/)
  loops on the main menu, autoplays every boot (browser autoplay
  block = starts on first click/key), stops entering the game (no
  in-game music yet), resumes on return to menu. Volume = music
  slider (live), MUTE flag persisted: note button top-right on the
  MENU (slash when muted) for instant mute; in-game note keeps the
  volume panel.

## Maintenance metrics
- EARLY: food, shelter (housing capacity), MATERIALS (the one
  universal resource). MID: defense, health, recruiting. LATE: full
  pressure + HAPPINESS. Some tiles drop random ITEMS.

## Pricing
- Deliberately odd (e.g. 9.73, never 9.99); the number appears
  in-game as tribute.

## Enemy
- UNDECIDED: zombies vs AI robots. Placeholder-architected, swaps
  without rework.

## Current build (07-11, v15 scripts)
- Menu: NEW GAME / SETTINGS / QUIT GAME (+ dead WISHLIST/DISCORD);
  NEW GAME becomes CONTINUE when a save exists (07-11).
  SINGLE SESSION: one save slot, ever. ABANDON lives in the IN-GAME
  gear panel under MAIN MENU (07-11, moved off the main menu):
  2-click confirm (ABANDON -> ABANDON?), clears save + memory, exits
  to menu (now showing NEW GAME).
- Origin randomized (2 house/grocery/mystery) + ring bag
  (2 scrap, 1 grocery, 1 apartment, 1-2 camps, rest lots).
- Live: scout/reclaim/clear/gather, crew picker with live duration
  ("+N/MIN" / "NS"), locked-survivor dimming, hunger pause, recruits,
  mystery roll, reveal rule, streets.
- HUD: FOOD + "+x/MIN" "-y/MIN" + breakdown tooltips (tiles grouped
  by rate: "3 X 1/MIN" unstaffed + "1 X 3/MIN" staffed); MATERIALS
  hidden till first; DAY bottom-left.
- FLOATING TEXT (user 07-11, "industry standard"): each whole
  gathered resource pops "+1" above the tile, rises ~14px, fades
  ~1.1s, rAF-driven, capped at 40 live floats (background-tab
  guard). Cosmetic, never saved. Gathering only for now (reclaim
  grants like cache +10 have no float yet).
- NAMES LOCKED (user 07-11): FOOD, SCRAPYARD, SUPPLY CACHE. Still
  placeholder: CAMP. HOSPITAL promoted to designed-not-built roster
  (health, mid game).
- Topbar: note + gear top-right, click-only, one panel at a time;
  volume = 2 drag bars (persisted goodbyes_opts, audio not wired);
  settings = MAIN MENU.
- Save v3 localStorage (v2 accepted); autosave 10s + visibilitychange;
  wipe gags autosave. Debug backtick/#debug (grants, x1/x5/x20,
  save/wipe, IDS = tile names on the board, also #ids hash); #game
  skips menu; page-chrome VIEW toggle + RESET.
- Code: 25 components (src/core game world survivors ui assets) +
  main.js (boot only). Cap ~500 lines/file.

## Structure
- index.html + src/ + asset/tiles/ (game art, gitignored, code
  fallbacks on public repo) + asset/faces/ + asset/soundtrack/
  (reserved) + ref/ (gitignored) + dev-itch.html. STYLES.md +
  TO-DO.md = user's.

## Dead ends (never revisit)
- Turns; text walls; instructional text.
- Redrawn/embellished reference art; template re-skins across
  candidates (fresh means fresh); runtime stamp decimation.
- 2:1 foreshortened tiles; shear view; billboard squares.
- Fog speckle dissolve (replaced by reveal rule).
- Shine/glow hover; smooth vector look; accent colors on mono tiles.
- Off-grid art resampling (gritty); the 2/3 board scale (98/102
  stamps); white selection outline.
- Checker-edge frontier; vertex-tick selection; map name labels;
  speech bubbles (parked till told); TOWN idle panel.
- Fractional window-fill default; full-row progress bars.
- Oversized grocery; pyramid rubble; hair below shoulders.

## Open / next
- COMBAT DEPTH (user deliberating 07-12): direction = fights resolve
  autonomously (prep is the game, fight is the exam); 2-3 weapons at
  ~15 materials; blueprint -> workshop -> weapon chain; stats decided
  after first combat playtest. Tile candidates listed in TILES.md.
- TILES.md = user's tile + tier working sheet (scout bases 12/24/36s,
  shelter 2/4, tier map, zombie draft). User editing pass pending;
  sync game + this file after.
- Enemy pick; stat system; survivor count; safe-opening pacing.
- Remaining tile icons in the extracted language (food, scrapyard,
  camp, park, lot, police): user references or derive from the two
  extracted ones.
- Label naming pass (SCRAPYARD/CAMP/CACHE).
- Audio hookup behind volume bars; music player (loop, crossfade,
  tab-switch resume).
- Survivor marker design pass (user-approved before adding).
- Permadeath review; shelter capacity effect; fatigue caps;
  enemies/ring 2; SFX; player-facing reset; prestige build-out.
