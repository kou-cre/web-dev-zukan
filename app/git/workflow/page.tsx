import Link from "next/link";
import {
  GitBranch,
  GitMerge,
  GitPullRequest,
  Rocket,
  Layers,
  Zap,
  Users,
  AlertTriangle,
  CheckCircle2,
  Flag,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

import { Hero } from "@/components/Hero";
import { Prerequisites } from "@/components/Prerequisites";
import { OnePageSummary } from "@/components/OnePageSummary";
import {
  ConceptDiagram,
  FlowCard,
  FlowArrow,
} from "@/components/ConceptDiagram";
import { ComparisonTable } from "@/components/ComparisonTable";
import { MajiDialogue } from "@/components/MajiDialogue";
import { RelatedLinks } from "@/components/RelatedLinks";
import { PageDrill } from "@/components/PageDrill";
import { DetailSection, DetailBlock, KeyPoint } from "@/components/DetailSection";
import { SectionDivider } from "@/components/SectionDivider";
import { TermNote } from "@/components/TermNote";
import { CodeBlock } from "@/components/CodeBlock";
import { workflowQuestions } from "@/content/questions/git/workflow";

export const metadata = {
  title: "ブランチ戦略 | Web開発図解",
  description:
    "GitHub Flow・Git Flow・Trunk-based Developmentの3戦略を比較。デプロイ頻度とチーム規模から最適な戦略を選べるようになる。",
};

export default function WorkflowPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/git" className="text-xs text-gray-500 hover:text-white transition-colors mb-6 block">
        ← Git / GitHub に戻る
      </Link>
      <Hero
        category="Git"
        title="ブランチ戦略"
        subtitle={"チームの「交通ルール」をデプロイ頻度とチーム規模から選ぶ"}
        body={"GitHub Flow・Git Flow・Trunk-based Developmentの3戦略を図解で比較する。"}
        accentColor="pink"
      />

      {/* ── 前提知識ボックス ─────────────────────────────────── */}
      <Prerequisites
        learn={[
          "GitHub Flow の全体像とブランチ構成",
          "Git Flow の5種ブランチの役割",
          "どの戦略をいつ選ぶかの判断基準",
        ]}
        prerequisites={[
          "ブランチとマージの基本",
          "Pull Request の流れ",
        ]}
        outOfScope={[
          "Git Flow ツール（git-flow CLI）の操作",
          "モノレポのブランチ戦略",
        ]}
      />

      <OnePageSummary
        keyMessage="ブランチ戦略はチームの「交通ルール」。デプロイ頻度とチーム規模で選ぶ。個人や小チームには GitHub Flow、バージョン管理が必要な大規模プロジェクトには Git Flow、CI/CD成熟チームには Trunk-based が向く。"
        metaphorTitle="道路の設計と交通ルール"
        metaphorPoints={[
          {
            label: "GitHub Flow",
            real: "main に向けてひたすら進む一方通行の道路。シンプルで速い",
            metaphor: "赤信号なしの一方通行",
          },
          {
            label: "Git Flow",
            real: "feature / develop / release / hotfix と車線が整備された幹線道路。安全だが複雑",
            metaphor: "信号と車線が整備された幹線道路",
          },
          {
            label: "Trunk-based",
            real: "main（trunk）だけを走るフリーウェイ。feature flag で合流タイミングを制御",
            metaphor: "feature flag で速度調整するフリーウェイ",
          },
        ]}
        definition="ブランチ戦略 = いつ・どのブランチで・どう作業するかのチームルール。"
      />

      {/* ── 基礎編 用語注釈 ──────────────────────────────────── */}
      <TermNote
        terms={[
          {
            word: "PR（Pull Request）",
            definition:
              "変更をメインブランチに取り込む依頼のこと。GitHub上でコードのレビューと承認を行い、承認後にマージされる。",
          },
          {
            word: "hotfix",
            definition:
              "本番環境の緊急バグ修正のためのブランチ。Git Flow では main から直接分岐し、修正後は main と develop の両方へマージする。",
          },
          {
            word: "feature flag",
            definition:
              "未完成機能をコードに含めたままフラグ（ON/OFFスイッチ）で表示・非表示を切り替える手法。main に頻繁にマージしながら安全に機能開発を進められる。",
          },
        ]}
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ─────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まずは最もシンプルな GitHub Flow の構造を確認し、その後 Git Flow の5種ブランチを見ていきましょう。
        </p>

        {/* ── 概念図A: GitHub Flow ── */}
        <ConceptDiagram
          title="概念図A"
          description="GitHub Flow: main + feature/* の2種類だけで回すシンプルな戦略"
        >
          {/* main ブランチ帯 */}
          <div className="mb-5">
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <GitBranch className="w-4 h-4" style={{ color: "#f472b6" }} />
                <span className="text-sm font-bold" style={{ color: "#f9a8d4" }}>
                  main
                </span>
                <span
                  className="ml-auto text-xs px-2 py-0.5 rounded-full border"
                  style={{
                    backgroundColor: "rgba(244,114,182,0.1)",
                    borderColor: "rgba(244,114,182,0.4)",
                    color: "#f9a8d4",
                  }}
                >
                  常にデプロイ可能
                </span>
              </div>
              <div className="flex items-center gap-2">
                {/* コミット列のビジュアル */}
                {[1, 2, 3, 4, 5].map((n) => (
                  <div
                    key={n}
                    className="w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                    style={{ borderColor: "#f472b6", backgroundColor: "rgba(244,114,182,0.1)" }}
                  >
                    <span className="text-[10px] font-mono" style={{ color: "#f9a8d4" }}>
                      {n}
                    </span>
                  </div>
                ))}
                <div className="flex-1 h-0.5" style={{ backgroundColor: "rgba(244,114,182,0.3)" }} />
                <ArrowRight className="w-4 h-4" style={{ color: "#f472b6" }} />
                <span className="text-xs" style={{ color: "#f9a8d4" }}>本番</span>
              </div>
            </div>
          </div>

          {/* feature ブランチ帯 */}
          <div className="space-y-2 mb-4">
            {[
              { name: "feature/login", merge: 2 },
              { name: "feature/dark-mode", merge: 4 },
            ].map((branch) => (
              <div
                key={branch.name}
                className="rounded-lg border px-4 py-3 flex items-center gap-3"
                style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
              >
                <GitBranch className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="text-xs font-mono text-gray-300">{branch.name}</span>
                <div className="flex-1 flex items-center gap-1">
                  <div className="flex-1 h-px border-t border-dashed" style={{ borderColor: "#4b5280" }} />
                  <GitMerge className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                  <span className="text-xs text-gray-500">PR {"→"} main にマージ</span>
                </div>
              </div>
            ))}
          </div>

          <div
            className="rounded-lg border p-3"
            style={{ backgroundColor: "rgba(244,114,182,0.05)", borderColor: "rgba(244,114,182,0.3)" }}
          >
            <p className="text-xs font-semibold" style={{ color: "#f9a8d4" }}>
              GitHub Flow の鉄則
            </p>
            <p className="text-sm text-gray-400 leading-relaxed mt-1">
              main は「いつでもデプロイできる状態」を保つ。feature ブランチで作業し、
              PR レビューを通過したら即マージ・即デプロイ。ブランチは細かく短命に保つ。
            </p>
          </div>
        </ConceptDiagram>

        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          GitHub Flow では全員が同じ main ブランチに向けて PR を出すため、開発者が増えると「まだ本番に出せない機能」が混ざる問題が起きます。
          これを解決するために、develop ブランチで開発と本番を分離する Git Flow が生まれました。
        </p>

        {/* ── 概念図B: Git Flow の5種ブランチ ── */}
        <ConceptDiagram
          title="概念図B"
          description="Git Flow: 5種のブランチが役割を持ち、安定した本番リリースを管理する"
        >
          <div className="space-y-2">
            {/* main */}
            <div
              className="rounded-lg border px-4 py-3 flex items-center gap-3"
              style={{ backgroundColor: "rgba(244,114,182,0.06)", borderColor: "rgba(244,114,182,0.4)" }}
            >
              <GitBranch className="w-4 h-4 flex-shrink-0" style={{ color: "#f472b6" }} />
              <div className="flex-1">
                <span className="text-sm font-bold" style={{ color: "#f9a8d4" }}>main</span>
                <span className="text-xs text-gray-400 ml-2">— 本番リリース済みのコードのみ存在する</span>
              </div>
              <span
                className="text-xs px-2 py-0.5 rounded-full border flex-shrink-0"
                style={{ backgroundColor: "rgba(244,114,182,0.1)", borderColor: "rgba(244,114,182,0.4)", color: "#f9a8d4" }}
              >
                本番
              </span>
            </div>

            {/* develop */}
            <div
              className="rounded-lg border px-4 py-3 flex items-center gap-3"
              style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
            >
              <GitBranch className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <div className="flex-1">
                <span className="text-sm font-bold text-blue-300">develop</span>
                <span className="text-xs text-gray-400 ml-2">— 開発の本流。全 feature はここにマージされる</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30 flex-shrink-0">
                開発基点
              </span>
            </div>

            {/* feature */}
            <div
              className="rounded-lg border px-4 py-3 flex items-center gap-3"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <GitBranch className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <div className="flex-1">
                <span className="text-sm font-bold text-gray-300">feature/*</span>
                <span className="text-xs text-gray-500 ml-2">— 機能開発。develop から分岐し develop にマージ</span>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <GitBranch className="w-3 h-3 text-gray-600" />
                <ArrowRight className="w-3 h-3 text-gray-600" />
                <span className="text-xs text-blue-400 font-mono">develop</span>
              </div>
            </div>

            {/* release */}
            <div
              className="rounded-lg border px-4 py-3 flex items-center gap-3"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <GitMerge className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <div className="flex-1">
                <span className="text-sm font-bold text-emerald-300">release/*</span>
                <span className="text-xs text-gray-500 ml-2">— リリース準備（QA・バージョン番号付け）</span>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <span className="text-xs" style={{ color: "#f9a8d4" }}>main</span>
                <span className="text-xs text-gray-500">&amp;</span>
                <span className="text-xs text-blue-400">develop</span>
              </div>
            </div>

            {/* hotfix */}
            <div
              className="rounded-lg border px-4 py-3 flex items-center gap-3"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <div className="flex-1">
                <span className="text-sm font-bold text-red-300">hotfix/*</span>
                <span className="text-xs text-gray-500 ml-2">— 本番緊急バグ修正。main から分岐</span>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <span className="text-xs" style={{ color: "#f9a8d4" }}>main</span>
                <span className="text-xs text-gray-500">&amp;</span>
                <span className="text-xs text-blue-400">develop</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            release と hotfix はどちらも main と develop の両方へマージする（同期を保つため）。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue ────────────────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "マスター、GitHub Flow と Git Flow ってどっちを使えばいいんですか？ 名前が似ていてもうこんがらがっています……",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "判断軸は2つです。「デプロイ頻度」と「チーム規模」。\n1日に何度もデプロイする小チームなら GitHub Flow。ブランチが2種類しかないので管理が楽です。\n逆に、月1回のバージョンリリースで大人数が並行開発するなら Git Flow。5種のブランチでリリースサイクルを安全に管理できます。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？ それなら……あの、Trunk-based Development ってたまに聞くんですけど、それはまた別の話ですか？",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "Trunk-based は「ブランチを極力作らず、全員が main（trunk）に直接またはごく小さい短命ブランチで頻繁にマージする」戦略です。\nキーになるのが「feature flag（機能フラグ）」という仕組み。未完成の機能をコードに混ぜ込みながら、フラグで表示・非表示を切り替えて本番リリースを制御します。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "feature flag ってことはコードの中に if 文が大量に……？ それ、複雑になりませんか？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "鋭い指摘です。そのとおり、フラグが増えると管理が大変になります。\nただし Trunk-based の現場では「フラグは完成したら必ず削除する」という文化が徹底されています。\n削除前提で書く技術負債の意識と、CI/CD が完全に整備されているチームが使う上級の戦略、と思ってください。個人開発には過剰です。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "なるほど！ 整理できてきました。\n個人や小チームなら GitHub Flow、大規模バージョン管理が必要なら Git Flow、CI/CD を極めたチームなら Trunk-based ……という感じですね。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "完璧なまとめです。最後に実践ポイントを一つ。\nチームに入ったときは「どのブランチが本番デプロイに繋がっているか」を真っ先に確認してください。\nそれさえ分かれば、間違ったブランチに push してデプロイが走ってしまう、という事故は防げます。",
          },
        ]}
      />

      {/* ── 比較表 ────────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["GitHub Flow", "Git Flow", "Trunk-based"]}
          rows={[
            {
              label: "ブランチ数",
              cells: ["少ない（main + feature/*）", "多い（5種類）", "最小（main のみ）"],
              highlightCol: 0,
            },
            {
              label: "デプロイ頻度",
              cells: ["高頻度（1日複数回も）", "低頻度（バージョン管理）", "超高頻度"],
              highlightCol: 0,
            },
            {
              label: "向いている状況",
              cells: [
                "個人〜小チーム・継続デプロイ",
                "大チーム・バージョン管理が必要",
                "CI/CD成熟チーム・大規模開発",
              ],
              highlightCol: 0,
            },
            {
              label: "複雑さ",
              cells: ["シンプル", "複雑だが構造的", "シンプルだが規律が必要"],
              highlightCol: 0,
            },
          ]}
          note="Vercel / Netlify を使う個人開発なら GitHub Flow が最もフィットする。まずここから始めよう。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下の内容は実務でよく使うが、最初はGitHub Flowを使えれば十分。"
      />

      {/* ── TermNote ──────────────────────────────────────── */}
      <TermNote
        terms={[
          {
            word: "trunk",
            definition:
              "Trunk-based Developmentにおける唯一のメインブランチ（main と同義）。木の幹（trunk）のように、全員の変更がここに集約される。",
          },
          {
            word: "feature flag",
            definition:
              "未完成の機能をコードに含めたまま、フラグ（ON/OFF スイッチ）で表示・非表示を切り替える手法。main に頻繁にマージしながら安全に機能開発を進められる。",
          },
          {
            word: "hotfix",
            definition:
              "本番環境の緊急バグ修正のためのブランチ。Git Flow では main から直接分岐し、修正後は main と develop の両方へマージする。",
          },
        ]}
      />

      {/* ── 応用編 CONCEPT DIAGRAMS ─────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — リリースサイクルと中間戦略
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          Git Flow のリリースサイクル全体の流れと、個人〜小チームでよく使われる
          staging ブランチを挟む中間的な戦略を確認しましょう。
        </p>

        {/* ── 概念図C: Git Flow リリースサイクル ── */}
        <ConceptDiagram
          title="概念図C"
          description="Git Flow のリリースサイクル: feature 開発から本番デプロイ・緊急対応まで"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 flex-wrap">
            <FlowCard
              Icon={GitBranch}
              title="feature/*"
              subtitle="機能開発"
            />
            <FlowArrow label="develop へ" direction="right" />
            <FlowCard
              Icon={Layers}
              title="develop"
              subtitle="開発の本流"
              highlight
              accentColor="pink"
            />
            <FlowArrow label="リリース準備" direction="right" />
            <FlowCard
              Icon={CheckCircle2}
              title="release/*"
              subtitle="QA・バージョン付け"
            />
            <FlowArrow label="本番へ" direction="right" />
            <FlowCard
              Icon={Rocket}
              title="main"
              subtitle="本番リリース"
              highlight
              accentColor="pink"
            />
          </div>

          {/* hotfix の流れ */}
          <div
            className="rounded-lg border mt-5 p-4"
            style={{ backgroundColor: "rgba(239,68,68,0.05)", borderColor: "rgba(239,68,68,0.3)" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <p className="text-xs font-semibold text-red-300">緊急バグ発生 — hotfix の流れ</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <FlowCard
                Icon={AlertTriangle}
                title="main"
                subtitle="本番でバグ発見"
              />
              <FlowArrow label="分岐" direction="right" />
              <FlowCard
                Icon={RefreshCw}
                title="hotfix/*"
                subtitle="緊急修正"
                highlight
                accentColor="pink"
              />
              <FlowArrow label="両方へ" direction="right" />
              <div className="flex flex-col gap-2">
                <div
                  className="rounded-lg border px-3 py-2 text-xs text-center"
                  style={{ backgroundColor: "rgba(244,114,182,0.08)", borderColor: "rgba(244,114,182,0.3)", color: "#f9a8d4" }}
                >
                  main（本番修正）
                </div>
                <div
                  className="rounded-lg border px-3 py-2 text-xs text-center"
                  style={{ backgroundColor: "#0f1117", borderColor: "#2d3048", color: "#93c5fd" }}
                >
                  develop（同期）
                </div>
              </div>
            </div>
          </div>
        </ConceptDiagram>

        <p className="text-sm text-gray-400 leading-relaxed my-5 px-1">
          Git Flow のフルサイクルを確認しました。次は個人や小チームでよく使われる、
          よりシンプルな中間的な戦略を見てみましょう。
        </p>

        {/* ── 概念図D: staging ブランチを挟む中間戦略 ── */}
        <ConceptDiagram
          title="概念図D"
          description="staging ブランチを挟む中間戦略: GitHub Flow に確認レイヤーを追加した構成"
        >
          <div className="space-y-3">
            {[
              {
                branch: "main",
                role: "本番環境（Vercel / Netlify の本番 URL）",
                note: "staging でのレビューが通ったコードのみ入る",
                color: "#f472b6",
                textColor: "#f9a8d4",
                bg: "rgba(244,114,182,0.06)",
                border: "rgba(244,114,182,0.4)",
              },
              {
                branch: "staging",
                role: "QA / プレビュー環境（確認用 URL）",
                note: "feature をここにマージして動作確認 → 問題なければ main へ",
                color: "#60a5fa",
                textColor: "#93c5fd",
                bg: "rgba(59,130,246,0.06)",
                border: "rgba(59,130,246,0.4)",
              },
              {
                branch: "feature/*",
                role: "機能開発ブランチ",
                note: "staging から分岐し、staging へ PR を出す",
                color: "#9ca3af",
                textColor: "#d1d5db",
                bg: "#0f1117",
                border: "#2d3048",
              },
            ].map((item) => (
              <div
                key={item.branch}
                className="rounded-xl border p-4"
                style={{ backgroundColor: item.bg, borderColor: item.border }}
              >
                <div className="flex items-start gap-3">
                  <GitBranch className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: item.color }} />
                  <div>
                    <p className="text-sm font-bold" style={{ color: item.textColor }}>
                      {item.branch}
                    </p>
                    <p className="text-xs text-gray-400 leading-relaxed mt-0.5">{item.role}</p>
                    <p className="text-xs text-gray-500 leading-relaxed mt-1">{item.note}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            3層構造にすることで「本番に変なコードが入る」リスクを staging で一度止められる。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── 詳細解説 ──────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="Vercel / Netlify と組み合わせた場合の推奨戦略">
          <p>
            Vercel や Netlify は<strong className="text-white"> main ブランチへの push をトリガーに本番デプロイ</strong>する設定が一般的。
            この仕組みと最も相性が良いのが GitHub Flow で、{" "}
            <strong className="text-white">feature ブランチで作業 → PR → main へマージ → 自動デプロイ</strong>{" "}
            という一本道で完結する。
          </p>
          <p>
            さらに Vercel は feature ブランチを push すると{" "}
            <strong className="text-white">プレビュー URL を自動発行</strong>してくれるため、
            マージ前の動作確認がブラウザ上でそのままできる。
            staging ブランチを別途用意しなくても、この機能がその代わりを担う。
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Rocket className="w-4 h-4" style={{ color: "#f472b6" }} />
                <p className="text-sm font-semibold" style={{ color: "#f9a8d4" }}>推奨フロー</p>
              </div>
              <ol className="text-xs text-gray-400 space-y-1.5 leading-relaxed list-decimal list-inside">
                <li>feature ブランチを切って作業する</li>
                <li>push するとプレビュー URL が発行される</li>
                <li>動作確認 + レビュー通過後に main へ PR</li>
                <li>マージで本番デプロイが自動実行される</li>
              </ol>
            </div>
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Flag className="w-4 h-4 text-amber-400" />
                <p className="text-sm font-semibold text-amber-300">注意点</p>
              </div>
              <ul className="text-xs text-gray-400 space-y-1.5 leading-relaxed">
                <li>main には「動く状態のコードのみ」入れる</li>
                <li>feature ブランチは小さく・短命に保つ</li>
                <li>長期ブランチはマージ時の衝突が増える</li>
              </ul>
            </div>
          </div>
          <CodeBlock
            title="GitHub Flow の典型的なコマンド例"
            language="bash"
            code={`# GitHub Flow の典型的な一連のコマンド
git switch -c feature/login    # feature ブランチを切る
git add . && git commit -m "feat: ログイン機能を追加"
git push -u origin feature/login   # push → Vercel がプレビュー URL を発行
# GitHub で PR 作成 → レビュー通過 → main へマージ → 本番デプロイ
git switch main && git pull        # main を最新に
git branch -d feature/login        # ローカルブランチ削除`}
          />
          <KeyPoint>
            Vercel + GitHub Flow の組み合わせは「プレビュー URL」が強力な武器になる。
            main を常に安全に保ちながら、PR ベースで確認してから本番に入れる運用が最もシンプル。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="チームに入ったときのブランチ戦略の確認ポイント">
          <p>
            既存プロジェクトに参加するときは、最初にブランチ戦略を把握しておかないと
            「意図せず本番にデプロイが走ってしまった」という事故が起きる。
          </p>
          <div className="space-y-3 mt-3">
            {[
              {
                Icon: GitBranch,
                title: "どのブランチが本番デプロイ先か",
                desc: "main か staging か。push しただけで本番に飛ぶブランチを最初に把握する。間違えると即本番事故。",
                color: "text-pink-400",
              },
              {
                Icon: GitPullRequest,
                title: "PR の粒度",
                desc: "1機能1PRか、細かく出すかはチームによって異なる。大きすぎるPRはレビューが通らない文化のチームもある。",
                color: "text-blue-400",
              },
              {
                Icon: Users,
                title: "ブランチ命名規則",
                desc: "feature/issue-123-xxx や fix/login-bug のようなプレフィックスルールが決まっていることが多い。先輩に確認するか CONTRIBUTING.md を読む。",
                color: "text-emerald-400",
              },
            ].map(({ Icon, title, desc, color }) => (
              <div
                key={title}
                className="rounded-lg border p-4 flex gap-3"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <Icon className={`w-4 h-4 ${color} flex-shrink-0 mt-0.5`} />
                <div>
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="text-sm text-gray-400 leading-relaxed mt-1">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <KeyPoint>
            「本番デプロイに繋がっているブランチ」の確認だけは絶対に先にやる。
            その他の規則は README や CONTRIBUTING.md に書かれていることが多い。
          </KeyPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/git/branch",
            title: "ブランチとマージの基本",
            description: "ブランチを切る・マージする・コンフリクトを解消する",
            icon: "GitBranch",
          },
          {
            href: "/git/pullrequest",
            title: "Pull Request の流れ",
            description: "PRの作り方・レビューの受け方・マージ戦略",
            icon: "GitPullRequest",
          },
          {
            href: "/git/rebase",
            title: "リベースとマージの違い",
            description: "履歴をきれいに保つ rebase と merge の使い分け",
            icon: "GitMerge",
          },
        ]}
      />

      <PageDrill questions={workflowQuestions} />
    </div>
  );
}
