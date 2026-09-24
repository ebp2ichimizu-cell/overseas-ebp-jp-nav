海外EBPナビ｜4テーマ 日本語品質見直し・差し替えパック

対象テーマ
1. ホットスポット・ポリシング
2. 自転車盗
3. 問題志向型警察活動（POP）
4. 住宅対象侵入窃盗

今回の見直し方針
- 本文は、日本語だけで意味が通ることを原則に再点検。
- crime risk / recent victim / resource / residential burglary / response / implementation 等、
  読解上不要な英語残りを日本語へ整理。
- 固有名詞、正式な論文・報告書タイトル、DOI、URL、SARA・EMMIE・RCT・RIRR等の
  原著確認に必要な語は維持。
- 専門語は必要な箇所だけ「日本語（英語）」とし、本文中で同じ英語を繰り返さない。
- 数値、研究デザイン、エビデンスの強さ、因果表現は変更しない。
- 「統計を詳しく見る」の STATS_DETAIL_START / STATS_DETAIL_END は維持。
- 原文URLは差し替え前と照合し、変更していない。
- CSS/JSはこのZIPに含めないため、スマホ表示修正を上書きしない。

特に修正した例
修正前：
「被害歴は、次のcrime riskを予測する情報になる」
「recent victimへResourceを集中することで、効率的なcrime preventionが可能になる」
「レビュー全体：31 studies」

修正後：
「被害歴は、次の犯罪リスクを予測する情報になる」
「最近被害に遭った住宅・世帯へ資源を集中することで、
  効率的な犯罪予防が可能になる」
「レビュー全体：31研究」

掲載方法
ZIPを解凍し、リポジトリ直下へフォルダ構造を保ったまま上書きしてください。

置換対象
- content/cases/ja/*.md  12ファイル
- content/evidence/ja/*.md 16ファイル
- data/problems.json
- data/interventions.json
- data/cases.json
- data/evidence-pages.json

合計：32ファイル＋README

注意
正式名称・論文名・機関名などは、検索・原著照合のため英語を残している箇所があります。
これは未翻訳ではなく、意図的な原文保持です。
