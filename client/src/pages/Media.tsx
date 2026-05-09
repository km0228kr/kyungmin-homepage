/*
 * Media: Cold Manifesto × Signal & Noise
 * YouTube, talks, interviews, project records
 * Minimal list, no thumbnails
 */

import { motion } from "framer-motion";

const mediaItems = [
  {
    type: "발표",
    date: "2025.03",
    title: "LLM 편향의 기하학: 어디에, 어떻게 존재하는가",
    venue: "성균관대학교 AI 연구 세미나",
    description: "LLM 잠재 공간에서 편향의 방향 벡터를 시각화하고 분석한 연구 발표.",
    link: null,
  },
  {
    type: "강연",
    date: "2025.02",
    title: "AI 교육의 실패와 개입 설계",
    venue: "EdTech Korea 2025",
    description: "AI 튜터가 왜 실패하는지, 그리고 학습 개입 의사결정 엔진이 어떻게 다른지 설명한 강연.",
    link: null,
  },
  {
    type: "인터뷰",
    date: "2025.01",
    title: "Machine Unlearning: 모델은 어떻게 잊는가",
    venue: "AI 연구자 인터뷰 시리즈",
    description: "Machine Unlearning 연구의 동기, 방법론, 그리고 미래 방향에 대한 인터뷰.",
    link: null,
  },
  {
    type: "유튜브",
    date: "2024.12",
    title: "편향은 어디서 오는가: LLM 내부 탐구",
    venue: "YouTube",
    description: "LLM 내부 표현 공간에서 편향이 어떻게 형성되는지 시각적으로 설명한 영상.",
    link: "https://youtube.com",
  },
  {
    type: "프로젝트",
    date: "2024.11",
    title: "Learning Intervention Engine v0.1",
    venue: "GitHub",
    description: "학습 이탈 신호 감지 및 개입 의사결정 엔진 프로토타입 공개.",
    link: "https://github.com",
  },
];

export default function Media() {
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
          미디어
        </motion.p>

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          <h2
            className="text-3xl md:text-4xl font-semibold text-foreground leading-tight mb-4"
            style={{ fontFamily: "var(--font-playfair)", letterSpacing: "-0.02em" }}
          >
            발표, 강연, 기록
          </h2>
          <p
            className="text-sm text-muted-foreground leading-relaxed"
            style={{ fontFamily: "var(--font-geist)", fontWeight: 300 }}
          >
            연구와 창업의 과정을 외부와 공유한 기록들.
          </p>
        </motion.div>

        {/* Media list */}
        <div className="space-y-0">
          {mediaItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: "easeOut" }}
              className="border-b border-border py-8"
            >
              <div className="flex items-start gap-6">
                <div className="shrink-0 w-16">
                  <p
                    className="text-xs mb-1 text-steel"
                    style={{ fontFamily: "var(--font-mono-ibm)" }}
                  >
                    {item.type}
                  </p>
                  <p
                    className="text-xs text-muted-foreground"
                    style={{ fontFamily: "var(--font-mono-ibm)" }}
                  >
                    {item.date}
                  </p>
                </div>
                <div className="flex-1">
                  <h3
                    className="text-base font-medium text-foreground leading-snug mb-1"
                    style={{ fontFamily: "var(--font-geist)" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-xs text-muted-foreground mb-3"
                    style={{ fontFamily: "var(--font-mono-ibm)" }}
                  >
                    {item.venue}
                  </p>
                  <p
                    className="text-sm text-muted-foreground leading-relaxed mb-3"
                    style={{ fontFamily: "var(--font-geist)", fontWeight: 300 }}
                  >
                    {item.description}
                  </p>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-steel hover:text-foreground transition-colors duration-200"
                      style={{ fontFamily: "var(--font-mono-ibm)" }}
                    >
                      보기 →
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* YouTube channel link */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-12"
        >
          <p className="section-label mb-4">채널</p>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-steel hover:text-foreground transition-colors duration-200"
            style={{ fontFamily: "var(--font-mono-ibm)" }}
          >
            YouTube 채널 →
          </a>
        </motion.div>
      </div>
    </div>
  );
}
