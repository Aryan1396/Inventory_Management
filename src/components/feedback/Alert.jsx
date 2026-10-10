import { useState } from 'react';
import { classNames } from '../../utils/helpers';

const ALERT_STYLES = {
  info: 'bg-sky-50 text-sky-900 border-sky-200',
  success: 'bg-emerald-50 text-emerald-900 border-emerald-200',
  warning: 'bg-amber-50 text-amber-900 border-amber-200',
  error: 'bg-rose-50 text-rose-900 border-rose-200',
};

const Alert = ({
  type = 'info',
  title,
  children,
  dismissible = false,
  onDismiss,
  className = '',
}) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const handleDismiss = () => {
    setVisible(false);
    if (onDismiss) onDismiss();
  };

  return (
    <div
      role="alert"
      className={classNames(
        'p-4 rounded-xl border text-sm flex items-start justify-between gap-3 shadow-2xs',
        ALERT_STYLES[type] || ALERT_STYLES.info,
        className
      )}
    >
      <div className="flex-1">
        {title && <h4 className="font-semibold mb-0.5">{title}</h4>}
        <div className="text-xs leading-relaxed opacity-90">{children}</div>
      </div>
      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          className="text-current opacity-50 hover:opacity-100 transition-opacity p-0.5 cursor-pointer text-xs font-bold"
          aria-label="Close"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default Alert;
