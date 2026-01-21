// Room card component

import React from 'react';
import { Card } from '../types/game';
import { getSuitSymbol, getCardType } from '../game/cardUtils';

interface RoomCardProps {
  card: Card;
  index: number;
  isGamePlaying: boolean;
  onPickCard: (index: number) => void;
}

export function RoomCard({ card, index, isGamePlaying, onPickCard }: RoomCardProps) {
  const cardType = getCardType(card);
  let color = '#4caf50'; // enemy default
  if (cardType === 'health') {
    color = '#e91e63';
  } else if (cardType === 'weapon') {
    color = '#2196f3';
  }

  const handleClick = () => {
    if (isGamePlaying) {
      onPickCard(index);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isGamePlaying && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onPickCard(index);
    }
  };

  return (
    <div
      role="button"
      tabIndex={isGamePlaying ? 0 : -1}
      className={isGamePlaying ? 'card-hover-enabled' : ''}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={{
        background: 'white',
        border: `3px solid ${color}`,
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'center',
        transition: 'transform 0.2s',
        cursor: isGamePlaying ? 'pointer' : 'default',
        aspectRatio: '2.5 / 3.5',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ fontSize: '48px', color }}>
          {getSuitSymbol(card.suit)}
        </div>
        <div style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '10px' }}>
          {card.rank}
        </div>
        <div style={{ fontSize: '12px', marginTop: '10px', color: '#666' }}>
          {(() => {
            if (cardType === 'health') return 'HEAL';
            if (cardType === 'weapon') return 'WEAPON';
            return 'ENEMY';
          })()}
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPickCard(index);
        }}
        disabled={!isGamePlaying}
        style={{
          padding: '8px 16px',
          background: color,
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isGamePlaying ? 'pointer' : 'not-allowed',
          fontWeight: 'bold',
          width: '100%'
        }}
      >
        Pick [{index}]
      </button>
    </div>
  );
}
