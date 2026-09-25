// Reusable button component with icon support

import { Link } from 'react-router-dom';

interface IconButtonProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  to?: string; // If provided, renders as Link instead of button
  href?: string; // If provided, renders as a plain anchor (e.g. new tab)
  target?: string;
  rel?: string;
  style?: React.CSSProperties;
  variant?: 'primary';
}

export function IconButton({ icon, children, onClick, to, href, target, rel, style, variant }: Readonly<IconButtonProps>) {
  const className = variant === 'primary' ? 'btn btn--primary' : 'btn';

  const content = (
    <>
      {icon && <span className="btn__icon">{icon}</span>}
      <span>{children}</span>
    </>
  );

  if (href) {
    return (
      <a className={className} href={href} target={target} rel={rel} onClick={onClick} style={style}>
        {content}
      </a>
    );
  }

  if (to) {
    return (
      <Link className={className} to={to} onClick={onClick} style={style}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={className} onClick={onClick} style={style}>
      {content}
    </button>
  );
}
