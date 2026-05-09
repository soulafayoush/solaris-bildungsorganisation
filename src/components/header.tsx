"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}
import { Menu, X, Sun, Moon, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { translations, type Language } from "@/lib/i18n";

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
  currentSection: string;
  scrollToSection: (section: string) => void;
}

const navItems = [
  { key: "home", section: "hero" },
  { key: "about", section: "about" },
  { key: "sectors", section: "sectors" },
  { key: "services", section: "services" },
  { key: "projects", section: "projects" },
  { key: "blog", section: "blog" },
  { key: "contact", section: "contact" },
  { key: "membership", section: "membership" },
];

const socialLinks = [
  { href: "https://x.com/SolarisBildung", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z", label: "X" },
  { href: "https://www.linkedin.com/in/solaris-bildungsorganisation-0b6262374", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z", label: "LinkedIn" },
  { href: "https://www.instagram.com/solaris.bildungsorganisation", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z", label: "Instagram" },
  { href: "https://www.facebook.com/people/Solaris-Bildungsorganisation/61578101049648/", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z", label: "Facebook" },
];

export function Header({
  lang,
  setLang,
  currentSection,
  scrollToSection,
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const t = translations[lang].nav;
  const isHero = !scrolled || currentSection === "hero";

  const navActiveBg = "bg-gradient-gold text-[#152433] shadow-md";
  const navLinkClass = (item: { section: string }) => {
    const isActive = currentSection === item.section && !isHero;
    if (isActive) return navActiveBg;
    if (isHero) return "text-white/80 hover:text-white hover:bg-white/10";
    return "text-muted-foreground hover:text-foreground hover:bg-secondary";
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isHero
          ? "bg-transparent"
          : "bg-background/97 backdrop-blur-xl shadow-lg border-b border-border/60"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className={`p-1 rounded-lg transition-all duration-300 ${isHero ? "bg-white/10 backdrop-blur-sm" : "bg-secondary"}`}>
              <Image
                src="/images/logo.png"
                alt="Solaris"
                width={40}
                height={40}
                className="rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <span className={`text-lg font-bold leading-tight transition-colors duration-300 ${isHero ? "text-white" : "text-foreground"}`}>
                {lang === "ar" ? "زولاريس" : "Solaris"}
              </span>
              <span className={`text-[10px] leading-tight hidden sm:block transition-colors duration-300 ${isHero ? "text-white/60" : "text-muted-foreground"}`}>
                Bildungsorganisation
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.section)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${navLinkClass(item)}`}
              >
                {t[item.key as keyof typeof t]}
              </button>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-1.5">
            {/* Social Media - visible on 2xl+ */}
            <div className="hidden 2xl:flex items-center gap-0.5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg transition-colors ${isHero ? "text-white/60 hover:text-white hover:bg-white/10" : "text-muted-foreground hover:text-accent hover:bg-secondary"}`}
                  aria-label={social.label}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>

            <div className={`w-px h-6 hidden 2xl:block ${isHero ? "bg-white/20" : "bg-border"}`} />

            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              className={`rounded-lg ${isHero ? "text-white/80 hover:text-white hover:bg-white/10" : "text-muted-foreground hover:text-accent hover:bg-secondary"}`}
              aria-label="Toggle language"
            >
              <Globe className="h-4 w-4" />
            </Button>

            {/* Theme Toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={`rounded-lg ${isHero ? "text-white/80 hover:text-white hover:bg-white/10" : "text-muted-foreground hover:text-accent hover:bg-secondary"}`}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className={`xl:hidden rounded-lg ${isHero ? "text-white hover:bg-white/10" : "text-foreground hover:bg-secondary"}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="xl:hidden bg-background border-t border-border shadow-2xl">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  scrollToSection(item.section);
                  setMobileOpen(false);
                }}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all text-start cursor-pointer ${
                  currentSection === item.section
                    ? "bg-gradient-gold text-[#152433] shadow-md"
                    : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                {t[item.key as keyof typeof t]}
              </button>
            ))}
            <div className="flex items-center gap-2 px-4 pt-4 border-t border-border mt-2">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg text-muted-foreground hover:text-accent transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d={social.path}/></svg>
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
