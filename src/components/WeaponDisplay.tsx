// Weapon display component

import type { Card } from '../types/game';
import {
  getSuitImagePath,
  getSuitSymbol,
  getSuitDisplayColorDistinct,
  getSuitDisplayColorTraditional,
} from '../game/cardUtils';
import { getDeckConfig } from '../config/deckCustomization';
import { useDeckCustomization } from '../contexts/DeckCustomizationContext';
import { useTheme } from '../contexts/ThemeContext';

interface WeaponDisplayProps {
  weapon: Card | null;
  weaponDurability: number | null;
}

export function WeaponDisplay({ weapon, weaponDurability }: Readonly<WeaponDisplayProps>) {
  const { settings } = useDeckCustomization();
  const { isDark } = useTheme();
  const deckConfig = getDeckConfig(settings.deckTheme);

  const accentColor = weapon
    ? (settings.useDistinctColors
      ? getSuitDisplayColorDistinct(weapon.suit)
      : getSuitDisplayColorTraditional(weapon.suit, isDark))
    : 'var(--text-muted)';

  return (
    <div
      style={{
        background: weapon
          ? (isDark ? 'rgba(19, 40, 64, 0.7)' : 'rgba(227, 242, 253, 0.9)')
          : 'var(--bg-input)',
        color: 'var(--text-primary)',
        padding: '18px',
        borderRadius: '10px',
        border: `2px solid ${weapon ? (isDark ? 'rgba(144, 202, 249, 0.5)' : '#64b5f6') : 'var(--border)'}`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '12px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      {weapon ? (
        <>
          {/* Main weapon rank + suit */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            {deckConfig.useTextSuits ? (
              <span style={{ fontSize: '42px', lineHeight: 1, color: accentColor }}>
                {getSuitSymbol(weapon.suit)}
              </span>
            ) : (
              <img
                src={getSuitImagePath(weapon.suit, deckConfig)}
                alt={weapon.suit}
                style={{ width: '42px', height: '42px', objectFit: 'contain' }}
              />
            )}
            <span style={{
              fontSize: '38px',
              fontWeight: 'bold',
              fontFamily: deckConfig.cardFont,
              color: 'var(--text-primary)',
              lineHeight: 1,
            }}>
              {weapon.rank}
            </span>
          </div>

          {/* Durability status */}
          <div style={{
            textAlign: 'center',
            padding: '8px 12px',
            borderRadius: '8px',
            background: weaponDurability === null
              ? (isDark ? 'rgba(76, 175, 80, 0.15)' : 'rgba(76, 175, 80, 0.1)')
              : (isDark ? 'rgba(255, 152, 0, 0.15)' : 'rgba(255, 152, 0, 0.1)'),
            border: `1px solid ${weaponDurability === null ? 'rgba(76, 175, 80, 0.4)' : 'rgba(255, 152, 0, 0.4)'}`,
          }}>
            <div style={{
              fontSize: '12px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              color: weaponDurability === null ? '#4caf50' : '#ff9800',
              marginBottom: '2px',
            }}>
              {weaponDurability === null ? 'Fresh' : 'Worn'}
            </div>
            {weaponDurability !== null && (
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '4px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>max damage</span>
                <span style={{ fontSize: '22px', fontWeight: 'bold', color: '#ff9800', lineHeight: 1 }}>
                  {weaponDurability}
                </span>
              </div>
            )}
          </div>
        </>
      ) : (
        <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>🛡️</div>
          <div style={{ fontSize: '16px', fontWeight: 'bold' }}>No weapon</div>
          <div style={{ fontSize: '12px', marginTop: '4px', opacity: 0.8 }}>Pick a diamond to equip</div>
        </div>
      )}
    </div>
  );
}
