import { roadPrinciples, keirinPrinciples } from "@/lib/fitting";

export type Column = {
  slug: string;
  title: string;
  description: string;
  category: "ロードバイク" | "競輪" | "ロードレース";
  status: "draft" | "published";
  author?: { name: string; url: string };
  publishedAt?: string;
  updatedAt?: string;
  image: { src: string; alt: string; width: number; height: number };
  sections: { title: string; paragraphs: string[] }[];
  relatedService: { href: string; label: string };
  contactType: "road" | "keirin" | "bike";
};

// Editorial drafts based only on existing site copy. Owner review required.
export const columns: Column[] = [
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
