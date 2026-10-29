import { searchIndexingEnabled } from "@/lib/publication";
import { resolveSiteUrl } from "@/lib/site-url";
import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { Header } from "@/components/header";
import { navigation } from "@/lib/site";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: resolveSiteUrl(),
  verification: {
    google: "N-Gt1TmMLpeUefvgdRONlX7nEOlMTl8ROvlyDU93Zr8",
  },
  title: { default: "TUNIQUE | TUNE YOUR UNIQUE", template: "%s | TUNIQUE" },
  description:
    "一人ひとりの違いを尊重し、あなたに合った基準を見つける。伊藤雅和によるバイクフィッティングとライフプラン相談。",
  robots: { index: searchIndexingEnabled, follow: searchIndexingEnabled },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>
        <a className="skip-link" href="#main">
          本文へスキップ
        </a>
        <Header />
        <main id="main">{children}</main>
        <footer className="footer wrap">
          <div className="footer-top">
            <Link className="wordmark" href="/" aria-label="TUNIQUE ホーム">
              <BrandLogo />
            </Link>
            <p>一人ひとりに、その人の基準を。</p>
            <nav aria-label="フッターナビゲーション">
              {navigation.map((x) => (
                <Link key={x.href} href={x.href}>
                  {x.label}
                </Link>
              ))}
              <Link href="/contact">CONTACT</Link>
            </nav>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} TUNIQUE</span>
            <span>TUNE YOUR UNIQUE</span>
            <Link href="/privacy">プライバシーポリシー</Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
