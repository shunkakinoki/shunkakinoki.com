import { RecoilRoot } from "recoil";
import "tailwindcss/tailwind.css";
import I18nProvider from "next-translate/I18nProvider";
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
};

export const decorators = [
  Story => (
    <I18nProvider lang="en" config={config} namespaces={{ common }}>
      <RecoilRoot>
        <Story />
      </RecoilRoot>
    </I18nProvider>
  ),
];
