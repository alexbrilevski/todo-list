import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import AddItemForm from "./AddItemForm";

const meta = {
  title: "TodoList/AddItemForm",
  component: AddItemForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    addItem: {
      description: "Add item callback",
    }
  },
  args: { addItem: fn() },
} satisfies Meta<typeof AddItemForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  }
};
