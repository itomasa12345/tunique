import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
export const alt = "TUNIQUE — TUNE YOUR UNIQUE";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function Image() {
  const logo = await readFile(
    path.join(process.cwd(), "public/brand/tunique-logo.png"),
  );
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        background: "#000",
        color: "#f8f7f3",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <img
        src={`data:image/png;base64,${logo.toString("base64")}`}
        width={1000}
        height={500}
        alt=""
      />
      <div style={{ display: "flex", fontSize: 20, letterSpacing: 4 }}>
        BIKE FITTING & LIFE PLANNING
      </div>
    </div>,
    size,
  );
}
