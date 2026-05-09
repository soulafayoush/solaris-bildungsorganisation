"use client";

import { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { SectorsSection } from "@/components/sectors-section";
import { ServicesSection } from "@/components/services-section";
import { ProjectsSection } from "@/components/projects-section";
import { MembershipForm } from "@/components/membership-form";
import { BlogSection } from "@/components/blog-section";
import { ContactSection } from "@/components/contact-section";
import { ComplaintSection } from "@/components/complaint-section";
import { CertificateSection } from "@/components/certificate-section";
import { translations, type Language } from "@/lib/i18n";

export default function Home() {
  const [lang, setLang] = useState<Language>("ar");
  const [currentSection, setCurrentSection] = useState("hero");

  // Update HTML dir and lang attributes
  useEffect(() => {
    const html = document.documentElement;
    html.dir = lang === "ar" ? "rtl" : "ltr";
    html.lang = lang;
  }, [lang]);

  // Track scroll position for active section
  useEffect(() => {
    const sections = [
      "hero",
      "about",
      "sectors",
      "services",
      "projects",
      "membership",
      "blog",
      "contact",
      "complaint",
      "certificate",
    ];

    const handleScroll = () => {
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setCurrentSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback((section: string) => {
    const el = document.getElementById(section);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        lang={lang}
        setLang={setLang}
        currentSection={currentSection}
        scrollToSection={scrollToSection}
      />

      <main className="flex-1">
        <HeroSection lang={lang} scrollToSection={scrollToSection} />
        <AboutSection lang={lang} />
        <SectorsSection lang={lang} />
        <ServicesSection lang={lang} />
        <ProjectsSection lang={lang} />
        <MembershipForm lang={lang} />
        <BlogSection lang={lang} />
        <ContactSection lang={lang} />
        <ComplaintSection lang={lang} />
        <CertificateSection lang={lang} />
      </main>

      <Footer lang={lang} scrollToSection={scrollToSection} />
    </div>
  );
}
