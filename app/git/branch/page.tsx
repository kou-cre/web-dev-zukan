import {
  GitBranch,
  GitMerge,
  GitCommit,
  Terminal,
  ArrowRight,
  ArrowDown,
  Merge,
  BookOpen,
  Wrench,
  History,
} from "lucide-react";

import { Hero } from "@/components/Hero";
import { Prerequisites } from "@/components/Prerequisites";
import { OnePageSummary } from "@/components/OnePageSummary";
import { ConceptDiagram } from "@/components/ConceptDiagram";
import { ComparisonTable } from "@/components/ComparisonTable";
import { MajiDialogue } from "@/components/MajiDialogue";
import { RelatedLinks } from "@/components/RelatedLinks";
import { PageDrill } from "@/components/PageDrill";
import { DetailSection, DetailBlock, KeyPoint, WarningPoint } from "@/components/DetailSection";
import { SectionDivider } from "@/components/SectionDivider";
import { TermNote } from "@/components/TermNote";
import { UseCaseGrid } from "@/components/UseCaseGrid";
import { CodeBlock } from "@/components/CodeBlock";
import { branchQuestions } from "@/content/questions/git/branch";

export const metadata = {
  title: "ブランチとマージ | Web開発図解",
  description:
    "Gitのブランチで履歴を分岐させ、マージで統合する仕組みを図解で解説。Fast-forward・merge commit・ブランチ命名規則まで一気に整理する。",
};

export default function BranchPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Hero
        category="Git"
        title="ブランチとマージ"
        subtitle={"履歴を分岐させ、安全に統合する仕組みの話"}
        body={"ブランチを切る理由・merge の2種類の動き・命名規則まで1ページで掴む。"}
        accentColor="teal"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "ブランチを切る意味（本流を壊さない）",
          "git switch / merge の流れ",
          "Fast-forward と merge commit の違い",
        ]}
        prerequisites={[
          "git add / commit / push の基本（GitとGitHubとはページ参照）",
          "リポジトリとは「コードの保存場所 + 変更履歴」のこと",
        ]}
        outOfScope={[
          "rebase -i での履歴整形",
          "cherry-pick（特定コミットだけ取り込む）",
          "コンフリクト（競合）の解消手順",
        ]}
      />

      <OnePageSummary
        keyMessage="ブランチは作業用の並行世界。マージで本流に合流する。"
        metaphorTitle="本の下書きコピー"
        metaphorPoints={[
          {
            label: "ブランチを切る",
            real: "main という本流のコピーを作り、そちらで自由に書き直す。本物には手をつけない",
            metaphor: "下書き用のコピーを作る",
          },
          {
            label: "コミットを積む",
            real: "コピー上で少しずつ変更を保存していく。main はまだ影響を受けない",
            metaphor: "コピーに赤ペンで修正を書き込む",
          },
          {
            label: "マージする",
            real: "コピーの変更を本物に取り込む。問題があれば取り込まないまま捨てられる",
            metaphor: "修正が良ければ本物に反映する",
          },
          {
            label: "ブランチを削除",
            real: "マージ済みのブランチは不要になるので削除してすっきりさせる",
            metaphor: "下書きコピーをシュレッダーにかける",
          },
        ]}
        definition="ブランチ = 履歴の分岐線。マージ = 分岐を元の線に統合する操作。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まずは「ブランチが分岐・並走・合流する流れ」を図で確認しましょう。
        </p>

        {/* ── 概念図A: ブランチの分岐〜合流フロー ── */}
        <ConceptDiagram
          title="概念図A"
          description="main ブランチから feature ブランチが分岐し、作業後に合流するまでの流れ。"
        >
          {/* コミット列の図解 */}
          <div className="space-y-4">
            {/* main の流れ */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                main ブランチ
              </p>
              <div className="flex items-center gap-1 flex-wrap">
                {/* コミットA */}
                <div
                  className="rounded-lg border px-3 py-2 text-center"
                  style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
                >
                  <GitCommit className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-300 font-mono">A</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-500 flex-shrink-0" />
                {/* コミットB */}
                <div
                  className="rounded-lg border px-3 py-2 text-center"
                  style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
                >
                  <GitCommit className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-300 font-mono">B</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-500 flex-shrink-0" />
                {/* コミットC（分岐点） */}
                <div
                  className="rounded-lg border-2 px-3 py-2 text-center"
                  style={{ backgroundColor: "rgba(45,212,191,0.08)", borderColor: "rgba(45,212,191,0.5)" }}
                >
                  <GitBranch className="w-4 h-4 text-teal-400 mx-auto mb-1" />
                  <p className="text-xs text-teal-300 font-mono font-bold">C</p>
                  <p className="text-[10px] text-teal-500">分岐点</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-500 flex-shrink-0" />
                {/* コミットF（マージ後） */}
                <div
                  className="rounded-lg border-2 px-3 py-2 text-center"
                  style={{ backgroundColor: "rgba(45,212,191,0.12)", borderColor: "rgba(45,212,191,0.6)" }}
                >
                  <GitMerge className="w-4 h-4 text-teal-300 mx-auto mb-1" />
                  <p className="text-xs text-teal-200 font-mono font-bold">F</p>
                  <p className="text-[10px] text-teal-400">merge</p>
                </div>
              </div>
            </div>

            {/* feature ブランチの流れ */}
            <div className="ml-8 sm:ml-16">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                feature ブランチ（Cから分岐）
              </p>
              <div className="flex items-center gap-1 flex-wrap">
                {/* コミットD */}
                <div
                  className="rounded-lg border px-3 py-2 text-center"
                  style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
                >
                  <GitCommit className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-300 font-mono">D</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-500 flex-shrink-0" />
                {/* コミットE */}
                <div
                  className="rounded-lg border px-3 py-2 text-center"
                  style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
                >
                  <GitCommit className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-300 font-mono">E</p>
                </div>
                <div className="flex items-center gap-1 ml-2">
                  <ArrowRight className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-teal-500 font-semibold">main へマージ</p>
                    <p className="text-[10px] text-teal-700">→ F（マージコミット）として合流</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="rounded-lg border mt-5 p-3"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-xs font-semibold text-gray-400 mb-2">この図の読み方</p>
            <ul className="text-xs text-gray-400 space-y-1.5 leading-relaxed">
              <li>
                <span className="text-teal-300 font-mono">C</span>
                {" "}のコミット時点で feature ブランチを作成（git switch -c）
              </li>
              <li>
                feature ブランチで
                <span className="text-gray-300 font-mono"> D → E </span>
                と作業コミットを積む
              </li>
              <li>
                main に戻って git merge すると、
                <span className="text-teal-300 font-mono"> F </span>
                （マージコミット）が生まれて合流
              </li>
            </ul>
          </div>
        </ConceptDiagram>

        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          ブランチの分岐・合流の流れが分かりました。次は実際に使うコマンドを整理します。
        </p>

        {/* ── 概念図B: 主要コマンド ── */}
        <ConceptDiagram
          title="概念図B"
          description="ブランチ操作で使う主要コマンドと、それぞれの役割。"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* git branch */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <GitBranch className="w-4 h-4 text-teal-400" />
                <p className="text-sm font-bold text-white font-mono">git branch</p>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed mb-2">
                ブランチの一覧を表示する。現在のブランチに{" "}
                <span className="text-teal-300">*</span> が付く。
              </p>
              <div
                className="rounded border px-3 py-2 font-mono text-xs"
                style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
              >
                <p className="text-teal-300">* main</p>
                <p className="text-gray-500">  feature/login</p>
              </div>
            </div>

            {/* git switch -c */}
            <div
              className="rounded-xl border-2 p-4"
              style={{ backgroundColor: "rgba(45,212,191,0.06)", borderColor: "rgba(45,212,191,0.4)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Terminal className="w-4 h-4 text-teal-400" />
                <p className="text-sm font-bold text-teal-300 font-mono">git switch -c feature/xxx</p>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                新しいブランチを作成して切り替える（create の -c）。
                ブランチ作成と切り替えを1コマンドで行う最頻出パターン。
              </p>
            </div>

            {/* git switch main */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <ArrowDown className="w-4 h-4 text-gray-400" />
                <p className="text-sm font-bold text-white font-mono">git switch main</p>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                main ブランチ（または任意のブランチ）に切り替える。
                作業完了後にマージ元のブランチへ戻るときに使う。
              </p>
            </div>

            {/* git merge */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Merge className="w-4 h-4 text-teal-400" />
                <p className="text-sm font-bold text-white font-mono">git merge feature/xxx</p>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                feature/xxx ブランチの変更を、現在のブランチ（例: main）に取り込む。
                マージ先ブランチにいる状態で実行する点に注意。
              </p>
            </div>
          </div>

          <div
            className="rounded-lg border mt-4 p-3"
            style={{ backgroundColor: "rgba(45,212,191,0.05)", borderColor: "rgba(45,212,191,0.3)" }}
          >
            <p className="text-xs font-semibold text-teal-300 mb-1">よくある手順の流れ</p>
            <div className="font-mono text-xs text-gray-300 space-y-0.5 leading-loose">
              <p><span className="text-gray-500"># 1. ブランチを作って切り替える</span></p>
              <p>git switch -c feature/new-feature</p>
              <p className="mt-1"><span className="text-gray-500"># 2. 作業してコミットを積む</span></p>
              <p>{"git add . && git commit -m \"add feature\""}</p>
              <p className="mt-1"><span className="text-gray-500"># 3. main に戻ってマージする</span></p>
              <p>git switch main</p>
              <p>git merge feature/new-feature</p>
            </div>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue ──────────────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "マスター、そもそも聞いていいですか。なんでわざわざブランチを切るんでしょうか。main に直接コミットしていけばいいんじゃないですか？ 手間が増えるだけでは……？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "もっともな疑問ですね、マジさん。たとえばあなたが小説を書いているとします。\n公開中の本文ファイルに直接「次のバージョンの実験的な展開」を書き込んだらどうなりますか？\n途中で「やっぱりやめよう」と思ったとき、元に戻すのが大変ですよね。\nブランチはそのための「作業用コピー」なんです。本流（main）を壊さずに実験ができる。失敗しても捨てるだけ。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ！？ 確かに……。でもマスター、マージのところで「Fast-forward」って言葉が出てきました。これって何ですか？ マージコミットが「なし」になるってどういうこと？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "良いところに気づきましたね。Fast-forward は「早送り」の意味です。\nmain ブランチが分岐してから一切新しいコミットを積んでいない場合、\nfeature ブランチのコミット列をそのまま main の先に並べるだけでよい。\n結果として「マージした証拠のコミット」が残らず、履歴が一直線のままになります。\n一方で main にも変更が入っていた場合は、2つの流れが合流するための「マージコミット」が必要になります。",
          },
          {
            speaker: "maji",
            emotion: "doubt",
            text: "なるほど。じゃあ Fast-forward できるなら Fast-forward の方がすっきりして良い気がします。なのに `--no-ff` という「わざわざ Fast-forward を禁止するオプション」があるのはなぜですか？",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "鋭い質問です。履歴を後から見たとき、どこかで機能ブランチがマージされたという「証拠」が残っていると便利なんです。\nたとえば `git log --graph` で履歴を見たとき、--no-ff ありなら\n「このコミット群は feature/login ブランチで作業されたもの」とひと目で分かります。\nFast-forward だとその情報が消えてしまい、誰がどの機能を追加したのか追うのが難しくなります。\nチーム開発では `--no-ff` を標準にするプロジェクトも多いですよ。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "なんとなく分かってきました。最後にひとつ聞かせてください。マージが終わったブランチって、消していいんですか……？ 消したら取り返しがつかなくなりそうで怖くて。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "安心してください、マジさん。マージ済みのブランチを削除しても、コミット自体は main 側に残っています。\nブランチとは「コミットに貼ったラベル（付箋）」のようなものなので、付箋を剥がしてもコミットの中身は消えません。\n`git branch -d feature/xxx` で削除できます。小文字の -d は「マージ済みのみ削除」という安全装置付き。\n未マージのブランチを誤って消す心配はありません。\nマージ後はすみやかに削除する習慣をつけると、ブランチ一覧がすっきりして管理しやすくなりますよ。",
          },
        ]}
      />

      {/* ── 比較表 ────────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["Fast-forward merge", "Merge commit（--no-ff）"]}
          rows={[
            {
              label: "動き",
              cells: [
                "現在のブランチ位置をそのまま先に進める",
                "新しいマージコミットを作る",
              ],
              highlightCol: 1,
            },
            {
              label: "マージコミット",
              cells: ["なし", "あり"],
              highlightCol: 1,
            },
            {
              label: "履歴の見え方",
              cells: ["一直線（合流点が消える）", "分岐・合流が明確に残る"],
              highlightCol: 1,
            },
            {
              label: "使いどころ",
              cells: [
                "1人作業・小さな修正",
                "チーム開発・PR単位の追跡",
              ],
              highlightCol: 1,
            },
          ]}
          note="チーム開発では --no-ff が標準になることが多い。GitHub の「Merge pull request」ボタンはデフォルトでマージコミットを作る（--no-ff 相当）。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下は「git checkout との関係」「命名規則」など、知っておくと現場で困らない内容です。"
      />

      {/* ── TermNote ──────────────────────────────────────── */}
      <TermNote
        terms={[
          {
            word: "HEAD",
            definition:
              "今いるコミットを指すポインタ。通常はブランチ名（例: main）を介してそのブランチの最新コミットを指す。",
          },
          {
            word: "detached HEAD",
            definition:
              "HEADがブランチ名でなくコミットハッシュを直接指している状態。git checkout <ハッシュ> などで発生する。この状態で新しいコミットをしてもブランチが指さないため迷子になりやすい。",
          },
          {
            word: "upstream",
            definition:
              "ローカルブランチが追跡しているリモートブランチのこと。git push -u origin main で設定するとそれ以降は git push だけで push できるようになる。",
          },
        ]}
      />

      {/* ── 応用編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — git switch と checkout の関係
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-5">
          旧来の Git では `git checkout` が「ブランチ切り替え」と「ファイル復元」の両方を担っていました。
          Git 2.23（2019年）以降、この1つのコマンドが2つに分離されています。
        </p>

        {/* ── 概念図C: switch vs checkout ── */}
        <ConceptDiagram
          title="概念図C"
          description="git checkout の役割が switch と restore に分離された背景。"
        >
          <div className="space-y-3">
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4 text-center">
                コマンドの分離（Git 2.23+）
              </p>
              <div className="space-y-3">
                {/* checkout → 2つに分離 */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div
                    className="rounded-lg border px-3 py-2 text-center flex-shrink-0"
                    style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
                  >
                    <p className="text-xs text-gray-400 font-mono">git checkout</p>
                    <p className="text-[10px] text-gray-600 mt-0.5">旧コマンド（今も使える）</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-500 flex-shrink-0 rotate-90 sm:rotate-0" />
                  <div className="flex flex-col gap-2 flex-1">
                    <div
                      className="rounded-lg border-2 px-3 py-2"
                      style={{ backgroundColor: "rgba(45,212,191,0.07)", borderColor: "rgba(45,212,191,0.4)" }}
                    >
                      <p className="text-xs font-semibold text-teal-300 font-mono">git switch</p>
                      <p className="text-xs text-gray-400 mt-1">ブランチの切り替え・作成に特化</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        git switch main / git switch -c feature/xxx
                      </p>
                    </div>
                    <div
                      className="rounded-lg border px-3 py-2"
                      style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
                    >
                      <p className="text-xs font-semibold text-gray-300 font-mono">git restore</p>
                      <p className="text-xs text-gray-400 mt-1">ファイルの変更を元に戻すことに特化</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        git restore index.html （変更を捨てる）
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="rounded-lg border p-3"
              style={{ backgroundColor: "rgba(45,212,191,0.05)", borderColor: "rgba(45,212,191,0.3)" }}
            >
              <p className="text-xs font-semibold text-teal-300 mb-1">現場での判断基準</p>
              <p className="text-sm text-gray-300 leading-relaxed">
                新しいコードを書く場合は switch を使う。古いチュートリアルで checkout が出てきたら「ブランチ切り替えなら switch、ファイル復元なら restore に読み替えてよい」と考えてOK。checkout 自体は今でも動くので焦らなくて大丈夫。
              </p>
            </div>
          </div>
        </ConceptDiagram>

        <p className="text-sm text-gray-400 leading-relaxed my-6">
          コマンドの整理ができました。次はチーム開発で重要な「ブランチの命名規則」を確認しましょう。
        </p>

        {/* ── 概念図D: ブランチ命名規則 ── */}
        <ConceptDiagram
          title="概念図D"
          description="現場でよく使われるブランチのプレフィックス一覧。"
        >
          <UseCaseGrid
            cols={2}
            items={[
              {
                Icon: BookOpen,
                title: "feature/",
                subtitle: "新機能の追加",
                description:
                  "例: feature/user-auth / feature/dark-mode。新しい機能を開発するブランチ。最も使用頻度が高い。",
                accentColor: "teal",
              },
              {
                Icon: Wrench,
                title: "fix/",
                subtitle: "バグ修正",
                description:
                  "例: fix/login-error / fix/typo-header。バグや不具合の修正専用ブランチ。緊急でないものに使う。",
                accentColor: "blue",
              },
              {
                Icon: GitBranch,
                title: "hotfix/",
                subtitle: "緊急の本番修正",
                description:
                  "例: hotfix/critical-security。本番で発生した重大バグを急いで直すブランチ。main から直接切って直接マージする。",
                accentColor: "red",
              },
              {
                Icon: History,
                title: "release/",
                subtitle: "リリース準備",
                description:
                  "例: release/v1.2.0。リリース前の最終調整・バージョン番号更新などに使う。Git Flow で多用される。",
                accentColor: "violet",
              },
            ]}
          />
          <p className="text-xs text-gray-500 text-center mt-4">
            プレフィックスはチームのルールに合わせる。ない場合は feature/ と fix/ だけ覚えておけば十分。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── 詳細解説 ──────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="個人開発でもブランチを切るべきか？">
          <p>
            プロジェクトの規模・フェーズによって判断してよい。
          </p>
          <div className="space-y-3 mt-2">
            <div
              className="rounded-lg border p-3"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">フェーズ別の判断目安</p>
              <div className="space-y-2">
                <div className="flex gap-3 items-start">
                  <span
                    className="text-xs px-1.5 py-0.5 rounded font-mono flex-shrink-0"
                    style={{ backgroundColor: "rgba(45,212,191,0.1)", color: "#2dd4bf", border: "1px solid rgba(45,212,191,0.3)" }}
                  >
                    0〜2
                  </span>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    学習・プロトタイプ段階。main 直コミットで十分。ブランチより「とにかく動かす」に集中してよい。
                  </p>
                </div>
                <div className="flex gap-3 items-start">
                  <span
                    className="text-xs px-1.5 py-0.5 rounded font-mono flex-shrink-0"
                    style={{ backgroundColor: "rgba(251,191,36,0.1)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.3)" }}
                  >
                    3+
                  </span>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    機能が増えてきたら機能単位でブランチを切る習慣をつける。「この機能が壊れたとき main を汚さずに捨てられる」メリットが体感できるようになる。
                  </p>
                </div>
              </div>
            </div>
          </div>
          <KeyPoint>
            個人開発でも「実験的な変更」や「大きな機能追加」はブランチを切る価値がある。失敗したらブランチごと捨てられるのが最大のメリット。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="ブランチ削除のタイミングと手順">
          <p>
            マージ済みのブランチは原則すみやかに削除する。ブランチを溜め込むと「どれが今生きているブランチか」が分からなくなる。
          </p>
          <CodeBlock
            title="ブランチ削除の手順"
            language="bash"
            code={`# ── ローカルブランチの削除 ──
# -d: マージ済みのみ削除（安全）
git branch -d feature/login

# -D: 強制削除（マージ未済でも消す）
git branch -D feature/abandoned

# ── リモートブランチの削除 ──
git push origin --delete feature/login

# ── マージ済みブランチを一覧表示 ──
# （main にマージ済みのブランチが分かる）
git branch --merged main`}
          />
          <WarningPoint>
            `-D`（大文字）は強制削除。マージ前のブランチも消えるので、作業が失われる可能性がある。使うときは本当にそのブランチが不要かを確認してから。
          </WarningPoint>
          <KeyPoint>
            GitHub のPRがマージされると「Delete branch」ボタンが自動で出る。これを押すとリモートブランチが削除される。ローカルは手動で `git branch -d` が必要。
          </KeyPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/git/basics",
            title: "GitとGitHubとは",
            description: "4エリアのデータフロー・基本コマンドの全体像",
            icon: "GitBranch",
          },
          {
            href: "/git/pullrequest",
            title: "Pull Request",
            description: "レビュー・議論・マージの流れ",
            icon: "GitPullRequest",
          },
          {
            href: "/git/rebase",
            title: "rebase",
            description: "履歴を整理する・コミットを書き直す",
            icon: "History",
          },
        ]}
      />

      <PageDrill questions={branchQuestions} />
    </div>
  );
}
