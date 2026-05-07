import type { DrillQuestion } from "@/components/PageDrill";

export const responsiveQuestions: DrillQuestion[] = [
  {
    id: "responsive-q1",
    question: "Tailwind CSS の `sm:` プレフィックスが適用される画面幅の条件はどれ？",
    choices: [
      "640px 未満（スモールサイズ限定）",
      "640px 以上のすべての画面",
      "640px ちょうどの画面のみ",
      "モバイルデバイスのみ",
    ],
    correctIndex: 1,
    explanation:
      "Tailwindはモバイルファーストを採用しており、ブレークポイントプレフィックスは「その幅以上」という意味です。`sm:` は `@media (min-width: 640px)` に対応し、640px 以上のすべての画面に適用されます。「スモール専用」ではなく「スモール以上」という点が落とし穴です。640px 未満（スマホ）はプレフィックスなしのクラスで制御します。",
  },
  {
    id: "responsive-q2",
    question: "Tailwind CSS の標準ブレークポイントで `lg:` が適用される最小幅はどれ？",
    choices: [
      "768px",
      "900px",
      "1024px",
      "1280px",
    ],
    correctIndex: 2,
    explanation:
      "Tailwindの標準ブレークポイントは `sm`(640px)・`md`(768px)・`lg`(1024px)・`xl`(1280px)・`2xl`(1536px)です。`lg:` は1024px以上（一般的なラップトップ画面相当）に適用されます。覚えるコツ：sm→md→lg→xl の順で大きくなり、それぞれ640・768・1024・1280という数字です。",
  },
  {
    id: "responsive-q3",
    question: "モバイルでは縦並び、md以上では横並びにする正しいTailwindのクラスはどれ？",
    choices: [
      "mobile:flex-col md:flex-row",
      "flex-col md:flex-row",
      "sm:flex-col md:flex-row",
      "flex md:flex-col",
    ],
    correctIndex: 1,
    explanation:
      "モバイルファーストなので「プレフィックスなし」がモバイルのデフォルト設定です。`flex-col` でモバイルを縦並びに設定し、`md:flex-row` でmd以上（768px以上）を横並びに切り替えます。`mobile:` というプレフィックスは存在せず、`sm:flex-col` はsm以上（640px以上）が縦並びになるので意図と逆になります。",
  },
  {
    id: "responsive-q4",
    question: "Tailwind CSS で「モバイルでは非表示、md以上では表示」するクラスの組み合わせはどれ？",
    choices: [
      "hidden md:block",
      "block md:hidden",
      "visible md:invisible",
      "display-none md:display-block",
    ],
    correctIndex: 0,
    explanation:
      "モバイル（デフォルト）で `hidden`（display: none）にして、md以上で `md:block`（display: block）に切り替えます。`block md:hidden` は逆で「モバイルで表示・md以上で非表示」になります。デスクトップ専用ナビゲーションやサイドバーなど、PCだけに表示したい要素によく使うパターンです。",
  },
  {
    id: "responsive-q5",
    question: "Tailwind CSS でカスタムブレークポイント（例：900px）を追加する場所はどこ？",
    choices: [
      "globals.css の @media クエリ内",
      "tailwind.config.ts の theme.extend.screens",
      "各コンポーネントの style 属性",
      "next.config.ts の breakpoints オプション",
    ],
    correctIndex: 1,
    explanation:
      "カスタムブレークポイントは `tailwind.config.ts`（または `.js`）の `theme.extend.screens` に追加します。例：`screens: { 'tablet': '900px' }` と書くと `tablet:` プレフィックスが使えるようになります。`globals.css` に書くとTailwindのプレフィックス記法が使えません（通常のメディアクエリになるだけです）。",
  },
];
