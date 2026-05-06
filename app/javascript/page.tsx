import Link from "next/link";
import {
  BookOpen,
  Variable,
  MousePointer,
  Clock,
  Timer,
  Download,
  AlertTriangle,
  Package,
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
    href: "/javascript/intro",
    icon: BookOpen,
    iconColor: "#facc15",
    title: "はじめに読む",
    description: "プログラムとは？ブラウザとJSエンジンの関係を掴む",
    status: "完成",
    isStart: true,
  },
  {
    href: "/javascript/variables",
    icon: Variable,
    iconColor: "#facc15",
    title: "変数とスコープ",
    description: "var / let / const とスコープの違い",
    status: "完成",
  },
  {
    href: "/javascript/dom",
    icon: MousePointer,
    iconColor: "#84cc16",
    title: "DOM操作",
    description: "JavaScriptからHTMLを動かす仕組み",
    status: "完成",
  },
  {
    href: "/javascript/async-basics",
    icon: Clock,
    iconColor: "#f59e0b",
    title: "同期と非同期の違い",
    description: "なぜ画面が固まらないのか — setTimeoutとコールバック",
    status: "完成",
  },
  {
    href: "/javascript/async",
    icon: Timer,
    iconColor: "#f59e0b",
    title: "Promise と async/await",
    description: "非同期処理の結果を受け取る仕組みと書き方",
    status: "完成",
  },
  {
    href: "/javascript/fetch",
    icon: Download,
    iconColor: "#22d3ee",
    title: "fetch API",
    description: "サーバーとデータをやり取りする基本",
    status: "完成",
  },
  {
    href: "/javascript/error",
    icon: AlertTriangle,
    iconColor: "#f87171",
    title: "エラーハンドリング",
    description: "try/catch と例外処理の考え方",
    status: "完成",
  },
  {
    href: "/javascript/modules",
    icon: Package,
    iconColor: "#fb923c",
    title: "ESモジュール",
    description: "import / export とモジュール分割",
    status: "完成",
  },
];

export default function JavaScriptHubPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← ホームに戻る
        </Link>
      </div>
      <h1 className="text-2xl font-bold text-white mb-2">JavaScript</h1>
      <p className="text-sm text-gray-400 mb-2">
        ブラウザで動く唯一の言語。ゼロから順番に読めば全部わかる。
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
              className="group flex items-center gap-4 rounded-xl border p-4 transition-colors hover:border-yellow-500/40"
              style={{
                backgroundColor: page.isStart ? "rgba(234,179,8,0.05)" : "#1a1d2a",
                borderColor: page.isStart ? "rgba(234,179,8,0.3)" : "#2d3048",
              }}
            >
              <div className="flex-shrink-0 flex items-center gap-2">
                <span className="text-xs text-gray-600 w-4 text-right">{index + 1}</span>
                <Icon size={20} style={{ color: page.iconColor }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-semibold text-white group-hover:text-yellow-400 transition-colors">
                    {page.title}
                  </p>
                  {page.isStart && (
                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
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
