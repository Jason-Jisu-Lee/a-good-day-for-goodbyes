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

## Survivors + recruit sources (user-locked 07-22)
- ROSTER CAP = 4: START with MARA (MC) + REED (2), then 2 found.
- Recruits come from CAMPFIRE tiles: EXACTLY 1 in tier 2 and 1 in
  tier 4. NO campfire in tiers 1 or 3 (those slots are RUBBLE now).
  No survivor findable at tier 1.
- Origin MYSTERY does NOT recruit; resolves 50/50 to MATERIAL or
  FOOD + opens the board.
- Names: MARA + REED start; recruits (placeholder) JUNE, OKON.
  Faces 0 (MARA), 2 (REED), 3/4 (recruits).

## Tier spawn spec (07-22; live in newgame.js TIER_SPEC)
Each count ROLLS UNIFORM per board (a range = each value equally
likely). The rest of the tier fills with EMPTY LOT. RUBBLE starts
tier 4; LIGHT starts tier 3; CAMP only tiers 1-3 (the 3 recruits).
Tiers 1-5 = USER-LOCKED. Tiers 6-10 = CLAUDE DRAFT (*), playtest
pending. "-" = none.

| TIER | SIZE | CAMP | FOOD | MATERIAL | CACHE | LIGHT | RUBBLE | EMBER | ~LOT |
|------|------|------|------|----------|-------|-------|--------|-------|------|
| 1    | 8    | -    | 1    | 1        | 1     | -     | 1      | -     | 4    |
| 2    | 12   | 1    | 0-2  | 1        | 0-2   | -     | -      | -     | ~8   |
| 3    | 16   | -    | 1-2  | 1-2      | 1-2   | 0-1   | 1      | -     | ~10  |
| 4    | 20   | 1    | 1-2  | 1-2      | 1-2   | 1-2   | 2      | 0-1   | ~10  |
| 5    | 24   | -    | 1-3  | 1-3      | 1-2   | 1-2   | 2      | 1     | ~14  |
| 6*   | 20   | -    | 2-3  | 2-3      | 1-2   | 1-2   | 2-3    | 0-1   | ~6   |
| 7*   | 16   | -    | 1-2  | 2-3      | 1-2   | 1-2   | 2      | 0-1   | ~4   |
| 8*   | 12   | -    | 1-2  | 2-3      | 1     | 0-1   | 2      | 0-1   | ~2   |
| 9*   | 8    | -    | 1    | 1-2      | 1     | 0-1   | 1      | 0-1   | ~1   |
| 10*  | 4    | -    | 1    | 1        | -     | 0-1   | -      | 0-1   | ~0-2 |

Range percentages (uniform roll, each value equally likely):
- 0-1 = 50% / 50%        (avg 0.5)
- 0-2 = 33% / 33% / 33%  (avg 1.0)
- 1-2 = 50% / 50%        (avg 1.5)
- 1-3 = 33% / 33% / 33%  (avg 2.0)
- 2-3 = 50% / 50%        (avg 2.5)
- a fixed number (e.g. RUBBLE 2) = 100% that count.
~LOT = whatever's left after the rolled tiles fill to SIZE (so it
also varies board to board). Verified over 500 boards: tier averages
match these ranges.

BALANCE FLAG (Claude): LIGHT now first appears tier 3 (was tier 2)
and only 0-1 there. First BLACKOUT (day 10) needs LIGHT >= 3, so a
run may hit it before enough LIGHT exists = likely early death.
Intended pressure or too tight? Playtest will tell.

DOG COMPANION (user 07-22, NOT built): a 5th "survivor" - a dog -
found somewhere in TIER 6. Details TBD; revisit when building tier
6. Interactions to settle then: does it lift SURV_CAP to 5, and does
it count for the sole-survivor / MC-death rules (probably not - it
is a companion, not MARA-or-recruit).

(Tier 0 = origin, fixed 07-22: 1 HOUSE + 1 LIGHT + 1 FOOD + 1
MYSTERY. The origin LIGHT tile gives 1 starting LIGHT. Mystery =
tutorial first-illuminate: resolves 50/50 to MATERIAL or FOOD +
opens the board. No longer recruits, cap-4 change.)

## Full tile list (in game today; synced 07-19, turn-based)
- HOUSE: origin building. Owned house = +1 to the HUD survivor cap.
- APARTMENT: exists in code, +1 cap like HOUSE (2 designed, not
  wired). FLAG: spawns NOWHERE right now (not in origin, not in any
  tier bag).
- FOOD: owned = +1 FOOD per day passive; STATION 1 survivor = +3
  more (4 total). EMBER UPGRADE can make one spawn as a +2/day
  variant (10/20/30% chance).
- MATERIAL: owned = +1 MATERIAL per day passive; STATION 1 survivor
  = +3 more (4 total). Same +2/day upgrade variant as FOOD.
- RUBBLE (07-22): dark obstruction, not illuminatable. CLEAR = pay
  5 MATERIAL, removed IMMEDIATELY (no days, no payout) -> owned
  EMPTY LOT. In tiers 1, 3, 4, 5 (where campfires were removed from
  1/3).
- CAMPFIRE: illuminate = 1 recruit joins; tile STAYS a labeled
  CAMPFIRE (07-21). 1 in tier 2 + 1 in tier 4 (07-22; start already
  has MARA+REED, so these 2 fill the roster to 4).
  Future: can be CLEARED and re-used as another tile (not built).
- SUPPLY CACHE: illuminate = 2-3 MATERIAL or 2-3 FOOD (50/50 which,
  amount 2-3 uniform), becomes EMPTY LOT.
- LIGHT (lighthouse): illuminate = +1 LIGHT, tile STAYS a labeled
  LIGHT structure (like CAMPFIRE, not converted to a lot). No daily
  production, nothing spends it. Tied to the tile: if that tile is
  taken by CREEP, LIGHT drops by 1. LIGHT is the blackout-survival
  currency. Sources: 1 at origin (pre-owned, never attacked) + tier
  3+ LIGHT tiles (illuminated, and now a real attack target). HUD
  shows LIGHT from the start.
- EMBER: reclaim = +1 EMBER banked, becomes EMPTY LOT. Spawn 0 for
  now (percentage discussion pending).
- EMPTY LOT: empty ground. BUILD (07-22, built): an owned lot can
  be built into a FOOD or MATERIAL tile for 5 MATERIAL, takes 1 day
  (panel = FOOD / MATERIAL buttons). HOUSE build TBD.
- UNKNOWN (origin mystery): tutorial tile; illuminate = becomes a
  MATERIAL or FOOD tile (50/50) + opens the board (07-22: no longer
  recruits, cap 4).

## Tiles (designed, not built yet)
- HOSPITAL: health (sickness, medication), arrives mid game.

## Shelter (partially wired)
- HUD shows SURVIVORS n/cap; cap = owned HOUSE + APARTMENT count
  (each +1 today). Designed: house 1, apartment 2. Cap not enforced
  on recruiting yet.

## Origin 2x2 (user 07-12)
- 2 HOUSE + 1 FOOD + 1 MYSTERY, arrangement random.
- RUBBLE out of the origin (spawns in tiers 1-9 per the table).

## Tile candidates (Claude brainstorm 07-12; user picks, names
placeholder)
- Blueprint chain: WORKSHOP (craft site, weapons made here) /
  LIBRARY (slow safe blueprint via research) / HARDWARE STORE
  (blueprint + small materials) / POLICE STATION (finished weapon,
  danger-guarded) / RADIO TOWER (pings a far tile) / SCHOOL (+1
  stat training).
- Risk + variance: LOCKED SHELTER (pay materials, random big
  payout) / HIDEOUT (recruit + personal item) / COLLAPSED STORE
  (rubble in front of a fat cache).
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

## UI note
- Floating text live: one-time payouts (rubble finish roll) and
  CONSUMED pop above the tile. Cache payout has NO float yet
  (flagged; random food-or-material outcome is invisible).
