import hydrate from "next-mdx-remote/hydrate";
import {MdxRemote} from "next-mdx-remote/types";
import Link from "next/link";

import s from "./Blog.module.css";

export interface Props {
  frontMatter: {
    [key: string]: any;
  };
  source: MdxRemote.Source;
}

interface BlogLinkProps {
  children: string;
  href: string;
}

function BlogLink({children, href}: BlogLinkProps) {
  return <Link href={href.replace(".md", "")}>{children}</Link>;
}

const components = {
  a: BlogLink,
};

export default function Blog({source}: Props): JSX.Element {
  const content = hydrate(source, {components});

  return (
    <section className="px-3 text-black dark:text-white">
      <div className={s.markdown}>{content}</div>
    </section>
  );
}
