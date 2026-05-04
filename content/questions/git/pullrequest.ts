import type { DrillQuestion } from "@/components/PageDrill";

export const pullrequestQuestions: DrillQuestion[] = [
  {
    id: "pullrequest-q1",
    question:
      "Pull Requestの主な目的として正しいものはどれ？",
    choices: [
      "リモートリポジトリにブランチをアップロードするだけの操作",
      "コードをmainにマージする前にレビュー・差分確認・議論を行う仕組み",
      "コミット履歴をまとめて1つにする操作",
      "ローカルの変更をステージングエリアに追加する操作",
    ],
    correctIndex: 1,
    explanation:
      "Pull Request（PR）は「このブランチをmainに取り込んでください」というGitHub上の依頼。コードレビュー・差分の一覧確認・コメントによる議論・Vercelプレビュー環境の自動生成など、マージ前の品質チェックの場として機能する。1人開発でも「変更理由を記録する」「差分を見やすくする」目的で使う価値がある。",
  },
  {
    id: "pullrequest-q2",
    question:
      "PRの「base branch」と「compare branch」の説明として正しいのはどれ？",
    choices: [
      "base branchが作業ブランチ、compare branchがマージ先（main）",
      "どちらも同じ意味で、呼び方が違うだけ",
      "base branchがマージ先（通常main）、compare branchが変更を含む作業ブランチ",
      "base branchはリモートのみ、compare branchはローカルのみに存在する",
    ],
    correctIndex: 2,
    explanation:
      "base branch はPRをマージする先のブランチ（通常はmain）。compare branch は変更を含む作業ブランチ。GitHubのPR作成画面では「base: main ← compare: feature/xxx」のように表示される。「compareの変更をbaseに取り込む」という方向で読む。",
  },
  {
    id: "pullrequest-q3",
    question:
      "「Squash and merge」を選んだときの挙動として正しいものはどれ？",
    choices: [
      "PRブランチの全コミットがそのままmainに追加され、さらにマージコミットも作られる",
      "PRブランチのコミットを時系列で並び替えてmainの先頭に接続する",
      "PRブランチにあった複数のコミットを1つにまとめてmainに追加する",
      "PRブランチのコミットを削除してmainとの差分だけを保存する",
    ],
    correctIndex: 2,
    explanation:
      "Squash and mergeは、PRブランチにある複数のコミット（「WIP」「typo fix」など作業中の細かい履歴）を1つのコミットに圧縮してmainに追加するマージ方式。mainの履歴が「1PR = 1コミット」でシンプルになる。1人開発や小規模チームで履歴をきれいに保ちたいときに向いている。",
  },
  {
    id: "pullrequest-q4",
    question:
      "「Draft PR（ドラフトPR）」を使う目的として最も適切なものはどれ？",
    choices: [
      "マージを自動化するために設定するフラグ",
      "作業が途中の段階で意見・フィードバックをもらうために作るPR",
      "過去のPRを復元するための操作",
      "PRのレビュアーを指定するための設定",
    ],
    correctIndex: 1,
    explanation:
      "Draft PRは「まだマージする準備ができていないが、方向性を確認したい・早めにフィードバックをもらいたい」ときに使う。Draft状態のPRはマージボタンが無効になるため「うっかりマージ」を防げる。作業が完成したら「Ready for review」に変更して通常のPRに昇格させる。",
  },
  {
    id: "pullrequest-q5",
    question:
      "良いPR本文に含めるべき3つの要素として正しいものはどれ？",
    choices: [
      "コミット数 / 変更ファイル数 / 作業時間",
      "何を変えたか / なぜ変えたか / どう確認するか",
      "ブランチ名 / マージ先 / 担当者名",
      "テスト結果 / デプロイ先URL / リリース日",
    ],
    correctIndex: 1,
    explanation:
      "良いPR本文の3点は「何を変えたか（変更内容の概要）」「なぜ変えたか（背景・目的）」「どう確認するか（レビュアーが動作確認する手順）」。これがあるとレビュアーが背景を理解した上でコードを読めるため、レビュー品質と速度が上がる。PR本文はコードへのコンテキストを提供するドキュメントとして機能する。",
  },
  {
    id: "pullrequest-q6",
    question:
      "3つのマージ方式（Merge commit / Squash and merge / Rebase and merge）の説明として正しいのはどれ？",
    choices: [
      "どの方式でもコミット履歴の結果は同じになる",
      "Merge commitは直線の履歴、Squash and mergeは分岐が見える履歴になる",
      "Merge commitは分岐が見える履歴、Squash and mergeは1コミットに圧縮、Rebase and mergeは直線で元コミットを保持",
      "Rebase and mergeはコミットを全部削除してmainを上書きする",
    ],
    correctIndex: 2,
    explanation:
      "3方式の違い: Merge commitは全コミット保持+マージコミット追加で分岐履歴が残る。Squash and mergeはPRの全コミットを1つに圧縮して直線履歴になる。Rebase and mergeは各コミットをmainの先頭に並び替えて直線履歴（元コミットは保持）になる。どれを選ぶかはチームのポリシーや好みによる。",
  },
];
