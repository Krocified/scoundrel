// New Game button component

import { IconButton } from './IconButton';

interface NewGameButtonProps {
  onClick: () => void;
  style?: React.CSSProperties;
}

export function NewGameButton({ onClick, style }: Readonly<NewGameButtonProps>) {
  return (
    <IconButton
      onClick={onClick}
      style={style}
    >
      New Game
    </IconButton>
  );
}
