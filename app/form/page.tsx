import Link from "next/link";
import { FileInput, BookOpen, Shield, AlertCircle, Server } from "lucide-react";
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
    href: "/form/controlled",
    icon: FileInput,
    iconColor: "#4ade80",
    title: "制御コンポーネントとは",
    description: "ReactのonChange/valueでフォームを管理する仕組みと非制御との違い",
    status: "完成",
  },
  {
    href: "/form/react-hook-form",
    icon: BookOpen,
    iconColor: "#4ade80",
    title: "React Hook Form",
    description: "非制御コンポーネントで高パフォーマンスなフォームを作る・useFormの基本",
    status: "完成",
  },
  {
    href: "/form/zod",
    icon: Shield,
    iconColor: "#4ade80",
    title: "Zodでスキーマ定義",
    description: "型安全なバリデーションルールの書き方・z.string().min()等",
    status: "完成",
  },
  {
    href: "/form/error-ux",
    icon: AlertCircle,
    iconColor: "#4ade80",
    title: "エラー表示UX",
    description: "フィールドごとのエラーを適切に見せる設計・accessibleなエラー実装",
    status: "完成",
  },
  {
    href: "/form/server-validation",
    icon: Server,
    iconColor: "#4ade80",
    title: "サーバーサイドバリデーション",
    description: "クライアント検証だけでは不十分な理由・Next.js Server Actionsでの検証",
    status: "完成",
  },
];

export default function FormHubPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← ホームに戻る
        </Link>
      </div>
      <h1 className="text-2xl font-bold text-white mb-2">フォーム・バリデーション</h1>
      <p className="text-sm text-gray-400 mb-8">
        ユーザーの入力を受け取り、検証し、安全に処理するための設計パターンを学ぶ。制御コンポーネントから始まり、React Hook Form・Zodによる型安全な実装まで。
      </p>
      <div className="space-y-2">
        {pages.map((page) => {
          const Icon = page.icon;
          return (
            <Link
              key={page.href}
              href={page.href}
              className="group flex items-center gap-4 rounded-xl border p-4 transition-colors hover:border-green-500/40"
              style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
            >
              <Icon size={20} style={{ color: page.iconColor }} className="flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-semibold text-white group-hover:text-green-400 transition-colors">
                    {page.title}
                  </p>
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor:
                        page.status === "完成"
                          ? "rgba(74,222,128,0.1)"
                          : "rgba(75,85,99,0.3)",
                      color: page.status === "完成" ? "#4ade80" : "#9ca3af",
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
