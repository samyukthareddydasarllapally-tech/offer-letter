// ── CURRICULUM DATA ────────────────────────────────────────────
const weeks = [
  {
    num: 1,
    module: "Deep Learning & PyTorch Foundations",
    desc: "Introduction to deep learning, PyTorch tensors and autograd, building and training neural networks using nn module, loss functions, optimizers, and training loops."
  },
  {
    num: 2,
    module: "Transformers & Hugging Face Ecosystem",
    desc: "Attention mechanisms, transformer architecture, working with Hugging Face models, tokenization, and running inference with pre-trained LLMs."
  },
  {
    num: 3,
    module: "Fine-Tuning & PEFT Techniques",
    desc: "Preparing custom datasets, fine-tuning pre-trained models using Trainer API, and parameter-efficient fine-tuning methods like LoRA and QLoRA."
  },
  {
    num: 4,
    module: "Embeddings & Vector Databases",
    desc: "Text embeddings, semantic similarity, cosine similarity, and vector search using FAISS, Chroma, and Pinecone for indexing and querying."
  },
  {
    num: 5,
    module: "Retrieval-Augmented Generation (RAG)",
    desc: "Document processing, vector stores, RAG pipelines, prompting strategies, generation workflows, and evaluation techniques."
  },
  {
    num: 6,
    module: "LLM Chatbots & AI Agents",
    desc: "Building custom chatbots with memory and dialogue management, advanced LLM techniques including ReAct agents and tool integration."
  },
  {
    num: 7,
    module: "Advanced Prompting, Evaluation & AI Ethics",
    desc: "Prompt engineering, chain-of-thought & few-shot prompting, generative content creation, evaluation metrics (BLEU, ROUGE, BERTScore, human eval), safety, bias detection, hallucination mitigation, and introduction to multi-modal generative AI."
  },
  {
    num: 8,
    module: "Best Practices for Deploying Generative AI Models & Capstone Project",
    desc: "Serving and monitoring generative AI models in production. Final capstone project and grade point assessment."
  }
];

// ── RENDER CURRICULUM ───────────────────────────────────────────
function renderCurriculum() {
  const container = document.getElementById("curriculum");
  if (!container) return;

  weeks.forEach((week, i) => {
    const row = document.createElement("div");
    row.className = "week-row";
    row.style.animationDelay = `${0.08 * i}s`;

    row.innerHTML = `
      <div class="week-num">
        <span class="num">${String(week.num).padStart(2, "0")}</span>
        <span class="lbl">Week</span>
      </div>
      <div class="week-content">
        <div class="week-module">${week.module}</div>
        <div class="week-desc">${week.desc}</div>
      </div>
    `;

    container.appendChild(row);
  });
}

// ── SCROLL REVEAL ───────────────────────────────────────────────
function initReveal() {
  const revealEls = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  revealEls.forEach((el) => observer.observe(el));
}

// ── SUBTLE CURSOR TRAIL ─────────────────────────────────────────
function initCursorGlow() {
  const glow = document.createElement("div");
  glow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    background: radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: left 0.4s ease, top 0.4s ease;
    left: -500px; top: -500px;
  `;
  document.body.appendChild(glow);

  document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });
}

// ── WEEK ROW HOVER TEAL ACCENT ──────────────────────────────────
function initWeekHover() {
  document.addEventListener("mouseover", (e) => {
    const row = e.target.closest(".week-row");
    if (row) {
      const num = row.querySelector(".num");
      if (num) num.style.color = "var(--teal)";
    }
  });
  document.addEventListener("mouseout", (e) => {
    const row = e.target.closest(".week-row");
    if (row) {
      const num = row.querySelector(".num");
      if (num) num.style.color = "var(--gold)";
    }
  });
}

// ── INIT ────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  renderCurriculum();
  initReveal();
  initCursorGlow();
  initWeekHover();

  // Re-observe after curriculum renders
  setTimeout(() => {
    const weekRows = document.querySelectorAll(".week-row");
    weekRows.forEach((el, i) => {
      el.style.animationDelay = `${0.06 * i}s`;
    });
  }, 50);
});
