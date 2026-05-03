import type { HTMLAttributes, ReactNode } from 'react';

type GlowCardProps = {
  children: ReactNode;
  className?: string;
  glow?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export default function GlowCard({ children, className = '', glow = false, ...props }: GlowCardProps) {
  return (
    <div className={`glass-card ${glow ? 'glow-line' : ''} ${className}`} {...props}>
      {children}
    </div>
  );
}
