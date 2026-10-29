"use client";
import { useState } from "react";
import Link from "next/link";
const options = [
  ["bike", "バイクフィッティングの予約・相談"],
  ["travel", "全国出張フィッティングの依頼"],
  ["life", "ライフプラン相談"],
];
export function ContactForm({ initialType }: { initialType: string }) {
  const [type, setType] = useState(
    options.some((x) => x[0] === initialType) ? initialType : "bike",
  );
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");
  function validate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next: Record<string, string> = {};
    if (!String(data.get("name") || "").trim())
      next.name = "お名前を入力してください。";
    const email = String(data.get("email") || "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "メールアドレスを正しく入力してください。";
    if (type === "travel" && !String(data.get("region") || "").trim())
      next.region = "出張を希望する地域を入力してください。";
    if (!String(data.get("message") || "").trim())
      next.message = "お問い合わせ内容を入力してください。";
    if (!checked) next.consent = "プライバシーポリシーの確認・同意が必要です。";
    setErrors(next);
    setStatus(
      Object.keys(next).length
        ? "入力内容を確認してください。"
        : "入力項目を確認しました。送信先未設定のため、送信・保存は行っていません。",
    );
  }
  const error = (key: string) =>
    errors[key] ? (
      <span className="field-error" id={`${key}-error`}>
        {errors[key]}
      </span>
    ) : null;
  return (
    <form className="contact-form" onSubmit={validate} noValidate>
      <div className="form-status">
        <span className="status-dot" />
        <div>
          <strong>お問い合わせ受付は準備中です</strong>
          <p>
            送信先と個人情報の管理方法が未設定のため、このフォームからの送信・保存はできません。入力項目の確認のみお試しいただけます。
          </p>
        </div>
      </div>
      <fieldset>
        <legend>
          お問い合わせ種別 <span className="required">必須</span>
        </legend>
        <div className="type-options">
          {options.map(([value, label]) => (
            <label key={value} className={type === value ? "selected" : ""}>
              <input
                type="radio"
                name="type"
                value={value}
                checked={type === value}
                onChange={() => {
                  setType(value);
                  setStatus("");
                  setErrors({});
                }}
              />
              {label}
              <span aria-hidden="true">↗</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="name">
            お名前 <span className="required">必須</span>
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            maxLength={100}
            placeholder="例：山田 太郎"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {error("name")}
        </div>
        <div className="field">
          <label htmlFor="email">
            メールアドレス <span className="required">必須</span>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {error("email")}
        </div>
      </div>
      <div className="field">
        <label htmlFor="region">
          希望する地域{" "}
          <span className="required">
            {type === "travel" ? "必須" : "任意"}
          </span>
        </label>
        <input
          id="region"
          name="region"
          required={type === "travel"}
          maxLength={100}
          placeholder="都道府県・市区町村など"
          aria-invalid={!!errors.region}
          aria-describedby={errors.region ? "region-error" : undefined}
        />
        {error("region")}
      </div>
      <div className="field">
        <label htmlFor="message">
          お問い合わせ内容 <span className="required">必須</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          maxLength={5000}
          rows={6}
          placeholder="ご相談内容やご希望をお聞かせください。"
          aria-invalid={!!errors.message}
          aria-describedby={`message-note${errors.message ? " message-error" : ""}`}
        />
        <p className="small" id="message-note">
          口座番号、健康情報などの機微な情報は入力しないでください。
        </p>
        {error("message")}
      </div>
      <label className="consent">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          required
          aria-describedby={errors.consent ? "consent-error" : undefined}
        />
        <span>
          <Link href="/privacy">プライバシーポリシー（公開前確認用）</Link>
          を確認し、同意します。
        </span>
      </label>
      {error("consent")}
      <button type="submit" className="button validate-button">
        入力項目を確認する（送信されません）<span aria-hidden="true">↗</span>
      </button>
      <p
        className={Object.keys(errors).length ? "field-error" : "form-result"}
        role="status"
        aria-live="polite"
      >
        {status}
      </p>
    </form>
  );
}
