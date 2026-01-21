// Main game board component

import React, { useState, useEffect } from 'react';
import { GameState } from '../types/game';
import { initializeGame, processCardPick, processRoomSkip, getGameStats, calculateFinalScore } from '../game/gameController';
import { getSuitSymbol, getCardType } from '../game/cardUtils';

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
    <>
      <style>{`
        .card-hover-enabled:hover {
          transform: translateY(-5px);
        }
      `}</style>
      <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto', fontFamily: 'monospace' }}>
        <h1>🃏 SCOUNDREL</h1>

      {/* Player Stats */}
      <div style={{ 
        background: '#f5f5f5', 
        padding: '15px', 
        borderRadius: '8px', 
        marginBottom: '20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
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
          <strong>Score:</strong> {stats.currentScore}
          <br />
          <small>HP({stats.hp}) + Enemies({stats.defeatedEnemies})</small>
        </div>
        
        <div>
          <strong>Rooms:</strong> {stats.roomsCleared} cleared, {stats.roomsSkipped} skipped
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

      {/* Current Room with Deck - Grid Layout */}
      {!isGameOver && (
        <>
          <div style={{ marginBottom: '20px' }}>
            <h2>Current Room ({game.cardsPickedThisRoom}/3 picked)</h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 150px', 
              gap: '15px',
              marginTop: '15px'
            }}>
              {/* Deck - First Column */}
              <div style={{
                background: '#333',
                borderRadius: '8px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ 
                  position: 'relative',
                  width: '100px',
                  height: '140px',
                  marginBottom: '10px'
                }}>
                  {/* Deck stack with depth effect */}
                  {Array.from({ length: Math.min(5, Math.ceil(stats.cardsInDeck / 10)) }).map((_, i) => (
                    <div
                      key={`deck-${i}`}
                      style={{
                        position: 'absolute',
                        left: `${i * 2}px`,
                        top: `${i * 2}px`,
                        width: '100px',
                        height: '140px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: '3px solid #fff',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                        opacity: 1 - (i * 0.15)
                      }}
                    >
                      {i === 0 && (
                        <div style={{
                          fontSize: '40px',
                          color: 'white',
                          fontWeight: 'bold',
                          textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                        }}>
                          🃏
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div style={{ color: 'white', textAlign: 'center' }}>
                  <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{stats.cardsInDeck}</div>
                  <div style={{ fontSize: '12px', opacity: 0.8 }}>cards left</div>
                </div>
              </div>

              {/* Room Cards - 4 Columns */}
              {game.currentRoom.map((card, index) => {
                const cardType = getCardType(card);
                let color = '#4caf50'; // enemy default
                if (cardType === 'health') {
                  color = '#e91e63';
                } else if (cardType === 'weapon') {
                  color = '#2196f3';
                }
                
                return (
                  <div
                    key={card.id}
                    role="button"
                    tabIndex={game.gameStatus === 'playing' ? 0 : -1}
                    className={game.gameStatus === 'playing' ? 'card-hover-enabled' : ''}
                    onClick={() => game.gameStatus === 'playing' && handlePickCard(index)}
                    onKeyDown={(e) => {
                      if (game.gameStatus === 'playing' && (e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault();
                        handlePickCard(index);
                      }
                    }}
                    style={{
                      background: 'white',
                      border: `3px solid ${color}`,
                      borderRadius: '8px',
                      padding: '20px',
                      textAlign: 'center',
                      transition: 'transform 0.2s',
                      cursor: game.gameStatus === 'playing' ? 'pointer' : 'default',
                    }}
                  >
                    <div style={{ fontSize: '48px', color }}>
                      {getSuitSymbol(card.suit)}
                    </div>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '10px' }}>
                      {card.rank}
                    </div>
                    <div style={{ fontSize: '12px', marginTop: '10px', color: '#666' }}>
                      {(() => {
                        if (cardType === 'health') return 'HEAL';
                        if (cardType === 'weapon') return 'WEAPON';
                        return 'ENEMY';
                      })()}
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

              {/* Skip Room Actions - 6th Column */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                justifyContent: 'center'
              }}>
                <div style={{ 
                  fontSize: '12px', 
                  fontWeight: 'bold', 
                  color: '#666',
                  marginBottom: '5px',
                  textAlign: 'center'
                }}>
                  SKIP ROOM
                </div>
                <button
                  onClick={() => handleSkip('left-to-right')}
                  disabled={!canSkip}
                  style={{
                    padding: '12px',
                    background: canSkip ? '#ff9800' : '#ccc',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: canSkip ? 'pointer' : 'not-allowed',
                    fontSize: '13px',
                    fontWeight: 'bold'
                  }}
                >
                  ← L to R
                </button>
                <button
                  onClick={() => handleSkip('right-to-left')}
                  disabled={!canSkip}
                  style={{
                    padding: '12px',
                    background: canSkip ? '#ff9800' : '#ccc',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: canSkip ? 'pointer' : 'not-allowed',
                    fontSize: '13px',
                    fontWeight: 'bold'
                  }}
                >
                  R to L →
                </button>
                {!canSkip && game.cardsPickedThisRoom > 0 && (
                  <small style={{ 
                    color: '#999', 
                    fontSize: '10px',
                    textAlign: 'center',
                    marginTop: '5px'
                  }}>
                    Can't skip after picking
                  </small>
                )}
              </div>
            </div>
          </div>

          {/* Weapon Display and Game Log - Side by Side */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '300px 1fr',
            gap: '20px',
            marginBottom: '20px'
          }}>
            {/* Weapon Display */}
            <div style={{
              background: stats.weapon ? '#2196f3' : '#ccc',
              color: 'white',
              padding: '20px',
              borderRadius: '8px',
              textAlign: 'center',
              border: `3px solid ${stats.weapon ? '#1976d2' : '#999'}`
            }}>
              <div style={{ fontSize: '12px', opacity: 0.9, marginBottom: '8px', fontWeight: 'bold' }}>
                EQUIPPED WEAPON
              </div>
              <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '10px' }}>
                {stats.weapon ? `♦ ${stats.weapon.rank}` : '—'}
              </div>
              
              {/* Status */}
              <div style={{ fontSize: '14px', marginBottom: '15px', minHeight: '40px' }}>
                {(() => {
                  if (!stats.weapon) {
                    return <span style={{ opacity: 0.7 }}>No weapon equipped</span>;
                  }
                  if (stats.weaponDurability === null) {
                    return <span style={{ color: '#fff', fontWeight: 'bold' }}>✨ FRESH</span>;
                  }
                  return (
                    <span style={{ color: '#ffeb3b', fontWeight: 'bold' }}>
                      ⚠️ WORN
                    </span>
                  );
                })()}
              </div>

              {/* Durability Limit - Very Prominent */}
              {stats.weapon && stats.weaponDurability !== null && (
                <div style={{
                  background: 'rgba(0,0,0,0.3)',
                  padding: '15px',
                  borderRadius: '8px',
                  marginTop: '15px',
                  border: '2px solid rgba(255,255,255,0.3)'
                }}>
                  <div style={{ fontSize: '11px', opacity: 0.8, marginBottom: '5px' }}>
                    CAN DEFEAT ENEMIES
                  </div>
                  <div style={{ 
                    fontSize: '36px', 
                    fontWeight: 'bold',
                    color: '#ffeb3b',
                    textShadow: '0 0 10px rgba(255,235,59,0.5)'
                  }}>
                    &lt; {stats.weaponDurability}
                  </div>
                  <div style={{ fontSize: '10px', opacity: 0.7, marginTop: '5px' }}>
                    Max enemy value you can defeat
                  </div>
                </div>
              )}
            </div>

            {/* Game Log */}
            <div>
              <h3>Game Log</h3>
              <div
                id="game-log"
                style={{
                  background: '#000',
                  color: '#0f0',
                  padding: '15px',
                  borderRadius: '8px',
                  height: '300px',
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
          </div>

        </>
      )}

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
    </>
  );
}
