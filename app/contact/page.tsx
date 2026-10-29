import { PageHero } from "@/components/ui";
import { ContactForm } from "@/components/contact-form";
import { metadata } from "@/lib/site";
export const generateMetadata = () =>
  metadata(
    "お問い合わせ",
    "バイクフィッティングの予約・相談、全国出張の依頼、ライフプラン相談の窓口。現在、フォームからの送信受付は準備中です。",
  );
export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const params = await searchParams;
  return (
    <>
      <PageHero
        english="CONTACT"
        number="04"
        title={
          <>
            あなたのことを、
            <br />
            <span className="muted">聞かせてください。</span>
          </>
        }
        text="フィッティングのこと、これからの暮らしのこと。ご相談に合わせて個別にご案内します。"
      />
      <section className="wrap contact-content">
        <div className="contact-aside">
          <span className="eyebrow">LET’S TALK.</span>
          <p>
            小さな疑問からでも、
            <br />
            気軽にご相談ください。
          </p>
          <span className="small">
            現在はローカル確認用のサイトです。
            <br />
            正式な受付開始は準備中です。
          </span>
        </div>
        <ContactForm initialType={params.type || "bike"} />
      </section>
    </>
  );
}
