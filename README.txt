検索＋一覧 実装パッチ

次工程：
「検索語で探す」と「一覧から探す」を同じ画面に実装。

反映方法：
ZIPを解凍し、フォルダ構造を保ったままリポジトリ直下へアップロードして上書き。

置換：
- index.html
- js/app.js
- js/render-lists.js
- data/problems.json
- data/interventions.json

新規：
- js/search.js
- css/search-list.css

動作：
【対策から探す】
検索例：
- ホットスポット
- hot spot
- 重点パトロール
- POP
- micro places
- 犯罪転位

【課題・問題から探す】
検索例：
- 自転車盗
- bicycle theft
- 施錠
- 盗品市場
- 駐輪場
- 登録
- bait bike

検索結果0件の場合：
「見つかりませんでした」と表示したうえで、
下には全件一覧を残す。
検索語が分からない場合でも一覧から到達可能。

検索方式：
- 日本語／英語対応
- 大文字小文字を無視
- NFKC正規化
- 複数語はAND検索
- 現時点はサイト内の収録済みデータのみ検索
