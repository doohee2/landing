"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  ArrowDown,
  ShieldCheck,
  Lock,
  LayoutGrid,
  Trash2,
  ScrollText,
} from "lucide-react";
import { motion } from "framer-motion";

interface HeroProps {
  onOpenDeleteModal: () => void;
}

export function Hero({ onOpenDeleteModal }: HeroProps) {
  const getMetricIcon = (name: string) => {
    switch (name) {
      case "widgets":
        return <LayoutGrid className="w-5 h-5" />;
      case "lock":
        return <Lock className="w-5 h-5" />;
      case "shield":
      default:
        return <ShieldCheck className="w-5 h-5" />;
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[600px] -right-32 w-[500px] h-[300px] bg-indigo-900/25 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#222a3d]/80 border border-indigo-500/30 shadow-md backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-[#c3c0ff] animate-pulse" />
          <span className="font-mono text-xs text-[#c3c0ff] tracking-wide font-medium">
            {siteConfig.hero.pillBadge}
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-100 max-w-4xl leading-[1.15]"
        >
          생활의 편의를 위해 만든,
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c3c0ff] via-indigo-400 to-[#818cf8]">
            ‘아무거나’
          </span>{" "}
          앱들을 만나보세요
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-3 text-sm sm:text-base font-mono text-indigo-300/90 tracking-wide"
        >
          {siteConfig.hero.titleEn}
        </motion.p>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 max-w-2xl space-y-1.5"
        >
          <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
            {siteConfig.hero.subtitle}
          </p>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {siteConfig.hero.subtitleEn}
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3.5"
        >
          <Link
            href="#apps-section"
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all flex items-center gap-2"
          >
            <span>{siteConfig.hero.ctaExplore}</span>
            <ArrowDown className="w-4 h-4" />
          </Link>
          <Link
            href="/privacy"
            className="px-5 py-3 rounded-xl bg-[#171f33] hover:bg-[#222a3d] text-slate-200 font-medium text-sm border border-white/10 transition-all flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span>{siteConfig.hero.ctaPrivacy}</span>
          </Link>
          <Link
            href="/terms"
            className="px-5 py-3 rounded-xl bg-[#171f33] hover:bg-[#222a3d] text-slate-200 font-medium text-sm border border-white/10 transition-all flex items-center gap-2"
          >
            <ScrollText className="w-4 h-4 text-indigo-400" />
            <span>{siteConfig.hero.ctaTerms}</span>
          </Link>
          <button
            onClick={onOpenDeleteModal}
            className="px-5 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 font-medium text-sm border border-red-500/25 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Trash2 className="w-4 h-4 text-red-400" />
            <span>{siteConfig.hero.ctaDelete}</span>
          </button>
        </motion.div>

        {/* Trust Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl"
        >
          {siteConfig.hero.metrics.map((metric, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#171f33]/80 border border-white/5 text-left shadow-sm flex items-center gap-3.5 backdrop-blur-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-[#222a3d] flex items-center justify-center text-[#c3c0ff] shrink-0">
                {getMetricIcon(metric.iconName)}
              </div>
              <div>
                <div className="text-sm font-bold text-slate-100">
                  {metric.title}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {metric.description}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
