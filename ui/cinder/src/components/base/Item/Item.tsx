import * as React from "react";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { cn } from "../../../lib/utils";
import { Separator } from "../Separator/Separator";
import {
  itemGroupStyle,
  itemSeparatorStyle,
  itemRecipe,
  itemMediaRecipe,
  itemMediaBaseClass,
  itemContentStyle,
  itemTitleStyle,
  itemDescriptionStyle,
  itemActionsStyle,
  itemHeaderStyle,
  itemFooterStyle,
  type ItemVariants,
  type ItemMediaVariants
} from "./Item.css";

const ItemGroup = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div role="list" data-slot="item-group" className={cn(itemGroupStyle, className)} {...props} />
);

const ItemSeparator = ({ className, ...props }: React.ComponentProps<typeof Separator>) => (
  <Separator data-slot="item-separator" orientation="horizontal" className={cn(itemSeparatorStyle, className)} {...props} />
);

const Item = ({
  className,
  variant = "default",
  size = "default",
  render,
  ...props
}: useRender.ComponentProps<"div"> & ItemVariants) =>
  useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(itemRecipe({ variant, size }), className)
      },
      props
    ),
    render,
    state: {
      slot: "item",
      variant,
      size
    }
  });

const ItemMedia = ({ className, variant = "default", ...props }: React.ComponentProps<"div"> & ItemMediaVariants) => (
  <div
    data-slot="item-media"
    data-variant={variant}
    className={cn(itemMediaRecipe({ variant }), itemMediaBaseClass, className)}
    {...props}
  />
);

const ItemContent = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="item-content" className={cn(itemContentStyle, className)} {...props} />
);

const ItemTitle = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="item-title" className={cn(itemTitleStyle, className)} {...props} />
);

const ItemDescription = ({ className, ...props }: React.ComponentProps<"p">) => (
  <p data-slot="item-description" className={cn(itemDescriptionStyle, className)} {...props} />
);

const ItemActions = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="item-actions" className={cn(itemActionsStyle, className)} {...props} />
);

const ItemHeader = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="item-header" className={cn(itemHeaderStyle, className)} {...props} />
);

const ItemFooter = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="item-footer" className={cn(itemFooterStyle, className)} {...props} />
);

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter
};
