# Scoundrel

A single-player dungeon-crawler card game built with React + TypeScript.

**[Play the live demo](https://scoundrel-by-kro.vercel.app/)** | **[Read the rules](#how-to-play)**

## About

Scoundrel is a solo card game played with a modified 42-card deck. Each room deals four
cards: enemies, weapons, and health potions. Pick three, leave the fourth for the next
room, and survive to the end of the deck.

- 42-card deck, 20 HP. No Aces, and no face Hearts or Diamonds.
- Weapon durability. A weapon can only defeat enemies up to the rank it last fought.
- Sweep-to-skip. Drag the room aside, click a gutter, or press the arrow keys to defer
  the whole room to the bottom of the deck.
- Score based on remaining HP plus the ranks of every enemy you defeated.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## How to play

### The basics

- You start with **20 HP**.
- Each room reveals **4 cards** from the deck.
- You must pick **exactly 3 cards**, one at a time.
- The 4th card carries over to the next room.

### Card types

| Suit | Type | Effect |
|------|------|--------|
| ♥ Hearts | Health Potion | Restore HP equal to the card rank (max 20) |
| ♦ Diamonds | Weapon | Equip it to reduce enemy damage |
| ♠ Spades | Enemy | Fight. Take damage based on the card rank |
| ♣ Clubs | Enemy | Fight. Take damage based on the card rank |

### Combat

**Without a weapon:** damage equals the enemy rank. A ♠10 deals 10.

**With a weapon:** damage equals the enemy rank minus the weapon rank. A ♠10 against a ♦7
weapon deals 3. The weapon then wears down (see below).

### Weapon durability

After you defeat an enemy, the weapon can only defeat enemies with ranks **less than or
equal to** the one you just fought.

1. Equip a ♦7 weapon (fresh).
2. Defeat a ♠10 enemy. The weapon is now limited to enemies of rank 10 or lower.
3. It can still defeat another ♠10.
4. It cannot defeat a ♠11 or higher, and becomes useless.

### Skipping a room

Before picking any card, you can sweep the entire room away:

- **Left to right:** the leftmost card returns first, the rightmost is buried deepest.
- **Right to left:** the rightmost card returns first, the leftmost is buried deepest.

Sweep by dragging the room off the mat, clicking a gutter arrow, or pressing `←` / `→`.
Once you have picked a card, skipping is off the table for that room.

### Win and lose

- **Victory:** the deck runs out with fewer than 4 cards remaining.
- **Defeat:** your HP reaches 0.

### Scoring

```
Final Score = Remaining HP + Sum of all defeated enemy ranks
```

## Tech stack

- **React 18** with TypeScript
- **Vite** for the build and dev server
- **React Router** for the `/`, `/dev`, and `/rules` routes
- Plain CSS with design tokens, no UI framework and no CSS-in-JS
- Game logic in `src/game/` is pure functions with no side effects

## Design

The UI follows a locked green-felt table identity. Tokens live in `src/index.css`, component
styles in `src/styles/`, and the rules are written up in [docs/design.md](docs/design.md).

## Testing

Tests are `console.assert` functions in `src/game/*.test.ts`, with no test framework.

1. Start the dev server: `npm run dev`.
2. Open `/dev`.
3. Click **Run All Tests**.
4. Check the browser console (F12) for results.

Covered: deck creation and shuffling, card classification, room management and skipping,
weapon equip and durability, combat, card resolution, and the game controller.

## Commands

```bash
npm run dev       # dev server
npm run build     # typecheck (tsc -b) then production build
npm run preview   # preview the production build
npm run lint      # eslint
```

## Game rules

The full rules are at `/rules` in the app and in [GAME_RULES.md](GAME_RULES.md).

## License

MIT.
