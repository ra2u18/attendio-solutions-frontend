import {
  CheckCircleIcon,
  XMarkIcon,
  XCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/20/solid';
import clsx from 'clsx';

export type AlertVariant = 'success' | 'danger' | 'warning';

type Props = {
  text: string;
  variant?: AlertVariant;
  dismissNotification: () => void;
  children?: React.ReactNode;
};

const variantStyles = {
  success: {
    container: 'bg-green-50',
    icon: 'text-green-400',
    text: 'text-green-800',
    button:
      'bg-green-50 text-green-500 hover:bg-green-100 focus:ring-green-600 focus:ring-offset-green-50',
    iconComponent: CheckCircleIcon,
  },
  danger: {
    container: 'bg-red-50',
    icon: 'text-red-400',
    text: 'text-red-800',
    button: 'bg-red-50 text-red-500 hover:bg-red-100 focus:ring-red-600 focus:ring-offset-red-50',
    iconComponent: XCircleIcon,
  },
  warning: {
    container: 'bg-yellow-50',
    icon: 'text-yellow-400',
    text: 'text-yellow-800',
    button:
      'bg-yellow-50 text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-600 focus:ring-offset-yellow-50',
    iconComponent: ExclamationCircleIcon,
  },
};

export const Alert: React.FC<Props> = ({
  text,
  variant = 'success',
  dismissNotification,
  children,
}) => {
  const styles = variantStyles[variant];
  const IconComponent = styles.iconComponent;

  return (
    <div className={clsx('rounded-md p-4 mb-4', styles.container)}>
      <div className="flex">
        <div className="flex-shrink-0">
          <IconComponent className={clsx('h-5 w-5', styles.icon)} aria-hidden="true" />
        </div>
        <div className="ml-3 flex-1">
          <p className={clsx('text-sm font-medium', styles.text)}>{text}</p>
          {children && <div className="mt-2 text-sm text-gray-700">{children}</div>}
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              className={clsx(
                'inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2',
                styles.button
              )}
              onClick={() => dismissNotification()}
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
