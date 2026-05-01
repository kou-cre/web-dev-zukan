import type { DrillQuestion } from "@/components/PageDrill";

export const domQuestions: DrillQuestion[] = [
  {
    id: "dom-q1",
    question: "「DOM（Document Object Model）」を最も適切に説明しているのはどれ？",
    choices: [
      "JavaScriptのライブラリの一種で、import して使うもの",
      "ブラウザがHTMLを解析して作る、ツリー構造のオブジェクト表現",
      "サーバーから送られてくるHTMLファイルそのもの",
      "CSSのセレクタを書くための独自言語",
    ],
    correctIndex: 1,
    explanation:
      "DOMは「ブラウザがHTMLテキストを読み込んだあと、JavaScriptから操作できるようにツリー状のオブジェクトに変換したもの」。HTMLファイルそのものではなく、ブラウザのメモリ上に展開された「設計図」だと考えると掴みやすい。document.querySelector などはこのDOMにアクセスするための窓口。",
  },
  {
    id: "dom-q2",
    question:
      "ID 属性が `title` の要素を取得したい。最も高速で意図が明確な書き方はどれ？",
    choices: [
      "document.querySelector('title')",
      "document.querySelectorAll('#title')",
      "document.getElementById('title')",
      "document.getElementByClass('title')",
    ],
    correctIndex: 2,
    explanation:
      "getElementById はIDを直接インデックスで引くため最速。querySelector でも `#title` と書けば取れるが、CSSセレクタを解釈する分だけ少し遅い。querySelectorAll は NodeList（複数要素の配列like）が返るので、ID取得には過剰。getElementByClass というメソッドは存在しない（正しくは getElementsByClassName）。",
  },
  {
    id: "dom-q3",
    question:
      "ユーザーが入力したコメントを画面に表示したい。XSS（クロスサイトスクリプティング）攻撃を防ぐために最も適切なのはどれ？",
    choices: [
      "element.innerHTML = userInput; で直接挿入する",
      "element.textContent = userInput; を使う",
      "element.outerHTML = userInput; に置き換える",
      "document.write(userInput) で出力する",
    ],
    correctIndex: 1,
    explanation:
      "textContent は受け取った文字列を「ただの文字」として扱うため、`<script>` タグを入れられても実行されない。innerHTML / outerHTML / document.write はHTMLとして解釈してしまうため、ユーザー入力をそのまま渡すとスクリプトが動いてしまう。HTMLとして埋め込みたい場合は DOMPurify などでサニタイズするのが定石。",
  },
  {
    id: "dom-q4",
    question:
      "ボタンがクリックされたら関数を実行したい。最も標準的な書き方はどれ？",
    choices: [
      "button.onClick(handleClick)",
      "button.addEventListener('click', handleClick)",
      "button.click = handleClick",
      "button.event('click').do(handleClick)",
    ],
    correctIndex: 1,
    explanation:
      "addEventListener が現代の標準。同じイベントに複数のリスナーを登録できる・removeEventListener で外せる・キャプチャ/バブリングを制御できるという利点がある。button.onclick = handleClick も動くが（onClick ではなく小文字 onclick）、リスナーが1つしか登録できないので上書き事故が起きやすい。",
  },
  {
    id: "dom-q5",
    question:
      "Reactにおける「仮想DOM（Virtual DOM）」について最も正しい説明はどれ？",
    choices: [
      "ブラウザに実在する本物のDOMで、実DOMより速いもの",
      "DOMを使わずに画面を描画する独自エンジン",
      "メモリ上のJavaScriptオブジェクトとして持ったDOMの軽量コピー。差分だけを実DOMに反映する仕組み",
      "サーバー側で動くDOMで、ブラウザには存在しない",
    ],
    correctIndex: 2,
    explanation:
      "仮想DOMは「メモリ上に持っている軽量なDOMの写し」。Reactは状態が変わるたびに新しい仮想DOMを作り、前回との差分を計算して、実DOMには差分だけを反映する。実DOMの操作はコストが高いため、まとめて最小限にすることでパフォーマンスを稼ぐ仕組み。実DOMより速い「別物のDOM」が存在するわけではない。",
  },
];
