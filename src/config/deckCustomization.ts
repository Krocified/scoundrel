// Deck customization configuration

import type { DeckCustomization } from '../types/deckCustomization';

export const defaultTheme = 'classic';

const deckConfigs: Record<string, DeckCustomization> = {
  classic: {
    deckTheme: 'classic',
    cardBackImage: '/assets/cards/classic/card-back.svg',
    bossImages: {
      'jack_of_spades': '/assets/cards/classic/bosses/jack_of_spades.svg',
      'queen_of_spades': '/assets/cards/classic/bosses/queen_of_spades.svg',
      'king_of_spades': '/assets/cards/classic/bosses/king_of_spades.svg',
      'jack_of_clubs': '/assets/cards/classic/bosses/jack_of_clubs.svg',
      'queen_of_clubs': '/assets/cards/classic/bosses/queen_of_clubs.svg',
      'king_of_clubs': '/assets/cards/classic/bosses/king_of_clubs.svg',
    },
    cardFont: 'Georgia, serif',
    cardFontSize: 32,
    useTextSuits: true,
    useDistinctColors: true,
  },
  esoteric: {
    deckTheme: 'esoteric',
    cardBackImage: '/assets/cards/esoteric/card-back.png',
    bossImages: {
      'jack_of_spades': '/assets/cards/esoteric/bosses/jack-of-spades.svg',
      'queen_of_spades': '/assets/cards/esoteric/bosses/queen-of-spades.svg',
      'king_of_spades': '/assets/cards/esoteric/bosses/king-of-spades.svg',
      'jack_of_clubs': '/assets/cards/esoteric/bosses/jack-of-clubs.svg',
      'queen_of_clubs': '/assets/cards/esoteric/bosses/queen-of-clubs.svg',
      'king_of_clubs': '/assets/cards/esoteric/bosses/king-of-clubs.svg',
    },
    cardFont: '"Pirata One", system-ui',
    cardFontSize: 36,
    useTextSuits: true,
    useDistinctColors: true,
  },
};

/**
 * Get deck configuration for a specific theme
 */
export function getDeckConfig(theme: string = defaultTheme): DeckCustomization {
  const config = deckConfigs[theme];
  if (!config) {
    console.warn(`Deck theme "${theme}" not found, falling back to "${defaultTheme}"`);
    return deckConfigs[defaultTheme];
  }
  return config;
}
