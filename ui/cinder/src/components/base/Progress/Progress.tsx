"use client";

import { Progress as ProgressPrimitive } from "@base-ui/react/progress";

import { cn } from "../../../lib/utils";
import { progressRoot, progressTrack, progressIndicator, progressLabel, progressValue } from "./Progress.css";

const Progress = ({ className, children, value, ...props }: ProgressPrimitive.Root.Props) => (
  <ProgressPrimitive.Root value={value} data-slot="progress" className={cn(progressRoot, className)} {...props}>
    {children}
    <ProgressTrack>
      <ProgressIndicator />
    </ProgressTrack>
  </ProgressPrimitive.Root>
);

const ProgressTrack = ({ className, ...props }: ProgressPrimitive.Track.Props) => (
  <ProgressPrimitive.Track className={cn(progressTrack, className)} data-slot="progress-track" {...props} />
);

const ProgressIndicator = ({ className, ...props }: ProgressPrimitive.Indicator.Props) => (
  <ProgressPrimitive.Indicator data-slot="progress-indicator" className={cn(progressIndicator, className)} {...props} />
);

const ProgressLabel = ({ className, ...props }: ProgressPrimitive.Label.Props) => (
  <ProgressPrimitive.Label className={cn(progressLabel, className)} data-slot="progress-label" {...props} />
);

const ProgressValue = ({ className, ...props }: ProgressPrimitive.Value.Props) => (
  <ProgressPrimitive.Value className={cn(progressValue, className)} data-slot="progress-value" {...props} />
);

export { Progress, ProgressTrack, ProgressIndicator, ProgressLabel, ProgressValue };
