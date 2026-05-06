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

export const serverComponentAdvancedQuestions: DrillQuestion[] = [
  {
    id: "server-component-adv-q1",
    level: "advanced",
    question: "Server Componentで `console.log` を実行すると、ログはどこに出力される？",
    choices: [
      "ブラウザの開発者ツール（Console タブ）",
      "サーバー側のターミナル（Node.jsのプロセス）",
      "Next.jsのエラーページ",
      "Vercelのビルドログ（ビルド時のみ）",
    ],
    correctIndex: 1,
    explanation: "Server Componentはサーバー（Node.js）で実行されるため、console.logはサーバーのターミナルに出る。ブラウザのDevToolsには一切表示されない。デバッグ時に「ログが出ない」と混乱する人が多いが、ターミナルを確認すれば必ず出ている。",
  },
  {
    id: "server-component-adv-q2",
    level: "advanced",
    question: "Server ComponentにuseStateが使えない理由として最も正確なのはどれ？",
    choices: [
      "TypeScriptと相性が悪いから",
      "useStateはReact Hooksの一種で、Hooksはクライアントサイドのライフサイクルに依存するが、Server Componentはブラウザ上で再レンダリングされないから",
      "Server ComponentはJavaScriptを実行できないから",
      "useStateはNext.js 13以前の機能で廃止されたから",
    ],
    correctIndex: 1,
    explanation: "HooksはReactの状態管理やライフサイクルをブラウザ上で管理する仕組み。Server Componentはサーバーで一度レンダリングしてHTMLを返すだけで、クライアントで再レンダリングしない。そのためインタラクティブな状態管理が不要で、Hooksも不要（使えない）。",
  },
  {
    id: "server-component-adv-q3",
    level: "advanced",
    question: "Server ComponentとClient Componentを組み合わせるとき、正しいパターンはどれ？",
    choices: [
      "Client Componentの中にServer Componentを直接import・使用する（import Server from './Server'）",
      "Server Componentの中でClient Componentをimportして使う。Client Componentはchildren propなどを通じてServer Componentに渡すことも可能",
      "Server ComponentとClient Componentは同一ページでは共存できない",
      "どちらも同じなので、全ページを 'use client' にするのが最も簡単で推奨",
    ],
    correctIndex: 1,
    explanation: "Client Componentの中にServer Componentをimportすると、そのServer ComponentもClient化されてしまう（制約）。逆はOK: Server Componentの中でClient Componentをimportして使える。ChildrenとしてServer Componentを渡す技法（Composition Pattern）でクライアントツリーの中にサーバーコンテンツを置くことも可能。",
  },
  {
    id: "server-component-adv-q4",
    level: "advanced",
    question: "App RouterのStreaming（ストリーミング）と `<Suspense>` の組み合わせで何が実現できる？",
    choices: [
      "動画ファイルをストリーミング再生できる",
      "データ取得が遅いコンポーネントをフォールバック（スケルトン）で仮表示しつつ、準備ができた部分から順次HTMLを送信できる",
      "WebSocketで双方向通信ができる",
      "Server Componentを完全にCSRに変換する",
    ],
    correctIndex: 1,
    explanation: "Streaming + Suspenseで「部分的な逐次表示」が実現できる。例: ヘッダーとリンク集はすぐ表示し、APIからのデータ（商品一覧等）は取得中にスケルトンを表示し、準備できたら差し替える。ページ全体が固まるまで白画面を見せる従来のSSRより体感が速い。",
  },
];
