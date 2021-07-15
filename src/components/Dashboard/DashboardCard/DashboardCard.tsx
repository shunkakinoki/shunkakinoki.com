import { External } from "@/icons";

export interface Props {
  children: JSX.Element;
  href: string;
  number: number | undefined;
  title: string;
}
export default function DashboardCard({
  children,
  href,
  number,
  title,
}: Props): JSX.Element {
  return (
    <div className="overflow-hidden bg-white hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 rounded-lg shadow">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="sm:p-6 py-5 px-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 p-3 bg-indigo-500 rounded-md">
              {children}
            </div>
            <div className="flex-1 ml-5 w-0">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                {title}
              </dt>
              <dd className="flex items-baseline">
                {number ? (
                  <div className="text-2xl font-semibold text-gray-900 dark:text-gray-300">
                    {number}
                  </div>
                ) : (
                  <div className="w-9/12 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                )}
              </dd>
            </div>
            <div className="flex-shrink-0 text-gray-500">
              <External />
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
