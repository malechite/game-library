import { cn } from "../../../lib/utils";
import { SpinnerIcon } from "@phosphor-icons/react";
import { spinnerStyle } from "./Spinner.css";

const Spinner = ({ className, ...props }: React.ComponentProps<"svg">) => (
  <SpinnerIcon role="status" aria-label="Loading" className={cn(spinnerStyle, className)} {...props} />
);

export { Spinner };
