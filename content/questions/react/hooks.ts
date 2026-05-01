import type { DrillQuestion } from "@/components/PageDrill";

export const hooksQuestions: DrillQuestion[] = [
  {
    id: "hooks-q1",
    question: "カスタムHooksの命名ルールとして正しいのはどれ？",
    choices: [
      "どんな名前でも構わない。命名に決まりはない",
      "必ず use で始まる名前にしなければならない",
      "必ず Hook という単語を末尾につける",
      "小文字始まりなら何でもよい",
    ],
    correctIndex: 1,
    explanation:
      "useから始める命名はReactとESLintが「この関数にはHooksのルールを適用すべき」と認識するためのシグナル。単なる慣習ではなく、lintプラグインが依拠するルール。useから始めないとuseState等をその中で呼んでもエラー検知されない場合があり、バグに気づきにくくなる。",
  },
  {
    id: "hooks-q2",
    question: "カスタムHooksの内部でuseStateやuseEffectを使うことはできるか？",
    choices: [
      "できない。カスタムHooksの内部でHooksは呼べない",
      "できる。それがカスタムHooksの目的である",
      "できるが、useStateのみに限られる",
      "できるが、useEffectは使えない",
    ],
    correctIndex: 1,
    explanation:
      "カスタムHooksとは「既存のHooksを組み合わせて新しいHooksを作る」仕組み。useFetchなら内部でuseState（data/loading/error管理）とuseEffect（fetch実行）を両方使う。「Hooksを呼べる場所」は、ReactコンポーネントのトップレベルとカスタムHooksの内部だけ。",
  },
  {
    id: "hooks-q3",
    question: "Hooksをif文の中で呼んではいけない理由として正しいのはどれ？",
    choices: [
      "if文の中ではJavaScriptが正しく動作しないため",
      "Reactがレンダリングをまたいでフックの呼び出し順序を追跡しているため",
      "if文の中ではuseStateが戻り値を返せないため",
      "ESLintがif文内のHooks使用をすべて禁止しているため",
    ],
    correctIndex: 1,
    explanation:
      "Reactは毎回のレンダリングで「何番目にどのHookが呼ばれたか」という順序で状態を管理している。条件分岐の中でHooksを呼ぶと、条件によって呼ばれる順番が変わり、Reactが状態をどのHookに紐付けるか混乱してバグになる。「常に同じ順序で呼ばれること」が鉄則。",
  },
  {
    id: "hooks-q4",
    question: "カスタムHooks化すべきサインとして最も適切なのはどれ？",
    choices: [
      "1つのコンポーネントのコード行数が10行を超えたとき",
      "同じuseState + useEffectのパターンを複数コンポーネントで繰り返し書いているとき",
      "useEffectの依存配列が長くなったとき",
      "コンポーネントのpropsが3つ以上になったとき",
    ],
    correctIndex: 1,
    explanation:
      "同じロジックを2か所以上書いた瞬間がカスタムHooks化のサイン。APIフェッチのloading/error/dataパターンを複数ページで使っているなら、useFetchにまとめれば各コンポーネントは1行で済む。行数やprops数はそれ単体では判断基準にならない。",
  },
  {
    id: "hooks-q5",
    question: "カスタムHooksの主なメリットとして正しくないものはどれ？",
    choices: [
      "同じロジックを複数コンポーネントで再利用できる",
      "コンポーネントがUIに集中できてスリムになる",
      "HooksだけをUIと切り離して単独でテストしやすくなる",
      "useStateの代わりに通常変数を使えるようになる",
    ],
    correctIndex: 3,
    explanation:
      "カスタムHooksはuseStateを「なくす」のではなく「内部に隠す」仕組み。呼び出し側はuseStateを意識しなくて済むが、内部では正規のuseStateを使っている。メリットは再利用・コンポーネントのスリム化・テストのしやすさの3点。状態管理の仕組みそのものは変わらない。",
  },
];
