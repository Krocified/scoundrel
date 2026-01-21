// Main Scoundrel game component

import React, { useState } from 'react';
import { GameBoard } from './components/GameBoard';
import { runAllTests } from './game/runAllTests';

type View = 'game' | 'dev';

function App() {
  const [view, setView] = useState<View>('game');

  const handleRunTests = () => {
    console.clear();
    runAllTests();
    alert('Tests complete! Check the browser console (F12) for results.');
  };

  return (
    <div>
      {/* View Toggle */}
      <div style={{ 
        background: '#333', 
        color: 'white', 
        padding: '10px 20px',
        display: 'flex',
        gap: '10px',
        alignItems: 'center'
      }}>
        <button
          onClick={() => setView('game')}
          style={{
            padding: '8px 16px',
            background: view === 'game' ? '#4caf50' : '#555',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Play Game
        </button>
        <button
          onClick={() => setView('dev')}
          style={{
            padding: '8px 16px',
            background: view === 'dev' ? '#4caf50' : '#555',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Dev Tools
        </button>
      </div>

      {/* Game View */}
      {view === 'game' && <GameBoard />}

      {/* Dev View */}
      {view === 'dev' && (
        <div style={{ padding: '40px', fontFamily: 'monospace' }}>
          <h1>🃏 Scoundrel - Development Tools</h1>
          
          <div style={{ marginTop: '30px' }}>
            <h2>Testing</h2>
            <button
              onClick={handleRunTests}
              style={{
                padding: '12px 24px',
                fontSize: '16px',
                cursor: 'pointer',
                background: '#00ff00',
                color: '#000',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 'bold',
                fontFamily: 'monospace',
              }}
            >
              Run All Tests
            </button>
            <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
              Click to run tests. Open browser console (F12) to see results.
            </p>
          </div>

          <div style={{ marginTop: '40px', padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
            <h3>✅ Completed Systems (7/7):</h3>
            <ul>
              <li><strong>Deck System</strong> - 42 cards, shuffle, validation</li>
              <li><strong>Card Utilities</strong> - Type classification, display helpers</li>
              <li><strong>Room Manager</strong> - Room initialization, skip mechanic</li>
              <li><strong>Weapon System</strong> - Equip, durability tracking, usage limits</li>
              <li><strong>Combat System</strong> - Damage calculation, healing, player state</li>
              <li><strong>Card Actions</strong> - Pick cards, resolve effects</li>
              <li><strong>Game Controller</strong> - Complete game orchestration</li>
            </ul>
            
            <h3 style={{ marginTop: '20px' }}>🎮 Game is Playable!</h3>
            <p>Switch to "Play Game" tab to play Scoundrel!</p>
          </div>

          <div style={{ marginTop: '30px' }}>
            <h3>Links</h3>
            <ul>
              <li><a href="/GAME_RULES.md" target="_blank">Game Rules</a></li>
              <li><a href="/deck-demo.html" target="_blank">Deck System Demo</a></li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
