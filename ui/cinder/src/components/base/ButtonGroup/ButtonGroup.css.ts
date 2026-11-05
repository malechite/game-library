import { style, globalStyle } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../../themes/contract.css";

export const buttonGroupRecipe = recipe({
  base: {
    display: "flex",
    width: "fit-content",
    alignItems: "stretch"
  },
  variants: {
    orientation: {
      horizontal: {},
      vertical: {
        flexDirection: "column"
      }
    }
  },
  defaultVariants: {
    orientation: "horizontal"
  }
});

const buttonGroupBase = style({});

/* Focus-visible children get stacking context */
globalStyle(`${buttonGroupBase} > *:focus-visible`, {
  position: "relative",
  zIndex: 10
});

/* Nested button-group children get gap */
globalStyle(`${buttonGroupBase}:has(> [data-slot=button-group])`, {
  gap: "8px"
});

/* Select trigger last-of-type without w- class gets w-fit */
globalStyle(`${buttonGroupBase} > [data-slot=select-trigger]:not([class*='w-'])`, {
  width: "fit-content"
});

/* Input children flex */
globalStyle(`${buttonGroupBase} > input`, {
  flex: 1
});

/* Horizontal: all data-slot children get rounded-right-none */
globalStyle(`${buttonGroupBase}[data-orientation="horizontal"] > [data-slot]`, {
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0
});

/* Horizontal: last data-slot child gets rounded-right-md */
globalStyle(`${buttonGroupBase}[data-orientation="horizontal"] > [data-slot]:last-child`, {
  borderTopRightRadius: vars.radius.md,
  borderBottomRightRadius: vars.radius.md
});

/* Horizontal: subsequent data-slot children */
globalStyle(`${buttonGroupBase}[data-orientation="horizontal"] > [data-slot] ~ [data-slot]`, {
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
  borderLeftWidth: 0
});

/* Vertical: all data-slot children get rounded-bottom-none */
globalStyle(`${buttonGroupBase}[data-orientation="vertical"] > [data-slot]`, {
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0
});

/* Vertical: last data-slot child gets rounded-bottom-md */
globalStyle(`${buttonGroupBase}[data-orientation="vertical"] > [data-slot]:last-child`, {
  borderBottomLeftRadius: vars.radius.md,
  borderBottomRightRadius: vars.radius.md
});

/* Vertical: subsequent data-slot children */
globalStyle(`${buttonGroupBase}[data-orientation="vertical"] > [data-slot] ~ [data-slot]`, {
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  borderTopWidth: 0
});

export const buttonGroupBaseClass = buttonGroupBase;

export const buttonGroupTextStyle = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  borderRadius: vars.radius.md,
  border: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.muted,
  paddingInline: "10px",
  fontSize: vars.font.size.xs,
  lineHeight: vars.font.lineHeight.relaxed,
  fontWeight: vars.font.weight.medium
});

globalStyle(`${buttonGroupTextStyle} svg`, {
  pointerEvents: "none"
});

globalStyle(`${buttonGroupTextStyle} svg:not([class*='size-'])`, {
  width: "16px",
  height: "16px"
});

export const buttonGroupSeparatorStyle = style({
  position: "relative",
  alignSelf: "stretch",
  backgroundColor: vars.color.input,
  selectors: {
    '&[data-orientation="horizontal"]': {
      marginInline: "1px",
      width: "auto"
    },
    '&[data-orientation="vertical"]': {
      marginBlock: "1px",
      height: "auto"
    }
  }
});

export type ButtonGroupVariants = RecipeVariants<typeof buttonGroupRecipe>;
