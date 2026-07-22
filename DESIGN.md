# A Good Day for Goodbyes

TITLE LOCKED 07-11. Repo github.com/Jason-Jisu-Lee/a-good-day-for-goodbyes.
All dates = 2026. 3rd game. Survival + incremental. 1-bit minimalist.
960x540 16:9, desktop first, itch then Steam. Canonical file; updates
with every design decision. Cleaned 07-20: superseded generations
removed, all numbers re-verified against code.

## Identity (TURN-BASED, user-locked 07-16)
- Rebuild-shaped turn game. DAY = turn counter; END DAY button
  (bottom-center) resolves everything. Real-time sim DEAD: no /min,
  no /sec, no wall-clock timers, no real-time progress bars.
  (The 07-09 "real time, no turns ever" lock was reversed by the
  user 07-16; real-time is now the dead end.)
- Town grid; reclaim tile by tile. Feel: A Dark Room reveal pacing +
  Rebuild reclaim, no text walls.
- ACTIVE gameplay; SILENT time pressure (felt, never a countdown UI).
  Days advance only by player action, so pressure stays player-paced.
- Run skeleton (07-13, pre-dates the 12x12 board): prestige tile
  mid-depth, bunker finale (harder remix), multiple prestiges
  expected. Depths said "prestige at tier 4, bunker after tier 8";
  board is now tiers 0-10, so the depths need a user re-pin (OPEN).

## Story
- THE LAST TOWN (user 07-13, "straight apocalypse"): a void ate the
  world; one town holds it out with failing light. Player strips the
  surface to stock the bunker before the light dies. Prestige = one
  more expedition wave back up (surface re-swallowed between trips =
  the reset). Goodbyes = the town, the surface, volunteers who go up
  knowing the door may close without them. The void needs a name
  (user names it). Told show-don't-tell: found-tile vignettes.
- Converging, NOT locked (07-16): RECORD ROT + MC-caused + time
  machine = restore-from-backup.
- ENEMY = THE BLACK (user 07-13). Threatened tiles fade; no enemy
  art, no drawn creatures, ever. All old-enemy drafts purged
  project-wide 07-19 (user order).

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
   real (MATERIAL hidden till first material). Every future system.
5. CLEAN NUMBERS: player-facing integers only.

## Run shape (acts)
1. Early: land with nothing, tiny origin, scavenge.
2. Mid: expand tier by tier, recruit, automate, hold equilibrium vs
   escalating pressure.
3. Late: equilibrium breaks; ground unholdable; one plot hides the
   sealed bunker.
4. Late-late: take bunker section by section, self-sustaining = win.

## Board + tiles
- 12x12 grid, chess names A-L x 1-12, origin 2x2 block F6 G6 F7 G7.
  Tiers 0-10 = Manhattan ring distance from the origin block (sizes
  4/8/12/16/20/24/20/16/12/8/4, corners = tier 10). Maps + tile
  table = TILES.md (user's sheet; Claude syncs newgame.js bags after
  user edits; row sums must equal tier size).
- Tile kinds (code id = player name): house HOUSE, house2 APARTMENT
  (kept, currently in no spawn bag), grocery FOOD, scrap MATERIAL,
  rubble RUBBLE, camp CAMPFIRE (label locked 07-21),
  cache SUPPLY CACHE, light LIGHT, lot EMPTY LOT, pr EMBER (spawn 0
  for now, code kept; percentage discussion pending), mysteryroll
  UNKNOWN (origin only).
- Origin bag: 2 house + 1 grocery + 1 mystery, shuffled; the three
  non-mystery tiles start owned. Mystery illuminate = becomes a
  MATERIAL or FOOD tile (50/50) + opens the board (user 07-22; no
  longer recruits, for cap 4).
- Tier bags (newgame.js): t1 = camp/grocery/scrap/rubble/4 lot; t2 =
  camp/2 grocery/scrap/rubble/cache/2 light/4 lot; t3-t10 =
  grocery/scrap/rubble/lot mixes, lot-heavy mid tiers, bags shrink
  outward (t10 = grocery/2 scrap/lot). RECRUIT SOURCES = exactly 1
  CAMPFIRE each in tiers 1/2/3, 0 elsewhere (user 07-22, cap 4).
  LOT counts flattened 07-19; freed mid-tier slots = TBD column in
  TILES.md (24 total), kinds decided later, generate as EMPTY LOT.
- Reveal rule (no fog): undiscovered = pure black, nothing drawn,
  unclickable. Drawn = owned tiles + origin block + (once the board
  is opened) anything edge-adjacent to an owned tile. Unowned drawn
  tiles render as dim tile stamps (0.4 alpha). New game shows the
  origin four only.
- EMPTY LOT REBUILD (user 07-19, direction, not built): a lot can be
  rebuilt into a FOOD, MATERIAL, or HOUSE tile. Cost/time/rules
  pending.

## Turn economy (per END DAY; numbers verified in code 07-20)
- Start: 20 FOOD, 0 MATERIAL, 1 survivor (MARA), origin block.
- Each owned FOOD tile +1, each owned MATERIAL tile +1, passive.
  Meta-upgraded +2/DAY tiles (t.b2) pay +2 passive instead.
- GATHER (live, stationing): default tiles cap 1 slot; each
  stationed survivor adds +3/DAY on top. Interruptible (STOP).
- Each survivor eats 2 FOOD per day. STARVATION (user-locked 07-21,
  deficit-based): a survivor dies only when the meal cannot be
  covered (food spent > food available; breaking even to exactly 0
  is SAFE). ESCALATING: consecutive starving days kill 1, then 2,
  then 3... (G.starveStreak, reset to 0 by any non-deficit day).
  Deaths prefer NON-MC survivors; MARA dies only when she is the
  last one left. Red STARVED beat per death (tile-less, at the
  dying survivor).
- SUPPLY CACHE reclaim = 2-5 MATERIAL or 2-5 FOOD (50/50 which,
  amount rolled; CACHE_ROLL).
- RUBBLE: CLEAR costs 10 MATERIAL, takes 1-2 days (rolled per tile).
  Finish pays 40% +5 FOOD / 30% PLACEHOLDER1 / 30% PLACEHOLDER2
  (item identities TBD; counts shown in HUD once owned).
- CAMPFIRE illuminate = recruit (bag REED JUNE OKON, fallback ASH);
  the tile STAYS CAMPFIRE with its label, like FOOD/MATERIAL (user
  07-21). Exactly 3 campfires per run (tiers 1/2/3). ROSTER CAP = 4
  (SURV_CAP, user 07-22): MARA + 3 recruits. Future (not built):
  CAMPFIRE can be CLEARED and re-used. HUD still shows current /
  housing cap (owned house+apartment count); housing gate rule OPEN
  and now separate from the roster cap (flag: HUD may want /4).
- LIGHT tile (2 in tier 2, the only light source yet): reclaim = +1
  LIGHT, tile becomes lot, "+LIGHT" float. HUD LIGHT counter appears
  at first point. More sources/tuning later.

## Illuminate + risk (UNIFIED SURVIVOR-DAY MATH, user-locked 07-17)
- Verb = ILLUMINATE (user 07-21, replaces RECLAIM everywhere
  player-facing, covers defending too; "illuminate darkness"; code
  keeps "extinguish" internally). Untick-all resets progress.
  Death = CONSUMED. Attacked undefended tile = "CONSUMED IN 1 DAY".
- Tile strength S = tier (min 1). CONSUMED count: S<4 = 0, S 4-5 =
  1, 6-7 = 2, 8-9 = 3 (floor((S-2)/2), auto-extends). MIN CREW =
  consumed count (min 1); below it = picker gates START.
- Need = S - crew + 1, shifted by (consumed-1) at high strength;
  days = need clamped 1..3 (DAYS_CAP); each need point past the cap
  = +33% risk (33/66/cap 99).
- Risk = ONE roll for the group at completion; takes exactly the
  consumed count at random; whole crew consumed = job fails (tile
  stays dark). Tiers 1-3 risk-free = intended pacing brake.
- T6@2crew = 33% lose-both gamble = INTENDED (user confirmed).
- FUTURE (user, not built): tools/items/prestige grant "+1 survivor
  worth" of strength, likely light-themed pending story.

## Attacks = CREEP (turn-scale; named 07-20, was SIEGE)
- First attack day 5-7 (rolled at new game), second gap 5-6, later
  gaps 4-7.
- Strength by ARRIVAL DAY, not count: day<8 = 1, then +1 per 4 days,
  UNCAPPED forever (late attacks outpace bare crews = prestige
  pressure).
- Defense = same survivor-day ladder, multi-day (DEFEND, same crew
  math vs the attack strength); tile holds while defended;
  abandoned/lost roll = TAKEN.
- Visuals: attacked tile = slow alpha pulse + panel "UNDER ATTACK" /
  "FALLS NEXT DAY" in danger red. Active tasks show "ND" days-left
  above the tile. Numbers reference: doc_threats.html.

## Blackout + LIGHT (07-19/20; word treatment locked from lab)
- Every 10 days the word BLACKOUT fills the screen (94% width,
  TAHOMA BOLD, world-dim 0.5 wash), plain fade in/out once (3.36s
  total, +20% user 07-21: in 0.72 / hold to 2.16 / out 1.2); click
  = fast dismiss (0.3s) only after fully faded in. Yellow #e3c15c;
  FAST (1-day) blackout = DANGER red #c8493f word = the only tell.
  Word height grows +15% per event, capped +115%.
- Lead: warning at day N*10, hit 2 days later. 1st blackout always 2
  days. From the 2nd: fast (1-day) chance = 5% x (events-1), capped
  40% (user 07-20; was 7%/100%), rolled at the warning.
- At the hit: LIGHT >= (n+1)(n+2)/2 (3/6/10/15/21/28...) or the run
  is CONSUMED. Meet or exceed = survive, nothing else happens.
- DARK readout (retimed 07-21): "BLACKOUT N" all red next to LIGHT.
  Word fully fades -> 2s of nothing -> readout fades in VERY slowly
  (3.5s) at 1 -> counter accelerates 1 -> N over 1.3s. Shows
  through the lead window, clears on resolve. Takes the LIGHT slot
  if LIGHT = 0; EMBER shifts right on collision. Sound later.
- No light source before tier 2 = runs can end day 12; INTENDED.
- While the word is up, pointer down AND up are swallowed
  (click-through guard, 07-20).

## Run end + META (07-19)
- MC = MARA (mc flag, user 07-21). If MARA dies (combat or
  last-one starvation) the run ends IMMEDIATELY regardless of other
  survivors. Because her death ends the run, any lone survivor is
  necessarily MARA.
- SOLE-SURVIVOR STINGER (user 07-21): once the roster has reached 4
  (G.peak; = the full roster now), the first time it falls to just
  MARA, survivor_dies.mp3 plays ONCE (asset/soundtrack/, 112k mp3,
  raw in ref/, music-slider volume) - the "only the MC remains,
  endgame is near" beat. Never plays when MARA herself dies (that is
  plain game over). Stinger STOPS on run end (endRun) and on
  entering menu/shop (07-22). G.peak / G.soleMusic persisted.
- Run ends: last survivor dies, or blackout unmet. GAME OVER fades
  over the dying town (3s) -> EMBER UPGRADES shop -> CONTINUE ->
  main menu. Run save wiped; run embers bank to META on any end.
- META = localStorage goodbyes_meta {emb, upMat, upFood}; survives
  save wipes; legacy goodbyes_pr key migrates in once.
- Shop categories: MATERIAL TILE / FOOD TILE / EMBER TILE / MISC.
  Live: first two = +10% chance per point that a spawned
  material/food tile is a +2/DAY tile (t.b2), cap 3 points = 30%.
  EMBER TILE + MISC empty. Placeholders flagged: cost (1 EMBER per
  point), "+2/DAY TILE" row label, MISC category name.
- Save v10, single slot (goodbyes_save); non-v10 saves discarded, no
  migrations. Autosave: 10s interval + visibilitychange + END DAY +
  menu exit; wipe gags autosave until reload. 07-21 crash fix:
  load() never restored the recruit name/face bags, so any CAMPFIRE
  reclaim after save+reload crashed; bags now restored.

## Survivors (the heart)
- Recruiting = major event, not a stat bump. Target: name, age,
  role, short story, unique stats, face. (Current build: name +
  face + color.)
- Start = MARA alone. Colors: #e08b8b, #8bb4e0 (user-locked 1-2),
  #8bd8a0, #ddd08b, #c0a0dd, #dfae8b (placeholder pool).
- Map markers: solid circles r6 in survivor color; walk = pure
  visual (speed 40). Marker rework pending (lab_markers): minimal
  primitives rejected, user wants FEW crafted-quality options;
  CREST/BANNER/CAIRN pick pending.
- Permadeath UNDER REVIEW (07-10). Stat axes GRIT/HANDS/NERVE/HEART
  = placeholder.
- FACES = user art (asset/faces/), portraits/UI only, never on the
  play stage.

## Prestige (time rewind)
- Story device, FOUND on a late tile. Rewind = goodbyes.
- Buffs permanent but attached to survivors; that death loses the
  buff. Buffs MARGINAL (bounded axes; +1 huge).
- Lucky run wins with ZERO prestiges: compulsion, never a wall.
  Designed moment = next tile feels too slow/expensive.
- Resources = the prestige currency; pushing deeper tiers = more
  resources + higher-quality tiles (07-13 direction).

## Pressure
- Recurring attacks, harder over time (arrival-day ladder), damage
  survivors.
- Missing an event costs nothing (absent reward, never penalty).
- Early/mid danger scales with days the player chooses to spend;
  never a wall clock.
- LATE RULE-BREAKS = story beats: uninvited attacks, players meant
  to be caught off guard = the ground is ending.

## Darkness direction (open design space, 07-15)
- Intensity concept: DENSITY direction liked but "not intuitive
  enough"; NO number, NO "strength" word player-facing.
  Encode-in-rendering (tile erosion) proposed, needs user eyes.
- FEED direction (dark = hungry, bargain/sate) + RAID risk/reward
  direction both liked; light/connection mechanics REJECTED ("boring
  puzzle game"). Feed materials brainstormed: deuterium/isotopes/
  antimatter/magnetite/phosphor (scientific salvage, distinct feed
  verbs). Nothing built.

## END DAY beats (user-locked 07-20 from lab/lab_endday.html; BUILT
07-21, refinement pass later)
- On END DAY, resolutions play as sequential BEATS, one per resolving
  task, random order. VARIABLE DWELL (user 07-21, industry-standard
  two-tier): routine beats (resource illuminated, still-working)
  ~0.5s, dramatic beats (SURVIVOR / CONSUMED / TAKEN / HELD /
  STARVED) ~1.25s; each successive beat shaved ~6% (floor 60%) so
  big turns do not drag. Click anywhere mid-sequence = skip all
  (the confirm-all). Speed/skip preference toggle = deferred.
- STYLE = SPOTLIGHT (user pick, "more obvious"): world dims like a
  small blackout, only the resolving tile stays bright, crew pulses
  on it; snaps back between beats.
- AUDIO = WARM JAZZ BLIPS (user pick): procedural WebAudio per
  action: material thunk+resolve, food pluck, survivor rising
  3-note arp, cache coin blips, still-working muted low tick.
- Beat events: illuminate complete (tile kindles + kind reveal),
  survivor found, food/material tile, cache payout, still-working
  (tile stays dark), defense HELD / TAKEN, all-crew-consumed FAIL,
  STARVED (tile-less beat at the dying survivor).
  Undefended falls + gather/passive floats stay instant (no crew =
  no beat). Resolution floats (+N, CONSUMED...) emit at each beat's
  end; resolved tiles keep their pre-END-DAY look until their beat
  plays. Blackout word waits for the last beat. Run end skips beats
  entirely. SFX volume = the note panel SFX slider.
- Implementation: src/ui/beats.js; sim.js endTurn captures events;
  input swallows all clicks during playback (any click = skip all).
  Refinement pass later (user: "we'll refine this UI later").

## UI (current build)
- SURVIVOR ROSTER (user 07-21): left side under the HUD block
  (src/ui/roster.js): one row per survivor, color dot + name +
  status (IDLE / RECLAIMING / DEFENDING / GATHERING). IDLE rows
  bright, busy rows dim, so all-dim = everyone occupied = ready to
  END DAY.
- MENU VISUALIZER = TOWN LIGHTS (user-locked 07-21 from
  lab_menuviz8 v3, replaces the bar skyline; refine later): a dark
  town along the menu bottom whose WINDOWS light only when a note
  actually strikes (spectral-flux onsets, low/mid bands ONLY so
  jazz hi-hat/brush texture is ignored), each drum beat wakes one
  whole building, lit windows cast a faint reflection below the
  horizon, and silence puts the whole town to sleep (quiet gate).
  v2 tuning (07-21, user: v1 read as random pops over darkness):
  HYBRID = ambient occupancy layer (windows fill/empty with the
  phrase loudness envelope, each window at its own threshold, so
  the town visibly breathes with swells and is never dark while
  music plays) + onset snaps (hat-band masked, adaptive salience,
  180ms band cooldown, ~10 lights/sec budget) + BEAT = GLOBAL
  brightness surge (the wake-one-building pop removed, illegible). menuAudio() in audio.js = the event engine
  (onsets/beat/quietK); menu.js renders. LOCAL CAVEAT: file://
  cannot analyse audio, shows sparse synthetic events; real
  reaction on http://localhost:8123 (dev-serve.js) or itch.
- HUD: FOOD + "+N/DAY" "-N/DAY" rows; MATERIAL once first seen;
  LIGHT when >0; BLACKOUT readout when armed; EMBER when >0;
  PLACEHOLDER1/2 item counts when owned; SURVIVORS n/cap; DAY
  bottom-left, dim. END DAY button bottom-center.
- Selection = panel only, no map marker. Hover = LIFT (3px ease).
  Panel: DARKNESS + days estimate for dark tiles; RECLAIM / DEFEND /
  CLEAR / GATHER / STOP / PULL BACK verbs; crew names, "N% RISK" in
  red, "N DAYS LEFT".
- LIVE CREW ASSIGN (user 07-20, replaces START button): clicking a
  survivor row assigns them to the tile's action INSTANTLY; more
  clicks add crew; clicking an assigned row removes them. No
  START/CANCEL (click away / ESC closes, ESC also deselects).
- ONE-CLICK ACTION FLOW (user 07-21): selecting a tile whose only
  action is obvious opens the survivor list DIRECTLY, no verb
  button. Applies to: dark illuminatable tiles (RECLAIM button
  gone) AND owned FOOD/MATERIAL tiles (GATHER button gone). Tapping
  an assigned survivor unassigns; CREW + PULL BACK + STOP buttons
  all removed (untick everyone = old pull back / stop, progress
  reset unchanged). Attacked tiles too (07-21): selecting one opens
  the illuminate list directly, ILLUMINATE button removed - no verb
  buttons remain anywhere.
- Panel header (tile name / "?" / UNDER ATTACK) centered (user
  07-21).
- HUD COUNTERS ANIMATE (user 07-21): FOOD / MATERIAL / LIGHT /
  EMBER ease from old to new value after END DAY (tickHud, ~0.15s
  to close) instead of snapping, so the cost of ending the day is
  felt. Visibility gates + rate rows still use the real values.
  PLACEHOLDER RULES (Claude, need user verdict): adding crew
  mid-task never resets progress (days = min(current, recomputed));
  removing crew recomputes fresh (progress reset, same as PULL
  BACK); crew below the minimum = task idles with red NOT POSSIBLE
  (defense below minimum = tile falls at END DAY, matching the old
  cannot-start rule).
- UNKNOWN LAW (user 07-21, hard rule): an unclaimed tile NEVER
  reveals its kind, anywhere (no tile label, no panel hint). The
  not-knowing is the point of reclaiming. A 07-21 label pass
  violated this and was reverted same day. The request actually
  meant: OWNED camps must stay labeled CAMPFIRE tiles, not convert
  to blank lots (built 07-21, see Turn economy).
- Floor fill geometry corrected 07-20: art diamond measured from
  smooth_tile.png ink (center y+3, half 35.5x17.5 at x1) -> floor
  center y+3*sc, half 31.5x15.5. The first pass used the input hit
  diamond and sat 4px high.
- Floating text on grants ("+N", "+LIGHT", "PLACEHOLDER1"...), rises
  and fades, rAF-driven, cosmetic, never saved.
- Zoom: 9 fixed levels, 0.75x-1.75x, default 1.25x dead center, step
  0.125; wheel notch = 1 level, pinch snaps; transient right-edge
  zoom bar with 9 ticks, fades ~1.4s after last input (indicator
  only).
- Recenter: double-click/tap empty space snaps camera to origin
  (zoom untouched; 400ms window, 24px slop). Single empty click
  still deselects. No hint; discoverability accepted.
- Pan clamp: camera bounds = currently drawn tiles' bbox (margins
  160px X / 120px Y); bounds grow as tiles reveal.
- Tutorials: ALL text tutorials deleted 07-20 except the zoom tip
  (left side, vertically centered, appears day 3-5 until dismissed).
  Tutorial visuals need a rework pass later (user: current style
  sucks, direction unknown).
- Topbar: note (volume panel: music + SFX sliders, persisted) + gear
  (display mode cycler / MAIN MENU / ABANDON with 2-click confirm).
  Menu mute note top-right on the main menu.
- Menu: CONTINUE (or NEW GAME) / SETTINGS / QUIT GAME + dead
  WISHLIST/DISCORD placeholders. KNOWN GAP: SETTINGS button has no
  click handler (display modes live in the in-game gear panel + dev
  VIEW button).
- Menu music: asset/soundtrack/main_screen.mp3 loops on the menu,
  stops entering the game, resumes on return; volume slider live;
  mute persisted. No in-game music yet; SFX not built.
- Debug (outside stage, backtick/#debug): +25 FOOD / +25 MATS /
  +SURV grants, speed X1-X5/X20, stat line, VIEW display cycler,
  RESET wipe. #game hash skips menu.

## Visual language (LOCKED)
- Diamond lattice, military projection (sx=wx-wy, sy=wx+wy), pitch
  (48,24) TRUE 2:1 (pitch must equal the art's edge slope or
  corridors stagger). Tile diamond 69x34.5 (hit 34.5/17.25);
  corridors ~12px strips.
- PITCH TRUTH (07-11): reference art pixel = 8.0 source px EXACT.
  Clean sizes ONLY native x2 (150/155 set, kept in asset/tiles/) and
  native x1 (75/77 set, live). Anything between = gritty. Never
  redraw, never runtime-resample; resize = re-derive from ref/
  sources (gitignored, never pushed).
- SMOOTH ART LIVE = canonical (user's smooth.png extracted
  VERBATIM): smooth_house_only + smooth_apt_only (ring line
  surgically removed so the building sits on the real smooth_tile) +
  drawn smooth_tile. Alpha-baked silhouettes, source-over, painter
  order (gx+gy) = true occlusion. 07-20: leftover opaque-black crop
  bg flood-filled to alpha (the dark-aura fix), assets ?v=2. Pixel
  set retained in asset/tiles as fallback. Claude-generated smooth
  attempts stay dead.
- BUILDING SHRINK: house/apt stamps at 80% around the baked slab
  midline; full smooth_tile under both, footprint unchanged.
- World ships at x1 stamps; fullscreen k=2 renders the approved
  density (2 screen px per art px).
- STREETS FINAL (07-12): faint yellow dashed lanes rgba(214,192,118)
  55%, width 1.3, continuous maximal runs, 4 dashes per tile span;
  corridors flanked by an owned tile = full alpha; fading extensions
  only where a town road continues away and dies over one tile span;
  short corner tails at run ends.
- TEXT + ICONS VECTOR (07-12): all text = anti-aliased system type
  (Segoe UI stack; text7 body / text3 small in font.js); gear, note,
  speaker etc. = canvas-path icons. Bitmap 5x7/3x5 glyph fonts dead.
  BLACKOUT word = Tahoma bold.
- Icon-less tile kinds = text labels (FOOD MATERIAL RUBBLE CAMP
  CACHE LIGHT EMBER); proper icons pending user references.
- Display modes (STAGE LAW v4, full spec in CLAUDE.md): WINDOWED
  fixed 960x540 / BORDERLESS adaptive viewport (wider screens see
  MORE WORLD, caps 1720x720) / FULLSCREEN = borderless + API.
  Never render fractional. Stage outline windowed only.

## Art/UI direction
- Very minimalist 1-bit, dark. Color earned slowly. Red reserved for
  danger.
- Color plan 60-30-10: near-black 60 / off-white 30 / 10 =
  per-category muted tile hues (Gnorp-style small doses, 4-6 max).
  Proposal pending user OK: color arrives on RECLAIM. Hues via lab.
- FACES: navy-ringed circle, navy hair/eyes, no nose/mouth, gray
  shoulders; read SLIGHTLY depressed via subtly downcast eyes only.
- Tone: classy understated jazz vs playful minimal art; the contrast
  is a pillar, neither side drifts. Music = pre-made files (license
  record per track); SFX procedural WebAudio.

## Maintenance metrics (roadmap)
- EARLY: food, shelter, MATERIAL. MID: defense, health, recruiting.
  LATE: full pressure + HAPPINESS. Some tiles drop ITEMS (p1/p2
  placeholders live).

## Pricing
- Deliberately odd (e.g. 9.73, never 9.99); the number appears
  in-game as tribute.

## Dead ends (never revisit)
- REAL-TIME sim/economy: per-minute rates, wall-clock tasks, hunger/
  eat timers, scout verb, gather-rate diminishing returns (turn
  pivot 07-16 killed all of it).
- Extinguish-era math: additive POWER, death % per point under
  strength, neighbor softening, DARK_TIER tables, strength pips,
  BROKEN TOOL power item (replaced by survivor-day math 07-17).
- Blink/flash as attack signal (now slow pulse). Danger bar above
  tiles.
- Text walls; instructional text tutorials.
- Redrawn/embellished reference art; template re-skins (fresh means
  fresh); runtime stamp decimation; off-grid art resampling; the 2/3
  board scale.
- 2:1 foreshortened tiles; shear view; billboard squares; fog
  speckle dissolve; bitmap glyph fonts.
- Shine/glow hover; smooth vector look; accent colors on mono tiles;
  white selection outline; checker-edge frontier; vertex-tick
  selection; map name labels; speech bubbles (parked till told);
  TOWN idle panel.
- Fractional window-fill default; full-row progress bars.
- Oversized grocery; pyramid rubble; hair below shoulders.
- Drawn enemy creatures of any kind.

## Open / next
- Crafting/combat gate: user owes the crafting-unlock verdict from
  the 07-13 external design session (blueprint-per-scout rejected;
  minimal real-life-ish gate wanted; library liked; workshop-only
  too cheap; TILES.md combat block). Then the first combat/crafting
  slice. Direction: fights resolve autonomously (prep is the game,
  fight is the exam); 2-3 weapons ~15 materials; stats after first
  combat playtest.
- Tile visual design IN PROGRESS (m2/tiles_design branch).
  OWNERSHIP READABILITY = FLOOR FILL, BUILT 07-20 (user pick from
  lab/lab_ownership.html, scoped by user to EMPTY LOTS only since
  other kinds get their own visuals later): owned lot = solid dark
  floor (#20201e, diamond inset 3.5) under the tile stamp; all
  other owned kinds unchanged; unowned stay hollow 0.4-alpha
  wireframe. Town = solid ground, dark = hollow. Verified headless
  (first load unchanged, forced-lots shot). Labs live in lab/;
  delete the folder once everything in it is locked.
- TILES.md editing pass (user); TBD column kinds (24 slots); sync
  bags after.
- Balance verdicts: housing gate (HUD shows /houses, roster cap is
  now a separate hard 4 - decide if HUD should show /4); attack
  tuning
  (placeholder ladder); EMBER tile spawn %; run-skeleton depth
  re-pin (prestige/bunker tiers vs 0-10 board); pacing pass.
- EMPTY LOT REBUILD rules; PLACEHOLDER1/2 item identities; shop
  EMBER TILE + MISC categories; upgrade costs.
- Survivor marker pick (CREST/BANNER/CAIRN); tile icons (user
  references); naming: void name, MISC name.
- Darkness rendering (density/erosion, needs user eyes); story lock;
  survivor stat system; permadeath review.
- Tutorial visuals rework; SETTINGS menu button no-op; WISHLIST/
  DISCORD links; audio: SFX + in-game music hookup.
- Prestige build-out; shelter capacity effect; fatigue caps;
  HOSPITAL (designed-not-built, health, mid game).
