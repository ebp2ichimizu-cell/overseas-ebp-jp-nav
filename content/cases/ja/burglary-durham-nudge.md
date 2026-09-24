---
content_type: site-commentary
source: supplied-content-master
---

# Durham Constabulary｜Nudging down burglary

### 最初に結論

Durham Constabularyは、
反復する住宅侵入窃盗（repeat burglary） 郵便番号区域を毎週特定し、
対象郵便番号区域へ住宅防犯ナッジ型防犯チラシ（nudge leaflet）を届けました。

重要なのは、
単なる「防犯チラシ配布」ではないことです。

- 反復する住宅侵入窃盗（repeat burglary） dataで対象を絞る
- treatment / controlへrandom allocation
- 配布実績をCertificate of Serviceで記録
- 6か月後のburglaryを比較

まで一つの評価設計として行いました。

## 1．問題分析

2019年、
County Durhamでは
2,829 residential burglariesが記録されました。

分析では、

individual propertiesの再被害（repeat victimisation）：
6.7％

同一郵便番号区域内で住宅侵入窃盗を経験した住宅：
19.2％

と報告。

さらに、
約3分の1のburglaryで、
door / windowがunsecured等、
victim behaviourに関係する状況が確認されました。

### 実務の観点

ここから、

「住宅侵入窃盗が多い」

ではなく、

repeat 郵便番号区域
＋
insecure property

という具体的な介入点へ進んでいます。

## 2．対策

ナッジ型防犯チラシ（nudge leaflet）は、
MINDSPACE／EAST等の行動科学を参考に設計。

内容には、

- street image
- その郵便番号区域で使われたoffender tactics
- 具体的な防犯行動

等を含めました。

目的は、
genericな防犯情報ではなく、

「自分のstreetで起きているrisk」

として認識してもらうことです。

## 3．Randomisation

RCT期間：
2020年6月15日～2021年2月22日

36週間。

毎週、
residential burglaryとrepeat 郵便番号区域を確認。

Cambridge Randomiserを使い、

Treatment：
157 郵便番号区域

Control：
154 郵便番号区域

へ割付。

Treatment 郵便番号区域内の全住宅へ、
ナッジ型防犯チラシ（nudge leaflet）を配布。

Controlには配布しませんでした。

## 4．実装を記録

leaflet delivery時には
Certificate of Serviceを作成。

記録：

- delivery date
- houses nudged
- delivery personnel
- time taken

### EBPとしての意味

「leafletを配ることにした」

ではなく、

実際に
誰が
何戸へ
何時間かけて
届けたか

を残しています。

Crime アウトカムと実装を分けて見られます。

## 5．両群ともburglaryは減った

trialはCOVID-19 pandemic期に行われました。

そのため、
ControlもTreatmentも
residential burglaryが減少しました。

### 重要

Treatmentでcrimeが減ったことだけを見れば、
チラシによる変化とパンデミックによる変化を分けられません。

Controlを置いたことで、
両群共通の大きな犯罪減少と、
Treatment側でさらに大きかったreductionを分けて検討できます。

## 6．主要結果

Control：

pre
mean 1.53 crimes/郵便番号区域
↓
post
0.62

Treatment：

pre
1.66
↓
post
0.53

両群とも統計的に明確な減少。

Treatmentでは
Controlよりさらに8.5％大きいreductionが報告されました。

### サイトでの表現

論文著者はこのadditional reductionを
ナッジ型防犯チラシ（nudge leaflet）によるものと解釈しています。

ただし、
サイトでは、

「Treatment側で8.5％大きいreductionが観察された」

とまず記載し、
study periodがCOVID-19期であること、
両群とも犯罪減少があったことを併記します。

<!-- STATS_DETAIL_START -->

## 統計を詳しく見る

### 対象

Treatment：
157 郵便番号区域

Control：
154 郵便番号区域

### 期間

RCT：
36週間

follow-up：
各郵便番号区域のrandomisation後6か月

### Residential burglary

Control：

pre mean：
1.53 crimes/郵便番号区域

post mean：
0.62

SD：
pre 0.81
post 1.24

paired t-test：
t(132)=8.0

p：
p < .05

Cohen's d：
0.87

Treatment：

pre mean：
1.66

post mean：
0.53

SD：
pre 0.92
post 1.04

paired t-test：
t(130)=10.1

Cohen's d：
1.15

### TreatmentとControlの差

Treatment側：
8.5％大きいreductionと報告。

### Vehicle crime

Control：
0.65 → 0.55
t(48)=0.86
p=.39
Cohen's d=.18

Treatment：
0.70 → 0.55
t(39)=0.73
p=.47
Cohen's d=.21

vehicle crimeでは、
統計的に明確なpre-post differenceは確認されていません。

### Cost

leaflet trial total cost：
£3,125.94

7,994 A4 leaflets

paperは、
burglary preventionのみで
平均£2.70 saving / £1 investmentと推計。

vehicle crimeの推計を加え、
合計£5.39 / £1と報告。

### この数字をどう読むか

最も重要なのは、
Treatmentだけのpre-post reductionを
leaflet effectとしないことです。

COVID-19期でControlも大きく減っているため、
Treatment / Controlの差を見る必要があります。

また、
paperはcost-benefitを独自の前提で算出しているため、
他地域へ£5.39をそのまま適用しません。

### 原著の表・図

Figure 1：
ナッジ型防犯チラシ（nudge leaflet）

Figure 2：
pre-trial burglary trend

Table 2：
trial costs

Table 3：
burglary cost analysis

Table 4：
vehicle crime cost analysis

### 原著でさらに確認する

Crowe et al. (2024)
Nudging down residential burglaries: A randomized control trial


[原著・資料を確認する →](https://academic.oup.com/policing/article/doi/10.1093/police/paae068/7691023)

<!-- STATS_DETAIL_END -->

## 7．この研究から何を学ぶか

### 原著で確認されたこと

TreatmentとControlの両方でburglaryは減少。

Treatmentでより大きなreductionが観察された。

### 原著者の解釈

randomisation等を踏まえ、
追加的な減少をナッジ介入によるものと解釈。

### サイトによる独自解説

この研究で特に重要なのは、

data targeting
＋
randomisation
＋
実装 tracking

を、
日常のneighbourhood policingへ組み込んだことです。

また、
pandemicという大きな外部変化があっても、
control groupを置くことで評価を継続できました。

## 8．実務で持ち帰ること

## 1．generic leafletではなくlocal risk情報を使う。

## 2．repeat 郵便番号区域でTargetを絞る。

## 3．Treatment / Controlを置くと外部変化を分けやすい。

## 4．deliveryそのものを記録する。

## 5．crime outcomeと実装を分ける。

## 6．cost estimateの前提を確認する。

## 原著・資料を確認する

College of Policing Practice Bank
Nudging down burglary
[https://www.college.police.uk/support-forces/practices/nudging-down-burglary](https://www.college.police.uk/support-forces/practices/nudging-down-burglary)

原著：
Crowe A, Cooper J, Roach J. (2024)
Nudging down residential burglaries: A randomized control trial.
Policing: A Journal of Policy and Practice, 18, paae068.

DOI:
10.1093/police/paae068

[https://academic.oup.com/policing/article/doi/10.1093/police/paae068/7691023](https://academic.oup.com/policing/article/doi/10.1093/police/paae068/7691023)

License：
CC BY 4.0

全文翻訳：
権利上は可能。
β版では保留。
