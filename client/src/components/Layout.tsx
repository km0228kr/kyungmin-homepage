/*
 * Layout: Cold Manifesto × Signal & Noise
 * Left fixed sidebar navigation (desktop) + top bar (mobile)
 * Dark mode toggle, minimal, no icons except functional ones
 */

import { useTheme } from "@/contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

const navItems = [
  { href: "/", label: "홈" },
  { href: "/about", label: "소개" },
  { href: "/research", label: "연구" },
  { href: "/startup", label: "창업" },
  { href: "/writing", label: "글" },
  { href: "/media", label: "미디어" },
  { href: "/contact", label: "연락" },
];

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="section-label hover:text-foreground transition-colors duration-200 py-1"
      aria-label="테마 전환"
    >
      {theme === "dark" ? "light" : "dark"}
    </button>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  const [location] = useLocation();
  const isActive = location === href;

  return (
    <Link href={href}>
      <span
        className={`
          block py-1.5 text-sm font-medium transition-colors duration-200 relative
          ${isActive
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground"
          }
        `}
        style={{ fontFamily: "var(--font-geist)" }}
      >
        {isActive && (
          <motion.span
            layoutId="nav-indicator"
            className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-px bg-steel"
            style={{ backgroundColor: "var(--steel)" }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        {label}
      </span>
    </Link>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Desktop: Left fixed sidebar */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-48 border-r border-border px-8 py-12 z-40 bg-background">
        {/* Logo / Name */}
        <div className="mb-12">
          <Link href="/">
            <div className="group cursor-pointer">
              <p
                className="text-xs section-label mb-1"
              >
                kwon kyungmin
              </p>
              <h1
                className="text-base font-semibold text-foreground leading-tight"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                권경민
              </h1>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-0.5">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>

        {/* Bottom: theme toggle */}
        <div className="mt-auto pt-8">
          <ThemeToggle />
        </div>
      </aside>

      {/* Mobile: Top bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-background border-b border-border">
        <div className="flex items-center justify-between px-6 py-4">
          <Link href="/">
            <span
              className="text-sm font-semibold text-foreground"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              권경민
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex flex-col gap-1.5 p-1"
              aria-label="메뉴"
            >
              <motion.span
                className="block w-5 h-px bg-foreground"
                animate={mobileMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block w-5 h-px bg-foreground"
                animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block w-5 h-px bg-foreground"
                animate={mobileMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden border-t border-border bg-background"
            >
              <div className="px-6 py-4 flex flex-col gap-1">
                {navItems.map((item) => (
                  <NavLink key={item.href} href={item.href} label={item.label} />
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Main content */}
      <main className="lg:ml-48 min-h-screen">
        <div className="pt-16 lg:pt-0">
          {children}
        </div>
      </main>
    </div>
  );
}
