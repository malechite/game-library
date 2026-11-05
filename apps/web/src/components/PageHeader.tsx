import type { ReactNode } from "react";
import { Heading, Caption } from "@game-library/armature";
import { Icon, type CinderIconType } from "@game-library/cinder";
import { pageHeader, titleBlock, iconCell, titleCell, subtitleCell, actions } from "./PageHeader.css";

/** Icon size in rem — sized to the heading's text so the two read as one line. */
const ICON_SIZE = 2.25;

export interface PageHeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
  icon?: CinderIconType;
  /** Optional leading element (e.g. a back button). */
  leading?: ReactNode;
  /** Optional trailing action(s), pushed to the right. */
  action?: ReactNode;
}

export const PageHeader = ({ title, subtitle, icon, leading, action }: PageHeaderProps) => (
  <div className={pageHeader}>
    {leading}
    <div className={titleBlock} data-has-icon={icon ? "" : undefined}>
      {icon && (
        <span className={iconCell}>
          <Icon type={icon} size={ICON_SIZE} />
        </span>
      )}
      <div className={titleCell}>
        <Heading>{title}</Heading>
      </div>
      {subtitle && (
        <div className={subtitleCell}>
          <Caption>{subtitle}</Caption>
        </div>
      )}
    </div>
    {action && <div className={actions}>{action}</div>}
  </div>
);
