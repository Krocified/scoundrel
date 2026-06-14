// Base room card wrapper with shared container, styling, and event handlers

import type { Card } from '../../types/game';
import {
  getSuitDisplayColorDistinct,
  getSuitDisplayColorTraditional,
  getCardType,
} from '../../game/cardUtils';
import { useDeckCustomization } from '../../contexts/DeckCustomizationContext';
import { useTheme } from '../../contexts/ThemeContext';

interface BaseRoomCardProps {
  card: Card;
  index: number;
  isGamePlaying: boolean;
  onPickCard: (index: number) => void;
  children: React.ReactNode;
}

export function BaseRoomCard({ card, index, isGamePlaying, onPickCard, children }: Readonly<BaseRoomCardProps>) {
  const cardType = getCardType(card);
  const { settings } = useDeckCustomization();
  const { isDark } = useTheme();

  const accentColor = settings.useDistinctColors
    ? getSuitDisplayColorDistinct(card.suit)
    : getSuitDisplayColorTraditional(card.suit, isDark);

  let tooltipText = 'Fight enemy!';
  if (cardType === 'health') {
    tooltipText = 'Drink health potion!';
  } else if (cardType === 'weapon') {
    tooltipText = 'Equip weapon!';
  } else if (cardType === 'joker') {
    tooltipText = 'Joker!';
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
        background: isDark
          ? 'linear-gradient(135deg, #1e1e32 0%, #161626 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
        border: `3px solid ${accentColor}`,
        borderRadius: '10px',
        padding: '14px',
        textAlign: 'center',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        cursor: isGamePlaying ? 'pointer' : 'default',
        aspectRatio: '2.5 / 3.5',
        height: '100%',
        width: 'auto',
        justifySelf: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        boxShadow: isDark
          ? `0 4px 12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)`
          : `0 4px 12px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.8)`,
      }}
      onMouseEnter={e => {
        if (isGamePlaying) {
          e.currentTarget.style.transform = 'translateY(-6px)';
          e.currentTarget.style.boxShadow = isDark
            ? `0 12px 24px rgba(0, 0, 0, 0.5), 0 0 20px ${accentColor}40, inset 0 1px 0 rgba(255, 255, 255, 0.08)`
            : `0 12px 24px rgba(0, 0, 0, 0.18), 0 0 16px ${accentColor}30, inset 0 1px 0 rgba(255, 255, 255, 0.9)`;
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = isDark
          ? '0 4px 12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
          : '0 4px 12px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.8)';
      }}
    >
      {children}
    </div>
  );
}
