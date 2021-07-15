import { RecoilRoot } from "recoil";
import "tailwindcss/tailwind.css";
import I18nProvider from "next-translate/I18nProvider";
import { ThemeProvider } from "next-themes";
import { RouterContext } from "next/dist/next-server/lib/router-context";
import config from "../i18n";
import common from "../locales/en/common.json";

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
};

export const decorators = [
  Story => (
    <I18nProvider lang="en" config={config} namespaces={{ common }}>
      <RecoilRoot>
        <ThemeProvider attribute="class" defaultTheme="system">
          <Story />
        </ThemeProvider>
      </RecoilRoot>
    </I18nProvider>
  ),
];
