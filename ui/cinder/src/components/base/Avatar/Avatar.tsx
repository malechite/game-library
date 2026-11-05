"use client";

import * as React from "react";
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";

import { cn } from "../../../lib/utils";
import { avatarRoot, avatarImage, avatarFallback, avatarBadge, avatarGroup, avatarGroupCount } from "./Avatar.css";

const Avatar = ({
  className,
  size = "default",
  ...props
}: AvatarPrimitive.Root.Props & {
  size?: "default" | "sm" | "lg";
}) => <AvatarPrimitive.Root data-slot="avatar" data-size={size} className={cn(avatarRoot, className)} {...props} />;

const AvatarImage = ({ className, ...props }: AvatarPrimitive.Image.Props) => (
  <AvatarPrimitive.Image data-slot="avatar-image" className={cn(avatarImage, className)} {...props} />
);

const AvatarFallback = ({ className, ...props }: AvatarPrimitive.Fallback.Props) => (
  <AvatarPrimitive.Fallback data-slot="avatar-fallback" className={cn(avatarFallback, className)} {...props} />
);

const AvatarBadge = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span data-slot="avatar-badge" className={cn(avatarBadge, className)} {...props} />
);

const AvatarGroup = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="avatar-group" className={cn(avatarGroup, className)} {...props} />
);

const AvatarGroupCount = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="avatar-group-count" className={cn(avatarGroupCount, className)} {...props} />
);

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarBadge };
