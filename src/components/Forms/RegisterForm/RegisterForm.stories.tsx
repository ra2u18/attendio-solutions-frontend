import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';

import { delay } from '@/utils/storybookUtils';

import { RegisterForm as Form } from './RegisterForm';

const meta: Meta = {
  title: 'Components/Forms/RegisterForm',
  component: Form,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<typeof Form>;

export const Primary: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit: SubmitHandler<FieldValues> = async () => {
      setIsLoading(true);
      await delay(2000);
      setIsLoading(false);
    };

    return (
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm md:max-w-lg">
        <Form isLoading={isLoading} onSubmit={onSubmit} />
      </div>
    );
  },
};
