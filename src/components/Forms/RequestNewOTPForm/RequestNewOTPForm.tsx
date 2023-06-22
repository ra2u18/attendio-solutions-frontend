import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { FloatingInput as Input, Button } from '@/components';

type Props = {
  onSubmit: SubmitHandler<FieldValues>;
  isLoading: boolean;
};

const registerFormSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Should be of type email ' })
    .refine((data) => data.trim() !== '', { message: 'Email cannot be empty or whitespace only' }),
  applicationId: z
    .string({ required_error: 'Application id is a required field' })
    .uuid({ message: 'Application id must be of type uuid' }),
});

export const RequestNewOTPForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { email: '', companyName: '', fullname: '' },
    resolver: zodResolver(registerFormSchema),
  });

  return (
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
        label="Application Id"
        id="applicationId"
        register={register}
        required
        errors={errors}
        disabled={isLoading}
      />

      <div className="mt-10">
        <Button size="md" type="submit" variant="primary" isLoading={isLoading} stretch>
          Request OTP
        </Button>
      </div>
    </form>
  );
};
