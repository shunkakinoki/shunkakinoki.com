import { MDXRemote } from "next-mdx-remote";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import Link from "next/link";

import type { FC } from "react";

import s from "./Blog.module.css";

export interface Props {
  frontMatter: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
  source: MDXRemoteSerializeResult;
  slug: string;
}

interface BlogLinkProps {
  children: string;
  href: string;
}

export const Blog: FC<Props> = ({ source, slug }) => {
  const BlogLink = ({ children, href }: BlogLinkProps) => {
    return (
      <Link
        href={
          slug === "blog"
            ? href.replace(".md", "")
            : `${slug}/${href.replace(".md", "")}`
        }
      >
        {children}
      </Link>
    );
  };

  const components = {
    a: BlogLink,
  };

  return (
    <section className="px-3 text-black dark:text-white">
      <div className={s.markdown}>
        <MDXRemote {...source} components={components} />
      </div>
    </section>
  );
};
