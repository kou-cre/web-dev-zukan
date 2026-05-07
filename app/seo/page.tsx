import Link from "next/link";
import { Tag, Code2, FileSearch, Accessibility, Gauge } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const pages: {
  href: string;
  icon: LucideIcon;
  iconColor: string;
  title: string;
  description: string;
  status: string;
}[] = [
  {
    href: "/seo/meta-ogp",
    icon: Tag,
    iconColor: "#a3e635",
    title: "メタタグと OGP",
    description: "title・description・OG画像の設定・SNSシェア時のカード表示の仕組み",
    status: "完成",
  },
  {
    href: "/seo/metadata-api",
    icon: Code2,
    iconColor: "#bef264",
    title: "Next.js メタデータAPI",
    description: "generateMetadata・静的/動的メタデータ・layout.tsx での設定方法",
    status: "完成",
  },
  {
    href: "/seo/sitemap",
    icon: FileSearch,
    iconColor: "#a3e635",
    title: "サイトマップ・robots.txt",
    description: "クローラーへの情報提供・next-sitemap・robots.txt の書き方",
    status: "完成",
  },
  {
    href: "/seo/wai-aria",
    icon: Accessibility,
    iconColor: "#bef264",
    title: "WAI-ARIA",
    description: "role・aria-label・aria-describedby の使い方・キーボード操作対応",
    status: "完成",
  },
  {
    href: "/seo/lighthouse",
    icon: Gauge,
    iconColor: "#a3e635",
    title: "Lighthouse スコア",
    description: "パフォーマンス・アクセシビリティ・SEO を数値で確認・改善の優先順位",
    status: "完成",
  },
];

export default function SeoHubPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← ホームに戻る
        </Link>
      </div>
      <h1 className="text-2xl font-bold text-white mb-2">SEO・アクセシビリティ</h1>
      <p className="text-sm text-gray-400 mb-8">
        検索エンジンと人間の両方に伝わるサイトを作る。OGP・メタデータ・ARIA・Lighthouse で品質を数値化して改善する。
      </p>
      <div className="space-y-2">
        {pages.map((page) => {
          const Icon = page.icon;
          return (
            <Link
              key={page.href}
              href={page.href}
              className="group flex items-center gap-4 rounded-xl border p-4 transition-colors hover:border-lime-500/40"
              style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
            >
              <Icon size={20} style={{ color: page.iconColor }} className="flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-semibold text-white group-hover:text-lime-400 transition-colors">
                    {page.title}
                  </p>
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor:
                        page.status === "完成"
                          ? "rgba(16,185,129,0.1)"
                          : "rgba(75,85,99,0.3)",
                      color: page.status === "完成" ? "#34d399" : "#9ca3af",
                    }}
                  >
                    {page.status}
                  </span>
                </div>
                <p className="text-xs text-gray-400">{page.description}</p>
              </div>
              <span className="text-gray-600 group-hover:text-gray-400 transition-colors text-sm">→</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
