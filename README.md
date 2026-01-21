# 🃏 Scoundrel

> A strategic single-player dungeon crawler card game built with React + TypeScript

**[Play Live Demo](https://kro-scoundrel.vercel.app/) | [Read the Rules](https://kro-scoundrel.vercel.app/rules)**

---

## 🎮 About

Scoundrel is a roguelike card game where you navigate through dangerous rooms filled with enemies, weapons, and health potions. Using a modified 42-card deck, every decision matters—pick the wrong card and you might not survive!

**Key Features:**
- 🎯 Strategic card selection with permanent consequences
- ⚔️ Unique weapon durability system
- 🔄 Room skipping mechanic with directional control
- 📊 Score-based progression system
- 🎨 Clean, intuitive UI with real-time feedback

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

That's it! Start playing immediately.

---

## 🎲 How to Play

### The Basics
- You start with **20 HP**
- Each room reveals **4 cards** from the deck
- You must pick **exactly 3 cards**, one at a time
- The 4th card carries over to the next room

### Card Types

| Suit | Type | Effect |
|------|------|--------|
| ♥ Hearts | Health Potion | Restore HP equal to card value (max 20) |
| ♦ Diamonds | Weapon | Equip to reduce enemy damage |
| ♠ Spades | Enemy | Fight! Take damage based on card value |
| ♣ Clubs | Enemy | Fight! Take damage based on card value |

### Combat System

**Without a weapon:**
- Damage = Enemy Value
- Example: ♠10 deals 10 damage

**With a weapon:**
- Damage = Enemy Value - Weapon Value
- Example: ♠10 vs ♦7 weapon = 3 damage
- **Weapon durability decreases after use!**

### Weapon Durability
After defeating an enemy, your weapon can only defeat enemies with values **≤** the one you just fought.

**Example:**
1. Equip ♦7 weapon (fresh)
2. Defeat ♠10 enemy → weapon now limited to enemies ≤10
3. Can still defeat another ♠10
4. Cannot defeat ♠11 or higher (weapon becomes useless)

### Skip Mechanic
Before picking any cards, you can **skip the entire room**:
- **Left → Right**: Cards return to bottom in order 1,2,3,4
- **Right → Left**: Cards return to bottom in order 4,3,2,1

Use this strategically when all cards are bad!

### Win & Lose Conditions

**🎉 Victory:** Deck runs out with fewer than 4 cards remaining

**💀 Defeat:** HP reaches 0

### Scoring
```
Final Score = Remaining HP + Sum of All Defeated Enemy Values
```

Higher scores indicate better strategic play!

---

## 🏗️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **React Router** - Client-side routing
- **Pure CSS** - No UI frameworks, clean inline styles

**No game dependencies** - All game logic is custom-built!

---

## 🧪 Testing

All game systems are thoroughly tested with comprehensive unit tests.

**Run tests:**
1. Start dev server: `npm run dev`
2. Navigate to `/dev`
3. Click "Run All Tests"
4. Check browser console (F12) for results

**Test Coverage:**
- ✅ Deck creation & shuffling
- ✅ Card type classification
- ✅ Room management & skip mechanic
- ✅ Weapon equip & durability
- ✅ Combat & damage calculation
- ✅ Card action resolution
- ✅ Game controller & win/loss

---

## 🛠️ Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

---

## 📝 Game Rules

For complete rules, visit `/rules` in the app or see [GAME_RULES.md](GAME_RULES.md).

---

## 🎨 Design Philosophy

**Code:**
- Component-based architecture
- Pure functions for game logic (no side effects)
- TypeScript for type safety
- Comprehensive test coverage
- Clean, readable code

**UI:**
- Minimal and functional design
- Card-first visual hierarchy
- Real-time feedback
- No clutter, just gameplay
- Accessible (keyboard navigation, tooltips)

**Gameplay:**
- Easy to learn, hard to master
- Strategic decision-making
- Quick games (~5-10 minutes)
- High replayability

---

## 🤝 Contributing

This is a personal project, but feel free to fork and experiment!

---

## 📜 License

MIT License - feel free to use this project as you wish.

---

## 🎲 Ready to Play?

```bash
npm install && npm run dev
```

**Good luck, Scoundrels!** 🃏✨

---

Made by Michael Jong
