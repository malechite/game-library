import type { StoryObj, Meta } from "@storybook/react-vite";
import { Size } from "@game-library/types";
import { SFIcon as Icon } from "./Icon";
import { PHOSPHOR_ICON_NAMES } from "./phosphor-icons";
import { registerAllIcons } from "./all";

// Stories are a gallery of the whole set; apps register only what they use.
registerAllIcons();
import { gradients } from "@game-library/tokens";

const allIconNames = PHOSPHOR_ICON_NAMES as unknown as string[];

const commonIcons = [
  "Sparkle",
  "Gear",
  "File",
  "Folder",
  "FolderOpen",
  "Plus",
  "Minus",
  "X",
  "Check",
  "Trash",
  "Eye",
  "EyeSlash",
  "Lock",
  "LockOpen",
  "Copy",
  "FloppyDisk",
  "Download",
  "Upload",
  "MagnifyingGlass",
  "Bell",
  "User",
  "Users",
  "Heart",
  "Star"
];

const meta: Meta<typeof Icon> = {
  title: "Icon/SFIcon",
  component: Icon,
  argTypes: {
    type: { control: "select", options: commonIcons },
    size: { control: "select", options: Object.values(Size) },
    weight: { control: "select", options: ["thin", "light", "regular", "bold", "fill", "duotone"] },
    fill: { control: "select", options: ["none", ...Object.keys(gradients)] }
  }
};
export default meta;
type Story = StoryObj<typeof Icon>;

export const SingleIcon: Story = {
  args: {
    type: "Sparkle" as any,
    size: Size.XXLarge,
    weight: "fill",
    fill: "amethyst"
  },
  render: (args) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        minHeight: "200px",
        background: "#1a1a1a",
        padding: "2rem"
      }}
    >
      <Icon
        {...args}
        fill={args.fill && args.fill !== "none" ? gradients[args.fill as keyof typeof gradients].hexCss : undefined}
      />
      <span style={{ color: "#999", fontSize: "0.875rem", fontFamily: "system-ui, sans-serif" }}>{args.type}</span>
    </div>
  )
};

export const Sizes: Story = {
  render: () => (
    <div style={{ background: "#1a1a1a", padding: "2rem" }}>
      <h3 style={{ color: "#fff", marginBottom: "1rem", fontFamily: "system-ui" }}>Icon Sizes</h3>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "2rem",
          padding: "1.5rem",
          background: "#242424",
          borderRadius: "8px",
          flexWrap: "wrap"
        }}
      >
        {Object.values(Size).map((size) => (
          <div key={size} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
            <Icon type="Sparkle" size={size} weight="fill" fill={gradients.sapphire.hexCss} />
            <span style={{ color: "#999", fontSize: "0.7rem", fontFamily: "system-ui" }}>{size}</span>
          </div>
        ))}
      </div>
    </div>
  )
};

export const Weights: Story = {
  render: () => (
    <div style={{ background: "#1a1a1a", padding: "2rem" }}>
      <h3 style={{ color: "#fff", marginBottom: "1rem", fontFamily: "system-ui" }}>Icon Weights</h3>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "2rem",
          padding: "1.5rem",
          background: "#242424",
          borderRadius: "8px"
        }}
      >
        {(["thin", "light", "regular", "bold", "fill", "duotone"] as const).map((weight) => (
          <div key={weight} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
            <Icon type="Heart" size={Size.Large} weight={weight} color="#fff" />
            <span style={{ color: "#999", fontSize: "0.7rem", fontFamily: "system-ui" }}>{weight}</span>
          </div>
        ))}
      </div>
    </div>
  )
};

export const Colors: Story = {
  render: () => (
    <div style={{ background: "#1a1a1a", padding: "2rem" }}>
      <h3 style={{ color: "#fff", marginBottom: "1rem", fontFamily: "system-ui" }}>Solid Colors</h3>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
          padding: "1.5rem",
          background: "#242424",
          borderRadius: "8px"
        }}
      >
        {["#CF1900", "#FF8F00", "#0CA640", "#3A84DE", "#A03ADE", "#fff"].map((c) => (
          <Icon key={c} type="Circle" size={Size.Large} weight="fill" color={c} />
        ))}
      </div>
    </div>
  )
};

export const GradientFills: Story = {
  render: () => (
    <div style={{ background: "#1a1a1a", padding: "2rem" }}>
      <h3 style={{ color: "#fff", marginBottom: "1rem", fontFamily: "system-ui" }}>Gradient Fills</h3>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
          padding: "1.5rem",
          background: "#242424",
          borderRadius: "8px",
          flexWrap: "wrap"
        }}
      >
        {(["ruby", "jasper", "topaz", "jade", "sapphire", "amethyst", "slate"] as const).map((name) => (
          <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
            <Icon type="Sparkle" size={Size.XLarge} weight="fill" fill={gradients[name].hexCss} />
            <span style={{ color: "#999", fontSize: "0.7rem", fontFamily: "system-ui" }}>{name}</span>
          </div>
        ))}
      </div>
    </div>
  )
};

export const Spinning: Story = {
  render: () => (
    <div style={{ background: "#1a1a1a", padding: "2rem" }}>
      <h3 style={{ color: "#fff", marginBottom: "1rem", fontFamily: "system-ui" }}>Spin Animation</h3>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "2rem",
          padding: "1.5rem",
          background: "#242424",
          borderRadius: "8px"
        }}
      >
        <Icon type="Spinner" size={Size.Small} spin color="#fff" />
        <Icon type="CircleNotch" size={Size.Medium} spin color="#fff" />
        <Icon type="SpinnerGap" size={Size.Large} spin color="#fff" />
        <Icon type="ArrowClockwise" size={Size.Large} spin fill={gradients.amethyst.hexCss} weight="fill" />
      </div>
    </div>
  )
};

export const CommonIcons: Story = {
  render: () => (
    <div style={{ background: "#1a1a1a", padding: "2rem" }}>
      <h3 style={{ color: "#fff", marginBottom: "1rem", fontFamily: "system-ui" }}>Common Icons</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))", gap: "1rem" }}>
        {commonIcons.map((name) => (
          <div
            key={name}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem",
              background: "#242424",
              borderRadius: "6px",
              transition: "all 0.15s ease",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#2e2e2e";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#242424";
            }}
          >
            <Icon type={name as any} size={Size.Medium} color="#fff" />
            <span
              style={{
                color: "#999",
                fontSize: "0.6rem",
                textAlign: "center",
                fontFamily: "system-ui",
                wordBreak: "break-word",
                lineHeight: 1.2
              }}
            >
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
};

export const AllIcons: Story = {
  parameters: { controls: { include: ["size", "weight"] } },
  args: { size: Size.Medium, weight: "regular" },
  render: (args) => (
    <div style={{ background: "#1a1a1a", padding: "2rem", minHeight: "100vh" }}>
      <h3 style={{ color: "#fff", marginBottom: "1rem", fontFamily: "system-ui" }}>All Phosphor Icons ({allIconNames.length})</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: "1rem" }}>
        {allIconNames.map((name) => (
          <div
            key={name}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem",
              background: "#242424",
              borderRadius: "6px",
              transition: "all 0.15s ease",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#2e2e2e";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#242424";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <Icon type={name as any} size={args.size} weight={args.weight} color="#fff" />
            <span
              style={{
                color: "#999",
                fontSize: "0.5rem",
                textAlign: "center",
                fontFamily: "system-ui",
                wordBreak: "break-word",
                lineHeight: 1.2
              }}
            >
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
};
