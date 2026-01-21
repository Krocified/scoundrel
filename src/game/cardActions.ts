// Card action handler - resolves effects when cards are picked

import { Card, GameState } from '../types/game';
import { getCardType } from './cardUtils';
import { healPlayer, calculateDamage, applyDamage } from './combat';
import { equipWeapon, markWeaponUsed } from './weaponSystem';

export interface CardActionResult {
  newGameState: GameState;
  message: string;
  cardType: 'health' | 'weapon' | 'enemy';
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
  const cardType = getCardType(card);

  let newPlayer = gameState.player;
  let message = '';
  const defeatedEnemies = [...gameState.defeatedEnemies];

  // Resolve card effect based on type
  switch (cardType) {
    case 'health': {
      const oldHp = newPlayer.hp;
      newPlayer = healPlayer(newPlayer, card.rank);
      const healed = newPlayer.hp - oldHp;
      message = `Picked health potion (${card.rank}). Healed ${healed} HP. HP: ${newPlayer.hp}/${newPlayer.maxHp}`;
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
      const damageResult = calculateDamage(card, newPlayer);
      newPlayer = applyDamage(newPlayer, damageResult.damage);
      
      // Update weapon durability if weapon was used
      if (damageResult.weaponUsed && newPlayer.equippedWeapon) {
        newPlayer = markWeaponUsed(newPlayer, card);
      }

      // Track defeated enemy for scoring
      defeatedEnemies.push(card.rank);

      message = `Fought enemy (${card.rank}). ${damageResult.message} HP: ${newPlayer.hp}/${newPlayer.maxHp}`;
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
