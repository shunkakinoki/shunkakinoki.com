import { getPage } from "@/services/notion";
import { ImageResponse } from "next/og";

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// -----------------------------------------------------------------------------
// Image
// -----------------------------------------------------------------------------

// biome-ignore lint/style/noDefaultExport: <explanation>
export default async function Image({ params }: { params: { slug: string } }) {
  const page = await getPage(params.slug);

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        letterSpacing: "-.02em",
        fontWeight: 700,
        background: "white",
      }}
    >
      <div
        style={{
          left: 42,
          top: 42,
          position: "absolute",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span
          style={{
            width: 24,
            height: 24,
            background: "black",
          }}
        />
        <span
          style={{
            marginLeft: 8,
            fontSize: 20,
          }}
        >
          shunkakinoki.com
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "20px 50px",
          margin: "0 42px",
          fontSize: 40,
          width: "auto",
          maxWidth: 550,
          textAlign: "center",
          backgroundColor: "black",
          color: "white",
          lineHeight: 1.4,
        }}
      >
        {/* @ts-ignore */}
        {page.properties?.Name?.title[0]?.plain_text}
      </div>
    </div>,
    {
      ...size,
    },
  );
}

// -----------------------------------------------------------------------------
// Config
// -----------------------------------------------------------------------------

export const runtime = "edge";
