// Toggle switch for distinct vs traditional suit colors

import { useDeckCustomization } from '../contexts/DeckCustomizationContext';

interface ColorModeToggleProps {
  compact?: boolean; // If true, shows only icon without label
}

export function ColorModeToggle({ compact = false }: Readonly<ColorModeToggleProps>) {
  const { settings, toggleDistinctColors } = useDeckCustomization();

  const switchButton = (
    <button
      onClick={toggleDistinctColors}
      role="switch"
      aria-checked={settings.useDistinctColors}
      aria-label="Toggle distinct colors"
      style={{
        position: 'relative',
        width: '44px',
        height: '24px',
        borderRadius: '12px',
        border: 'none',
        background: settings.useDistinctColors ? '#4caf50' : '#ccc',
        cursor: 'pointer',
        transition: 'background 0.2s',
        padding: 0,
        outline: 'none'
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: '2px',
          left: settings.useDistinctColors ? '22px' : '2px',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: 'white',
          transition: 'left 0.2s',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}
      />
    </button>
  );

  if (compact) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '20px' }}>🎨</span>
        {switchButton}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
      <span style={{ fontWeight: 'bold' }}>Distinct Colors</span>
      {switchButton}
    </div>
  );
}
