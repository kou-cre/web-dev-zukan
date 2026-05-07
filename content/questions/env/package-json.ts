import type { DrillQuestion } from "@/components/PageDrill";

export const packageJsonQuestions: DrillQuestion[] = [
  {
    id: "package-json-q1",
    question: "package.json の dependencies と devDependencies の違いとして正しいのはどれ？",
    choices: [
      "どちらに入れても全く同じで、区別する必要はない",
      "dependencies は本番環境でも必要なパッケージ、devDependencies は開発・ビルド時だけ必要なパッケージ",
      "dependencies はフロントエンド向け、devDependencies はバックエンド向け",
      "dependencies はGitHub公開用、devDependencies はローカルのみ",
    ],
    correctIndex: 1,
    explanation:
      "判断基準は『リリース後のアプリが動くために必要か？』です。react・next・firebase など本番でも必要なものは dependencies、typescript・eslint・prettier などビルドや開発時だけ使うものは devDependencies に入れます。間違えてもアプリが動かなくなることは少ないですが、本番ビルドのファイルサイズに影響するため正しく区別することが重要です。",
  },
  {
    id: "package-json-q2",
    question: "npm run dev を実行したとき、実際に何が起きるか正しいのはどれ？",
    choices: [
      "node_modules/dev というフォルダを実行する",
      "package.json の scripts.dev に書かれたコマンド（例: next dev）が実行される",
      "devDependencies に書かれたパッケージを全てインストールする",
      "development モードでnpmを起動する",
    ],
    correctIndex: 1,
    explanation:
      "npm run の後に書くのは scripts のキー名です。npm run dev と打つと package.json の scripts オブジェクトの dev というキーに書かれたコマンドが実行されます。たとえば dev: 'next dev' と書いてあれば next dev が実行されます。長いコマンドに短い別名をつける仕組みです。",
  },
  {
    id: "package-json-q3",
    question: "package.json で依存パッケージのバージョンが '^1.2.3' と書かれているとき、インストールされる可能性があるバージョンはどれか？",
    choices: [
      "1.2.3 だけ（完全に固定）",
      "1.x.x の最新（マイナー・パッチのアップデートを許容、メジャーは固定）",
      "x.x.x の最新（全バージョンを許容）",
      "1.2.x の最新（パッチのみ許容）",
    ],
    correctIndex: 1,
    explanation:
      "^ （キャレット）はメジャーバージョンを固定して、マイナーとパッチのアップデートを許容します。^1.2.3 は 1.x.x の最新（ただし2.0.0以上は使わない）を意味します。~ （チルダ）はさらに厳しく、パッチのみ許容（~1.2.3 は 1.2.x の最新）。記号なしの 1.2.3 は完全固定です。",
  },
  {
    id: "package-json-q4",
    question: "package-lock.json をGitで管理すべき理由として正しいのはどれ？",
    choices: [
      "GitHubが package-lock.json の管理を必須としているため",
      "実際にインストールされたバージョンを記録しており、チームで同じ環境を再現するために必要",
      "package.json より優先されるため、これだけあれば package.json は不要",
      "package-lock.json を管理しないとnpmが正常に動作しないため",
    ],
    correctIndex: 1,
    explanation:
      "package.json の ^ や ~ はバージョン範囲の指定なので、タイミングによって取得されるバージョンが変わる可能性があります。package-lock.json は『そのときインストールした正確なバージョン』を記録するため、チームメンバーが npm ci（ロックファイルに従う厳格なインストール）を使えば全員が同じ環境を再現できます。.gitignore に追加してはいけません。",
  },
  {
    id: "package-json-q5",
    question: "typescript パッケージを devDependencies に追加するコマンドとして正しいのはどれ？",
    choices: [
      "npm install typescript",
      "npm install --save-dev typescript",
      "npm install --production typescript",
      "npm add dev typescript",
    ],
    correctIndex: 1,
    explanation:
      "--save-dev フラグを付けると devDependencies に追加されます。フラグなしの npm install typescript は dependencies に追加されます。TypeScript は開発・ビルド時のみ使うツールなので devDependencies が正しい配置です。npm install --save-dev は省略形として npm install -D とも書けます。",
  },
];
