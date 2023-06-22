import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button, FloatingInput as Input } from '@/components';

const registerFormSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Should be of type email ' })
    .refine((data) => data.trim() !== '', { message: 'Email cannot be empty or whitespace only' }),
  companyName: z.string().refine((data) => data.trim() !== '', {
    message: 'Company name cannot be empty or whitespace only',
  }),
  fullname: z
    .string({ required_error: 'Full name is required' })
    .min(4, { message: 'Name should be at least 4 characters ' })
    .refine((data) => data.trim() !== '', {
      message: 'Full name cannot be empty or whitespace only',
    }),
});

type Props = {
  onSubmit: SubmitHandler<FieldValues>;
  isLoading: boolean;
};

export const RegisterForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { email: '', companyName: '', fullname: '' },
    resolver: zodResolver(registerFormSchema),
  });

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email"
          id="email"
          register={register}
          required
          errors={errors}
          disabled={isLoading}
        />
        <Input
          label="Company Name"
          id="companyName"
          register={register}
          required
          errors={errors}
          disabled={isLoading}
        />
        <Input
          label="Fullname"
          id="fullname"
          register={register}
          required
          errors={errors}
          disabled={isLoading}
        />

        <div className="mt-10">
          <Button size="md" type="submit" variant="primary" isLoading={isLoading} stretch>
            Sign up
          </Button>
        </div>
      </form>
    </>
  );
};
