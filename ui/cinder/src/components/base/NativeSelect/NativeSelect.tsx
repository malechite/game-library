import * as React from "react";

import { cn } from "../../../lib/utils";
import { CaretDownIcon } from "@phosphor-icons/react";
import { nativeSelectWrapperStyle, nativeSelectStyle, nativeSelectIconStyle } from "./NativeSelect.css";

type NativeSelectProps = Omit<React.ComponentProps<"select">, "size"> & {
  size?: "sm" | "default";
};

const NativeSelect = ({ className, size = "default", ...props }: NativeSelectProps) => (
  <div className={cn(nativeSelectWrapperStyle, className)} data-slot="native-select-wrapper" data-size={size}>
    <select data-slot="native-select" data-size={size} className={nativeSelectStyle({ size })} {...props} />
    <CaretDownIcon className={nativeSelectIconStyle({ size })} aria-hidden="true" data-slot="native-select-icon" />
  </div>
);

const NativeSelectOption = ({ ...props }: React.ComponentProps<"option">) => (
  <option data-slot="native-select-option" {...props} />
);

const NativeSelectOptGroup = ({ className, ...props }: React.ComponentProps<"optgroup">) => (
  <optgroup data-slot="native-select-optgroup" className={cn(className)} {...props} />
);

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption };
