# Netlify Forms と Gmail の受付設定

## 現在の状態

- 専用Gmailへの通知先設定をユーザー提供PDFで確認済み。アドレスは公開ソースへ含めず、Git対象外の `release/contact-notification-notes.md` に保持する。旧アドレスは使用しない。
- Netlifyのビルドログで `Processing form - tunique-contact` と、bot-field/name/email/type/region/message/consentの検出を確認済み。
- 対応完了から1年以内にNetlify FormsとGmailの両方から削除する方針をユーザーが承認。プライバシーポリシーへ反映。
- `netlify.toml` のproductionコンテキストで `NEXT_PUBLIC_CONTACT_FORM_ENABLED=true` を設定し、本人による実送信・Gmail受信テストへ進める。
- 実際のGmail到達・返信先の確認は未完了。モックテストの成功をメール到達の証拠とはしない。
- 独自ドメイン・検索掲載・NetlifyのMake publicは変更しない。

## 実装

`public/__forms.html` がNext.js Runtime向けの静的フォーム定義。クライアントは `POST /__forms.html` へURLエンコードした内容を送る。
通知先はNetlify管理画面だけで設定する。Gmailのパスワード・SMTP・アプリパスワードは不要。
ローカルでは環境変数未設定なら受付無効。成功応答前に受付済みと表示せず、重複送信を防ぎ、失敗時は入力を残す。送信内容をブラウザへ永続保存しない。

## 本人による実送信確認

1. Netlifyで最新コミットのデプロイ成功後に `/contact` を開き、送信ボタンが出ることを確認する。
2. 名前は「送信テスト」、メールは本人が受信できるアドレス、内容は「送信テストです」として1件送る。
3. サイトの受付表示、Netlify Formsの受信、専用Gmailの受信（迷惑メールフォルダも含む）をそれぞれ確認する。
4. Gmailの通知から返信する場合、宛先がフォームの問い合わせ者メールになることを確認する。
5. 不具合時は `netlify.toml` の該当フラグをfalseへ戻して再デプロイする。通知先の追加・再登録を繰り返す前にログと受信データを確認する。

## 運用時の削除

対応完了日を確認できる形で管理し、月1回など定期的に1年の期限を超えないよう見直す。
Netlify Formsの対象送信データと、Gmailの問い合わせ・通知・返信を両方削除する。Gmailではアーカイブではなく削除し、期限内にゴミ箱からも削除する。
これは自動削除を実装したものではなく、運営者が実施する手順。法令上の保存義務があるものはその期間保管する。
Freeプランの利用枠と超過時の挙動は管理画面で継続確認する。有料プラン・追加購入を自動で設定しない。

## ローカルのモックテスト

```sh
NEXT_PUBLIC_CONTACT_FORM_ENABLED=true npm run build
CONTACT_SUBMISSION_TEST=1 npx playwright test tests/contact-submission.spec.ts
NEXT_PUBLIC_CONTACT_FORM_ENABLED=false npm run build
npx playwright test tests/site.spec.ts tests/site-url.spec.ts tests/fitting.spec.ts
```

外部への実送信・メール通知は行わない。通常の `npm test` では有効モード専用6件はスキップされる。
