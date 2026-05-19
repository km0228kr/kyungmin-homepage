/*
 * SignCV: dedicated research showcase page.
 * Built for: km0228kr/kyungmin-homepage
 *
 * Structure
 *   1. Hero
 *   2. Core Insight
 *   3. Method Overview
 *   4. Main Result
 *   5. What the Edit Showed
 *   6. Research Contribution
 *   7. My Role
 *   8. Paper Record
 *
 * Local helpers
 *   SectionHeader, ComparisonBar, ProcessStep, MetaItem, RecordRow,
 *   ContributionBlock, EditRow
 */

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";

// ──────────────────────────────────────────────────────────────────
// Local helper components
// ──────────────────────────────────────────────────────────────────

interface SectionHeaderProps {
  label: string;
  title?: ReactNode;
  className?: string;
}

function SectionHeader({ label, title, className = "" }: SectionHeaderProps) {
  return (
    <div className={`mb-10 ${className}`}>
      <div className="flex items-center gap-4 mb-6">
        <span className="section-label">{label}</span>
        <div className="flex-1 h-px bg-border" />
      </div>
      {title && (
        <h2
          className="text-2xl md:text-3xl font-semibold leading-tight text-foreground max-w-3xl"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {title}
        </h2>
      )}
    </div>
  );
}

interface ComparisonBarProps {
  label?: string;
  value: number;
  emphasis?: "default" | "strong";
}

function ComparisonBar({ label, value, emphasis = "default" }: ComparisonBarProps) {
  const fillClass = emphasis === "strong" ? "bg-foreground" : "bg-steel";
  return (
    <div className="flex items-center gap-3 py-2">
      {label !== undefined && (
        <span
          className="text-xs text-steel w-14 shrink-0"
          style={{ fontFamily: "var(--font-mono-ibm)" }}
        >
          {label}
        </span>
      )}
      <div className="flex-1 relative h-[2px] bg-border">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${Math.min(value, 100)}%` }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className={`absolute inset-y-0 left-0 ${fillClass}`}
        />
      </div>
      <span
        className="text-xs tabular-nums w-16 text-right shrink-0 text-foreground"
        style={{ fontFamily: "var(--font-mono-ibm)" }}
      >
        {value.toFixed(2)}%
      </span>
    </div>
  );
}

interface ProcessStepProps {
  number: string;
  title: string;
  body: string;
  isLast?: boolean;
}

function ProcessStep({ number, title, body, isLast }: ProcessStepProps) {
  return (
    <div
      className={`p-6 md:p-8 ${
        !isLast ? "border-b md:border-b-0 md:border-r border-border" : ""
      }`}
    >
      <span
        className="text-xs text-steel block mb-4"
        style={{ fontFamily: "var(--font-mono-ibm)" }}
      >
        Step {number}
      </span>
      <h4
        className="text-base font-medium text-foreground mb-3"
        style={{ fontFamily: "var(--font-geist)" }}
      >
        {title}
      </h4>
      <p
        className="text-sm text-muted-foreground leading-relaxed"
        style={{ fontFamily: "var(--font-geist)", fontWeight: 300 }}
      >
        {body}
      </p>
    </div>
  );
}

interface MetaItemProps {
  label: string;
  children: ReactNode;
}

function MetaItem({ label, children }: MetaItemProps) {
  return (
    <div>
      <p
        className="text-xs text-steel mb-2"
        style={{ fontFamily: "var(--font-mono-ibm)" }}
      >
        {label}
      </p>
      <div
        className="text-sm text-foreground leading-relaxed"
        style={{ fontFamily: "var(--font-geist)" }}
      >
        {children}
      </div>
    </div>
  );
}

interface RecordRowProps {
  label: string;
  children: ReactNode;
}

function RecordRow({ label, children }: RecordRowProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-2 md:gap-8 py-5 border-b border-border last:border-b-0">
      <p
        className="text-xs text-steel"
        style={{ fontFamily: "var(--font-mono-ibm)" }}
      >
        {label}
      </p>
      <div
        className="text-sm text-foreground leading-relaxed"
        style={{ fontFamily: "var(--font-geist)" }}
      >
        {children}
      </div>
    </div>
  );
}

interface ContributionBlockProps {
  number: string;
  body: string;
  index: number;
}

function ContributionBlock({ number, body, index }: ContributionBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.1, duration: 0.55, ease: "easeOut" }}
      className="border-t border-border pt-6"
    >
      <span
        className="text-xs text-steel block mb-5"
        style={{ fontFamily: "var(--font-mono-ibm)" }}
      >
        {number}
      </span>
      <p
        className="text-sm text-foreground leading-relaxed"
        style={{ fontFamily: "var(--font-geist)" }}
      >
        {body}
      </p>
    </motion.div>
  );
}

interface EditRow {
  label: string;
  before: string;
  after: string;
  improved: boolean;
}

interface EditCardProps {
  model: string;
  rows: EditRow[];
}

function EditCard({ model, rows }: EditCardProps) {
  return (
    <div className="border border-border p-8">
      <div className="flex items-baseline justify-between mb-6 pb-4 border-b border-border">
        <p
          className="text-base font-medium text-foreground"
          style={{ fontFamily: "var(--font-geist)" }}
        >
          {model}
        </p>
        <p
          className="text-xs text-steel"
          style={{ fontFamily: "var(--font-mono-ibm)" }}
        >
          Bias score · base → edited
        </p>
      </div>
      <div className="space-y-4">
        {rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between">
            <span
              className="text-xs text-steel"
              style={{ fontFamily: "var(--font-mono-ibm)" }}
            >
              {row.label}
            </span>
            <span
              className="text-sm tabular-nums"
              style={{ fontFamily: "var(--font-mono-ibm)" }}
            >
              <span className="text-muted-foreground">{row.before}</span>
              <span className="text-steel mx-2">→</span>
              <span className={row.improved ? "text-foreground" : "text-muted-foreground"}>
                {row.after}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────
// Data
// ──────────────────────────────────────────────────────────────────

const mistralEditRows: EditRow[] = [
  { label: "Race", before: "0.0307", after: "0.0245", improved: true },
  { label: "SES", before: "0.0811", after: "0.0901", improved: false },
  { label: "Gender", before: "0.0249", after: "0.0285", improved: false },
];

const llamaEditRows: EditRow[] = [
  { label: "Race", before: "0.3650", after: "0.3681", improved: false },
  { label: "SES", before: "0.3303", after: "0.3243", improved: true },
  { label: "Gender", before: "0.3025", after: "0.2989", improved: true },
];

const roles = [
  "연구 질문 설계",
  "SignCV 방법론 고안",
  "LoRA delta extraction pipeline 구현",
  "Sign-consensus filtering 및 projection edit 구현",
  "Mistral / Llama 비교 실험 설계",
  "Survivor rate 분석",
  "Ablation 실험과 결과 해석",
  "논문 전체 집필",
];

const keywords = ["LLM Bias", "Bias Geometry", "Model Editing", "Fairness", "Projection Editing"];

// ──────────────────────────────────────────────────────────────────
// Page
// ──────────────────────────────────────────────────────────────────

export default function SignCV() {
  return (
    <div className="min-h-screen px-8 md:px-16 lg:px-20 py-24 md:py-32">
      <div className="max-w-6xl">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-16"
        >
          <Link
            href="/research"
            className="text-sm text-steel hover:text-foreground transition-colors duration-200"
            style={{ fontFamily: "var(--font-mono-ibm)" }}
          >
            ← 연구 목록
          </Link>
        </motion.div>

        {/* ─────────── 1. HERO ─────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 mb-32"
        >
          {/* Left */}
          <div className="md:col-span-7">
            <div
              className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-steel mb-10"
              style={{ fontFamily: "var(--font-mono-ibm)" }}
            >
              <span>Submitted Research · EAI@KDD 2026</span>
              <span className="opacity-40">/</span>
              <span>First Author</span>
            </div>

            <h1
              className="text-6xl md:text-7xl lg:text-8xl font-semibold text-foreground mb-6 leading-none"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              SignCV
            </h1>

            <p
              className="text-base md:text-lg text-muted-foreground leading-snug mb-12 max-w-xl"
              style={{ fontFamily: "var(--font-geist)", fontWeight: 300 }}
            >
              A Sign-Consensus Vector Probe for
              <br />
              Model-Dependent Multi-Attribute Bias Geometry
            </p>

            <p
              className="text-lg md:text-xl text-foreground leading-relaxed mb-8 max-w-xl"
              style={{ fontFamily: "var(--font-geist)" }}
            >
              다중 편향 편집이 성립하려면
              <br />
              편향 축들이 실제로 공유 방향을 가져야 한다.
              <br />
              SignCV는 편집 이전에 그 구조를 먼저 측정한다.
            </p>

            <div
              className="text-sm text-muted-foreground leading-relaxed max-w-xl space-y-3"
              style={{ fontFamily: "var(--font-geist)", fontWeight: 300 }}
            >
              <p>Race, Gender, SES 편향 방향이 모델 내부에서 얼마나 겹쳐 있는지 분석했다.</p>
              <p>같은 절차를 적용해도 Mistral과 Llama는 전혀 다른 cross-axis geometry를 보였다.</p>
            </div>
          </div>

          {/* Right — numeric panel */}
          <div className="md:col-span-5">
            <div className="border border-border p-8 md:p-10">
              <p
                className="text-7xl md:text-8xl font-semibold text-foreground leading-none mb-5 tabular-nums"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                7.6×
              </p>
              <p
                className="text-xs text-steel mb-1"
                style={{ fontFamily: "var(--font-mono-ibm)" }}
              >
                Gap in shared multi-attribute bias geometry
              </p>
              <p
                className="text-xs text-muted-foreground mb-10"
                style={{ fontFamily: "var(--font-geist)", fontWeight: 300 }}
              >
                Cross-axis survivor rate
              </p>

              <div className="space-y-6 pt-8 border-t border-border">
                <div className="flex items-baseline justify-between">
                  <span
                    className="text-xs text-steel"
                    style={{ fontFamily: "var(--font-mono-ibm)" }}
                  >
                    Mistral
                  </span>
                  <span
                    className="text-3xl md:text-4xl font-semibold tabular-nums text-foreground"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    7.05<span className="text-base text-steel">%</span>
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span
                    className="text-xs text-steel"
                    style={{ fontFamily: "var(--font-mono-ibm)" }}
                  >
                    Llama
                  </span>
                  <span
                    className="text-3xl md:text-4xl font-semibold tabular-nums text-foreground"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    53.48<span className="text-base text-steel">%</span>
                  </span>
                </div>
              </div>

              <div
                className="text-xs text-steel mt-10 pt-6 border-t border-border space-y-1"
                style={{ fontFamily: "var(--font-mono-ibm)" }}
              >
                <p>Race · Gender · SES</p>
                <p className="opacity-60">Same extraction pipeline</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ─────────── 2. CORE INSIGHT ─────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <SectionHeader
            label="Core Insight"
            title="What must be true before a shared multi-bias edit?"
          />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-7">
              <div
                className="space-y-5 text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl"
                style={{ fontFamily: "var(--font-geist)", fontWeight: 300 }}
              >
                <p>
                  기존 direction-based debiasing은 여러 편향 축을 하나의 공통 방향으로 결합해 편집하는 경우가 많다.
                </p>
                <p>
                  이 접근이 성립하려면 각 편향 축의 update direction이 모델 내부에서 충분히 겹쳐 있어야 한다.
                </p>
                <p className="text-foreground">
                  SignCV는 이 전제를 직접 측정했다. 공유 편향 방향이 얼마나 남는지를 cross-axis survivor rate로 정량화했다.
                </p>
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="border border-border p-7 md:p-8">
                <p
                  className="text-xs text-steel mb-5"
                  style={{ fontFamily: "var(--font-mono-ibm)" }}
                >
                  Question
                </p>
                <p
                  className="text-base md:text-lg text-foreground leading-snug"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Do multiple demographic bias axes share a usable parameter-space direction?
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ─────────── 3. METHOD OVERVIEW ─────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <SectionHeader label="Method Overview" title="How SignCV Works" />

          <div className="grid grid-cols-1 md:grid-cols-4 border-t border-b border-border mb-16">
            <ProcessStep
              number="01"
              title="Extract"
              body="Race, Gender, SES별 LoRA update direction을 수집했다. 각 축마다 seed와 learning rate를 바꿔 반복 학습했다."
            />
            <ProcessStep
              number="02"
              title="Stabilize"
              body="같은 편향 축 안에서 반복적으로 같은 부호를 유지한 좌표만 남겼다."
            />
            <ProcessStep
              number="03"
              title="Intersect"
              body="세 편향 축 사이에서도 부호가 일치하는 좌표를 추렸다. 이 비율을 survivor rate로 정의했다."
            />
            <ProcessStep
              number="04"
              title="Probe"
              body="추출한 공통 방향으로 projection edit를 적용하고 모델별 downstream behavior를 확인했다."
              isLast
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-8">
            <MetaItem label="Models">
              Mistral-7B-Instruct-v0.3
              <br />
              Llama-2-7B-hf
            </MetaItem>
            <MetaItem label="Bias Axes">Race · Gender · SES</MetaItem>
            <MetaItem label="LoRA Adapters">
              12 total
              <br />
              4 runs per axis
            </MetaItem>
            <MetaItem label="Dataset">BBQ</MetaItem>
            <MetaItem label="Consensus Rules">
              Within-axis: 3-of-4
              <br />
              Cross-axis: 2-of-3
            </MetaItem>
          </div>
        </motion.section>

        {/* ─────────── 4. MAIN RESULT ─────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="section-label">Main Result</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-foreground mb-16 max-w-3xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Similar within-axis stability.
            <br />
            Sharply different cross-axis geometry.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16">
            {/* Within-axis */}
            <div className="border border-border p-8">
              <p
                className="text-xs text-steel mb-1"
                style={{ fontFamily: "var(--font-mono-ibm)" }}
              >
                Within-axis stability
              </p>
              <p
                className="text-sm text-muted-foreground mb-8"
                style={{ fontFamily: "var(--font-geist)", fontWeight: 300 }}
              >
                두 모델 모두 비슷한 수준이다.
              </p>

              <div className="space-y-8">
                <div>
                  <p
                    className="text-xs text-steel mb-3"
                    style={{ fontFamily: "var(--font-mono-ibm)" }}
                  >
                    Mistral
                  </p>
                  <ComparisonBar label="Race" value={64.0} />
                  <ComparisonBar label="Gender" value={64.1} />
                  <ComparisonBar label="SES" value={63.88} />
                </div>
                <div>
                  <p
                    className="text-xs text-steel mb-3"
                    style={{ fontFamily: "var(--font-mono-ibm)" }}
                  >
                    Llama
                  </p>
                  <ComparisonBar label="Race" value={67.07} />
                  <ComparisonBar label="Gender" value={67.59} />
                  <ComparisonBar label="SES" value={67.23} />
                </div>
              </div>
            </div>

            {/* Cross-axis */}
            <div className="border border-border p-8">
              <p
                className="text-xs text-steel mb-1"
                style={{ fontFamily: "var(--font-mono-ibm)" }}
              >
                Cross-axis survivor rate
              </p>
              <p
                className="text-sm text-muted-foreground mb-10"
                style={{ fontFamily: "var(--font-geist)", fontWeight: 300 }}
              >
                두 모델은 여기서 크게 갈라진다.
              </p>

              <div className="space-y-10 mb-10">
                <div>
                  <div className="flex items-baseline justify-between mb-3">
                    <span
                      className="text-xs text-steel"
                      style={{ fontFamily: "var(--font-mono-ibm)" }}
                    >
                      Mistral
                    </span>
                    <span
                      className="text-4xl md:text-5xl font-semibold tabular-nums text-foreground"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      7.05<span className="text-base text-steel">%</span>
                    </span>
                  </div>
                  <div className="h-[2px] bg-border relative">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "7.05%" }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 1.0, ease: "easeOut" }}
                      className="absolute inset-y-0 left-0 bg-foreground"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline justify-between mb-3">
                    <span
                      className="text-xs text-steel"
                      style={{ fontFamily: "var(--font-mono-ibm)" }}
                    >
                      Llama
                    </span>
                    <span
                      className="text-4xl md:text-5xl font-semibold tabular-nums text-foreground"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      53.48<span className="text-base text-steel">%</span>
                    </span>
                  </div>
                  <div className="h-[2px] bg-border relative">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "53.48%" }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 1.0, ease: "easeOut", delay: 0.15 }}
                      className="absolute inset-y-0 left-0 bg-foreground"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6 flex items-baseline justify-between">
                <span
                  className="text-xs text-steel"
                  style={{ fontFamily: "var(--font-mono-ibm)" }}
                >
                  Gap
                </span>
                <span
                  className="text-2xl md:text-3xl font-semibold tabular-nums text-foreground"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  7.6×
                </span>
              </div>
            </div>
          </div>

          <div
            className="max-w-2xl space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed"
            style={{ fontFamily: "var(--font-geist)", fontWeight: 300 }}
          >
            <p>두 모델은 각 편향 축 내부에서 비슷한 수준의 update 안정성을 보였다.</p>
            <p>그러나 Race, Gender, SES를 교차한 뒤 공통으로 남는 좌표 비율은 크게 달라졌다.</p>
            <p className="text-foreground">Mistral은 7.05%. Llama는 53.48%.</p>
            <p>다중 편향을 하나의 shared direction으로 다룰 수 있는 정도는 모델 checkpoint마다 크게 달라진다.</p>
          </div>
        </motion.section>

        {/* ─────────── 5. WHAT THE EDIT SHOWED ─────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <SectionHeader
            label="What the Edit Showed"
            title="Projection edits produced mixed downstream effects."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10">
            <EditCard model="Mistral" rows={mistralEditRows} />
            <EditCard model="Llama" rows={llamaEditRows} />
          </div>

          <div
            className="max-w-2xl space-y-4 text-sm text-muted-foreground leading-relaxed mb-10"
            style={{ fontFamily: "var(--font-geist)", fontWeight: 300 }}
          >
            <p>Projection edit의 효과는 모델과 편향 축에 따라 다르게 나타났다.</p>
            <p>Mistral에서는 Race bias가 줄었다. SES와 Gender는 악화됐다.</p>
            <p>Llama에서는 SES와 Gender가 소폭 줄었다. Race는 소폭 증가했다.</p>
            <p className="text-foreground">
              이 결과는 unified edit를 적용하기 전에 모델별 geometry를 먼저 확인해야 함을 뒷받침한다.
            </p>
          </div>

          <div className="border-l-2 border-border pl-6 max-w-2xl">
            <p
              className="text-xs text-steel mb-4"
              style={{ fontFamily: "var(--font-mono-ibm)" }}
            >
              Ablation Note
            </p>
            <div
              className="space-y-3 text-sm text-muted-foreground leading-relaxed"
              style={{ fontFamily: "var(--font-geist)", fontWeight: 300 }}
            >
              <p>Full SignCV는 aggregate bias에서 항상 가장 낮은 값을 보이지 않았다.</p>
              <p>이 연구의 핵심은 최저 bias score를 만드는 데 있지 않다.</p>
              <p className="text-foreground">공유 가능한 편향 구조가 얼마나 남는지를 드러내는 데 있다.</p>
            </div>
          </div>
        </motion.section>

        {/* ─────────── 6. RESEARCH CONTRIBUTION ─────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <SectionHeader label="Research Contribution" title="What this work contributes" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-16">
            <ContributionBlock
              number="01"
              body="다중 편향 편집을 shared geometry의 존재 여부부터 점검해야 하는 문제로 재정의했다."
              index={0}
            />
            <ContributionBlock
              number="02"
              body="Within-axis stability와 cross-axis survivor rate를 구분해 모델 내부 편향 구조를 정량적으로 분석했다."
              index={1}
            />
            <ContributionBlock
              number="03"
              body="같은 규모의 두 LLM이 전혀 다른 multi-attribute bias geometry를 가질 수 있음을 보였다."
              index={2}
            />
          </div>

          <p
            className="text-xl md:text-2xl text-foreground leading-snug max-w-3xl border-l-2 border-border pl-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            SignCV provides a pre-edit geometry check for multi-attribute bias mitigation.
          </p>
        </motion.section>

        {/* ─────────── 7. MY ROLE ─────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <SectionHeader
            label="My Role"
            title="Led from problem formulation to manuscript."
          />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
            <div className="md:col-span-5">
              <p
                className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-md"
                style={{ fontFamily: "var(--font-geist)", fontWeight: 300 }}
              >
                이 연구에서 문제 정의부터 방법 설계, 실험, 결과 해석, 논문 작성까지 전 과정을 주도했다.
              </p>
            </div>
            <div className="md:col-span-7">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 border-t border-border">
                {roles.map((role) => (
                  <li
                    key={role}
                    className="py-4 border-b border-border text-sm text-foreground"
                    style={{ fontFamily: "var(--font-geist)" }}
                  >
                    {role}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* ─────────── 8. PAPER RECORD ─────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <SectionHeader label="Paper Record" />

          <div className="border-t border-border">
            <RecordRow label="Title">
              SignCV: A Sign-Consensus Vector Probe for Model-Dependent Multi-Attribute Bias Geometry
            </RecordRow>
            <RecordRow label="Venue">EAI@KDD 2026</RecordRow>
            <RecordRow label="Status">Submitted</RecordRow>
            <RecordRow label="Type">Workshop Paper</RecordRow>
            <RecordRow label="Role">First Author</RecordRow>
            <RecordRow label="Models">
              Mistral-7B-Instruct-v0.3
              <br />
              Llama-2-7B-hf
            </RecordRow>
            <RecordRow label="Dataset">BBQ</RecordRow>
            <RecordRow label="Keywords">
              <div className="flex flex-wrap gap-2">
                {keywords.map((kw) => (
                  <span key={kw} className="keyword-tag">
                    {kw}
                  </span>
                ))}
              </div>
            </RecordRow>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
