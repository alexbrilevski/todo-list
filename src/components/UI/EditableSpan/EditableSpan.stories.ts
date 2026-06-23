import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import EditableSpan from "./EditableSpan";

const meta = {
  title: "TodoList/EditableSpan",
  component: EditableSpan,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onChangeText: {
      description: "Change item text callback",
    }
  },
  args: { onChangeText: fn() },
} satisfies Meta<typeof EditableSpan>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "Item text",
  }
};

export const Disabled: Story = {
  args: {
    text: "Item text",
    disabled: true,
  }
};
