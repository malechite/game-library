import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FilterBar, type FilterBarFilter } from "./FilterBar";

const meta: Meta<typeof FilterBar> = {
  title: "Cinder/Blocks/FilterBar",
  component: FilterBar,
  decorators: [
    (Story) => (
      <div style={{ padding: 24, maxWidth: 1100 }}>
        <Story />
      </div>
    )
  ]
};
export default meta;
type Story = StoryObj<typeof FilterBar>;

const FILTERS: FilterBarFilter[] = [
  {
    key: "platform",
    label: "Platforms",
    options: [
      { value: "nes", label: "NES" },
      { value: "snes", label: "SNES" },
      { value: "ps1", label: "PlayStation" }
    ]
  },
  {
    key: "genre",
    label: "Genres",
    options: [
      { value: "rpg", label: "RPG" },
      { value: "platformer", label: "Platformer" },
      { value: "puzzle", label: "Puzzle" }
    ]
  }
];

const SORTS = [
  { value: "title", label: "Title A–Z" },
  { value: "-value", label: "Value: high to low" },
  { value: "-added", label: "Recently added" }
];

/** Fully controlled: the story holds the state the way a page (or the URL) would. */
export const Default: Story = {
  render: () => {
    const [term, setTerm] = useState("");
    const [values, setValues] = useState<Record<string, string | undefined>>({});
    const [favorites, setFavorites] = useState(false);
    const [sort, setSort] = useState("title");

    return (
      <FilterBar
        search={{ value: term, onChange: setTerm, placeholder: "Search games" }}
        filters={FILTERS}
        values={values}
        onFilterChange={(key, value) => setValues((current) => ({ ...current, [key]: value }))}
        toggles={[{ key: "favorites", label: "Favorites", pressed: favorites, onPressedChange: setFavorites }]}
        sort={{ value: sort, options: SORTS, onChange: setSort }}
        onClear={() => {
          setTerm("");
          setValues({});
          setFavorites(false);
        }}
      />
    );
  }
};

/** With active filters the triggers are tinted and the Clear action appears. */
export const WithActiveFilters: Story = {
  render: () => {
    const [values, setValues] = useState<Record<string, string | undefined>>({ platform: "snes", genre: "rpg" });

    return (
      <FilterBar
        filters={FILTERS}
        values={values}
        onFilterChange={(key, value) => setValues((current) => ({ ...current, [key]: value }))}
        onClear={() => setValues({})}
      />
    );
  }
};

/** Search only — the smallest useful configuration. */
export const SearchOnly: Story = {
  render: () => {
    const [term, setTerm] = useState("chrono");
    return <FilterBar search={{ value: term, onChange: setTerm, placeholder: "Search" }} />;
  }
};
