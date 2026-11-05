import type { ReactNode } from "react";
import { VStack, Title, Caption } from "@game-library/armature";
import { Icon, type CinderIconType } from "@game-library/cinder";
import { vars } from "@game-library/cinder/theme";

export interface EmptyStateProps {
  icon?: CinderIconType;
  title: string;
  description?: string;
  action?: ReactNode;
}

export const EmptyState = ({ icon, title, description, action }: EmptyStateProps) => (
  <VStack center gap={3} padding={8}>
    {icon && <Icon type={icon} size={3} color={vars.color.mutedForeground} />}
    <Title>{title}</Title>
    {description && (
      <Caption center style={{ color: vars.color.mutedForeground }}>
        {description}
      </Caption>
    )}
    {action}
  </VStack>
);
