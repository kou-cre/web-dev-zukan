import Link from "next/link";
import {
  GitBranch,
  Cloud,
  HardDrive,
  FolderOpen,
  Plus,
  Globe,
  Copy,
  FileX,
  ShieldAlert,
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
import { gitBasicsQuestions } from "@/content/questions/git/basics";

export const metadata = {
  title: "GitとGitHubとは | Web開発図解",
  description:
    "GitとGitHubの違いと、コードが作業ツリー・ステージ・ローカル・リモートの4エリアを移動する仕組みを図解で解説。git add / commit / push / pull の役割を一気に整理する。",
};

export default function GitBasicsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/git" className="text-xs text-gray-500 hover:text-white transition-colors mb-6 block">
        ← Git / GitHub に戻る
      </Link>
      <Hero
        category="Git"
        title="GitとGitHubとは"
        subtitle={"コードの「セーブ機能」と「クラウド同期」の仕組みを図解する"}
        body={"GitとGitHubの違いと、4エリアのデータフローを1ページで掴む。"}
        accentColor="indigo"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "GitとGitHubが別物だと分かる",
          "4エリアの流れを矢印で追える",
          "git add / commit / push / pull の役割を区別できる",
        ]}
        prerequisites={[
          "ターミナルの基本操作（cd / ls）",
          "ファイルとフォルダの概念",
        ]}
        outOfScope={[
          "ブランチとマージ",
          "Pull Request",
          "rebase・cherry-pick",
        ]}
      />

      <OnePageSummary
        keyMessage="Gitはローカルのタイムマシン。GitHubはそれをクラウドに置く棚。"
        metaphorTitle="ゲームのセーブとクラウド同期"
        metaphorPoints={[
          {
            label: "Git",
            real: "Gitはゲームのセーブ機能。好きなタイミングで現在地を記録でき、いつでも過去の状態に巻き戻せる",
            metaphor: "ゲームのセーブ機能",
          },
          {
            label: "GitHub",
            real: "GitHubはそのセーブデータのクラウド同期サービス。別のPCからも続きをプレイでき、チームで同じデータを共有できる",
            metaphor: "クラウドセーブ同期",
          },
          {
            label: "4エリア",
            real: "コードは「作業ツリー → ステージ → ローカル → リモート」の4エリアを順番に移動する。各コマンドがどのエリア間を繋ぐかを掴むことが Git 理解の核心",
            metaphor: "4つの引き出し",
          },
        ]}
        definition="git = 時間を巻き戻せる仕組み。GitHub = それをチームで共有する場所。"
      />

      {/* ── 用語メモ（基礎編で登場するリポジトリを先に解説） ── */}
      <TermNote
        terms={[
          {
            word: "リポジトリ",
            definition:
              "Gitが管理するプロジェクト一式のこと。ファイルの中身だけでなく、変更の全履歴も含めて保管している。ローカルリポジトリとリモートリポジトリがある。",
          },
        ]}
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まずは「GitとGitHubはそもそも何が違うのか」を確認し、次に「コードがどう移動するか」を図で見ていきましょう。
        </p>

        {/* ── 概念図A: GitとGitHubの違い ── */}
        <ConceptDiagram
          title="概念図A"
          description="GitとGitHubは別物。何がどう違うのかを並べて確認する。"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Git */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <GitBranch className="w-5 h-5" style={{ color: "#818cf8" }} />
                <p className="text-sm font-bold text-white">Git</p>
                <span
                  className="ml-auto text-xs px-1.5 py-0.5 rounded-full border"
                  style={{
                    backgroundColor: "rgba(129,140,248,0.15)",
                    borderColor: "rgba(129,140,248,0.4)",
                    color: "#a5b4fc",
                  }}
                >
                  ローカルのソフト
                </span>
              </div>
              <ul className="text-xs text-gray-400 space-y-1.5 leading-relaxed">
                <li>
                  <span className="text-gray-300">種類：</span>
                  コードの変更履歴を記録するローカルソフト
                </li>
                <li>
                  <span className="text-gray-300">機能：</span>
                  履歴管理・ブランチ・マージ
                </li>
                <li>
                  <span className="text-gray-300">特徴：</span>
                  インターネット不要で使える
                </li>
              </ul>
              <p className="text-xs text-gray-500 mt-3 leading-tight">
                Linus Torvaldsが2005年に作ったOSSツール。GitHubがなくても単独で動く。
              </p>
            </div>

            {/* GitHub */}
            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "rgba(129,140,248,0.06)",
                borderColor: "rgba(129,140,248,0.4)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Cloud className="w-5 h-5" style={{ color: "#818cf8" }} />
                <p className="text-sm font-bold text-white">GitHub</p>
                <span
                  className="ml-auto text-xs px-1.5 py-0.5 rounded-full border"
                  style={{
                    backgroundColor: "rgba(129,140,248,0.15)",
                    borderColor: "rgba(129,140,248,0.4)",
                    color: "#a5b4fc",
                  }}
                >
                  クラウドサービス
                </span>
              </div>
              <ul className="text-xs text-gray-300 space-y-1.5 leading-relaxed">
                <li>
                  <span className="text-white">種類：</span>
                  クラウドでリポジトリを共有するサービス
                </li>
                <li>
                  <span className="text-white">機能：</span>
                  コードのクラウド共有・チームとの共同編集
                </li>
                <li>
                  <span className="text-white">特徴：</span>
                  GitLab・Bitbucketも同じ役割の別サービス
                </li>
              </ul>
              <p className="text-xs text-gray-400 mt-3 leading-tight">
                2008年サービス開始。2018年にMicrosoftが買収。世界最大のコードホスティングサービス。
              </p>
            </div>
          </div>
          <div
            className="rounded-lg border mt-4 p-3"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-xs font-semibold text-gray-400 mb-1">まとめ</p>
            <p className="text-xs text-gray-400 leading-relaxed">
              Git = ローカルのセーブ機能。GitHub = そのセーブデータをネット上に置く棚。
              「GitHubを使う = Gitを使っている」だが「Gitを使う = GitHubを使っている」とは限らない。
            </p>
          </div>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed my-6">
          GitとGitHubが別物だと分かった。次は「コードが実際にどう移動するか」を4エリアのフローで確認しよう。
        </p>

        {/* ── 概念図B: 4エリアのデータフロー ── */}
        <ConceptDiagram
          title="概念図B"
          description="コードは「作業ツリー → ステージ → ローカルリポジトリ → リモート」の4エリアを移動する。"
        >
          {/* 上方向フロー（push方向） */}
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 text-center">
            変更を保存する流れ（push方向）
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 flex-wrap">
            <FlowCard
              Icon={FolderOpen}
              title="作業ツリー"
              subtitle="ファイルを編集する場所"
            />
            <FlowArrow label="git add" sublabel=".（またはファイル名）" direction="right" />
            <FlowCard
              Icon={Plus}
              title="ステージ"
              subtitle="次のコミットに含める変更を選ぶ場所"
              highlight
              accentColor="indigo"
            />
            <FlowArrow label="git commit" sublabel='-m "メッセージ"' direction="right" />
            <FlowCard
              Icon={HardDrive}
              title="ローカルリポジトリ"
              subtitle="変更履歴が積み上がる場所"
            />
            <FlowArrow label="git push" sublabel="origin main" direction="right" />
            <FlowCard
              Icon={Cloud}
              title="リモート（GitHub）"
              subtitle="チームで共有するクラウド"
            />
          </div>

          {/* 下方向フロー（pull方向） */}
          <div className="mt-5">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 text-center">
              リモートの変更を取り込む流れ（pull方向）
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 flex-wrap">
              <FlowCard
                Icon={Cloud}
                title="リモート（GitHub）"
                subtitle="チームの最新コード"
              />
              <FlowArrow label="git pull" sublabel="（fetch + merge）" direction="right" />
              <FlowCard
                Icon={HardDrive}
                title="ローカルリポジトリ"
                subtitle="ローカルの履歴が更新"
              />
              <FlowArrow label="反映" direction="right" />
              <FlowCard
                Icon={FolderOpen}
                title="作業ツリー"
                subtitle="ファイルが最新状態になる"
                highlight
                accentColor="indigo"
              />
            </div>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            ステージというワンクッションがあるおかげで「今回のコミットに含める変更だけを選んで記録できる」。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（基礎編 — ComparisonTableの前） ───── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "マスター、GitとGitHubって同じじゃないんですか？ 名前も似てるし、ボクずっと同じものだと思ってました。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "よくある誤解ですよ、マジさん。ゲームで例えるとこうです。\nGitはゲームのセーブ機能そのもの。どこでも、オフラインでも、好きなタイミングで状態を記録できます。\nGitHubはそのセーブデータをクラウドに保存して、別のPCからも続きを遊べるサービスです。\nGitがなければGitHubは成り立ちませんが、GitはGitHubなしでも単独で使えます。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？ じゃあ…なんでステージっていう中間地点があるんですか？\n変更したらすぐコミット、でよくないですか？ 余計な手間では……？",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "いい疑問ですね。写真の選別を想像してみてください。\n旅行で100枚写真を撮ったとして、全部まとめてアルバムに貼りますか？\n普通は「これとこれだけ今日のページに入れよう」と選びますよね。\nステージはその選別作業のための場所です。\n10個ファイルを変更したとしても「今回のコミットはAとBの変更だけ」と選んで記録できます。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "てことは…複数のファイルを変えていても、1つだけステージに乗せてコミットできるってこと！？ それすごく細かく管理できますね。",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "そうです。git add ファイル名 と指定すれば1ファイルずつ選べます。\ngit add . と書けば全変更がステージに乗ります。\n実務では「バグ修正と新機能を同じコミットに混ぜない」ようにするために、ステージで丁寧に選別することが多いですよ。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "あ、でもマスター……git push したら元に戻せないんですよね？ 間違えてpushしたら大惨事では……？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "安心してください、Gitには git revert（コミットを打ち消す新しいコミットを作る）や git reset（ローカルで履歴を巻き戻す）など、戻す手段があります。\nただしpush後に無理やり巻き戻すと、チームの他のメンバーの履歴と衝突することがあります。\n「コミット前によく確認」「push前にもう一度見直す」この2段階を習慣にするだけで、大半の事故は防げますよ。",
          },
        ]}
      />

      {/* ── 比較表（基礎編） ──────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["動き", "方向"]}
          rows={[
            {
              label: "git add",
              cells: ["変更をステージに追加", "作業ツリー → ステージ"],
            },
            {
              label: "git commit",
              cells: ["ステージをローカルに記録", "ステージ → ローカルリポジトリ"],
              highlightCol: 0,
            },
            {
              label: "git push",
              cells: ["ローカルをリモートに送信", "ローカル → リモート"],
            },
            {
              label: "git pull",
              cells: ["リモートを取得して適用", "リモート → ローカル + 作業ツリー"],
            },
            {
              label: "git fetch",
              cells: ["リモート情報を取得（適用なし）", "リモート → ローカルリポジトリのみ"],
            },
          ]}
          note="push は「ローカル → リモート」、pull は「リモート → ローカル」。方向を覚えると混乱しにくい。fetch は pull の前半だけ（取得のみ）を行うコマンド。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下はoriginやHEADなど、少し踏み込んだGit概念を扱います。コマンドの使い方に慣れてから読むと理解が深まります。"
      />

      {/* ── 応用編 TermNote ────────────────────────────────── */}
      <TermNote
        terms={[
          {
            word: "origin",
            definition:
              "リモートリポジトリに付ける慣習的な名前。git clone するとリモートのURLが自動的に origin という名前で登録される。origin/main はリモートのmainブランチを指す。",
          },
          {
            word: "HEAD",
            definition:
              "今自分がいるコミットを指すポインタ。通常はブランチの最新コミットを指している。「今どこにいるか」を示す目印。",
          },
        ]}
      />

      {/* ── 応用編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — originとHEADの関係
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          Gitを使い続けると「ローカルのmainとリモートのorigin/mainが別々に進む」場面に出会います。
          fetch と pull の違いを理解するとこの仕組みがよく分かります。
        </p>

        {/* ── 概念図C: origin/main と main の並走 ── */}
        <ConceptDiagram
          title="概念図C"
          description="ローカルのmainブランチとリモートのorigin/mainは別々に存在する。fetchで同期、mergeで統合。"
        >
          <div className="space-y-4">
            {/* ローカルとリモートの並走図 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                className="rounded-xl border p-4"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <HardDrive className="w-4 h-4 text-gray-400" />
                  <p className="text-xs font-semibold text-gray-300 uppercase tracking-wide">
                    ローカル
                  </p>
                </div>
                <div className="space-y-2">
                  <div
                    className="rounded border px-3 py-2 text-xs"
                    style={{
                      backgroundColor: "rgba(129,140,248,0.08)",
                      borderColor: "rgba(129,140,248,0.35)",
                    }}
                  >
                    <p className="font-mono" style={{ color: "#a5b4fc" }}>main</p>
                    <p className="text-gray-500 mt-0.5">自分のブランチ。コミットを積んでいく</p>
                  </div>
                  <div
                    className="rounded border px-3 py-2 text-xs"
                    style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
                  >
                    <p className="font-mono text-gray-400">origin/main</p>
                    <p className="text-gray-500 mt-0.5">リモートの状態を「ローカルで参照する」コピー。git fetch で更新される</p>
                  </div>
                </div>
              </div>

              <div
                className="rounded-xl border p-4"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <p className="text-xs font-semibold text-gray-300 uppercase tracking-wide">
                    リモート（GitHub）
                  </p>
                </div>
                <div
                  className="rounded border px-3 py-2 text-xs"
                  style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
                >
                  <p className="font-mono text-gray-400">main（origin側）</p>
                  <p className="text-gray-500 mt-0.5">チームメンバーのpushが積まれる。自分のローカルとズレが生じることがある</p>
                </div>
              </div>
            </div>

            {/* fetch vs pull の比較 */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
            >
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 text-center">
                git fetch vs git pull
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  className="rounded-lg border p-3"
                  style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
                >
                  <p className="text-xs font-bold text-gray-300 mb-2 font-mono">git fetch</p>
                  <div className="flex items-center gap-2 text-xs">
                    <Cloud className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-400">リモート</span>
                    <FlowArrow label="" direction="right" />
                    <HardDrive className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-400">origin/main</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                    リモートの情報を origin/main として取得するだけ。作業ツリーもmainブランチも変更しない。「まず確認してから適用したい」ときに使う。
                  </p>
                </div>
                <div
                  className="rounded-lg border p-3"
                  style={{
                    backgroundColor: "rgba(129,140,248,0.06)",
                    borderColor: "rgba(129,140,248,0.3)",
                  }}
                >
                  <p className="text-xs font-bold mb-2 font-mono" style={{ color: "#a5b4fc" }}>git pull</p>
                  <div className="flex items-center gap-2 text-xs">
                    <Cloud className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-400">リモート</span>
                    <FlowArrow label="" direction="right" />
                    <FolderOpen className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#818cf8" }} />
                    <span style={{ color: "#a5b4fc" }}>main + 作業ツリー</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                    fetch + merge をまとめて実行。リモートの変更を取得してそのままローカルのブランチに適用する。最もよく使う取り込みコマンド。
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            「pull = fetch + merge」。fetchで確認してからmergeするのが丁寧な方法。慣れてきたらpullで一気にやる。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── 詳細解説 ────────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading=".gitignore で除外すべきもの">
          <p>
            <strong className="text-white">.gitignore</strong> はGitの管理対象から除外するファイル・フォルダを指定するファイル。
            プロジェクトのルートに置く。
          </p>
          <p>
            以下は必ず除外する代表的なもの：
          </p>
          <div className="space-y-2 mt-3">
            <div
              className="rounded-lg border p-3 flex gap-3"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <FileX className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-200">node_modules/</p>
                <p className="text-xs text-gray-400 leading-relaxed mt-0.5">
                  npmでインストールした依存パッケージ。数万ファイルになることも。
                  package.json があれば npm install で復元できるので Git に含める必要はない。
                </p>
              </div>
            </div>
            <div
              className="rounded-lg border p-3 flex gap-3"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <FileX className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-200">.env</p>
                <p className="text-xs text-gray-400 leading-relaxed mt-0.5">
                  APIキーやパスワードなどの秘密情報が書かれることが多いファイル。
                  GitHubに上げると情報漏洩になる。必ず除外する。
                </p>
              </div>
            </div>
            <div
              className="rounded-lg border p-3 flex gap-3"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <FileX className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-200">.DS_Store</p>
                <p className="text-xs text-gray-400 leading-relaxed mt-0.5">
                  MacのOSがフォルダを開くたびに自動生成するファイル。
                  コードとは無関係なのでリポジトリに含めない。
                </p>
              </div>
            </div>
          </div>
          <KeyPoint>
            gitignore.io（サービス）にOS・言語・フレームワークを入力すると、適切な .gitignore を自動生成してくれる。毎回手書きしなくてよい。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="初回だけ必要な git clone">
          <p>
            <strong className="text-white">git clone</strong> はリモートリポジトリをまるごとローカルにコピーするコマンド。
            既存プロジェクトに初めて参加するときや、GitHubのリポジトリを手元で動かしたいときに使う。
          </p>
          <p>
            日常的な add / commit / push / pull とは異なり、<strong className="text-white">使うのは最初の1回だけ</strong>。
            clone 後は通常のコマンドで作業を続ける。
          </p>
          <KeyPoint>
            git clone &lt;リポジトリURL&gt; を実行すると、カレントディレクトリにプロジェクトのフォルダが作成され、リモートが origin として自動登録される。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="公開してよいキーとダメなキー">
          <p>
            GitHubにコードを上げるとき、どのファイルまで公開してよいか迷うことがある。
            特に Firebase を使うプロジェクトでは以下を覚えておく。
          </p>
          <div className="space-y-3 mt-3">
            <div
              className="rounded-lg border p-3 flex gap-3"
              style={{
                backgroundColor: "rgba(34,197,94,0.05)",
                borderColor: "rgba(34,197,94,0.3)",
              }}
            >
              <Copy className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-green-300">Firebase Web SDK キー — 公開 OK</p>
                <p className="text-xs text-gray-400 leading-relaxed mt-0.5">
                  apiKey / projectId などの設定オブジェクト。ブラウザに配布される設計のため、
                  公開しても問題ない。実際のアクセス制御は Firebase のセキュリティルールで行う。
                </p>
              </div>
            </div>
            <div
              className="rounded-lg border p-3 flex gap-3"
              style={{
                backgroundColor: "rgba(239,68,68,0.06)",
                borderColor: "rgba(239,68,68,0.4)",
              }}
            >
              <ShieldAlert className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-300">Firebase Service Account JSON — 絶対NG</p>
                <p className="text-xs text-gray-400 leading-relaxed mt-0.5">
                  サーバー側の秘密鍵。これが漏れると Firestore・Storage・Authentication など
                  すべてのリソースに無制限アクセスできてしまう。絶対に .gitignore に入れること。
                </p>
              </div>
            </div>
          </div>
          <WarningPoint>
            秘密鍵を含むファイルを誤ってpushした場合、git履歴を書き換えても漏洩のリスクがある。すぐにそのキーを無効化（ローテーション）することが最優先。「消した」だけでは不十分。
          </WarningPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/git/branch",
            title: "ブランチと分岐",
            description: "チーム開発を支えるブランチ戦略",
            icon: "GitBranch",
          },
          {
            href: "/git/pullrequest",
            title: "Pull Request",
            description: "コードレビューとマージの仕組み",
            icon: "GitPullRequest",
          },
          {
            href: "/git/workflow",
            title: "Gitワークフロー",
            description: "GitHub Flowの実践手順",
            icon: "GitCommit",
          },
        ]}
      />

      <PageDrill questions={gitBasicsQuestions} />
    </div>
  );
}
