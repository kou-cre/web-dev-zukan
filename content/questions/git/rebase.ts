import type { DrillQuestion } from "@/components/PageDrill";

export const rebaseQuestions: DrillQuestion[] = [
  {
    id: "rebase-q1",
    question:
      "git rebase -i で `squash` を指定したとき、何が起きるか？",
    choices: [
      "そのコミットを完全に削除する",
      "そのコミットを1つ前のコミットに統合し、メッセージを編集できる",
      "コミットメッセージだけを書き直す（変更内容はそのまま）",
      "コミットを一時停止し、内容を手動で編集してから続きを実行する",
    ],
    correctIndex: 1,
    explanation:
      "squash は「前のコミットに押し込む（潰す）」操作。直前のコミットとまとめて1つになり、統合後のメッセージをエディタで編集できる。fixup も同じく統合するが、このコミットのメッセージは自動で破棄される点が違う。wip や fix typo などの細かいコミットを1つの意味のある単位にまとめるときに使う。",
  },
  {
    id: "rebase-q2",
    question:
      "共有ブランチ（main や develop など、チーム全員が使うブランチ）で rebase -i をしてはいけない最大の理由はどれ？",
    choices: [
      "rebase -i はローカルリポジトリでしか動かないから",
      "コミットを書き換えると SHA（ハッシュ）が変わり、他の人のローカルと履歴が一致しなくなるから",
      "共有ブランチには push の権限がないから",
      "rebase -i はコミット数が増えるため、共有ブランチが重くなるから",
    ],
    correctIndex: 1,
    explanation:
      "rebase -i でコミットを書き換えると、たとえ内容が同じでもコミットの SHA（ハッシュ）が変わる。つまり「別のコミット」として扱われる。他のメンバーは古い SHA を元にした状態でいるため、リモートが変わると履歴が一致せず大混乱になる。force push で上書きすると他人のコミットが失われることもある。自分しかいないブランチ（PR用のフィーチャーブランチ）でのみ使うのが鉄則。",
  },
  {
    id: "rebase-q3",
    question:
      "`git rebase -i HEAD~3` の `HEAD~3` は何を意味するか？",
    choices: [
      "リモートの main から3コミット分を取り込む",
      "HEAD（現在のコミット）から3つ先のコミットを指す",
      "HEAD（現在のコミット）から3つ前のコミットを指す（直近3コミットを整形対象にする）",
      "3番目のブランチに切り替えるショートカット",
    ],
    correctIndex: 2,
    explanation:
      "`~N` は「N つ前の祖先コミット」を表す記法。`HEAD~3` は「今いるコミットから3つ遡った地点」を指す。`git rebase -i HEAD~3` と実行すると、直近3コミットをインタラクティブに編集できるエディタが開く。整形したいコミット数が分かっているときに便利な指定方法。",
  },
  {
    id: "rebase-q4",
    question:
      "rebase -i 後に `git push --force-with-lease` を使う理由として最も正しいのはどれ？",
    choices: [
      "--force-with-lease は push を高速化するオプションだから",
      "通常の --force より安全で、自分が知らないリモートの変更を上書きするのを防げるから",
      "--force-with-lease を使わないと rebase 後のコミットは push できないから",
      "共有ブランチへの push にも使えるため、--force の代わりに常に使うべきだから",
    ],
    correctIndex: 1,
    explanation:
      "rebase -i でコミットを書き換えると履歴が変わるため、通常の push ではリジェクトされる。`--force` で上書きできるが、誰かが自分の知らない間にリモートを更新していた場合、そのコミットを消してしまう危険がある。`--force-with-lease` は「自分が最後に fetch した時点から他人が push していないか」をチェックし、変更があればエラーにする安全装置付きの force push。",
  },
  {
    id: "rebase-q5",
    question:
      "rebase -i のコマンドのうち「コミットをそのまま保持し、メッセージだけを書き直す」操作はどれ？",
    choices: [
      "pick",
      "squash",
      "reword",
      "drop",
    ],
    correctIndex: 2,
    explanation:
      "reword は「言葉を書き直す」という意味の通り、コミットの変更内容はそのままで、メッセージだけを編集できる。typo を直したい・もっと分かりやすい説明に変えたいときに使う。pick はそのまま残す、squash は前のコミットに統合してメッセージ選択、drop は削除、がそれぞれの役割。",
  },
];
