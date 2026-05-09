/*
 * Contact: Cold Manifesto × Signal & Noise
 * Email, GitHub, LinkedIn, YouTube only
 * No complex form
 */

import { motion } from "framer-motion";

const links = [
  {
    label: "Email",
    value: "contact@kwonkyungmin.com",
    href: "mailto:contact@kwonkyungmin.com",
    description: "연구 협력, PoC 문의, 강연 요청",
  },
  {
    label: "GitHub",
    value: "github.com/kwonkyungmin",
    href: "https://github.com",
    description: "연구 코드, 프로젝트 저장소",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/kwonkyungmin",
    href: "https://linkedin.com",
    description: "전문 네트워크, 이력",
  },
  {
    label: "YouTube",
    value: "youtube.com/@kwonkyungmin",
    href: "https://youtube.com",
    description: "연구 설명, 강연 영상",
  },
];

export default function Contact() {
  return (
    <div className="min-h-screen px-8 md:px-16 lg:px-20 py-24 md:py-32">
      <div className="max-w-xl">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="section-label mb-12"
        >
          연락
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
            연구 협력이나
            <br />
            문의가 있으시면.
          </h2>
          <p
            className="text-sm text-muted-foreground leading-relaxed"
            style={{ fontFamily: "var(--font-geist)", fontWeight: 300 }}
          >
            이메일이 가장 빠릅니다.
            연구 협력, PoC 파트너십, 강연 요청 모두 환영합니다.
          </p>
        </motion.div>

        {/* Links */}
        <div className="space-y-0">
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.2, duration: 0.55, ease: "easeOut" }}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="group flex items-start gap-6 py-7 border-b border-border hover:bg-secondary transition-colors duration-200 -mx-4 px-4"
            >
              <span className="section-label w-20 shrink-0 mt-0.5">
                {link.label}
              </span>
              <div className="flex-1">
                <p
                  className="text-sm font-medium text-foreground group-hover:text-steel transition-colors duration-200 mb-1"
                  style={{ fontFamily: "var(--font-mono-ibm)" }}
                >
                  {link.value}
                </p>
                <p
                  className="text-xs text-muted-foreground"
                  style={{ fontFamily: "var(--font-geist)", fontWeight: 300 }}
                >
                  {link.description}
                </p>
              </div>
              <span
                className="text-muted-foreground group-hover:text-steel transition-colors duration-200 mt-0.5"
                style={{ fontFamily: "var(--font-mono-ibm)", fontSize: "0.75rem" }}
              >
                →
              </span>
            </motion.a>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
          className="mt-16 text-xs text-muted-foreground"
          style={{ fontFamily: "var(--font-mono-ibm)" }}
        >
          권경민 · AI Researcher & Builder · Seoul, Korea
        </motion.p>
      </div>
    </div>
  );
}
