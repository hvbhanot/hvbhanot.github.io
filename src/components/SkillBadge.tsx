type SkillBadgeProps = {
  children: string;
  className?: string;
};

export default function SkillBadge({ children, className = '' }: SkillBadgeProps) {
  return <span className={`skill-chip inline-flex px-3 py-2 text-xs font-semibold ${className}`}>{children}</span>;
}
