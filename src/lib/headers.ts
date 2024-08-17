import { headers } from "next/headers";

// -----------------------------------------------------------------------------
// Headers
// -----------------------------------------------------------------------------

export function getIp(): string | null {
  const forwardedFor = headers().get("X-forwarded-for");
  const realIp = headers().get("x-real-ip");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? null;
  }
  if (realIp) {
    return realIp.trim();
  }

  return null;
}
