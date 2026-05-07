import Link from "next/link";
import {
  AlertTriangle,
  ShieldCheck,
  GitBranch,
  Terminal,
  KeyRound,
  CheckCheck,
  RefreshCw,
  Clock,
  FileCode,
  Trash2,
} from "lucide-react";

import { Hero } from "@/components/Hero";
import { Prerequisites } from "@/components/Prerequisites";
import { OnePageSummary } from "@/components/OnePageSummary";
import { ConceptDiagram, FlowCard, FlowArrow, StackLayer } from "@/components/ConceptDiagram";
import { MajiDialogue } from "@/components/MajiDialogue";
import { RelatedLinks } from "@/components/RelatedLinks";
import { PageDrill } from "@/components/PageDrill";
import { DetailSection, DetailBlock, KeyPoint, WarningPoint } from "@/components/DetailSection";
import { SectionDivider } from "@/components/SectionDivider";
import { TermNote } from "@/components/TermNote";
import { UseCaseGrid } from "@/components/UseCaseGrid";
import { CodeBlock } from "@/components/CodeBlock";
import { apiKeyLeakQuestions } from "@/content/questions/security/api-key-leak";

export const metadata = {
  title: "APIキー漏洩の対処 | Web開発図解",
  description:
    "誤ってAPIキーをGitにコミットしたときの緊急対応手順・BFG Repo Cleanerの使い方・再発防止策を図解で解説。",
};

export default function ApiKeyLeakPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/security" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← セキュリティ基礎に戻る
        </Link>
      </div>

      <Hero
        category="セキュリティ基礎"
        title="APIキー漏洩の対処"
        subtitle={"誤ってGitにコミットしたときの緊急対応手順と再発防止策"}
        body={"やってしまったら焦らず対応。まずキーを無効化、次にGit履歴を削除。順番が重要。"}
        accentColor="amber"
      />

      {/* ── 前提知識ボックス ────────────────────────────────── */}
      <Prerequisites
        learn={[
          "APIキー漏洩が発覚したときの緊急対応の順番",
          "git rm --cached でGit追跡を外す方法",
          "BFG Repo Cleanerを使った履歴からの削除手順",
        ]}
        prerequisites={[
          "Gitの基本操作（commit・push）を知っている",
          "GitHubにコードを公開するとファイルが世界に見えることを知っている",
          ".gitignore の役割を知っている（環境変数のページを先に読む）",
        ]}
        outOfScope={[
          "git filter-branch による履歴の書き換え（非推奨のため省略）",
          "GitHub の secret scanning（自動検知機能）の設定",
          "Gitのsigned commitsによる改ざん防止の設定",
        ]}
      />

      <OnePageSummary
        keyMessage="APIキーをGitにcommitしてしまったら、やることは2つのフェーズに分かれる。①まず即座にキーを無効化（revoke）して新しいキーに差し替える。②次にGit履歴からキーの文字列を削除してforce push。順番を守ることが最重要。"
        metaphorTitle="銀行のカードを紛失したときの対処"
        metaphorPoints={[
          {
            label: "フェーズ1：キーを無効化",
            real: "カードを紛失したらまずカード会社に電話してカードを止める。履歴から削除する前に、まず無効化が先。",
            metaphor: "カードを止めてから、財布を探す",
          },
          {
            label: "フェーズ2：Git履歴削除",
            real: "GitHubにアップされたキーの文字列を履歴ごと消す。ただし既に複製されている可能性があるため、キーの無効化が先。",
            metaphor: "防犯カメラの映像を消しても意味がない場合がある",
          },
          {
            label: "再発防止",
            real: ".env.local を作って .gitignore に追加。今後はキーをコードに書かないフローを定着させる。",
            metaphor: "カードホルダーに入れて財布の専用ポケットに入れるルール化",
          },
        ]}
        definition="APIキー漏洩対処とは、シークレットが誤ってバージョン管理システムに公開された際に、被害を最小化しながら安全な状態に戻すための手順。"
      />

      {/* ── 基礎編 CONCEPT DIAGRAMS ────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          CONCEPT DIAGRAMS
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          焦ると手順を間違えて状況が悪化します。対応の順番を先に頭に入れてから作業を始めましょう。
          「まずキーを止める」この1点が最も重要です。
        </p>

        {/* ── 概念図A: 対応フロー ── */}
        <ConceptDiagram
          title="概念図A"
          description="APIキー漏洩発覚からの対応フロー（順番を守ることが最重要）"
        >
          <div className="space-y-3">
            <div
              className="rounded-lg border p-3 flex items-start gap-3"
              style={{ backgroundColor: "rgba(239,68,68,0.05)", borderColor: "rgba(239,68,68,0.3)" }}
            >
              <span
                className="text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: "rgba(239,68,68,0.2)", color: "#f87171" }}
              >
                1
              </span>
              <div>
                <p className="text-sm font-semibold text-red-300 mb-1">即座にAPIキーを無効化（revoke）</p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Stripe / OpenAI / AWS など、漏洩したキーを発行したサービスのダッシュボードを開く。
                  キーを削除または無効化する。新しいキーを発行する。
                  <strong className="text-red-300"> これが最優先。Git作業より先に行う。</strong>
                </p>
              </div>
            </div>

            <div
              className="rounded-lg border p-3 flex items-start gap-3"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <span
                className="text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: "rgba(245,158,11,0.2)", color: "#fbbf24" }}
              >
                2
              </span>
              <div>
                <p className="text-sm font-semibold text-amber-300 mb-1">新しいキーを .env.local に設定</p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  発行した新しいキーを .env.local に書く。アプリが動くことを確認する。
                  .gitignore に .env.local が含まれているか確認する。
                </p>
              </div>
            </div>

            <div
              className="rounded-lg border p-3 flex items-start gap-3"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <span
                className="text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: "rgba(245,158,11,0.2)", color: "#fbbf24" }}
              >
                3
              </span>
              <div>
                <p className="text-sm font-semibold text-amber-300 mb-1">Git履歴からキーの文字列を削除</p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  BFG Repo Cleaner または git filter-repo を使って、
                  コミット履歴からキーの文字列を削除する。
                  その後 force push でGitHubの履歴を上書きする。
                </p>
              </div>
            </div>

            <div
              className="rounded-lg border p-3 flex items-start gap-3"
              style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
            >
              <span
                className="text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: "rgba(245,158,11,0.2)", color: "#fbbf24" }}
              >
                4
              </span>
              <div>
                <p className="text-sm font-semibold text-amber-300 mb-1">ダメージの確認と今後の対策</p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  漏洩したキーが使われた形跡がないかサービスの利用ログを確認する。
                  今後の再発防止として .env.example を整備し、コードレビューのチェックリストに追加する。
                </p>
              </div>
            </div>
          </div>
          <div
            className="rounded-lg border mt-4 p-3"
            style={{ backgroundColor: "rgba(245,158,11,0.05)", borderColor: "rgba(245,158,11,0.3)" }}
          >
            <p className="text-xs font-semibold text-amber-300 mb-2">なぜキーの無効化が先なのか</p>
            <p className="text-sm text-gray-300 leading-relaxed">
              Git履歴を削除してもGitHubにpush済みの場合、削除が完了するまでの間にBotが既にコピーしている可能性があります。
              歴史を消すことよりも、盗まれた鍵を使えなくすることが先です。
              新しい鍵に切り替えれば、古い鍵が漏洩していても被害が出なくなります。
            </p>
          </div>
        </ConceptDiagram>

        {/* bridge */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 px-1">
          対応の順番が分かりました。次はGit履歴から削除するための具体的なコマンドを確認します。
        </p>

        {/* ── 概念図B: git rm --cachedの使い方 ── */}
        <ConceptDiagram
          title="概念図B"
          description="まだpushしていない場合の対処：git rm --cached でGitの追跡を外す"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <FlowCard
              Icon={FileCode}
              title=".env.local を誤ってgit add"
              subtitle="まだcommitはしていない状態"
            />
            <FlowArrow label="git rm --cached" direction="right" />
            <FlowCard
              Icon={CheckCheck}
              title="Gitの追跡から外れる"
              subtitle="ファイル自体は残る"
              highlight
              accentColor="amber"
            />
            <FlowArrow label=".gitignoreに追加" direction="right" />
            <FlowCard
              Icon={ShieldCheck}
              title="今後は自動でGit管理外"
              subtitle="安全な状態"
            />
          </div>
          <div
            className="rounded border mt-4 p-3 font-mono text-xs leading-loose"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-gray-500">{"# .env.local がgit addされてしまった場合"}</p>
            <p><span className="text-amber-300">git rm --cached .env.local</span></p>
            <p className="text-gray-500 mt-2">{"# 確認：git status で変化を確認"}</p>
            <p><span className="text-amber-300">git status</span></p>
            <p className="text-gray-500 mt-2">{"# .gitignore に追加（なければ作る）"}</p>
            <p><span className="text-amber-300">echo ".env*.local" {">>"}  .gitignore</span></p>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            git rm --cached はファイルを削除せず、Gitの追跡対象から外すだけ。安全なコマンド。
          </p>
        </ConceptDiagram>
      </section>

      {/* ── MajiDialogue（基礎編） ─────────────────────────── */}
      <MajiDialogue
        turns={[
          {
            speaker: "maji",
            emotion: "panic",
            text: "マスター！！ やってしまいました！！\n.env.local を .gitignore に入れ忘れたまま git push してしまって……！\nもうGitHubに乗ってしまったんですが、どうすればいいですか！？",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "マジさん、落ち着いてください。まず深呼吸。\nやることは順番があります。この順番を間違えないことが大切です。\n最初にやることは——Git履歴を消すことではありません。\nまず、漏洩したAPIキーを発行したサービスのダッシュボードを開いて、そのキーを無効化してください。",
          },
          {
            speaker: "maji",
            emotion: "worried",
            text: "え、Git作業は後でいいんですか？\nまず履歴を消した方がいいのでは……？",
          },
          {
            speaker: "master",
            emotion: "thinking",
            text: "いいえ。銀行のカードを落としたとき、まずカードを止めますよね。\nカードを探す前に、カード会社に電話してカードを使えなくする。\n同じです。GitHubにpushした時点で、自動スキャンのBotがもう見ている可能性がある。\nGit履歴を消すより先に、漏洩したキーを使えなくすることが先決です。",
          },
          {
            speaker: "maji",
            emotion: "standard",
            text: "わかりました。まずAPIキーを無効化して、新しいキーを発行します。\n……完了しました。次は？",
          },
          {
            speaker: "master",
            emotion: "standard",
            text: "次は新しいキーを .env.local に書いて、アプリが動くか確認してください。\n確認できたら、Git履歴からキーの文字列を削除する作業です。\nBFG Repo Cleaner というツールを使うのが現在の定番です。\ngit filter-branch というコマンドもありますが、複雑で事故が多いので BFG の方が安全です。",
          },
          {
            speaker: "maji",
            emotion: "down",
            text: "……ボク、なんでこんなミスをしてしまったんでしょう。\n.gitignore に入れ忘れただけなのに。",
          },
          {
            speaker: "master",
            emotion: "explain",
            text: "誰でもやることです。ベテランのエンジニアでもやります。\nだからこそ『事前の仕組み作り』が大切なんです。\n.gitignore の設定・.env.example の用意・コードレビューでのシークレットチェック。\n今回の経験を活かして、次のプロジェクトでは仕組みを先に整えてから始めましょう。\n事故は起きる前に防ぐのが一番で、起きた後は迅速に対応する。マジさんは今日その両方を学びました。",
          },
          {
            speaker: "maji",
            emotion: "tearful",
            text: "……ありがとうございます。\n無効化 → 新キーに差し替え → BFG で履歴削除 → force push。\nこの順番を忘れないようにします。\nそして二度とこうならないように .env.local と .gitignore の設定を絶対に先にやります。",
          },
        ]}
      />

      {/* ── 応用編 セパレータ ──────────────────────────────── */}
      <SectionDivider
        message="ここから応用編 — 1周目は飛ばしてOK"
        note="以下はBFG Repo Cleanerの具体的なコマンドと、git filter-repoとの比較です。"
      />

      {/* ── 応用編 ─────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          ADVANCED — BFG Repo Cleanerで履歴を削除する
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          すでにpushしてしまった場合は、コミット履歴からキーの文字列を削除してforce pushで上書きします。
          BFG Repo Cleaner は操作がシンプルで事故が少ないため、現在の推奨ツールです。
        </p>

        <TermNote
          terms={[
            {
              word: "BFG Repo Cleaner",
              definition:
                "Gitリポジトリの履歴から特定のファイルや文字列を削除するツール。git filter-branchより高速で使いやすい。JARファイルで配布されJavaが必要。",
            },
            {
              word: "force push",
              definition:
                "GitHubの履歴を強制的に上書きするpush。通常のpushは履歴の追加のみだが、--force をつけると既存の履歴ごと書き換えられる。チーム開発では影響が大きいため慎重に。",
            },
            {
              word: "git filter-repo",
              definition:
                "BFGと同様に履歴を書き換えるツール。より多機能だが操作が複雑。Gitの公式ドキュメントが推奨する現代的な代替ツール。",
            },
          ]}
        />

        <ConceptDiagram
          title="概念図C"
          description="BFG Repo Cleanerを使った履歴削除の手順"
        >
          <div className="space-y-3">
            <StackLayer
              Icon={Terminal}
              title="手順1: リポジトリをミラークローン"
              subtitle="git clone --mirror https://github.com/xxx/repo.git"
              iconColor="text-amber-400"
            />
            <StackLayer
              Icon={Trash2}
              title="手順2: BFGで文字列を削除"
              subtitle={`java -jar bfg.jar --replace-text secrets.txt repo.git`}
              iconColor="text-amber-400"
            />
            <StackLayer
              Icon={RefreshCw}
              title="手順3: gc で履歴を圧縮"
              subtitle="cd repo.git && git reflog expire --expire=now --all && git gc --prune=now --aggressive"
              iconColor="text-amber-400"
            />
            <StackLayer
              Icon={GitBranch}
              title="手順4: force push でGitHubを上書き"
              subtitle="git push --force"
              iconColor="text-amber-400"
              showArrow={false}
            />
          </div>
          <div
            className="rounded-lg border mt-4 p-3"
            style={{ backgroundColor: "#0f1117", borderColor: "#2d3048" }}
          >
            <p className="text-xs font-semibold text-gray-400 mb-2">secrets.txt の内容</p>
            <p className="text-xs text-gray-400 mb-3 leading-relaxed">
              削除したい文字列（APIキーの値）を secrets.txt に1行ずつ書く。BFGがリポジトリ全履歴から完全に削除する。
            </p>
            <div
              className="rounded border p-3 font-mono text-xs"
              style={{ backgroundColor: "#1a1d2a", borderColor: "#2d3048" }}
            >
              <p className="text-red-300">sk-live-abc123xxxxxxxxxxxxx</p>
              <p className="text-gray-500">{"# ← 漏洩したAPIキーの値そのものを書く"}</p>
            </div>
          </div>
        </ConceptDiagram>
      </section>

      {/* ── 詳細解説 ─────────────────────────────────────── */}
      <DetailSection title="詳細解説">
        <DetailBlock heading="1. 再発防止の仕組みを整える">
          <p>
            一度ミスをした後は、同じミスが起きないフローを作ることが重要です。
            個人開発でもチーム開発でも実践できる再発防止策をまとめます。
          </p>
          <UseCaseGrid
            cols={2}
            items={[
              {
                Icon: FileCode,
                title: ".env.example を整備",
                subtitle: "どの変数が必要かチームに伝える",
                description: "変数名だけ書いて値は空の .env.example をGitに含める。新しいメンバーが参加したときのガイドになる。",
                accentColor: "amber",
              },
              {
                Icon: GitBranch,
                title: "pre-commitフックで検知",
                subtitle: "commitする前に自動チェック",
                description: "detect-secrets や git-secrets などのツールをpre-commitフックに仕込む。シークレットっぽい文字列がステージングにあったらcommitを止める。",
                accentColor: "amber",
              },
              {
                Icon: ShieldCheck,
                title: "GitHub Secret Scanning",
                subtitle: "push後の自動検知",
                description: "GitHubがpushされたコードからシークレットを自動検知して通知する機能。無料で有効化できる。漏洩を早期発見できる。",
                accentColor: "amber",
              },
              {
                Icon: KeyRound,
                title: "APIキーの権限を最小に",
                subtitle: "漏洩しても被害を最小化",
                description: "必要最小限の権限のみ持つAPIキーを発行する（最小権限の原則）。万が一漏洩しても、できることが限られる。",
                accentColor: "amber",
              },
            ]}
          />
          <KeyPoint>
            最も効果的な再発防止は「そもそも .env.local 以外にシークレットを書かない習慣」の定着です。新しいプロジェクトを始めるとき、最初に .env.local と .gitignore を設定してからコードを書き始めるルーティンにするだけで、大半の事故を防げます。
          </KeyPoint>
        </DetailBlock>

        <DetailBlock heading="2. force push の注意点">
          <p>
            Git履歴の書き換えと force push は、チーム開発では大きな影響があります。
            共同作業者がいる場合は、事前に全員に通知して作業してもらう必要があります。
          </p>
          <CodeBlock
            title="force push 後にチームメンバーがやること"
            language="bash"
            code={`# force push 後は全員がローカルを最新に合わせる必要がある
# 通常のgit pullでは対応できないため以下のコマンドを使う

git fetch origin
git reset --hard origin/main

# ローカルのブランチが書き換えられたリモートと一致する
# ※ ローカルの変更が失われるため注意`}
          />
          <WarningPoint>
            個人開発やプライベートリポジトリでのforce pushは比較的安全ですが、チーム開発のmain/masterブランチへのforce pushはチームに多大な影響を与えます。必ずチームに事前告知し、タイミングを合わせて行ってください。
          </WarningPoint>
        </DetailBlock>
      </DetailSection>

      <RelatedLinks
        items={[
          {
            href: "/security/env-vars",
            title: "環境変数とシークレット管理",
            description: "漏洩を未然に防ぐ .env の使い方",
            icon: "KeyRound",
          },
          {
            href: "/security/xss",
            title: "XSS",
            description: "フロントエンドの別のセキュリティ基礎",
            icon: "Bug",
          },
          {
            href: "/security",
            title: "セキュリティ基礎 ハブ",
            description: "CORS・CSRFなど関連トピック一覧",
            icon: "ShieldCheck",
          },
        ]}
      />

      <PageDrill questions={apiKeyLeakQuestions} />
    </div>
  );
}
