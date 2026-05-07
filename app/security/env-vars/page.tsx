import Link from "next/link";
import {
  KeyRound,
  Eye,
  EyeOff,
  Globe,
  Server,
  ShieldCheck,
  AlertTriangle,
  FileCode,
  GitBranch,
  Lock,
} from "lucide-react";

import { Hero } from "@/components/Hero";
import { Prerequisites } from "@/components/Prerequisites";
import { OnePageSummary } from "@/components/OnePageSummary";
import { ConceptDiagram, FlowCard, FlowArrow, StackLayer } from "@/components/ConceptDiagram";
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
import { envVarsQuestions } from "@/content/questions/security/env-vars";

export const metadata = {
  title: "環境変数とシークレット管理 | Web開発図解",
  description:
    ".envファイルの使い方・NEXT_PUBLIC_の意味・公開していい変数といけない変数の見分け方を図解で解説。",
};

export default function EnvVarsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/security" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← セキュリティ基礎に戻る
        </Link>
      </div>

      <Hero
        category="セキュリティ基礎"
        title="環境変数とシークレット管理"
        subtitle={".env ファイルの使い方・公開してよい変数といけない変数・NEXT_PUBLIC_ の意味"}
        body={"APIキーをコードに直書きすると事故になる。.envで安全に管理する仕組みを掴む。"}
        accentColor="amber"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          ".env ファイルとは何か・書き方のルール",
          "NEXT_PUBLIC_ をつけると何が変わるか",
          "公開してよい変数とシークレットの違い",
        ]}
        prerequisites={[
          "APIキー = 外部サービスを使うためのパスワードのようなもの",
          "GitHubにコードを公開するとファイルが世界中に見える",
          "フロントエンド（ブラウザ）とサーバーは別の場所で動く",
        ]}
        outOfScope={[
          "Vercel / Netlify の環境変数設定UIの操作手順（本番環境の設定）",
          "シークレットマネージャー（AWS Secrets Manager 等）の使い方",
          "APIキー漏洩後の緊急対処（別ページ「APIキー漏洩の対処」で扱う）",
        ]}
      />

      <OnePageSummary
        keyMessage="環境変数とは「コードに直接書きたくない値」を外部ファイルに分離する仕組み。.env に書いてGitに含めないことで、APIキーなどのシークレットを安全に管理できる。Next.jsでは NEXT_PUBLIC_ をつけた変数だけがブラウザに届く。"
        metaphorTitle="宅配便の荷物ラベル"
        metaphorPoints={[
          {
            label: "環境変数",
            real: "コードに直書きしたくない値（APIキー・DBパスワードなど）を、別の『ラベル紙』に書いておく仕組み",
            metaphor: "荷物の中身ではなくラベルに書く配送先",
          },
          {
            label: "NEXT_PUBLIC_",
            real: "このプレフィックスをつけた変数だけが、ブラウザ（フロントエンド）に届く。ない変数はサーバー側だけで使える",
            metaphor: "「表に出してよい情報」のスタンプ",
          },
          {
            label: ".gitignore",
            real: ".env をGitの管理対象から除外することで、GitHubにアップロードされるのを防ぐ",
            metaphor: "ラベル紙だけ引き出しにしまってから荷物を出す",
          },
        ]}
        definition="環境変数とはプログラムの動作設定値を、コード外部のファイルや実行環境から注入する仕組み。シークレットをコードから分離することが主な目的。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まず「なぜコードに直接書いてはいけないのか」を確認してから、.envの仕組みを図で理解しましょう。
        </p>

        {/* ── 概念図A: コードに直書きする危険 ── */}
        <ConceptDiagram
          title="概念図A"
          description="APIキーをコードに直書きすると何が起きるか？"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <FlowCard
              Icon={FileCode}
              title="ソースコード"
              subtitle={`const key = "sk-abc123..."`}
            />
            <FlowArrow label="git push" direction="right" />
            <FlowCard
              Icon={GitBranch}
              title="GitHub公開リポジトリ"
              subtitle="世界中が閲覧可能"
              highlight
              accentColor="amber"
            />
            <FlowArrow label="数秒で" direction="right" />
            <FlowCard
              Icon={AlertTriangle}
              title="悪意のあるBotが検知"
              subtitle="自動スキャンツールが常時監視"
            />
          </div>
          <div
            className="rounded-lg border mt-4 p-3"
            style={{ backgroundColor: "rgba(239,68,68,0.05)", borderColor: "rgba(239,68,68,0.3)" }}
          >
            <p className="text-xs font-semibold text-red-300 mb-2">実際に起きる被害</p>
            <p className="text-sm text-gray-300 leading-relaxed">
              GitHub上にAPIキーをpushしてから悪用されるまで、平均数十秒というデータがあります。
              Stripe（決済）のキーなら不正課金、AWS（クラウド）のキーなら数百万円の請求が発生した事例もあります。
              「プライベートリポジトリだから大丈夫」は誤解で、設定ミスや将来の公開化でリスクが残ります。
            </p>
          </div>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          直書きの危険が分かりました。次は .env を使った安全な管理の仕組みを確認します。
        </p>

        {/* ── 概念図B: .envの仕組み ── */}
        <ConceptDiagram
          title="概念図B"
          description=".env ファイルの役割と、.gitignore による保護の仕組み"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-3">
                プロジェクト構成
              </p>
              <div className="space-y-2 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <FileCode className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                  <span className="text-gray-400">.gitignore</span>
                  <span className="text-gray-600 ml-auto">Gitが無視するファイル一覧</span>
                </div>
                <div
                  className="flex items-center gap-2 rounded px-2 py-1"
                  style={{ backgroundColor: "rgba(245,158,11,0.08)", borderLeft: "2px solid #fbbf24" }}
                >
                  <EyeOff className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span className="text-amber-300">.env.local</span>
                  <span className="text-gray-500 ml-auto">Git管理外（安全）</span>
                </div>
                <div
                  className="flex items-center gap-2 rounded px-2 py-1"
                  style={{ backgroundColor: "rgba(245,158,11,0.05)", borderLeft: "2px solid rgba(245,158,11,0.3)" }}
                >
                  <EyeOff className="w-3.5 h-3.5 text-amber-400/50 flex-shrink-0" />
                  <span className="text-gray-400">.env.example</span>
                  <span className="text-gray-500 ml-auto">Git管理OK（値なし）</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileCode className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                  <span className="text-gray-400">app/page.tsx</span>
                  <span className="text-gray-600 ml-auto">ソースコード</span>
                </div>
              </div>
            </div>

            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-3">
                .env.local の中身
              </p>
              <div
                className="rounded border p-3 font-mono text-xs leading-loose"
                style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
              >
                <p className="text-gray-500"># シークレット（サーバーのみ）</p>
                <p>
                  <span className="text-amber-300">STRIPE_SECRET_KEY</span>
                  <span className="text-gray-500">=</span>
                  <span className="text-green-300">sk-live-abc123...</span>
                </p>
                <p>
                  <span className="text-amber-300">DATABASE_URL</span>
                  <span className="text-gray-500">=</span>
                  <span className="text-green-300">postgresql://...</span>
                </p>
                <p className="mt-2 text-gray-500"># ブラウザに公開OK</p>
                <p>
                  <span className="text-blue-300">NEXT_PUBLIC_SITE_URL</span>
                  <span className="text-gray-500">=</span>
                  <span className="text-green-300">https://myapp.com</span>
                </p>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            .env.local はGitに含めない → GitHubにアップされない → シークレットが守られる。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          .envの構造が分かりました。次はNext.jsで最も重要な「NEXT_PUBLIC_ の有無による違い」を図で確認します。
        </p>

        {/* ── 概念図C: NEXT_PUBLIC_ の意味 ── */}
        <ConceptDiagram
          title="概念図C"
          description="NEXT_PUBLIC_ をつけた変数だけがブラウザに届く。ない変数はサーバー側だけ。"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Server className="w-4 h-4 text-gray-400" />
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">サーバー側のみ</p>
              </div>
              <div
                className="rounded border px-3 py-2 font-mono text-xs mb-2"
                style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
              >
                <span className="text-amber-300">DATABASE_URL</span>
                <span className="text-gray-500">=...</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                NEXT_PUBLIC_ なし。
                サーバー（Node.js）でのみ読み取れる。ブラウザからはアクセスできない。
              </p>
              <p className="text-xs text-green-400 mt-2">シークレット向き</p>
            </div>

            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "rgba(245,158,11,0.05)", borderColor: "rgba(245,158,11,0.3)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-4 h-4 text-amber-400" />
                <p className="text-xs font-semibold text-amber-400 uppercase tracking-wide">ブラウザにも届く</p>
              </div>
              <div
                className="rounded border px-3 py-2 font-mono text-xs mb-2"
                style={{ backgroundColor: "rgba(245,158,11,0.08)", borderColor: "rgba(245,158,11,0.3)" }}
              >
                <span className="text-amber-300">NEXT_PUBLIC_SITE_URL</span>
                <span className="text-gray-500">=...</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                NEXT_PUBLIC_ あり。
                ビルド時にJSバンドルに埋め込まれ、ブラウザのJSコードからも読める。
              </p>
              <p className="text-xs text-amber-400 mt-2">公開情報のみ入れること</p>
            </div>
          </div>
          <div
            className="rounded-lg border mt-4 p-3"
            style={{ backgroundColor: "rgba(239,68,68,0.05)", borderColor: "rgba(239,68,68,0.3)" }}
          >
            <p className="text-xs font-semibold text-red-300 mb-2">重要：NEXT_PUBLIC_ は「世界に公開」と同じ</p>
            <p className="text-sm text-gray-300 leading-relaxed">
              NEXT_PUBLIC_ をつけた変数の値は、ビルド済みのJavaScriptファイルの中に文字列として埋め込まれます。
              ブラウザの「ソースを表示」で誰でも見られる状態になるため、
              APIキーなどのシークレットを NEXT_PUBLIC_ で公開してはいけません。
            </p>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（基礎編） ─────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "マスター、.env って結局ただのテキストファイルですよね？\nそれで何が守られるんですか？ GitHubに上げなきゃいいだけでは……。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "マジさん、それが核心です。\n.env の目的は「GitHubに上げない」ただその1点なんです。\nたとえば会社の金庫の暗証番号を、作業マニュアルに書いてみんなに配ったら困りますよね。\n暗証番号は別の鍵のかかった場所に保管して、マニュアルには『暗証番号は金庫の管理者に聞く』と書くだけで十分です。\n.envは暗証番号の保管場所、.gitignoreは『マニュアルには含めない』という指示書なんです。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "ああ、なるほど！ コードは公開しても、値だけ別の場所に置く、ということですね。\nでも、ボク NEXT_PUBLIC_ って書き方が気になっていて。\nこれって何のための書き方なんですか？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "Next.jsは大きく分けて「サーバー側」と「ブラウザ側」の2箇所でコードが動きます。\nデフォルトでは .env の変数はサーバー側だけで読めます。安全のためです。\nでも『サイトのURL』や『地図のAPIの公開キー』のように、ブラウザからも使う必要がある変数もある。\nそのために NEXT_PUBLIC_ というプレフィックスが存在するんです。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "でも待ってください、マスター……。\nNEXT_PUBLIC_ をつけたら、それって誰でも見られてしまうんじゃないですか？\nAPIキーに NEXT_PUBLIC_ をつければ便利なのに、つけちゃダメ？",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "マジさん、それはやってはいけないことです。\nNEXT_PUBLIC_ をつけた変数はビルド時にJavaScriptファイルの中に書き込まれます。\nブラウザで『ソースを表示』すれば、誰でも値が見える状態になる。\nGoogle Maps の公開キーのように、もともと公開してよいものだけ NEXT_PUBLIC_ にします。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？\nじゃあ、StripeのAPIキーとか、DBのパスワードは絶対に NEXT_PUBLIC_ にしちゃダメなんですね？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "その通りです。鉄則として「シークレット変数に NEXT_PUBLIC_ はつけない」を覚えておいてください。\nシークレットはサーバー側だけで動く処理（API RouteやServer Action）の中でのみ使います。\n見分け方は簡単で、『もし他人に見られたら困るか？』を自問するだけです。\n困るなら NEXT_PUBLIC_ なし。困らないなら NEXT_PUBLIC_ つき、というルールでほぼ間違いありません。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "完全に理解しました！\n・コードに直書き禁止\n・.env.local に書いて .gitignore に追加\n・シークレットは NEXT_PUBLIC_ なし\n・公開OKなものだけ NEXT_PUBLIC_ つき\nこれだけ守れば、ボクも安全なエンジニアですね！",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "9割正解です、マジさん。\nもうひとつだけ。チーム開発では .env.example というファイルを用意するのが慣例です。\n.env.example には変数名だけ書いて値は空にしてGitに含める。\n新しくメンバーが入ったとき、どんな変数が必要かを伝えるための地図になります。\n.env.local に実際の値を入れるのはそれぞれが自分でやる、という役割分担ですね。",
          },
        ]}
      />

      {/* ── 比較表（基礎編） ─────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["NEXT_PUBLIC_ あり", "NEXT_PUBLIC_ なし"]}
          rows={[
            {
              label: "読める場所",
              cells: ["サーバー + ブラウザ（両方）", "サーバーのみ"],
              highlightCol: 1,
            },
            {
              label: "ビルド後の扱い",
              cells: ["JSバンドルに埋め込まれる", "サーバー実行時のみ参照"],
              highlightCol: 1,
            },
            {
              label: "誰でも見られるか",
              cells: ["見られる（ソースに含まれる）", "見られない"],
              highlightCol: 1,
            },
            {
              label: "用途",
              cells: ["公開APIキー・サイトURL等", "シークレットキー・DBパスワード等"],
              highlightCol: 1,
            },
          ]}
          note="結論：迷ったら NEXT_PUBLIC_ なし（サーバー限定）にする。ブラウザから使う必要があると確認できた値にのみ NEXT_PUBLIC_ をつける。"
        />
      </section>

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下は .env のファイル種類の使い分け・本番環境への設定方法など、実際の開発でよく問われる内容です。"
      />

      {/* ── 応用編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — .env ファイルの種類と優先順位
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          Next.jsには複数の .env ファイルが存在し、それぞれ役割が異なります。
          どれが優先されるか・どれをGitに含めるかを整理しておきましょう。
        </p>

        <TermNote
          terms={[
            {
              word: ".env",
              definition:
                "最も基本のファイル。開発・本番・テスト共通のデフォルト値を書く。シークレットは書かない。",
            },
            {
              word: ".env.local",
              definition:
                "ローカル開発専用。Gitに含めない（.gitignoreで除外）。個人のシークレットや開発用の値を書く場所。",
            },
            {
              word: ".env.development",
              definition:
                "npm run dev（開発モード）のときだけ読み込まれる。開発用の設定値を書く。Gitに含めてよい（シークレット以外）。",
            },
            {
              word: ".env.production",
              definition:
                "本番ビルド時のみ読み込まれる。本番環境向けのデフォルト値。実際の本番シークレットはVercel等の環境変数UIで設定するのが安全。",
            },
          ]}
        />

        <ConceptDiagram
          title="概念図D"
          description=".env ファイルの読み込み優先順位（上が優先される）"
        >
          <div className="space-y-2">
            <StackLayer
              Icon={Lock}
              title=".env.local（最優先）"
              subtitle="ローカル専用。Gitに含めない。個人のシークレットをここに書く"
              iconColor="text-amber-400"
            />
            <StackLayer
              Icon={FileCode}
              title=".env.development / .env.production"
              subtitle="実行モードに応じて読まれる。Gitに含めてよい（値はデフォルト値のみ）"
              iconColor="text-blue-400"
            />
            <StackLayer
              Icon={FileCode}
              title=".env（最低優先）"
              subtitle="すべてのモード共通のデフォルト値。シークレットを書かない"
              iconColor="text-gray-400"
              showArrow={false}
            />
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            同じ変数名が複数のファイルにある場合、上（.env.local）が優先される。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── 詳細解説 ─────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="1. .gitignore への追加を忘れないために">
          <p>
            .env.local を作っただけでは安全ではありません。.gitignore に
            <code className="text-xs px-1.5 py-0.5 rounded font-mono ml-1" style={{ backgroundColor: "#0f1117", color: "#fbbf24" }}>.env*.local</code>
            が含まれているか必ず確認しましょう。
          </p>
          <p>
            Next.js で create-next-app を使ってプロジェクトを作成した場合、.gitignore は自動的に生成され .env*.local が含まれています。
            手動でプロジェクトを作った場合や、既存プロジェクトに .env を追加する場合は自分で確認が必要です。
          </p>
          <CodeBlock
            title=".gitignore の確認ポイント"
            language="bash"
            code={`# .gitignore に以下が含まれているか確認する
.env*.local

# 個別ファイルで書く場合
.env.local
.env.development.local
.env.test.local
.env.production.local`}
          />
          <KeyPoint>
            git status コマンドで .env.local が「Untracked files」に表示されていれば、まだGitに登録されていないので安全です。もし「Changes to be committed」に出ていたら、即座に git rm --cached .env.local で追跡を外しましょう。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="2. .env.example で仕様を共有する">
          <p>
            チーム開発では、どんな環境変数が必要かをチームメンバーに伝える必要があります。
            そのために .env.example というファイルを用意するのが標準的な作法です。
          </p>
          <CodeBlock
            title=".env.example（Gitに含めてよい）"
            language="bash"
            code={`# 外部APIキー（各自で取得して .env.local に記入）
STRIPE_SECRET_KEY=
OPENAI_API_KEY=

# データベース接続情報
DATABASE_URL=

# 公開URL（これだけ NEXT_PUBLIC_）
NEXT_PUBLIC_SITE_URL=https://yourapp.com`}
          />
          <p>
            .env.example には変数名だけ書いて値は空（または説明コメント）にします。
            新しくプロジェクトに参加したメンバーは .env.example をコピーして .env.local にリネームし、自分の値を入力します。
          </p>
          <CorrectionCard
            misconception=".env.example には本物の値を書いていい（サンプルだから）"
            correction=".env.example はGitに含めるファイルなので、本物の値や有効なシークレットを書いてはいけない"
            reason=".env.example は『どんな変数が必要か』を示す設計書。値はプレースホルダーかコメントのみ。実際の値は各自が .env.local に入力する。"
          />
        </DetailBlock>

        <DetailBlock heading="3. 本番環境の環境変数の設定">
          <p>
            Vercel にデプロイする場合、.env.local はサーバーには存在しません（Gitに含まれないので当然です）。
            本番環境の変数は Vercel のダッシュボードから設定します。
          </p>
          <UseCaseGrid
            cols={2}
            items={[
              {
                Icon: Server,
                title: "Vercel 環境変数UI",
                subtitle: "Project Settings → Environment Variables",
                description: "ダッシュボードから環境変数を登録。Development・Preview・Production の3環境に分けて設定できる。",
                accentColor: "amber",
              },
              {
                Icon: ShieldCheck,
                title: "なぜUIで設定するか",
                subtitle: "本番シークレットをコードから完全分離",
                description: "Vercelのサーバーで実行時に変数が注入される。シークレットはVercelのインフラ内にあり、GitHubには一切含まれない。",
                accentColor: "amber",
              },
            ]}
          />
          <KeyPoint>
            Vercel CI/CDを使う場合のフロー：.env.local（ローカル開発）→ git push（シークレット除外）→ Vercelが環境変数UIの値で本番をビルド。コードとシークレットが完全に分離された理想の状態。
          </KeyPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/security/api-key-leak",
            title: "APIキー漏洩の対処",
            description: "誤ってGitにpushしてしまったときの緊急対応手順",
            icon: "AlertTriangle",
          },
          {
            href: "/security/xss",
            title: "XSS（クロスサイトスクリプティング）",
            description: "環境変数の次に学ぶ、フロントエンドのセキュリティ基礎",
            icon: "Bug",
          },
          {
            href: "/security",
            title: "セキュリティ基礎 ハブ",
            description: "CORSやCSRFなど、関連トピック一覧",
            icon: "ShieldCheck",
          },
        ]}
      />

      <PageDrill questions={envVarsQuestions} />
    </div>
  );
}
