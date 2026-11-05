import { cn } from "../../../lib/utils";
import { skeletonStyle } from "./Skeleton.css";

const Skeleton = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="skeleton" className={cn(skeletonStyle, className)} {...props} />
);

export { Skeleton };
