import {
  Monitor,
  Server,
  Database,
  Cloud,
  Table,
  FileJson,
  PlusCircle,
  Search,
  Pencil,
  Trash2,
  MemoryStick,
  HardDrive,
  ShieldAlert,
  ShieldCheck,
  BookOpen,
  Layers,
  Code2,
  Cpu,
  Zap,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Lock,
  List,
  AlertTriangle,
  TrendingDown,
} from "lucide-react";

import { Hero } from "@/components/Hero";
import { Prerequisites } from "@/components/Prerequisites";
import { TermNote } from "@/components/TermNote";
import { SectionDivider } from "@/components/SectionDivider";
import { OnePageSummary } from "@/components/OnePageSummary";
import {
  ConceptDiagram,
  FlowCard,
  FlowArrow,
  StackLayer,
  ContrastBar,
} from "@/components/ConceptDiagram";
import { ComparisonTable } from "@/components/ComparisonTable";
import { MajiDialogue } from "@/components/MajiDialogue";
import { RelatedLinks } from "@/components/RelatedLinks";
import { PageDrill } from "@/components/PageDrill";
import { DetailSection, DetailBlock, KeyPoint } from "@/components/DetailSection";
import { CorrectionCard } from "@/components/CorrectionCard";
import { UseCaseGrid } from "@/components/UseCaseGrid";
import { Timeline } from "@/components/Timeline";
import { CodeBlock } from "@/components/CodeBlock";
import { databaseQuestions } from "@/content/questions/kiso/database";

export const metadata = {
  title: "データベースって何？ | Web開発図解",
  description:
    "データベースの基本概念を図解で解説。CRUD・RDBとNoSQLの違い・Firestoreでの扱い方まで。",
};

export default function DatabasePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Hero
        category="基礎概念"
        title="データベースって何？"
        subtitle={"アプリの記憶を担う「デジタル倉庫」——消えないデータの置き場の正体。"}
        body={"変数は閉じれば消える。DBに入れた値はずっと残る。この差を1枚で掴む。"}
        accentColor="violet"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "データベースとは何か（変数と何が違うのか）",
          "RDB（テーブル型）と NoSQL（ドキュメント型）の違い",
          "Firestore のデータモデルがどんな NoSQL か",
        ]}
        prerequisites={[
          "データを「保存したい」という課題感がある",
          "JSON の形式（{'{'}key: value{'}'} ）を見たことがある",
        ]}
        outOfScope={[
          "SQL の書き方（SELECT / JOIN など）（応用編で扱う）",
          "インデックスとクエリ最適化の詳細（応用編で扱う）",
          "ACID トランザクションの詳細な仕組み（応用編で扱う）",
        ]}
      />

      <OnePageSummary
        keyMessage="データベースとは「データを整理して保存し、必要なときに素早く取り出せる仕組み」のこと。アプリが「ユーザーを覚えている」「投稿が消えない」「ログインしたら自分のデータが出てくる」と感じるのは、地球のどこかのDBが、電源を切ってもデータを保持し、誰がアクセスしても同じ答えを返してくれているから。"
        metaphorTitle="超優秀な司書がいる図書館"
        metaphorPoints={[
          { label: "保存", real: "新しい本を棚の正しい位置に追加する", metaphor: "Create（addDoc）" },
          { label: "検索", real: "「〇〇について書かれた本を全部持ってきて」と頼む", metaphor: "Read（getDocs）" },
          { label: "更新", real: "本の内容を新しい版に差し替える", metaphor: "Update（updateDoc）" },
          { label: "削除", real: "古くなった本を棚から廃棄する", metaphor: "Delete（deleteDoc）" },
        ]}
        definition="データベースとは、データをルールに従って保存・検索・更新・削除できる仕組みの総称。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ─────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まずは「データベースがどこに位置するか」と「RDB と NoSQL の持ち方の違い」「CRUD の4操作」を図で確認しましょう。
        </p>

        {/* TermNote: 概念図Aに出てくる言葉 */}
        <TermNote
          terms={[
            {
              word: "データベース（DB）",
              definition: "データをルールに従って保存・取り出しできる仕組みの総称。変数と違い、電源を切ってもデータが消えない。",
            },
            {
              word: "クエリ",
              definition: "データベースへの「問い合わせ」。「このユーザーのデータを取ってきて」という命令のこと。",
            },
            {
              word: "BaaS",
              definition: "Firebase/Supabaseなど、DBを含むバックエンド機能をまるごと提供するクラウドサービス。詳しくは『BaaSって何？』ページを参照。",
            },
          ]}
        />

        {/* ── 概念図A: データの流れ ── */}
        <ConceptDiagram
          title="概念図A"
          description="ブラウザに表示されているデータは、どこから来ているのか？"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <FlowCard Icon={Monitor} title="ブラウザ" subtitle="一覧ページを開く" />
            <FlowArrow label="リクエスト" sublabel="GET /posts" direction="right" />
            <FlowCard Icon={Cloud} title="BaaS / サーバー" subtitle="DBから取り出す指示を出す" />
            <FlowArrow label="クエリ" sublabel="getDocs(...)" direction="right" />
            <FlowCard Icon={Database} title="データベース" subtitle="保存データの本体" highlight accentColor="violet" />
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            ブラウザはDBに直接話しかけない。必ずサーバー（またはBaaS）が間に入って取り次ぐ。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-6 px-1">
          DB がどこに位置するかが分かりました。次は「DB には大きく2種類ある」ことを見ていきます。
        </p>

        {/* TermNote: 概念図Bに出てくる言葉 */}
        <TermNote
          terms={[
            {
              word: "RDB（リレーショナルデータベース）",
              definition: "データをExcelのような「表（テーブル）」で管理するDB。SQL という言語で操作する。例: PostgreSQL・MySQL・Supabase。",
            },
            {
              word: "NoSQL",
              definition: "表以外の形式でデータを持つDB の総称。ドキュメント型・グラフ型など種類がある。例: Firestore・MongoDB。",
            },
            {
              word: "スキーマ",
              definition: "データの「型と構造の設計図」。RDB は事前に決めた構造に厳密に従い、NoSQL は自由に後から変えられる。",
            },
          ]}
        />

        {/* ── 概念図B: RDB vs NoSQL ── */}
        <ConceptDiagram
          title="概念図B"
          description="DBには大きく2つの流派がある。データの持ち方が根本から違う。"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Table className="w-4 h-4 text-blue-400" />
                <p className="text-xs font-semibold text-blue-300">RDB（テーブル型）</p>
              </div>
              <p className="text-xs text-gray-400 mb-3 leading-relaxed">
                Excelのような表で持つ。行が1件のデータ、列が項目。SQLで操作する。
              </p>
              <div
                className="rounded-md border text-xs font-mono overflow-hidden"
                style={{ borderColor: "#2d3048" }}
              >
                <div
                  className="grid grid-cols-3 px-2 py-1.5 text-gray-500"
                  style={{ backgroundColor: "#1a1d2a" }}
                >
                  <span>id</span>
                  <span>name</span>
                  <span>email</span>
                </div>
                <div className="grid grid-cols-3 px-2 py-1.5 text-gray-300 border-t" style={{ borderColor: "#2d3048" }}>
                  <span>1</span>
                  <span>maji</span>
                  <span>m@x.jp</span>
                </div>
                <div className="grid grid-cols-3 px-2 py-1.5 text-gray-300 border-t" style={{ borderColor: "#2d3048" }}>
                  <span>2</span>
                  <span>master</span>
                  <span>s@x.jp</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3 leading-tight">
                例: PostgreSQL / MySQL / Supabase
              </p>
            </div>

            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "rgba(139,92,246,0.4)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <FileJson className="w-4 h-4 text-violet-400" />
                <p className="text-xs font-semibold text-violet-300">NoSQL（ドキュメント型）</p>
              </div>
              <p className="text-xs text-gray-400 mb-3 leading-relaxed">
                JSONのような塊で持つ。コレクションの中にドキュメント、その中にフィールド。
              </p>
              <pre
                className="rounded-md border text-xs font-mono px-3 py-2 text-gray-300 leading-relaxed overflow-x-auto"
                style={{ borderColor: "#2d3048", backgroundColor: "#1a1d2a" }}
              >
{`users / {
  abc123: {
    name: "maji",
    email: "m@x.jp"
  }
}`}
              </pre>
              <p className="text-xs text-gray-500 mt-3 leading-tight">
                例: Firestore / MongoDB / DynamoDB
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            個人開発でNoSQLを選ぶ場合、Firestore（Firebase）がよく使われる選択肢のひとつ。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-6 px-1">
          RDB と NoSQL の違いが分かりました。次は「DB に対する操作は4種類しかない」という CRUD の話に進みます。
        </p>

        {/* TermNote: 概念図Cに出てくる言葉 */}
        <TermNote
          terms={[
            {
              word: "CRUD",
              definition: "Create（作成）・Read（取得）・Update（更新）・Delete（削除）の頭文字。DB への操作はこの4種類だけ。",
            },
          ]}
        />

        {/* ── 概念図C: CRUD ── */}
        <ConceptDiagram
          title="概念図C — CRUD"
          description="DBに対する操作は、たった4種類しかない。これを CRUD と呼ぶ。"
        >
          <StackLayer
            Icon={PlusCircle}
            title="C — Create（作成）"
            subtitle="新しいデータを1件追加する — Firestore: addDoc / setDoc / SQL: INSERT"
            iconColor="text-emerald-400"
          />
          <StackLayer
            Icon={Search}
            title="R — Read（取得）"
            subtitle="既存データを取り出す・検索する — Firestore: getDoc / getDocs / onSnapshot / SQL: SELECT"
            iconColor="text-blue-400"
          />
          <StackLayer
            Icon={Pencil}
            title="U — Update（更新）"
            subtitle="既存データの一部を書き換える — Firestore: updateDoc / setDoc(merge) / SQL: UPDATE"
            iconColor="text-amber-400"
          />
          <StackLayer
            Icon={Trash2}
            title="D — Delete（削除）"
            subtitle="不要になったデータを消す — Firestore: deleteDoc / SQL: DELETE"
            iconColor="text-rose-400"
            showArrow={false}
          />
          <p className="text-xs text-gray-600 text-center mt-4">
            どんなアプリも、結局はこの4つの組み合わせで動いている。SNSの投稿も、ECの注文も、家計簿アプリも。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（基礎編 — 概念図Cの直後） ────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "doubt",
            text: "マスター、データベースって、結局Excelとどう違うんですか？\nボクの中ではどっちも「表に値を書き込んでいくやつ」というイメージで、正直あまり区別がついていません……。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "とても自然な疑問ですよ、マジさん。\n例えるなら、Excelは「自分の机の引き出しに入れたノート」、データベースは「街の図書館にいる超優秀な司書」です。\nExcelは自分しか開けず、ファイルを誰かに送らないと共有できません。\n司書（DB）は、世界中のお客様から同時に「あの本を出して」「これを差し替えて」と言われても、混乱せず順番にさばいてくれます。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "マジ？\nじゃあ Firebase の Firestore というのも、その「司書」にあたるってことですか？ 名前だけは聞いたことあるんですけど、何者なのかさっぱりで……。",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "その通りです。FirestoreはBaaSを使う構成の主役のひとつで、NoSQL型のデータベースです。\n構造は「引き出しの中に、さらに引き出しが入っている」イメージで、`users` というコレクション（大きな引き出し）の中に、ユーザー1人ずつのドキュメント（小さな引き出し）が並んでいる、と覚えていただければ十分です。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "うっ……でも、ボクSQLっていう謎の呪文みたいなのも聞いたことがあります。これは絶対にマスターしないとデータベースは使えないんですよね？\nもしそうならボクの開発人生はここで終わってしまいます、これは完全に革命的な絶望です……！",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "落ち着いてください、マジさん。Firestore を使うなら、SQLは1行も書きません。\nFirestore には独自のAPI（`addDoc` / `getDocs` / `updateDoc` / `deleteDoc`）が用意されていて、これがSQLの `INSERT` / `SELECT` / `UPDATE` / `DELETE` に1対1で対応しています。\n「概念だけ知っておく」レベルで今は十分です。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "なるほど……つまりCRUDという言葉は、Create・Read・Update・Delete の頭文字で、どんなDBでもこの4つしか操作の種類がない、ということですね。\nこれは革命的に整理されました。ボクこの4つだけ覚えればいいんですか！",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "本質的にはその4つです。SNSの投稿も、ECの注文も、家計簿アプリも、結局はCRUDの組み合わせでできています。\nデータベースを知れば、アプリが何を覚えていて、何を忘れていて、どこから取り出しているのかが見えてきますよ、マジさん。",
          },
        ]}
      />

      {/* ── 比較表（基礎編） ────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={[
            "RDB（Supabase / PostgreSQL）",
            "NoSQL（Firestore / MongoDB）",
          ]}
          rows={[
            {
              label: "データ構造",
              cells: [
                "テーブル（行と列）",
                "ドキュメント（JSONオブジェクト）",
              ],
              highlightCol: 1,
            },
            {
              label: "クエリ言語",
              cells: [
                "SQL（SELECT * FROM users WHERE ...）",
                "独自API（collection().where(...)）",
              ],
              highlightCol: 1,
            },
            {
              label: "スキーマ",
              cells: [
                "厳格（後から列を増やすのは慎重に）",
                "柔軟（後から項目を追加しやすい）",
              ],
              highlightCol: 1,
            },
            {
              label: "リアルタイム同期",
              cells: [
                "別途設定が必要（Realtime機能などを有効化）",
                "標準対応（onSnapshot で即反映）",
              ],
              highlightCol: 1,
            },
            {
              label: "よく選ばれる場面",
              cells: [
                "スキーマを厳密に管理したい・SQL経験がある場合",
                "最短で動かしたい・リアルタイム同期が必要な場合",
              ],
              highlightCol: 1,
            },
          ]}
          note="どちらが優れているという話ではなく、データの形と要求次第で選ぶ。「行と列でカチッと管理したい」ならRDB、「とりあえず動かして後から育てたい」ならNoSQL、というざっくりした目安でまずは十分。"
        />
      </section>

      {/* ── 応用編 セパレータ ────────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下は「SQL の実行フロー」「トランザクションと ACID」「インデックス」などの発展内容です。まず基礎を掴みたい方は詳細解説（6.1）まで進んでください。"
      />

      {/* ── 応用編 CONCEPT DIAGRAMS ─────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — SQL クエリの実行フロー
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-5">
          SQL を書いてから DB が結果を返すまでに、内部で複数のステップが走っています。
          「なぜ DB は速いのか」「遅くなるのはどこか」が見えてきます。
        </p>

        {/* TermNote: 概念図Dに出てくる言葉 */}
        <TermNote
          terms={[
            {
              word: "オプティマイザー",
              definition: "DB エンジンの中にある「最速の実行計画を考える頭脳」。同じ結果を得るのに何通りもある方法の中から、最も速い手順を自動で選ぶ。",
            },
            {
              word: "SQL",
              definition: "Structured Query Language の略。RDB を操作するための言語。SELECT（取得）・INSERT（追加）・UPDATE（更新）・DELETE（削除）の4つが基本。",
            },
            {
              word: "WHERE句",
              definition: "SQLで『〜の条件に合う行だけ取り出す』ための絞り込み命令。例：WHERE email = 'user@example.com' はemailが一致する行だけを取得する。",
            },
          ]}
        />

        {/* ── 概念図D: SQLクエリが実行されるまでの流れ ── */}
        <ConceptDiagram
          title="概念図D：SQLクエリが実行されるまでの流れ"
          description="アプリがSQLを書いてからDBが結果を返すまでに、内部で複数のステップが走っている。"
        >
          {/* 実行フロー */}
          <div className="flex flex-col gap-1 mb-5">
            {[
              { step: "1", label: "アプリコード", sub: "SQLクエリ文字列を組み立てる", Icon: Code2 },
              { step: "2", label: "DBエンジンへ送信", sub: "ネットワーク越しにクエリを転送", Icon: Zap },
              { step: "3", label: "パーサー（構文解析）", sub: "SQLの文法が正しいか検証する", Icon: Search },
              { step: "4", label: "オプティマイザー", sub: "最速の実行計画を自動で生成する", Icon: Cpu },
              { step: "5", label: "エグゼキューター", sub: "実際にデータを検索・操作する", Icon: Database, highlight: true },
              { step: "6", label: "結果返却", sub: "アプリが受け取って画面に反映", Icon: Monitor },
            ].map(({ step, label, sub, Icon, highlight }, i, arr) => (
              <div key={step} className="flex flex-col items-center">
                <div
                  className="w-full flex items-center gap-3 rounded-lg border px-4 py-2.5"
                  style={
                    highlight
                      ? { backgroundColor: "rgba(139,92,246,0.08)", borderColor: "rgba(139,92,246,0.5)" }
                      : { backgroundColor: "#0f1117", borderColor: "#2d3048" }
                  }
                >
                  <span
                    className="text-xs font-mono font-bold w-5 text-center flex-shrink-0"
                    style={{ color: highlight ? "#a78bfa" : "#6b7280" }}
                  >
                    {step}
                  </span>
                  <Icon
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: highlight ? "#a78bfa" : "#9ca3af" }}
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-xs font-semibold"
                      style={{ color: highlight ? "#c4b5fd" : "#ffffff" }}
                    >
                      {label}
                    </p>
                    <p className="text-xs text-gray-400 leading-tight">{sub}</p>
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <div className="w-0.5 h-3 bg-gray-700 my-0.5" />
                )}
              </div>
            ))}
          </div>

          {/* CRUD コマンド一覧 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
            {[
              { cmd: "SELECT", desc: "データを取得する", color: "#60a5fa" },
              { cmd: "INSERT", desc: "新しい行を追加する", color: "#34d399" },
              { cmd: "UPDATE", desc: "既存の行を書き換える", color: "#fbbf24" },
              { cmd: "DELETE", desc: "行を削除する", color: "#f87171" },
            ].map(({ cmd, desc, color }) => (
              <div
                key={cmd}
                className="rounded-lg border px-3 py-2 text-center"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <p className="text-xs font-mono font-bold mb-0.5" style={{ color }}>{cmd}</p>
                <p className="text-xs text-gray-400 leading-tight">{desc}</p>
              </div>
            ))}
          </div>

          {/* WHERE 句の補足 */}
          <div
            className="rounded-lg border px-4 py-3"
            style={{ backgroundColor: "rgba(139,92,246,0.06)", borderColor: "rgba(139,92,246,0.3)" }}
          >
            <p className="text-xs font-semibold text-violet-300 mb-1">WHERE句とオプティマイザーの関係</p>
            <p className="text-xs text-gray-300 leading-relaxed">
              {"WHERE email = 'user@example.com' のような条件をオプティマイザーが分析し、インデックスが使えるかどうかを判断して実行計画を決定する。条件の書き方ひとつで検索速度が大きく変わる。"}
            </p>
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            ORMやFirestoreのAPIを使う場合も、内部では同じフローでDBエンジンが動いている。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-6 px-1">
          SQL の実行フローが分かりました。次は「複数の操作をまとめて扱う」トランザクションの仕組みを見ていきます。
        </p>

        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4 mt-10">
          ADVANCED — トランザクションと ACID
        </h2>

        {/* TermNote: 概念図Eに出てくる言葉 */}
        <TermNote
          terms={[
            {
              word: "トランザクション",
              definition: "複数の DB 操作を「全部成功か全部失敗か」の1つのまとまりとして扱う仕組み。銀行振込のように「引き落としと入金がセット」の場面で使う。",
            },
            {
              word: "COMMIT",
              definition: "トランザクション内の全操作が成功したとき、変更を DB に確定する操作。",
            },
            {
              word: "ROLLBACK",
              definition: "トランザクション中にエラーが発生したとき、全変更を取り消して元に戻す操作。",
            },
          ]}
        />

        {/* ── 概念図E: トランザクションとACID特性 ── */}
        <ConceptDiagram
          title="概念図E：トランザクションとACID特性"
          description="複数の操作をひとまとめにして「全部成功か全部失敗か」を保証する仕組みがトランザクション。"
        >
          {/* 銀行振込の例 */}
          <div className="mb-5">
            <p className="text-xs font-semibold text-gray-300 mb-2">例：A口座からB口座への振込</p>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3 rounded-lg border px-4 py-2.5" style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}>
                <span className="text-xs font-mono text-violet-400 font-bold flex-shrink-0">1</span>
                <TrendingDown className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-white">A口座から10,000円を引き落とす</p>
                  <p className="text-xs text-gray-400">UPDATE accounts SET balance = balance - 10000 WHERE id = A</p>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-0.5 h-3 bg-gray-700" />
              </div>
              <div className="flex items-center gap-3 rounded-lg border px-4 py-2.5" style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}>
                <span className="text-xs font-mono text-violet-400 font-bold flex-shrink-0">2</span>
                <Zap className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-white">B口座に10,000円を入金する</p>
                  <p className="text-xs text-gray-400">UPDATE accounts SET balance = balance + 10000 WHERE id = B</p>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-0.5 h-3 bg-gray-700" />
              </div>
              <div
                className="flex items-center gap-3 rounded-lg border px-4 py-2.5"
                style={{ backgroundColor: "rgba(139,92,246,0.08)", borderColor: "rgba(139,92,246,0.4)" }}
              >
                <Lock className="w-4 h-4 text-violet-400 flex-shrink-0" />
                <p className="text-xs text-violet-300">
                  この2つがひとつのトランザクション。1が成功して2が失敗すると「お金が消える」ので、必ず両方成功か両方失敗にする。
                </p>
              </div>
            </div>
          </div>

          {/* ACID特性 */}
          <p className="text-xs font-semibold text-gray-300 mb-2">ACID特性</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
            {[
              {
                letter: "A",
                name: "Atomicity（原子性）",
                desc: "全ての操作が成功するか、全て失敗するか。中途半端な状態は絶対に残らない。",
                color: "#a78bfa",
              },
              {
                letter: "C",
                name: "Consistency（整合性）",
                desc: "トランザクション前後で、DBのルール（制約）が必ず守られた状態になる。",
                color: "#60a5fa",
              },
              {
                letter: "I",
                name: "Isolation（分離性）",
                desc: "同時に実行中の別トランザクションの途中結果は見えない。互いに干渉しない。例：2人が同時に同じ在庫を確認して購入処理をしたとき、片方の変更が終わるまで相手に見えないようにする。",
                color: "#34d399",
              },
              {
                letter: "D",
                name: "Durability（永続性）",
                desc: "COMMITしたデータはクラッシュしても消えない。ディスクに確実に書き込まれる。",
                color: "#fbbf24",
              },
            ].map(({ letter, name, desc, color }) => (
              <div
                key={letter}
                className="rounded-lg border px-3 py-3"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-sm font-black" style={{ color }}>{letter}</span>
                  <p className="text-xs font-semibold text-white leading-tight">{name}</p>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* COMMIT / ROLLBACK */}
          <div className="grid grid-cols-2 gap-2">
            <div
              className="rounded-lg border px-3 py-3 flex items-start gap-2"
              style={{ backgroundColor: "rgba(16,185,129,0.06)", borderColor: "rgba(16,185,129,0.4)" }}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-emerald-300 mb-0.5">COMMIT</p>
                <p className="text-xs text-gray-400 leading-tight">全操作が成功。変更をDBに確定する。</p>
              </div>
            </div>
            <div
              className="rounded-lg border px-3 py-3 flex items-start gap-2"
              style={{ backgroundColor: "rgba(239,68,68,0.06)", borderColor: "rgba(239,68,68,0.4)" }}
            >
              <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-rose-300 mb-0.5">ROLLBACK</p>
                <p className="text-xs text-gray-400 leading-tight">途中でエラー発生。全変更を取り消して元に戻す。</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            Firestoreにもトランザクション機能がある。複数ドキュメントをまたぐ整合性が必要なときに使う。
          </p>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-6 px-1">
          トランザクションが分かりました。最後に「インデックスがあるとなぜ検索が速くなるか」を見ていきます。
        </p>

        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4 mt-10">
          ADVANCED — インデックス
        </h2>

        {/* TermNote: 概念図Fに出てくる言葉 */}
        <TermNote
          terms={[
            {
              word: "インデックス",
              definition: "DB の「目次」。よく検索するカラムにあらかじめ索引を作っておくことで、全データをなめなくても一瞬で見つけられる。",
            },
            {
              word: "フルテーブルスキャン",
              definition: "インデックスなしの検索。先頭の行から順番に全件チェックする。行数が多いほど時間がかかる。",
            },
          ]}
        />

        {/* ── 概念図F: インデックスありとなしの検索速度比較 ── */}
        <ConceptDiagram
          title="概念図F：インデックスありとなしの検索速度比較"
          description="インデックスとは「目次」のようなもの。あるかないかで検索速度が劇的に変わる。"
        >
          {/* 比較カード */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            {/* インデックスなし */}
            <div className="rounded-xl border p-4" style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}>
              <div className="flex items-center gap-2 mb-3">
                <List className="w-4 h-4 text-rose-400" />
                <p className="text-xs font-semibold text-rose-300">インデックスなし</p>
              </div>
              <p className="text-xs text-gray-400 mb-2 leading-relaxed">
                全行を先頭から順番にスキャンする（フルテーブルスキャン）。
              </p>
              <div className="space-y-1 mb-3">
                {["row 1", "row 2", "row 3", "・・・", "row 1,000,000"].map((r, i) => (
                  <div
                    key={i}
                    className="text-xs font-mono px-2 py-1 rounded text-center"
                    style={{
                      backgroundColor: i === 4 ? "rgba(239,68,68,0.15)" : "#1a1d2a",
                      color: i === 4 ? "#fca5a5" : "#6b7280",
                      border: i === 4 ? "1px solid rgba(239,68,68,0.4)" : "1px solid #2d3048",
                    }}
                  >
                    {r}
                  </div>
                ))}
              </div>
              <div className="rounded-md px-3 py-2 text-center" style={{ backgroundColor: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)" }}>
                <p className="text-xs font-semibold text-rose-300">計算量: O(n)</p>
                <p className="text-xs text-gray-400">100万行あれば最大100万回チェック</p>
              </div>
            </div>

            {/* インデックスあり */}
            <div className="rounded-xl border p-4" style={{ backgroundColor: "#0f1117", borderColor: "rgba(139,92,246,0.4)" }}>
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-violet-400" />
                <p className="text-xs font-semibold text-violet-300">インデックスあり（B-Tree）</p>
              </div>
              <p className="text-xs text-gray-400 mb-2 leading-relaxed">
                B-Tree構造の索引で一気に絞り込む。
              </p>
              <div className="flex flex-col items-center gap-1 mb-3">
                <div className="flex gap-1">
                  <div className="text-xs font-mono px-3 py-1 rounded text-center" style={{ backgroundColor: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.4)", color: "#c4b5fd" }}>root</div>
                </div>
                <div className="w-0.5 h-2 bg-gray-700" />
                <div className="flex gap-1">
                  {["A-M", "N-Z"].map((n) => (
                    <div key={n} className="text-xs font-mono px-2 py-1 rounded" style={{ backgroundColor: "#1a1d2a", border: "1px solid #2d3048", color: "#9ca3af" }}>{n}</div>
                  ))}
                </div>
                <div className="w-0.5 h-2 bg-gray-700" />
                <div className="flex gap-1">
                  {["user@..."].map((n) => (
                    <div key={n} className="text-xs font-mono px-2 py-1 rounded" style={{ backgroundColor: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.5)", color: "#c4b5fd" }}>{n}</div>
                  ))}
                </div>
              </div>
              <div className="rounded-md px-3 py-2 text-center" style={{ backgroundColor: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.3)" }}>
                <p className="text-xs font-semibold text-violet-300">計算量: O(log n)</p>
                <p className="text-xs text-gray-400">100万行でも約20回で到達</p>
              </div>
            </div>
          </div>

          {/* 具体例 */}
          <div
            className="rounded-lg border px-4 py-3 mb-4"
            style={{ backgroundColor: "rgba(139,92,246,0.06)", borderColor: "rgba(139,92,246,0.3)" }}
          >
            <p className="text-xs font-semibold text-violet-300 mb-1">具体例：100万行のusersテーブルからemail検索</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-gray-400 mb-0.5">インデックスなし</p>
                <p className="text-rose-300 font-mono">{"~"} 500ms</p>
              </div>
              <div>
                <p className="text-gray-400 mb-0.5">インデックスあり</p>
                <p className="text-violet-300 font-mono">{"~"} 1ms</p>
              </div>
            </div>
          </div>

          {/* インデックスを使わない方がいい場合 */}
          <div className="rounded-lg border px-4 py-3" style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <p className="text-xs font-semibold text-amber-300">インデックスを貼りすぎない方がいいケース</p>
            </div>
            <ul className="space-y-1">
              {[
                "更新が多いカラム — INSERT/UPDATE のたびにインデックスの再構築コストがかかる",
                "カーディナリティが低いカラム — 性別（男/女）など値の種類が少ない列は効果が薄い",
                "小さなテーブル — 行数が少なければフルスキャンの方が速いことも多い",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                  <span className="text-amber-500 flex-shrink-0 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-xs text-gray-600 text-center mt-4">
            インデックスはよく検索するカラム・外部キーに貼るのが基本。貼りすぎると書き込みが遅くなる。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── 詳細解説 ─────────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        {/* 6.1 なぜDBが必要か（最も実用的なので先頭へ） */}
        <DetailBlock heading="6.1 なぜDBが必要か — 「変数」では足りない理由">
          <UseCaseGrid cols={2} items={[
            {
              Icon: MemoryStick,
              title: "変数・useState",
              subtitle: "揮発性メモリ（一時的な記憶）",
              description: "ページをリロードすれば消える。ブラウザのタブを閉じても消える。複数ユーザーには共有されない。",
              accentColor: "rose",
            },
            {
              Icon: HardDrive,
              title: "データベース",
              subtitle: "永続化された記憶領域",
              description: "電源を切っても残る。別の端末・別のユーザーからアクセスしても同じ値が返ってくる。",
              accentColor: "violet",
            },
          ]} />
          <p>
            JavaScriptの変数や React の useState に値を入れても、ページをリロードすれば一瞬で消える。これは「揮発性のメモリ」に置いているから。
          </p>
          <p>
            DBは「永続化された記憶領域」で、電源を切ってもデータが残り、別の端末・別のユーザーからアクセスしても同じ値を返す。アプリが「ユーザーを覚えている」と感じるのは、ほぼ必ずDBが裏にいるから。
          </p>
          <KeyPoint>
            DBはアプリの長期記憶。変数はページをリロードすると消えるが、DBに保存した値は残る。「消えてほしくないデータ」は必ずDBに置く。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="6.2 RDBとNoSQLの使い分け指針">
          <UseCaseGrid cols={2} items={[
            {
              Icon: Table,
              title: "RDB（Supabase / PostgreSQL）",
              subtitle: "テーブル型・関係性重視",
              description: "「この投稿は誰のもので、コメントは誰が書いたか」を JOIN でつなげるのが得意。データの整合性を厳密に守りたいときに強い。",
              accentColor: "blue",
            },
            {
              Icon: FileJson,
              title: "NoSQL（Firestore / MongoDB）",
              subtitle: "ドキュメント型・柔軟性重視",
              description: "まず動かしてから育てたいとき・リアルタイム同期が欲しいときに強い。onSnapshot でDBの変更が即座にブラウザに反映される。",
              accentColor: "violet",
            },
          ]} />
          <KeyPoint>
            NoSQLとRDBはどちらが優れているわけではなく、データの形と要求次第で使い分ける。リアルタイム同期や柔軟なスキーマが必要ならNoSQL、複雑な集計や厳密な関係性管理が必要ならRDBが適している。
          </KeyPoint>
          <KeyPoint>
            初学者が個人開発でアプリを最短で動かすなら、Firestore（NoSQL）から入るのがおすすめ。SQLを書かずに済み、リアルタイム同期も標準でついてくる。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="6.3 Firestore のデータモデル">
          <p>
            Firestore は「コレクション ＞ ドキュメント ＞ フィールド」の3階層で考える。
          </p>
          <UseCaseGrid cols={3} items={[
            {
              Icon: Layers,
              title: "コレクション",
              subtitle: "同じ種類のデータの入れ物",
              description: "例: users、posts、comments。フォルダのイメージ。",
              accentColor: "violet",
            },
            {
              Icon: FileJson,
              title: "ドキュメント",
              subtitle: "コレクション内の1件1件",
              description: "ユニークなIDを持つ。JSON のような構造で値を格納する。",
              accentColor: "blue",
            },
            {
              Icon: BookOpen,
              title: "フィールド",
              subtitle: "ドキュメントの中身",
              description: "name: \"maji\" のようなキーと値のペア。型はstring / number / boolean など。",
              accentColor: "cyan",
            },
          ]} />
          <CodeBlock
            title="Firestore — CRUD の基本操作（TypeScript）"
            language="typescript"
            code={`import { collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

// C — Create: ドキュメントを追加（IDは自動発行）
const docRef = await addDoc(collection(db, "posts"), {
  title: "初めての投稿",
  author: "maji",
  createdAt: new Date(),
});

// R — Read: 1件取得
const snap = await getDoc(doc(db, "posts", docRef.id));
if (snap.exists()) console.log(snap.data());

// R — Read: 一覧取得
const querySnap = await getDocs(collection(db, "posts"));
querySnap.forEach((d) => console.log(d.id, d.data()));

// U — Update: フィールドを部分更新
await updateDoc(doc(db, "posts", docRef.id), { title: "タイトル変更後" });

// D — Delete: ドキュメントを削除
await deleteDoc(doc(db, "posts", docRef.id));`}
          />
          <p>
            CRUDはそれぞれ <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>addDoc</code>（追加）/ <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>getDoc</code>・<code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>getDocs</code>・<code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>onSnapshot</code>（取得）/ <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>updateDoc</code>（更新）/ <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: "#0f1117", color: "#34d399" }}>deleteDoc</code>（削除）で操作する。最初はこの4セットだけ覚えればOK。
          </p>
        </DetailBlock>

        <DetailBlock heading="6.4 DBの選び方 — 学習ステップの考え方">
          <Timeline items={[
            {
              year: "Stage 1",
              label: "Firestore で始める",
              description: "Firebase + Vercel の組み合わせ。SQLを書かずにDBを扱える。無料枠が広く、リアルタイム同期が標準でついてくる。フロントエンドから直接叩く感覚でDBの全体像を掴む。",
              accentColor: "violet",
            },
            {
              year: "Stage 2",
              label: "Firestoreの制約にぶつかる",
              description: "複雑なクエリ・集計処理・複数コレクションをまたいだ結合など、NoSQLでは対応しにくい要件が出てくる。この段階でRDBの必要性を実感する。",
              accentColor: "amber",
            },
            {
              year: "Stage 3",
              label: "Supabase（PostgreSQL）へ踏み込む",
              description: "テーブル設計・外部キー・JOIN・SQLの基礎を学ぶ段階。関係性の複雑なデータ・厳密な整合性が必要なプロジェクトで本領を発揮する。",
              accentColor: "blue",
            },
          ]} />
          <p>
            <strong className="text-white">最初の選択</strong>：学習コストを最小にしたいなら Firestore（Firebase）が入りやすい。無料枠が広く、リアルタイム同期が標準で、フロントエンドから直接叩ける感覚で書けるため、DBの全体像を掴むのに向いている。
          </p>
          <p>
            <strong className="text-white">次のステップ</strong>：データの関係性が複雑になったり、集計処理が増えてきたら Supabase（PostgreSQL）も検討する。SQLを深く学ぶのはこの段階からでも十分間に合う。
          </p>
          <KeyPoint>
            「DBを選ぶ」のは「アプリの土台を選ぶ」と同じくらい重い決断。ただし最初から完璧を求める必要はない。動かしながら必要になったら学ぶ、で問題ない。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="6.5 セキュリティの最低ライン — 認証とルール">
          <CorrectionCard
            misconception="開発中はテストモード（誰でも読み書き可能）でOK。本番前に直せばいい"
            correction="テストモードのまま本番デプロイすると、世界中の誰でもDBを覗ける・書き換えられる状態になる"
            reason="実際にFirestoreのセキュリティルールを「誰でも書き込み可能」のまま放置したプロジェクトで、第三者にデータを書き換えられたり削除された事例がある。デプロイ前に必ず塞ぐこと。"
          />
          <UseCaseGrid cols={2} items={[
            {
              Icon: ShieldAlert,
              title: "テストモード（危険）",
              subtitle: "allow read, write: if true;",
              description: "誰でも読み書きできる。開発中しか使ってはいけない。本番環境には絶対に持ち込まない。",
              accentColor: "rose",
            },
            {
              Icon: ShieldCheck,
              title: "認証済みユーザーのみ（最低ライン）",
              subtitle: "allow read, write: if request.auth != null;",
              description: "ログインしているユーザーだけがアクセスできる。さらに「自分のデータのみ」に絞るのが理想。",
              accentColor: "emerald",
            },
          ]} />
          <p>
            DBは「誰でも読み書きできる状態」にしてはいけない。Firestore には「セキュリティルール」、Supabase には「Row Level Security（RLS）」という仕組みがあり、「ログインしているユーザーだけが自分のデータを読み書きできる」というルールを書ける。
          </p>
          <KeyPoint>
            DBを公開する前に、必ずアクセスルールを設定する。「自分のデータは自分しか触れない」を最低ラインとする。
          </KeyPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/kiso/server",
            title: "サーバーって何？",
            description: "DBの相棒となる、リクエストを受けて返す側",
            icon: "Server",
          },
          {
            href: "/kiso/baas",
            title: "BaaSって何？",
            description: "サーバーとDBをまとめて借りる選択肢の正体",
            icon: "Cloud",
          },
          {
            href: "/kiso/vercel",
            title: "Vercelって何？",
            description: "DBと組み合わせてアプリを公開するデプロイ先",
            icon: "Triangle",
          },
        ]}
      />

      <PageDrill questions={databaseQuestions} />
    </div>
  );
}
