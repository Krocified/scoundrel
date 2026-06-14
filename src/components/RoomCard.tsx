// Room card component - switches between PC and mobile variants

import { useState, useEffect } from 'react';
import type { Card } from '../types/game';
import { PCRoomCard } from './roomCard/PCRoomCard';
import { MobileRoomCard } from './roomCard/MobileRoomCard';

interface RoomCardProps {
  card: Card;
  index: number;
  isGamePlaying: boolean;
  onPickCard: (index: number) => void;
}

/**
 * Hook to detect if the viewport is mobile-sized
 * Uses matchMedia to listen for screen width changes
 */
function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(() => {
    // Safe default for SSR
    if (typeof globalThis.window === 'undefined') return false;
    return globalThis.window.matchMedia('(max-width: 768px)').matches;
  });

  useEffect(() => {
    if (typeof globalThis.window === 'undefined') return;

    const mediaQuery = globalThis.window.matchMedia('(max-width: 768px)');
    
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };

    // Initial check
    handleChange(mediaQuery);

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return isMobile;
}

/**
 * RoomCard component that automatically switches between PC and mobile layouts
 * based on viewport width
 */
export function RoomCard({ card, index, isGamePlaying, onPickCard }: Readonly<RoomCardProps>) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileRoomCard card={card} index={index} isGamePlaying={isGamePlaying} onPickCard={onPickCard} />;
  }

  return <PCRoomCard card={card} index={index} isGamePlaying={isGamePlaying} onPickCard={onPickCard} />;
}
