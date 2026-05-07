import Link from "next/link";
import { ShieldCheck, Layers, GitMerge, Code2, Puzzle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const accentColor = "#4f85c8";

const pages: {
  href: string;
  icon: LucideIcon;
  iconColor: string;
  title: string;
  description: string;
  status: string;
}[] = [
  {
    href: "/typescript/what-is-type",
    icon: ShieldCheck,
    iconColor: accentColor,
    title: "型とは何か",
    description: "型安全の恩恵とコンパイル時エラー検出の仕組みを掴む",
    status: "完成",
  },
  {
    href: "/typescript/basic-types",
    icon: Layers,
    iconColor: accentColor,
    title: "基本型と型推論",
    description: "string・number・boolean・配列と、型推論が自動で働く仕組み",
    status: "完成",
  },
  {
    href: "/typescript/interface-type",
    icon: GitMerge,
    iconColor: accentColor,
    title: "interface と type",
    description: "オブジェクト形状の定義方法と extends による拡張・使い分け",
    status: "完成",
  },
  {
    href: "/typescript/react-types",
    icon: Code2,
    iconColor: accentColor,
    title: "React での型付け",
    description: "props・useState・event handler・FC の実践的な型付け方法",
    status: "完成",
  },
  {
    href: "/typescript/generics",
    icon: Puzzle,
    iconColor: accentColor,
    title: "ジェネリクス入門",
    description: "<T> の仕組みと再利用可能な型の書き方を段階的に理解する",
    status: "完成",
  },
];

export default function TypeScriptHubPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← ホームに戻る
        </Link>
      </div>
      <div className="mb-2 flex items-center gap-2">
        <div
          className="w-1 h-6 rounded-full"
          style={{ backgroundColor: accentColor }}
        />
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: accentColor }}>
          TypeScript
        </span>
      </div>
      <h1 className="text-2xl font-bold text-white mb-2">TypeScript</h1>
      <p className="text-sm text-gray-400 mb-8">
        JavaScriptに型を加えてバグを未然に防ぐ。実行前にエラーを検出できる「型安全」の仕組みを段階的に学ぶ。
      </p>
      <div className="space-y-2">
        {pages.map((page) => {
          const Icon = page.icon;
          return (
            <Link
              key={page.href}
              href={page.href}
              className="group flex items-center gap-4 rounded-xl border p-4 transition-colors"
              style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
            >
              <Icon size={20} style={{ color: page.iconColor }} className="flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <p
                    className="text-sm font-semibold text-white transition-colors"
                    style={{}}
                  >
                    {page.title}
                  </p>
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor:
                        page.status === "完成"
                          ? "rgba(79,133,200,0.1)"
                          : "rgba(75,85,99,0.3)",
                      color: page.status === "完成" ? accentColor : "#9ca3af",
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
