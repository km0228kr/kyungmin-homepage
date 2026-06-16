import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import { getWritingPost } from "@/data/writing";

export default function WritingDetail() {
  const params = useParams<{ slug: string }>();
  const post = getWritingPost(params.slug);

  if (!post) {
    return (
      <div className="min-h-screen px-8 md:px-16 lg:px-20 py-24 md:py-32">
        <div className="max-w-2xl">
          <p className="text-sm text-muted-foreground mb-6">
            해당 글을 찾을 수 없습니다.
          </p>
          <Link
            href="/writing"
            className="text-sm text-steel hover:text-foreground transition-colors"
            style={{ fontFamily: "var(--font-mono-ibm)" }}
          >
            ← 글 목록
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
            href="/writing"
            className="text-sm text-steel hover:text-foreground transition-colors duration-200"
            style={{ fontFamily: "var(--font-mono-ibm)" }}
          >
            ← 글 목록
          </Link>
        </motion.div>

        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-14"
        >
          <p
            className="text-xs text-steel mb-3"
            style={{ fontFamily: "var(--font-mono-ibm)" }}
          >
            {post.date} · {post.category}
          </p>
          <h1
            className="text-2xl md:text-3xl font-semibold text-foreground leading-tight mb-5"
            style={{ fontFamily: "var(--font-geist)", letterSpacing: "-0.02em" }}
          >
            {post.title}
          </h1>
          <p
            className="text-sm text-muted-foreground leading-relaxed mb-5"
            style={{ fontFamily: "var(--font-geist)", fontWeight: 300 }}
          >
            {post.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="keyword-tag">{tag}</span>
            ))}
          </div>
        </motion.header>

        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-sm md:text-[15px] text-muted-foreground leading-8 whitespace-pre-line"
          style={{ fontFamily: "var(--font-geist)", fontWeight: 300 }}
        >
          {post.content}
        </motion.article>

        {post.sourceUrl && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="border-t border-border mt-16 pt-10"
          >
            <p className="section-label mb-5">참고한 논문</p>
            <a
              href={post.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-steel hover:text-foreground transition-colors duration-200"
              style={{ fontFamily: "var(--font-mono-ibm)" }}
            >
              {post.sourceTitle ?? "source"} →
            </a>
          </motion.div>
        )}
      </div>
    </div>
  );
}
