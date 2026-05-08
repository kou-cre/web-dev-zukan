import {
  Terminal,
  Folder,
  FolderOpen,
  FilePlus,
  FolderPlus,
  MapPin,
  List,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

import { Hero } from "@/components/Hero";
import { Prerequisites } from "@/components/Prerequisites";
import { OnePageSummary } from "@/components/OnePageSummary";
import {
  ConceptDiagram,
  FlowCard,
  FlowArrow,
  StackLayer,
} from "@/components/ConceptDiagram";
import { ComparisonTable } from "@/components/ComparisonTable";
import { MajiDialogue } from "@/components/MajiDialogue";
import { RelatedLinks } from "@/components/RelatedLinks";
import { PageDrill } from "@/components/PageDrill";
import { DetailSection, DetailBlock, KeyPoint, WarningPoint } from "@/components/DetailSection";
import { SectionDivider } from "@/components/SectionDivider";
import { TermNote } from "@/components/TermNote";
import { UseCaseGrid } from "@/components/UseCaseGrid";
import { CodeBlock } from "@/components/CodeBlock";
import { CorrectionCard } from "@/components/CorrectionCard";
import { terminalQuestions } from "@/content/questions/env/terminal";

export const metadata = {
  title: "ターミナル基本コマンド | Web開発図解",
  description:
    "cd・ls・mkdir・touch・pwdの5コマンドとパスの概念を図解で解説。ターミナルを怖くなく使えるようになる。",
};

export default function TerminalPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/env" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← 開発環境セットアップに戻る
        </Link>
      </div>

      <Hero
        category="開発環境セットアップ"
        title="ターミナル基本コマンド"
        subtitle={"コンピューターへの直接命令書き——5コマンドで開発の9割は回せる"}
        body={"cd・ls・mkdir・touch・pwd の使い方とパスの概念を一気に掴む。"}
        accentColor="slate"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "ターミナルとは何か（GUIの裏側にある操作方法）",
          "パスとは何か（ファイル・フォルダの住所）",
          "pwd・ls・cd・mkdir・touch の基本5コマンド",
        ]}
        prerequisites={[
          "フォルダとファイルの概念を知っている",
          "キーボードで文字を入力できる",
          "VSCodeを開いたことがある（内蔵ターミナルを使う）",
        ]}
        outOfScope={[
          "シェルスクリプト（コマンドを自動化するプログラム）",
          "パイプ（｜）でコマンドをつなぐ応用操作",
          "vim・nanoなどターミナル内テキストエディタ",
        ]}
      />

      <OnePageSummary
        keyMessage="ターミナルは『コンピューターへの直接命令書き』。GUIのクリック操作を全てテキストで書いたもの。最初は暗号に見えるが、5つのコマンドを覚えれば開発作業のほとんどが回せる。コマンドの多くは英語の省略形なので、意味が分かると急に親しみやすくなる。"
        metaphorTitle="地図と住所"
        metaphorPoints={[
          {
            label: "パス",
            real: "ファイルやフォルダの場所を示す住所。スラッシュ（/）で区切られる",
            metaphor: "建物の住所",
          },
          {
            label: "pwd",
            real: "今自分がどのフォルダにいるかを表示する（print working directory）",
            metaphor: "今いる場所を地図で確認",
          },
          {
            label: "ls",
            real: "今いるフォルダの中にあるものを一覧表示する（list）",
            metaphor: "周りを見渡して何があるか確認",
          },
          {
            label: "cd",
            real: "指定したフォルダに移動する（change directory）",
            metaphor: "指定の住所まで歩く",
          },
        ]}
        definition="ターミナルはテキストでOSに命令するインターフェース。GUIのクリック操作と対応するが、高速・自動化・リモート操作に優れ、開発では必須のツール。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まず「GUIとターミナルがどう対応しているか」を確認してから、ファイルの住所（パス）の書き方を図で掴みましょう。
        </p>

        {/* ── 概念図A: GUI vs ターミナル ── */}
        <ConceptDiagram
          title="概念図A"
          description="クリック操作とコマンドの対応——やっていることは同じ"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3 text-center">
                GUIの操作
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Folder className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                  <span className="text-xs text-gray-400">フォルダをダブルクリックして移動</span>
                </div>
                <div className="flex items-center gap-3">
                  <List className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span className="text-xs text-gray-400">フォルダを開いて中身を確認</span>
                </div>
                <div className="flex items-center gap-3">
                  <FolderPlus className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span className="text-xs text-gray-400">右クリック → 新規フォルダ</span>
                </div>
                <div className="flex items-center gap-3">
                  <FilePlus className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span className="text-xs text-gray-400">右クリック → 新規ファイル</span>
                </div>
              </div>
            </div>

            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "rgba(100,116,139,0.06)",
                borderColor: "rgba(100,116,139,0.4)",
              }}
            >
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3 text-center">
                ターミナルのコマンド
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-300 w-20 flex-shrink-0">cd project</span>
                  <span className="text-xs text-gray-500">フォルダに移動</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-300 w-20 flex-shrink-0">ls</span>
                  <span className="text-xs text-gray-500">中身を一覧表示</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-300 w-20 flex-shrink-0">mkdir app</span>
                  <span className="text-xs text-gray-500">新規フォルダを作成</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-300 w-20 flex-shrink-0">touch index.ts</span>
                  <span className="text-xs text-gray-500">空ファイルを作成</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            GUIとターミナルは「やっていること」は同じ。ターミナルはより速く・自動化できる。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          GUIとの対応が分かりました。次は「パス（住所）の書き方」を図で確認します。
        </p>

        <TermNote
          terms={[
            {
              word: "パス",
              definition:
                "ファイルやフォルダの場所を示す住所。フォルダを「/」で区切って書く。例: /Users/maji/project",
            },
            {
              word: "絶対パス",
              definition:
                "ルート（/）から始まる完全な住所。どこから実行しても同じ場所を指す。例: /Users/maji/Documents/project",
            },
            {
              word: "相対パス",
              definition:
                "今いる場所（カレントディレクトリ）からの相対的な住所。./app は「今いる場所のappフォルダ」、../は「1つ上のフォルダ」を意味する。",
            },
          ]}
        />

        {/* ── 概念図B: パスの構造 ── */}
        <ConceptDiagram
          title="概念図B"
          description="パスはフォルダの入れ子構造を『/』で書いた住所"
        >
          <div
            className="rounded-xl border-2 border-dashed border-slate-700/50 p-4"
          >
            <p className="text-xs font-semibold text-slate-500 text-center mb-4 tracking-wide uppercase">
              フォルダ構造 = パスの階層
            </p>
            <StackLayer
              Icon={MapPin}
              title="/ （ルートディレクトリ）"
              subtitle="全てのフォルダの起点。Macなら最上位。Windowsでは C:\\ に相当"
              iconColor="text-gray-400"
            />
            <StackLayer
              Icon={FolderOpen}
              title="/Users/maji （ユーザーフォルダ）"
              subtitle="あなたのホームフォルダ。ターミナルを開いたときのデフォルト位置"
              iconColor="text-slate-400"
            />
            <StackLayer
              Icon={FolderOpen}
              title="/Users/maji/Documents/project （プロジェクト）"
              subtitle="実際に作業するプロジェクトフォルダ"
              iconColor="text-slate-300"
              showArrow={false}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <div
              className="rounded-lg border p-3"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-gray-400 mb-2">絶対パス</p>
              <p className="font-mono text-xs text-slate-300">/Users/maji/Documents/project</p>
              <p className="text-xs text-gray-500 mt-1">ルート（/）から書いた完全な住所</p>
            </div>
            <div
              className="rounded-lg border p-3"
              style={{
                backgroundColor: "rgba(100,116,139,0.06)",
                borderColor: "rgba(100,116,139,0.3)",
              }}
            >
              <p className="text-xs font-semibold text-slate-400 mb-2">相対パス</p>
              <p className="font-mono text-xs text-slate-300">./project &nbsp; ../Documents</p>
              <p className="text-xs text-gray-500 mt-1">今いる場所（.）からの相対的な住所</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            ./ = 今いるフォルダ &nbsp;|&nbsp; ../ = 1つ上のフォルダ
          </p>
        </ConceptDiagram>

      </section>

      <p className="text-sm text-gray-400 leading-relaxed mb-6 px-1">
        GUIとの対応とパスの書き方が分かりました。マジくんがよく抱く疑問と一緒に、コマンドをもう一度整理してみましょう。
      </p>

      {/* ── MajiDialogue（基礎編） ────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "マスター、なぜターミナルなんか使わないといけないんですか！\nフォルダをダブルクリックすればいいだけじゃないんですか……",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "実はGUIとターミナルは『やっていること』は同じです、マジさん。\nしかし10個のフォルダを作るとき、GUIは10回クリックが必要。ターミナルなら1行で全部できます。\nさらにnpm installのような命令はGUIで操作できないため、開発にはターミナルが必須なんです。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "えっ、GUIとやってることが同じなんですか！\nコマンドって全部暗号みたいに見えて……意味があるんですか？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "全部英語の省略形です。cdはchange directory（フォルダを変える）、lsはlist（一覧）、pwdはprint working directory（今いる場所を表示）。\n住所の書き方のルールさえ覚えれば、あとはほぼ読めます。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？ ls ってリストの略なんですか！\nそれなら覚えられそう……じゃあ cd .. ってよく見るんですが、あの .. は何ですか？",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "これは『パス（住所）』の書き方のルールです。\n.（ドット1つ）は今いる場所、..（ドット2つ）は1つ上のフォルダ、という意味になります。\n住所で言うと『一本手前の通りに戻る』と同じイメージですね。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "つまり cd .. で1つ上に戻れる。でも今自分がどこにいるか分からなくなったら、どうすればいいんでしょう……",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "そのときは pwd です、マジさん。print working directoryの略で、今いる場所の完全な住所をそのまま表示してくれます。\n迷子になったらまずpwd、それがターミナルの道標です。",
          },
        ]}
      />

      {/* ── 比較表 ────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON — 基本5コマンドのまとめ
        </h2>
        <ComparisonTable
          headers={["意味（省略元）", "やること"]}
          rows={[
            {
              label: "pwd",
              cells: ["print working directory", "今いるフォルダの完全パスを表示"],
              highlightCol: -1,
            },
            {
              label: "ls",
              cells: ["list", "今いるフォルダの中身を一覧表示"],
              highlightCol: -1,
            },
            {
              label: "cd フォルダ名",
              cells: ["change directory", "指定したフォルダに移動"],
              highlightCol: -1,
            },
            {
              label: "mkdir フォルダ名",
              cells: ["make directory", "新しいフォルダを作成"],
              highlightCol: -1,
            },
            {
              label: "touch ファイル名",
              cells: ["touch（触る）", "空のファイルを作成"],
              highlightCol: -1,
            },
          ]}
          note="コマンドは全て英語の省略形。意味を覚えると暗号ではなく『人間の言葉』に見えてくる。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下は5コマンドのフロー図・絶対パスと相対パスの詳細・ls -la フラグ・よくあるミスなど、より詳しい内容です。"
      />

      {/* ── 応用編 ── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — 5コマンドの流れとパスの詳細
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          基本5コマンドを流れで確認してから、絶対パスと相対パスの使い分け、ls の便利なオプション、よくある落とし穴を見ていきます。
        </p>

        {/* ── 概念図C: 基本5コマンドのフロー ── */}
        <ConceptDiagram
          title="概念図C"
          description="5コマンドを覚えれば、ターミナルでの作業はほぼ対応できる"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 flex-wrap">
            <FlowCard
              Icon={MapPin}
              title="pwd"
              subtitle="今いる場所を確認"
            />
            <FlowArrow label="移動" direction="right" />
            <FlowCard
              Icon={Terminal}
              title="cd"
              subtitle="フォルダを移動"
              highlight
              accentColor="slate"
            />
            <FlowArrow label="確認" direction="right" />
            <FlowCard
              Icon={List}
              title="ls"
              subtitle="中身を一覧表示"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 flex-wrap mt-4">
            <FlowCard
              Icon={FolderPlus}
              title="mkdir"
              subtitle="フォルダを作成"
            />
            <FlowArrow label="ファイル追加" direction="right" />
            <FlowCard
              Icon={FilePlus}
              title="touch"
              subtitle="空ファイルを作成"
              highlight
              accentColor="slate"
            />
          </div>
          <div
            className="rounded-lg border mt-4 p-3"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-xs font-semibold text-gray-400 mb-2">コード例で確認</p>
            <div className="font-mono text-xs space-y-1 leading-relaxed">
              <p className="text-gray-500">{"# 今いる場所を確認"}</p>
              <p className="text-slate-300">pwd</p>
              <p className="text-gray-500 mt-1">{"# Documentsの中のprojectに移動"}</p>
              <p className="text-slate-300">cd Documents/project</p>
              <p className="text-gray-500 mt-1">{"# 中身を表示"}</p>
              <p className="text-slate-300">ls</p>
              <p className="text-gray-500 mt-1">{"# appというフォルダを作る"}</p>
              <p className="text-slate-300">mkdir app</p>
              <p className="text-gray-500 mt-1">{"# 空のindex.tsを作る"}</p>
              <p className="text-slate-300">touch index.ts</p>
            </div>
          </div>
        </ConceptDiagram>

        <p className="text-sm text-gray-400 leading-relaxed mb-6 mt-6">
          次は絶対パスと相対パスの使い分け、ls の便利なオプションを確認します。
        </p>

        <TermNote
          terms={[
            {
              word: ". （ドット1つ）",
              definition:
                "カレントディレクトリ（今いる場所）を表す。./app は「今いる場所の中のappフォルダ」という意味。",
            },
            {
              word: ".. （ドット2つ）",
              definition:
                "1つ上のディレクトリ（親フォルダ）を表す。cd .. で1つ上に戻れる。../../ で2階層上に戻る。",
            },
            {
              word: "ls -la",
              definition:
                "隠しファイル（.gitignore など）も含めて詳細情報（権限・サイズ・日時）と共に表示するオプション。",
            },
          ]}
        />
      </section>

      <DetailSection title="詳細解説">
        <DetailBlock heading="7.1 よく使うコマンドパターン">
          <p>
            単独のコマンドだけでなく、組み合わせると効率的に使えるパターンがあります。
          </p>
          <CodeBlock
            title="ターミナル"
            language="bash"
            code={`# ホームフォルダに一発で戻る（~ は $HOME の略）
cd ~
# または
cd

# 隠しファイルも含めて詳細表示
ls -la

# フォルダを作って中に移動する（&&でつなぐ）
mkdir project && cd project

# 複数のフォルダを一気に作る
mkdir src public

# フォルダの中にファイルを作る（/ でパスを指定）
touch src/index.ts

# ひとつ上のフォルダに移動
cd ..

# 2階層上に移動
cd ../..`}
          />
          <KeyPoint>
            Tab キーでパス・コマンドを補完できる。途中まで打ってTab押すと候補が出る。長いパスを手打ちする必要はない。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="7.2 迷子になったときの対処">
          <UseCaseGrid cols={3} items={[
            {
              Icon: MapPin,
              title: "pwd で現在地確認",
              subtitle: "まずここから",
              description: "今どこにいるかを確認する。パスが表示されるので、自分がどの深さにいるか分かる。",
              accentColor: "slate",
            },
            {
              Icon: FolderOpen,
              title: "ls で周囲を確認",
              subtitle: "次にここ",
              description: "今いる場所の中身を見る。どんなファイル・フォルダがあるかを把握する。",
              accentColor: "slate",
            },
            {
              Icon: Terminal,
              title: "cd ~ でホームに戻る",
              subtitle: "リセット技",
              description: "どこにいても ~ でホームフォルダに戻れる。完全に迷子になったときのリセット手段。",
              accentColor: "slate",
            },
          ]} />
        </DetailBlock>

        <DetailBlock heading="7.3 よくある落とし穴">
          <CorrectionCard
            misconception="コマンドは大文字・小文字を区別しないので LS と ls は同じ"
            correction="Linuxとmacのターミナルは大文字・小文字を区別する。LS はコマンドが見つからないとエラーになる"
            reason="ls は小文字、mkdir は小文字、全部小文字が基本。大文字のコマンドはほとんど存在しない。ターミナルは大文字・小文字に敏感だと覚えておく。"
          />
          <WarningPoint>
            rm コマンド（ファイル削除）は「ゴミ箱」を経由しない完全削除。rm -rf（フォルダごと削除）は特に危険で、間違ったパスを指定すると重要ファイルが戻らなくなる。慣れるまでは使わない方が安全。
          </WarningPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/env/nodejs",
            title: "Node.js と npm",
            description: "ターミナルでnpm installを実行する環境を整える",
            icon: "Server",
          },
          {
            href: "/env/vscode",
            title: "VSCode と拡張機能",
            description: "VSCode内蔵ターミナルの使い方を確認",
            icon: "Code2",
          },
          {
            href: "/env/package-json",
            title: "package.json の読み方",
            description: "npm run dev などのコマンドがどう定義されているか",
            icon: "FileJson",
          },
        ]}
      />

      <PageDrill questions={terminalQuestions} />
    </div>
  );
}
