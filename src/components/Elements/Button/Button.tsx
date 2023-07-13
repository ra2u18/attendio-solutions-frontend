import clsx from 'clsx';
import { forwardRef } from 'react';

import { Spinner } from '@/components/Elements/Spinner';

const variants = {
  primary: 'bg-indigo-600 text-white',
  inverse: 'bg-white text-indigo-600',
  danger: 'bg-red-600 text-white',
};

const sizes = {
  sm: 'py-2 px-4 text-sm',
  md: 'py-2 px-6 text-md',
  lg: 'py-3 px-8 text-lg',
};

type IconProps =
  | { startIcon: React.ReactElement; endIcon?: never }
  | { endIcon: React.ReactElement; startIcon?: never }
  | { endIcon?: undefined; startIcon?: undefined };

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  isLoading?: boolean;
  stretch?: boolean;
} & IconProps;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    startIcon,
    endIcon,
    size = 'md',
    type = 'button',
    variant = 'primary',
    isLoading = false,
    stretch = false,
    className = '',
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      className={clsx(
        'flex justify-center items-center border border-gray-300 disabled:opacity-70 disabled:cursor-not-allowed rounded-md shadow-sm font-medium focus:ouline-none hover:opacity-80',
        stretch && 'w-full',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {isLoading && <Spinner size="sm" className="text-current" />}
      {!isLoading && startIcon}
      <span className="mx-2"> {props.children} </span> {!isLoading && endIcon}
    </button>
  );
});
