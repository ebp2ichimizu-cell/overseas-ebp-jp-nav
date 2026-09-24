export function renderHome(){
  return `
    <section class="hero hero-entry">
      <div class="hero-inner container">
        <img
          class="hero-logo"
          src="./assets/overseas-ebp-logo.png"
          alt="EBP 海外ナビ いちみず会"
          width="150"
          height="150"
        >

        <div class="hero-copy">
          <div class="eyebrow">Evidence for practice</div>
          <h1>海外の知見を、日本の現場で考える。</h1>
          <p class="lead">
            Evidence-Based Policing、犯罪予防、Problem-Oriented Policingの
            実務ガイド・研究・実践事例を、日本語で探し、比較し、原文確認までつなぎます。
          </p>

          <div class="entry-prompt">
            <span class="entry-prompt-kicker">SEARCH</span>
            <h2>何から探しますか？</h2>
          </div>

          <div class="primary-entry-grid">
            <a class="primary-entry-card primary-entry-blue" href="#/interventions">
              <div class="primary-entry-top">
                <span class="primary-entry-label">INTERVENTION</span>
                <span class="primary-entry-arrow">→</span>
              </div>
              <h3>対策から探す</h3>
              <p>
                ホットスポット・パトロール、CCTV、POPなど、
                対策名から効果・エビデンス・実装上の知見を確認します。
              </p>
              <span class="primary-entry-cta">対策を探す</span>
            </a>

            <a class="primary-entry-card primary-entry-red" href="#/problems">
              <div class="primary-entry-top">
                <span class="primary-entry-label">PROBLEM</span>
                <span class="primary-entry-arrow">→</span>
              </div>
              <h3>課題・問題から探す</h3>
              <p>
                自転車盗、住宅侵入窃盗など、
                現場の課題から海外で実際に行われた実例を確認します。
              </p>
              <span class="primary-entry-cta">実例を探す</span>
            </a>
          </div>

          <div class="secondary-entry">
            <a href="#/resources">
              海外の実務ガイド・情報源から探す
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-soft">
      <div class="container">
        <div class="section-intro">
          <p class="section-kicker">MAJOR SOURCES</p>
          <h2>主な海外情報源</h2>
          <p>
            同じ「EBP資料」でも役割は異なります。何を知りたいかで使い分けます。
          </p>
        </div>

        <div class="source-grid">
          <article class="source-card">
            <div class="source-name">Crime Reduction Toolkit</div>
            <h3>対策の効果・条件・実装を確認する</h3>
            <p>Effect、エビデンスの質、実装、限界などを把握するための入口。</p>
          </article>

          <article class="source-card">
            <div class="source-name">Police Practice Bank</div>
            <h3>実際に行われた取組を見る</h3>
            <p>警察実務で実施された取組や実践例を確認するための情報源。</p>
          </article>

          <article class="source-card">
            <div class="source-name">POP Center</div>
            <h3>問題分析と対応設計を考える</h3>
            <p>問題指向型警察活動の分析、対応、実践事例を確認するための情報源。</p>
          </article>

          <article class="source-card">
            <div class="source-name">Evidence-Based Policing Matrix</div>
            <h3>研究全体の位置づけを見る</h3>
            <p>警察介入研究を、対象・先回り性・問題への絞り方などから整理して見る。</p>
          </article>
        </div>

        <div class="section-action">
          <a class="secondary-button" href="#/resources">海外リソース一覧を見る →</a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-intro">
          <p class="section-kicker">HOW TO READ</p>
          <h2>3つの階層で読む</h2>
        </div>

        <div class="steps-grid">
          <article class="step-card">
            <div class="step-badge">1</div>
            <h3>選ぶ</h3>
            <p>検索結果やカードから、読むべき実例・対策・情報源を選びます。</p>
          </article>

          <article class="step-card">
            <div class="step-badge">2</div>
            <h3>日本語で理解する</h3>
            <p>要点、エビデンス、限界、実装上の注意を日本語解説で確認します。</p>
          </article>

          <article class="step-card">
            <div class="step-badge">3</div>
            <h3>一次資料を読む</h3>
            <p>必要に応じて原著・公式資料、公開可能な日本語訳へ進みます。</p>
          </article>
        </div>
      </div>
    </section>
  `;
}
