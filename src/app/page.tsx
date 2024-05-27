import { RocketIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import { Life } from "@/components/life";
import { Newsletter } from "@/components/newsletter";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Products } from "@/components/products";
import { Social } from "@/components/social";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { ArrowUpRightFromSquareIcon } from "lucide-react";

export default function IndexPage() {
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
            <ArrowUpRightFromSquareIcon className="inline-block h-3 w-3 mb-2" />
          </a>
          , &{" "}
          <a
            className="underline hover:opacity-80"
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.pioneer}
          >
            pioneer
            <ArrowUpRightFromSquareIcon className="inline-block h-3 w-3 mb-2" />
          </a>{" "}
          striving to obliterate the galaxy.
        </PageHeaderDescription>
        <PageActions>
          <Link href="/about" className={cn(buttonVariants())}>
            <RocketIcon className="mr-2 h-4 w-4" />
            About Me
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.twitter}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <TwitterLogoIcon className="mr-2 h-4 w-4" />
            Twitter
            <ArrowUpRightFromSquareIcon className="ml-2 h-4 w-4" />
          </Link>
        </PageActions>
      </PageHeader>
      {/* <section className="overflow-hidden rounded-lg border bg-background shadow-md md:hidden md:shadow-xl">
        <Image
          src="/examples/mail-dark.png"
          width={1280}
          height={727}
          alt="Mail"
          className="hidden dark:block"
        />
        <Image
          src="/examples/mail-light.png"
          width={1280}
          height={727}
          alt="Mail"
          className="block dark:hidden"
        />
      </section> */}
      <div className="flex flex-col space-y-10 md:space-y-16">
        <Products isPartial />
        <Life />
        <Social />
        <Newsletter />
      </div>
    </>
  );
}
