import { useState } from "react";
import { POWER_UPS } from "../game/powerUps";
import { RUN_MODIFIERS } from "../config/runModifiers";
import type { RunModifierId } from "../types/game";

interface PlayerStatsProps {
  hp: number;
  maxHp: number;
  currentScore: number;
  defeatedEnemies: number;
  roomsCleared: number;
  roomsSkipped: number;
  cardsInDeck: number;
  activePowerUps?: string[];
  runModifiers?: RunModifierId[];
}

export function PlayerStats({
  hp,
  maxHp,
  currentScore,
  defeatedEnemies,
  roomsCleared,
  roomsSkipped,
  cardsInDeck,
  activePowerUps = [],
  runModifiers = [],
}: Readonly<PlayerStatsProps>) {
  const [showEffects, setShowEffects] = useState(false);

  const activePowerUpNames = activePowerUps
    .map((id) => POWER_UPS.find((p) => p.id === id))
    .filter(Boolean);

  const activeModifierDefs = runModifiers
    .map((id) => RUN_MODIFIERS.find((m) => m.id === id))
    .filter(Boolean);

  const hasArmor = activePowerUps.includes("armor");
  const hpPercent = (hp / maxHp) * 100;
  const hasEffects = activePowerUpNames.length > 0 || activeModifierDefs.length > 0;

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .player-stats {
            padding: 12px 14px !important;
            margin-bottom: 16px !important;
          }
          .player-stats-top {
            flex-wrap: wrap !important;
            gap: 10px !important;
          }
          .player-stats-hp {
            flex: 1 1 100% !important;
            min-width: 0 !important;
          }
          .player-stats-pills {
            flex: 1 !important;
            justify-content: space-between !important;
          }
          .player-stats-pills > div {
            flex: 1 !important;
            min-width: 0 !important;
            padding: 4px 6px !important;
          }
          .player-stats-pills > div span:first-child {
            font-size: 8px !important;
          }
          .player-stats-pills > div span:last-child {
            font-size: 12px !important;
          }
        }
      `}</style>
      <div
        className="player-stats"
        style={{
          background: "var(--bg-panel)",
          padding: "18px 20px",
          borderRadius: "12px",
          marginBottom: "24px",
          border: "1px solid var(--border)",
          color: "var(--text-secondary)",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
        }}
      >
        {/* Top row: HP bar + stats */}
        <div className="player-stats-top" style={{ display: "flex", gap: "14px", alignItems: "center" }}>
          {/* HP */}
          <div className="player-stats-hp" style={{ flex: "1", minWidth: "120px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3px" }}>
              <span style={{ fontSize: "10px", fontWeight: "bold", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>
                HP
              </span>
              <span style={{ fontSize: "13px", fontWeight: "bold", color: "var(--text-primary)" }}>
                {hp}/{maxHp}
              </span>
            </div>
            <div
              style={{
                background: "var(--bg-input)",
                height: "8px",
                borderRadius: "4px",
                overflow: "hidden",
                border: "1px solid var(--border)",
              }}
            >
              <div
                style={{
                  background: hp > 30 ? "#4caf50" : hp > 12 ? "#ff9800" : "#f44336",
                  height: "100%",
                  width: `${hpPercent}%`,
                  transition: "width 0.3s ease",
                  borderRadius: "4px",
                }}
              />
            </div>
          </div>

          {/* Compact stat pills */}
          <div className="player-stats-pills" style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            <StatPill label="Score" value={currentScore} />
            <StatPill label="Enemies" value={defeatedEnemies} />
            <StatPill label="Rooms" value={`${roomsCleared}/${roomsSkipped}`} />
            <StatPill label="Deck" value={cardsInDeck} />
          </div>

          {/* Armor + Effects toggles */}
          <div className="player-stats-effects" style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            {hasArmor && (
              <span
                style={{
                  padding: "3px 8px",
                  fontSize: "11px",
                  fontWeight: "bold",
                  background: "rgba(33, 150, 243, 0.12)",
                  color: "#64b5f6",
                  borderRadius: "12px",
                  border: "1px solid rgba(33, 150, 243, 0.25)",
                }}
                title="Armor: all damage reduced by 1 (minimum 1)"
              >
                🛡 1
              </span>
            )}
            {hasEffects && (
              <button
                onClick={() => setShowEffects((prev) => !prev)}
                style={{
                  padding: "3px 10px",
                  fontSize: "11px",
                  fontWeight: "bold",
                  background: showEffects ? "var(--accent-dim)" : "var(--bg-input)",
                  color: showEffects ? "var(--accent)" : "var(--text-muted)",
                  border: `1px solid ${showEffects ? "var(--accent-border)" : "var(--border-strong)"}`,
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "all 0.2s",
                }}
              >
                ⚡ {activeModifierDefs.length + activePowerUpNames.length}
              </button>
            )}
          </div>
        </div>

        {/* Active Effects row */}
        {showEffects && hasEffects && (
          <div
            style={{
              marginTop: "10px",
              paddingTop: "10px",
              borderTop: "1px solid var(--border)",
              display: "flex",
              flexWrap: "wrap",
              gap: "6px",
              alignItems: "center",
            }}
          >
            {activeModifierDefs.map((m) => (
              <EffectChip key={m!.id} icon="⚡" name={m!.name} description={m!.description} color="var(--accent)" />
            ))}
            {activePowerUpNames.map((p) => (
              <EffectChip key={p!.id} icon="⭐" name={p!.name} description={p!.description} color="#64b5f6" />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function StatPill({ label, value }: Readonly<{ label: string; value: string | number }>) {
  return (
    <div
      style={{
        background: "var(--bg-input)",
        border: "1px solid var(--border)",
        borderRadius: "8px",
        padding: "5px 10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: "55px",
      }}
    >
      <span style={{ fontSize: "9px", fontWeight: "bold", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
        {label}
      </span>
      <span style={{ fontSize: "14px", fontWeight: "bold", color: "var(--text-primary)" }}>
        {value}
      </span>
    </div>
  );
}

function EffectChip({ icon, name, description, color }: Readonly<{ icon: string; name: string; description: string; color: string }>) {
  return (
    <span
      style={{
        background: `${color}20`,
        color,
        padding: "4px 10px",
        borderRadius: "14px",
        fontSize: "11px",
        fontWeight: "bold",
        border: `1px solid ${color}40`,
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
      }}
      title={description}
    >
      {icon} {name}
    </span>
  );
}
