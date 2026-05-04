import Link from "next/link";
import {
  GitCommit,
  GitBranch,
  GitMerge,
  ArrowRightLeft,
  FileCode2,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Scissors,
  FlaskConical,
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
import { cherryPickQuestions } from "@/content/questions/git/cherry-pick";

export const metadata = {
  title: "cherry-pick | Web開発図解",
  description:
    "git cherry-pick で特定コミットだけを別ブランチに持ち込む方法を図解で解説。典型的なユースケース・コンフリクト対処・merge との使い分けまで1ページで整理する。",
};

export default function CherryPickPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/git" className="text-xs text-gray-500 hover:text-white transition-colors mb-6 block">
        ← Git / GitHub に戻る
      </Link>
      <Hero
        category="Git"
        title="cherry-pick"
        subtitle={"ブランチをまたいで「あのコミットだけ」を摘み取る"}
        body={"merge せずに特定の変更だけを持ち込む外科的な操作を1ページで掴む。"}
        accentColor="green"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "cherry-pick が何をするコマンドか",
          "コミットハッシュの特定方法",
          "コンフリクトが起きた時の対処",
        ]}
        prerequisites={[
          "ブランチとマージの基本",
          "コミットハッシュの概念（git log --oneline）",
        ]}
        outOfScope={[
          "cherry-pick -n（ステージだけ・コミットしない）",
          "連続コミットの範囲指定（応用編で扱う）",
        ]}
      />

      <OnePageSummary
        keyMessage="cherry-pick はブランチをまたいで「あのコミットだけ」を摘み取る手術。merge のようにブランチ全体を取り込まず、指定したコミット1件の変更だけを今いるブランチに新しいコミットとして追加する。"
        metaphorTitle="ケーキブッフェで特定のフルーツだけを自分のお皿に移す"
        metaphorPoints={[
          {
            label: "ブランチ全体 = ホールケーキ",
            real: "merge はホールケーキごと持ってくる。ブランチのコミット全部が対象になる",
            metaphor: "ホールケーキを丸ごと持ってくる",
          },
          {
            label: "cherry-pick = フルーツだけ",
            real: "cherry-pick はケーキの上の「このフルーツだけ」を自分のお皿に移す。必要なものだけ、ホールは関係ない",
            metaphor: "特定のフルーツだけ摘む",
          },
          {
            label: "コミットハッシュ = フルーツの種類",
            real: "どのコミット（フルーツ）を摘むかをハッシュで指定する。git log --oneline で特定する",
            metaphor: "「いちごだけ」と指定する",
          },
          {
            label: "新しいコミット = 自分のお皿に盛った分",
            real: "cherry-pick 後は元のコミットとは別のハッシュを持つ新しいコミットが生まれる。変更内容は同じでも履歴上は別物",
            metaphor: "自分のお皿の上の別の一粒",
          },
        ]}
        definition="cherry-pick = 指定したコミットの変更だけを、今いるブランチに新しいコミットとして追加する。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まずは「cherry-pick が何をするのか」を図で確認しましょう。develop ブランチのバグ修正コミットだけを main に持ち込む典型例から始めます。
        </p>

        {/* ── 概念図A: cherry-pick の概念図 ── */}
        <ConceptDiagram
          title="概念図A"
          description="develop ブランチのコミット B（バグ修正）だけを main にも適用する"
        >
          {/* develop ブランチ */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <GitBranch className="w-4 h-4" style={{ color: "#4ade80" }} />
                <span className="text-xs font-semibold" style={{ color: "#4ade80" }}>develop</span>
              </div>
              <div className="flex flex-wrap items-center gap-1">
                {/* コミット A */}
                <div
                  className="rounded-lg border px-3 py-2 text-center min-w-[60px]"
                  style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
                >
                  <p className="text-xs font-mono text-gray-400">A</p>
                  <p className="text-xs text-gray-500 mt-0.5">初期</p>
                </div>
                <span className="text-gray-600 text-xs">→</span>
                {/* コミット B（cherry-pick 対象） */}
                <div
                  className="rounded-lg border px-3 py-2 text-center min-w-[60px]"
                  style={{ backgroundColor: "rgba(74,222,128,0.10)", borderColor: "rgba(74,222,128,0.7)" }}
                >
                  <p className="text-xs font-mono font-bold" style={{ color: "#4ade80" }}>B</p>
                  <p className="text-xs mt-0.5" style={{ color: "#86efac" }}>バグ修正</p>
                </div>
                <span className="text-gray-600 text-xs">→</span>
                {/* コミット C */}
                <div
                  className="rounded-lg border px-3 py-2 text-center min-w-[60px]"
                  style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
                >
                  <p className="text-xs font-mono text-gray-400">C</p>
                  <p className="text-xs text-gray-500 mt-0.5">新機能</p>
                </div>
                <span className="text-gray-600 text-xs">→</span>
                {/* コミット D */}
                <div
                  className="rounded-lg border px-3 py-2 text-center min-w-[60px]"
                  style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
                >
                  <p className="text-xs font-mono text-gray-400">D</p>
                  <p className="text-xs text-gray-500 mt-0.5">実験中</p>
                </div>
              </div>
            </div>

            {/* 矢印（cherry-pick の方向） */}
            <div className="flex items-center gap-2 pl-4 py-1">
              <div
                className="rounded px-2 py-1 text-xs border"
                style={{ backgroundColor: "rgba(74,222,128,0.05)", borderColor: "rgba(74,222,128,0.3)", color: "#4ade80" }}
              >
                git cherry-pick B
              </div>
              <span className="text-gray-500 text-xs">↓ B の変更だけを main に適用</span>
            </div>

            {/* main ブランチ */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <GitBranch className="w-4 h-4 text-gray-400" />
                <span className="text-xs font-semibold text-gray-300">main</span>
              </div>
              <div className="flex flex-wrap items-center gap-1">
                {/* コミット A */}
                <div
                  className="rounded-lg border px-3 py-2 text-center min-w-[60px]"
                  style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
                >
                  <p className="text-xs font-mono text-gray-400">A</p>
                  <p className="text-xs text-gray-500 mt-0.5">初期</p>
                </div>
                <span className="text-gray-600 text-xs">→</span>
                {/* cherry-pick されたコミット B' */}
                <div
                  className="rounded-lg border px-3 py-2 text-center min-w-[70px]"
                  style={{ backgroundColor: "rgba(74,222,128,0.06)", borderColor: "rgba(74,222,128,0.4)" }}
                >
                  <p className="text-xs font-mono font-bold" style={{ color: "#86efac" }}>B{"'"}</p>
                  <p className="text-xs mt-0.5 text-gray-400">バグ修正</p>
                  <p className="text-xs mt-0.5" style={{ color: "#4ade80" }}>cherry-pick</p>
                </div>
                <span className="text-gray-600 text-xs">→</span>
                {/* コミット E */}
                <div
                  className="rounded-lg border px-3 py-2 text-center min-w-[60px]"
                  style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
                >
                  <p className="text-xs font-mono text-gray-400">E</p>
                  <p className="text-xs text-gray-500 mt-0.5">既存作業</p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="rounded-lg border mt-4 p-3"
            style={{ backgroundColor: "rgba(74,222,128,0.05)", borderColor: "rgba(74,222,128,0.25)" }}
          >
            <p className="text-xs font-semibold mb-1" style={{ color: "#86efac" }}>ポイント</p>
            <p className="text-sm text-gray-300 leading-relaxed">
              B と B{"'"} は同じ変更内容だが、コミットハッシュは別物。develop の C・D は main に入ってこない。
            </p>
          </div>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          概念が分かりました。次は cherry-pick が活躍する典型的な3パターンを確認します。
        </p>

        {/* ── 概念図B: 典型的なユースケース3パターン ── */}
        <ConceptDiagram
          title="概念図B"
          description="cherry-pick が役立つ3つの典型パターン"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* パターン1 */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Copy className="w-5 h-5" style={{ color: "#4ade80" }} />
                <p className="text-sm font-bold text-white">緊急バグ修正</p>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                develop のバグ修正コミットだけを main に即反映。機能開発中のコミットは含めたくない場面。
              </p>
              <div
                className="rounded mt-3 px-2 py-1 text-xs font-mono"
                style={{ backgroundColor: "#1a1d2a", color: "#4ade80" }}
              >
                git cherry-pick abc1234
              </div>
            </div>

            {/* パターン2 */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Scissors className="w-5 h-5 text-amber-400" />
                <p className="text-sm font-bold text-white">コミット移動</p>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                誤ったブランチにコミットした場合、正しいブランチで cherry-pick し、誤ったブランチでは revert する。
              </p>
              <div
                className="rounded mt-3 px-2 py-1 text-xs font-mono"
                style={{ backgroundColor: "#1a1d2a", color: "#fbbf24" }}
              >
                # 正しいブランチで実行
              </div>
            </div>

            {/* パターン3 */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <FlaskConical className="w-5 h-5 text-violet-400" />
                <p className="text-sm font-bold text-white">一部だけ取り込み</p>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                実験ブランチで試した複数の変更のうち、動作確認済みのコミットだけを本番に取り込む。
              </p>
              <div
                className="rounded mt-3 px-2 py-1 text-xs font-mono"
                style={{ backgroundColor: "#1a1d2a", color: "#a78bfa" }}
              >
                git cherry-pick def5678
              </div>
            </div>
          </div>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          3つのパターンを確認しました。次は対話形式で、よくある疑問を掘り下げます。
        </p>
      </section>

      {/* ── MajiDialogue ─────────────────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "マスター、ブランチ全部をmergeしたくないけど、このバグ修正だけ本番に入れたいっていうとき、どうすればいいんでしょう？ merge すると開発途中の変更まで全部入ってしまいそうで……。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "それが cherry-pick の出番ですよ、マジさん。\n`git log --oneline` でバグ修正のコミットハッシュを確認して、`git cherry-pick <そのハッシュ>` を実行するだけ。\nその1件の変更内容だけが今いるブランチに新しいコミットとして追加されます。develop ブランチには何も影響しません。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？ ちょっと待ってください。\ncherry-pick したら「同じ変更が2カ所に存在する」ことになりますよね？ それって大丈夫なんでしょうか……なんか重複してるみたいで気持ち悪くて。",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "鋭い視点ですね。その通りです、同じ変更内容が2つのブランチに存在することになります。\nただし、コミットハッシュは別物です。\n元のコミットを「コピー」するのではなく、同じ変更内容の「新しいコミット」を作っているイメージです。\nフルーツを摘むときに、元のケーキのフルーツが消えるわけではなく、自分のお皿に同じ種類が1粒増える感じですね。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "なるほど……でも2カ所に存在すると、後で develop ブランチ全体を main にマージするとき、同じ変更が2回入ってしまったりしない？ コンフリクトが怖いです。",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "良い視点です。実際にその状況でコンフリクトが起きることはあります。\nGit は同じ変更が2回適用されていることを「履歴が衝突している」と判断するためです。\nだから cherry-pick は「一時的・外科的な対処」として使うもので、長期的にはブランチ戦略を整理することが大切です。\n「まずバグを緊急で直す、後でブランチ構造を見直す」という使い方が正しいニュアンスです。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "ということは、誤ったブランチにコミットしてしまったときも使えますか？\n「あ、feature ブランチでやる作業を main に直接コミットしてしまった」みたいな。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "使えます。手順は3ステップです。\n1. 正しいブランチ（feature）に移動して cherry-pick でそのコミットを持ち込む\n2. 誤ったブランチ（main）で git revert か git reset で元に戻す\n3. これで「正しいブランチだけにそのコミットがある」状態になります。\ncherry-pick は移動ではなくコピーなので、元のブランチからの削除は別途行う必要があります。\nここを忘れがちなので注意してください。",
          },
        ]}
      />

      {/* ── 比較表 ──────────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["merge", "cherry-pick", "rebase"]}
          highlightCol={1}
          rows={[
            {
              label: "結果",
              cells: [
                "ブランチ全体を統合・マージコミット生成",
                "特定コミットの変更だけを別ブランチに適用",
                "コミット列を別のベースに付け替える",
              ],
              highlightCol: 1,
            },
            {
              label: "ユースケース",
              cells: [
                "ブランチ全体を取り込みたいとき",
                "一部の修正だけ欲しいとき（緊急対応など）",
                "履歴を綺麗に整理したいとき",
              ],
              highlightCol: 1,
            },
          ]}
          note="一部の修正だけ必要なら cherry-pick。ブランチ全体を取り込むなら merge。履歴を整理したいなら rebase、という使い分けが基本。format-patch はメール・オフライン向けの稀な操作のため割愛。"
        />
      </section>

      {/* ── TermNote ─────────────────────────────────────────── */}
      <TermNote
        terms={[
          {
            word: "コミットハッシュ",
            definition:
              "コミットを一意に識別するSHA-1の文字列。git log --oneline で短縮形（7文字程度）を確認できる。cherry-pick ではこのハッシュを引数に渡す。",
          },
          {
            word: "重複コミット",
            definition:
              "cherry-pick すると元のコミットとは別のハッシュで同じ変更内容のコミットが生まれる。履歴上は別コミットとして扱われ、後で同じブランチを merge するとコンフリクトの原因になることがある。",
          },
        ]}
      />

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下は複数コミットの一括指定・コンフリクト対処・落とし穴など、実務で役立つ内容です。"
      />

      {/* ── 応用編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — 複数コミットとコンフリクト対処
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          複数のコミットをまとめて cherry-pick する方法と、コンフリクトが起きたときの対処フローを確認しましょう。
        </p>

        {/* ── 概念図C: 複数コミットの cherry-pick ── */}
        <ConceptDiagram
          title="概念図C"
          description="複数コミットを一度に cherry-pick する2つの書き方"
        >
          <div className="space-y-4">
            {/* 個別指定 */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <GitCommit className="w-4 h-4" style={{ color: "#4ade80" }} />
                <p className="text-sm font-semibold text-white">個別指定（スペース区切り）</p>
              </div>
              <div
                className="rounded border px-3 py-2 font-mono text-sm text-gray-300"
                style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
              >
                git cherry-pick A B C
              </div>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                ハッシュをスペースで並べると複数コミットを順番に適用できる。順序が重要（依存関係がある場合は古い順に指定）。
              </p>
            </div>

            {/* 範囲指定 */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <ArrowRightLeft className="w-4 h-4 text-amber-400" />
                <p className="text-sm font-semibold text-white">範囲指定（A^..C）</p>
              </div>
              <div
                className="rounded border px-3 py-2 font-mono text-sm text-gray-300"
                style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
              >
                git cherry-pick A^..C
              </div>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                {"A^ は「Aの1つ前」を意味する。A^..C は「AからC（Cを含む）」の範囲を指定。コミットが連続している場合はこちらが便利。"}
              </p>
            </div>

            <div
              className="rounded-lg border p-3"
              style={{ backgroundColor: "rgba(245,158,11,0.05)", borderColor: "rgba(245,158,11,0.3)" }}
            >
              <p className="text-xs font-semibold text-amber-300 mb-1">注意点</p>
              <p className="text-sm text-gray-300 leading-relaxed">
                範囲指定で {'"A..C"'} と書くと A 自体は含まれない（A の次から C まで）。A も含めたいときは {'"A^..C"'} と書く。
              </p>
            </div>
          </div>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          複数コミットの指定方法が分かりました。次はコンフリクトが発生したときの対処フローです。
        </p>

        {/* ── 概念図D: コンフリクト対処フロー ── */}
        <ConceptDiagram
          title="概念図D"
          description="cherry-pick 中にコンフリクトが起きた場合の対処フロー"
        >
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2">
            <FlowCard
              Icon={GitCommit}
              title="cherry-pick 実行"
              subtitle="git cherry-pick <hash>"
            />
            <FlowArrow label="コンフリクト発生" direction="right" />
            <FlowCard
              Icon={FileCode2}
              title="ファイルを手動修正"
              subtitle="マーカーを解消する"
              highlight
              accentColor="green"
            />
            <FlowArrow label="ステージに追加" sublabel="git add" direction="right" />
            <FlowCard
              Icon={CheckCircle2}
              title="cherry-pick 完了"
              subtitle="git cherry-pick --continue"
              highlight
              accentColor="green"
            />
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              className="rounded-lg border p-3"
              style={{ backgroundColor: "rgba(74,222,128,0.05)", borderColor: "rgba(74,222,128,0.3)" }}
            >
              <p className="text-xs font-semibold mb-2" style={{ color: "#86efac" }}>続ける場合</p>
              <div
                className="rounded px-2 py-1 font-mono text-xs text-gray-300"
                style={{ backgroundColor: "#0f1117" }}
              >
                <p># 1. ファイルを修正</p>
                <p>git add {"<"}ファイル{">"}</p>
                <p>git cherry-pick --continue</p>
              </div>
            </div>
            <div
              className="rounded-lg border p-3"
              style={{ backgroundColor: "rgba(239,68,68,0.05)", borderColor: "rgba(239,68,68,0.3)" }}
            >
              <p className="text-xs font-semibold text-red-300 mb-2">中止する場合</p>
              <div
                className="rounded px-2 py-1 font-mono text-xs text-gray-300"
                style={{ backgroundColor: "#0f1117" }}
              >
                <p># cherry-pick 前の状態に戻す</p>
                <p>git cherry-pick --abort</p>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500 text-center mt-3">
            git add を忘れると --continue を実行してもエラーになる。修正後は必ずステージに上げること。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── 詳細解説 ─────────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="cherry-pick の落とし穴">
          <p>
            cherry-pick は便利な反面、使い方を誤ると厄介な問題を引き起こす。代表的な2つの落とし穴を押さえておこう。
          </p>

          <div className="space-y-4 mt-2">
            {/* 落とし穴1 */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <p className="text-sm font-semibold text-white">依存コミットが抜けると動かない</p>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                コミット B が「コミット A の変更の上に成り立っている」場合、A を取り込まず B だけを cherry-pick するとビルドが壊れることがある。
                cherry-pick は変更のパッチを機械的に適用するだけで、依存関係のチェックは行わない。
              </p>
            </div>

            {/* 落とし穴2 */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <p className="text-sm font-semibold text-white">同じ変更が複数ブランチに存在して混乱する</p>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                cherry-pick は「コピー」なので、元コミットが残ったまま別ブランチにも同じ変更が存在する状態になる。
                後で全体を merge するとコンフリクトが起きやすく、コードレビューや blame（誰がいつ変えたか）も追いにくくなる。
                cherry-pick は緊急対応や一時的な処置として使い、後でブランチ戦略を整理することが重要。
              </p>
            </div>
          </div>

          <WarningPoint>
            cherry-pick は「外科手術」。使いすぎると履歴が複雑になる。定期的にブランチ戦略を見直し、cherry-pick に頼らない構造を目指すこと。
          </WarningPoint>
        </DetailBlock>

        <DetailBlock heading="cherry-pick vs merge の選択基準">
          <p>
            cherry-pick と merge はどちらも「あるブランチの変更を別のブランチに取り込む」操作だが、目的と粒度が異なる。
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "rgba(74,222,128,0.06)", borderColor: "rgba(74,222,128,0.4)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <GitCommit className="w-4 h-4" style={{ color: "#4ade80" }} />
                <p className="text-sm font-bold" style={{ color: "#4ade80" }}>cherry-pick を使う場面</p>
              </div>
              <ul className="text-sm text-gray-300 space-y-1.5 leading-relaxed">
                <li className="flex gap-2"><span style={{ color: "#4ade80" }}>▸</span><span>一部の修正だけ必要（ブランチ全体は不要）</span></li>
                <li className="flex gap-2"><span style={{ color: "#4ade80" }}>▸</span><span>緊急バグ修正を本番に即反映</span></li>
                <li className="flex gap-2"><span style={{ color: "#4ade80" }}>▸</span><span>誤ったブランチのコミットを正しい場所に移す</span></li>
              </ul>
            </div>

            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <GitMerge className="w-4 h-4 text-blue-400" />
                <p className="text-sm font-bold text-blue-300">merge を使う場面</p>
              </div>
              <ul className="text-sm text-gray-300 space-y-1.5 leading-relaxed">
                <li className="flex gap-2"><span className="text-blue-400">▸</span><span>ブランチ全体の開発を取り込みたい</span></li>
                <li className="flex gap-2"><span className="text-blue-400">▸</span><span>Pull Request をマージするとき</span></li>
                <li className="flex gap-2"><span className="text-blue-400">▸</span><span>定期的な develop → main の統合</span></li>
              </ul>
            </div>
          </div>

          <KeyPoint>
            シンプルな判断基準は「必要なのはコミット1件（数件）か、ブランチ全体か」。一部だけ→ cherry-pick、全体→ merge。迷ったら merge の方が履歴が明快で後から追いやすい。
          </KeyPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/git/branch",
            title: "ブランチ",
            description: "cherry-pick の前提となるブランチの仕組み",
            icon: "GitBranch",
          },
          {
            href: "/git/rebase",
            title: "rebase",
            description: "cherry-pick と並ぶ履歴操作の基本コマンド",
            icon: "GitCommit",
          },
          {
            href: "/git/conflict",
            title: "コンフリクト",
            description: "cherry-pick 中に発生するコンフリクトの詳細",
            icon: "AlertTriangle",
          },
        ]}
      />

      <PageDrill questions={cherryPickQuestions} />
    </div>
  );
}
