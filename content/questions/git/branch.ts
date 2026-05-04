import type { DrillQuestion } from "@/components/PageDrill";

export const branchQuestions: DrillQuestion[] = [
  {
    id: "branch-q1",
    question:
      "次のコマンド `git switch -c feature/login` を実行したとき、何が起こるか？",
    choices: [
      "feature/login ブランチに切り替えるだけ（ブランチはすでに存在する前提）",
      "feature/login という名前の新しいブランチを作成し、同時にそのブランチに切り替える",
      "現在のブランチを feature/login にリネームする",
      "feature/login ブランチをリモートからフェッチして切り替える",
    ],
    correctIndex: 1,
    explanation:
      "`-c` フラグは「create（作成）」の意味。`git switch -c <ブランチ名>` は「新しいブランチを作りながら切り替える」ワンライナーコマンド。ブランチを作るだけなら `git branch <名前>`、切り替えるだけなら `git switch <名前>` と分けて書いても同じ結果になる。",
  },
  {
    id: "branch-q2",
    question:
      "Fast-forward merge とはどのような状態・操作のことか？",
    choices: [
      "マージ元とマージ先が同じコミットを持っているため、何もしなくてよい状態",
      "マージ先ブランチが分岐後に新しいコミットを持っていないため、HEADを単純に先に進めるだけでよいマージ",
      "コンフリクトが発生せず、自動でマージが完了すること",
      "スカッシュ（squash）してコミットを1つにまとめてからマージすること",
    ],
    correctIndex: 1,
    explanation:
      "Fast-forward は「早送り」の意味。main ブランチが分岐してから新しいコミットを積んでいない場合、feature ブランチのコミット列をそのまま main の先に並べるだけでよく、余分なマージコミットが生まれない。一方 `--no-ff` を付けると、マージコミットを強制的に作ることができ、「どこかでブランチをマージした」という記録が履歴に残る。",
  },
  {
    id: "branch-q3",
    question:
      "`git merge --no-ff feature/xxx` の `--no-ff` オプションの目的として最も正しいのはどれ？",
    choices: [
      "マージを強制的にキャンセルするオプション",
      "コンフリクトを自動解消するオプション",
      "Fast-forwardが可能な場合でも必ずマージコミットを作り、ブランチの合流を履歴に明示するオプション",
      "リモートリポジトリに直接プッシュするオプション",
    ],
    correctIndex: 2,
    explanation:
      "no-ff は「no fast-forward（早送りしない）」の略。Fast-forwardが可能な場面でも、あえてマージコミットを作ることで「このブランチはここでマージされた」という合流ポイントが履歴上に明確に残る。チーム開発やPRマージ後の追跡がしやすくなり、`git log --graph` でブランチの流れが可視化できる。",
  },
  {
    id: "branch-q4",
    question:
      "ローカルで `git branch -d feature/login` を実行したが、エラーが出た。最も考えられる原因はどれ？",
    choices: [
      "feature/login ブランチがリモートにも存在するため、ローカルから削除できない",
      "feature/login ブランチがまだ現在のブランチ（例: main）にマージされていないため、安全装置が働いている",
      "ブランチ名に `/` が含まれているため、削除できない",
      "削除するにはまず `git fetch --prune` を実行する必要がある",
    ],
    correctIndex: 1,
    explanation:
      "`git branch -d` は「マージ済みブランチのみ削除」する安全なコマンド。まだマージされていないブランチを削除しようとするとエラーになる。強制削除したい（マージ前でも消す）場合は `-D`（大文字）を使う。リモートブランチの削除は `git push origin --delete feature/login` で行う。",
  },
  {
    id: "branch-q5",
    question:
      "「detached HEAD 状態」とはどのような状態か？",
    choices: [
      "HEADがリモートブランチを追跡していない状態",
      "HEADがブランチ名ではなく特定のコミットハッシュを直接指している状態",
      "ブランチが削除されて、HEADが宙ぶらりんになった状態",
      "git stash を使って変更を退避させた状態",
    ],
    correctIndex: 1,
    explanation:
      "通常 HEAD は「ブランチ名」を介して最新コミットを指す。しかし `git checkout <コミットハッシュ>` などを実行すると、HEADがブランチ名を経由せずコミットを直接指す「detached HEAD（切り離されたHEAD）」状態になる。この状態で新しいコミットをしても、ブランチが指していないため後から迷子になりやすい。ブランチを切ってから作業するか、`git switch -` で元のブランチに戻るのが安全。",
  },
];
