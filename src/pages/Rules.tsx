// Game rules page

import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';

const sectionTitleStyle: React.CSSProperties = {
  fontSize: '32px',
  color: 'var(--accent)',
  borderBottom: '2px solid var(--accent-border)',
  paddingBottom: '12px',
  marginBottom: '24px',
  fontFamily: '"Pirata One", Georgia, serif',
  fontWeight: 'normal',
  letterSpacing: '1px',
};

const cardBoxStyle = (border: string, bg: string): React.CSSProperties => ({
  padding: '22px',
  background: bg,
  borderRadius: '10px',
  border: `2px solid ${border}`,
});

export function Rules() {
  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh' }}>
      <div
        style={{
          padding: '40px 24px',
          maxWidth: '900px',
          margin: '0 auto',
          fontFamily: 'monospace',
          lineHeight: '1.7',
          color: 'var(--text-secondary)',
        }}
      >
        <Link
          to="/"
          style={{
            padding: '12px 22px',
            background: 'var(--accent-dim)',
            color: 'var(--accent)',
            border: '1px solid var(--accent-border)',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 'bold',
            display: 'inline-block',
            marginBottom: '36px',
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

        <h1
          style={{
            fontSize: '52px',
            marginBottom: '8px',
            fontFamily: '"Pirata One", Georgia, serif',
            color: 'var(--accent)',
            letterSpacing: '2px',
          }}
        >
          SCOUNDREL
        </h1>
        <p
          style={{
            fontSize: '18px',
            color: 'var(--text-muted)',
            marginBottom: '48px',
            fontStyle: 'italic',
          }}
        >
          A solo dungeon-crawler card game of risk, reward, and survival.
        </p>

        {/* Overview */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={sectionTitleStyle}>Overview</h2>
          <p>
            You descend into a dungeon built from a modified 42-card deck. Each room presents four cards:
            enemies to fight, weapons to wield, and health potions to drink. Pick three cards per room, leave
            one behind, and survive until the dungeon is exhausted.
          </p>
        </section>

        {/* Setup */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={sectionTitleStyle}>Setup</h2>
          <ul style={{ paddingLeft: '28px' }}>
            <li style={{ marginBottom: '10px' }}>Start with a standard 52-card deck</li>
            <li style={{ marginBottom: '10px' }}>Remove all Aces, and the Kings, Queens, and Jacks of Hearts and Diamonds</li>
            <li style={{ marginBottom: '10px' }}>This leaves you with <strong style={{ color: 'var(--accent)' }}>42 cards</strong></li>
            <li style={{ marginBottom: '10px' }}>You begin with <strong style={{ color: 'var(--accent)' }}>20 HP</strong> (can be altered by modifiers)</li>
          </ul>
        </section>

        {/* Card Types */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={sectionTitleStyle}>Card Types</h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
              marginTop: '24px',
            }}
          >
            <div style={cardBoxStyle('#e91e63', 'rgba(233, 30, 99, 0.08)')}>
              <h3 style={{ color: '#ff6b9d', marginTop: 0, fontSize: '20px' }}>♥ Hearts</h3>
              <p style={{ marginBottom: 0, color: 'var(--text-primary)' }}>
                <strong>Health Potions</strong> — Restore HP equal to the card's value, up to your max HP.
              </p>
            </div>

            <div style={cardBoxStyle('#2196f3', 'rgba(33, 150, 243, 0.08)')}>
              <h3 style={{ color: '#64b5f6', marginTop: 0, fontSize: '20px' }}>♦ Diamonds</h3>
              <p style={{ marginBottom: 0, color: 'var(--text-primary)' }}>
                <strong>Weapons</strong> — Equip to reduce enemy damage. Only one weapon can be equipped at a time.
              </p>
            </div>

            <div style={cardBoxStyle('#4caf50', 'rgba(76, 175, 80, 0.08)')}>
              <h3 style={{ color: '#81c784', marginTop: 0, fontSize: '20px' }}>♠ Spades & ♣ Clubs</h3>
              <p style={{ marginBottom: 0, color: 'var(--text-primary)' }}>
                <strong>Enemies</strong> — Fight them to survive. Damage depends on their value and your weapon.
              </p>
            </div>

            <div style={cardBoxStyle('#9c27b0', 'rgba(156, 39, 176, 0.08)')}>
              <h3 style={{ color: '#ba68c8', marginTop: 0, fontSize: '20px' }}>🃏 Jokers</h3>
              <p style={{ marginBottom: 0, color: 'var(--text-primary)' }}>
                <strong>Chaos Cards</strong> — Added by Run Modifiers. Activate on reveal and cannot be skipped.
              </p>
            </div>
          </div>
        </section>

        {/* Gameplay */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={sectionTitleStyle}>Gameplay</h2>

          <div
            style={{
              background: 'var(--bg-panel)',
              padding: '26px',
              borderRadius: '10px',
              border: '1px solid var(--border)',
              marginBottom: '24px',
            }}
          >
            <h3 style={{ marginTop: 0, color: 'var(--text-primary)', fontSize: '20px' }}>Room Structure</h3>
            <ol style={{ paddingLeft: '28px' }}>
              <li style={{ marginBottom: '10px' }}>Four cards are revealed from the top of the deck</li>
              <li style={{ marginBottom: '10px' }}>You must pick exactly <strong style={{ color: 'var(--accent)' }}>3 cards</strong>, one at a time</li>
              <li style={{ marginBottom: '10px' }}>The 4th unpicked card becomes the <strong style={{ color: 'var(--accent)' }}>leftover card</strong></li>
              <li style={{ marginBottom: '10px' }}>The next room reveals 3 new cards plus the leftover card (4 total)</li>
              <li style={{ marginBottom: '10px' }}>If a room is skipped, no leftover carries over</li>
            </ol>
          </div>

          <div
            style={{
              background: 'var(--accent-dim)',
              padding: '18px 22px',
              borderRadius: '8px',
              border: '1px solid var(--accent-border)',
            }}
          >
            <h3 style={{ marginTop: 0, color: 'var(--accent)', fontSize: '18px' }}>⚠️ Important</h3>
            <p style={{ marginBottom: 0 }}>
              The order in which you pick cards matters. Choose strategically based on your current HP, equipped
              weapon, and what you want to leave behind.
            </p>
          </div>
        </section>

        {/* Combat */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={sectionTitleStyle}>Combat System</h2>

          <h3 style={{ color: 'var(--text-primary)' }}>Without a Weapon</h3>
          <p
            style={{
              padding: '16px',
              background: 'rgba(244, 67, 54, 0.1)',
              border: '1px solid rgba(244, 67, 54, 0.25)',
              borderRadius: '6px',
              marginBottom: '24px',
            }}
          >
            <strong style={{ color: '#f44336' }}>Damage = Enemy Value</strong>
            <br />
            Example: Fighting a 10 enemy barehanded deals 10 damage.
          </p>

          <h3 style={{ color: 'var(--text-primary)' }}>With a Weapon</h3>
          <p
            style={{
              padding: '16px',
              background: 'rgba(33, 150, 243, 0.1)',
              border: '1px solid rgba(33, 150, 243, 0.25)',
              borderRadius: '6px',
              marginBottom: '24px',
            }}
          >
            <strong style={{ color: '#64b5f6' }}>Damage = max(0, Enemy Value - Weapon Value)</strong>
            <br />
            Example: Fighting a 10 enemy with a 7 weapon deals only 3 damage.
          </p>
        </section>

        {/* Weapon Durability */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={sectionTitleStyle}>Weapon Durability</h2>

          <p
            style={{
              background: 'rgba(255, 193, 7, 0.08)',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 193, 7, 0.25)',
              marginBottom: '24px',
            }}
          >
            <strong style={{ color: '#ffd54f' }}>Weapons wear out!</strong> After defeating an enemy, your weapon
            can only defeat enemies with values <strong>equal to or lower</strong> than the one you just fought.
          </p>

          <div
            style={{
              background: 'var(--bg-panel)',
              padding: '22px',
              borderRadius: '10px',
              border: '1px solid var(--border)',
            }}
          >
            <h3 style={{ marginTop: 0, color: 'var(--text-primary)', fontSize: '18px' }}>Example</h3>
            <ol style={{ paddingLeft: '28px', marginBottom: 0 }}>
              <li style={{ marginBottom: '10px' }}>You equip a ♦7 weapon (fresh)</li>
              <li style={{ marginBottom: '10px' }}>You fight a ♠10 enemy (takes 3 damage)</li>
              <li style={{ marginBottom: '10px' }}>Your weapon is now worn and can only defeat enemies ≤ 10</li>
              <li style={{ marginBottom: '10px' }}>Fighting an 11 or higher would deal full damage</li>
            </ol>
          </div>
        </section>

        {/* Skip Mechanic */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={sectionTitleStyle}>Skip Room Mechanic</h2>

          <p>
            Before picking any cards in a room, you may choose to <strong style={{ color: 'var(--accent)' }}>skip the entire room</strong>.
            All cards are returned to the bottom of the deck. Joker rooms cannot be skipped.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '20px',
              marginTop: '24px',
            }}
          >
            <div style={cardBoxStyle('var(--accent-border)', 'var(--accent-dim)')}>
              <h3 style={{ marginTop: 0, color: 'var(--accent)', fontSize: '18px' }}>← Left to Right</h3>
              <p style={{ marginBottom: 0 }}>
                Cards return in order: Card 1, Card 2, Card 3, Card 4
              </p>
            </div>

            <div style={cardBoxStyle('var(--accent-border)', 'var(--accent-dim)')}>
              <h3 style={{ marginTop: 0, color: 'var(--accent)', fontSize: '18px' }}>Right to Left →</h3>
              <p style={{ marginBottom: 0 }}>
                Cards return in order: Card 4, Card 3, Card 2, Card 1
              </p>
            </div>
          </div>

          <p
            style={{
              marginTop: '24px',
              padding: '16px',
              background: 'rgba(244, 67, 54, 0.1)',
              border: '1px solid rgba(244, 67, 54, 0.2)',
              borderRadius: '6px',
            }}
          >
            <strong style={{ color: '#f44336' }}>Important:</strong> You cannot skip a room after picking even one card, and rooms containing Jokers cannot be skipped at all.
          </p>
        </section>

        {/* Run Modifiers */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={sectionTitleStyle}>Run Modifiers</h2>

          <p style={{ marginBottom: '24px' }}>
            After completing the base game at least once, you may choose Run Modifiers before starting a new run.
            Each modifier grants a powerful benefit with a severe downside, and <strong style={{ color: 'var(--accent)' }}>each selected modifier shuffles 1 Joker into the deck</strong>.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={cardBoxStyle('rgba(76, 175, 80, 0.3)', 'rgba(76, 175, 80, 0.06)')}>
              <h3 style={{ marginTop: 0, color: '#81c784', fontSize: '20px' }}>Juggernaut</h3>
              <p style={{ marginBottom: 0 }}>
                <strong style={{ color: '#81c784' }}>Effect:</strong> Reduce all incoming damage by 2 (minimum 1).<br />
                <strong style={{ color: '#ef5350' }}>Downside:</strong> Potions heal only 50% of their normal value.
              </p>
            </div>

            <div style={cardBoxStyle('rgba(156, 39, 176, 0.3)', 'rgba(156, 39, 176, 0.06)')}>
              <h3 style={{ marginTop: 0, color: '#ba68c8', fontSize: '20px' }}>Mutation</h3>
              <p style={{ marginBottom: 0 }}>
                <strong style={{ color: '#ba68c8' }}>Effect:</strong> Heal 2 HP after clearing each room.<br />
                <strong style={{ color: '#ef5350' }}>Downside:</strong> Reduce Maximum HP by 8.
              </p>
            </div>

            <div style={cardBoxStyle('rgba(244, 67, 54, 0.3)', 'rgba(244, 67, 54, 0.06)')}>
              <h3 style={{ marginTop: 0, color: '#e57373', fontSize: '20px' }}>Vampiric</h3>
              <p style={{ marginBottom: 0 }}>
                <strong style={{ color: '#e57373' }}>Effect:</strong> Heal 1 HP whenever you defeat a monster.<br />
                <strong style={{ color: '#ef5350' }}>Downside:</strong> Hearts become monsters.
              </p>
            </div>
          </div>
        </section>

        {/* Jokers */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={sectionTitleStyle}>Jokers</h2>

          <p style={{ marginBottom: '24px' }}>
            Jokers are chaos cards added to the dungeon by Run Modifiers. They activate immediately upon reveal,
            and the room containing them cannot be skipped.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={cardBoxStyle('rgba(156, 39, 176, 0.4)', 'rgba(156, 39, 176, 0.08)')}>
              <h3 style={{ marginTop: 0, color: '#ce93d8', fontSize: '20px' }}>🃏 Champion</h3>
              <p style={{ marginBottom: 0 }}>
                The Joker absorbs the power of the strongest monster still in the deck. The room becomes a solo
                boss encounter; defeating the Champion immediately clears the room.
              </p>
            </div>

            <div style={cardBoxStyle('rgba(156, 39, 176, 0.4)', 'rgba(156, 39, 176, 0.08)')}>
              <h3 style={{ marginTop: 0, color: '#ce93d8', fontSize: '20px' }}>🃏 Predator</h3>
              <p style={{ marginBottom: 0 }}>
                The strongest monster in the deck is duplicated four times, flooding the room. Two maximum-rank
                weapons are shuffled into the deck as compensation.
              </p>
            </div>

            <div style={cardBoxStyle('rgba(156, 39, 176, 0.4)', 'rgba(156, 39, 176, 0.08)')}>
              <h3 style={{ marginTop: 0, color: '#ce93d8', fontSize: '20px' }}>🃏 Forge World</h3>
              <p style={{ marginBottom: 0 }}>
                All weapons are removed from the deck and your equipped weapon is destroyed. Barehand attacks
                deal half damage for the rest of the run.
              </p>
            </div>
          </div>
        </section>

        {/* Win/Loss */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={sectionTitleStyle}>Win & Loss Conditions</h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '20px',
            }}
          >
            <div style={cardBoxStyle('rgba(76, 175, 80, 0.4)', 'rgba(76, 175, 80, 0.08)')}>
              <h3 style={{ marginTop: 0, color: '#81c784', fontSize: '20px' }}>🎉 Victory</h3>
              <p style={{ marginBottom: 0 }}>
                You win when the deck runs out and there are too few cards left to form another room.
              </p>
            </div>

            <div style={cardBoxStyle('rgba(244, 67, 54, 0.4)', 'rgba(244, 67, 54, 0.08)')}>
              <h3 style={{ marginTop: 0, color: '#e57373', fontSize: '20px' }}>💀 Defeat</h3>
              <p style={{ marginBottom: 0 }}>
                You lose if your HP drops to 0 or below at any point during the game.
              </p>
            </div>
          </div>
        </section>

        {/* Scoring */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={sectionTitleStyle}>Scoring</h2>

          <div
            style={{
              padding: '28px',
              background: 'var(--accent-dim)',
              borderRadius: '10px',
              border: '1px solid var(--accent-border)',
              textAlign: 'center',
            }}
          >
            <h3
              style={{
                fontSize: '22px',
                marginTop: 0,
                color: 'var(--accent)',
                fontFamily: '"Pirata One", Georgia, serif',
                fontWeight: 'normal',
                letterSpacing: '1px',
              }}
            >
              Final Score = Remaining HP + Sum of Defeated Enemy Values
            </h3>
            <p style={{ fontSize: '16px', marginBottom: 0, color: 'var(--text-secondary)' }}>
              Higher scores reward both survival and aggression.
            </p>
          </div>

          <div
            style={{
              marginTop: '20px',
              padding: '20px',
              background: 'var(--bg-panel)',
              borderRadius: '8px',
              border: '1px solid var(--border)',
            }}
          >
            <h4 style={{ marginTop: 0, color: 'var(--text-primary)', fontSize: '16px' }}>Example Score Calculation</h4>
            <ul style={{ paddingLeft: '28px', marginBottom: 0 }}>
              <li>Remaining HP: 15</li>
              <li>Defeated enemies: 3, 5, 7, 8, 10, 11 (total = 44)</li>
              <li>
                <strong style={{ color: 'var(--accent)' }}>Final Score: 15 + 44 = 59</strong>
              </li>
            </ul>
          </div>
        </section>

        {/* Tips */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={sectionTitleStyle}>Strategy Tips</h2>

          <ul style={{ paddingLeft: '28px' }}>
            <li style={{ marginBottom: '14px' }}>
              <strong style={{ color: 'var(--accent)' }}>Weapon management is key:</strong> A worn weapon is better than no weapon, but know its limits.
            </li>
            <li style={{ marginBottom: '14px' }}>
              <strong style={{ color: 'var(--accent)' }}>Health conservation:</strong> Don't waste health potions when you're already near max HP.
            </li>
            <li style={{ marginBottom: '14px' }}>
              <strong style={{ color: 'var(--accent)' }}>Use the skip wisely:</strong> If all 4 cards are bad, skipping can save your life. Choose the direction carefully based on when you want to see those cards again.
            </li>
            <li style={{ marginBottom: '14px' }}>
              <strong style={{ color: 'var(--accent)' }}>Plan ahead:</strong> Remember that one card will always be left over. Sometimes it's better to leave a health potion for the next room than a high-value enemy.
            </li>
            <li style={{ marginBottom: '14px' }}>
              <strong style={{ color: 'var(--accent)' }}>Modifiers are dangerous power:</strong> Each Joker added makes the dungeon more unstable. Don't greedily stack modifiers unless you're prepared for chaos.
            </li>
          </ul>
        </section>

        {/* CTA */}
        <div
          style={{
            padding: '36px',
            background: 'var(--accent-dim)',
            borderRadius: '12px',
            textAlign: 'center',
            color: 'var(--text-primary)',
            border: '1px solid var(--accent-border)',
            marginBottom: '40px',
          }}
        >
          <h2 style={{ marginTop: 0, fontFamily: '"Pirata One", Georgia, serif', fontSize: '32px', color: 'var(--accent)' }}>
            Ready to Descend?
          </h2>
          <Link
            to="/"
            style={{
              padding: '16px 36px',
              background: 'var(--accent-dim)',
              color: 'var(--accent)',
              border: '1px solid var(--accent-border)',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold',
              display: 'inline-block',
              fontSize: '18px',
              fontFamily: 'monospace',
              marginTop: '10px',
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
            Start Your Adventure →
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
