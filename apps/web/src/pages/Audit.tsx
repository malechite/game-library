import { Navigate } from "react-router";
import { useCurrentUser } from "@game-library/sdk";
import { AppRoute } from "../routes";
import { AuditLog } from "../components/AuditLog";

/**
 * Audit log — super admins only. `RequireAuth` already guarantees a session;
 * this additionally gates on the flag so non-admins never see the page shell.
 * The API enforces the same rule server-side.
 */
export const Audit = () => {
  const { data: user } = useCurrentUser();
  if (!user?.isSuperAdmin) return <Navigate to={AppRoute.Home} replace />;
  return <AuditLog />;
};
