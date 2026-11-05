import { useState, useRef, type FC } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { colors, gradients } from "@game-library/tokens";
import { SFIcon } from "@game-library/icon";
import { Lattice } from "./Lattice";
import type { LatticeConfig, LatticeController, WaveAnimationConfig } from "../../types";

// ─── Helpers ────────────────────────────────────────────────────────

const SAPPHIRE = colors.sapphire[200].hex;
const AMETHYST = colors.amethyst[200].hex;
const RUBY = colors.ruby[400].hex;
const JADE = colors.jade[400].hex;
const TOPAZ = colors.topaz[300].hex;

const StoryContainer: FC<{ children: React.ReactNode; height?: number }> = ({ children, height = 600 }) => (
  <div style={{ width: "100%", height, background: "#0a0a0a", borderRadius: 8, overflow: "hidden" }}>{children}</div>
);

// ─── Meta ───────────────────────────────────────────────────────────

const meta: Meta<typeof Lattice> = {
  title: "Lattice/Grid",
  component: Lattice
};

export default meta;
type Story = StoryObj<typeof Lattice>;

// ─── 1. Default ─────────────────────────────────────────────────────

export const Default: Story = {
  name: "Default",
  render: () => (
    <StoryContainer>
      <Lattice
        config={{
          radius: 40,
          gap: 4,
          cols: 10,
          rows: 8,
          orientation: "pointy-top",
          cornerRadius: 0,
          defaultFill: SAPPHIRE,
          defaultOpacity: 0.37
        }}
      />
    </StoryContainer>
  )
};

// ─── 2. Interactive Controls ────────────────────────────────────────

const InteractiveStory: FC = () => {
  const [radius, setRadius] = useState(40);
  const [gap, setGap] = useState(4);
  const [cols, setCols] = useState(10);
  const [rows, setRows] = useState(8);
  const [cornerRadius, setCornerRadius] = useState(0);
  const [opacity, setOpacity] = useState(0.37);

  const config: LatticeConfig = {
    radius,
    gap,
    cols,
    rows,
    orientation: "pointy-top",
    cornerRadius,
    defaultFill: SAPPHIRE,
    defaultOpacity: opacity
  };

  const sliderStyle = { width: 120 };
  const labelStyle: React.CSSProperties = {
    color: "#aaa",
    fontSize: 12,
    fontFamily: "monospace",
    display: "flex",
    alignItems: "center",
    gap: 8
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", padding: "0 8px" }}>
        <label style={labelStyle}>
          Radius: {radius}
          <input type="range" min={20} max={80} value={radius} onChange={(e) => setRadius(+e.target.value)} style={sliderStyle} />
        </label>
        <label style={labelStyle}>
          Gap: {gap}
          <input type="range" min={0} max={20} value={gap} onChange={(e) => setGap(+e.target.value)} style={sliderStyle} />
        </label>
        <label style={labelStyle}>
          Cols: {cols}
          <input type="range" min={1} max={20} value={cols} onChange={(e) => setCols(+e.target.value)} style={sliderStyle} />
        </label>
        <label style={labelStyle}>
          Rows: {rows}
          <input type="range" min={1} max={15} value={rows} onChange={(e) => setRows(+e.target.value)} style={sliderStyle} />
        </label>
        <label style={labelStyle}>
          Corner: {cornerRadius}
          <input
            type="range"
            min={0}
            max={20}
            value={cornerRadius}
            onChange={(e) => setCornerRadius(+e.target.value)}
            style={sliderStyle}
          />
        </label>
        <label style={labelStyle}>
          Opacity: {opacity.toFixed(2)}
          <input
            type="range"
            min={0}
            max={100}
            value={opacity * 100}
            onChange={(e) => setOpacity(+e.target.value / 100)}
            style={sliderStyle}
          />
        </label>
      </div>
      <StoryContainer>
        <Lattice config={config} />
      </StoryContainer>
    </div>
  );
};

export const InteractiveControls: Story = {
  name: "Interactive Controls",
  render: () => <InteractiveStory />
};

// ─── 3. Rounded Hexes ───────────────────────────────────────────────

export const RoundedHexes: Story = {
  name: "Rounded Hexes",
  render: () => (
    <StoryContainer>
      <Lattice
        config={{
          radius: 45,
          gap: 6,
          cols: 8,
          rows: 6,
          cornerRadius: 12,
          defaultFill: AMETHYST,
          defaultOpacity: 0.5
        }}
      />
    </StoryContainer>
  )
};

// ─── 4. Custom Colors ───────────────────────────────────────────────

const CustomColorsStory: FC = () => {
  const palette = [SAPPHIRE, AMETHYST, RUBY, JADE, TOPAZ];
  const overrides: Record<string, { fill: string; opacity: number }> = {};

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 10; col++) {
      const dist = Math.sqrt(row * row + col * col);
      const idx = Math.floor(dist) % palette.length;
      overrides[`${row},${col}`] = {
        fill: palette[idx]!,
        opacity: 0.3 + (dist / 14) * 0.5
      };
    }
  }

  return (
    <StoryContainer>
      <Lattice
        config={{
          radius: 40,
          gap: 4,
          cols: 10,
          rows: 8,
          cornerRadius: 4,
          defaultFill: SAPPHIRE,
          defaultOpacity: 0.5,
          hexOverrides: overrides
        }}
      />
    </StoryContainer>
  );
};

export const CustomColors: Story = {
  name: "Custom Colors",
  render: () => <CustomColorsStory />
};

// ─── 5. Wave Animation ──────────────────────────────────────────────

const WaveStory: FC = () => {
  const controllerRef = useRef<LatticeController | null>(null);

  const triggerWave = (direction: WaveAnimationConfig["direction"]) => {
    controllerRef.current?.triggerWave({
      direction,
      hexDuration: 600,
      stagger: 80,
      property: "opacity",
      from: 0.15,
      to: 0.8,
      yoyo: true,
      repeat: 1
    });
  };

  const buttonStyle: React.CSSProperties = {
    padding: "6px 14px",
    background: "#1a1a2e",
    color: "#aaa",
    border: "1px solid #333",
    borderRadius: 4,
    cursor: "pointer",
    fontFamily: "monospace",
    fontSize: 12
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", padding: "0 8px" }}>
        <button style={buttonStyle} onClick={() => triggerWave("left-to-right")}>
          Left → Right
        </button>
        <button style={buttonStyle} onClick={() => triggerWave("right-to-left")}>
          Right → Left
        </button>
        <button style={buttonStyle} onClick={() => triggerWave("top-to-bottom")}>
          Top → Bottom
        </button>
        <button style={buttonStyle} onClick={() => triggerWave("bottom-to-top")}>
          Bottom → Top
        </button>
        <button style={buttonStyle} onClick={() => triggerWave("center-out")}>
          Center Out
        </button>
        <button style={buttonStyle} onClick={() => controllerRef.current?.reset()}>
          Reset
        </button>
      </div>
      <StoryContainer>
        <Lattice
          config={{
            radius: 40,
            gap: 4,
            cols: 10,
            rows: 8,
            cornerRadius: 4,
            defaultFill: SAPPHIRE,
            defaultOpacity: 0.15
          }}
          onController={(c) => {
            controllerRef.current = c;
          }}
        />
      </StoryContainer>
    </div>
  );
};

export const WaveAnimation: Story = {
  name: "Wave Animation",
  render: () => <WaveStory />
};

// ─── 6. Opacity Pulse ───────────────────────────────────────────────

const OpacityPulseStory: FC = () => {
  const controllerRef = useRef<LatticeController | null>(null);
  const started = useRef(false);

  const handleController = (c: LatticeController) => {
    controllerRef.current = c;
    if (!started.current) {
      started.current = true;
      c.triggerWave({
        direction: "left-to-right",
        hexDuration: 1200,
        stagger: 60,
        property: "opacity",
        from: 0.1,
        to: 0.7,
        yoyo: true,
        repeat: 0 // infinite
      });
    }
  };

  return (
    <StoryContainer>
      <Lattice
        config={{
          radius: 40,
          gap: 4,
          cols: 12,
          rows: 8,
          cornerRadius: 6,
          defaultFill: SAPPHIRE,
          defaultOpacity: 0.1
        }}
        onController={handleController}
      />
    </StoryContainer>
  );
};

export const OpacityPulse: Story = {
  name: "Opacity Pulse",
  render: () => <OpacityPulseStory />
};

// ─── 7. Scale Ripple ────────────────────────────────────────────────

const ScaleRippleStory: FC = () => {
  const controllerRef = useRef<LatticeController | null>(null);
  const started = useRef(false);

  const handleController = (c: LatticeController) => {
    controllerRef.current = c;
    if (!started.current) {
      started.current = true;
      c.triggerWave({
        direction: "center-out",
        hexDuration: 800,
        stagger: 100,
        property: "scale",
        from: 0.7,
        to: 1.0,
        yoyo: true,
        repeat: 0
      });
    }
  };

  return (
    <StoryContainer>
      <Lattice
        config={{
          radius: 45,
          gap: 6,
          cols: 10,
          rows: 7,
          cornerRadius: 4,
          defaultFill: AMETHYST,
          defaultOpacity: 0.5
        }}
        onController={handleController}
      />
    </StoryContainer>
  );
};

export const ScaleRipple: Story = {
  name: "Scale Ripple",
  render: () => <ScaleRippleStory />
};

// ─── 8. Color Wave ──────────────────────────────────────────────────

const ColorWaveStory: FC = () => {
  const controllerRef = useRef<LatticeController | null>(null);
  const started = useRef(false);

  const handleController = (c: LatticeController) => {
    controllerRef.current = c;
    if (!started.current) {
      started.current = true;
      c.triggerWave({
        direction: "left-to-right",
        hexDuration: 1000,
        stagger: 100,
        property: "fill",
        from: SAPPHIRE,
        to: AMETHYST,
        yoyo: true,
        repeat: 0
      });
    }
  };

  return (
    <StoryContainer>
      <Lattice
        config={{
          radius: 40,
          gap: 4,
          cols: 12,
          rows: 8,
          cornerRadius: 4,
          defaultFill: SAPPHIRE,
          defaultOpacity: 0.5
        }}
        onController={handleController}
      />
    </StoryContainer>
  );
};

export const ColorWave: Story = {
  name: "Color Wave",
  render: () => <ColorWaveStory />
};

// ─── 9. Combined Animations ─────────────────────────────────────────

const CombinedStory: FC = () => {
  const controllerRef = useRef<LatticeController | null>(null);
  const started = useRef(false);

  const handleController = (c: LatticeController) => {
    controllerRef.current = c;
    if (!started.current) {
      started.current = true;
      // Opacity wave
      c.triggerWave({
        direction: "left-to-right",
        hexDuration: 1500,
        stagger: 70,
        property: "opacity",
        from: 0.1,
        to: 0.7,
        yoyo: true,
        repeat: 0
      });
      // Scale wave (slower, offset direction)
      c.triggerWave({
        direction: "center-out",
        hexDuration: 2000,
        stagger: 120,
        property: "scale",
        from: 0.85,
        to: 1.0,
        yoyo: true,
        repeat: 0
      });
    }
  };

  return (
    <StoryContainer>
      <Lattice
        config={{
          radius: 42,
          gap: 5,
          cols: 11,
          rows: 7,
          cornerRadius: 6,
          defaultFill: SAPPHIRE,
          defaultOpacity: 0.1
        }}
        onController={handleController}
      />
    </StoryContainer>
  );
};

export const CombinedAnimations: Story = {
  name: "Combined Animations",
  render: () => <CombinedStory />
};

// ─── 10. Auto-Size ──────────────────────────────────────────────────

export const AutoSize: Story = {
  name: "Auto-Size Container",
  render: () => (
    <div style={{ width: "100%", height: 500, background: "#0a0a0a", borderRadius: 8, overflow: "hidden", resize: "both" }}>
      <Lattice
        config={{
          radius: 35,
          gap: 4,
          cols: 14,
          rows: 10,
          cornerRadius: 4,
          defaultFill: SAPPHIRE,
          defaultOpacity: 0.3
        }}
      />
    </div>
  )
};

// ─── 11. Dynamic Hexes ──────────────────────────────────────────────

const DynamicHexesStory: FC = () => {
  const controllerRef = useRef<LatticeController | null>(null);
  const [log, setLog] = useState<string[]>([]);

  const config: LatticeConfig = {
    radius: 40,
    gap: 4,
    cols: 8,
    rows: 6,
    cornerRadius: 4,
    defaultFill: SAPPHIRE,
    defaultOpacity: 0.4
  };

  const addRandomHex = () => {
    const row = Math.floor(Math.random() * 10) + 6;
    const col = Math.floor(Math.random() * 12);
    controllerRef.current?.addHex(
      { row, col },
      { fill: [RUBY, JADE, TOPAZ, AMETHYST][Math.floor(Math.random() * 4)], opacity: 0.6 }
    );
    setLog((prev) => [`Added hex at (${row},${col})`, ...prev.slice(0, 4)]);
  };

  const buttonStyle: React.CSSProperties = {
    padding: "6px 14px",
    background: "#1a1a2e",
    color: "#aaa",
    border: "1px solid #333",
    borderRadius: 4,
    cursor: "pointer",
    fontFamily: "monospace",
    fontSize: 12
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center", padding: "0 8px" }}>
        <button style={buttonStyle} onClick={addRandomHex}>
          Add Random Hex
        </button>
        <span style={{ color: "#555", fontFamily: "monospace", fontSize: 11 }}>
          {log[0] ?? "Click to add hexes outside the grid"}
        </span>
      </div>
      <StoryContainer height={700}>
        <Lattice
          config={config}
          onController={(c) => {
            controllerRef.current = c;
          }}
        />
      </StoryContainer>
    </div>
  );
};

export const DynamicHexes: Story = {
  name: "Dynamic Hexes",
  render: () => <DynamicHexesStory />
};

// ─── 12. Hex Content ────────────────────────────────────────────────

export const HexContent: Story = {
  name: "Hex Content",
  render: () => (
    <StoryContainer>
      <Lattice
        config={{
          radius: 50,
          gap: 6,
          cols: 7,
          rows: 5,
          cornerRadius: 8,
          defaultFill: SAPPHIRE,
          defaultOpacity: 0.3
        }}
        renderHex={(coord) => (
          <span
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: 10,
              fontFamily: "monospace",
              pointerEvents: "none"
            }}
          >
            {coord.row},{coord.col}
          </span>
        )}
      />
    </StoryContainer>
  )
};

// ─── 13. Hero Background ─────────────────────────────────

const HeroBackgroundStory: FC = () => (
  <StoryContainer height={1400}>
    <div style={{ width: "100%", height: "100%", background: gradients.surface.css }}>
      <Lattice
        config={{
          radius: 84,
          gap: 10,
          cols: 10,
          rows: 7,
          cornerRadius: 3,
          defaultFill: colors.steel[300].hex,
          defaultOpacity: 0.3,
          random: {
            seed: 7,
            missingRate: 0.25,
            opacityRange: [0.15, 0.55]
          },
          boot: {
            direction: "left-to-right",
            hexDuration: 800,
            stagger: 80
          },
          ambient: {
            direction: "left-to-right",
            opacityRange: [0.7, 1.3],
            scaleRange: [0.985, 1.015],
            hexDuration: 2500,
            stagger: 120
          }
        }}
        customHexes={[
          {
            coord: { row: 2, col: 2 },
            fill: "transparent",
            opacity: 1,
            render: () => <SFIcon type="Hexagon" />
          }
        ]}
      />
    </div>
  </StoryContainer>
);

export const HeroBackground: Story = {
  name: "Hero",
  render: () => <HeroBackgroundStory />
};
