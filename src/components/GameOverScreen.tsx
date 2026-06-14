// Game over screen component

import { NewGameButton } from './NewGameButton';

interface GameOverScreenProps {
  gameStatus: 'won' | 'lost';
  finalScore: number;
  hp: number;
  defeatedEnemiesValue: number;
  roomsCleared: number;
  roomsSkipped: number;
  onNewGame: () => void;
  onClaimReward?: () => void;
}

export function GameOverScreen({
  gameStatus,
  finalScore,
  hp,
  defeatedEnemiesValue,
  roomsCleared,
  roomsSkipped,
  onNewGame,
  onClaimReward,
}: Readonly<GameOverScreenProps>) {
  const isWin = gameStatus === 'won';

  const statItems = [
    { label: 'Remaining HP', value: hp },
    { label: 'Combat Score', value: defeatedEnemiesValue },
    { label: 'Rooms Cleared', value: roomsCleared },
    { label: 'Rooms Skipped', value: roomsSkipped },
  ];

  return (
    <div style={{
      background: 'var(--bg-panel)',
      color: 'var(--text-primary)',
      padding: '32px',
      borderRadius: '16px',
      textAlign: 'center',
      marginBottom: '20px',
      border: `2px solid ${isWin ? 'rgba(76, 175, 80, 0.5)' : 'rgba(244, 67, 54, 0.5)'}`,
      boxShadow: `0 8px 32px ${isWin ? 'rgba(76, 175, 80, 0.12)' : 'rgba(244, 67, 54, 0.12)'}`,
    }}>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: isWin ? 'rgba(76, 175, 80, 0.15)' : 'rgba(244, 67, 54, 0.15)',
          border: `2px solid ${isWin ? 'rgba(76, 175, 80, 0.4)' : 'rgba(244, 67, 54, 0.4)'}`,
          fontSize: '32px',
          marginBottom: '16px',
        }}
      >
        {isWin ? '🎉' : '💀'}
      </div>

      <h2 style={{
        margin: '0 0 8px',
        color: isWin ? '#81c784' : '#e57373',
        fontFamily: '"Pirata One", Georgia, serif',
        fontSize: '40px',
        letterSpacing: '1px',
      }}>
        {isWin ? 'VICTORY!' : 'GAME OVER'}
      </h2>

      <p style={{ margin: '0 0 24px', color: 'var(--text-secondary)', fontSize: '15px' }}>
        {isWin ? 'You conquered the dungeon.' : 'The dungeon claims another soul.'}
      </p>

      {/* Final Score */}
      <div
        style={{
          background: 'var(--accent-dim)',
          border: '1px solid var(--accent-border)',
          borderRadius: '12px',
          padding: '18px',
          marginBottom: '24px',
        }}
      >
        <div style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '4px' }}>
          Final Score
        </div>
        <div style={{ fontSize: '42px', fontWeight: 'bold', color: 'var(--accent)', fontFamily: '"Pirata One", Georgia, serif', letterSpacing: '2px' }}>
          {finalScore}
        </div>
      </div>

      {/* Stat Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '10px',
          marginBottom: '28px',
        }}
      >
        {statItems.map((item) => (
          <div
            key={item.label}
            style={{
              background: 'var(--bg-input)',
              border: '1px solid var(--border)',
              borderRadius: '10px',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {item.label}
            </span>
            <span style={{ fontSize: '22px', fontWeight: 'bold', color: 'var(--text-primary)' }}>
              {item.value}
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
        <NewGameButton onClick={onNewGame} />
        {isWin && onClaimReward && (
          <button
            onClick={onClaimReward}
            style={{
              background: 'var(--accent-dim)',
              color: 'var(--accent)',
              border: '2px solid var(--accent-border)',
              padding: '12px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px',
              fontFamily: 'inherit',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(245, 200, 66, 0.2)';
              e.currentTarget.style.borderColor = 'var(--accent)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--accent-dim)';
              e.currentTarget.style.borderColor = 'var(--accent-border)';
            }}
          >
            Claim Reward
          </button>
        )}
      </div>
    </div>
  );
}
