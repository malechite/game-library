import { Navigate, Outlet, useLocation } from "react-router";
import { useCurrentUser } from "@game-library/sdk";
import { AppRoute } from "../routes";
import { PageLoader } from "./PageLoader";

/**
 * Route guard. Renders the nested routes once the session is known, shows the
 * loader while `reAuthenticate()` runs, and bounces anonymous visitors to the
 * login page (remembering where they were headed).
 */
export const RequireAuth = () => {
  const { data: user, isPending } = useCurrentUser();
  const location = useLocation();

  if (isPending) return <PageLoader label="Checking session…" />;
  if (!user) return <Navigate to={AppRoute.Login} replace state={{ from: location.pathname }} />;

  return <Outlet />;
};
