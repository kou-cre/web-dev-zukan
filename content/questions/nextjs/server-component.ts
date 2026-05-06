import type { DrillQuestion } from "@/components/PageDrill";

export const serverComponentQuestions: DrillQuestion[] = [
  {
    id: "nextjs-sc-q1",
    question:
      "'use client' を書いていないNext.jsのコンポーネントは、Server ComponentとClient Componentどちらか？",
    choices: [
      "Client Component（ブラウザで動く）",
      "Server Component（サーバーで動く）",
      "どちらでもなく、自動で判別される",
      "デフォルトは存在せず、必ずどちらかを明示しなければならない",
    ],
    correctIndex: 1,
    explanation:
      "Next.jsのApp Routerではデフォルトがサーバー側。'use client' を書いていないコンポーネントはすべてServer Componentとして動く。これはNext.jsの設計思想で「デフォルトはサーバー、ブラウザが必要な場面だけClientに切り替える」という方針に基づいている。慣れるまでは「Server Componentがベース、必要になったら 'use client'」と覚えよう。",
  },
  {
    id: "nextjs-sc-q2",
    question:
      "useStateはServer ComponentとClient Componentのどちらでのみ使えるか？",
    choices: [
      "Server Componentでのみ使える",
      "どちらでも使える",
      "Client Componentでのみ使える",
      "どちらでも使えるが、Server Componentでは動作が変わる",
    ],
    correctIndex: 2,
    explanation:
      "useStateはClient Componentでのみ使える。理由はuseStateが「ブラウザで状態を保持して画面を更新する」仕組みであり、サーバーには「状態を保持する場所」がないから。Server ComponentでuseStateを使おうとするとビルドエラーになる。状態管理が必要な部分だけ 'use client' をつけてClient Componentにするのが正しい対処法。",
  },
  {
    id: "nextjs-sc-q3",
    question:
      "Server Componentでasyncとawaitをトップレベル（コンポーネント関数内）で使うことはできるか？",
    choices: [
      "できない。useEffectの中で使う必要がある",
      "できる。コンポーネント関数をasyncにしてawaitを書ける",
      "awaitは使えるが、asyncはつけられない",
      "asyncもawaitも使えない",
    ],
    correctIndex: 1,
    explanation:
      "Server Componentではコンポーネントをasyncにしてトップレベルでawaitが使える。これはServer Componentの最大の利点のひとつ。export default async function Page() { const data = await fetch(...) } のように書ける。Client ComponentではHooksのルール上、トップレベルのasyncは使えない（useEffect内で行う必要がある）。",
  },
  {
    id: "nextjs-sc-q4",
    question:
      "Client Componentのコンポーネント関数をasyncにしてトップレベルでawaitを使うことはできるか？",
    choices: [
      "できる。'use client' をつけてもasync/awaitはそのまま使える",
      "できない。Client Componentのコンポーネント関数はasyncにできない",
      "できるが、パフォーマンスが下がる",
      "TypeScriptを使っている場合のみできる",
    ],
    correctIndex: 1,
    explanation:
      "Client Componentのコンポーネント関数をasyncにすることはReactの制約上できない。'use client' をつけたコンポーネントでデータを取得したい場合は、useEffect内にfetchを書くパターン（またはSWR・React Queryなどのライブラリを使う）を使う必要がある。asyncが使えるのはServer Componentの特権。",
  },
  {
    id: "nextjs-sc-q5",
    question:
      "Server ComponentからClient Componentへのpropsとして渡せるもの・渡せないものの組み合わせとして正しいのはどれ？",
    choices: [
      "文字列・数値・配列はOK。関数もOK",
      "文字列・数値・配列はOK。関数はNG",
      "すべての型を渡せる。制約はない",
      "文字列のみOK。数値・配列・関数はすべてNG",
    ],
    correctIndex: 1,
    explanation:
      "Server→Clientへのpropsはネットワークを経由して送られるため、シリアライズ（JSONに変換）できる値のみ渡せる。文字列・数値・真偽値・配列・プレーンオブジェクトはOK。一方、関数・クラスインスタンス・Dateオブジェクト・MapやSetなどはシリアライズできないのでNG。関数を渡そうとするとビルドエラーになる。onClick等のイベントハンドラをServerからClientに渡したい場合はアーキテクチャの見直しが必要。",
  },
];
