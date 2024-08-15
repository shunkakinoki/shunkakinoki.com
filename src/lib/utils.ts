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
    /([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|[0-9a-f]{32})/gi;
  // biome-ignore lint/style/useNamingConvention: <explanation>
  const potentialUUIDs = inputString.match(uuidRegex) || [];

  // biome-ignore lint/style/useNamingConvention: <explanation>
  const firstValidUUID = potentialUUIDs.find((uuid) => {
    // Check if the UUID needs hyphenation
    if (uuid.length === 32) {
      // Reformat to the hyphenated version
      // biome-ignore lint/style/noParameterAssign: <explanation>
      uuid = `${uuid.slice(0, 8)}-${uuid.slice(8, 12)}-${uuid.slice(12, 16)}-${uuid.slice(16, 20)}-${uuid.slice(20)}`;
    }
    return uuidValidate(uuid);
  });

  return firstValidUUID || null;
}
