import type { DrillQuestion } from "@/components/PageDrill";

export const fetchQuestions: DrillQuestion[] = [
  {
    id: "fetch-q1",
    question: "fetch関数の戻り値として正しいのはどれ？",
    choices: [
      "サーバーから受け取ったJSONデータそのもの",
      "Promise（Responseオブジェクトに解決される）",
      "文字列（HTMLのソースコード）",
      "コールバック関数",
    ],
    correctIndex: 1,
    explanation:
      "fetch(url) は即座に Promise を返し、通信が完了すると Response オブジェクトに解決される。JSONデータが直接返ってくるわけではない点に注意。中身を取り出すには response.json() をもう一度awaitする必要がある（こちらもPromise）。宅急便でいうと「集荷依頼の受付番号」が返ってきている段階で、荷物（データ）はまだ届いていない。",
  },
  {
    id: "fetch-q2",
    question:
      "fetchで404 Not Foundが返ってきた時、デフォルトの挙動として正しいのはどれ？",
    choices: [
      "fetchがrejectされ、catchブロックに飛ぶ",
      "fetchはresolveされ、response.okがfalseになる",
      "自動でリトライが行われる",
      "ブラウザのコンソールにエラーが出て処理が止まる",
    ],
    correctIndex: 1,
    explanation:
      "fetchの落とし穴。HTTPエラー（404・500など）はネットワーク的には「正常に通信できた」ので fetch自体はresolveされる。エラーかどうかは response.ok（200番台ならtrue）や response.status を自分で確認して、必要なら手動で throw する必要がある。axios はここを自動でthrowしてくれるので「fetchより楽」と感じる人が多い。",
  },
  {
    id: "fetch-q3",
    question:
      "POSTリクエストでJSONデータをサーバーに送信する時に必須の設定はどれ？",
    choices: [
      "method: 'POST' のみ指定すれば足りる",
      "method: 'POST'、body: オブジェクトをそのまま渡す",
      "method: 'POST'、headers: { 'Content-Type': 'application/json' }、body: JSON.stringify(data)",
      "method: 'GET' に変更して URL末尾にデータを付ける",
    ],
    correctIndex: 2,
    explanation:
      "POSTでJSONを送る時の定型句。bodyはJSON.stringify()で文字列化する必要があり、Content-Typeヘッダーで「中身がJSONですよ」とサーバーに伝える。これを忘れるとサーバー側でうまくパースできない。GETはURLパラメータでデータを送るので body は使わない（仕様上付けても無視されることが多い）。",
  },
  {
    id: "fetch-q4",
    question:
      "ブラウザでfetchを使って別ドメインのAPIを叩いた時に「CORSエラー」が出た。原因として最も近いのはどれ？",
    choices: [
      "fetch関数の書き方を間違えた",
      "ブラウザがセキュリティのため、サーバー側の許可なしに別オリジンのレスポンスをJSに渡さない仕組みが働いた",
      "サーバーが完全にダウンしている",
      "JavaScriptのバージョンが古い",
    ],
    correctIndex: 1,
    explanation:
      "CORS（Cross-Origin Resource Sharing）はブラウザのセキュリティ機構。別オリジン（別ドメイン・別ポート・別プロトコル）のAPIを叩く時、サーバーが Access-Control-Allow-Origin ヘッダーで「このオリジンからのアクセスはOK」と明示しない限り、ブラウザがレスポンスをJSコードに渡さない。サーバー側の設定で解消する問題で、フロント側のコードをいじっても直らないことが多い。",
  },
  {
    id: "fetch-q5",
    question:
      "fetch / axios / SWR（React Query）の使い分けとして最も適切なのはどれ？",
    choices: [
      "全部同じものなのでどれでも良い",
      "fetchは基礎学習・シンプルな通信、axiosは実務での標準、SWR/React QueryはReactアプリのデータ取得（キャッシュ・再検証込み）",
      "fetchは古い技術なのでもう使われない",
      "SWRはサーバーサイド専用で、ブラウザでは使えない",
    ],
    correctIndex: 1,
    explanation:
      "それぞれの守備範囲が違う。fetchはブラウザ標準で追加インストール不要・素朴。axiosは実務でよく使われ、HTTPエラーを自動でthrowしてくれる・インターセプターが書きやすい。SWR/React QueryはReact向けで、自動キャッシュ・再検証・ローディング状態管理までセットで提供する。BaaS（Firebase/Supabase）のSDKも内部ではfetchを使っており、層が上がっていくだけで仕組みは同じ。",
  },
];
