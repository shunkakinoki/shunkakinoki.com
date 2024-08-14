import { Notion } from "@/components/notion";
import { getBlocks, getPage } from "@/services/notion";
import type { Metadata } from "next";

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
}: { params: { slug: string } }) {
  // ---------------------------------------------------------------------------
  // Services
  // ---------------------------------------------------------------------------

  const page = await getPage(params.slug);

  // @ts-ignore
  const pageEmoji = page?.icon?.emoji ?? "📄";

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  if (page.properties?.Published && !page.properties?.Published?.checkbox) {
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
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
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
      <Notion blocks={blocksWithChildren} content={page} pageId={params.slug} />
    </>
  );
}
