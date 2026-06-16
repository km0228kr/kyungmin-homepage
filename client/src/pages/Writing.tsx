/*
 * Writing: Cold Manifesto × Signal & Noise
 * Blog archive — minimal, date-indexed, no thumbnails
 */

import { motion } from "framer-motion";
import { Link } from "wouter";
import { writingPosts } from "@/data/writing";

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
          {writingPosts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.05, duration: 0.5, ease: "easeOut" }}
            >
              <Link
                href={`/writing/${post.slug}`}
                className="group block border-b border-border py-8 cursor-pointer"
              >
                <div className="flex items-start gap-6">
                  <span
                    className="text-xs text-muted-foreground shrink-0 mt-1 w-16"
                    style={{ fontFamily: "var(--font-mono-ibm)" }}
                  >
                    {post.date}
                  </span>
                  <div className="flex-1">
                    <p
                      className="text-[11px] text-steel mb-2"
                      style={{ fontFamily: "var(--font-mono-ibm)" }}
                    >
                      {post.category}
                    </p>
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
              </Link>
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
