import type { DrillQuestion } from "@/components/PageDrill";

export const variablesQuestions: DrillQuestion[] = [
  {
    id: "variables-q1",
    question:
      "var / let / const のうち「再代入も再宣言もできない（一度決めたら変えられない）」のはどれ？",
    choices: ["var", "let", "const", "どれも変えられる"],
    correctIndex: 2,
    explanation:
      "const は「再代入できない箱」。再宣言（同じ名前でもう一度宣言）も不可。let は再代入はできるが再宣言はできない。var は両方できてしまうので事故が起きやすく、現代のJSではほぼ使わない。基本は const から書き始め、どうしても値を変える必要が出たときだけ let に直す、という運用が安全。",
  },
  {
    id: "variables-q2",
    question:
      "次のコードを実行したときの結果として正しいのはどれ？\n\n`if (true) { let x = 1; } console.log(x);`",
    choices: [
      "1 が表示される",
      "undefined が表示される",
      "ReferenceError（x が定義されていない）が出る",
      "null が表示される",
    ],
    correctIndex: 2,
    explanation:
      "let はブロックスコープ。{} の中で宣言された x は、ブロックの外からはそもそも見えない（存在しないのと同じ）。だから ReferenceError になる。これが var だと「関数スコープ」なので、{} の外でも x が見えてしまい undefined や 1 が出てしまう。ブロックスコープのおかげで「うっかり外から触る事故」が防げる。",
  },
  {
    id: "variables-q3",
    question:
      "「ホイスティング（巻き上げ）」について正しい説明はどれ？",
    choices: [
      "var / let / const どの宣言も巻き上げられない。書いた行で初めて存在する。",
      "var だけが巻き上げられる。let / const は巻き上げの対象外。",
      "var / let / const すべて巻き上げられる。ただし var は undefined で初期化、let / const は TDZ（一時的デッドゾーン）に入って参照するとエラーになる。",
      "巻き上げは関数だけに起きる現象で、変数では一切起きない。",
    ],
    correctIndex: 2,
    explanation:
      "JSエンジンは実行前に宣言を「巻き上げ」る。var はこのとき undefined で初期化されるので、宣言より前に参照しても undefined が返る（バグの温床）。let / const も巻き上げられるが、宣言の行に達するまでは TDZ（Temporal Dead Zone）にいて、触れば ReferenceError。「let / const は巻き上げられない」と説明されることがあるが正確には誤り。「巻き上げられるが触れない」が正しい。",
  },
  {
    id: "variables-q4",
    question:
      "次のコードはエラーになる？ ならない？\n\n`const user = { name: 'マジ' }; user.name = 'マスター';`",
    choices: [
      "const なのでエラー（再代入できない）",
      "エラーにならない。user.name は 'マスター' に変わる",
      "実行はできるが name の値は変わらない",
      "const のオブジェクトは作った瞬間に凍結されるので、変えようとすると例外が出る",
    ],
    correctIndex: 1,
    explanation:
      "const が固定するのは「変数が指している参照（ポインタ）」だけで、参照先のオブジェクトの中身までは固定しない。だから user 自体に別のオブジェクトを再代入することはできないが、user.name のようにプロパティを書き換えるのは自由にできる。中身まで固定したいときは Object.freeze を使うか、そもそも書き換えないコードにする。",
  },
  {
    id: "variables-q5",
    question:
      "このプロジェクトの方針として、変数を宣言するときの第一選択はどれにすべき？",
    choices: [
      "迷ったら var。一番昔からあるので互換性が高い。",
      "迷ったら let。値を変えたくなったときも困らない。",
      "迷ったら const。再代入が必要になった時点で初めて let に直す。",
      "毎回 var / let / const をランダムに選び、エラーが出なければOK。",
    ],
    correctIndex: 2,
    explanation:
      "現代のJavaScriptの常識は「const ファースト」。const で書き始め、「あ、ここは値を変える必要がある」と気づいたら let に書き換える。var は関数スコープ・再宣言可・undefined ホイスティングと事故要因が多く、レガシーコードを読む以外で新しく書く理由はほぼない。const から始めると「うっかり再代入してバグった」が構造的に起こせなくなる。",
  },
];
