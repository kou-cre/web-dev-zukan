import type { DrillQuestion } from "@/components/PageDrill";

export const metadataApiQuestions: DrillQuestion[] = [
  {
    id: "metadata-api-q1",
    question: "Next.js App Router で静的なメタデータを設定する方法として正しいのはどれですか？",
    choices: [
      "useEffect の中で document.title を更新する",
      "page.tsx から export const metadata = {...} をエクスポートする",
      "_document.tsx の <Head> コンポーネントにタグを書く",
      "next.config.js の headers 設定でメタタグを追加する",
    ],
    correctIndex: 1,
    explanation:
      "App Router では page.tsx や layout.tsx から `export const metadata = {...}` をエクスポートすることでメタタグを設定します。useEffect での document.title 操作は SSR で機能しないため推奨されません。_document.tsx は Pages Router の概念です。",
  },
  {
    id: "metadata-api-q2",
    question: "URL のパラメータを使って動的にメタデータを生成したい場合、どの関数を使いますか？",
    choices: [
      "getStaticProps",
      "useMetadata カスタムフック",
      "generateMetadata 関数",
      "export const metadata に関数を渡す",
    ],
    correctIndex: 2,
    explanation:
      "動的なメタデータ生成には generateMetadata 関数を使います。この関数は params（URLパラメータ）や searchParams を引数に受け取り、非同期で DB やAPIにアクセスしてメタデータを返すことができます。getStaticProps は Pages Router の概念、metadata に関数を渡すことはできません。",
  },
  {
    id: "metadata-api-q3",
    question: "layout.tsx と page.tsx 両方に metadata を書いた場合、どちらが優先されますか？",
    choices: [
      "layout.tsx が常に優先される",
      "page.tsx が常に優先され、layout.tsx の設定は無視される",
      "page.tsx の設定が layout.tsx を上書きし、page.tsx に書いていないフィールドは layout.tsx の値が使われる",
      "両方の metadata がマージされ、重複するフィールドはエラーになる",
    ],
    correctIndex: 2,
    explanation:
      "Next.js の Metadata は階層的にマージされます。page.tsx の設定が layout.tsx の設定を上書きしますが、page.tsx に書いていないフィールドは layout.tsx の値が引き継がれます。たとえば layout.tsx に description を書き、page.tsx に title だけ書いた場合、そのページは page.tsx の title と layout.tsx の description を使います。",
  },
  {
    id: "metadata-api-q4",
    question: "layout.tsx に title.template: '%s | Web開発図解' と設定したとき、page.tsx で title: 'メタタグ' と書いた場合、実際のタイトルはどうなりますか？",
    choices: [
      "メタタグ",
      "メタタグ | Web開発図解",
      "Web開発図解 | メタタグ",
      "%s | Web開発図解",
    ],
    correctIndex: 1,
    explanation:
      "title.template の %s は page.tsx で設定した title の値に置き換わります。template が '%s | Web開発図解' で、page.tsx の title が 'メタタグ' の場合、実際のタイトルは 'メタタグ | Web開発図解' になります。サイト名を一箇所で管理できる便利な機能です。",
  },
  {
    id: "metadata-api-q5",
    question: "'use client' ディレクティブを持つファイルで metadata を export しようとすると何が起きますか？",
    choices: [
      "正常に動作する（Client Component でもメタデータを設定できる）",
      "ビルドエラーまたは警告が出て、メタデータが適用されない",
      "ページのタイトルだけ設定され、OGP タグは無視される",
      "自動的に Server Component に変換される",
    ],
    correctIndex: 1,
    explanation:
      "metadata と generateMetadata は Server Component 専用の機能です。'use client' ディレクティブがあるファイルでは使えません。ビルドエラーまたは警告が発生し、メタデータは適用されません。解決策は、インタラクティブな部分だけを Client Component として切り出し、page.tsx 自体は Server Component のままにすることです。",
  },
];
