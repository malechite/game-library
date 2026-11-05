import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type { RecipeVariants } from "@vanilla-extract/recipes";

import { cn } from "../../../lib/utils";
import { badgeRecipe } from "./Badge.css";

type BadgeVariants = RecipeVariants<typeof badgeRecipe>;

const Badge = ({ className, variant = "default", render, ...props }: useRender.ComponentProps<"span"> & BadgeVariants) =>
  useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeRecipe({ variant }), className)
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant
    }
  });

export { Badge, badgeRecipe };
