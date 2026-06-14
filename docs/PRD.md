# Scoundrel — Product Requirements Document

## 1. Executive Summary

Scoundrel is a single-player dungeon crawler card game built as a web application. It adapts the physical card game "Scoundrel" into a digital experience with a clean, responsive UI, strategic gameplay, and zero external game dependencies. The game uses a modified 42-card deck where players navigate rooms of enemies, weapons, and health potions in a roguelike format.

## 2. Product Goals

- Deliver a faithful digital adaptation of the Scoundrel card game
- Provide an intuitive, responsive interface for desktop and mobile
- Ensure all game logic is correct, tested, and deterministic
- Support extensibility (visual themes, deck customization, future power-ups)
- Deliver sub-second response times for all player actions

## 3. Target Audience

- Casual card game players
- Roguelike / strategy game enthusiasts
- Web gamers looking for quick (~5-10 minute) sessions
- Self-hosted / open-source hobbyists

## 4. Core Features

### 4.1 Game Mechanics

| Feature | Priority | Description |
|---------|----------|-------------|
| 42-card deck construction | P0 | Strip Aces + face Hearts/Diamonds from standard deck |
| Fisher-Yates shuffle | P0 | Deterministic, unbiased shuffle |
| Room system | P0 | 4-card rooms, pick 3, 4th carries over |
| Card type resolution | P0 | Health (hearts), Weapon (diamonds), Enemy (spades/clubs) |
| Weapon durability system | P0 | Fresh + worn weapon states with max-enemy tracking |
| Damage calculation | P0 | With/without weapon, worn-weapon limits |
| Room skip mechanic | P0 | Left→Right and Right→Left directional reordering |
| Win/loss conditions | P0 | Deck exhausted (win) or HP reaches 0 (loss) |
| Scoring system | P0 | Remaining HP + sum of defeated enemy ranks |

### 4.2 UI/UX

| Feature | Priority | Description |
|---------|----------|-------------|
| Responsive card display | P0 | Desktop and mobile card layouts |
| HP bar + player stats | P0 | Always-visible status bar |
| Weapon display | P0 | Shows equipped weapon + durability limit |
| Game action log | P0 | Scrolling log of all actions |
| Skip buttons | P0 | Two directional skip buttons |
| Game over screen | P0 | Win/loss with score breakdown |
| New game flow | P0 | Start new game from any state |

### 4.3 Configuration & Customization

| Feature | Priority | Description |
|---------|----------|-------------|
| Color mode toggle | P1 | Distinct (blue/red/green) vs traditional (red/black) suit colors |
| Deck theme selection | P1 | Classic / Esoteric visual themes |
| Settings persistence | P1 | localStorage for prefs |
| Dark fantasy visual theme | P0 | Default dark theme |

### 4.4 Power-Up System

| Feature | Priority | Description |
|---------|----------|-------------|
| Post-victory power selection | P1 | On win, player chooses 1 of 3 random power-ups |
| Persistent meta-progression | P1 | Selected powers saved to localStorage and carried into subsequent runs |
| Power-up effects | P1 | Each power modifies gameplay (e.g., bonus HP, starting weapon, damage boost) |
| Power-up display on scoreboard | P1 | Visible but non-intrusive power-up indicators on the scoreboard with a toggle to show/hide |
| Consistent power-up UI styling | P1 | Power selection and claim reward button use the same fonts and styling as the rest of the app |
| Stacking runs | P2 | Multiple victories stack additional power-ups across sessions |

### 4.5 Developer Tools

| Feature | Priority | Description |
|---------|----------|-------------|
| In-browser test runner | P1 | `/dev` route with "Run All Tests" |
| Comprehensive unit tests | P0 | 7 test suites covering all game logic |

## 5. Technical Requirements

### 5.1 Platform

- **Runtime:** Modern web browsers (Chrome, Firefox, Safari, Edge)
- **Framework:** React 18 with TypeScript
- **Build:** Vite 6
- **Routing:** React Router v7 (client-side)
- **Styling:** Pure CSS with custom properties (no framework)

### 5.2 Browser Support

- ES2020+ compliant browsers
- CSS Custom Properties support
- No IE11 support required

### 5.3 Performance Targets

- Initial load: < 2s on average connection
- Action response: < 100ms
- Bundle size: < 200KB JS (gzipped)
- Zero runtime dependencies beyond React + React Router

### 5.4 Security

- No user accounts or authentication
- No network requests (fully client-side)
- No data collection or analytics
- No external API dependencies

## 6. User Stories

### 6.1 Playing the Game

```
As a player
I want to see 4 cards in a room
So that I can decide which to pick and which to leave

As a player
I want my HP, weapon, and score displayed at all times
So that I can make informed strategic decisions

As a player
I want to skip a room in either direction
So that I can reorder bad cards strategically
```

### 6.2 Learning the Game

```
As a new player
I want to read the complete rules
So that I understand how to play

As a new player
I want clear feedback on every action
So that I learn the mechanics through play
```

### 6.3 Meta-Progression

```
As a returning player
I want to earn a power-up when I beat the game
So that my next run has a new advantage

As a returning player
I want my earned power-ups to persist between sessions
So that I feel my progress is permanent
```

### 6.4 Customization

```
As a returning player
I want to change the card colors or theme
So that the game feels fresh
```

## 7. Non-Goals

- Multiplayer or online play
- Leaderboards or social features
- User accounts or authentication
- Monetization (ads, purchases)
- Mobile native app (PWA possible but not primary)
- Sound effects or music
- Animations beyond CSS transitions

## 8. Future Considerations (Post-MVP)

- Additional deck themes (e.g., Sci-Fi, Medieval)
- Achievement tracking
- Game replay (export/import game state)
- PWA with offline support
- Statistics tracking across sessions
- Accessibility enhancements (screen reader support)

## 9. Constraints

- No external game engines or libraries
- Game logic must be pure functions (testable, no side effects)
- All state managed via React Context + useReducer
- CSS-only styling (no CSS-in-JS, no preprocessors)
- TypeScript strict mode with `verbatimModuleSyntax`
