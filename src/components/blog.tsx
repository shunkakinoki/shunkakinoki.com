import { Link } from "@/navigation";
import { queryDatabase } from "@/services/notion";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

export interface BlogProps {
  locale: string;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export async function Blog({ locale }: BlogProps) {
  // ---------------------------------------------------------------------------
  // Service
  // ---------------------------------------------------------------------------

  const res = (
    await queryDatabase({
      // biome-ignore lint/style/useNamingConvention: <explanation>
      database_id: "e4ef762ca07f465e8f5cce906732140b",
      filter: {
        and: [
          {
            property: "Published",
            checkbox: {
              equals: true,
            },
          },
          {
            property: "Locale",
            select: {
              equals: locale,
            },
          },
        ],
      },
    })
  ).results.filter((db) => {
    return (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      !!db.properties.Date?.date &&
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      !!db.properties.Published.checkbox &&
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      !!db.properties.Locale?.select
    );
  });

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <section>
      <div className="w-full flex-col space-y-3">
        {res.map((page) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          const date = new Date(page.properties.Date.date.start).toLocaleString(
            "en",
            {
              month: "short",
              day: "2-digit",
              year: "numeric",
            },
          );
          return (
            <div key={page.id} className="flex space-x-4">
              <Link
                // @ts-expect-error
                href={`/${page.id}`}
                className="line-clamp-1 flex grow items-center font-extrabold text-warmGray-800 hover:text-coolGray-700 hover:underline dark:text-coolGray-100 dark:hover:text-white"
              >
                <div className="text-xl md:text-2xl">
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore */}
                  {page.properties.Name?.title[0]?.plain_text || ""}
                </div>
              </Link>
              <div className="flex flex-none items-center justify-center text-gray-700 text-sm dark:text-gray-300">
                {date}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
