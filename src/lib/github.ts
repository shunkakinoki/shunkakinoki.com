import matter from "gray-matter";
import renderToString from "next-mdx-remote/render-to-string";
import { MdxRemote } from "next-mdx-remote/types";

export const getBlogContent = async (
  pageId: string,
  locale?: string
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
      `https://raw.githubusercontent.com/shunkakinoki/shunkakinoki/main/blog/${
        locale ?? "en"
      }/${pageId}.md`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const source = await response.text();
    const { content, data } = matter(source);
    const mdxSource = await renderToString(content, {
      scope: data,
    });
    return { frontMatter: data, source: mdxSource };
  } catch (err) {
    console.log(err);
  }
};
