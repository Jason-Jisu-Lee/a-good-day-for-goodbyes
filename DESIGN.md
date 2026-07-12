# A Good Day for Goodbyes

TITLE LOCKED 07-11. Repo github.com/Jason-Jisu-Lee/a-good-day-for-goodbyes.
All dates = 2026. 3rd game. Survival + incremental. 1-bit minimalist.
960x540 16:9, desktop first, itch then Steam. Canonical file; updates
with every design decision.

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
- Origin 2x2: FOOD / RESIDENT / MYSTERY / RUBBLE (Material sink).
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
  time = base/(1+r+r^2+...), r=0.65. Gathering linear per survivor.
- Temp tasks (scout/reclaim/clear) LOCK the survivor till done (or
  death); gather interruptible.
- Scouted != reclaimed: dim 0.55 till owned.
- Input accelerators (drag assign) parked.

## Reveal rule (07-11; fog REMOVED)
- No fog. Undiscovered = pure black, nothing drawn, unclickable.
- Adjacent unknowns = dim "?" diamonds.
- Reveal (scout) populates "?" on EDGE-adjacent neighbors (never
  diagonal). Persists all game EXCEPT start: origin four only
  (3 known + mystery "?"); the 8 edge-adjacent ring tiles appear on
  first mystery reveal.
- STREETS: Rebuild dashed centerlines between drawn tiles. Full gray
  in town; extend INTO "?" tiles fading aggressively, gone ~60% in,
  never reach the far end. At start: contained in origin block.
- Day counter bottom-left, dim.

## Balance v1 (tune by feel)
- Start 10 food (07-11, was 8).
- FOOD 5/min/gatherer; MATERIALS 6/min/gatherer; eating 2
  food/min/survivor (1 per 30s; 07-11, was 3/min).
- SCOUT 15s; RECLAIM 20s (lot/cache 10s); CLEAR 20s + 20 Materials
  (refund on cancel). Day 90s. Walk speed 80 px/s (07-11; the tuned
  small-board feel 53 rescaled x1.5 with the restored board).
- Mystery roll: grocery 40 / cache 35 / lot 25. Cache pays 25
  Materials. Camp reclaim = recruit (bag JUNE OKON IVY CALEB NOOR
  SAGE), tile -> lot. Max 6 survivors.

## Visual language (LOCKED, extracted from user's 123.png)
- Diamond lattice, military projection (sx=wx-wy, sy=wx+wy), grid
  45deg; pitch (96,60); tile diamond 132x84 (hw66 hh42); corridors
  ~32px; portrait sc 0.5. ORIGINAL APPROVED SCALE RESTORED (07-11
  evening, "make it the same as the png"): the 2/3 shrink attempts
  are dead.
- PITCH TRUTH (07-11, measured from diamond stair steps, 2 art px
  per step): reference art pixel = ~8.28 source px. The approved
  stamps = EXACTLY 2 screen px per art px (native x2). Clean sizes
  are ONLY native x2 (current, 150/155 stamps) and native x1 (half,
  ~75/78 stamps, needs a proper extraction pass). Anything between
  resamples off-grid = gritty. Earlier ~12.2 pitch claim was wrong.
- CANONICAL ART = lossless 123.png crops, bicubic 1:4 + threshold
  100 (reproduces the approved originals to 99+%): ref_house150
  (150x128), ref_apt155 (155x158), ref_tile155 (155x158, from the
  apartment's own base edges). Sources in ref/ (gitignored, never
  pushed): 123.png, ref_house.png, ref_apt.png, ref_tileA.png. Never
  redraw, never runtime-resample; resize = re-derive from sources.
  Building:tile ratio fixed forever.
- Unknown "?" = 0.45-alpha tile stamp + 5x7 "?". Icon-less kinds =
  5x7 labels (FOOD SCRAP RUBBLE CAMP CACHE; SCRAPYARD/CAMP/CACHE =
  placeholder names, user names later).
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
- VIEW: integer stage scaling default; dev toggle AUTO <-> ITCH 960.
- Stage edge: barely visible #1c1c1c outline.

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
- Tone: classy understated jazz vs playful 1-bit art; the contrast is
  a pillar, neither side drifts. Music = pre-made files (keep license
  record per track); SFX procedural WebAudio.

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

## Current build (07-11, v14 scripts)
- Menu: NEW GAME / SETTINGS / QUIT GAME (+ dead WISHLIST/DISCORD);
  NEW GAME becomes CONTINUE when a save exists (07-11).
  SINGLE SESSION: one save slot, ever. ABANDON lives in the IN-GAME
  gear panel under MAIN MENU (07-11, moved off the main menu):
  2-click confirm (ABANDON -> ABANDON?), clears save + memory, exits
  to menu (now showing NEW GAME).
- Origin randomized (grocery/house/rubble/mystery) + ring bag
  (2 scrap, 1 grocery, 1 apartment, 1-2 camps, rest lots).
- Live: scout/reclaim/clear/gather, crew picker with live duration
  ("+N/MIN" / "NS"), locked-survivor dimming, hunger pause, recruits,
  mystery roll, reveal rule, streets.
- HUD: FOOD + "+x/MIN" "-y/MIN" + breakdown tooltips ("2 X 5/MIN");
  MATERIALS hidden till first; DAY bottom-left.
- Topbar: note + gear top-right, click-only, one panel at a time;
  volume = 2 drag bars (persisted goodbyes_opts, audio not wired);
  settings = MAIN MENU.
- Save v3 localStorage (v2 accepted); autosave 10s + visibilitychange;
  wipe gags autosave. Debug backtick/#debug (grants, x1/x5/x20,
  save/wipe); #game skips menu; page-chrome VIEW toggle + RESET.
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
