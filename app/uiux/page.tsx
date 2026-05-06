import Link from "next/link";
import {
  Eye,
  LayoutGrid,
  Palette,
  Type,
  Stethoscope,
  MousePointerClick,
  LayoutDashboard,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const pages: {
  href: string;
  icon: LucideIcon;
  iconColor: string;
  title: string;
  description: string;
  status: string;
  isStart?: boolean;
}[] = [
  {
    href: "/uiux/seeing",
    icon: Eye,
    iconColor: "#f472b6",
    title: "UIを見る目を養う",
    description: "「なんかいい」を言葉にする — UIが見えるようになる第一歩",
    status: "完成",
    isStart: true,
  },
  {
    href: "/uiux/principles",
    icon: LayoutGrid,
    iconColor: "#fb7185",
    title: "デザインの4大原則",
    description: "近接・整列・反復・対比 — これだけでUIは整う",
    status: "完成",
  },
  {
    href: "/uiux/color",
    icon: Palette,
    iconColor: "#e879f9",
    title: "色と配色のルール",
    description: "色は感覚じゃなく数字 — 三属性と60-30-10の法則",
    status: "完成",
  },
  {
    href: "/uiux/typography",
    icon: Type,
    iconColor: "#a78bfa",
    title: "文字と余白のルール",
    description: "サイズの階段と8の倍数 — 文字と空白でUIは9割決まる",
    status: "完成",
  },
  {
    href: "/uiux/diagnose",
    icon: Stethoscope,
    iconColor: "#c084fc",
    title: "UIを読み解く・診断する",
    description: "「なぜ良いか」「何が悪いか」を言葉にする力 — 診断と修正",
    status: "完成",
  },
  {
    href: "/uiux/parts",
    icon: MousePointerClick,
    iconColor: "#818cf8",
    title: "UIパーツの設計",
    description: "ボタン・入力・カード — 触れるパーツの作法と状態設計",
    status: "完成",
  },
  {
    href: "/uiux/layout",
    icon: LayoutDashboard,
    iconColor: "#60a5fa",
    title: "レイアウトと一貫性",
    description: "グリッド・モバイル・トークン — 画面全体を仕組みで揃える",
    status: "完成",
  },
  {
    href: "/uiux/ai-quality",
    icon: Sparkles,
    iconColor: "#38bdf8",
    title: "AIと仕上げる・品質と倫理",
    description: "10原則とWCAGで検収する — AIの出力を診断・修正するループ",
    status: "完成",
  },
];

export default function UiuxHubPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← ホームに戻る
        </Link>
      </div>
      <h1 className="text-2xl font-bold text-white mb-2">UIデザイン</h1>
      <p className="text-sm text-gray-400 mb-2">
        UIをセンスではなく原則で組み立てる。観察 → 原則 → 診断 → 実装 → 仕組み化の順で「なんかいい」を言葉にする力を養う。
      </p>
      <p className="text-xs text-gray-500 mb-8">
        ← 上から順番に読むことを推奨。HTML/CSSが書ける前提で、デザインの判断軸を仕込むためのカテゴリ。
      </p>
      <div className="space-y-2">
        {pages.map((page, index) => {
          const Icon = page.icon;
          return (
            <Link
              key={page.href}
              href={page.href}
              className="group flex items-center gap-4 rounded-xl border p-4 transition-colors hover:border-pink-500/40"
              style={{
                backgroundColor: page.isStart ? "rgba(244,114,182,0.05)" : "#1a1d2a",
                borderColor: page.isStart ? "rgba(244,114,182,0.3)" : "#2d3048",
              }}
            >
              <div className="flex-shrink-0 flex items-center gap-2">
                <span className="text-xs text-gray-600 w-4 text-right">{index + 1}</span>
                <Icon size={20} style={{ color: page.iconColor }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-semibold text-white group-hover:text-pink-400 transition-colors">
                    {page.title}
                  </p>
                  {page.isStart && (
                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20">
                      ここから
                    </span>
                  )}
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
