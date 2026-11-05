# @game-library/armature

## Overview

Armature is the structural scaffolding library — the internal skeleton that gives shape to what's built around it. Components use declarative boolean/number props instead of CSS class strings. Zero-runtime CSS via Vanilla Extract.

Armature is **design-agnostic** — it provides structural layout primitives, not visual design. Colors, icons, and brand-specific styling are handled by consuming packages (Cinder, Foundry, etc.) or separate packages (`@game-library/icon`).

## Design Philosophy

- **Compositional**: `<Box horizontal expand center gap={2}>` instead of `<div className="flex flex-row w-full h-full flex-1 items-center justify-center gap-2">`
- **Declarative**: Boolean props toggle behaviors, number props set spacing scale values
- **Color-agnostic**: Armature provides structural tokens only (spacing, radii, typography, shadows). Colors are handled by the consumer.

## Architecture

### Box is the Foundation

Every layout component composes from `Box`. Box translates declarative props into Vanilla Extract sprinkles classes.

- `HStack` / `VStack` → Box with orientation preset
- `Surface` → Box with rounded, padding, gap defaults
- `Spacer` → Box with expand
- `Grid` → Box with grid display + gridTemplateColumns sprinkle

### Theme System

1. **Contract** (`themes/contract.css.ts`) — defines the structural token schema
2. **Default Theme** (`themes/defaultTheme.css.ts`) — fills the contract with standard values
3. **Sprinkles** (`themes/sprinkles.css.ts`) — generates atomic utility classes from the contract
4. **Theme class** — `defaultTheme` (from `themes/defaultTheme.css.ts`) is applied to `<body>` by the app; consumers can pass their own `createTheme()` class

## Component Standards

### Arrow Functions Only

All components must use `const` arrow functions.

## Key Commands

- `pnpm --filter @game-library/armature build` — Build with tsup + Vanilla Extract
- `pnpm --filter @game-library/armature typecheck` — TypeScript check

## Adding New Components

1. Create in `src/components/<category>/`
2. Compose from `Box` when possible
3. Use `sprinkles()` for layout/spacing, `clsx()` for class merging
4. Use inline `style` for colors (not sprinkles)
5. Export from `src/index.ts`

## Token Exports

Color tokens (`colors`, `gradients`, `semanticColors`, `getColorStyle`) live in the separate `@game-library/tokens` package; Armature itself stays color-agnostic.

---

## Component Decision Tree

### "I need to lay out children..."

- Horizontally → `HStack`
- Vertically → `VStack`
- In a grid → `Grid cols={N}`
- As a semantic list → `List` (vertical) or `InlineList` (horizontal with delimiters)
- Orientation is dynamic / unknown → `Box` with `orientation` prop

### "I need a container..."

- Card-like with padding and rounding → `Surface`
- Full-screen root → `FullScreenViewport`
- Generic flex container → `Box`

### "I need spacing..."

- Uniform gaps between children → `gap={N}` on parent
- Push items to opposite ends → `Spacer` between them (**not** space-between)
- Fixed-max spacing → `Spacer` with `width` or `height` prop
- Visual separator line → `Divider`

---

## Refactoring Raw Divs to Armature

### Step-by-step

1. Identify the div's role: layout container, card, spacer, list?
2. Map className flex properties:

| CSS / Tailwind           | Armature                                                 |
| ------------------------ | -------------------------------------------------------- |
| `flex flex-row`          | `HStack` (or `Box orientation={Orientation.Horizontal}`) |
| `flex flex-col`          | `VStack` (or `Box orientation={Orientation.Vertical}`)   |
| `items-center`           | `center` prop                                            |
| `justify-center`         | `justifyCenter` prop (or `center` for both axes)         |
| `justify-between`        | Remove — use `Spacer` between groups instead             |
| `flex-1` / `flex-grow`   | `expand` prop                                            |
| `flex-shrink-0`          | `stay` prop                                              |
| `w-full`                 | `full` prop                                              |
| `gap-N`                  | `gap={N}` (scale: 1=4px, 2=8px, 3=12px, 4=16px)          |
| `p-N`                    | `padding={N}`                                            |
| `px-N` / `py-N`          | `paddingX={N}` / `paddingY={N}`                          |
| `rounded-md`             | `rounded={Size.Medium}` or `rounded`                     |
| `overflow-hidden`        | Default behavior — no prop needed                        |
| `overflow-auto`          | `scroll` prop                                            |
| `relative`               | Default behavior — no prop needed                        |
| `absolute`               | `absolute` prop                                          |
| `fixed`                  | `fixed` prop                                             |
| `z-10` / `z-20` / `z-50` | `layer1` / `layer2` / `layer5`                           |

3. If it has `justify-content: space-between`, restructure with Spacer:

```tsx
// Before
<div style={{ display: "flex", justifyContent: "space-between" }}>
  <span>Left</span>
  <span>Right</span>
</div>

// After
<HStack>
  <span>Left</span>
  <Spacer />
  <span>Right</span>
</HStack>
```

4. If it's a card container with padding/rounding, use `Surface`.

### Common anti-patterns to avoid

- **Using `style={{ justifyContent: 'space-between' }}`** — use Spacer instead
- **Wrapping Box in unnecessary divs** — Box IS a div, just use its props
- **Using className for flex layout** — use Box/HStack/VStack props instead
- **Using expand on every child** — only the one that should grow
- **Forgetting `stay` on items that shouldn't shrink** — icons, buttons, badges
- **Nesting single-child Boxes** — if a Box has one child and no styling, remove it

---

## The Spacer Philosophy

Spacer replaces `justify-content: space-between` with explicit, readable control.

**Why this matters:**

`space-between` distributes ALL children evenly. With 3 items, you get even spacing between all 3. But often you want 2 items grouped on the left and 1 pushed to the right. Spacer makes grouping explicit: everything before the Spacer stays together, everything after gets pushed away. Multiple Spacers can create custom distributions.

### Canonical patterns

```tsx
// Modal header: title left, close button right
<HStack center gap={2}>
  <Text bold>{title}</Text>
  <Spacer />
  <CloseButton />
</HStack>

// Right-aligned button bar
<HStack>
  <Spacer />
  <ButtonGroup buttons={buttons} />
</HStack>

// Sidebar: nav on top, footer pinned to bottom
<VStack expand>
  <NavItems />
  <Spacer />
  <FooterLink />
</VStack>

// Stat card: value on top, label pinned to bottom
<Surface>
  <HStack center gap={2}>
    <Icon />
    <Text>{value}</Text>
  </HStack>
  <Spacer />
  <Text>{label}</Text>
</Surface>
```

---

## Layout Recipes

### Page with sidebar

```tsx
<HStack expand>
  <VStack padding={4} gap={2} style={{ width: 240 }} stay>
    <NavItems />
    <Spacer />
    <Settings />
  </VStack>
  <VStack expand padding={6} gap={4} scroll>
    <PageContent />
  </VStack>
</HStack>
```

### Card grid

```tsx
<Grid cols={3} gap={4}>
  <Surface>Card 1</Surface>
  <Surface>Card 2</Surface>
  <Surface>Card 3</Surface>
</Grid>
```

### Form layout

```tsx
<VStack gap={4} padding={6}>
  <VStack gap={2}>
    <Text bold>Field Label</Text>
    <Input />
  </VStack>
  <Divider />
  <HStack>
    <Spacer />
    <SubmitButton />
  </HStack>
</VStack>
```

### Modal layout

```tsx
<VStack padding={6} gap={4} style={{ width: 480 }}>
  <HStack center>
    <Title>{title}</Title>
    <Spacer />
    <CloseButton />
  </HStack>
  <Divider />
  <VStack gap={4} expand scroll>
    {content}
  </VStack>
  <Divider />
  <HStack gap={2}>
    <Spacer />
    <Button>Cancel</Button>
    <Button>Confirm</Button>
  </HStack>
</VStack>
```

---

## Important Implementation Details

- **Box default display**: `flex` with `flex-direction: column` (when no orientation set)
- **Box default overflow**: `hidden` (not visible)
- **Box default position**: `relative`
- **`expand`**: sets `width: 100%`, `height: 100%`, `flex: 1` — use for the main content area that should fill remaining space
- **`full`**: sets only `width: 100%` — use when you need full width without flex growth
- **`stay`**: sets `flex-shrink: 0` — use on items that must keep their size (icons, buttons, fixed-width sidebars)
- **`center`**: sets `align-items: center` and (for vertical orientation) `justify-content: center` + `text-align: center`

### Spacing scale reference

| Value | Pixels | Value | Pixels |
| ----- | ------ | ----- | ------ |
| `1`   | 4px    | `8`   | 32px   |
| `2`   | 8px    | `10`  | 40px   |
| `3`   | 12px   | `12`  | 48px   |
| `4`   | 16px   | `16`  | 64px   |
| `5`   | 20px   | `20`  | 80px   |
| `6`   | 24px   | `24`  | 96px   |

### Boolean prop defaults

| Prop      | `true` → | Pixels |
| --------- | -------- | ------ |
| `gap`     | `1`      | 4px    |
| `padding` | `4`      | 16px   |
| `margin`  | `4`      | 16px   |
| `border`  | `2`      | 2px    |
| `rounded` | `"md"`   | 4px    |
