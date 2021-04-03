import hydrate from "next-mdx-remote/hydrate";
import type { MdxRemote } from "next-mdx-remote/types";

import s from "./Content.module.css";

export interface Props {
  frontMatter: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
  source: MdxRemote.Source;
}

export default function Content({ source }: Props): JSX.Element {
  const content = hydrate(source);

  return (
    <section className="px-3 text-black dark:text-white">
      <div className={s.markdown}>{content}</div>
    </section>
  );
}
