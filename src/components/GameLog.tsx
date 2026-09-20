// Game log component

interface GameLogProps {
  log: string[];
}

export function GameLog({ log }: Readonly<GameLogProps>) {
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
            background: 'rgba(0, 0, 0, 0.28)',
            color: 'var(--text-secondary)',
            padding: '15px',
            borderRadius: '8px',
            height: '100%',
            overflowY: 'auto',
            fontFamily: 'monospace',
            fontSize: '14px',
            border: '1px solid var(--border)',
            boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.45)',
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
