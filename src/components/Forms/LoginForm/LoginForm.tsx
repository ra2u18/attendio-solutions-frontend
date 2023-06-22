import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type FieldValues, type SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';

import { FloatingInput as Input, Button } from '@/components';

const loginFormSchema = z.object({
  email: z
    .string({
      required_error: 'Email is a required field',
      invalid_type_error: 'Email must be of type string',
    })
    .email({ message: 'Email must be valid' }),
  applicationId: z
    .string({ required_error: 'Application id is a required field' })
    .uuid({ message: 'Application id must be of type uuid' }),
  password: z
    .string({
      required_error: 'Password is a required field',
      invalid_type_error: 'Password must be of type string',
    })
    .min(4, { message: 'Invalid password' })
    .max(8, { message: 'Invalid password' }),
});

type Props = {
  onSubmit: SubmitHandler<FieldValues>;
  isLoading: boolean;
};

export const LoginForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { email: '', password: '', applicationId: '' },
    resolver: zodResolver(loginFormSchema),
  });

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Application"
        id="applicationId"
        register={register}
        required
        errors={errors}
        disabled={isLoading}
      />
      <Input
        label="Email"
        id="email"
        register={register}
        required
        errors={errors}
        disabled={isLoading}
      />
      <Input
        label="Password"
        id="password"
        type="password"
        register={register}
        required
        errors={errors}
        disabled={isLoading}
      />

      <div className="mt-10">
        <Button size="md" type="submit" variant="primary" isLoading={isLoading} stretch>
          Sign In
        </Button>
      </div>

      <div className="text-right text-sm text-gray-600 hover:underline">
        <Link to="/auth/refresh-otp">Forgot Password?</Link>
      </div>
    </form>
  );
};
