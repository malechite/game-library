import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "../../../themes/contract.css";

export const tabsRoot = style({
  display: "flex",
  gap: vars.spacing[2],
  selectors: {
    "&[data-orientation='horizontal']": {
      flexDirection: "column"
    }
  }
});

const tabsListBase = style({});

export const tabsListRecipe = recipe({
  base: [
    tabsListBase,
    {
      display: "inline-flex",
      width: "fit-content",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: vars.radius.lg,
      padding: "3px",
      color: vars.color.mutedForeground
    }
  ],
  variants: {
    variant: {
      default: {
        backgroundColor: vars.color.muted
      },
      line: {
        gap: vars.spacing[1],
        backgroundColor: "transparent",
        borderRadius: 0
      }
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

/* Horizontal tabs list height */
globalStyle(`${tabsRoot}[data-orientation='horizontal'] ${tabsListBase}`, {
  height: "32px"
});

/* Vertical tabs list */
globalStyle(`${tabsRoot}[data-orientation='vertical'] ${tabsListBase}`, {
  height: "fit-content",
  flexDirection: "column"
});

const triggerBase = style({});

export const tabsTrigger = style([
  triggerBase,
  {
    position: "relative",
    display: "inline-flex",
    height: "calc(100% - 1px)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: vars.spacing[2],
    borderRadius: vars.radius.md,
    border: "1px solid transparent",
    paddingLeft: vars.spacing[2],
    paddingRight: vars.spacing[2],
    paddingTop: "2px",
    paddingBottom: "2px",
    fontSize: vars.font.size.xs,
    fontWeight: vars.font.weight.medium,
    whiteSpace: "nowrap",
    color: `color-mix(in oklch, ${vars.color.foreground} 60%, transparent)`,
    transition: "all 150ms ease",
    selectors: {
      "&:hover": {
        color: vars.color.foreground
      },
      "&:focus-visible": {
        borderColor: vars.color.ring,
        boxShadow: `0 0 0 3px color-mix(in oklch, ${vars.color.ring} 50%, transparent)`,
        outline: `1px solid ${vars.color.ring}`
      },
      "&:disabled": {
        pointerEvents: "none",
        opacity: 0.5
      },
      "&[aria-disabled='true']": {
        pointerEvents: "none",
        opacity: 0.5
      },
      /* active state */
      "&[data-active]": {
        backgroundColor: vars.color.background,
        color: vars.color.foreground
      }
    }
  }
]);

/* Dark mode active */
globalStyle(`.dark ${triggerBase}[data-active], [data-theme='dark'] ${triggerBase}[data-active]`, {
  borderColor: vars.color.input,
  backgroundColor: `color-mix(in oklch, ${vars.color.input} 30%, transparent)`,
  color: vars.color.foreground
});

/* Dark mode general text */
globalStyle(`.dark ${triggerBase}, [data-theme='dark'] ${triggerBase}`, {
  color: vars.color.mutedForeground
});

globalStyle(`.dark ${triggerBase}:hover, [data-theme='dark'] ${triggerBase}:hover`, {
  color: vars.color.foreground
});

/* Vertical mode: full width, left-aligned */
globalStyle(`${tabsRoot}[data-orientation='vertical'] ${triggerBase}`, {
  width: "100%",
  justifyContent: "flex-start",
  paddingTop: vars.spacing[1],
  paddingBottom: vars.spacing[1]
});

/* Line variant trigger overrides */
globalStyle(`${tabsListBase}[data-variant='line'] ${triggerBase}`, {
  backgroundColor: "transparent"
});

globalStyle(`${tabsListBase}[data-variant='line'] ${triggerBase}[data-active]`, {
  backgroundColor: "transparent"
});

globalStyle(
  `.dark ${tabsListBase}[data-variant='line'] ${triggerBase}[data-active], [data-theme='dark'] ${tabsListBase}[data-variant='line'] ${triggerBase}[data-active]`,
  {
    borderColor: "transparent",
    backgroundColor: "transparent"
  }
);

/* SVG styles */
globalStyle(`${triggerBase} svg`, {
  pointerEvents: "none",
  flexShrink: 0
});

globalStyle(`${triggerBase} svg:not([class*='size-'])`, {
  width: "14px",
  height: "14px"
});

/* After pseudo for line variant indicator */
globalStyle(`${triggerBase}::after`, {
  content: '""',
  position: "absolute",
  backgroundColor: vars.color.foreground,
  opacity: 0,
  transition: "opacity 150ms ease"
});

/* Horizontal after */
globalStyle(`${tabsRoot}[data-orientation='horizontal'] ${triggerBase}::after`, {
  left: 0,
  right: 0,
  bottom: "-5px",
  height: "2px"
});

/* Vertical after */
globalStyle(`${tabsRoot}[data-orientation='vertical'] ${triggerBase}::after`, {
  top: 0,
  bottom: 0,
  right: "-4px",
  width: "2px"
});

/* Line variant active after visible */
globalStyle(`${tabsListBase}[data-variant='line'] ${triggerBase}[data-active]::after`, {
  opacity: 1
});

export const tabsContent = style({
  flex: 1,
  fontSize: vars.font.size.xs,
  lineHeight: vars.font.lineHeight.relaxed,
  outline: "none"
});

export type TabsListVariants = RecipeVariants<typeof tabsListRecipe>;
