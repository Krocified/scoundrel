// Base room card wrapper with shared container, styling, and event handlers

import type { Card } from '../../types/game';
import { getCardType } from '../../game/cardUtils';

interface BaseRoomCardProps {
  card: Card;
  index: number;
  isGamePlaying: boolean;
  onPickCard: (index: number) => void;
  children: React.ReactNode;
}

export function BaseRoomCard({ card, index, isGamePlaying, onPickCard, children }: Readonly<BaseRoomCardProps>) {
  const cardType = getCardType(card);

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
    <div
      className={`room-card ${isGamePlaying ? 'card-hover-enabled' : ''}`}
      role="button"
      tabIndex={isGamePlaying ? 0 : -1}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      title={tooltipText}
      style={{
        background: 'linear-gradient(180deg, var(--card) 0%, var(--card-edge) 100%)',
        border: '1px solid rgba(0, 0, 0, 0.18)',
        borderRadius: 'var(--radius-card)',
        padding: '14px',
        textAlign: 'center',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        cursor: isGamePlaying ? 'pointer' : 'default',
        aspectRatio: '2.5 / 3.5',
        height: '100%',
        width: 'auto',
        minWidth: 0,
        maxWidth: '100%',
        overflow: 'hidden',
        justifySelf: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        boxShadow: 'var(--shadow-card), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
      }}
      onMouseEnter={e => {
        if (isGamePlaying) {
          e.currentTarget.style.transform = 'translateY(-6px)';
          e.currentTarget.style.boxShadow = `0 14px 28px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.9)`;
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-card), inset 0 1px 0 rgba(255, 255, 255, 0.9)';
      }}
    >
      {children}
    </div>
  );
}
