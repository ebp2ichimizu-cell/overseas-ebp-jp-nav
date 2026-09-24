export function renderHome(){
  return `
    <section class="hero">
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
            翻訳サイトではなく、読む資料と読む範囲を選ぶための実務支援サイトです。
          </p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="mode-grid">
          <a class="mode-card card-red" href="#/problems">
            <h2>課題・問題から探す</h2>
            <p>この課題について、海外で実際に何をしたか。実例から探します。</p>
          </a>

          <a class="mode-card card-blue" href="#/interventions">
            <h2>対策から探す</h2>
            <p>この対策は何か、どの情報源で何が分かるか。知見から探します。</p>
          </a>
        </div>
      </div>
    </section>
  `;
}
