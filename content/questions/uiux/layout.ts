import type { DrillQuestion } from "@/components/PageDrill";

export const layoutQuestions: DrillQuestion[] = [
  {
    id: "layout-q1",
    question: "一般的なグリッドのカラム数は？",
    choices: ["4", "8", "12", "16"],
    correctIndex: 2,
    explanation:
      "12カラムは2・3・4・6で割り切れる便利な数。1/2、1/3、1/4、1/6 のレイアウトが自然に作れるため、Webデザインの事実上の標準になっている。",
  },
  {
    id: "layout-q2",
    question: "モバイルでナビゲーションを下に置く理由は？",
    choices: [
      "流行っているから",
      "指が届きやすい",
      "画面が小さいから",
      "色が綺麗に見えるから",
    ],
    correctIndex: 1,
    explanation:
      "片手でスマホを持つと、親指が自然に届くのは画面の下半分。重要な操作はタップしやすい下に置くのが原則。上部はステータス表示など「見るだけ」の領域に向いている。",
  },
  {
    id: "layout-q3",
    question: "デザイントークンの最大の利点は？",
    choices: [
      "実装が速くなる",
      "変更が一発で全体に効く",
      "ファイルが軽くなる",
      "かっこよく見える",
    ],
    correctIndex: 1,
    explanation:
      "色やサイズに名前（primary-500、space-4）をつけて中央管理しておくと、ブランドカラーの変更が定義1箇所の変更で全画面に反映される。一貫性は仕組みで守るのが強い。",
  },
  {
    id: "layout-q4",
    question: "モバイルファーストの考え方は？",
    choices: [
      "PCから先に設計する",
      "モバイルから先に設計する",
      "同時に設計する",
      "どちらでもよい",
    ],
    correctIndex: 1,
    explanation:
      "モバイルから設計すると、限られた幅の中で「本当に必要な情報」を選び抜くことになる。後からPC版で広げるのは簡単だが、PC版を縮めるのは難しい。",
  },
  {
    id: "layout-q5",
    question: "一貫性が壊れる典型的な原因は？",
    choices: [
      "画面ごとにカラーコードを直書きする",
      "トークンを使う",
      "12カラムを使う",
      "コンポーネント化する",
    ],
    correctIndex: 0,
    explanation:
      "「#3b82f6」と直書きすると、似た青が画面ごとに微妙に違う事故が起きる。トークン（primary-500）で呼び出せば、定義を変えるだけで全体が揃う。",
  },
];

export const layoutAdvancedQuestions: DrillQuestion[] = [
  {
    id: "layout-adv-q1",
    level: "advanced",
    question: "「デザイントークン」を使う主なメリットはどれ？",
    choices: [
      "デザインツールなしにUIが自動生成される",
      "色・フォント・スペーシングなどの値を変数として一元管理し、テーマ変更（ダークモード等）を効率化できる",
      "JavaScriptのバンドルサイズが小さくなる",
      "ブラウザの互換性問題が自動で解決される",
    ],
    correctIndex: 1,
    explanation: "デザイントークンは `--color-primary: #10b981` のようにCSS変数に設計値を格納する手法。全コンポーネントが同じ変数を参照するため、1箇所を変えればサイト全体に反映される。ダークモード・テーマ切り替えが容易になる。",
  },
  {
    id: "layout-adv-q2",
    level: "advanced",
    question: "Tailwind CSSで「モバイルファースト」の実装を正しく表現しているのはどれ？",
    choices: [
      "デスクトップ用クラスを先に書き、smやmdで上書きする",
      "ベースクラスがモバイル向けになり、sm:/md:/lg: プレフィックスで大きい画面用を追加する",
      "モバイル専用のCSSファイルを別に用意する",
      "@mediaクエリをJavaScriptで管理する",
    ],
    correctIndex: 1,
    explanation: "Tailwindは`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`のように書く。ベース（プレフィックスなし）がモバイル、sm:以上が大きい画面。これがモバイルファースト。`lg:grid-cols-1`のように大きい画面で戻す書き方は反直感的で避けるべき。",
  },
  {
    id: "layout-adv-q3",
    level: "advanced",
    question: "12カラムグリッドを使うとき、「全幅」「半分」「3分の1」「4分の1」の列数の組み合わせとして正しいのはどれ？",
    choices: [
      "12 / 4 / 3 / 2",
      "12 / 6 / 4 / 3",
      "10 / 5 / 3 / 2",
      "12 / 8 / 4 / 2",
    ],
    correctIndex: 1,
    explanation: "12カラムグリッドの分割: 12/12（全幅）/ 6/12（半分）/ 4/12（3分の1）/ 3/12（4分の1）。12を選んだ理由は2/3/4/6の約数を持つため柔軟に割り切れるから。Tailwindのgrid-cols-12とcol-span-{n}で実装できる。",
  },
  {
    id: "layout-adv-q4",
    level: "advanced",
    question: "コンポーネント化された共通ヘッダーがあるとき、ヘッダーの高さを変更したら関連する余白がずれた。根本的な解決策はどれ？",
    choices: [
      "各ページで個別にpadding-topを上書きする",
      "ヘッダー高さをCSS変数（デザイントークン）として定義し、paddingや計算値で参照する",
      "ヘッダーを固定せず、スクロールで消えるようにする",
      "ヘッダーをコンポーネントから外し、各ページに直接書く",
    ],
    correctIndex: 1,
    explanation: "ヘッダー高さを `--header-height: 64px` として定義し、`padding-top: var(--header-height)` で参照する。高さを変えると全ページの余白が自動で追従する。各ページで個別上書きは将来の変更で全箇所を修正しなければならなくなる（保守性の問題）。",
  },
];
