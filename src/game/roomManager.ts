// Room management including initialization, progression, and skip mechanic

import { Card } from '../types/game';

export interface RoomResult {
  room: Card[];
  remainingDeck: Card[];
}

/**
 * Initialize the first room by drawing 4 cards from the deck
 */
export function initializeFirstRoom(deck: Card[]): RoomResult {
  if (deck.length < 4) {
    throw new Error('Not enough cards to initialize first room');
  }

  // Draw 4 cards from the top of the deck
  const room = deck.slice(0, 4);
  const remainingDeck = deck.slice(4);

  return { room, remainingDeck };
}

/**
 * Prepare the next room after clearing or skipping the previous one
 * @param deck - Current deck
 * @param leftoverCard - Card left from previous room (null if room was skipped)
 */
export function prepareNextRoom(
  deck: Card[],
  leftoverCard: Card | null
): RoomResult {
  if (leftoverCard) {
    // Room was cleared: leftover + 3 new cards
    if (deck.length < 3) {
      // Not enough cards for a full room
      // Return whatever we have
      const room = [leftoverCard, ...deck];
      return { room, remainingDeck: [] };
    }

    const newCards = deck.slice(0, 3);
    const room = [leftoverCard, ...newCards];
    const remainingDeck = deck.slice(3);

    return { room, remainingDeck };
  } else {
    // Room was skipped: draw 4 new cards
    if (deck.length < 4) {
      // Not enough cards for a full room
      const room = [...deck];
      return { room, remainingDeck: [] };
    }

    const room = deck.slice(0, 4);
    const remainingDeck = deck.slice(4);

    return { room, remainingDeck };
  }
}

/**
 * Skip the current room, returning all cards to the bottom of the deck
 * @param currentRoom - The 4 cards in the current room
 * @param deck - The current deck
 * @param direction - Order to place cards: left-to-right or right-to-left
 */
export function skipRoom(
  currentRoom: Card[],
  deck: Card[],
  direction: 'left-to-right' | 'right-to-left'
): Card[] {
  if (currentRoom.length !== 4) {
    throw new Error('Can only skip rooms with exactly 4 cards');
  }

  // Order cards based on direction
  const orderedCards =
    direction === 'left-to-right'
      ? [...currentRoom] // [0, 1, 2, 3]
      : [...currentRoom].reverse(); // [3, 2, 1, 0]

  // Append to bottom of deck
  return [...deck, ...orderedCards];
}

/**
 * Check if there are enough cards to form a complete room
 */
export function canFormRoom(deckSize: number, hasLeftover: boolean): boolean {
  if (hasLeftover) {
    // Need leftover + 3 from deck = 4 total
    return deckSize >= 3;
  } else {
    // Need 4 from deck
    return deckSize >= 4;
  }
}

/**
 * Calculate how many complete rooms can be formed from remaining cards
 */
export function calculateRemainingRooms(
  deckSize: number,
  hasLeftover: boolean
): number {
  if (hasLeftover) {
    // First room uses leftover + 3, then every 3 cards after
    if (deckSize < 3) return 0;
    return 1 + Math.floor((deckSize - 3) / 3);
  } else {
    // First room uses 4, then every 3 cards after (with leftovers)
    if (deckSize < 4) return 0;
    const afterFirst = deckSize - 4;
    return 1 + Math.floor(afterFirst / 3);
  }
}
