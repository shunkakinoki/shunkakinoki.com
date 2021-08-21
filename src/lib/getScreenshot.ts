import { OG_HEIGHT, OG_WIDTH } from "next-og-utils";
import type { FileType } from "next-og-utils";
import * as playwright from "playwright-aws-lambda";

const getPage = async (isDev: boolean) => {
  const browser = await playwright.launchChromium({ headless: !isDev });
  const context = await browser.newContext();
  const page = await context.newPage();
  return page;
};

export const getScreenshot = async (
  html: string,
  type: FileType,
  isDev: boolean,
): Promise<string | void | Buffer> => {
  const page = await getPage(isDev);
  await page.setViewportSize({ width: OG_WIDTH, height: OG_HEIGHT });
  await page.setContent(html);
  const file = await page.screenshot({ type });
  return file;
};
