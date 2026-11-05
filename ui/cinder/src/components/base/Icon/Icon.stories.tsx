import { centerStory } from "@storybook-decorators";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "./Icon";
import { Size } from "@game-library/types";

const meta: Meta<typeof Icon> = {
  title: "Cinder/Display/Icon",
  decorators: [centerStory],
  component: Icon
};
export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      <Icon type="Gear" size={Size.Medium} />
      <Icon type="Star" size={Size.Medium} />
      <Icon type="Heart" size={Size.Medium} />
      <Icon type="Bell" size={Size.Medium} />
      <Icon type="User" size={Size.Medium} />
    </div>
  )
};

export const CinderSizes: Story = {
  render: () => (
    <div>
      <p style={{ marginBottom: "0.75rem", fontFamily: "system-ui", fontSize: "0.8rem", opacity: 0.6 }}>
        Cinder uses UI-appropriate sizes (default weight: regular)
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {Object.values(Size).map((size) => (
          <div key={size} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
            <Icon type="Star" size={size} />
            <span style={{ fontSize: "0.625rem", opacity: 0.5, fontFamily: "system-ui" }}>{size}</span>
          </div>
        ))}
      </div>
    </div>
  )
};

export const WithGradient: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      <Icon type="Sparkle" size={Size.XLarge} weight="fill" fill="linear-gradient(135deg, #CF1900 0%, #DF4400 100%)" />
      <Icon type="Sparkle" size={Size.XLarge} weight="fill" fill="linear-gradient(135deg, #117954 0%, #0CA640 100%)" />
      <Icon type="Sparkle" size={Size.XLarge} weight="fill" fill="linear-gradient(102deg, #481996 0%, #A03ADE 100%)" />
      <Icon type="Sparkle" size={Size.XLarge} weight="fill" fill="linear-gradient(135deg, #195196 0%, #3A84DE 100%)" />
    </div>
  )
};
