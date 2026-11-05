import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { defaultTheme } from "@game-library/armature";
import { darkTheme } from "@game-library/cinder/theme";
import "@game-library/armature/styles.css";
import "@game-library/cinder/styles.css";
import "./globals.css";
import "./icons";
import { App } from "./App";

// Theme classes go on <body> so Base UI portals (menus, modals) inherit them too.
document.body.classList.add(defaultTheme, darkTheme);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
