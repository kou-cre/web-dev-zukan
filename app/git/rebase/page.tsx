import {
  GitCommit,
  GitMerge,
  TriangleAlert,
  CheckCircle,
  Pencil,
  Trash2,
  Users,
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
import { SectionDivider } from "@/components/SectionDivider";
import { TermNote } from "@/components/TermNote";
import { rebaseQuestions } from "@/content/questions/git/rebase";

export const metadata = {
  title: "rebase -i（履歴整形）| Web開発図解",
  description:
    "git rebase -i（interactive rebase）でコミット履歴を整形する方法と、使ってはいけない場面を1ページで理解する。squash / reword / drop の使い方から force push の危険性まで。",
};

export default function RebasePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Hero
        category="Git"
        title="rebase -i（履歴整形）"
        subtitle={"コミット履歴を「提出前の原稿」のように整形するインタラクティブモード"}
        body={"squash / reword / drop の使い方と、絶対にやってはいけない場面を把握する。"}
        accentColor="fuchsia"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "rebase -i でできること（squash / reword / drop）",
          "使ってよい場面と絶対NGな場面の違い",
          "PR前の履歴整形の手順",
        ]}
        prerequisites={[
          "git commit の概念",
          "ブランチとマージの基本",
          "コミットハッシュの概念",
        ]}
        outOfScope={[
          "reflog を使った復旧",
          "コンフリクト解消の詳細手順（詳細は conflict ページ）",
        ]}
      />

      {/* ── TermNote（基礎用語：SHA / HEAD~3 を概念図Aより先に提示）── */}
      <TermNote
        terms={[
          {
            word: "SHA / ハッシュ",
            definition:
              "コミットを一意に識別する文字列（例: abc1234）。コミットの内容・メッセージ・日時などから算出される。内容を少しでも変えると全く別のSHAになる。",
          },
          {
            word: "HEAD~3",
            definition:
              "HEADから3つ前のコミットを指す表記。`git rebase -i HEAD~3` で直近3コミットを整形対象にできる。`HEAD~1` は1つ前（= 直前のコミット）。",
          },
          {
            word: "force push",
            definition:
              "リモートの履歴を上書きするpush（--force または --force-with-lease）。rebase後に自分のブランチを更新するために使うが、共有ブランチで使うと他人の履歴が壊れる。",
          },
        ]}
      />

      <OnePageSummary
        keyMessage="rebase -i は歴史の書き換え。自分だけのブランチでのみ使う。"
        metaphorTitle="提出前の原稿を見直す作業"
        metaphorPoints={[
          {
            label: "Before",
            real: "wip・fix typo・add loginなど、書きながら積み上げた荒削りなコミット群がある",
            metaphor: "赤ペン入れ前の下書き",
          },
          {
            label: "rebase -i",
            real: "squash でまとめ・reword でメッセージ修正・drop で不要なコミットを削除する",
            metaphor: "提出前の赤ペン校正",
          },
          {
            label: "After",
            real: "「feat: ログイン機能を追加」1コミットに整形された、意味の通る履歴になる",
            metaphor: "清書済みの提出原稿",
          },
          {
            label: "禁止",
            real: "提出済み（共有ブランチ・push済み）の原稿を後から書き換えると全員が混乱する",
            metaphor: "提出済み原稿を書き換える行為",
          },
        ]}
        definition="rebase -i = 過去のコミットを並び替え・まとめ・修正できるインタラクティブな履歴編集モード。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まずは「squash でコミットを1つにまとめる前後」を図で確認しましょう。
        </p>

        {/* ── 概念図A: squash の前後比較 ── */}
        <ConceptDiagram
          title="概念図A"
          description="squash — 複数のコミットを1つの意味ある単位にまとめる"
        >
          <div className="space-y-6">
            {/* Before */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 text-center">
                Before（整形前）
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <div
                  className="rounded-lg border px-3 py-2 text-center"
                  style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
                >
                  <GitCommit className="w-4 h-4 text-gray-500 mx-auto mb-1" />
                  <p className="text-xs font-mono text-gray-400">abc1234</p>
                  <p className="text-xs text-gray-500 mt-1">"wip"</p>
                </div>
                <FlowArrow label="" direction="right" />
                <div
                  className="rounded-lg border px-3 py-2 text-center"
                  style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
                >
                  <GitCommit className="w-4 h-4 text-gray-500 mx-auto mb-1" />
                  <p className="text-xs font-mono text-gray-400">def5678</p>
                  <p className="text-xs text-gray-500 mt-1">"fix typo"</p>
                </div>
                <FlowArrow label="" direction="right" />
                <div
                  className="rounded-lg border px-3 py-2 text-center"
                  style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
                >
                  <GitCommit className="w-4 h-4 text-gray-500 mx-auto mb-1" />
                  <p className="text-xs font-mono text-gray-400">ghi9012</p>
                  <p className="text-xs text-gray-500 mt-1">"add login"</p>
                </div>
              </div>
            </div>

            {/* Arrow down */}
            <div className="flex items-center justify-center gap-2">
              <div
                className="rounded-full border px-3 py-1 text-xs"
                style={{
                  borderColor: "rgba(232,121,249,0.4)",
                  backgroundColor: "rgba(232,121,249,0.06)",
                  color: "#e879f9",
                }}
              >
                git rebase -i HEAD~3 → squash
              </div>
            </div>

            {/* After */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 text-center">
                After（整形後）
              </p>
              <div className="flex items-center justify-center">
                <div
                  className="rounded-lg border px-4 py-3 text-center"
                  style={{
                    backgroundColor: "rgba(232,121,249,0.06)",
                    borderColor: "rgba(232,121,249,0.4)",
                  }}
                >
                  <GitCommit className="w-5 h-5 text-fuchsia-400 mx-auto mb-1" />
                  <p className="text-xs font-mono text-fuchsia-300">xyz3456</p>
                  <p className="text-sm text-white mt-1 font-medium">
                    "feat: ログイン機能を追加"
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            3つのコミットが1つにまとまり、意味の通るメッセージになった。SHA（ハッシュ）は変わっている点に注意。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          squashの仕組みが分かりました。次は rebase -i で使える全コマンドを一覧で確認します。
        </p>

        {/* ── 概念図B: コマンド一覧カード（頻出4コマンド）── */}
        <ConceptDiagram
          title="概念図B"
          description="まず覚える頻出4コマンド — squash / reword / fixup / drop"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* squash */}
            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "rgba(232,121,249,0.06)",
                borderColor: "rgba(232,121,249,0.4)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <GitMerge className="w-4 h-4 text-fuchsia-400" />
                <p className="text-sm font-bold text-white font-mono">squash</p>
                <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/30">
                  統合
                </span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                1つ前のコミットに統合する。メッセージはエディタで選べる。
              </p>
            </div>

            {/* reword */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Pencil className="w-4 h-4 text-blue-400" />
                <p className="text-sm font-bold text-white font-mono">reword</p>
                <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30">
                  メッセージ変更
                </span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                コミットの変更内容はそのまま、メッセージだけを書き直す。typo修正に便利。
              </p>
            </div>

            {/* fixup */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <GitMerge className="w-4 h-4 text-purple-400" />
                <p className="text-sm font-bold text-white font-mono">fixup</p>
                <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
                  統合（メッセージ破棄）
                </span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                squash と同じく前のコミットに統合するが、このコミットのメッセージは自動で破棄される。
              </p>
            </div>

            {/* drop */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Trash2 className="w-4 h-4 text-red-400" />
                <p className="text-sm font-bold text-white font-mono">drop</p>
                <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-red-500/15 text-red-300 border border-red-500/30">
                  削除
                </span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                コミットを完全に削除する。間違ってコミットした内容ごと消したいときに使う。
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            他にも <span className="font-mono">pick</span>（そのまま残す・デフォルト）と <span className="font-mono">edit</span>（一時停止してコードを修正）があるが、慣れてから覚えれば十分。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue ────────────────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "マスター、実はずっと気になっていたんですが……ボクのコミット履歴、「wip」とか「fix typo」とか「あれ直した」みたいなのが大量に積み重なっていて、すごく恥ずかしいんです。PRを出すときにレビュアーに見られたら……。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "それは `git rebase -i` で整形できますよ、マジさん。インタラクティブ・リベースといって、過去のコミットをまとめたり、メッセージを書き直したり、不要なコミットを消したりできるモードです。\n提出前の原稿を赤ペンで校正するイメージですね。`git rebase -i HEAD~3` とすれば、直近3コミットをエディタで編集できます。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジですか！ じゃあすぐに main ブランチでも使ってみます！……あ、でも待って。「共有ブランチでやったら絶対ダメ」って何かで読んだ気がするんですが、それはなぜなんでしょう？",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "良い直感です。これがrebaseの一番大事なルールです。\nコミットはSHA（ハッシュ）という一意の番号で管理されています。rebase -i でコミットを書き換えると、内容が同じでもSHAが変わる。つまり「別のコミット」として扱われるのです。\n他の人はリモートの古いSHAを元にした状態で作業しているため、リモートが差し替わると「自分のブランチはどこが先端なんだ？」と履歴が壊れてしまいます。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "ということは……他の人のコミットが消えてしまうこともある、ということですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "最悪の場合はそうなります。force push でリモートを上書きすると、他の人がpushした内容が見えなくなってしまうこともあります。\n例えて言えば、会社でみんなで書いた共有の報告書を、誰にも言わず一人で書き直して提出してしまうようなものですね。残りのメンバーは「あれ、自分が書いたページが消えた？」となってしまいます。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "なるほど、それは大惨事ですね……。では rebase -i が使えるのは、自分しかいないブランチだけ、ということですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "正確には「自分しか触っていないブランチ」です。PRを出す前のフィーチャーブランチや、自分専用のブランチなら問題ありません。\nPRを出す前に履歴を整形して `git push --force-with-lease` でプッシュする、というのが定番の流れです。\n`--force-with-lease` は通常の `--force` より安全で、自分の知らないうちに誰かがリモートを更新していた場合にエラーを出してくれます。共有ブランチへは絶対に使わないようにしましょう。\nmain / develop など、チームで共有しているブランチでは rebase -i を使わない。この一点を守れば rebase -i は強力な武器になりますよ。",
          },
        ]}
      />

      {/* ── 比較表 ────────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["pick", "reword", "squash", "fixup", "drop", "edit"]}
          rows={[
            {
              label: "動き",
              cells: [
                "コミットをそのまま残す",
                "コミットをそのまま残す",
                "前のコミットに統合する",
                "前のコミットに統合する",
                "コミットを削除する",
                "一時停止して編集後に続行",
              ],
              highlightCol: 2,
            },
            {
              label: "メッセージ",
              cells: [
                "そのまま引き継ぐ",
                "エディタで変更できる",
                "エディタで選んで編集",
                "このコミットのメッセージは破棄",
                "消える",
                "エディタで変更できる",
              ],
              highlightCol: 2,
            },
          ]}
          note="squash と fixup の違いは「統合後にメッセージを選べるかどうか」だけ。fixup はより素早くまとめたいときに使う。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下は「なぜ共有ブランチで使ってはいけないのか」の詳細図と、rebase origin/main の活用法です。"
      />

      {/* ── 応用編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — 危険なパターンと安全な使い方
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          共有ブランチで rebase -i を使うと何が起きるか、そして安全に使う場面を図で確認します。
        </p>

        {/* ── 概念図C: 絶対にやってはいけない図 ── */}
        <ConceptDiagram
          title="概念図C"
          description="共有ブランチに rebase -i + force push → 全員の履歴が壊れる"
        >
          <div className="space-y-4">
            {/* Step 1: Before */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                リモートの main（共有）
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <div className="rounded border px-2 py-1.5 text-center" style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}>
                  <p className="text-xs font-mono text-gray-300">A</p>
                  <p className="text-[10px] text-gray-500">initial</p>
                </div>
                <FlowArrow label="" direction="right" />
                <div className="rounded border px-2 py-1.5 text-center" style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}>
                  <p className="text-xs font-mono text-gray-300">B</p>
                  <p className="text-[10px] text-gray-500">Alice追加</p>
                </div>
                <FlowArrow label="" direction="right" />
                <div className="rounded border px-2 py-1.5 text-center" style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}>
                  <p className="text-xs font-mono text-gray-300">C</p>
                  <p className="text-[10px] text-gray-500">Bob追加</p>
                </div>
                <FlowArrow label="" direction="right" />
                <div
                  className="rounded border px-2 py-1.5 text-center"
                  style={{ backgroundColor: "rgba(232,121,249,0.06)", borderColor: "rgba(232,121,249,0.4)" }}
                >
                  <p className="text-xs font-mono text-fuchsia-300">D</p>
                  <p className="text-[10px] text-fuchsia-400">あなたの追加</p>
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="flex items-center gap-3">
              <div
                className="rounded-lg border px-3 py-2 flex-1 flex items-start gap-2"
                style={{ backgroundColor: "rgba(239,68,68,0.06)", borderColor: "rgba(239,68,68,0.4)" }}
              >
                <TriangleAlert className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-red-300 leading-relaxed">
                  あなたが main に対して rebase -i を実行 → コミットD が D&#39; に書き換わる → git push --force で上書き
                </p>
              </div>
            </div>

            {/* After */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "rgba(239,68,68,0.04)", borderColor: "rgba(239,68,68,0.3)" }}
            >
              <p className="text-xs font-semibold text-red-400 uppercase tracking-wide mb-3">
                force push 後のリモート
              </p>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <div className="rounded border px-2 py-1.5 text-center" style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}>
                  <p className="text-xs font-mono text-gray-300">A</p>
                </div>
                <FlowArrow label="" direction="right" />
                <div className="rounded border px-2 py-1.5 text-center" style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}>
                  <p className="text-xs font-mono text-gray-300">B</p>
                </div>
                <FlowArrow label="" direction="right" />
                <div
                  className="rounded border px-2 py-1.5 text-center"
                  style={{ backgroundColor: "rgba(232,121,249,0.06)", borderColor: "rgba(232,121,249,0.4)" }}
                >
                  <p className="text-xs font-mono text-fuchsia-300">D&#39;</p>
                  <p className="text-[10px] text-fuchsia-400">書き換え済み</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-red-300">
                  C（Bobのコミット）が消えた
                </p>
                <p className="text-xs text-red-300">
                  AliceもBobも「リモートと自分のローカルが合わない」エラーになる
                </p>
              </div>
            </div>

            {/* Users affected */}
            <div className="grid grid-cols-2 gap-3">
              <div
                className="rounded-lg border p-3 flex items-start gap-2"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <Users className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-red-300 mb-1">Alice・Bobの状況</p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    ローカルに C があるが、リモートには C がない。git pull しようとするとコンフリクト or エラー。
                  </p>
                </div>
              </div>
              <div
                className="rounded-lg border p-3"
                style={{ backgroundColor: "rgba(239,68,68,0.04)", borderColor: "rgba(239,68,68,0.3)" }}
              >
                <p className="text-xs font-semibold text-red-400 mb-1">結果</p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  チーム全員が作業を止めて、壊れた履歴の修復対応が必要になる。
                </p>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            共有ブランチへの rebase -i + force push は「絶対禁止」。自分のフィーチャーブランチでのみ使う。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          危険なパターンが分かりました。次は安全な使い方として、main の最新をフィーチャーブランチに取り込む通常 rebase の図も確認しましょう。
        </p>

        {/* ── 概念図D: git rebase origin/main の図 ── */}
        <ConceptDiagram
          title="概念図D"
          description="git rebase origin/main — mainの最新をfeatureブランチに取り込みながら一本線にする"
        >
          <div className="space-y-5">
            {/* Before */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                Before — ブランチが分岐している状態
              </p>
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-gray-500 w-20">main</span>
                  <div className="rounded border px-2 py-1 text-xs font-mono text-gray-300" style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}>M1</div>
                  <FlowArrow label="" direction="right" />
                  <div className="rounded border px-2 py-1 text-xs font-mono text-gray-300" style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}>M2</div>
                  <FlowArrow label="" direction="right" />
                  <div className="rounded border px-2 py-1 text-xs font-mono text-gray-300" style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}>M3</div>
                  <span className="text-xs text-gray-500 ml-1">← mainが先に進んでいる</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-gray-500 w-20">feature</span>
                  <div className="rounded border px-2 py-1 text-xs font-mono text-gray-300" style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}>M1</div>
                  <FlowArrow label="" direction="right" />
                  <div className="rounded border px-2 py-1 text-xs font-mono text-fuchsia-300" style={{ backgroundColor: "rgba(232,121,249,0.06)", borderColor: "rgba(232,121,249,0.3)" }}>F1</div>
                  <FlowArrow label="" direction="right" />
                  <div className="rounded border px-2 py-1 text-xs font-mono text-fuchsia-300" style={{ backgroundColor: "rgba(232,121,249,0.06)", borderColor: "rgba(232,121,249,0.3)" }}>F2</div>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-center">
              <div
                className="rounded-full border px-3 py-1 text-xs"
                style={{
                  borderColor: "rgba(232,121,249,0.4)",
                  backgroundColor: "rgba(232,121,249,0.06)",
                  color: "#e879f9",
                }}
              >
                git rebase origin/main
              </div>
            </div>

            {/* After */}
            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "rgba(232,121,249,0.04)",
                borderColor: "rgba(232,121,249,0.3)",
              }}
            >
              <p className="text-xs font-semibold text-fuchsia-400 uppercase tracking-wide mb-3">
                After — 一本線になった
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <div className="rounded border px-2 py-1 text-xs font-mono text-gray-300" style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}>M1</div>
                <FlowArrow label="" direction="right" />
                <div className="rounded border px-2 py-1 text-xs font-mono text-gray-300" style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}>M2</div>
                <FlowArrow label="" direction="right" />
                <div className="rounded border px-2 py-1 text-xs font-mono text-gray-300" style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}>M3</div>
                <FlowArrow label="" direction="right" />
                <div className="rounded border px-2 py-1 text-xs font-mono text-fuchsia-300" style={{ backgroundColor: "rgba(232,121,249,0.06)", borderColor: "rgba(232,121,249,0.3)" }}>F1&#39;</div>
                <FlowArrow label="" direction="right" />
                <div className="rounded border px-2 py-1 text-xs font-mono text-fuchsia-300" style={{ backgroundColor: "rgba(232,121,249,0.06)", borderColor: "rgba(232,121,249,0.3)" }}>F2&#39;</div>
              </div>
              <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                mainの最新（M3）の上にfeatureのコミット（F1&#39;, F2&#39;）が乗った。&#39;はSHAが変わったことを示す。
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            merge と違いマージコミットが生まれないため、履歴が一本線でスッキリする。ただしSHAは変わるので force push が必要になる。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── 詳細解説 ──────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="PR前のrebase -i の典型的な手順">
          <p>
            フィーチャーブランチで作業中に積み上がった wip / fix typo などのコミットをPRを出す前に整形する、定番のフローを確認しよう。
          </p>
          <div
            className="rounded-xl border p-4 space-y-3"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-fuchsia-500/20 border border-fuchsia-500/40 flex items-center justify-center">
                <span className="text-xs font-bold text-fuchsia-300">1</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-white mb-1">整形したいコミット数を確認する</p>
                <div className="rounded border px-3 py-2 font-mono text-xs text-gray-300" style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}>
                  git log --oneline
                </div>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  直近のコミットを確認し、まとめたい個数（N）を決める。
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-fuchsia-500/20 border border-fuchsia-500/40 flex items-center justify-center">
                <span className="text-xs font-bold text-fuchsia-300">2</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-white mb-1">インタラクティブ rebase を起動する</p>
                <div className="rounded border px-3 py-2 font-mono text-xs text-gray-300" style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}>
                  git rebase -i HEAD~N
                </div>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  エディタが開き、コミット一覧が表示される。
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-fuchsia-500/20 border border-fuchsia-500/40 flex items-center justify-center">
                <span className="text-xs font-bold text-fuchsia-300">3</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-white mb-1">コマンドを編集して保存する</p>
                <div className="rounded border px-3 py-2 font-mono text-xs" style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}>
                  <p className="text-gray-400">pick abc1234 wip</p>
                  <p className="text-fuchsia-300">squash def5678 fix typo</p>
                  <p className="text-fuchsia-300">squash ghi9012 add login</p>
                </div>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  先頭を pick のまま残し、まとめたいコミットを squash（または fixup）に書き換えて保存。
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-fuchsia-500/20 border border-fuchsia-500/40 flex items-center justify-center">
                <span className="text-xs font-bold text-fuchsia-300">4</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-white mb-1">メッセージを編集して完成させる</p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  squash の場合、次にメッセージ編集エディタが開く。最終的なコミットメッセージを書いて保存する。
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-fuchsia-500/20 border border-fuchsia-500/40 flex items-center justify-center">
                <span className="text-xs font-bold text-fuchsia-300">5</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-white mb-1">自分のブランチを force push する</p>
                <div className="rounded border px-3 py-2 font-mono text-xs text-gray-300" style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}>
                  git push --force-with-lease
                </div>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  SHAが変わるため通常pushではリジェクトされる。--force-with-lease は誰かが自分の知らない間にリモートを更新していた場合にエラーにしてくれる安全な force push。
                </p>
              </div>
            </div>
          </div>
          <KeyPoint>
            整形後の push は必ず `--force-with-lease`。通常の `--force` より安全で、意図しない上書きを防げる。これはチームのルールとして覚えておく価値がある。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="rebase と merge の選択基準">
          <p>
            どちらも「他のブランチの変更を取り込む」操作だが、履歴の見え方が大きく異なる。
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "rgba(232,121,249,0.04)",
                borderColor: "rgba(232,121,249,0.3)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-fuchsia-400" />
                <p className="text-sm font-semibold text-fuchsia-300">rebase を選ぶとき</p>
              </div>
              <ul className="space-y-1.5">
                <li className="text-xs text-gray-300 leading-relaxed flex gap-2">
                  <span className="text-fuchsia-500 flex-shrink-0">▸</span>
                  <span>PR前にコミット履歴をきれいにしたい</span>
                </li>
                <li className="text-xs text-gray-300 leading-relaxed flex gap-2">
                  <span className="text-fuchsia-500 flex-shrink-0">▸</span>
                  <span>mainの最新を取り込みながら一本線の履歴を保ちたい</span>
                </li>
                <li className="text-xs text-gray-300 leading-relaxed flex gap-2">
                  <span className="text-fuchsia-500 flex-shrink-0">▸</span>
                  <span>自分のフィーチャーブランチだけで完結している</span>
                </li>
              </ul>
            </div>
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <GitMerge className="w-4 h-4 text-blue-400" />
                <p className="text-sm font-semibold text-blue-300">merge を選ぶとき</p>
              </div>
              <ul className="space-y-1.5">
                <li className="text-xs text-gray-300 leading-relaxed flex gap-2">
                  <span className="text-blue-500 flex-shrink-0">▸</span>
                  <span>「いつどのブランチをマージしたか」を履歴に残したい</span>
                </li>
                <li className="text-xs text-gray-300 leading-relaxed flex gap-2">
                  <span className="text-blue-500 flex-shrink-0">▸</span>
                  <span>複数人が同じブランチを使っている</span>
                </li>
                <li className="text-xs text-gray-300 leading-relaxed flex gap-2">
                  <span className="text-blue-500 flex-shrink-0">▸</span>
                  <span>変更の流れを記録として保持したい</span>
                </li>
              </ul>
            </div>
          </div>
          <WarningPoint>
            force push を禁止しているチームでは、rebase -i の後に push できない。チームのルールを事前に確認してから使うこと。
          </WarningPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/git/branch",
            title: "ブランチとマージ",
            description: "ブランチの作成・切り替え・マージの基本",
            icon: "GitBranch",
          },
          {
            href: "/git/cherry-pick",
            title: "cherry-pick",
            description: "特定のコミットだけを別ブランチに持ってくる",
            icon: "GitCommit",
          },
          {
            href: "/git/workflow",
            title: "Git ワークフロー",
            description: "チーム開発のブランチ戦略と運用フロー",
            icon: "Workflow",
          },
        ]}
      />

      <PageDrill questions={rebaseQuestions} />
    </div>
  );
}
