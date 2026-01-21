// Game rules page

import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';

export function Rules() {
  return (
    <div style={{ 
      padding: '40px', 
      maxWidth: '900px', 
      margin: '0 auto', 
      fontFamily: 'Georgia, serif',
      lineHeight: '1.6',
      color: '#333'
    }}>
      <Link 
        to="/" 
        style={{
          padding: '10px 20px',
          background: '#607d8b',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          textDecoration: 'none',
          fontWeight: 'bold',
          display: 'inline-block',
          marginBottom: '30px',
          fontFamily: 'monospace'
        }}
      >
        ← Back to Game
      </Link>

      <h1 style={{ 
        fontSize: '48px', 
        marginBottom: '10px',
        fontFamily: 'monospace',
        color: '#2c3e50'
      }}>
        🃏 SCOUNDREL
      </h1>
      <p style={{ 
        fontSize: '20px', 
        color: '#7f8c8d',
        marginBottom: '40px',
        fontStyle: 'italic'
      }}>
        A Dungeon Crawler Card Game
      </p>

      {/* Overview */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ 
          fontSize: '32px', 
          color: '#34495e',
          borderBottom: '3px solid #3498db',
          paddingBottom: '10px',
          marginBottom: '20px'
        }}>
          Overview
        </h2>
        <p>
          Scoundrel is a solo dungeon crawler card game where you must carefully navigate through rooms filled with enemies, 
          weapons, and health potions. Your goal is to survive as long as possible and defeat as many enemies as you can 
          to maximize your score.
        </p>
      </section>

      {/* Setup */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ 
          fontSize: '32px', 
          color: '#34495e',
          borderBottom: '3px solid #3498db',
          paddingBottom: '10px',
          marginBottom: '20px'
        }}>
          Setup
        </h2>
        <ul style={{ paddingLeft: '30px' }}>
          <li style={{ marginBottom: '10px' }}>Start with a standard 52-card deck</li>
          <li style={{ marginBottom: '10px' }}>Remove all Aces, and the Kings, Queens, and Jacks of Hearts and Diamonds</li>
          <li style={{ marginBottom: '10px' }}>This leaves you with <strong>42 cards</strong></li>
          <li style={{ marginBottom: '10px' }}>You start with <strong>20 HP</strong></li>
        </ul>
      </section>

      {/* Card Types */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ 
          fontSize: '32px', 
          color: '#34495e',
          borderBottom: '3px solid #3498db',
          paddingBottom: '10px',
          marginBottom: '20px'
        }}>
          Card Types
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginTop: '20px'
        }}>
          <div style={{ 
            padding: '20px', 
            background: '#ffe6f0', 
            borderRadius: '8px',
            border: '3px solid #e91e63'
          }}>
            <h3 style={{ color: '#e91e63', marginTop: 0 }}>♥ Hearts</h3>
            <p style={{ marginBottom: 0 }}>
              <strong>Health Potions</strong> - Restore HP equal to the card's value. Cannot exceed 20 HP.
            </p>
          </div>

          <div style={{ 
            padding: '20px', 
            background: '#e3f2fd', 
            borderRadius: '8px',
            border: '3px solid #2196f3'
          }}>
            <h3 style={{ color: '#2196f3', marginTop: 0 }}>♦ Diamonds</h3>
            <p style={{ marginBottom: 0 }}>
              <strong>Weapons</strong> - Equip to reduce damage from enemies. Only one weapon can be equipped at a time.
            </p>
          </div>

          <div style={{ 
            padding: '20px', 
            background: '#e8f5e9', 
            borderRadius: '8px',
            border: '3px solid #4caf50'
          }}>
            <h3 style={{ color: '#4caf50', marginTop: 0 }}>♠ Spades & ♣ Clubs</h3>
            <p style={{ marginBottom: 0 }}>
              <strong>Enemies</strong> - Fight them to survive. Damage depends on their value and your weapon.
            </p>
          </div>
        </div>
      </section>

      {/* Gameplay */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ 
          fontSize: '32px', 
          color: '#34495e',
          borderBottom: '3px solid #3498db',
          paddingBottom: '10px',
          marginBottom: '20px'
        }}>
          Gameplay
        </h2>
        
        <div style={{ 
          background: '#f8f9fa',
          padding: '25px',
          borderRadius: '8px',
          border: '1px solid #dee2e6',
          marginBottom: '20px'
        }}>
          <h3 style={{ marginTop: 0, color: '#495057' }}>Room Structure</h3>
          <ol style={{ paddingLeft: '30px' }}>
            <li style={{ marginBottom: '10px' }}>Four cards are revealed from the top of the deck</li>
            <li style={{ marginBottom: '10px' }}>You must pick exactly <strong>3 cards</strong>, one at a time</li>
            <li style={{ marginBottom: '10px' }}>The 4th unpicked card becomes the <strong>leftover card</strong></li>
            <li style={{ marginBottom: '10px' }}>The next room reveals 3 new cards plus the leftover card (4 total)</li>
            <li style={{ marginBottom: '10px' }}>This continues until you win or lose</li>
          </ol>
        </div>

        <div style={{ 
          background: '#fff3cd',
          padding: '20px',
          borderRadius: '8px',
          border: '2px solid #ffc107',
          marginBottom: '20px'
        }}>
          <h3 style={{ marginTop: 0, color: '#856404' }}>⚠️ Important</h3>
          <p style={{ marginBottom: 0 }}>
            The order in which you pick cards matters! Choose strategically based on your current HP and equipped weapon.
          </p>
        </div>
      </section>

      {/* Combat */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ 
          fontSize: '32px', 
          color: '#34495e',
          borderBottom: '3px solid #3498db',
          paddingBottom: '10px',
          marginBottom: '20px'
        }}>
          Combat System
        </h2>

        <h3 style={{ color: '#495057' }}>Without a Weapon</h3>
        <p style={{ 
          padding: '15px', 
          background: '#f8d7da',
          border: '1px solid #f5c6cb',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          <strong>Damage = Enemy Value</strong><br />
          Example: Fighting a 10 enemy without a weapon deals 10 damage to you.
        </p>

        <h3 style={{ color: '#495057' }}>With a Weapon</h3>
        <p style={{ 
          padding: '15px', 
          background: '#d1ecf1',
          border: '1px solid #bee5eb',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          <strong>Damage = Enemy Value - Weapon Value</strong><br />
          Example: Fighting a 10 enemy with a 7 weapon deals only 3 damage to you.
        </p>
      </section>

      {/* Weapon Durability */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ 
          fontSize: '32px', 
          color: '#34495e',
          borderBottom: '3px solid #3498db',
          paddingBottom: '10px',
          marginBottom: '20px'
        }}>
          Weapon Durability
        </h2>
        
        <p style={{ 
          background: '#fff3cd',
          padding: '20px',
          borderRadius: '8px',
          border: '2px solid #ffc107',
          marginBottom: '20px'
        }}>
          <strong>Weapons wear out!</strong> After defeating an enemy, your weapon can only defeat enemies with 
          values <strong>equal to or lower</strong> than the one you just fought.
        </p>

        <div style={{ 
          background: '#e7f3ff',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #b3d9ff'
        }}>
          <h3 style={{ marginTop: 0, color: '#004085' }}>Example</h3>
          <ol style={{ paddingLeft: '30px', marginBottom: 0 }}>
            <li style={{ marginBottom: '10px' }}>You equip a ♦7 weapon (fresh)</li>
            <li style={{ marginBottom: '10px' }}>You fight a ♠10 enemy (takes 3 damage)</li>
            <li style={{ marginBottom: '10px' }}>Your weapon is now worn and can only defeat enemies ≤ 10</li>
            <li style={{ marginBottom: '10px' }}>You can still fight another ♠10, but fighting an 11 or higher would deal full damage</li>
          </ol>
        </div>
      </section>

      {/* Skip Mechanic */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ 
          fontSize: '32px', 
          color: '#34495e',
          borderBottom: '3px solid #3498db',
          paddingBottom: '10px',
          marginBottom: '20px'
        }}>
          Skip Room Mechanic
        </h2>
        
        <p>
          Before picking any cards in a room, you may choose to <strong>skip the entire room</strong>. 
          All 4 cards are returned to the bottom of the deck.
        </p>

        <div style={{ 
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          marginTop: '20px'
        }}>
          <div style={{ 
            padding: '20px',
            background: '#fff8e1',
            borderRadius: '8px',
            border: '2px solid #ffb300'
          }}>
            <h3 style={{ marginTop: 0, color: '#f57c00' }}>← Left to Right</h3>
            <p style={{ marginBottom: 0 }}>
              Cards are placed on the bottom of the deck in order: Card 1, Card 2, Card 3, Card 4
            </p>
          </div>

          <div style={{ 
            padding: '20px',
            background: '#fff8e1',
            borderRadius: '8px',
            border: '2px solid #ffb300'
          }}>
            <h3 style={{ marginTop: 0, color: '#f57c00' }}>Right to Left →</h3>
            <p style={{ marginBottom: 0 }}>
              Cards are placed on the bottom of the deck in order: Card 4, Card 3, Card 2, Card 1
            </p>
          </div>
        </div>

        <p style={{ 
          marginTop: '20px',
          padding: '15px',
          background: '#ffebee',
          border: '1px solid #ef9a9a',
          borderRadius: '4px'
        }}>
          <strong>Important:</strong> You cannot skip a room after picking even one card!
        </p>
      </section>

      {/* Win/Loss */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ 
          fontSize: '32px', 
          color: '#34495e',
          borderBottom: '3px solid #3498db',
          paddingBottom: '10px',
          marginBottom: '20px'
        }}>
          Win & Loss Conditions
        </h2>

        <div style={{ 
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px'
        }}>
          <div style={{ 
            padding: '25px',
            background: '#d4edda',
            borderRadius: '8px',
            border: '3px solid #28a745'
          }}>
            <h3 style={{ marginTop: 0, color: '#155724' }}>🎉 Victory</h3>
            <p style={{ marginBottom: 0 }}>
              You win when the deck runs out and there are fewer than 4 cards left 
              (not enough to form a complete room).
            </p>
          </div>

          <div style={{ 
            padding: '25px',
            background: '#f8d7da',
            borderRadius: '8px',
            border: '3px solid #dc3545'
          }}>
            <h3 style={{ marginTop: 0, color: '#721c24' }}>💀 Defeat</h3>
            <p style={{ marginBottom: 0 }}>
              You lose if your HP drops to 0 or below at any point during the game.
            </p>
          </div>
        </div>
      </section>

      {/* Scoring */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ 
          fontSize: '32px', 
          color: '#34495e',
          borderBottom: '3px solid #3498db',
          paddingBottom: '10px',
          marginBottom: '20px'
        }}>
          Scoring
        </h2>

        <div style={{ 
          padding: '30px',
          background: '#f0f4c3',
          borderRadius: '8px',
          border: '3px solid #aed581',
          textAlign: 'center'
        }}>
          <h3 style={{ 
            fontSize: '28px',
            marginTop: 0,
            color: '#558b2f'
          }}>
            Final Score = Remaining HP + Sum of Defeated Enemy Values
          </h3>
          <p style={{ 
            fontSize: '18px',
            marginBottom: 0,
            color: '#33691e'
          }}>
            Higher scores indicate better strategic play!
          </p>
        </div>

        <div style={{ 
          marginTop: '20px',
          padding: '20px',
          background: '#e8eaf6',
          borderRadius: '8px',
          border: '1px solid #c5cae9'
        }}>
          <h4 style={{ marginTop: 0, color: '#3f51b5' }}>Example Score Calculation</h4>
          <ul style={{ paddingLeft: '30px', marginBottom: 0 }}>
            <li>Remaining HP: 15</li>
            <li>Defeated enemies: 3, 5, 7, 8, 10, 11 (total = 44)</li>
            <li><strong>Final Score: 15 + 44 = 59</strong></li>
          </ul>
        </div>
      </section>

      {/* Tips */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ 
          fontSize: '32px', 
          color: '#34495e',
          borderBottom: '3px solid #3498db',
          paddingBottom: '10px',
          marginBottom: '20px'
        }}>
          Strategy Tips
        </h2>

        <ul style={{ paddingLeft: '30px' }}>
          <li style={{ marginBottom: '15px' }}>
            <strong>Weapon management is key:</strong> A worn weapon is better than no weapon, but know its limits.
          </li>
          <li style={{ marginBottom: '15px' }}>
            <strong>Health conservation:</strong> Don't waste health potions when you're already near max HP.
          </li>
          <li style={{ marginBottom: '15px' }}>
            <strong>Use the skip wisely:</strong> If all 4 cards are bad, skipping can save your life. Choose the direction carefully 
            based on when you want to see those cards again.
          </li>
          <li style={{ marginBottom: '15px' }}>
            <strong>Plan ahead:</strong> Remember that one card will always be left over. Sometimes it's better to leave 
            a health potion for the next room than a high-value enemy.
          </li>
          <li style={{ marginBottom: '15px' }}>
            <strong>Order matters:</strong> Grab that weapon before fighting the enemy, or heal before the next fight.
          </li>
        </ul>
      </section>

      {/* Footer */}
      <div style={{ 
        marginTop: '60px',
        padding: '30px',
        background: '#2c3e50',
        borderRadius: '8px',
        textAlign: 'center',
        color: 'white'
      }}>
        <h2 style={{ marginTop: 0 }}>Ready to Play?</h2>
        <Link 
          to="/" 
          style={{
            padding: '15px 30px',
            background: '#27ae60',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            textDecoration: 'none',
            fontWeight: 'bold',
            display: 'inline-block',
            fontSize: '18px',
            fontFamily: 'monospace',
            marginTop: '10px'
          }}
        >
          Start Your Adventure →
        </Link>
      </div>

      <Footer />
    </div>
  );
}
