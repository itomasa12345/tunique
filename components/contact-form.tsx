"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { contactFormName } from "@/lib/contact";
const options = [
  ["bike", "バイクフィッティングの予約・相談"],
  ["travel", "全国出張フィッティングの依頼"],
  ["life", "ライフプラン相談"],
];
export function ContactForm({
  initialType,
  enabled = false,
}: {
  initialType: string;
  enabled?: boolean;
}) {
  const [type, setType] = useState(
    options.some((x) => x[0] === initialType) ? initialType : "bike",
  );
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const requestPending = useRef(false);
  useEffect(() => setHydrated(true), []);
  async function validate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (requestPending.current || sent) return;
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
    if (Object.keys(next).length) {
      setStatus("入力内容を確認してください。");
      return;
    }
    if (!enabled) {
      setStatus(
        "入力項目を確認しました。受付設定の確認中のため、送信・保存は行っていません。",
      );
      return;
    }
    const body = new URLSearchParams({
      "form-name": contactFormName,
      "bot-field": String(data.get("bot-field") || ""),
      name: String(data.get("name") || "").trim(),
      email,
      type: options.find(([value]) => value === type)![1],
      region: String(data.get("region") || "").trim(),
      message: String(data.get("message") || "").trim(),
      consent: "プライバシーポリシーに同意しました",
    });
    requestPending.current = true;
    setSending(true);
    setStatus("送信しています…");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("Submission failed");
      setSent(true);
      setStatus(
        "お問い合わせを受け付けました。ご入力のメールアドレスへの返信をお待ちください。",
      );
    } catch {
      setStatus(
        "送信結果を確認できませんでした。入力内容はこの画面に残っています。時間をおいてから再度お試しください。",
      );
    } finally {
      clearTimeout(timeout);
      requestPending.current = false;
      setSending(false);
    }
  }
  const error = (key: string) =>
    errors[key] ? (
      <span className="field-error" id={`${key}-error`}>
        {errors[key]}
      </span>
    ) : null;
  return (
    <form
      className="contact-form"
      name={enabled ? contactFormName : undefined}
      method="POST"
      action={enabled ? "/__forms.html" : undefined}
      onSubmit={validate}
      noValidate
      aria-busy={sending}
    >
      {enabled && (
        <input type="hidden" name="form-name" value={contactFormName} />
      )}
      <div className="form-honeypot" aria-hidden="true">
        <label htmlFor="bot-field">
          入力しないでください
          <input
            id="bot-field"
            name="bot-field"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>
      <noscript>
        <p>このフォームの入力確認・送信にはJavaScriptを有効にしてください。</p>
      </noscript>
      <div className="form-status">
        <span className="status-dot" />
        <div>
          <strong>
            {enabled
              ? "お問い合わせ内容をお送りください"
              : "お問い合わせ受付は準備中です"}
          </strong>
          <p>
            {enabled
              ? "内容はNetlify Formsに保存され、TUNIQUEの受付メールに通知されます。返信はメールでご案内します。"
              : "受付設定の確認中のため、このフォームからの送信・保存はできません。入力項目の確認のみお試しいただけます。"}
          </p>
        </div>
      </div>
      <fieldset disabled={sending || sent}>
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
            disabled={sending || sent}
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
            disabled={sending || sent}
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
          disabled={sending || sent}
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
          disabled={sending || sent}
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
          name="consent"
          disabled={sending || sent}
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          required
          aria-describedby={errors.consent ? "consent-error" : undefined}
        />
        <span>
          <Link href="/privacy">プライバシーポリシー</Link>
          を確認し、同意します。
        </span>
      </label>
      {error("consent")}
      <button
        type="submit"
        className="button validate-button"
        disabled={!hydrated || sending || sent}
      >
        {sending
          ? "送信中…"
          : sent
            ? "送信済み"
            : enabled
              ? "お問い合わせを送信する"
              : "入力項目を確認する（送信されません）"}
        <span aria-hidden="true">↗</span>
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
