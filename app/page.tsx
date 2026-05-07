import Link from "next/link";
import { BookOpen, Braces, Atom, Triangle, Flame, Smartphone, Rocket, GitBranch, Palette, Terminal, Code2, FileCode2, Bug, ClipboardCheck, Layers, Wand2, Shield, Eye, Wrench, Languages, Boxes, ShieldCheck, Globe } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Category = {
  href: string;
  icon: LucideIcon;
  iconColor: string;
  title: string;
  description: string;
  status: string;
};

type PhaseGroup = {
  phaseLabel: string;
  groupLabel: string;
  icon: LucideIcon;
  color: string;
  categories: Category[];
};

const phases: PhaseGroup[] = [
  {
    phaseLabel: "Phase 0",
    groupLabel: "土台",
    icon: Wrench,
    color: "#94a3b8",
    categories: [
      {
        href: "/env",
        icon: Terminal,
        iconColor: "#94a3b8",
        title: "開発環境セットアップ",
        description: "Node.js・npm・VSCode・ターミナル基本操作",
        status: "完成",
      },
      {
        href: "/html-css",
        icon: Code2,
        iconColor: "#f97316",
        title: "HTML / CSS基礎",
        description: "Flexbox・Grid・レスポンシブ・CSS変数",
        status: "完成",
      },
      {
        href: "/kiso",
        icon: BookOpen,
        iconColor: "#34d399",
        title: "基礎概念",
        description: "サーバー・DB・BaaS・Vercel・PWA",
        status: "完成",
      },
      {
        href: "/git",
        icon: GitBranch,
        iconColor: "#818cf8",
        title: "Git / GitHub",
        description: "ブランチ・PR・rebase・ブランチ戦略",
        status: "完成",
      },
    ],
  },
  {
    phaseLabel: "Phase 1",
    groupLabel: "言語",
    icon: Languages,
    color: "#facc15",
    categories: [
      {
        href: "/javascript",
        icon: Braces,
        iconColor: "#facc15",
        title: "JavaScript",
        description: "変数・非同期・DOM・fetch・モジュール",
        status: "完成",
      },
      {
        href: "/typescript",
        icon: FileCode2,
        iconColor: "#4f85c8",
        title: "TypeScript",
        description: "型・interface・型推論・Reactでの型付け",
        status: "完成",
      },
      {
        href: "/debug",
        icon: Bug,
        iconColor: "#f87171",
        title: "デバッグ・エラー対処",
        description: "DevTools・スタックトレース・エラーの読み方",
        status: "準備中",
      },
    ],
  },
  {
    phaseLabel: "Phase 2",
    groupLabel: "デザイン",
    icon: Palette,
    color: "#f472b6",
    categories: [
      {
        href: "/css-framework",
        icon: Wand2,
        iconColor: "#22d3ee",
        title: "CSSフレームワーク",
        description: "Tailwind CSS・shadcn/ui・コンポーネント設計",
        status: "完成",
      },
      {
        href: "/uiux",
        icon: Palette,
        iconColor: "#f472b6",
        title: "UIデザイン",
        description: "近接・整列・反復・対比・配色・文字・診断・実装",
        status: "完成",
      },
    ],
  },
  {
    phaseLabel: "Phase 3",
    groupLabel: "フレームワーク",
    icon: Boxes,
    color: "#60a5fa",
    categories: [
      {
        href: "/react",
        icon: Atom,
        iconColor: "#60a5fa",
        title: "React",
        description: "コンポーネント・props・state・Hooks・ルーティング",
        status: "完成",
      },
      {
        href: "/nextjs",
        icon: Triangle,
        iconColor: "#e2e8f0",
        title: "Next.js",
        description: "App Router・Server Components・API Routes",
        status: "完成",
      },
      {
        href: "/form",
        icon: ClipboardCheck,
        iconColor: "#4ade80",
        title: "フォーム・バリデーション",
        description: "React Hook Form・Zod・エラー表示UX",
        status: "準備中",
      },
      {
        href: "/state",
        icon: Layers,
        iconColor: "#2dd4bf",
        title: "状態管理",
        description: "TanStack Query・Zustand・クライアント/サーバー",
        status: "準備中",
      },
      {
        href: "/firebase",
        icon: Flame,
        iconColor: "#fb923c",
        title: "Firebase",
        description: "Firestore・Auth・セキュリティルール",
        status: "完成",
      },
    ],
  },
  {
    phaseLabel: "Phase 4",
    groupLabel: "品質",
    icon: ShieldCheck,
    color: "#fbbf24",
    categories: [
      {
        href: "/security",
        icon: Shield,
        iconColor: "#fbbf24",
        title: "セキュリティ基礎",
        description: "環境変数・XSS・CORS・APIキー管理",
        status: "完成",
      },
      {
        href: "/pwa",
        icon: Smartphone,
        iconColor: "#a78bfa",
        title: "PWA",
        description: "manifest・Service Worker・キャッシュ戦略",
        status: "準備中",
      },
    ],
  },
  {
    phaseLabel: "Phase 5",
    groupLabel: "公開",
    icon: Globe,
    color: "#f472b6",
    categories: [
      {
        href: "/honban",
        icon: Rocket,
        iconColor: "#f472b6",
        title: "本番運用",
        description: "デプロイ・DNS・環境変数",
        status: "準備中",
      },
      {
        href: "/seo",
        icon: Eye,
        iconColor: "#a3e635",
        title: "SEO・アクセシビリティ",
        description: "OGP・Lighthouse・WAI-ARIA・メタデータ",
        status: "完成",
      },
    ],
  },
];

export default function HomePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-white mb-3">Web開発図解サイト</h1>
        <p className="text-gray-400 leading-relaxed">
          Web開発の概念を図解・比喩・対話形式でわかりやすく解説するサイト。<br />
          「読んで終わり」ではなく、ドリルで理解を確認しながら進められます。
        </p>
      </div>

      <div className="space-y-10">
        {phases.map((phase) => {
          const PhaseIcon = phase.icon;
          return (
            <section key={phase.phaseLabel}>
              <div className="flex items-center gap-2 mb-4">
                <PhaseIcon size={14} style={{ color: phase.color }} />
                <span className="text-xs font-semibold" style={{ color: phase.color }}>
                  {phase.phaseLabel}
                </span>
                <span className="text-xs text-gray-500 font-medium">— {phase.groupLabel}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {phase.categories.map((cat) => {
                  const Icon = cat.icon;
                  const isReady = cat.status === "完成";

                  const cardContent = (
                    <>
                      <div className="flex items-start justify-between mb-3">
                        <Icon size={22} style={{ color: cat.iconColor }} />
                        <span
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor:
                              cat.status === "完成"
                                ? "rgba(16,185,129,0.1)"
                                : "rgba(75,85,99,0.3)",
                            color: cat.status === "完成" ? "#34d399" : "#9ca3af",
                          }}
                        >
                          {cat.status}
                        </span>
                      </div>
                      <p className="text-base font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                        {cat.title}
                      </p>
                      <p className="text-xs text-gray-400">{cat.description}</p>
                    </>
                  );

                  if (isReady) {
                    return (
                      <Link
                        key={cat.href}
                        href={cat.href}
                        className="group rounded-xl border p-5 transition-colors hover:border-emerald-500/40"
                        style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
                      >
                        {cardContent}
                      </Link>
                    );
                  }

                  return (
                    <div
                      key={cat.href}
                      className="group rounded-xl border p-5 opacity-50 cursor-not-allowed pointer-events-none"
                      style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
                    >
                      {cardContent}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
