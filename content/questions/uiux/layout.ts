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
