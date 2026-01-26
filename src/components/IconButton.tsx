// Reusable button component with icon support

import { useState } from 'react';
import { Link } from 'react-router-dom';

interface IconButtonProps {
  icon?: string;
  children: React.ReactNode;
  onClick?: () => void;
  to?: string; // If provided, renders as Link instead of button
  style?: React.CSSProperties;
}

export function IconButton({ icon, children, onClick, to, style }: Readonly<IconButtonProps>) {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: icon ? '10px' : '0',
    padding: '12px 16px',
    background: isHovered ? '#e8e8e8' : '#f5f5f5',
    color: '#333',
    border: '2px solid',
    borderColor: isHovered ? '#bbb' : '#ddd',
    borderRadius: '4px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontFamily: 'inherit',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    ...style
  };

  const content = (
    <>
      {icon && <span style={{ fontSize: '18px' }}>{icon}</span>}
      <span>{children}</span>
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        onClick={onClick}
        style={baseStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      style={baseStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {content}
    </button>
  );
}
