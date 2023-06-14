import { Meta, StoryObj } from '@storybook/react';

import { Spinner, SpinnerProps } from './Spinner';

const meta: Meta = {
  title: 'Components/Elements/Spinner',
  component: Spinner,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Primary: Story = {
  render: (props: SpinnerProps) => <Spinner {...props} />,
};
