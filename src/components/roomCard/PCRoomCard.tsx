// PC room card variant with differentiated number and face card layouts

import type { Card } from '../../types/game';
import { BaseRoomCard } from './BaseRoomCard';
import {
  getSuitSymbol,
  getSuitDisplayColorTraditional,
  getCardType,
  getCardRankDisplay,
  getBossImagePath,
} from '../../game/cardUtils';
import { deckConfig } from '../../config/deckCustomization';

const NUMBER_SIZE = 48;

interface PCRoomCardProps {
  card: Card;
  index: number;
  isGamePlaying: boolean;
  onPickCard: (index: number) => void;
}

export function PCRoomCard({ card, index, isGamePlaying, onPickCard }: Readonly<PCRoomCardProps>) {
  const cardType = getCardType(card);
  const accentColor = getSuitDisplayColorTraditional(card.suit);
  const bossImagePath = getBossImagePath(card, deckConfig);
  const isFaceCard = card.rank > 10;

  let labelText = 'ENEMY';
  if (cardType === 'health') labelText = 'HEAL';
  else if (cardType === 'weapon') labelText = 'WEAPON';

  return (
    <BaseRoomCard card={card} index={index} isGamePlaying={isGamePlaying} onPickCard={onPickCard}>
      {/* Top-left corner for face cards */}
      {isFaceCard && (
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'baseline',
          gap: '4px'
        }}>
          <div className="room-card-rank" style={{
            fontSize: `${deckConfig.cardFontSize}px`,
            fontFamily: deckConfig.cardFont,
            fontWeight: 'bold',
            lineHeight: 1,
            minWidth: '1.2em',
            textAlign: 'center',
            display: 'inline-block',
            color: accentColor,
          }}>
            {getCardRankDisplay(card)}
          </div>
          <div className="room-card-suit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{
              fontSize: `${deckConfig.cardFontSize}px`,
              color: accentColor,
              lineHeight: 1
            }}>
              {getSuitSymbol(card.suit)}
            </span>
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
            alignItems: 'baseline',
            gap: '10px',
            justifyContent: 'center'
          }}>
            <div className="room-card-rank" style={{
              fontSize: `${NUMBER_SIZE}px`,
              fontFamily: deckConfig.cardFont,
              fontWeight: 'bold',
              lineHeight: 1,
              minWidth: '1.2em',
              textAlign: 'center',
              display: 'inline-block',
              color: accentColor,
            }}>
              {getCardRankDisplay(card)}
            </div>
            <div className="room-card-suit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{
                fontSize: `${NUMBER_SIZE}px`,
                color: accentColor,
                lineHeight: 1
              }}>
                {getSuitSymbol(card.suit)}
              </span>
            </div>
          </div>
        )}

        {/* Card type text */}
        <div className="room-card-type" style={{
          fontSize: '12px',
          marginTop: (isFaceCard && bossImagePath) ? '5px' : '10px',
          color: accentColor,
          opacity: 0.75,
          fontWeight: 'bold',
          letterSpacing: '1px',
          bottom: '8px'
        }}>
          {labelText}
        </div>
      </div>
    </BaseRoomCard>
  );
}
