import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { validate as uuidValidate } from "uuid";

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// biome-ignore lint/style/useNamingConvention: <explanation>
export function extractValidUUID(inputString: string) {
  const uuidRegex =
    /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/gi;
  // biome-ignore lint/style/useNamingConvention: <explanation>
  const potentialUUIDs = inputString.match(uuidRegex) || [];
  // biome-ignore lint/style/useNamingConvention: <explanation>
  const firstValidUUID = potentialUUIDs.find((uuid) => uuidValidate(uuid));
  return firstValidUUID || null;
}
