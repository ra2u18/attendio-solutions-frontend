import { Meta, StoryObj } from '@storybook/react';

import { Error } from './Error';

const meta: Meta = {
  title: 'Components/Fallbacks/Error',
  component: Error,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<typeof Error>;

export const Primary: Story = {
  render: () => <Error />,
};
