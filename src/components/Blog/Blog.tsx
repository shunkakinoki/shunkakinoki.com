import hydrate from "next-mdx-remote/hydrate";
import { MdxRemote } from "next-mdx-remote/types";

export interface Props {
  frontMatter: {
    [key: string]: any;
  };
  source: MdxRemote.Source;
}

export default function Blog({ frontMatter, source }: Props): JSX.Element {
  const content = hydrate(source);

  return (
    <>
      <h1>{frontMatter.title}</h1>
      {content}
    </>
  );
}
