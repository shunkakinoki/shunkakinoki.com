import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { MDXRemote } from "next-mdx-remote";

import s from "./Content.module.css";

export interface Props {
  frontMatter: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
  source: MDXRemoteSerializeResult;
}

export default function Content({ source }: Props): JSX.Element {
  return (
    <section className="px-3 text-black dark:text-white">
      <div className={s.markdown}>
        <MDXRemote {...source} lazy />
      </div>
    </section>
  );
}
