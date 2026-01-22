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
import { Footer } from './Footer';
import { PickedCardPlaceholder } from './PickedCardPlaceholder';
import { ColorModeToggle } from './ColorModeToggle';

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
        
        .deck-count-mobile {
          display: none;
        }
        
        @media (max-width: 768px) {
          .deck-display-desktop {
            display: none !important;
          }
          
          .deck-count-mobile {
            display: block !important;
            text-align: center;
            font-size: 14px;
            margin-bottom: 10px;
            font-weight: bold;
            color: #667eea;
          }
          
          .room-grid-desktop {
            grid-template-columns: 1fr 1fr 1fr 1fr !important;
            height: auto !important;
            column-gap: 8px !important;
          }
          
          .skip-buttons-desktop {
            display: none !important;
          }
          
          .skip-buttons-mobile {
            display: flex !important;
            margin-top: 15px;
            margin-bottom: 15px;
          }
          
          .weapon-log-grid {
            grid-template-columns: 1fr !important;
            gap: 15px !important;
            margin-top: 20px !important;
          }
          
          .game-board-container {
            padding: 10px !important;
          }
          
          .header-container {
            flex-direction: column !important;
            gap: 10px !important;
            align-items: flex-start !important;
          }
          
          .header-buttons {
            width: 100%;
            justify-content: stretch !important;
          }
          
          .header-buttons button,
          .header-buttons a {
            flex: 1 !important;
          }
          
          .current-room-title {
            font-size: 16px !important;
            text-align: center !important;
          }
          
          .footer-spacer {
            margin-top: 100px !important;
          }
        }
      `}</style>
      <div className="game-board-container" style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto', fontFamily: 'monospace' }}>
        {/* Header with Title and Buttons */}
        <div className="header-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h1 style={{ margin: 0 }}>🃏 SCOUNDREL</h1>
            <ColorModeToggle />
          </div>
          <div className="header-buttons" style={{ display: 'flex', gap: '10px' }}>
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
              <h2 className="current-room-title" style={{ marginBottom: '10px', marginTop: 0 }}>Current Room ({game.cardsPickedThisRoom}/3 picked)</h2>
              
              {/* Mobile-only deck count text */}
              <div className="deck-count-mobile">
                🃏 {stats.cardsInDeck} cards remaining in deck
              </div>
              
              <div className="room-grid-desktop" style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 150px', 
                columnGap: '15px',
                height: '280px'
              }}>
                <div className="deck-display-desktop" style={{ marginRight: '15px' }}>
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

                <div className="skip-buttons-desktop" style={{ marginLeft: '15px' }}>
                  <SkipButtons
                    canSkip={canSkip}
                    cardsPickedThisRoom={game.cardsPickedThisRoom}
                    onSkip={handleSkip}
                  />
                </div>
              </div>
              
              {/* Mobile-only skip buttons below cards */}
              <div className="skip-buttons-mobile" style={{ display: 'none' }}>
                <SkipButtons
                  canSkip={canSkip}
                  cardsPickedThisRoom={game.cardsPickedThisRoom}
                  onSkip={handleSkip}
                />
              </div>
            </div>

            <div className="weapon-log-grid" style={{ 
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

        <div className="footer-spacer" style={{ marginTop: '20px' }}>
          <Footer />
        </div>
      </div>
    </>
  );
}
