// Card utility functions for classification and value extraction

import type { Card, CardType, Suit } from '../types/game';
import type { DeckCustomization } from '../types/deckCustomization';

/**
 * Get the type of a card based on its suit
 * Hearts = health potions
 * Diamonds = weapons
 * Spades/Clubs = enemies
 */
export function getCardType(card: Card): CardType {
  switch (card.suit) {
    case 'hearts':
      return 'health';
    case 'diamonds':
      return 'weapon';
    case 'spades':
    case 'clubs':
      return 'enemy';
  }
}

/**
 * Get the numeric value of a card
 * For our deck, rank already contains the correct value (2-13)
 */
export function getCardValue(card: Card): number {
  return card.rank;
}

/**
 * Get a display string for a card's rank
 * 2-10 show as numbers, 11=J, 12=Q, 13=K
 */
export function getCardRankDisplay(card: Card): string {
  if (card.rank <= 10) {
    return card.rank.toString();
  }
  
  switch (card.rank) {
    case 11:
      return 'J';
    case 12:
      return 'Q';
    case 13:
      return 'K';
    default:
      return card.rank.toString();
  }
}

/**
 * Get a suit symbol for display (emoji - for text/logging purposes)
 */
export function getSuitSymbol(suit: Card['suit']): string {
  switch (suit) {
    case 'hearts':
      return '♥';
    case 'diamonds':
      return '♦';
    case 'spades':
      return '♠';
    case 'clubs':
      return '♣';
  }
}

/**
 * Get the image path for a suit symbol
 */
export function getSuitImagePath(suit: Card['suit'], deckConfig: DeckCustomization): string {
  return deckConfig.suitImages?.[suit] || '';
}

/**
 * Get the boss image path for face cards (J, Q, K) of spades and clubs
 * Returns null if the card doesn't have a boss image
 */
export function getBossImagePath(card: Card, deckConfig: DeckCustomization): string | null {
  // Only spades and clubs have boss images, and only for face cards (J, Q, K)
  if (card.suit !== 'spades' && card.suit !== 'clubs') {
    return null;
  }
  
  if (card.rank < 11 || card.rank > 13) {
    return null;
  }
  
  let rankName: 'jack' | 'queen' | 'king';

  if (card.rank === 11) {
    rankName = 'jack';
  } else if (card.rank === 12) {
    rankName = 'queen';
  } else {
    rankName = 'king';
  }

  const bossKey = `${rankName}_of_${card.suit}`;
  return deckConfig.bossImages[bossKey] || null;
}

/**
 * Get a full display string for a card (e.g., "♥5", "♠K")
 */
export function getCardDisplay(card: Card): string {
  return `${getSuitSymbol(card.suit)}${getCardRankDisplay(card)}`;
}

/**
 * Get a color for the card suit (for UI styling)
 */
export function getSuitColor(suit: Card['suit']): string {
  switch (suit) {
    case 'hearts':
      return '#ff4444'; // red
    case 'diamonds':
      return '#4499ff'; // blue
    case 'spades':
    case 'clubs':
      return '#00ff00'; // green (enemies)
  }
}

/**
 * Get the display color for a suit using the \"distinct\" palette
 * (matches card border colors by card type).
 */
export function getSuitDisplayColorDistinct(suit: Suit): string {
  const cardType = getCardType({ suit, rank: 2, id: '' });
  if (cardType === 'health') return '#e91e63'; // red/pink
  if (cardType === 'weapon') return '#2196f3'; // blue
  return '#4caf50'; // green (enemies)
}

/**
 * Get the traditional red/black suit colors.
 */
export function getSuitDisplayColorTraditional(suit: Suit): string {
  switch (suit) {
    case 'hearts':
    case 'diamonds':
      return '#ff0000'; // red
    case 'spades':
    case 'clubs':
      return '#000000'; // black
  }
}
