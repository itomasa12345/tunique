# Netlifyの配信・更新手順

## 現在の構成

- 正式URL：`https://tunique.jp`
- リポジトリ：`itomasa12345/tunique`
- Production branch：`site/tunique-preview`（名前にpreviewを含むが本番の配信元）
- Base directory：空欄、Build command：`npm run build`、Publish directory：`.next`
- Node.js：24。Next.js対応機能を利用する。
- 本番の `SITE_URL=https://tunique.jp`、受付有効・検索掲載許可は既存の `netlify.toml` に設定済み。
- Google検索掲載とサイトマップ成功は運営者から確認済み。

## レビュー時

修正は別のレビュー用ブランチへ保存し、差分を確認する。本番配信ブランチへのpush・マージは自動デプロイにつながるため、公開指示を得るまでは実施しない。
本番デプロイ、ドメイン接続、検索公開範囲の変更、実フォーム送信は今回のレビューに含めない。

Previewの検索設定は無効のままにする。環境変数は [ENVIRONMENT.md](ENVIRONMENT.md) を参照。
`SITE_URL` 未設定時は `DEPLOY_PRIME_URL`、`URL`、`VERCEL_URL` の順でプレビュー自身のURLを利用する。プレビューは閲覧制限とは別にnoindexであることを確認する。

## 別途公開が承認された後の確認

1. ビルド成功とNext.js対応機能、各ページ・画像・メニューの動作。
2. `/contact?type=road` と `?type=keirin` の選択、および送信前の予約未確定表示。
3. 本番のcanonical・OGP・sitemapが `https://tunique.jp`、robotsが既存の許可設定どおりであること。
4. プレビューのnoindex/nofollow、robotsのDisallow、空のsitemap。
5. 受付状態が意図した設定であること。実受信は人による別途確認とする。
6. Netlifyの利用枠・課金設定は管理画面で確認する。
