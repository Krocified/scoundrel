// Skip room buttons component

import React from 'react';

interface SkipButtonsProps {
  canSkip: boolean;
  cardsPickedThisRoom: number;
  onSkip: (direction: 'left-to-right' | 'right-to-left') => void;
}

export function SkipButtons({ canSkip, cardsPickedThisRoom, onSkip }: SkipButtonsProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      justifyContent: 'center',
      marginLeft: '30px'
    }}>
      <div style={{ 
        fontSize: '12px', 
        fontWeight: 'bold', 
        color: '#666',
        marginBottom: '5px',
        textAlign: 'center'
      }}>
        SKIP ROOM
      </div>
      <button
        onClick={() => onSkip('left-to-right')}
        disabled={!canSkip}
        style={{
          padding: '12px',
          background: canSkip ? '#ff9800' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: canSkip ? 'pointer' : 'not-allowed',
          fontSize: '13px',
          fontWeight: 'bold'
        }}
      >
        ← L to R
      </button>
      <button
        onClick={() => onSkip('right-to-left')}
        disabled={!canSkip}
        style={{
          padding: '12px',
          background: canSkip ? '#ff9800' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: canSkip ? 'pointer' : 'not-allowed',
          fontSize: '13px',
          fontWeight: 'bold'
        }}
      >
        R to L →
      </button>
      {!canSkip && cardsPickedThisRoom > 0 && (
        <small style={{ 
          color: '#999', 
          fontSize: '10px',
          textAlign: 'center',
          marginTop: '5px'
        }}>
          Can't skip after picking
        </small>
      )}
    </div>
  );
}
