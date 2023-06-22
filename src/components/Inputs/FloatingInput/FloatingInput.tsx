import clsx from 'clsx';
import { useState } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

type Props = {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
};

export const FloatingInput: React.FC<Props> = ({
  id,
  label,
  disabled,
  register,
  required,
  errors,
  type = 'text',
}) => {
  // State to check if we have something in our input
  const [hasValue, setHasValue] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setHasValue(true);
    } else {
      setHasValue(false);
    }
  };

  return (
    <div className="w-full relative">
      <input
        id={id}
        {...register(id, { required })}
        disabled={disabled}
        type={type}
        placeholder=" "
        autoComplete="off"
        className={clsx(
          'transition peer block w-full rounded-md border-0 p-4 shadow-sm sm:text-sm sm:leading-6 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:pt-6 focus:ring-inset focus:ring-indigo-600',
          hasValue && 'pt-6',
          errors[id]
            ? 'ring-rose-300 focus:ring-rose-500'
            : 'ring-neutral-300 focus:ring-indigo-600'
        )}
        onChange={handleChange}
      />
      <label
        htmlFor={id}
        className={clsx(
          'absolute cursor-text text-md duration-150 transform -translate-y-3 top-[18px] z-10 pl-4 left-4 origin-[0] peer-placeholder-shown:scale-100  peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:font-bold',
          hasValue && 'scale-75 -translate-y-4 font-bold'
        )}
      >
        {label}
      </label>

      {errors[id] && <p className="text-red-500 text-sm my-2">{errors[id]?.message?.toString()}</p>}
    </div>
  );
};
