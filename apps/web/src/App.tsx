import { Routes, Route, Navigate } from "react-router";
import { GameLibraryApiProvider } from "@game-library/sdk";
import { UISystemProvider } from "@game-library/cinder";
import { apiHost } from "./config";
import { AppRoute } from "./routes";
import { AppFrame } from "./components/AppFrame";
import { RequireAuth } from "./components/RequireAuth";
import { Login } from "./pages/Login";
import { Collection } from "./pages/Collection";
import { Profile } from "./pages/Profile";
import { Audit } from "./pages/Audit";

export const App = () => (
  <GameLibraryApiProvider host={apiHost}>
    <UISystemProvider>
      <AppFrame>
        <Routes>
          <Route path={AppRoute.Login} element={<Login />} />
          <Route element={<RequireAuth />}>
            <Route path={AppRoute.Home} element={<Collection />} />
            <Route path={AppRoute.Profile} element={<Profile />} />
            <Route path={AppRoute.Audit} element={<Audit />} />
          </Route>
          <Route path="*" element={<Navigate to={AppRoute.Home} replace />} />
        </Routes>
      </AppFrame>
    </UISystemProvider>
  </GameLibraryApiProvider>
);
