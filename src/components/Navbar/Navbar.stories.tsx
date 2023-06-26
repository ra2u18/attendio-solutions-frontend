import { Meta, StoryObj } from '@storybook/react';

import { AppProviders } from '@/providers/app';

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
  render: (props: any) => {
    return (
      // <Router>
      <AppProviders>
        <Navbar {...props} />
      </AppProviders>
      // </Router>
    );
  },
};
