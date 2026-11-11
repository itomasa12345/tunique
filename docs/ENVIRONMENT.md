# 環境変数と送信しない検証

| 変数 | 用途・既定値 | 本番の既存設定 |
| --- | --- | --- |
| `SITE_URL` | canonical・OGP・sitemapの基準。未設定時はDEPLOY_PRIME_URL → URL → VERCEL_URL → localhost:3000 | `https://tunique.jp` |
| `SEARCH_INDEXING_ENABLED` | `true` のみindex/follow・robots許可・sitemap出力。未設定はfalse | true |
| `NEXT_PUBLIC_CONTACT_FORM_ENABLED` | `true` のみ受付有効。未設定はfalse。公開されるフラグで秘密情報ではない | true |
| `CONTACT_SUBMISSION_TEST` | `1` で有効モードのモックテストを実行。配信設定ではない | 設定しない |
| `CHROMIUM_PATH` | テスト用ブラウザ。既定 `/usr/bin/chromium` | 設定しない |

Next.jsはビルド時の値を含むため、設定を変えたら必ず再ビルドする。`next start` だけでフラグを切り替えない。
Netlify productionの値は既存のnetlify.tomlで定義されている。Preview/branch deployでは検索フラグを継承・有効化しない。ローカルのnpm buildはNetlifyのproductionコンテキストを自動適用しない。
今回netlify.tomlや実環境の設定値は変更しない。

## 前提

Node.js 24で `npm ci`。Chromiumがなければ `npx playwright install chromium` を実行し、その実行ファイルを `CHROMIUM_PATH` に指定する。
ポート3000の別サーバーを停止する。テストは既存サーバーを再利用せず、直前にビルドしたローカルサーバーを起動する。
以下は本番サービスへ通信しない。受付有効モードのPOSTはPlaywrightで応答を置き換える。

## 受付無効・プレビュー検索対象外

```sh
NEXT_PUBLIC_CONTACT_FORM_ENABLED=false SEARCH_INDEXING_ENABLED=false SITE_URL=http://localhost:3000 npm run build
npm run typecheck
CONTACT_SUBMISSION_TEST=0 SEARCH_INDEXING_ENABLED=false SITE_URL=http://localhost:3000 npm test
```

入力検証後もPOST・ブラウザ保存がないこと、全ページnoindex、robots禁止、sitemapにURLがないことを確認する。

## 受付有効・本番相当の検索メタ情報（ローカルのみ）

```sh
NEXT_PUBLIC_CONTACT_FORM_ENABLED=true SEARCH_INDEXING_ENABLED=true SITE_URL=https://tunique.jp npm run build
npm run typecheck
CONTACT_SUBMISSION_TEST=1 SEARCH_INDEXING_ENABLED=true SITE_URL=https://tunique.jp npm test
```

全ページのindex/follow・canonical・OGP、6ページのsitemap、ロード・競輪の相談種別、POST本文、成功待ち・二重送信防止・失敗時の入力保持をモックで確認する。
テストサーバーは検索フラグfalse・URL localhostで起動し、ビルド時と実行時の値が違っても問い合わせページだけ検索設定が変わらないことも検証する。
このローカルビルドは本番の検索公開範囲を変更しない。終了後は必要に応じて無効モードで再ビルドする。

Gmailの実受信・返信先と、ライフプラン相談の所属代理店確認は人による確認事項。テスト成功はこれらの完了を意味しない。
