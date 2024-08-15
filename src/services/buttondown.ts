import type { paths as ButtonDownPaths } from "@/client/buttondown";
import createClient from "openapi-fetch";

// -----------------------------------------------------------------------------
// Client
// -----------------------------------------------------------------------------

export const buttondownClient: ReturnType<
  typeof createClient<ButtonDownPaths>
> = createClient<ButtonDownPaths>({
  baseUrl: "https://api.buttondown.email/v1",
});

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

export const getSubscribersCount = async () => {
  return (await buttondownClient.GET("/subscribers")).data?.count;
};

export const postSubscribe = async (email: string) => {
  return await buttondownClient.POST("/subscribers", {
    body: {
      metadata: {},
      tags: [],
      // biome-ignore lint/style/useNamingConvention: <explanation>
      referrer_url: "https://shunkakinoki.com",
      // biome-ignore lint/style/useNamingConvention: <explanation>
      email_address: email,
      notes: "Subscribed from the website",
      // biome-ignore lint/style/useNamingConvention: <explanation>
      utm_campaign: "website",
      // biome-ignore lint/style/useNamingConvention: <explanation>
      utm_medium: "website",
      // biome-ignore lint/style/useNamingConvention: <explanation>
      utm_source: "website",
    },
  });
};
