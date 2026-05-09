"use client";

import { translations, type Language } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Heart, Monitor, UserCheck, User } from "lucide-react";

interface SectorsSectionProps {
  lang: Language;
}

const sectorIcons = [Heart, Monitor, UserCheck, User];

export function SectorsSection({ lang }: SectorsSectionProps) {
  const t = translations[lang].sectors;

  const sectors = [
    { key: "pss" as const, iconBg: "bg-[#FEF7ED] dark:bg-[#1C2128]", iconColor: "text-[#B69761]" },
    { key: "digital" as const, iconBg: "bg-[#EDF1F5] dark:bg-[#161B22]", iconColor: "text-[#152433] dark:text-[#D4BA8A]" },
    { key: "youth" as const, iconBg: "bg-[#FDF8F0] dark:bg-[#1C2128]", iconColor: "text-[#96783E] dark:text-[#D4BA8A]" },
    { key: "women" as const, iconBg: "bg-[#FBF6EE] dark:bg-[#1C2128]", iconColor: "text-[#B69761]" },
  ];

  const sectorData = [t.pss, t.digital, t.youth, t.women];

  return (
    <section id="sectors" className="py-20 md:py-28 section-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-widest uppercase mb-3 text-accent">
            {lang === "ar" ? "ما نقدمه" : "What We Offer"}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t.subtitle}
          </p>
          <div className="w-16 h-1 mx-auto rounded-full mt-4 divider-gold" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {sectors.map((sector, index) => {
            const Icon = sectorIcons[index];
            return (
              <motion.div
                key={sector.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group rounded-2xl p-6 md:p-8 border bg-card hover:shadow-xl transition-all duration-300 card-hover-gold"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl shadow-sm shrink-0 ${sector.iconBg}`}>
                    <Icon className={`h-6 w-6 ${sector.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                      {sectorData[index].title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {sectorData[index].description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
