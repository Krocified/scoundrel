// Player status: separate felt islands, each with a title on top.
// Colors are the audited set (see docs/UI-REFACTOR.md); re-check contrast before swapping.

interface PlayerStatsProps {
  hp: number;
  maxHp: number;
  cardsInDeck: number;
}

export function PlayerStats({
  hp,
  maxHp,
  cardsInDeck,
}: Readonly<PlayerStatsProps>) {
  const hpRatio = Math.max(0, Math.min(1, hp / maxHp));
  const fillColor = hpRatio > 0.6 ? '#4caf50' : hpRatio > 0.3 ? '#e07a5f' : '#e0555a';

  return (
    <>
      <style>{`
        .ps {
          display: flex;
          align-items: stretch;
          gap: 12px;
          margin-bottom: 20px;
        }
        .ps-island {
          background: #193b25;
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 10px 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.3);
        }

        .ps-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .ps-island--deck { flex: 0 0 auto; min-width: 84px; }
        .ps-deck-value {
          font-size: 22px;
          font-weight: 600;
          line-height: 1;
          color: var(--text-primary);
          font-variant-numeric: tabular-nums;
        }

        .ps-island--hp { flex: 1 1 auto; min-width: 0; justify-content: center; }
        .ps-hp-body { display: flex; align-items: center; gap: 12px; }
        .ps-hp-value {
          font-size: 15px;
          font-weight: 600;
          color: var(--text-primary);
          font-variant-numeric: tabular-nums;
          white-space: nowrap;
        }
        .ps-track {
          flex: 1;
          min-width: 0;
          height: 12px;
          padding: 2px;
          background: #14301e;
          border: 1px solid #5a9c6c;
          border-radius: 4px;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
          overflow: hidden;
        }
        .ps-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 0.2s ease, background-color 0.2s ease;
        }

        @media (max-width: 768px) {
          .ps { flex-wrap: nowrap; gap: 10px; margin-bottom: 16px; }
          .ps-island { padding: 8px 12px; gap: 6px; }
          .ps-island--hp { min-width: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ps-fill { transition: none; }
        }
      `}</style>

      <div className="ps">
        <div className="ps-island ps-island--deck" title={`${cardsInDeck} cards left in deck`}>
          <span className="ps-label">Deck</span>
          <span className="ps-deck-value">{cardsInDeck}</span>
        </div>

        <div className="ps-island ps-island--hp">
          <span className="ps-label">HP</span>
          <div className="ps-hp-body">
            <div
              className="ps-track"
              role="progressbar"
              aria-label="Health"
              aria-valuemin={0}
              aria-valuemax={maxHp}
              aria-valuenow={hp}
            >
              <div className="ps-fill" style={{ width: `${hpRatio * 100}%`, background: fillColor }} />
            </div>
            <span className="ps-hp-value">{hp}/{maxHp}</span>
          </div>
        </div>
      </div>
    </>
  );
}
