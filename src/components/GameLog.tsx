// Game log component

interface GameLogProps {
  log: string[];
}

export function GameLog({ log }: Readonly<GameLogProps>) {
  return (
    <div>
      <h3 style={{ margin: '0 0 10px 0' }}>Game Log</h3>
      <div
        id="game-log"
        style={{
          background: '#000',
          color: '#0f0',
          padding: '15px',
          borderRadius: '8px',
          height: '250px',
          overflowY: 'auto',
          fontFamily: 'monospace',
          fontSize: '14px'
        }}
      >
        {log.map((entry, i) => (
          <div key={`log-${i}-${entry.substring(0, 20)}`} style={{ marginBottom: '5px' }}>
            {entry}
          </div>
        ))}
      </div>
    </div>
  );
}
