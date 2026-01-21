// Placeholder for picked cards

import React from 'react';

export function PickedCardPlaceholder() {
  return (
    <div
      style={{
        background: 'repeating-linear-gradient(45deg, #e0e0e0, #e0e0e0 10px, #f5f5f5 10px, #f5f5f5 20px)',
        border: '3px dashed #999',
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'center',
        aspectRatio: '2.5 / 3.5',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.5
      }}
    />
  );
}
