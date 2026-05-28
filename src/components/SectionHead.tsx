import { motion, fadeUp } from '../lib/motion';

type Props = {
  index: string;
  label: string;
  title: React.ReactNode;
  lede?: string;
};

export default function SectionHead({ index, label, title, lede }: Props) {
  return (
    <div className="grid gap-8 md:grid-cols-[1fr_minmax(0,46ch)] md:items-end">
      <div>
        <motion.div variants={fadeUp} className="label">
          {index} — {label}
        </motion.div>
        <motion.h2 variants={fadeUp} className="section-title">
          {title}
        </motion.h2>
      </div>
      {lede ? (
        <motion.p variants={fadeUp} className="lede md:pb-2">
          {lede}
        </motion.p>
      ) : null}
    </div>
  );
}
