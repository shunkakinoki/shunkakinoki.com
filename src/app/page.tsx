import { RocketIcon, TwitterLogoIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import Link from "next/link"

import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { buttonVariants } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { ArrowUpRightFromSquareIcon } from "lucide-react"

export default function IndexPage() {
  return (
    <div className="container relative max-w-screen-md">
      <PageHeader>
        {/* <Announcement /> */}
        <PageHeaderHeading>Hi, I'm Shun Kakinoki.</PageHeaderHeading>
        <PageHeaderDescription>
          I am a builder, hacker, & pioneer striving to obliterate the galaxy.
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
      <section className="overflow-hidden rounded-lg border bg-background shadow-md md:hidden md:shadow-xl">
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
      </section>
      <section className="hidden md:block">
        <div className="overflow-hidden rounded-lg border bg-background shadow">
          {/* <MailPage /> */}
        </div>
      </section>
    </div>
  )
}
