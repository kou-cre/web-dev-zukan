import Link from "next/link";
import { Server, Code2, Terminal, FileJson } from "lucide-react";
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
    href: "/env/nodejs",
    icon: Server,
    iconColor: "#94a3b8",
    title: "Node.js と npm",
    description: "ブラウザ外でJSを動かす環境とパッケージ管理の仕組み",
    status: "完成",
  },
  {
    href: "/env/vscode",
    icon: Code2,
    iconColor: "#94a3b8",
    title: "VSCode と拡張機能",
    description: "開発効率を上げるエディタ設定・必須拡張機能5選",
    status: "完成",
  },
  {
    href: "/env/terminal",
    icon: Terminal,
    iconColor: "#94a3b8",
    title: "ターミナル基本コマンド",
    description: "cd・ls・mkdir・touch・パスの概念を一気に掴む",
    status: "完成",
  },
  {
    href: "/env/package-json",
    icon: FileJson,
    iconColor: "#94a3b8",
    title: "package.json の読み方",
    description: "dependencies・scripts・バージョン記号の読み解き方",
    status: "完成",
  },
];

export default function EnvHubPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← ホームに戻る
        </Link>
      </div>
      <h1 className="text-2xl font-bold text-white mb-2">開発環境セットアップ</h1>
      <p className="text-sm text-gray-400 mb-8">
        コードを書き始める前に整えておく「作業場」の構築。Node.js・npm・VSCode・ターミナルの基礎を掴む。
      </p>
      <div className="space-y-2">
        {pages.map((page) => {
          const Icon = page.icon;
          return (
            <Link
              key={page.href}
              href={page.href}
              className="group flex items-center gap-4 rounded-xl border p-4 transition-colors hover:border-slate-500/40"
              style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
            >
              <Icon size={20} style={{ color: page.iconColor }} className="flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-semibold text-white group-hover:text-slate-300 transition-colors">
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
