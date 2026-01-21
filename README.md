# Scoundrel

A single-player dungeon crawler card game built with React + TypeScript.

## About

Scoundrel is a strategic card game using a modified 52-card deck (42 cards). Navigate through rooms, manage health and weapons, and survive to achieve the highest score!

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
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
- **Cards:** Hearts (health), Diamonds (weapons), Spades/Clubs (enemies)
- **Rooms:** Each room has 4 cards, pick 3 or skip the room

See [GAME_RULES.md](GAME_RULES.md) for complete rules.

## Tech Stack

- React 18
- TypeScript
- Vite
- No external dependencies (pure game logic)

## Development

```bash
# Test the deck system
open deck-demo.html
```

See [PROGRESS.md](PROGRESS.md) for current development status.
