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
immediately, volunteer improvement suggestions along the way.
1. IMPORTANT, FUN DECISIONS. Never boring, annoying, or mind-cluttering
   ones. Not too many at once, but always some real ones.
2. DEPTH REVEALS GRADUALLY. Constant evolution, never overwhelming.
3. NO EARLY PUNISHMENT. Real consequences arrive around mid game.
4. CONCEPTS INTRODUCE ONE BY ONE (user 2026-07-11). UI, metrics, and
   mechanics appear only when the concept first becomes real
   (MATERIALS hidden until the first material exists). Applies to
   every future system.
5. CLEAN NUMBERS, NO DECIMALS. All player-facing figures are integers.

## Shape of a run (acts)
1. **Early** land with almost nothing, tiny origin plot, scavenge.
2. **Mid** expand outward ring by ring, recruit, automate, hold
   equilibrium against escalating pressure.
3. **Late** equilibrium breaks; open ground cannot be held forever.
   One plot contains the sealed bunker.
4. **Late-late** take the bunker section by section, make it
   self-sustaining. That is the win.

## Survivors (the heart of the game)
- Recruiting is a major event, not a stat bump.
- Each has a name, age, role, a short story, unique stats, a face.
- **Permadeath** (UNDER REVIEW 2026-07-10; revisit before building
  death). Placeholder stat axes GRIT/HANDS/NERVE/HEART (not locked).

## Prestige (the time rewind)
- Story-driven rewind device, FOUND on a late tile. Rewinding = saying
  goodbye. Buffs are permanent but attach to specific survivors, so a
  later death loses that buff. Buffs are MARGINAL (bounded axes, +1 is
  huge). A lucky run can win with ZERO prestiges: compulsion, never a
  wall. The designed rewind moment = when the next tile feels too slow.

## Pressure
- Recurring attacks, progressively harder, damaging survivors.
- Missing an event costs nothing (absence of reward, never penalty).
- Threat is ACTION-GATED early/mid: danger triggers when the player
  pushes into a tile, never by wall clock. LATE-GAME RULE-BREAKS are
  story beats: uninvited attacks signal the ground cannot be held.

## Identity (LOCKED 2026-07-09)
- REAL TIME. No turns, no END DAY, ever. Subtle de-emphasized day
  counter. Rebuild-style town grid, reclaim tile by tile.
- Scouting reveals hinted info; survivors differ in ability.
- Entering a tile = zoomed encounter; if it is much stronger than
  expected, control is DISABLED and survivors act autonomously (flee,
  rush in, dramatic saves, real losses). The game keeps running.
- Reference feel: A Dark Room's reveal pacing, Rebuild's reclaim,
  minus turns, minus text walls.

## Early game flow (LOCKED 2026-07-10)
- ORIGIN 2x2: FOOD / RESIDENT / MYSTERY / RUBBLE (Material sink).
  Guarantees: food + shelter only; everything else RNG from
  fixed-count pools (high variance, never pure luck).
- FOOD is the single sustenance (water folded in).
- OPENING: 2 survivors, BOTH idle. No instructional text ever.
- SAFE RING 1: no enemies; 1-2 recruits possible. Beyond ring 1 can
  hold enemies. Claiming early tiles costs TIME only, never Materials
  (deadlock guard).
- Hunger: a hungry survivor pauses and sits, visible, fixable, never
  lethal early; food-tile work always allowed (starvation escape).

## Action model (LOCKED 2026-07-10, Rebuild-style)
- Tile -> action (SCOUT/RECLAIM/CLEAR/GATHER) -> pick crew.
- Diminishing returns on TIMED actions only: time = base/(1+r+r^2+...),
  r=0.65. GATHERING is linear per survivor (no DR).
- Temp tasks (scout/reclaim/clear) LOCK the survivor until done;
  gather stays interruptible.
- Scouted != reclaimed: scouted renders dim (0.55) until owned.

## Reveal rule (user 2026-07-11, fog REMOVED)
- No fog anywhere. Undiscovered space is pure black, nothing drawn.
- Adjacent unknown tiles render as dim "?" diamonds.
- Revealing a tile (scout) populates "?" on its EDGE-adjacent
  neighbors (never diagonal). Rule persists all game EXCEPT the very
  beginning: at start only the origin four are visible (three known +
  the mystery "?"); the 8 edge-adjacent ring tiles appear only when
  the first mystery tile is revealed.
- STREETS: Rebuild-style dashed centerlines between drawn tiles.
  Full gray inside town; they extend INTO a "?" tile and fade
  aggressively, entirely gone well before the "?" tile's far end
  (~60% in). At the very start streets stay inside the origin block.
- Day counter sits bottom-left, dim.

## Balance (first pass, tune by feel)
- FOOD 5/min per gatherer; MATERIALS 6/min per gatherer.
- Eating 3 food/min per survivor (1 per 20s).
- SCOUT 15s, RECLAIM 20s (lot/cache 10s), CLEAR 20s + 20 Materials
  (refund on cancel). Day = 90s.
- Mystery table v1: grocery 40 / cache 35 / lot 25. Cache pays 25
  Materials. Camp reclaim = recruit (bag JUNE OKON IVY CALEB NOOR
  SAGE), tile becomes lot. Max 6 survivors.

## Visual language (LOCKED, extracted from user's 123.png)
- Diamond lattice (military projection): world grid drawn 45deg,
  lattice pitch (64,40) px, tile diamond 88x56 (hw 44, hh 28),
  street corridors ~21px. 2/3 of the original approved scale (user
  2026-07-11 "way too big"; map will grow huge).
- CANONICAL ART = lossless crops of 123.png, bicubic+threshold to
  exact game resolution, blitted 1:1 additively (black adds nothing):
  ref_house100 (100x85), ref_apt103 (103x105), ref_tile103 (103x105,
  derived from the apartment's own base edges). Sources live in ref/
  (gitignored): 123.png, ref_house.png, ref_apt.png, ref_tileA.png.
  NEVER redraw, never runtime-resample; resizing means re-deriving
  from ref/ sources. Building:tile ratio never changes.
- Unknown "?" = dim tile stamp (0.45) + 5x7 "?". Icon-less kinds get
  5x7 labels (FOOD, SCRAP, RUBBLE, CAMP, CACHE; SCRAPYARD/CAMP/CACHE
  names are placeholders pending user naming).
- HOVER = LIFT, final (stamp eases up 3px). Shine/glow/sweep dead
  (anti-aliased effects blur 1-bit pixels). SMOOTH (vector) dead.
- Selection = ground ring diamond UNDER the stamp (never through art).
- Survivors = 10px rings in corridors, no map names, work spots in
  front of tiles, idle spots at the town crossing. No anatomy on the
  play stage; faces live in portraits/UI only (asset/faces/).
- VIEW: integer stage scaling is the default (16:9 law verbatim);
  dev toggle AUTO <-> ITCH 960. Fractional window-fill was rejected.
- Stage edge: barely visible #1c1c1c outline.

## Art and UI direction
- Very minimalist 1-bit, dark theme. Color earned slowly.
- FACES: user's own art canonical (asset/faces/): navy-ringed circle,
  navy hair+eyes, no nose/mouth, gray shoulders. Variants built on
  the extracted bald base, whole-grid-cell edits only. Survivors read
  SLIGHTLY depressed via subtly downcast eyes only.
- Color plan 60-30-10: near-black 60, off-white 30, 10 = per-category
  muted tile hues (Gnorp-style small doses, 4-6 max), red reserved
  for danger. Claude proposal pending: color arrives on RECLAIM.
  Hues picked later in a lab.
- Tone: classy understated JAZZ against playful 1-bit art; the
  contrast is a pillar. Music = pre-made files (license record per
  track needed); SFX stay procedural WebAudio.

## Maintenance metrics
- EARLY: food, shelter (housing capacity), MATERIALS (the one
  universal resource). MID: defense, health, recruiting. LATE: full
  pressure + HAPPINESS. Some tiles give random ITEMS.

## Pricing
- Deliberately odd price (e.g. 9.73), appears in-game as a tribute.

## Enemy (UNDECIDED)
- Zombies vs AI robots. Architected around a placeholder.

## Current build (2026-07-11, v8 scripts)
- Menu (ENTER/SETTINGS/QUIT + dead WISHLIST/DISCORD) -> live town.
- Origin 2x2 randomized (grocery/house/rubble/mystery) + ring bag
  (2 scrap, 1 grocery, 1 apartment, 1-2 camps, rest lots).
- All locked mechanics live: scout/reclaim/clear/gather, crew picker
  with live duration ("+N/MIN" or "NS"), locked-survivor dimming,
  hunger pause, recruits, mystery roll, reveal rule, streets.
- HUD: FOOD + "+x/MIN" "-y/MIN" with breakdown tooltips ("2 X 5/MIN");
  MATERIALS hidden until first material; DAY bottom-left dim.
- Topbar: note + gear icons top-right, click-only, one panel at a
  time; volume panel = two drag bars (music/effects, persisted, no
  audio wired yet); settings panel = MAIN MENU.
- Save v3 localStorage (v2 accepted), autosave 10s + visibilitychange,
  wipe gags autosave. Debug: backtick/#debug panel (grants, x1/x5/x20,
  save/wipe), #game skips menu, page-chrome VIEW toggle + RESET.
- Code: 25 single-purpose components under src/core, src/game,
  src/world, src/survivors, src/ui, src/assets + main.js (boot only).
  Hard cap ~500 lines per file, split long before that.

## Project structure
- index.html (shell) + src/ components + asset/tiles/ (game art,
  gitignored, fallbacks cover the public repo) + asset/faces/ +
  asset/soundtrack/ (reserved) + ref/ (source references, gitignored,
  never pushed) + dev-itch.html (embed test frame). STYLES.md =
  user's style notes. TO-DO.md = user's personal list.

## Dead ends (one line each, never revisit)
- Turn-based structure; text walls; instructional text.
- Redrawn/embellished reference art; template re-skins across style
  candidates (fresh means fresh); runtime decimation of stamps.
- 2:1 foreshortened tiles, shear view, billboard squares (view is the
  military projection above).
- Fog speckle dissolve (fog removed for the "?" reveal rule).
- Shine/glow hover, smooth vector look, accent colors on mono tiles.
- Checker-edge frontier, vertex-tick selection, map name labels,
  speech bubbles (parked until told), TOWN idle panel.
- Fractional window-fill as default view. Full-row progress bars.
- Oversized grocery stamp; pyramid rubble; hair below shoulders.

## Open questions / next
- Enemy pick; stat system; survivor count; pacing of the safe opening.
- Remaining tile icons in the extracted language (food, scrapyard,
  camp, park, lot, police): ask user for reference icons or derive.
- Naming pass over placeholder labels (SCRAPYARD/CAMP/CACHE).
- Audio hookup behind the volume bars; music player (loop, crossfade,
  resume after tab switch).
- Survivor marker design pass at game scale (user-approved before add).
- Permadeath review; shelter capacity effect; fatigue caps; zombies /
  ring 2; SFX; player-facing reset; prestige build-out.
