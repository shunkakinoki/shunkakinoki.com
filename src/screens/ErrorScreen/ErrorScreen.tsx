import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function ErrorScreen(): JSX.Element {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center max-w-3xl mx-auto my-16 md:my-24 lg:my-32">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl lg:text-9xl dark:text-white md:mb-6 lg:mb-9">
          404
        </h1>
        <Link href="/">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className="inline-flex items-center px-6 py-3 text-base font-medium text-indigo-700 bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Go home
          </a>
        </Link>
      </div>
      <Footer />
    </>
  );
}
