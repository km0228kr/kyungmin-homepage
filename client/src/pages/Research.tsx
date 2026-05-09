/*
 * Research: Cold Manifesto × Signal & Noise
 * Paper-centric layout, research questions, open problems
 * No skill bars, no tech stack lists
 */

import { motion } from "framer-motion";

const currentResearch = [
  {
    title: "LLM 내부 편향의 기하학적 구조",
    description: "대형 언어 모델의 잠재 공간에서 편향이 어떤 방향 벡터로 인코딩되어 있는지 분석한다. Bias Direction을 식별하고, 이를 제거하거나 조작하는 방법을 연구한다.",
    keywords: ["Bias Geometry", "Representation Space", "Direction Vector"],
    status: "진행 중",
  },
  {
    title: "Machine Unlearning과 지식 구조",
    description: "특정 지식을 모델에서 제거할 때 인접 지식에 미치는 영향을 측정한다. 망각의 범위와 정확도 사이의 트레이드오프를 분석한다.",
    keywords: ["Machine Unlearning", "Knowledge Structure", "Forgetting"],
    status: "진행 중",
  },
  {
    title: "Multi-agent 시스템의 사회적 동조 편향",
    description: "다수의 LLM 에이전트가 상호작용할 때 발생하는 집단적 편향 패턴을 연구한다. 소수 의견이 억압되는 메커니즘과 그 조건을 분석한다.",
    keywords: ["Social Conformity Bias", "Multi-agent", "Collective Behavior"],
    status: "설계 중",
  },
];

const papers = [
  {
    title: "Bias Geometry in Large Language Models: Mapping and Mitigation",
    venue: "준비 중",
    year: "2025",
    abstract: "LLM의 잠재 공간에서 편향의 기하학적 표현을 분석하고, 방향 벡터 기반 편향 제거 방법론을 제안한다.",
  },
  {
    title: "Selective Forgetting: Precision Unlearning in Neural Language Models",
    venue: "준비 중",
    year: "2025",
    abstract: "Machine Unlearning의 정밀도를 높이면서 인접 지식 손상을 최소화하는 방법을 연구한다.",
  },
];

const researchQuestions = [
  "편향은 모델의 어느 레이어에, 어떤 형태로 존재하는가?",
  "Machine Unlearning 후 모델의 '기억'은 어떻게 재구성되는가?",
  "Multi-agent 시스템에서 소수 의견은 어떤 조건에서 살아남는가?",
  "Hidden Failure State는 외부에서 측정 가능한가?",
  "학습자의 이탈 신호와 LLM의 편향 신호 사이에 구조적 유사성이 있는가?",
];

const openProblems = [
  "편향 제거와 성능 유지 사이의 트레이드오프를 정량화하는 방법",
  "Unlearning의 완전성을 검증하는 평가 지표",
  "Multi-agent 편향의 창발적 특성 예측",
  "개입 타이밍 최적화를 위한 상태 공간 모델링",
];

export default function Research() {
  return (
    <div className="min-h-screen px-8 md:px-16 lg:px-20 py-24 md:py-32">
      <div className="max-w-2xl">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="section-label mb-12"
        >
          연구
        </motion.p>

        {/* Current Research */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-10">
            <span className="section-label">현재 연구</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="space-y-10">
            {currentResearch.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.55, ease: "easeOut" }}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3
                    className="text-lg md:text-xl font-semibold text-foreground leading-snug"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {item.title}
                  </h3>
                  <span
                    className="shrink-0 text-xs text-steel mt-1"
                    style={{ fontFamily: "var(--font-mono-ibm)" }}
                  >
                    {item.status}
                  </span>
                </div>
                <p
                  className="text-sm text-muted-foreground leading-relaxed mb-4"
                  style={{ fontFamily: "var(--font-geist)", fontWeight: 300 }}
                >
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.keywords.map((kw) => (
                    <span key={kw} className="keyword-tag">{kw}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Papers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-10">
            <span className="section-label">논문</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="space-y-8">
            {papers.map((paper, i) => (
              <motion.div
                key={paper.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.55, ease: "easeOut" }}
                className="border-l-2 border-border pl-6"
              >
                <div className="flex items-start gap-3 mb-2">
                  <span
                    className="text-xs text-muted-foreground mt-0.5"
                    style={{ fontFamily: "var(--font-mono-ibm)" }}
                  >
                    {paper.year}
                  </span>
                  <div>
                    <h4
                      className="text-base font-medium text-foreground leading-snug mb-1"
                      style={{ fontFamily: "var(--font-geist)" }}
                    >
                      {paper.title}
                    </h4>
                    <p
                      className="text-xs text-steel mb-3"
                      style={{ fontFamily: "var(--font-mono-ibm)" }}
                    >
                      {paper.venue}
                    </p>
                    <p
                      className="text-sm text-muted-foreground leading-relaxed"
                      style={{ fontFamily: "var(--font-geist)", fontWeight: 300 }}
                    >
                      {paper.abstract}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Research Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-10">
            <span className="section-label">연구 질문</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="space-y-4">
            {researchQuestions.map((q, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.06, duration: 0.5, ease: "easeOut" }}
                className="flex gap-4 items-baseline"
              >
                <span
                  className="text-xs text-muted-foreground shrink-0 w-6"
                  style={{ fontFamily: "var(--font-mono-ibm)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p
                  className="text-sm text-foreground leading-relaxed"
                  style={{ fontFamily: "var(--font-geist)" }}
                >
                  {q}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Open Problems */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-10">
            <span className="section-label">열린 문제</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="space-y-3">
            {openProblems.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.06, duration: 0.5, ease: "easeOut" }}
                className="text-sm text-muted-foreground leading-relaxed pl-4 border-l border-border"
                style={{ fontFamily: "var(--font-geist)", fontWeight: 300 }}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </motion.div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="border-t border-border pt-10"
        >
          <p className="section-label mb-6">외부 링크</p>
          <div className="flex gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-steel hover:text-foreground transition-colors duration-200"
              style={{ fontFamily: "var(--font-mono-ibm)" }}
            >
              GitHub →
            </a>
            <a
              href="https://scholar.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-steel hover:text-foreground transition-colors duration-200"
              style={{ fontFamily: "var(--font-mono-ibm)" }}
            >
              Google Scholar →
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
