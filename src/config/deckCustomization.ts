// Deck customization configuration

import type { DeckCustomization } from '../types/deckCustomization';

export const currentDeckTheme = 'classic';

const deckConfigs: Record<string, DeckCustomization> = {
  classic: {
    deckTheme: 'classic',
    cardBackImage: '/assets/cards/classic/card-back.svg',
    suitImages: {
      hearts: '/assets/cards/classic/suits/hearts.svg',
      diamonds: '/assets/cards/classic/suits/diamonds.svg',
      spades: '/assets/cards/classic/suits/spades.svg',
      clubs: '/assets/cards/classic/suits/clubs.svg',
    },
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
};

/**
 * Get deck configuration for a specific theme
 */
export function getDeckConfig(theme: string = currentDeckTheme): DeckCustomization {
  const config = deckConfigs[theme];
  if (!config) {
    console.warn(`Deck theme "${theme}" not found, falling back to "${currentDeckTheme}"`);
    return deckConfigs[currentDeckTheme];
  }
  return config;
}

/**
 * Get the current deck configuration
 */
export function getCurrentDeckConfig(): DeckCustomization {
  return getDeckConfig(currentDeckTheme);
}

/**
 * Get the current deck configuration with overrides
 * Useful for runtime settings like color mode
 */
export function getCurrentDeckConfigWithOverrides(overrides?: Partial<DeckCustomization>): DeckCustomization {
  const baseConfig = getDeckConfig(currentDeckTheme);
  return { ...baseConfig, ...overrides };
}
