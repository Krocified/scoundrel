// Run Modifier definitions for post-completion replayability

import type { RunModifierDef } from '../types/game';

export const RUN_MODIFIERS: RunModifierDef[] = [
  {
    id: 'juggernaut',
    name: 'Juggernaut',
    description: 'Reduce all incoming damage by 2 (minimum 1). Potions heal only 50%.',
    effectDescription: '-2 damage taken (min 1)',
    downsideDescription: 'Potions heal 50% less',
  },
  {
    id: 'mutation',
    name: 'Mutation',
    description: 'Heal 2 HP after clearing each room. Maximum HP reduced by 8.',
    effectDescription: '+2 HP per room cleared',
    downsideDescription: '-8 Maximum HP',
  },
  {
    id: 'vampiric',
    name: 'Vampiric',
    description: 'Heal 1 HP when defeating a monster. Hearts become monsters.',
    effectDescription: '+1 HP per kill',
    downsideDescription: 'Hearts become enemies',
  },
];
