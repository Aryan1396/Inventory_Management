import { classNames } from '../../utils/helpers';

const BADGE_VARIANTS = {
  Active: 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-2xs',
  Draft: 'bg-amber-50 text-amber-700 border-amber-200 shadow-2xs',
  Archived: 'bg-stone-100 text-stone-600 border-stone-200',
  category: 'bg-orange-50 text-orange-800 border-orange-200/80 font-medium',
  neutral: 'bg-stone-100 text-stone-700 border-stone-200',
};

const Badge = ({ children, variant = 'neutral', className = '' }) => {
  return (
    <span
      className={classNames(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border tracking-wide',
        BADGE_VARIANTS[variant] || BADGE_VARIANTS.neutral,
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
