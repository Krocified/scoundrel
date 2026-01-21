// Game controller - orchestrates the complete game flow

import { GameState } from '../types/game';
import { createDeck, shuffleDeck } from './deck';
import { initializeFirstRoom, prepareNextRoom, skipRoom } from './roomManager';
import { pickCard, isRoomComplete, getLeftoverCard } from './cardActions';

/**
 * Initialize a new game
 */
export function initializeGame(): GameState {
  // Create and shuffle deck
  const deck = shuffleDeck(createDeck());
  
  // Initialize first room
  const { room, remainingDeck } = initializeFirstRoom(deck);
  
  // Create initial game state
  const gameState: GameState = {
    deck: remainingDeck,
    currentRoom: room,
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
  
  return gameState;
}

/**
 * Process a card pick action
 * @param gameState - Current game state
 * @param cardIndex - Index of card to pick (0-3)
 * @returns Updated game state with action log
 */
export function processCardPick(
  gameState: GameState,
  cardIndex: number
): { gameState: GameState; log: string[] } {
  const log: string[] = [];
  
  // Pick the card
  const { newGameState, message } = pickCard(gameState, cardIndex);
  log.push(message);
  
  let updatedState = newGameState;
  
  // Check if player died
  if (updatedState.gameStatus === 'lost') {
    log.push('💀 You died! Game Over.');
    return { gameState: updatedState, log };
  }
  
  // Check if room is complete
  if (isRoomComplete(updatedState)) {
    const leftover = getLeftoverCard(updatedState);
    log.push(`Room cleared! Leftover card: ${leftover?.suit} ${leftover?.rank}`);
    
    // Advance to next room
    updatedState = advanceToNextRoom(updatedState);
    
    if (updatedState.gameStatus === 'won') {
      log.push('🎉 Victory! You cleared all rooms!');
    } else if (updatedState.currentRoom.length > 0) {
      log.push(`Next room: ${updatedState.currentRoom.length} cards revealed.`);
    }
  }
  
  return { gameState: updatedState, log };
}

/**
 * Process a room skip action
 * @param gameState - Current game state
 * @param direction - Order to return cards to deck
 * @returns Updated game state with action log
 */
export function processRoomSkip(
  gameState: GameState,
  direction: 'left-to-right' | 'right-to-left'
): { gameState: GameState; log: string[] } {
  const log: string[] = [];
  
  // Validate: can't skip if already picked cards
  if (gameState.cardsPickedThisRoom > 0) {
    throw new Error('Cannot skip room after picking cards');
  }
  
  // Validate: need exactly 4 cards in room
  if (gameState.currentRoom.length !== 4) {
    throw new Error('Can only skip rooms with 4 cards');
  }
  
  log.push(`Skipped room (${direction}). Cards returned to bottom of deck.`);
  
  // Return cards to bottom of deck
  const updatedDeck = skipRoom(gameState.currentRoom, gameState.deck, direction);
  
  // Check if we can form another room
  if (updatedDeck.length < 4) {
    // Not enough cards - game over (win!)
    const finalState: GameState = {
      ...gameState,
      deck: updatedDeck,
      currentRoom: [],
      gameStatus: 'won',
      roomsSkipped: gameState.roomsSkipped + 1,
    };
    log.push('🎉 Victory! Not enough cards to form another room.');
    return { gameState: finalState, log };
  }
  
  // Prepare next room (4 new cards, no leftover after skip)
  const { room, remainingDeck } = prepareNextRoom(updatedDeck, null);
  
  const updatedState: GameState = {
    ...gameState,
    deck: remainingDeck,
    currentRoom: room,
    leftoverCard: null,
    cardsPickedThisRoom: 0,
    roomsSkipped: gameState.roomsSkipped + 1,
  };
  
  log.push(`Next room: ${room.length} cards revealed.`);
  
  return { gameState: updatedState, log };
}

/**
 * Advance to the next room after clearing the current one
 * @param gameState - Current game state (room should be complete)
 * @returns Updated game state
 */
export function advanceToNextRoom(gameState: GameState): GameState {
  if (!isRoomComplete(gameState)) {
    throw new Error('Cannot advance: room not complete');
  }
  
  const leftover = getLeftoverCard(gameState);
  
  // Check if we can form another room
  const needCards = leftover ? 3 : 4;
  if (gameState.deck.length < needCards) {
    // Not enough cards - game over (win!)
    return {
      ...gameState,
      gameStatus: 'won',
      roomsCleared: gameState.roomsCleared + 1,
    };
  }
  
  // Prepare next room
  const { room, remainingDeck } = prepareNextRoom(gameState.deck, leftover);
  
  return {
    ...gameState,
    deck: remainingDeck,
    currentRoom: room,
    leftoverCard: leftover,
    cardsPickedThisRoom: 0,
    roomsCleared: gameState.roomsCleared + 1,
  };
}

/**
 * Calculate the final score
 * Score = Remaining HP + Sum of defeated enemy ranks
 */
export function calculateFinalScore(gameState: GameState): number {
  const hpScore = gameState.player.hp;
  const enemyScore = gameState.defeatedEnemies.reduce((sum, rank) => sum + rank, 0);
  return hpScore + enemyScore;
}

/**
 * Get current game statistics
 */
export function getGameStats(gameState: GameState) {
  return {
    hp: gameState.player.hp,
    maxHp: gameState.player.maxHp,
    weapon: gameState.player.equippedWeapon,
    weaponDurability: gameState.player.weaponMaxEnemy,
    roomsCleared: gameState.roomsCleared,
    roomsSkipped: gameState.roomsSkipped,
    cardsInDeck: gameState.deck.length,
    cardsInRoom: gameState.currentRoom.length,
    cardsPickedThisRoom: gameState.cardsPickedThisRoom,
    defeatedEnemies: gameState.defeatedEnemies.length,
    currentScore: calculateFinalScore(gameState),
    gameStatus: gameState.gameStatus,
  };
}
