import Link from "next/link";
import { Server, Cloud, Code2 } from "lucide-react";

import { Hero } from "@/components/Hero";
import { Prerequisites } from "@/components/Prerequisites";
import { OnePageSummary } from "@/components/OnePageSummary";
import { Bridge } from "@/components/Bridge";
import { TermNote } from "@/components/TermNote";
import { ConceptDiagram } from "@/components/ConceptDiagram";
import { MajiDialogue } from "@/components/MajiDialogue";
import { ComparisonTable } from "@/components/ComparisonTable";
import { SectionDivider } from "@/components/SectionDivider";
import {
  DetailSection,
  DetailBlock,
  KeyPoint,
  WarningPoint,
} from "@/components/DetailSection";
import { RelatedLinks } from "@/components/RelatedLinks";
import { PageDrill } from "@/components/PageDrill";
import { serverComponentQuestions } from "@/content/questions/nextjs/server-component";

export const metadata = {
  title: "Server Components | Next.js | Web開発図解",
  description:
    "Next.jsのServer ComponentとClient Componentの違いを図解。'use client'をどこに書くか、useState・useEffectがClient側でしか使えない理由、ServerとClientの組み合わせ方まで解説。",
};

export default function ServerComponentPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">

      {/* ── 戻るリンク ──────────────────────────────────────── */}
      <div className="mb-6">
        <Link
          href="/nextjs"
          className="text-xs text-gray-500 hover:text-white transition-colors"
        >
          ← Next.js に戻る
        </Link>
      </div>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <Hero
        category="Next.js"
        title="Server Components"
        subtitle={"Reactがサーバーで動く — 'use client' の境界線を理解する"}
        accentColor="violet"
      />

      {/* ── Prerequisites ────────────────────────────────────── */}
      <Prerequisites
        learn={[
          "Server ComponentとClient Componentの違い",
          "'use client'をどこに書くか、なぜ必要か",
          "useState・useEffectがClient側だけで使える理由",
        ]}
        prerequisites={[
          "useStateとuseEffectを知っている（/react/state と /react/useeffect を読んだ）",
          "データフェッチの基本を知っている（/nextjs/data-fetching を読んだ）",
        ]}
        outOfScope={[
          "Server→Clientへのprops（シリアライズ制約）（応用編で扱う）",
          "Streaming SSRの内部構造（応用編で扱う）",
          "RSC payload・コンパイル後のバンドル（上級トピック）",
        ]}
      />

      {/* ── OnePageSummary ───────────────────────────────────── */}
      <OnePageSummary
        keyMessage={"Next.jsではReactコンポーネントが「サーバーで動く（Server）」か「ブラウザで動く（Client）」かに分かれる。デフォルトはServer。useStateやuseEffectなど「ブラウザの機能が必要な処理」だけ 'use client' をファイル先頭に書いてClientにする。"}
        metaphorTitle="工場と店舗の分担"
        metaphorPoints={[
          {
            label: "Server Component",
            real: "工場（見えない場所でデータを処理・HTMLを作る）",
            metaphor: "Server Component",
          },
          {
            label: "Client Component",
            real: "店舗（お客様=ユーザーと直接インタラクションする）",
            metaphor: "Client Component",
          },
          {
            label: "'use client'",
            real: "「この建物は店舗です」という看板",
            metaphor: "use client",
          },
          {
            label: "useState/useEffect",
            real: "店員さんの接客ツール（工場では使わない）",
            metaphor: "useState/useEffect",
          },
        ]}
        definition={"Server ComponentはサーバーでHTMLを作る。Client Componentは'use client'でマークしたファイルで、ブラウザで動くインタラクティブな部品。"}
      />

      {/* ── Bridge: OnePageSummary → TermNote ────────────────── */}
      <Bridge
        from="全体像がつかめた"
        to="図に出てくる言葉を確認してから、使い分けの表を見る"
      />

      {/* ── TermNote（基礎図の前） ────────────────────────────── */}
      <TermNote
        terms={[
          {
            word: "Server Component（SC）",
            definition: "デフォルト。サーバーで動く。データ取得・DBアクセスなどが得意。useState/useEffect/ブラウザAPIは使えない",
          },
          {
            word: "Client Component（CC）",
            definition: "'use client'をファイル先頭に書いたコンポーネント。ブラウザで動く。useState/useEffect/onclick等が使える",
          },
          {
            word: "'use client'",
            definition: "ファイル先頭に書くディレクティブ。そのファイルとその子孫がClientになる",
          },
          {
            word: "Hydration",
            definition: "サーバーで作ったHTMLにブラウザでJSを付与し、インタラクティブにする処理",
          },
          {
            word: "ディレクティブ",
            definition: "コードの先頭に書く特別な文字列（'use client' / 'use server'）。Reactに処理場所を指示する",
          },
        ]}
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ──────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        {/* 概念図A: ServerとClientの分け方 */}
        <ConceptDiagram
          title="概念図A — ServerとClientの分け方"
          description="何ができて何ができないか。迷ったらこの表で確認する"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr style={{ borderBottom: "1px solid #2d3048" }}>
                  <th className="text-left py-2 pr-4 text-gray-500 font-medium w-32">機能</th>
                  <th className="text-left py-2 px-3 text-gray-300 font-semibold">Server Component</th>
                  <th
                    className="text-left py-2 px-3 font-semibold"
                    style={{ color: "#c4b5fd" }}
                  >
                    Client Component
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: "マーク",
                    server: "なし（デフォルト）",
                    client: "ファイル先頭に 'use client'",
                    clientHighlight: true,
                  },
                  {
                    feature: "実行場所",
                    server: "サーバー",
                    client: "ブラウザ",
                    clientHighlight: false,
                  },
                  {
                    feature: "useState",
                    server: "NG",
                    client: "OK",
                    clientHighlight: true,
                    serverDanger: true,
                  },
                  {
                    feature: "useEffect",
                    server: "NG",
                    client: "OK",
                    clientHighlight: true,
                    serverDanger: true,
                  },
                  {
                    feature: "async/await",
                    server: "OK",
                    client: "NG（useEffectで代用）",
                    clientHighlight: false,
                    serverHighlight: true,
                  },
                  {
                    feature: "onClick等",
                    server: "NG",
                    client: "OK",
                    clientHighlight: true,
                    serverDanger: true,
                  },
                  {
                    feature: "用途",
                    server: "データ取得・レイアウト",
                    client: "フォーム・アニメーション・インタラクション",
                    clientHighlight: false,
                  },
                ].map((row, i) => (
                  <tr
                    key={i}
                    style={{
                      backgroundColor: i % 2 === 0 ? "#0f1117" : "transparent",
                      borderBottom: "1px solid #2d3048",
                    }}
                  >
                    <td className="py-2.5 pr-4 text-gray-400 font-medium">{row.feature}</td>
                    <td
                      className="py-2.5 px-3"
                      style={{
                        color: row.serverDanger ? "#f87171" : row.serverHighlight ? "#34d399" : "#d1d5db",
                      }}
                    >
                      {row.server}
                    </td>
                    <td
                      className="py-2.5 px-3"
                      style={{
                        color: row.clientHighlight ? "#c4b5fd" : "#d1d5db",
                      }}
                    >
                      {row.client}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            className="mt-4 rounded-lg border px-4 py-3"
            style={{ borderColor: "rgba(139,92,246,0.3)", backgroundColor: "rgba(139,92,246,0.05)" }}
          >
            <p className="text-xs text-violet-300 leading-relaxed">
              迷ったらまずServerを試す。useStateやイベントが必要になったときだけ 'use client' を追加するのが基本方針。
            </p>
          </div>
        </ConceptDiagram>

        {/* Bridge A → B */}
        <Bridge
          from="ServerとClientの使い分けルールが分かった"
          to="実際のコードでどう組み合わせるか確認する"
        />

        {/* 概念図B: Server ComponentとClient Componentの組み合わせ例 */}
        <ConceptDiagram
          title="概念図B — Server ComponentとClient Componentの組み合わせ例"
          description="ページ全体をServerにして、インタラクティブな部分だけClientに委ねる"
        >
          <div className="space-y-3">
            {/* Server Component側のコード */}
            <div className="rounded-lg border p-4" style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}>
              <p className="text-xs font-semibold text-gray-400 mb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-gray-400 inline-block" />
                app/page.tsx（Server Component）— データを取得してPropsで渡す
              </p>
              <pre className="text-xs text-gray-300 leading-relaxed font-mono whitespace-pre overflow-x-auto">
                <code>{`export default async function Page() {
  const data = await fetchData();
  return (
    <main>
      <h1>{data.title}</h1>       {/* サーバーで埋め込む */}
      <LikeButton count={data.likes} />  {/* Clientに委ねる */}
    </main>
  );
}`}</code>
              </pre>
            </div>

            {/* Client Component側のコード */}
            <div
              className="rounded-lg border p-4"
              style={{ backgroundColor: "#0f1117", borderColor: "rgba(139,92,246,0.4)" }}
            >
              <p className="text-xs font-semibold mb-2 flex items-center gap-1.5" style={{ color: "#c4b5fd" }}>
                <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: "#c4b5fd" }} />
                app/components/LikeButton.tsx（Client Component）
              </p>
              <pre className="text-xs text-gray-300 leading-relaxed font-mono whitespace-pre overflow-x-auto">
                <code>{`"use client";
import { useState } from "react";

export function LikeButton({ count }: { count: number }) {
  const [liked, setLiked] = useState(false);
  return (
    <button onClick={() => setLiked(true)}>
      {liked ? "いいね済み" : \`いいね \${count}\`}
    </button>
  );
}`}</code>
              </pre>
            </div>
          </div>

          <div
            className="mt-4 rounded-lg border px-4 py-3"
            style={{ borderColor: "rgba(139,92,246,0.3)", backgroundColor: "rgba(139,92,246,0.05)" }}
          >
            <p className="text-xs text-violet-300 leading-relaxed">
              ServerがデータをPropsとしてClientに渡す。Clientは受け取ったデータを使いつつ、自分の状態（liked）を管理する。役割分担が明確。
            </p>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（SectionDivider前・基礎編内） ────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "worried",
            text: "全部 'use client' にしたらダメなんですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "ダメではないですが、パフォーマンスが下がります。\nClientにするとそのコードがブラウザに送られてJSバンドルが重くなる。サーバーでできる処理はServerに任せるのがNext.jsの設計思想です。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "useStateを使いたいだけで 'use client' を書くのが面倒に感じます……マジ？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "最初は面倒に感じますよね。\nでも慣れると 'use client' がある=インタラクティブな部品、という読み方ができて逆に分かりやすくなります。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "'use client' を書いたファイルの子コンポーネントはどうなるの？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "自動的にClient扱いになります。\n'use client' は境界線です。その境界を越えた子孫はすべてClientになる。だからなるべく末端の小さなコンポーネントにだけ書くのがベストプラクティスです。",
          },
        ]}
      />

      {/* ── ComparisonTable ───────────────────────────────────── */}
      <ComparisonTable
        headers={["Server Component（デフォルト）", "Client Component（'use client'）"]}
        rows={[
          {
            label: "バンドルに含まれるか",
            cells: ["NO（サーバーだけで処理）", "YES（ブラウザにJS送付）"],
            highlightCol: 0,
          },
          {
            label: "初期表示速度",
            cells: ["速い", "やや遅い（JSのダウンロード・実行が必要）"],
            highlightCol: 0,
          },
          {
            label: "データ取得",
            cells: ["async/await直接OK", "useEffect内で行う"],
            highlightCol: 0,
          },
          {
            label: "状態管理",
            cells: ["不可（useState使えない）", "可（useState/useReducer）"],
            highlightCol: 1,
          },
          {
            label: "イベント処理",
            cells: ["不可（onClickなど使えない）", "可"],
            highlightCol: 1,
          },
        ]}
        highlightCol={0}
        note={"「全部Serverにしたい」と「全部Clientにしたい」の両方の誘惑があるが、正解はケースバイケース。データ表示はServer、インタラクションはClientというのが基本の組み合わせ。"}
      />

      {/* ── SectionDivider ───────────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="Server→Clientへのprops制約・childrenパターン・Context・サードパーティ対応を解説します"
      />

      {/* ── 応用編 TermNote ───────────────────────────────────── */}
      <TermNote
        terms={[
          {
            word: "シリアライズ",
            definition: "データをネットワーク越しに送れる文字列/バイト列に変換すること。Server→Clientへのpropsはシリアライズできる値（文字列・数値・配列等）のみ渡せる。関数・クラスインスタンスは渡せない",
          },
          {
            word: "Hydration",
            definition: "サーバーが作ったHTMLにブラウザ側でReactが接続してインタラクティブにする処理",
          },
          {
            word: "RSC payload",
            definition: "Server Componentの実行結果を表すNext.js独自のフォーマット",
          },
        ]}
      />

      {/* ── 応用編 CONCEPT DIAGRAMS ──────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED DIAGRAMS
        </h2>

        {/* 概念図C: Server→Clientへのpropsの制約 */}
        <ConceptDiagram
          title="概念図C — Server→Clientへのpropsの制約"
          description="ネットワーク越しに送れる型とそうでない型"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* OK */}
            <div className="rounded-lg border p-4" style={{ backgroundColor: "#0f1117", borderColor: "rgba(52,211,153,0.4)" }}>
              <p className="text-xs font-semibold text-green-400 mb-3">OK — シリアライズ可能</p>
              <ul className="space-y-1.5 text-xs text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="text-green-400 font-mono">OK</span>
                  <span>文字列（"hello"）</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400 font-mono">OK</span>
                  <span>数値（42）</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400 font-mono">OK</span>
                  <span>真偽値（true/false）</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400 font-mono">OK</span>
                  <span>配列（[1, 2, 3]）</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400 font-mono">OK</span>
                  <span>プレーンオブジェクト（{`{ id: 1 }`}）</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400 font-mono">OK</span>
                  <span>null / undefined</span>
                </li>
              </ul>
            </div>

            {/* NG */}
            <div className="rounded-lg border p-4" style={{ backgroundColor: "#0f1117", borderColor: "rgba(248,113,113,0.4)" }}>
              <p className="text-xs font-semibold text-red-400 mb-3">NG — シリアライズ不可</p>
              <ul className="space-y-1.5 text-xs text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="text-red-400 font-mono">NG</span>
                  <span>関数（() {"=>"} {}）</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-400 font-mono">NG</span>
                  <span>クラスインスタンス（new Foo()）</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-400 font-mono">NG</span>
                  <span>Dateオブジェクト（new Date()）</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-400 font-mono">NG</span>
                  <span>Map・Set</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-400 font-mono">NG</span>
                  <span>Symbol</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-400 font-mono">NG</span>
                  <span>循環参照があるオブジェクト</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-3 rounded-lg border p-3" style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}>
            <p className="text-xs text-gray-500 mb-2">正しい書き方（文字列・数値はOK）</p>
            <pre className="text-xs text-gray-300 font-mono whitespace-pre overflow-x-auto">
              <code>{`// Server Component（page.tsx）
const data = await fetchData();
return <LikeButton count={data.likes} title={data.title} />;
//                 ^ 数値OK            ^ 文字列OK`}</code>
            </pre>
          </div>
        </ConceptDiagram>

        {/* 概念図D: Client内にServerをchildrenで差し込む */}
        <ConceptDiagram
          title="概念図D — Client内にServerをchildrenで差し込む"
          description="'use client' の境界をできるだけ小さく保つためのパターン"
        >
          <div className="rounded-lg border p-4" style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}>
            <p className="text-xs text-gray-500 mb-3">ClientのchildrenにServerを渡すことができる</p>
            <pre className="text-xs text-gray-300 leading-relaxed font-mono whitespace-pre overflow-x-auto">
              <code>{`// ClientWrapper.tsx（Client Component）
"use client";
import { useState } from "react";

export function ClientWrapper({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(!open)}>開閉</button>
      {open && children}  {/* ← childrenはServerのまま */}
    </div>
  );
}

// page.tsx（Server Component）
export default async function Page() {
  const data = await fetchData(); // サーバーでデータ取得
  return (
    <ClientWrapper>
      <ServerContent data={data} />  {/* Server Componentを差し込む */}
    </ClientWrapper>
  );
}`}</code>
            </pre>
          </div>

          <div
            className="mt-3 rounded-lg border px-4 py-3"
            style={{ borderColor: "rgba(139,92,246,0.3)", backgroundColor: "rgba(139,92,246,0.05)" }}
          >
            <p className="text-xs text-violet-300 leading-relaxed">
              なぜこのパターンが有用か: ClientWrapperの 'use client' 境界は最小限に保ちつつ、Server Componentのデータ取得の恩恵を受けられる。Clientにしなければならない部分を徹底的に絞り込むための構造。
            </p>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── DetailSection ─────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        {/* 7.1 'use server' との違い */}
        <DetailBlock heading="7.1 'use server' との違い（Server Actions）">
          <p>
            'use client' と似た見た目の 'use server' というディレクティブも存在する。これはServer Actionsと呼ばれる機能で、フォームの送信やデータの書き込みをサーバー側で処理するための仕組み。
          </p>
          <div className="rounded-lg border p-4" style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}>
            <pre className="text-xs text-gray-300 leading-relaxed font-mono whitespace-pre overflow-x-auto">
              <code>{`// Server Action（'use server' をつけた関数）
async function createUser(formData: FormData) {
  "use server";  // 関数スコープに書く
  const name = formData.get("name");
  await db.insert({ name });
}

// Client Componentから呼ぶ
<form action={createUser}>
  <input name="name" />
  <button type="submit">追加</button>
</form>`}</code>
            </pre>
          </div>
          <KeyPoint>
            'use client' は「このコンポーネントをブラウザで動かす」の宣言。'use server' は「この関数をサーバーで実行する」の宣言。用途がまったく異なる。
          </KeyPoint>
        </DetailBlock>

        {/* 7.2 Context API と Server Component */}
        <DetailBlock heading="7.2 Context API と Server Component（Context はClient専用）">
          <p>
            ReactのContext APIは 'use client' の世界でのみ使える。Server ComponentにはContextが存在しないため、ServerコンポーネントをContextProviderでラップしても効果がない。
          </p>
          <div className="rounded-lg border p-4" style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}>
            <pre className="text-xs text-gray-300 leading-relaxed font-mono whitespace-pre overflow-x-auto">
              <code>{`// ThemeProvider.tsx — Client Component
"use client";
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext("light");

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

// useTheme は 'use client' のコンポーネントからのみ呼べる
export function useTheme() {
  return useContext(ThemeContext);
}`}</code>
            </pre>
          </div>
          <WarningPoint>
            Server ComponentからuseContextを呼ぶとエラーになる。テーマ・ユーザー認証状態などのグローバルな状態はClient Component内で管理する必要がある。
          </WarningPoint>
        </DetailBlock>

        {/* 7.3 サードパーティライブラリと 'use client' */}
        <DetailBlock heading={"7.3 サードパーティライブラリと 'use client'（ライブラリ側が対応していない場合）"}>
          <p>
            npmで公開されているUIライブラリの一部は、内部でuseStateやuseEffectを使っているにもかかわらず 'use client' をつけていないことがある。そのようなライブラリをServer Componentで使うとエラーになる。
          </p>
          <div className="rounded-lg border p-4" style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}>
            <p className="text-xs text-gray-500 mb-3">対処法: ラッパーコンポーネントを作る</p>
            <pre className="text-xs text-gray-300 leading-relaxed font-mono whitespace-pre overflow-x-auto">
              <code>{`// components/ClientCalendar.tsx — ラッパー
"use client";
export { Calendar } from "some-ui-library"; // re-export

// page.tsx（Server Component）から使う
import { ClientCalendar } from "@/components/ClientCalendar";

export default async function Page() {
  const events = await fetchEvents();
  return <ClientCalendar events={events} />;
}`}</code>
            </pre>
          </div>
          <KeyPoint>
            ライブラリ側が 'use client' 対応していない場合は、ラッパーでre-exportするだけで解決できることが多い。エラーメッセージに "only be used in a Client Component" と出たらこのパターンを試す。
          </KeyPoint>
        </DetailBlock>

        {/* 7.4 パフォーマンス観点 */}
        <DetailBlock heading="7.4 パフォーマンス観点：Clientに含まれるJSを最小化する">
          <p>
            Client ComponentはブラウザにJavaScriptバンドルとして送られる。つまりClient Componentが増えるほどページのJSサイズが増加してロードが遅くなる。
          </p>
          <p>
            最適な設計は「コンポーネントツリーの末端だけをClientにする」こと。ページレイアウト・ヘッダー・データ表示はServer Componentのままにして、ボタン・フォーム・モーダルなどインタラクティブな部品だけClientにする。
          </p>
          <div className="rounded-lg border p-4" style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}>
            <p className="text-xs text-gray-500 mb-3">よい設計 vs 悪い設計</p>
            <pre className="text-xs text-gray-300 leading-relaxed font-mono whitespace-pre overflow-x-auto">
              <code>{`// 悪い例: ページ全体をClientにしてしまっている
"use client";
export default function Page() {
  // このファイル全体とすべての子がClientになる
  // → バンドルサイズが増大する
}

// よい例: インタラクティブな部分だけClientにする
// page.tsx（Server Component）
export default async function Page() {
  const data = await fetchData();  // サーバーで取得
  return (
    <main>
      <StaticContent data={data} />   {/* Server: バンドルに含まれない */}
      <SearchBar />                    {/* Client: 検索入力だけClient */}
    </main>
  );
}`}</code>
            </pre>
          </div>
          <KeyPoint>
            Clientコンポーネントを「ツリーの葉（末端）」に押し込むのがNext.jsのベストプラクティス。ページや大きなレイアウトコンポーネントをClientにするのは避ける。
          </KeyPoint>
        </DetailBlock>
      </DetailSection>

      {/* ── RelatedLinks ─────────────────────────────────────── */}
      <RelatedLinks
        items={[
          {
            href: "/nextjs/data-fetching",
            title: "データフェッチ",
            description: "Server Componentでのデータ取得パターン",
            icon: "Server",
          },
          {
            href: "/nextjs/api-routes",
            title: "API Routes",
            description: "サーバー側でAPIエンドポイントを作る",
            icon: "Cloud",
          },
          {
            href: "/react/useeffect",
            title: "useEffect（React）",
            description: "Client ComponentでのuseEffectの使い方を復習",
            icon: "Code2",
          },
        ]}
      />

      {/* ── PageDrill ─────────────────────────────────────────── */}
      <PageDrill questions={serverComponentQuestions} />
    </div>
  );
}
