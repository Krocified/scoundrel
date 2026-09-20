// Title component

interface TitleProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Title({ className, style }: Readonly<TitleProps>) {
  return (
    <h1
      className={className}
      style={{
        margin: 0,
        fontFamily: '"Pirata One", Georgia, serif',
        fontWeight: 'normal',
        color: 'var(--accent)',
        letterSpacing: '1px',
        ...style,
      }}
    >
      Scoundrel
    </h1>
  );
}
