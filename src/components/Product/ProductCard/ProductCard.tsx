import { External } from "@/icons";

interface Props {
  children: JSX.Element;
  description: string;
  name: string;
  href: string;
}

export default function ProductCard({
  children,
  description,
  name,
  href,
}: Props): JSX.Element {
  return (
    <li className="col-span-1 rounded-lg shadow group">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800"
      >
        <div className="flex items-center px-4 py-4 sm:px-6">
          <div className="flex items-center flex-1 min-w-0 overflow-hidden">
            <div className="flex-shrink-0">{children}</div>
            <div>
              <h4 className="text-lg font-medium tracking-tight text-gray-900 dark:text-gray-100">
                {name}
              </h4>
              <p className="flex items-center mt-3 text-sm leading-5 text-gray-700 line-clamp-3 dark:text-gray-300">
                {description}
              </p>
            </div>
          </div>
          <div className="flex-shrink-0 text-gray-500">
            <External />
          </div>
        </div>
      </a>
    </li>
  );
}
