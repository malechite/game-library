"use client";

import * as React from "react";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { useIsMobile } from "../../../hooks/UseMobile";
import { cn } from "../../../lib/utils";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { Separator } from "../Separator/Separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../Sheet/Sheet";
import { Skeleton } from "../Skeleton/Skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "../Tooltip/Tooltip";
import { SidebarIcon } from "@phosphor-icons/react";
import {
  sidebarWrapperStyle,
  sidebarNoneStyle,
  sidebarMobileContentStyle,
  sidebarMobileInnerStyle,
  sidebarDesktopOuterStyle,
  sidebarGapStyle,
  sidebarGapIconStyle,
  sidebarGapFloatingStyle,
  sidebarContainerStyle,
  sidebarContainerDefaultStyle,
  sidebarContainerFloatingStyle,
  sidebarInnerStyle,
  sidebarTriggerSrOnly,
  sidebarRailStyle,
  sidebarInsetStyle,
  sidebarInputStyle,
  sidebarHeaderStyle,
  sidebarFooterStyle,
  sidebarSeparatorStyle,
  sidebarContentStyle,
  sidebarGroupStyle,
  sidebarGroupLabelStyle,
  sidebarGroupActionStyle,
  sidebarGroupContentStyle,
  sidebarMenuStyle,
  sidebarMenuItemStyle,
  sidebarMenuButtonRecipe,
  sidebarMenuButtonBase,
  sidebarMenuActionStyle,
  sidebarMenuActionShowOnHoverStyle,
  sidebarMenuBadgeStyle,
  sidebarMenuSkeletonStyle,
  sidebarMenuSkeletonIconStyle,
  sidebarMenuSkeletonTextStyle,
  sidebarMenuSubStyle,
  sidebarMenuSubItemStyle,
  sidebarMenuSubButtonStyle,
  type SidebarMenuButtonVariants
} from "./Sidebar.css";

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContextProps = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextProps | null>(null);

const useSidebar = () => {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
};

const SidebarProvider = ({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) => {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);

  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }

      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open]
  );

  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  }, [isMobile, setOpen, setOpenMobile]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  const state = open ? "expanded" : "collapsed";

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        data-slot="sidebar-wrapper"
        style={
          {
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
            ...style
          } as React.CSSProperties
        }
        className={cn(sidebarWrapperStyle, className)}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
};

const Sidebar = ({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  dir,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
}) => {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === "none") {
    return (
      <div data-slot="sidebar" className={cn(sidebarNoneStyle, className)} {...props}>
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          dir={dir}
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className={sidebarMobileContentStyle}
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE
            } as React.CSSProperties
          }
          side={side}
        >
          <SheetHeader className={sidebarTriggerSrOnly}>
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className={sidebarMobileInnerStyle}>{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className={sidebarDesktopOuterStyle}
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          sidebarGapStyle,
          variant === "floating" || variant === "inset" ? sidebarGapFloatingStyle : sidebarGapIconStyle
        )}
      />
      <div
        data-slot="sidebar-container"
        data-side={side}
        className={cn(
          sidebarContainerStyle,
          variant === "floating" || variant === "inset" ? sidebarContainerFloatingStyle : sidebarContainerDefaultStyle,
          className
        )}
        {...props}
      >
        <div data-sidebar="sidebar" data-slot="sidebar-inner" className={sidebarInnerStyle}>
          {children}
        </div>
      </div>
    </div>
  );
};

const SidebarTrigger = ({ className, onClick, ...props }: React.ComponentProps<typeof Button>) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon-sm"
      className={cn(className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <SidebarIcon />
      <span className={sidebarTriggerSrOnly}>Toggle Sidebar</span>
    </Button>
  );
};

const SidebarRail = ({ className, ...props }: React.ComponentProps<"button">) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(sidebarRailStyle, className)}
      {...props}
    />
  );
};

const SidebarInset = ({ className, ...props }: React.ComponentProps<"main">) => (
  <main data-slot="sidebar-inset" className={cn(sidebarInsetStyle, className)} {...props} />
);

const SidebarInput = ({ className, ...props }: React.ComponentProps<typeof Input>) => (
  <Input data-slot="sidebar-input" data-sidebar="input" className={cn(sidebarInputStyle, className)} {...props} />
);

const SidebarHeader = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="sidebar-header" data-sidebar="header" className={cn(sidebarHeaderStyle, className)} {...props} />
);

const SidebarFooter = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="sidebar-footer" data-sidebar="footer" className={cn(sidebarFooterStyle, className)} {...props} />
);

const SidebarSeparator = ({ className, ...props }: React.ComponentProps<typeof Separator>) => (
  <Separator data-slot="sidebar-separator" data-sidebar="separator" className={cn(sidebarSeparatorStyle, className)} {...props} />
);

const SidebarContent = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="sidebar-content" data-sidebar="content" className={cn(sidebarContentStyle, className)} {...props} />
);

const SidebarGroup = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="sidebar-group" data-sidebar="group" className={cn(sidebarGroupStyle, className)} {...props} />
);

const SidebarGroupLabel = ({ className, render, ...props }: useRender.ComponentProps<"div"> & React.ComponentProps<"div">) =>
  useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(sidebarGroupLabelStyle, className)
      },
      props
    ),
    render,
    state: {
      slot: "sidebar-group-label",
      sidebar: "group-label"
    }
  });

const SidebarGroupAction = ({
  className,
  render,
  ...props
}: useRender.ComponentProps<"button"> & React.ComponentProps<"button">) =>
  useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: cn(sidebarGroupActionStyle, className)
      },
      props
    ),
    render,
    state: {
      slot: "sidebar-group-action",
      sidebar: "group-action"
    }
  });

const SidebarGroupContent = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    data-slot="sidebar-group-content"
    data-sidebar="group-content"
    className={cn(sidebarGroupContentStyle, className)}
    {...props}
  />
);

const SidebarMenu = ({ className, ...props }: React.ComponentProps<"ul">) => (
  <ul data-slot="sidebar-menu" data-sidebar="menu" className={cn(sidebarMenuStyle, className)} {...props} />
);

const SidebarMenuItem = ({ className, ...props }: React.ComponentProps<"li">) => (
  <li data-slot="sidebar-menu-item" data-sidebar="menu-item" className={cn(sidebarMenuItemStyle, className)} {...props} />
);

const SidebarMenuButton = ({
  render,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}: useRender.ComponentProps<"button"> &
  React.ComponentProps<"button"> & {
    isActive?: boolean;
    tooltip?: string | React.ComponentProps<typeof TooltipContent>;
  } & SidebarMenuButtonVariants) => {
  const { isMobile, state } = useSidebar();
  const comp = useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: cn(sidebarMenuButtonRecipe({ variant, size }), sidebarMenuButtonBase, className)
      },
      props
    ),
    render: !tooltip ? render : <TooltipTrigger render={render} />,
    state: {
      slot: "sidebar-menu-button",
      sidebar: "menu-button",
      size,
      active: isActive
    }
  });

  if (!tooltip) {
    return comp;
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip
    };
  }

  return (
    <Tooltip>
      {comp}
      <TooltipContent side="right" align="center" hidden={state !== "collapsed" || isMobile} {...tooltip} />
    </Tooltip>
  );
};

const SidebarMenuAction = ({
  className,
  render,
  showOnHover = false,
  ...props
}: useRender.ComponentProps<"button"> &
  React.ComponentProps<"button"> & {
    showOnHover?: boolean;
  }) =>
  useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: cn(sidebarMenuActionStyle, showOnHover && sidebarMenuActionShowOnHoverStyle, className)
      },
      props
    ),
    render,
    state: {
      slot: "sidebar-menu-action",
      sidebar: "menu-action"
    }
  });

const SidebarMenuBadge = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="sidebar-menu-badge" data-sidebar="menu-badge" className={cn(sidebarMenuBadgeStyle, className)} {...props} />
);

const SidebarMenuSkeleton = ({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<"div"> & {
  showIcon?: boolean;
}) => {
  const [width] = React.useState(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  });

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn(sidebarMenuSkeletonStyle, className)}
      {...props}
    >
      {showIcon && <Skeleton className={sidebarMenuSkeletonIconStyle} data-sidebar="menu-skeleton-icon" />}
      <Skeleton
        className={sidebarMenuSkeletonTextStyle}
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width
          } as React.CSSProperties
        }
      />
    </div>
  );
};

const SidebarMenuSub = ({ className, ...props }: React.ComponentProps<"ul">) => (
  <ul data-slot="sidebar-menu-sub" data-sidebar="menu-sub" className={cn(sidebarMenuSubStyle, className)} {...props} />
);

const SidebarMenuSubItem = ({ className, ...props }: React.ComponentProps<"li">) => (
  <li
    data-slot="sidebar-menu-sub-item"
    data-sidebar="menu-sub-item"
    className={cn(sidebarMenuSubItemStyle, className)}
    {...props}
  />
);

const SidebarMenuSubButton = ({
  render,
  size = "md",
  isActive = false,
  className,
  ...props
}: useRender.ComponentProps<"a"> &
  React.ComponentProps<"a"> & {
    size?: "sm" | "md";
    isActive?: boolean;
  }) =>
  useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: cn(sidebarMenuSubButtonStyle, className)
      },
      props
    ),
    render,
    state: {
      slot: "sidebar-menu-sub-button",
      sidebar: "menu-sub-button",
      size,
      active: isActive
    }
  });

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar
};
