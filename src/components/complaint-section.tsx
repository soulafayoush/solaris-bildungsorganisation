"use client";

import { useState } from "react";
import { translations, type Language } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Send, MessageSquareWarning } from "lucide-react";

interface ComplaintSectionProps {
  lang: Language;
}

export function ComplaintSection({ lang }: ComplaintSectionProps) {
  const t = translations[lang].complaint;
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
      const res = await fetch("/api/complaint", {
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
    <section id="complaint" className="py-20 md:py-28 section-alt">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium mb-4 badge-gold">
            <MessageSquareWarning className="h-4 w-4" />
            {t.title}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            {t.subtitle}
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full mt-3 divider-gold" />
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-lg space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="complaintName">{t.fullName} *</Label>
              <Input id="complaintName" name="fullName" required dir={lang === "ar" ? "rtl" : "ltr"} className="bg-background input-gold" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="complaintEmail">{t.email} *</Label>
              <Input id="complaintEmail" name="email" type="email" required dir="ltr" className="bg-background text-start input-gold" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="complaintPhone">{t.phone}</Label>
            <Input id="complaintPhone" name="phone" type="tel" dir="ltr" className="bg-background text-start input-gold" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="complaintMessage">{t.message} *</Label>
            <Textarea id="complaintMessage" name="message" rows={5} required dir={lang === "ar" ? "rtl" : "ltr"} className="bg-background input-gold" />
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
        </motion.form>
      </div>
    </section>
  );
}
