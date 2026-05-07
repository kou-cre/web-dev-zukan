import type { DrillQuestion } from "@/components/PageDrill";

export const corsQuestions: DrillQuestion[] = [
  {
    id: "cors-q1",
    question:
      "「オリジン（origin）」とは何か、正しい説明を選べ。",
    choices: [
      "URLのパス部分（/ より後ろの部分）のこと",
      "プロトコル + ドメイン + ポート番号 の3つの組み合わせ",
      "HTTPリクエストのヘッダー情報のこと",
      "Webサーバーが設置されている物理的な場所のこと",
    ],
    correctIndex: 1,
    explanation:
      "オリジンとはプロトコル（https://）・ドメイン（example.com）・ポート番号（:443）の3つの組み合わせです。これらが1つでも異なると「別オリジン」になります。例えば https://myapp.com（ポート443）と https://myapp.com:8080 はポートが違うため別オリジンです。URLのパス（/api/data）はオリジンには含まれません。",
  },
  {
    id: "cors-q2",
    question:
      "CORSエラーが発生したとき、最初に確認・対応すべき場所はどこ？",
    choices: [
      "ブラウザの設定を変更してCORSチェックを無効化する",
      "フロントエンドのfetchコードを書き換える",
      "サーバー側のレスポンスにAccess-Control-Allow-Originヘッダーを追加する",
      "HTTPS通信に切り替える",
    ],
    correctIndex: 2,
    explanation:
      "CORSエラーはサーバーからのレスポンスに許可ヘッダーがないためブラウザがブロックしている状態です。解決はサーバー側でAccess-Control-Allow-Originヘッダーを追加することです。ブラウザのCORSチェックを無効化するのは開発環境限定の回避策であり本番では使えません。フロントエンドのコードを変えてもCORSエラーは解決しません。",
  },
  {
    id: "cors-q3",
    question:
      "preflightリクエストとは何か、正しい説明を選べ。",
    choices: [
      "クライアントがサーバーの死活確認のために送るリクエスト",
      "POSTなど特定のリクエストの前にブラウザが自動で送る事前確認のOPTIONSリクエスト",
      "ユーザーがフォームを送信する前にバリデーションするJSの処理",
      "サーバーがクライアントに先行して送るプッシュ通知",
    ],
    correctIndex: 1,
    explanation:
      "preflightリクエストとは、ブラウザがPOSTやカスタムヘッダーを含むリクエストを送る前に、自動で送るOPTIONSメソッドの事前確認リクエストです。サーバーがAccess-Control-Allow-Methodsなどの許可ヘッダーを返すと、本番のリクエストが送られます。単純なGETリクエストではpreflightは発生しません。",
  },
  {
    id: "cors-q4",
    question:
      "ローカル開発でフロントエンド（localhost:3000）からバックエンドAPI（localhost:8000）に fetchしたらCORSエラーが出た。このとき正しい認識はどれ？",
    choices: [
      "ポートが違っても同じlocalhost内なので同一オリジン。サーバーの接続設定の問題",
      "ポートが違うため別オリジン扱いになる。バックエンドAPIでCORSヘッダーの設定が必要",
      "HTTPSを使っていないためCORSエラーが出ている。HTTPSに切り替えれば解決する",
      "ブラウザのキャッシュが原因。スーパーリロードで解決する",
    ],
    correctIndex: 1,
    explanation:
      "localhost:3000 と localhost:8000 はホスト名（localhost）は同じでも、ポート番号が違うため別オリジンになります。ブラウザは厳密にオリジン（プロトコル+ドメイン+ポート）を比較するため、ポートが1つ違うだけで別オリジン扱いです。解決策はバックエンドAPIにCORSヘッダーを追加するか、Next.jsのAPI RouteやProxyを使って同一オリジン内にする方法があります。",
  },
  {
    id: "cors-q5",
    question:
      "CORSについての正しい認識はどれ？",
    choices: [
      "CORSを設定すればAPIへの不正アクセスを完全に防げる",
      "curlコマンドやPostmanからのAPIリクエストもCORSで制限される",
      "CORSはブラウザのセキュリティ機能で、ブラウザ上の不正なJavaScriptからの保護が目的",
      "CORSはサーバー側の設定で、サーバーが判断してリクエストをブロックする",
    ],
    correctIndex: 2,
    explanation:
      "CORSはブラウザのセキュリティ機能です。『ブラウザ上の不正なJavaScript』が別オリジンにリクエストを送ることを防ぎます。curlやPostmanなどのツールはCORSの制限を受けません（ブラウザではないため）。つまりCORSはAPIそのものを守る仕組みではなく、ブラウザを経由した特定の攻撃パターンを防ぐ仕組みです。APIを守るには認証（JWT等）が別途必要です。",
  },
];
