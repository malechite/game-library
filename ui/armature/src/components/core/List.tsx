import { type PropsWithChildren } from "react";
import { clsx } from "clsx";
import { sprinkles, type Sprinkles } from "../../themes";
import { listReset } from "../../styles/utilities.css";
import { parseGap } from "../../util/parse";

interface ListProps {
  gap?: boolean | number;
  stay?: boolean;
}

export const List = ({ gap, stay, children }: PropsWithChildren<ListProps>) => (
  <ul
    className={clsx(
      listReset,
      sprinkles({
        display: "flex",
        flexDirection: "column",
        ...(gap ? { gap: parseGap(gap) as Sprinkles["gap"] } : {}),
        ...(stay ? { flexShrink: 0 } : {})
      } as Sprinkles)
    )}
  >
    {children}
  </ul>
);
