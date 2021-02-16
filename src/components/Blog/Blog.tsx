import hydrate from "next-mdx-remote/hydrate";
import {MdxRemote} from "next-mdx-remote/types";
import Link from "next/link";

import s from "./Blog.module.css";

export interface Props {
  frontMatter: {
    [key: string]: any;
  };
  source: MdxRemote.Source;
  slug: string;
}

interface BlogLinkProps {
  children: string;
  href: string;
}

export default function Blog({source, slug}: Props): JSX.Element {
  function BlogLink({children, href}: BlogLinkProps) {
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
  }

  const components = {
    a: BlogLink,
  };

  const content = hydrate(source, {components});

  return (
    <section className="px-3 text-black dark:text-white">
      <div className={s.markdown}>{content}</div>
    </section>
  );
}
