// Main game board component

import React, { useState, useEffect } from 'react';
import { GameState } from '../types/game';
import { initializeGame, processCardPick, processRoomSkip, getGameStats, calculateFinalScore } from '../game/gameController';
import { getSuitSymbol, getCardType } from '../game/cardUtils';
import { getWeaponDurabilityDescription } from '../game/weaponSystem';

export function GameBoard() {
  const [game, setGame] = useState<GameState>(() => initializeGame());
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
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'monospace' }}>
      <h1>🃏 SCOUNDREL</h1>

      {/* Player Stats */}
      <div style={{ 
        background: '#f5f5f5', 
        padding: '15px', 
        borderRadius: '8px', 
        marginBottom: '20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px'
      }}>
        <div>
          <strong>HP:</strong> {stats.hp}/{stats.maxHp}
          <div style={{ 
            background: '#ddd', 
            height: '20px', 
            borderRadius: '4px', 
            overflow: 'hidden',
            marginTop: '5px'
          }}>
            <div style={{ 
              background: stats.hp > 10 ? '#4caf50' : '#f44336',
              height: '100%',
              width: `${(stats.hp / stats.maxHp) * 100}%`,
              transition: 'width 0.3s'
            }} />
          </div>
        </div>
        
        <div>
          <strong>Weapon:</strong> {stats.weapon ? `♦${stats.weapon.rank}` : 'None'}
          <br />
          <small>{getWeaponDurabilityDescription(game.player)}</small>
        </div>
        
        <div>
          <strong>Score:</strong> {stats.currentScore}
          <br />
          <small>HP({stats.hp}) + Enemies({stats.defeatedEnemies})</small>
        </div>
        
        <div>
          <strong>Rooms:</strong> Cleared: {stats.roomsCleared}, Skipped: {stats.roomsSkipped}
          <br />
          <small>Deck: {stats.cardsInDeck} cards</small>
        </div>
      </div>

      {/* Game Over Screen */}
      {isGameOver && (
        <div style={{
          background: game.gameStatus === 'won' ? '#4caf50' : '#f44336',
          color: 'white',
          padding: '30px',
          borderRadius: '8px',
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          <h2>{game.gameStatus === 'won' ? '🎉 VICTORY!' : '💀 GAME OVER'}</h2>
          <h3>Final Score: {calculateFinalScore(game)}</h3>
          <p>HP: {stats.hp} + Enemies Defeated: {stats.defeatedEnemies}</p>
          <p>Rooms Cleared: {stats.roomsCleared} | Rooms Skipped: {stats.roomsSkipped}</p>
          <button
            onClick={handleNewGame}
            style={{
              marginTop: '20px',
              padding: '12px 24px',
              fontSize: '16px',
              background: 'white',
              color: '#333',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            New Game
          </button>
        </div>
      )}

      {/* Current Room */}
      {!isGameOver && (
        <>
          <div style={{ marginBottom: '20px' }}>
            <h2>Current Room ({game.cardsPickedThisRoom}/3 picked)</h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(4, 1fr)', 
              gap: '15px',
              marginTop: '15px'
            }}>
              {game.currentRoom.map((card, index) => {
                const cardType = getCardType(card);
                const color = cardType === 'health' ? '#e91e63' : 
                             cardType === 'weapon' ? '#2196f3' : '#4caf50';
                
                return (
                  <div
                    key={card.id}
                    style={{
                      background: 'white',
                      border: `3px solid ${color}`,
                      borderRadius: '8px',
                      padding: '20px',
                      textAlign: 'center',
                      cursor: game.gameStatus === 'playing' ? 'pointer' : 'default',
                      transition: 'transform 0.2s',
                    }}
                    onClick={() => handlePickCard(index)}
                    onMouseEnter={(e) => {
                      if (game.gameStatus === 'playing') {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{ fontSize: '48px', color }}>
                      {getSuitSymbol(card.suit)}
                    </div>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '10px' }}>
                      {card.rank}
                    </div>
                    <div style={{ fontSize: '12px', marginTop: '10px', color: '#666' }}>
                      {cardType === 'health' ? 'HEAL' : cardType === 'weapon' ? 'WEAPON' : 'ENEMY'}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePickCard(index);
                      }}
                      disabled={game.gameStatus !== 'playing'}
                      style={{
                        marginTop: '15px',
                        padding: '8px 16px',
                        background: color,
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: game.gameStatus === 'playing' ? 'pointer' : 'not-allowed',
                        fontWeight: 'bold',
                        width: '100%'
                      }}
                    >
                      Pick [{index}]
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div style={{ marginBottom: '20px' }}>
            <h3>Actions</h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={() => handleSkip('left-to-right')}
                disabled={!canSkip}
                style={{
                  padding: '12px 24px',
                  background: canSkip ? '#ff9800' : '#ccc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: canSkip ? 'pointer' : 'not-allowed',
                  fontWeight: 'bold'
                }}
              >
                Skip Room (Left → Right)
              </button>
              <button
                onClick={() => handleSkip('right-to-left')}
                disabled={!canSkip}
                style={{
                  padding: '12px 24px',
                  background: canSkip ? '#ff9800' : '#ccc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: canSkip ? 'pointer' : 'not-allowed',
                  fontWeight: 'bold'
                }}
              >
                Skip Room (Right → Left)
              </button>
              {!canSkip && game.cardsPickedThisRoom > 0 && (
                <small style={{ alignSelf: 'center', color: '#666' }}>
                  (Cannot skip after picking cards)
                </small>
              )}
            </div>
          </div>
        </>
      )}

      {/* Game Log */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Game Log</h3>
        <div
          id="game-log"
          style={{
            background: '#000',
            color: '#0f0',
            padding: '15px',
            borderRadius: '8px',
            height: '200px',
            overflowY: 'auto',
            fontFamily: 'monospace',
            fontSize: '14px'
          }}
        >
          {log.map((entry, i) => (
            <div key={i} style={{ marginBottom: '5px' }}>
              {entry}
            </div>
          ))}
        </div>
      </div>

      {/* New Game / Help */}
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
  );
}
