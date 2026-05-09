"use client";

import { useState } from "react";
import { translations, type Language } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Send, UserPlus } from "lucide-react";

interface MembershipFormProps {
  lang: Language;
}

export function MembershipForm({ lang }: MembershipFormProps) {
  const t = translations[lang].membership;
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const data = {
      fullName: (form.elements.namedItem("fullName") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      dateOfBirth: (form.elements.namedItem("dateOfBirth") as HTMLInputElement).value,
      major: (form.elements.namedItem("major") as HTMLInputElement).value,
      studyYear: (form.elements.namedItem("studyYear") as HTMLInputElement).value,
      gradYear: (form.elements.namedItem("gradYear") as HTMLInputElement).value,
      status: (form.elements.namedItem("status") as HTMLSelectElement).value,
      experience: (form.elements.namedItem("experience") as HTMLTextAreaElement).value,
      availability: (form.elements.namedItem("availability") as HTMLInputElement).value,
      reason: (form.elements.namedItem("reason") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/membership", {
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
    <section id="membership" className="py-20 md:py-28 section-warm">
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
            <UserPlus className="h-4 w-4" />
            {t.title}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
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
          className="bg-card rounded-2xl p-6 md:p-10 border border-border shadow-lg space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName">{t.fullName} *</Label>
              <Input id="fullName" name="fullName" required className="bg-background input-gold" dir={lang === "ar" ? "rtl" : "ltr"} />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">{t.email} *</Label>
              <Input id="email" name="email" type="email" required dir="ltr" className="bg-background text-start input-gold" />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">{t.phone} *</Label>
              <Input id="phone" name="phone" type="tel" required dir="ltr" className="bg-background text-start input-gold" />
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">{t.dateOfBirth}</Label>
              <Input id="dateOfBirth" name="dateOfBirth" type="date" dir="ltr" className="bg-background text-start input-gold" />
            </div>

            {/* Major */}
            <div className="space-y-2">
              <Label htmlFor="major">{t.major}</Label>
              <Input id="major" name="major" dir={lang === "ar" ? "rtl" : "ltr"} className="bg-background input-gold" />
            </div>

            {/* Study Year */}
            <div className="space-y-2">
              <Label htmlFor="studyYear">{t.studyYear}</Label>
              <Input id="studyYear" name="studyYear" dir={lang === "ar" ? "rtl" : "ltr"} className="bg-background input-gold" />
            </div>

            {/* Grad Year */}
            <div className="space-y-2">
              <Label htmlFor="gradYear">{t.gradYear}</Label>
              <Input id="gradYear" name="gradYear" dir="ltr" className="bg-background text-start input-gold" />
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label>{t.status}</Label>
              <Select name="status" dir={lang === "ar" ? "rtl" : "ltr"}>
                <SelectTrigger className="bg-background input-gold">
                  <SelectValue placeholder={t.status} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">{t.statusOptions.student}</SelectItem>
                  <SelectItem value="employee">{t.statusOptions.employee}</SelectItem>
                  <SelectItem value="volunteer">{t.statusOptions.volunteer}</SelectItem>
                  <SelectItem value="jobSeeker">{t.statusOptions.jobSeeker}</SelectItem>
                  <SelectItem value="other">{t.statusOptions.other}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-2">
            <Label htmlFor="experience">{t.experience}</Label>
            <Textarea id="experience" name="experience" rows={3} dir={lang === "ar" ? "rtl" : "ltr"} className="bg-background input-gold" />
          </div>

          {/* Availability */}
          <div className="space-y-2">
            <Label htmlFor="availability">{t.availability}</Label>
            <Input id="availability" name="availability" dir="ltr" className="bg-background text-start input-gold" placeholder={lang === "ar" ? "مثال: 10 ساعات" : "e.g., 10 hours"} />
          </div>

          {/* Reason */}
          <div className="space-y-2">
            <Label htmlFor="reason">{t.reason}</Label>
            <Textarea id="reason" name="reason" rows={4} required dir={lang === "ar" ? "rtl" : "ltr"} className="bg-background input-gold" />
          </div>

          {/* Submit */}
          <Button type="submit" disabled={loading} className="w-full text-white font-bold py-6 text-base rounded-xl cursor-pointer btn-navy">
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                {lang === "ar" ? "جاري الإرسال..." : "Submitting..."}
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
