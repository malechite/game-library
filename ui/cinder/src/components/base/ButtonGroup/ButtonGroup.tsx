import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { cn } from "../../../lib/utils";
import { Separator } from "../Separator/Separator";
import {
  buttonGroupRecipe,
  buttonGroupBaseClass,
  buttonGroupTextStyle,
  buttonGroupSeparatorStyle,
  type ButtonGroupVariants
} from "./ButtonGroup.css";

const ButtonGroup = ({ className, orientation = "horizontal", ...props }: React.ComponentProps<"div"> & ButtonGroupVariants) => (
  <div
    role="group"
    data-slot="button-group"
    data-orientation={orientation}
    className={cn(buttonGroupRecipe({ orientation }), buttonGroupBaseClass, className)}
    {...props}
  />
);

const ButtonGroupText = ({ className, render, ...props }: useRender.ComponentProps<"div">) =>
  useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(buttonGroupTextStyle, className)
      },
      props
    ),
    render,
    state: {
      slot: "button-group-text"
    }
  });

const ButtonGroupSeparator = ({ className, orientation = "vertical", ...props }: React.ComponentProps<typeof Separator>) => (
  <Separator
    data-slot="button-group-separator"
    orientation={orientation}
    className={cn(buttonGroupSeparatorStyle, className)}
    {...props}
  />
);

const buttonGroupVariants = buttonGroupRecipe;

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants };
