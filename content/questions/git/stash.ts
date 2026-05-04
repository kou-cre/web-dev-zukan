import type { DrillQuestion } from "@/components/PageDrill";

export const stashQuestions: DrillQuestion[] = [
  {
    id: "stash-q1",
    question:
      "`git stash` を実行したとき、何が起こるか？",
    choices: [
      "変更をコミットして履歴に残す",
      "未コミットの変更を一時的に退避させ、作業ツリーをきれいな状態に戻す",
      "ブランチを切り替えて変更をそのブランチに移す",
      "変更を破棄して元の状態に完全に戻す",
    ],
    correctIndex: 1,
    explanation:
      "git stash は「未コミットの変更を一時的に棚に上げる」コマンド。実行後は作業ツリーが直前のコミット状態に戻り、別のブランチに自由に切り替えられるようになる。退避した変更は stash スタックに積まれており、git stash pop または git stash apply で元に戻せる。変更は消えているわけではなく、「一時保存」の状態になっている。",
  },
  {
    id: "stash-q2",
    question:
      "`git stash pop` と `git stash apply` の違いとして正しいのはどれ？",
    choices: [
      "pop は最新のstashを適用してstashから削除する。apply は適用してもstashに残る",
      "pop はすべてのstashを一括適用する。apply は指定したstashだけを適用する",
      "pop はコンフリクトがある場合のみ使う。apply はコンフリクトがないときだけ使える",
      "pop は新規ファイルも復元する。apply はステージング済みの変更だけ復元する",
    ],
    correctIndex: 0,
    explanation:
      "pop は「取り出して使ったら棚から片付ける」操作。apply は「棚からコピーして取り出すが棚にも残しておく」操作。apply を使うと同じ stash を複数のブランチに適用したり、後で参照し直したりできる。ただし apply の場合は不要になったら git stash drop で手動削除する必要がある。迷ったら pop でよい。",
  },
  {
    id: "stash-q3",
    question:
      "新規ファイル（git add していない未追跡ファイル）もstashに含めたい場合、どのコマンドを使う？",
    choices: [
      "git stash（デフォルトで未追跡ファイルも含まれる）",
      "git stash --all",
      "git stash -u",
      "git stash --new-files",
    ],
    correctIndex: 2,
    explanation:
      "git stash のデフォルトは「追跡済みファイルの変更」だけをstashする。未追跡ファイル（git add していない新規ファイル）は対象外のため、作業ツリーにそのまま残ってしまう。-u（--include-untracked）フラグをつけると未追跡ファイルもまとめてstashできる。--all はさらに .gitignore で無視されているファイルも含める（通常は不要）。",
  },
  {
    id: "stash-q4",
    question:
      "stash のデータ構造（積み方と取り出し方）として正しいのはどれ？",
    choices: [
      "FIFO（先入れ先出し）。最初にstashしたものが最初に取り出される",
      "LIFO（後入れ先出し）。最後にstashしたものが最初に取り出される",
      "ランダム。stash listで番号を指定しないと順番は保証されない",
      "アルファベット順。stash名のアルファベット順で管理される",
    ],
    correctIndex: 1,
    explanation:
      "stash はスタック構造（LIFO: Last In First Out）で管理される。git stash list を実行すると stash@{0} が最新（直近にstashしたもの）、stash@{1} がその前、という番号で並ぶ。git stash pop は常に stash@{0}（最新）から取り出す。特定のstashを取り出したい場合は git stash apply stash@{2} のように番号を指定する。",
  },
  {
    id: "stash-q5",
    question:
      "stashを長期間放置するとどのような問題が起きる可能性があるか？",
    choices: [
      "stashは永久に保持されるので問題はない",
      "一定期間が過ぎると自動的に削除される",
      "何のための作業だったかが分からなくなり、取り出しても使えないことがある",
      "stashが増えすぎるとリポジトリのサイズが急激に大きくなる",
    ],
    correctIndex: 2,
    explanation:
      "stashはデータとしては削除されないが、時間が経つと「これは何の作業のためにstashしたのか」が分からなくなることが多い。特に複数のstashが積み上がった場合、stash@{3} の内容が何だったか確認するのは手間がかかる。stashは短期的な一時退避として使うのが理想で、長期間作業を中断する場合は WIPコミット（git commit -m \"WIP: 〇〇の途中\"）を作ってブランチに残す方が管理しやすい。",
  },
];
