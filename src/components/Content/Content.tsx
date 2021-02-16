import hydrate from "next-mdx-remote/hydrate";
import {MdxRemote} from "next-mdx-remote/types";

import s from "./Content.module.css";

export interface Props {
  frontMatter: {
    [key: string]: any;
  };
  source: MdxRemote.Source;
}

export default function Content({source}: Props): JSX.Element {
  const content = hydrate(source);

  return (
    <section className="px-3 text-black dark:text-white">
      <div className={s.markdown}>{content}</div>
    </section>
  );
}
