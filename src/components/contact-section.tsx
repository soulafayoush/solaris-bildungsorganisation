"use client";

import { useState } from "react";
import { translations, type Language } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Send, Phone, Mail, MapPin } from "lucide-react";

interface ContactSectionProps {
  lang: Language;
}

export function ContactSection({ lang }: ContactSectionProps) {
  const t = translations[lang].contact;
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const data = {
      fullName: (form.elements.namedItem("fullName") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success(t.success);
        form.reset();
      } else {
        toast.error(t.error);
      }
    } catch {
      toast.error(t.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 section-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-accent max-w-3xl mx-auto">
            {t.subtitle}
          </p>
          <div className="w-20 h-1 mx-auto rounded-full mt-4 divider-gold" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: lang === "ar" ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="flex items-start gap-4 bg-card rounded-xl p-5 border border-border">
              <div className="p-3 rounded-lg shrink-0 icon-box-gold">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-1">
                  {lang === "ar" ? "الهاتف" : "Phone"}
                </h4>
                <p className="text-sm text-muted-foreground" dir="ltr">0041765405117</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-card rounded-xl p-5 border border-border">
              <div className="p-3 rounded-lg shrink-0 icon-box-gold">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-1">
                  {lang === "ar" ? "البريد الإلكتروني" : "Email"}
                </h4>
                <p className="text-sm text-muted-foreground break-all">
                  solaris.bildungsorganisation@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-card rounded-xl p-5 border border-border">
              <div className="p-3 rounded-lg shrink-0 icon-box-gold">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-1">
                  {lang === "ar" ? "الموقع" : "Location"}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {lang === "ar" ? "سويسرا" : "Switzerland"}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: lang === "ar" ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-lg space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contactName">{t.fullName} *</Label>
                  <Input id="contactName" name="fullName" required dir={lang === "ar" ? "rtl" : "ltr"} className="bg-background input-gold" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">{t.email} *</Label>
                  <Input id="contactEmail" name="email" type="email" required dir="ltr" className="bg-background text-start input-gold" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPhone">{t.phone}</Label>
                <Input id="contactPhone" name="phone" type="tel" dir="ltr" className="bg-background text-start input-gold" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactMessage">{t.message} *</Label>
                <Textarea id="contactMessage" name="message" rows={5} required dir={lang === "ar" ? "rtl" : "ltr"} className="bg-background input-gold" />
              </div>

              <Button type="submit" disabled={loading} className="w-full text-white font-bold py-6 rounded-xl cursor-pointer btn-navy">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                    {lang === "ar" ? "جاري الإرسال..." : "Sending..."}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    {t.submit}
                  </span>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
