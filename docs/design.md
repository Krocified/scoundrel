# Scoundrel — Design System

Single source of truth for the UI. Read this before touching any component.
The visual rationale/history lives in `UI-REFACTOR.md`; this file is the rulebook.

## 1. Identity — locked

One identity: a green-felt card table. No themes, no dark/light toggle, no color modes.
Every surface is one of a small set of materials:

| Material | Tokens | Used for |
|---|---|---|
| Felt | `--felt-hi`, `--felt-lo`, `--bg-page` | page background (radial vignette) |
| Recessed felt | `--bg-panel`, `--bg-input`, `--bg-disabled` | insets, tracks, empty states |
| Raised island | `--bg-panel-solid` | stat islands, footer |
| Card stock | `--card`, `--card-edge`, `--ink` | room cards, weapon card |
| Steel accent | `--accent`, `--accent-dim`, `--accent-border` | interactive controls, links, wordmark |

Accent is **steel grey (`#cfd8dc`)**, not gold. Gold (`#d4af37`) appears in the draft
`UI-REFACTOR.md` spec but did not ship — do not introduce it without a token change and a
contrast re-check.

## 2. Tokens

All design values live as CSS custom properties in `:root` in `src/index.css`.
Components must not hardcode colors, radii, or font stacks.

### 2.1 Global tokens (shipped)

| Group | Token | Value |
|---|---|---|
| Surface | `--bg-page` | `#1f4a2e` |
| | `--bg-panel` | `rgba(0,0,0,.20)` |
| | `--bg-panel-solid` | `#16351f` |
| | `--bg-input` | `rgba(255,255,255,.06)` |
| | `--bg-hover` | `rgba(255,255,255,.10)` |
| | `--bg-disabled` | `rgba(255,255,255,.04)` |
| Text | `--text-primary` | `#eef1f0` |
| | `--text-secondary` | `#cfe0d2` |
| | `--text-muted` | `#9db4a2` |
| | `--text-disabled` | `#7d917f` |
| Border | `--border` | `rgba(255,255,255,.10)` |
| | `--border-strong` | `rgba(255,255,255,.18)` |
| Accent | `--accent` | `#cfd8dc` |
| | `--accent-dim` | `rgba(207,216,220,.14)` |
| | `--accent-border` | `rgba(207,216,220,.40)` |
| Card | `--card` | `#f7f8f6` |
| | `--card-edge` | `#e8ebe9` |
| | `--ink` | `#17181a` |
| | `--shadow-card` | `0 6px 18px rgba(0,0,0,.35)` |
| | `--radius-card` | `10px` |
| Felt | `--felt-hi` | `#2c5f3a` |
| | `--felt-lo` | `#122c1b` |
| Shadow | `--shadow` | `rgba(0,0,0,.35)` |

### 2.2 Missing tokens to add

These values are already hardcoded across components. Add the token, then replace the literal.

| Token | Value | Replaces |
|---|---|---|
| `--success` | `#4caf50` | HP high fill |
| `--success-strong` | `#2e7d32` | "Fresh" text |
| `--success-dim` | `rgba(76,175,80,.12)` | fresh / win wash |
| `--success-border` | `rgba(76,175,80,.40)` | fresh / win border |
| `--danger` | `#e0555a` | HP low fill |
| `--danger-strong` | `#e57373` | GAME OVER text |
| `--danger-dim` | `rgba(244,67,54,.12)` | loss wash |
| `--danger-border` | `rgba(244,67,54,.50)` | loss border |
| `--warn` | `#e07a5f` | HP mid fill |
| `--warn-strong` | `#b5543a` | "Worn" text / border |
| `--warn-dim` | `rgba(181,84,58,.12)` | worn wash |
| `--warn-border` | `rgba(181,84,58,.40)` | worn border |
| `--surface-raised` | `#193b25` | stat island background |
| `--surface-sunken` | `#14301e` | HP track background |
| `--focus-ring` | `0 0 0 3px var(--accent-dim)` | `:focus-visible` |

### 2.3 Scale tokens (to add)

```
--space-1: 4px;  --space-2: 8px;  --space-3: 12px;
--space-4: 16px; --space-5: 20px; --space-6: 24px;

--radius-sm: 6px;   /* buttons */
--radius-md: 10px;  /* panels, cards — same as --radius-card */
--radius-lg: 16px;  /* overlays */

--font-display: "Pirata One", Georgia, serif;
--font-body: Georgia, "Times New Roman", serif;
--font-mono: ui-monospace, monospace;
```

### 2.4 Scoped tokens

A page/component may define local tokens on its root block (e.g. `.manual` in `Rules.tsx`
defines `--paper`, `--ink`, `--oxblood`). Prefix them so they read as local. Never shadow a
global token with a different meaning.

## 3. Typography

| Role | Stack | Used for |
|---|---|---|
| Display | `--font-display` | wordmark, VICTORY / GAME OVER, section numbers |
| Body | `--font-body` | default (set on `body`) |
| Mono | `--font-mono` | game log only |

- Card ranks use the deck config font (`Georgia`, `deckConfig.cardFont`).
- Micro-labels: uppercase, `--text-muted`, `font-weight: 700`, letter-spacing `.6–1.5px`.
- Numerals in stats / HP: `font-variant-numeric: tabular-nums`.
- No emoji as decoration. Keep suit glyphs `♥ ♦ ♠ ♣` only.

## 4. Styling convention

**The rule that keeps the UI unified. Apply to every new or refactored component.**

1. **Static style → stylesheet.** Component CSS lives in `.css` under `src/styles/`,
   imported once from `src/main.tsx` (or `@import`ed from `index.css`). Keep files small.
2. **Class names → BEM-lite.** `block`, `block__element`, `block--modifier`. One unique
   block per component (`room-card`, `player-stats`, `game-log`, `rulebook`). No new
   global single-word classes.
3. **Inline `style` → dynamic only.** Allowed only for runtime-computed values, passed as
   a CSS variable — never for a static design decision:
   ```tsx
   <div className="hp__fill" style={{ '--ratio': ratio }} />
   ```
4. **No `<style>{...}</style>` inside components.** Previous pattern; migrate on touch.
5. **No `!important`.** Responsive rules go in `@media`, scoped by block.
6. **States in CSS.** `:hover`, `:focus-visible`, `:disabled`, `:active` — not JS
   `onMouseEnter` handlers mutating `style`.
7. **Tokens only.** New color/size → add a token in `index.css` first, then use it. No
   literal hex/rgb/px design values in components.
8. **Accessibility is not optional** — see §6.

### Before / after

```tsx
// before — injected styles + JS hover + literals
<style>{`.ps-island { background:#193b25 }`}</style>
<button onMouseEnter={() => setHover(true)}
  style={{ background: hover ? 'var(--accent-dim)' : 'transparent', borderRadius:'6px' }}>

// after — stylesheet + tokens + CSS states
<button className="btn btn--primary">
```
```css
/* src/styles/button.css */
.btn { background: transparent; border-radius: var(--radius-sm); }
.btn--primary:hover { background: var(--accent-dim); }
.btn:focus-visible { outline: none; box-shadow: var(--focus-ring); }
```

## 5. Component patterns

Canonical implementations to copy:

| Pattern | Reference | Block | Notes |
|---|---|---|---|
| Button / link button | `IconButton.tsx` | `btn` | Move to stylesheet; currently JS hover |
| Stat island | `PlayerStats.tsx` | `player-stats__island` | `--surface-raised`, inset shadow |
| Meter | `PlayerStats.tsx` | `player-stats__track/__fill` | `role="progressbar"`, semantic fill tokens |
| Card face | `BaseRoomCard.tsx` | `room-card` | `--card` gradient, `--radius-card`, `--shadow-card` |
| Micro-label | `PlayerStats.tsx` | `label` | uppercase, `--text-muted` |
| Log well | `GameLog.tsx` | `game-log` | mono, inset shadow |
| Callout | `Rules.tsx` | `callout--note/danger/example` | tone modifier pattern |

## 6. Accessibility

- Re-check contrast before swapping any token (see the audited-set note in `PlayerStats.tsx`).
- Interactive cards/buttons keyboard-reachable; `BaseRoomCard` already sets `role`/`tabIndex`.
- Visible `:focus-visible` ring using `--focus-ring`.
- Honor `prefers-reduced-motion: reduce` (HP fill already does).
- Icon-only controls need `aria-label`; decorative SVG gets `aria-hidden`.

## 7. Refactor playbook (per component)

1. Read `index.css`; list every literal color/px the component uses.
2. Add any missing tokens (§2.2) to `index.css`.
3. Create `src/styles/<component>.css`; move inline styles → classes, media queries → `@media`.
4. Replace JS hover handlers with `:hover`; add `:focus-visible`.
5. Leave only dynamic values as inline CSS variables.
6. Import the stylesheet once; delete the `<style>` block and now-unused state.
7. `npm run build` + `/dev` tests + manual desktop/narrow-viewport pass.

## 8. Review checklist

- [ ] No literal hex/rgb/px design values in the component
- [ ] No `<style>` block, no `!important`, no JS hover mutation
- [ ] Classes follow BEM-lite with a unique block
- [ ] Interactive elements have `:focus-visible` + keyboard access
- [ ] Tokens added to `index.css` before use
- [ ] `npm run build` green, `/dev` tests green
