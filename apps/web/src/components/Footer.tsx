import { HStack, Caption } from "@game-library/armature";
import { vars } from "@game-library/cinder/theme";

/** Small site-wide footer credit. */
export const Footer = () => (
  <HStack center justifyCenter gap={1} paddingY={4} style={{ color: vars.color.mutedForeground }}>
    <Caption>
      <a
        href="https://github.com/malechite/game-library"
        target="_blank"
        rel="noreferrer"
        style={{ color: "inherit", textDecoration: "underline" }}
      >
        Game Library
      </a>{" "}
      — Feathers + Vite + React monorepo demo
    </Caption>
  </HStack>
);
