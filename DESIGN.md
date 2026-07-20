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
countdown UI). Fixed skeleton: tiers 0-8, prestige tile at tier 4,
bunker after tier 8 (harder remix, finale), multiple prestiges
expected; material + resident tiles core; early food bleed intended.
- ENEMY DECIDED (user 07-13): THE BLACK. No enemy art needed;
  threatened tiles FADE instead of hosting drawn enemies. All prior
  enemy drafts purged project-wide 07-19 (user order).
- NEW START (user 07-13 intent): 1 tile, 1 survivor.
- RESOURCE TILES stay; resources = the PRESTIGE currency; pushing
  deeper tiers = more resources + higher-quality tiles. Rest of the
  mechanics TBD ("a lot of mechanic is going to change").
- STORY DIRECTION CHOSEN (user 07-13, "straight apocalypse"): THE
  LAST TOWN. A void ate the world; one town holds it out with
  failing light. Player strips the surface to stock the bunker
  before the light dies. Prestige = one more expedition wave back
  up (surface re-swallowed between trips = the reset). Goodbyes =
  the town, the surface, volunteers who go up knowing the door may
  close without them. The void needs a name (user names it). Told
  show-don't-tell: found-tile vignettes, no text walls.

### 07-16 TURN-BASED PIVOT (user-locked; supersedes ALL real-time
economy below)
Game is turn-based, Rebuild-shaped. Real-time sim DEAD: no /min,
no /sec, no wall-clock timers, no real-time progress bars. DAY =
turn counter; END TURN button (bottom-center) resolves everything.
- Economy per END TURN: each owned FOOD tile +2, each owned
  MATERIAL tile +1 (passive, no stationing; GATHER verb + slots
  REMOVED), each survivor eats 3. Numbers user-locked.
- RECLAIM = fixed turns per tier (T1=1 T2=2 T3=3), any crew size;
  power only affects death roll on the finishing turn (tier<=1
  safe as locked). PULL BACK resets progress. Tile shows "NT"
  remaining while worked.
- ATTACKS (turn-scale, Claude placeholder numbers, NEED TUNING):
  arm 3 turns after first tier-1 claim, one attack per 3 turns on
  highest-tier owned frontier tile; attacked tile = dimmed + red
  stamp + "FALLS NEXT TURN"; any defender assigned by next END
  TURN repels it ("HELD"), else tile lost ("TAKEN").
- Hunger/eat timers DEAD. Starvation OPEN: food floors at 0 with
  no penalty yet; user must pick a rule.
- Balance flag (watch-equilibrium): start = +2/-6 = net -4/turn,
  10 food = 3 turns of grace; tier-1 holds 1 food tile (+2 =
  net -2). Deliberately tight or needs retune; user verdict
  pending after playtest.
- Save v6 (v5 saves discarded -> NEW GAME). Survivor walk stays
  as pure visual. Verified: 26-check node turn test ALL PASS +
  #game screenshot.

### 07-17 UNIFIED SURVIVOR-DAY MATH (user-locked)
One rule for tiles + attacks: need = strength - crew + 1 survivor-
days, shifted by (consumed-1) at high strength; days = need capped
at 3; each day past the cap = +33% risk (33/66/99). CONSUMED
count: strength 4-5 = 1 survivor, 6-7 = 2, 8-9 = 3 (floor((S-2)/2),
auto-extends). MIN CREW = consumed count; below it = NOT POSSIBLE
(picker gates START). Risk = ONE roll for the group at completion,
takes exactly the consumed count at random; if the whole crew is
consumed the job fails. T6@2crew = 33% lose-both gamble = INTENDED
(user confirmed). Tiers 1-3 risk-free = intended pacing brake (day
cost delays expansion; post-prestige bonuses speed it later).
- ATTACKS: first day 5-7, second +5-6, third+ +4-7. Strength by
  ARRIVAL DAY (not count): d5-7=1, 8-11=2, 12-15=3, 16-19=4,
  20-23=5, UNCAPPED beyond (grows +1 per 4 days forever; late
  attacks outpace bare crews = prestige pressure). Defense = same
  ladder, multi-day; tile holds while defended; abandoned/lost
  roll = TAKEN.
- FUTURE (user, not built): tools/items/prestige grant "+1
  survivor worth" of strength, likely light-themed pending story;
  effective crew = survivors + gear.
- 6x6 board tops at tier 4 corners; tier 6+ math live but waits
  for grid growth. Save v8.

### 07-19 TILE PAYOUTS (user)
- SUPPLY CACHE reclaim = 2-5 MATERIAL or 2-5 FOOD (50/50 which,
  amount rolled; CACHE_ROLL in balance.js). Supersedes flat +10.
- EMBER tile spawn = 0 for now (removed from all tier bags;
  finish/HUD code stays for later). Percentage discussion pending.
- Per-tier tile count table lives in TILES.md (user plugs values,
  Claude syncs newgame.js bags). Row sums must equal tier size.
- LOT counts flattened (user 07-19: near-equal, rises slowly):
  4 5 6 6 7 7 7 4 2 1 across tiers 1-10. Freed mid-tier slots =
  TBD column (24 total), kinds decided later; TBD generates as
  EMPTY LOT in game until assigned (bags unchanged in code).
- EMPTY LOT REBUILD (user 07-19, direction, not built): a lot can
  be rebuilt into a FOOD, MATERIAL, or HOUSE tile. Cost / time /
  rules pending.
- Full tile list synced into TILES.md; all old-enemy drafts deleted
  project-wide (user order; THE BLACK is the only enemy, no
  creature art ever).

### 07-19 BLACKOUT + EMBER SHOP (user; save v10, meta storage)
- BLACKOUT event: every 10 days (day 10, 20, ...) the word BLACKOUT
  fades in and out ONCE over all UI, yellow #e3c15c (user: Valorant
  vibe, artistic, not too strong; lab_blackout.html has 4 treatments
  for user pick, plain FADE is live in game). 2 days later the
  blackout HITS: city needs LIGHT >= LIGHT_NEED (1, placeholder) or
  the run is CONSUMED (game over). NO way to accrue light yet
  (intended; light source design later). Timing will vary by many
  factors later; BO_EVERY/BO_LEAD/LIGHT_NEED in balance.js.
- RUN END flow: GAME OVER screen (3s) -> EMBER UPGRADES shop ->
  CONTINUE -> main menu. Run embers bank to permanent META on any
  run end (all dead or consumed).
- META storage: localStorage goodbyes_meta {emb, upMat, upFood},
  survives save wipes; legacy goodbyes_pr auto-migrates in.
- EMBER UPGRADES shop: 4 categories MATERIAL TILE / FOOD TILE /
  EMBER TILE / MISC. Only the first two have an upgrade now:
  +10% chance per point that a spawned material/food tile is a
  +2/DAY tile (t.b2, passive 2 instead of 1; stationed bonus
  unchanged on top). Cap 3 points = 30% (user; was 100%, tweaked
  same message). EMBER TILE + MISC empty for now.
- PLACEHOLDERS flagged for user: upgrade cost (1 EMBER each),
  upgrade row label (+2/DAY TILE), MISC category name, LIGHT_NEED
  value, in-game word treatment (lab pick pending).
- Verified: 25-check node harness (warn day 10, hit day 12, light
  survives, cycle repeats day 20/22, bank, buy caps, 30% observed
  spawn rate over 300 boards, v10 roundtrip) + headless shots
  (menu, game, shop landscape+portrait, word over UI). Dead code
  swept (blit/blitS removed); all components <=170 lines.

### 07-15 SESSION LOCKS (branch v.3)
- VERB = RECLAIM (user-locked, replaces EXTINGUISH everywhere
  player-facing; code keeps extinguish internally). Status
  RECLAIMING; defend stays DEFEND/DEFENDING.
- Survivor death by darkness = "CONSUMED" (float text, was LOST).
- Tier 1 = ZERO death risk reclaiming (deathPct 0 for tier<=1);
  danger starts tier 2.
- Currency placeholders: MATERIAL (in-run, was IG-R/SCRAP) +
  EMBER (banked, was P-R). User named.
- Tier-1 bag fixed: 1 camp + 1 food + 2 material + 2 item + 2 lot.
- Mystery origin tile always resolves to MATERIAL tile.
- HUD survivors = current/housing-cap (owned house+apt count),
  total roster hidden. OPEN: camp recruit can exceed cap (3/2);
  housing gate undecided.
- Attack visual: tile brightness dims with atk progress + DANGER
  bar above tile = time to loss (blink/flash dead). Reclaimable
  dark tile = faint outline only, strength pips REMOVED.
- Darkness intensity concept: DENSITY direction liked but "not
  intuitive enough" — unresolved; NO number, NO "strength" word.
  Encode-in-rendering (tile erosion) proposed, needs user eyes.
- FEED mechanism direction (dark = hungry, bargain/sate) +
  RAID risk/reward direction both liked; light/connection
  mechanics REJECTED ("boring puzzle game", "not a cool darkness
  game"). Feed materials brainstormed: deuterium/isotopes/
  antimatter/magnetite/phosphor (scientific salvage, distinct
  feed verbs). Nothing built yet.
- Survivor marker rework in progress (lab_markers.html): circle
  too plain; minimal primitives (pixel/tally/spark) rejected as
  "absolutely nothing"; user wants FEW crafted-quality options.

### EXTINGUISH CORE — Phase 1 BUILT (07-13)
Replaces scout/reclaim with one verb. Every unowned tile carries a
DARKNESS STRENGTH (DARK_TIER=[1,2,3] for tiers 0/1/2, stored per
tile, extensible to deeper tiers by growing the grid). Effective
strength = base - (ownedNeighbors-1), min 1 (first cleared neighbor
is what makes a tile reachable; each ADDITIONAL owned neighbor
softens it by 1). So the first tile of any tier is the hardest
"breach", then it eases as you surround = intended spike-then-relief.
- EXTINGUISH (= light + claim, one action): assign any number of
  survivors, combined POWER is additive (1 each, SURV_POWER). Fill
  time = darkEff*EXT_SECS/power (EXT_SECS=4). Finish -> owned +
  reveal kind + kind effect. Picker shows PWR n / STR m + seconds +
  risk warning; no crew cap (unlike GATHER's 1 slot).
- DEATH = PERCENTAGE (user 07-14, was per-tick): each survivor on
  the task independently rolls a fixed % ONCE at completion.
  deathPct = clamp((darkBase(tier)-power+1)*DEATH_STEP, 0, DEATH_CAP)
  = 20% per point you are under the tier's BASE strength, cap 80%,
  0% if power>base. CONSISTENT PER TIER: uses darkBase NOT darkEff,
  so surrounding a tile (fewer lit neighbors) never changes death %
  (user: "don't make it harder due to no lit tiles"). Softening now
  affects SPEED only. Tier 0 death-free (tutorial). Shown in picker
  ("N% DEATH RISK" / "SAFE") and panel. If some survive -> tile
  claimed; if ALL assigned die -> task CANCELED (tile stays dark).
  PULL BACK still retreats pre-completion.
- GAME OVER (user 07-14): when the LAST survivor anywhere dies,
  "GAME OVER" fades in over the dying town (overT ramp), then after
  OVER_DUR=3s returns to main menu. P-R PERSISTS: on death the
  run's G.pr is banked to localStorage "goodbyes_pr" (persistPR)
  for the future shop; the run save is wiped. No autosave during
  the game-over fade. Menu shows NEW GAME.
- FOUND ITEM: a BROKEN TOOL tile in tier 1; clearing it makes a
  survivor power 2 (teaches "items add power"; per-survivor equip +
  divide-the-crew strategy comes later).
- RESOURCE NAMES (user 07-13, PLACEHOLDERS): in-game resource tile +
  counter = "IG-R" (was scrap/materials; kind id still "scrap"
  internally). Prestige resource tile = "P-R" (new kind "pr", 2 in
  tier 2, clear grants G.pr +1, shown in HUD when >0; prestige spend
  deferred). User will name both later.
- DARK BLINK (user 07-13, CORRECTED 07-14): blink = the ATTACK
  signal ONLY. Frontier/unclaimed dark tiles render STATIC (faint
  stamp + strength pips). See ATTACK LAYER for the attack blink.

### ATTACK LAYER — Phase 2 v1 BUILT (07-14)
Hostile darkness. TIERS UNCAPPED: tierOf now returns real ring
distance (0-4 on the 6x6; was capped at 2). DARK_TIER=[1,2,3,4,5]
so deeper = stronger (tier 3 = str 4, tier 4 corners = str 5). Tier
3 = attacks begin; tier 4 corners = future prestige spot. Growing
to tiers 5-8 = bigger grid later.
- TRIGGER (user 07-14 REVISED to tier 1): ONLY tier 0 is safe.
  When the player claims their FIRST tier-1 tile, a 40-50s grace
  (ARM_MIN/ARM_MAX, rolled once) starts; when it elapses
  G.attackOn latches true. Silent (no countdown UI). Tier-0 tiles
  are NEVER targeted (spawner excludes tier 0), so the origin core
  can't fall = darkness eats inward but stops at tier 0.
- ATTACK: owned tiles carry atk 0..1. A targeted tile's atk rises
  1/ATTACK_SECS per sec (ATTACK_SECS=20). At atk>=1 the tile
  REVERTS TO DARK (user "after ~20s attacked, unclaim entirely"):
  production stops, must re-extinguish to reclaim, and it stops
  being an owned neighbor so adjacent tiles get slightly harder
  (loss cascades). "TAKEN" float on flip.
- TARGETING: one attack at a time (v1, gentle). ~ATTACK_EVERY=15s
  after the last resolves, darkness picks the OUTERMOST owned
  frontier tile (owned + adjacent to dark) and starts attacking.
  Scaling to multiple simultaneous / creep-inward = later.
- DEFEND: select an attacked tile -> DEFEND -> assign survivors
  (reuses extinguish verb, no crew cap). While >=1 defender is
  present atk falls (DEFEND_SECS=8 at 1 body, faster with more);
  atk 0 = secured, survivors freed. PULL BACK retreats (atk
  resumes). V1 SIMPLIFICATION: defense needs only a body, no
  power-vs-strength or death yet (extinguish claim still has both).
- ATTACK BLINK: attacked owned tile flashes RED (re-stamp danger
  tile) on a period that SHRINKS as atk rises (0.9s -> 0.3s), so a
  tile about to be taken flickers fast. This is where the blink
  the user asked for actually lives now.
- PICKER CLARITY (user 07-14): survivor rows show current job;
  BUSY gatherers show their task in their own color (so you see
  "REED IG-R" before pulling them); idle = MID "IDLE"; locked
  (extinguishing/defending) = dimmed + unselectable (PULL BACK
  first). statusOf: gather->IG-R/FOOD, extinguish->EXTINGUISHING
  (dark) / DEFENDING (owned).
- OPEN: run-end trigger (core is now safe, so NOT core-fall; TBD);
  death-while-defending; attack scaling (multiple at once, creep
  inward). All user calls once this feels right.
- Survivors: start 2, cap 6, power field, found at CAMPFIRE tiles
  (rescue on clear). Mystery origin tile = the first-extinguish
  tutorial (strength 1, auto-claims, opens tier 1). Material/food
  auto-gen, housing, food/hunger all still run untouched. Save v5.
- DEFERRED to Phase 2 (needs the core to feel right first, per
  user): hostile darkness that ATTACKS owned tiles from tier 3 and
  creeps inward; prestige resource tile + shop; the run-end trigger
  (user decides once playable). Board still 6x6 (tiers 0-2); tiers
  3+ = grow the grid later.

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
- TIERS (user 07-12, replaces "ring"; superseded 07-19: tiers 0-10
  Manhattan rings, maps in TILES.md). Grid names: chess A-L x 1-12,
  origin = F6 G6 F7 G7.
- SPEED/STAT LAW: actor speeds and balance stats are ABSOLUTE
  constants, never live-derived from another actor's stat; survivor
  upgrades never leak to enemies.
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
- THE BLACK (user 07-13, decided). Threatened tiles fade; no enemy
  art, no drawn creatures, ever.

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
- TILES.md = user's tile + tier working sheet (12x12 maps, tier
  tile table, full tile list). User editing pass pending; sync game
  + this file after.
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
