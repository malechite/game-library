import { cn } from "../../../lib/utils";
import { kbdStyle, kbdGroupStyle } from "./Kbd.css";

const Kbd = ({ className, ...props }: React.ComponentProps<"kbd">) => (
  <kbd data-slot="kbd" className={cn(kbdStyle, className)} {...props} />
);

const KbdGroup = ({ className, ...props }: React.ComponentProps<"div">) => (
  <kbd data-slot="kbd-group" className={cn(kbdGroupStyle, className)} {...props} />
);

export { Kbd, KbdGroup };
