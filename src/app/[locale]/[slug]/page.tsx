import { Newsletter } from "@/components/newsletter";
import { Notion } from "@/components/notion";
import { ViewCount } from "@/components/view-count";
import { extractValidUUID } from "@/lib/utils";
import { getBlocks, getPage } from "@/services/notion";
import { getEmailId } from "@/services/redis";
import type { Metadata } from "next";

// -----------------------------------------------------------------------------
// Metadata
// -----------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: { params: { slug: string } }): Promise<Metadata> {
  const page = await getPage(params.slug);

  return {
    //@ts-ignore
    title: page.properties?.Name?.title[0]?.plain_text,
  };
}

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

// biome-ignore lint/style/noDefaultExport: <explanation>
export default async function SlugPage({
  params,
}: { params: { locale: string; slug: string; disableNewsletter?: boolean } }) {
  // ---------------------------------------------------------------------------
  // Services
  // ---------------------------------------------------------------------------

  // Omit the slug to get the valid uuid
  const pageId = extractValidUUID(params.slug);

  if (!pageId) {
    return {
      notFound: true,
      revalidate: 30,
    };
  }

  // Get the page
  const page = await getPage(pageId);

  // @ts-ignore
  const pageEmoji = page?.icon?.emoji ?? "📄";

  if (
    //@ts-ignore
    (page.properties?.Published && !page.properties?.Published?.checkbox) ||
    //@ts-ignore
    (page.properties?.Date && !page.properties.Date?.date?.start)
  ) {
    return {
      notFound: true,
      revalidate: 30,
    };
  }
  const blocks = await getBlocks(params.slug);
  const childBlocks = await Promise.all(
    blocks
      .filter((block) => {
        //@ts-ignore
        return block.has_children;
      })
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        };
      }),
  );
  const blocksWithChildren = blocks.map((block) => {
    //@ts-ignore
    if (block.has_children) {
      block.children = childBlocks.find((x) => {
        return x.id === block.id;
      })?.children;
    }
    return block;
  });

  // Post the email if it does not exist
  const { emailId } = await getEmailId(pageId);
  if (!emailId) {
    await fetch(`/api/email/${params.slug}`, {
      method: "POST",
    });
  }

  // @ts-ignore
  const tags = [page.properties?.Published ? params.locale : "journal"];

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <>
      <link
        rel="icon"
        href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${pageEmoji}</text></svg>`}
        type="image/svg+xml"
        sizes="any"
      />
      <Notion
        viewCount={<ViewCount pageId={pageId} />}
        blocks={blocksWithChildren}
        content={page}
        pageId={pageId}
      />
      {params?.disableNewsletter ? undefined : <Newsletter tags={tags} />}
    </>
  );
}
