// Deck visualization component

import { getCurrentDeckConfig } from '../config/deckCustomization';

interface DeckDisplayProps {
  cardsInDeck: number;
}

export function DeckDisplay({ cardsInDeck }: Readonly<DeckDisplayProps>) {
  const stackDepth = Math.min(5, Math.ceil(cardsInDeck / 10));
  const deckConfig = getCurrentDeckConfig();

  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
      }}
      title={`${cardsInDeck} cards left in deck`}
    >
      <div style={{ 
        position: 'relative',
        width: '100%',
        aspectRatio: '2.5 / 3.5',
        maxHeight: '100%'
      }}>
        {/* Deck stack with depth effect */}
        {Array.from({ length: stackDepth }, (_, i) => ({ id: `layer-${i}`, index: i })).map(({ id, index: i }) => (
          <div
            key={id}
            title={`${cardsInDeck} cards left in deck`}
            style={{
              position: 'absolute',
              left: `${i * 2}px`,
              top: `${i * 2}px`,
              width: '100%',
              height: '100%',
              backgroundImage: `url(${deckConfig.cardBackImage})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
          </div>
        ))}
      </div>
    </div>
  );
}
