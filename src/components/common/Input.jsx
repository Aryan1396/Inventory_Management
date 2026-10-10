import { classNames } from '../../utils/helpers';

const Input = ({
  label,
  id,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error,
  helperText,
  prefix,
  required = false,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5"
        >
          {label} {required && <span className="text-orange-600">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3.5 text-sm font-semibold text-amber-700/80 select-none">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={classNames(
            'w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all outline-none',
            'bg-white text-stone-900 placeholder:text-stone-400 shadow-2xs',
            prefix ? 'pl-8' : '',
            error
              ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/15'
              : 'border-stone-200 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/15',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-xs text-rose-500 font-medium">{error}</p>}
      {!error && helperText && (
        <p className="mt-1 text-xs text-stone-400">{helperText}</p>
      )}
    </div>
  );
};

export default Input;
