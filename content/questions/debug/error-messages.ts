import type { DrillQuestion } from "@/components/PageDrill";

export const errorMessagesQuestions: DrillQuestion[] = [
  {
    id: "error-messages-q1",
    question: "スタックトレースで「エラーが起きた現場（直接の原因）」が書かれているのはどれ？",
    choices: [
      "スタックトレースの一番下の行",
      "スタックトレースの真ん中の行",
      "スタックトレースの一番上の行",
      "エラーメッセージの右端に書かれる",
    ],
    correctIndex: 2,
    explanation:
      "スタックトレースは「最後に呼ばれた関数（＝エラーの現場）」が一番上に表示されます。一番下は「最初に呼び出した場所（ルート）」です。デバッグするときは一番上の行から自分が書いたファイル名を探していくのが正しい手順です。",
  },
  {
    id: "error-messages-q2",
    question: "「Cannot read properties of undefined (reading 'name')」というエラーが意味することはどれ？",
    choices: [
      "nameという変数が宣言されていない",
      "コードの文法が間違っている",
      "undefinedの .name プロパティを読もうとした",
      "nameという関数は存在しない",
    ],
    correctIndex: 2,
    explanation:
      "このTypeErrorは「undefinedの.nameプロパティは読めない」という意味です。undefinedとは「まだ値が入っていない」状態。APIのデータが届く前にそのプロパティを参照しようとしたときによく発生します。変数自体が宣言されていないエラーはReferenceError（xxx is not defined）が出ます。",
  },
  {
    id: "error-messages-q3",
    question: "「ReferenceError: userName is not defined」が出る典型的な原因はどれ？",
    choices: [
      "userName に undefined が入っている",
      "userName を宣言していない、またはスコープ外でアクセスした",
      "userName が関数ではないのに呼び出した",
      "コードの括弧の対応が取れていない",
    ],
    correctIndex: 1,
    explanation:
      "ReferenceErrorは「その名前の変数を知らない」というエラーです。変数名のタイポ（userNameをusernameと書くなど）・宣言忘れ・スコープ外のアクセスが典型的な原因です。undefinedが入っている場合はTypeError・SyntaxErrorとは区別されます。",
  },
  {
    id: "error-messages-q4",
    question: "Consoleに表示されたスタックトレースの「ファイル名:行番号」部分をクリックするとどうなるか？",
    choices: [
      "ブラウザが該当ページをリロードする",
      "DevToolsのNetworkタブが開く",
      "DevToolsのSourcesタブが開き、エラーの該当行がハイライトされる",
      "テキストエディタ（VSCode）が該当行を開く",
    ],
    correctIndex: 2,
    explanation:
      "スタックトレースのファイル名:行番号をクリックすると、DevToolsのSourcesタブが開き、エラーが起きた行にカーソルが移動します。ここからブレークポイントを設置して詳しく調査することもできます。テキストエディタへの連携は通常のクリックでは行われません。",
  },
  {
    id: "error-messages-q5",
    question: "「スタックトレースの一番下の行を修正すれば問題が解決する」——この説明は正しいか？",
    choices: [
      "正しい。一番下がエラーの根本原因",
      "正しい。一番下が最後に実行されたコード",
      "誤り。一番上の行がエラーの現場。一番下は最初の呼び出し元",
      "誤り。スタックトレースはランダムな順序で表示される",
    ],
    correctIndex: 2,
    explanation:
      "スタックトレースは「呼ばれた順に積み重なる」ため、一番上が「最後に呼ばれた関数（エラーの現場）」で、一番下が「最初に呼んだ場所（ルート）」です。エラーの原因調査は一番上から始めるのが正しい。特に自分が書いたファイル名が含まれる行（外部ライブラリの行を除く）が調査の起点になります。",
  },
];
