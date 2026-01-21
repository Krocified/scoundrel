// Deck initialization and shuffling for Scoundrel

import type { Card, Suit, Rank } from '../types/game';

/**
 * Creates the full 42-card Scoundrel deck
 * Removes: 4 Aces, K/Q/J of Hearts, K/Q/J of Diamonds
 */
export function createDeck(): Card[] {
  const suits: Suit[] = ['hearts', 'diamonds', 'spades', 'clubs'];
  const deck: Card[] = [];

  for (const suit of suits) {
    // Determine which ranks to include for this suit
    let ranks: Rank[];
    
    if (suit === 'hearts' || suit === 'diamonds') {
      // Hearts and Diamonds: 2-10 only (no face cards, no Ace)
      ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10];
    } else {
      // Spades and Clubs: 2-10, J, Q, K (no Ace)
      ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    }

    // Create cards for this suit
    for (const rank of ranks) {
      deck.push({
        suit,
        rank,
        id: `${suit}-${rank}`, // e.g., "hearts-5", "spades-13"
      });
    }
  }

  return deck;
}

/**
 * Shuffles a deck of cards using Fisher-Yates algorithm
 * Returns a new shuffled array (does not mutate original)
 */
export function shuffleDeck(cards: Card[]): Card[] {
  const shuffled = [...cards];
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
}

/**
 * Validates that the deck has exactly 42 cards with correct composition
 */
export function validateDeck(deck: Card[]): boolean {
  if (deck.length !== 42) {
    console.error(`Deck has ${deck.length} cards, expected 42`);
    return false;
  }

  // Count cards by suit
  const heartCount = deck.filter(c => c.suit === 'hearts').length;
  const diamondCount = deck.filter(c => c.suit === 'diamonds').length;
  const spadeCount = deck.filter(c => c.suit === 'spades').length;
  const clubCount = deck.filter(c => c.suit === 'clubs').length;

  const isValid =
    heartCount === 9 && // 2-10
    diamondCount === 9 && // 2-10
    spadeCount === 12 && // 2-10, J, Q, K
    clubCount === 12; // 2-10, J, Q, K

  if (!isValid) {
    console.error('Deck composition incorrect:', {
      hearts: heartCount,
      diamonds: diamondCount,
      spades: spadeCount,
      clubs: clubCount,
    });
  }

  return isValid;
}
