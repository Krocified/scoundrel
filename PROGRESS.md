# Scoundrel - Development Progress

## ✅ Completed

### 1. Deck System
**Files created:**
- `src/types/game.ts` - Core TypeScript types for the game
- `src/game/deck.ts` - Deck creation, shuffling, and validation
- `src/game/deck.test.ts` - Test suite for deck functionality
- `deck-demo.html` - Browser-based demo to test the deck

**Features implemented:**
- ✅ Creates exactly 42 cards (removed 4 Aces + 6 face cards from Hearts/Diamonds)
- ✅ Proper card composition:
  - ♥ Hearts: 9 cards (ranks 2-10) - Health Potions
  - ♦ Diamonds: 9 cards (ranks 2-10) - Weapons
  - ♠ Spades: 12 cards (ranks 2-10, J=11, Q=12, K=13) - Enemies
  - ♣ Clubs: 12 cards (ranks 2-10, J=11, Q=12, K=13) - Enemies
- ✅ Fisher-Yates shuffle algorithm for random deck order
- ✅ Deck validation function
- ✅ Unique ID for each card (for React keys)

**How to test:**
1. Open `deck-demo.html` in a browser
2. Click "Run Deck Test" button
3. Verify all tests pass and first room shows 4 cards

---

## 🚧 In Progress

None currently

---

## 📋 To Do

### 2. Card Utilities
- `getCardType()` - Classify card as health/weapon/enemy
- `getCardValue()` - Get numeric value of card

### 3. Room Management
- `initializeFirstRoom()` - Draw 4 cards for first room
- `prepareNextRoom()` - Draw 3 cards + leftover OR 4 cards after skip
- `skipRoom()` - Return 4 cards to bottom of deck with chosen order

### 4. Combat System
- `calculateDamage()` - Compute damage with weapon logic
- `applyDamage()` - Reduce player HP

### 5. Weapon System
- `equipWeapon()` - Equip weapon to player
- `useWeapon()` - Update weapon durability after battle
- `canWeaponDefeat()` - Check if weapon can be used against enemy

### 6. Card Actions
- `pickCard()` - Handle picking a card and resolving its effect

### 7. Game Controller
- `initializeGame()` - Set up new game
- `processCardPick()` - Handle card pick action
- `processRoomSkip()` - Handle room skip action
- `calculateFinalScore()` - Calculate final score
- `getGameStats()` - Get current game statistics

### 8. UI Components
- Minimal text-based UI for testing
- Card display components
- Player stats display
- Action buttons (pick cards, skip room)

### 9. Testing & Polish
- Playtest full game loop
- Verify all rules work correctly
- Add game over screen with score

---

## 📂 Project Structure

```
scoundrel/
├── GAME_RULES.md           # Complete game rules documentation
├── PROGRESS.md             # This file - development progress
├── README.md               # Project readme
├── deck-demo.html          # Standalone deck demo
├── src/
│   ├── types/
│   │   └── game.ts         # TypeScript type definitions
│   └── game/
│       ├── deck.ts         # Deck system
│       └── deck.test.ts    # Deck tests
```

---

## Next Steps

1. **Card Utilities** - Simple classification and value functions
2. **Room Management** - Core game loop mechanics (including skip)
3. **Combat System** - Damage calculations
4. **Weapon System** - Durability tracking
5. **Card Actions** - Effect resolution
6. **Game Controller** - Orchestrate everything
7. **UI** - Simple interface to play the game
