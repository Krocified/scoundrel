// Mobile room card variant with simple centered rank and suit layout

import type { Card } from '../../types/game';
import { BaseRoomCard } from './BaseRoomCard';
import {
  getSuitSymbol,
  getSuitDisplayColorTraditional,
  getCardType,
  getCardRankDisplay,
} from '../../game/cardUtils';
import { deckConfig } from '../../config/deckCustomization';

interface MobileRoomCardProps {
  card: Card;
  index: number;
  isGamePlaying: boolean;
  onPickCard: (index: number) => void;
}

export function MobileRoomCard({ card, index, isGamePlaying, onPickCard }: Readonly<MobileRoomCardProps>) {
  const cardType = getCardType(card);
  const accentColor = getSuitDisplayColorTraditional(card.suit);

  let labelText = 'ENEMY';
  if (cardType === 'health') labelText = 'HEAL';
  else if (cardType === 'weapon') labelText = 'WEAPON';

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .room-card {
            padding: 12px !important;
            min-width: 0 !important;
            max-width: 100% !important;
          }

          .room-card-rank {
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
            alignItems: 'baseline',
            gap: '8px',
            justifyContent: 'center'
          }}>
            <div className="room-card-rank" style={{
              fontSize: '22px',
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
                fontSize: '22px',
                color: accentColor,
                lineHeight: 1
              }}>
                {getSuitSymbol(card.suit)}
              </span>
            </div>
          </div>

          {/* Card type text */}
          <div className="room-card-type" style={{
            fontSize: '12px',
            marginTop: '10px',
            color: accentColor,
            opacity: 0.75,
            fontWeight: 'bold',
            letterSpacing: '1px',
          }}>
            {labelText}
          </div>
        </div>
      </BaseRoomCard>
    </>
  );
}
