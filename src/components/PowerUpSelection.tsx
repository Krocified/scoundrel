import { useState } from 'react';
import { getRandomChoices } from '../game/powerUps';
import { savePowerUp } from '../game/powerUpStorage';

interface PowerUpSelectionProps {
  ownedPowerUps: string[];
  onSelect: (selectedId: string) => void;
}

export function PowerUpSelection({ ownedPowerUps, onSelect }: Readonly<PowerUpSelectionProps>) {
  const [choices] = useState(() => getRandomChoices(ownedPowerUps));
  const [selected, setSelected] = useState<string | null>(null);

  const handlePick = (id: string) => {
    setSelected(id);
    savePowerUp(id);
    setTimeout(() => onSelect(id), 600);
  };

  if (choices.length === 0) {
    return (
      <div style={{
        background: 'var(--bg-panel)',
        color: 'var(--text-primary)',
        padding: '30px',
        borderRadius: '12px',
        textAlign: 'center',
        marginBottom: '20px',
        border: '2px solid var(--border)',
      }}>
        <h2 style={{ marginTop: 0, color: 'var(--accent)' }}>All Power-Ups Collected!</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 0 }}>
          You have unlocked everything. Future runs will stack all available power-ups.
        </p>
      </div>
    );
  }

  return (
    <div style={{
      background: 'var(--bg-panel)',
      color: 'var(--text-primary)',
      padding: '30px',
      borderRadius: '12px',
      textAlign: 'center',
      marginBottom: '20px',
      border: '2px solid var(--border)',
    }}>
      <h2 style={{ marginTop: 0, color: 'var(--accent)', fontFamily: '"Pirata One", Georgia, serif', fontWeight: 'normal', letterSpacing: '1px' }}>
        Choose Your Power-Up
      </h2>
      <p style={{ marginBottom: '24px', color: 'var(--text-secondary)' }}>
        Pick one to carry into future runs
      </p>
      <div style={{
        display: 'flex',
        gap: '15px',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}>
        {choices.map(p => {
          const isSelected = selected === p.id;
          const isDisabled = selected !== null;
          return (
            <button
              key={p.id}
              onClick={() => handlePick(p.id)}
              disabled={isDisabled}
              style={{
                background: isSelected
                  ? 'var(--accent-dim)'
                  : isDisabled
                    ? 'var(--bg-disabled)'
                    : 'var(--bg-input)',
                border: `2px solid ${isSelected ? 'var(--accent)' : isDisabled ? 'var(--border)' : 'var(--border-strong)'}`,
                borderRadius: '8px',
                padding: '20px',
                cursor: isDisabled ? 'default' : 'pointer',
                color: isDisabled && !isSelected ? 'var(--text-disabled)' : 'var(--text-primary)',
                width: '200px',
                textAlign: 'center',
                transition: 'all 0.2s',
                opacity: isDisabled && !isSelected ? 0.5 : 1,
                fontFamily: 'inherit',
                fontWeight: 'bold',
                fontSize: '14px',
              }}
              onMouseEnter={e => {
                if (!isDisabled) {
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.background = 'var(--bg-hover)';
                }
              }}
              onMouseLeave={e => {
                if (!isDisabled) {
                  e.currentTarget.style.borderColor = 'var(--border-strong)';
                  e.currentTarget.style.background = 'var(--bg-input)';
                }
              }}
            >
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '8px', color: isSelected ? 'var(--accent)' : 'var(--text-primary)' }}>
                {p.name}
              </div>
              <div style={{ fontSize: '0.9rem', color: isDisabled && !isSelected ? 'var(--text-disabled)' : 'var(--text-secondary)', fontWeight: 'normal' }}>
                {p.description}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
