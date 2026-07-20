# Tiles + grid (working sheet)

User edits this file freely. Claude syncs DESIGN.md and the game
after each editing pass. Names marked (placeholder) need user naming.

## Grid naming (chess style; live build = full 12x12, 144 tiles)
- Columns A-L left to right, rows 1-12 top to bottom.
- Tile name = column + row: "F6", "H7".
- The logical grid is square; the screen just draws it rotated 45deg.
- ORIGIN block = the exact center 2x2: F6 G6 F7 G7.
- Screen corners: A1 top, L1 right, A12 left, L12 bottom.

## Tiers (synced 07-19 to board.js tierOf; supersedes 07-12 spec)
- TIER = ring distance from the origin block (dx+dy, Manhattan).
  Rings render as squares around the origin on screen.
- TIER 0: origin 4 (F6 G6 F7 G7). Safe.
- Sizes 0-10: 4 / 8 / 12 / 16 / 20 / 24 / 20 / 16 / 12 / 8 / 4.
  Grows +4 per tier to 24 at tier 5, then the board edge clips it
  back down; tier 10 = the 4 corners (A1 L1 A12 L12).
- TIER 1 = F5 G5 E6 H6 E7 H7 F8 G8.
- TIER 2 = F4 G4 E5 H5 D6 I6 D7 I7 E8 H8 F9 G9.
- Darkness strength = tier. Reclaim days / crew / death risk all
  come from the survivor-day math (DESIGN.md 07-17). Old scout
  seconds dead (real-time dead).

## Name map (drawn exactly like the screen; origin in brackets)

```
                                 A1
                              A2    B1
                           A3    B2    C1
                        A4    B3    C2    D1
                     A5    B4    C3    D2    E1
                  A6    B5    C4    D3    E2    F1
               A7    B6    C5    D4    E3    F2    G1
            A8    B7    C6    D5    E4    F3    G2    H1
         A9    B8    C7    D6    E5    F4    G3    H2    I1
      A10   B9    C8    D7    E6    F5    G4    H3    I2    J1
   A11   B10   C9    D8    E7   [F6]   G5    H4    I3    J2    K1
A12   B11   C10   D9    E8   [F7]  [G6]   H5    I4    J3    K2    L1
   B12   C11   D10   E9    F8   [G7]   H6    I5    J4    K3    L2
      C12   D11   E10   F9    G8    H7    I6    J5    K4    L3
         D12   E11   F10   G9    H8    I7    J6    K5    L4
            E12   F11   G10   H9    I8    J7    K6    L5
               F12   G11   H10   I9    J8    K7    L6
                  G12   H11   I10   J9    K8    L7
                     H12   I11   J10   K9    L8
                        I12   J11   K10   L9
                           J12   K11   L10
                              K12   L11
                                 L12
```

## Tier map (same shape; 0 origin, 1-10 outward)

```
                                 10
                              9     9
                           8     8     8
                        7     7     7     7
                     6     6     6     6     6
                  5     5     5     5     5     5
               5     4     4     4     4     4     5
            6     4     3     3     3     3     4     6
         7     5     3     2     2     2     3     5     7
      8     6     4     2     1     1     2     4     6     8
   9     7     5     3     1    [0]    1     3     5     7     9
10    8     6     4     2    [0]   [0]    2     4     6     8     10
   9     7     5     3     1    [0]    1     3     5     7     9
      8     6     4     2     1     1     2     4     6     8
         7     5     3     2     2     2     3     5     7
            6     4     3     3     3     3     4     6
               5     4     4     4     4     4     5
                  5     5     5     5     5     5
                     6     6     6     6     6
                        7     7     7     7
                           8     8     8
                              9     9
                                 10
```

## Zombies (user 07-12; data live, combat not built)
- ALL tier-2 tiles carry 1 zombie (07-12, supersedes ">=2 danger in
  tier 1"; tier 1 stays safe pending playtest note below). Stored on
  the tile (z=1) at generation.
- Danger read: unscouted tier-2 "?" tiles render RED (tile lines +
  "?" in #c8493f).
- Zombie color: dark intense red.
- Zombie speed: 6 px/s ABSOLUTE (set once from 15% of the then
  survivor speed; NEVER derived live, so survivor speed upgrades
  never speed up zombies).
- SPEED LAW: every actor speed is an absolute constant, never a
  percentage of another actor's stat.
- OPEN: the earlier ">=2 danger tiles inside tier 1" draft: dead or
  alive? (Tier 1 currently generates safe.)

## Early design intent (user 07-12)
- Opening = gather materials hard while scouting, opening tiles,
  finding survivors: preparation for what comes.
- Every tile should be meaningful; 8 tier-1 tiles is already a lot
  of tiles, so no-progress filler tiles are a problem.
- OPEN (user thinking): more random tile types so boards are not
  mostly resident/food/material (those stay the main ones).
- OPEN: exact tier-1 pool composition (old 12-tile pool below needs
  a re-spec against tiers + danger count). Playtest first.

## Tier tile table (user plugs in counts, Claude syncs newgame.js)
Cells = exact tile counts per tier (bag draw, not %). Each row must
sum to TILES. LOT flattened 07-19 (user: near-equal, rises slowly);
freed slots sit in TBD = kinds user decides later. TBD generates as
EMPTY LOT in game until assigned, so play is unchanged for now.

| TIER | TILES | CAMP | FOOD | MATERIAL | RUBBLE | CACHE | EMBER | LOT | TBD |
|------|-------|------|------|----------|--------|-------|-------|-----|-----|
| 1    | 8     | 1    | 1    | 1        | 1      | 0     | 0     | 4   | 0   |
| 2    | 12    | 2    | 2    | 1        | 1      | 1     | 0     | 5   | 0   |
| 3    | 16    | 1    | 2    | 2        | 2      | 0     | 0     | 6   | 3   |
| 4    | 20    | 0    | 2    | 2        | 2      | 0     | 0     | 6   | 8   |
| 5    | 24    | 0    | 3    | 3        | 3      | 0     | 0     | 7   | 8   |
| 6    | 20    | 0    | 2    | 4        | 3      | 0     | 0     | 7   | 4   |
| 7    | 16    | 0    | 2    | 4        | 2      | 0     | 0     | 7   | 1   |
| 8    | 12    | 0    | 2    | 4        | 2      | 0     | 0     | 4   | 0   |
| 9    | 8     | 0    | 2    | 3        | 1      | 0     | 0     | 2   | 0   |
| 10   | 4     | 0    | 1    | 2        | 0      | 0     | 0     | 1   | 0   |

LOT curve: 4 5 6 6 7 7 7 then 4 2 1 (tiers 8-10 shrink to 12/8/4
tiles, fewer lots natural). TBD total = 24 slots open.

(Tier 0 = origin, fixed: 2 HOUSE + 1 FOOD + 1 MYSTERY. Mystery
resolves to first-survivor tutorial, then EMPTY LOT.)

## Tiles (exist in game today)
- HOUSE (single house): shelter for 1 survivor (07-12, was 2).
- APARTMENT: shelter for 2 survivors (07-12, was 4).
- FOOD (name locked): food, 5/min per gatherer.
- SCRAPYARD (name locked): materials, 3/min per gatherer.
- RUBBLE: blocked. CLEAR = 20s + 20 materials, becomes EMPTY LOT.
  Later: build onto cleared lots.
- CAMP (placeholder): reclaim = 1 recruit joins, tile becomes EMPTY
  LOT.
- SUPPLY CACHE: reclaim = 2-5 MATERIAL or 2-5 FOOD (50/50),
  becomes EMPTY LOT.
- EMPTY LOT: empty ground. Future build site.
- MYSTERY: unknown until scouted, 12s. Reveal roll v1: FOOD 40 /
  SUPPLY CACHE 35 / EMPTY LOT 25.

## Tiles (designed, not built yet)
- HOSPITAL: health (sickness, medication), arrives mid game.

## Shelter (not wired into the game yet)
- House 1 + apartment 2. Concept arrives in-game when capacity
  matters (concepts one by one).

## Current in-game pool (per run, 12 tiles, PRE-TIER spec)
- 2 SCRAPYARD, 1 FOOD, 1 APARTMENT, 1 CAMP (50% chance of a 2nd
  CAMP), rest EMPTY LOT.

## Origin 2x2 (user 07-12)
- 2 HOUSE + 1 FOOD + 1 MYSTERY, arrangement random.
- RUBBLE out of the origin. FLAG: rubble now spawns nowhere (ring
  pool has none), so CLEAR + the early material sink are dormant
  until rubble joins a tier pool.

## Tile candidates (Claude brainstorm 07-12; user picks, names
placeholder)
- Blueprint chain: WORKSHOP (craft site, weapons made here) /
  LIBRARY (slow safe blueprint via research) / HARDWARE STORE
  (blueprint + small materials) / POLICE STATION (finished weapon,
  danger-guarded) / RADIO TOWER (pings a far tile) / SCHOOL (+1
  stat training).
- Risk + variance: NEST (extra zombies, rich loot) / LOCKED SHELTER
  (pay materials, random big payout) / HIDEOUT (recruit + personal
  item) / COLLAPSED STORE (rubble in front of a fat cache).
- Utility, one each: WATER TOWER (slows food drain) / WATCHTOWER
  (danger hints on neighbors) / GENERATOR (power, bunker prereq).
- Tone: CHURCH (happiness later) / CEMETERY (goodbye place for dead
  survivors).

## Combat direction (user deliberating 07-12)
- Identity stays: FIGHTING IS THE EXAM, PREPARATION IS THE GAME.
  Player never executes fights; prepares (weapons, crew, timing) and
  watches autonomous resolution (locked control-loss encounters).
- 2-3 basic weapons, ~15 materials each, huge chunky buff vs fists.
  No inventory/durability/ammo sprawl; an item lives ON a survivor.
- Stat system: decide AFTER the first combat playtest (armed vs
  fists first).
- Crafting unlock (07-12): blueprint-per-scout REJECTED (annoying,
  busywork). Wants minimal + real-life-ish. Workshop-only = too
  cheap; LIBRARY research direction liked. Being designed in a
  separate session (handoff-combat.txt).

## Future tile ideas (parked, mentioned in earlier passes)
- Defense: military facility.
- Medical: clinic (small hospital variant).
- Nature: park, forest.
- The bunker tile (endgame, one per run).

## Scaling questions (open)
- Do reclaim/clear times also scale per tier?

## UI note
- Floating text live: gathering pops a "+1" that rises and fades
  above the tile, one per whole resource.
