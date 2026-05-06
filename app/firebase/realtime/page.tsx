import Link from "next/link";
import {
  Radio,
  RefreshCw,
  Smartphone,
  Wifi,
  WifiOff,
  AlertTriangle,
  GitCommit,
  PlusCircle,
  Pencil,
  Trash2,
  Clock,
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
import { SectionDivider } from "@/components/SectionDivider";
import { TermNote } from "@/components/TermNote";
import { Timeline } from "@/components/Timeline";
import { CodeBlock } from "@/components/CodeBlock";
import { realtimeQuestions } from "@/content/questions/firebase/realtime";

export const metadata = {
  title: "リアルタイム購読って何？ | Web開発図解",
  description:
    "Firebase の onSnapshot を図解で解説。getDocs との違い・useEffect との組み合わせパターン・メモリリークを防ぐ unsubscribe の仕組みを1ページで理解する。",
};

export default function RealtimePage() {
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
        title="リアルタイム購読って何？"
        subtitle="データが変わった瞬間、画面も変わる——onSnapshot の仕組みと使い方"
        body="getDocs との違い・useEffect との組み合わせ・メモリリーク防止までここで整理する。"
        accentColor="cyan"
      />

      <Prerequisites
        learn={[
          "onSnapshot と getDocs の違い（一回取得 vs ずっと監視）",
          "useEffect + onSnapshot の基本パターン",
          "unsubscribe でメモリリークを防ぐ仕組み",
        ]}
        prerequisites={[
          { text: "Firestoreって何？（コレクション・ドキュメント構造）", href: "/firebase/firestore" },
          "JavaScriptの非同期処理（async/await の基本）",
          "React の useEffect の基本的な使い方",
        ]}
        outOfScope={[
          "docChanges() を使った差分更新の詳細最適化",
          "複合クエリ（where + orderBy）との組み合わせ",
          "Firebase Realtime Database（Firestore とは別サービス）",
          "Server-Sent Events・WebSocket との技術的比較",
        ]}
      />

      <OnePageSummary
        keyMessage="onSnapshot は Firestore のデータを「購読」するメソッド。LINEの既読通知のように、相手が何かを変更した瞬間に自分の画面にも届く。getDocs が「その場でデータを1枚コピーしてくる」のに対して、onSnapshot は「変化があるたびに自動で知らせてくれる宅配便の定期便」だ。"
        metaphorTitle="宅配便の定期便"
        metaphorPoints={[
          {
            label: "getDocs",
            real: "呼んだ瞬間にデータを1回だけ取得して終わる。変化があっても気づかない",
            metaphor: "自分でコンビニに取りに行く",
          },
          {
            label: "onSnapshot",
            real: "データが変わるたびに Firestore から自動でコールバックが呼ばれる。変化がなければ通信ゼロ",
            metaphor: "変化があれば自動で届く宅配便",
          },
          {
            label: "unsubscribe",
            real: "購読を解除する関数。コンポーネントがアンマウントされたら必ず呼ぶ",
            metaphor: "定期便の受け取りをキャンセルする",
          },
          {
            label: "useEffect + onSnapshot",
            real: "コンポーネントがマウントされたときに購読を開始し、アンマウント時に解除するセットで使う",
            metaphor: "入居時に申し込み・退去時にキャンセル",
          },
        ]}
        definition="onSnapshot とは、Firestore のコレクションやドキュメントをリアルタイムに監視するメソッド。データが変化するたびにコールバックが自動で呼ばれ、React と組み合わせるときは useEffect で購読開始・クリーンアップで unsubscribe を呼ぶのが定番パターン。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          まず getDocs と onSnapshot が何をしているのかを図で見てから、React でどう使うかを確認します。
        </p>

        {/* ── 概念図A: getDocs vs onSnapshot ── */}
        <ConceptDiagram
          title="概念図A"
          description="getDocs vs onSnapshot — 通信タイミングの違いを見る"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* getDocs 側 */}
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 text-center">
                getDocs（一回取得）
              </p>

              <div className="space-y-2 mb-4">
                {[
                  { label: "呼び出し", note: "1回だけリクエスト送信" },
                  { label: "データ受信", note: "その時点のデータが届く" },
                  { label: "終了", note: "データが変わっても気づかない" },
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs">
                    <span
                      className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: "#1a1d2a", color: "#6b7280", border: "1px solid #2d3048" }}
                    >
                      {i + 1}
                    </span>
                    <div>
                      <span className="text-gray-300 font-medium">{step.label}</span>
                      <span className="text-gray-500 ml-2">{step.note}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="rounded-lg p-2.5 font-mono text-xs"
                style={{ backgroundColor: "#1a1d2a" }}
              >
                <span className="text-gray-500">{"// 一度だけデータを取得"}</span>
                <br />
                <span className="text-blue-300">const</span>
                <span className="text-gray-300"> snap = </span>
                <span className="text-yellow-300">await getDocs</span>
                <span className="text-gray-300">(ref);</span>
              </div>

              <div className="flex items-center gap-1.5 mt-3">
                <WifiOff className="w-3.5 h-3.5 text-gray-500" />
                <span className="text-xs text-gray-500">その後は変化を検知しない</span>
              </div>
            </div>

            {/* onSnapshot 側 */}
            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "rgba(6,182,212,0.04)",
                borderColor: "rgba(6,182,212,0.35)",
              }}
            >
              <p className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-3 text-center">
                onSnapshot（リアルタイム購読）
              </p>

              <div className="space-y-2 mb-4">
                {[
                  { label: "購読開始", note: "Firestore が変化を監視し始める", color: "#22d3ee" },
                  { label: "変化を検知", note: "Firestore がプッシュ通知を送信", color: "#22d3ee" },
                  { label: "コールバック", note: "自動で関数が呼ばれ画面が更新", color: "#22d3ee" },
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs">
                    <span
                      className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
                      style={{
                        backgroundColor: "rgba(6,182,212,0.12)",
                        color: step.color,
                        border: "1px solid rgba(6,182,212,0.3)",
                      }}
                    >
                      {i + 1}
                    </span>
                    <div>
                      <span className="text-white font-medium">{step.label}</span>
                      <span className="text-gray-400 ml-2">{step.note}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="rounded-lg p-2.5 font-mono text-xs"
                style={{ backgroundColor: "rgba(6,182,212,0.08)", borderColor: "rgba(6,182,212,0.2)" }}
              >
                <span className="text-gray-400">{"// 変化があるたびに呼ばれる"}</span>
                <br />
                <span className="text-blue-300">const</span>
                <span className="text-gray-300"> unsub = </span>
                <span className="text-cyan-300">onSnapshot</span>
                <span className="text-gray-300">(ref, cb);</span>
              </div>

              <div className="flex items-center gap-1.5 mt-3">
                <Wifi className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-xs text-cyan-300">変化がなければ通信ゼロ・変化があれば即座に届く</span>
              </div>
            </div>
          </div>

          <div
            className="rounded-lg border mt-4 p-3"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-xs font-semibold text-gray-400 mb-2">
              どちらを使うべきか？
            </p>
            <p className="text-sm text-gray-300 leading-relaxed">
              チャット・通知・共同編集のように{" "}
              <span className="text-cyan-300 font-medium">「他のユーザーの操作がリアルタイムに反映されてほしい」</span>
              {" "}場面では onSnapshot が適切です。
              一方、初期表示だけでよいプロフィール取得や、ボタンを押したときだけ更新するような場面では getDocs で十分です。
            </p>
          </div>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          2つの違いが分かりました。次は React で onSnapshot を使うときの基本パターンを確認します。
        </p>

        {/* ── 概念図B: useEffect + onSnapshot のライフサイクル ── */}
        <ConceptDiagram
          title="概念図B"
          description="useEffect + onSnapshot のライフサイクル — 購読の始まりと終わり"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <FlowCard
              Icon={Radio}
              title="コンポーネント マウント"
              subtitle="useEffect が発火"
              accentColor="cyan"
            />
            <FlowArrow label="onSnapshot 開始" direction="right" />
            <FlowCard
              Icon={RefreshCw}
              title="データ変化を検知"
              subtitle="コールバックが呼ばれる"
              highlight
              accentColor="cyan"
            />
            <FlowArrow label="setState → 再描画" direction="right" />
            <FlowCard
              Icon={Smartphone}
              title="画面が更新される"
              subtitle="購読中はずっと継続"
              accentColor="cyan"
            />
          </div>

          <div
            className="mt-4 rounded-xl border-2 border-dashed p-4"
            style={{ borderColor: "rgba(239,68,68,0.3)" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <p className="text-xs font-semibold text-red-300">アンマウント時は必ず購読を解除する</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div
                className="rounded-lg border p-3 text-center w-full sm:w-36"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <Smartphone className="w-5 h-5 mx-auto mb-1 text-gray-500" />
                <p className="text-xs text-gray-400">コンポーネント アンマウント</p>
              </div>
              <FlowArrow label="クリーンアップ" direction="right" />
              <div
                className="rounded-lg border p-3 text-center w-full sm:w-36"
                style={{
                  backgroundColor: "rgba(239,68,68,0.05)",
                  borderColor: "rgba(239,68,68,0.3)",
                }}
              >
                <WifiOff className="w-5 h-5 mx-auto mb-1 text-red-400" />
                <p className="text-xs text-red-300">unsubscribe() 呼び出し</p>
                <p className="text-xs text-gray-500 mt-1">購読終了</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3 leading-relaxed">
              クリーンアップしないと、コンポーネントが画面から消えた後も Firestore の購読が残り続け、
              存在しない画面の setState を呼ぼうとするメモリリークが発生する。
            </p>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（基礎編） ───────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "question",
            text: "マスター、onSnapshot って結局ポーリングと何が違うんですか？\n3秒おきにサーバーに聞きに行くのとどう違うんだろうと思っていて……",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "いい疑問ですね、マジさん。\nポーリングは「自分から3秒ごとに電話をかける」イメージです。\n変化がなくても毎回電話する。受話器を取る手間も通信コストも、変化がなくても発生する。\nonSnapshot は「Firestore が変化を検知したとき、向こうからプッシュ通知を送ってくる」仕組みです。\n変化がなければ通信ゼロ。変化があれば即座に届く。",
          },
          {
            speaker: "maji",
            emotion: "surprised",
            text: "マジ！ つまり自分から聞きに行くんじゃなくて\n向こうから知らせてくれるってことですか？\nLINEの既読通知みたいな感じ？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "まさにその比喩が正確です、マジさん。\n相手がメッセージを読んだ瞬間に既読がつく——あれもプッシュ型の仕組みです。\nあなたが3秒ごとに「もう読んだ？もう読んだ？」と聞き続けているわけじゃないですよね。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "でもボク、一個気になっていて……\n「メモリリーク」って何ですか？\nuseEffect のところで見かけたんですが、なんか怖い名前で……",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "メモリリークとは、コンポーネントが画面から消えた後も\n購読やタイマーが解除されずにメモリを消費し続ける状態のことです。\n例えば退去したマンションの宅配便の定期便をキャンセルし忘れた状態。\nもう誰もいない部屋に荷物が届き続けるイメージです。\nReact では useEffect のクリーンアップ関数で unsubscribe を呼ぶことで防ぎます。",
          },
          {
            speaker: "maji",
            emotion: "thinking",
            text: "なるほど……\n「return () => { unsubscribe(); }」って書くやつですよね。\nボク今まで何のためにそれを書くのか分かっていませんでしたが、やっと意味が分かりました。",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "完璧な理解です、マジさん。\n「マウント時に購読開始・アンマウント時に購読解除」——\nこのセットを守るだけで onSnapshot の正しい使い方は完成します。\nonSnapshot が返す関数を unsubscribe と名付けてクリーンアップで呼ぶ。\nこれが React + Firestore の定番パターンです。",
          },
        ]}
      />

      {/* ── COMPARISON ──────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          COMPARISON
        </h2>
        <ComparisonTable
          headers={["getDocs（一回取得）", "onSnapshot（リアルタイム購読）"]}
          rows={[
            {
              label: "通信タイミング",
              cells: ["呼び出したとき1回だけ", "変化があるたびに Firestore から自動で届く"],
              highlightCol: 1,
            },
            {
              label: "変化への対応",
              cells: ["変化があっても検知しない", "変化を即座に検知してコールバックが呼ばれる"],
              highlightCol: 1,
            },
            {
              label: "戻り値",
              cells: ["Promise（QuerySnapshot）", "unsubscribe 関数（購読解除に使う）"],
              highlightCol: 1,
            },
            {
              label: "クリーンアップ",
              cells: ["不要", "必須（useEffect で unsubscribe を呼ぶ）"],
              highlightCol: 1,
            },
            {
              label: "向いている用途",
              cells: [
                "初期表示・ボタン操作時のデータ取得",
                "チャット・通知・共同編集・ライブダッシュボード",
              ],
              highlightCol: 1,
            },
          ]}
          note="getDocs と onSnapshot はどちらが優れているわけではなく、用途に応じて使い分けるもの。リアルタイム性が不要な場面で onSnapshot を使うと、不要な購読が増えてコストが上がる。"
        />
      </section>

      {/* ── SectionDivider ──────────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下は実際にコードを書くときに必要な詳細パターンです。概念を掴んでから戻ってきましょう。"
      />

      {/* ── 応用編 ──────────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — コードパターンとクリーンアップ
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          実際に書くコードのパターンと、クリーンアップがなぜ重要かを確認します。
        </p>

        <TermNote
          terms={[
            {
              word: "onSnapshot",
              definition:
                "Firestore のコレクション・ドキュメントを監視するメソッド。変化があるたびにコールバックが自動で呼ばれる。戻り値は購読解除関数（unsubscribe）。",
            },
            {
              word: "unsubscribe",
              definition:
                "onSnapshot の戻り値となる関数。呼び出すと購読が解除される。React では useEffect のクリーンアップ関数内で呼ぶのが定番。",
            },
            {
              word: "メモリリーク",
              definition:
                "コンポーネントがアンマウントされた後も購読やタイマーが解除されずメモリを消費し続ける状態。unsubscribe を呼び忘れると発生する。",
            },
            {
              word: "docChanges()",
              definition:
                "QuerySnapshot のメソッド。スナップショット内の変更差分を返す。各要素の type は \"added\" / \"modified\" / \"removed\" の3種類。",
            },
            {
              word: "QuerySnapshot",
              definition:
                "onSnapshot のコールバックが受け取るオブジェクト。docs（全ドキュメント配列）・docChanges()（差分の配列）などにアクセスできる。",
            },
          ]}
        />
      </section>

      {/* ── DetailSection ────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="1. 基本パターン（useEffect + onSnapshot）">
          <p>
            React で onSnapshot を使うときは{" "}
            <strong className="text-white">useEffect の中で購読を開始し、クリーンアップ関数で解除する</strong>
            のが基本パターンです。onSnapshot が返す関数を変数に受け取り、return でそれを返すだけです。
          </p>
          <CodeBlock
            title="realtime-basic.tsx"
            language="typescript"
            code={`import { useEffect, useState } from "react";
import { collection, onSnapshot, QuerySnapshot, DocumentData } from "firebase/firestore";
import { db } from "./firebase"; // 初期化済みの Firestore インスタンス

type Message = { id: string; text: string; createdAt: Date };

export function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // 購読開始 — onSnapshot はすぐに1回コールバックを呼ぶ（初期データ取得も兼ねる）
    const unsubscribe = onSnapshot(
      collection(db, "messages"),
      (snapshot: QuerySnapshot<DocumentData>) => {
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Message[];
        setMessages(list);
      }
    );

    // クリーンアップ — コンポーネントがアンマウントされたら購読を解除する
    return () => unsubscribe();
  }, []); // 依存配列を空にすることでマウント時に1回だけ購読を開始

  return (
    <ul>
      {messages.map((msg) => (
        <li key={msg.id}>{msg.text}</li>
      ))}
    </ul>
  );
}`}
          />
          <KeyPoint>
            onSnapshot はコールバックを受け取り、購読を開始すると同時に現在のデータを1回コールバックに渡す。そのため getDocs を別途呼ばなくても初期データが取得できる。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="2. 変更の種類（added / modified / removed）を扱うパターン">
          <p>
            コレクション全体を毎回再取得するのではなく、{" "}
            <strong className="text-white">docChanges()</strong> を使うと差分だけ効率よく処理できます。
            追加・更新・削除を個別に捌くことで、リストの再構築コストを最小限に抑えられます。
          </p>
          <CodeBlock
            title="realtime-diff.tsx"
            language="typescript"
            code={`import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

type Post = { id: string; title: string; likes: number };

export function PostList() {
  const [posts, setPosts] = useState<Map<string, Post>>(new Map());

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts"),
      (snapshot) => {
        setPosts((prev) => {
          const next = new Map(prev);

          snapshot.docChanges().forEach((change) => {
            if (change.type === "added" || change.type === "modified") {
              // 追加・更新: Map にセット（ID をキーにすることで重複を防ぐ）
              next.set(change.doc.id, {
                id: change.doc.id,
                ...change.doc.data(),
              } as Post);
            }
            if (change.type === "removed") {
              // 削除: Map から取り除く
              next.delete(change.doc.id);
            }
          });

          return next;
        });
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <ul>
      {Array.from(posts.values()).map((post) => (
        <li key={post.id}>{post.title} — {post.likes} いいね</li>
      ))}
    </ul>
  );
}`}
          />

          {/* 3種類の変化アイコン */}
          <div className="grid grid-cols-3 gap-3 mt-2">
            {[
              { Icon: PlusCircle, label: '"added"', desc: "新規ドキュメントが追加された", color: "#22d3ee" },
              { Icon: Pencil, label: '"modified"', desc: "ドキュメントのフィールドが変更された", color: "#fbbf24" },
              { Icon: Trash2, label: '"removed"', desc: "ドキュメントが削除された", color: "#f87171" },
            ].map(({ Icon, label, desc, color }) => (
              <div
                key={label}
                className="rounded-lg border p-3 text-center"
                style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
              >
                <Icon className="w-4 h-4 mx-auto mb-1.5" style={{ color }} />
                <p className="text-xs font-mono font-bold" style={{ color }}>{label}</p>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </DetailBlock>

        <DetailBlock heading="3. クリーンアップの重要性">
          <p>
            unsubscribe を呼ばないとどうなるのか——コンポーネントのライフサイクルで確認します。
          </p>
          <Timeline
            items={[
              {
                year: "Step 1",
                label: "マウント",
                description:
                  "コンポーネントが画面に表示される。useEffect が実行され、onSnapshot による購読が開始される。",
                accentColor: "cyan",
              },
              {
                year: "Step 2",
                label: "購読中",
                description:
                  "Firestore のデータが変化するたびにコールバックが呼ばれ、setState で画面が更新される。",
                accentColor: "cyan",
              },
              {
                year: "Step 3",
                label: "アンマウント",
                description:
                  "コンポーネントが画面から消える（別ページへ遷移・モーダルを閉じるなど）。このタイミングで React は useEffect のクリーンアップ関数を実行する。",
                accentColor: "amber",
              },
              {
                year: "Step 4",
                label: "unsubscribe() を呼ぶ（正しい）",
                description:
                  "クリーンアップ関数内で unsubscribe() を呼ぶと購読が解除され、Firestore からの通知も止まる。メモリリークは発生しない。",
                accentColor: "cyan",
              },
              {
                year: "BAD",
                label: "unsubscribe() を呼ばない（メモリリーク）",
                description:
                  "クリーンアップしないと、コンポーネントが消えた後も購読が続く。Firestore から通知が届くたびに「もう存在しない」コンポーネントの setState が呼ばれ、コンソールに警告が出てメモリを消費し続ける。",
                accentColor: "rose",
              },
            ]}
          />
          <WarningPoint>
            useEffect のクリーンアップで必ず unsubscribe を呼ぶ。onSnapshot を使うときはこのルールを絶対に忘れない。ページ遷移が多いアプリほどメモリリークが蓄積されてパフォーマンスに影響する。
          </WarningPoint>
        </DetailBlock>
      </DetailSection>

      {/* ── WarningPoint ─────────────────────────────────────── */}
      <section className="mb-10">
        <WarningPoint>
          useEffect の依存配列を空配列（[ ]）にせず、query オブジェクトを依存に含めると、レンダリングのたびに新しい query が生成されて onSnapshot が無限に再購読される。query はコンポーネント外か useMemo でメモ化すること。
        </WarningPoint>
      </section>

      {/* ── CorrectionCard ──────────────────────────────────── */}
      <section className="mb-10">
        <CorrectionCard
          misconception={`onSnapshot を使えばリアルタイムに更新されるから getDocs はいらない`}
          correction="onSnapshot と getDocs は用途が違う。onSnapshot はリアルタイム性が必要な場面に使うもので、1回だけ取得すれば十分な場面では getDocs の方がシンプルでコスト効率が良い。"
          reason="onSnapshot は購読を維持するため、Firestore の読み取りコストが継続的に発生する。初期表示・検索・ボタンクリック時の取得など、リアルタイム性が不要な場面には getDocs を使う方が設計としてシンプル。"
        />
      </section>

      <RelatedLinks
        items={[
          {
            href: "/firebase/firestore",
            title: "Firestoreって何？",
            description: "コレクション・ドキュメント構造と getDocs の基本から理解する",
            icon: "Database",
          },
          {
            href: "/firebase/auth",
            title: "Firebase Auth（準備中）",
            description: "ログイン状態によって購読するデータを切り替えるパターン",
            icon: "Flame",
          },
          {
            href: "/kiso/baas",
            title: "BaaSって何？",
            description: "Firebase を含む BaaS 全体の概念を理解する",
            icon: "Server",
          },
        ]}
      />

      <PageDrill questions={realtimeQuestions} />
    </div>
  );
}
