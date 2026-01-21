// Tests for deck functionality
// Run this with: node --loader ts-node/esm deck.test.ts
// Or just import and call testDeck() from your app

import { createDeck, shuffleDeck, validateDeck } from './deck';

export function testDeck() {
  console.log('=== Deck System Tests ===\n');

  // Test 1: Create deck
  console.log('Test 1: Creating deck...');
  const deck = createDeck();
  console.log(`✓ Created deck with ${deck.length} cards`);

  // Test 2: Validate deck
  console.log('\nTest 2: Validating deck composition...');
  const isValid = validateDeck(deck);
  console.log(isValid ? '✓ Deck validation passed' : '✗ Deck validation failed');

  // Test 3: Show deck breakdown
  console.log('\nTest 3: Deck breakdown by suit:');
  const hearts = deck.filter(c => c.suit === 'hearts');
  const diamonds = deck.filter(c => c.suit === 'diamonds');
  const spades = deck.filter(c => c.suit === 'spades');
  const clubs = deck.filter(c => c.suit === 'clubs');

  console.log(`  ♥ Hearts: ${hearts.length} cards (2-10)`);
  console.log(`    ${hearts.map(c => c.rank).join(', ')}`);
  
  console.log(`  ♦ Diamonds: ${diamonds.length} cards (2-10)`);
  console.log(`    ${diamonds.map(c => c.rank).join(', ')}`);
  
  console.log(`  ♠ Spades: ${spades.length} cards (2-10, J=11, Q=12, K=13)`);
  console.log(`    ${spades.map(c => c.rank).join(', ')}`);
  
  console.log(`  ♣ Clubs: ${clubs.length} cards (2-10, J=11, Q=12, K=13)`);
  console.log(`    ${clubs.map(c => c.rank).join(', ')}`);

  // Test 4: Shuffle deck
  console.log('\nTest 4: Shuffling deck...');
  const shuffled = shuffleDeck(deck);
  console.log(`✓ Shuffled deck has ${shuffled.length} cards`);
  
  // Check that shuffle changed order
  const orderChanged = !deck.every((card, index) => card.id === shuffled[index].id);
  console.log(orderChanged ? '✓ Deck order changed after shuffle' : '⚠ Deck order unchanged (rare but possible)');
  
  // Check that all cards still present
  const allCardsPresent = validateDeck(shuffled);
  console.log(allCardsPresent ? '✓ All cards present after shuffle' : '✗ Cards missing after shuffle');

  // Test 5: Show first 8 cards of shuffled deck
  console.log('\nTest 5: First 8 cards of shuffled deck:');
  shuffled.slice(0, 8).forEach((card, i) => {
    const suitSymbol = {
      hearts: '♥',
      diamonds: '♦',
      spades: '♠',
      clubs: '♣'
    }[card.suit];
    const rankDisplay = card.rank <= 10 ? card.rank : ['J', 'Q', 'K'][card.rank - 11];
    console.log(`  [${i}] ${suitSymbol}${rankDisplay} (${card.suit}-${card.rank})`);
  });

  console.log('\n=== All Tests Complete ===');
  
  return { deck, shuffled, isValid };
}
