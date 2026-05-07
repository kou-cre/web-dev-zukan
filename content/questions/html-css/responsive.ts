import type { DrillQuestion } from "@/components/PageDrill";

export const responsiveQuestions: DrillQuestion[] = [
  {
    id: "responsive-q1",
    question: "スマホブラウザで画面幅を正しく認識させるために必要な設定はどれ？",
    choices: [
      "CSSに @media (max-width: 768px) を追加する",
      "<meta name='viewport' content='width=device-width, initial-scale=1'> をHTMLのheadに追加する",
      "JavaScript でwindow.innerWidthを取得する",
      "bodyにwidth: 100%を指定する",
    ],
    correctIndex: 1,
    explanation:
      "`<meta name='viewport' ...>` タグがないとスマホブラウザはPC向けサイトとして縮小表示してしまいます。この1行があることで「デバイスの幅を基準に表示する」と指定でき、メディアクエリが正しく機能するようになります。Next.js・Viteなどのフレームワークは多くの場合デフォルトで含んでいますが、確認は必須です。",
  },
  {
    id: "responsive-q2",
    question: "モバイルファーストの書き方として正しいのはどれ？",
    choices: [
      "@media (max-width: 767px) { ... } でスマホ向けスタイルを上書きする",
      "スマホのスタイルをデフォルトで書き、@media (min-width: 768px) { ... } でPC向けを追加する",
      "PC向けスタイルを先に書いて、スマホはCSSを書かない",
      "JavaScriptでwindow.innerWidthを測ってCSSを切り替える",
    ],
    correctIndex: 1,
    explanation:
      "モバイルファーストとは「スマホ（最小サイズ）のスタイルをデフォルトとして書き、大きい画面向けの追加だけを上書きする」アプローチです。`min-width` を使うことで「この幅以上になったら追加のCSSを適用する」という積み上げ方式になります。逆に `max-width` を使うのはデスクトップファーストで旧来の書き方です。",
  },
  {
    id: "responsive-q3",
    question: "@media (min-width: 768px) の意味として正しいのはどれ？",
    choices: [
      "画面幅が768px以下のときに適用する",
      "画面幅が768px以上のときに適用する",
      "画面幅がちょうど768pxのときだけ適用する",
      "フォントサイズが768px以上のときに適用する",
    ],
    correctIndex: 1,
    explanation:
      "`min-width: 768px` は「最小幅が768px」という条件で、768px以上の画面に適用されます。逆に `max-width: 767px` は「767px以下」の場合に適用されます。モバイルファーストでは `min-width` を使って「この幅以上になったらこのスタイルを追加する」という積み上げ方式で書きます。",
  },
  {
    id: "responsive-q4",
    question: "ブレークポイントを設定する際の考え方として正しいのはどれ？",
    choices: [
      "iPhone・iPad・MacBookのサイズに合わせて設定する",
      "コンテンツが崩れ始める幅に合わせて設定する",
      "500px・1000px・1500pxの3点に統一する",
      "ピクセル数は開発者の好みで設定してよい",
    ],
    correctIndex: 1,
    explanation:
      "ブレークポイントは「コンテンツが崩れ始める幅」に合わせて設定するのが理想です。特定のデバイスのサイズに合わせると、デバイスの種類が増えるたびに設定を増やす必要があります。実際には768pxと1024pxが多くのケースで使われますが、これは特定デバイスに依存しているからではなく、コンテンツがちょうど崩れる幅に偶然合っているためです。",
  },
  {
    id: "responsive-q5",
    question: "Tailwind CSSでタブレット（768px）以上のときだけ要素を横並びにするクラスの書き方はどれ？",
    choices: [
      "class='flex md:block'",
      "class='block md:flex'",
      "class='responsive-flex'",
      "class='sm:flex-row'",
    ],
    correctIndex: 1,
    explanation:
      "Tailwind CSSはモバイルファーストで設計されているため、プレフィックスなしのクラスがスマホ（全画面幅）に適用され、`md:` プレフィックスが768px以上に適用されます。`block md:flex` はスマホでblock（縦積み）、768px以上でflex（横並び）になります。TailwindはCSSのブレークポイントをクラス名で直感的に書けるようにしたフレームワークです。",
  },
];
