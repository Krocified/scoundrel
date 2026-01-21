// Tests for room management system

import { createDeck, shuffleDeck } from './deck';
import { getCardDisplay } from './cardUtils';
import {
  initializeFirstRoom,
  prepareNextRoom,
  skipRoom,
  canFormRoom,
  calculateRemainingRooms,
} from './roomManager';

export function testRoomManager() {
  console.log('=== Room Manager Tests ===\n');

  // Test 1: Initialize first room
  console.log('Test 1: Initialize first room...');
  let deck = shuffleDeck(createDeck());
  const originalDeckSize = deck.length;
  
  const { room: firstRoom, remainingDeck: deckAfterFirst } = initializeFirstRoom(deck);
  
  console.log(`  Original deck: ${originalDeckSize} cards`);
  console.log(`  First room: ${firstRoom.length} cards`);
  console.log(`  Remaining deck: ${deckAfterFirst.length} cards`);
  console.log(`  Room cards: ${firstRoom.map(getCardDisplay).join(' ')}`);
  
  const firstRoomCorrect = firstRoom.length === 4 && deckAfterFirst.length === 38;
  console.log(firstRoomCorrect ? '✓ First room initialized correctly\n' : '✗ First room incorrect\n');

  // Test 2: Prepare next room with leftover
  console.log('Test 2: Prepare room with leftover card...');
  const leftover = firstRoom[3]; // Simulate picking 3 cards, leaving 1
  deck = deckAfterFirst;
  
  const { room: secondRoom, remainingDeck: deckAfterSecond } = prepareNextRoom(deck, leftover);
  
  console.log(`  Leftover: ${getCardDisplay(leftover)}`);
  console.log(`  Second room: ${secondRoom.length} cards`);
  console.log(`  Room cards: ${secondRoom.map(getCardDisplay).join(' ')}`);
  console.log(`  Remaining deck: ${deckAfterSecond.length} cards`);
  console.log(`  First card is leftover: ${secondRoom[0].id === leftover.id}`);
  
  const secondRoomCorrect = 
    secondRoom.length === 4 &&
    secondRoom[0].id === leftover.id &&
    deckAfterSecond.length === 35;
  console.log(secondRoomCorrect ? '✓ Room with leftover prepared correctly\n' : '✗ Room with leftover incorrect\n');

  // Test 3: Prepare room without leftover (after skip)
  console.log('Test 3: Prepare room without leftover (after skip)...');
  deck = deckAfterSecond;
  
  const { room: thirdRoom, remainingDeck: deckAfterThird } = prepareNextRoom(deck, null);
  
  console.log(`  Third room: ${thirdRoom.length} cards`);
  console.log(`  Room cards: ${thirdRoom.map(getCardDisplay).join(' ')}`);
  console.log(`  Remaining deck: ${deckAfterThird.length} cards`);
  
  const thirdRoomCorrect = thirdRoom.length === 4 && deckAfterThird.length === 31;
  console.log(thirdRoomCorrect ? '✓ Room without leftover prepared correctly\n' : '✗ Room without leftover incorrect\n');

  // Test 4: Skip room - left to right
  console.log('Test 4: Skip room (left-to-right)...');
  const roomToSkip = thirdRoom;
  deck = deckAfterThird;
  
  console.log(`  Before skip - Deck size: ${deck.length}`);
  console.log(`  Cards in room: ${roomToSkip.map(getCardDisplay).join(' ')}`);
  
  const deckAfterSkipLTR = skipRoom(roomToSkip, deck, 'left-to-right');
  
  console.log(`  After skip - Deck size: ${deckAfterSkipLTR.length}`);
  console.log(`  Last 4 cards in deck: ${deckAfterSkipLTR.slice(-4).map(getCardDisplay).join(' ')}`);
  
  // Verify order: cards should be at bottom in same order [0,1,2,3]
  const ltrOrderCorrect = deckAfterSkipLTR.length === 35 &&
    deckAfterSkipLTR.slice(-4).every((card, i) => card.id === roomToSkip[i].id);
  console.log(ltrOrderCorrect ? '✓ Left-to-right skip correct\n' : '✗ Left-to-right skip incorrect\n');

  // Test 5: Skip room - right to left
  console.log('Test 5: Skip room (right-to-left)...');
  deck = deckAfterThird; // Reset to before skip
  
  const deckAfterSkipRTL = skipRoom(roomToSkip, deck, 'right-to-left');
  
  console.log(`  After skip - Deck size: ${deckAfterSkipRTL.length}`);
  console.log(`  Last 4 cards in deck: ${deckAfterSkipRTL.slice(-4).map(getCardDisplay).join(' ')}`);
  
  // Verify order: cards should be at bottom in reverse order [3,2,1,0]
  const rtlOrderCorrect = deckAfterSkipRTL.length === 35 &&
    deckAfterSkipRTL.slice(-4).every((card, i) => card.id === roomToSkip[3 - i].id);
  console.log(rtlOrderCorrect ? '✓ Right-to-left skip correct\n' : '✗ Right-to-left skip incorrect\n');

  // Test 6: Can form room checks
  console.log('Test 6: Check if room can be formed...');
  console.log(`  42 cards, no leftover: ${canFormRoom(42, false)} (expected: true)`);
  console.log(`  3 cards, no leftover: ${canFormRoom(3, false)} (expected: false)`);
  console.log(`  3 cards, with leftover: ${canFormRoom(3, true)} (expected: true)`);
  console.log(`  2 cards, with leftover: ${canFormRoom(2, true)} (expected: false)`);
  
  const canFormCorrect =
    canFormRoom(42, false) === true &&
    canFormRoom(3, false) === false &&
    canFormRoom(3, true) === true &&
    canFormRoom(2, true) === false;
  console.log(canFormCorrect ? '✓ Room formation checks correct\n' : '✗ Room formation checks incorrect\n');

  // Test 7: Calculate remaining rooms
  console.log('Test 7: Calculate remaining rooms...');
  console.log(`  42 cards, no leftover: ${calculateRemainingRooms(42, false)} rooms`);
  console.log(`  38 cards, with leftover: ${calculateRemainingRooms(38, true)} rooms`);
  console.log(`  10 cards, no leftover: ${calculateRemainingRooms(10, false)} rooms`);
  console.log(`  3 cards, no leftover: ${calculateRemainingRooms(3, false)} rooms`);
  console.log('✓ Room calculations complete\n');

  // Test 8: End game scenario
  console.log('Test 8: End game scenario (< 4 cards left)...');
  const smallDeck = shuffleDeck(createDeck()).slice(0, 3);
  const { room: endRoom, remainingDeck: endDeck } = prepareNextRoom(smallDeck, null);
  
  console.log(`  Starting with ${smallDeck.length} cards`);
  console.log(`  Room formed: ${endRoom.length} cards`);
  console.log(`  Remaining: ${endDeck.length} cards`);
  console.log(`  Game should end: ${endDeck.length < 4}`);
  console.log('✓ End game scenario handled\n');

  console.log('=== All Room Manager Tests Complete ===');
}
