// Core game types for Scoundrel

export type Suit = 'hearts' | 'diamonds' | 'spades' | 'clubs';

export type Rank = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

export interface Card {
  suit: Suit;
  rank: Rank;
  id: string; // unique identifier for React keys
}

export type CardType = 'health' | 'weapon' | 'enemy';

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
}
