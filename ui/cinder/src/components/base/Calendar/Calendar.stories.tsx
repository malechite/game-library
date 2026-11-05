import { centerStory } from "@storybook-decorators";
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Calendar } from "./Calendar";

const meta: Meta<typeof Calendar> = {
  title: "Cinder/Forms/Calendar",
  decorators: [centerStory],
  component: Calendar
};
export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return <Calendar mode="single" selected={date} onSelect={setDate} />;
  }
};

export const RangeSelection: Story = {
  render: () => {
    const [range, setRange] = useState<{ from: Date; to?: Date } | undefined>({
      from: new Date()
    });

    return <Calendar mode="range" selected={range} onSelect={setRange} numberOfMonths={2} />;
  }
};

export const WithDropdowns: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return <Calendar mode="single" selected={date} onSelect={setDate} captionLayout="dropdown" />;
  }
};
