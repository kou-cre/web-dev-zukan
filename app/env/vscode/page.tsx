import {
  Code2,
  Search,
  AlertTriangle,
  CheckCheck,
  Keyboard,
  Settings,
  Zap,
} from "lucide-react";
import Link from "next/link";

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
import { UseCaseGrid } from "@/components/UseCaseGrid";
import { CodeBlock } from "@/components/CodeBlock";
import { CorrectionCard } from "@/components/CorrectionCard";
import { vscodeQuestions } from "@/content/questions/env/vscode";

export const metadata = {
  title: "VSCode と拡張機能 | Web開発図解",
  description:
    "VSCodeがWeb開発の標準エディタである理由と、最低限入れるべき拡張機能・便利な設定を図解で解説。",
};

export default function VscodePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/env" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← 開発環境セットアップに戻る
        </Link>
      </div>

      <Hero
        category="開発環境セットアップ"
        title="VSCode と拡張機能"
        subtitle={"開発の『作業場』を整える——エディタ選びと必須プラグイン"}
        body={"VSCodeの基本機能と、入れておくだけで開発効率が一変する拡張機能5選を解説。"}
        accentColor="slate"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "VSCode = 無料・高機能なコードエディタで開発の作業場",
          "拡張機能 = VSCodeに機能を追加するプラグイン",
          "最低限入れておくべき拡張機能5選と役割",
        ]}
        prerequisites={[
          "エディタとはコードを書くためのアプリのこと",
          "ファイルを保存するとはどういうことか知っている",
          "インターネットからアプリをインストールしたことがある",
        ]}
        outOfScope={[
          "settings.jsonの詳細なカスタマイズ",
          "workspace設定とuser設定の違い",
          "スニペット（コードテンプレート）の自作",
        ]}
      />

      <OnePageSummary
        keyMessage="VSCodeは『メモ帳の超進化版』。コードを書くだけでなく、ミスをリアルタイムで指摘し、補完を提案し、Gitの操作まで画面内でできる。拡張機能を入れることで、ただのテキストエディタから専門の開発環境に変わる。"
        metaphorTitle="職人の工具箱"
        metaphorPoints={[
          {
            label: "VSCode本体",
            real: "無料で手に入る汎用の工具箱。そのままでも使えるが、専用工具を追加すると本領発揮する",
            metaphor: "基本の工具箱",
          },
          {
            label: "拡張機能",
            real: "用途別の専用工具。ESLintはミス検出機、Prettierはコード整形機",
            metaphor: "専用工具を後付け",
          },
          {
            label: "settings.json",
            real: "工具箱の棚の配置カスタマイズ。保存時の動作・フォントサイズ・インデントを制御",
            metaphor: "棚の配置を自分向けに",
          },
        ]}
        definition="VSCodeはMicrosoft製の無料コードエディタ。拡張機能エコシステムで機能を拡張でき、TypeScript・React開発に最適化された豊富なプラグインが揃っている。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まず「なぜメモ帳ではダメなのか」を確認してから、拡張機能を入れる仕組みを見ていきます。
        </p>

        {/* ── 概念図A: メモ帳 vs VSCode ── */}
        <ConceptDiagram
          title="概念図A"
          description="エディタの差は『書いた後』に出る——メモ帳とVSCodeの違い"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3 text-center">
                メモ帳・テキストエディタ
              </p>
              <div className="space-y-2 text-xs text-gray-500 leading-relaxed">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-gray-600 flex-shrink-0 mt-0.5" />
                  <span>ミスしても気づかない（エラー表示なし）</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-gray-600 flex-shrink-0 mt-0.5" />
                  <span>コードの補完がない（全部手打ち）</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-gray-600 flex-shrink-0 mt-0.5" />
                  <span>Git操作は別アプリで行う必要がある</span>
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
              <p className="text-xs font-semibold text-slate-300 uppercase tracking-widest mb-3 text-center">
                VSCode（拡張機能あり）
              </p>
              <div className="space-y-2 text-xs text-gray-300 leading-relaxed">
                <div className="flex items-start gap-2">
                  <CheckCheck className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                  <span>書きながらリアルタイムでエラーを検出</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCheck className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                  <span>途中まで打つとコードを自動補完</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCheck className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                  <span>Git・ターミナル・デバッグまで統合</span>
                </div>
              </div>
            </div>
          </div>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          VSCodeの良さが分かりました。次は「拡張機能をインストールする仕組み」を確認します。
        </p>

        {/* ── 概念図B: 拡張機能のインストール手順 ── */}
        <ConceptDiagram
          title="概念図B"
          description="拡張機能はMarketplaceから1クリックで入れられる"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 flex-wrap">
            <FlowCard
              Icon={Search}
              title="Marketplaceで検索"
              subtitle="Ctrl+Shift+X でパネルを開く"
            />
            <FlowArrow label="検索" direction="right" />
            <FlowCard
              Icon={Code2}
              title="拡張機能を選ぶ"
              subtitle="ダウンロード数・評価を確認"
              highlight
              accentColor="slate"
            />
            <FlowArrow label="Install" direction="right" />
            <FlowCard
              Icon={Zap}
              title="即時有効化"
              subtitle="再起動なしで使えるものが多い"
            />
          </div>
          <div
            className="rounded-lg border mt-4 p-3"
            style={{ backgroundColor: "rgba(100,116,139,0.05)", borderColor: "rgba(100,116,139,0.25)" }}
          >
            <p className="text-xs font-semibold text-slate-300 mb-2">コマンドパレットからも入れられる</p>
            <div className="font-mono text-xs text-gray-400 space-y-1">
              <p><span className="text-slate-300">Ctrl+Shift+P</span> でコマンドパレットを開く</p>
              <p>{">"}Extensions: Install Extensions と入力して検索</p>
            </div>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（基礎編） ────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "マスター、なぜVSCodeじゃないとダメなんですか？\nメモ帳でコードを書いてもいいのでは……？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "職人さんを想像してください、マジさん。\nカッターだけでも家具を作れないことはないですが、電動工具があると作業が10倍速い。\nVSCodeは開発専用の電動工具箱です。書きながら間違いを指摘し、コードを自動補完し、保存するだけで整形してくれます。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "保存するだけで自動で整形されるんですか！？\nボクずっと手でスペースを調整していたんですが……それ全部VSCodeにやってもらえるんですか！",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "Prettierという拡張機能を入れて、保存時に自動フォーマットをONにするだけです。\nインデントのズレ・括弧の位置・引用符の統一、全部自動でやってくれます。\n一度設定すれば、永遠に手動整形は不要になります。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？ では拡張機能は全部入れた方がいいんですか！？\nボク、良さそうなのを全部インストールしていたんですが……",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "それは少し危険です、マジさん……。\n拡張機能を入れすぎると起動が遅くなり、逆効果になります。\n最初に入れるのは5本だけで十分です。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "5本だけ……どれを選べばいいんでしょう。間違えたら後で困りますか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "ESLint・Prettier・GitLens・Japanese Language Pack・Tailwind CSS IntelliSense、この5本があれば90%のケースは快適に開発できます、マジさん。\n後から追加も削除も自由なので、まずこの5本から始めてみてください。",
          },
        ]}
      />

      {/* ── 比較表 ────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON — 必須拡張機能5選
        </h2>
        <ComparisonTable
          headers={["拡張機能", "役割", "なぜ必要か"]}
          rows={[
            {
              label: "ESLint",
              cells: ["コードの問題をリアルタイム検出", "書いてすぐにミスに気づける"],
              highlightCol: -1,
            },
            {
              label: "Prettier",
              cells: ["保存時にコードを自動整形", "フォーマットで悩む時間がゼロになる"],
              highlightCol: -1,
            },
            {
              label: "GitLens",
              cells: ["Git履歴をエディタ内で確認", "誰がいつ何を変えたかが一目で分かる"],
              highlightCol: -1,
            },
            {
              label: "Japanese Language Pack",
              cells: ["UIを日本語化", "メニューが分かりやすくなる"],
              highlightCol: -1,
            },
            {
              label: "Tailwind CSS IntelliSense",
              cells: ["CSSのクラス名を自動補完", "スタイルの名前を暗記しなくてよくなる（Tailwind CSS使用時）"],
              highlightCol: -1,
            },
          ]}
          note="この5本がベースライン。Next.js / Reactで開発するなら、まずこれだけ入れておけば困らない。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下はショートカット・settings.json・よくある設定ミスなど、より快適にするための内容です。"
      />

      {/* ── 応用編 ── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — ショートカットと settings.json
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          基本操作が慣れてきたら、ショートカットとsettings.jsonで作業速度をさらに上げましょう。
        </p>

        <TermNote
          terms={[
            {
              word: "settings.json",
              definition:
                "VSCodeの設定をJSON形式で書いたファイル。GUIの設定パネルで変えられるものは全てここに書かれており、直接編集できる。",
            },
            {
              word: "コマンドパレット",
              definition:
                "Ctrl+Shift+P（Mac: Cmd+Shift+P）で開く全機能検索窓。名前で検索してほぼ全操作が実行できる。",
            },
            {
              word: "ワークスペース設定",
              definition:
                "プロジェクトフォルダ内の .vscode/settings.json に書く設定。チームで共有できる。ユーザー設定より優先される。",
            },
          ]}
        />
      </section>

      <DetailSection title="詳細解説">
        <DetailBlock heading="7.1 覚えておくべきショートカット3選">
          <p>
            VSCodeには数百のショートカットがありますが、最初に覚えるのは3つだけで十分です。
          </p>
          <UseCaseGrid cols={3} items={[
            {
              Icon: Search,
              title: "Ctrl + P",
              subtitle: "ファイル名で検索",
              description: "プロジェクト内のファイルを名前で即座に開く。フォルダの階層を辿る必要がなくなる。",
              accentColor: "slate",
            },
            {
              Icon: Settings,
              title: "Ctrl+Shift+P",
              subtitle: "コマンドパレット",
              description: "全機能を名前で検索して実行できる。VSCodeの神機能。まずここから全部探せる。",
              accentColor: "slate",
            },
            {
              Icon: Keyboard,
              title: "Ctrl + ` （バッククォート）",
              subtitle: "ターミナルを開く",
              description: "VSCode内蔵ターミナルを開く。別アプリを切り替えずにコマンドを実行できる。",
              accentColor: "slate",
            },
          ]} />
          <KeyPoint>
            コマンドパレット（Ctrl+Shift+P）さえ覚えれば他は全部そこから探せる。「保存」「フォーマット」「Git」などと打てば関連するコマンドが全部出てくる。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="7.2 settings.jsonの基本設定">
          <p>
            Ctrl+Shift+P で「settings.json を開く」と検索すると、直接設定ファイルを編集できます。
            最低限この設定を入れておくと、保存するたびにPrettierが自動整形してくれます。
          </p>
          <CodeBlock
            title=".vscode/settings.json"
            language="json"
            code={`{
  // 保存時に自動でフォーマット
  "editor.formatOnSave": true,

  // デフォルトのフォーマッターをPrettierに
  "editor.defaultFormatter": "esbenp.prettier-vscode",

  // インデントを2スペースに
  "editor.tabSize": 2,

  // ターミナルのフォントをエディタに合わせる
  "terminal.integrated.fontFamily": "monospace",

  // ファイルツリーでnode_modulesを非表示（任意）
  "files.exclude": {
    "**/node_modules": true
  }
}`}
          />
        </DetailBlock>

        <DetailBlock heading="7.3 よくある落とし穴">
          <CorrectionCard
            misconception="拡張機能はたくさん入れるほど便利になる"
            correction="拡張機能は入れすぎると起動が遅くなり、逆効果になる。使っていない拡張機能は無効化するか削除する"
            reason="VSCodeは拡張機能を有効にするたびに起動時のメモリ消費が増える。最初は5本から始めて、必要になってから追加する方針が合理的。"
          />
          <WarningPoint>
            ESLintとPrettierは設定が競合することがある。eslint-config-prettierというパッケージを入れると、ESLintのフォーマット関連ルールをPrettierに委ねる設定ができる。
          </WarningPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/env/terminal",
            title: "ターミナル基本コマンド",
            description: "VSCode内蔵ターミナルで使う基本コマンドを確認",
            icon: "Terminal",
          },
          {
            href: "/env/nodejs",
            title: "Node.js と npm",
            description: "VSCodeで開発するための実行環境を整える",
            icon: "Server",
          },
          {
            href: "/env/package-json",
            title: "package.json の読み方",
            description: "ESLint・Prettierのpackage.json設定を理解する",
            icon: "FileJson",
          },
        ]}
      />

      <PageDrill questions={vscodeQuestions} />
    </div>
  );
}
