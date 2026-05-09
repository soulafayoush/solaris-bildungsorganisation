"use client";

import { translations, type Language } from "@/lib/i18n";
import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, Heart, Globe, Shield, Target } from "lucide-react";

interface AboutSectionProps {
  lang: Language;
}

export function AboutSection({ lang }: AboutSectionProps) {
  const t = translations[lang].about;

  return (
    <section id="about" className="py-20 md:py-28 section-clean">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-widest uppercase mb-3 text-accent">
            {lang === "ar" ? "تعرّف علينا" : "Get to Know Us"}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t.title}
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full divider-gold" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: lang === "ar" ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/about-img.png"
                alt="Solaris Educational Workshop"
                width={600}
                height={450}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 img-overlay-navy" />
            </div>
            {/* Badge */}
            <div className="absolute -bottom-4 -end-4 md:-bottom-6 md:-end-6 text-white rounded-2xl p-4 md:p-6 shadow-2xl vision-card">
              <p className="text-3xl md:text-4xl font-bold text-gold-light">500+</p>
              <p className="text-sm text-white/80">
                {lang === "ar" ? "متطوع نشط" : "Active Volunteers"}
              </p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: lang === "ar" ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium badge-gold">
              <Globe className="h-4 w-4" />
              {t.subtitle}
            </div>
            <p className="text-lg text-foreground/80 leading-relaxed">
              {t.description}
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              {t.commitment}
            </p>

            {/* Vision Card */}
            <div className="rounded-2xl p-6 vision-card">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl shrink-0 bg-gradient-gold">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{t.vision}</h3>
                  <p className="text-sm text-white/75 leading-relaxed">{t.visionText}</p>
                </div>
              </div>
            </div>

            {/* Values */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { icon: Heart, label: lang === "ar" ? "التمكين" : "Empowerment" },
                { icon: Shield, label: lang === "ar" ? "الشفافية" : "Transparency" },
                { icon: Target, label: lang === "ar" ? "التميّز" : "Excellence" },
              ].map((item) => (
                <div key={item.label} className="text-center p-4 rounded-xl bg-card border border-border hover:shadow-md transition-shadow card-hover-gold">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-lg flex items-center justify-center icon-box-gold">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <p className="text-xs font-medium text-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
