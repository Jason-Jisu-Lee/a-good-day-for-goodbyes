# Tiles + grid (working sheet)

User edits this file freely. Claude syncs DESIGN.md and the game
after each editing pass. Names marked (placeholder) need user naming.

## Grid naming (chess style, prepared for 12x12)
- Columns A-L left to right, rows 1-12 top to bottom.
- Tile name = column + row: "F6", "H7".
- The logical grid is square; the screen just draws it rotated 45deg.
- ORIGIN block = the exact center 2x2: F6 G6 F7 G7.
- Current build's 4x4 world = the center block, columns E-H rows 5-8.
- Scales to 12x12 with no renaming ever; 15x15 would need one more
  column letter and is currently out of scope.

## Tiers (user 07-12; TIER replaces "ring")
- TIER 0: origin 4 (F6 G6 F7 G7). Safe.
- TIER 1: the 8 edge-adjacent tiles (F5 G5 E6 H6 E7 H7 F8 G8).
  Scout base 12s (origin mystery included). AT LEAST 2 of the 8 are
  DANGER tiles with 1 zombie each (draft, playtest pending).
- TIER 2: the 4 diagonal corners (E5 H5 E8 H8) + the entire next
  ring (D4..I9 outline, 20 tiles). Scout base 24s. Unscavenged tier
  2 renders SLIGHTLY RED = danger warning.
- TIER 3: next ring (C3..J10 outline). Scout base 36s.
- Pattern: +12s scout base per tier.

## Tier map (center 8x8 of the 12x12)

```
      C  D  E  F  G  H  I  J
  3   3  3  3  3  3  3  3  3
  4   3  2  2  2  2  2  2  3
  5   3  2  2  1  1  2  2  3
  6   3  2  1  0  0  1  2  3
  7   3  2  1  0  0  1  2  3
  8   3  2  2  1  1  2  2  3
  9   3  2  2  2  2  2  2  3
 10   3  3  3  3  3  3  3  3
```

## Zombies (draft, user 07-12, not built)
- Danger tile = 1 zombie.
- Zombie color: dark intense red.
- Zombie speed: 6 px/s ABSOLUTE (set once from 15% of the current
  survivor 40; NEVER derived live, so survivor speed upgrades never
  speed up zombies).
- SPEED LAW: every actor speed is an absolute constant, never a
  percentage of another actor's stat.

## Early design intent (user 07-12)
- Opening = gather materials hard while scouting, opening tiles,
  finding survivors: preparation for what comes.
- Every tile should be meaningful; 8 tier-1 tiles is already a lot
  of tiles, so no-progress filler tiles are a problem.
- OPEN (user thinking): more random tile types so boards are not
  mostly resident/food/material (those stay the main ones).
- OPEN: exact tier-1 pool composition (old 12-tile pool below needs
  a re-spec against tiers + danger count). Playtest first.

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
- MYSTERY: unknown until scouted, 12s. Reveal roll v1: FOOD 40 /
  SUPPLY CACHE 35 / EMPTY LOT 25.

## Tiles (designed, not built yet)
- HOSPITAL: health (sickness, medication), arrives mid game.

## Shelter (not wired into the game yet)
- House 2 + apartment 4. Concept arrives in-game when capacity
  matters (concepts one by one).

## Current in-game pool (per run, 12 tiles, PRE-TIER spec)
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

## Scaling questions (open)
- Do reclaim/clear times also scale per tier?

## UI note
- Floating text live: gathering pops a "+1" that rises and fades
  above the tile, one per whole resource.
