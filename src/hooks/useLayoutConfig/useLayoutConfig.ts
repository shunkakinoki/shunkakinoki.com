import type { ILayoutConfig } from "next-og-utils";
import { useMemo } from "react";
import { atom, useRecoilState } from "recoil";

import { useConfig } from "@/hooks/useConfig";
import { layouts, getDefaultLayout } from "@/layouts";
import { localStorageEffect } from "@/lib/effect";

const allLayoutConfigState = atom({
  key: "allLayoutConfig",
  default: {},
  effects_UNSTABLE: [localStorageEffect("allLayoutConfig")],
});

export const useLayoutConfig = (): [
  ILayoutConfig,
  (layoutConfig: ILayoutConfig) => void,
] => {
  // prettier-ignore
  const [allLayoutConfig, setAllLayoutConfig] = useRecoilState(
    allLayoutConfigState,
  );

  const [config] = useConfig();
  const { layoutName } = config;

  const layout = useMemo(() => {
    return layouts.find(l => {
      return l.name === layoutName;
    });
  }, [layoutName]);

  const defaultConfig = useMemo(() => {
    return layout != null ? getDefaultLayout(layout) : {};
  }, [layout]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const layoutConfig = allLayoutConfig[layoutName] ?? {};

  const setLayoutConfig = (config: ILayoutConfig): void => {
    setAllLayoutConfig(all => {
      return {
        ...all,
        [layoutName]: {
          ...layoutConfig,
          ...config,
        },
      };
    });
  };

  return [
    {
      ...defaultConfig,
      ...layoutConfig,
    },
    setLayoutConfig,
  ];
};
