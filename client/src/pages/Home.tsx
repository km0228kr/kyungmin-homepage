/*
 * Home: Cold Manifesto × Signal & Noise
 * Hero: Full viewport, left-aligned typography, no images
 * 3 cards: Research / Startup / Writing
 * Animation: opacity + translateY, 0.6s ease-out, staggered
 */

import { motion } from "framer-motion";
import { Link } from "wouter";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.65,
      ease: "easeOut" as const,
    },
  }),
};

const cards = [
  {
    index: "01",
    title: "연구",
    href: "/research",
    description: "LLM 내부 편향이 어떻게 형성되고, 어디에 기하학적으로 존재하며, 어떻게 제거할 수 있는가.",
    keywords: ["LLM Bias", "Machine Unlearning", "Bias Geometry", "Social Conformity Bias"],
  },
  {
    index: "02",
    title: "창업",
    href: "/startup",
    description: "학습자가 포기하기 전, 로그와 상태 신호를 읽고 최적 개입을 설계하는 Learning Intervention Engine.",
    keywords: ["Intervention Engine", "Dropout Signal", "Learning State"],
  },
  {
    index: "03",
    title: "글",
    href: "/writing",
    description: "AI 시대 인간의 몰입, 방향감각, 기억, 편향, 무너짐에 대한 글.",
    keywords: ["Essay", "AI & Human", "Cognition"],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-20 py-24 md:py-32">
        <div className="max-w-3xl">
          <motion.p
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="section-label mb-8"
          >
            성균관대학교 인공지능융합학과 석사과정
          </motion.p>

          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <h1
              className="text-7xl md:text-8xl lg:text-9xl font-bold text-foreground leading-none mb-3"
              style={{ fontFamily: "var(--font-playfair)", letterSpacing: "-0.03em" }}
            >
              권경민
            </h1>
            <p
              className="text-lg md:text-xl text-muted-foreground font-light mb-12"
              style={{ fontFamily: "var(--font-mono-ibm)", letterSpacing: "0.05em" }}
            >
              AI Researcher & Builder
            </p>
          </motion.div>

          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mb-8"
          >
            <hr className="divider mb-12 max-w-xs" />
            <h2
              className="text-2xl md:text-3xl lg:text-[2.5rem] font-semibold text-foreground leading-snug mb-6"
              style={{ fontFamily: "var(--font-playfair)", letterSpacing: "-0.02em" }}
            >
              무너짐 직전의 신호를 읽고,
              <br />
              개입하는 지능을 만듭니다.
            </h2>
            <p
              className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl"
              style={{ fontFamily: "var(--font-geist)", fontWeight: 300 }}
            >
              인간과 AI 시스템이 어떻게 편향되고, 흔들리고,
              무너지고, 회복되는지 연구합니다.
            </p>
          </motion.div>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <Link href="/about">
              <span
                className="inline-flex items-center gap-2 text-sm text-steel hover:text-foreground transition-colors duration-200"
                style={{ fontFamily: "var(--font-mono-ibm)" }}
              >
                소개 읽기
                <span className="text-xs">→</span>
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="px-8 md:px-16 lg:px-20 pb-32">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-0">
            <span className="section-label">주요 작업</span>
            <div className="flex-1 h-px bg-border" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-border">
          {cards.map((card, i) => (
            <motion.div
              key={card.index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1, duration: 0.55, ease: "easeOut" as const }}
            >
              <Link href={card.href}>
                <div
                  className={`
                    group p-8 md:p-10 h-full flex flex-col
                    border-b md:border-b-0 md:border-r border-border last:border-0
                    hover:bg-secondary transition-colors duration-300 cursor-pointer
                  `}
                >
                  {/* Index */}
                  <p
                    className="text-xs text-muted-foreground mb-6"
                    style={{ fontFamily: "var(--font-mono-ibm)" }}
                  >
                    {card.index}
                  </p>

                  {/* Title */}
                  <h3
                    className="text-2xl md:text-3xl font-semibold text-foreground mb-4 group-hover:text-steel transition-colors duration-200"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-sm text-muted-foreground leading-relaxed mb-8 flex-1"
                    style={{ fontFamily: "var(--font-geist)", fontWeight: 300 }}
                  >
                    {card.description}
                  </p>

                  {/* Keywords */}
                  <div className="flex flex-wrap gap-2">
                    {card.keywords.map((kw) => (
                      <span key={kw} className="keyword-tag">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom statement */}
      <section className="px-8 md:px-16 lg:px-20 pb-32 border-t border-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="pt-16 max-w-2xl"
        >
          <p
            className="text-base md:text-lg text-muted-foreground leading-relaxed"
            style={{ fontFamily: "var(--font-geist)", fontWeight: 300 }}
          >
            AI 유행을 따라가는 것이 아니라,{" "}
            <span className="text-foreground font-medium">
              AI 시대 인간과 지능 시스템의 무너짐과 개입
            </span>
            이라는 문제를 장기적으로 파고 있습니다.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
