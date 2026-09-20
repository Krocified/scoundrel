// Main game board component

import { useState, useEffect } from 'react';
import type { GameState } from '../types/game';
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
import { NewGameButton } from './NewGameButton';
import { IconButton } from './IconButton';
import { Title } from './Title';

export function GameBoard() {
  const [game, setGame] = useState<GameState>(() => initializeGame());
  const [log, setLog] = useState<string[]>(['Game started! Pick 3 cards from the room.']);

  const startGame = () => {
    setGame(initializeGame());
    setLog(['Game started! Pick 3 cards from the room.']);
  };

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
    startGame();
  };

  // Auto-scroll log to bottom
  useEffect(() => {
    const logEl = document.getElementById('game-log');
    if (logEl) logEl.scrollTop = logEl.scrollHeight;
  }, [log]);

  const stats = getGameStats(game);

  const isGameOver = game.gameStatus !== 'playing';
  const canSkip = game.cardsPickedThisRoom === 0 && game.currentRoom.length === 4;

  return (
    <>
      <style>{`
        .board-stack {
          margin: auto 0;
          width: 100%;
        }

        .room-area {
          margin-bottom: 20px;
        }

        @media (max-width: 768px) {
          .deck-display-desktop {
            display: none !important;
          }

          .room-grid-desktop {
            grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
            height: auto !important;
            column-gap: 8px !important;
          }

          .room-card {
            width: 100% !important;
            height: auto !important;
          }

          .picked-card-placeholder {
            width: 100% !important;
            height: auto !important;
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
            gap: 12px !important;
            margin-top: 16px !important;
            margin-bottom: 8px !important;
          }

          .weapon-log-grid > div > div {
            height: 120px !important;
          }

          .game-board-container {
            padding: 10px !important;
          }

          .header-container {
            flex-direction: column !important;
            gap: 10px !important;
            align-items: flex-start !important;
          }

          .header-title-desktop {
            display: none !important;
          }

          .header-title-row {
            width: 100% !important;
            display: flex !important;
            justify-content: flex-start !important;
            align-items: center !important;
          }

          .header-title-mobile {
            display: block !important;
          }

          .header-buttons {
            width: 100%;
            justify-content: stretch !important;
          }

          .header-buttons button,
          .header-buttons a {
            flex: 1 !important;
            text-align: center !important;
          }
        }
      `}</style>
      <div className="game-board-container" style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 20px 8px 20px',
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
        minHeight: 0,
        background: 'transparent',
        color: 'var(--text-secondary)',
        overflow: 'auto'
      }}>
        <div className="board-stack">
        {/* Header with Title and Buttons */}
        <div className="header-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div className="header-title-row" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <Title className="header-title-desktop" />
            <Title className="header-title-mobile" style={{ display: 'none' }} />
          </div>
          <div className="header-buttons" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <IconButton
              href="/rules"
              target="_blank"
              rel="noreferrer"
              icon={
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              }
            >
              How to Play
            </IconButton>
            <NewGameButton onClick={handleNewGame} />
          </div>
        </div>

        <PlayerStats
          hp={stats.hp}
          maxHp={stats.maxHp}
          cardsInDeck={stats.cardsInDeck}
        />

        {isGameOver && (
          <GameOverScreen
            gameStatus={game.gameStatus as 'won' | 'lost'}
            finalScore={calculateFinalScore(game)}
            hp={stats.hp}
            defeatedEnemiesValue={stats.defeatedEnemiesValue}
            roomsCleared={stats.roomsCleared}
            roomsSkipped={stats.roomsSkipped}
            onNewGame={handleNewGame}
          />
        )}

        {!isGameOver && (
          <>
            <div className="room-area">
              <div className="room-grid-desktop" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, minmax(0, 1fr)) 132px',
                columnGap: '14px',
                alignItems: 'center'
              }}>
                <div className="deck-display-desktop" style={{ alignSelf: 'stretch', height: '100%' }}>
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

                <div className="skip-buttons-desktop" style={{ alignSelf: 'stretch', height: '100%' }}>
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
              gridTemplateColumns: '220px 1fr',
              gap: '20px',
              flex: '0 0 auto',
              marginTop: '20px'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '14px', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Weapon</h3>
                <div style={{ height: 'clamp(150px, 22vh, 240px)' }}>
                  <WeaponDisplay
                    weapon={stats.weapon}
                    weaponDurability={stats.weaponDurability}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '14px', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Game Log</h3>
                <div style={{ height: 'clamp(150px, 22vh, 240px)' }}>
                  <GameLog log={log} />
                </div>
              </div>
            </div>
          </>
        )}

        </div>
      </div>
      <Footer />
    </>
  );
}
