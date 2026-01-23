// Deck customization types

import type { Suit } from './game';

export interface DeckCustomization {
  deckTheme: string;
  cardBackImage: string;
  suitImages: Record<Suit, string>;
  bossImages: Record<string, string>;
  cardFont: string;
  cardFontSize: number;
  useTextSuits: boolean; // If true, render suits as text (emoji); if false, use images
  useDistinctColors: boolean; // If true, colors match card borders; if false, traditional suit colors
}
