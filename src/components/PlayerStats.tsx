// Player stats display component

import React from 'react';

interface PlayerStatsProps {
  hp: number;
  maxHp: number;
  currentScore: number;
  defeatedEnemies: number;
  roomsCleared: number;
  roomsSkipped: number;
  cardsInDeck: number;
}

export function PlayerStats({
  hp,
  maxHp,
  currentScore,
  defeatedEnemies,
  roomsCleared,
  roomsSkipped,
  cardsInDeck
}: PlayerStatsProps) {
  return (
    <div style={{ 
      background: '#f5f5f5', 
      padding: '15px', 
      borderRadius: '8px', 
      marginBottom: '20px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: '15px'
    }}>
      <div>
        <strong>HP:</strong> {hp}/{maxHp}
        <div style={{ 
          background: '#ddd', 
          height: '20px', 
          borderRadius: '4px', 
          overflow: 'hidden',
          marginTop: '5px'
        }}>
          <div style={{ 
            background: hp > 10 ? '#4caf50' : '#f44336',
            height: '100%',
            width: `${(hp / maxHp) * 100}%`,
            transition: 'width 0.3s'
          }} />
        </div>
      </div>
      
      <div>
        <strong>Score:</strong> {currentScore}
        <br />
        <small>HP({hp}) + Enemies({defeatedEnemies})</small>
      </div>
      
      <div>
        <strong>Rooms:</strong> {roomsCleared} cleared, {roomsSkipped} skipped
        <br />
        <small>Deck: {cardsInDeck} cards</small>
      </div>
    </div>
  );
}
