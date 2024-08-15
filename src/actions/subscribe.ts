"use server";

import { postSubscribe } from "@/services/buttondown";
import { z } from "zod";

const subscribeSchema = z.object({
  email: z
    .string({
      // biome-ignore lint/style/useNamingConvention: <explanation>
      invalid_type_error: "Please enter an email address.",
    })
    .email({ message: "Please enter a valid email address." }),
});

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type FormState = "idle" | "loading" | "success" | "error";

export type State = {
  errors?: {
    name?: string[];
    email?: string[];
  };
  message: string | null;
  state: FormState;
};

// -----------------------------------------------------------------------------
// Action
// -----------------------------------------------------------------------------

export const subscribeAction = async (
  _prevState: State,
  formData: FormData,
): Promise<State> => {
  // Validate form fields
  const validatedFields = subscribeSchema.safeParse({
    email: formData.get("email"),
  });

  // Return errors if validation fails
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      state: "error",
      message: "Missing Fields. Failed to Create User",
    };
  }

  try {
    const data = await postSubscribe(validatedFields.data.email);
    console.info("result", JSON.stringify(data));

    // @ts-ignore
    if (data?.error) {
      // @ts-ignore
      throw new Error(data?.error?.detail);
    }

    return {
      message: "User Created",
      state: "success",
    };
  } catch (err) {
    console.error(err);
    return {
      message: err instanceof Error ? err.message : String(err),
      state: "error",
    };
  }
};
