// Core game types for Scoundrel

export type Suit = 'hearts' | 'diamonds' | 'spades' | 'clubs' | 'joker';

export type Rank = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

export type RunModifierId = 'juggernaut' | 'mutation' | 'vampiric';

export type JokerId = 'champion' | 'predator' | 'forge-world';

export interface Card {
  suit: Suit;
  rank: Rank;
  id: string; // unique identifier for React keys
  jokerId?: JokerId; // set for joker cards
}

export type CardType = 'health' | 'weapon' | 'enemy' | 'joker';

export interface RunModifierDef {
  id: RunModifierId;
  name: string;
  description: string;
  effectDescription: string;
  downsideDescription: string;
}

export interface JokerDef {
  id: JokerId;
  name: string;
  description: string;
  effectDescription: string;
}

export interface PlayerState {
  hp: number; // current HP (max 20)
  maxHp: number; // always 20
  equippedWeapon: Card | null;
  weaponMaxEnemy: number | null; // highest enemy rank this weapon can defeat
}

export interface GameState {
  deck: Card[]; // remaining cards in deck (CRITICAL: order matters!)
  currentRoom: Card[]; // 4 cards in current room (index 0-3)
  leftoverCard: Card | null; // card from previous room (null after skip)
  player: PlayerState;
  cardsPickedThisRoom: number; // 0-3
  gameStatus: 'playing' | 'won' | 'lost';
  roomsCleared: number;
  roomsSkipped: number;
  defeatedEnemies: number[]; // ranks of all defeated enemies for scoring
  activePowerUps: string[]; // power-up IDs affecting this run
  runModifiers: RunModifierId[]; // active run modifiers
  barehandHalfDamage: boolean; // forge world effect: barehand deals half damage
}
