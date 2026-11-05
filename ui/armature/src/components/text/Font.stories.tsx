import type { StoryObj } from "@storybook/react-vite";
import { Text } from "./Text";
import { Font, TextSize } from "@game-library/types";

export default {
  title: "Armature/Typography/Font Showcase",
  component: Text,
  argTypes: {
    font: {
      control: "select",
      options: Object.values(Font)
    }
  }
};

type Story = StoryObj<typeof Text>;

const sampleText = "The quick brown fox jumps over the lazy dog";

export const SystemFonts: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <Text font={Font.SystemUI} size={TextSize.StaticLarge} bold>
          System UI
        </Text>
        <Text font={Font.SystemUI}>{sampleText}</Text>
      </div>
      <div>
        <Text font={Font.SansSerif} size={TextSize.StaticLarge} bold>
          Sans Serif
        </Text>
        <Text font={Font.SansSerif}>{sampleText}</Text>
      </div>
      <div>
        <Text font={Font.Serif} size={TextSize.StaticLarge} bold>
          Serif
        </Text>
        <Text font={Font.Serif}>{sampleText}</Text>
      </div>
      <div>
        <Text font={Font.Monospace} size={TextSize.StaticLarge} bold>
          Monospace
        </Text>
        <Text font={Font.Monospace}>{sampleText}</Text>
      </div>
    </div>
  )
};

export const InstalledGoogleFonts: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <Text font={Font.Syncopate} size={TextSize.StaticLarge} bold>
          Syncopate (Display Font)
        </Text>
        <Text font={Font.Syncopate}>{sampleText}</Text>
      </div>
      <div>
        <Text font={Font.PressStart2P} size={TextSize.StaticMedium} bold>
          Press Start 2P (Gaming Font)
        </Text>
        <Text font={Font.PressStart2P} size={TextSize.StaticSmall}>
          GAME OVER
        </Text>
      </div>
      <div>
        <Text font={Font.KodeMono} size={TextSize.StaticLarge} bold>
          Kode Mono (Modern Monospace)
        </Text>
        <Text font={Font.KodeMono}>const message = "Clean code with Kode Mono!";</Text>
      </div>
    </div>
  )
};

export const MonospaceFonts: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <Text font={Font.Monospace} size={TextSize.StaticLarge} bold>
          System Monospace
        </Text>
        <Text font={Font.Monospace}>
          function example() {`{`} return "system monospace"; {`}`}
        </Text>
      </div>
      <div>
        <Text font={Font.KodeMono} size={TextSize.StaticLarge} bold>
          Kode Mono
        </Text>
        <Text font={Font.KodeMono}>
          function example() {`{`} return "kode mono"; {`}`}
        </Text>
      </div>
    </div>
  )
};

export const Interactive: Story = {
  args: {
    children: sampleText,
    font: Font.SystemUI,
    size: TextSize.StaticMedium
  }
};
