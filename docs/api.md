# Scoundrel — Game Engine API Reference

## Overview

The game engine in `src/game/` consists of 7 pure-function modules with zero side effects. Each module has a single responsibility and is independently testable.

---

## Module: `deck.ts`

Functions for creating, shuffling, and validating the Scoundrel deck.

### `createDeck(): Card[]`

Creates the standard 42-card Scoundrel deck.

- Removes all 4 Aces and face cards of Hearts/Diamonds (♥K, ♥Q, ♥J, ♦K, ♦Q, ♦J)
- Returns cards in deterministic rank-then-suit order

**Returns:** `Card[]` — 42 cards

**Example:**
```typescript
const deck = createDeck()
// => [{ suit: 'hearts', rank: 2, id: 'hearts-2' }, ...]
```

### `shuffleDeck(cards: Card[]): Card[]`

Fisher-Yates shuffle algorithm. Returns a new array (does not mutate input).

| Parameter | Type | Description |
|-----------|------|-------------|
| `cards` | `Card[]` | Deck to shuffle |

**Returns:** `Card[]` — New shuffled array

### `validateDeck(deck: Card[]): boolean`

Validates deck integrity.

| Parameter | Type | Description |
|-----------|------|-------------|
| `deck` | `Card[]` | Deck to validate |

**Returns:** `boolean` — `true` if deck has 42 cards with 9 hearts, 9 diamonds, 12 spades, 12 clubs

---

## Module: `cardUtils.ts`

Card classification, value extraction, and display helpers.

### `getCardType(card: Card): CardType`

Classifies a card by its suit.

| Parameter | Type | Description |
|-----------|------|-------------|
| `card` | `Card` | Card to classify |

**Returns:** `'health'` | `'weapon'` | `'enemy'`

| Suit | Result |
|------|--------|
| Hearts | `'health'` |
| Diamonds | `'weapon'` |
| Spades | `'enemy'` |
| Clubs | `'enemy'` |

### `getCardValue(card: Card): number`

Extracts numeric rank value.

| Parameter | Type | Description |
|-----------|------|-------------|
| `card` | `Card` | Card to evaluate |

**Returns:** `number` — 2–10 for number cards, 11/J, 12/Q, 13/K

### `getCardRankDisplay(card: Card): string`

Human-readable rank string.

| Parameter | Type | Description |
|-----------|------|-------------|
| `card` | `Card` | Card to display |

**Returns:** `string` — e.g. `"2"`, `"10"`, `"J"`, `"Q"`, `"K"`

### `getSuitSymbol(suit: Suit): string`

Unicode suit symbol.

| Parameter | Type | Description |
|-----------|------|-------------|
| `suit` | `Suit` | Suit enum value |

**Returns:** `string` — `"♥"` | `"♦"` | `"♠"` | `"♣"`

### `getSuitImagePath(suit: Suit, deckConfig: DeckCustomization): string`

Image path for suit icon from theme config.

| Parameter | Type | Description |
|-----------|------|-------------|
| `suit` | `Suit` | Suit to look up |
| `deckConfig` | `DeckCustomization` | Active theme config |

**Returns:** `string` — Image path

### `getBossImagePath(card: Card, deckConfig: DeckCustomization): string | null`

Boss image path for face cards (J/Q/K) of Spades/Clubs.

| Parameter | Type | Description |
|-----------|------|-------------|
| `card` | `Card` | Card to check |
| `deckConfig` | `DeckCustomization` | Active theme config |

**Returns:** `string | null` — Image path or null for non-boss cards

### `getCardDisplay(card: Card): string`

Full display string combining suit symbol and rank.

| Parameter | Type | Description |
|-----------|------|-------------|
| `card` | `Card` | Card to display |

**Returns:** `string` — e.g. `"♥5"`, `"♠K"`

### `getSuitColor(suit: Suit): string`

Hex color string based on the active color mode (distinct vs traditional). Reads from DOM `[data-color-mode]` attribute.

| Parameter | Type | Description |
|-----------|------|-------------|
| `suit` | `Suit` | Suit to get color for |

**Returns:** `string` — Hex color

### `getSuitDisplayColorDistinct(suit: Suit): string`

Distinct color palette (unaffected by color mode toggle).

| Parameter | Type | Description |
|-----------|------|-------------|
| `suit` | `Suit` | Suit |

**Returns:** `string` — `"#e91e63"` (hearts), `"#2196f3"` (diamonds), `"#4caf50"` (spades/clubs)

### `getSuitDisplayColorTraditional(suit: Suit): string`

Traditional red/black palette.

| Parameter | Type | Description |
|-----------|------|-------------|
| `suit` | `Suit` | Suit |

**Returns:** `string` — `"#d32f2f"` (hearts/diamonds), `"#212121"` (spades/clubs)

---

## Module: `combat.ts`

Damage calculation, healing, and player state mutations.

### `calculateDamage(enemy: Card, player: PlayerState): DamageResult`

Calculates damage from an enemy encounter considering weapon status.

| Parameter | Type | Description |
|-----------|------|-------------|
| `enemy` | `Card` | Enemy card being fought |
| `player` | `PlayerState` | Current player state |

**Returns:** `DamageResult`

```typescript
interface DamageResult {
  damage: number       // HP to subtract (0 if fully blocked)
  weaponUsed: boolean  // Whether weapon was used (affects durability)
  message: string      // Human-readable outcome
}
```

**Logic:**
- No weapon → damage = enemy rank
- Fresh weapon → damage = max(0, enemy rank - weapon rank)
- Worn weapon → if enemy rank ≤ `weaponMaxEnemy`, same as fresh; otherwise full damage (weapon unusable)

### `applyDamage(player: PlayerState, damage: number): PlayerState`

Subtracts HP from player. Floors at 0.

| Parameter | Type | Description |
|-----------|------|-------------|
| `player` | `PlayerState` | Current player state |
| `damage` | `number` | Damage to apply |

**Returns:** `PlayerState` — Updated player (new object)

### `healPlayer(player: PlayerState, healAmount: number): PlayerState`

Adds HP to player. Caps at `maxHp` (20).

| Parameter | Type | Description |
|-----------|------|-------------|
| `player` | `PlayerState` | Current player state |
| `healAmount` | `number` | HP to restore |

**Returns:** `PlayerState` — Updated player (new object)

### `isPlayerAlive(player: PlayerState): boolean`

Checks if player is alive.

| Parameter | Type | Description |
|-----------|------|-------------|
| `player` | `PlayerState` | Player state to check |

**Returns:** `boolean` — `true` if `hp > 0`

### `getHpPercentage(player: PlayerState): number`

HP percentage for UI progress bars.

| Parameter | Type | Description |
|-----------|------|-------------|
| `player` | `PlayerState` | Player state |

**Returns:** `number` — 0–100

---

## Module: `weaponSystem.ts`

Weapon equip, durability, and usage validation.

### `equipWeapon(player: PlayerState, weapon: Card): PlayerState`

Equips a weapon, replacing any existing weapon. Resets durability to fresh.

| Parameter | Type | Description |
|-----------|------|-------------|
| `player` | `PlayerState` | Current player state |
| `weapon` | `Card` | Weapon card to equip |

**Returns:** `PlayerState` — Updated player

### `markWeaponUsed(player: PlayerState, enemyDefeated: Card): PlayerState`

Records that the weapon was used against an enemy, updating the durability threshold.

| Parameter | Type | Description |
|-----------|------|-------------|
| `player` | `PlayerState` | Current player state |
| `enemyDefeated` | `Card` | Enemy just defeated |

**Returns:** `PlayerState` — Updated player with `weaponMaxEnemy` set to enemy's rank

### `canWeaponDefeat(weaponMaxEnemy: number | null, enemyRank: number): boolean`

Checks if a worn weapon can be used against a given enemy.

| Parameter | Type | Description |
|-----------|------|-------------|
| `weaponMaxEnemy` | `number | null` | Current durability limit (null = fresh weapon) |
| `enemyRank` | `number` | Enemy rank to check |

**Returns:** `boolean`

**Logic:**
- `weaponMaxEnemy === null` (fresh) → always `true`
- `enemyRank <= weaponMaxEnemy` → `true`
- Otherwise → `false`

### `getWeaponDurabilityDescription(player: PlayerState): string`

Human-readable durability status.

| Parameter | Type | Description |
|-----------|------|-------------|
| `player` | `PlayerState` | Player state |

**Returns:** `string` — e.g. `"Fresh (can defeat any enemy once)"` or `"Worn: can only defeat enemies ≤ 9"`

---

## Module: `roomManager.ts`

Room lifecycle — initialization, advancement, and skip mechanic.

### `initializeFirstRoom(deck: Card[]): RoomResult`

Deals the first room of 4 cards from the deck top.

| Parameter | Type | Description |
|-----------|------|-------------|
| `deck` | `Card[]` | Shuffled deck |

**Returns:** `RoomResult`

```typescript
interface RoomResult {
  room: Card[]          // 4 cards for the room
  remainingDeck: Card[] // Deck minus 4
}
```

### `prepareNextRoom(deck: Card[], leftoverCard: Card | null): RoomResult`

Prepares the next room. If a leftover card exists, it becomes card 0 plus 3 new cards. Otherwise deals 4 new cards.

| Parameter | Type | Description |
|-----------|------|-------------|
| `deck` | `Card[]` | Current remaining deck |
| `leftoverCard` | `Card | null` | Carry-over card from previous room |

**Returns:** `RoomResult` — New room + remaining deck

### `skipRoom(currentRoom: Card[], deck: Card[], direction: 'left-to-right' | 'right-to-left'): Card[]`

Returns all 4 cards to the bottom of the deck in the specified order.

| Parameter | Type | Description |
|-----------|------|-------------|
| `currentRoom` | `Card[]` | Current 4-card room |
| `deck` | `Card[]` | Current remaining deck |
| `direction` | `'left-to-right' | 'right-to-left'` | Reorder direction |

**Returns:** `Card[]` — Updated deck with room cards appended

**Direction behavior:**
- `left-to-right`: cards `[0, 1, 2, 3]` appended in that order
- `right-to-left`: cards `[3, 2, 1, 0]` appended in that order

### `canFormRoomWithLeftover(deckSize: number): boolean`

Checks if a room can be formed with a leftover card.

| Parameter | Type | Description |
|-----------|------|-------------|
| `deckSize` | `number` | Cards remaining in deck |

**Returns:** `boolean` — Needs >= 3 cards (leftover + 3 new)

### `canFormRoomWithoutLeftover(deckSize: number): boolean`

Checks if a room can be formed without a leftover card.

| Parameter | Type | Description |
|-----------|------|-------------|
| `deckSize` | `number` | Cards remaining in deck |

**Returns:** `boolean` — Needs >= 4 cards

### `calculateRemainingRoomsWithLeftover(deckSize: number): number`

Calculates how many complete rooms can be formed given a leftover.

**Returns:** `number` — Floor of `(deckSize + 1) / 4`

### `calculateRemainingRoomsWithoutLeftover(deckSize: number): number`

Calculates how many complete rooms can be formed without a leftover.

**Returns:** `number` — Floor of `deckSize / 4`

---

## Module: `cardActions.ts`

Card pick resolution — the core mechanic of the game.

### `pickCard(gameState: GameState, cardIndex: number): CardActionResult`

Resolves the player picking a card from the current room.

| Parameter | Type | Description |
|-----------|------|-------------|
| `gameState` | `GameState` | Current game state |
| `cardIndex` | `number` | Index (0-3) of card in `currentRoom` |

**Returns:** `CardActionResult`

```typescript
interface CardActionResult {
  newGameState: GameState  // Updated state after resolution
  message: string          // Action result message for log
  cardType: CardType       // Resolved card type
}
```

**Resolution by card type:**
- **Health (Hearts):** Heals player, card removed from room
- **Weapon (Diamonds):** Equips weapon (replaces old), card removed from room
- **Enemy (Spades/Clubs):** Calculates damage, applies damage, possibly marks weapon used, tracks enemy for scoring; if HP ≤ 0 sets `gameStatus = 'lost'`

### `isRoomComplete(gameState: GameState): boolean`

Checks if 3 cards have been picked from the current room.

**Returns:** `boolean` — `true` if `cardsPickedThisRoom >= 3`

### `getLeftoverCard(gameState: GameState): Card | null`

Returns the single unpicked card when a room is complete.

**Returns:** `Card | null` — The card at the only non-picked index, or `null` if room not complete

---

## Module: `gameController.ts`

Top-level game orchestrator.

### `initializeGame(): GameState`

Creates and returns a complete initial game state.

**Returns:** `GameState`
- Deck: shuffled 42 cards
- Room: first 4 cards dealt
- Player: 20 HP, no weapon
- `cardsPickedThisRoom`: 0
- `gameStatus`: `'playing'`
- All counters at 0

### `processCardPick(gameState: GameState, cardIndex: number): ProcessResult`

Full orchestration of a card pick — resolves card, checks death, auto-advances room if complete, checks win condition.

| Parameter | Type | Description |
|-----------|------|-------------|
| `gameState` | `GameState` | Current state |
| `cardIndex` | `number` | Card index (0-3) |

**Returns:** `ProcessResult`

```typescript
interface ProcessResult {
  gameState: GameState  // New state
  log: string[]         // Array of log messages (1-3 messages per action)
}
```

**Flow:**
1. Calls `pickCard()` to resolve the card
2. If HP ≤ 0 → sets `gameStatus = 'lost'`, returns immediately
3. If room complete → calls `advanceToNextRoom()`, checks win condition (deck < 4)
4. If deck depleted → sets `gameStatus = 'won'`
5. Collects all log messages from each step

### `processRoomSkip(gameState: GameState, direction: 'left-to-right' | 'right-to-left'): ProcessResult`

Full orchestration of a room skip.

| Parameter | Type | Description |
|-----------|------|-------------|
| `gameState` | `GameState` | Current state |
| `direction` | `'left-to-right' | 'right-to-left'` | Skip direction |

**Returns:** `ProcessResult`

**Flow:**
1. Validates room can be skipped (no cards picked yet)
2. Calls `skipRoom()` to reorder cards to deck bottom
3. Calls `prepareNextRoom()` with no leftover to deal new 4 cards
4. Increments `roomsSkipped`

### `advanceToNextRoom(gameState: GameState): GameState`

Transitions to the next room after clearing the current one.

**Internal helper** — called by `processCardPick`.

**Flow:**
1. Gets leftover card from completed room
2. Calls `prepareNextRoom()` with leftover
3. Increments `roomsCleared`
4. Resets `cardsPickedThisRoom` to 0

### `calculateFinalScore(gameState: GameState): number`

Calculates final score for game-over display.

**Returns:** `number` — `player.hp + sum of all defeatedEnemies`

### `getGameStats(gameState: GameState): object`

Returns comprehensive stats object for UI.

**Returns:**
```typescript
{
  hp: number
  maxHp: number
  score: number
  enemiesDefeated: number[]
  roomsCleared: number
  roomsSkipped: number
  cardsRemaining: number
  gameStatus: string
}
```

---

## Module: `runAllTests.ts`

Test runner for in-browser testing.

### `runAllTests(): void`

Runs all 7 test suites. Logs pass/fail results to console via `console.assert()`.

**Suites executed:**
- `testDeck()` from `deck.test.ts`
- `testCardUtils()` from `cardUtils.test.ts`
- `testRoomManager()` from `roomManager.test.ts`
- `testWeaponSystem()` from `weaponSystem.test.ts`
- `testCombat()` from `combat.test.ts`
- `testCardActions()` from `cardActions.test.ts`
- `testGameController()` from `gameController.test.ts`

---

## Types Reference

### `Card`
```typescript
interface Card {
  suit: Suit
  rank: Rank
  id: string      // e.g. "hearts-5", "spades-13"
}
```

### `Suit`
```typescript
type Suit = 'hearts' | 'diamonds' | 'spades' | 'clubs'
```

### `Rank`
```typescript
type Rank = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13
```

### `CardType`
```typescript
type CardType = 'health' | 'weapon' | 'enemy'
```

### `PlayerState`
```typescript
interface PlayerState {
  hp: number
  maxHp: number
  equippedWeapon: Card | null
  weaponMaxEnemy: number | null
}
```

### `GameState`
```typescript
interface GameState {
  deck: Card[]
  currentRoom: Card[]
  leftoverCard: Card | null
  player: PlayerState
  cardsPickedThisRoom: number
  gameStatus: 'playing' | 'won' | 'lost'
  roomsCleared: number
  roomsSkipped: number
  defeatedEnemies: number[]
}
```

### `DeckCustomization`
```typescript
interface DeckCustomization {
  deckTheme: string
  cardBackImage: string
  suitImages?: Record<Suit, string>
  bossImages: Record<string, string>
  cardFont: string
  cardFontSize: number
  useTextSuits: boolean
  useDistinctColors: boolean
}
```
