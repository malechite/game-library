import { Fragment, type ReactNode } from "react";
import { clsx } from "clsx";
import { HTMLEntity } from "@game-library/types";
import type { TextSize } from "@game-library/types";
import { sprinkles, type Sprinkles } from "../../themes";
import { listReset } from "../../styles/utilities.css";
import { parseGap } from "../../util/parse";
import { HStack } from "./Stack";
import { Img } from "../images/Img";
import { Text } from "../text/Text";

export interface InlineListItem {
  label: string;
  /** Optional media element (icon, avatar, etc.) rendered before the label */
  media?: ReactNode;
  img?: string;
}

export interface InlineListProps {
  gap?: boolean | number;
  items: InlineListItem[];
  delimiter?: string;
  textSize?: TextSize;
  bold?: boolean;
  color?: string;
  center?: boolean;
}

export const InlineList = ({ gap = 2, items, delimiter = HTMLEntity.Bullet, textSize, bold, color, center }: InlineListProps) => (
  <ul
    className={clsx(
      listReset,
      sprinkles({
        display: "flex",
        flexDirection: "row",
        ...(gap ? { gap: parseGap(gap) as Sprinkles["gap"] } : {}),
        ...(center ? { justifyContent: "center" } : {})
      } as Sprinkles)
    )}
  >
    {items.map((item, index) => {
      const { label, media, img } = item;

      return (
        <Fragment key={label}>
          {index > 0 && delimiter && <li>{delimiter}</li>}
          <li style={{ color }} className={sprinkles({ whiteSpace: "nowrap" })}>
            <HStack center gap={2}>
              {media}
              {img && <Img src={img} alt={label} style={{ width: 16 }} />}
              <Text size={textSize} bold={bold}>
                {label}
              </Text>
            </HStack>
          </li>
        </Fragment>
      );
    })}
  </ul>
);
