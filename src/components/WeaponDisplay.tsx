// Weapon display component

import React from 'react';
import { Card } from '../types/game';

interface WeaponDisplayProps {
  weapon: Card | null;
  weaponDurability: number | null;
}

export function WeaponDisplay({ weapon, weaponDurability }: Readonly<WeaponDisplayProps>) {
  return (
    <div style={{
      background: weapon ? '#2196f3' : '#ccc',
      color: 'white',
      padding: '20px',
      borderRadius: '8px',
      textAlign: 'center',
      border: `3px solid ${weapon ? '#1976d2' : '#999'}`,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div>
        <div style={{ fontSize: '12px', opacity: 0.9, marginBottom: '8px', fontWeight: 'bold' }}>
          EQUIPPED WEAPON
        </div>
        <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '10px' }}>
          {weapon ? `♦ ${weapon.rank}` : '—'}
        </div>
        
        {/* Status */}
        <div style={{ fontSize: '14px', marginBottom: '10px' }}>
          {(() => {
            if (!weapon) {
              return <span style={{ opacity: 0.7 }}>No weapon equipped</span>;
            }
            if (weaponDurability === null) {
              return <span style={{ color: '#fff', fontWeight: 'bold' }}>✨ FRESH</span>;
            }
            return (
              <span style={{ color: '#ffeb3b', fontWeight: 'bold' }}>
                ⚠️ WORN
              </span>
            );
          })()}
        </div>
      </div>

      {/* Durability Limit - Very Prominent */}
      {weapon && weaponDurability !== null && (
        <div style={{
          background: 'rgba(0,0,0,0.3)',
          padding: '10px',
          borderRadius: '8px',
          marginTop: 'auto',
          border: '2px solid rgba(255,255,255,0.3)'
        }}>
          <div style={{ fontSize: '11px', opacity: 0.8, marginBottom: '5px' }}>
            CAN DEFEAT ENEMIES
          </div>
          <div style={{ 
            fontSize: '32px', 
            fontWeight: 'bold',
            color: '#ffeb3b',
            textShadow: '0 0 10px rgba(255,235,59,0.5)'
          }}>
            &lt; {weaponDurability}
          </div>
          <div style={{ fontSize: '10px', opacity: 0.7, marginTop: '5px' }}>
            Max enemy value you can defeat
          </div>
        </div>
      )}
    </div>
  );
}
