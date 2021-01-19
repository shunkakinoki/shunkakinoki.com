import { ReactNode } from "react";
import { SocialLinks } from "@/const";
export interface Props {
  children: ReactNode;
  href: string;
  title: string;
  username?: string;
}

export default function SocialCard({
  children,
  href,
  title,
  username = `@${SocialLinks.shunkakinoki}`,
}: Props): JSX.Element {
  return (
    <li className="col-span-1 group">
      <a href={href} target="_blank" rel="noopener noreferrer">
        <div className="flex items-center leading-5 text-left no-underline cursor-pointer">
          <div className="box-border flex justify-center flex-shrink-0 w-8 mr-4 text-3xl text-left text-gray-500 group-hover:text-gray-600">
            {children}
          </div>
          <div className="flex-1 text-left cursor-pointer">
            <h4 className="flex items-center text-sm font-medium leading-normal text-gray-400 group-hover:text-gray-500">
              {title}
            </h4>
            <p className="block w-full text-xs text-gray-500 truncate flex-nowrap whitespace-nowrap group-hover:underline group-hover:text-gray-600">
              {username}
            </p>
          </div>
        </div>
      </a>
    </li>
  );
}
