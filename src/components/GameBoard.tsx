// Main game board component

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { initializeGame, processCardPick, processRoomSkip, getGameStats, calculateFinalScore } from '../game/gameController';
import { PlayerStats } from './PlayerStats';
import { GameOverScreen } from './GameOverScreen';
import { DeckDisplay } from './DeckDisplay';
import { RoomCard } from './RoomCard';
import { SkipButtons } from './SkipButtons';
import { WeaponDisplay } from './WeaponDisplay';
import { GameLog } from './GameLog';
import { PickedCardPlaceholder } from './PickedCardPlaceholder';

export function GameBoard() {
  const [game, setGame] = useState(() => initializeGame());
  const [log, setLog] = useState<string[]>(['Game started! Pick 3 cards from the room.']);

  const stats = getGameStats(game);

  const handlePickCard = (index: number) => {
    if (game.gameStatus !== 'playing') return;
    
    try {
      const result = processCardPick(game, index);
      setGame(result.gameState);
      setLog(prev => [...prev, ...result.log]);
    } catch (error) {
      setLog(prev => [...prev, `Error: ${(error as Error).message}`]);
    }
  };

  const handleSkip = (direction: 'left-to-right' | 'right-to-left') => {
    if (game.gameStatus !== 'playing') return;
    
    try {
      const result = processRoomSkip(game, direction);
      setGame(result.gameState);
      setLog(prev => [...prev, ...result.log]);
    } catch (error) {
      setLog(prev => [...prev, `Error: ${(error as Error).message}`]);
    }
  };

  const handleNewGame = () => {
    setGame(initializeGame());
    setLog(['New game started! Pick 3 cards from the room.']);
  };

  // Auto-scroll log to bottom
  useEffect(() => {
    const logEl = document.getElementById('game-log');
    if (logEl) logEl.scrollTop = logEl.scrollHeight;
  }, [log]);

  const isGameOver = game.gameStatus !== 'playing';
  const canSkip = game.cardsPickedThisRoom === 0 && game.currentRoom.length === 4;

  return (
    <>
      <style>{`
        .card-hover-enabled:hover {
          transform: translateY(-5px);
        }
      `}</style>
      <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto', fontFamily: 'monospace' }}>
        {/* Header with Title and Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1 style={{ margin: 0 }}>🃏 SCOUNDREL</h1>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleNewGame}
              style={{
                padding: '10px 20px',
                background: '#607d8b',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              New Game
            </button>
            <Link
              to="/rules"
              style={{
                padding: '10px 20px',
                background: '#9c27b0',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                textDecoration: 'none',
                fontWeight: 'bold',
                display: 'inline-block'
              }}
            >
              View Rules
            </Link>
          </div>
        </div>

        <PlayerStats
          hp={stats.hp}
          maxHp={stats.maxHp}
          currentScore={stats.currentScore}
          defeatedEnemies={stats.defeatedEnemies}
          roomsCleared={stats.roomsCleared}
          roomsSkipped={stats.roomsSkipped}
          cardsInDeck={stats.cardsInDeck}
        />

        {isGameOver && (
          <GameOverScreen
            gameStatus={game.gameStatus as 'won' | 'lost'}
            finalScore={calculateFinalScore(game)}
            hp={stats.hp}
            defeatedEnemies={stats.defeatedEnemies}
            roomsCleared={stats.roomsCleared}
            roomsSkipped={stats.roomsSkipped}
            onNewGame={handleNewGame}
          />
        )}

        {!isGameOver && (
          <>
            <div style={{ marginBottom: '15px' }}>
              <h2 style={{ marginBottom: '10px', marginTop: 0 }}>Current Room ({game.cardsPickedThisRoom}/3 picked)</h2>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 150px', 
                columnGap: '15px',
                height: '280px'
              }}>
                <div style={{ marginRight: '15px' }}>
                  <DeckDisplay cardsInDeck={stats.cardsInDeck} />
                </div>

                {/* Render 4 slots: cards + placeholders for picked cards */}
                {Array.from({ length: 4 }, (_, i) => ({ slotIndex: i, id: `slot-${i}` })).map(({ slotIndex, id }) => {
                  // If we have a card at this slot index in currentRoom, show it
                  // Otherwise show placeholder
                  const card = game.currentRoom[slotIndex];
                  
                  if (card) {
                    return (
                      <RoomCard
                        key={card.id}
                        card={card}
                        index={slotIndex}
                        isGamePlaying={game.gameStatus === 'playing'}
                        onPickCard={handlePickCard}
                      />
                    );
                  } else {
                    return <PickedCardPlaceholder key={`placeholder-${id}`} />;
                  }
                })}

                <div style={{ marginLeft: '15px' }}>
                  <SkipButtons
                    canSkip={canSkip}
                    cardsPickedThisRoom={game.cardsPickedThisRoom}
                    onSkip={handleSkip}
                  />
                </div>
              </div>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '300px 1fr',
              gap: '20px',
              marginBottom: '20px',
              marginTop: '65px',
              maxHeight: '250px'
            }}>
              <WeaponDisplay
                weapon={stats.weapon}
                weaponDurability={stats.weaponDurability}
              />

              <GameLog log={log} />
            </div>
          </>
        )}
      </div>
    </>
  );
}
