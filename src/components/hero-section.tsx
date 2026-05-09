"use client";

import { translations, type Language } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { Users, ChevronDown, Award, Globe2 } from "lucide-react";

interface HeroSectionProps {
  lang: Language;
  scrollToSection: (section: string) => void;
}

export function HeroSection({ lang, scrollToSection }: HeroSectionProps) {
  const t = translations[lang].hero;

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.png"
          alt="Solaris Education"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 hero-overlay" />
        {/* Subtle gold overlay pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(182,151,97,0.15)_0%,_transparent_60%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="w-24 h-24 md:w-28 md:h-28 bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center justify-center border border-white/20 shadow-2xl">
              <Image src="/images/logo.png" alt="Solaris Logo" width={80} height={80} className="rounded-xl" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 leading-tight"
          >
            {t.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg md:text-xl mb-6 font-light tracking-wide text-gold-light"
          >
            {t.subtitle}
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-base md:text-lg text-white/85 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            {t.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button
              onClick={() => scrollToSection("membership")}
              size="lg"
              className="font-bold px-8 py-6 text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer btn-gold"
            >
              {t.joinUs}
            </Button>
            <Button
              onClick={() => scrollToSection("contact")}
              variant="outline"
              size="lg"
              className="bg-transparent text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/60 font-bold px-8 py-6 text-base rounded-xl transition-all duration-300 cursor-pointer"
            >
              {t.contactUs}
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4 md:gap-6"
          >
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl px-5 py-3 border border-white/15">
              <Users className="h-5 w-5 text-gold-light" />
              <div className="text-start">
                <p className="text-2xl font-bold text-white">500+</p>
                <p className="text-xs text-white/70">{t.volunteers}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl px-5 py-3 border border-white/15">
              <Globe2 className="h-5 w-5 text-gold-light" />
              <div className="text-start">
                <p className="text-2xl font-bold text-white">
                  {lang === "ar" ? "سويسرا" : "Switzerland"}
                </p>
                <p className="text-xs text-white/70">
                  {lang === "ar" ? "مسجلة رسمياً" : "Officially Registered"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl px-5 py-3 border border-white/15">
              <Award className="h-5 w-5 text-gold-light" />
              <div className="text-start">
                <p className="text-2xl font-bold text-white">
                  {lang === "ar" ? "صفة استشارية" : "Consultative"}
                </p>
                <p className="text-xs text-white/70">
                  {lang === "ar" ? "دولياً" : "Status"}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <button
          onClick={() => scrollToSection("about")}
          className="p-2.5 rounded-full bg-white/15 backdrop-blur-sm text-white hover:bg-white/25 transition-colors cursor-pointer border border-white/20"
          aria-label="Scroll down"
        >
          <ChevronDown className="h-5 w-5" />
        </button>
      </motion.div>
    </section>
  );
}
