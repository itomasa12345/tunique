import { eightYearsPositionBody } from "@/content/columns/eight-years-position";
import { whyPositionMatteredBody } from "@/content/columns/why-position-mattered";
import { tuniqueBikeFittingBody } from "@/content/columns/tunique-bike-fitting";
import { roadPrinciples, keirinPrinciples } from "@/lib/fitting";

export type ColumnImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Column = {
  slug: string;
  title: string;
  description: string;
  category: "ロードバイク" | "競輪" | "ロードレース" | "フィッティング";
  status: "draft" | "published";
  author?: { name: string; url: string };
  publishedAt?: string;
  updatedAt?: string;
  image: ColumnImage;
  bodyImages?: { afterIndex: number; image: ColumnImage; caption?: string }[];
  preserveImageFrame?: boolean;
  imageCredit?: string;
  body?: string[];
  bodyHeadingIndices?: number[];
  bodyLinks?: { index: number; href: string }[];
  teaserIndex?: number;
  draftNote?: string;
  sections: { title: string; paragraphs: string[] }[];
  relatedService: { href: string; label: string };
  contactType: "road" | "keirin" | "bike";
};

// Owner manuscripts and unapproved editorial drafts. Publishing is explicit.
export const columns: Column[] = [
  {
    slug: "eight-years-road-bike-position",
    title: "8年間、毎日ロードバイクのポジションを考え続けた",
    description:
      "怪我から引退まで、毎日ポジションを探し続けた8年間。その経験がTUNIQUEのフィッティングの土台になるまでを、伊藤雅和が綴ります。",
    category: "ロードバイク",
    status: "draft",
    author: { name: "伊藤雅和", url: "/about" },
    draftNote:
      "下書き・確認用：伊藤雅和さんからいただいた続きの原稿です。本番には未公開です。写真の配置を確認するための下書きです。",
    image: {
      src: "/images/road/rear-position-check.jpg",
      alt: "ロードバイクの後方からサドル周辺を確認する様子",
      width: 853,
      height: 1280,
    },
    preserveImageFrame: true,
    bodyImages: [
      {
        afterIndex: 18,
        image: {
          src: "/images/road/shoe-inspection.jpg",
          alt: "シューズを手に持って確認する様子",
          width: 1280,
          height: 853,
        },
      },
    ],
    body: eightYearsPositionBody,
    bodyHeadingIndices: [10, 18],
    bodyLinks: [
      { index: 32, href: "/columns/why-road-bike-position-mattered" },
    ],
    teaserIndex: 32,
    sections: [],
    relatedService: {
      href: "/bike-fitting#road",
      label: "ロードバイクのフィッティングを知る",
    },
    contactType: "road",
  },
  {
    slug: "why-road-bike-position-mattered",
    title: "なぜ僕はロードバイクのポジションにめちゃくちゃこだわったのか",
    description:
      "怪我をしてから引退までの8年間。伊藤雅和が、仕事として走る責任と、ロードバイクのポジションを追い求め続けた理由を綴ります。",
    category: "ロードバイク",
    status: "published",
    publishedAt: "2026-11-20",
    author: { name: "伊藤雅和", url: "/about" },
    draftNote:
      "下書き・確認用：伊藤雅和さんからいただいた次の記事です。本番には未公開です。",
    image: {
      src: "/images/road/nippo-team-riding.jpg",
      alt: "NIPPOの選手たちがロードバイクで一緒に走る様子",
      width: 1439,
      height: 960,
    },
    imageCredit: "© NIPPO - Vini Fantini - Faizanè",
    preserveImageFrame: true,
    body: whyPositionMatteredBody,
    bodyHeadingIndices: [4, 15],
    teaserIndex: 33,
    sections: [],
    relatedService: {
      href: "/bike-fitting#road",
      label: "ロードバイクのフィッティングを知る",
    },
    contactType: "road",
  },
  {
    slug: "tunique-bike-fitting",
    title: "TUNIQUE BIKE FITTINGについて",
    description:
      "もっと自転車が楽しくなる。伊藤雅和が、自身の競技経験とTUNIQUE BIKE FITTINGで届けたいことを綴ります。",
    category: "フィッティング",
    status: "published",
    publishedAt: "2026-11-20",
    author: { name: "伊藤雅和", url: "/about" },
    draftNote:
      "下書き・確認用：伊藤雅和さんからいただいた原稿です。本番には未公開です。",
    image: {
      src: "/images/road/road-riding.jpg",
      alt: "青いウェアでロードバイクに乗り、屋外を走る伊藤雅和",
      width: 1280,
      height: 853,
    },
    body: tuniqueBikeFittingBody,
    sections: [],
    relatedService: {
      href: "/bike-fitting",
      label: "TUNIQUE BIKE FITTINGを知る",
    },
    contactType: "bike",
  },
  {
    slug: "road-fitting-whole-body",
    title: "ロードバイクのフィッティングでは、何を確認する？",
    description:
      "サドル・ハンドル・クリートと全身の動き。TUNIQUEのロードバイクフィッティングで大切にしている考え方を紹介します。",
    category: "ロードバイク",
    status: "draft",
    image: {
      src: "/images/road/handlebar-detail.jpg",
      alt: "ロードバイクのハンドル周辺を調整する様子",
      width: 1280,
      height: 853,
    },
    sections: roadPrinciples.map((p) => ({
      title: p.title,
      paragraphs: [p.text],
    })),
    relatedService: {
      href: "/bike-fitting#road",
      label: "ロードバイクのフィッティングを知る",
    },
    contactType: "road",
  },
  {
    slug: "keirin-position-standard",
    title: "競輪のフィッティングで、自分の基準位置を持つ。",
    description:
      "打点、左右の脚の入り方、迷ったときに戻れる位置。競輪フィッティングで確認するポイントを紹介します。",
    category: "競輪",
    status: "draft",
    image: {
      src: "/images/keirin/position-blue-bike.jpg",
      alt: "ローラー台上の競輪自転車で乗車姿勢を確認する様子",
      width: 812,
      height: 1280,
    },
    sections: keirinPrinciples.map((p) => ({
      title: p.title,
      paragraphs: [p.text],
    })),
    relatedService: {
      href: "/bike-fitting#keirin",
      label: "競輪のフィッティングを知る",
    },
    contactType: "keirin",
  },
];

export function isPublishedColumn(column: Column): boolean {
  return (
    column.status === "published" && !!column.author && !!column.publishedAt
  );
}

// Explicit local/preview opt-in. Never expose drafts on hosting production.
export function canShowColumnDrafts(
  env: Record<string, string | undefined> = process.env,
) {
  return (
    env.SHOW_COLUMN_DRAFTS === "true" &&
    env.CONTEXT !== "production" &&
    env.VERCEL_ENV !== "production"
  );
}
export const showColumnDrafts = canShowColumnDrafts();

export function visibleColumns() {
  return columns
    .filter((column) => isPublishedColumn(column) || showColumnDrafts)
    .sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || ""));
}
