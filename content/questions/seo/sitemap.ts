import type { DrillQuestion } from "@/components/PageDrill";

export const sitemapQuestions: DrillQuestion[] = [
  {
    id: "sitemap-q1",
    question: "sitemap.xml の主な役割として正しいのはどれですか？",
    choices: [
      "ページのデザインをクローラーに伝えるためのファイル",
      "サイト内の全ページの URL 一覧を検索エンジンに提供するためのファイル",
      "クローラーのアクセスを禁止するためのファイル",
      "ページの読み込み速度をキャッシュするためのファイル",
    ],
    correctIndex: 1,
    explanation:
      "sitemap.xml はサイト内のページ URL 一覧を XML 形式で記述し、検索エンジンのクローラーに提供するファイルです。クローラーはこれを参照してどのページを巡回すべきかを把握します。アクセス制限は robots.txt の役割です。",
  },
  {
    id: "sitemap-q2",
    question: "robots.txt に「Disallow: /admin/」と書いた場合、どうなりますか？",
    choices: [
      "/admin/ 以下のページが検索結果から削除される",
      "Google などの検索エンジンクローラーが /admin/ にアクセスしないようになる",
      "/admin/ ページへの一般ユーザーのアクセスがブロックされる",
      "/admin/ の CSS と JS ファイルのダウンロードが禁止される",
    ],
    correctIndex: 1,
    explanation:
      "robots.txt の Disallow はクローラーへの紳士協定です。Google などの主要な検索エンジンクローラーはこれに従い、/admin/ にアクセスしません。ただし一般ユーザーのアクセスはブロックしません（それは認証の役割）。悪意のあるボットは無視する場合もあります。",
  },
  {
    id: "sitemap-q3",
    question: "Next.js App Router で sitemap.xml を自動生成するには何をすればよいですか？",
    choices: [
      "next.config.js の sitemap オプションを有効にする",
      "app/sitemap.ts ファイルを作成し、MetadataRoute.Sitemap 型のデータを return する関数を export する",
      "public/sitemap.xml ファイルを手動で作成する",
      "next-sitemap パッケージを必ずインストールする必要がある",
    ],
    correctIndex: 1,
    explanation:
      "Next.js App Router では app/sitemap.ts（または sitemap.js）を作成することで、/sitemap.xml のルートが自動生成されます。MetadataRoute.Sitemap 型の配列を return する関数を export するだけです。next-sitemap パッケージは追加の設定が必要な場合の選択肢の一つですが、App Router 組み込みの方法なら不要です。",
  },
  {
    id: "sitemap-q4",
    question: "robots.txt の「User-agent: *」が意味することはどれですか？",
    choices: [
      "サイトに来るすべてのユーザー（人間）を対象にしたルール",
      "Googlebot にのみ適用するルール",
      "すべてのクローラー（ロボット）を対象にしたルール",
      "ログインしていないユーザーを対象にしたルール",
    ],
    correctIndex: 2,
    explanation:
      "robots.txt の User-agent はクローラーの種類を指定します。「*」はワイルドカードで「すべてのクローラー」を意味します。Google 専用のルールを書く場合は「User-agent: Googlebot」と書きます。人間のユーザーには関係ありません。",
  },
  {
    id: "sitemap-q5",
    question: "sitemap.xml がなくても Google はページを発見できますか？",
    choices: [
      "できない。sitemap.xml がないページは絶対に検索結果に出ない",
      "できる。リンクを辿る巡回で発見できるが、孤立したページや新規ページのインデックスに時間がかかる可能性がある",
      "できる。URL を直接打ち込めばいつでも検索結果に出せる",
      "できない。現代の検索エンジンは sitemap.xml がないサイトをペナルティ対象にする",
    ],
    correctIndex: 1,
    explanation:
      "Google はリンクを辿る方法でも新しいページを発見できます。ただし、どこからもリンクされていない孤立したページは発見されにくく、また新しく追加されたページが検索結果に出るまでに時間がかかることがあります。sitemap.xml があるとクローラーへの「案内地図」になり、ページ発見とインデックスが速くなります。",
  },
];
