// Deck visualization component

interface DeckDisplayProps {
  cardsInDeck: number;
}

export function DeckDisplay({ cardsInDeck }: Readonly<DeckDisplayProps>) {
  const stackDepth = Math.min(5, Math.ceil(cardsInDeck / 10));

  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '97%',
        width: '97%',
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
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: '3px solid #fff',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              opacity: 1 - (i * 0.15)
            }}
          >
            {i === 0 && (
              <div style={{
                fontSize: '40px',
                color: 'white',
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}>
                🃏
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
