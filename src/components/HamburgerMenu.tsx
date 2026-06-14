// Settings drawer for deck theme and color mode

import { useState, useEffect } from 'react';
import { ColorModeToggle } from './ColorModeToggle';
import { DeckThemeSelector } from './DeckThemeSelector';
import { useTheme } from '../contexts/ThemeContext';

export function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Settings Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open settings"
        aria-expanded={isOpen}
        style={{
          background: 'var(--accent-dim)',
          border: '1px solid var(--accent-border)',
          borderRadius: '8px',
          cursor: 'pointer',
          padding: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '40px',
          height: '40px',
          transition: 'all 0.2s ease',
          color: 'var(--accent)',
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
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
          }}
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(2px)',
            zIndex: 998,
            animation: 'fadeIn 0.25s ease',
          }}
        />
      )}

      {/* Settings Panel */}
      <aside
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: '320px',
          maxWidth: '90vw',
          background: 'var(--bg-panel-solid)',
          borderRight: '1px solid var(--accent-border)',
          boxShadow: '8px 0 32px rgba(0, 0, 0, 0.4)',
          zIndex: 999,
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          fontFamily: 'monospace',
          color: 'var(--text-secondary)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid var(--border)',
            paddingBottom: '16px',
          }}
        >
          <h2
            style={{
              margin: 0,
              fontFamily: '"Pirata One", Georgia, serif',
              fontSize: '26px',
              fontWeight: 'normal',
              color: 'var(--accent)',
              letterSpacing: '1px',
            }}
          >
            Settings
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close settings"
            style={{
              background: 'var(--bg-input)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              fontSize: '18px',
              cursor: 'pointer',
              padding: '6px 10px',
              color: 'var(--text-muted)',
              lineHeight: 1,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--accent)';
              e.currentTarget.style.borderColor = 'var(--accent-border)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--text-muted)';
              e.currentTarget.style.borderColor = 'var(--border)';
            }}
          >
            ✕
          </button>
        </div>

        {/* Deck Theme */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div
            style={{
              fontSize: '12px',
              fontWeight: 'bold',
              color: 'var(--text-primary)',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
            }}
          >
            Deck Theme
          </div>
          <DeckThemeSelector />
        </section>

        {/* Color Mode */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div
            style={{
              fontSize: '12px',
              fontWeight: 'bold',
              color: 'var(--text-primary)',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
            }}
          >
            Suit Colors
          </div>
          <ColorModeToggle />
          <p
            style={{
              margin: 0,
              fontSize: '12px',
              color: 'var(--text-muted)',
              lineHeight: '1.5',
            }}
          >
            Toggle between distinct card-type colors and traditional red/black suits.
          </p>
        </section>

        {/* Theme Toggle */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div
            style={{
              fontSize: '12px',
              fontWeight: 'bold',
              color: 'var(--text-primary)',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
            }}
          >
            Theme
          </div>
          <button
            onClick={toggleTheme}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              background: 'var(--bg-input)',
              border: '1px solid var(--accent-border)',
              borderRadius: '6px',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: '14px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--bg-hover)';
              e.currentTarget.style.borderColor = 'var(--accent)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--bg-input)';
              e.currentTarget.style.borderColor = 'var(--accent-border)';
            }}
          >
            <span>{isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}</span>
            <span style={{ fontSize: '12px', color: 'var(--accent)' }}>
              {isDark ? 'Switch to Light' : 'Switch to Dark'}
            </span>
          </button>
        </section>

        {/* Decorative bottom */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '24px',
            borderTop: '1px solid var(--border)',
            fontSize: '12px',
            color: 'var(--text-muted)',
            textAlign: 'center',
          }}
        >
          ✨ Make the dungeon your own ✨
        </div>
      </aside>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
}
