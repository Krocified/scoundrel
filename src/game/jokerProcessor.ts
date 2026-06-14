// Joker room activation processor

import type { Card, GameState, JokerId } from '../types/game';
import { shuffleDeck } from './deck';

function getStrongestMonsterRank(deck: Card[]): number {
  let maxRank = 0;
  for (const card of deck) {
    if ((card.suit === 'spades' || card.suit === 'clubs') && card.rank > maxRank) {
      maxRank = card.rank;
    }
  }
  return maxRank;
}

/**
 * Process the Champion joker effect.
 * Replaces the room with a single card: the champion (strongest monster).
 * Defeating it clears the room.
 */
function processChampion(gameState: GameState, jokerIndex: number): { room: Card[]; log: string[]; deck: Card[] } {
  const strongestRank = getStrongestMonsterRank(gameState.deck);
  const rank = strongestRank > 0 ? strongestRank : 13;

  // Replace room with just the champion joker (acts as an enemy with that rank)
  const championCard: Card = {
    ...gameState.currentRoom[jokerIndex],
    rank: rank as Card['rank'],
  };
  const room = [championCard];

  return {
    room,
    log: [`⚔️ Champion Joker: becomes a rank ${rank} monster! All other cards sealed.`],
    deck: gameState.deck,
  };
}

/**
 * Process the Predator joker effect.
 * Duplicates the strongest monster 4 times.
 * Shuffles 2 max-power weapons (rank 10 diamonds) into the deck.
 */
function processPredator(gameState: GameState, _jokerIndex: number): { room: Card[]; log: string[]; deck: Card[] } {
  const strongestRank = getStrongestMonsterRank(gameState.deck);
  const rank = strongestRank > 0 ? strongestRank : 13;

  // Create 4 predator clone cards (use joker suit but with enemy rank and jokerId)
  const predatorCards: Card[] = Array.from({ length: 4 }, (_, i) => ({
    suit: 'joker' as const,
    rank: rank as Card['rank'],
    id: `predator-clone-${Date.now()}-${i}`,
    jokerId: 'predator' as JokerId,
  }));

  // Create 2 max-power weapons (diamond 10)
  const maxWeapons: Card[] = Array.from({ length: 2 }, (_, i) => ({
    suit: 'diamonds' as const,
    rank: 10 as Card['rank'],
    id: `predator-weapon-${Date.now()}-${i}`,
  }));

  // Shuffle weapons into deck
  const deck = shuffleDeck([...gameState.deck, ...maxWeapons]);

  return {
    room: predatorCards,
    log: [`🦎 Predator Joker: room flooded with ${rank} monsters! 2 max weapons added to deck.`],
    deck,
  };
}

/**
 * Process the Forge World joker effect.
 * Removes all weapons from the deck and player.
 * Sets barehandHalfDamage = true.
 * Joker card is consumed (removed from room).
 */
function processForgeWorld(gameState: GameState, jokerIndex: number): { room: Card[]; log: string[]; deck: Card[] } {
  // Remove all diamond cards from deck
  const deck = gameState.deck.filter(c => c.suit !== 'diamonds');

  // Remove the joker card from the room (it's consumed)
  const room = gameState.currentRoom.filter((_, i) => i !== jokerIndex);

  return {
    room,
    log: ['🔥 Forge World Joker: all weapons destroyed! Barehand attacks deal half damage.'],
    deck,
  };
}

const jokerProcessors: Record<JokerId, (state: GameState, index: number) => { room: Card[]; log: string[]; deck: Card[] }> = {
  champion: processChampion,
  predator: processPredator,
  'forge-world': processForgeWorld,
};

export interface JokerProcessResult {
  gameState: GameState;
  logs: string[];
}

/**
 * Check if the current room contains any joker cards.
 * If so, process all joker effects.
 * Returns the modified game state with logs.
 */
export function processJokerRoom(gameState: GameState): JokerProcessResult | null {
  const jokerIndices: number[] = [];
  for (let i = 0; i < gameState.currentRoom.length; i++) {
    const card = gameState.currentRoom[i];
    if (card.jokerId) {
      jokerIndices.push(i);
    }
  }

  if (jokerIndices.length === 0) return null;

  let currentState = gameState;
  const allLogs: string[] = [];

  // Process each joker (process in reverse index order to avoid shifting issues)
  for (const jokerIndex of jokerIndices) {
    const card = currentState.currentRoom[jokerIndex];
    if (!card.jokerId) continue;

    const processor = jokerProcessors[card.jokerId];
    if (!processor) {
      allLogs.push(`Unknown joker type: ${card.jokerId}`);
      continue;
    }

    const result = processor(currentState, jokerIndex);
    allLogs.push(...result.log);

    currentState = {
      ...currentState,
      deck: result.deck,
      currentRoom: result.room,
    };

    // Forge World: also set barehandHalfDamage and remove player weapon
    if (card.jokerId === 'forge-world') {
      currentState = {
        ...currentState,
        barehandHalfDamage: true,
        player: {
          ...currentState.player,
          equippedWeapon: null,
          weaponMaxEnemy: null,
        },
      };
    }

    // Champion: after defeating the champion, room is cleared
    // (Handled at the pickCard level - when the champion is picked, auto-clear)
  }

  return {
    gameState: currentState,
    logs: allLogs,
  };
}

/**
 * Check if the current room has any joker cards (cannot skip joker rooms).
 */
export function roomHasJoker(room: Card[]): boolean {
  return room.some(card => card.jokerId !== undefined);
}

/**
 * Check if a room is a champion room (single card, auto-clear on defeat).
 */
export function isChampionRoom(room: Card[]): boolean {
  return room.length === 1 && room[0]?.jokerId === 'champion';
}

/**
 * Check if a card is a joker card
 */
export function isJokerCard(card: Card): boolean {
  return card.jokerId !== undefined;
}
