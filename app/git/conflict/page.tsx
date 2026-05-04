import {
  GitMerge,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileWarning,
  ArrowRight,
  GitBranch,
  Scissors,
  RefreshCw,
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
import { DetailSection, DetailBlock, KeyPoint, WarningPoint } from "@/components/DetailSection";
import { CodeBlock } from "@/components/CodeBlock";
import { SectionDivider } from "@/components/SectionDivider";
import { TermNote } from "@/components/TermNote";
import { conflictQuestions } from "@/content/questions/git/conflict";

export const metadata = {
  title: "コンフリクト解消 | Web開発図解",
  description:
    "Gitのコンフリクトが発生する仕組みとコンフリクトマーカーの読み方、手動解消の手順を図解で解説。怖くないコンフリクト対応を1ページで習得する。",
};

export default function ConflictPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Hero
        category="Git"
        title="コンフリクト解消"
        subtitle={"Gitが「どちらを残すか自分では決められない」と判断した状態の解き方"}
        body={"コンフリクトマーカーの読み方から、解消してコミットするまでの手順を一気に習得する。"}
        accentColor="stone"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "コンフリクトがなぜ起きるか",
          "コンフリクトマーカーの読み方",
          "解消してコミットするまでの手順",
        ]}
        prerequisites={[
          "ブランチとマージの基本（git merge の使い方）",
          "git add / commit の操作",
        ]}
        outOfScope={[
          "ツールを使ったコンフリクト解消（VSCode / IntelliJ）の操作詳細",
          "rerere（再利用可能なコンフリクト解消記録）",
        ]}
      />

      <OnePageSummary
        keyMessage="コンフリクトはGitが「どちらを残すか自分では決められない」と知らせるサイン。怖くない。"
        metaphorTitle="同じノートの同じ行を2人が書き直した"
        metaphorPoints={[
          {
            label: "状況",
            real: "AさんとBさんが同じファイルの同じ行をそれぞれ別の内容に変更してしまった",
            metaphor: "2人が同じノートの同じ行を書き直した",
          },
          {
            label: "Gitの判断",
            real: "Gitはどちらを正とするか自分では決められないため、作業を止めて人間に判断を委ねる",
            metaphor: "どちらの書き直しが正しいか本人たちに決めてもらう",
          },
          {
            label: "解消方法",
            real: "コンフリクトマーカーで区切られた2つの変更を見比べ、最終的にどちら（または両方）を残すかを人間が決めて書き直す",
            metaphor: "2人が話し合って最終版を決める",
          },
        ]}
        definition="コンフリクト = 同じ箇所を複数ブランチが別々に変更した時、Gitが選択を人間に委ねる状態。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まず「なぜコンフリクトが起きるのか」を図で確認し、次に「コンフリクトマーカーの読み方」を見ていきましょう。
        </p>

        {/* ── 概念図1: コンフリクトが発生するシナリオ ── */}
        <ConceptDiagram
          title="概念図1"
          description="コンフリクトが発生するシナリオ — 同じ行を2人が別々に変更するとどうなるか？"
        >
          <div className="space-y-4">
            {/* ブランチの分岐 */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4 text-center">
                コンフリクト発生の流れ
              </p>
              <div className="space-y-3">
                {/* 共通の起点 */}
                <div className="flex justify-center">
                  <div
                    className="rounded-lg border px-4 py-2 text-xs text-center"
                    style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
                  >
                    <p className="text-gray-400 font-mono">README.md</p>
                    <p className="text-gray-500 mt-0.5">line3: <span className="text-gray-300">{"「共通の内容」"}</span></p>
                  </div>
                </div>

                {/* 分岐 */}
                <div className="flex items-start gap-3 justify-center">
                  <div className="flex flex-col items-center gap-2 flex-1 max-w-[200px]">
                    <div
                      className="w-0.5 h-4"
                      style={{ backgroundColor: "rgba(168,162,158,0.4)" }}
                    />
                    <div
                      className="rounded-lg border px-3 py-2 text-xs w-full text-center"
                      style={{ backgroundColor: "rgba(168,162,158,0.08)", borderColor: "rgba(168,162,158,0.4)" }}
                    >
                      <p className="text-stone-300 font-semibold mb-1">main ブランチ</p>
                      <p className="text-gray-400 font-mono text-[11px]">line3: <span className="text-stone-200">{"「Aさんの変更」"}</span></p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2 flex-1 max-w-[200px]">
                    <div
                      className="w-0.5 h-4"
                      style={{ backgroundColor: "rgba(168,162,158,0.4)" }}
                    />
                    <div
                      className="rounded-lg border px-3 py-2 text-xs w-full text-center"
                      style={{ backgroundColor: "rgba(168,162,158,0.06)", borderColor: "rgba(168,162,158,0.3)" }}
                    >
                      <p className="text-stone-400 font-semibold mb-1">feature ブランチ</p>
                      <p className="text-gray-400 font-mono text-[11px]">line3: <span className="text-stone-300">{"「Bさんの変更」"}</span></p>
                    </div>
                  </div>
                </div>

                {/* git merge 実行 */}
                <div className="flex justify-center">
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">git merge feature</p>
                    <div
                      className="rounded-lg border px-4 py-2 text-xs flex items-center gap-2"
                      style={{ backgroundColor: "rgba(239,68,68,0.08)", borderColor: "rgba(239,68,68,0.4)" }}
                    >
                      <AlertTriangle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                      <span className="text-red-300 font-semibold">CONFLICT — line3 の内容が衝突</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Gitは「どちらが正しいか」を決められない</p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="rounded-lg border p-3"
              style={{ backgroundColor: "rgba(168,162,158,0.05)", borderColor: "rgba(168,162,158,0.3)" }}
            >
              <p className="text-xs font-semibold text-stone-300 mb-1">コンフリクトが起きる条件</p>
              <p className="text-sm text-gray-300 leading-relaxed">
                2つのブランチが<span className="text-white font-semibold">同じファイルの同じ箇所</span>を別々に変更していた場合にのみ発生する。
                片方しか変更していない場合は自動でマージされる。
              </p>
            </div>
          </div>
        </ConceptDiagram>

        <p className="text-sm text-gray-400 leading-relaxed my-6 px-1">
          コンフリクトが発生すると、Gitはファイルに特殊な記号（マーカー）を自動挿入します。次はそのマーカーの読み方を確認しましょう。
        </p>

        {/* ── TermNote（コンフリクトマーカーの定義） ── */}
        <TermNote
          terms={[
            {
              word: "コンフリクトマーカー",
              definition:
                "`<<<<<<<` `=======` `>>>>>>>` の3つの記号。コンフリクトが起きた箇所にGitが自動挿入する。解消時にはこれらを含む区画全体を書き直して、マーカー行を必ず削除する。",
            },
          ]}
        />

        {/* ── 概念図2: コンフリクトマーカーの構造 ── */}
        <ConceptDiagram
          title="概念図2"
          description="コンフリクトマーカーの構造 — 3つの記号が「自分の変更」と「相手の変更」を区切る"
        >
          <div className="space-y-4">
            {/* マーカー図 */}
            <div
              className="rounded-xl border p-4 font-mono text-sm"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              {/* HEAD セクション */}
              <div
                className="rounded-t-lg border border-b-0 px-3 py-2"
                style={{ backgroundColor: "rgba(168,162,158,0.10)", borderColor: "rgba(168,162,158,0.5)" }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-stone-300 font-bold">{"<<<<<<< HEAD"}</span>
                  <span
                    className="text-[11px] px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: "rgba(168,162,158,0.15)", color: "#a8a29e" }}
                  >
                    自分のブランチ（現在チェックアウト中）
                  </span>
                </div>
                <p className="text-gray-300 text-xs">Aさんが書いた内容</p>
              </div>

              {/* セパレータ */}
              <div
                className="border-x border-y px-3 py-1.5"
                style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
              >
                <span className="text-yellow-400 font-bold">{"======="}</span>
                <span className="text-gray-600 text-xs ml-3">← ここが境界線</span>
              </div>

              {/* feature セクション */}
              <div
                className="rounded-b-lg border border-t-0 px-3 py-2"
                style={{ backgroundColor: "rgba(99,102,241,0.08)", borderColor: "rgba(99,102,241,0.35)" }}
              >
                <p className="text-indigo-300 text-xs">Bさんが書いた内容（取り込もうとしているブランチ）</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-indigo-400 font-bold">{">>>>>>> feature/xxx"}</span>
                  <span
                    className="text-[11px] px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: "rgba(99,102,241,0.12)", color: "#a5b4fc" }}
                  >
                    取り込むブランチ名
                  </span>
                </div>
              </div>
            </div>

            {/* 凡例 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div
                className="rounded-lg border p-3 text-center"
                style={{ backgroundColor: "rgba(168,162,158,0.07)", borderColor: "rgba(168,162,158,0.35)" }}
              >
                <p className="text-stone-300 font-mono font-bold text-xs mb-1">{"<<<<<<< HEAD"}</p>
                <p className="text-xs text-gray-400 leading-relaxed">自分のブランチの変更の始まり</p>
              </div>
              <div
                className="rounded-lg border p-3 text-center"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <p className="text-yellow-400 font-mono font-bold text-xs mb-1">{"======="}</p>
                <p className="text-xs text-gray-400 leading-relaxed">2つの変更の境界線</p>
              </div>
              <div
                className="rounded-lg border p-3 text-center"
                style={{ backgroundColor: "rgba(99,102,241,0.07)", borderColor: "rgba(99,102,241,0.3)" }}
              >
                <p className="text-indigo-400 font-mono font-bold text-xs mb-1">{">>>>>>> branch"}</p>
                <p className="text-xs text-gray-400 leading-relaxed">取り込むブランチの変更の終わり</p>
              </div>
            </div>

            <div
              className="rounded-lg border p-3"
              style={{ backgroundColor: "rgba(168,162,158,0.06)", borderColor: "rgba(168,162,158,0.3)" }}
            >
              <p className="text-xs font-semibold text-stone-300 mb-1">解消のルール</p>
              <p className="text-sm text-gray-300 leading-relaxed">
                3つのマーカー行を含む区画全体を<span className="text-white font-semibold">好きなように書き直してよい</span>。
                Aさんの内容を採用・Bさんの内容を採用・両方を合わせる・全部書き直す、どれでも自由。
              </p>
            </div>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue ────────────────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "worried",
            text: "マスター……コンフリクトが出たんですけど、怖くてどうすればいいか分からなくて。何をやっても壊れそうで手が出せないです。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "大丈夫です、マジさん。コンフリクトはGitが「2つの変更のどちらを残すか、私には決められません。判断をお願いします」と伝えているだけです。\n壊れたわけでもなく、怒っているわけでもありません。むしろ丁寧に「ここが衝突していますよ」と教えてくれているサインです。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジですか……。じゃあファイルに出てくる `<<<<<<<` とか `=======` とか `>>>>>>>` って何なんですか？ 呪文みたいで読み方が全然分からなくて。",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "これが「コンフリクトマーカー」です。3つの記号で区画を区切っています。\n`<<<<<<< HEAD` から `=======` が自分のブランチの内容、`=======` から `>>>>>>> ブランチ名` が取り込もうとしているブランチの内容です。\n2つのレシピが同じページに並んでいて、どちらを採用するか選んでね、という状態ですね。",
          },
          {
            speaker: "maji",
            emotion: "doubt",
            text: "なるほど……。じゃあ解消するときって、マーカーを全部消して自分で書き直していいんですか？ 何か決まったコマンドがあるのかと思っていたんですが。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "正解です。マーカー行を含む区画全体を自分で書き直すだけです。\nAさんの内容を残してもいい、Bさんの内容を残してもいい、両方の内容を合わせてもいい。全部消して新しく書いてもいい。判断はあなたがする、というのがコンフリクト解消の本質です。\n「`<<<<<<< HEAD` が消えていないのに気づかずコミットする」というのが最大の落とし穴なので、そこだけ注意してください。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "分かりました！ 書き直したあとは `git add` して `git commit` でいいですか？",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "その通りです。流れは「ファイルを編集してマーカーを全て消す → `git add <ファイル>` → `git commit`」の3ステップです。\nただしrebaseの途中でコンフリクトが起きた場合は、コミットの代わりに `git rebase --continue` を使います。状況によってコマンドが変わるので、`git status` で現在の状態を確認してから進むと迷いません。",
          },
        ]}
      />

      {/* ── 比較表 ──────────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["コマンド", "説明"]}
          rows={[
            {
              label: "解消後に続行（merge）",
              cells: [
                "git commit",
                "マージコミットを作成して完了",
              ],
              highlightCol: 0,
            },
            {
              label: "解消後に続行（rebase）",
              cells: [
                "git rebase --continue",
                "次のコミットへ進む",
              ],
              highlightCol: 0,
            },
            {
              label: "解消後に続行（cherry-pick）",
              cells: [
                "git cherry-pick --continue",
                "cherry-pick を続行",
              ],
              highlightCol: 0,
            },
            {
              label: "中断（merge）",
              cells: [
                "git merge --abort",
                "マージ前の状態に完全に戻す",
              ],
              highlightCol: 0,
            },
            {
              label: "中断（rebase）",
              cells: [
                "git rebase --abort",
                "rebase前の状態に完全に戻す",
              ],
              highlightCol: 0,
            },
          ]}
          note="共通パターン: 解消後は --continue で続行、やめたいときは --abort で中断。git status を見ながら進めると迷いにくい。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下はコンフリクト解消の完全なフローと、VSCodeのUI概念・ours/theirsの使い分けについての内容です。"
      />

      {/* ── TermNote ────────────────────────────────────────── */}
      <TermNote
        terms={[
          {
            word: "ours / theirs",
            definition:
              "mergeとrebaseで意味が逆になる紛らわしい用語。merge では HEAD 側（今いるブランチ）が ours、rebase では元のコミット列（rebase される側）が ours になる。",
          },
          {
            word: "git mergetool",
            definition:
              "コンフリクト解消専用のGUIツール（vimdiff や VSCode など）を起動するコマンド。`.gitconfig` で使用ツールを設定しておくと、コンフリクトファイルを自動で開いてくれる。",
          },
        ]}
      />

      {/* ── 応用編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — 解消フローと VSCode UI
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          コンフリクト解消の完全な手順フローと、VSCode のコンフリクト解消 UI の概念を確認しましょう。
        </p>

        {/* ── 概念図3: 解消の完全フロー ── */}
        <ConceptDiagram
          title="概念図3"
          description="コンフリクト解消の完全な手順フロー — git status 確認から commit まで"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 flex-wrap">
            <FlowCard
              Icon={FileWarning}
              title="git status"
              subtitle="コンフリクト中のファイルを確認"
            />
            <FlowArrow label="確認" direction="right" />
            <FlowCard
              Icon={Scissors}
              title="エディタで解消"
              subtitle="マーカーを削除して内容を確定"
              highlight
              accentColor="stone"
            />
            <FlowArrow label="保存" direction="right" />
            <FlowCard
              Icon={CheckCircle2}
              title="git add"
              subtitle="解消済みとしてステージング"
            />
            <FlowArrow label="次へ" direction="right" />
            <FlowCard
              Icon={GitMerge}
              title="git commit"
              subtitle="または --continue"
            />
          </div>
          <div
            className="rounded-lg border mt-5 p-3"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-xs font-semibold text-gray-400 mb-2">状況別の最終コマンド</p>
            <div className="space-y-1.5 font-mono text-xs">
              <div className="flex items-center gap-3">
                <span className="text-stone-400 w-32 flex-shrink-0">merge の場合</span>
                <span className="text-gray-300">git commit</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-stone-400 w-32 flex-shrink-0">rebase の場合</span>
                <span className="text-gray-300">git rebase --continue</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-stone-400 w-32 flex-shrink-0">cherry-pick の場合</span>
                <span className="text-gray-300">git cherry-pick --continue</span>
              </div>
            </div>
          </div>
        </ConceptDiagram>

        <p className="text-sm text-gray-400 leading-relaxed my-6 px-1">
          手動での解消手順が分かりました。次は VSCode などのエディタが提供するコンフリクト解消 UI の概念を見てみましょう。
        </p>

        {/* ── 概念図4: VSCode コンフリクト解消UI ── */}
        <ConceptDiagram
          title="概念図4"
          description="VSCode のコンフリクト解消 UI — 3択ボタンでどちらの変更を採用するか選べる"
        >
          <div className="space-y-4">
            {/* VSCode UI 模擬 */}
            <div
              className="rounded-xl border overflow-hidden"
              style={{ borderColor: "#2d3048" }}
            >
              {/* タイトルバー */}
              <div
                className="px-4 py-2 flex items-center gap-2"
                style={{ backgroundColor: "#1a1d2a", borderBottom: "1px solid #2d3048" }}
              >
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <span className="text-xs text-gray-500 ml-2">README.md</span>
                <span
                  className="ml-auto text-[11px] px-1.5 py-0.5 rounded"
                  style={{ backgroundColor: "rgba(239,68,68,0.12)", color: "#f87171" }}
                >
                  CONFLICT
                </span>
              </div>

              {/* HEAD セクション */}
              <div
                className="px-4 pt-3 pb-1"
                style={{ backgroundColor: "rgba(168,162,158,0.07)" }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] text-stone-400 font-mono">{"<<<<<<< HEAD (Current Change)"}</span>
                  <div className="flex gap-1">
                    <button
                      className="text-[11px] px-2 py-0.5 rounded border"
                      style={{ backgroundColor: "rgba(168,162,158,0.12)", borderColor: "rgba(168,162,158,0.4)", color: "#a8a29e" }}
                    >
                      Accept Current Change
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-300 font-mono pl-2">Aさんが書いた内容</p>
              </div>

              {/* セパレータ */}
              <div
                className="px-4 py-1"
                style={{ backgroundColor: "#0f1117" }}
              >
                <span className="text-[11px] text-yellow-600 font-mono">{"======="}</span>
              </div>

              {/* Incoming セクション */}
              <div
                className="px-4 pt-1 pb-3"
                style={{ backgroundColor: "rgba(99,102,241,0.07)" }}
              >
                <p className="text-xs text-gray-300 font-mono pl-2 mb-2">Bさんが書いた内容</p>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-indigo-400 font-mono">{">>>>>>> feature/xxx (Incoming Change)"}</span>
                  <button
                    className="text-[11px] px-2 py-0.5 rounded border"
                    style={{ backgroundColor: "rgba(99,102,241,0.12)", borderColor: "rgba(99,102,241,0.4)", color: "#a5b4fc" }}
                  >
                    Accept Incoming Change
                  </button>
                </div>
              </div>
            </div>

            {/* 3択の説明 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div
                className="rounded-lg border p-3"
                style={{ backgroundColor: "rgba(168,162,158,0.07)", borderColor: "rgba(168,162,158,0.35)" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-stone-400 flex-shrink-0" />
                  <p className="text-xs font-semibold text-stone-300">Accept Current</p>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  HEAD側（自分のブランチ）の変更を採用。相手の変更は破棄。
                </p>
              </div>
              <div
                className="rounded-lg border p-3"
                style={{ backgroundColor: "rgba(99,102,241,0.07)", borderColor: "rgba(99,102,241,0.3)" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <ArrowRight className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <p className="text-xs font-semibold text-indigo-300">Accept Incoming</p>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  取り込むブランチの変更を採用。自分の変更は破棄。
                </p>
              </div>
              <div
                className="rounded-lg border p-3"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <RefreshCw className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <p className="text-xs font-semibold text-gray-300">Accept Both</p>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  両方の変更を残す。手動で順序を整えることが多い。
                </p>
              </div>
            </div>

            <div
              className="rounded-lg border p-3"
              style={{ backgroundColor: "rgba(168,162,158,0.05)", borderColor: "rgba(168,162,158,0.25)" }}
            >
              <p className="text-xs font-semibold text-stone-300 mb-1">手動解消との違い</p>
              <p className="text-xs text-gray-400 leading-relaxed">
                VSCode の UI はマーカーを手動で消す作業を視覚的に補助するものです。内部でやっていることは同じ（マーカーを削除して最終内容を決める）なので、UI のボタンが使えない状況でも手動で対応できます。
              </p>
            </div>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── 詳細解説 ────────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="コンフリクト解消の手順（コマンド）">
          <p>
            コンフリクトが発生してから解消・続行するまでの典型的なコマンド手順。
          </p>
          <CodeBlock
            title="コンフリクト解消フロー"
            language="bash"
            code={`# 1. コンフリクト中のファイルを確認
git status

# 2. エディタで <<<<<<< / ======= / >>>>>>> マーカーを消して正しい内容に書き直す

# 3. 解消済みのファイルをステージに上げる
git add README.md

# 4a. merge 中の場合
git commit

# 4b. rebase 中の場合
git rebase --continue

# 4c. 中断したい場合
git merge --abort   # または git rebase --abort`}
          />
        </DetailBlock>

        <DetailBlock heading="コンフリクトを減らすための習慣">
          <p>
            コンフリクトは避けることはできないが、頻度を減らすことはできる。以下の習慣が有効。
          </p>
          <div className="space-y-3 mt-2">
            <div
              className="rounded-lg border p-3"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-start gap-3">
                <GitBranch className="w-4 h-4 text-stone-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-white mb-1">こまめに main を pull する</p>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    自分のブランチが main から大きく乖離するほど、コンフリクトが起きたときの解消コストが大きくなる。
                    作業前・作業中に定期的に <code className="text-xs px-1 py-0.5 rounded font-mono" style={{ backgroundColor: "#1a1d2a", color: "#a8a29e" }}>git pull origin main</code> して差分を小さく保つ。
                  </p>
                </div>
              </div>
            </div>
            <div
              className="rounded-lg border p-3"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-start gap-3">
                <Scissors className="w-4 h-4 text-stone-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-white mb-1">PR を小さく保つ（1機能1PR）</p>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    大きな変更を1つの PR にまとめると、他の人の変更と衝突する確率が上がる。
                    機能を小さく分割して頻繁にマージすることで、コンフリクトの規模を小さくできる。
                  </p>
                </div>
              </div>
            </div>
            <div
              className="rounded-lg border p-3"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-stone-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-white mb-1">同じファイルを複数人が同時に触らない設計</p>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    責任範囲を明確に分けてファイルを担当制にするか、ファイルを細かく分割する設計にすると
                    物理的にコンフリクトが起きにくくなる。
                  </p>
                </div>
              </div>
            </div>
          </div>
          <KeyPoint>
            コンフリクトを恐れるより「こまめにマージして差分を小さく保つ」習慣の方が解決策として効果的。コンフリクトが起きたら「差分が蓄積していたサイン」と受け取る。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="マーカー消し忘れによるバグ">
          <p>
            コンフリクト解消の最も多い失敗は、<span className="text-white font-semibold">マーカーを残したままコミットすること</span>。
            コードの中に <code className="text-xs px-1 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#f87171" }}>{"<<<<<<<  HEAD"}</code> という
            文字列がそのまま入った状態でコミット・デプロイされると、その部分でエラーが発生する。
          </p>
          <WarningPoint>
            マーカーを消し忘れてコミットすると、{"<<<<<<<"}、{"======="}、{">>>>>>>"} という記号がコードに残り、本番環境でエラーやバグになる。コミット前に必ず <code className="text-xs px-1 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#fcd34d" }}>git diff --staged</code> でステージングの内容を確認する習慣をつけること。
          </WarningPoint>
          <p>
            ESLint や CI の lint チェックでマーカー残留を検出できる設定もある。
            チーム開発では事前に設定しておくと安全ネットになる。
          </p>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/git/branch",
            title: "ブランチとマージ",
            description: "コンフリクトが起きる前提となるブランチの仕組み",
            icon: "GitBranch",
          },
          {
            href: "/git/pullrequest",
            title: "プルリクエスト",
            description: "チーム開発でコンフリクトを解消するフロー",
            icon: "GitPullRequest",
          },
          {
            href: "/git/cherry-pick",
            title: "cherry-pick",
            description: "cherry-pick中のコンフリクト解消はまたひと癖ある",
            icon: "GitCommit",
          },
        ]}
      />

      <PageDrill questions={conflictQuestions} />
    </div>
  );
}
