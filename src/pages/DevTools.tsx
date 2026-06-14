// Development tools page

import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { runAllTests } from '../game/runAllTests';

export function DevTools() {
  const handleRunTests = () => {
    console.clear();
    runAllTests();
    alert('Tests complete! Check the browser console (F12) for results.');
  };

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh' }}>
      <div style={{ padding: '40px', fontFamily: 'monospace', maxWidth: '900px', margin: '0 auto', color: 'var(--text-secondary)' }}>
        <div style={{ marginBottom: '24px' }}>
          <Link 
            to="/" 
            style={{
              padding: '10px 20px',
              background: 'var(--accent-dim)',
              color: 'var(--accent)',
              border: '1px solid var(--accent-border)',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 'bold',
              display: 'inline-block',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(245, 200, 66, 0.2)';
              e.currentTarget.style.borderColor = 'var(--accent)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--accent-dim)';
              e.currentTarget.style.borderColor = 'var(--accent-border)';
            }}
          >
            ← Back to Game
          </Link>
        </div>

        <h1 style={{ color: 'var(--accent)', fontFamily: '"Pirata One", Georgia, serif', fontSize: '42px', letterSpacing: '1px', marginBottom: '8px' }}>
          🃏 Scoundrel - Development Tools
        </h1>
        
        <div style={{ marginTop: '36px' }}>
          <h2 style={{ color: 'var(--text-primary)', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>Testing</h2>
          <button
            onClick={handleRunTests}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              cursor: 'pointer',
              background: 'rgba(76, 175, 80, 0.15)',
              color: '#81c784',
              border: '2px solid rgba(76, 175, 80, 0.35)',
              borderRadius: '6px',
              fontWeight: 'bold',
              fontFamily: 'monospace',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(76, 175, 80, 0.25)';
              e.currentTarget.style.borderColor = 'rgba(76, 175, 80, 0.55)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(76, 175, 80, 0.15)';
              e.currentTarget.style.borderColor = 'rgba(76, 175, 80, 0.35)';
            }}
          >
            Run All Tests
          </button>
          <p style={{ marginTop: '12px', fontSize: '14px', color: 'var(--text-muted)' }}>
            Click to run tests. Open browser console (F12) to see results.
          </p>
        </div>

        <div style={{ marginTop: '40px', padding: '24px', background: 'var(--bg-panel)', borderRadius: '10px', border: '1px solid var(--border)' }}>
          <h3 style={{ marginTop: 0, color: 'var(--text-primary)' }}>✅ Completed Systems (7/7):</h3>
          <ul style={{ color: 'var(--text-secondary)' }}>
            <li><strong style={{ color: 'var(--accent)' }}>Deck System</strong> - 42 cards, shuffle, validation</li>
            <li><strong style={{ color: 'var(--accent)' }}>Card Utilities</strong> - Type classification, display helpers</li>
            <li><strong style={{ color: 'var(--accent)' }}>Room Manager</strong> - Room initialization, skip mechanic</li>
            <li><strong style={{ color: 'var(--accent)' }}>Weapon System</strong> - Equip, durability tracking, usage limits</li>
            <li><strong style={{ color: 'var(--accent)' }}>Combat System</strong> - Damage calculation, healing, player state</li>
            <li><strong style={{ color: 'var(--accent)' }}>Card Actions</strong> - Pick cards, resolve effects</li>
            <li><strong style={{ color: 'var(--accent)' }}>Game Controller</strong> - Complete game orchestration</li>
          </ul>
          
          <h3 style={{ marginTop: '24px', color: 'var(--text-primary)' }}>🎮 Game is Playable!</h3>
          <p style={{ marginBottom: 0, color: 'var(--text-muted)' }}>Click "Back to Game" to play Scoundrel!</p>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 style={{ color: 'var(--text-primary)', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>Links</h2>
          <ul style={{ color: 'var(--text-secondary)' }}>
            <li><a href="/GAME_RULES.md" target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>Game Rules</a></li>
            <li><a href="/deck-demo.html" target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>Deck System Demo</a></li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
}
