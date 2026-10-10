import { classNames } from '../../utils/helpers';

const VARIANTS = {
  primary: 'bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700 focus:ring-amber-500 shadow-sm shadow-orange-500/20 active:scale-[0.99]',
  secondary: 'bg-stone-800 text-stone-100 hover:bg-stone-900 focus:ring-stone-500 shadow-2xs',
  outline: 'border border-amber-200/80 bg-white text-stone-700 hover:bg-amber-50/50 hover:text-amber-900 hover:border-amber-300 focus:ring-amber-400 shadow-2xs',
  danger: 'bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100 focus:ring-rose-400',
  ghost: 'text-stone-600 hover:text-amber-900 hover:bg-amber-50/50 focus:ring-amber-300',
};

const SIZES = {
  sm: 'px-3 py-1.5 text-xs rounded-lg font-medium',
  md: 'px-4 py-2 text-sm rounded-lg font-medium',
  lg: 'px-5 py-2.5 text-sm rounded-xl font-semibold',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  onClick,
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classNames(
        'inline-flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
        VARIANTS[variant] || VARIANTS.primary,
        SIZES[size] || SIZES.md,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
