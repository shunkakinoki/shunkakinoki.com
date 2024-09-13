import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { siteConfig } from "@/config/site";
import { Link } from "@/navigation";
import { Life } from "@/sections/life";
import { Products } from "@/sections/products";
import { Social } from "@/sections/social";
import { LightLogo } from "@lightdotso/svg";
import { Button } from "@lightdotso/ui/components/button";
import { TwitterLogoIcon } from "@radix-ui/react-icons";
import { ArrowUpRightFromSquareIcon } from "lucide-react";
import { unstable_setRequestLocale } from "next-intl/server";

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

// biome-ignore lint/style/noDefaultExport: <explanation>
// biome-ignore lint/suspicious/useAwait: <explanation>
export default async function IndexPage({
  params: { locale },
}: { params: { locale: string } }) {
  // ---------------------------------------------------------------------------
  // i18n
  // ---------------------------------------------------------------------------

  unstable_setRequestLocale(locale);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <>
      <PageHeader>
        {/* <Announcement /> */}
        <PageHeaderHeading>Hi, I'm Shun Kakinoki.</PageHeaderHeading>
        <PageHeaderDescription>
          I am a{" "}
          <Link class="underline hover:opacity-80" href="/products">
            builder
          </Link>
          ,{" "}
          <a
            class="underline hover:opacity-80"
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.github}
          >
            hacker
            <ArrowUpRightFromSquareIcon class="mb-2 inline-block h-3 w-3" />
          </a>
          , &{" "}
          <a
            class="underline hover:opacity-80"
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.pioneer}
          >
            pioneer
            <ArrowUpRightFromSquareIcon class="mb-2 inline-block h-3 w-3" />
          </a>{" "}
          striving to obliterate the galaxy.
        </PageHeaderDescription>
        <PageActions>
          <Button asChild>
            <Link href="/about">
              <LightLogo class="mr-2 h-4 w-4" />
              About Me
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <a target="_blank" rel="noreferrer" href={siteConfig.links.twitter}>
              <TwitterLogoIcon class="mr-2 h-4 w-4" />
              Twitter
              <ArrowUpRightFromSquareIcon class="ml-2 h-4 w-4" />
            </a>
          </Button>
        </PageActions>
      </PageHeader>
      <div class="mt-4 flex flex-col space-y-10 md:space-y-16">
        <Products isPartial />
        <Life />
        <Social isPartial />
      </div>
    </>
  );
}
