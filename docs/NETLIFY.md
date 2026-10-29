# Netlifyでの確認用デプロイ

## 接続するソース

- リポジトリ：`itomasa12345/tunique`
- ブランチ：`site/tunique-preview`
- Base directory：空欄（リポジトリ直下）
- Build command：`npm run build`
- Publish directory：`.next`
- Functions directory：既定の `netlify/functions` のまま。Next.js用関数はNetlifyのNext.js対応機能で生成されます。
- Node.js：`netlify.toml` と `.nvmrc` で24を指定。
- 必須の追加環境変数・秘密情報：現段階ではなし。

Next.js対応機能が自動適用される想定です。Netlify上での初回ビルド・画像最適化・動的ルートの動作は、実際のデプロイ結果で確認します。

## URLと公開状態

Netlifyの `DEPLOY_PRIME_URL`、`URL` を読み、OGPがlocalhostを参照しない構成にしています。正規の `SITE_URL` を明示した場合は、それを優先します。

初回の「Deploy」はNetlifyのURLへサイトをアップロードする操作です。ブランチ名にpreviewと付いていても、非公開になるわけではありません。
このブランチを最初の配信元に選ぶと、Netlify上ではそのサイトのProduction branchとして扱われる可能性があります。TUNIQUEとしての正式公開・独自ドメイン接続とは区別します。
検索掲載停止は維持しています。フォームは、検出・通知設定と保存方針の確認後、本人による受信テストのために有効化しています。詳細は `CONTACT-SETUP.md` を参照してください。検索掲載停止は閲覧制限の代わりではありません。

確認用URLへの外部配置に同意してからDeployを行います。正式ドメイン接続や正式公開は別途確認します。

## デプロイ後に確認すること

1. ビルドログでNext.js対応機能が適用され、ビルドが完了したこと。
2. 全ページ、PC・スマートフォンの画像、プロフィール写真、メニューの動作。
3. `/contact?type=travel` などで相談種別が引き継がれること。
4. OGP画像の参照先がNetlifyのURLになっていること。
5. フォームが「準備中」で送信・保存されないこと。
6. 無料プランであることと、利用枠・超過時の停止や課金の設定。自動の有料切り替えや追加購入は行わない。

このファイルの追加時点では、Netlifyでのデプロイは未実施です。
