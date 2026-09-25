import {escapeHtml} from "./utils.js";

/*
 * 「AIで原著を読み解く」
 * - サイト内でAI回答を生成しない
 * - 特定AIサービスを直接開かない
 * - 資料固有質問だけを表示する
 * - 完成済み generatedPrompt は使用せず、質問データから動的生成する
 */

const SOURCE_SCOPE_RULES = [
  "回答は、指定された原著で確認できる内容だけを根拠とする",
  "AI自身の一般知識や、他の研究・Web情報を使って回答を補完しない",
  "原著に記載されていない解釈、理由、メカニズム、実務上の意味を推測して追加しない",
  "原著の「研究結果」と「著者による解釈」を区別する",
  "著者自身が推測・可能性として述べている内容は断定せず、「著者は〜の可能性を指摘しています」など、原著と同程度の慎重さで表現する",
  "質問の一部について原著から確認できない場合は、その部分について「この原著からは確認できません」と明示する",
  "原著そのものを確認できない場合は、タイトル・要約・検索結果・一般知識などから回答を推測せず、原著を確認できないことを伝える"
];

const COMMON_READING_RULES = [
  "原文の意味と論理関係を保持する",
  "逐語訳ではなく自然な日本語に再構成する",
  "因果関係を原文以上に強く表現しない",
  "統計値を単純な割合に読み替えない",
  "必要な統計値は、その意味も説明する",
  "回答は必要以上に長くしない"
];

const COPY_SUCCESS =
  "質問文をコピーしました。\n普段お使いの生成AIに貼り付けてください。";


function ensureStyles(){

  if(
    document.querySelector(
      'link[data-ai-reading-style]'
    )
  ){
    return;
  }

  const link =
    document.createElement("link");

  link.rel = "stylesheet";
  link.href = "./css/ai-reading.css";
  link.dataset.aiReadingStyle = "true";

  document.head.appendChild(link);
}


function normaliseQuestions(config){

  if(
    !config ||
    !Array.isArray(config.questions)
  ){
    return [];
  }

  return config.questions.filter(question =>
    question &&
    typeof question.questionId === "string" &&
    typeof question.displayQuestion === "string" &&
    typeof question.sourceTitle === "string" &&
    typeof question.sourceUrl === "string"
  );
}


function buildPrompt(question){

  const keywords =
    Array.isArray(question.searchKeywords)
      ? question.searchKeywords.join(" / ")
      : "";

  const scopeRules =
    SOURCE_SCOPE_RULES
      .map(rule => `・${rule}`)
      .join("\n");

  const rules =
    COMMON_READING_RULES
      .map(rule => `・${rule}`)
      .join("\n");

  return `以下の原著について確認してください。

【原著名】
${question.sourceTitle || ""}

【原著URL】
${question.sourceUrl || ""}

まず、上記URLから原著を直接確認してください。

URLから直接確認できない場合は、
原著名とURLを手掛かりにWeb検索し、
指定された原著そのもの（同一論文・同一報告書・同一資料）の全文を探してください。

Web検索は「指定された原著そのものを見つけるため」に限って使用してください。
検索結果の要約、第三者サイト、別の研究、関連研究、解説記事、
公式機関による紹介ページや要約だけを根拠に回答してはいけません。

【確認したい内容】
${question.displayQuestion || ""}

【原著内・検索時の参考語】
${keywords}

【確認の目的】
${question.readingPurpose || ""}

この資料の中から、上記内容に関係する箇所を確認し、
日本の警察・自治体等の実務家が理解しやすい日本語で
簡潔に説明してください。

【回答範囲に関する重要なルール】

${scopeRules}

【読解ルール】

${rules}

【この資料で特に注意すること】
${question.studySpecificCaution || ""}

回答を作成する前に、次の点を確認してください。

1. 指定された原著そのものを確認できているか
2. 回答する各内容が、その原著のどこかで確認できるか
3. 研究結果と著者による解釈を混同していないか
4. 原著にない説明を、一般知識や他資料から補っていないか

質問に複数の論点があり、一部だけ原著で確認できる場合は、
確認できる部分だけ回答し、
確認できない部分には「この原著からは確認できません」と明記してください。

回答の最後に、今回の説明が次のどれに基づくかを示してください。

・指定URLの原著そのものを直接確認した
・Web検索によって、指定された原著そのものの全文を確認した
・利用者が貼り付けた原著本文の範囲を確認した
・指定された原著そのものを確認できなかった

指定された原著そのものを確認できない場合は、
タイトル、抄録、検索結果、公式紹介ページ、第三者の説明、
AI自身の一般知識などから内容を推測して回答しないでください。

その場合は、
「指定された原著そのものを確認できないため、この原著を根拠とした回答はできません。
原著をブラウザで開き、参考語を使って該当箇所を探し、
該当する本文をこのチャットに貼り付けてください」
と利用者へ案内してください。

貼り付けられた原著本文がある場合は、
その本文で確認できる範囲だけを根拠として回答してください。
貼り付けられていない部分については推測しないでください。`;
}

function serialiseConfig(config){

  return JSON.stringify(config)
    .replace(/</g,"\\u003c");
}


export function renderAiReadingBlock(config){

  const questions =
    normaliseQuestions(config);

  if(!questions.length){
    return "";
  }

  ensureStyles();

  const initial =
    questions[0];

  const initialPrompt =
    buildPrompt(initial);

  return `
    <section
      class="ai-reading"
      data-ai-reading
      aria-labelledby="aiReadingTitle"
    >

      <div class="ai-reading-head">

        <div class="ai-reading-kicker">
          原著読解補助
        </div>

        <h2 id="aiReadingTitle">
          AIで原著を読み解く
        </h2>

        <p>
          この資料について、AIで確認したい内容を選んでください。
        </p>

        <p>
          原著を確認するための質問文を作成します。
          作成された質問文をコピーし、
          普段お使いの生成AIに貼り付けて利用できます。
        </p>

      </div>


      <div class="ai-reading-step">

        <h3>
          1. 聞きたい内容を選ぶ
        </h3>

        <div
          class="ai-reading-options"
          role="radiogroup"
          aria-label="聞きたい内容を選ぶ"
        >

          ${questions.map(
            (question,index) => `
              <label class="ai-reading-option">

                <input
                  type="radio"
                  name="aiReadingQuestion"
                  value="${escapeHtml(question.questionId)}"
                  ${index === 0 ? "checked" : ""}
                >

                <span>
                  ${escapeHtml(question.displayQuestion)}
                </span>

              </label>
            `
          ).join("")}

        </div>

      </div>


      <div class="ai-reading-step">

        <h3>
          2. AIに送る質問文
        </h3>

        <textarea
          class="ai-reading-prompt"
          data-ai-reading-prompt
          rows="22"
          readonly
        >${escapeHtml(initialPrompt)}</textarea>

      </div>


      <div class="ai-reading-actions">

        <button
          class="ai-reading-copy"
          type="button"
          data-ai-reading-copy
        >
          質問文をコピー
        </button>

      </div>


      <p
        class="ai-reading-status"
        data-ai-reading-status
        role="status"
        aria-live="polite"
      ></p>


      <p class="ai-reading-note">
        この機能は正式翻訳やAI回答をサイト内で表示するものではありません。
        独自解説で概要を確認し、必要に応じて原著の特定論点を
        利用者自身が確認するための読解補助です。
      </p>


      <script
        type="application/json"
        data-ai-reading-config
      >${serialiseConfig({questions})}</script>

    </section>
  `;
}


async function copyText(value){

  if(
    navigator.clipboard &&
    window.isSecureContext
  ){

    await navigator.clipboard.writeText(
      value
    );

    return;
  }


  const textarea =
    document.createElement("textarea");

  textarea.value = value;
  textarea.setAttribute(
    "readonly",
    ""
  );

  textarea.style.position = "fixed";
  textarea.style.opacity = "0";

  document.body.appendChild(
    textarea
  );

  textarea.select();

  const ok =
    document.execCommand("copy");

  textarea.remove();

  if(!ok){
    throw new Error("copy failed");
  }
}


export function activateAiReading(){

  const root =
    document.querySelector(
      "[data-ai-reading]"
    );

  if(!root){
    return;
  }


  const configNode =
    root.querySelector(
      "[data-ai-reading-config]"
    );

  const promptBox =
    root.querySelector(
      "[data-ai-reading-prompt]"
    );

  if(
    !configNode ||
    !promptBox
  ){
    return;
  }


  let config;

  try{

    config =
      JSON.parse(
        configNode.textContent || "{}"
      );

  }catch{

    return;

  }


  const questions =
    normaliseQuestions(config);

  const byId =
    new Map(
      questions.map(question => [
        question.questionId,
        question
      ])
    );


  root
    .querySelectorAll(
      'input[name="aiReadingQuestion"]'
    )
    .forEach(input => {

      input.addEventListener(
        "change",
        () => {

          const question =
            byId.get(
              input.value
            );

          if(!question){
            return;
          }

          promptBox.value =
            buildPrompt(question);

          const status =
            root.querySelector(
              "[data-ai-reading-status]"
            );

          if(status){
            status.textContent = "";
          }

        }
      );

    });


  root
    .querySelector(
      "[data-ai-reading-copy]"
    )
    ?.addEventListener(
      "click",
      async () => {

        const status =
          root.querySelector(
            "[data-ai-reading-status]"
          );

        try{

          await copyText(
            promptBox.value
          );

          if(status){
            status.textContent =
              COPY_SUCCESS;
          }

        }catch{

          promptBox.focus();
          promptBox.select();

          if(status){
            status.textContent =
              "自動コピーできませんでした。全文を選択したので、端末のコピー操作を使用してください。";
          }

        }

      }
    );
}
