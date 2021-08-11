import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { MDXRemote } from "next-mdx-remote";
import type { FC } from "react";

import s from "./Content.module.css";

export interface Props {
  frontMatter: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
  source: MDXRemoteSerializeResult;
}

export const Content: FC<Props> = ({ source }) => {
  return (
    <section className="px-3 text-black dark:text-white">
      <div className={s.markdown}>
        <MDXRemote {...source} lazy />
      </div>
    </section>
  );
};
