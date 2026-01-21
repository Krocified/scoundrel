// Main game board component

import React, { useState, useEffect } from 'react';
import { initializeGame, processCardPick, processRoomSkip, getGameStats, calculateFinalScore } from '../game/gameController';
import { PlayerStats } from './PlayerStats';
import { GameOverScreen } from './GameOverScreen';
import { DeckDisplay } from './DeckDisplay';
import { RoomCard } from './RoomCard';
import { SkipButtons } from './SkipButtons';
import { WeaponDisplay } from './WeaponDisplay';
import { GameLog } from './GameLog';

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
        <h1>🃏 SCOUNDREL</h1>

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
            <div style={{ marginBottom: '20px' }}>
              <h2>Current Room ({game.cardsPickedThisRoom}/3 picked)</h2>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 150px', 
                columnGap: '15px',
                marginTop: '15px'
              }}>
                <DeckDisplay cardsInDeck={stats.cardsInDeck} />

                {game.currentRoom.map((card, index) => (
                  <RoomCard
                    key={card.id}
                    card={card}
                    index={index}
                    isGamePlaying={game.gameStatus === 'playing'}
                    onPickCard={handlePickCard}
                  />
                ))}

                <SkipButtons
                  canSkip={canSkip}
                  cardsPickedThisRoom={game.cardsPickedThisRoom}
                  onSkip={handleSkip}
                />
              </div>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '300px 1fr',
              gap: '20px',
              marginBottom: '20px'
            }}>
              <WeaponDisplay
                weapon={stats.weapon}
                weaponDurability={stats.weaponDurability}
              />

              <GameLog log={log} />
            </div>
          </>
        )}

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
          <a
            href="/GAME_RULES.md"
            target="_blank"
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
          </a>
        </div>
      </div>
    </>
  );
}
