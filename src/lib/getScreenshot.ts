import { OG_HEIGHT, OG_WIDTH } from "next-og-utils";
import type { FileType } from "next-og-utils";
import * as playwright from "playwright-aws-lambda";
import type { Page, LaunchOptions } from "playwright-core";

let _page: Page | null;

const exePath =
  process.platform === "win32"
    ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
    : process.platform === "linux"
    ? "/usr/bin/google-chrome"
    : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

export const getOptions = (isDev: boolean): LaunchOptions => {
  let options: LaunchOptions;
  if (isDev) {
    options = {
      args: [],
      executablePath: exePath,
      headless: true,
    };
  } else {
    options = {
      args: ["--lang=ja"],
      headless: true,
    };
  }

  return options;
};

const getPage = async (isDev: boolean) => {
  if (_page) {
    return _page;
  }

  const options = getOptions(isDev);
  const browser = await playwright.launchChromium(options);
  await playwright.loadFont(
    "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&display=swap",
  );
  const context = await browser.newContext();

  _page = await context.newPage();
  return _page;
};

export const getScreenshot = async (
  html: string,
  type: FileType,
  isDev: boolean,
): Promise<string | void | Buffer> => {
  const page = await getPage(isDev);
  await page.setExtraHTTPHeaders({
    "Accept-Language": "ja-JP",
  });

  await page.setViewportSize({ width: OG_WIDTH, height: OG_HEIGHT });
  await page.setContent(html);
  const file = await page.screenshot({ type });
  return file;
};
