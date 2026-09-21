// The room dealt onto a mat. Sweep the cards left/right (drag, gutters, or arrows) to skip.

import { useRef, useState } from 'react';
import type { Card } from '../types/game';
import { DeckDisplay } from './DeckDisplay';
import { RoomCard } from './RoomCard';
import { PickedCardPlaceholder } from './PickedCardPlaceholder';

type SkipDirection = 'left-to-right' | 'right-to-left';

interface RoomMatProps {
  cards: Card[];
  isGamePlaying: boolean;
  canSkip: boolean;
  cardsInDeck: number;
  onPickCard: (index: number) => void;
  onSkip: (direction: SkipDirection) => void;
}

const SLOTS = 4;

function prefersReducedMotion(): boolean {
  return globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

export function RoomMat({
  cards,
  isGamePlaying,
  canSkip,
  cardsInDeck,
  onPickCard,
  onSkip,
}: Readonly<RoomMatProps>) {
  const matRef = useRef<HTMLDivElement>(null);
  const roomRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ id: number; x: number; moved: boolean; dir: SkipDirection } | null>(null);
  const sweepingRef = useRef(false);
  const suppressClickRef = useRef(false);
  const [armed, setArmed] = useState<'left' | 'right' | null>(null);
  const [active, setActive] = useState(false);

  const getSlots = (): HTMLElement[] => {
    const room = roomRef.current;
    if (!room) return [];
    return [...room.children].filter(
      (el): el is HTMLElement => !el.classList.contains('room__deck')
    );
  };

  const clearSlots = (slots: HTMLElement[]) => {
    slots.forEach((s) => {
      s.style.transition = '';
      s.style.transform = '';
      s.style.opacity = '';
      s.style.zIndex = '';
    });
  };

  const sweep = (direction: SkipDirection) => {
    if (sweepingRef.current || !canSkip) return;
    const slots = getSlots();
    if (slots.length === 0) return;

    sweepingRef.current = true;
    setActive(true);
    const reduced = prefersReducedMotion();
    const centers = slots.map((s) => s.offsetLeft + s.offsetWidth / 2);
    const anchorIdx = direction === 'left-to-right' ? slots.length - 1 : 0;
    const anchor = centers[anchorIdx];
    const rest: { dx: number; rot: number }[] = [];

    slots.forEach((s, i) => {
      const landPos = direction === 'left-to-right' ? i : slots.length - 1 - i;
      const dx = anchor - centers[i];
      const rot = i - (slots.length - 1) / 2;
      rest.push({ dx, rot });
      s.style.zIndex = String(landPos + 1);
      s.style.transition = reduced
        ? 'none'
        : `transform 260ms var(--ease-out) ${landPos * 55}ms, opacity 200ms linear ${landPos * 55}ms`;
      s.style.transform = `translateX(${dx}px) rotate(${rot}deg)`;
    });

    const gatherMs = reduced ? 0 : 260 + (slots.length - 1) * 55 + 40;
    window.setTimeout(() => {
      const deck = deckRef.current;
      const target = deck && deck.offsetWidth ? deck.offsetLeft + deck.offsetWidth / 2 : anchor;
      const shift = target - anchor;
      slots.forEach((s, i) => {
        s.style.transition = reduced
          ? 'none'
          : 'transform 320ms var(--ease-out), opacity 260ms var(--ease-out)';
        s.style.transform = `translateX(${rest[i].dx + shift}px) rotate(${rest[i].rot}deg) scale(.9)`;
        s.style.opacity = '0';
      });
      window.setTimeout(() => {
        clearSlots(slots);
        sweepingRef.current = false;
        setArmed(null);
        setActive(false);
        onSkip(direction);
      }, reduced ? 0 : 340);
    }, gatherMs);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!isGamePlaying || sweepingRef.current) return;
    if ((e.target as HTMLElement).closest('.gutter')) return;
    suppressClickRef.current = false;
    dragRef.current = { id: e.pointerId, x: e.clientX, moved: false, dir: 'left-to-right' };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const drag = dragRef.current;
    if (!drag || e.pointerId !== drag.id || !canSkip) return;
    const dx = e.clientX - drag.x;
    if (Math.abs(dx) < 6) return;

    if (!drag.moved) {
      matRef.current?.setPointerCapture(e.pointerId);
      setActive(true);
    }
    drag.moved = true;
    drag.dir = dx > 0 ? 'left-to-right' : 'right-to-left';
    const slots = getSlots();
    const dirRight = dx > 0;
    const centers = slots.map((s) => s.offsetLeft + s.offsetWidth / 2);
    const anchor = dirRight ? centers[centers.length - 1] : centers[0];

    slots.forEach((s, i) => {
      const limit = anchor - centers[i];
      const t = dirRight ? Math.min(dx, Math.max(0, limit)) : Math.max(dx, Math.min(0, limit));
      s.style.transition = 'none';
      s.style.transform = `translateX(${t}px)`;
      s.style.zIndex = String(dirRight ? i + 1 : slots.length - i);
    });

    setArmed(dx < -60 ? 'left' : dx > 60 ? 'right' : null);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const drag = dragRef.current;
    if (!drag || e.pointerId !== drag.id) return;
    dragRef.current = null;
    setArmed(null);

    if (!drag.moved) return;
    suppressClickRef.current = true;
    sweep(drag.dir);
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      e.stopPropagation();
      e.preventDefault();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      sweep('left-to-right');
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      sweep('right-to-left');
    }
  };

  return (
    <div
      ref={matRef}
      className={`mat${canSkip ? '' : ' is-locked'}${active ? ' is-active' : ''}`}
      role="group"
      aria-label="Room"
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onClickCapture={handleClickCapture}
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        className={`gutter gutter--left${armed === 'left' ? ' is-armed' : ''}`}
        disabled={!canSkip}
        onClick={() => sweep('right-to-left')}
        aria-label="Sweep left: rightmost card returns first"
        title="Sweep left — rightmost card returns first"
      >
        <span className="gutter__chev" aria-hidden="true">&lsaquo;</span>
      </button>

      <div className="room" ref={roomRef}>
        <div className="room__deck" ref={deckRef}>
          <DeckDisplay cardsInDeck={cardsInDeck} />
        </div>

        {Array.from({ length: SLOTS }, (_, i) => {
          const card = cards[i];
          if (card) {
            return (
              <RoomCard
                key={card.id}
                card={card}
                index={i}
                isGamePlaying={isGamePlaying}
                onPickCard={onPickCard}
              />
            );
          }
          return <PickedCardPlaceholder key={`placeholder-${i}`} />;
        })}
      </div>

      <button
        type="button"
        className={`gutter gutter--right${armed === 'right' ? ' is-armed' : ''}`}
        disabled={!canSkip}
        onClick={() => sweep('left-to-right')}
        aria-label="Sweep right: leftmost card returns first"
        title="Sweep right — leftmost card returns first"
      >
        <span className="gutter__chev" aria-hidden="true">&rsaquo;</span>
      </button>
    </div>
  );
}
