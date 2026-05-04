import type { DrillQuestion } from "@/components/PageDrill";

export const conflictQuestions: DrillQuestion[] = [
  {
    id: "conflict-q1",
    question:
      "コンフリクトマーカーのうち「自分のブランチ（HEAD）の変更内容」を示す区画はどれか？",
    choices: [
      "`<<<<<<< HEAD` から `=======` までの区画",
      "`=======` から `>>>>>>> feature/xxx` までの区画",
      "`>>>>>>> feature/xxx` より後の区画",
      "どちらの区画も区別なく混在している",
    ],
    correctIndex: 0,
    explanation:
      "コンフリクトマーカーは3つの記号で区切られる。`<<<<<<< HEAD` から `=======` が現在チェックアウトしているブランチ（自分の変更）、`=======` から `>>>>>>> ブランチ名` が取り込もうとしているブランチの変更。この2つの区画を見比べて、最終的にどちらの内容（または両方を合わせた内容）を残すかを自分で決めて書き直す。",
  },
  {
    id: "conflict-q2",
    question:
      "コンフリクトを解消した後の正しい手順はどれか？",
    choices: [
      "マーカーを削除してファイルを保存するだけでよい。Git が自動で検知してくれる",
      "マーカーを削除してファイルを保存 → `git add <ファイル>` → `git commit`（または `git merge --continue`）",
      "`git reset --hard` を実行してコンフリクト前の状態に戻す",
      "`git status` を実行するだけでコンフリクトが解消される",
    ],
    correctIndex: 1,
    explanation:
      "コンフリクト解消の手順は「エディタでマーカーを削除して内容を確定 → git add でステージング → git commit（または git merge --continue）」の3ステップ。ファイルを編集しただけでは Git は解消済みと認識しない。git add を実行することで「このファイルのコンフリクトを解消した」とGitに伝える仕組みになっている。",
  },
  {
    id: "conflict-q3",
    question:
      "`git merge --abort` の説明として正しいのはどれか？",
    choices: [
      "コンフリクトを自動解消してマージを完了させるコマンド",
      "マージを中断し、マージ開始前の状態に戻すコマンド",
      "マージコミットを削除して履歴を巻き戻すコマンド",
      "コンフリクトが発生したファイルだけを削除するコマンド",
    ],
    correctIndex: 1,
    explanation:
      "`git merge --abort` はコンフリクトが発生したマージを「なかったこと」にして、マージ開始前の状態に戻すコマンド。「やっぱり今はマージしない」「コンフリクトが多すぎて整理が必要」というときに使う。同様に rebase を中断したいときは `git rebase --abort`、cherry-pick を中断したいときは `git cherry-pick --abort` を使う。",
  },
  {
    id: "conflict-q4",
    question:
      "merge と rebase でコンフリクト解消後に続行するコマンドの組み合わせとして正しいのはどれか？",
    choices: [
      "merge: `git merge --continue` / rebase: `git rebase --continue`",
      "merge: `git commit` / rebase: `git rebase --continue`",
      "merge: `git push` / rebase: `git rebase --skip`",
      "merge も rebase も同じく `git commit` で続行できる",
    ],
    correctIndex: 1,
    explanation:
      "merge 中のコンフリクト解消後は、通常通り `git add` してから `git commit` を実行するとマージコミットが作られてマージが完了する。一方 rebase 中は `git add` の後に `git rebase --continue` を実行して次のコミットへ進む。`git commit` ではなく `--continue` フラグを使う点が違いとして混乱しやすいので注意。",
  },
  {
    id: "conflict-q5",
    question:
      "ours / theirs について正しい説明はどれか？",
    choices: [
      "merge でも rebase でも、ours は常に「自分が書いた変更」を指す",
      "merge では HEAD 側が ours、rebase では元のブランチ（rebase される側）が ours になる",
      "ours / theirs は cherry-pick 専用の用語で、merge には関係ない",
      "ours は常にリモートブランチの変更を、theirs は常にローカルブランチの変更を指す",
    ],
    correctIndex: 1,
    explanation:
      "ours / theirs は merge と rebase で意味が逆になる紛らわしい用語。merge では「今いるブランチ（HEAD）が ours、取り込む側が theirs」。しかし rebase では「元のコミット列（rebase される側）が ours、新しいベースが theirs」になる。`git checkout --ours <ファイル>` や `git checkout --theirs <ファイル>` でコンフリクトをどちらかで一括解消できるが、この逆転を知らずに使うと意図しない結果になる。",
  },
];
