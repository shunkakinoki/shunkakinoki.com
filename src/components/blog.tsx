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
  const res = (
    await queryDatabase({
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return !!db.properties.Category.select && !!db.properties.Date?.date;
  });

  return (
    <section>
      <div className="flex-col space-y-3 w-full">
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
                className="flex grow items-center font-extrabold text-warmGray-800 hover:text-coolGray-700 dark:text-coolGray-100 dark:hover:text-white hover:underline line-clamp-1"
              >
                <div className="text-xl md:text-2xl">
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore */}
                  {page.properties.Name?.title[0]?.plain_text || ""}
                </div>
              </Link>
              <div className="flex flex-none justify-center items-center text-sm text-gray-700 dark:text-gray-300">
                {date}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
