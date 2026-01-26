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
}

export function GameOverScreen({
  gameStatus,
  finalScore,
  hp,
  defeatedEnemiesValue,
  roomsCleared,
  roomsSkipped,
  onNewGame
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
      <NewGameButton onClick={onNewGame} style={{ marginTop: '20px' }} />
    </div>
  );
}
