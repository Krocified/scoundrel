// Run Modifier selection screen for post-completion runs

import { useState } from 'react';
import type { RunModifierId } from '../types/game';
import { RUN_MODIFIERS } from '../config/runModifiers';

interface RunModifierSelectionProps {
  onStart: (selectedModifiers: RunModifierId[]) => void;
  onSkip: () => void;
}

export function RunModifierSelection({ onStart, onSkip }: Readonly<RunModifierSelectionProps>) {
  const [selected, setSelected] = useState<RunModifierId[]>([]);

  const toggle = (id: RunModifierId) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleStart = () => {
    onStart(selected);
  };

  return (
    <div
      style={{
        background: 'var(--bg-panel)',
        color: 'var(--text-primary)',
        padding: '24px',
        borderRadius: '12px',
        maxWidth: '680px',
        width: '100%',
        margin: '0 auto',
        fontFamily: 'monospace',
        border: '2px solid var(--border)',
      }}
    >
      <h2 style={{ margin: '0 0 6px', color: 'var(--accent)', textAlign: 'center', fontSize: '24px', fontFamily: '"Pirata One", Georgia, serif' }}>
        ⚡ Run Modifiers
      </h2>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '18px', fontSize: '13px' }}>
        Select modifiers to empower your run. Each adds 1 Joker to the dungeon.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '18px' }}>
        {RUN_MODIFIERS.map(m => {
          const isSelected = selected.includes(m.id);
          return (
            <button
              key={m.id}
              onClick={() => toggle(m.id)}
              style={{
                background: isSelected
                  ? 'var(--accent-dim)'
                  : 'var(--bg-input)',
                border: `2px solid ${isSelected ? 'var(--accent)' : 'var(--border-strong)'}`,
                borderRadius: '8px',
                padding: '12px 16px',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                textAlign: 'left',
                fontFamily: 'inherit',
                transition: 'all 0.2s',
                opacity: 1,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--bg-hover)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = isSelected ? 'var(--accent-dim)' : 'var(--bg-input)';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '16px', fontWeight: 'bold', color: isSelected ? 'var(--accent)' : 'var(--text-primary)' }}>
                  {isSelected ? '✓ ' : ''}{m.name}
                </span>
                <span style={{
                  fontSize: '11px',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  background: 'rgba(244, 67, 54, 0.15)',
                  color: '#ff6b6b',
                  fontWeight: 'bold',
                }}>
                  +1 Joker
                </span>
              </div>
              <p style={{ margin: '6px 0 3px', color: 'var(--text-secondary)', fontSize: '12px' }}>
                {m.description}
              </p>
              <div style={{ display: 'flex', gap: '12px', fontSize: '11px', marginTop: '4px' }}>
                <span style={{ color: '#4caf50' }}>+ {m.effectDescription}</span>
                <span style={{ color: '#ff6b6b' }}>− {m.downsideDescription}</span>
              </div>
            </button>
          );
        })}
      </div>

      <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '11px', marginBottom: '16px' }}>
        Jokers drawn: {selected.length > 0 ? '🃏'.repeat(selected.length) : 'none'}
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <button
          onClick={handleStart}
          style={{
            padding: '10px 24px',
            background: selected.length > 0 ? 'var(--accent)' : 'var(--bg-disabled)',
            color: selected.length > 0 ? '#1a1a2e' : 'var(--text-disabled)',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            fontSize: '14px',
            cursor: selected.length > 0 ? 'pointer' : 'default',
            fontFamily: 'inherit',
            transition: 'all 0.2s',
          }}
        >
          {selected.length > 0 ? `Start with ${selected.length} Modifier${selected.length > 1 ? 's' : ''}` : 'Select Modifiers'}
        </button>
        <button
          onClick={onSkip}
          style={{
            padding: '10px 24px',
            background: 'transparent',
            color: 'var(--text-secondary)',
            border: '2px solid var(--border-strong)',
            borderRadius: '6px',
            fontWeight: 'bold',
            fontSize: '14px',
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'all 0.2s',
          }}
        >
          Skip (Normal Run)
        </button>
      </div>
    </div>
  );
}
