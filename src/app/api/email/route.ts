import { extractValidUUID } from "@/lib/utils";
import { createEmail } from "@/services/buttondown";
import { getPage } from "@/services/notion";
import { createEmailId, getEmailId, ratelimit } from "@/services/redis";
import type { NextRequest } from "next/server";

// -----------------------------------------------------------------------------
// Route
// -----------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const slug = searchParams.get("slug");
  const locale = searchParams.get("locale");

  const { success, limit, remaining } = await ratelimit.limit(`email:${slug}`);

  const response = {
    success: success,
    limit: limit,
    remaining: remaining,
  };

  if (!success) {
    return new Response(JSON.stringify(response), { status: 429 });
  }

  // biome-ignore lint/complexity/useSimplifiedLogicExpression: <explanation>
  if (!locale || !slug) {
    return new Response(
      JSON.stringify({
        error: "Invalid page slug",
      }),
      { status: 400 },
    );
  }

  // Omit the slug to get the valid uuid
  const pageId = extractValidUUID(slug);

  if (!pageId) {
    return new Response(
      JSON.stringify({
        error: "Invalid page id",
      }),
      { status: 400 },
    );
  }

  // Get the page
  const page = await getPage(pageId);

  // @ts-ignore
  const tags = [page.properties?.Published ? locale : "journal"];

  const { emailId } = await getEmailId(pageId);
  if (!emailId) {
    // Create a new email
    const email = await createEmail(
      pageId,
      // @ts-ignore
      page.properties.Name?.title[0]?.plain_text ??
        "New post on shunkakinoki.com",
      tags,
    );
    console.info("email", email);

    // Save the email id
    if (email?.id) {
      await createEmailId(pageId, email?.id);
    }
  }

  return new Response(JSON.stringify(response));
}

// -----------------------------------------------------------------------------
// Config
// -----------------------------------------------------------------------------

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
