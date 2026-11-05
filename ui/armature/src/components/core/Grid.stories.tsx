import type { StoryObj, Meta } from "@storybook/react-vite";
import { Grid } from "./Grid";
import { Surface } from "./Surface";
import { VStack } from "./Stack";
import { centerStory, LayoutLabel, Placeholder } from "@storybook-decorators";

const meta: Meta<typeof Grid> = {
  title: "Armature/Layout/Grid",
  component: Grid,
  decorators: [centerStory]
};

export default meta;

type Story = StoryObj<typeof Grid>;

const cells = (count: number, color = "#44cccc") =>
  Array.from({ length: count }, (_, i) => <Placeholder key={i} label={`Cell ${i + 1}`} color={color} />);

export const TwoColumns: Story = {
  name: "2 Columns",
  render: () => (
    <LayoutLabel name="Grid cols={2}" color="#44cccc" style={{ width: 400 }}>
      <Grid cols={2} gap={2} padding={2}>
        {cells(4)}
      </Grid>
    </LayoutLabel>
  )
};

export const ThreeColumns: Story = {
  name: "3 Columns",
  render: () => (
    <LayoutLabel name="Grid cols={3}" color="#44cccc" style={{ width: 500 }}>
      <Grid cols={3} gap={2} padding={2}>
        {cells(6)}
      </Grid>
    </LayoutLabel>
  )
};

export const FourColumns: Story = {
  name: "4 Columns",
  render: () => (
    <LayoutLabel name="Grid cols={4}" color="#44cccc" style={{ width: 600 }}>
      <Grid cols={4} gap={2} padding={2}>
        {cells(8)}
      </Grid>
    </LayoutLabel>
  )
};

export const WithSurfaceCards: Story = {
  name: "Card Grid (Grid + Surface)",
  render: () => (
    <LayoutLabel name="Grid cols={3}" color="#44cccc" style={{ width: 600 }}>
      <Grid cols={3} gap={4} padding={2}>
        {Array.from({ length: 6 }, (_, i) => (
          <LayoutLabel key={i} name="Surface" color="Surface">
            <Surface style={{ border: "1px solid #333", backgroundColor: "#1a1a2e", color: "white" }}>
              <span style={{ fontWeight: "bold", fontSize: 14 }}>Card {i + 1}</span>
              <span style={{ fontSize: 12, color: "#888" }}>Card description</span>
            </Surface>
          </LayoutLabel>
        ))}
      </Grid>
    </LayoutLabel>
  )
};

export const GapComparison: Story = {
  name: "Gap Comparison",
  render: () => (
    <VStack gap={6}>
      <LayoutLabel name="Grid gap={1}" color="#44cccc" style={{ width: 400 }}>
        <Grid cols={3} gap={1} padding={2}>
          {cells(3)}
        </Grid>
      </LayoutLabel>
      <LayoutLabel name="Grid gap={4}" color="#44cccc" style={{ width: 400 }}>
        <Grid cols={3} gap={4} padding={2}>
          {cells(3)}
        </Grid>
      </LayoutLabel>
      <LayoutLabel name="Grid gap={8}" color="#44cccc" style={{ width: 400 }}>
        <Grid cols={3} gap={8} padding={2}>
          {cells(3)}
        </Grid>
      </LayoutLabel>
    </VStack>
  )
};
