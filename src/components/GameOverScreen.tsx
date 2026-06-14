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
  return (
    <div style={{
      background: gameStatus === 'won' ? '#4caf50' : '#f44336',
      color: 'white',
      padding: '30px',
      borderRadius: '8px',
      textAlign: 'center',
      marginBottom: '20px'
    }}>
      <h2>{gameStatus === 'won' ? '🎉 VICTORY!' : '💀 GAME OVER'}</h2>
      <div style={{
        maxWidth: '250px',
        margin: '20px auto',
        textAlign: 'left'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '8px'
        }}>
          <span>Remaining HP</span>
          <span style={{ fontWeight: 'bold' }}>{hp}</span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '8px'
        }}>
          <span>Combat Score</span>
          <span style={{ fontWeight: 'bold' }}>{defeatedEnemiesValue}</span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '8px'
        }}>
          <span>Rooms Cleared</span>
          <span style={{ fontWeight: 'bold' }}>{roomsCleared}</span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <span>Rooms Skipped</span>
          <span style={{ fontWeight: 'bold' }}>{roomsSkipped}</span>
        </div>
      </div>
      <h3>Final Score: {finalScore}</h3>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
        <NewGameButton onClick={onNewGame} />
        {gameStatus === 'won' && onClaimReward && (
          <button
            onClick={onClaimReward}
            style={{
              background: '#f5f5f5',
              color: '#333',
              border: '2px solid #ddd',
              padding: '12px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px',
              fontFamily: 'inherit',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { (e.target as HTMLButtonElement).style.borderColor = '#bbb'; (e.target as HTMLButtonElement).style.background = '#e8e8e8'; }}
            onMouseLeave={e => { (e.target as HTMLButtonElement).style.borderColor = '#ddd'; (e.target as HTMLButtonElement).style.background = '#f5f5f5'; }}
          >
            Claim Reward
          </button>
        )}
      </div>
    </div>
  );
}
