import type { DrillQuestion } from "@/components/PageDrill";

export const realtimeQuestions: DrillQuestion[] = [
  {
    id: "realtime-q1",
    question:
      "onSnapshot と getDocs の最も大きな違いはどれ？",
    choices: [
      "onSnapshot はコレクション全件を取得し、getDocs は1件だけ取得する",
      "getDocs はデータを1回だけ取得して終わるが、onSnapshot はデータが変化するたびに自動でコールバックが呼ばれる購読型の取得方法",
      "onSnapshot は書き込み専用のメソッドで、getDocs は読み取り専用のメソッド",
      "getDocs はリアルタイム同期に対応しており、onSnapshot は一括取得に特化している",
    ],
    correctIndex: 1,
    explanation:
      "getDocs は「その瞬間のデータを1回取得して終わり」のメソッド。onSnapshot は「データを購読（subscribe）し、変化があるたびにコールバックが自動で呼ばれる」メソッド。チャット・通知・共同編集のようにリアルタイムに画面を更新したい場面では onSnapshot を使う。",
  },
  {
    id: "realtime-q2",
    question:
      "React の useEffect で onSnapshot を使うとき、クリーンアップ関数に書くべき処理はどれ？",
    choices: [
      "コンポーネントのstateをリセットする処理",
      "onSnapshot が返す unsubscribe 関数を呼び出す処理",
      "Firestore のドキュメントを削除する処理",
      "クリーンアップ関数は不要。onSnapshot は自動で解除される",
    ],
    correctIndex: 1,
    explanation:
      "onSnapshot は呼び出すと「購読開始」の状態になり、コンポーネントがアンマウントされても購読し続けてしまう。これがメモリリークの原因になる。useEffect のクリーンアップ関数（return で返す関数）内で unsubscribe() を呼ぶことで、コンポーネントが画面から消えたタイミングで購読を解除できる。",
  },
  {
    id: "realtime-q3",
    question:
      "docChanges() が返す change.type の値として正しいセットはどれ？",
    choices: [
      '"create" / "update" / "delete"',
      '"insert" / "modify" / "remove"',
      '"added" / "modified" / "removed"',
      '"new" / "changed" / "deleted"',
    ],
    correctIndex: 2,
    explanation:
      'docChanges() はスナップショット内の各変更を表す配列を返す。change.type の値は "added"（新規追加）/ "modified"（変更）/ "removed"（削除）の3種類。これを使うとコレクション全体を再描画せず、差分だけ効率よく処理できる。',
  },
  {
    id: "realtime-q4",
    question:
      "メモリリークとはどういう状態か？",
    choices: [
      "アプリのビルドサイズが大きくなりすぎている状態",
      "コンポーネントがアンマウントされた後も購読やタイマーなどが解除されずメモリを消費し続ける状態",
      "Firestore のドキュメントサイズが上限を超えている状態",
      "useState の値がレンダリングごとにリセットされる状態",
    ],
    correctIndex: 1,
    explanation:
      "コンポーネントがアンマウント（画面から消える）されても、onSnapshot の購読やsetIntervalなどが残ったままだとメモリを消費し続ける。これをメモリリークという。React の useEffect クリーンアップ関数（return () => { ... }）で unsubscribe() を呼ぶことで防ぐことができる。",
  },
  {
    id: "realtime-q5",
    question:
      "onSnapshot はポーリングとどう違うか？正しい説明はどれ？",
    choices: [
      "ポーリングより通信速度が遅いが、サーバーへの負担が少ない",
      "ポーリングは変化がなくても定期的にサーバーへ問い合わせるが、onSnapshot は変化が起きた瞬間に Firestore からプッシュ通知が届く方式で、変化がなければ通信ゼロ",
      "ポーリングは WebSocket を使い、onSnapshot は HTTP リクエストを使う",
      "両者は技術的に全く同じ仕組みで、呼び方が違うだけ",
    ],
    correctIndex: 1,
    explanation:
      "ポーリングは「一定間隔で自分からサーバーに問い合わせる」プル型。変化がなくても毎回通信が発生する。onSnapshot は「Firestore がデータ変化を検知して自動的に通知を送る」プッシュ型。変化がなければ通信ゼロで、変化があれば即座にコールバックが呼ばれる。チャットのような低遅延・低負荷が求められる場面で onSnapshot が有効。",
  },
];
