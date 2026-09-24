Sites版の設計を引き継ぐコンテンツ実装パック

このパックでは、添付された「海外EBPサイト_コンテンツ原稿一式.zip」と
「Successful_Police_Problem-Solving_完全日本語訳マスター.md」を基準に、
GitHub版へ次を実装する。

【海外の実務ガイド】
- Successful Police Problem-Solving
  → #/guide/successful-police-problem-solving

【対策とエビデンス】
- Crime Reduction Toolkit 日本語ナビ
- Evidence-Based Policing Matrix 日本語ナビ

【海外の実践事例】
- Police Practice Bank 日本語ナビ

【問題解決・分析ガイド】
- POP Center 日本語ナビ

【対策テーマ】
- Problem-Oriented Policing（POP）を「対策から探す」に追加
- POP詳細解説を第2階層として掲載

【既存Hot spots】
- 02_Hot_spots_policing_詳細解説.md は掲載しない。
- 現在実装済みの v10 ホットスポット・ポリシングを正式側として維持し、二重掲載を避ける。

【新規ルート】
- #/resource/:id
- #/guide/:id
- #/intervention-guide/:id

【反映方法】
ZIPを解凍し、フォルダ構造を保ったままリポジトリ直下へアップロード。

主な置換:
- index.html
- js/app.js
- js/data-loader.js
- js/render-resources.js
- js/render-content.js
- js/render-detail.js
- data/interventions.json

新規:
- data/resource-pages.json
- data/guides.json
- css/resource-library.css
- content/resources/ja/*.md
- content/guides/ja/successful-police-problem-solving.md
- content/interventions/ja/problem-oriented-policing.md

注意:
- 原稿の内容は添付資料を基準とし、外部情報で補完していない。
- Successful Police Problem-Solving は「本サイト独自・非公式日本語訳」の表示を維持。
- Hot spots の旧詳細原稿は、現在のv10実装と重複するため未掲載。
