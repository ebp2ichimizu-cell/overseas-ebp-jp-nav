海外EBP日本語ナビ｜β版4テーマ掲載パック

基準資料
- hot_spots_policing_v11_github_stats.txt
- bicycle_theft_v7_github_stats.txt
- POP_content_master_v4_github_stats.txt
- residential_burglary_content_master_v3_github_stats.txt
- overseas_ebp_stats_toggle_spec_v1.txt

実装内容
1. ホットスポット・ポリシング v11へ更新
2. 自転車盗を「課題・問題から探す」に完成実装
3. 問題志向型警察活動（POP） v4を完成実装
4. 住宅対象侵入窃盗を「課題・問題から探す」に追加
5. 各テーマの青カード4件・赤カード3件を第2/第3階層Markdownへ接続
6. 統計ブロックを「統計を詳しく見る」で初期状態閉じた折りたたみに変換
7. 1ページ内に複数の統計ブロックがあっても処理できるようMarkdown rendererを更新
8. スマートフォンではsummary全体をタップ可能
9. 原著URLはクリック可能なリンクへ変換
10. 課題ページも、青カード→赤カード→関連対策の順で表示

反映方法
ZIPを解凍し、フォルダ構造を保ったままリポジトリ直下へアップロードして上書き。

置換ファイル
- data/problems.json
- data/interventions.json
- data/cases.json
- data/evidence-pages.json
- data/sources.json
- js/render-detail.js
- js/markdown.js
- css/commentary.css
- css/content-master.css

追加・置換コンテンツ
- content/evidence/ja/*.md
- content/cases/ja/*.md

既存の海外リソース一覧、Successful Police Problem-Solving、日本語ナビ各ページは変更しない。
