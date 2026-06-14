// Persistent storage for unlocked power-ups (localStorage)

const STORAGE_KEY = 'scoundrel-power-ups';

export interface PowerUpState {
  unlockedPowerUps: string[];
}

export function loadPowerUps(): PowerUpState {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      console.error('Failed to parse power-ups from localStorage');
    }
  }
  return { unlockedPowerUps: [] };
}

export function savePowerUp(id: string): void {
  const state = loadPowerUps();
  if (!state.unlockedPowerUps.includes(id)) {
    state.unlockedPowerUps.push(id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
}

export function resetPowerUps(): void {
  localStorage.removeItem(STORAGE_KEY);
}
