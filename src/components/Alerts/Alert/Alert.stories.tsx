import { Meta } from '@storybook/react';

import { Alert } from './Alert';

const meta: Meta = {
  title: 'Components/Alerts/DefaultAlert',
  component: Alert,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;
// type Story = StoryObj<typeof Alert>;

// export const DefaultAlert: Story = {
//   render: () => <Alert />
// }
