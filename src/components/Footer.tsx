// Modern dark footer with credits and external links

export function Footer() {
  return (
    <footer
      style={{
        marginTop: '24px',
        background: 'var(--bg-panel-solid)',
        borderTop: '1px solid var(--accent-border)',
        fontFamily: 'monospace',
        color: 'var(--text-muted)',
      }}
    >
      <style>{`
        .footer-link {
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.2s ease, transform 0.2s ease;
          display: inline-block;
        }
        .footer-link:hover {
          color: var(--accent);
          transform: translateY(-1px);
        }
        @media (max-width: 640px) {
          .footer-inner {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 32px !important;
          }
          .footer-brand {
            align-items: center !important;
          }
        }
      `}</style>

      <div
        className="footer-inner"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '48px 24px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '40px',
        }}
      >
        {/* Brand */}
        <div
          className="footer-brand"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            alignItems: 'flex-start',
            flex: '1',
          }}
        >
          <div
            style={{
              fontFamily: '"Pirata One", Georgia, serif',
              fontSize: '32px',
              color: 'var(--accent)',
              letterSpacing: '1px',
              lineHeight: 1,
            }}
          >
            Scoundrel
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', maxWidth: '260px' }}>
            A roguelike dungeon-crawler card game built for the browser.
          </div>
        </div>

        {/* Links */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            alignItems: 'flex-start',
            flex: '1',
          }}
        >
          <div
            style={{
              fontSize: '12px',
              fontWeight: 'bold',
              color: 'var(--text-primary)',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              marginBottom: '4px',
            }}
          >
            Project
          </div>
          <a
            href="https://github.com/Krocified/scoundrel"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            style={{ fontSize: '14px' }}
          >
            GitHub Source
          </a>
          <a
            href="https://github.com/Krocified/scoundrel/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            style={{ fontSize: '14px' }}
          >
            Report an Issue
          </a>
          <a href="/rules" className="footer-link" style={{ fontSize: '14px' }}>
            How to Play
          </a>
        </div>

        {/* Credits */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            alignItems: 'flex-start',
            flex: '1',
          }}
        >
          <div
            style={{
              fontSize: '12px',
              fontWeight: 'bold',
              color: 'var(--text-primary)',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              marginBottom: '4px',
            }}
          >
            Credits
          </div>
          <a
            href="https://github.com/Krocified"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            style={{ fontSize: '14px' }}
          >
            Made by Michael Jong
          </a>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Built with React, TypeScript & Vite.
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid var(--border)',
          padding: '20px 24px',
          textAlign: 'center',
          fontSize: '12px',
          color: 'var(--text-muted)',
        }}
      >
        © {new Date().getFullYear()} Michael Jong · All rights reserved · Open source under MIT
      </div>
    </footer>
  );
}
