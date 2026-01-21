// Tests for card utility functions

import { createDeck } from './deck';
import {
  getCardType,
  getCardValue,
  getCardRankDisplay,
  getSuitSymbol,
  getCardDisplay,
  getSuitColor,
} from './cardUtils';

export function testCardUtils() {
  console.log('=== Card Utilities Tests ===\n');

  const deck = createDeck();

  // Test 1: Card type classification
  console.log('Test 1: Card type classification...');
  const heart5 = deck.find(c => c.suit === 'hearts' && c.rank === 5)!;
  const diamond7 = deck.find(c => c.suit === 'diamonds' && c.rank === 7)!;
  const spadeK = deck.find(c => c.suit === 'spades' && c.rank === 13)!;
  const club3 = deck.find(c => c.suit === 'clubs' && c.rank === 3)!;

  console.log(`  ♥5 is ${getCardType(heart5)} (expected: health)`);
  console.log(`  ♦7 is ${getCardType(diamond7)} (expected: weapon)`);
  console.log(`  ♠K is ${getCardType(spadeK)} (expected: enemy)`);
  console.log(`  ♣3 is ${getCardType(club3)} (expected: enemy)`);

  const typesCorrect =
    getCardType(heart5) === 'health' &&
    getCardType(diamond7) === 'weapon' &&
    getCardType(spadeK) === 'enemy' &&
    getCardType(club3) === 'enemy';
  console.log(typesCorrect ? '✓ All card types correct\n' : '✗ Card types incorrect\n');

  // Test 2: Card values
  console.log('Test 2: Card values...');
  console.log(`  ♥5 value: ${getCardValue(heart5)} (expected: 5)`);
  console.log(`  ♠K value: ${getCardValue(spadeK)} (expected: 13)`);
  console.log(`  ♣3 value: ${getCardValue(club3)} (expected: 3)`);

  const valuesCorrect =
    getCardValue(heart5) === 5 &&
    getCardValue(spadeK) === 13 &&
    getCardValue(club3) === 3;
  console.log(valuesCorrect ? '✓ All card values correct\n' : '✗ Card values incorrect\n');

  // Test 3: Display strings
  console.log('Test 3: Card display strings...');
  console.log(`  ♥5 display: ${getCardDisplay(heart5)}`);
  console.log(`  ♠K display: ${getCardDisplay(spadeK)}`);
  console.log(`  ♦10 display: ${getCardDisplay(diamond7)}`);
  
  const spadeJ = deck.find(c => c.suit === 'spades' && c.rank === 11)!;
  const clubQ = deck.find(c => c.suit === 'clubs' && c.rank === 12)!;
  console.log(`  ♠J display: ${getCardDisplay(spadeJ)}`);
  console.log(`  ♣Q display: ${getCardDisplay(clubQ)}`);
  console.log('✓ All display strings generated\n');

  // Test 4: Suit symbols and colors
  console.log('Test 4: Suit symbols and colors...');
  console.log(`  Hearts: ${getSuitSymbol('hearts')} (color: ${getSuitColor('hearts')})`);
  console.log(`  Diamonds: ${getSuitSymbol('diamonds')} (color: ${getSuitColor('diamonds')})`);
  console.log(`  Spades: ${getSuitSymbol('spades')} (color: ${getSuitColor('spades')})`);
  console.log(`  Clubs: ${getSuitSymbol('clubs')} (color: ${getSuitColor('clubs')})`);
  console.log('✓ All symbols and colors generated\n');

  // Test 5: Verify all cards in deck
  console.log('Test 5: Classify all 42 cards...');
  const healthCards = deck.filter(c => getCardType(c) === 'health');
  const weaponCards = deck.filter(c => getCardType(c) === 'weapon');
  const enemyCards = deck.filter(c => getCardType(c) === 'enemy');

  console.log(`  Health cards: ${healthCards.length} (expected: 9)`);
  console.log(`  Weapon cards: ${weaponCards.length} (expected: 9)`);
  console.log(`  Enemy cards: ${enemyCards.length} (expected: 24)`);

  const countsCorrect =
    healthCards.length === 9 &&
    weaponCards.length === 9 &&
    enemyCards.length === 24;
  console.log(countsCorrect ? '✓ All card counts correct\n' : '✗ Card counts incorrect\n');

  // Test 6: Show samples of each type
  console.log('Test 6: Sample cards by type:');
  console.log('  Health: ' + healthCards.slice(0, 5).map(getCardDisplay).join(' '));
  console.log('  Weapons: ' + weaponCards.slice(0, 5).map(getCardDisplay).join(' '));
  console.log('  Enemies: ' + enemyCards.slice(0, 8).map(getCardDisplay).join(' '));

  console.log('\n=== All Card Utils Tests Complete ===');
}
