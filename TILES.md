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

## Early design intent (user 07-12)
- Opening = gather materials hard while scouting, opening tiles,
  finding survivors: preparation for what comes.
- Every tile should be meaningful; 8 tier-1 tiles is already a lot
  of tiles, so no-progress filler tiles are a problem.
- OPEN (user thinking): more random tile types so boards are not
  mostly resident/food/material (those stay the main ones).

## Survivors (user-locked 07-23)
- ROSTER = 4, ALL START: MARA (MC), REED, JUNE, OKON. No recruiting.
- CAMPFIRE tiles removed from ALL spawns (slots = EMPTY LOT for
  now); campfire code dormant for future use.
- Origin MYSTERY resolves 50/50 to MATERIAL or FOOD + opens the
  board.
- Faces 0/2/3/4.

## Tier spawn spec (07-23; live in newgame.js TIER_SPEC)
Each count ROLLS UNIFORM per board. Rest of the tier = EMPTY LOT.
Tiers 1-5 = USER-LOCKED. Tiers 6-10 = CLAUDE DRAFT (*), playtest
pending. "-" = none.

| TIER | SIZE | MATERIAL | STREETLAMP | LIGHTHOUSE | EMBER | ~LOT |
|------|------|----------|------------|------------|-------|------|
| 1    | 8    | 1        | 0-1        | -          | -     | ~6   |
| 2    | 12   | 1        | 1-2        | -          | -     | ~9   |
| 3    | 16   | 1-2      | 1-2        | -          | -     | ~12  |
| 4    | 20   | 1-2      | 2          | -          | 0-1   | ~16  |
| 5    | 24   | 1-3      | 1          | 1          | 1     | ~19  |
| 6*   | 20   | 2-3      | 1-2        | -          | 0-1   | ~15  |
| 7*   | 16   | 2-3      | 1-2        | -          | 0-1   | ~11  |
| 8*   | 12   | 2-3      | 0-1        | -          | 0-1   | ~8   |
| 9*   | 8    | 1-2      | 0-1        | -          | 0-1   | ~5   |
| 10*  | 4    | 1        | 0-1        | -          | 0-1   | ~2   |

Ranges: 0-1 = 50/50 (avg .5); 1-2 = 50/50 (avg 1.5); 1-3 = 33/33/33
(avg 2); 2-3 = 50/50 (avg 2.5); fixed = 100%. Verified over 300
boards.

BALANCE FLAG (Claude): LIGHT now first appears tier 3 (was tier 2)
and only 0-1 there. First BLACKOUT (day 10) needs LIGHT >= 3, so a
run may hit it before enough LIGHT exists = likely early death.
Intended pressure or too tight? Playtest will tell.

DOG COMPANION (user 07-22, NOT built): a 5th "survivor" - a dog -
found somewhere in TIER 6. Details TBD; revisit when building tier
6. Interactions to settle then: does it lift SURV_CAP to 5, and does
it count for the sole-survivor / MC-death rules (probably not - it
is a companion, not MARA-or-recruit).

(Tier 0 = origin, fixed 07-23: 1 APARTMENT + 1 LIGHTHOUSE + 2 EMPTY
LOTS, all owned from the start. Lighthouse = 1 starting LIGHT. Board
starts open; MYSTERY tile removed from the game.)

## Full tile list (in game today; synced 07-23)
- MATERIAL: owned = +1/day passive (b2 upgrade variant +2/day).
  PERMANENT, NOT ACTIONABLE: no stationing, no tasks, no buttons.
- STREETLAMP: illuminate = +1 LIGHT; stays a persistent structure.
  Lost to CREEP = -1 LIGHT.
- LIGHTHOUSE: same as streetlamp; currently +1 LIGHT (+2 intended
  later, user adds). 1 pre-owned at origin, 1 spawns tier 5.
- EMBER: illuminate = +1 EMBER banked, becomes EMPTY LOT.
- EMPTY LOT: owned lot can BUILD a MATERIAL tile (5 MATERIAL,
  1 day).
- APARTMENT: origin building, art live, no mechanics yet.
- REMOVED from the game 07-23: FOOD, CAMPFIRE, SUPPLY CACHE,
  RUBBLE, MYSTERY, HOUSE.

## Tiles (designed, not built yet)
- HOSPITAL: health (sickness, medication), arrives mid game.
