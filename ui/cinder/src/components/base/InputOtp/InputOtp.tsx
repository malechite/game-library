"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";

import { cn } from "../../../lib/utils";
import { MinusIcon } from "@phosphor-icons/react";
import {
  inputOtpContainerStyle,
  inputOtpInputStyle,
  inputOtpGroupStyle,
  inputOtpSlotStyle,
  inputOtpFakeCaretContainer,
  inputOtpFakeCaret,
  inputOtpSeparatorStyle
} from "./InputOtp.css";

const InputOTP = ({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) => (
  <OTPInput
    data-slot="input-otp"
    containerClassName={cn(inputOtpContainerStyle, containerClassName)}
    spellCheck={false}
    className={cn(inputOtpInputStyle, className)}
    {...props}
  />
);

const InputOTPGroup = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="input-otp-group" className={cn(inputOtpGroupStyle, className)} {...props} />
);

const InputOTPSlot = ({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
}) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div data-slot="input-otp-slot" data-active={isActive} className={cn(inputOtpSlotStyle, className)} {...props}>
      {char}
      {hasFakeCaret && (
        <div className={inputOtpFakeCaretContainer}>
          <div className={inputOtpFakeCaret} />
        </div>
      )}
    </div>
  );
};

const InputOTPSeparator = ({ ...props }: React.ComponentProps<"div">) => (
  <div data-slot="input-otp-separator" className={inputOtpSeparatorStyle} role="separator" {...props}>
    <MinusIcon />
  </div>
);

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
