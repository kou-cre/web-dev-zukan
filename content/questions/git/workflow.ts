import type { DrillQuestion } from "@/components/PageDrill";

export const workflowQuestions: DrillQuestion[] = [
  {
    id: "workflow-q1",
    question: "GitHub Flow で日常的に使うブランチの種類として正しいのはどれ？",
    choices: [
      "main / develop / feature / release / hotfix の5種類",
      "main / feature/* の2種類のみ",
      "trunk / feature/* の2種類のみ",
      "main / staging / develop / feature の4種類",
    ],
    correctIndex: 1,
    explanation:
      "GitHub Flow は「main（常にデプロイ可能）+ feature/* 」のシンプルな2種類構成。作業はすべて feature ブランチで行い、完成したら main に Pull Request を出してマージする。ブランチ数を最小限に抑えることで、CI/CDとの相性が良く、個人や小チームで導入しやすい戦略。",
  },
  {
    id: "workflow-q2",
    question:
      "Git Flow の「hotfix」ブランチが完成したとき、マージする先として正しいのはどれ？",
    choices: [
      "develop ブランチにのみマージする",
      "release ブランチにのみマージする",
      "main ブランチと develop ブランチの両方にマージする",
      "feature ブランチにマージしてから main へ送る",
    ],
    correctIndex: 2,
    explanation:
      "hotfix は本番（main）の緊急バグを修正するブランチ。修正が完了したら main にマージして本番へ即反映する。さらに develop にも同じ修正をマージしておかないと、次回リリース時に同じバグが再発してしまう。だから必ず両方へマージする、が Git Flow のルール。",
  },
  {
    id: "workflow-q3",
    question: "Trunk-based Development で「feature flag」を使う主な目的はどれ？",
    choices: [
      "ブランチ名を自動で生成するツールのこと",
      "未完成の機能をコードに含めたまま、フラグで表示・非表示を切り替え、main へ頻繁にマージできるようにする",
      "本番と staging の差分を自動的に検出して報告する仕組みのこと",
      "Pull Request のレビュー担当者を自動アサインする機能のこと",
    ],
    correctIndex: 1,
    explanation:
      "Trunk-based Development は「常に main だけで開発する」思想。でも未完成の機能をいきなり main に入れると利用者に見えてしまう。そこで feature flag（機能フラグ）を使い、コードは含めつつ ON/OFF スイッチで表示を制御する。開発が完了したらフラグを ON にして公開し、フラグのコードは後で削除する運用が一般的。",
  },
  {
    id: "workflow-q4",
    question:
      "Vercel を使った個人開発で最もシンプルに運用できるブランチ戦略はどれ？",
    choices: [
      "Git Flow（main / develop / feature / release / hotfix の5種類を管理する）",
      "GitHub Flow（main + feature/* の2種類で運用する）",
      "Trunk-based Development（feature flag を完備してから導入する）",
      "branchを一切使わず main だけで直接 commit を積み続ける",
    ],
    correctIndex: 1,
    explanation:
      "Vercel は main ブランチへの push をトリガーに本番デプロイする設定が多い。GitHub Flow なら「feature ブランチで作業 → PR → main にマージ → 自動デプロイ」という一本道で完結する。さらに feature ブランチを push すると Vercel がプレビュー URL を自動発行するので、レビューもしやすい。個人開発には最適な組み合わせ。",
  },
  {
    id: "workflow-q5",
    question:
      "チームの既存プロジェクトに参加したとき、ブランチ戦略を把握するために最初に確認すべきことはどれ？",
    choices: [
      "チームの人数と平均年齢を確認する",
      "どのブランチが本番デプロイ先か・PRの粒度・ブランチ命名規則を確認する",
      "Git Flow か GitHub Flow かを投票で決め直す",
      "とりあえず main に直接 push してみて反応を見る",
    ],
    correctIndex: 1,
    explanation:
      "チームに入ったらまず「どのブランチが本番デプロイに繋がっているか（main か staging か）」「PRはどのくらいの粒度で出すか（1機能1PR か細かく出すか）」「ブランチ名の命名規則（feature/issue-123-xxx など）」の3点を確認する。これを知らずに作業すると、間違ったブランチに push したり、CI/CDが意図せず走る事故が起きる。",
  },
];
