import type { DrillQuestion } from "@/components/PageDrill";

export const nodejsQuestions: DrillQuestion[] = [
  {
    id: "nodejs-q1",
    question: "Node.js とは何か、最も正しく説明しているのはどれ？",
    choices: [
      "ブラウザに内蔵されているJavaScriptの実行エンジン",
      "JavaScriptをブラウザの外（サーバーやターミナル）で動かすための実行環境",
      "npm のパッケージを管理するためのフレームワーク",
      "Reactを動かすためだけに存在するライブラリ",
    ],
    correctIndex: 1,
    explanation:
      "Node.jsはJavaScriptをブラウザの外で動かすための実行環境です。これのおかげで、JSはブラウザのフロントエンドだけでなく、ターミナルでのコマンド実行・サーバー・ビルドツールにも使えるようになりました。ブラウザに内蔵されているのはV8などのJSエンジンで、Node.jsはV8を使って独立した実行環境を作っています。",
  },
  {
    id: "nodejs-q2",
    question: "npm install コマンドを実行したとき、何が起きるか正しいのはどれ？",
    choices: [
      "package.json の scripts.install を実行する",
      "package.json の dependencies と devDependencies に書かれたパッケージを、npmjs.com から取得してnode_modulesに保存する",
      "node_modules フォルダを削除して再作成する",
      "Gitリポジトリを初期化する",
    ],
    correctIndex: 1,
    explanation:
      "npm install を実行すると、package.json に書かれた dependencies と devDependencies の一覧を読み込み、npmjs.com（npm Registry）から必要なパッケージをダウンロードして node_modules フォルダに展開します。package.json が材料リスト、node_modules が材料の置き場所というイメージです。",
  },
  {
    id: "nodejs-q3",
    question: "node_modules フォルダをGitHubにアップロードしてはいけない主な理由として正しいのはどれ？",
    choices: [
      "node_modules は機密情報なので公開できない",
      "サイズが巨大になり、かつpackage.jsonさえあれば誰でも npm install で再現できるため不要",
      "GitHubが node_modules 形式のフォルダの受け取りを拒否するため",
      "node_modules の中身は暗号化されていてGitでは管理できないため",
    ],
    correctIndex: 1,
    explanation:
      "node_modules は数百MBにもなることがあり、GitHubにアップロードすると重くなります。また、package.json（と package-lock.json）さえあれば誰でも npm install 一発で同じ環境を再現できるため、材料そのものを共有する必要がありません。.gitignoreに node_modules/ を追加することで除外できます。",
  },
  {
    id: "nodejs-q4",
    question: "dependencies と devDependencies の違いとして正しいのはどれ？",
    choices: [
      "依存関係なのでどちらに入れても全く変わらない",
      "dependencies は開発中のみ使用、devDependencies は本番でも使用するパッケージ",
      "dependencies は本番環境でも必要なパッケージ（react等）、devDependencies は開発時だけ必要なパッケージ（eslint等）",
      "dependencies はフロントエンド用、devDependencies はバックエンド用",
    ],
    correctIndex: 2,
    explanation:
      "dependencies はリリース後のWebアプリが動くために必要なパッケージ（react・next・firebase など）。devDependencies は開発・ビルド時だけ使うパッケージ（typescript・eslint・prettier など）。判断基準は『リリース後のアプリが動くために必要か？』。間違えてもアプリは動くことが多いですが、本番ビルドのサイズに影響します。",
  },
  {
    id: "nodejs-q5",
    question: "package.json が存在していれば node_modules がなくても、他の開発者がプロジェクトを再現できる理由はどれ？",
    choices: [
      "GitHubが自動的にnode_modulesを補完してくれるから",
      "npm install を実行すると package.json の依存関係を読んで同じパッケージをインストールできるから",
      "ブラウザがpackage.jsonを自動解釈して必要なパッケージを取得するから",
      "Node.jsに全パッケージが内蔵されているから",
    ],
    correctIndex: 1,
    explanation:
      "npm install を実行すると、package.json に書かれた dependencies と devDependencies を読んで、npmjs.com から同じパッケージを取得します。材料リスト（package.json）を共有すれば、材料そのもの（node_modules）は各自が取り寄せられます。さらに package-lock.json があれば正確に同じバージョンを再現できます。",
  },
];
