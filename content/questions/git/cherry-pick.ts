import type { DrillQuestion } from "@/components/PageDrill";

export const cherryPickQuestions: DrillQuestion[] = [
  {
    id: "cherry-pick-q1",
    question:
      "`git cherry-pick abc1234` を実行したとき、何が起こるか？",
    choices: [
      "ハッシュ abc1234 のコミットが作られたブランチ全体を、今いるブランチにマージする",
      "ハッシュ abc1234 のコミットの変更内容だけを、今いるブランチに新しいコミットとして追加する",
      "ハッシュ abc1234 のコミットまで、今いるブランチの歴史を巻き戻す",
      "ハッシュ abc1234 のコミットを削除する",
    ],
    correctIndex: 1,
    explanation:
      "cherry-pick は「指定したコミット1つの変更だけ」を今いるブランチに適用するコマンド。ブランチ全体をマージするわけでも、履歴を巻き戻すわけでもない。適用後は元のコミットとは別のハッシュを持つ新しいコミットが生まれる（変更内容は同じだが、ハッシュは異なる）。",
  },
  {
    id: "cherry-pick-q2",
    question:
      "cherry-pick したいコミットのハッシュを調べるとき、最もよく使うコマンドはどれ？",
    choices: [
      "git status",
      "git log --oneline",
      "git diff HEAD",
      "git stash list",
    ],
    correctIndex: 1,
    explanation:
      "`git log --oneline` は各コミットを「短縮ハッシュ + コミットメッセージ」の1行形式で表示するコマンド。cherry-pick したいコミットを素早く特定できる。表示されたハッシュ（例: abc1234）を `git cherry-pick abc1234` に渡すのが定石。`git status` は作業ツリーの状態、`git diff HEAD` は未コミットの差分を確認するコマンドなので目的が異なる。",
  },
  {
    id: "cherry-pick-q3",
    question:
      "cherry-pick を実行したとき「同じ変更が2つのブランチに存在する」状態になる。これについて正しい説明はどれ？",
    choices: [
      "ハッシュが同じコミットが2か所に存在するため、後で merge しても重複にはならない",
      "ハッシュは異なるが変更内容は同じコミットが生まれる。後で同じブランチを merge するとコンフリクトが起きる場合がある",
      "cherry-pick すると元のコミットは自動的に削除されるので重複は起きない",
      "2つのブランチで同じ変更が存在しても、Git は自動的に1つにまとめてくれる",
    ],
    correctIndex: 1,
    explanation:
      "cherry-pick は元のコミットをそのままコピーするのではなく、「同じ変更を持つ新しいコミット」を作る。そのため元コミットのハッシュとは異なる別のハッシュが割り振られる。後で元のブランチごと merge すると「同じ変更が2回適用される」という状態になりコンフリクトが発生することがある。cherry-pick は一時的・外科的な対処法と理解しておくのが重要。",
  },
  {
    id: "cherry-pick-q4",
    question:
      "cherry-pick でコンフリクトが発生した。正しい対処手順はどれ？",
    choices: [
      "コンフリクトしたファイルを修正 → git commit → git cherry-pick --continue",
      "コンフリクトしたファイルを修正 → git add <ファイル> → git cherry-pick --continue",
      "git cherry-pick --skip を実行してコンフリクトをスキップする",
      "git merge --abort を実行してコンフリクトを解消する",
    ],
    correctIndex: 1,
    explanation:
      "cherry-pick 中のコンフリクト解消手順は「修正 → git add → git cherry-pick --continue」の3ステップ。git add でステージに上げることが必須で、これを忘れると --continue を実行してもエラーになる。作業を中止したい場合は `git cherry-pick --abort` で元の状態に戻れる。`git merge --abort` は merge コマンド用なので cherry-pick には使えない。",
  },
  {
    id: "cherry-pick-q5",
    question:
      "cherry-pick ではなく merge を選ぶべき状況はどれ？",
    choices: [
      "develop ブランチで行ったバグ修正1件だけを、緊急で main にも反映したい",
      "誤ったブランチに入れてしまったコミット1件を、正しいブランチに移したい",
      "feature ブランチで行った一連の機能開発をすべて main に取り込みたい",
      "実験ブランチで試した変更のうち、一部だけを本番ブランチに持ち込みたい",
    ],
    correctIndex: 2,
    explanation:
      "「ブランチ全体の変更を取り込みたい」という場面は merge の出番。cherry-pick は「特定コミット1件（または数件）だけを持ち込む」外科的な操作で、ブランチ全体を取り込む用途には向かない。feature ブランチの全コミットを main に取り込むなら `git merge feature` か Pull Request を使う。cherry-pick を多用すると重複コミットで履歴が複雑になるので、ブランチ全体が必要な場合は素直に merge を選ぶのが正解。",
  },
];
