import matter from "gray-matter";
import renderToString from "next-mdx-remote/render-to-string";
import { MdxRemote } from "next-mdx-remote/types";

const githubLink =
  "https://raw.githubusercontent.com/shunkakinoki/shunkakinoki/main";

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
      dir !== "credits" && pageId !== "CREDITS"
        ? `${githubLink}/${dir}/${locale ?? "en"}/${pageId}.md`
        : `${githubLink}/CREDITS.md`,
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
      source = source.split("\n").slice(range[0], range[1]).join("\n\n");
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
