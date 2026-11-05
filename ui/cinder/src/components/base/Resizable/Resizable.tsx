"use client";

import * as ResizablePrimitive from "react-resizable-panels";

import { cn } from "../../../lib/utils";
import { resizablePanelGroup, resizableHandle as resizableHandleStyle, resizableHandleBar } from "./Resizable.css";

const ResizablePanelGroup = ({ className, ...props }: ResizablePrimitive.GroupProps) => (
  <ResizablePrimitive.Group data-slot="resizable-panel-group" className={cn(resizablePanelGroup, className)} {...props} />
);

const ResizablePanel = ({ ...props }: ResizablePrimitive.PanelProps) => (
  <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />
);

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: ResizablePrimitive.SeparatorProps & {
  withHandle?: boolean;
}) => (
  <ResizablePrimitive.Separator data-slot="resizable-handle" className={cn(resizableHandleStyle, className)} {...props}>
    {withHandle && <div className={resizableHandleBar} />}
  </ResizablePrimitive.Separator>
);

export { ResizableHandle, ResizablePanel, ResizablePanelGroup };
