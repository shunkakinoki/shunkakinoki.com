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
    <li className="col-span-1 border rounded-lg shadow-lg transparent border- group hover:bg-gray-50 dark:bg-black dark:border-gray-300 dark:hover:bg-gray-900">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="flex items-center px-4 py-4 sm:px-6">
          <div className="flex-shrink-0 hidden md:inline-block md:pr-2">
            <div className="w-16 h-16">{children}</div>
          </div>
          <div className="flex-grow ml-3 mr-1">
            <h4 className="text-lg font-medium tracking-tight text-gray-900 dark:text-gray-100">
              {name}
            </h4>
            <p className="text-sm leading-5 text-gray-600 line-clamp-3 dark:text-gray-300">
              {description}
            </p>
          </div>
          <div className="flex-shrink-0 text-gray-500">
            <External />
          </div>
        </div>
      </a>
    </li>
  );
}
