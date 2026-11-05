import { useUISystem } from "./useUISystem";
import type { LightBarState } from "../providers/UISystemProvider";

export const useLightBar = (): LightBarState => {
  const { lightBar } = useUISystem();
  return lightBar;
};
