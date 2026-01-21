// Tests for combat system

import type { Card, PlayerState } from '../types/game';
import {
  calculateDamage,
  applyDamage,
  healPlayer,
  isPlayerAlive,
  getHpPercentage,
} from './combat';
import { equipWeapon, markWeaponUsed } from './weaponSystem';

export function testCombat() {
  console.log('=== Combat System Tests ===\n');

  // Create test player
  let player: PlayerState = {
    hp: 20,
    maxHp: 20,
    equippedWeapon: null,
    weaponMaxEnemy: null,
  };

  // Create test cards
  const weapon5: Card = { suit: 'diamonds', rank: 5, id: 'diamond-5' };
  const enemy7: Card = { suit: 'spades', rank: 7, id: 'spade-7' };
  const enemy10: Card = { suit: 'clubs', rank: 10, id: 'club-10' };
  const enemy3: Card = { suit: 'spades', rank: 3, id: 'spade-3' };
  const health8: Card = { suit: 'hearts', rank: 8, id: 'heart-8' };

  // Test 1: Combat without weapon
  console.log('Test 1: Combat without weapon...');
  const dmg1 = calculateDamage(enemy7, player);
  console.log(`  Enemy: ♠${enemy7.rank}`);
  console.log(`  Damage: ${dmg1.damage}`);
  console.log(`  Weapon used: ${dmg1.weaponUsed}`);
  console.log(`  ${dmg1.message}`);
  console.log(
    dmg1.damage === 7 && dmg1.weaponUsed === false
      ? '✓ No weapon damage correct\n'
      : '✗ No weapon damage failed\n'
  );

  // Test 2: Apply damage
  console.log('Test 2: Apply damage to player...');
  player = applyDamage(player, dmg1.damage);
  console.log(`  HP: ${player.hp}/${player.maxHp}`);
  console.log(`  HP %: ${getHpPercentage(player).toFixed(1)}%`);
  console.log(`  Alive: ${isPlayerAlive(player)}`);
  console.log(player.hp === 13 ? '✓ Damage applied correctly\n' : '✗ Damage application failed\n');

  // Test 3: Equip weapon and fight
  console.log('Test 3: Combat with weapon...');
  player = equipWeapon(player, weapon5);
  const dmg2 = calculateDamage(enemy7, player);
  console.log(`  Weapon: ♦${weapon5.rank} vs Enemy: ♠${enemy7.rank}`);
  console.log(`  Damage: ${dmg2.damage}`);
  console.log(`  Weapon used: ${dmg2.weaponUsed}`);
  console.log(`  ${dmg2.message}`);
  
  const weaponDamageCorrect = dmg2.damage === 2 && dmg2.weaponUsed === true;
  console.log(weaponDamageCorrect ? '✓ Weapon damage reduction correct\n' : '✗ Weapon damage failed\n');

  // Test 4: Update weapon durability
  console.log('Test 4: Use weapon and update durability...');
  player = markWeaponUsed(player, enemy7);
  player = applyDamage(player, dmg2.damage);
  console.log(`  HP after combat: ${player.hp}/${player.maxHp}`);
  console.log(`  Weapon max enemy: ${player.weaponMaxEnemy}`);
  console.log(player.hp === 11 && player.weaponMaxEnemy === 7 ? '✓ Durability updated\n' : '✗ Durability failed\n');

  // Test 5: Weapon too worn to use
  console.log('Test 5: Weapon too worn against high enemy...');
  const dmg3 = calculateDamage(enemy10, player);
  console.log(`  Weapon (max < 7) vs Enemy: ♣${enemy10.rank}`);
  console.log(`  Damage: ${dmg3.damage}`);
  console.log(`  Weapon used: ${dmg3.weaponUsed}`);
  console.log(`  ${dmg3.message}`);
  
  const wornWeaponCorrect = dmg3.damage === 10 && dmg3.weaponUsed === false;
  console.log(wornWeaponCorrect ? '✓ Worn weapon cannot be used\n' : '✗ Worn weapon check failed\n');

  // Test 6: Weapon still works on lower enemies
  console.log('Test 6: Weapon works on lower enemies...');
  const dmg4 = calculateDamage(enemy3, player);
  console.log(`  Weapon (max < 7) vs Enemy: ♠${enemy3.rank}`);
  console.log(`  Damage: ${dmg4.damage}`);
  console.log(`  Weapon used: ${dmg4.weaponUsed}`);
  console.log(`  ${dmg4.message}`);
  
  const lowerEnemyCorrect = dmg4.damage === 0 && dmg4.weaponUsed === true;
  console.log(lowerEnemyCorrect ? '✓ Weapon works on lower enemies\n' : '✗ Lower enemy check failed\n');

  // Test 7: Healing
  console.log('Test 7: Heal player...');
  player = applyDamage(player, dmg3.damage); // Take more damage first
  console.log(`  HP before heal: ${player.hp}/${player.maxHp}`);
  player = healPlayer(player, health8.rank);
  console.log(`  Healed: ${health8.rank}`);
  console.log(`  HP after heal: ${player.hp}/${player.maxHp}`);
  console.log(player.hp === 9 ? '✓ Healing works\n' : '✗ Healing failed\n');

  // Test 8: Healing cap at maxHp
  console.log('Test 8: Healing cannot exceed max HP...');
  player = healPlayer(player, 20);
  console.log(`  Healed: 20`);
  console.log(`  HP: ${player.hp}/${player.maxHp}`);
  console.log(player.hp === 20 ? '✓ Healing capped correctly\n' : '✗ Healing cap failed\n');

  // Test 9: Player death
  console.log('Test 9: Player death...');
  player = applyDamage(player, 25); // Overkill
  console.log(`  Damage taken: 25`);
  console.log(`  HP: ${player.hp}/${player.maxHp}`);
  console.log(`  Alive: ${isPlayerAlive(player)}`);
  console.log(player.hp === 0 && !isPlayerAlive(player) ? '✓ Death handled correctly\n' : '✗ Death check failed\n');

  console.log('=== All Combat System Tests Complete ===');
}
