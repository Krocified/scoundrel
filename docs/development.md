# Scoundrel — Development Guide

## Prerequisites

- Node.js >= 18
- npm >= 9

## Setup

```bash
npm install
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server at `http://localhost:5173` |
| `npm run build` | Typecheck (`tsc -b`) then production build (`vite build`) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint across all source files |

## Type Checking

TypeScript checking is bundled into `npm run build`. For standalone typechecking:

```bash
tsc -b
```

The project uses two `tsconfig` files:
- `tsconfig.app.json` — for `src/` code
- `tsconfig.node.json` — for `vite.config.ts`

**Strict rules:**
- `verbatimModuleSyntax` — use `import type` for type-only imports
- `noUnusedLocals` — errors on unused variables
- `noUnusedParameters` — errors on unused parameters

## Project Structure

```
src/
├── game/          # Pure function game logic (no React)
├── components/    # React components
├── pages/         # Route-level page components
├── contexts/      # React context providers
├── config/        # Static configuration
├── types/         # TypeScript type definitions
└── styles/        # CSS custom properties
```

## Testing

Tests are console.log-based and run in the browser — no test framework dependency.

### Running Tests

1. Start dev server: `npm run dev`
2. Open `http://localhost:5173/dev`
3. Click **"Run All Tests"**
4. Check browser console (F12) for results

### Writing Tests

Each game module has a co-located test file:

```typescript
// src/game/deck.test.ts
export function testDeck(): void {
  const deck = createDeck()
  console.assert(deck.length === 42, 'Deck should have 42 cards')
  // ... more assertions
}
```

Test files are imported and run by `src/game/runAllTests.ts`.

### Test Coverage

| Module | File | What's Tested |
|--------|------|---------------|
| Deck | `deck.test.ts` | deck creation, shuffle, validation |
| Card Utils | `cardUtils.test.ts` | type classification, values, display |
| Room Manager | `roomManager.test.ts` | room init, skip, leftover, deck depletion |
| Weapon System | `weaponSystem.test.ts` | equip, wear, durability, replacement |
| Combat | `combat.test.ts` | damage calc, healing, death |
| Card Actions | `cardActions.test.ts` | pick resolution, room completion, scoring |
| Game Controller | `gameController.test.ts` | full game flow, win/loss, multi-room |

## Adding a Feature

### New Card Type
1. Add to `CardType` union in `src/types/game.ts`
2. Add classification logic in `src/game/cardUtils.ts`
3. Add resolution logic in `src/game/cardActions.ts`
4. Add UI handling in `src/components/GameBoard.tsx`
5. Add tests in a new `.test.ts` file

### New Visual Theme
1. Add `[data-theme="my-theme"]` CSS block in `src/styles/variables.css`
2. Add theme entry in `src/config/deckCustomization.ts`
3. The `DeckCustomizationProvider` will pick it up automatically

### New Power-Up
1. Add reducer action type to game state
2. Add new fields to `GameState` interface
3. Implement reducer logic
4. Dispatch from components as needed

## Architecture Principles

- **Pure functions** for game logic — no side effects, fully testable
- **Single responsibility** — each module does one thing
- **No game logic in components** — components only render state and dispatch actions
- **Immutable state** — all state mutations return new objects
- **CSS custom properties** for theming — no runtime style recalculation

## Common Pitfalls

- **Import type** — remember `verbatimModuleSyntax` requires `import type` for type-only imports
- **Unused variables** — `noUnusedLocals` and `noUnusedParameters` are strict; prefix unused params with `_` or remove them
- **State immutability** — always spread/return new objects; never mutate `gameState` directly
- **Card IDs** — must be unique; format is `"${suit}-${rank}"`

## Debugging

- Use `/dev` route for test runner and system status
- Game action log (`GameLog` component) shows all resolved actions in sequence
- Browser DevTools console shows test results and any assertion failures
- React DevTools can inspect `GameBoard` state for debugging game flow

## Deployment

```bash
npm run build     # outputs to dist/
npm run preview   # verify production build locally
```

The `dist/` folder can be deployed to any static host (Vercel, Netlify, GitHub Pages, etc.).
