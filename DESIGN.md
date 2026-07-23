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
- Origin (tier 0): 1 HOUSE + 1 LIGHT + 1 FOOD + 1 MYSTERY, shuffled;
  the three non-mystery start owned; the light tile = 1 starting
  LIGHT. Mystery illuminate = becomes MATERIAL or FOOD (50/50) +
  opens the board.
- Tier spawns: TIER_SPEC in newgame.js; per tier fixed or ranged
  counts (ranges roll uniform per board), EMPTY LOTs fill the rest.
  Table + percentages in TILES.md. Campfires: 1 in tier 2 + 1 in
  tier 4, nowhere else. LIGHT tiles tier 3+. RUBBLE 1 each in tiers
  1/3, 2 in tiers 4-5. EMBER tier 4+. Tiers 1-5 user-locked; 6-10
  Claude draft pending playtest.
- Reveal: undiscovered = pure black, unclickable. Drawn = owned +
  origin + (once opened) edge-adjacent to owned. Unowned drawn = dim
  stamp, 0.4 alpha.
- UNKNOWN LAW (hard rule): an unclaimed tile NEVER reveals its kind,
  anywhere. Not-knowing is the point.

## Tiles
- FOOD / MATERIAL: owned = +1/day passive (+2 if b2 meta-upgrade
  variant). Station 1 survivor (GATHER, 1 slot) = +3/day more.
- CAMPFIRE: illuminate = recruit joins; tile stays, labeled. Future:
  clearable/re-usable (not built).
- SUPPLY CACHE: illuminate = 2-3 MATERIAL or 2-3 FOOD (50/50) ->
  lot.
- LIGHT (lighthouse): illuminate = +1 LIGHT, tile stays as a
  persistent LIGHT structure (does not convert to a lot) - like
  CAMPFIRE. No daily production, no decay, nothing spends it while
  the tile is owned. The +1 is tied to that specific tile surviving:
  if CREEP takes it (defended-but-lost or undefended), LIGHT drops
  by 1 for that tile. This makes LIGHT tiles a real target - losing
  one to an attack costs you blackout-survival, not just a tile.
- EMBER: illuminate = +1 EMBER banked -> lot.
- RUBBLE: dark obstruction, not illuminatable. CLEAR button (when
  reachable) = 5 MATERIAL, removed instantly -> owned EMPTY LOT.
- EMPTY LOT: owned lot can BUILD a FOOD or MATERIAL tile: 5
  MATERIAL, 1 day. Renders with FLOOR FILL (solid dark floor
  #20201e under the stamp); all other owned kinds unchanged.
- HOUSE / APARTMENT: no mechanical effect currently (open item).
- HOSPITAL: designed, not built (health, mid game).

## Economy (per END DAY)
- Start: 20 FOOD, 0 MATERIAL, 1 LIGHT, 2 survivors (MARA + REED).
- Each survivor eats 2 FOOD.
- STARVATION: deficit-based; someone dies only if the meal cannot be
  covered (spend > available; exactly 0 after eating is safe).
  Consecutive starving days kill 1, then 2, then 3... (streak resets
  on any covered day). Deaths prefer non-MC; MARA only when alone.
- Watch equilibrium after every economy change.

## Survivors
- ROSTER CAP 4: MARA (MC) + REED start; JUNE + OKON found at the
  tier-2 and tier-4 campfires (fallback name ASH). No survivor in
  tier 1.
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
- LIGHT = blackout-survival currency. Sources: origin start (1,
  pre-owned, never at risk since tier 0 is never attacked) + tier 3+
  LIGHT tiles (illuminated, and AT RISK - see Tiles).
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
- Shop: MATERIAL TILE / FOOD TILE / EMBER TILE / MISC. Live: first
  two, +10%/point chance a spawned tile is +2/day (b2), cap 3.
  Placeholders: cost 1 EMBER, row label, MISC name.
- Save v10 single slot (goodbyes_save); other versions discarded.
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
- Order: task resolutions (shuffled) -> income -> STARVED. Grouped
  same-kind: all FOOD income one beat (label = NET food after
  eating), all MATERIAL income one beat, caches/lights/embers
  grouped by kind. Individual: survivor found, HELD/TAKEN/FAIL/
  STARVED, still-working, plain claims, build-complete. No separate
  eating beat; no per-tile income floats.
- HUD counters (FOOD/MATERIAL/LIGHT/EMBER) tick in sync with the
  beats (deferred value, settles per beat; snaps to truth on skip).
  Blackout word waits for the last beat. Run end = no beats.

## UI
- Roster: left side, one row per survivor: color dot + name +
  status (IDLE bright, busy dim). All-dim = ready to END DAY. This
  is the only survivor readout.
- HUD: FOOD +N/-N per-day rows; MATERIAL once first seen; LIGHT;
  BLACKOUT readout; EMBER when >0; item placeholders; DAY
  bottom-left. END DAY button = PROMPT style (locked): boxless
  "[ END DAY ]", dim at idle; hover brightens and slides the
  brackets open. Hit box stays 150x44.
- Panel: centered header ("?" dark, name owned, RED name if
  attacked). Status line centered: days estimate (dark), "5
  MATERIAL" (dark rubble), "+N/DAY" (resource), "BUILD 5 MATERIAL"
  (lot), "CONSUMED IN 1 DAY" (undefended, red). Attacked adds an
  ILLUMINATE label over the list.
- One-click flow: selecting any tile whose action is obvious opens
  the survivor list directly - dark tiles, resource tiles, attacked
  tiles. Buttons exist only where there is a choice: CLEAR (dark
  rubble), FOOD/MATERIAL (lot build).
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
- Debug (outside stage, backtick/#debug): +25 FOOD/MATS, +SURV,
  speed X1-X5/X20, stats, VIEW, RESET. #game skips menu.

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
- Display modes: WINDOWED 960x540 / BORDERLESS adaptive viewport
  (caps 1720x720) / FULLSCREEN. Never render fractional.
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
  run-skeleton depths; pacing pass; starvation feel check.
- Survivor markers; tile icons; naming (void, MISC); story lock;
  stat system; permadeath.
- Tutorial visuals; SETTINGS handler; WISHLIST/DISCORD links; SFX +
  in-game music; prestige build-out; dog companion (tier 6).
