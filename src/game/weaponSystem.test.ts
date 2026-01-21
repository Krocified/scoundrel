// Tests for weapon system

import type { Card, PlayerState } from '../types/game';
import {
  equipWeapon,
  markWeaponUsed,
  canWeaponDefeat,
  getWeaponDurabilityDescription,
} from './weaponSystem';

export function testWeaponSystem() {
  console.log('=== Weapon System Tests ===\n');

  // Create test player
  let player: PlayerState = {
    hp: 20,
    maxHp: 20,
    equippedWeapon: null,
    weaponMaxEnemy: null,
  };

  // Create test cards
  const weapon5: Card = { suit: 'diamonds', rank: 5, id: 'diamond-5' };
  const weapon7: Card = { suit: 'diamonds', rank: 7, id: 'diamond-7' };
  const enemy9: Card = { suit: 'spades', rank: 9, id: 'spade-9' };
  const enemy8: Card = { suit: 'spades', rank: 8, id: 'spade-8' };

  // Test 1: Equip weapon
  console.log('Test 1: Equip a weapon...');
  player = equipWeapon(player, weapon5);
  console.log(`  Weapon equipped: ♦${weapon5.rank}`);
  console.log(`  Weapon durability: ${getWeaponDurabilityDescription(player)}`);
  console.log(
    player.equippedWeapon?.rank === 5 && player.weaponMaxEnemy === null
      ? '✓ Weapon equipped correctly (fresh)\n'
      : '✗ Weapon equip failed\n'
  );

  // Test 2: Fresh weapon can defeat any enemy
  console.log('Test 2: Fresh weapon can defeat any enemy...');
  console.log(`  Can defeat rank 9: ${canWeaponDefeat(player.weaponMaxEnemy, 9)}`);
  console.log(`  Can defeat rank 13: ${canWeaponDefeat(player.weaponMaxEnemy, 13)}`);
  console.log(
    canWeaponDefeat(player.weaponMaxEnemy, 9) && canWeaponDefeat(player.weaponMaxEnemy, 13)
      ? '✓ Fresh weapon works on all enemies\n'
      : '✗ Fresh weapon check failed\n'
  );

  // Test 3: Use weapon (defeats rank 9 enemy)
  console.log('Test 3: Use weapon against rank 9 enemy...');
  player = markWeaponUsed(player, enemy9);
  console.log(`  Weapon used against: ♠${enemy9.rank}`);
  console.log(`  Weapon durability: ${getWeaponDurabilityDescription(player)}`);
  console.log(
    player.weaponMaxEnemy === 9
      ? '✓ Weapon durability updated\n'
      : '✗ Weapon durability failed\n'
  );

  // Test 4: Used weapon can defeat same or lower enemies
  console.log('Test 4: Weapon durability restrictions...');
  console.log(`  Can defeat rank 8: ${canWeaponDefeat(player.weaponMaxEnemy, 8)}`);
  console.log(`  Can defeat rank 9: ${canWeaponDefeat(player.weaponMaxEnemy, 9)}`);
  console.log(`  Can defeat rank 10: ${canWeaponDefeat(player.weaponMaxEnemy, 10)}`);
  
  const durabilityCorrect =
    canWeaponDefeat(player.weaponMaxEnemy, 8) === true &&
    canWeaponDefeat(player.weaponMaxEnemy, 9) === true &&
    canWeaponDefeat(player.weaponMaxEnemy, 10) === false;
  console.log(durabilityCorrect ? '✓ Durability restrictions correct\n' : '✗ Durability check failed\n');

  // Test 5: Use weapon again (defeats rank 8 enemy)
  console.log('Test 5: Use weapon again against rank 8 enemy...');
  player = markWeaponUsed(player, enemy8);
  console.log(`  Weapon used against: ♠${enemy8.rank}`);
  console.log(`  Weapon durability: ${getWeaponDurabilityDescription(player)}`);
  console.log(
    player.weaponMaxEnemy === 8
      ? '✓ Weapon durability further reduced\n'
      : '✗ Weapon durability update failed\n'
  );

  // Test 6: Now can only defeat rank <= 8
  console.log('Test 6: Further durability restrictions...');
  console.log(`  Can defeat rank 7: ${canWeaponDefeat(player.weaponMaxEnemy, 7)}`);
  console.log(`  Can defeat rank 8: ${canWeaponDefeat(player.weaponMaxEnemy, 8)}`);
  console.log(`  Can defeat rank 9: ${canWeaponDefeat(player.weaponMaxEnemy, 9)}`);
  
  const furtherDurability =
    canWeaponDefeat(player.weaponMaxEnemy, 7) === true &&
    canWeaponDefeat(player.weaponMaxEnemy, 8) === true &&
    canWeaponDefeat(player.weaponMaxEnemy, 9) === false;
  console.log(furtherDurability ? '✓ Further restrictions correct\n' : '✗ Further restrictions failed\n');

  // Test 7: Replace weapon (resets durability)
  console.log('Test 7: Replace with new weapon...');
  player = equipWeapon(player, weapon7);
  console.log(`  New weapon equipped: ♦${weapon7.rank}`);
  console.log(`  Weapon durability: ${getWeaponDurabilityDescription(player)}`);
  
  const weaponReplaced =
    player.equippedWeapon?.rank === 7 && player.weaponMaxEnemy === null;
  console.log(weaponReplaced ? '✓ Weapon replaced and durability reset\n' : '✗ Weapon replacement failed\n');

  // Test 8: New weapon can defeat any enemy again
  console.log('Test 8: New weapon has full durability...');
  console.log(`  Can defeat rank 10: ${canWeaponDefeat(player.weaponMaxEnemy, 10)}`);
  console.log(`  Can defeat rank 13: ${canWeaponDefeat(player.weaponMaxEnemy, 13)}`);
  console.log(
    canWeaponDefeat(player.weaponMaxEnemy, 10) && canWeaponDefeat(player.weaponMaxEnemy, 13)
      ? '✓ New weapon works on all enemies\n'
      : '✗ New weapon check failed\n'
  );

  console.log('=== All Weapon System Tests Complete ===');
}
