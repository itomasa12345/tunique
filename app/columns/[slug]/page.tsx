import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { metadata } from "@/lib/site";
import { visibleColumns, isPublishedColumn } from "@/lib/columns";
import { resolveSiteUrl } from "@/lib/site-url";
import { searchIndexingEnabled } from "@/lib/publication";
import { ContactBand } from "@/components/ui";
export const dynamicParams = false;
export function generateStaticParams() {
  return visibleColumns().map(({ slug }) => ({ slug }));
}
async function getColumn(params: Promise<{ slug: string }>) {
  const { slug } = await params;
  const article = visibleColumns().find((a) => a.slug === slug);
  if (!article) notFound();
  return article;
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const article = await getColumn(params);
  const base = metadata(
    article.title,
    article.description,
    `/columns/${article.slug}`,
  );
  return {
    ...base,
    robots: {
      index: searchIndexingEnabled && isPublishedColumn(article),
      follow: searchIndexingEnabled && isPublishedColumn(article),
    },
    openGraph: {
      ...base.openGraph,
      type: "article",
      images: [
        {
          url: article.image.src,
          width: article.image.width,
          height: article.image.height,
          alt: article.image.alt,
        },
      ],
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
    },
    twitter: { ...base.twitter, images: [article.image.src] },
  };
}
export default async function ColumnPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const article = await getColumn(params);
  const published = isPublishedColumn(article);
  const origin = resolveSiteUrl();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: new URL(article.image.src, origin).href,
    mainEntityOfPage: new URL(`/columns/${article.slug}`, origin).href,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      "@type": "Person",
      name: article.author?.name,
      url: new URL(article.author?.url || "/about", origin).href,
    },
    publisher: { "@type": "Organization", name: "TUNIQUE", url: origin.origin },
  };
  return (
    <>
      {published && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <article className="wrap column-article">
        <nav aria-label="パンくずリスト" className="small">
          <Link href="/">HOME</Link> / <Link href="/columns">コラム</Link> /{" "}
          {article.category}
        </nav>
        <header>
          <p className="eyebrow">{article.category} / COLUMN</p>
          <h1>{article.title}</h1>
          {published ? (
            <p className="small">
              執筆：
              <Link href={article.author!.url}>{article.author!.name}</Link> ·
              公開{" "}
              <time dateTime={article.publishedAt}>{article.publishedAt}</time>
              {article.updatedAt && (
                <>
                  {" "}
                  · 更新{" "}
                  <time dateTime={article.updatedAt}>{article.updatedAt}</time>
                </>
              )}
            </p>
          ) : (
            <p className="column-draft" role="note">
              下書き・確認用：既存のサービス説明をもとにした記事案です。本人確認前のため未公開です。
            </p>
          )}
          <p className="lead">{article.description}</p>
        </header>
        <div className="column-hero-image">
          <Image
            {...article.image}
            sizes="(max-width: 760px) 100vw, 800px"
            priority
          />
        </div>
        <nav aria-label="この記事の目次" className="column-toc">
          <h2>この記事の内容</h2>
          <ol>
            {article.sections.map((s, i) => (
              <li key={s.title}>
                <a href={`#section-${i + 1}`}>{s.title}</a>
              </li>
            ))}
          </ol>
        </nav>
        {article.sections.map((s, i) => (
          <section id={`section-${i + 1}`} key={s.title}>
            <h2>{s.title}</h2>
            {s.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </section>
        ))}
        <aside className="column-related">
          <h2>フィッティングについて、もう少し。</h2>
          <Link href={article.relatedService.href}>
            {article.relatedService.label} ↗
          </Link>
        </aside>
        <Link href="/columns">← コラム一覧へ戻る</Link>
      </article>
      <ContactBand
        href={`/contact?type=${article.contactType}`}
        label="フィッティングを相談する"
      />
    </>
  );
}
