import { Link } from 'react-router-dom';
import './Button.css';

function Button({ to, variant = 'primary', size = 'regular', className = '', type = 'button', children, ...props }) {
  const classes = [
    'ui-button',
    `ui-button--${variant}`,
    size !== 'regular' && `ui-button--size-${size}`,
    className,
  ].filter(Boolean).join(' ');

  if (to) {
    return <Link to={to} className={classes} {...props}>{children}</Link>;
  }

  return <button type={type} className={classes} {...props}>{children}</button>;
}

export default Button;
