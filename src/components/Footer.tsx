// Footer with credits and links

export function Footer() {
  return (
    <footer
      style={{
        marginTop: '12px',
        padding: '14px 16px',
        background: 'rgba(16, 16, 16, 0.82)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        color: '#b8b8b8',
        fontSize: '13px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px 16px',
      }}
    >
      <style>{`
        .footer-link {
          color: #d4d4d4;
          text-decoration: none;
          transition: color 0.2s ease, text-decoration-color 0.2s ease;
        }
        .footer-link:hover {
          color: var(--accent);
          text-decoration: underline;
          text-underline-offset: 2px;
        }
      `}</style>

      <span style={{ fontFamily: '"Pirata One", Georgia, serif', fontSize: '17px', color: 'var(--accent)' }}>
        Scoundrel
      </span>
      <a href="https://github.com/Krocified/scoundrel" target="_blank" rel="noopener noreferrer" className="footer-link">
        GitHub
      </a>
      <a href="https://github.com/Krocified/scoundrel/issues" target="_blank" rel="noopener noreferrer" className="footer-link">
        Report an Issue
      </a>
      <span>
        Made by{' '}
        <a
          href="https://www.linkedin.com/in/maxjoong/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          Michael Jong
        </a>
      </span>
      <span>© {new Date().getFullYear()} · MIT</span>
    </footer>
  );
}
