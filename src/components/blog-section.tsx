"use client";

import { translations, type Language } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft } from "lucide-react";
import Image from "next/image";

interface BlogSectionProps {
  lang: Language;
}

export function BlogSection({ lang }: BlogSectionProps) {
  const t = translations[lang].blog;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const blogImages = [
    "/images/digital-edu.png",
    "/images/women-empower.png",
    "/images/about-img.png",
  ];

  return (
    <section id="blog" className="py-20 md:py-28 section-clean">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-widest uppercase mb-3 text-accent">
            {lang === "ar" ? "آخر الأخبار" : "Latest News"}
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
          {t.posts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 card-hover-gold"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={blogImages[index]}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 img-overlay-navy" />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <Calendar className="h-3.5 w-3.5 text-accent" />
                  {formatDate(post.date)}
                </div>

                <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-accent transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                  {post.excerpt}
                </p>

                <button className="inline-flex items-center gap-1 text-sm font-medium text-accent transition-all cursor-pointer hover:gap-2">
                  {t.readMore}
                  <ArrowLeft className={`h-4 w-4 ${lang === "ar" ? "" : "rotate-180"}`} />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
