"use client";

import * as React from "react";
import { Slider as SliderPrimitive } from "@base-ui/react/slider";

import { cn } from "../../../lib/utils";
import { sliderRoot, sliderControl, sliderTrack, sliderIndicator, sliderThumb } from "./Slider.css";

const Slider = ({ className, defaultValue, value, min = 0, max = 100, ...props }: SliderPrimitive.Root.Props) => {
  const _values = React.useMemo(
    () => (Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max]),
    [value, defaultValue, min, max]
  );

  return (
    <SliderPrimitive.Root
      className={cn(sliderRoot, className)}
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      thumbAlignment="edge"
      {...props}
    >
      <SliderPrimitive.Control className={sliderControl}>
        <SliderPrimitive.Track data-slot="slider-track" className={sliderTrack}>
          <SliderPrimitive.Indicator data-slot="slider-range" className={sliderIndicator} />
        </SliderPrimitive.Track>
        {Array.from({ length: _values.length }, (_, index) => (
          <SliderPrimitive.Thumb data-slot="slider-thumb" key={index} className={sliderThumb} />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
};

export { Slider };
