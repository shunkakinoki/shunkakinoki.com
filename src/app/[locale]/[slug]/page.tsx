import { Notion } from "@/components/notion";
import { getBlocks, getPage } from "@/services/notion";

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
    <Notion blocks={blocksWithChildren} content={page} pageId={params.slug} />
  );
}
