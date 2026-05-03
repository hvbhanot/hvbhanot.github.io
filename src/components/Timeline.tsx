import type { ExperienceItem } from '../data/experience';
import ExperienceCard from './ExperienceCard';

type TimelineProps = {
  items: ExperienceItem[];
};

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative space-y-6">
      <div className="absolute bottom-0 left-4 top-0 hidden w-px bg-gradient-to-b from-cyanCore/40 via-white/10 to-violetCore/30 md:block" />
      {items.map((item) => (
        <div key={`${item.title}-${item.period}`} className="relative md:pl-12">
          <span className="absolute left-[0.78rem] top-8 hidden size-2 rounded-full bg-cyanCore shadow-glow md:block" />
          <ExperienceCard item={item} />
        </div>
      ))}
    </div>
  );
}
