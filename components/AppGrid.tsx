"use client";

import React from "react";
import { siteConfig } from "@/config/site";
import { AppCard } from "./AppCard";

export function AppGrid() {
  return (
    <section id="apps-section" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <span className="font-mono text-xs text-[#c3c0ff] tracking-widest uppercase font-semibold">
            {siteConfig.apps.badge}
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
            {siteConfig.apps.title}
          </h2>
        </div>
        <p className="text-sm text-slate-400 max-w-md leading-relaxed">
          {siteConfig.apps.description}
        </p>
      </div>

      {/* 6 Apps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {siteConfig.apps.list.map((app, idx) => (
          <AppCard key={app.id} app={app} index={idx} />
        ))}
      </div>
    </section>
  );
}
