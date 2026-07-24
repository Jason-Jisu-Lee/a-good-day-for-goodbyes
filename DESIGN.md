# A Good Day for Goodbyes

Repo github.com/Jason-Jisu-Lee/a-good-day-for-goodbyes. Survival +
incremental, 1-bit minimalist, 960x540 16:9, desktop first, itch then
Steam. Canonical design doc: CURRENT STATE ONLY, no history.

## Identity
- Turn-based, Rebuild-shaped. DAY = turn counter; END DAY resolves
  everything. No real-time sim of any kind.
- Town grid; illuminate tile by tile. Feel: A Dark Room reveal pacing
  + Rebuild reclaim, no text walls.
- ACTIVE gameplay; silent pressure (felt, never a countdown UI). Days
  advance only by player action.
- Run skeleton: prestige tile mid-depth, bunker finale (harder remix),
  multiple prestiges expected. Exact depths on the 0-10 board = OPEN.

## Story
- THE LAST TOWN: a void ate the world; one town holds it out with
  failing light. Player strips the surface to stock the bunker before
  the light dies. Prestige = one more expedition wave back up.
  Goodbyes = the town, the surface, the volunteers. Void unnamed
  (user names it). Show-don't-tell: found-tile vignettes.
- Detail converging, NOT locked: RECORD ROT + MC-caused + time
  machine = restore-from-backup.
- Enemy = THE BLACK. Threatened tiles fade. No enemy art, no drawn
  creatures, ever.

## Design principles (Claude polices, flags violations)
1. IMPORTANT FUN DECISIONS: never boring/annoying; always some real.
2. DEPTH REVEALS GRADUALLY.
3. NO EARLY PUNISHMENT: real consequences ~mid game.
4. CONCEPTS ONE BY ONE: UI/metric appears when first real.
5. CLEAN NUMBERS: player-facing integers only.
- Fantasy: attention + decisions, never labor. Complete story, real
  ending, not endless.
- Run shape: scavenge -> expand/recruit/equilibrium -> ground breaks
  -> take the bunker section by section = win.

## Board
- 12x12 grid, chess names A-L x 1-12, origin 2x2 F6 G6 F7 G7. Tiers
  0-10 = Manhattan ring distance from origin block (sizes
  4/8/12/16/20/24/20/16/12/8/4). Maps + tier table = TILES.md.
- Origin (tier 0): 1 APARTMENT + 1 LIGHTHOUSE + 2 EMPTY LOTS, all
  owned; the lighthouse = 1 starting LIGHT. Board starts open (no
  mystery gateway).
- Tier spawns (TIER_SPEC): lamps + material + ember only. STREETLAMP
  0-1 in t1, 1-2 in t2, 1-2 in t3, 2 in t4; t5 = 1 streetlamp + 1
  LIGHTHOUSE. MATERIAL 1 to 1-3 rising through t1-5. EMBER 0-1 t4+,
  1 in t5. Tiers 6-10 Claude draft (material/lamps/ember pattern).
  Ranges roll uniform; EMPTY LOTs fill the rest. Tiers 1-5
  user-locked.
- Reveal: undiscovered = pure black, unclickable. Drawn = owned +
  origin + (once opened) edge-adjacent to owned. Unowned drawn = dim
  stamp, 0.4 alpha.
- UNKNOWN LAW (hard rule): an unclaimed tile NEVER reveals its kind,
  anywhere. Not-knowing is the point.

## Tiles
- MATERIAL: owned = +1/day passive (+2 if b2 meta-upgrade variant).
  PERMANENT + NOT ACTIONABLE: no stationing, no survivor tasks, no
  buttons; pure passive income. (GATHER is dead.)
- STREETLAMP: illuminate = +1 LIGHT; tile stays as a persistent
  structure. No daily production, no decay, nothing spends it while
  the tile lives. If CREEP takes it (defended-loss or undefended),
  LIGHT drops by 1.
- LIGHTHOUSE: same as streetlamp, currently +1 LIGHT (intended +2
  later, user adds). One pre-owned at origin; one spawns in tier 5.
- EMBER: illuminate = +1 EMBER banked -> lot.
- EMPTY LOT: owned lot can BUILD a MATERIAL tile: 5 MATERIAL, 1 day
  (single button). Renders with FLOOR FILL (#20201e).
- APARTMENT: origin building, no mechanical effect (open item).
- Removed from the game: FOOD, CAMPFIRE, SUPPLY CACHE, RUBBLE,
  MYSTERY, HOUSE (origin uses APARTMENT now).
- HOSPITAL: designed, not built (health, mid game).

## Economy (per END DAY)
- Start: 0 MATERIAL, 1 LIGHT, 4 survivors, origin block.
- NO FOOD SYSTEM: nothing eats, nothing starves. The survival
  pressure axis = LIGHT (blackouts; light-burn upkeep design in
  progress - user picked "the dark burns lamps", escalation + UI
  indicator options pending).
- Income: each owned MATERIAL tile +1/day (b2 +2), grouped into one
  income beat.
- Watch equilibrium after every economy change.

## Survivors
- ROSTER 4, ALL START: MARA (MC) + REED + JUNE + OKON. No
  recruiting in-run (debug +SURV only).
- MC: if MARA dies, run ends immediately regardless of roster. So a
  lone survivor is always MARA.
- SOLE-SURVIVOR STINGER: once roster has hit 4, the first time it
  falls to just MARA, survivor_dies.mp3 plays once (music volume;
  stops on run end / menu / shop). Never plays for MARA's own death.
- Recruiting = major event, target: name/age/role/story/stats/face
  (current build: name+face+color). Stat axes GRIT/HANDS/NERVE/HEART
  placeholder. Permadeath UNDER REVIEW.
- Colors: #e08b8b #8bb4e0 (locked 1-2), #8bd8a0 #ddd08b #c0a0dd
  #dfae8b (placeholder pool). Map marker = solid circle r6 in
  survivor color; walking is pure visual (speed 40). Marker redesign
  pending (CREST/BANNER/CAIRN pick).
- Faces = user art (asset/faces/), portraits/UI only, never on stage.
- DOG COMPANION: 5th survivor, a dog, found in tier 6. Parked; design
  when building tier 6 (cap? MC rules? likely exempt).

## Illuminate (the one verb; code keeps "extinguish" internally)
- Covers claiming dark tiles AND defending attacked tiles. Death =
  CONSUMED.
- Tile strength S = tier (min 1). Consumed count = floor((S-2)/2)
  for S>=4, else 0. MIN CREW = consumed count (min 1).
- Need = S - crew + 1 - max(0, consumed-1) survivor-days; days =
  need clamped 1..3; each point past the cap = +33% risk (33/66/99).
- Risk = ONE roll for the whole crew at completion; takes exactly
  the consumed count at random; whole crew consumed = job fails,
  tile stays dark. Tiers 1-3 risk-free = pacing brake. T6@2crew =
  33% lose-both gamble = intended.
- Crew rules (PLACEHOLDER, need user verdict): adding crew mid-task
  never resets progress; removing crew resets; below min crew =
  task idles, red NOT POSSIBLE; under-defended attacked tile falls
  at END DAY. Known hole: daily defender re-crewing stalls an attack
  forever without ever rolling risk (needs a rule).
- FUTURE: tools/items/prestige = "+1 survivor worth", light-themed.

## Attacks = CREEP
- First attack day 5-7 (rolled at new game); next gap 5-6; later
  4-7. One attack at a time, targets the outermost owned frontier
  tile.
- Strength by arrival day: day<8 = 1, then +1 per 4 days, uncapped.
- Defense = same illuminate math vs attack strength; tile holds
  while crewed; resolution roll = HELD or TAKEN (tile back to
  dark). Undefended = falls at next END DAY.
- Attacked tile: slow alpha pulse; panel shows its name in RED +
  "CONSUMED IN 1 DAY" when undefended.

## Blackout + LIGHT
- LIGHT = blackout-survival currency. Sources: origin lighthouse (1,
  tier 0 is never attacked) + streetlamps/lighthouses in tiers 1+
  (illuminated, and AT RISK - see Tiles).
- Every 10 days the word BLACKOUT fills the screen (94% width,
  Tahoma bold, world-dim 0.5; in 0.72s / hold to 2.16s / out 1.2s;
  click after fully in = 0.3s dismiss). Yellow #e3c15c; a FAST
  blackout renders DANGER red #c8493f = the only tell. Word height
  +15% per event, cap +115%. Word swallows all clicks.
- Lead: hit comes 2 days after the warning; fast = 1 day. Fast
  chance = 5% x (events-1), cap 40%, rolled at warning. First
  blackout always 2 days.
- At the hit: LIGHT >= (n+1)(n+2)/2 (3/6/10/15/21...) or the run is
  CONSUMED.
- Readout: "BLACKOUT N" all red beside LIGHT. Word fully fades -> 2s
  nothing -> fades in over 3.5s showing 1 -> counts up to N over
  1.3s. Clears on resolve. Takes LIGHT's slot if LIGHT=0; EMBER
  shifts right on collision. Sound later.

## Run end + META
- Run ends: MARA dies, or blackout unmet. GAME OVER fade (3s) ->
  EMBER UPGRADES shop -> CONTINUE -> menu. Save wiped; run embers
  bank to META.
- META = localStorage goodbyes_meta {emb, upMat, upFood, tutZoom};
  survives wipes.
- Shop: MATERIAL TILE / EMBER TILE / MISC. Live: material only,
  +10%/point chance a spawned tile is +2/day (b2), cap 3.
  Placeholders: cost 1 EMBER, row label, MISC name.
- Save v11 single slot (goodbyes_save); other versions discarded.
  Autosave: 10s + visibilitychange + END DAY + menu exit; wipe gags
  autosave until reload.

## END DAY resolution beats
- Press END DAY -> 0.5s hold -> beats play, one per resolving item.
- Dwell: routine ~0.75s, dramatic (SURVIVOR/CONSUMED/TAKEN/HELD/
  STARVED) ~1.5s; each successive beat -6% (floor 60%, min 0.55s).
  Any click = skip all. Speed/skip preference toggle = later.
- Style = SPOTLIGHT: world dims 0.5, resolving tile(s) bright, crew
  dots pulse beneath, label above. Real survivors hidden during
  playback (only beat crew dots show). Resolved tiles keep their
  pre-END-DAY look until their beat plays.
- Audio = warm jazz blips, procedural WebAudio per event type, SFX
  slider volume.
- Order: task resolutions (shuffled) -> income. Grouped: all
  MATERIAL income = one beat (all tiles spotlit, +total). Individual:
  HELD/TAKEN/FAIL, still-working, claims, build-complete, lamp
  claims. Deltas sum-verify to truth; no per-tile income floats.
- HUD counters (MATERIAL/LIGHT/EMBER) tick in sync with the
  beats (deferred value, settles per beat; snaps to truth on skip).
  Blackout word waits for the last beat. Run end = no beats.

## UI
- Roster: left side, one row per survivor: color dot + name +
  status (IDLE bright, busy dim). All-dim = ready to END DAY. This
  is the only survivor readout.
- HUD: MATERIAL once first seen (+N/DAY row + tooltip); LIGHT;
  BLACKOUT readout; EMBER when >0; DAY bottom-left. END DAY button = PROMPT style (locked): boxless
  "[ END DAY ]", dim at idle; hover brightens and slides the
  brackets open. Hit box stays 150x44.
- Panel: centered header ("?" dark, name owned, RED name if
  attacked). Status line centered: days estimate (dark), "5
  MATERIAL" (dark rubble), "+N/DAY" (resource), "BUILD 5 MATERIAL"
  (lot), "CONSUMED IN 1 DAY" (undefended, red). Attacked adds an
  ILLUMINATE label over the list.
- DRAG ASSIGN (primary, user 07-23): hovering a survivor dot pops
  it (eased ~90ms): dot lifts 3px, white contact ring around the
  dot, iso ground ring settles under it, name label above, grab
  cursor. Press and drag = a thin straight line from the survivor
  to the pointer. A tile captures ONLY while the pointer is inside
  its diamond (actionable only: dark illuminatable or attacked;
  material/lamps/lots are not drag targets); while captured the
  line stops at the tile border and the tile gets the hover LIFT +
  a soft white glow fill. Release on a captured tile = survivor
  assigned (reassigns from any previous task); panel opens on the
  target. Release on nothing = cancel.
- One-click flow (still works): selecting a dark/attacked tile opens
  the survivor list directly; tap names to assign/unassign. The only
  button: MATERIAL (lot build).
- Picker rows: 16px checkbox (fills with the survivor's color when
  ticked) + name, one line. Live assign: tap = assign, tap again =
  unassign; untick everyone = pull back (progress reset). Below the
  list: days + risk (red), or NOT POSSIBLE. ESC closes + deselects.
- Selection = panel only, no map marker. Hover = LIFT (3px).
- Floating text on grants; rises, fades, cosmetic.
- Zoom: 9 levels 0.75-1.75, default 1.25, step 0.125; wheel = 1
  level, pinch snaps; transient right-edge bar. Double-click empty =
  recenter. Pan clamp = drawn-tiles bbox.
- Tutorials: one-time EVER (META flags, survive wipes), trigger
  contextually, clear on next END DAY. Only one now: zoom tip at
  first tier-4 reveal. Visual style rework later.
- Topbar: note = music+SFX sliders; gear = display mode / MAIN MENU
  / ABANDON (2-click).
- Menu: "DAY X" (save's day) or NEW GAME / SETTINGS (no handler yet)
  / QUIT GAME. Steam+Discord icons in a row left of the mute note,
  top-right, dead placeholders. Menu music loops (main_screen.mp3).
- Menu visualizer = TOWN LIGHTS: dark skyline; windows light on note
  onsets (low/mid bands only, hi-hat masked); occupancy layer fills/
  empties with loudness. LOUDNESS = LOW/MID BANDS ONLY (the constant
  hi-hat bed does not count as loudness), run through an expander
  (^2.4 over the track's own min/max range): very quiet passages
  crush toward near-dark, distinctly darker than mid-quiet; loud
  sections blaze. Fast attack, brisk release. Drums surge the whole
  town; silence = sleep. file:// cannot analyse audio (synthetic
  events); real reaction on http://localhost:8123 or itch.
- Debug (outside stage, backtick/#debug): +25 MATS, +5 LIGHT,
  +SURV, speed X1-X5/X20, stats, VIEW, RESET. #game skips menu.

## Visual language (locked)
- Diamond lattice, military projection, pitch (48,24) true 2:1.
  Tile 69x34.5 (hit 34.5/17.25). Art pixel = 8.0 source px exact;
  clean sizes x2 and x1 only; never redraw or runtime-resample
  (re-derive from ref/ sources).
- Smooth art set = canonical, extracted verbatim from user art;
  alpha-baked, source-over, painter order = occlusion. Buildings at
  80% around slab midline over a full tile. Pixel set = fallback.
- Floor fill: owned lots only, #20201e, measured to the art (center
  y+3*sc, half 31.5x15.5).
- Streets: faint yellow dashed lanes rgba(214,192,118) 55%,
  continuous runs, 4 dashes/tile, fade-out extensions + corner
  tails.
- Text = vector Segoe UI stack (text7/text3); icons = canvas paths;
  BLACKOUT word = Tahoma bold. Tile labels centered in the diamond.
- Tile art (user originals, verbatim, bg transparency only):
  STREETLAMP + LIGHTHOUSE + MATERIAL (warehouse+logs), width-anchored
  (60/64/66). Streetlamp keeps its drawn ground plate inside the
  game tile; lighthouse uses lighthouse_only.png (baked plate
  stripped, the game tile is the only outline); text-label fallback
  if an image fails. Unused: food.png (kind removed). EMBER = text
  label. Sources in ref/.
- Display modes: WINDOWED 960x540 logical, scales up to the window
  (integer render scale, CSS fit, letterbox; pixel-exact at
  960x540) / BORDERLESS adaptive viewport (caps 1720x720) /
  FULLSCREEN. Never render fractional.
- 1-bit dark, color earned slowly, red = danger only. Color plan
  60-30-10 with per-category muted hues later (proposal: color
  arrives on illuminate). Tone: classy jazz vs playful minimal art,
  both pillars.
- Pricing: deliberately odd (e.g. 9.73), appears in-game as tribute.

## Dead ends (never revisit)
- Real-time sim: per-minute rates, wall-clock tasks, hunger timers,
  scout verb.
- Additive POWER + death-% math, neighbor softening, strength pips,
  BROKEN TOOL.
- Blink/flash attack signals; danger bars; text walls; instructional
  text.
- Redrawn/embellished reference art; template re-skins; runtime
  resampling; off-grid scaling.
- Foreshortened tiles; shear view; fog dissolve; bitmap glyph fonts.
- Shine/glow hover; accent colors on mono tiles; white selection
  outline; map name labels; speech bubbles (parked); full-row
  progress bars; drawn enemy creatures.

## Open
- Crafting unlock verdict (user owes; library direction liked) ->
  first combat slice. Combat: fights resolve autonomously, prep is
  the game; 2-3 weapons ~15 materials; stats after first playtest.
- TILES.md TBD column kinds; tiers 6-10 spec finalize; ember spawn %.
- Houses/apartments do nothing - purpose or decoration?; lot-build
  HOUSE option?; placeholder item identities; shop EMBER/MISC.
- Attack tuning; defender re-crew pinning rule; crew-rule verdicts;
  run-skeleton depths; pacing pass.
- Survivor markers; tile icons; naming (void, MISC); story lock;
  stat system; permadeath.
- Tutorial visuals; SETTINGS handler; WISHLIST/DISCORD links; SFX +
  in-game music; prestige build-out; dog companion (tier 6).
