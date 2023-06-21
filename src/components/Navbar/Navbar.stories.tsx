import { Meta, StoryObj } from '@storybook/react';

import { Navbar } from './Navbar';

const meta: Meta = {
  title: 'Components/Elements/Navbar',
  component: Navbar,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

type Story = StoryObj<typeof Navbar>;

export const Primary: Story = {
  render: (props: any) => <Navbar {...props} />,
};
