import hydrate from "next-mdx-remote/hydrate";
import type { MdxRemote } from "next-mdx-remote/types";

import s from "./Credits.module.css";

export interface Props {
  source: MdxRemote.Source;
}

export default function Credits({ source }: Props): JSX.Element {
  const content = hydrate(source);

  return (
    <section className="px-3 text-black dark:text-white">
      <div className={s.markdown}>{content}</div>
    </section>
  );
}
