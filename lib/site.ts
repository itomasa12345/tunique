import type { Metadata } from "next";
export const site = {
  name: "TUNIQUE",
  tagline: "TUNE YOUR UNIQUE",
  representative: "伊藤 雅和",
  englishName: "Masakazu Ito",
};
export const navigation = [
  { href: "/bike-fitting", label: "BIKE FITTING" },
  { href: "/life-planning", label: "LIFE PLANNING" },
  { href: "/about", label: "ABOUT" },
];
export function metadata(title: string, description: string): Metadata {
  return {
    title,
    description,
    openGraph: {
      title: `${title} | TUNIQUE`,
      description,
      locale: "ja_JP",
      type: "website",
      siteName: "TUNIQUE",
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}
export const bikeFaq = [
  [
    "競技経験がなくても相談できますか？",
    "はい。競技者だけでなく、日々のサイクリングを楽しむ方も対象です。現在の乗り方や、気になっていることをお聞かせください。",
  ],
  [
    "オンラインではどのように進めますか？",
    "現在のポジションや身体の動きを確認しながら進めます。必要な撮影方法や準備物は、ご相談内容に合わせて事前にご案内します。",
  ],
  [
    "全国への出張は可能ですか？",
    "全国出張のご相談を受け付けています。希望地域、人数、会場の有無をお知らせください。日程や実施条件は個別に調整します。",
  ],
  [
    "料金や必要な時間を知りたいです。",
    "ご希望の方法や相談内容に応じて、個別にご案内します。まずはお問い合わせください。",
  ],
  [
    "痛みがある場合も受けられますか？",
    "フィッティングは医療行為ではなく、痛みや不調の改善を保証するものではありません。痛みが続く場合は、まず医療機関にご相談ください。",
  ],
];
export const lifeFaq = [
  [
    "相談する内容がまとまっていなくても大丈夫ですか？",
    "はい。「何から考えればいいかわからない」という段階から、気になることを一緒に整理します。",
  ],
  [
    "どんな資料を準備すればよいですか？",
    "最初からすべてそろえる必要はありません。ご相談のテーマを伺い、必要な情報を事前にお伝えします。",
  ],
  [
    "一度作った計画は見直せますか？",
    "ライフプランは、暮らしの変化に合わせて見直すものです。家族構成、働き方、目標などの変化を踏まえて考えます。",
  ],
  [
    "相談方法や料金について教えてください。",
    "相談方法や条件は個別にご案内します。お問い合わせの際に、ご希望をお聞かせください。",
  ],
];
