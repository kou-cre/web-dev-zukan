import Link from "next/link";
import {
  Database,
  FileJson,
  Layers,
  Smartphone,
  Globe,
  Lock,
  ShieldCheck,
  Heart,
} from "lucide-react";

import { Hero } from "@/components/Hero";
import { Prerequisites } from "@/components/Prerequisites";
import { OnePageSummary } from "@/components/OnePageSummary";
import { ConceptDiagram, FlowCard, FlowArrow } from "@/components/ConceptDiagram";
import { ComparisonTable } from "@/components/ComparisonTable";
import { MajiDialogue } from "@/components/MajiDialogue";
import { RelatedLinks } from "@/components/RelatedLinks";
import { PageDrill } from "@/components/PageDrill";
import { DetailSection, DetailBlock, KeyPoint, WarningPoint } from "@/components/DetailSection";
import { CorrectionCard } from "@/components/CorrectionCard";
import { UseCaseGrid } from "@/components/UseCaseGrid";
import { CodeBlock } from "@/components/CodeBlock";
import { SectionDivider } from "@/components/SectionDivider";
import { TermNote } from "@/components/TermNote";
import { firestoreQuestions } from "@/content/questions/firebase/firestore";

export const metadata = {
  title: "Firestoreって何？ | Web開発図解",
  description:
    "FirebaseのクラウドデータベースFirestoreを図解で解説。コレクション・ドキュメント構造、リアルタイム同期、セキュリティルールの基本を1ページで理解する。",
};

const posts = [
  { id: "post1", title: "Firestoreの使い方", likes: 120 },
  { id: "post2", title: "Next.jsとは", likes: 80 },
  { id: "post3", title: "TypeScript入門", likes: 200 },
  { id: "post4", title: "Tailwind CSS", likes: 45 },
  { id: "post5", title: "Reactの基本", likes: 150 },
];

const filteredPosts = [
  { id: "post3", title: "TypeScript入門", likes: 200 },
  { id: "post5", title: "Reactの基本", likes: 150 },
];

export default function FirestorePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link
        href="/firebase"
        className="text-xs text-gray-500 hover:text-white transition-colors mb-6 block"
      >
        ← Firebase に戻る
      </Link>

      <Hero
        category="Firebase"
        title="Firestoreって何？"
        subtitle="サーバーを書かずにデータを保存・取得・リアルタイム同期できるクラウドDB"
        body="コレクション・ドキュメント構造と、SQLとの違いをここで整理する。"
        accentColor="orange"
      />

      <Prerequisites
        learn={[
          "Firestoreのデータ構造（コレクション・ドキュメント・フィールド）",
          "SQLリレーショナルDBとNoSQLの違い",
          "セキュリティルールがサーバーの代わりをする仕組み",
        ]}
        prerequisites={[
          { text: "データベースとは何か", href: "/kiso/database" },
          "JavaScriptの非同期処理（async/await）の基本",
          { text: "BaaS（Backend as a Service）の概念", href: "/kiso/baas" },
        ]}
        outOfScope={[
          "クエリとインデックスの詳細設計",
          "セキュリティルールの複雑な条件式",
          "サブコレクション（ネストされた構造）",
          "Firestore + Firebase Auth の連携パターン",
        ]}
      />

      <OnePageSummary
        keyMessage="Firestoreは、Googleが提供するNoSQL型クラウドデータベース。「コレクション（棚）」に「ドキュメント（書類）」を入れる構造で、サーバーを書かずにアプリから直接読み書きできる。リアルタイム同期もネイティブに備えている。"
        metaphorTitle="図書館のファイリングキャビネット"
        metaphorPoints={[
          {
            label: "コレクション",
            real: "「ユーザー」「投稿」など種類別の引き出し。中にドキュメントをいくつでも入れられる",
            metaphor: "カテゴリ別の引き出し",
          },
          {
            label: "ドキュメント",
            real: "IDを持つ1件のデータ。中にフィールド（項目）をオブジェクト形式で格納する",
            metaphor: "1枚の書類",
          },
          {
            label: "フィールド",
            real: "name・age・email など、ドキュメントが持つ具体的な値のひとつひとつ",
            metaphor: "書類の記入欄",
          },
          {
            label: "リアルタイム同期",
            real: "データが更新されると、購読中のすべてのクライアントに即座に通知が届く仕組み",
            metaphor: "更新通知が届く魔法の図書館",
          },
        ]}
        definition="Firestoreとは、Googleが提供するNoSQLクラウドデータベース。コレクション・ドキュメント構造でデータを管理し、サーバーなしで読み書きできるBaaS。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まずFirestoreがどんな構造でデータを持つのかを確認しましょう。次に、データの更新がどうやってリアルタイムで届くのかを見ます。
        </p>

        {/* ── 概念図A: データ構造 ── */}
        <ConceptDiagram
          title="概念図A"
          description="Firestoreのデータ構造 — コレクション・ドキュメント・フィールドの3層"
        >
          <div
            className="rounded-xl border-2 border-dashed p-4"
            style={{ borderColor: "rgba(249,115,22,0.4)" }}
          >
            <p
              className="text-xs font-semibold text-center mb-4 uppercase tracking-wide"
              style={{ color: "#fb923c" }}
            >
              Firestore Database
            </p>

            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Layers className="w-4 h-4" style={{ color: "#fb923c" }} />
                <span className="text-xs font-bold text-white">
                  コレクション: {'"users"'}
                </span>
                <span className="ml-auto text-xs text-gray-500">
                  カテゴリごとの引き出し
                </span>
              </div>

              {/* Document 1 */}
              <div
                className="rounded-lg border p-3 mb-2"
                style={{
                  backgroundColor: "#1a1d2a",
                  borderColor: "rgba(249,115,22,0.3)",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <FileJson className="w-3.5 h-3.5 text-orange-400" />
                  <span className="text-xs font-semibold text-orange-300">
                    ドキュメント: {'"user001"'}
                  </span>
                </div>
                <div className="pl-4 space-y-1 font-mono text-xs">
                  <div className="flex gap-3">
                    <span className="text-gray-500">name:</span>
                    <span className="text-green-300">{'"マジ"'}</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-gray-500">age:</span>
                    <span className="text-orange-300">25</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-gray-500">email:</span>
                    <span className="text-green-300">{'"maji@example.com"'}</span>
                  </div>
                </div>
              </div>

              {/* Document 2 */}
              <div
                className="rounded-lg border p-3"
                style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <FileJson className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs font-semibold text-gray-300">
                    ドキュメント: {'"user002"'}
                  </span>
                </div>
                <div className="pl-4 space-y-1 font-mono text-xs">
                  <div className="flex gap-3">
                    <span className="text-gray-500">name:</span>
                    <span className="text-green-300">{'"マスター"'}</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-gray-500">age:</span>
                    <span className="text-orange-300">50</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-gray-500">role:</span>
                    <span className="text-green-300">{'"mentor"'}</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-500 text-center mt-3">
              ドキュメントごとにフィールドが違ってもOK（スキーマフリー）
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              { Icon: Layers, label: "コレクション", desc: "種類ごとのグループ", color: "#fb923c" },
              { Icon: FileJson, label: "ドキュメント", desc: "IDを持つ1件のデータ", color: "#fdba74" },
              { Icon: Database, label: "フィールド", desc: "キーと値のペア", color: "#fed7aa" },
            ].map(({ Icon, label, desc, color }) => (
              <div
                key={label}
                className="rounded-lg border p-3 text-center"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <Icon className="w-5 h-5 mx-auto mb-2" style={{ color }} />
                <p className="text-xs font-bold text-white">{label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
              </div>
            ))}
          </div>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          データ構造が分かりました。次はFirestoreの最大の特徴である「リアルタイム同期」がどう動くのかを確認しましょう。
        </p>

        {/* ── 概念図B: リアルタイム同期 ── */}
        <ConceptDiagram
          title="概念図B"
          description="リアルタイム同期 — データが変わった瞬間、購読中のすべてのクライアントに届く"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* Client A */}
            <div
              className="rounded-xl border p-4 text-center w-full sm:w-36"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <Smartphone className="w-7 h-7 mx-auto mb-2 text-gray-400" />
              <p className="text-xs font-bold text-white">クライアントA</p>
              <p className="text-xs text-gray-500 mt-1">データを書き込む</p>
              <div
                className="rounded mt-2 p-1.5 font-mono text-[11px] text-orange-300"
                style={{ backgroundColor: "rgba(249,115,22,0.1)" }}
              >
                setDoc(...)
              </div>
            </div>

            <FlowArrow label="書き込み" direction="right" />

            {/* Firestore */}
            <div
              className="rounded-xl border-2 p-4 text-center w-full sm:w-36"
              style={{
                backgroundColor: "rgba(249,115,22,0.05)",
                borderColor: "rgba(249,115,22,0.5)",
              }}
            >
              <Database className="w-7 h-7 mx-auto mb-2" style={{ color: "#fb923c" }} />
              <p className="text-xs font-bold text-white">Firestore</p>
              <p className="text-xs text-gray-400 mt-1">データを更新</p>
              <div
                className="rounded mt-2 px-2 py-1 text-[11px] font-semibold"
                style={{ backgroundColor: "rgba(249,115,22,0.15)", color: "#fb923c" }}
              >
                変更を検知
              </div>
            </div>

            <FlowArrow label="プッシュ通知" direction="right" />

            {/* Clients B & C */}
            <div className="flex flex-col gap-2 w-full sm:w-36">
              {["クライアントB", "クライアントC"].map((name) => (
                <div
                  key={name}
                  className="rounded-xl border p-3"
                  style={{
                    backgroundColor: "rgba(249,115,22,0.05)",
                    borderColor: "rgba(249,115,22,0.25)",
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5 text-orange-400" />
                    <p className="text-xs font-bold text-white">{name}</p>
                  </div>
                  <div
                    className="rounded mt-1.5 p-1 font-mono text-[11px] text-orange-300"
                    style={{ backgroundColor: "rgba(249,115,22,0.1)" }}
                  >
                    onSnapshot → 更新
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="rounded-lg border mt-4 p-3"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-xs font-semibold text-gray-400 mb-2">
              なぜポーリング（定期確認）と違うのか？
            </p>
            <p className="text-sm text-gray-300 leading-relaxed">
              ポーリングは「3秒おきに自分からサーバーに問い合わせる」方式で、変化がなくても毎回通信が発生します。
              Firestoreのリアルタイム同期は、変化が起きた瞬間にFirestoreから通知が届く「プッシュ型」です。
              変化がなければ通信ゼロ。変化があれば即座に届く。この違いがチャットアプリなどの体験を変えます。
            </p>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue ────────────────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "マスター、FirestoreってSQLと何が違うんですか？\nデータベースという意味では同じですよね？ ボク、以前MySQLを少し触ったことがあって、なんか別物すぎて混乱しています……",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "いい出発点ですね、マジさん。MySQLのようなSQLは、データを「行と列の表（テーブル）」で管理するリレーショナルデータベースです。\nFirestoreは「JSONオブジェクト形式のドキュメント」で管理するNoSQLです。\n表の縛りがないぶん柔軟で、各ドキュメントが持てるフィールドもバラバラでOK。アプリの変化に強い設計です。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ！ ということはコレクションってSQLのテーブルみたいなもの？\nドキュメントは行のことですか？ ボク、そう考えると少し分かる気がしてきました。",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "その対応は大まかには正しいです。ただし決定的な違いがひとつ。\nSQLのテーブルは全行が同じ列を持たなければなりません。\nFirestoreのコレクションは、ドキュメントごとに違うフィールドを持てます。\nあるドキュメントにはnameとageだけ、別のドキュメントにはnameとroleとaddressがある、でも問題ないのです。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "ちょっと待ってください！ ボク、サーバーを書かずにアプリから直接Firestoreにアクセスできるって少し怖くなっていて……\nそれって誰でも全データを読み書きし放題になりませんか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "鋭いツッコミです。そのまま公開すると確かに全データが見放題になります。\nそれを防ぐのが「セキュリティルール」です。\nFirestoreのコンソールでルールを書くと、『ログイン済みユーザーだけが読める』『自分のデータだけ書き換えられる』という制御が、サーバーなしで実現できます。\nこのルールなしに本番公開するのは厳禁です。",
          },
          {
            speaker: "maji",
            emotion: "doubt",
            text: "リアルタイム同期って便利そうですけど、ボク一つ気になっていて……\n結局「数秒おきにサーバーを確認しているだけ」ではないんですか？\nいわゆるポーリングってやつと同じでは？",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "よく知っていますね、マジさん。ポーリングとは全く別の仕組みです。\nポーリングは「3秒ごとに自分からサーバーに問い合わせる」方式で、変化がなくても通信が発生します。\nFirestoreのonSnapshotは、データが変わった瞬間にFirestoreからプッシュ通知が届く方式です。\n変化がなければ通信ゼロ。変化があれば即座にコールバックが呼ばれます。",
          },
        ]}
      />

      {/* ── COMPARISON ──────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["リレーショナルDB（SQL）", "Firestore（NoSQL）"]}
          rows={[
            {
              label: "データ形式",
              cells: ["行・列の表（スキーマ固定）", "ドキュメント（JSON風・柔軟）"],
              highlightCol: 1,
            },
            {
              label: "スキーマ定義",
              cells: ["必要（テーブル定義が必須）", "不要（フィールドはドキュメントごと自由）"],
              highlightCol: 1,
            },
            {
              label: "リアルタイム",
              cells: ["基本なし（自前実装が必要）", "ネイティブ対応（onSnapshot）"],
              highlightCol: 1,
            },
            {
              label: "サーバー設定",
              cells: ["必要（DBサーバーを管理）", "不要（Firestoreが管理）"],
              highlightCol: 1,
            },
            {
              label: "向いている用途",
              cells: ["複雑なJOIN・集計・トランザクション", "リアルタイムアプリ・チャット・SNS"],
              highlightCol: 1,
            },
          ]}
          note="SQLが得意な「複雑なJOIN・集計」はFirestoreには向かない。用途を見極めて使い分けることが大切。"
        />
      </section>

      {/* ── SectionDivider ──────────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下は実際にコードを書くときに必要な知識です。概念を掴んでから戻ってきましょう。"
      />

      {/* ── 応用編 CONCEPT DIAGRAMS ─────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — クエリとセキュリティルール
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          Firestoreで実際にデータを絞り込んで取得したり、アクセスを制御するための仕組みを見ていきます。
        </p>

        <TermNote
          terms={[
            {
              word: "クエリ",
              definition:
                "条件を指定してデータを絞り込む操作。where / orderBy / limit などのメソッドを組み合わせて使う。",
            },
            {
              word: "インデックス",
              definition:
                "検索を高速にするためにFirestoreが管理する索引。複合クエリ（複数条件）では手動でインデックスを作る必要がある場合がある。",
            },
            {
              word: "onSnapshot",
              definition:
                "Firestoreのリアルタイム購読メソッド。データの変更を購読し、変化があるたびにコールバックが自動で呼ばれる。",
            },
            {
              word: "セキュリティルール",
              definition:
                "Firestoreのコンソールで設定するアクセス制御のルール。誰がどのデータを読み書きできるかをFirestore側（サーバー）で判定する。",
            },
            {
              word: "request.auth",
              definition:
                "セキュリティルール内でFirebase Authのログイン情報にアクセスできる変数。request.auth.uid で現在のユーザーIDを取得できる。",
            },
          ]}
        />

        {/* ── 概念図C: クエリ ── */}
        <ConceptDiagram
          title="概念図C"
          description="クエリ — where・orderBy・limit でデータを絞り込む"
        >
          <div className="space-y-3">
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 text-center">
                コレクション: {'"posts"'} — 全5件
              </p>

              <div className="space-y-1.5 mb-4">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="rounded border px-3 py-2 flex items-center gap-3 text-xs"
                    style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
                  >
                    <span className="text-gray-500 font-mono w-12">{post.id}</span>
                    <span className="text-gray-300 flex-1">{post.title}</span>
                    <span className="flex items-center gap-1 text-gray-400 font-mono">
                      <Heart className="w-3 h-3" />
                      {post.likes}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="rounded border px-3 py-2.5 font-mono text-xs leading-relaxed"
                style={{
                  backgroundColor: "rgba(249,115,22,0.08)",
                  borderColor: "rgba(249,115,22,0.3)",
                }}
              >
                <span className="text-gray-400">collection(db, </span>
                <span className="text-green-300">{'"posts"'}</span>
                <span className="text-gray-400">)</span>
                <br />
                <span className="text-gray-400 ml-2">.where(</span>
                <span className="text-green-300">{'"likes"'}</span>
                <span className="text-gray-400">, </span>
                <span className="text-green-300">{'">=", 100'}</span>
                <span className="text-gray-400">)</span>
                <br />
                <span className="text-gray-400 ml-2">.orderBy(</span>
                <span className="text-green-300">{'"likes", "desc"'}</span>
                <span className="text-gray-400">)</span>
                <br />
                <span className="text-gray-400 ml-2">.limit(</span>
                <span className="text-orange-300">2</span>
                <span className="text-gray-400">)</span>
              </div>

              <div className="flex items-center gap-3 my-3">
                <div
                  className="flex-1 border-t"
                  style={{ borderColor: "rgba(249,115,22,0.3)" }}
                />
                <span className="text-xs" style={{ color: "#fb923c" }}>
                  絞り込み結果
                </span>
                <div
                  className="flex-1 border-t"
                  style={{ borderColor: "rgba(249,115,22,0.3)" }}
                />
              </div>

              <div className="space-y-1.5">
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className="rounded border px-3 py-2 flex items-center gap-3 text-xs"
                    style={{
                      backgroundColor: "rgba(249,115,22,0.08)",
                      borderColor: "rgba(249,115,22,0.3)",
                    }}
                  >
                    <span className="text-gray-500 font-mono w-12">{post.id}</span>
                    <span className="text-white flex-1">{post.title}</span>
                    <span className="flex items-center gap-1 text-orange-300 font-mono">
                      <Heart className="w-3 h-3" />
                      {post.likes}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="rounded-lg border p-3"
              style={{
                backgroundColor: "rgba(249,115,22,0.05)",
                borderColor: "rgba(249,115,22,0.3)",
              }}
            >
              <p className="text-xs font-semibold mb-1" style={{ color: "#fb923c" }}>
                注意：複合クエリにはインデックスが必要
              </p>
              <p className="text-sm text-gray-300 leading-relaxed">
                where() と orderBy() を組み合わせるような複合クエリは、対応するインデックスを事前に作成しないとエラーになります。
                Firestoreコンソールまたはエラーメッセージ内のリンクから簡単に作成できます。
              </p>
            </div>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── DetailSection ────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="1. Firestoreの基本操作（CRUD）">
          <p>
            Firestoreはアプリ側からFirebase SDKを使って操作する。
            コレクションやドキュメントへの参照を作り、それに対して読み書き削除を行う。
          </p>
          <CodeBlock
            title="firestore-crud.ts"
            language="typescript"
            code={`import { db } from "./firebase"; // Firestore インスタンス
import {
  collection, doc,
  getDocs, getDoc,
  addDoc, setDoc, updateDoc, deleteDoc
} from "firebase/firestore";

// ── 読む（コレクション全件）──
const snapshot = await getDocs(collection(db, "users"));
snapshot.forEach((doc) => {
  console.log(doc.id, doc.data());
});

// ── 読む（1件・IDを指定）──
const userDoc = await getDoc(doc(db, "users", "user001"));
if (userDoc.exists()) {
  console.log(userDoc.data()); // → { name: "マジ", age: 25 }
}

// ── 追加（IDを自動生成）──
await addDoc(collection(db, "users"), {
  name: "新しいユーザー",
  age: 20,
});

// ── 上書き（IDを指定して作成 or 完全上書き）──
await setDoc(doc(db, "users", "user001"), {
  name: "マジ",
  age: 26,
});

// ── 部分更新（指定フィールドだけ変更）──
await updateDoc(doc(db, "users", "user001"), {
  age: 26,
});

// ── 削除 ──
await deleteDoc(doc(db, "users", "user001"));`}
          />
          <KeyPoint>
            addDoc は Firebase が ID を自動生成。setDoc は自分で ID を指定して上書き。updateDoc は指定フィールドだけ変更し他は残す。この3つの使い分けを覚えるだけで基本操作は完結する。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="2. リアルタイム同期（onSnapshot）">
          <p>
            通常の getDocs はその時点のデータを1回取得するだけだが、
            <strong className="text-white"> onSnapshot </strong>
            を使うと「購読」状態になり、変化があるたびに自動でコールバックが呼ばれる。
          </p>
          <CodeBlock
            title="realtime.ts"
            language="typescript"
            code={`import { db } from "./firebase";
import { collection, onSnapshot } from "firebase/firestore";

// 購読開始 — "messages" コレクションを監視
const unsubscribe = onSnapshot(
  collection(db, "messages"),
  (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        console.log("新しいメッセージ:", change.doc.data());
      }
      if (change.type === "modified") {
        console.log("変更されたメッセージ:", change.doc.data());
      }
      if (change.type === "removed") {
        console.log("削除されたメッセージ:", change.doc.id);
      }
    });
  }
);

// 購読解除（コンポーネントのクリーンアップで必ず呼ぶ）
unsubscribe();

// React の useEffect でのパターン
// useEffect(() => {
//   const unsub = onSnapshot(collection(db, "messages"), callback);
//   return () => unsub(); // クリーンアップ
// }, []);`}
          />
          <CorrectionCard
            misconception="onSnapshot はポーリング（定期確認）を改良したものだ"
            correction="onSnapshot はプッシュ型のリアルタイム同期。変化が起きた瞬間に Firestore から通知が届く。変化がなければ通信ゼロ。"
            reason="WebSocket に近い仕組みで動いており、定期的なリクエストは発生しない。React の useEffect でサブスクライブし、クリーンアップで unsubscribe を呼ぶのが定番パターン。"
          />
        </DetailBlock>

        <DetailBlock heading="3. セキュリティルール入門">
          <p>
            Firestoreはデフォルトで全公開 or 全閉鎖の2択しかない。
            実際のアプリでは<strong className="text-white">セキュリティルール</strong>を設定して、
            誰がどのデータを読み書きできるかをFirestore側で制御する。
          </p>
          <CodeBlock
            title="firestore.rules"
            language="javascript"
            code={`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // パターン1: 全員が全データを読み書きできる（開発初期のみ）
    match /{document=**} {
      allow read, write: if true;
    }

    // パターン2: ログイン済みユーザーだけが読み書きできる
    match /posts/{postId} {
      allow read, write: if request.auth != null;
    }

    // パターン3: 自分のデータだけ書き換えられる
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
  }
}`}
          />
          <UseCaseGrid
            cols={3}
            items={[
              {
                Icon: Globe,
                title: "全公開",
                subtitle: "開発初期のみ",
                description:
                  "if true で全員が読み書き可。本番環境では絶対に使わない。",
                accentColor: "red",
              },
              {
                Icon: Lock,
                title: "認証済みのみ",
                subtitle: "最低限の保護",
                description:
                  "request.auth != null でログイン済みユーザーだけを許可。未ログインは遮断。",
                accentColor: "orange",
              },
              {
                Icon: ShieldCheck,
                title: "オーナーのみ",
                subtitle: "本番推奨パターン",
                description:
                  "request.auth.uid == userId で自分のデータだけ変更を許可。",
                accentColor: "emerald",
              },
            ]}
          />
          <WarningPoint>
            セキュリティルールを設定しないまま公開すると、URLを知っている人が全データを読み書きできる状態になる。プロジェクト作成直後に最低限の認証ルールを設定することを習慣にしよう。
          </WarningPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/kiso/database",
            title: "データベースって何？",
            description: "RDBとNoSQLの全体像を先に整理したい場合に",
            icon: "Database",
          },
          {
            href: "/kiso/baas",
            title: "BaaSって何？",
            description: "Firebaseを含むBaaS全体の概念を理解する",
            icon: "Server",
          },
          {
            href: "/firebase/auth",
            title: "Firebase Auth（準備中）",
            description: "セキュリティルールと連携するユーザー認証",
            icon: "ShieldCheck",
          },
        ]}
      />

      <PageDrill questions={firestoreQuestions} />
    </div>
  );
}
