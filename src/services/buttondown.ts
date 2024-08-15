import type { paths as ButtonDownPaths } from "@/client/buttondown";
import createClient from "openapi-fetch";

// -----------------------------------------------------------------------------
// Client
// -----------------------------------------------------------------------------

export const buttondownClient: ReturnType<
  typeof createClient<ButtonDownPaths>
> = createClient<ButtonDownPaths>({
  baseUrl: "https://api.buttondown.email/v1",
  headers: {
    // biome-ignore lint/style/useNamingConvention: <explanation>
    Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`,
  },
  credentials: "include",
});

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

export const getSubscribersCount = async () => {
  return (await buttondownClient.GET("/subscribers")).data?.count;
};

export const getEmail = async (emailId: string) => {
  return await buttondownClient.GET("/emails/{id}", {
    params: { path: { id: emailId } },
  });
};

export const createEmail = async (
  pageId: string,
  title: string,
  tags: string[],
) => {
  return await fetch("https://api.buttondown.email/v1/emails", {
    method: "POST",
    cache: "no-store",
    headers: {
      // biome-ignore lint/style/useNamingConvention: <explanation>
      Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      subject: title,
      body: `A new post has been published on shunkakinoki.com. Check it out now!\n\n\nhttps://shunkakinoki.com/${pageId}`,
      filters: {
        filters: tags.map((tag) => ({
          field: "subscriber.tags",
          operator: "contains",
          value: tag,
        })),
        groups: [],
        predicate: "and",
      },
    }),
  }).then((res) => res.json());
};

export const postSubscribe = async (email: string, tags: string[]) => {
  return await fetch("https://api.buttondown.email/v1/subscribers", {
    method: "POST",
    cache: "no-store",
    headers: {
      // biome-ignore lint/style/useNamingConvention: <explanation>
      Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // biome-ignore lint/style/useNamingConvention: <explanation>
      email_address: email,
      tags: tags,
    }),
  }).then((res) => res.json());
};
