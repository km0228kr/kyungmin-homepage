/*
 * Writing: Cold Manifesto × Signal & Noise
 * Blog archive — minimal, date-indexed, no thumbnails
 */

import { motion } from "framer-motion";

const posts = [
  {
    date: "2025.04",
    title: "AI 시대 인간은 왜 방향을 잃는가",
    description: "GPS가 공간 기억을 약화시키듯, LLM은 사고의 방향감각을 대체하기 시작했다. 이것이 인지적 퇴화인가, 아니면 새로운 형태의 지능인가.",
    tags: ["AI & Cognition", "Direction"],
  },
  {
    date: "2025.03",
    title: "Machine Unlearning과 지워지지 않는 기억",
    description: "모델에서 특정 지식을 제거하는 것은 인간의 망각과 어떻게 다른가. 그리고 왜 완전한 망각은 불가능에 가까운가.",
    tags: ["Machine Unlearning", "Memory"],
  },
  {
    date: "2025.02",
    title: "편향은 무한을 유한에 담을 때 생긴다",
    description: "벡터 공간의 차원 축소는 필연적으로 정보를 잃는다. 편향은 그 손실이 균등하지 않을 때 발생한다.",
    tags: ["Bias", "Representation"],
  },
  {
    date: "2025.01",
    title: "학생은 언제 포기하는가",
    description: "이탈은 사건이 아니라 과정이다. 포기의 전조 신호는 행동 데이터 안에 이미 존재한다.",
    tags: ["Learning", "Dropout Signal"],
  },
  {
    date: "2024.12",
    title: "AI 튜터가 실패하는 이유",
    description: "대부분의 AI 튜터는 콘텐츠 전달 문제를 풀려 한다. 진짜 문제는 학습자의 상태 감지와 개입 타이밍이다.",
    tags: ["EdTech", "Intervention"],
  },
  {
    date: "2024.11",
    title: "GPT는 사고를 확장시키는가, 약화시키는가",
    description: "LLM이 사고의 보조 도구가 될 때, 우리는 무엇을 얻고 무엇을 잃는가. 인지 부하와 사고 위임의 경계.",
    tags: ["LLM", "Cognition", "AI & Human"],
  },
  {
    date: "2024.10",
    title: "Multi-agent 시스템에서 소수 의견은 살아남는가",
    description: "여러 LLM이 상호작용할 때, 집단적 편향이 어떻게 형성되고 소수 의견이 어떻게 억압되는지.",
    tags: ["Multi-agent", "Social Conformity"],
  },
  {
    date: "2024.09",
    title: "Hidden Failure State: 시스템은 어떻게 조용히 무너지는가",
    description: "명시적 오류 없이 시스템이 서서히 실패하는 상태. 이를 감지하고 개입하는 방법.",
    tags: ["Hidden Failure", "System Design"],
  },
];

export default function Writing() {
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
          글
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
            생각을 정리하는 방식으로
            <br />
            글을 씁니다.
          </h2>
          <p
            className="text-sm text-muted-foreground leading-relaxed"
            style={{ fontFamily: "var(--font-geist)", fontWeight: 300 }}
          >
            연구 노트, 관찰, 질문. 완성된 답이 아니라 진행 중인 사고.
          </p>
        </motion.div>

        {/* Posts list */}
        <div className="space-y-0">
          {posts.map((post, i) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.05, duration: 0.5, ease: "easeOut" }}
              className="group border-b border-border py-8 cursor-pointer"
            >
              <div className="flex items-start gap-6">
                <span
                  className="text-xs text-muted-foreground shrink-0 mt-1 w-16"
                  style={{ fontFamily: "var(--font-mono-ibm)" }}
                >
                  {post.date}
                </span>
                <div className="flex-1">
                  <h3
                    className="text-base md:text-lg font-medium text-foreground leading-snug mb-2 group-hover:text-steel transition-colors duration-200"
                    style={{ fontFamily: "var(--font-geist)" }}
                  >
                    {post.title}
                  </h3>
                  <p
                    className="text-sm text-muted-foreground leading-relaxed mb-4"
                    style={{ fontFamily: "var(--font-geist)", fontWeight: 300 }}
                  >
                    {post.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="keyword-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-12 text-xs text-muted-foreground"
          style={{ fontFamily: "var(--font-mono-ibm)" }}
        >
          * 글은 순차적으로 업데이트됩니다.
        </motion.p>
      </div>
    </div>
  );
}
