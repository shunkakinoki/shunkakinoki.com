import { RecoilRoot } from "recoil";
import "tailwindcss/tailwind.css";
import * as nextImage from "next/image";
import I18nProvider from "next-translate/I18nProvider";
import { ThemeProvider } from "next-themes";
import { RouterContext } from "next/dist/next-server/lib/router-context";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

import config from "../i18n";
import _error from "../locales/en/_error.json";
import about from "../locales/en/about.json";
import common from "../locales/en/common.json";
import form from "../locales/en/form.json";
import landing from "../locales/en/landing.json";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: { expanded: true },
  storySort: {
    method: "alphabetical",
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
  darkMode: {
    classTarget: "html",
    darkClass: "dark",
    lightClass: "light",
    stylePreview: true,
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
};

Object.defineProperty(nextImage, "default", {
  configurable: true,
  value: props => <img {...props} />,
});

export const decorators = [
  Story => (
    <I18nProvider
      lang="en"
      config={config}
      namespaces={{ _error, about, common, form, landing }}
    >
      <RecoilRoot>
        <ThemeProvider attribute="class" defaultTheme="system">
          <Story />
        </ThemeProvider>
      </RecoilRoot>
    </I18nProvider>
  ),
];
