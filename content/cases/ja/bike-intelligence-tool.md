---
content_type: site-commentary
source: supplied-content-master
---

# Merseyside Police｜自転車情報ツール

### 最初に結論

この事例の特徴は、
「自転車を登録してもらう」
ことではありません。

Bike Registerを、

- 職務質問
- 捜索
- 押収物
- 被害届
- 情報分析
- 販売店
- 学校
- 地域マーキング
- 業績管理

まで警察業務へ組み込んだことです。

Wirralでは、
実施前12か月と実施後12か月の比較で
自転車盗が45.6％減少したと報告されています。

ただし、
Practice Bank掲載ページでは
無作為化比較や対応させた比較群による因果評価は示されていません。

したがって、

「Bike Registerによって45.6％減った」

とは結論づけません。

## 1．Problem

Merseyside Policeは、
自転車が、

- 盗難の対象
だけでなく、
- 他の取得犯罪やcounty lines等に関連する移動手段

として使われる問題にも着目しました。

そこで自転車を、

「所有物」

だけでなく、

「照会可能な情報対象」

として扱う仕組みを作りました。

## 2．Aim

**Practice Bankが示す目的：**

- 日常的な自転車照会を導入
- 盗難自転車を発見
- 特定自転車と犯罪・犯人を結びつける捜査・防犯情報を得る
- 盗品としての魅力を下げる
- 回収自転車を所有者へ返す

## 3．実際に何をしたか

### 警察官の日常業務

- 職務質問等での確認時にBike Registerを照会
- 令状執行実施時に照会
- 警察保管自転車の受入時に照会
- 処分前にも再照会
- 自転車関連事件についてCrime Demand Unitが照会
- 被害者へ登録・盗難登録変更を案内

### 記録

stop searchフォームへ、
自転車情報や写真を保存できる項目を追加。

### マーキング

- 定期イベント
- 高犯罪地域
- 被害後の安心確保のための訪問
- 小中学校
- 中学校進学時期

などで無料マーキング。

### 販売店

販売店を訪問・訓練し、
購入時（購入時点（購入時点））に登録・マーキングできる体制を作る。

## 4．指示するだけでなく、実施状況を追跡する（指示・割当だけでなく実施状況の追跡）

マーキング実施時に
Microsoft Formsへ入力。

Bike Registerから月次データを受領し、
警察システムへ取り込み。

- 個人
- チーム

の利用状況をダッシュボード（dashboard）で確認。

さらに、

crime data
×
bike marking event data

を重ね合わせ、
月次業績確認会議で検討。

### 実務上の意味

イベントを開催して終わりではなく、

「誰が、どこで、どのくらい使っているか」

まで管理しています。

## 5．費用

**初期試行費用：**

£17,449

**用途：**
- マーキング用品
- 簡易テント
- 路面表示用型
- 標識
- mat等

重大暴力対策資金を利用。

## 6．報告された結果

**Wirral：**

実施前12か月
vs
実施後12か月

**自転車盗：**
45.6％減

また、
自転車関連強盗も持続的に減少したと報告。

登録住民数も増加し、
全警察組織全体へ展開。

## 7．この45.6％はどう読むか

**正しい表現：**

「Wirralでは、導入前12か月と導入後12か月を比較して、自転車盗が45.6％減少したと報告されている。」

**避ける表現：**

「Bike Registerにより自転車盗を45.6％減らした。」

**理由：**

同時期に、

- マーキング
- 照会
- 警察教育
- 高犯罪地点への活動
- 販売店
- 学校
- 広報
- 業務プロセス変更

を組み合わせています。

また、
掲載資料は厳密な対照群評価を提示していません。

## 8．実装上の学び

Practice Bankは、
次の課題を挙げています。

- Evidence Management Unitへ照会を組み込む際の役割認識
- 日常業務として定着させること
- 資金確保
- 現職／新任職員の教育

対応として、

- 試行
- 予防 Hubによる現場支援
- 指揮部門の支援
- 統括・管理体制
- オンライン研修

を使用。

## 9．自分の現場へ移すなら

**最低限記録：**

- 登録数
- マーキング数
- 照会数
- 職務質問等での確認照会数
- 盗難車ヒット数
- 回収数
- 返還数
- 関連被疑者情報
- 対象地域の盗難件数
- 比較地域の盗難件数

可能なら、段階導入や比較地域を加えると、
「導入前後で変わったこと」と「介入に伴って変わったこと」をより分けて読めます。

## 10．実務で持ち帰ること

1．登録制度は「登録イベント」ではなく警察業務へ埋め込む。

2．登録・照会・回収・返還・情報を一つの流れとして設計する。

3．販売店や学校を入口にすると対象範囲を広げられる。

4．ダッシュボード（dashboard）で実装状況を追う。

5．45.6％という前後変化に、実装量や比較地域の情報を重ねると、何が変化に関係したかをさらに検討できる。

<!-- STATS_DETAIL_START -->

## 統計を詳しく見る

**対象：RED-01 Merseyside Bike 捜査・防犯情報 tool**

### 評価の種類

導入前後比較

### 比較期間

実施前12か月
vs
実施後12か月

### 主要アウトカム

Wirralの自転車盗

### 報告結果

45.6％減

### 実装情報

**試行費用：**
£17,449

Bike Registerを、
マーキングだけでなく照会、被害届、押収物、学校、販売店、dashboardへ組み込んだ。

### 比較群

Practice Bank掲載ページでは、
独立した対応させた比較群等は示されていない。

### 効果量・95％CI・p値

Practice Bank掲載ページでは報告なし。

### この数字をどう読むか

45.6％は、
制度導入後の地域全体の前後変化です。

登録・マーキング、警察官教育、照会、高犯罪地点での活動、販売店・学校との連携が同時に動いています。

次の評価では、
比較地域や段階導入を加えることで、

「どの対策がどのアウトカムに関係したか」

をさらに分けて確認できます。

### 原著でさらに確認する

→ 第3階層のCollege of Policing Practice Bankへ

<!-- STATS_DETAIL_END -->

## 原著・資料を確認する

**原題：**
Bike 捜査・防犯情報 tool for serious 財産獲得目的の犯罪 offences

**組織：**
Merseyside Police

**提供：**
College of Policing Practice Bank

**初回公開：**
17 December 2024

**開始：**
July 2023

**実践段階：**
地域内で評価済み（Evaluated locally）

**公式ページ：**
[https://www.college.police.uk/support-forces/practices/bike-intelligence-tool-serious-acquisitive-crime-offences](https://www.college.police.uk/support-forces/practices/bike-intelligence-tool-serious-acquisitive-crime-offences)

**関連：**
Merseyside Police award page
[https://www.merseyside.police.uk/news/merseyside/news/2024/july/merseyside-bike-theft-prevention-project-wins-national-award/](https://www.merseyside.police.uk/news/merseyside/news/2024/july/merseyside-bike-theft-prevention-project-wins-national-award/)

**全文翻訳：**
当面保留

**権利：**
College of Policing。翻訳は許諾対象として管理。
