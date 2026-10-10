import { classNames } from '../../utils/helpers';

const Card = ({ children, className = '', ...props }) => {
  return (
    <div
      className={classNames(
        'bg-white border border-stone-200/90 rounded-2xl shadow-xs shadow-stone-200/40',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ title, subtitle, action, className = '' }) => (
  <div className={classNames('flex items-start justify-between pb-4 mb-4 border-b border-stone-100', className)}>
    <div>
      {title && <h3 className="text-base font-semibold text-stone-900 tracking-tight">{title}</h3>}
      {subtitle && <p className="text-xs text-stone-500 mt-0.5">{subtitle}</p>}
    </div>
    {action && <div>{action}</div>}
  </div>
);

export const CardBody = ({ children, className = '' }) => (
  <div className={classNames('text-stone-700', className)}>
    {children}
  </div>
);

export default Card;
