import {escapeHtml} from "./utils.js";

/*
 * 「AIで原著を読み解く」
 * - サイト内でAI回答を生成しない
 * - 特定AIサービスを直接開かない
 * - 資料固有質問だけを表示する
 * - 完成済み generatedPrompt は使用せず、質問データから動的生成する
 */

const COMMON_READING_RULES = [
  "原文の意味と論理関係を保持する",
  "逐語訳ではなく自然な日本語に再構成する",
  "研究結果と著者の解釈を区別する",
  "AIによる補足を原著の記述と混同しない",
  "因果関係を原文以上に強く表現しない",
  "統計値を単純な割合に読み替えない",
  "必要な統計値は、その意味も説明する",
  "原著にない内容を補わない",
  "根拠が不足する場合は推測しない",
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
    typeof question.sourceUrl === "string"
  );
}


function buildPrompt(question){

  const keywords =
    Array.isArray(question.searchKeywords)
      ? question.searchKeywords.join(" / ")
      : "";

  const rules =
    COMMON_READING_RULES
      .map(rule => `・${rule}`)
      .join("\n");

  return `以下の原著を確認してください。

【原著URL】
${question.sourceUrl || ""}

【確認したい内容】
${question.displayQuestion || ""}

【原著内を確認するときの参考語】
${keywords}

【確認の目的】
${question.readingPurpose || ""}

この資料の中から、上記内容に関係する箇所を確認し、
日本の警察・自治体等の実務家が理解しやすい日本語で
簡潔に説明してください。

【読解ルール】

${rules}

【この資料で特に注意すること】
${question.studySpecificCaution || ""}

原著へアクセスできない場合や、
該当箇所を確認できない場合は、
推測せず、その旨を示してください。

原著へアクセスできない場合は、
原著を開いて該当する英文をコピーし、
この質問文と一緒にAIへ貼り付けるよう案内してください。`;
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
