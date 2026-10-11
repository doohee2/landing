"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { ChevronDown, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FAQSection() {
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const toggleAccordion = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section id="faq-section" className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="font-mono text-xs text-[#c3c0ff] tracking-widest uppercase font-semibold">
          {siteConfig.faq.badge}
        </span>
        <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
          {siteConfig.faq.title}
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          {siteConfig.faq.description}
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3.5">
        {siteConfig.faq.items.map((item, idx) => {
          const isOpen = openIndices.includes(idx);
          return (
            <div
              key={idx}
              className="rounded-2xl bg-[#171f33] border border-white/5 overflow-hidden transition-all shadow-sm"
            >
              <button
                onClick={() => toggleAccordion(idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 text-base font-semibold text-slate-100 hover:text-indigo-200 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-3.5">
                  <span className="w-8 h-8 rounded-lg bg-[#222a3d] text-[#c3c0ff] border border-white/5 flex items-center justify-center font-mono text-xs font-bold shrink-0">
                    Q{idx + 1}
                  </span>
                  <span>{item.question}</span>
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0 ${
                    isOpen ? "rotate-180 text-indigo-400" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0 text-sm text-slate-300 leading-relaxed">
                      <div className="p-4 rounded-xl bg-[#222a3d]/70 border border-white/5">
                        {item.answer}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Support Mailer Card */}
      <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#171f33] border border-white/5 text-center flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="text-left">
          <h4 className="text-base font-bold text-slate-100">
            {siteConfig.faq.supportTitle}
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            {siteConfig.faq.supportSubtitle}
          </p>
        </div>
        <a
          href={`mailto:${siteConfig.brand.email}`}
          className="px-5 py-2.5 rounded-xl bg-[#222a3d] hover:bg-indigo-600 text-[#c3c0ff] hover:text-white transition-colors text-xs font-semibold flex items-center gap-2 shrink-0 border border-indigo-500/20 shadow-sm"
        >
          <Mail className="w-4 h-4" />
          <span>{siteConfig.faq.supportButton}</span>
        </a>
      </div>
    </section>
  );
}
