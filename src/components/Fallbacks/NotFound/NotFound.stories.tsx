import { Meta, StoryObj } from '@storybook/react';

import { AppProviders } from '@/providers/app';

import { NotFound } from './NotFound';

const meta: Meta = {
  title: 'Components/Fallbacks/NotFound',
  component: NotFound,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<typeof NotFound>;

export const DefaultAlert: Story = {
  render: () => (
    <AppProviders>
      <NotFound />
    </AppProviders>
  ),
};
