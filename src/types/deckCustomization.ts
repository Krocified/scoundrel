// Deck customization types

import type { Suit } from './game';

export interface DeckCustomization {
  deckTheme: string;
  cardBackImage: string;
  suitImages: Record<Suit, string>;
  cardFont: string;
  cardFontSize: number;
}
