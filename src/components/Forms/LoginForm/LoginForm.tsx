import { useForm, type FieldValues, type SubmitHandler } from 'react-hook-form';

import { FloatingInput as Input, Button } from '@/components';

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
        <Button
          // onClick={() => reset()}
          size="md"
          type="submit"
          variant="primary"
          isLoading={isLoading}
          stretch
        >
          Sign In
        </Button>
      </div>
    </form>
  );
};
