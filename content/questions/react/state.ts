import type { DrillQuestion } from "@/components/PageDrill";

export const stateQuestions: DrillQuestion[] = [
  {
    id: "state-q1",
    question: "const [count, setCount] = useState(0) の戻り値として正しいのはどれ？",
    choices: [
      "countだけが返ってくる",
      "setCountだけが返ってくる",
      "[現在の値, setter関数] の配列が返ってくる",
      "{ value, update } のオブジェクトが返ってくる",
    ],
    correctIndex: 2,
    explanation:
      "useStateは [現在の値, setter関数] の2要素配列を返す。分割代入で好きな名前をつけられる。慣例として「state名」と「set + State名」のペアを使う。オブジェクトではなく配列なのでインデックスの順番が重要。",
  },
  {
    id: "state-q2",
    question: "count = count + 1 と直接代入せず setCount(count + 1) を使う理由はどれ？",
    choices: [
      "直接代入するとTypeScriptのエラーになるから",
      "setter関数を呼ばないとReactが変化を検知できず再レンダリングされないから",
      "直接代入するとブラウザがクラッシュするから",
      "useStateの変数はconstなのでそもそも書き換えできないから",
    ],
    correctIndex: 1,
    explanation:
      "Reactはsetter関数が呼ばれたことをトリガーに再レンダリングを行う。直接代入するとメモリ上の値は変わるが、Reactに「変わったよ」と通知できない。constについては確かに直接書き換えはできないが、それはsetter関数を使う本質的な理由ではなく副次的な制約。",
  },
  {
    id: "state-q3",
    question: "オブジェクトStateを正しく更新する方法はどれ？",
    choices: [
      "state.name = 'マジ' と直接プロパティを書き換える",
      "setState(name = 'マジ') と代入式を渡す",
      "setState({ ...state, name: 'マジ' }) とスプレッド構文で新オブジェクトを作る",
      "Object.assign(state, { name: 'マジ' }) で元のオブジェクトを変更する",
    ],
    correctIndex: 2,
    explanation:
      "Reactは「元のオブジェクトを変更したかどうか」ではなく「新しいオブジェクトが渡されたかどうか」で変化を検知する。スプレッド構文で既存の値をコピーしながら変更部分だけ上書きした新オブジェクトをsetterに渡すのが正しいパターン。直接プロパティを書き換えてもReactは検知できない。",
  },
  {
    id: "state-q4",
    question: "setCount(newValue) を呼んだ直後に count を参照すると何が起きる？",
    choices: [
      "すぐに新しい値が反映されている",
      "エラーになる",
      "まだ古い値のまま（次のレンダリングで反映される）",
      "undefinedになる",
    ],
    correctIndex: 2,
    explanation:
      "useStateのsetterは非同期的に動作する。setterを呼んだ時点ではまだ再レンダリングは起きておらず、同じレンダリングサイクル内では古い値が参照される。新しい値はReactが次のレンダリングを実行した後に確定する。連続してsetterを呼ぶ場合はfunctional update（setCount(prev => prev + 1)）を使うと安全。",
  },
  {
    id: "state-q5",
    question: "次のうち、Stateとして管理すべき値の判断基準として最も適切なのはどれ？",
    choices: [
      "コンポーネント内で使うすべての変数をStateにする",
      "変化したときにUIを再描画する必要がある値だけをStateにする",
      "文字列と数値だけをStateにし、真偽値はStateにしない",
      "Propsから受け取った値を必ずStateにコピーする",
    ],
    correctIndex: 1,
    explanation:
      "Stateは「再レンダリングを引き起こすための仕組み」。UIに反映する必要がない計算の中間変数などは通常の変数のままでよい。むやみにStateを増やすと不要な再レンダリングが増えパフォーマンスに悪影響を与える。PropsをStateにコピーするのはアンチパターンで、Propsの変化がStateに反映されなくなる。",
  },
];
