"use client";

import { translations, type Language } from "@/lib/i18n";
import { motion } from "framer-motion";
import { GraduationCap, Users, Handshake } from "lucide-react";

interface ServicesSectionProps {
  lang: Language;
}

export function ServicesSection({ lang }: ServicesSectionProps) {
  const t = translations[lang].services;

  const services = [
    {
      icon: GraduationCap,
      title: t.education.title,
      description: t.education.description,
      gradient: "card-navy-gradient",
    },
    {
      icon: Users,
      title: t.youth.title,
      description: t.youth.description,
      gradient: "bg-gradient-gold",
      iconDark: true,
    },
    {
      icon: Handshake,
      title: t.partnerships.title,
      description: t.partnerships.description,
      gradient: "bg-gradient-to-br from-[#1E3348] to-[#2A4A60]",
    },
  ];

  return (
    <section id="services" className="py-20 md:py-28 section-clean">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-widest uppercase mb-3 text-accent">
            {lang === "ar" ? "كيف نساعد" : "How We Help"}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t.subtitle}
          </p>
          <div className="w-16 h-1 mx-auto rounded-full mt-4 divider-gold" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group bg-card rounded-2xl p-8 border border-border hover:shadow-xl transition-all duration-300 text-center card-hover-gold"
              >
                <div
                  className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 ${service.gradient}`}
                >
                  <Icon className={`h-8 w-8 ${service.iconDark ? "text-[#152433]" : "text-white"}`} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
