import { centerStory } from "@storybook-decorators";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "./Chart";

const meta: Meta<typeof ChartContainer> = {
  title: "Cinder/Display/Chart",
  decorators: [centerStory],
  component: ChartContainer
};
export default meta;
type Story = StoryObj<typeof ChartContainer>;

const chartData = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 }
];

const chartConfig: ChartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb"
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa"
  }
};

export const Default: Story = {
  render: () => (
    <ChartContainer config={chartConfig} style={{ height: 300, width: "100%" }}>
      <BarChart data={chartData}>
        <XAxis dataKey="month" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
};
