import type { DrillQuestion } from "@/components/PageDrill";

export const semanticQuestions: DrillQuestion[] = [
  {
    id: "semantic-q1",
    question: "セマンティックHTMLの説明として正しいのはどれ？",
    choices: [
      "見た目を綺麗にするためのHTMLの書き方",
      "タグに意味を持たせることで構造を明確にするHTMLの書き方",
      "JavaScriptと連携するための特別なHTMLの記法",
      "CSSを使わなくてもスタイルが当たるHTMLの書き方",
    ],
    correctIndex: 1,
    explanation:
      "セマンティックHTMLとは、タグに「意味」を持たせる書き方です。<div> はただの「意味のない箱」ですが、<header> や <main> はそのブロックの役割を示します。これにより人間にも検索エンジンにもスクリーンリーダーにも構造が伝わります。見た目はCSSが担当し、意味はHTMLが担当するのが役割分担の基本です。",
  },
  {
    id: "semantic-q2",
    question: "1つのHTMLページに1つだけ配置するルールがあるタグはどれ？",
    choices: [
      "<header>",
      "<footer>",
      "<main>",
      "<section>",
    ],
    correctIndex: 2,
    explanation:
      "<main> は「そのページの主要コンテンツ」を表すタグで、1ページに1つだけ配置するルールがあります。<header> と <footer> は複数置けます（ページ全体のものとセクション内のものを分けることができる）。<section> は必要な数だけ使えます。",
  },
  {
    id: "semantic-q3",
    question: "<article> と <section> の使い分けとして正しいのはどれ？",
    choices: [
      "<article> はスタイリング目的、<section> は意味のある区分けに使う",
      "<article> は独立して意味が通じるコンテンツ、<section> はページ内のテーマ別まとまりに使う",
      "<article> はリスト表示、<section> はグリッド表示に使う",
      "<article> はPC向け、<section> はスマホ向けに使う",
    ],
    correctIndex: 1,
    explanation:
      "判断のコツは「他のサイトに転載しても意味が通じるか」です。ブログ記事・ニュース・製品レビューは独立して意味が成立するので <article>。「特徴」「料金」「FAQ」などはそのページの中のまとまりなので <section> です。<section> には基本的に見出し（h2〜h6）を持つことが推奨されます。",
  },
  {
    id: "semantic-q4",
    question: "ナビゲーションリンクをまとめる場合に使うべきタグはどれ？",
    choices: [
      "<menu>",
      "<div class='nav'>",
      "<nav>",
      "<ul class='navigation'>",
    ],
    correctIndex: 2,
    explanation:
      "<nav> はナビゲーションリンクの集まりを表すセマンティックタグです。<div class='nav'> はクラス名で人間には伝わりますが、ブラウザや検索エンジンには意味が伝わりません。スクリーンリーダーはページ内の <nav> を検索してユーザーがジャンプできるようにします。ナビゲーション以外のリンク集（たとえば記事内の関連リンク）には <nav> を使わなくてよいです。",
  },
  {
    id: "semantic-q5",
    question: "スタイリング目的だけのラッパー要素を作る場合、最も適切なタグはどれ？",
    choices: [
      "<section>",
      "<article>",
      "<div>",
      "<span class='wrapper'>",
    ],
    correctIndex: 2,
    explanation:
      "意味のないグルーピングやスタイリング目的のラッパーには <div> を使うのが正しい選択です。<section> はテーマ別まとまりに意味を持たせるタグで、スタイリング目的には適しません。セマンティックタグを意味なく使うと逆にHTML構造が混乱します。「意味が必要 → セマンティックタグ、見た目だけ → div」が判断基準です。",
  },
];
