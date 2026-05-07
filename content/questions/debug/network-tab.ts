import type { DrillQuestion } from "@/components/PageDrill";

export const networkTabQuestions: DrillQuestion[] = [
  {
    id: "network-tab-q1",
    question: "fetchで返ってきたJSONのデータをNetworkタブで確認するには、行を選んでどのタブを開くか？",
    choices: [
      "Headers タブ",
      "Payload タブ",
      "Response タブ",
      "Timing タブ",
    ],
    correctIndex: 2,
    explanation:
      "Responseタブに、サーバーが返したデータ（JSONなど）の中身が表示されます。Headersタブはリクエスト・レスポンスのヘッダー情報、Payloadタブは送ったデータ（POSTのbodyなど）、Timingタブは通信の各フェーズの時間を確認するタブです。",
  },
  {
    id: "network-tab-q2",
    question: "HTTPステータスコード「404」が意味するのはどれ？",
    choices: [
      "リクエストの形式がおかしい（クライアントのデータ送信ミス）",
      "サーバー内でエラーが発生した",
      "そのURLは存在しない",
      "認証が必要（ログインしていない）",
    ],
    correctIndex: 2,
    explanation:
      "404 Not Foundは「そのURLのリソースは存在しない」という意味です。APIのURLが間違っている・削除されたリソースを参照しているときによく出ます。400はリクエストの形式の問題、401は認証不要・ログインしていない、500はサーバー内部エラーです。",
  },
  {
    id: "network-tab-q3",
    question: "「APIは正常応答（ステータス200）しているが画面にデータが出ない」を調べるとき、最も適切な手順はどれ？",
    choices: [
      "ConsoleのJSエラーだけを確認する",
      "NetworkタブのResponseタブを開いてJSONの中身を確認する",
      "Elementsタブでページの構造を確認する",
      "ApplicationタブのlocalStorageを確認する",
    ],
    correctIndex: 1,
    explanation:
      "ステータス200でもデータが空（[ ]）だったり、期待と異なるJSONが返ってきている可能性があります。NetworkタブのResponseタブでサーバーが実際に何を返したかを直接確認するのが最適な手順です。ConsoleにJSエラーがない場合でも、レスポンスの中身に問題があることはよくあります。",
  },
  {
    id: "network-tab-q4",
    question: "Networkタブでfetch通信だけを表示するにはどうするか？",
    choices: [
      "Networkタブのフィルターバーで「JS」を選ぶ",
      "Networkタブのフィルターバーで「Fetch/XHR」を選ぶ",
      "Networkタブのフィルターバーで「All」を選ぶ",
      "Networkタブのフィルターバーで「Img」を選ぶ",
    ],
    correctIndex: 1,
    explanation:
      "フィルターバーで「Fetch/XHR」を選ぶと、fetchやXMLHttpRequestによる通信だけに絞り込まれます。「All」では画像・CSS・JSファイルなど全通信が表示されて探しにくくなります。「JS」はJavaScriptファイルの読み込み、「Img」は画像ファイルを絞り込みます。",
  },
  {
    id: "network-tab-q5",
    question: "「ステータスコードが200であれば、データは必ず正しく返ってきている」——この説明は正しいか？",
    choices: [
      "正しい。200はHTTP通信の成功を意味する",
      "正しい。サーバーが200を返すということはデータが正常ということ",
      "誤り。200でも空配列やエラーメッセージが返ってくることがある",
      "誤り。200の場合はNetworkタブに表示されない",
    ],
    correctIndex: 2,
    explanation:
      "ステータスコード200はHTTP通信が「正常に完了した」ことを示すだけです。サーバーが「成功したけど該当データがない」という場合に200と空配列（[ ]）を返すことはよくあります。必ずResponseタブで実際の中身を確認する習慣をつけることが重要です。",
  },
];
