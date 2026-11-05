import { cn } from "../../../lib/utils";
import {
  emptyRoot,
  emptyHeader,
  emptyMedia,
  emptyMediaSvgBase,
  emptyMediaIconSvg,
  emptyTitle,
  emptyDescription,
  emptyContent
} from "./Empty.css";

type EmptyMediaVariant = "default" | "icon";

const Empty = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="empty" className={cn(emptyRoot, className)} {...props} />
);

const EmptyHeader = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="empty-header" className={cn(emptyHeader, className)} {...props} />
);

const EmptyMedia = ({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & { variant?: EmptyMediaVariant }) => (
  <div
    data-slot="empty-icon"
    data-variant={variant}
    className={cn(emptyMedia({ variant }), emptyMediaSvgBase, variant === "icon" && emptyMediaIconSvg, className)}
    {...props}
  />
);

const EmptyTitle = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="empty-title" className={cn(emptyTitle, className)} {...props} />
);

const EmptyDescription = ({ className, ...props }: React.ComponentProps<"p">) => (
  <div data-slot="empty-description" className={cn(emptyDescription, className)} {...props} />
);

const EmptyContent = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="empty-content" className={cn(emptyContent, className)} {...props} />
);

export { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent, EmptyMedia };
