# Netlify Forms と Gmail の受付設定

## 現在の状態

送信先はユーザーから受領済み。専用Gmailに変更する旨の指示を反映し、旧アドレスは使わない。
具体的な通知先は公開ソースに保存せず、作業環境のGit対象外メモ `release/contact-notification-notes.md` に保持。

- `public/__forms.html` にNext.js Runtime向けの静的フォーム定義を配置。
- フォーム名は `tunique-contact`。
- クライアントは `POST /__forms.html` にURLエンコードされた内容を送る実装。
- 受付前は `NEXT_PUBLIC_CONTACT_FORM_ENABLED` 未設定またはfalseのまま。入力確認のみでPOSTしない。
- 通知先GmailはNetlifyの管理画面で設定する。SMTPパスワードやGmailアプリパスワードは不要。
- Netlifyが受け付けたことと、Gmailに通知が届いたことは別々に確認する。

## 管理画面で確認する順序

1. 対象プロジェクト `jolly-cendol-022978` の **Forms** を開く。
2. フォーム検出が無効なら **Enable form detection** を有効にする。ラベルが異なる場合は画面を確認する。
3. 検出を有効にした後に、必要に応じて再デプロイする。
4. `tunique-contact` が認識されていること、取得項目がname/email/type/region/message/consentであることを確認する。
5. フォーム通知設定でEmail notificationを追加し、ユーザーが新しく指定した専用Gmailを登録する。画面ラベルは実際の管理画面で確認する。
6. Freeプランのフォーム利用条件・残り利用枠・超過時の挙動を確認する。有料契約や追加購入は自動で行わない。
7. 個人情報の保存期間、Netlify/Gmailでの削除方法、本人からの開示・削除依頼の窓口を確定し、プライバシーポリシーを正式化する。
8. 管理者の確認後にのみ `NEXT_PUBLIC_CONTACT_FORM_ENABLED=true` を設定して再デプロイし、実データを含まないテスト問い合わせを本人が送信する。
9. Netlifyでの受信、Gmailの受信（迷惑メールも確認）、返信先が問い合わせ者であることを本人が確認する。不具合があればfalseへ戻す。

## 検証と制限

ローカルのPOST成功・エラーはブラウザでモックして検証できるが、Netlifyの検出・保存・Gmailへの通知成功の代わりにはならない。
受付はバックエンド設定・個人情報の取り扱いが確認できるまで有効化しない。
送信中は再送できず、失敗時は入力を残して再試行できる。成功後は同じ画面から重複送信しない。
タイムアウト時は実際の処理結果が不明な場合があるため、成功とは表示しない。
フォームの入力内容をconsole、localStorage、sessionStorageへ保存しない。公開ソースに通知先のメールアドレスは含めない。

## ローカルの送信処理テスト

以下は外部送信をモックする開発者向けの検証です。Netlifyの受付を有効にする操作ではありません。

```sh
NEXT_PUBLIC_CONTACT_FORM_ENABLED=true npm run build
CONTACT_SUBMISSION_TEST=1 npx playwright test tests/contact-submission.spec.ts
NEXT_PUBLIC_CONTACT_FORM_ENABLED=false npm run build
npx playwright test tests/site.spec.ts tests/site-url.spec.ts tests/fitting.spec.ts
```

検証後は必ず無効モードに戻します。通常の `npm test` では有効モード専用の6件はスキップされます。
