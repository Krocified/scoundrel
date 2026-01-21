// Development tools page

import { Link } from 'react-router-dom';
import { runAllTests } from '../game/runAllTests';

export function DevTools() {
  const handleRunTests = () => {
    console.clear();
    runAllTests();
    alert('Tests complete! Check the browser console (F12) for results.');
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'monospace' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link 
          to="/" 
          style={{
            padding: '8px 16px',
            background: '#607d8b',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            textDecoration: 'none',
            fontWeight: 'bold',
            display: 'inline-block'
          }}
        >
          ← Back to Game
        </Link>
      </div>

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
        <p>Click "Back to Game" to play Scoundrel!</p>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h3>Links</h3>
        <ul>
          <li><a href="/GAME_RULES.md" target="_blank" rel="noreferrer">Game Rules</a></li>
          <li><a href="/deck-demo.html" target="_blank" rel="noreferrer">Deck System Demo</a></li>
        </ul>
      </div>
    </div>
  );
}
