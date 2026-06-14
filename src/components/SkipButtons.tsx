// Skip room buttons component

interface SkipButtonsProps {
  canSkip: boolean;
  cardsPickedThisRoom: number;
  onSkip: (direction: 'left-to-right' | 'right-to-left') => void;
}

export function SkipButtons({ canSkip, cardsPickedThisRoom, onSkip }: Readonly<SkipButtonsProps>) {
  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .skip-buttons-container {
            flex-direction: row !important;
            width: 100%;
          }
          
          .skip-buttons-container button {
            flex: 1 !important;
          }
          
          .skip-buttons-label {
            display: none !important;
          }
          
          .skip-buttons-message {
            display: none !important;
          }
        }
      `}</style>
      <div className="skip-buttons-container" style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        justifyContent: 'center'
      }}>
      <div className="skip-buttons-label" style={{ 
        fontSize: '12px', 
        fontWeight: 'bold', 
        color: 'var(--text-muted)',
        marginBottom: '5px',
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: '1px'
      }}>
        Skip Room
      </div>
      <button
        onClick={() => onSkip('left-to-right')}
        disabled={!canSkip}
        style={{
          padding: '12px',
          background: canSkip ? 'var(--accent-dim)' : 'var(--bg-disabled)',
          color: canSkip ? 'var(--accent)' : 'var(--text-disabled)',
          border: `2px solid ${canSkip ? 'var(--accent-border)' : 'var(--border)'}`,
          borderRadius: '6px',
          cursor: canSkip ? 'pointer' : 'not-allowed',
          fontSize: '13px',
          fontWeight: 'bold',
          fontFamily: 'inherit',
          transition: 'all 0.2s'
        }}
      >
        ← L to R
      </button>
      <button
        onClick={() => onSkip('right-to-left')}
        disabled={!canSkip}
        style={{
          padding: '12px',
          background: canSkip ? 'var(--accent-dim)' : 'var(--bg-disabled)',
          color: canSkip ? 'var(--accent)' : 'var(--text-disabled)',
          border: `2px solid ${canSkip ? 'var(--accent-border)' : 'var(--border)'}`,
          borderRadius: '6px',
          cursor: canSkip ? 'pointer' : 'not-allowed',
          fontSize: '13px',
          fontWeight: 'bold',
          fontFamily: 'inherit',
          transition: 'all 0.2s'
        }}
      >
        R to L →
      </button>
      {!canSkip && cardsPickedThisRoom > 0 && (
        <small className="skip-buttons-message" style={{ 
          color: 'var(--text-muted)', 
          fontSize: '10px',
          textAlign: 'center',
          marginTop: '5px'
        }}>
          Can't skip after picking
        </small>
      )}
      </div>
    </>
  );
}
