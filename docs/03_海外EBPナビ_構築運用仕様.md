# 03_海外EBPナビ_構築運用仕様

基準日：2026-09-24

## 1. サイト概要

目的：海外のEBP・犯罪予防リソースを、日本の実務家が日本語で探し、理解し、原文まで進めるようにする。

公開URL：  
https://ebp2ichimizu-cell.github.io/overseas-ebp-jp-nav/#/

GitHub：  
`ebp2ichimizu-cell/overseas-ebp-jp-nav`

README記載の基本設計：
- 課題検索：赤（実例）→青（関連対策）
- 対策検索：青（海外情報源）→赤（実例）
- 第1階層：選ぶ
- 第2階層：日本語で理解する
- 第3階層：一次資料を読む

## 2. システム構成

```text
/
├─ index.html
├─ .nojekyll
├─ robots.txt
├─ README.md
├─ README.txt
├─ assets/
│  └─ overseas-ebp-logo.png
├─ content/
│  ├─ README.md
│  ├─ cases/
│  ├─ evidence/
│  ├─ guides/
│  ├─ interventions/
│  ├─ resources/
│  └─ templates/
├─ data/
│  ├─ cases.json
│  ├─ evidence-pages.json
│  ├─ guides.json
│  ├─ interventions.json
│  ├─ problems.json
│  ├─ resource-pages.json
│  ├─ sources.json
│  └─ translations.json
├─ docs/
│  ├─ data-schema.md
│  └─ phase1b-checklist.md
├─ css/
│  ├─ style.css
│  ├─ responsive.css
│  ├─ commentary.css
│  ├─ content-master.css
│  ├─ search-list.css
│  ├─ resource-library.css
│  ├─ logo-additions.css
│  ├─ responsive-additions.css
│  └─ top-ui-additions.css
└─ js/
   ├─ app.js
   ├─ data-loader.js
   ├─ markdown.js
   ├─ render-content.js
   ├─ render-detail.js
   ├─ render-home.js
   ├─ render-lists.js
   ├─ render-resources.js
   ├─ router.js
   ├─ search.js
   └─ utils.js
```

ルートには `entry-strong-additions.css`、`entry-strong-responsive.css` も存在する。削除・統合前に参照状況を確認する。

## 3. コンテンツ・データ構造

### data/
- `problems.json`：課題側入口
- `interventions.json`：対策側入口
- `cases.json`：実例
- `evidence-pages.json`：エビデンス解説
- `resource-pages.json`：海外リソース個別ページ
- `sources.json`：原典・出典
- `guides.json`：ガイド
- `translations.json`：翻訳関連の予備領域

### content/
長文Markdown：
- `cases/`
- `evidence/`
- `guides/`
- `interventions/`
- `resources/`
- `templates/`

### 統計折りたたみ

```html
<!-- STATS_DETAIL_START -->
## 統計で確認する
...
<!-- STATS_DETAIL_END -->
```

表示文言は「統計を詳しく見る」。初期状態は閉じる。統計ブロックがないページには無理に追加しない。

### 第3階層
「原文を見る」「原文を読む」「公式ページ」「PDF」等は必ず実リンク化する。

## 4. 更新・運用方法

### 新しい課題
1. `problems.json`
2. 関連 `interventions.json`
3. `cases.json`
4. `evidence-pages.json`
5. 対応Markdown
6. 原文URL
7. 検索導線確認

### 新しい対策
1. `interventions.json`
2. `evidence-pages.json`
3. 関連ケース
4. `content/interventions/` または `content/evidence/`
5. 原典リンク

### 新しい海外リソース
1. `resource-pages.json`
2. `sources.json`
3. `content/resources/`
4. 検索語・関連付け
5. 原文リンク

### 翻訳・独自解説
- 原著の意味、論理関係、エビデンスの強さを保持。
- 研究結果、原著者の解釈、サイト独自解説を分離。
- 因果表現を原著より強めない。
- 統計値は意味まで説明。
- 原著にない日本向け補足は独自解説と明示。
- 効果あり／なしだけでなくボトルネックを示す。
- 原文への導線を残す。

原則触らない：
- `index.html`
- `app.js`
- `router.js`
- `data-loader.js`
- `markdown.js`
- `render-*.js`
- 基本CSS

## 5. 公開・検索設定

`index.html`：

```html
<meta name="robots" content="noindex,nofollow">
```

`robots.txt`：

```text
User-agent: *
Disallow: /
```

`.nojekyll` も保持する。

## 6. 再構築・復旧手順

優先順位：
1. `index.html`
2. `js/app.js`
3. `js/router.js`
4. `js/data-loader.js`
5. `js/markdown.js`
6. `render-*.js`
7. `css/style.css`
8. `css/responsive.css`
9. その他CSS
10. `data/`
11. `content/`
12. `assets/overseas-ebp-logo.png`
13. `.nojekyll`
14. `robots.txt`
15. `docs/`

核心は「JSONとMarkdownの対応関係」。片方だけ復旧すると検索と詳細の不整合が起きる。

## 7. 再構築チェックリスト

- [ ] `#/`
- [ ] 課題検索
- [ ] 対策検索
- [ ] 検索結果→詳細
- [ ] 第1→第2→第3階層
- [ ] `problems.json`
- [ ] `interventions.json`
- [ ] `cases.json`
- [ ] `evidence-pages.json`
- [ ] `resource-pages.json`
- [ ] Markdown表示
- [ ] STATS_DETAIL折りたたみ
- [ ] 原文リンク
- [ ] ロゴ
- [ ] `noindex,nofollow`
- [ ] `robots.txt`
- [ ] `.nojekyll`
- [ ] 固定ナビとフッターがスマホで重ならない
- [ ] 連絡先

## 8. 今後の管理単位

1テーマを次のひとまとまりで管理する。

```text
テーマID
├─ problems / interventions の入口
├─ cases
├─ evidence page
├─ Markdown本文
├─ source URL
└─ 関連リンク
```

ZIP差し替えを使う場合は、上書き対象と対象外（特にCSS）をREADMEに明記する。
