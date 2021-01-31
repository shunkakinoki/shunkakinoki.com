export interface Props {
  frontMatter?: {
    [key: string]: any;
  };
  content: string;
}

export default function Blog({ content, frontMatter }: Props): JSX.Element {
  return (
    <>
      <h1>{frontMatter?.title}</h1>
      {content}
    </>
  );
}
