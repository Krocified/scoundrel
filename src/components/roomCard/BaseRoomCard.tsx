// Base room card wrapper with shared container, styling, and event handlers

import type { Card } from '../../types/game';
import {
  getSuitDisplayColorDistinct,
  getSuitDisplayColorTraditional,
  getCardType,
} from '../../game/cardUtils';
import { useDeckCustomization } from '../../contexts/DeckCustomizationContext';

interface BaseRoomCardProps {
  card: Card;
  index: number;
  isGamePlaying: boolean;
  onPickCard: (index: number) => void;
  activePowerUps?: string[];
  children: React.ReactNode;
}

export function BaseRoomCard({ card, index, isGamePlaying, onPickCard, activePowerUps = [], children }: Readonly<BaseRoomCardProps>) {
  const cardType = getCardType(card);
  const { settings } = useDeckCustomization();
  
  // Border color matches suit display color (responds to distinct colors toggle)
  const color = settings.useDistinctColors
    ? getSuitDisplayColorDistinct(card.suit)
    : getSuitDisplayColorTraditional(card.suit);
  
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

  const showReinforced = activePowerUps.includes('reinforced') && cardType === 'weapon';

  return (
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
        position: 'relative',
      }}
    >
      {showReinforced && (
        <div style={{
          position: 'absolute',
          bottom: '-8px',
          right: '-8px',
          background: '#2196f3',
          color: 'white',
          borderRadius: '50%',
          width: '26px',
          height: '26px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          fontWeight: 'bold',
          zIndex: 2,
          boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
        }} title="Reinforced: durability +2">
          +2
        </div>
      )}
      {children}
    </div>
  );
}
