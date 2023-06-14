import { Meta, StoryObj } from '@storybook/react';

import { Button, ButtonProps } from './Button';

const meta: Meta = {
  title: 'Components/Elements/Button',
  component: Button,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

const PrimaryArgs: Omit<ButtonProps, 'startIcon' | 'endIcon'> = {
  children: 'Primary Button',
  variant: 'primary',
};

export const Primary: Story = {
  render: (props: ButtonProps) => {
    return (
      <div className="flex flex-col md:flex-row gap-10">
        <Button {...PrimaryArgs} {...props} />
        <Button {...PrimaryArgs} {...props} isLoading />
        <Button
          {...PrimaryArgs}
          startIcon={
            <span role="img" aria-label="liar">
              🤥
            </span>
          }
        />
        <Button
          {...PrimaryArgs}
          endIcon={
            <span role="img" aria-label="pumpkin">
              🎃
            </span>
          }
        />
      </div>
    );
  },
};

export const Inverse: Story = {
  args: {
    children: 'Inverse Button',
    variant: 'inverse',
  },
};

export const Danger: Story = {
  args: {
    children: 'Danger Button',
    variant: 'danger',
  },
};
