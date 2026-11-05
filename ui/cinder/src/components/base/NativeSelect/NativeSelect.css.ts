import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../../../themes/contract.css";

export const nativeSelectWrapperStyle = style({
  position: "relative",
  width: "fit-content",
  selectors: {
    "&:has(select:disabled)": {
      opacity: 0.5
    }
  }
});

export const nativeSelectStyle = recipe({
  base: {
    width: "100%",
    minWidth: 0,
    appearance: "none",
    borderRadius: vars.radius.md,
    border: `1px solid ${vars.color.input}`,
    backgroundColor: `color-mix(in oklch, ${vars.color.input} 20%, transparent)`,
    paddingBlock: "2px",
    paddingRight: "24px",
    paddingLeft: vars.spacing[2],
    fontSize: vars.font.size.xs,
    lineHeight: vars.font.lineHeight.relaxed,
    transition: "color 150ms ease, border-color 150ms ease, box-shadow 150ms ease",
    outline: "none",
    userSelect: "none",
    selectors: {
      "&::selection": {
        backgroundColor: vars.color.primary,
        color: vars.color.primaryForeground
      },
      "&::placeholder": {
        color: vars.color.mutedForeground
      },
      "&:focus-visible": {
        borderColor: vars.color.ring,
        boxShadow: `0 0 0 2px color-mix(in oklch, ${vars.color.ring} 30%, transparent)`
      },
      "&:disabled": {
        pointerEvents: "none",
        cursor: "not-allowed"
      },
      "&[aria-invalid]": {
        borderColor: vars.color.destructive,
        boxShadow: `0 0 0 2px color-mix(in oklch, ${vars.color.destructive} 20%, transparent)`
      }
    }
  },
  variants: {
    size: {
      default: {
        height: "28px"
      },
      sm: {
        height: "24px",
        fontSize: "0.625rem"
      }
    }
  },
  defaultVariants: {
    size: "default"
  }
});

export const nativeSelectIconStyle = recipe({
  base: {
    pointerEvents: "none",
    position: "absolute",
    top: "50%",
    right: "6px",
    transform: "translateY(-50%)",
    color: vars.color.mutedForeground,
    userSelect: "none"
  },
  variants: {
    size: {
      default: {
        width: "14px",
        height: "14px"
      },
      sm: {
        width: "12px",
        height: "12px",
        transform: "translateY(-5px)"
      }
    }
  },
  defaultVariants: {
    size: "default"
  }
});
