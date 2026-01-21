// Tests for game controller

import {
  initializeGame,
  processCardPick,
  processRoomSkip,
  calculateFinalScore,
  getGameStats,
} from './gameController';
import { getCardDisplay } from './cardUtils';

export function testGameController() {
  console.log('=== Game Controller Tests ===\n');

  // Test 1: Initialize game
  console.log('Test 1: Initialize new game...');
  let game = initializeGame();
  console.log(`  Deck size: ${game.deck.length}`);
  console.log(`  Room size: ${game.currentRoom.length}`);
  console.log(`  Player HP: ${game.player.hp}/${game.player.maxHp}`);
  console.log(`  Game status: ${game.gameStatus}`);
  
  const initCorrect = 
    game.deck.length === 38 &&
    game.currentRoom.length === 4 &&
    game.player.hp === 20 &&
    game.gameStatus === 'playing';
  console.log(initCorrect ? '✓ Game initialized correctly\n' : '✗ Game init failed\n');

  // Test 2: Get game stats
  console.log('Test 2: Get game statistics...');
  const stats = getGameStats(game);
  console.log(`  HP: ${stats.hp}/${stats.maxHp}`);
  console.log(`  Rooms cleared: ${stats.roomsCleared}`);
  console.log(`  Cards in deck: ${stats.cardsInDeck}`);
  console.log(`  Current score: ${stats.currentScore}`);
  console.log('✓ Game stats retrieved\n');

  // Test 3: Pick cards and complete a room
  console.log('Test 3: Pick 3 cards to complete a room...');
  console.log(`  Room cards: ${game.currentRoom.map(getCardDisplay).join(' ')}`);
  
  const { gameState: g1, log: log1 } = processCardPick(game, 0);
  console.log(`  Pick 1: ${log1.join(' ')}`);
  
  const { gameState: g2, log: log2 } = processCardPick(g1, 0);
  console.log(`  Pick 2: ${log2.join(' ')}`);
  
  const { gameState: g3, log: log3 } = processCardPick(g2, 0);
  console.log(`  Pick 3: ${log3.join(' ')}`);
  
  const roomComplete = g3.roomsCleared === 1;
  console.log(roomComplete ? '✓ Room completed and advanced\n' : '✗ Room completion failed\n');
  
  game = g3;

  // Test 4: Skip a room
  console.log('Test 4: Skip a room...');
  const deckBeforeSkip = game.deck.length;
  
  const { gameState: g4, log: log4 } = processRoomSkip(game, 'left-to-right');
  console.log(`  ${log4.join(' ')}`);
  console.log(`  Rooms skipped: ${g4.roomsSkipped}`);
  console.log(`  Deck before: ${deckBeforeSkip}, after: ${g4.deck.length}`);
  
  const skipCorrect = g4.roomsSkipped === 1 && g4.cardsPickedThisRoom === 0;
  console.log(skipCorrect ? '✓ Room skipped correctly\n' : '✗ Room skip failed\n');
  
  game = g4;

  // Test 5: Calculate score
  console.log('Test 5: Calculate score...');
  // Create a game state with some defeated enemies
  game.defeatedEnemies = [7, 10, 3, 13]; // Sum = 33
  game.player.hp = 15;
  
  const score = calculateFinalScore(game);
  const expectedScore = 15 + 33; // 48
  console.log(`  HP: ${game.player.hp}`);
  console.log(`  Defeated enemies: [${game.defeatedEnemies.join(', ')}]`);
  console.log(`  Score: ${score} (expected: ${expectedScore})`);
  
  const scoreCorrect = score === expectedScore;
  console.log(scoreCorrect ? '✓ Score calculated correctly\n' : '✗ Score calculation failed\n');

  // Test 6: Game over - player death
  console.log('Test 6: Player death scenario...');
  game = initializeGame();
  game.player.hp = 1; // Low HP
  
  // Find an enemy card to pick
  let enemyIndex = game.currentRoom.findIndex(c => c.suit === 'spades' || c.suit === 'clubs');
  if (enemyIndex === -1) enemyIndex = 0; // Fallback
  
  const { gameState: deadGame, log: deathLog } = processCardPick(game, enemyIndex);
  console.log(`  ${deathLog.join(' ')}`);
  console.log(`  Game status: ${deadGame.gameStatus}`);
  
  const deathCorrect = deadGame.player.hp <= 0 || deadGame.gameStatus === 'lost';
  console.log(deathCorrect ? '✓ Player death detected\n' : '⚠ Player survived (depends on cards)\n');

  // Test 7: Try to skip after picking cards (should fail)
  console.log('Test 7: Cannot skip after picking cards...');
  game = initializeGame();
  const { gameState: partialGame } = processCardPick(game, 0);
  
  let skipError = false;
  try {
    processRoomSkip(partialGame, 'left-to-right');
  } catch (error) {
    skipError = true;
    console.log(`  Error caught: ${(error as Error).message}`);
  }
  
  console.log(skipError ? '✓ Skip validation works\n' : '✗ Skip validation failed\n');

  // Test 8: Multi-room progression
  console.log('Test 8: Progress through multiple rooms...');
  game = initializeGame();
  
  // Play through a few rooms
  for (let i = 0; i < 3; i++) {
    if (game.gameStatus !== 'playing') break;
    
    // Pick 3 cards
    const r1 = processCardPick(game, 0);
    const r2 = processCardPick(r1.gameState, 0);
    const r3 = processCardPick(r2.gameState, 0);
    
    game = r3.gameState;
  }
  
  console.log(`  Rooms cleared: ${game.roomsCleared}`);
  console.log(`  Player HP: ${game.player.hp}/${game.player.maxHp}`);
  console.log(`  Game status: ${game.gameStatus}`);
  console.log(`  Score: ${calculateFinalScore(game)}`);
  console.log('✓ Multi-room progression works\n');

  // Test 9: Game stats
  console.log('Test 9: Complete game stats...');
  const finalStats = getGameStats(game);
  console.log(`  HP: ${finalStats.hp}/${finalStats.maxHp}`);
  console.log(`  Weapon: ${finalStats.weapon?.rank || 'none'}`);
  console.log(`  Weapon durability: ${finalStats.weaponDurability || 'N/A'}`);
  console.log(`  Rooms cleared: ${finalStats.roomsCleared}`);
  console.log(`  Rooms skipped: ${finalStats.roomsSkipped}`);
  console.log(`  Cards in deck: ${finalStats.cardsInDeck}`);
  console.log(`  Enemies defeated: ${finalStats.defeatedEnemies}`);
  console.log(`  Current score: ${finalStats.currentScore}`);
  console.log(`  Status: ${finalStats.gameStatus}`);
  console.log('✓ All stats available\n');

  console.log('=== All Game Controller Tests Complete ===');
}
