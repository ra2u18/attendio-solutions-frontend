import { Meta, StoryObj } from '@storybook/react';

import { Logo } from './Logo';

const meta: Meta = {
  title: 'Components/Elements/Logo',
  component: Logo,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

type Story = StoryObj<typeof Logo>;

export const Primary: Story = {
  render: (props: any) => <Logo {...props} />,
};
