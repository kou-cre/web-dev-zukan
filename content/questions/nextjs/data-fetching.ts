import type { DrillQuestion } from "@/components/PageDrill";

export const dataFetchingQuestions: DrillQuestion[] = [
  {
    id: "nextjs-df-q1",
    question:
      "Next.jsのServer Componentでasyncとawaitをどこでどう使うか。最も正しい説明はどれ？",
    choices: [
      "useEffect内にawaitを書く。asyncはuseEffect自体につける",
      "コンポーネント関数をasyncにして、関数本体の中でawaitを使う",
      "asyncをつける必要はなく、awaitだけ書けば動く",
      "fetchの第2引数にasync関数を渡す",
    ],
    correctIndex: 1,
    explanation:
      "Server Componentはコンポーネント関数そのものをasyncにする。export default async function Page() {} のように関数定義にasyncをつけることで、関数本体内でawaitが使えるようになる。useEffectは不要。これがServer Componentのデータ取得の基本パターン。",
  },
  {
    id: "nextjs-df-q2",
    question:
      "Next.jsで 'use client' が必要になるのはどんな場合か。最も正しいのはどれ？",
    choices: [
      "fetchを使うすべての場合に必要",
      "サーバーのデータを表示したい場合に必要",
      "useStateやuseEffectなどのReact Hooks、またはonClickなどのイベントハンドラを使う場合",
      "コンポーネントをexportする場合に必要",
    ],
    correctIndex: 2,
    explanation:
      "'use client' が必要なのは「ブラウザ固有の機能」を使う場合。具体的には useState・useEffect などのHooks、onClick などのイベントハンドラ、window や document などのブラウザAPIを使うとき。データをサーバーで取得して表示するだけならServer Componentで十分で 'use client' は不要。",
  },
  {
    id: "nextjs-df-q3",
    question:
      "fetchに { cache: 'no-store' } を渡したとき、どういう動作になるか？",
    choices: [
      "キャッシュを使って高速にデータを返す",
      "ビルド時に一度だけデータを取得して固定する",
      "リクエストのたびに毎回最新データをAPIから取得する",
      "60秒ごとにデータを再取得する",
    ],
    correctIndex: 2,
    explanation:
      "cache: 'no-store' はキャッシュを一切使わないオプション。ページが表示されるたびに毎回APIにリクエストを送り、常に最新のデータを取得する。ニュースや在庫情報など「常に最新」が必要なコンテンツに適している。反対に cache: 'force-cache'（デフォルト）はキャッシュを積極的に使って高速化する。",
  },
  {
    id: "nextjs-df-q4",
    question:
      "useEffect+fetchパターンとServer ComponentでのfetchパターンでJSの実行場所はどう違うか？",
    choices: [
      "どちらもブラウザで実行される",
      "どちらもサーバーで実行される",
      "useEffect+fetchはブラウザで実行、Server Componentのfetchはサーバーで実行される",
      "useEffect+fetchはサーバーで実行、Server Componentのfetchはブラウザで実行される",
    ],
    correctIndex: 2,
    explanation:
      "useEffect+fetchはCSR（クライアントサイドレンダリング）。コードはブラウザに送られ、ブラウザ上で実行される。そのためブラウザに届いた時点でデータは空で、fetchが完了してから画面が更新される。一方Server ComponentのfetchはSSR。コードはサーバーで実行され、データ取得が完了してから完成したHTMLがブラウザに送られる。",
  },
  {
    id: "nextjs-df-q5",
    question:
      "fetchオプションの next: { revalidate: 60 } は何を意味するか？",
    choices: [
      "60ミリ秒後に自動でページがリロードされる",
      "キャッシュを一切使わずに毎回取得する",
      "60秒間はキャッシュを使い、60秒後に次のリクエスト時にデータを再取得する",
      "60回リクエストしたらキャッシュを破棄する",
    ],
    correctIndex: 2,
    explanation:
      "next: { revalidate: 60 } はISR（Incremental Static Regeneration）の設定。60秒間はキャッシュされたデータを返し続け、60秒経過後に次のリクエストが来たタイミングでバックグラウンドでデータを再取得してキャッシュを更新する。「完全に静的（force-cache）」と「常に最新（no-store）」の中間に位置するパターン。ブログ記事や商品ページなど「多少古くても問題なく、高速に返したい」コンテンツに適している。",
  },
];

export const dataFetchingAdvancedQuestions: DrillQuestion[] = [
  {
    id: "data-fetching-adv-q1",
    level: "advanced",
    question: "Next.jsでfetchのキャッシュを「無効化して常に最新データを取得する」設定はどれ？",
    choices: [
      "fetch(url, { cache: 'force-cache' })",
      "fetch(url, { cache: 'no-store' })",
      "fetch(url, { cache: 'reload' })",
      "fetch(url, { next: { revalidate: 0 } })",
    ],
    correctIndex: 1,
    explanation: "`cache: 'no-store'` を使うとリクエストごとに最新データを取得（キャッシュなし）。 `cache: 'force-cache'` はキャッシュを積極利用（SSGに相当）。 `next: { revalidate: 60 }` は60秒ごとに再検証（ISRに相当）。ダッシュボードなど常に最新が必要な場面では `no-store` を使う。",
  },
  {
    id: "data-fetching-adv-q2",
    level: "advanced",
    question: "ISR（Incremental Static Regeneration）の説明として正しいのはどれ？",
    choices: [
      "ページを1ページずつ順番に静的生成する",
      "ビルド時に静的生成した後、設定した秒数が経過したら次のリクエスト時にバックグラウンドで再生成する",
      "ユーザーのリクエストに応じてその都度サーバーでHTMLを生成する（SSRと同じ）",
      "JavaScriptを段階的にハイドレーションする技術",
    ],
    correctIndex: 1,
    explanation: "ISRは「静的の速さ + 動的の鮮度」を両立する戦略。`next: { revalidate: 60 }` で60秒後に再生成を予約。60秒以内のリクエストはキャッシュを返す（速い）、60秒経過後の最初のリクエストは古いキャッシュを返しつつバックグラウンドで再生成する（stale-while-revalidate）。",
  },
  {
    id: "data-fetching-adv-q3",
    level: "advanced",
    question: "複数のAPIを並列でfetchするときの正しい書き方はどれ？",
    choices: [
      "await fetch(url1); await fetch(url2);（順番に実行）",
      "const [data1, data2] = await Promise.all([fetch(url1), fetch(url2)]);（並列実行）",
      "fetch(url1).then(() => fetch(url2))（連鎖）",
      "useEffect内でfetchを2回呼ぶ",
    ],
    correctIndex: 1,
    explanation: "awaitを連続すると url1のfetchが完了してからurl2を開始する（ウォーターフォール）。Promise.allで並列化すると両方を同時に開始し、両方完了した時点で次に進む。依存関係がない複数のfetchはPromise.allで並列化するのがパフォーマンスの基本。",
  },
  {
    id: "data-fetching-adv-q4",
    level: "advanced",
    question: "Next.jsの `generateStaticParams` の役割はどれ？",
    choices: [
      "URLパラメータのバリデーションを行う",
      "動的ルート（[slug]など）のビルド時静的生成で、生成するパスのリストを返す",
      "Server Componentのpropsの型を自動生成する",
      "環境変数からAPIのベースURLを自動取得する",
    ],
    correctIndex: 1,
    explanation: "動的ルート（例: `app/blog/[slug]/page.tsx`）をSSGする場合、事前に「どのslugをビルドするか」を教える必要がある。`generateStaticParams` で `[{ slug: 'post-1' }, { slug: 'post-2' }]` を返すと、それらのパスが静的生成される。Pages RouterのgetStaticPathsに相当する機能。",
  },
];
