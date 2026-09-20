// Classic deck configuration

import type { DeckCustomization } from '../types/deckCustomization';

export const deckConfig: DeckCustomization = {
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
};
