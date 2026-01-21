// Run all game logic tests

import { testDeck } from './deck.test';
import { testCardUtils } from './cardUtils.test';
import { testRoomManager } from './roomManager.test';
import { testWeaponSystem } from './weaponSystem.test';
import { testCombat } from './combat.test';

export function runAllTests() {
  console.log('\n');
  console.log('═'.repeat(60));
  console.log('  SCOUNDREL GAME LOGIC TESTS');
  console.log('═'.repeat(60));
  console.log('\n');

  try {
    testDeck();
    console.log('\n');
    
    testCardUtils();
    console.log('\n');
    
    testRoomManager();
    console.log('\n');
    
    testWeaponSystem();
    console.log('\n');
    
    testCombat();
    console.log('\n');

    console.log('═'.repeat(60));
    console.log('  ✓ ALL TESTS PASSED');
    console.log('═'.repeat(60));
    console.log('\n');
  } catch (error) {
    console.error('\n');
    console.error('═'.repeat(60));
    console.error('  ✗ TESTS FAILED');
    console.error('═'.repeat(60));
    console.error('\n');
    console.error(error);
  }
}
