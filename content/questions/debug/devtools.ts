import type { DrillQuestion } from "@/components/PageDrill";

export const devtoolsQuestions: DrillQuestion[] = [
  {
    id: "devtools-q1",
    question: "DevToolsをすぐに開くキーボードショートカット（Mac）として正しいのはどれ？",
    choices: [
      "Cmd + Shift + C",
      "Cmd + Option + I",
      "Cmd + Option + J",
      "Cmd + F12",
    ],
    correctIndex: 1,
    explanation:
      "Mac では Cmd+Option+I（Windows は F12）でDevToolsが開きます。Cmd+Option+J はConsoleタブを直接開くショートカットです。右クリック→「検証」を使っても同じ画面が開きますが、キーボードショートカットが最速です。",
  },
  {
    id: "devtools-q2",
    question: "自分のコードに書いた console.log() の出力を確認するタブはどれ？",
    choices: [
      "Elements",
      "Network",
      "Application",
      "Console",
    ],
    correctIndex: 3,
    explanation:
      "console.log()の出力はConsoleタブに表示されます。Elementsタブはページの構造（HTML・CSS）を確認するタブ、NetworkタブはHTTP通信を確認するタブ、ApplicationタブはlocalStorageやCookieを確認するタブです。",
  },
  {
    id: "devtools-q3",
    question: "fetch APIで取得したデータが空になっているとき、最初に確認すべきタブはどれ？",
    choices: [
      "Elements（HTML構造を確認する）",
      "Console（JSエラーを確認する）",
      "Network（レスポンスの中身を確認する）",
      "Application（localStorageを確認する）",
    ],
    correctIndex: 2,
    explanation:
      "fetchで取得したデータが空の場合、Networkタブで該当のリクエストを選んでResponseタブを開きます。サーバーが何を返したかを直接確認できます。ConsoleにJSエラーがなくても、Networkタブを見ると空配列や別のデータが返っていることがあります。",
  },
  {
    id: "devtools-q4",
    question: "Elementsタブでできることとして正しいのはどれ？",
    choices: [
      "JavaScriptのコードをステップ実行してデバッグする",
      "HTTPリクエストのステータスコードを確認する",
      "CSSのプロパティ値をリアルタイムに変更して試す",
      "localStorageに保存されたデータを削除する",
    ],
    correctIndex: 2,
    explanation:
      "Elementsタブでは、右側のStylesパネルでCSSを一時的に変更してページにリアルタイム反映させられます。ただしリロードすると変更は消えます。JSのステップ実行はSourcesタブ、ステータスコードはNetworkタブ、localStorageの管理はApplicationタブで行います。",
  },
  {
    id: "devtools-q5",
    question: "「DevToolsを閉じたらElementsで加えたCSS変更は保存される」——この説明は正しいか？",
    choices: [
      "正しい。ファイルに自動保存される",
      "正しい。ブラウザのキャッシュに保存される",
      "誤り。ページをリロードすると変更は消える",
      "誤り。DevToolsを閉じると即座に変更が消える",
    ],
    correctIndex: 2,
    explanation:
      "Elementsタブでのスタイル変更は一時的なものです。ページをリロードすると元のスタイルに戻ります。これは「仮試し」のための機能で、良いスタイルが見つかったら実際のCSSファイルに手動で反映させる必要があります。DevToolsを閉じるだけでは消えず、ページをリロードしたタイミングで元に戻ります。",
  },
];
