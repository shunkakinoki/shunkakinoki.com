import Link, { LinkProps } from "next/link";

interface HeaderLinkProps extends LinkProps {
  children: string;
}

export function HeaderLink({ children, href }: HeaderLinkProps): JSX.Element {
  return (
    <li className="px-3 m-0 leading-5 text-left text-gray-400 align-baseline hover:text-gray-600">
      <Link href={href}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className="p-0 text-sm font-medium no-underline uppercase border-0 cursor-pointer">
          {children}
        </a>
      </Link>
    </li>
  );
}

export default function Header(): JSX.Element {
  return (
    <header
      role="banner"
      className="box-border sticky flex items-center px-6 py-3 mb-2 leading-5 text-gray-400 align-baseline border-0 sm:mb-6"
    >
      <div className="items-center flex-grow flex-shrink-0 max-w-screen-sm align-baseline">
        <h1 className="text-xl font-medium leading-loose text-gray-400 hover:text-gray-600">
          <Link href="/">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              aria-current="page"
              className="text-xl no-underline align-baseline cursor-pointer "
            >
              shunkakinoki
            </a>
          </Link>
        </h1>
      </div>
      <nav className="flex-grow flex-shrink-0 block align-baseline">
        <ul className="flex items-center justify-end leading-5 ">
          <HeaderLink href="/about">About</HeaderLink>
          <HeaderLink href="/blog">Blog</HeaderLink>
          <HeaderLink href="/social">Social</HeaderLink>
        </ul>
      </nav>
    </header>
  );
}
