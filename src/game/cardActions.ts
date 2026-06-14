// Card action handler - resolves effects when cards are picked

import type { Card, GameState } from '../types/game';
import { getCardType } from './cardUtils';
import { healPlayer, calculateDamage, applyDamage } from './combat';
import { equipWeapon, markWeaponUsed } from './weaponSystem';

export interface CardActionResult {
  newGameState: GameState;
  message: string;
  cardType: 'health' | 'weapon' | 'enemy' | 'joker';
}

/**
 * Pick a card from the current room and resolve its effect
 * @param gameState - Current game state
 * @param cardIndex - Index of card in currentRoom (0-3)
 * @returns Updated game state and action message
 */
export function pickCard(
  gameState: GameState,
  cardIndex: number
): CardActionResult {
  if (cardIndex < 0 || cardIndex >= gameState.currentRoom.length) {
    throw new Error(`Invalid card index: ${cardIndex}`);
  }

  if (gameState.cardsPickedThisRoom >= 3) {
    throw new Error('Cannot pick more than 3 cards per room');
  }

  const card = gameState.currentRoom[cardIndex];
  let cardType = getCardType(card);

  // Vampiric modifier: hearts become monsters
  const isVampiric = gameState.runModifiers.includes('vampiric');
  if (isVampiric && card.suit === 'hearts') {
    cardType = 'enemy';
  }

  // Joker card becomes an enemy encounter
  if (cardType === 'joker') {
    cardType = 'enemy';
  }

  let newPlayer = gameState.player;
  let message = '';
  const defeatedEnemies = [...gameState.defeatedEnemies];

  // Resolve card effect based on type
  switch (cardType) {
    case 'health': {
      const oldHp = newPlayer.hp;
      const isJuggernaut = gameState.runModifiers.includes('juggernaut');
      let healAmount: number = card.rank;
      let healNote = '';
      // Juggernaut: potions heal 50%
      if (isJuggernaut) {
        healAmount = Math.max(1, Math.floor(healAmount / 2));
        healNote = ' (Juggernaut: halved)';
      }
      newPlayer = healPlayer(newPlayer, healAmount);
      const healed = newPlayer.hp - oldHp;
      message = `Picked health potion (${card.rank}). Healed ${healed} HP.${healNote} HP: ${newPlayer.hp}/${newPlayer.maxHp}`;
      break;
    }

    case 'weapon': {
      const oldWeapon = newPlayer.equippedWeapon;
      newPlayer = equipWeapon(newPlayer, card);
      message = oldWeapon
        ? `Replaced weapon (${oldWeapon.rank}) with new weapon (${card.rank}).`
        : `Equipped weapon (${card.rank}).`;
      break;
    }

    case 'enemy': {
      const damageResult = calculateDamage(card, newPlayer, gameState.activePowerUps, gameState.barehandHalfDamage);
      newPlayer = applyDamage(newPlayer, damageResult.damage);

      // Update weapon durability if weapon was used
      if (damageResult.weaponUsed && newPlayer.equippedWeapon) {
        newPlayer = markWeaponUsed(newPlayer, card);
      }

      // Track defeated enemy for scoring
      defeatedEnemies.push(card.rank);

      // Vampiric: heal 1 HP when defeating a monster
      if (isVampiric && newPlayer.hp > 0) {
        const oldHp = newPlayer.hp;
        newPlayer = healPlayer(newPlayer, 1);
        const healed = newPlayer.hp - oldHp;
        if (healed > 0) {
          message = `Fought enemy (${card.rank}). ${damageResult.message} Vampiric healed ${healed} HP. HP: ${newPlayer.hp}/${newPlayer.maxHp}`;
        } else {
          message = `Fought enemy (${card.rank}). ${damageResult.message} HP: ${newPlayer.hp}/${newPlayer.maxHp}`;
        }
      } else {
        message = `Fought enemy (${card.rank}). ${damageResult.message} HP: ${newPlayer.hp}/${newPlayer.maxHp}`;
      }
      break;
    }
  }

  // Remove picked card from room
  const newRoom = gameState.currentRoom.filter((_, i) => i !== cardIndex);

  // Check if player died
  const newGameStatus = newPlayer.hp <= 0 ? 'lost' : gameState.gameStatus;

  const newGameState: GameState = {
    ...gameState,
    currentRoom: newRoom,
    player: newPlayer,
    cardsPickedThisRoom: gameState.cardsPickedThisRoom + 1,
    defeatedEnemies,
    gameStatus: newGameStatus,
  };

  return {
    newGameState,
    message,
    cardType,
  };
}

/**
 * Check if the current room is completed (3 cards picked)
 */
export function isRoomComplete(gameState: GameState): boolean {
  return gameState.cardsPickedThisRoom >= 3;
}

/**
 * Get the leftover card from the current room (if room is complete)
 */
export function getLeftoverCard(gameState: GameState): Card | null {
  if (!isRoomComplete(gameState)) {
    return null;
  }

  // After picking 3 cards, there should be 1 card left
  if (gameState.currentRoom.length === 1) {
    return gameState.currentRoom[0];
  }

  return null;
}
