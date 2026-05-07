"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type ComponentType,
  type SVGProps,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Home,
  Wrench,
  Code2,
  Palette,
  Boxes,
  ShieldCheck,
  Rocket,
  Terminal,
  FileCode2,
  Lightbulb,
  GitBranch,
  Braces,
  FileType2,
  Bug,
  Layers,
  Sparkles,
  Atom,
  Triangle,
  ClipboardCheck,
  Database,
  Flame,
  Lock,
  Smartphone,
  Server,
  Search,
} from "lucide-react";

type LucideIcon = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  description: string;
};

type PhaseGroup = {
  id: string;
  phaseLabel: string;
  groupLabel: string;
  icon: LucideIcon;
  items: NavItem[];
};

const COLOR = {
  bg: "#0f1117",
  surface: "#1a1d2a",
  border: "#2d3048",
} as const;

const phases: PhaseGroup[] = [
  {
    id: "phase-0",
    phaseLabel: "Phase 0",
    groupLabel: "土台",
    icon: Wrench,
    items: [
      { label: "開発環境セットアップ", href: "/env", icon: Terminal, description: "Node.js / npm / VSCode" },
      { label: "HTML / CSS基礎", href: "/html-css", icon: FileCode2, description: "セマンティック・Flexbox・Grid" },
      { label: "基礎概念", href: "/kiso", icon: Lightbulb, description: "サーバー・DB・BaaSの全体像" },
      { label: "Git / GitHub", href: "/git", icon: GitBranch, description: "バージョン管理の基本" },
    ],
  },
  {
    id: "phase-1",
    phaseLabel: "Phase 1",
    groupLabel: "言語",
    icon: Code2,
    items: [
      { label: "JavaScript", href: "/javascript", icon: Braces, description: "変数・非同期・DOM・fetch" },
      { label: "TypeScript", href: "/typescript", icon: FileType2, description: "型と型推論・Generics" },
      { label: "デバッグ・エラー対処", href: "/debug", icon: Bug, description: "DevTools・スタックトレース" },
    ],
  },
  {
    id: "phase-2",
    phaseLabel: "Phase 2",
    groupLabel: "デザイン",
    icon: Palette,
    items: [
      { label: "CSSフレームワーク", href: "/css-framework", icon: Layers, description: "Tailwind・shadcn/ui" },
      { label: "UIデザイン", href: "/uiux", icon: Sparkles, description: "見やすい画面の作り方" },
    ],
  },
  {
    id: "phase-3",
    phaseLabel: "Phase 3",
    groupLabel: "フレームワーク",
    icon: Boxes,
    items: [
      { label: "React", href: "/react", icon: Atom, description: "コンポーネント・Hooks" },
      { label: "Next.js", href: "/nextjs", icon: Triangle, description: "App Router・SSR / SSG" },
      { label: "フォーム・バリデーション", href: "/form", icon: ClipboardCheck, description: "RHF・Zod" },
      { label: "状態管理", href: "/state", icon: Database, description: "TanStack Query・Zustand" },
      { label: "Firebase", href: "/firebase", icon: Flame, description: "Auth・Firestore" },
    ],
  },
  {
    id: "phase-4",
    phaseLabel: "Phase 4",
    groupLabel: "品質",
    icon: ShieldCheck,
    items: [
      { label: "セキュリティ基礎", href: "/security", icon: Lock, description: "XSS・CORS・CSRF" },
      { label: "PWA", href: "/pwa", icon: Smartphone, description: "オフライン・インストール" },
    ],
  },
  {
    id: "phase-5",
    phaseLabel: "Phase 5",
    groupLabel: "公開",
    icon: Rocket,
    items: [
      { label: "本番運用", href: "/honban", icon: Server, description: "CI / CD・監視" },
      { label: "SEO・アクセシビリティ", href: "/seo", icon: Search, description: "OGP・Lighthouse・WAI-ARIA" },
    ],
  },
];

function isPathActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isPhaseActive(pathname: string, phase: PhaseGroup): boolean {
  return phase.items.some((item) => isPathActive(pathname, item.href));
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openPhaseId, setOpenPhaseId] = useState<string | null>(null);
  const [expandedMobilePhase, setExpandedMobilePhase] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  // ルート変更時に全メニューを閉じる
  useEffect(() => {
    setMobileOpen(false);
    setOpenPhaseId(null);
  }, [pathname]);

  // モバイルドロワー開放中はスクロールロック
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // モバイルドロワー初期表示時、現在ページのフェーズを自動展開
  useEffect(() => {
    if (!mobileOpen) return;
    const active = phases.find((p) => isPhaseActive(pathname, p));
    setExpandedMobilePhase(active?.id ?? phases[0].id);
  }, [mobileOpen, pathname]);

  // Escapeキーで閉じる
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenPhaseId(null);
      setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ヘッダー外側クリックでドロップダウンを閉じる
  useEffect(() => {
    if (!openPhaseId) return;
    const onClick = (e: MouseEvent) => {
      if (!headerRef.current) return;
      if (!headerRef.current.contains(e.target as Node)) {
        setOpenPhaseId(null);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [openPhaseId]);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpenPhaseId(null), 150);
  }, [clearCloseTimer]);

  const openPhase = useCallback(
    (id: string) => {
      clearCloseTimer();
      setOpenPhaseId(id);
    },
    [clearCloseTimer],
  );

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md"
        style={{
          backgroundColor: `${COLOR.bg}f2`,
          borderColor: COLOR.border,
        }}
      >
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-4 lg:h-16 lg:px-6">
          {/* ロゴ */}
          <Link
            href="/"
            className="group flex items-center gap-2 text-sm font-bold tracking-tight text-white transition-opacity hover:opacity-80"
          >
            <span
              className="flex h-7 w-7 items-center justify-center rounded-md border"
              style={{ backgroundColor: COLOR.surface, borderColor: COLOR.border }}
            >
              <Home size={14} className="text-white" strokeWidth={2.5} />
            </span>
            <span>Web開発図解</span>
          </Link>

          {/* デスクトップナビ：フェーズボタン群 */}
          <nav
            className="hidden items-center gap-0.5 lg:flex"
            onMouseLeave={scheduleClose}
            aria-label="グローバルナビゲーション"
          >
            {phases.map((phase) => {
              const Icon = phase.icon;
              const active = isPhaseActive(pathname, phase);
              const open = openPhaseId === phase.id;
              return (
                <div
                  key={phase.id}
                  className="relative"
                  onMouseEnter={() => openPhase(phase.id)}
                >
                  <button
                    type="button"
                    onClick={() => setOpenPhaseId(open ? null : phase.id)}
                    aria-haspopup="true"
                    aria-expanded={open}
                    className="group flex items-center gap-1.5 rounded-md px-3 py-2 text-xs font-medium transition-colors hover:bg-white/5"
                    style={{
                      color: active || open ? "#ffffff" : "#9ca3af",
                    }}
                  >
                    <Icon
                      size={14}
                      className="transition-colors"
                      style={{ color: active || open ? "#ffffff" : "#6b7280" }}
                    />
                    <span className="flex flex-col items-start leading-none">
                      <span
                        className="text-[10px] font-normal tracking-wide"
                        style={{ color: active || open ? "rgba(255,255,255,0.55)" : "#6b7280" }}
                      >
                        {phase.phaseLabel}
                      </span>
                      <span className="mt-0.5 text-xs">{phase.groupLabel}</span>
                    </span>
                    <ChevronDown
                      size={12}
                      className={`ml-0.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                      style={{ color: active || open ? "rgba(255,255,255,0.6)" : "#4b5563" }}
                    />
                  </button>

                  {/* アクティブインジケーター */}
                  {active && (
                    <span
                      className="pointer-events-none absolute inset-x-3 -bottom-px h-0.5 rounded-full"
                      style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
                      aria-hidden
                    />
                  )}

                  {/* ドロップダウン */}
                  {open && (
                    <div
                      role="menu"
                      className="absolute left-0 top-full z-50 pt-2"
                      onMouseEnter={clearCloseTimer}
                      onMouseLeave={scheduleClose}
                    >
                      <div
                        className="w-[360px] overflow-hidden rounded-xl border shadow-2xl shadow-black/40"
                        style={{ backgroundColor: COLOR.surface, borderColor: COLOR.border }}
                      >
                        {/* ヘッダー部分 */}
                        <div
                          className="flex items-center gap-2 border-b px-4 py-3"
                          style={{ borderColor: COLOR.border }}
                        >
                          <Icon size={16} className="text-white" />
                          <div className="flex flex-col leading-tight">
                            <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                              {phase.phaseLabel}
                            </span>
                            <span className="text-sm font-semibold text-white">
                              {phase.groupLabel}
                            </span>
                          </div>
                        </div>

                        {/* リンク一覧 */}
                        <ul className="py-1.5">
                          {phase.items.map((item) => {
                            const ItemIcon = item.icon;
                            const itemActive = isPathActive(pathname, item.href);
                            return (
                              <li key={item.href}>
                                <Link
                                  href={item.href}
                                  role="menuitem"
                                  className="group relative flex items-start gap-3 px-4 py-2.5 transition-colors hover:bg-white/5"
                                  style={{
                                    backgroundColor: itemActive ? "rgba(255,255,255,0.05)" : undefined,
                                  }}
                                >
                                  {itemActive && (
                                    <span
                                      className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-r"
                                      style={{ backgroundColor: "#ffffff" }}
                                      aria-hidden
                                    />
                                  )}
                                  <span
                                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-colors"
                                    style={{
                                      backgroundColor: itemActive
                                        ? "rgba(255,255,255,0.08)"
                                        : "rgba(255,255,255,0.02)",
                                      borderColor: COLOR.border,
                                    }}
                                  >
                                    <ItemIcon
                                      size={12}
                                      style={{ color: itemActive ? "#ffffff" : "#9ca3af" }}
                                    />
                                  </span>
                                  <span className="flex flex-col leading-tight">
                                    <span
                                      className="text-sm font-medium"
                                      style={{ color: itemActive ? "#ffffff" : "#e5e7eb" }}
                                    >
                                      {item.label}
                                    </span>
                                    <span className="mt-0.5 text-[11px] text-gray-500">
                                      {item.description}
                                    </span>
                                  </span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* モバイル：ハンバーガー */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-white/5 lg:hidden"
            style={{ color: "#e5e7eb" }}
            aria-label={mobileOpen ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* モバイルバックドロップ */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-200 lg:hidden ${
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        style={{ backgroundColor: "rgba(0,0,0,0.65)" }}
        onClick={() => setMobileOpen(false)}
        aria-hidden
      />

      {/* モバイルドロワー */}
      <aside
        className={`fixed bottom-0 left-0 top-14 z-40 w-[88%] max-w-sm overflow-y-auto border-r transition-transform duration-200 ease-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ backgroundColor: COLOR.bg, borderColor: COLOR.border }}
        aria-hidden={!mobileOpen}
      >
        <nav className="flex flex-col py-3" aria-label="モバイルナビゲーション">
          <Link
            href="/"
            className="mx-3 mb-2 flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/5"
            style={{
              backgroundColor: pathname === "/" ? "rgba(255,255,255,0.05)" : "transparent",
              borderColor: COLOR.border,
            }}
          >
            <Home size={16} />
            <span>ホーム</span>
          </Link>

          {phases.map((phase) => {
            const Icon = phase.icon;
            const expanded = expandedMobilePhase === phase.id;
            const active = isPhaseActive(pathname, phase);
            return (
              <div key={phase.id} className="px-3">
                <button
                  type="button"
                  onClick={() => setExpandedMobilePhase(expanded ? null : phase.id)}
                  className="flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-white/5"
                  aria-expanded={expanded}
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-md border"
                      style={{
                        backgroundColor: active ? "rgba(255,255,255,0.08)" : COLOR.surface,
                        borderColor: COLOR.border,
                      }}
                    >
                      <Icon size={14} style={{ color: active ? "#ffffff" : "#9ca3af" }} />
                    </span>
                    <span className="flex flex-col leading-tight">
                      <span className="text-[10px] font-medium uppercase tracking-wider text-gray-500">
                        {phase.phaseLabel}
                      </span>
                      <span className="text-sm font-semibold text-white">{phase.groupLabel}</span>
                    </span>
                  </span>
                  <ChevronDown
                    size={16}
                    className={`shrink-0 transition-transform duration-200 ${
                      expanded ? "rotate-180" : ""
                    }`}
                    style={{ color: "#6b7280" }}
                  />
                </button>

                {expanded && (
                  <ul className="mb-2 ml-4 mt-1 flex flex-col border-l pl-2" style={{ borderColor: COLOR.border }}>
                    {phase.items.map((item) => {
                      const ItemIcon = item.icon;
                      const itemActive = isPathActive(pathname, item.href);
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors hover:bg-white/5"
                            style={{
                              color: itemActive ? "#ffffff" : "#9ca3af",
                              backgroundColor: itemActive ? "rgba(255,255,255,0.05)" : undefined,
                            }}
                          >
                            <ItemIcon size={14} style={{ color: itemActive ? "#ffffff" : "#6b7280" }} />
                            <span>{item.label}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
