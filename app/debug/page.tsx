import Link from "next/link";
import { MonitorDot, FileWarning, Network, PauseCircle, Scissors } from "lucide-react";
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
    href: "/debug/devtools",
    icon: MonitorDot,
    iconColor: "#f87171",
    title: "DevTools 基本",
    description: "Elements・Console・Network・Applicationタブの役割と使い方",
    status: "完成",
  },
  {
    href: "/debug/error-messages",
    icon: FileWarning,
    iconColor: "#f87171",
    title: "エラーメッセージの読み方",
    description: "スタックトレースから原因ファイル・行番号を特定する方法",
    status: "完成",
  },
  {
    href: "/debug/network-tab",
    icon: Network,
    iconColor: "#f87171",
    title: "Networkタブ活用",
    description: "fetch通信のリクエスト/レスポンスをNetworkタブで目で見る",
    status: "完成",
  },
  {
    href: "/debug/breakpoints",
    icon: PauseCircle,
    iconColor: "#f87171",
    title: "ブレークポイント",
    description: "Sourcesタブでコードを止めてステップ実行するデバッグ手法",
    status: "完成",
  },
  {
    href: "/debug/minimal-repro",
    icon: Scissors,
    iconColor: "#f87171",
    title: "最小再現コードの作り方",
    description: "問題を切り分けてAIや他者に質問する技術",
    status: "完成",
  },
];

export default function DebugHubPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← ホームに戻る
        </Link>
      </div>
      <h1 className="text-2xl font-bold text-white mb-2">デバッグ・エラー対処</h1>
      <p className="text-sm text-gray-400 mb-8">
        エラーが出ても慌てない。DevToolsを使いこなして「何が起きているか」を自力で特定する技術を身につける。
      </p>
      <div className="space-y-2">
        {pages.map((page) => {
          const Icon = page.icon;
          return (
            <Link
              key={page.href}
              href={page.href}
              className="group flex items-center gap-4 rounded-xl border p-4 transition-colors hover:border-red-500/40"
              style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
            >
              <Icon size={20} style={{ color: page.iconColor }} className="flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-semibold text-white group-hover:text-red-400 transition-colors">
                    {page.title}
                  </p>
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor:
                        page.status === "完成"
                          ? "rgba(239,68,68,0.1)"
                          : "rgba(75,85,99,0.3)",
                      color: page.status === "完成" ? "#f87171" : "#9ca3af",
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
