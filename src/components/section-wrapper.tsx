"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  id: string;
  className?: string;
  noPadding?: boolean;
}

export function SectionWrapper({
  children,
  id,
  className = "",
  noPadding = false,
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={noPadding ? className : `py-16 md:py-24 ${className}`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">{children}</div>
    </motion.section>
  );
}
