"use client";

import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

interface LanguageToggleProps {
  locale: string;
  onToggle: () => void;
}

export function LanguageToggle({ locale, onToggle }: LanguageToggleProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-9 px-3 gap-1.5 text-foreground hover:bg-primary/10 hover:text-primary font-medium text-sm"
      onClick={onToggle}
      aria-label="Toggle language"
    >
      <Globe className="h-4 w-4" />
      <span>{locale === "ar" ? "EN" : "عربي"}</span>
    </Button>
  );
}
