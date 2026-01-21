// Tests for card action handler

import { Card, GameState } from '../types/game';
import { pickCard, isRoomComplete, getLeftoverCard } from './cardActions';

// Helper to create initial game state for testing
function createTestGameState(roomCards: Card[]): GameState {
  return {
    deck: [],
    currentRoom: roomCards,
    leftoverCard: null,
    player: {
      hp: 20,
      maxHp: 20,
      equippedWeapon: null,
      weaponMaxEnemy: null,
    },
    cardsPickedThisRoom: 0,
    gameStatus: 'playing',
    roomsCleared: 0,
    roomsSkipped: 0,
    defeatedEnemies: [],
  };
}

export function testCardActions() {
  console.log('=== Card Action Tests ===\n');

  // Test cards
  const health5: Card = { suit: 'hearts', rank: 5, id: 'heart-5' };
  const health8: Card = { suit: 'hearts', rank: 8, id: 'heart-8' };
  const weapon6: Card = { suit: 'diamonds', rank: 6, id: 'diamond-6' };
  const enemy7: Card = { suit: 'spades', rank: 7, id: 'spade-7' };
  const enemy10: Card = { suit: 'clubs', rank: 10, id: 'club-10' };
  const enemy3: Card = { suit: 'spades', rank: 3, id: 'spade-3' };

  // Test 1: Pick health potion
  console.log('Test 1: Pick health potion...');
  let state = createTestGameState([health5, weapon6, enemy7, enemy10]);
  state.player.hp = 15; // Damaged player
  
  const result1 = pickCard(state, 0); // Pick health5
  console.log(`  ${result1.message}`);
  console.log(`  Cards in room: ${state.currentRoom.length} → ${result1.newGameState.currentRoom.length}`);
  console.log(`  Cards picked: ${result1.newGameState.cardsPickedThisRoom}/3`);
  
  const healthCorrect = result1.newGameState.player.hp === 20 && result1.cardType === 'health';
  console.log(healthCorrect ? '✓ Health potion works\n' : '✗ Health potion failed\n');

  // Test 2: Pick weapon
  console.log('Test 2: Pick weapon...');
  state = result1.newGameState;
  const result2 = pickCard(state, 0); // Pick weapon6 (now at index 0)
  console.log(`  ${result2.message}`);
  console.log(`  Weapon equipped: ${result2.newGameState.player.equippedWeapon?.rank}`);
  console.log(`  Cards picked: ${result2.newGameState.cardsPickedThisRoom}/3`);
  
  const weaponCorrect = result2.newGameState.player.equippedWeapon?.rank === 6 && result2.cardType === 'weapon';
  console.log(weaponCorrect ? '✓ Weapon equip works\n' : '✗ Weapon equip failed\n');

  // Test 3: Pick enemy (with weapon)
  console.log('Test 3: Fight enemy with weapon...');
  state = result2.newGameState;
  const result3 = pickCard(state, 0); // Pick enemy7
  console.log(`  ${result3.message}`);
  console.log(`  HP: ${result3.newGameState.player.hp}/${result3.newGameState.player.maxHp}`);
  console.log(`  Weapon durability updated: max < ${result3.newGameState.player.weaponMaxEnemy}`);
  console.log(`  Defeated enemies: [${result3.newGameState.defeatedEnemies.join(', ')}]`);
  console.log(`  Cards picked: ${result3.newGameState.cardsPickedThisRoom}/3`);
  
  // Weapon 6 vs Enemy 7 = 1 damage. 20 - 1 = 19
  const enemyCorrect = 
    result3.newGameState.player.hp === 19 &&
    result3.cardType === 'enemy' &&
    result3.newGameState.player.weaponMaxEnemy === 7 &&
    result3.newGameState.defeatedEnemies.length === 1;
  console.log(enemyCorrect ? '✓ Enemy combat with weapon works\n' : '✗ Enemy combat failed\n');

  // Test 4: Room complete check
  console.log('Test 4: Room completion...');
  state = result3.newGameState;
  console.log(`  Room complete: ${isRoomComplete(state)}`);
  console.log(`  Cards remaining: ${state.currentRoom.length}`);
  console.log(`  Leftover card: ${getLeftoverCard(state)?.rank || 'none'}`);
  
  const roomComplete = isRoomComplete(state) && getLeftoverCard(state)?.rank === 10;
  console.log(roomComplete ? '✓ Room completion detected\n' : '✗ Room completion failed\n');

  // Test 5: Pick enemy without weapon (take full damage)
  console.log('Test 5: Fight enemy without weapon...');
  state = createTestGameState([enemy10, enemy3, health8, weapon6]);
  const result5 = pickCard(state, 0); // Pick enemy10
  console.log(`  ${result5.message}`);
  console.log(`  HP: ${result5.newGameState.player.hp}/${result5.newGameState.player.maxHp}`);
  
  // No weapon, enemy 10 = 10 damage. 20 - 10 = 10
  const noWeaponCorrect = result5.newGameState.player.hp === 10;
  console.log(noWeaponCorrect ? '✓ Enemy combat without weapon works\n' : '✗ No weapon combat failed\n');

  // Test 6: Weapon can't defeat high enemy
  console.log('Test 6: Worn weapon cannot defeat high enemy...');
  state = createTestGameState([weapon6, enemy7, enemy10, health5]);
  state = pickCard(state, 0).newGameState; // Pick weapon
  state = pickCard(state, 0).newGameState; // Fight enemy7 (weapon now limited)
  const result6 = pickCard(state, 0); // Try to fight enemy10
  console.log(`  ${result6.message}`);
  console.log(`  HP: ${result6.newGameState.player.hp}/${result6.newGameState.player.maxHp}`);
  
  // Weapon can't be used (10 >= 7), take full 10 damage. HP should be low
  const wornWeaponCorrect = result6.newGameState.player.hp < 15;
  console.log(wornWeaponCorrect ? '✓ Worn weapon restriction works\n' : '✗ Worn weapon failed\n');

  // Test 7: Player death
  console.log('Test 7: Player death...');
  state = createTestGameState([enemy10, enemy10, enemy10, enemy10]);
  state = pickCard(state, 0).newGameState; // 20 - 10 = 10
  state = pickCard(state, 0).newGameState; // 10 - 10 = 0
  console.log(`  HP: ${state.player.hp}/${state.player.maxHp}`);
  console.log(`  Game status: ${state.gameStatus}`);
  
  const deathCorrect = state.player.hp === 0 && state.gameStatus === 'lost';
  console.log(deathCorrect ? '✓ Player death handled\n' : '✗ Death handling failed\n');

  // Test 8: Health capped at max
  console.log('Test 8: Healing cannot exceed max HP...');
  state = createTestGameState([health8, health5, weapon6, enemy3]);
  state = pickCard(state, 0).newGameState; // Already at 20 HP
  console.log(`  HP: ${state.player.hp}/${state.player.maxHp}`);
  
  const healthCapCorrect = state.player.hp === 20;
  console.log(healthCapCorrect ? '✓ Health cap works\n' : '✗ Health cap failed\n');

  // Test 9: Defeated enemies tracked
  console.log('Test 9: Defeated enemies tracking...');
  state = createTestGameState([enemy7, enemy10, enemy3, weapon6]);
  state = pickCard(state, 0).newGameState; // Fight enemy7
  state = pickCard(state, 0).newGameState; // Fight enemy10
  state = pickCard(state, 0).newGameState; // Fight enemy3
  console.log(`  Defeated enemies: [${state.defeatedEnemies.join(', ')}]`);
  console.log(`  Total defeated: ${state.defeatedEnemies.length}`);
  
  const trackingCorrect = 
    state.defeatedEnemies.length === 3 &&
    state.defeatedEnemies.includes(7) &&
    state.defeatedEnemies.includes(10) &&
    state.defeatedEnemies.includes(3);
  console.log(trackingCorrect ? '✓ Enemy tracking works\n' : '✗ Enemy tracking failed\n');

  console.log('=== All Card Action Tests Complete ===');
}
