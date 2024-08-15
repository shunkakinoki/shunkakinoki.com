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

export const postSubscribe = async (_email: string) => {
  return await buttondownClient.POST("/subscribers", {
    // @ts-expect-error
    body: {
      // biome-ignore lint/style/useNamingConvention: <explanation>
      email_address: "shunkakinoki@gmail.com",
    },
  });
};
