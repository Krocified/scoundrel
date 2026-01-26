// Game over screen component

import { NewGameButton } from './NewGameButton';

interface GameOverScreenProps {
  gameStatus: 'won' | 'lost';
  finalScore: number;
  hp: number;
  defeatedEnemies: number;
  roomsCleared: number;
  roomsSkipped: number;
  onNewGame: () => void;
}

export function GameOverScreen({
  gameStatus,
  finalScore,
  hp,
  defeatedEnemies,
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
      <h3>Final Score: {finalScore}</h3>
      <p>HP: {hp} + Enemies Defeated: {defeatedEnemies}</p>
      <p>Rooms Cleared: {roomsCleared} | Rooms Skipped: {roomsSkipped}</p>
      <NewGameButton onClick={onNewGame} style={{ marginTop: '20px' }} />
    </div>
  );
}
