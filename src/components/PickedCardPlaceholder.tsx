// Placeholder for picked cards

import { useTheme } from '../contexts/ThemeContext';

export function PickedCardPlaceholder() {
  const { isDark } = useTheme();

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
          background: isDark
            ? 'repeating-linear-gradient(45deg, rgba(255,255,255,0.04), rgba(255,255,255,0.04) 10px, rgba(255,255,255,0.07) 10px, rgba(255,255,255,0.07) 20px)'
            : 'repeating-linear-gradient(45deg, #e0e0e0, #e0e0e0 10px, #f0f0f0 10px, #f0f0f0 20px)',
          border: isDark ? '3px dashed rgba(255, 255, 255, 0.15)' : '3px dashed #aaa',
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
