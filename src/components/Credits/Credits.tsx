import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { MDXRemote } from "next-mdx-remote";
import type { FC } from "react";

import s from "./Credits.module.css";

export interface Props {
  source: MDXRemoteSerializeResult;
}

export const Credits: FC<Props> = ({ source }) => {
  return (
    <section className="px-3 text-black dark:text-white">
      <div className={s.markdown}>
        <MDXRemote {...source} lazy />
      </div>
    </section>
  );
};
