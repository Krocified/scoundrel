// Toggle switch for distinct vs traditional suit colors

import { useDeckCustomization } from '../contexts/DeckCustomizationContext';

export function ColorModeToggle() {
  const { settings, toggleDistinctColors } = useDeckCustomization();

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px' }}>
        <input
          type="checkbox"
          checked={settings.useDistinctColors}
          onChange={toggleDistinctColors}
          style={{
            width: '18px',
            height: '18px',
            cursor: 'pointer'
          }}
        />
        <span style={{ fontWeight: 'bold' }}>
          Distinct Colors
        </span>
      </label>
      <span style={{ fontSize: '12px', color: '#666' }}>
        {settings.useDistinctColors ? '(♥ ♦ ♠ match borders)' : '(♥♦ red, ♠♣ black)'}
      </span>
    </div>
  );
}
