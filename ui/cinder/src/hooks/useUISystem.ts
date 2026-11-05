import { useContext } from "react";
import { UISystemContext, type UISystemContextType } from "../providers/UISystemProvider";

export const useUISystem = (): UISystemContextType => {
  const context = useContext(UISystemContext);

  if (!context) {
    throw new Error("useUISystem must be used within a UISystemProvider");
  }

  return context;
};
