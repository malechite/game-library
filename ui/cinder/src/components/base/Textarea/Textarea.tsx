import * as React from "react";

import { cn } from "../../../lib/utils";
import { textareaStyle } from "./Textarea.css";

const Textarea = ({ className, ...props }: React.ComponentProps<"textarea">) => (
  <textarea data-slot="textarea" className={cn(textareaStyle, className)} {...props} />
);

export { Textarea };
