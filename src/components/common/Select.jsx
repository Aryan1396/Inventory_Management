import { classNames } from '../../utils/helpers';

const Select = ({
  label,
  id,
  value,
  onChange,
  options = [],
  error,
  helperText,
  className = '',
  required = false,
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
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={classNames(
          'w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all outline-none cursor-pointer',
          'bg-white text-stone-900 border-stone-200 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/15 shadow-2xs',
          error ? 'border-rose-400 focus:border-rose-500' : '',
          className
        )}
      >
        {options.map((opt) => {
          const val = typeof opt === 'string' ? opt : opt.value;
          const labelText = typeof opt === 'string' ? opt : opt.label;
          return (
            <option key={val} value={val}>
              {labelText}
            </option>
          );
        })}
      </select>
      {error && <p className="mt-1 text-xs text-rose-500 font-medium">{error}</p>}
      {!error && helperText && (
        <p className="mt-1 text-xs text-stone-400">{helperText}</p>
      )}
    </div>
  );
};

export default Select;
