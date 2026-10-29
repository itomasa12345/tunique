import { CTA } from "@/components/ui";
export default function NotFound() {
  return (
    <section className="wrap section not-found">
      <span className="eyebrow">404 / NOT FOUND</span>
      <h1>ページが見つかりません。</h1>
      <p>お探しのページは移動したか、存在しない可能性があります。</p>
      <CTA href="/">ホームに戻る</CTA>
    </section>
  );
}
