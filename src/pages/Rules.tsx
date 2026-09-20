// Game rules page: a rulebook "field manual" on the felt table

import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';

const SECTIONS = [
  { id: 'goal', title: 'The Goal' },
  { id: 'deck', title: 'The Deck' },
  { id: 'rooms', title: 'Rooms & Turns' },
  { id: 'combat', title: 'Combat & Weapons' },
  { id: 'skipping', title: 'Skipping a Room' },
  { id: 'endgame', title: 'Victory, Defeat & Score' },
  { id: 'tips', title: 'Strategy Tips' },
];

function Section({
  id,
  num,
  title,
  children,
}: Readonly<{ id: string; num: string; title: string; children: React.ReactNode }>) {
  return (
    <section id={id} className="section">
      <div className="section-head">
        <span className="section-num">{num}</span>
        <h2 className="section-title">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Callout({
  tone = 'note',
  title,
  children,
}: Readonly<{ tone?: 'note' | 'danger' | 'example'; title: string; children: React.ReactNode }>) {
  return (
    <div className={`callout callout--${tone}`}>
      <div className="callout__title">{title}</div>
      {children}
    </div>
  );
}

export function Rules() {
  return (
    <div className="rulebook-page">
      <style>{`
        html { scroll-behavior: smooth; }

        .rulebook-wrap { max-width: 1120px; margin: 0 auto; padding: 28px 24px 48px; }

        .rulebook-back {
          display: inline-block;
          padding: 10px 18px;
          margin-bottom: 24px;
          background: var(--accent-dim);
          color: var(--accent);
          border: 1px solid var(--accent-border);
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          transition: background 0.15s ease, border-color 0.15s ease;
        }
        .rulebook-back:hover { background: rgba(207, 216, 220, 0.22); border-color: var(--accent); }

        /* The manual sheet */
        .manual {
          --paper: #f7f8f6;
          --paper-edge: #e8ebe9;
          --ink: #17181a;
          --ink-soft: rgba(23, 24, 26, 0.74);
          --ink-mute: rgba(23, 24, 26, 0.5);
          --rule: rgba(23, 24, 26, 0.14);
          --rule-strong: rgba(23, 24, 26, 0.26);
          --steel: #4e6b73;
          --oxblood: #8c2f2f;
          background: linear-gradient(180deg, var(--paper) 0%, var(--paper-edge) 100%);
          border-radius: 14px;
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.05);
          display: grid;
          grid-template-columns: 264px 1fr;
          color: var(--ink-soft);
          line-height: 1.7;
          font-size: 16px;
        }

        .manual-rail {
          background: rgba(23, 24, 26, 0.04);
          border-right: 1px solid var(--rule);
          border-radius: 14px 0 0 14px;
          padding: 34px 26px;
        }
        .rail-sticky {
          position: sticky;
          top: 24px;
        }
        .rail-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.6px;
          text-transform: uppercase;
          color: var(--ink-mute);
          margin-bottom: 14px;
        }
        .rail-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2px; }
        .rail-link {
          display: flex;
          gap: 10px;
          align-items: baseline;
          padding: 7px 10px;
          border-radius: 7px;
          color: var(--ink-soft);
          text-decoration: none;
          font-size: 14px;
          transition: background 0.15s ease, color 0.15s ease;
        }
        .rail-link:hover { background: rgba(78, 107, 115, 0.12); color: var(--steel); }
        .rail-num { font-size: 11px; font-weight: 700; color: var(--steel); font-variant-numeric: tabular-nums; min-width: 16px; }

        .manual-body { padding: 44px 52px 52px; min-width: 0; }

        .manual-header { padding-bottom: 24px; border-bottom: 1px solid var(--rule); margin-bottom: 40px; }
        .kicker { font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--steel); margin-bottom: 10px; }
        .manual-title {
          margin: 0;
          font-family: "Pirata One", Georgia, serif;
          font-weight: normal;
          font-size: 56px;
          line-height: 1;
          letter-spacing: 1px;
          color: var(--ink);
        }
        .tagline { margin: 12px 0 0; font-size: 17px; font-style: italic; color: var(--ink-mute); text-wrap: pretty; }

        /* Sections */
        .section { margin-bottom: 52px; scroll-margin-top: 24px; }
        .section-head {
          display: flex;
          align-items: baseline;
          gap: 14px;
          padding-bottom: 10px;
          border-bottom: 1px solid var(--rule);
          margin-bottom: 20px;
        }
        .section-num { font-family: "Pirata One", Georgia, serif; font-size: 24px; line-height: 1; color: var(--steel); min-width: 34px; }
        .section-title {
          margin: 0;
          font-family: "Pirata One", Georgia, serif;
          font-weight: normal;
          font-size: 30px;
          letter-spacing: 0.5px;
          color: var(--ink);
          text-wrap: balance;
        }
        .section h3 { margin: 0 0 10px; font-size: 16px; font-weight: 700; color: var(--ink); letter-spacing: 0.2px; }
        .section p { margin: 0 0 16px; text-wrap: pretty; }
        .section ul, .section ol { margin: 0 0 16px; padding-left: 22px; }
        .section li { margin-bottom: 8px; }
        .section strong { color: var(--ink); }

        /* Callouts */
        .callout {
          border-left: 3px solid var(--rule-strong);
          background: rgba(23, 24, 26, 0.035);
          border-radius: 0 8px 8px 0;
          padding: 16px 18px;
          margin: 0 0 16px;
        }
        .callout__title { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; color: var(--ink-mute); }
        .callout p:last-child { margin-bottom: 0; }
        .callout--note { border-left-color: var(--steel); background: rgba(78, 107, 115, 0.09); }
        .callout--note .callout__title { color: var(--steel); }
        .callout--danger { border-left-color: var(--oxblood); background: rgba(140, 47, 47, 0.08); }
        .callout--danger .callout__title { color: var(--oxblood); }

        /* Card type entries */
        .card-types { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; }
        .card-type { background: #ffffff; border: 1px solid var(--rule); border-radius: 10px; padding: 18px; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); }
        .card-type--red { border-top: 3px solid var(--oxblood); }
        .card-type--black { border-top: 3px solid var(--ink); }
        .card-type__suit { font-size: 30px; line-height: 1; display: block; margin-bottom: 10px; }
        .card-type--red .card-type__suit { color: var(--oxblood); }
        .card-type--black .card-type__suit { color: var(--ink); }
        .card-type__name { font-size: 15px; font-weight: 700; color: var(--ink); margin-bottom: 6px; }
        .card-type__desc { font-size: 14px; color: var(--ink-soft); margin: 0; }

        /* Duo cards */
        .duo { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 16px; }
        .duo-card { border: 1px solid var(--rule); border-radius: 10px; padding: 16px 18px; background: rgba(255, 255, 255, 0.5); }
        .duo-card h4 { margin: 0 0 6px; font-size: 15px; color: var(--ink); }
        .duo-card p { margin: 0; font-size: 14px; }

        /* Score */
        .score-box { border: 1px solid var(--rule); border-radius: 10px; padding: 20px 22px; background: rgba(255, 255, 255, 0.5); margin-bottom: 16px; }
        .score-formula { margin: 0 0 8px; font-family: "Pirata One", Georgia, serif; font-size: 24px; color: var(--ink); text-align: center; letter-spacing: 0.5px; text-wrap: balance; }
        .score-sub { margin: 0; text-align: center; font-size: 14px; color: var(--ink-mute); }
        .score-calc { list-style: none; margin: 0; padding: 0; font-variant-numeric: tabular-nums; }
        .score-calc li { display: flex; justify-content: space-between; gap: 16px; padding: 7px 0; border-bottom: 1px dashed var(--rule); font-size: 14px; }
        .score-calc li:last-child { border-bottom: none; font-weight: 700; color: var(--steel); }

        /* Tips */
        .tips { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 14px; }
        .tips li { padding-left: 20px; position: relative; }
        .tips li::before { content: ""; position: absolute; left: 0; top: 0.55em; width: 7px; height: 7px; border-radius: 50%; background: var(--steel); }

        /* CTA */
        .cta { margin-top: 8px; background: #17181a; border-radius: 12px; padding: 34px; text-align: center; box-shadow: inset 0 0 0 1px rgba(207, 216, 220, 0.30); }
        .cta h2 { margin: 0 0 6px; font-family: "Pirata One", Georgia, serif; font-weight: normal; font-size: 30px; color: #eef1f0; }
        .cta p { margin: 0 0 18px; color: rgba(243, 239, 226, 0.7); font-size: 15px; }
        .cta a {
          display: inline-block;
          padding: 14px 32px;
          border-radius: 8px;
          background: var(--accent);
          color: #17181a;
          font-weight: 700;
          text-decoration: none;
          font-size: 16px;
          transition: transform 0.12s ease, background 0.15s ease;
        }
        .cta a:hover { background: #e3ebee; transform: translateY(-1px); }
        .cta a:active { transform: scale(0.98); }

        @media (max-width: 900px) {
          .manual { grid-template-columns: 1fr; }
          .manual-rail { border-right: none; border-bottom: 1px solid var(--rule); border-radius: 14px 14px 0 0; padding: 22px 24px; }
          .rail-sticky { position: static; }
          .rail-list { flex-direction: row; flex-wrap: wrap; gap: 6px; }
          .rail-link { background: rgba(23, 24, 26, 0.05); padding: 6px 10px; }
          .manual-body { padding: 32px 24px 40px; }
          .manual-title { font-size: 44px; }
          .section-title { font-size: 26px; }
        }

        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
        }
      `}</style>

      <div className="rulebook-wrap">
        <Link to="/" className="rulebook-back">← Back to Game</Link>

        <div className="manual">
          <nav className="manual-rail" aria-label="Rulebook contents">
            <div className="rail-sticky">
              <div className="rail-label">Contents</div>
              <ol className="rail-list">
                {SECTIONS.map((section, i) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="rail-link">
                      <span className="rail-num">{String(i + 1).padStart(2, '0')}</span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <main className="manual-body">
            <header className="manual-header">
              <div className="kicker">Rulebook</div>
              <h1 className="manual-title">Scoundrel</h1>
              <p className="tagline">A solo card game about surviving a deck of monsters.</p>
            </header>

            <Section id="goal" num="01" title="The Goal">
              <p>
                You work through a deck of monsters, potions, and weapons, trying to reach the end of it alive.
                There is no opponent to beat. The deck is the whole game.
              </p>
              <p>
                Every card does one of three things: it costs you health, restores it, or arms you. When the
                cards run out, your score is whatever health you have left, plus the value of every monster you
                killed.
              </p>
            </Section>

            <Section id="deck" num="02" title="The Deck">
              <p>
                Take a normal 52-card deck and remove every Ace, along with the Jacks, Queens, and Kings of
                hearts and diamonds. That leaves <strong>42 cards</strong>, and each suit has one job.
              </p>
              <div className="card-types">
                <div className="card-type card-type--red">
                  <span className="card-type__suit">♥</span>
                  <div className="card-type__name">Hearts: Potions</div>
                  <p className="card-type__desc">Playing a heart heals you by its number. A 7 of hearts gives back 7 health.</p>
                </div>
                <div className="card-type card-type--red">
                  <span className="card-type__suit">♦</span>
                  <div className="card-type__name">Diamonds: Weapons</div>
                  <p className="card-type__desc">Playing a diamond arms you. You can only hold one weapon at a time.</p>
                </div>
                <div className="card-type card-type--black">
                  <span className="card-type__suit">♠ ♣</span>
                  <div className="card-type__name">Spades &amp; Clubs: Monsters</div>
                  <p className="card-type__desc">Playing one means you have to fight it. Its number is how hard it hits.</p>
                </div>
              </div>
              <p style={{ marginTop: '16px' }}>You begin with <strong>20 health</strong>.</p>
            </Section>

            <Section id="rooms" num="03" title="Rooms &amp; Turns">
              <p>
                The game runs room by room. Each room turns over four cards, and you play three of them, one at a
                time, in whatever order you like.
              </p>
              <p>
                The card you leave unplayed is the leftover. It stays on the table and becomes one of the four
                cards in the next room, so the last card of a room is never discarded. You are choosing which
                card to carry forward.
              </p>
              <Callout tone="note" title="What you leave behind">
                <p>
                  Picking a room means choosing which card you want to face again next turn. Plan around the one
                  you leave on the table.
                </p>
              </Callout>
            </Section>

            <Section id="combat" num="04" title="Combat &amp; Weapons">
              <h3>Fighting bare-handed</h3>
              <p>
                Playing a monster means it attacks you. With nothing in hand, you take the full hit. A 9 of
                spades costs you 9 health.
              </p>

              <h3>Fighting with a weapon</h3>
              <p>
                A weapon absorbs part of the blow. Subtract the weapon's number from the monster's: a 7 weapon
                against a 9 monster leaves only 2 damage. A weapon that is at least as big as the monster blocks
                the attack completely.
              </p>

              <Callout tone="danger" title="Weapons wear out">
                <p>
                  Once you beat a monster, your weapon is only good against monsters of that size or smaller for
                  the rest of its life. A 7 weapon that beats a 9 is capped at 9. It still handles smaller
                  monsters, but anything bigger gets through and you take the full hit.
                </p>
              </Callout>
              <p>
                You can replace a worn weapon by playing a new diamond. The new one starts fresh, with no cap.
              </p>
            </Section>

            <Section id="skipping" num="05" title="Skipping a Room">
              <p>
                Before you play anything, you can skip the room entirely. All four cards go to the bottom of the
                deck, and a new room takes their place.
              </p>
              <p>You choose which end they go to, and that order decides when they come back around.</p>
              <div className="duo">
                <div className="duo-card">
                  <h4>Left to right</h4>
                  <p>The leftmost card comes back first. The rightmost is buried deepest.</p>
                </div>
                <div className="duo-card">
                  <h4>Right to left</h4>
                  <p>The rightmost card comes back first. The leftmost is buried deepest.</p>
                </div>
              </div>
              <Callout tone="danger" title="Only before you pick">
                <p>Once you have played a single card, skipping is off the table for that room.</p>
              </Callout>
            </Section>

            <Section id="endgame" num="06" title="Victory, Defeat &amp; Score">
              <p>
                You win by outlasting the deck. When there are not enough cards left to deal a full room, the run
                is over and you have made it through.
              </p>
              <p>You lose the moment your health reaches zero. There is no way back.</p>
              <div className="score-box">
                <p className="score-formula">Your score is your remaining health plus the value of every monster you killed.</p>
                <p className="score-sub">Fights are what raise your score, so the best runs win a lot without bleeding health.</p>
              </div>
              <h3>An example run</h3>
              <ul className="score-calc">
                <li><span>Health left at the end</span><span>15</span></li>
                <li><span>Monsters killed (3, 5, 7, 8, 10, 11)</span><span>44</span></li>
                <li><span>Final score</span><span>59</span></li>
              </ul>
            </Section>

            <Section id="tips" num="07" title="Strategy Tips">
              <ul className="tips">
                <li>A capped weapon still beats fighting bare-handed, so keep it until a bigger diamond turns up.</li>
                <li>Health stops at 20, so a potion played at full health is wasted.</li>
                <li>If all four cards in a room hurt more than they help, skip it and take a fresh one.</li>
                <li>You always leave one card behind, and a potion saved for next turn often beats a monster you would have to fight now.</li>
              </ul>
            </Section>

            <div className="cta">
              <h2>Think you can clear the deck?</h2>
              <p>Deal yourself in and find out.</p>
              <Link to="/">Start a game →</Link>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
