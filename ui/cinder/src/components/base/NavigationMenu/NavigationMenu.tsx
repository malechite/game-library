import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";

import { cn } from "../../../lib/utils";
import { CaretDownIcon } from "@phosphor-icons/react";
import {
  navigationMenuStyle,
  navigationMenuListStyle,
  navigationMenuItemStyle,
  navigationMenuTriggerBaseStyle,
  navigationMenuTriggerIconStyle,
  navigationMenuContentStyle,
  navigationMenuPositionerStyle,
  navigationMenuPopupStyle,
  navigationMenuViewportStyle,
  navigationMenuLinkStyle,
  navigationMenuIndicatorStyle,
  navigationMenuIndicatorArrowStyle
} from "./NavigationMenu.css";

const NavigationMenu = ({
  align = "start",
  className,
  children,
  ...props
}: NavigationMenuPrimitive.Root.Props & Pick<NavigationMenuPrimitive.Positioner.Props, "align">) => (
  <NavigationMenuPrimitive.Root data-slot="navigation-menu" className={cn(navigationMenuStyle, className)} {...props}>
    {children}
    <NavigationMenuPositioner align={align} />
  </NavigationMenuPrimitive.Root>
);

const NavigationMenuList = ({ className, ...props }: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.List>) => (
  <NavigationMenuPrimitive.List data-slot="navigation-menu-list" className={cn(navigationMenuListStyle, className)} {...props} />
);

const NavigationMenuItem = ({ className, ...props }: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.Item>) => (
  <NavigationMenuPrimitive.Item data-slot="navigation-menu-item" className={cn(navigationMenuItemStyle, className)} {...props} />
);

const navigationMenuTriggerStyle = navigationMenuTriggerBaseStyle;

const NavigationMenuTrigger = ({ className, children, ...props }: NavigationMenuPrimitive.Trigger.Props) => (
  <NavigationMenuPrimitive.Trigger
    data-slot="navigation-menu-trigger"
    className={cn(navigationMenuTriggerBaseStyle, className)}
    {...props}
  >
    {children} <CaretDownIcon className={navigationMenuTriggerIconStyle} aria-hidden="true" />
  </NavigationMenuPrimitive.Trigger>
);

const NavigationMenuContent = ({ className, ...props }: NavigationMenuPrimitive.Content.Props) => (
  <NavigationMenuPrimitive.Content
    data-slot="navigation-menu-content"
    className={cn(navigationMenuContentStyle, className)}
    {...props}
  />
);

const NavigationMenuPositioner = ({
  className,
  side = "bottom",
  sideOffset = 8,
  align = "start",
  alignOffset = 0,
  ...props
}: NavigationMenuPrimitive.Positioner.Props) => (
  <NavigationMenuPrimitive.Portal>
    <NavigationMenuPrimitive.Positioner
      side={side}
      sideOffset={sideOffset}
      align={align}
      alignOffset={alignOffset}
      className={cn(navigationMenuPositionerStyle, className)}
      {...props}
    >
      <NavigationMenuPrimitive.Popup className={navigationMenuPopupStyle}>
        <NavigationMenuPrimitive.Viewport className={navigationMenuViewportStyle} />
      </NavigationMenuPrimitive.Popup>
    </NavigationMenuPrimitive.Positioner>
  </NavigationMenuPrimitive.Portal>
);

const NavigationMenuLink = ({ className, ...props }: NavigationMenuPrimitive.Link.Props) => (
  <NavigationMenuPrimitive.Link data-slot="navigation-menu-link" className={cn(navigationMenuLinkStyle, className)} {...props} />
);

const NavigationMenuIndicator = ({ className, ...props }: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.Icon>) => (
  <NavigationMenuPrimitive.Icon
    data-slot="navigation-menu-indicator"
    className={cn(navigationMenuIndicatorStyle, className)}
    {...props}
  >
    <div className={navigationMenuIndicatorArrowStyle} />
  </NavigationMenuPrimitive.Icon>
);

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuPositioner
};
