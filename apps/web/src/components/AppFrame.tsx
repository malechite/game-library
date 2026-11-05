import type { PropsWithChildren } from "react";
import { useLocation } from "react-router";
import { LightBar, Toaster, useLightBar } from "@game-library/cinder";
import { appRoot, appLightBar, appContent } from "../App.css";
import { AppRoute } from "../routes";
import { AppHeader } from "./AppHeader";
import { Footer } from "./Footer";

/** App shell: animated light bar, sticky header (hidden on login), content, footer, toasts. */
export const AppFrame = ({ children }: PropsWithChildren) => {
  const { gradient, animate } = useLightBar();
  const { pathname } = useLocation();
  const showChrome = pathname !== AppRoute.Login;

  return (
    <div className={appRoot}>
      <LightBar gradient={gradient} animate={animate} className={appLightBar} />
      {showChrome && <AppHeader />}
      <div className={appContent} data-has-chrome={showChrome || undefined}>
        {children}
      </div>
      {showChrome && <Footer />}
      <Toaster theme="dark" position="bottom-center" />
    </div>
  );
};
