# Scoundrel — UI Refactor & Scope Reduction Spec

Status: Draft · Owner: Michael Jong · Target: `/` game screen + `/rules`

## 1. Problem

The game screen reads as a generic dev dashboard: translucent grey panels, `monospace`
text everywhere, neon per-suit borders, scattered emoji (`🃏⚔️🛡️💀🎉⭐⚡`), and a black
terminal-style game log. Meanwhile the UI carries three meta systems that were layered on
top of the core game — dark/light mode, deck-theme picker + suit-color toggle, and the
power-up / run-modifier / joker progression. Net effect: soulless, cluttered, and a long
way from the physical "Scoundrel" card game it adapts.

The core 42-card loop (rooms, weapons, HP, skip) was the good part. This refactor strips
the meta layers and rebuilds the UI around one crafted identity: a classic green felt card
table with real playing-card faces.

## 2. Direction

- **Remove, don't restyle.** Power-ups, run modifiers, and jokers are deleted end-to-end
  (UI, game logic, config, types, tests, rules copy). No dormant code paths.
- **One locked identity.** No dark/light, no theme picker, no color-mode toggle. The app is
  always the same green-felt table with off-white card faces and red/black pips.
- **Go back to basics.** Return to the original 42-card game: rooms of 4, pick 3, weapons
  and durability, HP 20, skip L→R / R→L, win/lose + score.
- **Craft over chrome.** Every panel, card, and label gets a considered visual treatment —
  materials (felt, card stock, brass/gold), consistent type, and no emoji-as-decoration.

## 3. Feature Removal

### 3.1 What leaves the product

| Removed | Replaced by |
|---|---|
| Dark / light theme toggle | Fixed green-felt identity |
| Deck theme picker (classic/esoteric) | Classic deck art only (SVG card-back + boss art) |
| Suit color toggle (distinct vs traditional) | Traditional red/black suit colors |
| Power-up system (pick-1-of-3 on win, persist to localStorage) | Nothing — clean win/lose + score |
| Run modifiers (juggernaut/mutation/vampiric) | Nothing |
| Joker cards + room effects (champion/predator/forge-world) | Nothing |
| "Claim Reward" flow | Nothing |

### 3.2 Files to delete

```
src/contexts/ThemeContext.tsx
src/contexts/DeckCustomizationContext.tsx
src/components/ColorModeToggle.tsx
src/components/DeckThemeSelector.tsx
src/components/HamburgerMenu.tsx
src/components/PowerUpSelection.tsx
src/components/RunModifierSelection.tsx
src/game/powerUps.ts
src/game/powerUpStorage.ts
src/game/jokerProcessor.ts
src/config/runModifiers.ts
src/config/jokers.ts
public/assets/cards/esoteric/            # optional; safe once theme picker gone
```

### 3.3 localStorage keys to stop writing

- `scoundrel-theme`
- `scoundrel-deck-settings`
- `scoundrel-power-ups`

No migration needed — readers are deleted. Leftover keys are inert.

## 4. Locked Visual Identity — "Green Felt Table"

### 4.1 Materials metaphor

| Element | Material | Notes |
|---|---|---|
| Page background | Casino felt | Radial vignette, deeper green at the edges |
| Cards | Off-white card stock | Soft inner sheen, gentle drop shadow |
| HP bar / stat strip | Recessed dark leather or brass plaque | On-felt contrast, not a grey panel |
| Game log | Dark inset "ledger" | Recessed well, reads as a table not a terminal |
| Accents | Gold/brass | Titles, score, active controls only — sparing |
| Enemies & HP damage | Classic red | Pips + damage read red |

### 4.2 Design tokens (`src/index.css`)

Replace the two `html[data-theme]` blocks with a single `:root` palette. **Keep the
existing variable names** — components already reference `--bg-page`, `--accent`,
`--text-primary`, `--border`, etc. — and redefine their *values*. Add a small set of new
material tokens on top. That keeps Phase 3 a value swap plus targeted component edits, not
a repo-wide rename.

**Existing names, redefined to felt values:**

| Token | Value | Notes |
|---|---|---|
| `--bg-page` | `#1f4a2e` | flat felt green (containers); radial vignette on `body`/`#root` |
| `--bg-panel` | `rgba(0,0,0,.20)` | recessed felt inset |
| `--bg-panel-solid` | `#16351f` | footer / solid surfaces |
| `--bg-input` | `rgba(255,255,255,.06)` | |
| `--bg-hover` | `rgba(255,255,255,.10)` | |
| `--bg-disabled` | `rgba(255,255,255,.04)` | |
| `--text-primary` | `#f3efe2` | off-white on felt |
| `--text-secondary` | `#cfe0d2` | |
| `--text-muted` | `#9db4a2` | |
| `--text-disabled` | `#7d917f` | |
| `--border` | `rgba(255,255,255,.10)` | |
| `--border-strong` | `rgba(255,255,255,.18)` | |
| `--accent` | `#d4af37` | gold: title, score, primary action |
| `--accent-dim` | `rgba(212,175,55,.14)` | button wash |
| `--accent-border` | `rgba(212,175,55,.40)` | |
| `--shadow` | `rgba(0,0,0,.35)` | |

**New tokens (add):**

| Token | Value | Notes |
|---|---|---|
| `--felt-hi` | `#2c5f3a` | centre of page gradient |
| `--felt-lo` | `#122c1b` | vignette edge |
| `--card` | `#f9f7f0` | card face base |
| `--card-edge` | `#efe9dc` | card face bottom/edge |
| `--ink` | `#1d1a16` | spades/clubs pips + body text on cards |
| `--shadow-card` | `0 6px 18px rgba(0,0,0,.35)` | card drop shadow |
| `--radius-card` | `10px` | room-card corner |

### 4.3 Typography

- **Drop the blanket `font-family: monospace`** used across every component. Reserve
  monospace only for the game log.
- Ranks & pips on cards: classic serif (`Georgia`-style), bold — matches physical card faces.
- Display / headings ("Scoundrel", VICTORY/GAME OVER, section titles): keep `Pirata One`
  for rogue character, but drop the emoji that currently precedes/ornaments it.
- Micro-labels (HP, SCORE, WEAPON…): small caps, letterspaced, `--text-muted` or ink.

### 4.4 Icons / glyphs

- Remove decorative emoji from components: the `🃏` in `Title`, `🎉`/`💀` in
  `GameOverScreen`, `🛡️`/`⚡`/`⭐` chips, `⚔️` etc. in log strings.
- Keep real suit glyphs `♥ ♦ ♠ ♣` (already produced by `getSuitSymbol`) for card faces.
- Game log flavor glyphs (`💀 You died`, `🎉 Victory`) become plain text or a styled banner.

## 5. Component Redesign

### 5.1 Header

Replaces `HamburgerMenu` + `Title` row.
- Left: `Scoundrel` wordmark (`Pirata One`, gold) — no emoji, no gear icon.
- Right: "New Game" primary button; keep "How to Play" `/rules` link if inline header
  makes sense, otherwise footer link suffices.
- Delete hamburger + drawer entirely (nothing left to put in it).

### 5.2 PlayerStats (`PlayerStats.tsx`)

- HP bar: gold/red segmented fill on a recessed dark strip labelled **HP** `hp/max`.
- Pills: Score / Enemies / Rooms / Deck — restyle as small brass-rimmed plaques on felt.
- Delete: armor badge (`🛡 1`), `⚡ N` effects toggle, `EffectChip` row, and all
  power-up/modifier prop plumbing. Props reduce to the plain stats.

### 5.3 Room cards (`RoomCard`, `roomCard/*`)

- Card face: `--card` background with `--card-edge` bottom shading and `--shadow-card`.
  Remove the per-suit neon `accentColor` borders.
- Pips + ranks render in traditional red (`getSuitDisplayColorTraditional`, hearts/diamonds)
  or near-black (spades/clubs). The "distinct" neon palette goes away.
- Face-card (J/Q/K of spades/clubs) keep classic boss art.
- Card-type footer tag (`HEAL / WEAPON / ENEMY`) stays as a subtle aid but re-rendered
  in muted ink, not the neon border colour. (Physical-play hint kept intentionally.)
- Hover: lift + deepen shadow (already implemented) — keep; disabled/picked slot shows a
  face-down faded card (`PickedCardPlaceholder`), which already exists.
- Strip all `useTheme` / `useDeckCustomization` reads; lock to classic deck config +
  traditional red/black colors. Delete the PC/Mobile split only if consolidation is
  trivial; otherwise keep the responsive variants but restyled. (Prefer smallest diff:
  restyle in place, keep the split.)

### 5.4 WeaponDisplay (`WeaponDisplay.tsx`)

- Present as an actual card face (same stock as room cards) when a weapon is equipped:
  diamond suit glyph + rank, then **FRESH** / **WORN — max dmg N** in gold/amber.
- Empty state: recessed slot on felt, "No weapon" + "Pick a diamond to equip". No `🛡️`.
- Remove theme/customization hooks.

### 5.5 GameLog (`GameLog.tsx`)

- Restyle from black `#000` + green terminal text to the recessed dark ledger well on the
  felt table (soft inner shadow, `--ink` text, faint gold for room/victory lines).
- Keep monospace here only. Title it "Game Log" (or "Adventurer's Ledger") with the
  existing label style.

### 5.6 DeckDisplay (`DeckDisplay.tsx`)

- Uses classic `card-back.svg` only (drop config lookup).
- Optionally give the deck stack a subtle angled "fanned" rest — keep as a stretch goal.
- Functional minimum: unchanged behaviour, single fixed card-back.

### 5.7 GameOverScreen (`GameOverScreen.tsx`)

- Replace circular `🎉`/`💀` badge with a typographic treatment: **VICTORY** (gold) /
  **GAME OVER** (rust red) banner on a parchment/plaque block.
- Stat grid (Remaining HP / Combat Score / Rooms Cleared / Rooms Skipped) kept, restyled
  to match cards.
- Remove "Claim Reward" button and `onClaimReward` prop entirely.

### 5.8 GameBoard (`GameBoard.tsx`)

The largest simplification. Remove:
- `?runModifier=1` query-string gate and the `RunModifierSelection` screen;
- power-up loading / `storedPowerUps` / reward state / `PowerUpSelection` modal;
- all effect-chip and modifier props passed to `PlayerStats`.

New flow: app boots straight into a core `initializeGame()`; **New Game** always restarts a
clean core run. Layout order per screen (desktop), restyled per 4.x tokens:

```
Header (wordmark + New Game)
PlayerStats
Current Room (n/3 picked)   Deck stack | 4 slots | skip buttons
Weapon · Game Log
Footer
```

Mobile media-query blocks in `GameBoard.tsx`/components stay but target the new tokens
instead of the old desktop/mobile split where trivial.

## 6. Game-Logic & Type Simplification

### 6.1 `src/types/game.ts`

- Remove: `RunModifierId`, `JokerId`, `RunModifierDef`, `JokerDef`, suit `'joker'`,
  `Card.jokerId`, `GameState.activePowerUps`, `GameState.runModifiers`,
  `GameState.barehandHalfDamage`.
- `CardType` drops `'joker'`. `PlayerState` unchanged (maxHp back to constant 20 logic).

### 6.2 `src/game/deck.ts`

- Delete `createJokerCard` and the `JokerId` import.

### 6.3 `src/game/cardUtils.ts`

- `getCardType`/`getSuitSymbol`/`getCardRankDisplay`: drop joker branches.
- Remove `getSuitDisplayColorDistinct` and the neon `getSuitColor` (blue diamonds /
  green enemies). **Note:** `getSuitColor` is not dead — `cardUtils.test.ts` Test 4 uses
  it, so update that test (see §8) or repoint it at the traditional helper.
- Keep a single traditional color helper for light card faces; drop the `darkBackground`
  parameter or pin it to light.

### 6.4 `src/game/combat.ts`

- Delete `applyDamageReductions` (armor/juggernaut) and the `barehandHalfDamage` path.
- `calculateDamage(enemy, player)` — plain: no weapon → full damage; worn weapon → full;
  usable weapon → `max(0, enemy − weapon)`. No `notes`.

### 6.5 `src/game/cardActions.ts`

- Remove vampiric/juggernaut/joker branches; hearts heal, diamonds equip, spades/clubs
  fight. Damage call becomes `calculateDamage(card, player)`.

### 6.6 `src/game/gameController.ts`

- `initializeGame()` takes no args, returns just `GameState` (no `GameInitResult` /
  `jokerLogs`). No power-up or modifier application.
- `processCardPick`: remove champion special-casing and mutation/regeneration heals.
- `processRoomSkip`: remove the "joker rooms can't be skipped" guard.
- `advanceToNextRoom`: remove regen/mutation heals; no joker processing.
- `getGameStats` / `calculateFinalScore` unchanged.

### 6.7 App shell

- `App.tsx`: drop `ThemeProvider` and `DeckCustomizationProvider`.
- `index.html`: delete the FOUC `scoundrel-theme` script.
- `src/index.css`: single `:root` felt palette (§4.2).

## 7. Rules & Content (`/rules`, `GAME_RULES.md`, `docs/PRD.md`)

- `src/pages/Rules.tsx`: remove the **Run Modifiers** and **Jokers** sections and any
  "(can be altered by modifiers)" notes; drop `🃏` joker copy. Line 140–143 (Jokers),
  302–336 (Run Modifiers), 338+ (Joker defs), 469 warning, 263/298 joker-skip mentions.
- `GAME_RULES.md`: drop any modifier/joker/power-up paragraphs if present.
- `docs/PRD.md`: add the direction-change section (see PRD section 3.2 below) and keep
  existing spec tables as historical detail, clearly marked superseded.

## 8. Tests

`runAllTests.ts` already covers only the 7 core suites — none test power-ups/modifiers
directly, so the runner is unchanged. Fixtures and assertions that reference removed
state must be updated:

- `src/game/gameController.test.ts` — `initializeGame()` call sites (drop `jokerLogs`).
- `src/game/cardActions.test.ts` — `createTestGameState` fixture drops
  `activePowerUps`, `runModifiers`, `barehandHalfDamage`.
- `src/game/deck.test.ts` — remove the `joker` row from the suit-symbol table (line ~60)
  and any joker-size assertions.
- `src/game/cardUtils.test.ts` — Test 4 imports/uses `getSuitColor` (line 10, 70–73),
  which is removed; repoint to the traditional helper or drop the color logging.
- `src/game/combat.test.ts` — already calls `calculateDamage(enemy, player)`, so it
  compiles unchanged; drop any armor/barehand assertions (none present today).

Verify: `npm run build` (typecheck) then `/dev` → "Run All Tests" → no assertion failures.

## 9. Out of Scope / Non-Goals

- No new meta or progression systems. This is deletion + restyle.
- No new fonts or external assets beyond what ships today (classic SVGs remain).
- No backend, accounts, or persistence.
- `/dev` test-runner page stays as-is (style it with tokens only if trivial).

## 10. Acceptance Criteria

1. No `data-theme`, `ThemeContext`, `DeckCustomizationContext`, hamburger, theme picker,
   color toggle, `getSuitDisplayColorDistinct`/`getSuitColor`, power-up, modifier, or joker
   code remains (grep returns nothing in `src/`).
2. App boots directly into a core game; New Game restarts cleanly, win/lose + score work.
3. Screen is a green felt table: off-white card faces, red/black pips, gold accents,
   ledger-style log — no decorative emoji, no translucent grey panels, no monospace body.
4. Responsive desktop/mobile layouts still work.
5. `npm run build` passes and all `/dev` tests pass.
6. `/rules` has no modifier/joker/power-up content.

## 11. Implementation Plan (phased)

Work top to bottom. Each phase has a hard exit check; do not start the next one
until it passes. **Exception:** Phases 1 and 2 are one atomic branch — Phase 1
strips logic that the UI still imports, so the build is expected red in between.

### Phase 0 — Baseline

Purpose: a known-good starting point to diff against.

1. `git status` clean, branch off.
2. `npm run build` passes.
3. `/dev` → "Run All Tests" → all green.

Exit: recorded baseline; no code changes yet.

### Phase 1 — Strip meta layers from game logic (pure functions)

Scope: §6.1–6.6. Logic only — no React changes.

1. `types/game.ts`: remove `RunModifierId`, `JokerId`, `RunModifierDef`, `JokerDef`,
   suit `'joker'`, `Card.jokerId`, `GameState.activePowerUps` / `runModifiers` /
   `barehandHalfDamage`; `CardType` drops `'joker'`.
2. `deck.ts`: delete `createJokerCard` + `JokerId` import.
3. `cardUtils.ts`: drop joker branches; delete `getSuitDisplayColorDistinct` and neon
   `getSuitColor`; collapse traditional-color helper to light faces.
4. `combat.ts`: delete `applyDamageReductions` + barehand path; `calculateDamage(enemy, player)`.
5. `cardActions.ts`: remove vampiric/juggernaut/joker branches; call simplified combat.
6. `gameController.ts`: `initializeGame()` → no args, returns `GameState`; remove champion
   case, joker processing, modifier/regen heals, joker-skip guard.
7. Tests: fix fixtures/calls in `gameController.test.ts`, `cardActions.test.ts`,
   `deck.test.ts`, `cardUtils.test.ts`/`combat.test.ts` (§8).

Exit: `tsc -b` shows only the *expected* errors from UI files still importing removed
state. (Full build green at end of Phase 2.)

### Phase 2 — Delete meta UI + shell wiring

Scope: §3.1–3.3, §6.7, **plus de-coupling every component from the deleted contexts.**
Gets the app compiling and playable again on the core loop.

1. Delete files in §3.2 (contexts, `ColorModeToggle`, `DeckThemeSelector`,
   `HamburgerMenu`, `PowerUpSelection`, `RunModifierSelection`, `powerUps.ts`,
   `powerUpStorage.ts`, `jokerProcessor.ts`, `config/runModifiers.ts`, `config/jokers.ts`).
2. Remove those exports from `components/index.ts`.
3. Reduce `config/deckCustomization.ts` to a single `classic` config: drop the `esoteric`
   entry, `defaultTheme`, and the `theme` parameter from `getDeckConfig` (or export a
   `classicDeckConfig` const). Trim `types/deckCustomization.ts` (`deckTheme` /
   `useDistinctColors` become unused; drop or keep harmlessly).
4. Remove `useTheme` / `useDeckCustomization` imports and reads from **every** remaining
   component — `Title`, `GameLog`, `PickedCardPlaceholder`, `BaseRoomCard`, `PCRoomCard`,
   `MobileRoomCard`, `WeaponDisplay`, `DeckDisplay` — substituting the fixed classic
   config and traditional light-face colors. These components stay visually rough; only
   Phase 3 makes them pretty.
5. `App.tsx`: drop both providers.
6. `GameBoard.tsx`: remove modifier gate, power-up state/modal, reward flow, effect
   props; New Game restarts a clean core run.
7. `PlayerStats.tsx`: drop power-up/modifier props, armor badge, effects toggle, chips.
8. `GameOverScreen.tsx`: remove "Claim Reward" + `onClaimReward`.
9. `index.html`: delete FOUC theme script.
10. `index.css`: replace the `html[data-theme="dark"|"light"]` selectors with a single
    `:root` block — temporarily reuse the existing dark values — so the app still renders
    once nothing sets `data-theme`. Phase 3 swaps the values to felt.
11. Grep gate for removed identifiers in `src/` (see §10.1).

Exit: `npm run build` green; app boots into a playable core game; `/dev` tests pass.
Visual identity is still the old dark palette (Phase 3).

### Phase 3 — Lock the green-felt visual identity

Scope: §4 + §5. Purely presentational; no logic changes.

1. `index.css`: swap the Phase-2 `:root` stopgap values for the felt palette (§4.2).
2. Header: wordmark + New Game; drop gear/emoji (§5.1).
3. `PlayerStats.tsx`: felt/brass plaques, HP bar (§5.2).
4. Room cards (`BaseRoomCard`, `PCRoomCard`, `MobileRoomCard`): card-stock face,
   red/black pips, drop neon borders (§5.3).
5. `WeaponDisplay.tsx` (§5.4), `GameLog.tsx` ledger well (§5.5), `DeckDisplay.tsx` fixed
   classic card-back (§5.6), `GameOverScreen.tsx` victory/defeat banners (§5.7).
6. `GameBoard.tsx` layout polish + mobile queries on new tokens (§5.8).
7. Sweep decorative emoji (`🃏🎉💀🛡️⚡⭐⚔️`) out of components/log strings (§4.4).

Exit: acceptance §10.3/10.4 hold; manual desktop + narrow-viewport play-through.

### Phase 4 — Content & docs

Scope: §7.

1. `src/pages/Rules.tsx`: remove Run Modifiers + Jokers sections and modifier/joker notes.
2. `GAME_RULES.md`: drop any modifier/joker/power-up prose.
3. `docs/PRD.md`: §1.5 already added — confirm it matches what shipped; mark superseded.
4. `docs/api.md`: update the changed signatures — `getDeckConfig`, removed
   `getSuitDisplayColorDistinct`/`getSuitColor`, `DeckCustomization` shape,
   `initializeGame`, `calculateDamage`, and the `GameState` fields (§6).
5. `docs/architecture.md` / `docs/development.md`: drop theme/power-up extensibility
   bullets that no longer apply (architecture lines ~47–53, 82, 91, 121–131, 170, 242–245;
   development lines ~100–109).

Exit: `/rules` renders clean; no stale meta docs.

### Phase 5 — Cleanup & final verification

1. Delete unused assets (`public/assets/cards/esoteric/`) and any orphaned config/types.
2. Full acceptance pass: §10.1–10.6.
3. `npm run build` + `/dev` all tests + manual win/lose play-through.
4. `git diff --stat` review; confirm no leftover localStorage writers.

Exit: all acceptance criteria met; branch ready for review.
