// Power-up definitions for meta-progression system

export interface PowerUp {
  id: string;
  name: string;
  description: string;
}

export const POWER_UPS: PowerUp[] = [
  {
    id: "vitality",
    name: "Vitality",
    description: "Max HP increased to 25",
  },
  {
    id: "armor",
    name: "Armor",
    description: "All damage taken reduced by 1 (minimum 1)",
  },
  {
    id: "regeneration",
    name: "Regeneration",
    description: "Heal 1 HP after clearing each room",
  },
];

/**
 * Get 3 random power-ups that the player doesn't already have
 */
export function getRandomChoices(ownedIds: string[]): PowerUp[] {
  const available = POWER_UPS.filter((p) => !ownedIds.includes(p.id));
  const shuffled = [...available].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}
