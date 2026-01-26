// PC room card variant with differentiated number and face card layouts

import type { Card } from '../../types/game';
import { BaseRoomCard } from './BaseRoomCard';
import {
  getSuitImagePath,
  getSuitSymbol,
  getSuitDisplayColorDistinct,
  getSuitDisplayColorTraditional,
  getCardType,
  getCardRankDisplay,
  getBossImagePath,
} from '../../game/cardUtils';
import { getDeckConfig } from '../../config/deckCustomization';
import { useDeckCustomization } from '../../contexts/DeckCustomizationContext';

interface PCRoomCardProps {
  card: Card;
  index: number;
  isGamePlaying: boolean;
  onPickCard: (index: number) => void;
}

export function PCRoomCard({ card, index, isGamePlaying, onPickCard }: Readonly<PCRoomCardProps>) {
  const cardType = getCardType(card);
  const { settings } = useDeckCustomization();
  const deckConfig = getDeckConfig(settings.deckTheme);
  const bossImagePath = getBossImagePath(card);
  const isFaceCard = card.rank > 10;

  return (
    <BaseRoomCard card={card} index={index} isGamePlaying={isGamePlaying} onPickCard={onPickCard}>
      {/* Top-left corner for face cards */}
      {isFaceCard && (
        <div style={{ 
          position: 'absolute',
          top: '8px',
          left: '8px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '4px'
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
      )}

      {/* Middle section */}
      <div style={{ 
        flex: '1', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        position: 'relative',
        padding: '10px 0',
        paddingTop: isFaceCard ? '20px' : '10px',
        paddingBottom: isFaceCard ? '0' : '10px'
      }}>
        {isFaceCard && bossImagePath ? (
          // Boss image for face cards with boss art
          <img 
            src={bossImagePath} 
            alt={`${getCardRankDisplay(card)} of ${card.suit}`}
            style={{ 
              width: '100%', 
              height: 'auto', 
              maxWidth: '78%',
              objectFit: 'contain',
              flex: '1',
              marginTop: '10px'
            }}
          />
        ) : (
          // Centered rank + suit for number cards (and face cards without boss art)
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
        )}

        {/* Card type text */}
        <div className="room-card-type" style={{ 
          fontSize: '12px', 
          marginTop: (isFaceCard && bossImagePath) ? '5px' : '10px', 
          color: '#666',
          bottom: '8px'
        }}>
          {(() => {
            if (cardType === 'health') return 'HEAL';
            if (cardType === 'weapon') return 'WEAPON';
            return 'ENEMY';
          })()}
        </div>
      </div>
    </BaseRoomCard>
  );
}
