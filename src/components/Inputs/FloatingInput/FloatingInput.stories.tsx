/* eslint-disable react-hooks/rules-of-hooks */

import { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { ErrorOption } from 'react-hook-form';

import { FloatingInput } from './FloatingInput';

const meta: Meta = {
  title: 'Components/Inputs/FloatingInput',
  component: FloatingInput,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<typeof FloatingInput>;

export const Primary: Story = {
  render: () => {
    const {
      register,
      formState: { errors },
    } = useForm();

    return <FloatingInput errors={errors} register={register} id="email" label="Email" />;
  },
};

type FieldWithErrorsProps = { _errs: Record<string, ErrorOption> };
const FormWithErrors: React.FC<FieldWithErrorsProps> = ({ _errs }) => {
  const {
    register,
    setError,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    for (const [key, error] of Object.entries(_errs)) {
      setError(key, error);
    }
  }, [errors]);

  return (
    <form>
      <FloatingInput errors={errors} register={register} id="email" label="Email" />
    </form>
  );
};

export const Error: Story = {
  render: () => {
    const errors = { email: { type: 'manual', message: 'Test Error' } };
    return <FormWithErrors _errs={errors} />;
  },
};
