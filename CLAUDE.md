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
| 次カテゴリ以降 | React / Next.js etc | 未割り当て |

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
5. **Next.js カテゴリ**（App Router・SSR/SSG・API Routes・デプロイなど）
6. **Firebase カテゴリ**（Auth・Firestore・Storage・Cloud Functionsなど）
7. **本番運用カテゴリ**（CI/CD・監視・セキュリティなど）

---

## 注意事項

- JSXの文字列属性内に `"` `"` を直接書くと Turbopack のパーサーエラーになる → `{...}` で括るか `「」` に置き換える
- npm キャッシュ権限問題：`sudo chown -R $(whoami) ~/.npm` で恒久的に解決できる（sudo が必要）
- Tailwind v4 を使用。`bg-opacity-*` は使えない（`bg-color/opacity` 記法を使う）
