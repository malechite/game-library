import { HStack, Span } from "@game-library/armature";
import { Icon } from "@game-library/cinder";
import { gradients } from "@game-library/tokens";

interface LogoProps {
  /** Icon size on the Cinder scale. */
  size?: number;
}

/** Wordmark: gradient controller icon + name. */
export const Logo = ({ size = 2 }: LogoProps) => (
  <HStack center gap={2} padding={0} stay>
    <Icon type="GameController" weight="fill" size={size} fill={gradients.sapphire.hexCss} />
    <Span bold style={{ fontFamily: "Montserrat, var(--font-sans)", letterSpacing: "0.02em" }}>
      Game Library
    </Span>
  </HStack>
);
