// Title component with New Rocker font

interface TitleProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Title({ className, style }: Readonly<TitleProps>) {
  return (
    <>
      <style>{`
        .new-rocker-regular {
          font-family: "New Rocker", system-ui;
          font-weight: 400;
          font-style: normal;
        }
      `}</style>
      <h1 
        className={className ? `new-rocker-regular ${className}` : 'new-rocker-regular'}
        style={{
          margin: 0,
          ...style
        }}
      >
        🃏 Scoundrel
      </h1>
    </>
  );
}
