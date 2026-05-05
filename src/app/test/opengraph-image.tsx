import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(145deg, #0A0A0A, #131313 55%, #20190A)",
          color: "#FFFFFF",
          padding: "72px",
        }}
      >
        <div
          style={{
            color: "#B8963E",
            fontSize: 30,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Neurea
        </div>
        <div style={{ marginTop: 30, fontSize: 74, lineHeight: 1.05, fontWeight: 700 }}>
          ADHD test zdarma
        </div>
        <div style={{ marginTop: 24, fontSize: 34, color: "#E9DFC4" }}>
          10 otázek. Výsledek ihned.
        </div>
      </div>
    ),
    size,
  );
}
