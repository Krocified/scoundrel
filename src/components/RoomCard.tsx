// Room card component

import React from 'react';
import type { Card } from '../types/game';
import { getSuitSymbol, getCardType } from '../game/cardUtils';

interface RoomCardProps {
  card: Card;
  index: number;
  isGamePlaying: boolean;
  onPickCard: (index: number) => void;
}

export function RoomCard({ card, index, isGamePlaying, onPickCard }: Readonly<RoomCardProps>) {
  const cardType = getCardType(card);
  let color = '#4caf50'; // enemy default
  let tooltipText = 'Fight enemy!';
  
  if (cardType === 'health') {
    color = '#e91e63';
    tooltipText = 'Drink health potion!';
  } else if (cardType === 'weapon') {
    color = '#2196f3';
    tooltipText = 'Equip weapon!';
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
    <>
      <style>{`
        @media (max-width: 768px) {
          .room-card {
            padding: 12px !important;
          }
          
          .room-card-suit {
            font-size: 32px !important;
          }
          
          .room-card-rank {
            font-size: 24px !important;
            margin-top: 5px !important;
          }
          
          .room-card-type {
            font-size: 10px !important;
            margin-top: 5px !important;
          }
        }
      `}</style>
      <div
        className="room-card"
      role="button"
      tabIndex={isGamePlaying ? 0 : -1}
      className={isGamePlaying ? 'card-hover-enabled' : ''}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      title={tooltipText}
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
        <div className="room-card-suit" style={{ fontSize: '48px', color }}>
          {getSuitSymbol(card.suit)}
        </div>
        <div className="room-card-rank" style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '10px' }}>
          {card.rank}
        </div>
        <div className="room-card-type" style={{ fontSize: '12px', marginTop: '10px', color: '#666' }}>
          {(() => {
            if (cardType === 'health') return 'HEAL';
            if (cardType === 'weapon') return 'WEAPON';
            return 'ENEMY';
          })()}
        </div>
      </div>
      </div>
    </>
  );
}
