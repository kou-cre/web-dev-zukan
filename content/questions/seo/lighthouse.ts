import type { DrillQuestion } from "@/components/PageDrill";

export const lighthouseQuestions: DrillQuestion[] = [
  {
    id: "lighthouse-q1",
    question: "Lighthouse の4つのスコアカテゴリとして正しい組み合わせはどれですか？",
    choices: [
      "Performance・Security・SEO・Mobile",
      "Performance・Accessibility・SEO・Best Practices",
      "Speed・Accessibility・Content・Best Practices",
      "Performance・UX・SEO・Code Quality",
    ],
    correctIndex: 1,
    explanation:
      "Lighthouse が測定する4つのカテゴリは Performance（ページ表示速度）・Accessibility（アクセシビリティ対応）・SEO（検索エンジン対応）・Best Practices（Web標準・セキュリティへの適合）です。Security は Best Practices の中で部分的に評価されます。",
  },
  {
    id: "lighthouse-q2",
    question: "LCP（Largest Contentful Paint）が測定しているのは何ですか？",
    choices: [
      "ページ内の最も小さな要素が描画されるまでの時間",
      "JavaScriptの実行が完了するまでの時間",
      "ページ内で最も大きなコンテンツ要素（ヒーロー画像・大見出しなど）が描画されるまでの時間",
      "ページ全体の読み込みが完了するまでの時間",
    ],
    correctIndex: 2,
    explanation:
      "LCP は「Largest Contentful Paint」の略で、ページ内で最も大きなコンテンツ要素（多くの場合ヒーロー画像や大きな見出し）が描画されるまでの時間を測ります。ユーザーが「ページが表示された」と感じるタイミングに近い指標です。目標は 2.5 秒以内です。",
  },
  {
    id: "lighthouse-q3",
    question: "次のうち、Lighthouse の Performance スコアを改善する効果が高い対応として最も適切なのはどれですか？",
    choices: [
      "HTML のコメントをすべて削除する",
      "画像を WebP 形式に変換し、next/image コンポーネントを使って最適化する",
      "ページの背景色を白にする",
      "JavaScript ファイルの変数名を短くする",
    ],
    correctIndex: 1,
    explanation:
      "画像の最適化（WebP 変換・適切なサイズへのリサイズ・遅延読み込み）は Performance スコアを改善する最も効果的な方法の一つです。Next.js では next/image コンポーネントを使うだけでこれらが自動化されます。HTMLコメント削除やファイル名変更は効果がほぼありません。",
  },
  {
    id: "lighthouse-q4",
    question: "Lighthouse のスコアについて正しい説明はどれですか？",
    choices: [
      "スコアが 100 なら必ず検索順位1位になる",
      "スコアは0〜100で評価され、90以上が良好。100 を追求することが常に最優先とは限らない",
      "Performance スコアは検索順位と関係がない",
      "ローカル開発環境（localhost）で計測した結果がそのまま本番環境に適用される",
    ],
    correctIndex: 1,
    explanation:
      "Lighthouse スコアは 0〜100 で評価され、90 以上が「良好（緑）」です。90 以上あればユーザー体験として十分で、100 を追求するより機能開発や他の改善にリソースを使う方がビジネス価値が高い場合もあります。また、ローカル環境と本番環境ではネットワーク・HTTPS・CDN の有無などが異なるため、必ず本番 URL で計測する必要があります。",
  },
  {
    id: "lighthouse-q5",
    question: "Lighthouse を Chrome DevTools で実行するとき、より安定した結果を得るための方法として正しいのはどれですか？",
    choices: [
      "通常のウィンドウで、ブラウザ拡張機能をすべて有効にした状態で実行する",
      "シークレットウィンドウで実行するか、CLI（lighthouse コマンド）を使い、本番 URL で計測する",
      "ローカル開発環境（localhost:3000）で実行するのが最も正確な結果になる",
      "スコアは毎回同じ値が出るため、1回の計測で十分",
    ],
    correctIndex: 1,
    explanation:
      "Lighthouse の計測結果はブラウザ拡張機能や開発ツールの影響を受けることがあります。シークレットウィンドウで実行するか、CLI（npm i -g lighthouse）を使うとより安定します。また、ローカル環境は本番環境とネットワーク・最適化設定が異なるため、本番 URL での計測が重要です。スコアはネットワーク状況により変動するため、3回計測して平均を見るのが推奨です。",
  },
];
