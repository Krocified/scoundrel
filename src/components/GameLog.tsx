// Game log component

import { useTheme } from '../contexts/ThemeContext';

interface GameLogProps {
  log: string[];
}

export function GameLog({ log }: Readonly<GameLogProps>) {
  const { isDark } = useTheme();

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .game-log-container {
            height: 200px !important;
            padding: 12px !important;
            font-size: 12px !important;
          }
          
          .game-log-title {
            display: none !important;
          }
        }
      `}</style>
      <div style={{ height: '100%' }}>
        <div
          id="game-log"
          className="game-log-container"
          style={{
            background: isDark ? '#000' : '#f8f8f8',
            color: isDark ? '#0f0' : '#2a2a3a',
            padding: '15px',
            borderRadius: '8px',
            height: '100%',
            overflowY: 'auto',
            fontFamily: 'monospace',
            fontSize: '14px',
            border: '1px solid var(--border)',
            boxSizing: 'border-box',
          }}
        >
        {log.map((entry, i) => (
          <div key={`log-${i}-${entry.substring(0, 20)}`} style={{ marginBottom: '5px' }}>
            {entry}
          </div>
        ))}
        </div>
      </div>
    </>
  );
}
