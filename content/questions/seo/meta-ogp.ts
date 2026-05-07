import type { DrillQuestion } from "@/components/PageDrill";

export const metaOgpQuestions: DrillQuestion[] = [
  {
    id: "meta-ogp-q1",
    question: "HTML の <title> タグの内容が表示される場所として正しいのはどれですか？",
    choices: [
      "ページの本文の先頭に表示される",
      "ブラウザのタブと検索エンジンの検索結果リンクに表示される",
      "SNS シェア時のカードのタイトルとして表示される",
      "ページのフッターに自動的に表示される",
    ],
    correctIndex: 1,
    explanation:
      "title タグの内容はブラウザのタブと、Google などの検索エンジンの検索結果リンクテキストとして表示されます。SNS シェア時のカードタイトルは og:title タグが使われます。ページ本文には表示されません。",
  },
  {
    id: "meta-ogp-q2",
    question: "meta description タグの役割として正しいのはどれですか？",
    choices: [
      "ページの SEO キーワードを検索エンジンに伝えるためのタグ",
      "SNS シェア時に表示されるカードの説明文を設定するタグ",
      "検索エンジンの検索結果に表示されるページの要約文を設定するタグ",
      "ページの著者情報を検索エンジンに伝えるタグ",
    ],
    correctIndex: 2,
    explanation:
      "meta description は検索エンジンの検索結果に表示されるスニペット（あらすじ）を設定します。推奨文字数は 120〜160 文字。SNS のカード説明文は og:description タグを使います。meta keywords は現代の SEO では無効化されており意味がありません。",
  },
  {
    id: "meta-ogp-q3",
    question: "OGP タグ（og:title・og:image など）を読み取るのは主に何ですか？",
    choices: [
      "ブラウザの描画エンジン",
      "SNS（X・Facebook・Slack など）のクローラー",
      "Google などの検索エンジンのクローラー",
      "ページを訪問するエンドユーザー",
    ],
    correctIndex: 1,
    explanation:
      "OGP タグは主に SNS のクローラーが読み取ります。X・Facebook・Slack・LINE などが URL を見つけたとき、そのページの <head> にある og:* タグを読んでシェアカードを生成します。検索エンジンは通常の title や meta description を主に使います。",
  },
  {
    id: "meta-ogp-q4",
    question: "og:image に指定する画像の推奨サイズはどれですか？",
    choices: [
      "400×300px（4:3）",
      "800×600px（4:3）",
      "1200×630px（1.91:1）",
      "1920×1080px（16:9）",
    ],
    correctIndex: 2,
    explanation:
      "og:image の推奨サイズは 1200×630px（アスペクト比 1.91:1）です。このサイズで作ると X・Facebook・Slack・LINE など主要 SNS で正しく表示されます。600×315px 未満は表示されないことがあり、1920×1080px は SNS のカード表示に対してサイズが大きすぎます。",
  },
  {
    id: "meta-ogp-q5",
    question: "title タグと og:title タグの関係について正しい説明はどれですか？",
    choices: [
      "og:title を設定すると title タグは不要になる",
      "title と og:title は必ず同じ内容にしなければならない",
      "title と og:title は読み手（検索エンジン vs SNS）が違うため、別々の内容にすることができる",
      "og:title を設定しても title タグを上書きしてしまうため、どちらか一方だけ書けばよい",
    ],
    correctIndex: 2,
    explanation:
      "title タグは検索エンジンとブラウザタブ向け、og:title は SNS クローラー向けです。読み手が異なるため、同じ内容でも異なる内容でも OK です。たとえば title を「ページ名 | サイト名」のフォーマットにしつつ、og:title は SNS でクリックされやすいキャッチコピーにするという使い分けができます。どちらか一方だけでよいというのは誤りで、両方設定することを推奨します。",
  },
];
