import { ImageResponse } from "next/og";
export const alt = "TUNIQUE — TUNE YOUR UNIQUE";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        background: "#111",
        color: "#f8f7f3",
        width: "100%",
        height: "100%",
        padding: 80,
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", fontSize: 30, letterSpacing: 8 }}>
        TUNIQUE
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 100,
          fontWeight: 900,
          lineHeight: 1,
          flexDirection: "column",
        }}
      >
        <span>TUNE YOUR</span>
        <span>UNIQUE.</span>
      </div>
      <div style={{ display: "flex", fontSize: 20, letterSpacing: 4 }}>
        BIKE FITTING & LIFE PLANNING
      </div>
    </div>,
    size,
  );
}
