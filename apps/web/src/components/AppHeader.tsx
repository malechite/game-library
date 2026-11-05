import { NavLink as RouterNavLink, Link, useNavigate } from "react-router";
import { HStack, Spacer } from "@game-library/armature";
import {
  Avatar,
  AvatarFallback,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  Icon
} from "@game-library/cinder";
import { vars } from "@game-library/cinder/theme";
import { useCurrentUser, useLogout } from "@game-library/sdk";
import { AppRoute } from "../routes";
import { BORDER_COLOR, HEADER_HEIGHT } from "../lib/ui";
import { Logo } from "./Logo";

const initials = (name?: string): string =>
  (name || "?")
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

interface NavItem {
  to: AppRoute;
  label: string;
}

const NavLink = ({ to, label }: NavItem) => (
  <RouterNavLink
    to={to}
    end={to === AppRoute.Home}
    style={({ isActive }) => ({
      display: "inline-flex",
      alignItems: "center",
      height: "100%",
      // 2px top padding balances the 2px bottom border so the label stays
      // vertically centered (aligned with the logo) rather than nudged up.
      padding: "2px 4px 0",
      fontSize: 14,
      fontWeight: 500,
      color: isActive ? vars.color.foreground : vars.color.mutedForeground,
      borderBottom: `2px solid ${isActive ? vars.color.primary : "transparent"}`,
      marginBottom: -1,
      textDecoration: "none"
    })}
  >
    {label}
  </RouterNavLink>
);

/** Top app bar: logo + nav on the left, user avatar menu on the right. */
export const AppHeader = () => {
  const { data: user } = useCurrentUser();
  const logout = useLogout();
  const navigate = useNavigate();

  const navItems: NavItem[] = [{ to: AppRoute.Home, label: "Collection" }];

  const handleSignOut = async () => {
    await logout.mutateAsync();
    navigate(AppRoute.Login, { replace: true });
  };

  return (
    <HStack
      center
      padding={0}
      stay
      overflow
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        height: HEADER_HEIGHT,
        paddingInline: 24,
        borderBottom: `1px solid ${BORDER_COLOR}`,
        // Frosted bar so page content scrolls behind it cleanly.
        backgroundColor: `color-mix(in oklch, ${vars.color.background} 80%, transparent)`,
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)"
      }}
    >
      <HStack center gap={6} stay style={{ height: "100%" }}>
        <Link to={AppRoute.Home} style={{ display: "inline-flex", alignItems: "center" }}>
          <Logo />
        </Link>
        {navItems.map((item) => (
          <NavLink key={item.to} {...item} />
        ))}
      </HStack>

      <Spacer />

      <DropdownMenuRoot>
        <DropdownMenuTrigger
          aria-label="Account menu"
          style={{ border: "none", background: "none", padding: 0, cursor: "pointer", borderRadius: "9999px", lineHeight: 0 }}
        >
          <Avatar size="sm">
            <AvatarFallback>{initials(user?.name)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" sideOffset={8}>
          <DropdownMenuGroup>
            <DropdownMenuLabel>{user?.name ?? "Account"}</DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate(AppRoute.Profile)}>
            <Icon type="User" />
            Profile
          </DropdownMenuItem>
          {/* Audit log is super-admin only — hidden for everyone else. */}
          {user?.isSuperAdmin && (
            <DropdownMenuItem onClick={() => navigate(AppRoute.Audit)}>
              <Icon type="ClipboardText" />
              Audit log
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={() => void handleSignOut()}>
            <Icon type="SignOut" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuRoot>
    </HStack>
  );
};
