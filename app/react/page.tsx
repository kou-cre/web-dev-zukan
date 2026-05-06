import Link from "next/link";
import { BookOpen, Puzzle, ArrowDownToLine, Database, Zap, Share2, Wrench, Map } from "lucide-react";
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
    href: "/react/intro",
    icon: BookOpen,
    iconColor: "#60a5fa",
    title: "はじめに読む",
    description: "ReactをはじめるためのJSチェックリスト — この10項目が分かれば準備完了",
    status: "完成",
    isStart: true,
  },
  {
    href: "/react/components",
    icon: Puzzle,
    iconColor: "#60a5fa",
    title: "コンポーネント",
    description: "UIを部品に分ける考え方とJSXの基本",
    status: "完成",
  },
  {
    href: "/react/props",
    icon: ArrowDownToLine,
    iconColor: "#38bdf8",
    title: "Props",
    description: "親から子へデータを渡す仕組み",
    status: "完成",
  },
  {
    href: "/react/state",
    icon: Database,
    iconColor: "#a78bfa",
    title: "State と useState",
    description: "コンポーネントが持つ「変わる値」の管理",
    status: "完成",
  },
  {
    href: "/react/useeffect",
    icon: Zap,
    iconColor: "#22d3ee",
    title: "useEffect",
    description: "レンダリングの外側で起きる処理を制御する",
    status: "完成",
  },
  {
    href: "/react/context",
    icon: Share2,
    iconColor: "#fb7185",
    title: "Context と useContext",
    description: "Props を使わずに値をツリー全体で共有する",
    status: "完成",
  },
  {
    href: "/react/hooks",
    icon: Wrench,
    iconColor: "#34d399",
    title: "カスタムHooks",
    description: "ロジックを再利用可能な関数に切り出す技術",
    status: "完成",
  },
  {
    href: "/react/routing",
    icon: Map,
    iconColor: "#c084fc",
    title: "ルーティング（react-router）",
    description: "URLが変わると見せるコンポーネントが変わる仕組み",
    status: "完成",
  },
];

export default function ReactHubPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← ホームに戻る
        </Link>
      </div>
      <h1 className="text-2xl font-bold text-white mb-2">React</h1>
      <p className="text-sm text-gray-400 mb-2">
        JavaScriptのライブラリ。UIを「部品」として組み立てる考え方を順番に学ぶ。
      </p>
      <p className="text-xs text-gray-500 mb-8">
        ← 上から順番に読むことを推奨。各ページに前提リンクあり。
      </p>
      <div className="space-y-2">
        {pages.map((page, index) => {
          const Icon = page.icon;
          return (
            <Link
              key={page.href}
              href={page.href}
              className="group flex items-center gap-4 rounded-xl border p-4 transition-colors hover:border-blue-500/40"
              style={{
                backgroundColor: page.isStart ? "rgba(96,165,250,0.05)" : "#1a1d2a",
                borderColor: page.isStart ? "rgba(96,165,250,0.3)" : "#2d3048",
              }}
            >
              <div className="flex-shrink-0 flex items-center gap-2">
                <span className="text-xs text-gray-600 w-4 text-right">{index + 1}</span>
                <Icon size={20} style={{ color: page.iconColor }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {page.title}
                  </p>
                  {page.isStart && (
                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
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
