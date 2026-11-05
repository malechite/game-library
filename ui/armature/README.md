# @game-library/armature

**Armature** is a compositional React layout library where components use declarative boolean/number props instead of CSS class strings. Zero-runtime CSS via Vanilla Extract.

Armature is **design-agnostic** — it provides structural layout primitives, not visual design. Colors, icons, and brand-specific styling are handled by consuming packages.

## Before & After

```tsx
// Before: CSS class soup
<div className="flex flex-row items-center justify-between gap-2 w-full p-4 overflow-hidden">
  <div className="flex flex-row items-center gap-2">
    <span className="text-lg font-bold">Title</span>
    <span className="text-sm">subtitle</span>
  </div>
  <div className="flex-shrink-0">
    <button>Close</button>
  </div>
</div>

// After: every word is meaningful
<HStack center padding={4} gap={2} full>
  <HStack center gap={2}>
    <Title>Title</Title>
    <Caption>subtitle</Caption>
  </HStack>
  <Spacer />
  <Box stay>
    <button>Close</button>
  </Box>
</HStack>
```

## Quick Start

```bash
pnpm add @game-library/armature
```

```tsx
// 1. Import styles in your app's entry point
import "@game-library/armature/styles.css";

// 2. Apply the default theme (or your own)
import { defaultTheme } from "@game-library/armature";
document.body.classList.add(defaultTheme);

// 3. Use components
import { HStack, VStack, Spacer, Surface, Text } from "@game-library/armature";
```

---

## Core Layout Components

### Box

The foundation of everything. Every layout component composes from Box. It renders a `<div>` with flex display by default.

```tsx
import { Box } from "@game-library/armature";
import { Orientation } from "@game-library/types";

<Box orientation={Orientation.Horizontal} center gap={2} padding={4}>
  <div>Item 1</div>
  <div>Item 2</div>
</Box>;
```

#### Props

| Prop                               | Type                | Default | Description                                |
| ---------------------------------- | ------------------- | ------- | ------------------------------------------ |
| `orientation`                      | `Orientation`       | —       | `Horizontal` (row) or `Vertical` (column)  |
| `center`                           | `boolean`           | —       | Center children on both axes               |
| `justifyCenter`                    | `boolean`           | —       | Center on main axis only                   |
| `justifyLeft`                      | `boolean`           | —       | Align to start of main axis                |
| `expand`                           | `boolean`           | —       | `flex: 1` + `width: 100%` + `height: 100%` |
| `full`                             | `boolean`           | —       | `width: 100%` only                         |
| `stay`                             | `boolean`           | —       | `flex-shrink: 0` — prevent collapse        |
| `wrap`                             | `boolean`           | —       | Enable flex wrapping                       |
| `gap`                              | `boolean \| number` | —       | Space between children (`true` = 4px)      |
| `padding`                          | `boolean \| number` | —       | All-side padding (`true` = 16px)           |
| `paddingX/Y/Top/Right/Bottom/Left` | `boolean \| number` | —       | Granular padding                           |
| `margin`                           | `boolean \| number` | —       | All-side margin (`true` = 16px)            |
| `marginTop/Right/Bottom/Left`      | `boolean \| number` | —       | Granular margin                            |
| `border`                           | `boolean \| number` | —       | Border width (`true` = 2px)                |
| `rounded`                          | `boolean \| Size`   | —       | Border radius (`true` = "md"/4px)          |
| `absolute`                         | `boolean`           | —       | `position: absolute`                       |
| `fixed`                            | `boolean`           | —       | `position: fixed`                          |
| `top/right/bottom/left`            | `boolean \| number` | —       | Position offsets (requires absolute/fixed) |
| `scroll`                           | `boolean`           | —       | `overflow: auto`                           |
| `overflow`                         | `boolean`           | —       | Allow overflow (default is hidden)         |
| `grid`                             | `boolean`           | —       | Switch to CSS grid display                 |
| `block`                            | `boolean`           | —       | Switch to block display                    |
| `noscrollbar`                      | `boolean`           | —       | Hide scrollbar                             |
| `layer1/2/5`                       | `boolean`           | —       | z-index 10/20/50                           |
| `invisible`                        | `boolean`           | —       | `opacity: 0`                               |
| `passThrough`                      | `boolean`           | —       | `pointer-events: none`                     |
| `spin`                             | `boolean`           | —       | CSS spin animation                         |
| `onClick`                          | `function`          | —       | Click handler (adds pointer cursor)        |

**Default behavior**: `display: flex`, `flex-direction: column`, `position: relative`, `overflow: hidden`.

### HStack / VStack

Box with a locked orientation. Use these instead of Box when you know the direction.

```tsx
import { HStack, VStack } from "@game-library/armature";

// Horizontal row
<HStack gap={2} center>
  <Avatar />
  <Text>Username</Text>
</HStack>

// Vertical column
<VStack gap={4} padding={4}>
  <Title>Section</Title>
  <Text>Content here</Text>
</VStack>
```

- **HStack** = `<Box orientation={Orientation.Horizontal}>`
- **VStack** = `<Box orientation={Orientation.Vertical}>`

Both accept all Box props.

### Surface

A pre-configured Box for card-like containers. Defaults to vertical layout with padding, gap, and rounded corners.

```tsx
import { Surface } from "@game-library/armature";

<Surface>
  <Title>Card Title</Title>
  <Text>Card content goes here.</Text>
</Surface>;
```

**Defaults**: `orientation: Vertical`, `rounded: Size.Small`, `padding: 4`, `gap: 4`

Override any default by passing the prop explicitly:

```tsx
<Surface padding={6} gap={2} rounded={Size.Large}>
  <Text>Custom Surface</Text>
</Surface>
```

### Grid

CSS Grid layout with equal-width columns (1-12).

```tsx
import { Grid, Surface } from "@game-library/armature";

<Grid cols={3} gap={4}>
  <Surface>Card 1</Surface>
  <Surface>Card 2</Surface>
  <Surface>Card 3</Surface>
</Grid>;
```

The `cols` prop sets `grid-template-columns: repeat(N, minmax(0, 1fr))`.

### List

A semantic `<ul>` with flex column layout and no list styling.

```tsx
import { List } from "@game-library/armature";

<List gap={2}>
  <li>Item A</li>
  <li>Item B</li>
  <li>Item C</li>
</List>;
```

| Prop   | Type                | Description         |
| ------ | ------------------- | ------------------- |
| `gap`  | `boolean \| number` | Space between items |
| `stay` | `boolean`           | `flex-shrink: 0`    |

### InlineList

A horizontal `<ul>` with delimiters between items.

```tsx
import { InlineList } from "@game-library/armature";

<InlineList items={[{ label: "Action" }, { label: "Adventure" }, { label: "RPG" }]} delimiter="•" bold />;
// Renders: Action • Adventure • RPG
```

| Prop        | Type                | Default | Description               |
| ----------- | ------------------- | ------- | ------------------------- |
| `items`     | `InlineListItem[]`  | —       | `{ label, media?, img? }` |
| `gap`       | `boolean \| number` | `2`     | Space between items       |
| `delimiter` | `string`            | `"•"`   | Separator between items   |
| `textSize`  | `TextSize`          | —       | Text size                 |
| `bold`      | `boolean`           | —       | Bold text                 |
| `color`     | `Color`             | —       | Text color                |
| `center`    | `boolean`           | —       | Center justify            |

### Divider

A semantic `<hr>` with a top border.

```tsx
import { Divider } from "@game-library/armature";

<VStack gap={4}>
  <Text>Above</Text>
  <Divider />
  <Text>Below</Text>
</VStack>

// With custom color
<Divider color="#444" />
```

### FullScreenViewport

A Box that fills the entire viewport (100vw x 100vh).

```tsx
import { FullScreenViewport } from "@game-library/armature";

<FullScreenViewport center>
  <Text>Centered on screen</Text>
</FullScreenViewport>;
```

---

## The Spacer Pattern

Spacer is the signature component of Armature. It's a Box with `expand` set to true, meaning it uses `flex: 1` to fill all available space along the parent's flex axis.

```tsx
import { Spacer } from "@game-library/armature";

// Fills remaining horizontal space
<HStack center>
  <Title>Page Title</Title>
  <Spacer />
  <CloseButton />
</HStack>;
```

### Why Spacer instead of space-between?

`justify-content: space-between` distributes **all** children evenly. This breaks when you want items grouped together on one side:

```
With space-between and 3 items:
  [Item A]          [Item B]          [Item C]
  ← evenly distributed — Item B is in the middle

With Spacer:
  [Item A] [Item B]                   [Item C]
  ← A and B stay together, Spacer pushes C to the right
```

Spacer gives you **explicit control** over where the gap goes. Everything before the Spacer stays grouped; everything after gets pushed away.

### Canonical patterns

**Header bar** — title on left, actions on right:

```tsx
<HStack center gap={2} padding={4}>
  <Icon type="menu" />
  <Title>Dashboard</Title>
  <Spacer />
  <NotificationBell />
  <Avatar />
</HStack>
```

**Right-aligned buttons**:

```tsx
<HStack padding={4}>
  <Spacer />
  <Button>Cancel</Button>
  <Button>Save</Button>
</HStack>
```

**Sidebar** — nav pinned to top, settings pinned to bottom:

```tsx
<VStack expand padding={4} gap={2}>
  <NavItem>Home</NavItem>
  <NavItem>Projects</NavItem>
  <NavItem>Settings</NavItem>
  <Spacer />
  <UserProfile />
</VStack>
```

**Constrained Spacer** — limit the maximum space:

```tsx
<Spacer width={10} />   {/* max 10rem wide */}
<Spacer height={3} />   {/* max 3rem tall */}
```

---

## Composition Patterns

### Card with header

```tsx
<Surface style={{ borderColor: "#333", border: "1px solid #333" }}>
  <HStack center>
    <Title>Card Title</Title>
    <Spacer />
    <Caption>View All</Caption>
  </HStack>
  <Divider />
  <Text>Card body content goes here.</Text>
</Surface>
```

### Page layout with sidebar

```tsx
<HStack expand>
  <VStack padding={4} gap={2} style={{ width: 240 }} stay>
    <Title>App</Title>
    <Divider />
    <List gap={1}>
      <li>Dashboard</li>
      <li>Projects</li>
      <li>Settings</li>
    </List>
    <Spacer />
    <Caption>v1.0.0</Caption>
  </VStack>
  <VStack expand padding={6} gap={4} scroll>
    {/* Main content */}
  </VStack>
</HStack>
```

### Stat card

```tsx
<Surface gap={2} style={{ border: "1px solid #333" }}>
  <HStack center gap={2}>
    <Icon type="chart" />
    <Text size={TextSize.StaticXLarge}>1,234</Text>
  </HStack>
  <Spacer />
  <Caption>Active Users</Caption>
</Surface>
```

### Form layout

```tsx
<VStack gap={4} padding={6}>
  <VStack gap={2}>
    <Text bold>Email</Text>
    <input type="email" />
  </VStack>
  <VStack gap={2}>
    <Text bold>Password</Text>
    <input type="password" />
  </VStack>
  <Divider />
  <HStack>
    <Spacer />
    <button>Sign In</button>
  </HStack>
</VStack>
```

### Card grid

```tsx
<Grid cols={3} gap={4}>
  {items.map((item) => (
    <Surface key={item.id}>
      <Title>{item.name}</Title>
      <Text>{item.description}</Text>
    </Surface>
  ))}
</Grid>
```

---

## Text System

Armature includes a polymorphic Text component and named variants:

| Component    | Element  | Default Size        |
| ------------ | -------- | ------------------- |
| `Text`       | `<span>` | StaticMedium        |
| `PageTitle`  | `<h1>`   | DynamicHeading1     |
| `Heading`    | `<h2>`   | DynamicHeading2     |
| `SubHeading` | `<h3>`   | DynamicHeading3     |
| `Title`      | `<h4>`   | DynamicHeading4     |
| `SubTitle`   | `<h5>`   | StaticMedium (bold) |
| `Caption`    | `<span>` | StaticSmall         |
| `Span`       | `<span>` | StaticMedium        |
| `P`          | `<p>`    | StaticMedium        |
| `Link`       | `<span>` | StaticMedium        |

**Text props**: `size`, `bold`, `underline`, `truncate`, `nowrap`, `capitalize`, `uppercase`, `maxLines`, `color`, `font`, `center`, `right`, `stay`, `full`, `href`

---

## Additional Components

| Component       | Description                                   |
| --------------- | --------------------------------------------- |
| `Img`           | Image wrapper with expand/cover support       |
| `Circle`        | Circular container with Size-based dimensions |
| `Chevron`       | SVG chevron arrow with rotation               |
| `Spinner`       | Animated loading circle                       |
| `Overlay`       | Full-screen modal backdrop                    |
| `ModalProvider` | Context provider for modal state              |

---

## Hooks

| Hook                          | Description                                                           |
| ----------------------------- | --------------------------------------------------------------------- |
| `useModal()`                  | `{ openModal, closeModal, isOpen }` — modal context                   |
| `useInteractiveState()`       | `{ interactiveState, interactiveProps }` — hover/press/focus tracking |
| `useRefDimensions(ref)`       | `{ width, height }` via ResizeObserver                                |
| `useBodyScrollLock(lock)`     | Prevent body scroll when true                                         |
| `useOnKeyDown(key, fn, opts)` | Global keydown listener                                               |
| `useHotKeys(bindings)`        | Multi-key binding system (skips when input focused)                   |
| `useModifierKeys()`           | `{ meta, ctrl, shift, alt }` — track held modifiers                   |

Convenience key hooks: `useOnEscKey`, `useOnEnterKey`, `useOnDeleteKey`, `useOnSpaceKey`

---

## Theme System

Armature uses a three-layer Vanilla Extract theme system:

1. **Contract** (`themeContract`) — defines the token schema (spacing, radii, shadows, typography)
2. **Default Theme** (`defaultTheme`) — fills the contract with standard values
3. **Sprinkles** (`sprinkles`) — generates atomic utility classes with responsive conditions

### Applying a theme

Themes are CSS classes. Add them to any parent element:

```tsx
import { defaultTheme } from "@game-library/armature";
document.body.classList.add(defaultTheme);
```

### Custom themes

```tsx
import { createTheme } from "@vanilla-extract/css";
import { themeContract } from "@game-library/armature";

export const myTheme = createTheme(themeContract, {
  spacing: { 0: "0px", 1: "4px", 2: "8px" /* ... */ },
  radii: { none: "0px", sm: "4px" /* ... */ }
  // ...
});
```

### Spacing scale

| Value | Pixels | Value | Pixels |
| ----- | ------ | ----- | ------ |
| `0`   | 0px    | `8`   | 32px   |
| `1`   | 4px    | `9`   | 36px   |
| `2`   | 8px    | `10`  | 40px   |
| `3`   | 12px   | `12`  | 48px   |
| `4`   | 16px   | `16`  | 64px   |
| `5`   | 20px   | `20`  | 80px   |
| `6`   | 24px   | `24`  | 96px   |
| `7`   | 28px   | `32+` | ...    |

### Responsive conditions

Sprinkles support three breakpoints: `mobile` (default), `tablet` (768px+), `desktop` (1024px+).

---

## Prop Default Reference

Boolean props use sensible defaults:

| Prop      | `true` resolves to | Pixels |
| --------- | ------------------ | ------ |
| `gap`     | `1`                | 4px    |
| `padding` | `4`                | 16px   |
| `margin`  | `4`                | 16px   |
| `border`  | `2`                | 2px    |
| `rounded` | `"md"`             | 4px    |

### Box defaults (always active)

- `display: flex`
- `flex-direction: column` (when no orientation set)
- `position: relative`
- `overflow: hidden`
