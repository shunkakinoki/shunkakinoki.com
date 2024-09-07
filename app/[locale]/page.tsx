import { Life } from "@/components/life";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Products } from "@/components/products";
import { Social } from "@/components/social";
import { siteConfig } from "@/config/site";
import { Link } from "@/navigation";
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
          <Link className="underline hover:opacity-80" href="/products">
            builder
          </Link>
          ,{" "}
          <a
            className="underline hover:opacity-80"
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.github}
          >
            hacker
            <ArrowUpRightFromSquareIcon className="mb-2 inline-block h-3 w-3" />
          </a>
          , &{" "}
          <a
            className="underline hover:opacity-80"
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.pioneer}
          >
            pioneer
            <ArrowUpRightFromSquareIcon className="mb-2 inline-block h-3 w-3" />
          </a>{" "}
          striving to obliterate the galaxy.
        </PageHeaderDescription>
        <PageActions>
          <Button asChild>
            <Link href="/about">
              <LightLogo className="mr-2 h-4 w-4" />
              About Me
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <a target="_blank" rel="noreferrer" href={siteConfig.links.twitter}>
              <TwitterLogoIcon className="mr-2 h-4 w-4" />
              Twitter
              <ArrowUpRightFromSquareIcon className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </PageActions>
      </PageHeader>
      <div className="mt-4 flex flex-col space-y-10 md:space-y-16">
        <Products isPartial />
        <Life />
        <Social isPartial />
      </div>
    </>
  );
}