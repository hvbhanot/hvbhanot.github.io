import { useState } from 'react';
import { LayoutGroup, motion, useReducedMotion } from 'framer-motion';

// Adapted from Obsidian UI's Magnet Tabs: shared-layout hover and active markers.
// https://www.obsidianui.dev/docs/magnet-tabs
// Native links/buttons add keyboard access; the existing Motion dependency is reused.
type Option = { id: string; label: string; href?: string };

export default function MagnetTabs({
  slug, options, activeTab, onSelect, label, className = '',
}: {
  slug: string;
  options: Option[];
  activeTab: string;
  onSelect: (id: string) => void;
  label: string;
  className?: string;
}) {
  const [hovered, setHovered] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();
  return (
    <LayoutGroup id={slug}>
      <div className={`magnet-tabs ${className}`} role="group" aria-label={label}
        onMouseLeave={() => setHovered(null)}>
        {options.map((option) => {
          const active = option.id === activeTab;
          const content = <>
            {(hovered ?? activeTab) === option.id && <motion.span
              className="magnet-highlight" layoutId="highlight" aria-hidden="true"
              transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 430, damping: 34 }} />}
            <span className="magnet-label">{option.label}</span>
            {active && <motion.span className="magnet-indicator" layoutId="indicator" aria-hidden="true"
              transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 430, damping: 34 }} />}
          </>;
          const events = {
            onMouseEnter: () => setHovered(option.id),
            onFocus: () => setHovered(option.id),
            onBlur: () => setHovered(null),
            onClick: () => onSelect(option.id),
          };
          return option.href
            ? <a key={option.id} href={option.href} className="magnet-option" aria-current={active ? 'location' : undefined} {...events}>{content}</a>
            : <button type="button" key={option.id} className="magnet-option" aria-pressed={active} {...events}>{content}</button>;
        })}
      </div>
    </LayoutGroup>
  );
}
