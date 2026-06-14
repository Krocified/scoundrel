// Deck theme selector dropdown component

import { useDeckCustomization } from '../contexts/DeckCustomizationContext';

export function DeckThemeSelector() {
  const { settings, setDeckTheme } = useDeckCustomization();

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <select
          id="deck-theme-select"
          value={settings.deckTheme}
          onChange={(e) => setDeckTheme(e.target.value)}
          style={{
            padding: '10px 14px',
            background: 'var(--bg-input)',
            color: 'var(--text-primary)',
            border: '1px solid var(--accent-border)',
            borderRadius: '6px',
            fontFamily: 'inherit',
            fontSize: '14px',
            cursor: 'pointer',
            outline: 'none',
            transition: 'all 0.2s ease',
          }}
          onFocus={e => {
            e.currentTarget.style.borderColor = 'var(--accent)';
            e.currentTarget.style.background = 'var(--bg-hover)';
          }}
          onBlur={e => {
            e.currentTarget.style.borderColor = 'var(--accent-border)';
            e.currentTarget.style.background = 'var(--bg-input)';
          }}
        >
          <option value="classic" style={{ background: 'var(--bg-panel-solid)', color: 'var(--text-primary)' }}>
            Classic
          </option>
          <option value="esoteric" style={{ background: 'var(--bg-panel-solid)', color: 'var(--text-primary)' }}>
            Esoteric
          </option>
        </select>
      </div>
      <p style={{
        margin: '10px 0 0 0',
        fontSize: '12px',
        color: 'var(--text-muted)',
        lineHeight: '1.5'
      }}>
        Changes card visuals, fonts, and artwork.
      </p>
    </div>
  );
}
