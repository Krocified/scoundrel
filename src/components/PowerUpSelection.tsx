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
        background: '#f5f5f5',
        color: '#333',
        padding: '30px',
        borderRadius: '8px',
        textAlign: 'center',
        marginBottom: '20px',
        border: '2px solid #ddd',
      }}>
        <h2>All Power-Ups Collected!</h2>
        <p>You have unlocked everything. Future runs will stack all available power-ups.</p>
      </div>
    );
  }

  return (
    <div style={{
      background: '#f5f5f5',
      color: '#333',
      padding: '30px',
      borderRadius: '8px',
      textAlign: 'center',
      marginBottom: '20px',
      border: '2px solid #ddd',
    }}>
      <h2 style={{ marginTop: 0 }}>Choose Your Power-Up</h2>
      <p style={{ marginBottom: '20px', color: '#666' }}>
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
                background: isSelected ? '#4caf50' : isDisabled ? '#e8e8e8' : '#f5f5f5',
                border: `2px solid ${isSelected ? '#4caf50' : isDisabled ? '#ddd' : '#bbb'}`,
                borderRadius: '4px',
                padding: '20px',
                cursor: isDisabled ? 'default' : 'pointer',
                color: isDisabled && !isSelected ? '#999' : '#333',
                width: '200px',
                textAlign: 'center',
                transition: 'all 0.2s',
                opacity: isDisabled && !isSelected ? 0.5 : 1,
                fontFamily: 'inherit',
                fontWeight: 'bold',
                fontSize: '14px',
              }}
            >
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '8px' }}>
                {p.name}
              </div>
              <div style={{ fontSize: '0.9rem', color: isDisabled && !isSelected ? '#999' : '#666', fontWeight: 'normal' }}>
                {p.description}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
