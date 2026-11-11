import Link from "next/link";
import { metadata } from "@/lib/site";
import { searchIndexingEnabled } from "@/lib/publication";
import { columns, isPublishedColumn, visibleColumns } from "@/lib/columns";
import { PageHero } from "@/components/ui";
import { ColumnCards } from "@/components/column-cards";
export const generateMetadata = () => ({
  ...metadata(
    "コラム",
    "ロードバイク・競輪のフィッティングを考えるコラム。身体と自転車の関係を知り、自分に合う基準を見つけるために。",
    "/columns",
  ),
  robots: {
    index: searchIndexingEnabled && columns.some(isPublishedColumn),
    follow: searchIndexingEnabled && columns.some(isPublishedColumn),
  },
});
export default function ColumnsPage() {
  return (
    <>
      <PageHero
        english="COLUMN"
        number="05"
        title={
          <>
            知ることから、
            <br />
            <span className="muted">自分の基準へ。</span>
          </>
        }
        text="身体と自転車のこと、走りのこと。フィッティングを考えるヒントをお届けします。"
      />
      <section className="wrap section" aria-labelledby="column-list-title">
        <h2 id="column-list-title">フィッティングの専門コラム</h2>
        <ColumnCards articles={visibleColumns()} />
      </section>
      <section className="wrap column-blog">
        <span className="eyebrow">MASAKAZU ITO / BLOG</span>
        <h2>レースの話と、日々の活動。</h2>
        <p>
          伊藤雅和のブログでは、ロードレースの解説や活動をお届けしています。
        </p>
        <Link className="button" href="https://masakazu-ito.com/">
          伊藤雅和のブログを読む ↗
        </Link>
      </section>
    </>
  );
}
