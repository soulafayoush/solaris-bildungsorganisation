"use client";

import { translations, type Language } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Wrench, Monitor, BookOpen, Handshake, ArrowLeft } from "lucide-react";
import Image from "next/image";

interface ProjectsSectionProps {
  lang: Language;
}

export function ProjectsSection({ lang }: ProjectsSectionProps) {
  const t = translations[lang].projects;

  const projects = [
    {
      icon: Wrench,
      title: t.youthSkills.title,
      description: t.youthSkills.description,
      image: "/images/youth-skills.png",
      accentColor: "text-accent",
    },
    {
      icon: Monitor,
      title: t.digital.title,
      description: t.digital.description,
      image: "/images/digital-edu.png",
      accentColor: "text-[#152433] dark:text-[#D4BA8A]",
    },
    {
      icon: BookOpen,
      title: t.lifelong.title,
      description: t.lifelong.description,
      image: "/images/women-empower.png",
      accentColor: "text-accent",
    },
    {
      icon: Handshake,
      title: t.partnerships.title,
      description: t.partnerships.description,
      image: "/images/partnerships.png",
      accentColor: "text-[#1E3348] dark:text-[#D4BA8A]",
    },
  ];

  return (
    <section id="projects" className="py-20 md:py-28 section-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-widest uppercase mb-3 text-accent">
            {lang === "ar" ? "أثرنا على أرض الواقع" : "Our Real-World Impact"}
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
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 card-hover-gold"
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 img-overlay-navy" />
                  <div className="absolute bottom-3 start-3 p-2.5 rounded-xl bg-white/20 backdrop-blur-md border border-white/30">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    <ArrowLeft className={`h-5 w-5 shrink-0 mt-1 transition-all duration-300 text-accent ${lang === "ar" ? "" : "rotate-180"}`} />
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
