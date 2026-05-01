import type { DrillQuestion } from "@/components/PageDrill";

export const errorQuestions: DrillQuestion[] = [
  {
    id: "error-q1",
    question:
      "try/catch/finally の説明として正しい組み合わせはどれ？",
    choices: [
      "try は失敗想定コード、catch はエラー時のみ実行、finally はエラー時のみ実行",
      "try は実行したい処理、catch はエラーが起きた時に動く、finally は成功・失敗に関係なく必ず実行される",
      "try は最初に実行、catch は最後に必ず実行、finally はオプション",
      "try と catch はワンセット、finally は throw が呼ばれた時だけ実行",
    ],
    correctIndex: 1,
    explanation:
      "try は「実行したい処理」を入れる箱、catch はそこでエラーが発生した時だけ動く例外処理、finally は成功してもエラーが起きてもreturnしても必ず最後に呼ばれる後処理。航空機にたとえれば try が通常飛行、catch が緊急時マニュアル、finally が着陸後チェックリスト。",
  },
  {
    id: "error-q2",
    question:
      "次のうち「実行前（パース時）に検出されるエラー」はどれ？",
    choices: [
      "ReferenceError（存在しない変数を参照した）",
      "TypeError（undefined のプロパティにアクセスした）",
      "SyntaxError（コードの文法そのものが間違っている）",
      "NetworkError（fetch の通信が失敗した）",
    ],
    correctIndex: 2,
    explanation:
      "SyntaxError はコード自体の文法が壊れているので、そもそも実行が始まらない（パース段階で失敗する）ためtry/catchでは捕まえられない。ReferenceError や TypeError は実行時に発生する。NetworkError は非同期で起きるので Promise/async-await の仕組みで捕まえる。",
  },
  {
    id: "error-q3",
    question:
      "async 関数の中で fetch が失敗した時、エラーを正しく捕まえる書き方はどれ？",
    choices: [
      "fetch を if 文で囲んでステータスをチェックする",
      "try/catch で await fetch(...) を囲む",
      "throw new Error() を最初に書いておく",
      "finally に fetch を入れる",
    ],
    correctIndex: 1,
    explanation:
      "async/await の世界では、await した Promise が reject になると同期コードでthrowされたのと同じ振る舞いになり、try/catch の catch 節に流れ込む。await を忘れると Promise が解決される前に関数が抜けてしまい、エラーを捕まえ損ねるので注意。",
  },
  {
    id: "error-q4",
    question:
      "「ユーザーが存在しない」「在庫が足りない」など業務上のエラーを表現する時、最も推奨されるのはどれ？",
    choices: [
      "console.log でメッセージを出してそのまま処理を続行する",
      "Error クラスを継承したカスタムエラークラス（例: UserNotFoundError）を作って throw する",
      "return で false を返す",
      "alert でユーザーに通知する",
    ],
    correctIndex: 1,
    explanation:
      "業務ロジック固有のエラーは Error を継承したカスタムクラスで表現すると、catch 側で instanceof でエラーの種類を判別でき、コードが読みやすくなる。class UserNotFoundError extends Error のように書けば、ユーザーへの表示メッセージとログ用情報を分けて持たせることもできる。",
  },
  {
    id: "error-q5",
    question:
      "エラーハンドリング設計の原則として最も正しいのはどれ？",
    choices: [
      "エラーが起きてから対処方法を考えるのが効率的",
      "全てのエラーをユーザーにそのまま見せれば親切",
      "失敗を事前に想定して設計し、ユーザー向けメッセージとログ向け情報を分けて扱う",
      "try/catch をコード全体にかければ何があっても安心",
    ],
    correctIndex: 2,
    explanation:
      "プログラムは必ず失敗する前提で設計するのがプロの考え方。スタックトレースのような技術情報をそのままユーザーに見せると混乱と情報漏洩のリスクがある。ユーザーには「もう一度お試しください」のような丁寧なメッセージ、開発者ログには Error.stack や原因情報を残すのが基本。try/catch を広げすぎると逆にバグの温床になる。",
  },
];
