// Weapon system including equip, durability, and usage tracking

import { Card, PlayerState } from '../types/game';

/**
 * Equip a weapon to the player
 * Replaces current weapon and resets durability (fresh weapon)
 */
export function equipWeapon(player: PlayerState, weapon: Card): PlayerState {
  return {
    ...player,
    equippedWeapon: weapon,
    weaponMaxEnemy: null, // Fresh weapon, no durability limit yet
  };
}

/**
 * Update weapon durability after defeating an enemy
 * Weapon can now only defeat enemies with rank < enemyDefeated.rank
 */
export function markWeaponUsed(player: PlayerState, enemyDefeated: Card): PlayerState {
  if (!player.equippedWeapon) {
    throw new Error('Cannot mark weapon used: no weapon equipped');
  }

  return {
    ...player,
    weaponMaxEnemy: enemyDefeated.rank, // Weapon can now only defeat enemies < this rank
  };
}

/**
 * Check if the equipped weapon can be used against an enemy
 * @returns true if weapon can be used, false otherwise
 */
export function canWeaponDefeat(
  weaponMaxEnemy: number | null,
  enemyRank: number
): boolean {
  if (weaponMaxEnemy === null) {
    // Weapon is fresh (unused), can defeat any enemy
    return true;
  }

  // Weapon can only defeat enemies with rank < weaponMaxEnemy
  return enemyRank < weaponMaxEnemy;
}

/**
 * Get a human-readable description of weapon durability status
 */
export function getWeaponDurabilityDescription(player: PlayerState): string {
  if (!player.equippedWeapon) {
    return 'No weapon equipped';
  }

  if (player.weaponMaxEnemy === null) {
    return `Fresh weapon (can defeat any enemy)`;
  }

  return `Can only defeat enemies < ${player.weaponMaxEnemy}`;
}
