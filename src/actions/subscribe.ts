"use server";

import { postSubscribe } from "@/services/buttondown";

export type FormState = "idle" | "loading" | "success" | "error";

export type State = {
  errors?: {
    name?: string[];
    email?: string[];
  };
  message: string | null;
  state: FormState;
};

export const subscribeAction = async (
  _prevState: State,
  formData: FormData,
): Promise<State> => {
  const email = formData.get("email") as string;

  // Await 300ms
  await new Promise((resolve) => setTimeout(resolve, 300));

  try {
    await postSubscribe(email);
    return {
      message: "User Created",
      state: "success",
    };
  } catch (_error) {
    return {
      message: "Database Error: Failed to Create User",
      state: "error",
    };
  }
};
