"use client";

import * as React from "react";

import { cn } from "../../../lib/utils";
import { Icon, type CinderIconType } from "../Icon";
import { cardButton, cardButtonLabel } from "./CardButton.css";

export interface CardButtonProps extends React.ComponentProps<"button"> {
  /** Optional leading icon shown above the label. */
  icon?: CinderIconType;
  /** Size of the leading icon (Cinder Icon scale). */
  iconSize?: number;
}

/**
 * A large, card-shaped action button — a dashed tile sized to fill its slot
 * (e.g. a grid cell next to real cards). Use for primary "create" affordances
 * in a content area instead of a small toolbar button.
 */
const CardButton = ({ icon, iconSize = 3, children, className, type = "button", ...props }: CardButtonProps) => (
  <button type={type} data-slot="card-button" className={cn(cardButton, className)} {...props}>
    {icon && <Icon type={icon} size={iconSize} />}
    {children && <span className={cardButtonLabel}>{children}</span>}
  </button>
);

export { CardButton };
