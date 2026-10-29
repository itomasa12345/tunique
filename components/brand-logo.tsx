import Image from "next/image";

export function BrandLogo() {
  return (
    <span className="brand-logo">
      <Image
        src="/brand/tunique-logo.png"
        alt="TUNIQUE — TUNE YOUR UNIQUE"
        width={1774}
        height={887}
        priority
        unoptimized
      />
    </span>
  );
}
