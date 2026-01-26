// Hamburger menu component with sliding panel

import { useState, useEffect } from 'react';
import { ColorModeToggle } from './ColorModeToggle';
import { IconButton } from './IconButton';
import { DeckThemeSelector } from './DeckThemeSelector';

export function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Prevent body scroll when menu is open
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
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open menu"
        aria-expanded={isOpen}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
          alignItems: 'center',
          justifyContent: 'center',
          width: '40px',
          height: '40px',
          transition: 'transform 0.2s'
        }}
      >
        <span style={{
          display: 'block',
          width: '25px',
          height: '3px',
          background: '#333',
          borderRadius: '2px',
          transition: 'all 0.3s',
          transform: isOpen ? 'rotate(45deg) translateY(8px)' : 'none'
        }} />
        <span style={{
          display: 'block',
          width: '25px',
          height: '3px',
          background: '#333',
          borderRadius: '2px',
          transition: 'all 0.3s',
          opacity: isOpen ? 0 : 1
        }} />
        <span style={{
          display: 'block',
          width: '25px',
          height: '3px',
          background: '#333',
          borderRadius: '2px',
          transition: 'all 0.3s',
          transform: isOpen ? 'rotate(-45deg) translateY(-8px)' : 'none'
        }} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            border: 'none',
            padding: 0,
            zIndex: 998,
            animation: 'fadeIn 0.3s ease-in-out',
            cursor: 'pointer'
          }}
        />
      )}

      {/* Sliding Menu Panel */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: '300px',
          background: 'white',
          boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
          zIndex: 999,
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease-in-out',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '25px',
          fontFamily: 'monospace'
        }}
      >
        {/* Header with Title and Close button */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '2px solid #ddd',
          paddingBottom: '10px'
        }}>
          <h2 style={{
            margin: 0,
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#333'
          }}>
            Settings
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '4px',
              color: '#666',
              lineHeight: 1
            }}
          >
            ✕
          </button>
        </div>

        {/* Deck Theme Selector */}
        <div>
          <DeckThemeSelector />
        </div>

        {/* Distinct Colors Toggle */}
        <div>
          <ColorModeToggle />
          <p style={{
            margin: '8px 0 0 0',
            fontSize: '11px',
            color: '#666',
            lineHeight: '1.4'
          }}>
            Toggle between distinct colors (blue/red/green) and traditional playing card colors (red/black).
          </p>
        </div>

        {/* View Rules Section */}
        <div>
          <IconButton
            to="/rules"
            icon="📖"
            onClick={() => setIsOpen(false)}
          >
            View Game Rules
          </IconButton>
          <p style={{
            margin: '8px 0 0 0',
            fontSize: '11px',
            color: '#666',
            lineHeight: '1.4'
          }}>
            Learn how to play Scoundrel. Note: Navigating away or refreshing will reset your current dungeon run.
          </p>
        </div>

        {/* Issue Reporting Link */}
        <div style={{
          marginTop: 'auto',
          paddingTop: '20px',
          borderTop: '1px solid #ddd'
        }}>
          <a
            href="https://github.com/Krocified/scoundrel/issues"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '11px',
              color: '#667eea',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textDecoration = 'underline';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textDecoration = 'none';
            }}
          >
            <span>🐛</span>
            <span>Report an issue</span>
          </a>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
