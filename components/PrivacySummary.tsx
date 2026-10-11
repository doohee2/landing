"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  ShieldCheck,
  UserCheck,
  RefreshCw,
  Clock,
  Ban,
  ArrowRight,
  Gavel,
} from "lucide-react";

export function PrivacySummary() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "badge":
        return <UserCheck className="w-5 h-5 text-indigo-400" />;
      case "sync":
        return <RefreshCw className="w-5 h-5 text-indigo-400" />;
      case "timer":
        return <Clock className="w-5 h-5 text-indigo-400" />;
      case "block":
      default:
        return <Ban className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <section id="privacy-section" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-[#171f33] border border-white/5 p-8 md:p-12 shadow-2xl relative overflow-hidden">
        {/* Accent Top Gradient Border */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 via-[#c3c0ff] to-indigo-400" />

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left Column: Heading & Callout */}
          <div className="lg:w-2/5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#222a3d] text-[#c3c0ff] font-mono text-xs border border-indigo-500/20">
              <Gavel className="w-3.5 h-3.5" />
              <span>{siteConfig.privacySummary.badge}</span>
            </div>
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-slate-100">
              {siteConfig.privacySummary.title}
            </h2>
            <p className="mt-3 text-sm text-slate-300/80 leading-relaxed">
              {siteConfig.privacySummary.description}
            </p>

            {/* Verification Callout */}
            <div className="mt-6 p-4 rounded-xl bg-[#060e20] border border-white/5 text-slate-300 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-xs leading-relaxed text-slate-300">
                {siteConfig.privacySummary.callout}
              </p>
            </div>

            <div className="mt-6">
              <Link
                href="/privacy"
                className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-300 hover:text-indigo-200 group"
              >
                <span>{siteConfig.privacySummary.viewFullPolicy}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: 4 Policy Highlights */}
          <div className="lg:w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {siteConfig.privacySummary.items.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#222a3d]/70 border border-white/5 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#171f33] border border-white/5 flex items-center justify-center mb-3">
                    {getIcon(item.iconName)}
                  </div>
                  <h4 className="text-base font-bold text-slate-100">
                    {item.title}
                  </h4>
                  <p className="mt-1.5 text-xs text-slate-300/80 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 font-mono text-xs text-indigo-300/70">
                  {item.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
