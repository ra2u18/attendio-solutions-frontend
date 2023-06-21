import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { FloatingInput as Input, Button } from '@/components';

type Props = {
  onSubmit: SubmitHandler<FieldValues>;
  isLoading: boolean;
};

const verifyOTPSchema = z
  .object({
    password: z.string({ required_error: 'Password is a required field ' }),
    confirmPassword: z.string({ required_error: 'Confirm Password is required ' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
  });

export const VerifyOTPForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(verifyOTPSchema),
  });

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Password"
        id="password"
        register={register}
        required
        errors={errors}
        disabled={isLoading}
        type="password"
      />

      <Input
        label="Confirm Password"
        id="confirmPassword"
        register={register}
        required
        errors={errors}
        disabled={isLoading}
        type="password"
      />

      <div className="mt-10">
        <Button
          // onClick={() => reset()}
          size="md"
          type="submit"
          variant="primary"
          isLoading={isLoading}
          stretch
        >
          Sign up
        </Button>
      </div>
    </form>
  );
};
