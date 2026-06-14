import { useState } from "react";
import { POWER_UPS } from "../game/powerUps";

interface PlayerStatsProps {
  hp: number;
  maxHp: number;
  currentScore: number;
  defeatedEnemies: number;
  roomsCleared: number;
  roomsSkipped: number;
  cardsInDeck: number;
  activePowerUps?: string[];
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
}: Readonly<PlayerStatsProps>) {
  const [showPowerUps, setShowPowerUps] = useState(false);

  const activePowerUpNames = activePowerUps
    .map((id) => POWER_UPS.find((p) => p.id === id))
    .filter(Boolean);

  const hasArmor = activePowerUps.includes("armor");

  return (
    <div
      style={{
        background: "#f5f5f5",
        padding: "15px",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "15px",
        }}
      >
        <div>
          <strong>HP:</strong> {hp}/{maxHp}
          {hasArmor && (
            <span
              style={{
                display: "inline-block",
                marginLeft: "8px",
                padding: "1px 6px",
                fontSize: "11px",
                fontWeight: "bold",
                background: "#bbdefb",
                color: "#1565c0",
                borderRadius: "4px",
                verticalAlign: "middle",
              }}
              title="Armor: all damage reduced by 1 (minimum 1)"
            >
              🛡 1
            </span>
          )}
          <div
            style={{
              background: "#ddd",
              height: "20px",
              borderRadius: "4px",
              overflow: "hidden",
              marginTop: "5px",
            }}
          >
            <div
              style={{
                background: hp > 10 ? "#4caf50" : "#f44336",
                height: "100%",
                width: `${(hp / maxHp) * 100}%`,
                transition: "width 0.3s",
              }}
            />
          </div>
        </div>

        <div>
          <strong>Score:</strong> {currentScore}
          <br />
          <small>Enemies defeated: {defeatedEnemies}</small>
        </div>

        <div>
          <strong>Rooms:</strong> {roomsCleared} cleared, {roomsSkipped} skipped
          <br />
          <small>Deck: {cardsInDeck} cards</small>
        </div>
      </div>

      {activePowerUpNames.length > 0 && (
        <div
          style={{
            marginTop: "10px",
            borderTop: "1px solid #ddd",
            paddingTop: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "4px",
            }}
          >
            <span
              style={{ fontSize: "13px", fontWeight: "bold", color: "#555" }}
            >
              Power-Ups ({activePowerUpNames.length})
            </span>
            <button
              onClick={() => setShowPowerUps((prev) => !prev)}
              style={{
                background: "none",
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "2px 8px",
                fontSize: "11px",
                cursor: "pointer",
                fontWeight: "bold",
                color: "#555",
              }}
            >
              {showPowerUps ? "Hide" : "Show"}
            </button>
          </div>
          {showPowerUps && (
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {activePowerUpNames.map((p) => (
                <span
                  key={p!.id}
                  style={{
                    background: "#e3f2fd",
                    color: "#1565c0",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    border: "1px solid #bbdefb",
                  }}
                  title={p!.description}
                >
                  {p!.name}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
