"use client";

import { useState } from "react";
import { translations, type Language } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, Search, CheckCircle2, XCircle } from "lucide-react";

interface CertificateSectionProps {
  lang: Language;
}

export function CertificateSection({ lang }: CertificateSectionProps) {
  const t = translations[lang].certificate;
  const [certId, setCertId] = useState("");
  const [result, setResult] = useState<{
    valid: boolean;
    certificate?: {
      recipientName: string;
      courseName: string;
      issueDate: string;
    };
    message?: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!certId.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`/api/certificate/${encodeURIComponent(certId.trim())}`);
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ valid: false, message: "Error verifying certificate" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="certificate" className="py-20 md:py-28 section-clean">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium mb-4 badge-gold">
            <ShieldCheck className="h-4 w-4" />
            {t.title}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            {t.subtitle}
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full mt-3 divider-gold" />
        </motion.div>

        {/* Verification Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-lg"
        >
          <div className="flex gap-3">
            <Input
              value={certId}
              onChange={(e) => setCertId(e.target.value)}
              placeholder={t.placeholder}
              dir="ltr"
              className="flex-1 bg-background text-start input-gold"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleVerify();
              }}
            />
            <Button
              onClick={handleVerify}
              disabled={loading || !certId.trim()}
              className="text-white font-bold px-6 rounded-xl cursor-pointer shrink-0 btn-navy"
            >
              {loading ? (
                <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Result */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-6 rounded-xl p-6 border ${
                result.valid
                  ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800"
                  : "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800"
              }`}
            >
              {result.valid && result.certificate ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                    <h3 className="font-bold text-emerald-800 dark:text-emerald-300 text-lg">
                      {t.valid}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                        {t.recipient}:
                      </span>
                      <span className="text-sm text-emerald-900 dark:text-emerald-200">
                        {result.certificate.recipientName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                        {t.course}:
                      </span>
                      <span className="text-sm text-emerald-900 dark:text-emerald-200">
                        {result.certificate.courseName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                        {t.date}:
                      </span>
                      <span className="text-sm text-emerald-900 dark:text-emerald-200" dir="ltr">
                        {new Date(result.certificate.issueDate).toLocaleDateString(
                          lang === "ar" ? "ar-EG" : "en-US"
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <XCircle className="h-6 w-6 text-red-600" />
                  <h3 className="font-bold text-red-800 dark:text-red-300">
                    {t.invalid}
                  </h3>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
