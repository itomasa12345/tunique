# TUNIQUE

TUNIQUE公式サイトのローカル実装。Next.js App Router / TypeScript / Tailwind CSS。
白黒とウォームグレーの配色、大きなタイポグラフィ、オリジナルのホイール図案で構成しています。

## 起動

Node.js 24 / npmを使用します。既存のチェックアウトで実行してください。

```sh
cd /workspace/tunique
npm ci
npm run dev
```

ローカルのポート3000で開きます。本番相当の確認は以下です。

```sh
npm run build
npm run typecheck
npm run start
```

クラウド環境では、ビルド・起動・ブラウザ実行にローカル通信の実行権限が必要です。
Turbopackのローカルポート生成がこの環境の制約に当たるため、開発・ビルドにはWebpackを指定しています。

## ページ

| URL              | 内容                                      |
| ---------------- | ----------------------------------------- |
| `/`              | ブランド・2事業への導線・代表紹介         |
| `/bike-fitting`  | 方針、調整項目、対象、実施方法、流れ、FAQ |
| `/life-planning` | 方針、悩み、相談テーマ、流れ、FAQ         |
| `/about`         | 伊藤雅和のプロフィール・考え方            |
| `/contact`       | 3種別を選べる問い合わせフォーム           |
| `/privacy`       | 個人情報の取り扱い・保存期間              |

`/contact?type=bike`、`?type=travel`、`?type=life`で問い合わせ種別を引き継ぎます。

## 現在の状態

- Netlify Formsへの送信処理を実装し、接続済みNetlifyのproductionコンテキストで送信テストのため有効にしています。フォーム検出・通知設定・保存期間は確認済みですが、実メール到達の確認は残っています。ブラウザへの永続保存は行いません。
- ローカル環境は既定で入力確認のみです。Netlifyのproductionコンテキストでは送信ボタンを表示します。
- 正式な料金、金融商品・保険代理店の広告、未確認の口コミや実績、未確定日程は掲載していません。
- 2026-10-29に運営者が正式公開を承認しました。Netlify productionのみ検索掲載を許可し、各ページのcanonicalとサイトマップを出力します。その他の環境は既定でnoindexです。
- 正式URLは `https://jolly-cendol-022978.netlify.app` です。productionの `SITE_URL` に設定済みです。
- 正式ロゴは支給された透過PNGを `public/brand/tunique-logo.png` に原本のまま配置しています。白色のため黒背景で表示します。
- HOME上部は提供された実際のフィッティング写真を使用しています。ライフプランにはAI生成した資料と植物の静物イメージを使用し、イメージ画像と明示しています。ユーザー提供のロードバイク調整写真と競輪写真を、HOMEのサービス紹介とバイクフィッティングページに反映しています。プロフィールには、ご本人の確認・使用許可を得た作業写真を使用しています。素材の用途は `docs/PHOTO-ASSETS.md` を参照してください。

## 編集箇所

| 変更するもの                             | ファイル                          |
| ---------------------------------------- | --------------------------------- |
| 写真のパス・寸法・alt・キャプション      | `lib/photos.ts`                   |
| FAQ、ナビゲーション、SEO設定ヘルパー     | `lib/site.ts`                     |
| トップのコピーと各セクション             | `app/page.tsx`                    |
| 各ページの本文・SEOタイトルと説明        | `app/*/page.tsx`                  |
| 配色、文字サイズ、余白、レスポンシブ     | `app/globals.css`                 |
| ヘッダー・モバイルメニュー               | `components/header.tsx`           |
| ホイール図案、共通見出し、CTA、FAQ、流れ | `components/ui.tsx`               |
| フォーム項目と入力検証                   | `components/contact-form.tsx`     |
| フッター、共通メタデータ、検索制御       | `app/layout.tsx`、`app/robots.ts` |
| SNSシェア画像                            | `app/opengraph-image.tsx`         |

実写素材を追加する場合は `public/` に置き、`next/image` で寸法・altを指定し、実際の内容に合わせて仮素材表記を更新します。
新規事業はナビゲーションと独立ルートを追加できる構造です。セカンドキャリア支援は現在掲載していません。

## ブラウザテスト

```sh
npm test
```

Playwrightが本番サーバーを起動して、PC（1440px）・スマートフォン（390px）各8件を実行します。事前の本番ビルドが必要です。
この環境にある `/usr/bin/chromium` を使用します。他の環境では `CHROMIUM_PATH` に実行ファイルのパスを指定してください。
検証対象はページ応答、横スクロール、JSエラー、メニュー、サービス別問い合わせ導線、FAQ、フォーム検証、未送信・未保存、OGP、404です。

表示確認用のスクリーンショットは `docs/screenshots/` に保存しています。

## Studioで制作する場合

この実装はNext.jsのサイトです。Studioの編集可能なプロジェクトへ自動変換・アップロードはしていません。
Studioでは [制作ガイド](docs/STUDIO.md) をもとに、ボックス・テキスト・画像を組み直してください。公開前は [確認事項](docs/RELEASE-CHECKLIST.md) を確認します。

## Vercelプレビュー

設定と接続手順は [Vercelガイド](docs/VERCEL.md) を参照してください。
Vercelは使用していません。Netlifyで配信し、2026-10-29に管理者から正式公開の承認を受けました。

## Netlifyでの確認用配置

現在の案内先はNetlifyの無料プランです。設定は [Netlifyガイド](docs/NETLIFY.md) を参照してください。
`netlify.toml` でNode.js 24、ビルド `npm run build`、公開ディレクトリ `.next` を指定しています。配信元は `site/tunique-preview` ブランチです。

## ロードバイクと競輪の説明

`/bike-fitting#road` と `/bike-fitting#keirin` に、方針・調整内容・流れを分けています。
共通のデータは `lib/fitting.ts`、受領資料との対応は `docs/FITTING-CONTENT-REVIEW.md` で確認できます。

## 問い合わせ受付の準備

Netlify FormsからGmailへ通知する準備は [受付設定ガイド](docs/CONTACT-SETUP.md) に記載しています。通知先は公開ソースへ含めません。
`NEXT_PUBLIC_CONTACT_FORM_ENABLED` はローカルではfalseが既定です。Netlifyのproductionコンテキストではtrueに設定し、本人による送信・受信テスト待ちです。
