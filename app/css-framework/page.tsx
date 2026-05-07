import Link from "next/link";
import { Wand2, LayoutGrid, Smartphone, Package, Moon } from "lucide-react";
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
    href: "/css-framework/tailwind-intro",
    icon: Wand2,
    iconColor: "#22d3ee",
    title: "Tailwind CSS とは",
    description: "ユーティリティクラスの考え方・従来CSSとの違い・なぜTailwindなのか",
    status: "完成",
  },
  {
    href: "/css-framework/common-classes",
    icon: LayoutGrid,
    iconColor: "#22d3ee",
    title: "よく使うクラス",
    description: "flex・grid・padding/margin・color・typography の頻出クラス",
    status: "完成",
  },
  {
    href: "/css-framework/responsive",
    icon: Smartphone,
    iconColor: "#22d3ee",
    title: "レスポンシブ対応",
    description: "sm:・md:・lg: プレフィックスの使い方・モバイルファースト",
    status: "完成",
  },
  {
    href: "/css-framework/shadcn",
    icon: Package,
    iconColor: "#22d3ee",
    title: "shadcn/ui",
    description: "Tailwindベースのコンポーネントライブラリ・インストールと使い方",
    status: "完成",
  },
  {
    href: "/css-framework/dark-mode",
    icon: Moon,
    iconColor: "#22d3ee",
    title: "ダークモード対応",
    description: "dark: クラスとCSS変数を使った切り替えの仕組み",
    status: "完成",
  },
];

export default function CssFrameworkHubPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← ホームに戻る
        </Link>
      </div>
      <h1 className="text-2xl font-bold text-white mb-2">CSSフレームワーク</h1>
      <p className="text-sm text-gray-400 mb-8">
        Tailwind CSS を中心に、ユーティリティファーストの書き方・レスポンシブ対応・shadcn/ui・ダークモードまで。
      </p>
      <div className="space-y-2">
        {pages.map((page) => {
          const Icon = page.icon;
          return (
            <Link
              key={page.href}
              href={page.href}
              className="group flex items-center gap-4 rounded-xl border p-4 transition-colors hover:border-cyan-500/40"
              style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
            >
              <Icon size={20} style={{ color: page.iconColor }} className="flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
                    {page.title}
                  </p>
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor:
                        page.status === "完成"
                          ? "rgba(6,182,212,0.1)"
                          : "rgba(75,85,99,0.3)",
                      color: page.status === "完成" ? "#22d3ee" : "#9ca3af",
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
