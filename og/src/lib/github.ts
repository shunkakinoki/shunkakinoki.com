import matter from "gray-matter";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any;
      };
      source: MDXRemoteSerializeResult;
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

    const { content, data } = matter(source);
    const mdxSource = await serialize(content, {
      scope: data,
    });
    return { frontMatter: data, source: mdxSource };
  } catch (err) {
    throw Error(err as string);
  }
};

export const getGithubSummary = async (
  dir: string,
  locale?: string,
  range?: number[],
): Promise<
  | {
      frontMatter: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any;
      };
      source: MDXRemoteSerializeResult;
    }
  | undefined
> => {
  const result = await getGithubContent(dir, "SUMMARY", locale, range);

  return result;
};
