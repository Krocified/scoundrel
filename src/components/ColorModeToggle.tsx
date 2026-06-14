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
        background: settings.useDistinctColors ? 'var(--accent)' : 'var(--border-strong)',
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
          background: 'var(--bg-panel-solid)',
          transition: 'left 0.2s',
          boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
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
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: 'var(--text-primary)' }}>
      {switchButton}
      <span style={{ fontWeight: 'bold' }}>
        {settings.useDistinctColors ? 'Distinct' : 'Traditional'}
      </span>
    </div>
  );
}
