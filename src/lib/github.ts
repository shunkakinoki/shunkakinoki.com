import matter from "gray-matter";
import renderToString from "next-mdx-remote/render-to-string";
import {MdxRemote} from "next-mdx-remote/types";

const githubLink =
  "https://raw.githubusercontent.com/shunkakinoki/shunkakinoki/main";

export const getGithubContent = async (
  dir: string,
  pageId: string,
  locale?: string,
  range?: number[],
): Promise<
  | {
      frontMatter: {
        [key: string]: any;
      };
      source: MdxRemote.Source;
    }
  | undefined
> => {
  const target =
    dir !== "credits" && pageId !== "CREDITS"
      ? `${githubLink}/${dir}/${locale ?? "en"}/${pageId}.md`
      : `${githubLink}/CREDITS.md`;

  try {
    const response = await fetch(target, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw Error(`${target} not found`);
    }

    let source = await response.text();

    if (range) {
      source = source.split("\n").slice(range[0], range[1]).join("\n\n");
    }

    const {content, data} = matter(source);
    const mdxSource = await renderToString(content, {
      scope: data,
    });
    return {frontMatter: data, source: mdxSource};
  } catch (err) {
    throw Error(err);
  }
};

export const getGithubSummary = async (
  dir: string,
  locale?: string,
  range?: number[],
): Promise<
  | {
      frontMatter: {
        [key: string]: any;
      };
      source: MdxRemote.Source;
    }
  | undefined
> => {
  const result = await getGithubContent(dir, "SUMMARY", locale, range);

  if (result) {
    console.log(result.source.renderedOutput);
  }

  return result;
};
