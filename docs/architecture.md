# Scoundrel — Architecture Documentation

## 1. High-Level Architecture

```
┌─────────────────────────────────────────────────┐
│                    Entry (main.tsx)              │
│                     React.StrictMode              │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│              App.tsx (Router)                    │
│  / → GameBoard  │  /dev → DevTools  │  /rules   │
└──────────────────┬──────────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
┌───────▼───────┐    ┌───────▼───────┐
│  GameBoard    │    │  DevTools     │
│  (useState)   │    │  (test runner)│
│  State:       │    └───────────────┘
│  GameState    │
└───────┬───────┘
        │
        │  Uses pure game functions
        ▼
┌─────────────────────────────────────────────────┐
│              src/game/ (Pure Functions)          │
│  deck.ts → cardUtils.ts → roomManager.ts        │
│  → weaponSystem.ts → combat.ts → cardActions.ts │
│  → gameController.ts                             │
└─────────────────────────────────────────────────┘
```

## 2. Directory Structure

```
src/
├── main.tsx                      Entry point
├── App.tsx                       Router + providers
│
├── types/
│   ├── game.ts                   Core domain types (Card, GameState, etc.)
│   └── deckCustomization.ts      Classic deck config types
│
├── config/
│   └── deckCustomization.ts      Classic deck config (card back, boss art, fonts)
│
├── game/                         7 logic modules + 7 test files
│   ├── deck.ts                   Deck creation, shuffle, validation
│   ├── cardUtils.ts              Card classification, display helpers
│   ├── combat.ts                 Damage, healing, death checks
│   ├── weaponSystem.ts           Equip, durability, usage validation
│   ├── roomManager.ts            Room lifecycle, skip mechanic
│   ├── cardActions.ts            Card pick resolution
│   ├── gameController.ts         Top-level orchestrator
│   ├── runAllTests.ts            Test runner aggregator
│   └── *.test.ts                 Console.log-based tests
│
├── components/                   13 React components (+3 room-card variants)
│   ├── GameBoard.tsx             Main game board
│   ├── RoomCard.tsx              Viewport-adaptive card
│   ├── roomCard/                 Card variants (Base, PC, Mobile)
│   ├── PlayerStats.tsx           HP bar, score, rooms, deck
│   ├── WeaponDisplay.tsx         Equipped weapon panel
│   ├── GameLog.tsx               Action log
│   ├── DeckDisplay.tsx           Visual deck stack
│   ├── GameOverScreen.tsx        Win/loss overlay
│   ├── SkipButtons.tsx           Directional skip controls
│   ├── PickedCardPlaceholder.tsx Picked card slot
│   ├── IconButton.tsx            Reusable button/link
│   ├── NewGameButton.tsx         New game trigger
│   ├── Title.tsx                 App title
│   ├── Footer.tsx                Credit footer
│   └── index.ts                  Barrel exports
│
├── pages/
│   ├── DevTools.tsx              Test runner page
│   └── Rules.tsx                 Game rules page
│
└── index.css                     Global reset + green-felt palette
```

## 3. Data Flow

### 3.1 Game State (Local Component State)

Game state is managed via `useState` in `GameBoard.tsx`, not a global store. This keeps game logic encapsulated and avoids unnecessary re-renders.

```
Player Action
     │
     ▼
GameBoard.processCardPick(cardIndex)
     │
     ▼
gameController.ts ──→ cardActions.ts ──→ combat.ts / weaponSystem.ts
     │                                    roomManager.ts / deck.ts
     ▼
  Returns { gameState, log }
     │
     ▼
  useState setter updates GameState
     │
     ▼
  React re-renders all child components
```

### 3.2 Deck Configuration (Static Import)

There is no configuration context or localStorage persistence. Card faces use a single
static classic deck config (`src/config/deckCustomization.ts`) imported directly by the
card, deck, and weapon components. The app has one locked visual identity.

### 3.3 State Shape

```typescript
interface GameState {
  deck: Card[]                    // remaining cards (order matters)
  currentRoom: Card[]             // 4 visible cards
  leftoverCard: Card | null       // unpicked card from previous room
  player: PlayerState             // hp, weapon, durability
  cardsPickedThisRoom: number     // 0-3
  gameStatus: 'playing' | 'won' | 'lost'
  roomsCleared: number
  roomsSkipped: number
  defeatedEnemies: number[]       // rank values for scoring
}
```

## 4. Key Design Decisions

### 4.1 Pure Functions for Game Logic

All game logic modules export only pure functions — no classes, no side effects, no state. This makes them:
- Deterministic (same input → same output)
- Fully testable without mocks
- Independent of React's render cycle
- Easy to reason about and debug

### 4.2 Component-Based Card Rendering

Cards use a unified `RoomCard` component that detects viewport width and delegates to `PCRoomCard` or `MobileRoomCard`. This avoids duplication while providing optimized layouts per device.

### 4.3 No State Management Library

`useState` in `GameBoard.tsx` is sufficient for single-player local state. Adding
Redux/Zustand would add complexity without benefit.

### 4.4 CSS Custom Properties

The green-felt identity is defined once as CSS variables in `src/index.css` (`:root`).
Components reference the variables; there is no runtime theme switching.

## 5. Game Loop Flow

```
  ┌──────────────────┐
  │  New Game        │
  │  - Shuffle deck  │
  │  - Init player    │
  │  - Deal room     │
  └────────┬─────────┘
           │
           ▼
  ┌──────────────────┐     ┌──────────────────┐
  │  Room Displayed  │────▶│  Skip Room       │
  │  4 cards shown   │◀────│  - L→R or R→L    │
  └────────┬─────────┘     │  - Cards to back  │
           │               │  - New room dealt │
           ▼               └──────────────────┘
  ┌──────────────────┐
  │  Pick Card       │
  │  - Resolve type  │
  │  (health/damage/ │
  │   weapon)        │
  └────────┬─────────┘
           │
           ▼
  ┌──────────────────┐
  │  Room Complete?  │
  │  3 cards picked  │
  └────┬────────┬────┘
       │ YES    │ NO
       ▼        │
  ┌──────────┐  │
  │ Advance  │  └──▶ Continue picking
  │ Room     │
  │ - Move   │
  │ leftover │
  │ - Deal 3 │
  │ new cards│
  └────┬─────┘
       │
       ▼
  ┌──────────────────┐
  │  Check Win/Loss  │
  │  - Deck < 4? WIN │
  │  - HP ≤ 0?  LOSS │
  └────┬────────┬────┘
       │ WIN    │ LOSS
       ▼        ▼
  ┌────────┐ ┌────────┐
  │ Victory│ │ Defeat │
  │ Screen │ │ Screen │
  └────────┘ └────────┘
```

## 6. Testing Strategy

Tests use `console.assert()` in browser — no test framework dependency. Each module has a corresponding `.test.ts` file. The `runAllTests.ts` aggregate imports and runs all suites on the `/dev` route.

| Module | Tests |
|--------|-------|
| `deck.test.ts` | Deck size (42), suit counts, shuffle correctness |
| `cardUtils.test.ts` | Type classification, value extraction, display strings |
| `roomManager.test.ts` | Room init, leftover handling, skip directions, deck depletion |
| `weaponSystem.test.ts` | Equip, wear, durability degradation, replacement reset |
| `combat.test.ts` | Damage with/without weapon, worn weapon cap, healing, death |
| `cardActions.test.ts` | Card pick all types, room completion, health cap, death |
| `gameController.test.ts` | Full game flow, scoring, multi-room, skip, win/loss |

## 7. Extensibility Points

- **Card types:** Extend `CardType`, add handler in `cardActions.ts`
- **Card art / fonts:** Edit the single classic config in `deckCustomization.ts`
