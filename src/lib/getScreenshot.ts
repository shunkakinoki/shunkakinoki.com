/* eslint-disable @typescript-eslint/no-unsafe-call */

import chrome from "chrome-aws-lambda";
import { OG_HEIGHT, OG_WIDTH } from "next-og-utils";
import type { FileType } from "next-og-utils";
import type { Page } from "puppeteer-core";
import * as core from "puppeteer-core";

let _page: Page | null;

const exePath =
  process.platform === "win32"
    ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
    : process.platform === "linux"
    ? "/usr/bin/google-chrome"
    : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

interface Options {
  args: string[];
  executablePath: string;
  headless: boolean;
}

export const getOptions = async (isDev: boolean): Promise<Options> => {
  let options: Options;
  if (isDev) {
    options = {
      args: [],
      executablePath: exePath,
      headless: true,
    };
  } else {
    options = {
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
    };
  }

  return options;
};

const getPage = async (isDev: boolean): Promise<Page> => {
  if (_page) {
    return _page;
  }
  const options = await getOptions(isDev);

  await chrome.font(
    "https://raw.githack.com/minoryorg/Noto-Sans-CJK-JP/master/fonts/NotoSansCJKjp-Medium.ttf",
  );
  await chrome.font(
    "https://raw.githack.com/googlefonts/noto-cjk/main/Sans/Variable/TTF/NotoSansCJKsc-VF.ttf",
  );
  await chrome.font(
    "https://raw.githack.com/googlei18n/noto-emoji/master/fonts/NotoColorEmoji.ttf",
  );

  const browser = await core.launch(options);
  _page = await browser.newPage();
  return _page;
};

export const getScreenshot = async (
  html: string,
  type: FileType,
  isDev: boolean,
): Promise<string | void | Buffer> => {
  const page = await getPage(isDev);
  await page.setViewport({ width: OG_WIDTH, height: OG_HEIGHT });
  await page.setContent(html);
  const file = await page.screenshot({ type });
  return file;
};
