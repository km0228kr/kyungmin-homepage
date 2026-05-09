/*
 * NotFound: Cold Manifesto × Signal & Noise
 * 404 page — consistent with site design system
 */

import { motion } from "framer-motion";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-20">
      <div className="max-w-xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="section-label mb-8"
        >
          404
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-semibold text-foreground leading-tight mb-6"
          style={{ fontFamily: "var(--font-playfair)", letterSpacing: "-0.02em" }}
        >
          신호를 찾을 수 없습니다.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
          className="text-sm text-muted-foreground mb-10"
          style={{ fontFamily: "var(--font-geist)", fontWeight: 300 }}
        >
          요청한 페이지가 존재하지 않습니다.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5, ease: "easeOut" }}
        >
          <Link href="/">
            <span
              className="text-sm text-steel hover:text-foreground transition-colors duration-200"
              style={{ fontFamily: "var(--font-mono-ibm)" }}
            >
              홈으로 →
            </span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
