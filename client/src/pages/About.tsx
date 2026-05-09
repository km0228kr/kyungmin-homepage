/*
 * About: Cold Manifesto × Signal & Noise
 * Researcher manifesto style — no "안녕하세요", no LinkedIn bio
 * Strong, declarative, minimal
 */

import { motion } from "framer-motion";

const fadeUp = (i: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: {
    delay: i * 0.1,
    duration: 0.6,
    ease: "easeOut" as const,
  },
});

const positions = [
  { label: "소속", value: "성균관대학교 인공지능융합학과 석사과정" },
  { label: "역할", value: "AI 연구자 · AI 교육 스타트업 창업자" },
  { label: "연구", value: "LLM Bias · Machine Unlearning · Bias Geometry" },
  { label: "위치", value: "Seoul, Korea" },
];

export default function About() {
  return (
    <div className="min-h-screen px-8 md:px-16 lg:px-20 py-24 md:py-32">
      <div className="max-w-2xl">
        {/* Section label */}
        <motion.p {...fadeUp(0)} className="section-label mb-12">
          소개
        </motion.p>

        {/* Main declaration */}
        <motion.div {...fadeUp(1)} className="mb-16">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight mb-8"
            style={{ fontFamily: "var(--font-playfair)", letterSpacing: "-0.02em" }}
          >
            나는 무너짐의 패턴을
            <br />
            연구하는 사람입니다.
          </h2>
          <div className="space-y-5 text-muted-foreground leading-relaxed" style={{ fontFamily: "var(--font-geist)", fontWeight: 300 }}>
            <p className="text-base md:text-lg">
              AI 시스템은 편향된다. 학습자는 포기한다. 인간은 방향을 잃는다.
              이 세 가지는 같은 문제의 다른 이름이다.
            </p>
            <p className="text-base md:text-lg">
              나는 LLM 내부의 편향이 어디에, 어떤 기하학적 구조로 존재하는지 연구한다.
              동시에, 학습자가 포기하기 직전 어떤 신호를 내보내는지 관찰하고,
              그 신호에 정확하게 개입하는 시스템을 만든다.
            </p>
            <p className="text-base md:text-lg">
              연구와 창업은 나에게 같은 질문의 두 방향이다.
              하나는 문제를 이해하는 방향이고, 다른 하나는 문제를 해결하는 방향이다.
            </p>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.hr {...fadeUp(2)} className="divider mb-12" />

        {/* Position info */}
        <motion.div {...fadeUp(3)} className="mb-16">
          <div className="space-y-4">
            {positions.map((pos) => (
              <div key={pos.label} className="flex gap-8 items-baseline">
                <span className="section-label w-16 shrink-0">
                  {pos.label}
                </span>
                <span
                  className="text-sm text-foreground"
                  style={{ fontFamily: "var(--font-geist)" }}
                >
                  {pos.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <motion.hr {...fadeUp(4)} className="divider mb-12" />

        {/* Research stance */}
        <motion.div {...fadeUp(5)}>
          <p className="section-label mb-6">연구 입장</p>
          <div className="space-y-4 text-muted-foreground" style={{ fontFamily: "var(--font-geist)", fontWeight: 300 }}>
            <p className="text-sm leading-relaxed">
              편향은 정보 손실의 결과다. 무한한 세계를 유한한 벡터에 담을 때,
              무언가는 반드시 왜곡된다. 나는 그 왜곡이 어디서 발생하고,
              어떻게 전파되며, 어떻게 제거할 수 있는지에 관심이 있다.
            </p>
            <p className="text-sm leading-relaxed">
              Machine Unlearning은 단순히 데이터를 지우는 문제가 아니다.
              모델이 무언가를 "잊는다"는 것이 무엇을 의미하는지,
              그 망각이 다른 지식에 어떤 영향을 미치는지가 핵심 질문이다.
            </p>
            <p className="text-sm leading-relaxed">
              학습 개입 연구는 같은 맥락에서 출발한다.
              학습자가 무너지기 직전의 상태는 측정 가능하다.
              그 상태를 읽고, 정확한 시점에 정확한 개입을 넣는 것이 목표다.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
