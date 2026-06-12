# AGENTS.md — Scoundrel

## Quick start

```bash
npm install       # already done
npm run dev       # Vite on :5173
```

## Key commands

| Command | What it does |
|---------|-------------|
| `npm run dev` | Vite dev server |
| `npm run build` | `tsc -b && vite build` — typechecks THEN builds |
| `npm run lint` | `eslint .` |
| `npm run preview` | `vite preview` production build |

No dedicated typecheck script — it's bundled in `build`. To typecheck alone: `tsc -b`.

## Tests

No test runner (no vitest/jest). Tests are console.log-based functions co-located in `src/game/*.test.ts`. Run them in-browser at `/dev` — click "Run All Tests", check browser console (F12).

Test files export named functions (`testDeck`, `testCardUtils`, etc.) aggregated by `src/game/runAllTests.ts`.

## Architecture

- **Single-page React 18 app** with Vite, TypeScript, React Router v7, pure CSS
- Entry: `src/main.tsx` → `src/App.tsx`
- Routes: `/` (game), `/dev` (test runner), `/rules` (game rules)
- Game logic in `src/game/` — pure functions, no side effects, fully testable
- **State management**: `GameContext` (useReducer) for game state, `DeckCustomizationContext` for deck themes + visual theme
- **CSS design system** in `src/styles/` — custom properties for theming (dark-fantasy via `data-theme`), component-specific stylesheets
- No CSS framework, no state management library
- Room cards are a single unified component (no PC/Mobile split)

## Extensibility hooks

- **Visual themes**: Add a new `[data-theme="my-theme"]` block in `variables.css`, register in `DeckCustomizationContext`
- **Power-ups / new features**: Add new action types to `GameContext` reducer, new fields to `GameState`, dispatch from any component
- **Retries**: Already supported via `NEW_GAME` action
- **Deck themes**: Add entries in `src/config/deckCustomization.ts`

## TypeScript quirks

- `verbatimModuleSyntax` is on — use `import type` for type-only imports
- `noUnusedLocals` and `noUnusedParameters` are strict errors
- Project references: `tsconfig.app.json` (src), `tsconfig.node.json` (vite.config)

## Game rules

Full rules at `GAME_RULES.md` and `/rules` in-app. 42-card deck (no Aces, no face Hearts/Diamonds). 20 HP max, weapon durability system, room skip mechanic with directional control.
