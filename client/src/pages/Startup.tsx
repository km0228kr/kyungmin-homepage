/*
 * Startup: Cold Manifesto × Signal & Noise
 * "학습 개입 의사결정 엔진" — not "AI tutor"
 * Problem → Solution → MVP → Engine Structure
 */

import { motion } from "framer-motion";

const engineLayers = [
  {
    layer: "01",
    name: "Signal Detection",
    description: "학습 로그, 세션 데이터, 행동 패턴에서 이탈 전조 신호를 추출한다.",
    signals: ["세션 이탈 패턴", "오답 반복 빈도", "응답 지연 시간", "스크롤 패턴"],
  },
  {
    layer: "02",
    name: "State Classification",
    description: "현재 학습자의 상태를 분류한다. 혼란, 좌절, 이탈 임박, 정상 진행.",
    signals: ["Confusion State", "Frustration State", "Pre-dropout State", "Flow State"],
  },
  {
    layer: "03",
    name: "Intervention Decision",
    description: "상태에 따라 최적 개입 유형과 타이밍을 결정한다.",
    signals: ["개입 유형 선택", "타이밍 최적화", "강도 조절", "개인화"],
  },
  {
    layer: "04",
    name: "Feedback Loop",
    description: "개입 결과를 측정하고 다음 개입 의사결정에 반영한다.",
    signals: ["개입 효과 측정", "모델 업데이트", "패턴 학습"],
  },
];

const targetCustomers = [
  { type: "B2B", description: "온라인 교육 플랫폼 — 학습자 이탈률 감소, 완강률 향상" },
  { type: "B2B", description: "기업 교육팀 — 직원 교육 효과 측정 및 개입 자동화" },
  { type: "B2B2C", description: "EdTech 스타트업 — 개입 엔진을 API로 연동" },
];

export default function Startup() {
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
          창업
        </motion.p>

        {/* Hero statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight mb-6"
            style={{ fontFamily: "var(--font-playfair)", letterSpacing: "-0.02em" }}
          >
            학습 개입
            <br />
            의사결정 엔진
          </h2>
          <p
            className="text-base md:text-lg text-muted-foreground leading-relaxed"
            style={{ fontFamily: "var(--font-geist)", fontWeight: 300 }}
          >
            학생이 포기하기 직전의 신호를 감지하고,
            언제 어떤 개입을 넣을지 결정하는 AI Intervention Layer.
          </p>
        </motion.div>

        {/* Problem */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="section-label">문제</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="space-y-4 text-muted-foreground" style={{ fontFamily: "var(--font-geist)", fontWeight: 300 }}>
            <p className="text-sm leading-relaxed">
              온라인 교육의 평균 완강률은 10% 미만이다.
              학습자의 90%는 중간에 포기한다.
            </p>
            <p className="text-sm leading-relaxed">
              기존 시스템은 이탈 후에야 데이터를 확인한다.
              포기한 학습자에게 "다시 시작하세요"라는 알림을 보내는 것은
              개입이 아니라 기록이다.
            </p>
            <p className="text-sm leading-relaxed">
              진짜 문제는 이탈 <em className="text-foreground not-italic">직전</em>의 상태를 읽지 못한다는 것이다.
              그 신호는 존재한다. 다만 아무도 읽지 않았을 뿐이다.
            </p>
          </div>
        </motion.div>

        {/* Solution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="section-label">해결책</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="space-y-4 text-muted-foreground" style={{ fontFamily: "var(--font-geist)", fontWeight: 300 }}>
            <p className="text-sm leading-relaxed">
              학습 로그와 행동 데이터에서 이탈 전조 신호를 실시간으로 추출하고,
              학습자의 현재 상태를 분류한 뒤,
              최적의 개입 유형과 타이밍을 결정하는 엔진을 만든다.
            </p>
            <p className="text-sm leading-relaxed">
              AI 튜터가 아니다. 개입 의사결정 레이어다.
              기존 교육 플랫폼 위에 얹히는 인텔리전스 레이어.
            </p>
          </div>
        </motion.div>

        {/* MVP */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="section-label">MVP</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="border border-border p-6 md:p-8">
            <p
              className="text-xs text-muted-foreground mb-4"
              style={{ fontFamily: "var(--font-mono-ibm)" }}
            >
              현재 단계
            </p>
            <div className="space-y-3 text-sm text-foreground" style={{ fontFamily: "var(--font-geist)" }}>
              <div className="flex items-start gap-3">
                <span className="text-steel mt-0.5" style={{ fontFamily: "var(--font-mono-ibm)", fontSize: "0.7rem" }}>✓</span>
                <span>이탈 신호 추출 파이프라인 설계 완료</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-steel mt-0.5" style={{ fontFamily: "var(--font-mono-ibm)", fontSize: "0.7rem" }}>✓</span>
                <span>상태 분류 모델 프로토타입 구현</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-muted-foreground mt-0.5" style={{ fontFamily: "var(--font-mono-ibm)", fontSize: "0.7rem" }}>○</span>
                <span className="text-muted-foreground">운영자 대시보드 개발 중</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-muted-foreground mt-0.5" style={{ fontFamily: "var(--font-mono-ibm)", fontSize: "0.7rem" }}>○</span>
                <span className="text-muted-foreground">파일럿 파트너 모집 중</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Engine Structure */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-10">
            <span className="section-label">개입 엔진 구조</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="space-y-0">
            {engineLayers.map((layer, i) => (
              <motion.div
                key={layer.layer}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.08, duration: 0.55, ease: "easeOut" }}
                className="border border-border border-b-0 last:border-b p-6 md:p-8"
              >
                <div className="flex items-start gap-4">
                  <span
                    className="text-xs text-muted-foreground shrink-0 mt-0.5"
                    style={{ fontFamily: "var(--font-mono-ibm)" }}
                  >
                    {layer.layer}
                  </span>
                  <div className="flex-1">
                    <h4
                      className="text-sm font-medium text-steel mb-2"
                      style={{ fontFamily: "var(--font-mono-ibm)" }}
                    >
                      {layer.name}
                    </h4>
                    <p
                      className="text-sm text-muted-foreground leading-relaxed mb-4"
                      style={{ fontFamily: "var(--font-geist)", fontWeight: 300 }}
                    >
                      {layer.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {layer.signals.map((s) => (
                        <span key={s} className="keyword-tag">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Target Customers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="section-label">대상 고객</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="space-y-4">
            {targetCustomers.map((c, i) => (
              <div key={i} className="flex gap-4 items-baseline">
                <span
                  className="text-xs text-steel shrink-0"
                  style={{ fontFamily: "var(--font-mono-ibm)" }}
                >
                  {c.type}
                </span>
                <p
                  className="text-sm text-muted-foreground"
                  style={{ fontFamily: "var(--font-geist)", fontWeight: 300 }}
                >
                  {c.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* PoC Contact */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="border-t border-border pt-10"
        >
          <p className="section-label mb-4">PoC 문의</p>
          <p
            className="text-sm text-muted-foreground mb-4"
            style={{ fontFamily: "var(--font-geist)", fontWeight: 300 }}
          >
            파일럿 파트너십 또는 기술 협력에 관심 있으시면 연락 주세요.
          </p>
          <a
            href="mailto:contact@kwonkyungmin.com"
            className="text-sm text-steel hover:text-foreground transition-colors duration-200"
            style={{ fontFamily: "var(--font-mono-ibm)" }}
          >
            contact@kwonkyungmin.com →
          </a>
        </motion.div>
      </div>
    </div>
  );
}
