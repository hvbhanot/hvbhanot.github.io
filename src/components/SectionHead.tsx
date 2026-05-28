import { motion, fadeUp } from '../lib/motion';

type Props = {
  index: string;
  label: string;
  title: React.ReactNode;
  lede?: string;
};

export default function SectionHead({ index, label, title, lede }: Props) {
  return (
    <div className="grid gap-8 md:grid-cols-[1fr_minmax(0,44ch)] md:items-end">
      <div className="flex items-start gap-6">
        <motion.span variants={fadeUp} className="spec-index select-none" aria-hidden="true">
          {index}
        </motion.span>
        <div className="pt-2">
          <motion.div variants={fadeUp} className="spec-label">
            {label}
          </motion.div>
          <motion.h2 variants={fadeUp} className="section-title">
            {title}
          </motion.h2>
        </div>
      </div>
      {lede ? (
        <motion.p variants={fadeUp} className="lede md:pb-2">
          {lede}
        </motion.p>
      ) : null}
    </div>
  );
}
