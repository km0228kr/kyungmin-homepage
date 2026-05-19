import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import { currentResearch } from "@/data/research";

export default function ResearchDetail() {
  const params = useParams<{ slug: string }>();
  const item = currentResearch.find((r) => r.slug === params.slug);

  if (!item) {
    return (
      <div className="min-h-screen px-8 md:px-16 lg:px-20 py-24 md:py-32">
        <div className="max-w-2xl">
          <p className="text-sm text-muted-foreground mb-6">
            해당 연구를 찾을 수 없습니다.
          </p>
          <Link
            href="/research"
            className="text-sm text-steel hover:text-foreground transition-colors"
            style={{ fontFamily: "var(--font-mono-ibm)" }}
          >
            ← 연구 목록
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-8 md:px-16 lg:px-20 py-24 md:py-32">
      <div className="max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <Link
            href="/research"
            className="text-sm text-steel hover:text-foreground transition-colors duration-200"
            style={{ fontFamily: "var(--font-mono-ibm)" }}
          >
            ← 연구 목록
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <h1
              className="text-2xl md:text-3xl font-semibold text-foreground leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {item.title}
            </h1>
            <span
              className="shrink-0 text-xs text-steel mt-2"
              style={{ fontFamily: "var(--font-mono-ibm)" }}
            >
              {item.status}
            </span>
          </div>
          <p
            className="text-base text-muted-foreground leading-relaxed"
            style={{ fontFamily: "var(--font-geist)", fontWeight: 300 }}
          >
            {item.description}
          </p>
        </motion.div>

        {[
          { label: "배경", body: item.background },
          { label: "방법론", body: item.approach },
          { label: "진행 상황", body: item.progress },
        ].map((section, i) => (
          <motion.section
            key={section.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="section-label">{section.label}</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <p
              className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line"
              style={{ fontFamily: "var(--font-geist)", fontWeight: 300 }}
            >
              {section.body}
            </p>
          </motion.section>
        ))}

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="section-label">키워드</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="flex flex-wrap gap-2">
            {item.keywords.map((kw) => (
              <span key={kw} className="keyword-tag">{kw}</span>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
