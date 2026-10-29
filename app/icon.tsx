import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
export const size = { width: 128, height: 128 };
export const contentType = "image/png";
export default async function Icon() {
  const logo = await readFile(
    path.join(process.cwd(), "public/brand/tunique-logo.png"),
  );
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#000",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={`data:image/png;base64,${logo.toString("base64")}`}
        width={128}
        height={64}
        alt=""
      />
    </div>,
    size,
  );
}
