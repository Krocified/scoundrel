// Main Scoundrel game component

import React from 'react';
import { runAllTests } from './game/runAllTests';

function App() {
  const handleRunTests = () => {
    console.clear();
    runAllTests();
    alert('Tests complete! Check the browser console (F12) for results.');
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'monospace' }}>
      <h1>🃏 Scoundrel</h1>
      <p>A dungeon crawler card game</p>
      
      <div style={{ marginTop: '30px' }}>
        <h2>Development Tools</h2>
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
        <h3>✅ Completed Systems:</h3>
        <ul>
          <li><strong>Deck System</strong> - 42 cards, shuffle, validation</li>
          <li><strong>Card Utilities</strong> - Type classification, display helpers</li>
          <li><strong>Room Manager</strong> - Room initialization, skip mechanic</li>
          <li><strong>Weapon System</strong> - Equip, durability tracking, usage limits</li>
          <li><strong>Combat System</strong> - Damage calculation, healing, player state</li>
          <li><strong>Card Actions</strong> - Pick cards, resolve effects (health/weapon/enemy)</li>
          <li><strong>Game Controller</strong> - Complete game orchestration and flow</li>
        </ul>
        
        <h3 style={{ marginTop: '20px' }}>🎮 Ready to Play!</h3>
        <p>All core game logic is complete. Next: Build the UI!</p>
      </div>
    </div>
  );
}

export default App;
