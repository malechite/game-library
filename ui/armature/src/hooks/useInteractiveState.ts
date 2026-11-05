import { useState } from "react";
import { InteractiveState } from "@game-library/types";

interface UseInteractiveStateOptions {
  disabled?: boolean;
  loading?: boolean;
  selected?: boolean;
}

export interface InteractiveItemProps {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onMouseDown: () => void;
  onMouseUp: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const useInteractiveState = (options?: UseInteractiveStateOptions) => {
  const { disabled, loading, selected } = options || {};
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [focused, setFocused] = useState(false);
  const onMouseEnter = () => setHovered(true);
  const onMouseLeave = () => setHovered(false);
  const onMouseDown = () => setPressed(true);
  const onMouseUp = () => setPressed(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const interactiveState: InteractiveState = (() => {
    if (loading) return InteractiveState.Loading;
    if (disabled) return InteractiveState.Disabled;
    if (pressed) return InteractiveState.Active;
    if (hovered) return InteractiveState.Hover;
    if (selected) return InteractiveState.Selected;
    if (focused) return InteractiveState.Focus;
    return InteractiveState.Rest;
  })();

  const interactiveProps: InteractiveItemProps = {
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onFocus,
    onBlur
  };

  return { interactiveState, interactiveProps };
};
