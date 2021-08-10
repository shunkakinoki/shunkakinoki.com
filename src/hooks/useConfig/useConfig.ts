import type { SetterOrUpdater } from "recoil";
import { atom, useRecoilState } from "recoil";

import { layouts } from "@/layouts";
import { localStorageEffect } from "@/lib/effect";
import type { IConfig } from "@/og";

const defaultConfig: IConfig = {
  fileType: "png",
  layoutName: layouts[0].name,
};

const configState = atom<IConfig>({
  key: "config",
  default: defaultConfig,
  effects_UNSTABLE: [localStorageEffect("config")],
});

export const useConfig = (): [IConfig, SetterOrUpdater<IConfig>] => {
  const [config, setConfig] = useRecoilState(configState);
  return [config, setConfig];
};
