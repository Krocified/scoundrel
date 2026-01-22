// Room card component

import React from 'react';
import type { Card } from '../types/game';
import { getSuitImagePath, getSuitSymbol, getSuitDisplayColor, getCardType } from '../game/cardUtils';
import { getCurrentDeckConfig } from '../config/deckCustomization';
import { useDeckCustomization } from '../contexts/DeckCustomizationContext';

interface RoomCardProps {
  card: Card;
  index: number;
  isGamePlaying: boolean;
  onPickCard: (index: number) => void;
}

export function RoomCard({ card, index, isGamePlaying, onPickCard }: Readonly<RoomCardProps>) {
  const cardType = getCardType(card);
  const { settings } = useDeckCustomization();
  const deckConfig = getCurrentDeckConfig();
  
  // Border color matches suit display color (responds to distinct colors toggle)
  const color = getSuitDisplayColor(card.suit, settings.useDistinctColors);
  
  let tooltipText = 'Fight enemy!';
  if (cardType === 'health') {
    tooltipText = 'Drink health potion!';
  } else if (cardType === 'weapon') {
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
          
          .room-card-suit span {
            font-size: 32px !important;
          }
          
          .room-card-suit img {
            width: 32px !important;
            height: 32px !important;
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
        className={`room-card ${isGamePlaying ? 'card-hover-enabled' : ''}`}
        role="button"
        tabIndex={isGamePlaying ? 0 : -1}
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
        <div className="room-card-suit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {deckConfig.useTextSuits ? (
            <span style={{ 
              fontSize: '48px', 
              color: getSuitDisplayColor(card.suit, settings.useDistinctColors)
            }}>
              {getSuitSymbol(card.suit)}
            </span>
          ) : (
            <img 
              src={getSuitImagePath(card.suit)} 
              alt={card.suit}
              style={{ width: '48px', height: '48px', objectFit: 'contain' }}
            />
          )}
        </div>
        <div 
          className="room-card-rank" 
          style={{ 
            fontSize: `${deckConfig.cardFontSize}px`, 
            fontFamily: deckConfig.cardFont,
            fontWeight: 'bold', 
            marginTop: '10px' 
          }}
        >
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
