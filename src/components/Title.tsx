// Title component with Pirata One font

import { useTheme } from '../contexts/ThemeContext';

interface TitleProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Title({ className, style }: Readonly<TitleProps>) {
  const { isDark } = useTheme();

  return (
    <h1
      className={className}
      style={{
        margin: 0,
        fontFamily: '"Pirata One", Georgia, serif',
        fontWeight: 'normal',
        color: isDark ? '#f5c842' : '#1a1a2e',
        letterSpacing: '1px',
        ...style,
      }}
    >
      🃏 Scoundrel
    </h1>
  );
}
