# Web開発図解サイト — CLAUDE.md

## プロジェクト概要

Web開発の概念を図解・比喩・対話形式で解説する自学用サイト。
Next.js 15（App Router）+ TypeScript + Tailwind CSS + lucide-react で構築。

- **本番URL:** https://web-dev-zukan.vercel.app
- **GitHubリポジトリ:** https://github.com/kou-cre/web-dev-zukan
- **デプロイ:** Vercel（mainブランチへのpushで自動デプロイ）

---

## 現在の状態（2026-05-01 時点）

| ページ | URL | 状態 |
|--------|-----|------|
| トップ（ハブ） | `/` | ✅ 完成 |
| 基礎概念ハブ | `/kiso` | ✅ 完成 |
| サーバーって何？ | `/kiso/server` | ✅ 完成 |
| BaaSって何？ | `/kiso/baas` | ✅ 完成 |
| データベースって何？ | `/kiso/database` | ✅ 完成 |
| Vercelって何？ | `/kiso/vercel` | ✅ 完成 |
| PWAって何？ | `/kiso/pwa` | ✅ 完成 |
| JavaScript ハブ | `/javascript` | ✅ 完成 |
| 変数とスコープ | `/javascript/variables` | ✅ 完成 |
| 非同期処理 | `/javascript/async` | ✅ 完成 |
| DOM操作 | `/javascript/dom` | ✅ 完成 |
| fetch API | `/javascript/fetch` | ✅ 完成 |
| ESモジュール | `/javascript/modules` | ✅ 完成 |
| エラーハンドリング | `/javascript/error` | ✅ 完成 |
| 開発環境セットアップ ハブ | `/env` | ✅ 完成 |
| Node.js と npm | `/env/nodejs` | ✅ 完成 |
| VSCode と拡張機能 | `/env/vscode` | ✅ 完成 |
| ターミナル基本コマンド | `/env/terminal` | ✅ 完成 |
| package.json の読み方 | `/env/package-json` | ✅ 完成 |
| HTML / CSS基礎ハブ | `/html-css` | ✅ 完成 |
| セマンティックHTML | `/html-css/semantic` | ✅ 完成 |
| Flexbox | `/html-css/flexbox` | ✅ 完成 |
| Grid | `/html-css/grid` | ✅ 完成 |
| レスポンシブデザイン | `/html-css/responsive` | ✅ 完成 |
| CSS変数 | `/html-css/css-variables` | ✅ 完成 |
| TypeScript ハブ | `/typescript` | ✅ 完成 |
| 型とは何か | `/typescript/what-is-type` | ✅ 完成 |
| 基本型と型推論 | `/typescript/basic-types` | ✅ 完成 |
| interface と type | `/typescript/interface-type` | ✅ 完成 |
| React での型付け | `/typescript/react-types` | ✅ 完成 |
| ジェネリクス入門 | `/typescript/generics` | ✅ 完成 |
| セキュリティ基礎ハブ | `/security` | ✅ 完成 |
| 環境変数とシークレット管理 | `/security/env-vars` | ✅ 完成 |
| XSS | `/security/xss` | ✅ 完成 |
| CORS | `/security/cors` | ✅ 完成 |
| CSRF | `/security/csrf` | ✅ 完成 |
| APIキー漏洩の対処 | `/security/api-key-leak` | ✅ 完成 |
| React / Next.js / Firebase / PWA詳細 / 本番運用 | — | 未作成 |

---

## プロジェクト構成

```
図解/
├── app/
│   ├── layout.tsx              ← SiteHeader込み・Noto Sans JP
│   ├── page.tsx                ← トップハブ
│   ├── globals.css             ← ダークテーマ（#0f1117 / #1a1d2a / #2d3048）
│   ├── kiso/
│   │   ├── page.tsx            ← 基礎概念ハブ
│   │   └── server/
│   │       └── page.tsx        ← サーバーって何？（完成サンプル）
├── components/
│   ├── SiteHeader.tsx          ← 固定ナビゲーション
│   ├── Hero.tsx                ← ページヒーロー（accentColor prop）
│   ├── OnePageSummary.tsx      ← 比喩・一言定義
│   ├── ConceptDiagram.tsx      ← FlowCard / FlowArrow / StackLayer / ContrastBar
│   ├── ComparisonTable.tsx     ← 比較表
│   ├── MajiDialogue.tsx        ← キャラクター対話（画像・感情対応）
│   ├── DetailSection.tsx       ← 詳細解説・KeyPoint・WarningPoint
│   ├── RelatedLinks.tsx        ← 関連ページカード（Lucide icon名指定）
│   └── PageDrill.tsx           ← 4択ドリル（Client Component）
├── content/
│   └── questions/
│       └── kiso/
│           └── server.ts       ← ドリル問題データ
└── public/
    └── characters/
        ├── maji-standard.png   ← マジくん（標準）
        ├── maji-doubt.png      ← マジくん（疑っている）
        ├── maji-question.png   ← マジくん（マジ？）
        ├── maji-surprised.png  ← マジくん（驚き）
        ├── maji-worried.png    ← マジくん（焦り）
        ├── master-standard.png ← マスター（標準）
        ├── master-explain.png  ← マスター（諭す）
        └── master-thinking.png ← マスター（思考・分析）
```

---

## デザイン仕様

### カラー（全ページ統一）

| 用途 | 値 |
|------|----|
| ページ背景 | `#0f1117` |
| カード背景 | `#1a1d2a` |
| ボーダー | `#2d3048` |
| アクセント（KeyPoint） | `amber-` 系 |
| 警告 | `red-` 系 |

### ページごとのアクセントカラー（割り当て済み）

| カテゴリ | ページ | アクセント |
|----------|--------|-----------|
| 基礎概念 | サーバーって何？ | `emerald` |
| 基礎概念 | BaaSって何？ | `blue` |
| 基礎概念 | データベースって何？ | `violet` |
| 基礎概念 | Vercelって何？ | `sky` |
| 基礎概念 | PWAって何？ | `rose` |
| JavaScript | 変数とスコープ | `yellow` |
| JavaScript | 非同期処理 | `amber` |
| JavaScript | DOM操作 | `lime` |
| JavaScript | fetch API | `cyan` |
| JavaScript | ESモジュール | `orange` |
| JavaScript | エラーハンドリング | `red` |
| Git / GitHub | GitとGitHubとは | `indigo` |
| Git / GitHub | ブランチとマージ | `teal` |
| Git / GitHub | Pull Request | `purple` |
| Git / GitHub | ブランチ戦略 | `pink` |
| Git / GitHub | stash（一時退避） | `slate` |
| Git / GitHub | rebase -i（履歴整形） | `fuchsia` |
| Git / GitHub | cherry-pick | `green` |
| Git / GitHub | コンフリクト解消 | `stone` |
| 開発環境セットアップ | — | `slate` (#94a3b8) |
| HTML / CSS基礎 | — | `orange` (#f97316) |
| TypeScript | — | `blue-custom` (#4f85c8) |
| デバッグ・エラー対処 | — | `red` (#f87171) |
| CSSフレームワーク | — | `cyan` (#22d3ee) |
| フォーム・バリデーション | — | `green` (#4ade80) |
| 状態管理 | — | `teal` (#2dd4bf) |
| セキュリティ基礎 | — | `amber` (#fbbf24) |
| SEO・アクセシビリティ | — | `lime` (#a3e635) |
| その他（React / Next.js etc） | — | 未割り当て |

### アイコン

- **Lucide React**（`lucide-react` パッケージ）を使用
- 絵文字は使用しない
- キャラクター画像は `public/characters/` 内の PNG を使用

---

## 新規ページを追加する手順

### 1. コンテンツ案を先に作る

`プライベート/Web開発自学/コンテンツ案/<ページ名>.md` に内容設計書を作成する（先にMarkdownで詰めてからコードに落とす方針）。

### 2. ディレクトリを作る

```
app/<カテゴリ>/<slug>/page.tsx
content/questions/<カテゴリ>/<slug>.ts
```

### 3. ページを実装する

`app/kiso/server/page.tsx` を参考テンプレートとして使う。構成は以下の順：

1. `<Hero>` — タイトル・サブタイトル・アクセントカラー
2. `<OnePageSummary>` — キーメッセージ・比喩・一言定義
3. CONCEPT DIAGRAMS セクション — `<ConceptDiagram>` の中に図を構築
4. COMPARISON セクション — `<ComparisonTable>`
5. `<MajiDialogue>` — 感情（emotion）を各ターンに指定
6. `<DetailSection>` + `<DetailBlock>` + `<KeyPoint>`
7. `<RelatedLinks>` — icon 名は Lucide のコンポーネント名を文字列で渡す
8. `<PageDrill>` — `content/questions/` からインポート

### 4. ハブページとナビを更新する

- `app/<カテゴリ>/page.tsx` の pages 配列にエントリを追加
- `app/page.tsx` の categories 配列のステータスを更新
- `SiteHeader.tsx` は現状カテゴリ単位のリンクのみなので、必要なら更新

### 5. 図解ページ計画.md の進捗テーブルを更新する

`プライベート/Web開発自学/図解ページ計画.md` のテーブルを「✅ 完成（YYYY-MM-DD）」に更新する。

---

## ローカル開発コマンド

```bash
cd "/Users/kosukeiwasaki/Library/CloudStorage/GoogleDrive-smayomegareplay@gmail.com/マイドライブ/obsidian vault/プライベート/Web開発自学/図解"
npm_config_cache=/tmp/npm-cache npm run dev
# → http://localhost:3000 で確認
```

※ npm キャッシュが root 所有になっているため `npm_config_cache=/tmp/npm-cache` を必ずつける。

---

## 次にやること（優先度順）

1. ~~**Vercel デプロイ**~~ — ✅ 完了（2026-05-01）
2. ~~**基礎概念カテゴリ 5ページ**~~ — ✅ 完了（2026-05-01）
3. ~~**JavaScript カテゴリ 6ページ**~~ — ✅ 完了（2026-05-01）
4. **React カテゴリ**（コンポーネント・Props・State・Hooks・ルーティング・Context など）
5. **Next.js カテゴリ**（App Router・SSR/SSG・API Routes・Server Actions など）
6. **Firebase カテゴリ**（Auth・Firestore・Storage・Cloud Functionsなど）
7. **本番運用カテゴリ**（CI/CD・監視・セキュリティなど）
8. **開発環境セットアップ カテゴリ**（Node.js・npm・VSCode・ターミナル）— Opus分析で最優先と判定
9. **HTML/CSS基礎 カテゴリ**（Flexbox・Grid・レスポンシブ・CSS変数）— 同上
10. **TypeScript カテゴリ**（型・interface・型推論・Reactでの型付け）— 同上
11. **デバッグ・エラー対処 カテゴリ**（DevTools・スタックトレース）— 同上
12. **CSSフレームワーク カテゴリ**（Tailwind CSS・shadcn/ui）
13. **フォーム・バリデーション カテゴリ**（React Hook Form・Zod）
14. **状態管理 カテゴリ**（TanStack Query・Zustand）
15. **セキュリティ基礎 カテゴリ**（環境変数・XSS・CORS）
16. **SEO・アクセシビリティ カテゴリ**（OGP・Lighthouse・WAI-ARIA）

---

## 新規ページ作成チェックリスト

ページを作成・修正したら以下を確認すること（詳細は `STYLE_GUIDE.md` 参照）。

```
□ Hero の accentColor がページカラーと一致している
□ FlowCard highlight に accentColor を渡している
□ 本文テキストが text-sm（14px）になっている（H3見出しのみ text-base）
□ gray-500以下のテキストが本文・補助文に使われていない
□ yellow/amber/lime の背景が 0.10/ボーダー 0.7 になっている
□ DetailBlock 本文が text-sm leading-relaxed になっている
□ PageDrill 選択肢が text-sm になっている
□ 矢印・ラベルが text-gray-400 以上になっている
```

---

## 注意事項

- JSXの文字列属性内に `"` `"` を直接書くと Turbopack のパーサーエラーになる → `{...}` で括るか `「」` に置き換える
- npm キャッシュ権限問題：`sudo chown -R $(whoami) ~/.npm` で恒久的に解決できる（sudo が必要）
- Tailwind v4 を使用。`bg-opacity-*` は使えない（`bg-color/opacity` 記法を使う）
