// Game controller - orchestrates the complete game flow

import type { GameState, RunModifierId } from '../types/game';
import { createDeck, shuffleDeck, createJokerCard } from './deck';
import { initializeFirstRoom, prepareNextRoom, skipRoom } from './roomManager';
import { pickCard, isRoomComplete, getLeftoverCard } from './cardActions';
import { processJokerRoom, roomHasJoker, isChampionRoom } from './jokerProcessor';

export interface GameInitResult {
  gameState: GameState;
  jokerLogs: string[];
}

/**
 * Initialize a new game with optional power-ups and run modifiers
 */
export function initializeGame(
  powerUps: string[] = [],
  runModifiers: RunModifierId[] = []
): GameInitResult {
  let deck = shuffleDeck(createDeck());

  // Build initial player state, applying power-ups
  let maxHp = 20;
  let hp = 20;
  let equippedWeapon = null;
  let weaponMaxEnemy = null;

  if (powerUps.includes('vitality')) {
    maxHp = 25;
    hp = 25;
  }

  // Mutation: -8 Maximum HP
  if (runModifiers.includes('mutation')) {
    maxHp = Math.max(1, maxHp - 8);
    hp = Math.min(hp, maxHp);
  }

  if (powerUps.includes('weapon-cache')) {
    const weaponIdx = deck.findIndex(c => c.suit === 'diamonds');
    if (weaponIdx !== -1) {
      equippedWeapon = deck[weaponIdx];
      weaponMaxEnemy = null;
      deck = [...deck.slice(0, weaponIdx), ...deck.slice(weaponIdx + 1)];
    }
  }

  // Shuffle 1 joker into deck per selected run modifier
  const jokerIds: Array<import('../types/game').JokerId> = ['champion', 'predator', 'forge-world'];
  for (const _modId of runModifiers) {
    const randomJoker = jokerIds[Math.floor(Math.random() * jokerIds.length)];
    deck = shuffleDeck([...deck, createJokerCard(randomJoker)]);
  }

  // Initialize first room
  const { room, remainingDeck } = initializeFirstRoom(deck);

  let gameState: GameState = {
    deck: remainingDeck,
    currentRoom: room,
    leftoverCard: null,
    player: {
      hp,
      maxHp,
      equippedWeapon,
      weaponMaxEnemy,
    },
    cardsPickedThisRoom: 0,
    gameStatus: 'playing',
    roomsCleared: 0,
    roomsSkipped: 0,
    defeatedEnemies: [],
    activePowerUps: powerUps,
    runModifiers,
    barehandHalfDamage: false,
  };

  // Process any jokers that appeared in the first room
  const jokerResult = processJokerRoom(gameState);
  const jokerLogs: string[] = [];
  if (jokerResult) {
    gameState = jokerResult.gameState;
    jokerLogs.push(...jokerResult.logs);
  }

  return { gameState, jokerLogs };
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
  
  const isChampion = isChampionRoom(gameState.currentRoom) && cardIndex === 0;
  
  // Pick the card
  const { newGameState, message } = pickCard(gameState, cardIndex);
  log.push(message);
  
  let updatedState = newGameState;
  
  // Check if player died
  if (updatedState.gameStatus === 'lost') {
    log.push('💀 You died! Game Over.');
    return { gameState: updatedState, log };
  }
  
  const logRoomHeals = (state: GameState, hpBefore: number) => {
    const hpDiff = state.player.hp - hpBefore;
    if (state.runModifiers.includes('mutation') && hpDiff >= 2) {
      log.push('Mutation restored 2 HP.');
    }
    if (state.activePowerUps.includes('regeneration') && hpDiff >= 1) {
      if (hpDiff > 2 || (hpDiff === 1 && !state.runModifiers.includes('mutation'))) {
        log.push('Regeneration restored 1 HP.');
      }
    }
  };

  // Champion room: defeating the champion auto-clears the room
  if (isChampion) {
    log.push('⚔️ Champion defeated! Room auto-cleared.');
    if (updatedState.cardsPickedThisRoom >= 1) {
      const hpBefore = updatedState.player.hp;
      updatedState = advanceToNextRoom(updatedState);
      logRoomHeals(updatedState, hpBefore);

      if (updatedState.gameStatus === 'won') {
        log.push('🎉 Victory! You cleared all rooms!');
      } else if (updatedState.currentRoom.length > 0) {
        log.push(`Next room: ${updatedState.currentRoom.length} cards revealed.`);
      }

      return { gameState: updatedState, log };
    }
  }

  // Normal room completion check
  if (isRoomComplete(updatedState)) {
    const leftover = getLeftoverCard(updatedState);
    log.push(`Room cleared! Leftover card: ${leftover?.suit} ${leftover?.rank}`);

    const hpBefore = updatedState.player.hp;
    updatedState = advanceToNextRoom(updatedState);
    logRoomHeals(updatedState, hpBefore);

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
  
  // Joker rooms cannot be skipped
  if (roomHasJoker(gameState.currentRoom)) {
    throw new Error('Cannot skip a room containing a Joker!');
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
  
  let updatedState: GameState = {
    ...gameState,
    deck: remainingDeck,
    currentRoom: room,
    leftoverCard: null,
    cardsPickedThisRoom: 0,
    roomsSkipped: gameState.roomsSkipped + 1,
  };
  
  // Process any jokers in the new room
  const jokerResult = processJokerRoom(updatedState);
  if (jokerResult) {
    updatedState = jokerResult.gameState;
    log.push(...jokerResult.logs);
  }
  
  log.push(`Next room: ${updatedState.currentRoom.length} cards revealed.`);
  
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

  // Apply heals after room clear
  let player = gameState.player;
  
  // Regeneration power-up: heal 1 HP
  if (gameState.activePowerUps.includes('regeneration')) {
    player = {
      ...player,
      hp: Math.min(player.maxHp, player.hp + 1),
    };
  }

  // Mutation: heal 2 HP after clearing each room
  if (gameState.runModifiers.includes('mutation')) {
    player = {
      ...player,
      hp: Math.min(player.maxHp, player.hp + 2),
    };
  }

  let newState: GameState = {
    ...gameState,
    deck: remainingDeck,
    currentRoom: room,
    leftoverCard: leftover,
    player,
    cardsPickedThisRoom: 0,
    roomsCleared: gameState.roomsCleared + 1,
  };

  // Process any jokers in the new room
  const jokerResult = processJokerRoom(newState);
  if (jokerResult) {
    newState = jokerResult.gameState;
  }

  return newState;
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
    defeatedEnemiesValue: gameState.defeatedEnemies.reduce((sum, rank) => sum + rank, 0),
    currentScore: calculateFinalScore(gameState),
    gameStatus: gameState.gameStatus,
  };
}
