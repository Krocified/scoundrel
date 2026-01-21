// Placeholder for picked cards

export function PickedCardPlaceholder() {
  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .picked-card-placeholder {
            padding: 12px !important;
          }
        }
      `}</style>
      <div
        className="picked-card-placeholder"
        style={{
          background: 'repeating-linear-gradient(45deg, #e0e0e0, #e0e0e0 10px, #f5f5f5 10px, #f5f5f5 20px)',
          border: '3px dashed #999',
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: 0.5
        }}
      />
    </>
  );
}
