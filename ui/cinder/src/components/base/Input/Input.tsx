import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "../../../lib/utils";
import { inputStyle, gradientBorderWrapper, gradientInputStyle } from "./Input.css";

interface InputProps extends React.ComponentProps<"input"> {
  /** When true, shows a topaz gradient border on focus with Kode Mono font */
  gradientFocus?: boolean;
}

const Input = ({ className, type, gradientFocus, ...props }: InputProps) => {
  const field = (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(gradientFocus ? gradientInputStyle : inputStyle, className)}
      {...props}
    />
  );

  return gradientFocus ? <div className={gradientBorderWrapper}>{field}</div> : field;
};

export { Input };
export type { InputProps };
