import { cn } from "../../../lib/utils";
import { aspectRatioStyle } from "./AspectRatio.css";

const AspectRatio = ({ ratio, className, ...props }: React.ComponentProps<"div"> & { ratio: number }) => (
  <div
    data-slot="aspect-ratio"
    style={
      {
        "--ratio": ratio
      } as React.CSSProperties
    }
    className={cn(aspectRatioStyle, className)}
    {...props}
  />
);

export { AspectRatio };
