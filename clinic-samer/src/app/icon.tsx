import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 20,
          background: "#4b334f",
          color: "#fffaf5",
          fontFamily: "serif",
          fontSize: 34,
          fontStyle: "italic",
          letterSpacing: -3,
        }}
      >
        SA
      </div>
    ),
    size
  );
}
