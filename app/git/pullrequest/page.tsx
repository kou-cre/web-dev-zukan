import Link from "next/link";
import {
  GitPullRequest,
  GitBranch,
  GitMerge,
  MessageSquare,
  CheckCircle2,
  Eye,
  Send,
  Trash2,
  FileText,
  Layers,
  RefreshCw,
  LayoutList,
  Globe,
  BookMarked,
  FileEdit,
  RotateCcw,
  UserCheck,
  GitCommit,
  AlignLeft,
  Terminal,
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
import { pullrequestQuestions } from "@/content/questions/git/pullrequest";

export const metadata = {
  title: "Pull Request | Web開発図解",
  description:
    "Pull Requestの目的・作成からマージまでの流れ・3つのマージ方式の違いを図解で解説。1人開発でもPRを使う理由から良いPR本文の書き方まで。",
};

export default function PullRequestPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/git" className="text-xs text-gray-500 hover:text-white transition-colors mb-6 block">
        ← Git / GitHub に戻る
      </Link>
      <Hero
        category="Git"
        title="Pull Request"
        subtitle={"コードを本流に入れる前の「関所」。レビュー・差分確認・マージの流れを掴む。"}
        body={"PR作成からマージまでの手順と3つのマージ方式の使い分けを1ページで整理する。"}
        accentColor="purple"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "PRが何のためにあるか（レビュー・差分確認・プレビュー環境）",
          "PR作成からマージまでの手順",
          "3つのマージ方式の使い分け",
        ]}
        prerequisites={[
          "ブランチとマージの基本（ブランチとマージページ参照）",
          "GitHubアカウントの操作",
        ]}
        outOfScope={[
          "CI/CDのPRトリガー設定",
          "Protected branch ルール",
          "GitHub Actions の詳細",
        ]}
      />

      <OnePageSummary
        keyMessage="PRはコードを本流に入れる前の「関所」。1人でも使う価値がある。"
        metaphorTitle="原稿の「確認稿」"
        metaphorPoints={[
          {
            label: "確認稿",
            real: "原稿を編集者に渡す前に「確認稿」として赤入れしてもらう。PRも同じで、mainに入れる前にレビューを受ける場所",
            metaphor: "赤入れしてから本になる",
          },
          {
            label: "差分の一覧",
            real: "PRを開くとどこを変えたかが一目で見える。1人でも「昨日の自分の変更」を確認するのに役立つ",
            metaphor: "変更箇所の見える化",
          },
          {
            label: "プレビュー環境",
            real: "VercelはPRを作るたびにプレビューURLを自動生成する。mainにマージ前に動作確認できる",
            metaphor: "本番前の試し読み",
          },
          {
            label: "変更理由の記録",
            real: "PR本文に「なぜこの変更をしたか」を書いておくと、後から読み返せる変更ログになる",
            metaphor: "編集メモとして残る",
          },
        ]}
        definition="Pull Request = このブランチをmainに取り込んでください、というGitHub上の依頼。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まずはPRがどんな流れで進むか全体像を確認しましょう。
        </p>

        {/* ── 概念図A: PRの全体フロー ── */}
        <ConceptDiagram
          title="概念図A"
          description="PRの全体フロー — ブランチをpushしてからマージ・ブランチ削除までの一連の流れ"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 flex-wrap">
            <FlowCard
              Icon={GitBranch}
              title="ブランチ push"
              subtitle="作業ブランチをGitHubへ"
            />
            <FlowArrow label="GitHub上で" sublabel="PR作成" direction="right" />
            <FlowCard
              Icon={Eye}
              title="レビュー"
              subtitle="差分確認・コメント"
              highlight
              accentColor="purple"
            />
            <FlowArrow label="問題なし" direction="right" />
            <FlowCard
              Icon={CheckCircle2}
              title="Approve"
              subtitle="承認"
              highlight
              accentColor="purple"
            />
            <FlowArrow label="マージ" direction="right" />
            <FlowCard
              Icon={GitMerge}
              title="Merge"
              subtitle="mainに統合"
            />
            <FlowArrow label="後片付け" direction="right" />
            <FlowCard
              Icon={Trash2}
              title="ブランチ削除"
              subtitle="不要になったブランチを消す"
            />
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            GitHubはマージ後に「Delete branch」ボタンを表示してくれる。忘れずに片付けよう。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          全体の流れが分かりました。次は「1人開発でもPRを使う理由」を整理します。
        </p>

        {/* ── 概念図B: 1人開発でもPRを使う理由 ── */}
        <ConceptDiagram
          title="概念図B"
          description="1人でも使う価値がある理由 — チームだけの話ではない"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <LayoutList className="w-5 h-5 text-purple-400" />
                <p className="text-sm font-bold text-white">差分が一覧できる</p>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                PRを開くと変更したファイルと行が色付きで一覧表示される。
                コミット後に「本当にこれで良かったか？」を俯瞰で確認できる。
              </p>
            </div>

            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "rgba(192,132,252,0.06)",
                borderColor: "rgba(192,132,252,0.4)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-5 h-5 text-purple-300" />
                <p className="text-sm font-bold text-white">プレビュー環境が自動生成</p>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                VercelはPR作成のたびに専用URLのプレビュー環境を自動で作る。
                本番にマージする前に実際に動く画面で確認できる。
              </p>
            </div>

            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <BookMarked className="w-5 h-5 text-purple-400" />
                <p className="text-sm font-bold text-white">変更理由を読み返せる</p>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                PR本文に「なぜこの変更をしたか」を書いておくと、
                数ヶ月後に「なんでこのコードにしたんだっけ？」となったときに読み返せる。
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            PRはチームのためだけの機能ではない。「過去の自分へのメモ」としても機能する。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── マージ方式 概要カード（MajiDialogue の前提知識） ──── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          MERGE STRATEGIES — 3つの方式の概要
        </h2>
        <p className="text-sm text-gray-400 leading-relaxed mb-5">
          マージ時にGitHubが提示する3つのボタンの概要を先に押さえておきましょう。
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div
            className="rounded-xl border p-4"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <GitMerge className="w-5 h-5 text-gray-400" />
              <p className="text-sm font-bold text-white">Merge commit</p>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              PRブランチの全コミットをそのまま残し、マージコミットを1つ追加してmainに統合する。
            </p>
          </div>
          <div
            className="rounded-xl border-2 p-4"
            style={{
              backgroundColor: "rgba(192,132,252,0.06)",
              borderColor: "rgba(192,132,252,0.5)",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <GitCommit className="w-5 h-5 text-purple-400" />
              <p className="text-sm font-bold text-white">Squash and merge</p>
              <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
                推奨
              </span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              PRブランチの複数コミットを1つに圧縮してmainに追加する。「1PR = 1コミット」で履歴がシンプルになる。
            </p>
          </div>
          <div
            className="rounded-xl border p-4"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <AlignLeft className="w-5 h-5 text-gray-400" />
              <p className="text-sm font-bold text-white">Rebase and merge</p>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              コミットを時系列で並び替えてmainの先端に接続する。コミット数は保持しつつ直線の履歴にする。
            </p>
          </div>
        </div>
        <p className="text-xs text-gray-500 text-center mt-3">
          詳細な比較は下の比較表で確認できます。迷ったら Squash and merge から始めよう。
        </p>
      </section>

      {/* ── MajiDialogue ────────────────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "マスター、ボク1人で開発してるんですけど、PRって本当に必要なんですか？ レビューしてくれる人もいないし、直接mainにpushすればよくないですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "良いご質問ですね、マジさん。\nチームのいない1人開発でも、PRには3つの価値があります。\n\n1つ目は差分の一覧確認——\nPRを開くと変更した全ファイルと行が色付きで見えます。コミット後に俯瞰で「これで本当に良いか」を確かめられる。\n\n2つ目はVercelのプレビュー環境——\nPR作成のたびに専用URLが自動生成されます。mainにマージする前に動く画面で確認できる。\n\n3つ目は変更理由の記録——\n本文に「なぜこの変更をしたか」を書いておくと、数ヶ月後の自分への手紙になりますよ。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？ それは知らなかったです……。じゃあマスター、マージするときに「Squash and merge」ってボタンがあるんですけど、これ何をまとめるんですか？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "Squash and mergeは、\nPRブランチにある複数のコミットを1つにまとめてmainに追加する方式です。\n\nたとえば作業中に「WIP」「typo修正」「また修正」と3回コミットしたとします。\nこのままmainに入れると履歴が雑然としますよね。\n\nSquash and mergeを選ぶと、その3つのコミットが1つに圧縮されてmainに入ります。\n「1PR = 1コミット」で履歴がとても読みやすくなりますよ。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "なるほど！ じゃあ「Rebase and merge」ってのはどう違うんですか？ もうボク、マージ方式が多すぎてこんがらがってます……。",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "Rebase and mergeはコミットを時系列で並び替えて\nmainの先端につなげる方式です。\n\nSquash and mergeが「全部まとめて1つ」なのに対して、\nRebase and mergeは「元のコミット数を保ちつつ、分岐なしで直線の履歴にする」イメージです。\n\nメリットは、1つひとつのコミットが意味のある単位になっていれば履歴が読みやすいこと。\nデメリットは並び替え時にコンフリクトが起きやすいことと、元のコミットのIDが変わることです。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "うーん……じゃあ結局どれを使えばいいんですか？ 3種類あって選べないです。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "迷うなら Squash and merge から始めるのが最も無難です。\n\n1人開発・小規模チームでは「1PR = 1コミット」で履歴がシンプルになるSquash and mergeが扱いやすい。\nMerge commitは「PRごとの変更の経緯を全部残したい」チームに向いています。\nRebase and mergeは各コミットをきれいな単位に揃える規律があるチームで使われます。\n\nチームに合流したときはそのプロジェクトのルールに合わせればOKです。\n最初は自分のルールを1つ決めて使い続けてみてください。",
          },
        ]}
      />

      {/* ── 比較表 ────────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON — マージ方式
        </h2>
        <ComparisonTable
          headers={["Merge commit", "Squash and merge", "Rebase and merge"]}
          rows={[
            {
              label: "動き",
              cells: [
                "全コミット保持 + マージコミット追加",
                "全コミットを1つに圧縮してmainに追加",
                "コミットを並び替えてmainの先端に接続",
              ],
              highlightCol: 1,
            },
            {
              label: "コミット履歴",
              cells: [
                "分岐が見える（マージポイントが残る）",
                "直線・シンプル（1PR = 1コミット）",
                "直線・元コミットを保持",
              ],
              highlightCol: 1,
            },
            {
              label: "使いどころ",
              cells: [
                "変更の経緯を全部残したいチーム",
                "1人・小規模チームで履歴をきれいに保ちたいとき",
                "各コミットを意味単位に揃えた大規模チーム",
              ],
              highlightCol: 1,
            },
          ]}
          note="迷ったら Squash and merge から始めよう。「1PR = 1コミット」でmainの履歴が読みやすくなる。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下はレビューサイクルの詳細・Draft PRの使い方・PR品質を上げる実践知識です。"
      />

      {/* ── TermNote ──────────────────────────────────────── */}
      <TermNote
        terms={[
          {
            word: "base branch",
            definition:
              "PRをマージする先のブランチ。通常はmain（またはdevelop）。GitHubのPR作成画面で「base:」に表示される。",
          },
          {
            word: "compare branch",
            definition:
              "変更を含む作業ブランチ。PR作成画面で「compare:」に表示される。compareの変更をbaseに取り込むのがPRの目的。",
          },
          {
            word: "Approve",
            definition:
              "レビュアーが「このPRをマージしてよい」と承認すること。GitHubの「Review changes → Approve」操作で行う。",
          },
          {
            word: "LGTM",
            definition:
              '"Looks Good To Me"の略。レビューOKを伝える慣用表現。コメント欄で「LGTM!」と書くのが一般的。',
          },
        ]}
      />

      {/* ── 応用編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — レビューサイクルとDraft PR
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          実際のレビューは一発でApproveになることは少なく、コメント→修正→再レビューのサイクルを回します。
        </p>

        {/* ── 概念図C: レビューサイクル ── */}
        <ConceptDiagram
          title="概念図C"
          description="PRのレビューサイクル — コメント・修正・再レビューのループ"
        >
          <div
            className="rounded-xl border-2 border-dashed p-5"
            style={{ borderColor: "rgba(192,132,252,0.35)" }}
          >
            <p className="text-xs font-semibold text-center mb-5"
              style={{ color: "#c084fc" }}>
              レビューループ
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              <FlowCard
                Icon={MessageSquare}
                title="レビューコメント"
                subtitle="指摘・質問・提案"
                highlight
                accentColor="purple"
              />
              <FlowArrow label="対応する" direction="right" />
              <FlowCard
                Icon={FileEdit}
                title="修正コミット"
                subtitle="ブランチに追加push"
              />
              <FlowArrow label="再確認" direction="right" />
              <FlowCard
                Icon={RotateCcw}
                title="再レビュー"
                subtitle="変更点を確認"
              />
              <FlowArrow label="問題なし" direction="right" />
              <FlowCard
                Icon={UserCheck}
                title="Approve"
                subtitle="LGTM!"
                highlight
                accentColor="purple"
              />
            </div>
          </div>
          <div
            className="rounded-lg border mt-4 p-3"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-xs font-semibold text-gray-400 mb-2">修正コミットの追加について</p>
            <p className="text-sm text-gray-400 leading-relaxed">
              レビューコメントに対応した修正は、新しいコミットとして同じブランチにpushするだけでOK。
              PRは自動的に最新のコミットを反映する。既存のコミットを書き換える（amend）必要はない。
              Squash and mergeを使えば最終的に1コミットにまとまるため、修正履歴が増えても問題ない。
            </p>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            コメント→修正→再レビューのループは1回とは限らない。大きなPRほどループが多くなりがち。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          レビューサイクルを確認しました。次はまだ作業中のPRを早めに共有する「Draft PR」を見てみましょう。
        </p>

        {/* ── 概念図D: Draft PR ── */}
        <ConceptDiagram
          title="概念図D"
          description="Draft PR — 作業途中でも意見をもらえる仕組み"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Send className="w-5 h-5 text-gray-400" />
                <p className="text-sm font-bold text-white">通常のPR</p>
                <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-green-500/15 text-green-300 border border-green-500/30">
                  マージ可
                </span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                作業が完成していてレビューを受ける準備ができた状態。
                マージボタンが有効になっている。
              </p>
            </div>

            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "rgba(192,132,252,0.06)",
                borderColor: "rgba(192,132,252,0.4)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-purple-400" />
                <p className="text-sm font-bold text-white">Draft PR</p>
                <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-gray-500/20 text-gray-400 border border-gray-500/30">
                  マージ不可
                </span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                作業途中でも「方向性はこれで良い？」と意見をもらえる。
                マージボタンが無効なのでうっかりマージも防げる。
              </p>
            </div>
          </div>

          <div
            className="rounded-lg border mt-4 p-4"
            style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
          >
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
              Draft PRが役立つ場面
            </p>
            <div className="space-y-2">
              {[
                { icon: Layers, text: "設計の方向性を早めに確認したい" },
                { icon: MessageSquare, text: "実装途中でも「この進め方で合ってる？」を聞きたい" },
                { icon: RefreshCw, text: "後でまだ変更するが、ブランチの状態を共有しておきたい" },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Icon className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-300 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3">
              完成したら「Ready for review」ボタンを押すと通常のPRに昇格できる。
            </p>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── 詳細解説 ──────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="良いPR本文の書き方">
          <p>
            PR本文に最低限書くべき3点は「<strong className="text-white">何を</strong>変えたか」「<strong className="text-white">なぜ</strong>変えたか」「<strong className="text-white">どう確認する</strong>か」。
          </p>
          <p>
            「何を」はコードの概要。「なぜ」は背景・目的・Issueへのリンク。「どう確認するか」はレビュアーが動作確認する手順を書く。
            この3点があるとレビュアーがコードの意図を理解した上でレビューできるため、コメントの質と速度が上がる。
          </p>
          <div
            className="rounded-lg border p-4"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-xs font-semibold text-gray-400 mb-3">PR本文テンプレート例</p>
            <div className="space-y-2 text-sm text-gray-300 leading-relaxed font-mono">
              <p className="text-purple-300">## 変更内容</p>
              <p className="text-gray-400">ログイン画面のバリデーションを追加した</p>
              <p className="mt-2 text-purple-300">## 変更理由</p>
              <p className="text-gray-400">メールアドレスの形式チェックがなく不正入力が通っていたため（#123 参照）</p>
              <p className="mt-2 text-purple-300">## 確認手順</p>
              <p className="text-gray-400">1. ログイン画面を開く</p>
              <p className="text-gray-400">2. メールアドレス欄に「test」と入力してSubmit</p>
              <p className="text-gray-400">3. エラーメッセージが表示されることを確認</p>
            </div>
          </div>
          <KeyPoint>
            PR本文はコードへのコンテキストを提供するドキュメント。「何を・なぜ・どう確認するか」の3点があるだけで、自分が後から見返すときにも役立つ。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="手を動かす — 最小コマンド例">
          <p>
            ブランチを push して PR を作成し、マージ後にブランチを削除するまでの最小手順です。
          </p>
          <div
            className="rounded-lg border p-4 mt-2"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Terminal className="w-4 h-4 text-purple-400" />
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">コマンド手順</p>
            </div>
            <div className="space-y-1 text-xs font-mono leading-relaxed">
              <p className="text-gray-500"># 1. feature ブランチを作成して push</p>
              <p className="text-purple-300">git switch -c feature/login</p>
              <p className="text-gray-500 mt-2"># 変更・コミット後</p>
              <p className="text-purple-300">git push -u origin feature/login</p>
              <p className="text-gray-500 mt-3"># 2. GitHub 上で PR を作成（ブラウザ操作）</p>
              <p className="text-gray-400">#    → &quot;Compare &amp; pull request&quot; ボタンをクリック</p>
              <p className="text-gray-400">#    → タイトル・本文を書いて Create pull request</p>
              <p className="text-gray-500 mt-3"># 3. マージ後にブランチ削除</p>
              <p className="text-purple-300">git switch main</p>
              <p className="text-purple-300">git pull</p>
              <p className="text-purple-300">git branch -d feature/login</p>
            </div>
          </div>
          <KeyPoint>
            <code className="font-mono text-xs">git push -u origin feature/login</code> の <code className="font-mono text-xs">-u</code> は upstream の略。初回だけ付ければ、以後は <code className="font-mono text-xs">git push</code> だけで同じブランチに push できる。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="PRサイズの目安">
          <p>
            PRは<strong className="text-white">300行以下</strong>が目安。大きくなるほどレビュアーの集中力が分散し、見落としが増える。
          </p>
          <p>
            大きなPRになりそうな場合は機能を小さく分割して複数のPRに分けると良い。
            「フロントエンド変更のPR」「APIの変更のPR」「テストのPR」のように分けるだけで、
            レビュアーが1回あたりに判断する量が減り品質が上がる。
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
            {[
              { range: "〜100行", label: "理想的", color: "text-green-300", bgColor: "rgba(34,197,94,0.06)", borderColor: "rgba(34,197,94,0.35)", desc: "レビュアーが1〜2時間で完全に把握できるサイズ" },
              { range: "100〜300行", label: "許容範囲", color: "text-yellow-300", bgColor: "rgba(234,179,8,0.06)", borderColor: "rgba(234,179,8,0.35)", desc: "変更のまとまりが見えていれば問題ない" },
              { range: "300行〜", label: "分割推奨", color: "text-red-300", bgColor: "rgba(239,68,68,0.06)", borderColor: "rgba(239,68,68,0.35)", desc: "レビュー品質が下がる。可能なら機能単位に分割する" },
            ].map(({ range, label, color, bgColor, borderColor, desc }) => (
              <div
                key={range}
                className="rounded-lg border p-3"
                style={{ backgroundColor: bgColor, borderColor }}
              >
                <p className={`text-sm font-bold ${color}`}>{range}</p>
                <p className={`text-xs font-semibold ${color} mb-1`}>{label}</p>
                <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/git/branch",
            title: "ブランチとマージ",
            description: "ブランチの作り方・マージの仕組み",
            icon: "GitMerge",
          },
          {
            href: "/git/workflow",
            title: "ブランチ戦略",
            description: "GitHub Flow と Git Flow の使い分け",
            icon: "Workflow",
          },
          {
            href: "/git/conflict",
            title: "コンフリクト解消",
            description: "マージ時の競合を解決する手順",
            icon: "AlertOctagon",
          },
        ]}
      />

      <PageDrill questions={pullrequestQuestions} />
    </div>
  );
}
