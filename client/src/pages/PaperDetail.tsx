import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import { papers } from "@/data/research";

export default function PaperDetail() {
  const params = useParams<{ slug: string }>();
  const paper = papers.find((p) => p.slug === params.slug);

  if (!paper) {
    return (
      <div className="min-h-screen px-8 md:px-16 lg:px-20 py-24 md:py-32">
        <div className="max-w-2xl">
          <p className="text-sm text-muted-foreground mb-6">
            해당 논문을 찾을 수 없습니다.
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
          <p
            className="text-xs text-steel mb-3"
            style={{ fontFamily: "var(--font-mono-ibm)" }}
          >
            {paper.year} · {paper.venue}
          </p>
          <h1
            className="text-2xl md:text-3xl font-semibold text-foreground leading-tight mb-4"
            style={{ fontFamily: "var(--font-geist)" }}
          >
            {paper.title}
          </h1>
          <p
            className="text-xs text-steel"
            style={{ fontFamily: "var(--font-mono-ibm)" }}
          >
            {paper.authors.join(", ")}
          </p>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="section-label">Abstract</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <p
            className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line"
            style={{ fontFamily: "var(--font-geist)", fontWeight: 300 }}
          >
            {paper.fullAbstract}
          </p>
        </motion.section>

        {(paper.pdfUrl || paper.arxivUrl) && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="border-t border-border pt-10"
          >
            <p className="section-label mb-6">링크</p>
            <div className="flex gap-6">
              {paper.pdfUrl && (
                
                  href={paper.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-steel hover:text-foreground transition-colors duration-200"
                  style={{ fontFamily: "var(--font-mono-ibm)" }}
                >
                  PDF →
                </a>
              )}
              {paper.arxivUrl && (
                
                  href={paper.arxivUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-steel hover:text-foreground transition-colors duration-200"
                  style={{ fontFamily: "var(--font-mono-ibm)" }}
                >
                  arXiv →
                </a>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
