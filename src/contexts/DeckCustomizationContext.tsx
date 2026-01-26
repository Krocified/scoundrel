// Context for managing deck customization settings with localStorage persistence

import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';

interface DeckCustomizationSettings {
  useDistinctColors: boolean;
  deckTheme: string;
}

interface DeckCustomizationContextType {
  settings: DeckCustomizationSettings;
  toggleDistinctColors: () => void;
  setDeckTheme: (theme: string) => void;
}

const DeckCustomizationContext = createContext<DeckCustomizationContextType | undefined>(undefined);

const STORAGE_KEY = 'scoundrel-deck-settings';

export function DeckCustomizationProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [settings, setSettings] = useState<DeckCustomizationSettings>(() => {
    // Load from localStorage on initial mount
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse deck settings from localStorage', e);
      }
    }
    // Default to distinct colors and classic theme
    return { useDistinctColors: true, deckTheme: 'classic' };
  });

  // Save to localStorage whenever settings change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const toggleDistinctColors = () => {
    setSettings(prev => ({ ...prev, useDistinctColors: !prev.useDistinctColors }));
  };

  const setDeckTheme = (theme: string) => {
    setSettings(prev => ({ ...prev, deckTheme: theme }));
  };

  const value = useMemo(() => ({ settings, toggleDistinctColors, setDeckTheme }), [settings]);

  return (
    <DeckCustomizationContext.Provider value={value}>
      {children}
    </DeckCustomizationContext.Provider>
  );
}

export function useDeckCustomization() {
  const context = useContext(DeckCustomizationContext);
  if (!context) {
    throw new Error('useDeckCustomization must be used within DeckCustomizationProvider');
  }
  return context;
}
