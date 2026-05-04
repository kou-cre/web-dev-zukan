import {
  Archive,
  AlertTriangle,
  Layers,
  GitBranch,
  RotateCcw,
  List,
  Inbox,
  BookMarked,
  ArrowDownToLine,
  Trash2,
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
import { stashQuestions } from "@/content/questions/git/stash";

export const metadata = {
  title: "stash（一時退避）| Web開発図解",
  description:
    "git stash の使い方を図解で解説。作業を一時退避して別ブランチで作業し、また戻る流れをマスターする。",
};

export default function StashPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Hero
        category="Git"
        title="stash（一時退避）"
        subtitle={"作業を中断して別の仕事をし、またすぐ戻れる「一時保存ボタン」"}
        body={"git stash の使い方と、stash / pop / apply / list の使い分けを1ページで整理する。"}
        accentColor="slate"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "stashがどんな状況で必要になるか",
          "git stash / stash pop / stash list の使い方",
          "stash と commit の使い分け",
        ]}
        prerequisites={[
          "ブランチの基本（git switch）",
          "git add / commit の概念",
        ]}
        outOfScope={[
          "stash の名前付けの詳細（push -m との違いなど）",
          "stash の部分適用（-p オプション）",
          "stash をブランチに変換する git stash branch",
        ]}
      />

      {/* ── OnePageSummary ──────────────────────────────────── */}
      <OnePageSummary
        keyMessage="stash は作業中断の「一時保存ボタン」。コミットするほどじゃないけど消したくない変更を、一時的に棚に上げて後から取り出せる仕組みだ。"
        metaphorTitle="料理の途中で別の用事が入った"
        metaphorPoints={[
          {
            label: "作業中",
            real: "コードを書いている最中に急ぎの修正依頼が来た。中途半端なコードはコミットできない",
            metaphor: "料理の途中",
          },
          {
            label: "git stash",
            real: "未コミットの変更を退避させ、作業ツリーをきれいな状態に戻す",
            metaphor: "鍋を火から下ろしてとっておく",
          },
          {
            label: "別ブランチで作業",
            real: "別ブランチに切り替えて急ぎの修正を完了させる",
            metaphor: "別の用事を片付ける",
          },
          {
            label: "git stash pop",
            real: "退避させた変更を元のブランチに取り戻して続きから作業再開",
            metaphor: "鍋を火に戻して料理再開",
          },
        ]}
        definition="stash = 未コミットの変更を一時的に棚に上げ、後で取り出せる仕組み。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まずは「stashがどんな場面で登場するか」と「stashスタックの仕組み」を図で確認しましょう。
        </p>

        {/* ── 概念図A: 典型的な使用シーン ── */}
        <ConceptDiagram
          title="概念図A"
          description="stashの典型的な使用シーン。作業中に急ぎの修正依頼が来た時の流れ。"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 flex-wrap">
            <FlowCard
              Icon={Archive}
              title="作業中"
              subtitle="feature ブランチでコードを書いている"
            />
            <FlowArrow label="急ぎの依頼" sublabel="割り込み発生" direction="right" />
            <FlowCard
              Icon={Inbox}
              title="stashで退避"
              subtitle="git stash"
              highlight
              accentColor="slate"
            />
            <FlowArrow label="切り替え" sublabel="git switch" direction="right" />
            <FlowCard
              Icon={GitBranch}
              title="別ブランチで修正"
              subtitle="main などで対応"
            />
            <FlowArrow label="戻る" sublabel="git stash pop" direction="right" />
            <FlowCard
              Icon={RotateCcw}
              title="作業再開"
              subtitle="変更が復元された状態"
            />
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            stash がなければ「中途半端なコミット」か「変更を捨てる」しかなかった場面を解決する。
          </p>
        </ConceptDiagram>

        <p className="text-sm text-gray-400 leading-relaxed my-6 px-1">
          使用シーンが分かりました。次は stash がどういう順番で積まれ、取り出されるかを確認しましょう。
        </p>

        {/* ── 概念図B: stashスタック（LIFO） ── */}
        <ConceptDiagram
          title="概念図B"
          description={"プリングルズの缶と同じで、最後に入れたものが最初に出てくる。これをスタック構造（LIFO = Last In First Out）という。stashはこの順番で変更を積み上げ、取り出す。"}
        >
          <div className="space-y-3">
            {/* スタック視覚化 */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4 text-center">
                git stash list の表示順
              </p>
              <div className="space-y-2">
                <div
                  className="rounded-lg border px-4 py-2.5 flex items-center gap-3"
                  style={{ backgroundColor: "rgba(148,163,184,0.08)", borderColor: "rgba(148,163,184,0.4)" }}
                >
                  <span className="text-xs font-mono text-slate-300 font-bold w-24 flex-shrink-0">stash@{"{0}"}</span>
                  <span className="text-xs text-gray-300">最後にstashした変更（pop するとここから）</span>
                  <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-slate-500/20 text-slate-300 border border-slate-500/30">最新</span>
                </div>
                <div
                  className="rounded-lg border px-4 py-2.5 flex items-center gap-3"
                  style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
                >
                  <span className="text-xs font-mono text-gray-400 w-24 flex-shrink-0">stash@{"{1}"}</span>
                  <span className="text-xs text-gray-400">2回前にstashした変更</span>
                </div>
                <div
                  className="rounded-lg border px-4 py-2.5 flex items-center gap-3"
                  style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
                >
                  <span className="text-xs font-mono text-gray-500 w-24 flex-shrink-0">stash@{"{2}"}</span>
                  <span className="text-xs text-gray-500">3回前にstashした変更</span>
                  <span className="ml-auto text-xs text-gray-600">古い</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 text-center mt-4">
                番号が小さいほど新しい。git stash pop は常に stash@{"{0}"} から取り出す。
              </p>
            </div>

            {/* LIFO説明 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                className="rounded-lg border p-3"
                style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
              >
                <p className="text-xs font-semibold text-gray-300 mb-2">積む順番（stash）</p>
                <div className="space-y-1 text-xs text-gray-400">
                  <p>1回目: 変更A をstash → stash@{"{0}"}</p>
                  <p>2回目: 変更B をstash → stash@{"{0}"}（Aが{"{1}"}に）</p>
                  <p>3回目: 変更C をstash → stash@{"{0}"}（B→{"{1}"}、A→{"{2}"}）</p>
                </div>
              </div>
              <div
                className="rounded-lg border p-3"
                style={{ backgroundColor: "rgba(148,163,184,0.05)", borderColor: "rgba(148,163,184,0.3)" }}
              >
                <p className="text-xs font-semibold text-slate-300 mb-2">取り出す順番（pop）</p>
                <div className="space-y-1 text-xs text-gray-300">
                  <p>1回pop: 変更C が出てくる（最後に積んだC）</p>
                  <p>2回pop: 変更B が出てくる</p>
                  <p>3回pop: 変更A が出てくる（最初に積んだA）</p>
                </div>
              </div>
            </div>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue ─────────────────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "マスター、ブランチを切り替えたい時って、コミットしないといけないんですか？ 作業が途中でコミットするのも変な気がして……。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "その感覚は正しいですよ、マジさん。中途半端な状態をコミットするのは、履歴が汚れますからね。\nそういう時に使うのが git stash です。未コミットの変更を「一時保管庫」に退避させて、作業ツリーをきれいにする。退避後はブランチを自由に切り替えられます。\n終わったら git stash pop で退避した変更を戻すだけです。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "なるほど！ でも待ってください、stash と「WIPコミット」ってどっちがいいんですか？ 同僚が git commit -m \"WIP\" してるの見たことあって……。",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "どちらもあり得る選択です。使い分けはこう考えてください。\nstash は「すぐ（数時間以内に）戻る」短期退避向き。コミット履歴には残りません。\nWIPコミットは「数日後に戻る」長期中断向き。履歴に残るので、後から「あの途中作業はどこへ行った？」と迷子になりにくい。\nstashを数日間放置すると、後から何の作業か分からなくなることがあります。",
          },
          {
            speaker: "maji",
            emotion: "doubt",
            text: "stash pop と stash apply って両方あるじゃないですか。何が違うんですか？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "pop は「取り出して使ったら棚から片付ける」。apply は「棚からコピーを取り出して棚にも残す」です。\npop を使うと stash@{0} が消えます。apply を使うと stash に残ったままになる。\n同じ変更を複数のブランチに試したい時は apply が便利ですが、普段は pop で十分です。\napply を使った場合は、不要になったら git stash drop で手動削除するのを忘れずに。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "あと git stash -u っていうのもよく見るんですが、普通の git stash と何が違うんですか……？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "良いところに気づきましたね。-u は「--include-untracked（未追跡ファイルも含める）」の略です。\nデフォルトの git stash は git add していない新規ファイルをstashに含めません。その新規ファイルは作業ツリーにそのまま残ってしまう。\n新規ファイルも含めてまるっと退避させたい時は git stash -u を使います。\n作業ツリーを完全にきれいにしたい場合は -u をつける習慣にするといいですよ。",
          },
        ]}
      />

      {/* ── 比較表 ──────────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["コマンド", "動き", "未追跡ファイルの扱い"]}
          rows={[
            {
              label: "git stash",
              cells: ["変更をstashに保存しWorkingTreeを元に戻す", "含まない（新規ファイルは残る）"],
              highlightCol: 0,
            },
            {
              label: "git stash -u",
              cells: ["未追跡ファイルも含めてstash", "含む"],
              highlightCol: 0,
            },
            {
              label: "git stash pop",
              cells: ["最新stashを適用してstashから削除", "—"],
              highlightCol: 0,
            },
            {
              label: "git stash apply",
              cells: ["最新stashを適用（stashには残る）", "—"],
              highlightCol: 0,
            },
            {
              label: "git stash drop",
              cells: ["最新stashを削除するだけ（適用しない）", "—"],
              highlightCol: 0,
            },
            {
              label: "git stash list",
              cells: ["積み上がったstashの一覧を表示", "—"],
              highlightCol: 0,
            },
          ]}
          note="基本的な使い方は git stash → 別作業 → git stash pop の3ステップ。新規ファイルも含めたいなら -u をつける。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下は「複数stashの管理」と「stash vs WIPコミット」の使い分けについて深掘りします。"
      />

      {/* ── TermNote ────────────────────────────────────────── */}
      <TermNote
        terms={[
          {
            word: "WIP",
            definition: "Work In Progress の略。未完成・作業途中であることを示す。コミットメッセージ等に使われる。",
          },
          {
            word: "LIFO",
            definition: "Last In First Out。スタック構造の取り出し方式で、最後に積んだものが最初に取り出される。",
          },
          {
            word: "未追跡ファイル",
            definition: "git add していない新規ファイルのこと。Gitはまだ認識しておらず、デフォルトの git stash では退避されない。",
          },
        ]}
      />

      {/* ── 応用編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          複数のstashが積み上がった場合の番号指定と、stashとWIPコミットの使い分け判断を確認しましょう。
        </p>

        {/* ── 概念図C: 複数stashの管理 ── */}
        <ConceptDiagram
          title="概念図C"
          description="複数のstashが積み上がったとき。番号を指定して特定のstashを取り出す方法。"
        >
          <div className="space-y-4">
            {/* コマンド例 */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-gray-400 mb-3">
                git stash list の結果と番号指定の例
              </p>
              <div className="font-mono text-xs space-y-1.5 leading-relaxed">
                <p className="text-gray-500">{"# git stash list の出力"}</p>
                <p>
                  <span className="text-slate-300">stash@{"{0}"}</span>
                  <span className="text-gray-500">: WIP on feature/login: 3a1b2c9 ログイン画面のレイアウト</span>
                </p>
                <p>
                  <span className="text-gray-400">stash@{"{1}"}</span>
                  <span className="text-gray-500">: WIP on main: 8e4f1d0 ヘッダーの修正途中</span>
                </p>
                <p>
                  <span className="text-gray-500">stash@{"{2}"}</span>
                  <span className="text-gray-600">: WIP on feature/api: 2c9a4b1 API呼び出しの実装途中</span>
                </p>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-xs font-semibold text-gray-400">番号を指定して取り出す</p>
                <div className="font-mono text-xs space-y-1 leading-relaxed">
                  <p>
                    <span className="text-slate-300">git stash apply stash@{"{2}"}</span>
                    <span className="text-gray-500 ml-2">{"# API作業を取り出す（削除しない）"}</span>
                  </p>
                  <p>
                    <span className="text-gray-400">git stash drop stash@{"{2}"}</span>
                    <span className="text-gray-500 ml-2">{"# 取り出したら手動で削除"}</span>
                  </p>
                </div>
              </div>
            </div>
            <div
              className="rounded-lg border p-3"
              style={{ backgroundColor: "rgba(148,163,184,0.05)", borderColor: "rgba(148,163,184,0.3)" }}
            >
              <p className="text-xs font-semibold text-slate-300 mb-2">実践ルール</p>
              <p className="text-sm text-gray-300 leading-relaxed">
                stash が複数積み上がってきたら要注意。各stashの内容を覚えていられる「短期退避」の範囲を超えているサインかもしれない。そういう場合はWIPコミットに切り替えた方が管理しやすい。
              </p>
            </div>
          </div>
        </ConceptDiagram>

        <p className="text-sm text-gray-400 leading-relaxed my-6 px-1">
          複数stashの扱いを確認しました。次に「stashとWIPコミット」どちらを選ぶかの判断基準を整理します。
        </p>

        {/* ── 概念図D: stash vs WIPコミット ── */}
        <ConceptDiagram
          title="概念図D"
          description="stash と WIPコミット、どちらを選ぶべきか？ 状況に応じた使い分け判断図。"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* stash側 */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "rgba(148,163,184,0.05)", borderColor: "rgba(148,163,184,0.4)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Archive className="w-5 h-5 text-slate-400" />
                <p className="text-sm font-bold text-white">git stash</p>
                <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-slate-500/15 text-slate-300 border border-slate-500/30">
                  短期退避
                </span>
              </div>
              <ul className="text-xs text-gray-300 space-y-2 leading-relaxed">
                <li className="flex gap-2">
                  <span className="text-slate-400 flex-shrink-0">▸</span>
                  <span>数時間〜1日以内に戻る予定</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-slate-400 flex-shrink-0">▸</span>
                  <span>コミット履歴を汚したくない</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-slate-400 flex-shrink-0">▸</span>
                  <span>割り込み対応・ちょっとした切り替え</span>
                </li>
              </ul>
            </div>

            {/* WIPコミット側 */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <BookMarked className="w-5 h-5 text-blue-400" />
                <p className="text-sm font-bold text-white">WIPコミット</p>
                <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30">
                  長期中断
                </span>
              </div>
              <ul className="text-xs text-gray-300 space-y-2 leading-relaxed">
                <li className="flex gap-2">
                  <span className="text-blue-400 flex-shrink-0">▸</span>
                  <span>数日〜1週間以上戻れない</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-400 flex-shrink-0">▸</span>
                  <span>何の作業か記録として残したい</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-400 flex-shrink-0">▸</span>
                  <span>リモートにプッシュしてバックアップしたい</span>
                </li>
              </ul>
              <p className="text-xs text-gray-500 mt-3">
                例: git commit -m {"\"WIP: ログイン画面の途中\""}
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            「今日中に戻れる」→ stash。「いつ戻れるか分からない」→ WIPコミット。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── DetailSection ───────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="stashが残ったまま長期間放置する危険性">
          <p>
            stashはGitのデータベースに保存されるため、自動削除されることはない。しかし時間が経つほど「これは何の作業のためにstashしたのか」が分からなくなっていく。
          </p>
          <p>
            特に複数のstashが積み上がった場合、stash@{"{3}"}の内容が何だったか確認するには <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#94a3b8" }}>git stash show stash@{"{3}"}</code> で差分を見るしかなく、コンテキストが頭から消えた後では判断が難しい。
          </p>
          <WarningPoint>
            stashは「短期退避」の道具。数日以上作業を中断する場合は WIPコミット（git commit -m {"\"WIP: 〇〇の途中\""}）を作ってブランチに残す方が管理しやすい。WIPコミットはリモートにpushしてバックアップも取れる。
          </WarningPoint>
        </DetailBlock>

        <DetailBlock heading="stash に説明をつける（git stash save）">
          <p>
            デフォルトの git stash は「WIP on ブランチ名: コミットハッシュ コミットメッセージ」という自動生成の説明しかつかない。複数のstashを使い分ける場合は、説明文を自分でつけることができる。
          </p>
          <div
            className="rounded-lg border p-4 font-mono text-xs leading-relaxed"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-gray-500 mb-2">{"# 説明付きでstashする"}</p>
            <p>
              <span className="text-slate-300">git stash save </span>
              <span className="text-green-300">{'"ログイン画面のバリデーション実装途中"'}</span>
            </p>
            <p className="mt-3 text-gray-500">{"# git stash list の結果"}</p>
            <p>
              <span className="text-gray-300">stash@{"{0}"}: On feature/login: </span>
              <span className="text-green-300">ログイン画面のバリデーション実装途中</span>
            </p>
          </div>
          <KeyPoint>
            git stash save は古い記法で、新しい git stash push -m {"\"説明文\""} と同じ意味。どちらも使えるが、push の方が後から追加されたより明示的な書き方なので、覚えるなら push を推奨。
          </KeyPoint>
        </DetailBlock>
      </DetailSection>

      {/* ── RelatedLinks ────────────────────────────────────── */}
      <RelatedLinks
        items={[
          {
            href: "/git/branch",
            title: "ブランチとマージ",
            description: "stashと組み合わせるブランチ操作の基礎",
            icon: "GitBranch",
          },
          {
            href: "/git/basics",
            title: "GitとGitHubとは",
            description: "4エリアのデータフロー・基本コマンドの全体像",
            icon: "GitMerge",
          },
          {
            href: "/git/rebase",
            title: "rebase -i（履歴整形）",
            description: "WIPコミットを後から整理する方法",
            icon: "History",
          },
        ]}
      />

      {/* ── PageDrill ───────────────────────────────────────── */}
      <PageDrill questions={stashQuestions} />
    </div>
  );
}
