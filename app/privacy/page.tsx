import Link from "next/link";
import { metadata } from "@/lib/site";
export const generateMetadata = () =>
  metadata(
    "プライバシーポリシー",
    "TUNIQUEのお問い合わせに関する個人情報の利用目的、Netlify FormsとGmailでの取り扱い、保存期間と削除について。",
  );
export default function Privacy() {
  return (
    <section className="wrap section legal">
      <span className="eyebrow">PRIVACY POLICY</span>
      <h1>プライバシーポリシー</h1>
      <p>
        TUNIQUEは、お問い合わせに際して取得する個人情報を、以下の方針で取り扱います。
      </p>
      <h2>運営・管理</h2>
      <p>TUNIQUE / 伊藤雅和</p>
      <h2>取得する情報と利用目的</h2>
      <p>
        お名前、メールアドレス、お問い合わせ種別、ご希望の地域、お問い合わせ内容、同意の記録を、ご相談への回答、日程調整、およびこれらに必要なご連絡のために取得します。口座番号や健康情報などの機微な情報は、フォームへ入力しないでください。
      </p>
      <h2>受付・通知サービス</h2>
      <p>
        お問い合わせ内容はNetlify
        Formsで受け付け・保存し、運営者が管理する専用Gmailへ通知します。返信はメールでご案内します。サービスの提供に伴い、情報が国外で処理・保存される場合があります。各サービスの取り扱いは、
        <a
          href="https://www.netlify.com/privacy/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Netlifyのプライバシーポリシー
        </a>
        および
        <a
          href="https://policies.google.com/privacy?hl=ja"
          target="_blank"
          rel="noopener noreferrer"
        >
          Googleのプライバシーポリシー
        </a>
        もご参照ください。
      </p>
      <h2>保存期間と削除</h2>
      <p>
        お問い合わせへの対応完了から1年以内に、Netlify
        FormsとGmailの両方からお問い合わせ内容を削除します。削除は運営者が行います。法令等により保存義務がある情報は、定められた期間保管します。
      </p>
      <h2>管理・第三者提供</h2>
      <p>
        取得する情報は、問い合わせ対応に必要な範囲にアクセスを限定して管理します。上記サービスへの処理の委託や法令等に基づく場合を除き、ご本人の同意なく第三者へ提供しません。
      </p>
      <h2>開示・訂正・削除等のお問い合わせ</h2>
      <p>
        <Link href="/contact">お問い合わせフォーム</Link>
        で、ご相談に関連するサービスの種別を選び、内容欄に「個人情報の開示・訂正・削除」等のご希望を記載してください。ご本人であることを確認したうえで、法令に従い対応します。
      </p>
      <h2>アクセス解析等</h2>
      <p>
        現在、アクセス解析や広告の外部ツールは導入していません。導入する際は、利用サービスと必要な取り扱いを確認し、本方針を更新します。
      </p>
      <p className="small privacy-date">制定日：2026年10月29日</p>
    </section>
  );
}
