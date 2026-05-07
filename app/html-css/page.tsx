import Link from "next/link";
import { Code2, Grid3X3, LayoutGrid, Smartphone, Variable, FileCode2 } from "lucide-react";
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
    href: "/html-css/semantic",
    icon: FileCode2,
    iconColor: "#fb923c",
    title: "セマンティックHTML",
    description: "意味を持つタグ（header・main・section・article・nav・aside）の使い分け",
    status: "完成",
  },
  {
    href: "/html-css/flexbox",
    icon: LayoutGrid,
    iconColor: "#fb923c",
    title: "Flexbox",
    description: "横並び・中央揃え・折り返しの制御、justify-content・align-items",
    status: "完成",
  },
  {
    href: "/html-css/grid",
    icon: Grid3X3,
    iconColor: "#fb923c",
    title: "Grid",
    description: "2次元レイアウト、grid-template-columns・grid-area",
    status: "完成",
  },
  {
    href: "/html-css/responsive",
    icon: Smartphone,
    iconColor: "#fb923c",
    title: "レスポンシブデザイン",
    description: "メディアクエリとモバイルファーストの考え方",
    status: "完成",
  },
  {
    href: "/html-css/css-variables",
    icon: Variable,
    iconColor: "#fb923c",
    title: "CSS変数",
    description: "--color-primary のような再利用可能な変数の定義と活用",
    status: "完成",
  },
];

export default function HtmlCssHubPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/" className="text-xs text-gray-500 hover:text-white transition-colors">
          {"← ホームに戻る"}
        </Link>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <Code2 size={28} style={{ color: "#f97316" }} />
        <h1 className="text-2xl font-bold text-white">HTML / CSS基礎</h1>
      </div>
      <p className="text-sm text-gray-400 mb-8">
        Webページの骨格（HTML）とデザイン（CSS）の基礎。Flexbox・Grid・レスポンシブ・CSS変数をマスターして、思い通りのレイアウトを作れるようになる。
      </p>

      <div className="space-y-2">
        {pages.map((page) => {
          const Icon = page.icon;
          return (
            <Link
              key={page.href}
              href={page.href}
              className="group flex items-center gap-4 rounded-xl border p-4 transition-colors hover:border-orange-500/40"
              style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
            >
              <Icon size={20} style={{ color: page.iconColor }} className="flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-semibold text-white group-hover:text-orange-400 transition-colors">
                    {page.title}
                  </p>
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor:
                        page.status === "完成"
                          ? "rgba(249,115,22,0.1)"
                          : "rgba(75,85,99,0.3)",
                      color: page.status === "完成" ? "#fb923c" : "#9ca3af",
                    }}
                  >
                    {page.status}
                  </span>
                </div>
                <p className="text-xs text-gray-400">{page.description}</p>
              </div>
              <span className="text-gray-600 group-hover:text-gray-400 transition-colors text-sm">{"→"}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
