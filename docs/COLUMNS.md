# コラムの追加・更新

## 構成

- `/columns`：記事一覧。HOME・共通メニューからリンク。
- `/columns/[slug]`：記事詳細。目次、関連記事サービス、相談導線、著者・公開日・更新日、canonical・OGP・Article構造化データに対応。
- 原稿データ：`lib/columns.ts`。外部CMS・WordPress連携・管理画面は未導入。
- 記事案2本は既存サービス説明（lib/fitting.ts）をもとにした下書き。本人が執筆・承認済みとは扱わない。新たな実績・医学的効果・料金・保険表現は追加していない。

## 原稿を追加する

1. このチャットでタイトル・原稿・使いたい写真を渡す。コード編集する場合は `lib/columns.ts` の配列に追加する。
2. 小文字英数字とハイフンの一意なslug、タイトル、要約、カテゴリー、画像のパス・alt・寸法、見出しと段落、関連サービス・相談種別を設定する。
3. `status: "draft"` で確認する。既存ブログからの自動転載や本文の重複掲載はしない。
4. 本人確認後、実際の著者とプロフィールURL、実際の公開日（YYYY-MM-DD）を設定して `status: "published"` にする。日付・著者は推測しない。更新日は内容の実質的な更新時だけ記載する。
5. 別途公開指示を受けてビルド・反映する。現在はレビュー用ブランチのみで、本番配信元は更新しない。

公開状態でも著者・公開日がない原稿は公開記事として扱わない。公開記事だけ一覧・HOME・sitemapに追加され、Article構造化データを出力する。公開記事がない間は一覧もnoindexとし、sitemapへ入れない。公開後はslugを維持する。

## 下書きの確認

`SHOW_COLUMN_DRAFTS=true` を明示してビルドするとローカル・プレビューのみ下書きを確認できる。既定は非表示・直接アクセス404。Netlify `CONTEXT=production` または `VERCEL_ENV=production` では有効にしない。
下書きには確認用表示とnoindex/nofollowを付け、sitemap・Article構造化データから除外する。noindexは閲覧制限ではないので、機密の原稿はソースにも置かない。
検索許可や受付フラグの既存設定は変更していない。設定を変えたら必ず再ビルドする。

```sh
# 公開記事だけを表示する通常モード（現時点は準備中表示）
SHOW_COLUMN_DRAFTS=false NEXT_PUBLIC_CONTACT_FORM_ENABLED=false SEARCH_INDEXING_ENABLED=true SITE_URL=https://tunique.jp npm run build
npm run typecheck
SHOW_COLUMN_DRAFTS=false CONTACT_SUBMISSION_TEST=0 SEARCH_INDEXING_ENABLED=true SITE_URL=https://tunique.jp npm test

# 下書きの確認用。検索対象外・受付無効
SHOW_COLUMN_DRAFTS=true NEXT_PUBLIC_CONTACT_FORM_ENABLED=false SEARCH_INDEXING_ENABLED=false SITE_URL=http://localhost:3000 npm run build
npm run typecheck
SHOW_COLUMN_DRAFTS=true CONTACT_SUBMISSION_TEST=0 SEARCH_INDEXING_ENABLED=false SITE_URL=http://localhost:3000 npm test
```

SEOやAI引用を保証するものではない。本人の経験・写真・具体的な判断理由を確認しながら原稿を育てる。レース予習や日常記事は伊藤雅和ブログ、サービスに関連する解説はTUNIQUEという役割を基本とする。

前回レビューの実受信確認と所属代理店確認は引き続き人による確認事項。

## この変更の検証・未確認事項

- レビュー用ブランチ：`review/columns-20261111`。前回レビュー `0497188` の修正を引き継ぐ。
- 通常表示と下書き表示の両方をビルドし、型チェックを実行。
- 本番相当（CONTEXT=production、下書きフラグtrue）でも記事案の直接URLが404、一覧に下書きが出ないことを確認。
- PC・スマートフォンの一覧・記事・目次・相談種別・横幅・不明slug・下書きnoindex・sitemap除外・既存ページを検証。
- 公開記事はまだないため、実在の著者名・公開日を使った公開記事の構造化データの実HTML、検索掲載、AI引用は未確認。
- 外部送信、本番デプロイ、配信元ブランチやmainへのマージは実施しない。
- WordPressブログはリンクで案内するのみで、変更・転載はしない。

検証結果：通常・本番相当と下書き確認のビルド・型チェックが成功。各モードのPC/スマートフォンテストは28成功・10スキップ（受付有効モード専用）。原稿公開状態に応じたコラムのテスト8件も本番相当で再実行して成功。画面の目視確認も実施。
下書き用ビルド成果物を本番へ昇格させず、本番コンテキストで再ビルドする。
