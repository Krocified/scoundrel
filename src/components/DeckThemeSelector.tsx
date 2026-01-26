// Deck theme selector dropdown component

import { useDeckCustomization } from '../contexts/DeckCustomizationContext';

export function DeckThemeSelector() {
  const { settings, setDeckTheme } = useDeckCustomization();

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label htmlFor="deck-theme-select" style={{ fontWeight: 'bold', fontSize: '14px' }}>
          Deck Theme
        </label>
        <select
          id="deck-theme-select"
          value={settings.deckTheme}
          onChange={(e) => setDeckTheme(e.target.value)}
          style={{
            padding: '8px 12px',
            background: '#f5f5f5',
            color: '#333',
            border: '2px solid #ddd',
            borderRadius: '4px',
            fontFamily: 'inherit',
            fontSize: '14px',
            cursor: 'pointer',
            outline: 'none'
          }}
        >
          <option value="classic">Classic</option>
          {/* Future themes will be added here */}
        </select>
      </div>
      <p style={{
        margin: '8px 0 0 0',
        fontSize: '11px',
        color: '#666',
        lineHeight: '1.4'
      }}>
        Changes card visuals, fonts, and artwork.
      </p>
    </div>
  );
}
