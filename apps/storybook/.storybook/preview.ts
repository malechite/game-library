import { colors } from "@game-library/tokens";
import type { Preview } from "@storybook/react-vite";
import { defaultTheme } from "@game-library/armature";
import { darkTheme as cinderDarkTheme } from "@game-library/cinder/themes";
import "@game-library/cinder/themes/globals.css";
import { registerAllIcons } from "@game-library/icon/all";

// Stories reference icons by name freely, so register the whole Phosphor set here.
registerAllIcons();

// Add web fonts for Storybook
const fonts = [
  "https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700&display=swap",
  "https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600;700&display=swap",
  "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
];

fonts.forEach((href) => {
  const link = document.createElement("link");
  link.href = href;
  link.rel = "stylesheet";
  document.head.appendChild(link);
});

// Apply themes
document.body.classList.add(defaultTheme);
document.body.classList.add(cinderDarkTheme);

// Set Cinder font CSS variables and apply font family
document.documentElement.style.setProperty("--font-sans", "Figtree, system-ui, sans-serif");
document.documentElement.style.setProperty("--font-mono", "Geist Mono");
document.body.style.fontFamily = "Figtree, system-ui, sans-serif";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    options: {
      storySort: {
        order: [
          "Cinder",
          ["Actions", "Display", "Forms", "Feedback", "Layout", "Navigation", "Overlay"],
          "Armature",
          ["Layout", "Patterns", "Typography", "Shapes"],
          "Icon",
          "Lattice",
          "*"
        ]
      }
    },
    backgrounds: {
      options: {
        light: {
          name: "light",
          value: colors.white.hex
        },

        dark: {
          name: "dark",
          value: colors.onyx[800].hex
        },

        neutral: {
          name: "neutral",
          value: colors.pewter[400].hex
        },

        terminal: {
          name: "terminal",
          value: "#0A0A0A"
        }
      }
    }
  },

  initialGlobals: {
    backgrounds: {
      value: "dark"
    }
  }
};

export default preview;
