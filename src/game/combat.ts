// Combat system including damage calculation and resolution

import type { Card, PlayerState } from '../types/game';
import { canWeaponDefeat } from './weaponSystem';

export interface DamageResult {
  damage: number;
  weaponUsed: boolean;
  message: string;
}

function applyDamageReductions(damage: number, activePowerUps: string[]): { damage: number; notes: string[] } {
  const notes: string[] = [];

  // Armor: -1, min 1
  if (activePowerUps.includes('armor') && damage > 0) {
    const reduced = Math.max(1, damage - 1);
    if (reduced < damage) {
      notes.push('Armor reduced damage by 1');
      damage = reduced;
    }
  }

  // Juggernaut: -2, min 1
  if (activePowerUps.includes('juggernaut') && damage > 0) {
    const reduced = Math.max(1, damage - 2);
    if (reduced < damage) {
      notes.push('Juggernaut reduced damage by 2');
      damage = reduced;
    }
  }

  return { damage, notes };
}

/**
 * Calculate damage from an enemy encounter
 * Takes weapon and durability into account
 */
export function calculateDamage(
  enemy: Card,
  player: PlayerState,
  activePowerUps: string[] = [],
  barehandHalfDamage: boolean = false
): DamageResult {
  const enemyValue = enemy.rank;

  // No weapon equipped
  if (!player.equippedWeapon) {
    let damage: number = enemyValue;

    // Forge World: barehand attacks deal half damage (rounded up)
    let barehandNote = '';
    if (barehandHalfDamage) {
      const half = Math.ceil(damage / 2);
      if (half < damage) {
        barehandNote = ' (Forge World: barehand damage halved)';
        damage = half;
      }
    }

    const { damage: reducedDamage, notes } = applyDamageReductions(damage, activePowerUps);
    damage = reducedDamage;
    const allNotes = [barehandNote, ...notes.map(n => `(${n})`)].filter(Boolean).join(' ');

    return {
      damage,
      weaponUsed: false,
      message: `No weapon! Took ${damage} damage from enemy.${allNotes}`,
    };
  }

  const weaponValue = player.equippedWeapon.rank;

  // Check if weapon can be used (durability check)
  const canUse = canWeaponDefeat(player.weaponMaxEnemy, enemyValue);

  if (!canUse) {
    let damage: number = enemyValue;

    const { damage: reducedDamage, notes } = applyDamageReductions(damage, activePowerUps);
    damage = reducedDamage;
    const allNotes = notes.map(n => `(${n})`).join(' ');

    return {
      damage,
      weaponUsed: false,
      message: `Weapon too worn! Can't defeat rank ${enemyValue} enemy. Took ${damage} damage.${allNotes ? ' ' + allNotes : ''}`,
    };
  }

  // Weapon can be used: damage = max(0, enemy - weapon)
  let damage = Math.max(0, enemyValue - weaponValue);

  const { damage: reducedDamage, notes } = applyDamageReductions(damage, activePowerUps);
  damage = reducedDamage;
  const allNotes = notes.map(n => `(${n})`).join(' ');

  return {
    damage,
    weaponUsed: true,
    message: `Used weapon (${weaponValue}) vs enemy (${enemyValue}). Took ${damage} damage.${allNotes ? ' ' + allNotes : ''}`,
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
