// Weapon display component

import type { Card } from '../types/game';
import { getSuitSymbol, getSuitDisplayColorTraditional } from '../game/cardUtils';
import { deckConfig } from '../config/deckCustomization';

interface WeaponDisplayProps {
  weapon: Card | null;
  weaponDurability: number | null;
}

export function WeaponDisplay({ weapon, weaponDurability }: Readonly<WeaponDisplayProps>) {
  const accentColor = weapon ? getSuitDisplayColorTraditional(weapon.suit) : 'var(--text-muted)';

  return (
    <div
      style={{
        background: weapon
          ? 'linear-gradient(180deg, var(--card) 0%, var(--card-edge) 100%)'
          : 'var(--bg-input)',
        color: weapon ? 'var(--ink)' : 'var(--text-primary)',
        padding: '18px',
        borderRadius: 'var(--radius-card)',
        border: weapon ? '1px solid rgba(0, 0, 0, 0.18)' : '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '12px',
        boxShadow: weapon ? 'var(--shadow-card)' : 'none',
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      {weapon ? (
        <>
          {/* Main weapon rank + suit */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <span style={{ fontSize: '42px', lineHeight: 1, color: accentColor }}>
              {getSuitSymbol(weapon.suit)}
            </span>
            <span style={{
              fontSize: '38px',
              fontWeight: 'bold',
              fontFamily: deckConfig.cardFont,
              color: 'var(--ink)',
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
              ? 'rgba(76, 175, 80, 0.12)'
              : 'rgba(181, 84, 58, 0.12)',
            border: `1px solid ${weaponDurability === null ? 'rgba(76, 175, 80, 0.4)' : 'rgba(181, 84, 58, 0.4)'}`,
          }}>
            <div style={{
              fontSize: '12px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              color: weaponDurability === null ? '#2e7d32' : '#b5543a',
              marginBottom: '2px',
            }}>
              {weaponDurability === null ? 'Fresh' : 'Worn'}
            </div>
            {weaponDurability !== null && (
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '4px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>max damage</span>
                <span style={{ fontSize: '22px', fontWeight: 'bold', color: '#b5543a', lineHeight: 1 }}>
                  {weaponDurability}
                </span>
              </div>
            )}
          </div>
        </>
      ) : (
        <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '16px', fontWeight: 'bold' }}>No weapon</div>
          <div style={{ fontSize: '12px', marginTop: '4px', opacity: 0.8 }}>Pick a diamond to equip</div>
        </div>
      )}
    </div>
  );
}
