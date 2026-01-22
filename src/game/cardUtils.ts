// Card utility functions for classification and value extraction

import type { Card, CardType } from '../types/game';
import { getCurrentDeckConfig } from '../config/deckCustomization';

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
export function getSuitImagePath(suit: Card['suit']): string {
  const config = getCurrentDeckConfig();
  return config.suitImages[suit];
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
