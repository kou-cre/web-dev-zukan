import Link from "next/link";
import {
  Globe,
  Code2,
  Layers,
  CheckSquare,
  ArrowRight,
  Server,
  Rocket,
} from "lucide-react";

import { Hero } from "@/components/Hero";
import { Prerequisites } from "@/components/Prerequisites";
import { OnePageSummary } from "@/components/OnePageSummary";
import {
  ConceptDiagram,
  StackLayer,
} from "@/components/ConceptDiagram";
import { Bridge } from "@/components/Bridge";
import { MajiDialogue } from "@/components/MajiDialogue";
import { SectionDivider } from "@/components/SectionDivider";
import {
  DetailSection,
  DetailBlock,
  KeyPoint,
  WarningPoint,
} from "@/components/DetailSection";
import { RelatedLinks } from "@/components/RelatedLinks";

export const metadata = {
  title: "ReactをはじめるためのJSチェックリスト | Web開発図解",
  description:
    "Reactを学ぶ前に必要なJavaScriptの基礎10項目を確認するページ。const/let・関数・map・分割代入・ESモジュールなど、Reactで必ず使うJS知識を図解で整理。",
};

// ── チェックリスト10項目 ──────────────────────────────────────────────

type CheckItem = {
  num: string;
  title: string;
  example: string;
  note: string;
  href?: string;
};

const checkItems: CheckItem[] = [
  {
    num: "01",
    title: "const / let の使い分け",
    example: "const name = 'マジ'  // 再代入不要な値はconst",
    note: "再代入が不要な値はconst、後で変える値はlet。varは基本使わない。",
    href: "/javascript/variables",
  },
  {
    num: "02",
    title: "関数（function宣言・アロー関数）",
    example: "const greet = (name) => `こんにちは ${name}`",
    note: "Reactコンポーネントもアロー関数で書くことが多い。",
  },
  {
    num: "03",
    title: "オブジェクトと配列の基本",
    example: "const user = { name: 'マジ', age: 20 }",
    note: "プロパティの読み書き、配列への要素追加の基本を押さえる。",
  },
  {
    num: "04",
    title: "配列のmap",
    example: "items.map(item => <li>{item}</li>)",
    note: "Reactでリストを画面に表示するときに必ず使う最重要パターン。",
  },
  {
    num: "05",
    title: "分割代入",
    example: "const { name } = user  /  const [a, b] = arr",
    note: "propsの受け取りや配列の値取り出しで毎回使う。",
  },
  {
    num: "06",
    title: "スプレッド構文",
    example: "const next = { ...prev, count: prev.count + 1 }",
    note: "Reactのstateを更新するときにオブジェクトをコピーしながら変更する定番パターン。",
  },
  {
    num: "07",
    title: "三項演算子",
    example: "isLoggedIn ? <UserMenu /> : <LoginButton />",
    note: "JSX内で条件によって表示を切り替えるときに使う。",
  },
  {
    num: "08",
    title: "ESモジュール（import / export）",
    example: "import { useState } from 'react'",
    note: "Reactのコンポーネントや関数を読み込むのにimportを毎回書く。",
    href: "/javascript/modules",
  },
  {
    num: "09",
    title: "DOM操作の基本（参考として）",
    example: "document.querySelector('#app')",
    note: "ReactはDOMを直接操作しないが、仕組みを知っておくとReactのVirtualDOMが分かりやすくなる。",
    href: "/javascript/dom",
  },
  {
    num: "10",
    title: "async / await の最小理解",
    example: "const data = await fetch('/api/data').then(r => r.json())",
    note: "useEffectでAPIからデータを取得するときに使う。Promiseの概念も合わせて把握しておく。",
    href: "/javascript/async",
  },
];

export default function ReactIntroPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* ── 戻るリンク ───────────────────────────────────────── */}
      <div className="mb-6">
        <Link
          href="/react"
          className="text-xs text-gray-500 hover:text-white transition-colors"
        >
          ← React に戻る
        </Link>
      </div>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <Hero
        category="React"
        title="ReactをはじめるためのJSチェックリスト"
        subtitle={"Reactに入る前にJSの基礎を確認しよう。この10項目が分かれば準備完了。"}
        body={"このページはReact学習の出発点。チェックできない項目があればリンク先のJSページで確認しよう。"}
        accentColor="blue"
      />

      {/* ── Prerequisites ────────────────────────────────────── */}
      <Prerequisites
        learn={[
          "ReactをはじめるためのJS基礎10項目",
          "各項目をどのJSページで確認できるか",
          "JS知識が不足していてもReactを始められる理由",
        ]}
        prerequisites={[
          "HTMLとCSSの基本を知っている（タグと class 属性が分かる）",
        ]}
        outOfScope={[
          "Reactのコードの書き方（次ページ「コンポーネント」で学ぶ）",
          "TypeScript（Reactを使う上で必須ではない）",
          "Node.js・npm・プロジェクト作成手順（環境構築はこのサイトの範囲外）",
        ]}
      />

      {/* ── OnePageSummary ───────────────────────────────────── */}
      <OnePageSummary
        keyMessage={"ReactはJavaScriptのライブラリ。Reactを書くとはJSを書くこと。まずJSの基礎を10項目確認してから進もう。チェックリストに1つも空白がなければ、今すぐReactを始められる。"}
        metaphorTitle="新しい料理を覚える前の包丁の使い方"
        metaphorPoints={[
          {
            label: "JavaScript",
            real: "包丁・まな板など料理の基本道具",
            metaphor: "JavaScript",
          },
          {
            label: "React",
            real: "特定の料理スタイル（フレンチ・中華）",
            metaphor: "React",
          },
          {
            label: "チェックリスト",
            real: "「まず基本道具を使いこなせているか」の確認",
            metaphor: "チェックリスト",
          },
          {
            label: "Reactを始める",
            real: "道具の使い方が分かったら料理スタイルを学べる",
            metaphor: "Reactを始める",
          },
        ]}
        definition={"Reactを使うにはJSが必要。ただし全部知らなくていい。この10項目を確認してから始めれば挫折しにくい。"}
      />

      {/* ── Bridge: OnePageSummary → ConceptDiagram A ────────── */}
      <Bridge
        from="ReactとJSの関係が分かった"
        to="具体的にどのJS知識が必要か、リストで確認していく"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ──────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        {/* 概念図A: JSとReactの位置づけ */}
        <ConceptDiagram
          title="概念図A — JSとReactの位置づけ"
          description="ReactはJSの上に載るライブラリ。ReactがどこにいるかをStackLayerで示す"
        >
          <StackLayer
            Icon={Globe}
            title="ブラウザ"
            subtitle="全ての基盤。HTMLを解析し、JSを実行し、CSSで見た目を整える環境"
            iconColor="text-gray-400"
          />
          <StackLayer
            Icon={Code2}
            title="JavaScript"
            subtitle="プログラミング言語。ブラウザが実行できる唯一の言語。ボタンのクリック処理からAPIの通信まで全てJSで書く"
            iconColor="text-yellow-400"
          />
          <StackLayer
            Icon={Layers}
            title="React"
            subtitle="JSの上に載るUI構築ライブラリ。JSを使って画面を作るための道具セット。ReactのコードはJSとして動いている"
            iconColor="text-blue-400"
            showArrow={false}
          />
          <p className="text-xs text-gray-500 text-center mt-4 leading-relaxed">
            ReactはJSを置き換えるものではなく、JSをもっと使いやすくするためのライブラリ
          </p>
        </ConceptDiagram>

        {/* Bridge: A → B */}
        <Bridge
          from="ReactがJSの上に載っていることが分かった"
          to="では具体的に何のJS知識が必要か、10項目を確認しよう"
        />

        {/* 概念図B: React前の10項目チェック */}
        <ConceptDiagram
          title="概念図B — React前の10項目チェック"
          description="これが分かればReactを始められる。分からなければリンクページで確認しよう"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {checkItems.map((item) => (
              <div
                key={item.num}
                className="rounded-xl border p-4 transition-colors hover:border-blue-500/40"
                style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-base font-bold text-blue-400 flex-shrink-0 font-mono leading-none mt-0.5">
                    {item.num}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white mb-1.5 leading-snug">
                      {item.title}
                    </p>
                    <code className="font-mono text-xs text-blue-200 leading-relaxed block mb-2 whitespace-pre-wrap break-all">
                      {item.example}
                    </code>
                    <p className="text-xs text-gray-400 leading-relaxed mb-1.5">
                      {item.note}
                    </p>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="text-xs text-blue-500 hover:text-blue-300 transition-colors"
                      >
                        → このページで確認する
                      </Link>
                    ) : (
                      <span className="text-xs text-gray-500">
                        参照先：JSの基礎知識
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 text-center mt-4 leading-relaxed">
            全10項目が「なんとなく分かる」レベルになれば、Reactを始める準備は整っている
          </p>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue ─────────────────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "worried",
            text: "マスター……10項目全部わかりません。Reactを始めていいんですか？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "大丈夫ですよ、マジさん。\n全部完璧に理解している必要はありません。\n「こんな形のコードを見たことがある」レベルで十分。\nReactを実際に書きながら覚える方が、先に全部覚えようとするより身につきます。",
          },
          {
            speaker: "maji",
            emotion: "question",
            text: "じゃあ、何も知らなくてもReactを始めていいんですか？ マジ？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "最低限、1〜3番（const/let・関数・オブジェクト配列）は押さえてください。\nこの3つがないとReactの最初の行すら読めません。\n残りは「あ、これか」という感じでReactと一緒に覚えていきましょう。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "つまり「完璧に覚えてから」ではなく「読んで分かる程度にしてから」でいいんですね。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "まさにそうです、マジさん。\n特に4番のmapはReactで絶対使います。\n配列をJSXに変換するときに使う基本パターンなので、ここだけは理解してから進んでください。\nあとは進みながら覚えられます。",
          },
        ]}
      />

      {/* ── SectionDivider ───────────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下は各JSトピックの詳細解説です。Reactを始める前に不安な項目があれば確認してください。"
      />

      {/* ── 応用編 DetailSection ─────────────────────────────── */}
      <DetailSection title="詳細解説">
        {/* 7.1 最低限必要な3項目 */}
        <DetailBlock heading="7.1 最低限必要な3項目（const/let・関数・オブジェクトと配列）">
          <p>
            Reactを始める前に必ず押さえる3つ。これがないとコンポーネントの最初の行が読めない。
          </p>
          <div className="rounded-lg border p-4" style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}>
            <p className="text-xs text-gray-500 mb-3">最低限これだけ読めればOK</p>
            <pre className="text-xs text-gray-300 leading-relaxed font-mono whitespace-pre">
              <code>{`// const / let
const title = "Hello React";
let count = 0;

// アロー関数
const double = (n) => n * 2;

// オブジェクト・配列
const user = { name: "マジ", age: 20 };
const items = ["apple", "banana", "grape"];`}</code>
            </pre>
          </div>
          <KeyPoint>
            const は「変わらない値」、let は「後で変える値」。Reactのコンポーネントの引数（props）や変数はほぼconstで書く。
          </KeyPoint>
        </DetailBlock>

        {/* 7.2 Reactで頻出のパターン */}
        <DetailBlock heading="7.2 Reactで頻出のパターン（分割代入・スプレッド構文）">
          <p>
            分割代入はpropsを受け取るときに、スプレッド構文はstateを更新するときに毎回登場する。
          </p>
          <div className="rounded-lg border p-4" style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}>
            <p className="text-xs text-gray-500 mb-3">Reactで実際に使われる場面</p>
            <pre className="text-xs text-gray-300 leading-relaxed font-mono whitespace-pre">
              <code>{`// 分割代入: propsを受け取るときの定番
function UserCard({ name, age }) {  // ← 分割代入
  return <p>{name}（{age}歳）</p>;
}

// スプレッド構文: stateを更新するとき
const [user, setUser] = useState({ name: "マジ", age: 20 });
setUser({ ...user, age: 21 });  // ← 既存の値を保ちながら一部だけ変更`}</code>
            </pre>
          </div>
          <KeyPoint>
            スプレッド構文でオブジェクトをコピーするのはReactのstateを「直接書き換えない」ためのルールに従った定番パターン。Reactを書き始めると必ずこの形を見かける。
          </KeyPoint>
        </DetailBlock>

        {/* 7.3 JSXを読むための知識 */}
        <DetailBlock heading="7.3 JSXを読むための知識（三項演算子・テンプレートリテラル）">
          <p>
            JSXの中では通常の{" "}
            <code
              className="text-xs px-1.5 py-0.5 rounded font-mono"
              style={{ backgroundColor: "#0f1117", color: "#93c5fd" }}
            >
              if / else
            </code>{" "}
            が書けない。代わりに三項演算子と論理AND（&&）で条件分岐を表現する。
          </p>
          <div className="rounded-lg border p-4" style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}>
            <p className="text-xs text-gray-500 mb-3">JSX内での条件分岐パターン</p>
            <pre className="text-xs text-gray-300 leading-relaxed font-mono whitespace-pre">
              <code>{`// 三項演算子: 2択のどちらかを表示
{isLoggedIn ? <UserMenu /> : <LoginButton />}

// 論理AND: 条件を満たすときだけ表示
{isAdmin && <AdminPanel />}

// テンプレートリテラル: 文字列に変数を埋め込む
const label = \`こんにちは \${name} さん\`;`}</code>
            </pre>
          </div>
          <WarningPoint>
            JSXの中に if 文をそのまま書こうとするのは初心者がよくやるミス。JSXは「式」しか書けないため、if文（文）は書けない。三項演算子か && を使う。
          </WarningPoint>
        </DetailBlock>

        {/* 7.4 ESモジュール */}
        <DetailBlock heading="7.4 ファイル分割（ESモジュール）">
          <p>
            Reactでは1コンポーネント1ファイルが基本。ファイルをまたいでコンポーネントや関数を使うために import / export を毎回書く。
          </p>
          <div className="rounded-lg border p-4" style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}>
            <p className="text-xs text-gray-500 mb-3">Reactのコンポーネントファイルの典型パターン</p>
            <pre className="text-xs text-gray-300 leading-relaxed font-mono whitespace-pre">
              <code>{`// Button.tsx — コンポーネントをdefault exportで公開
export default function Button({ label }) {
  return <button>{label}</button>;
}

// App.tsx — 別ファイルのコンポーネントをimportして使う
import Button from "./Button";

export default function App() {
  return <Button label="送信" />;
}

// Reactのhookはnamed importで取り寄せる
import { useState, useEffect } from "react";`}</code>
            </pre>
          </div>
          <KeyPoint>
            Reactコンポーネント自体はdefault export、useStateなどのフックはnamed importで取り寄せる。この2パターンを押さえておけばimport/exportで迷うことはほぼない。
          </KeyPoint>
        </DetailBlock>

        {/* 7.5 非同期処理 */}
        <DetailBlock heading="7.5 非同期処理（async/await — useEffectでfetchする前に）">
          <p>
            ReactのuseEffectの中でAPIからデータを取得するには async/await が必要。Promiseの概念と合わせて最小限だけ押さえておく。
          </p>
          <div className="rounded-lg border p-4" style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}>
            <p className="text-xs text-gray-500 mb-3">useEffectでのデータ取得パターン（最頻出）</p>
            <pre className="text-xs text-gray-300 leading-relaxed font-mono whitespace-pre">
              <code>{`import { useState, useEffect } from "react";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // async関数を定義してすぐ呼び出す（useEffect自体はasync不可）
    const fetchUsers = async () => {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}`}</code>
            </pre>
          </div>
          <WarningPoint>
            useEffect のコールバック関数自体を async にするのは一般的に非推奨。内部にasync関数を定義してそれを呼ぶ形が定番パターン。
          </WarningPoint>
        </DetailBlock>
      </DetailSection>

      {/* ── RelatedLinks ─────────────────────────────────────── */}
      <RelatedLinks
        items={[
          {
            href: "/react/components",
            title: "コンポーネント",
            description: "Reactの基本単位。チェックリストが終わったら次はここへ",
            icon: "Code2",
          },
          {
            href: "/javascript/variables",
            title: "変数とスコープ（JS）",
            description: "const/let/varの使い分けを確認する",
            icon: "Server",
          },
          {
            href: "/javascript/modules",
            title: "ESモジュール（JS）",
            description: "import/exportの基本パターンを確認する",
            icon: "Rocket",
          },
        ]}
      />
    </div>
  );
}
