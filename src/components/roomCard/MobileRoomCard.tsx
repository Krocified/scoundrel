// Mobile room card variant with simple centered rank and suit layout

import type { Card } from '../../types/game';
import { BaseRoomCard } from './BaseRoomCard';
import {
  getSuitImagePath,
  getSuitSymbol,
  getSuitDisplayColorDistinct,
  getSuitDisplayColorTraditional,
  getCardType,
  getCardRankDisplay,
} from '../../game/cardUtils';
import { getDeckConfig } from '../../config/deckCustomization';
import { useDeckCustomization } from '../../contexts/DeckCustomizationContext';

interface MobileRoomCardProps {
  card: Card;
  index: number;
  isGamePlaying: boolean;
  onPickCard: (index: number) => void;
}

export function MobileRoomCard({ card, index, isGamePlaying, onPickCard }: Readonly<MobileRoomCardProps>) {
  const cardType = getCardType(card);
  const { settings } = useDeckCustomization();
  const deckConfig = getDeckConfig(settings.deckTheme);

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .room-card {
            padding: 12px !important;
            min-width: 0 !important;
            max-width: 100% !important;
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
            min-width: 1.2em !important;
            text-align: center !important;
          }
          
          .room-card-type {
            font-size: 10px !important;
            margin-top: 5px !important;
          }
        }
      `}</style>
      <BaseRoomCard card={card} index={index} isGamePlaying={isGamePlaying} onPickCard={onPickCard}>
        {/* Simple centered content for all cards */}
        <div style={{ 
          flex: '1', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',
          position: 'relative',
          padding: '10px 0'
        }}>
          {/* Centered rank + suit */}
          <div style={{ 
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '4px',
            justifyContent: 'center'
          }}>
            <div className="room-card-rank" style={{ 
              fontSize: `${deckConfig.cardFontSize}px`, 
              fontFamily: deckConfig.cardFont,
              fontWeight: 'bold',
              lineHeight: 1,
              minWidth: '1.2em',
              textAlign: 'center',
              display: 'inline-block'
            }}>
              {getCardRankDisplay(card)}
            </div>
            <div className="room-card-suit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {deckConfig.useTextSuits ? (
                <span style={{ 
                  fontSize: `${deckConfig.cardFontSize + 10}px`, 
                  color: settings.useDistinctColors
                    ? getSuitDisplayColorDistinct(card.suit)
                    : getSuitDisplayColorTraditional(card.suit),
                  lineHeight: 1
                }}>
                  {getSuitSymbol(card.suit)}
                </span>
              ) : (
                <img 
                  src={getSuitImagePath(card.suit)} 
                  alt={card.suit}
                  style={{ width: '20px', height: '20px', objectFit: 'contain' }}
                />
              )}
            </div>
          </div>

          {/* Card type text */}
          <div className="room-card-type" style={{ 
            fontSize: '12px', 
            marginTop: '10px', 
            color: '#666'
          }}>
            {(() => {
              if (cardType === 'health') return 'HEAL';
              if (cardType === 'weapon') return 'WEAPON';
              return 'ENEMY';
            })()}
          </div>
        </div>
      </BaseRoomCard>
    </>
  );
}
