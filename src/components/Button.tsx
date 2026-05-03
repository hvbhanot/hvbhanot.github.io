import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type ButtonProps = {
  children: ReactNode;
  to?: string;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const variants = {
  primary: 'border-cyanCore/45 bg-cyanCore/15 text-ink-50 shadow-glow hover:border-cyanCore/70 hover:bg-cyanCore/20',
  secondary: 'border-white/15 bg-white/[0.045] text-ink-100 hover:border-blueCore/50 hover:bg-blueCore/10',
  ghost: 'border-transparent bg-transparent text-ink-300 hover:text-cyanCore',
};

export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) {
  const classes = `inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-bold transition duration-200 hover:-translate-y-0.5 ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} {...props}>
      {children}
    </a>
  );
}
