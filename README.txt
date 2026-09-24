POP v5 / 住宅対象侵入窃盗 v4 差し替えパック
基準: 2026-09-24

対象:
- 問題志向型警察活動（POP）: content master v5 final_ja
- 住宅対象侵入窃盗: content master v4 final_ja

反映方法:
ZIPを解凍し、リポジトリ直下へフォルダ構造を保ったまま上書きしてください。

置換:
- data/problems.json
- data/interventions.json
- data/cases.json
- data/evidence-pages.json
- js/markdown.js
- js/render-detail.js
- POP 第2階層 7ページ
- 住宅対象侵入窃盗 第2階層 7ページ

実装方針:
- 第1階層の概要・カード文言も新マスターに合わせて更新
- 第2階層は各BLUE/REDごとにMarkdown化
- 第3階層のURLはクリック可能な外部リンク化
- STATS_DETAIL_START / END は保持
- 統計UIの表示文言は「統計を詳しく見る」
- 統計ブロックは初期状態で閉じる
- 統計欄の「原著でさらに確認する」から原資料へ進める
- ガイダンス/Untested等、統計ブロックがないページには新規追加しない

掲載整形:
内容・数値・評価の意味は追加変更していません。
ただし、final_ja原稿内の明らかな機械置換由来の重複表記のみ掲載上正規化しています。
例:
- 分析（分析） → 分析
- 対策（対策） → 対策
- 実装（実装） → 実装
- 未検証（未検証（Untested）） → 未検証（Untested）
- Assessing 対策s to Problems → Assessing Responses to Problems
- パートナーシップ（関係機関hips） → パートナーシップ（partnerships）

対象外:
- ホットスポット・ポリシング
- 自転車盗
- 海外リソース一覧
- Successful Police Problem-Solving
- CSS（スマホ表示修正を上書きしません）
