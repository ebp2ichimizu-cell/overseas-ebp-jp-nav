export function renderResources(){
  return `
    <section class="section">
      <div class="container">
        <p class="section-kicker">OVERSEAS RESOURCES</p>
        <h1>海外の実務ガイドを読む</h1>
        <p class="lead">
          各情報源は役割が異なります。まず「何が分かる資料なのか」を確認し、
          必要な資料へ進みます。
        </p>

        <div class="resource-list">
          <article class="resource-card">
            <div class="source-name">Crime Reduction Toolkit</div>
            <h2>対策の効果・仕組み・条件・実装・コストを見る</h2>
            <p>
              犯罪予防施策について、Effect、Mechanism、Moderators、
              Implementation、Economic costなどを整理して確認するための情報源です。
            </p>
          </article>

          <article class="resource-card">
            <div class="source-name">Police Practice Bank</div>
            <h2>実際に行われた警察の取組を見る</h2>
            <p>
              実務でどのような問題に対して、どのような対応が行われたのかを確認するための情報源です。
            </p>
          </article>

          <article class="resource-card">
            <div class="source-name">Center for Problem-Oriented Policing（POP Center）</div>
            <h2>問題分析と対応設計を深める</h2>
            <p>
              Problem-Oriented Policingの考え方、問題別ガイド、実践事例などを確認するための情報源です。
            </p>
          </article>

          <article class="resource-card">
            <div class="source-name">Evidence-Based Policing Matrix</div>
            <h2>警察介入研究を全体の中で位置づける</h2>
            <p>
              介入研究を、対象の種類・範囲、先回り型か事後対応型か、
              特定の問題にどれだけ絞るかという観点から整理して見るための情報源です。
            </p>
          </article>

          <article class="resource-card">
            <div class="source-name">Campbell Collaboration</div>
            <h2>システマティックレビュー・メタ分析を確認する</h2>
            <p>
              複数研究を統合したレビューから、介入全体の傾向や研究上の限界を確認するための情報源です。
            </p>
          </article>

          <article class="resource-card">
            <div class="source-name">College of Policing</div>
            <h2>警察実務の公式ガイダンスを確認する</h2>
            <p>
              警察業務の進め方、判断基準、手順、留意事項などを体系的に確認するための情報源です。
            </p>
          </article>
        </div>
      </div>
    </section>
  `;
}
