// Joker definitions for the post-completion chaos system

import type { JokerDef } from '../types/game';

export const JOKERS: JokerDef[] = [
  {
    id: 'champion',
    name: 'Champion',
    description: 'Joker becomes the strongest monster. Solo encounter – defeat it to clear the room.',
    effectDescription: 'Forced boss encounter vs strongest monster',
  },
  {
    id: 'predator',
    name: 'Predator',
    description: 'Duplicates the strongest monster 4 times. Shuffles 2 max-power weapons into the deck.',
    effectDescription: '4x strongest monster + 2 max weapons',
  },
  {
    id: 'forge-world',
    name: 'Forge World',
    description: 'Removes all weapons from deck and player. Barehand attacks deal half damage.',
    effectDescription: 'All weapons destroyed, half barehand damage',
  },
];
