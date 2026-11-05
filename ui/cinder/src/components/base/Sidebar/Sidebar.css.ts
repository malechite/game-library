import { style, globalStyle } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../../themes/contract.css";

/* ─── SidebarProvider ─── */
export const sidebarWrapperStyle = style({
  display: "flex",
  minHeight: "100svh",
  width: "100%"
});

globalStyle(`${sidebarWrapperStyle}:has([data-variant=inset])`, {
  backgroundColor: vars.color.sidebar
});

/* ─── Sidebar (collapsible=none) ─── */
export const sidebarNoneStyle = style({
  display: "flex",
  height: "100%",
  width: "var(--sidebar-width)",
  flexDirection: "column",
  backgroundColor: vars.color.sidebar,
  color: vars.color.sidebarForeground
});

/* ─── Sidebar mobile sheet content ─── */
export const sidebarMobileContentStyle = style({
  width: "var(--sidebar-width)",
  backgroundColor: vars.color.sidebar,
  padding: 0,
  color: vars.color.sidebarForeground
});

globalStyle(`${sidebarMobileContentStyle} > button`, {
  display: "none"
});

export const sidebarMobileInnerStyle = style({
  display: "flex",
  height: "100%",
  width: "100%",
  flexDirection: "column"
});

/* ─── Sidebar desktop outer ─── */
export const sidebarDesktopOuterStyle = style({
  display: "none",
  color: vars.color.sidebarForeground,
  "@media": {
    "(min-width: 768px)": {
      display: "block"
    }
  }
});

/* ─── Sidebar gap (spacer) ─── */
export const sidebarGapStyle = style({
  position: "relative",
  width: "var(--sidebar-width)",
  backgroundColor: "transparent",
  transition: "width 200ms linear"
});

/* Group-data collapsible states via selectors */
globalStyle(`[data-collapsible=offcanvas] ${sidebarGapStyle}`, {
  width: 0
});

globalStyle(`[data-side=right] ${sidebarGapStyle}`, {
  transform: "rotate(180deg)"
});

export const sidebarGapIconStyle = style({
  selectors: {
    [`[data-collapsible=icon] &`]: {
      width: "var(--sidebar-width-icon)"
    }
  }
});

export const sidebarGapFloatingStyle = style({
  selectors: {
    [`[data-collapsible=icon] &`]: {
      width: "calc(var(--sidebar-width-icon) + var(--spacing, 1rem))"
    }
  }
});

/* ─── Sidebar container (fixed positioned) ─── */
export const sidebarContainerStyle = style({
  position: "fixed",
  top: 0,
  bottom: 0,
  zIndex: 10,
  display: "none",
  height: "100svh",
  width: "var(--sidebar-width)",
  transition: "left 200ms linear, right 200ms linear, width 200ms linear",
  "@media": {
    "(min-width: 768px)": {
      display: "flex"
    }
  },
  selectors: {
    '&[data-side="left"]': {
      left: 0
    },
    '&[data-side="right"]': {
      right: 0
    }
  }
});

globalStyle(`[data-collapsible=offcanvas] ${sidebarContainerStyle}[data-side=left]`, {
  left: "calc(var(--sidebar-width) * -1)"
});

globalStyle(`[data-collapsible=offcanvas] ${sidebarContainerStyle}[data-side=right]`, {
  right: "calc(var(--sidebar-width) * -1)"
});

export const sidebarContainerDefaultStyle = style({
  selectors: {
    [`[data-collapsible=icon] &`]: {
      width: "var(--sidebar-width-icon)"
    },
    [`[data-side=left] &`]: {
      borderRight: `1px solid ${vars.color.border}`
    },
    [`[data-side=right] &`]: {
      borderLeft: `1px solid ${vars.color.border}`
    }
  }
});

export const sidebarContainerFloatingStyle = style({
  padding: vars.spacing[2],
  selectors: {
    [`[data-collapsible=icon] &`]: {
      width: "calc(var(--sidebar-width-icon) + var(--spacing, 1rem) + 2px)"
    }
  }
});

/* ─── Sidebar inner ─── */
export const sidebarInnerStyle = style({
  display: "flex",
  width: "100%",
  height: "100%",
  flexDirection: "column",
  backgroundColor: vars.color.sidebar
});

globalStyle(`[data-variant=floating] ${sidebarInnerStyle}`, {
  borderRadius: vars.radius.lg,
  boxShadow: vars.shadow.sm,
  outline: `1px solid ${vars.color.sidebarBorder}`
});

/* ─── SidebarTrigger ─── */
export const sidebarTriggerSrOnly = style({
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  borderWidth: 0
});

/* ─── SidebarRail ─── */
export const sidebarRailStyle = style({
  position: "absolute",
  top: 0,
  bottom: 0,
  zIndex: 20,
  display: "none",
  width: "16px",
  transition: "all 200ms linear",
  "@media": {
    "(min-width: 640px)": {
      display: "flex"
    }
  },
  selectors: {
    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      bottom: 0,
      left: "50%",
      width: "2px"
    },
    "&:hover::after": {
      backgroundColor: vars.color.sidebarBorder
    }
  }
});

globalStyle(`[data-side=left] ${sidebarRailStyle}`, {
  right: "-16px",
  transform: "translateX(-50%)"
});

globalStyle(`[data-side=right] ${sidebarRailStyle}`, {
  left: 0,
  transform: "translateX(-50%)"
});

globalStyle(`[data-side=left] ${sidebarRailStyle}`, {
  cursor: "w-resize"
});

globalStyle(`[data-side=right] ${sidebarRailStyle}`, {
  cursor: "e-resize"
});

globalStyle(`[data-side=left][data-state=collapsed] ${sidebarRailStyle}`, {
  cursor: "e-resize"
});

globalStyle(`[data-side=right][data-state=collapsed] ${sidebarRailStyle}`, {
  cursor: "w-resize"
});

globalStyle(`[data-collapsible=offcanvas] ${sidebarRailStyle}`, {
  transform: "translateX(0)"
});

globalStyle(`[data-collapsible=offcanvas] ${sidebarRailStyle}::after`, {
  left: "100%"
});

globalStyle(`[data-collapsible=offcanvas] ${sidebarRailStyle}:hover`, {
  backgroundColor: vars.color.sidebar
});

globalStyle(`[data-side=left][data-collapsible=offcanvas] ${sidebarRailStyle}`, {
  right: "-8px"
});

globalStyle(`[data-side=right][data-collapsible=offcanvas] ${sidebarRailStyle}`, {
  left: "-8px"
});

/* ─── SidebarInset ─── */
export const sidebarInsetStyle = style({
  position: "relative",
  display: "flex",
  width: "100%",
  flex: 1,
  flexDirection: "column",
  backgroundColor: vars.color.background
});

/* peer-data styles for inset variant */
/* These need to be applied via JavaScript context since vanilla-extract
   cannot target peer elements directly. We use global styles. */

/* ─── SidebarInput ─── */
export const sidebarInputStyle = style({
  height: "32px",
  width: "100%",
  borderColor: vars.color.input,
  backgroundColor: `color-mix(in oklch, ${vars.color.muted} 20%, transparent)`
});

/* ─── SidebarHeader ─── */
export const sidebarHeaderStyle = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing[2],
  padding: vars.spacing[2]
});

/* ─── SidebarFooter ─── */
export const sidebarFooterStyle = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing[2],
  padding: vars.spacing[2]
});

/* ─── SidebarSeparator ─── */
export const sidebarSeparatorStyle = style({
  marginInline: vars.spacing[2],
  width: "auto",
  backgroundColor: vars.color.sidebarBorder
});

/* ─── SidebarContent ─── */
export const sidebarContentStyle = style({
  display: "flex",
  minHeight: 0,
  flex: 1,
  flexDirection: "column",
  gap: 0,
  overflow: "auto",
  // no-scrollbar
  scrollbarWidth: "none",
  selectors: {
    "&::-webkit-scrollbar": {
      display: "none"
    }
  }
});

globalStyle(`[data-collapsible=icon] ${sidebarContentStyle}`, {
  overflow: "hidden"
});

/* ─── SidebarGroup ─── */
export const sidebarGroupStyle = style({
  position: "relative",
  display: "flex",
  width: "100%",
  minWidth: 0,
  flexDirection: "column",
  paddingInline: vars.spacing[2],
  paddingBlock: vars.spacing[1]
});

/* ─── SidebarGroupLabel ─── */
export const sidebarGroupLabelStyle = style({
  display: "flex",
  height: "32px",
  flexShrink: 0,
  alignItems: "center",
  borderRadius: vars.radius.md,
  paddingInline: vars.spacing[2],
  fontSize: vars.font.size.xs,
  color: `color-mix(in oklch, ${vars.color.sidebarForeground} 70%, transparent)`,
  outline: "none",
  transition: "margin 200ms linear, opacity 200ms linear",
  selectors: {
    "&:focus-visible": {
      boxShadow: `0 0 0 2px ${vars.color.sidebarRing}`
    }
  }
});

globalStyle(`[data-collapsible=icon] ${sidebarGroupLabelStyle}`, {
  marginTop: "-32px",
  opacity: 0
});

globalStyle(`${sidebarGroupLabelStyle} > svg`, {
  width: "16px",
  height: "16px",
  flexShrink: 0
});

/* ─── SidebarGroupAction ─── */
export const sidebarGroupActionStyle = style({
  position: "absolute",
  top: "14px",
  right: vars.spacing[3],
  display: "flex",
  aspectRatio: "1",
  width: "20px",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: vars.radius.md,
  padding: 0,
  color: vars.color.sidebarForeground,
  outline: "none",
  transition: "transform 200ms ease",
  selectors: {
    "&::after": {
      content: '""',
      position: "absolute",
      inset: "-8px"
    },
    "&:hover": {
      backgroundColor: vars.color.sidebarAccent,
      color: vars.color.sidebarAccentForeground
    },
    "&:focus-visible": {
      boxShadow: `0 0 0 2px ${vars.color.sidebarRing}`
    }
  }
});

globalStyle(`[data-collapsible=icon] ${sidebarGroupActionStyle}`, {
  display: "none"
});

globalStyle(`${sidebarGroupActionStyle} > svg`, {
  width: "16px",
  height: "16px",
  flexShrink: 0
});

/* ─── SidebarGroupContent ─── */
export const sidebarGroupContentStyle = style({
  width: "100%",
  fontSize: vars.font.size.xs
});

/* ─── SidebarMenu ─── */
export const sidebarMenuStyle = style({
  display: "flex",
  width: "100%",
  minWidth: 0,
  flexDirection: "column",
  gap: "1px"
});

/* ─── SidebarMenuItem ─── */
export const sidebarMenuItemStyle = style({
  position: "relative"
});

/* ─── SidebarMenuButton ─── */
export const sidebarMenuButtonRecipe = recipe({
  base: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    gap: vars.spacing[2],
    overflow: "hidden",
    borderRadius: `calc(${vars.radius.sm} + 2px)`,
    padding: vars.spacing[2],
    textAlign: "left",
    fontSize: vars.font.size.xs,
    outline: "none",
    transition: "width 200ms ease, height 200ms ease, padding 200ms ease",
    selectors: {
      "&:hover": {
        backgroundColor: vars.color.sidebarAccent,
        color: vars.color.sidebarAccentForeground
      },
      "&:focus-visible": {
        boxShadow: `0 0 0 2px ${vars.color.sidebarRing}`
      },
      "&:active": {
        backgroundColor: vars.color.sidebarAccent,
        color: vars.color.sidebarAccentForeground
      },
      "&:disabled": {
        pointerEvents: "none",
        opacity: 0.5
      },
      "&[aria-disabled]": {
        pointerEvents: "none",
        opacity: 0.5
      },
      "&[data-open]:hover": {
        backgroundColor: vars.color.sidebarAccent,
        color: vars.color.sidebarAccentForeground
      },
      "&[data-active]": {
        backgroundColor: vars.color.sidebarAccent,
        fontWeight: vars.font.weight.medium,
        color: vars.color.sidebarAccentForeground
      }
    }
  },
  variants: {
    variant: {
      default: {
        selectors: {
          "&:hover": {
            backgroundColor: vars.color.sidebarAccent,
            color: vars.color.sidebarAccentForeground
          }
        }
      },
      outline: {
        backgroundColor: vars.color.background,
        boxShadow: `0 0 0 1px ${vars.color.sidebarBorder}`,
        selectors: {
          "&:hover": {
            backgroundColor: vars.color.sidebarAccent,
            color: vars.color.sidebarAccentForeground,
            boxShadow: `0 0 0 1px ${vars.color.sidebarAccent}`
          }
        }
      }
    },
    size: {
      default: {
        height: "32px",
        fontSize: vars.font.size.xs
      },
      sm: {
        height: "28px",
        fontSize: vars.font.size.xs
      },
      lg: {
        height: "48px",
        fontSize: vars.font.size.xs
      }
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});

const menuButtonBase = style({});
export const sidebarMenuButtonBase = menuButtonBase;

globalStyle(`[data-collapsible=icon] ${menuButtonBase}`, {
  width: "32px !important",
  height: "32px !important",
  padding: `${vars.spacing[2]} !important`
});

globalStyle(`[data-collapsible=icon] ${menuButtonBase}[data-size=lg]`, {
  padding: "0 !important"
});

/* Has menu-action sibling: add padding-right */
globalStyle(`[data-sidebar=menu-item]:has([data-sidebar=menu-action]) ${menuButtonBase}`, {
  paddingRight: "32px"
});

globalStyle(`${menuButtonBase} svg`, {
  width: "16px",
  height: "16px",
  flexShrink: 0
});

globalStyle(`${menuButtonBase} > span:last-child`, {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
});

/* ─── SidebarMenuAction ─── */
export const sidebarMenuActionStyle = style({
  position: "absolute",
  top: "6px",
  right: "4px",
  display: "flex",
  aspectRatio: "1",
  width: "20px",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: `calc(${vars.radius.sm} - 2px)`,
  padding: 0,
  color: vars.color.sidebarForeground,
  outline: "none",
  transition: "transform 200ms ease",
  selectors: {
    "&::after": {
      content: '""',
      position: "absolute",
      inset: "-8px"
    },
    "&:hover": {
      backgroundColor: vars.color.sidebarAccent,
      color: vars.color.sidebarAccentForeground
    },
    "&:focus-visible": {
      boxShadow: `0 0 0 2px ${vars.color.sidebarRing}`
    }
  }
});

globalStyle(`[data-collapsible=icon] ${sidebarMenuActionStyle}`, {
  display: "none"
});

globalStyle(`${sidebarMenuActionStyle} > svg`, {
  width: "16px",
  height: "16px",
  flexShrink: 0
});

/* Size-specific positioning */
globalStyle(`[data-size=default] ~ ${sidebarMenuActionStyle}`, {
  top: "6px"
});

globalStyle(`[data-size=lg] ~ ${sidebarMenuActionStyle}`, {
  top: "10px"
});

globalStyle(`[data-size=sm] ~ ${sidebarMenuActionStyle}`, {
  top: "4px"
});

export const sidebarMenuActionShowOnHoverStyle = style({
  "@media": {
    "(min-width: 768px)": {
      opacity: 0
    }
  },
  selectors: {
    "&[aria-expanded]": {
      opacity: 1
    }
  }
});

globalStyle(`[data-sidebar=menu-item]:focus-within ${sidebarMenuActionShowOnHoverStyle}`, {
  opacity: 1
});

globalStyle(`[data-sidebar=menu-item]:hover ${sidebarMenuActionShowOnHoverStyle}`, {
  opacity: 1
});

/* ─── SidebarMenuBadge ─── */
export const sidebarMenuBadgeStyle = style({
  pointerEvents: "none",
  position: "absolute",
  right: "4px",
  display: "flex",
  height: "20px",
  minWidth: "20px",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: `calc(${vars.radius.sm} - 2px)`,
  paddingInline: vars.spacing[1],
  fontSize: vars.font.size.xs,
  fontWeight: vars.font.weight.medium,
  color: vars.color.sidebarForeground,
  fontVariantNumeric: "tabular-nums",
  userSelect: "none"
});

globalStyle(`[data-collapsible=icon] ${sidebarMenuBadgeStyle}`, {
  display: "none"
});

/* ─── SidebarMenuSkeleton ─── */
export const sidebarMenuSkeletonStyle = style({
  display: "flex",
  height: "32px",
  alignItems: "center",
  gap: vars.spacing[2],
  borderRadius: vars.radius.md,
  paddingInline: vars.spacing[2]
});

export const sidebarMenuSkeletonIconStyle = style({
  width: "16px",
  height: "16px",
  borderRadius: vars.radius.md
});

export const sidebarMenuSkeletonTextStyle = style({
  height: "16px",
  flex: 1,
  maxWidth: "var(--skeleton-width)"
});

/* ─── SidebarMenuSub ─── */
export const sidebarMenuSubStyle = style({
  marginInlineStart: "14px",
  display: "flex",
  minWidth: 0,
  transform: "translateX(1px)",
  flexDirection: "column",
  gap: vars.spacing[1],
  borderLeft: `1px solid ${vars.color.sidebarBorder}`,
  paddingInline: "10px",
  paddingBlock: "2px"
});

globalStyle(`[data-collapsible=icon] ${sidebarMenuSubStyle}`, {
  display: "none"
});

/* ─── SidebarMenuSubItem ─── */
export const sidebarMenuSubItemStyle = style({
  position: "relative"
});

/* ─── SidebarMenuSubButton ─── */
export const sidebarMenuSubButtonStyle = style({
  display: "flex",
  height: "28px",
  minWidth: 0,
  transform: "translateX(-1px)",
  alignItems: "center",
  gap: vars.spacing[2],
  overflow: "hidden",
  borderRadius: vars.radius.md,
  paddingInline: vars.spacing[2],
  color: vars.color.sidebarForeground,
  outline: "none",
  fontSize: vars.font.size.xs,
  selectors: {
    "&:hover": {
      backgroundColor: vars.color.sidebarAccent,
      color: vars.color.sidebarAccentForeground
    },
    "&:focus-visible": {
      boxShadow: `0 0 0 2px ${vars.color.sidebarRing}`
    },
    "&:active": {
      backgroundColor: vars.color.sidebarAccent,
      color: vars.color.sidebarAccentForeground
    },
    "&:disabled": {
      pointerEvents: "none",
      opacity: 0.5
    },
    "&[aria-disabled]": {
      pointerEvents: "none",
      opacity: 0.5
    },
    "&[data-active]": {
      backgroundColor: vars.color.sidebarAccent,
      color: vars.color.sidebarAccentForeground
    }
  }
});

globalStyle(`[data-collapsible=icon] ${sidebarMenuSubButtonStyle}`, {
  display: "none"
});

globalStyle(`${sidebarMenuSubButtonStyle} > span:last-child`, {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
});

globalStyle(`${sidebarMenuSubButtonStyle} > svg`, {
  width: "16px",
  height: "16px",
  flexShrink: 0,
  color: vars.color.sidebarAccentForeground
});

/* ─── SidebarInset peer styles ─── */
/* These handle md:peer-data-[variant=inset] styles */
globalStyle(`[data-slot=sidebar][data-variant=inset] ~ ${sidebarInsetStyle}`, {
  "@media": {
    "(min-width: 768px)": {
      margin: vars.spacing[2],
      marginLeft: 0,
      borderRadius: vars.radius.xl,
      boxShadow: vars.shadow.sm
    }
  }
} as any);

globalStyle(`[data-slot=sidebar][data-variant=inset][data-state=collapsed] ~ ${sidebarInsetStyle}`, {
  "@media": {
    "(min-width: 768px)": {
      marginLeft: vars.spacing[2]
    }
  }
} as any);

export type SidebarMenuButtonVariants = RecipeVariants<typeof sidebarMenuButtonRecipe>;
