---
id: crime-hotspots-mobile-app
source_id: college-practice-bank
intervention_id: hot-spots-policing
rights_status: commentary-only
---

# Crime hot spots mobile phone app
## 課題（Problem）｜何が課題だったか

Thames Valley Policeは、
重大暴力が集中する場所へ警察活動を重点化する方針を持っていました。

しかし、

- どのhot spotへ行くか
- 警察官へどう伝えるか
- 本当に行ったか
- 何分滞在したか
- 何をしたか

を日常業務の中で管理・記録する必要がありました。


## 対象設定（Targeting）｜どこを対象にしたか

警察データをPower BIのserious violence ダッシュボード（dashboard）へ集約し、

- 何が起きているか
- どこで起きているか
- 誰が関係しているか
- 過去の犯罪歴（offending history）

等を確認できるようにしました。

その上で、暴力犯罪が集中する場所をhot spotとして設定しました。


## 介入（Intervention）｜何をしたか

警察支給の携帯端末（force-issued mobile phone）上のアプリを使用。

警察官は、

- 近くの対象hot spot
- 地図
- 郵便番号（postcode）
- 注意事項
- 簡易説明（briefing）

を確認できます。

数クリックで対象地点へ誘導される設計です。


## 実施状況の追跡（Tracking）｜何を記録したか

位置情報（geolocation）を利用して、

- hot spot内の滞在時間
- 通過したか
- 停止したか
- 徒歩か車両か

等を記録。

巡回後には、

- 積極的な声かけ・接触（positive engagement）
- 停止・捜索（stop and search）
- 逮捕（arrest）

等の活動も入力します。

データはダッシュボード（dashboard）へ戻り、
実施遵守（compliance）や提供状況（delivery）を確認できます。


## 介入量（Dose）の管理

アプリにはタイマー（timer）を設け、
パトロール時間を揃える仕組みも入っています。

Operation Rasureでは、
同じ場所への過剰な集中を防ぐため、
一定回数に達した地点を表示から外す設計もあります。


評価設計（Evaluation design）｜どう評価したか

2025年に査読論文が公表されました。

45の暴力hot spotを用いた
クロスオーバー型無作為化実験（crossover-randomized experiment）です。

hot spotを日ごとに
介入／対照へ無作為割付しました。

評価したのは、

① アプリtaskingで警察官のhot spot活動量が増えたか
② 暴力犯罪が減ったか

の二つです。


結果（Findings）｜何が分かったか

## 実装

アプリによるtaskingで、
対象hot spotにおける警察官の活動量は大幅に増えました。

つまり、

「警察官を指定地点へ実際に向かわせる」

という実装（implementation）は改善しました。


## 犯罪

暴力犯罪は8.74％減少しました。

しかし、
統計的に有意ではありませんでした。


## したがって

「アプリにより暴力犯罪が8.74％減った」
とは結論づけません。

正確には、

「アプリtaskingによりhot spotでの警察活動は大きく増えた。一方、暴力犯罪は8.74％減少したが統計的に有意ではなかった」

です。


なぜ重要か

この事例は、

実装指標（Implementation outcome）
と
犯罪発生の指標（Crime outcome）

を明確に分けています。

施策が効かなかった場合も、

A：
理論・介入そのものが効かなかった

B：
現場で十分実施されなかった

を区別しなければなりません。

この研究では少なくとも、
「ホットスポット（hot spot）へ警察官を向かわせること」は実現しています。


限界（Limitations）

研究者は、
Thames Valleyのような広域・非大都市圏では、

従来研究を参考にしたhot spotのサイズ・形状や犯罪密度が、
暴力犯罪抑止に最適ではなかった可能性を指摘しています。

暴力犯罪には、

- アルコール
- 薬物
- 衝動的反応
- 屋内での発生

等が関係することがあり、
警察官の可視性による抑止が他犯罪より働きにくい可能性もあります。


他地域への適用（Transferability）｜他地域へ移すとき

アプリそのものをコピーするより、

- どのデータでhot spotを作るか
- hot spotのサイズ
- 犯罪密度
- 時間帯
- 担当部隊
- 巡回回数
- 巡回時間
- 実施状況の追跡方法（tracking）

を地域に合わせて再設計する必要があります。


## 実務で持ち帰ること

1．アプリ自体が犯罪を減らすわけではない

アプリは、
正しい場所へ警察官を送り、
実施状況を測るための実装インフラです。


2．「行かせたか」と「犯罪が減ったか」を分ける

この事例では前者は改善しましたが、
後者は統計的に明確ではありませんでした。


3．効果が出なかったら、すぐ施策全体を否定しない

hot spotの大きさ、
犯罪密度、
対象犯罪、
滞在時間、
対策（Response）等が適切だったかを確認します。


4．自組織で最低限記録する

- 誰を指示・割当（tasking）したか
- どの地点か
- いつ行ったか
- 何分いたか
- 何をしたか
- 何回実施したか
- 犯罪件数／犯罪被害の深刻度（crime / harm）がどう変わったか

この記録があって初めて、
実装の到達度と犯罪結果を分けて見ることで、次に調整すべき箇所を特定できます。


関連する実践事例

Operation Rasure｜Thames Valley Police

RED-01と同様に、ホットスポットへの活動をモバイル端末・位置情報・実施記録で管理する関連事例です。
第1階層の代表赤カードには重複掲載せず、RED-01から関連事例として接続します。

公式ページ：
[https://www.college.police.uk/support-forces/practices/operation-rasure-thames-valley-police](https://www.college.police.uk/support-forces/practices/operation-rasure-thames-valley-police)

<!-- STATS_DETAIL_START -->

## 統計で確認する

## 研究デザイン

クロスオーバー型無作為化実験
（crossover randomized experiment）

## 対象

45 violent hot spots

hot spotを日単位で介入／対照に割付。

## 主要アウトカム

1．hot spotでの警察活動量
2．暴力犯罪

## 主要結果

アプリtaskingにより、
hot spot内の警察活動量は大幅に増加。

Practice Bank／論文の整理では、
およそ93％多い警察活動が報告。

暴力犯罪：
8.74％減少方向

統計的有意性：
統計的に明確ではない

## 95％CI・正確なp値

第3階層のOlphin et al. (2025)原著で確認する。

## この数字をどう読むか

この研究は、

「実装」
と
「犯罪Outcome」

を分けて読めます。

アプリは警察官を対象地点へ向かわせるという実装には作用しました。

一方、
その介入量・Responseが暴力犯罪を明確に減らすところまでは確認できませんでした。

次の検証では、

- hot spotの大きさ
- 犯罪密度
- 滞在時間
- 現場で行ったResponse

を分けて確認できます。

## 原著で確認する

[→ 第3階層のOlphin et al. (2025)へ](https://www.college.police.uk/support-forces/practices/operation-rasure-thames-valley-police)

<!-- STATS_DETAIL_END -->

## 原典・資料を確認する

Practice Bank：
[https://www.college.police.uk/support-forces/practices/crime-hot-spots-mobile-phone-app](https://www.college.police.uk/support-forces/practices/crime-hot-spots-mobile-phone-app)

関連実装：
Operation Rasure
[https://www.college.police.uk/support-forces/practices/operation-rasure-thames-valley-police](https://www.college.police.uk/support-forces/practices/operation-rasure-thames-valley-police)

査読RCT：
Olphin et al. (2025)
効果検証（Testing） application-based tasking and hotspots policing in a geographically large, non-metropolitan police service: a two-in-one randomised trial

DOI：
10.1007/s41887-024-00096-7

原文：
[https://link.springer.com/article/10.1007/s41887-024-00096-7](https://link.springer.com/article/10.1007/s41887-024-00096-7)

実践段階（Stage）：
独立評価済み（Independently evaluated）

Olphin et al.ライセンス：
CC BY-NC-ND 4.0

全文翻訳：
要許諾

日本語独自解説：
掲載可
