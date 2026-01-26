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
        background: '#f5f5f5',
        color: '#333',
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
