// Combat system including damage calculation and resolution

import type { Card, PlayerState } from '../types/game';
import { canWeaponDefeat } from './weaponSystem';

export interface DamageResult {
  damage: number;
  weaponUsed: boolean;
  message: string;
}

/**
 * Calculate damage from an enemy encounter
 * Takes weapon and durability into account
 */
export function calculateDamage(
  enemy: Card,
  player: PlayerState
): DamageResult {
  const enemyValue = enemy.rank;

  // No weapon equipped
  if (!player.equippedWeapon) {
    return {
      damage: enemyValue,
      weaponUsed: false,
      message: `No weapon! Took ${enemyValue} damage from enemy.`,
    };
  }

  const weaponValue = player.equippedWeapon.rank;

  // Check if weapon can be used (durability check)
  const canUse = canWeaponDefeat(player.weaponMaxEnemy, enemyValue);

  if (!canUse) {
    return {
      damage: enemyValue,
      weaponUsed: false,
      message: `Weapon too worn! Can't defeat rank ${enemyValue} enemy. Took ${enemyValue} damage.`,
    };
  }

  // Weapon can be used: damage = max(0, enemy - weapon)
  const damage = Math.max(0, enemyValue - weaponValue);

  return {
    damage,
    weaponUsed: true,
    message: `Used weapon (${weaponValue}) vs enemy (${enemyValue}). Took ${damage} damage.`,
  };
}

/**
 * Apply damage to the player
 * Returns updated player state
 */
export function applyDamage(player: PlayerState, damage: number): PlayerState {
  const newHp = Math.max(0, player.hp - damage);

  return {
    ...player,
    hp: newHp,
  };
}

/**
 * Heal the player (health potion)
 * Cannot exceed maxHp
 */
export function healPlayer(player: PlayerState, healAmount: number): PlayerState {
  const newHp = Math.min(player.maxHp, player.hp + healAmount);

  return {
    ...player,
    hp: newHp,
  };
}

/**
 * Check if player is alive
 */
export function isPlayerAlive(player: PlayerState): boolean {
  return player.hp > 0;
}

/**
 * Get HP percentage (for UI)
 */
export function getHpPercentage(player: PlayerState): number {
  return (player.hp / player.maxHp) * 100;
}
