# @game-library/cinder

## Overview

Cinder is the React UI component library built on Base UI headless primitives with Vanilla Extract styling. It provides both prop-driven convenience components and low-level building blocks.

## Component Standards

### Arrow Functions Only

All components must use `const` arrow functions, not `function` declarations:

```tsx
// Correct
const Input = ({ className, ...props }: React.ComponentProps<"input">) => (
  <InputPrimitive className={cn(inputStyle, className)} {...props} />
);

// Wrong
function Input({ className, ...props }: React.ComponentProps<"input">) {
  return <InputPrimitive className={cn(inputStyle, className)} {...props} />;
}
```

Use implicit returns `=> (...)` for single-expression components. Use `=> { ... return ... }` only when the body has multiple statements.

### Two-Tier Export Pattern

Components with compound children (lists, menus, tabs, etc.) use a two-tier pattern:

1. **Prop-driven wrapper** (primary) — `ComponentName.tsx` accepts data/config props
2. **Primitives** (advanced) — `ComponentNameComponents.tsx` exports building blocks

```
Select/
  Select.tsx              ← prop-driven: accepts options[]
  SelectComponents.tsx    ← primitives: SelectRoot, SelectTrigger, SelectItem, etc.
  Select.css.ts           ← Vanilla Extract styles
  Select.stories.tsx      ← stories for prop-driven component
  index.ts                ← exports both tiers
```

Primitive root components use the `*Root` suffix (e.g. `SelectRoot`, `TabsRoot`, `AccordionRoot`) to avoid name collisions with prop-driven wrappers.

### File Structure

Each component lives in its own directory:

```
ComponentName/
  ComponentName.tsx       ← component implementation ("use client" directive)
  ComponentName.css.ts    ← Vanilla Extract styles (recipes, styles, globalStyles)
  ComponentName.stories.tsx
  index.ts                ← named exports
```

### Naming Conventions

- Component directories: PascalCase (`Button/`, `DropdownMenu/`)
- Style files: match component name (`Button.css.ts`)
- Always include `data-slot="component-name"` attributes
- Use `cn()` from `lib/utils` for class merging

## Styling

- **Vanilla Extract** — `@vanilla-extract/css`, `@vanilla-extract/recipes` for variants
- **Theme contract** — `vars` from `themes/contract.css` for all token references
- **Recipes** for variant-driven components (Button, Badge, Tabs, etc.)
- **Plain styles** for single-variant components (Input, Card, etc.)
- **`cn()`** utility (clsx wrapper) for merging classes

## Icons

Use `CinderIconType` string props (e.g. `"Gear"`, `"Trash"`), never raw SVG imports. The `Icon` component wraps the unified Icon (`@game-library/icon`) with Cinder-appropriate default sizes.

```tsx
import { Icon, type CinderIconType } from "../Icon";

interface MyProps {
  icon?: CinderIconType;
}

const MyComponent = ({ icon }: MyProps) => <div>{icon && <Icon type={icon} />}</div>;
```

## Key Commands

- `pnpm --filter @game-library/cinder typecheck` — TypeScript check
- `pnpm storybook` — Run Storybook (from repo root)

## Dependencies

- `@base-ui/react` — Headless component primitives
- `@game-library/armature` — Base layout library, Icon system, theme tokens
- `@game-library/types` — Shared TypeScript types (Size, IconWeight, etc.)
- `@game-library/icon` — Unified Phosphor icon system (SFIcon, SFIconType)
- `@game-library/tokens` — Design tokens (colors, gradients, gemstone palette)
