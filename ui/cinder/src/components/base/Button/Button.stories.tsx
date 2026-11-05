import { centerStory } from "@storybook-decorators";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Cinder/Actions/Button",
  decorators: [centerStory],
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "secondary", "ghost", "destructive", "link"]
    },
    size: {
      control: "select",
      options: ["default", "xs", "sm", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"]
    },
    disabled: { control: "boolean" },
    loading: { control: "boolean" }
  }
};
export default meta;
type Story = StoryObj<typeof Button>;

// ─── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: { children: "Button", variant: "default", size: "default" }
};

// ─── Constants ───────────────────────────────────────────────────────────────

const variants = ["default", "outline", "secondary", "ghost", "destructive", "link"] as const;
const sizes = ["xs", "sm", "default", "lg"] as const;
const iconSizes = ["icon-xs", "icon-sm", "icon", "icon-lg"] as const;

const states = [
  { label: "Rest", props: {} },
  { label: "Hover", props: { "data-force-hover": true } },
  { label: "Active", props: { "data-force-active": true } },
  { label: "Focus", props: { "data-force-focus": true } },
  { label: "Disabled", props: { disabled: true } },
  { label: "Loading", props: { loading: true } }
] as const;

const labelStyle: React.CSSProperties = {
  fontSize: "0.7rem",
  fontFamily: "system-ui",
  opacity: 0.5,
  textTransform: "capitalize",
  whiteSpace: "nowrap"
};

const sectionStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "24px"
};

const headingStyle: React.CSSProperties = {
  fontSize: "0.875rem",
  fontWeight: 600,
  fontFamily: "system-ui",
  margin: 0
};

const gridStyle: React.CSSProperties = {
  display: "grid",
  gap: "12px",
  alignItems: "center"
};

// ─── All Variants ────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
      {variants.map((v) => (
        <Button key={v} variant={v}>
          {v.charAt(0).toUpperCase() + v.slice(1)}
        </Button>
      ))}
    </div>
  )
};

// ─── All Sizes ───────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  render: () => (
    <div style={sectionStyle}>
      <div>
        <h4 style={headingStyle}>Text Buttons</h4>
        <div style={{ display: "flex", gap: "8px", alignItems: "center", marginTop: "8px" }}>
          {sizes.map((s) => (
            <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
              <Button size={s}>Button</Button>
              <span style={labelStyle}>{s}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h4 style={headingStyle}>Icon Buttons</h4>
        <div style={{ display: "flex", gap: "8px", alignItems: "center", marginTop: "8px" }}>
          {iconSizes.map((s) => (
            <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
              <Button size={s} icon="Plus" />
              <span style={labelStyle}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

// ─── State Matrix ────────────────────────────────────────────────────────────

export const StateMatrix: Story = {
  render: () => (
    <div style={sectionStyle}>
      <div style={{ ...gridStyle, gridTemplateColumns: "100px repeat(6, 1fr)" }}>
        <span />
        {states.map(({ label }) => (
          <span key={label} style={{ ...labelStyle, textAlign: "center" }}>
            {label}
          </span>
        ))}
      </div>

      {variants.map((variant) => (
        <div key={variant} style={{ ...gridStyle, gridTemplateColumns: "100px repeat(6, 1fr)" }}>
          <span style={{ ...labelStyle, fontWeight: 600 }}>{variant}</span>
          {states.map(({ label, props }) => (
            <div key={label} style={{ display: "flex", justifyContent: "center" }}>
              <Button variant={variant} {...(props as any)}>
                {variant.charAt(0).toUpperCase() + variant.slice(1)}
              </Button>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
};

// ─── With Icons ──────────────────────────────────────────────────────────────

export const WithIcons: Story = {
  render: () => (
    <div style={sectionStyle}>
      <div>
        <h4 style={headingStyle}>Leading Icon</h4>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px" }}>
          <Button icon="Plus">Create</Button>
          <Button variant="outline" icon="PencilSimple">
            Edit
          </Button>
          <Button variant="secondary" icon="Download">
            Download
          </Button>
          <Button variant="destructive" icon="Trash">
            Delete
          </Button>
        </div>
      </div>
      <div>
        <h4 style={headingStyle}>Trailing Icon</h4>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px" }}>
          <Button rightIcon="ArrowRight">Next</Button>
          <Button variant="outline" rightIcon="ArrowRight">
            Continue
          </Button>
          <Button variant="link" rightIcon="ArrowRight">
            Learn More
          </Button>
        </div>
      </div>
      <div>
        <h4 style={headingStyle}>Both Icons</h4>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px" }}>
          <Button icon="Sparkle" rightIcon="CaretDown">
            Menu
          </Button>
          <Button variant="outline" icon="Funnel" rightIcon="CaretDown">
            Filter
          </Button>
        </div>
      </div>
      <div>
        <h4 style={headingStyle}>Icon + Loading</h4>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px" }}>
          <Button icon="Plus" loading>
            Create
          </Button>
          <Button variant="outline" icon="Download" loading>
            Download
          </Button>
          <Button variant="destructive" icon="Trash" loading>
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
};

// ─── Icon Only ───────────────────────────────────────────────────────────────

export const IconOnly: Story = {
  render: () => (
    <div style={sectionStyle}>
      {variants
        .filter((v) => v !== "link")
        .map((variant) => (
          <div key={variant}>
            <span style={{ ...labelStyle, fontWeight: 600, display: "block", marginBottom: "8px" }}>{variant}</span>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              {iconSizes.map((s) => (
                <Button key={s} variant={variant} size={s} icon="Plus" />
              ))}
            </div>
          </div>
        ))}
    </div>
  )
};
