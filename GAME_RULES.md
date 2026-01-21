# Scoundrel - Game Rules

## Overview
Scoundrel is a single-player dungeon crawler card game using a modified 52-card deck. Players must navigate through rooms of cards, managing health, weapons, and combat to survive all 42 cards.

## Setup

### Deck Composition
- Start with a standard 52-card deck
- **Remove the following 10 cards:**
  - All 4 Aces (♠A, ♥A, ♦A, ♣A)
  - King, Queen, Jack of Hearts (♥K, ♥Q, ♥J)
  - King, Queen, Jack of Diamonds (♦K, ♦Q, ♦J)
- **Remaining: 42 cards**
- Shuffle the deck

### Starting Conditions
- Player starts with **20 HP** (maximum)
- No weapon equipped
- No leftover cards

## Card Types

| Suit | Ranks Available | Type | Effect |
|------|----------------|------|--------|
| ♥ Hearts | 2-10 | Health Potion | Restore HP (max 20) |
| ♦ Diamonds | 2-10 | Weapon | Equip weapon (replaces current) |
| ♠ Spades | 2-10, J, Q, K | Enemy | Fight enemy (take damage) |
| ♣ Clubs | 2-10, J, Q, K | Enemy | Fight enemy (take damage) |

### Card Values
- Number cards: face value (2-10)
- Jack (J): 11
- Queen (Q): 12
- King (K): 13

## Gameplay Loop

### Room Phase
1. **First Room:** Reveal 4 cards from the top of the deck
2. **Subsequent Rooms:**
   - If previous room was **cleared**: Reveal leftover card + 3 new cards
   - If previous room was **skipped**: Reveal 4 new cards from deck

### Player Action Phase
Player must choose ONE of two actions:

#### Option A: PICK (Clear the Room)
- Select 3 cards from the 4 available, one at a time
- Cards resolve immediately upon selection
- **Once you pick any card, you MUST complete the room (pick 3 total)**
- The 4th unpicked card becomes the "leftover" for the next room

#### Option B: SKIP (Defer the Room)
- Can only skip if you haven't picked any cards yet
- Choose a direction: **Left→Right** or **Right→Left**
- All 4 cards return to the bottom of the deck in the chosen order:
  - Left→Right: cards [0,1,2,3] go to bottom in that order
  - Right→Left: cards [3,2,1,0] go to bottom in that order
- Next room will have 4 new cards (no leftover)
- **No limit** on number of skips

## Card Effects

### Health Potion (♥ Hearts)
- Immediately restore HP equal to card's rank
- Cannot exceed 20 HP maximum
- Example: At 12 HP, using ♥9 → 20 HP (not 21)

### Weapon (♦ Diamonds)
- Equip the weapon immediately
- **Only one weapon can be equipped at a time** (new weapon replaces old)
- Weapon starts "fresh" with no durability restrictions
- Weapon persists across rooms until replaced

### Enemy (♠ Spades, ♣ Clubs)
- Immediately enter combat
- Resolve damage based on weapon status (see Combat section)

## Combat System

### Damage Calculation

#### Without a Weapon
- Player takes damage equal to the enemy's rank
- Example: Fighting ♠7 → take 7 damage

#### With a Weapon (Unused)
- Player takes: `max(0, enemy_rank - weapon_rank)` damage
- After combat, weapon durability is reduced (see below)
- Example: ♦5 weapon vs ♠9 enemy → take 4 damage

#### With a Weapon (Used)
- Weapon can only be used against enemies with rank **strictly less than** the last enemy defeated
- If weapon cannot be used: take full enemy damage (as if no weapon)
- Example: ♦5 defeated ♠9 → weapon can only defeat enemies with rank ≤8

### Weapon Durability System
When you use a weapon to fight an enemy:
1. Calculate damage: `max(0, enemy_rank - weapon_rank)`
2. The defeated enemy's rank becomes the weapon's "max enemy threshold"
3. Weapon can now only defeat enemies with rank < threshold
4. If enemy rank ≥ threshold: weapon cannot be used, take full damage

**Example Sequence:**
- Equip ♦5 weapon (fresh, unused)
- Fight ♠9: take 4 damage, weapon now limited to enemies rank <9
- Fight ♠8: take 3 damage, weapon now limited to enemies rank <8
- Fight ♣10: weapon can't be used (10 ≥8), take 10 damage, weapon still limited to <8
- Equip new ♦7 weapon: resets durability (fresh weapon)

### Visual Representation (IRL)
When playing with physical cards, place the defeated enemy card on top of the weapon card at an offset, showing only the enemy's rank. This visually indicates the weapon's current durability limit.

## Win/Loss Conditions

### Victory
- Deck has fewer than 4 cards remaining (cannot form a complete room)
- Player HP must be above 0
- Any remaining cards on the board are not counted

### Defeat
- Player HP reaches 0 or below
- Game ends immediately

## Scoring System

Your final score is calculated as:

```
Score = Remaining HP + Sum of all defeated enemy ranks
```

**Components:**
- **Remaining HP:** Your HP at the end of the game (1-20)
- **Defeated Enemies:** Sum of all enemy card ranks you fought (whether you had a weapon or not)

**Notes:**
- Remaining cards on the board do NOT count toward your score
- Higher score = better performance
- Maximum theoretical score: 20 HP + sum of all 22 enemies in deck

**Example:**
- Finished with 15 HP
- Defeated enemies: ♠7, ♣10, ♠K(13), ♣5, ♠8 = 7+10+13+5+8 = 43
- Final Score: 15 + 43 = **58 points**

## Strategic Elements

### Skip Mechanic Strategy
- **Deck counting:** Track which cards remain to plan skips
- **Order manipulation:** Use skip direction to control card reappearance order
- **Resource management:** Skip bad rooms to find health/weapons first
- **Cycle planning:** Skipped cards will return after ~10 rooms (deck cycles)

### Weapon Management
- Fresh weapons are valuable - they can defeat any enemy once
- Consider equipping lower weapons for weak enemies to preserve durability
- High-value weapons (♦9, ♦10) can defeat most enemies even after use

### Health Management
- Maximum 20 HP - don't waste high-value potions at full health
- Plan ahead: skip rooms with only health when at full HP
- Save health for after difficult combat sequences

## Edge Cases

### Deck Depletion During Skip
- If deck has fewer than 4 cards and you try to skip, the game may become unwinnable
- Always ensure you can draw the required cards

### Room Clearing With Insufficient Deck
- If deck runs out mid-room (after 2 picks), you cannot complete the room
- This shouldn't happen with proper math (42 cards = 14 rooms max)

## Game Statistics

Track the following during gameplay:
- Current HP
- Rooms cleared
- Rooms skipped  
- Cards remaining in deck
- Total damage taken
- Equipped weapon status (rank + durability limit)

---

*Version 1.0 - Core Rules*
