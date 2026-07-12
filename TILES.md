# Tiles + ring scaling (working sheet)

User edits this file freely. Claude syncs DESIGN.md and the game
after each editing pass. Names marked (placeholder) need user naming.

## Ring scaling
- Ring 1: NO zombies (safe, locked). Scout base 12s, including the
  origin mystery tile.
- Ring 2: scout base 24s.
- Ring 3: scout base 36s.
- Pattern: +12s per ring.
- Crew speedup on scout unchanged: time = base / (1 + 0.65 + ...).
- OPEN: do reclaim/clear times also scale per ring?
- OPEN: ring 2+ danger content (enemy undecided).

## Tiles (exist in game today)
- HOUSE (single house): shelter for 2 survivors.
- APARTMENT: shelter for 4 survivors.
- FOOD (name locked): food, 5/min per gatherer.
- SCRAPYARD (name locked): materials, 3/min per gatherer.
- RUBBLE: blocked. CLEAR = 20s + 20 materials, becomes EMPTY LOT.
  Later: build onto cleared lots.
- CAMP (placeholder): reclaim = 1 recruit joins, tile becomes EMPTY
  LOT.
- SUPPLY CACHE: reclaim = +10 materials, becomes EMPTY LOT.
- EMPTY LOT: empty ground. Future build site.
- MYSTERY: unknown until scouted. Reveal roll v1: FOOD 40 / SUPPLY
  CACHE 35 / EMPTY LOT 25.

## Tiles (designed, not built yet)
- HOSPITAL: health (sickness, medication), arrives mid game.

## Shelter (not wired into the game yet)
- House 2 + apartment 4. Concept arrives in-game when capacity
  matters (concepts one by one).

## Current ring-1 pool (per run, 12 tiles)
- 2 SCRAPYARD, 1 FOOD, 1 APARTMENT, 1 CAMP (50% chance of a 2nd
  CAMP), rest EMPTY LOT.

## Origin 2x2 (locked)
- FOOD + HOUSE (resident) + MYSTERY + RUBBLE, arrangement random.

## Future tile ideas (parked, mentioned in earlier passes)
- Defense: police station, military facility.
- Medical: clinic (small hospital variant).
- Nature: park, forest.
- Random ITEM tiles.
- The bunker tile (endgame, one per run).

## UI note
- Floating text live: gathering pops a "+1" that rises and fades
  above the tile, one per whole resource.
