import matter from "gray-matter";
import renderToString from "next-mdx-remote/render-to-string";
import { MdxRemote } from "next-mdx-remote/types";

export const getGithubContent = async (
  dir: string,
  pageId: string,
  locale?: string,
  range?: number[]
): Promise<
  | {
      frontMatter: {
        [key: string]: any;
      };
      source: MdxRemote.Source;
    }
  | undefined
> => {
  try {
    const response = await fetch(
      `https://raw.githubusercontent.com/shunkakinoki/shunkakinoki/main/${dir}/${
        locale ?? "en"
      }/${pageId}.md`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw Error(`${dir} not found`);
    }

    let source = await response.text();

    if (range) {
      source = source.split("\n").slice(range[0], range[1]).join();
    }

    const { content, data } = matter(source);
    const mdxSource = await renderToString(content, {
      scope: data,
    });
    return { frontMatter: data, source: mdxSource };
  } catch (err) {
    throw Error(err);
  }
};
