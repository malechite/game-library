import { centerStory } from "@storybook-decorators";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxEmpty
} from "./Combobox";

const meta: Meta<typeof Combobox> = {
  title: "Cinder/Forms/Combobox",
  decorators: [centerStory],
  component: Combobox
};
export default meta;
type Story = StoryObj<typeof Combobox>;

const frameworks = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "Solid" }
];

export const Default: Story = {
  render: () => (
    <Combobox>
      <ComboboxInput placeholder="Search frameworks..." />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxEmpty>No framework found.</ComboboxEmpty>
          {frameworks.map(({ value, label }) => (
            <ComboboxItem key={value} value={value}>
              {label}
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
};

export const WithGroups: Story = {
  render: () => (
    <Combobox>
      <ComboboxInput placeholder="Search..." />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxEmpty>No results found.</ComboboxEmpty>
          <ComboboxGroup>
            <ComboboxLabel>Frontend</ComboboxLabel>
            <ComboboxItem value="react">React</ComboboxItem>
            <ComboboxItem value="vue">Vue</ComboboxItem>
            <ComboboxItem value="svelte">Svelte</ComboboxItem>
          </ComboboxGroup>
          <ComboboxGroup>
            <ComboboxLabel>Backend</ComboboxLabel>
            <ComboboxItem value="express">Express</ComboboxItem>
            <ComboboxItem value="fastify">Fastify</ComboboxItem>
            <ComboboxItem value="hono">Hono</ComboboxItem>
          </ComboboxGroup>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
};

export const WithClearButton: Story = {
  render: () => (
    <Combobox>
      <ComboboxInput placeholder="Search frameworks..." showClear />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxEmpty>No framework found.</ComboboxEmpty>
          {frameworks.map(({ value, label }) => (
            <ComboboxItem key={value} value={value}>
              {label}
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
};
