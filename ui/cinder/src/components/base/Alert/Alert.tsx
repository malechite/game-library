import * as React from "react";

import { cn } from "../../../lib/utils";
import {
  alertRecipe,
  alertTitle as alertTitleStyle,
  alertDescription as alertDescriptionStyle,
  alertAction as alertActionStyle,
  type AlertVariants
} from "./Alert.css";

const Alert = ({ className, variant = "default", ...props }: React.ComponentProps<"div"> & AlertVariants) => (
  <div data-slot="alert" data-variant={variant} role="alert" className={cn(alertRecipe({ variant }), className)} {...props} />
);

const AlertTitle = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="alert-title" className={cn(alertTitleStyle, className)} {...props} />
);

const AlertDescription = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="alert-description" className={cn(alertDescriptionStyle, className)} {...props} />
);

const AlertAction = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="alert-action" className={cn(alertActionStyle, className)} {...props} />
);

export { Alert, AlertTitle, AlertDescription, AlertAction };
