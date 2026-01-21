# 🃏 Scoundrel

A single-player dungeon crawler card game built with React + TypeScript.

## About

Scoundrel is a strategic roguelike card game using a modified 52-card deck (42 cards). Navigate through rooms, manage health and weapons, fight enemies, and survive to achieve the highest score!

**Status: ✅ FULLY PLAYABLE**

## Quick Start

```bash
# Install dependencies (if needed)
npm install

# Run the game
npm run dev

# Open browser
# Navigate to http://localhost:5173
# Click "Play Game" and enjoy!
```

## Project Structure

```
scoundrel/
├── GAME_RULES.md          # Complete game rules
├── PROGRESS.md            # Development progress
├── deck-demo.html         # Standalone deck demo
├── src/
│   ├── types/
│   │   └── game.ts        # TypeScript types
│   ├── game/
│   │   ├── deck.ts        # Deck system
│   │   ├── deck.test.ts   # Deck tests
│   │   └── ...            # More game logic
│   ├── App.tsx            # Main component
│   └── main.tsx           # Entry point
└── ...
```

## Game Overview

- **Goal:** Survive all 42 cards and maximize your score
- **Score:** Remaining HP + Sum of defeated enemy ranks  
- **Cards:** 
  - ♥ Hearts (2-10) = Health potions
  - ♦ Diamonds (2-10) = Weapons
  - ♠ Spades (2-K) = Enemies
  - ♣ Clubs (2-K) = Enemies
- **Gameplay:**
  - Each room has 4 cards
  - Pick 3 cards OR skip the room
  - Cards resolve instantly when picked
  - Weapons have durability (can only defeat weaker enemies after use)
- **Win:** Deck has < 4 cards (can't form complete room)
- **Lose:** HP reaches 0

See [GAME_RULES.md](GAME_RULES.md) for complete rules.

## Features

✅ **Complete game logic** - All 7 core systems fully implemented  
✅ **Strategic gameplay** - Weapon durability, room skipping, card counting  
✅ **Interactive UI** - Click cards to pick, visual feedback, HP bars  
✅ **Skip mechanic** - Return cards to bottom of deck with directional control  
✅ **Score system** - HP + defeated enemies  
✅ **Game log** - Track all actions and outcomes  
✅ **Fully tested** - 7 comprehensive test suites  
✅ **Dev tools** - Built-in test runner

## Tech Stack

- React 18
- TypeScript
- Vite
- No external dependencies (pure game logic)

## Development

```bash
# Run all tests
npm run dev
# Switch to "Dev Tools" tab
# Click "Run All Tests"
# Check console (F12) for results

# Test individual systems
open deck-demo.html  # Deck system demo
```

**Development Status:**
- ✅ All 7 core systems complete
- ✅ All tests passing
- ✅ UI complete and playable
- ✅ Game fully functional

See [PROGRESS.md](PROGRESS.md) for detailed development history.
