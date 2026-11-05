import { borderTop } from "../../styles/utilities.css";

interface DividerProps {
  color?: string;
}

export const Divider = ({ color }: DividerProps) => {
  return <hr className={borderTop} style={color ? { borderColor: color } : undefined} />;
};
