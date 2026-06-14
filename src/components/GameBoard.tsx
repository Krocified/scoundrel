// Main game board component

import { useState, useEffect } from 'react';
import type { RunModifierId, GameState } from '../types/game';
import { initializeGame, processCardPick, processRoomSkip, getGameStats, calculateFinalScore } from '../game/gameController';
import { loadPowerUps } from '../game/powerUpStorage';
import { PlayerStats } from './PlayerStats';
import { GameOverScreen } from './GameOverScreen';
import { PowerUpSelection } from './PowerUpSelection';
import { RunModifierSelection } from './RunModifierSelection';
import { DeckDisplay } from './DeckDisplay';
import { RoomCard } from './RoomCard';
import { SkipButtons } from './SkipButtons';
import { WeaponDisplay } from './WeaponDisplay';
import { GameLog } from './GameLog';
import { Footer } from './Footer';
import { PickedCardPlaceholder } from './PickedCardPlaceholder';
import { NewGameButton } from './NewGameButton';
import { Title } from './Title';
import { HamburgerMenu } from './HamburgerMenu';
export function GameBoard() {
  const enableRunModifier = new URLSearchParams(window.location.search).get('runModifier') === '1';

  const [storedPowerUps, setStoredPowerUps] = useState(() => loadPowerUps().unlockedPowerUps);
  const [showModifierSelection, setShowModifierSelection] = useState(enableRunModifier);
  const [runModifiers, setRunModifiers] = useState<RunModifierId[]>([]);
  const [game, setGame] = useState<GameState | null>(() => {
    if (enableRunModifier) return null;
    return initializeGame(loadPowerUps().unlockedPowerUps, []).gameState;
  });
  const [log, setLog] = useState<string[]>(() => {
    if (enableRunModifier) return ['Game started! Pick 3 cards from the room.'];
    const { jokerLogs } = initializeGame(loadPowerUps().unlockedPowerUps, []);
    return ['Game started! Pick 3 cards from the room.', ...jokerLogs];
  });
  const [showPowerUpSelection, setShowPowerUpSelection] = useState(false);

  const startGame = (modifiers: RunModifierId[]) => {
    const currentPowerUps = loadPowerUps().unlockedPowerUps;
    setStoredPowerUps(currentPowerUps);
    setRunModifiers(modifiers);
    const { gameState, jokerLogs } = initializeGame(currentPowerUps, modifiers);
    setGame(gameState);
    const initialLogs = ['Game started! Pick 3 cards from the room.', ...jokerLogs];
    setLog(initialLogs);
    setShowModifierSelection(false);
    setShowPowerUpSelection(false);
  };

  const handlePickCard = (index: number) => {
    if (!game || game.gameStatus !== 'playing') return;
    
    try {
      const result = processCardPick(game, index);
      setGame(result.gameState);
      setLog(prev => [...prev, ...result.log]);
    } catch (error) {
      setLog(prev => [...prev, `Error: ${(error as Error).message}`]);
    }
  };

  const handleSkip = (direction: 'left-to-right' | 'right-to-left') => {
    if (!game || game.gameStatus !== 'playing') return;
    
    try {
      const result = processRoomSkip(game, direction);
      setGame(result.gameState);
      setLog(prev => [...prev, ...result.log]);
    } catch (error) {
      setLog(prev => [...prev, `Error: ${(error as Error).message}`]);
    }
  };

  const handleNewGame = () => {
    if (enableRunModifier) {
      setShowModifierSelection(true);
      setGame(null);
      setLog(['Game started!']);
      setShowPowerUpSelection(false);
    } else {
      startGame([]);
    }
  };

  const handleClaimReward = () => {
    if (game) setShowPowerUpSelection(true);
  };

  const handlePowerUpSelect = (_selectedId: string) => {
    startGame(runModifiers);
  };

  // Auto-scroll log to bottom (must be before early return for hooks consistency)
  useEffect(() => {
    const logEl = document.getElementById('game-log');
    if (logEl) logEl.scrollTop = logEl.scrollHeight;
  }, [log]);

  if (showModifierSelection) {
    return (
      <>
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
          fontFamily: 'monospace',
          background: 'var(--bg-page)',
          color: 'var(--text-secondary)',
          overflow: 'auto'
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <Title />
          </div>
          <RunModifierSelection
            onStart={startGame}
            onSkip={() => startGame([])}
          />
        </div>
        <Footer />
      </>
    );
  }

  if (!game) return null;

  const stats = getGameStats(game);

  const isGameOver = game.gameStatus !== 'playing';
  const canSkip = game.cardsPickedThisRoom === 0 && game.currentRoom.length === 4;

  return (
    <>
      <style>{`
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
          
          .current-room-title {
            font-size: 16px !important;
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
        fontFamily: 'monospace',
        background: 'var(--bg-page)',
        color: 'var(--text-secondary)',
        overflow: 'auto'
      }}>
        {/* Header with Title and Buttons */}
        <div className="header-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div className="header-title-row" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <HamburgerMenu />
            <Title className="header-title-desktop" />
            <Title className="header-title-mobile" style={{ display: 'none' }} />
          </div>
          <div className="header-buttons" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <NewGameButton onClick={handleNewGame} />
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
          activePowerUps={game.activePowerUps}
          runModifiers={game.runModifiers}
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
            onClaimReward={game.gameStatus === 'won' ? handleClaimReward : undefined}
          />
        )}
        {game.gameStatus === 'won' && showPowerUpSelection && (
          <PowerUpSelection
            ownedPowerUps={storedPowerUps}
            onSelect={handlePowerUpSelect}
          />
        )}

        {!isGameOver && (
          <>
            <div style={{ marginBottom: '18px' }}>
              <h2 className="current-room-title" style={{ marginBottom: '12px', marginTop: 0, color: 'var(--text-primary)', fontSize: '16px' }}>Current Room ({game.cardsPickedThisRoom}/3 picked)</h2>
              
              {/* Mobile-only deck count text */}
              <div className="deck-count-mobile">
                🃏 {stats.cardsInDeck} cards remaining in deck
              </div>
              
              <div className="room-grid-desktop" style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 140px', 
                columnGap: '14px',
                height: '280px',
                marginBottom: '16px',
                alignItems: 'center'
              }}>
                <div className="deck-display-desktop" style={{ marginRight: '10px', alignSelf: 'stretch', height: '100%' }}>
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

                <div className="skip-buttons-desktop" style={{ marginLeft: '10px', alignSelf: 'stretch', height: '100%' }}>
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
              marginBottom: '4px',
              marginTop: '48px'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '14px', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Weapon</h3>
                <div style={{ height: '160px' }}>
                  <WeaponDisplay
                    weapon={stats.weapon}
                    weaponDurability={stats.weaponDurability}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '14px', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Game Log</h3>
                <div style={{ height: '160px' }}>
                  <GameLog log={log} />
                </div>
              </div>
            </div>
          </>
        )}

      </div>
      <Footer />
    </>
  );
}
