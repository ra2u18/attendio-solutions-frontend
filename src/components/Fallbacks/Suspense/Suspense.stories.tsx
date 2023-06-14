import { Meta, StoryObj } from '@storybook/react';

import { Suspense } from './Suspense';

const meta: Meta = {
  title: 'Components/Fallbacks/Suspense',
  component: Suspense,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<typeof Suspense>;

export const Primary: Story = {
  render: () => <Suspense />,
};
