import type { DrillQuestion } from "@/components/PageDrill";

export const terminalQuestions: DrillQuestion[] = [
  {
    id: "terminal-q1",
    question: "ls コマンドは何をするためのコマンドか？",
    choices: [
      "指定したフォルダに移動する",
      "今いるフォルダの中にあるファイルとフォルダを一覧表示する",
      "新しいフォルダを作成する",
      "今いる場所のパス（住所）を表示する",
    ],
    correctIndex: 1,
    explanation:
      "ls は list の略で、今いるフォルダ（カレントディレクトリ）の中身を一覧表示します。GUIでフォルダをダブルクリックして中身を見るのと同じ操作です。ls -la とオプションを付けると隠しファイル（.gitignore など）も含めて詳細情報（権限・サイズ・日時）と共に表示できます。",
  },
  {
    id: "terminal-q2",
    question: "pwd コマンドを実行したとき、何が表示されるか？",
    choices: [
      "前にいたフォルダのパス",
      "今いるフォルダ（カレントディレクトリ）の絶対パス",
      "フォルダの中にあるファイルの数",
      "ディスクの空き容量",
    ],
    correctIndex: 1,
    explanation:
      "pwd は print working directory の略で、今いるフォルダの完全な絶対パスを表示します。たとえば /Users/maji/Documents/project のように表示されます。ターミナルで迷子になったとき、まず pwd で現在地を確認するのが基本です。",
  },
  {
    id: "terminal-q3",
    question: "cd .. を実行すると何が起きるか？",
    choices: [
      "ホームディレクトリに戻る",
      "1つ上のフォルダ（親ディレクトリ）に移動する",
      "2つ上のフォルダに移動する",
      "ドットで始まる隠しフォルダに移動する",
    ],
    correctIndex: 1,
    explanation:
      "..（ドット2つ）は1つ上のフォルダ（親ディレクトリ）を表します。cd .. で1階層上に移動できます。../../ で2階層上、../project で1つ上に戻ってからprojectに入る、といった使い方もできます。. （ドット1つ）は今いる場所（カレントディレクトリ）を表します。",
  },
  {
    id: "terminal-q4",
    question: "/Users/maji/project という表記について正しい説明はどれ？",
    choices: [
      "相対パスで、今いる場所からの位置を示している",
      "絶対パスで、ルートディレクトリ（/）から始まる完全な住所",
      "ネットワーク上のサーバーのアドレス",
      "Gitリポジトリのパス形式",
    ],
    correctIndex: 1,
    explanation:
      "/ から始まるパスは絶対パスです。ルートディレクトリ（全フォルダの起点）から始まる完全な住所で、どこから実行しても同じ場所を指します。一方、./project や ../Documents のような ./ や ../ から始まるパスは相対パスで、今いる場所からの相対的な位置を示します。",
  },
  {
    id: "terminal-q5",
    question: "mkdir と touch の違いとして正しいのはどれ？",
    choices: [
      "mkdir はファイルを作成し、touch はフォルダを作成する",
      "mkdir はフォルダ（ディレクトリ）を作成し、touch は空のファイルを作成する",
      "mkdir はMac専用コマンドで、touch はWindows専用コマンド",
      "どちらも同じことをするコマンドで、どちらを使っても同じ結果になる",
    ],
    correctIndex: 1,
    explanation:
      "mkdir（make directory）はフォルダを作成するコマンド。touch はもともとファイルのタイムスタンプを更新するコマンドですが、ファイルが存在しない場合は空のファイルを新規作成します。たとえば mkdir src でsrcフォルダを作り、touch src/index.ts でsrc内に空のindex.tsを作れます。",
  },
];
