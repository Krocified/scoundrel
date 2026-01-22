// Weapon display component

import type { Card } from '../types/game';
import { getSuitImagePath } from '../game/cardUtils';
import { getCurrentDeckConfig } from '../config/deckCustomization';

interface WeaponDisplayProps {
  weapon: Card | null;
  weaponDurability: number | null;
}

export function WeaponDisplay({ weapon, weaponDurability }: Readonly<WeaponDisplayProps>) {
  const deckConfig = getCurrentDeckConfig();
  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .weapon-display-container {
            padding: 15px !important;
            flex-direction: row !important;
            justify-content: space-between !important;
            align-items: center !important;
          }
          
          .weapon-main-info {
            flex-direction: column !important;
            align-items: center !important;
            gap: 5px !important;
          }
          
          .weapon-icon {
            font-size: 36px !important;
            margin-bottom: 0 !important;
          }
          
          .weapon-icon img {
            width: 36px !important;
            height: 36px !important;
          }
          
          .weapon-icon span {
            font-size: 36px !important;
          }
          
          .weapon-label {
            font-size: 10px !important;
          }
          
          .weapon-status {
            display: none !important;
          }
          
          .weapon-durability-box {
            padding: 8px !important;
            margin-top: 0 !important;
            min-width: 120px;
          }
          
          .weapon-durability-label {
            font-size: 9px !important;
            margin-bottom: 3px !important;
          }
          
          .weapon-durability-value {
            font-size: 24px !important;
          }
          
          .weapon-durability-desc {
            font-size: 8px !important;
            margin-top: 3px !important;
          }
        }
      `}</style>
      <div className="weapon-display-container" style={{
        background: weapon ? '#2196f3' : '#ccc',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'center',
        border: `3px solid ${weapon ? '#1976d2' : '#999'}`,
        display: 'flex',
        flexDirection: 'column'
      }}>
      <div className="weapon-main-info" style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="weapon-label" style={{ fontSize: '12px', opacity: 0.9, marginBottom: '8px', fontWeight: 'bold' }}>
          EQUIPPED WEAPON
        </div>
        <div className="weapon-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '10px' }}>
          {weapon ? (
            <>
              <img 
                src={getSuitImagePath(weapon.suit)} 
                alt={weapon.suit}
                style={{ width: '48px', height: '48px', objectFit: 'contain' }}
              />
              <span style={{ 
                fontSize: '48px', 
                fontWeight: 'bold',
                fontFamily: deckConfig.cardFont 
              }}>
                {weapon.rank}
              </span>
            </>
          ) : (
            <span>—</span>
          )}
        </div>
        
        {/* Status */}
        <div className="weapon-status" style={{ fontSize: '14px', marginBottom: '10px' }}>
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
        <div className="weapon-durability-box" style={{
          background: 'rgba(0,0,0,0.3)',
          padding: '10px',
          borderRadius: '8px',
          marginTop: 'auto',
          border: '2px solid rgba(255,255,255,0.3)'
        }}>
          <div className="weapon-durability-label" style={{ fontSize: '11px', opacity: 0.8, marginBottom: '5px' }}>
            CAN DEFEAT ENEMIES
          </div>
          <div className="weapon-durability-value" style={{ 
            fontSize: '32px', 
            fontWeight: 'bold',
            color: '#ffeb3b',
            textShadow: '0 0 10px rgba(255,235,59,0.5)'
          }}>
            ≤ {weaponDurability}
          </div>
          <div className="weapon-durability-desc" style={{ fontSize: '10px', opacity: 0.7, marginTop: '5px' }}>
            Max enemy value you can defeat
          </div>
        </div>
      )}
      </div>
    </>
  );
}
