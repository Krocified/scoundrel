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
          background: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.06), rgba(255,255,255,0.06) 10px, rgba(255,255,255,0.10) 10px, rgba(255,255,255,0.10) 20px)',
          border: '3px dashed var(--border-strong)',
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: 0.5,
          aspectRatio: '2.5 / 3.5',
          height: '100%',
          width: 'auto',
          justifySelf: 'center'
        }}
      />
    </>
  );
}
