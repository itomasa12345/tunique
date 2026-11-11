import Link from "next/link";
import Image from "next/image";
import { isPublishedColumn, type Column } from "@/lib/columns";
export function ColumnCards({ articles }: { articles: Column[] }) {
  if (!articles.length)
    return (
      <p className="column-empty">
        コラムは準備中です。公開まで、フィッティングの考え方は
        <a href="/bike-fitting">サービスページ</a>をご覧ください。
      </p>
    );
  return (
    <div className="column-grid">
      {articles.map((article) => (
        <article key={article.slug} className="column-card">
          <Link href={`/columns/${article.slug}`}>
            <div className="column-card-image">
              <Image
                {...article.image}
                sizes="(max-width: 760px) 100vw, 50vw"
              />
            </div>
            <div className="column-card-meta">
              <span>{article.category}</span>
              {isPublishedColumn(article) ? (
                <time dateTime={article.publishedAt}>
                  {article.publishedAt}
                </time>
              ) : (
                <span>下書き・確認用</span>
              )}
            </div>
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <span className="text-link">
              記事を読む <span aria-hidden="true">↗</span>
            </span>
          </Link>
        </article>
      ))}
    </div>
  );
}
