// New Game button component

interface NewGameButtonProps {
  onClick: () => void;
  style?: React.CSSProperties;
}

export function NewGameButton({ onClick, style }: Readonly<NewGameButtonProps>) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '10px 20px',
        background: '#607d8b',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontFamily: 'inherit',
        fontSize: '12px',
        ...style
      }}
    >
      New Game
    </button>
  );
}
