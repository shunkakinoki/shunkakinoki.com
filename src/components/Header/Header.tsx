export default function Header(): JSX.Element {
  return (
    <header
      role="banner"
      className="box-border sticky top-0 left-0 flex items-center px-6 py-3 mx-0 mt-0 mb-2 leading-5 text-gray-400 align-baseline border-0 sm:mb-6"
    >
      <div className="items-center flex-grow flex-shrink-0 p-0 m-0 align-baseline">
        <h1 className="p-0 text-xl font-medium leading-loose text-gray-400 border-0">
          <a
            aria-current="page"
            className="m-0 text-xl no-underline align-baseline cursor-pointer"
            href="/"
          >
            shunkakinoki
          </a>
        </h1>
      </div>
      <nav className="flex-grow flex-shrink-0 block p-0 m-0 align-baseline">
        <ul className="flex items-center justify-end p-0 leading-5 text-gray-400 border-0">
          <li className="px-3 m-0 leading-5 text-left align-baseline">
            <a
              href="/blog"
              className="p-0 text-sm font-medium no-underline uppercase border-0 cursor-pointer"
            >
              Blogasdfasdf
            </a>
          </li>
          <li className="px-3 m-0 leading-5 text-left align-baseline">
            <a
              href="/links"
              className="p-0 text-sm font-medium no-underline uppercase border-0 cursor-pointer"
            >
              Linkss
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
