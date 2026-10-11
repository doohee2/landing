"use client";

import React from "react";
import { AppItem } from "@/config/site";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface AppCardProps {
  app: AppItem;
  index: number;
}

export function AppCard({ app, index }: AppCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="p-6 rounded-2xl bg-[#171f33] border border-white/5 hover:border-indigo-500/30 hover:bg-[#1e293b] shadow-lg shadow-black/20 hover:shadow-indigo-500/10 transition-all flex flex-col justify-between group"
    >
      <div>
        {/* Top Header: Icon & Category */}
        <div className="flex items-start justify-between gap-4">
          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#060e20] border border-white/5 p-1 shrink-0 shadow-inner">
            <Image
              src={app.icon}
              alt={`${app.name} 아이콘`}
              width={64}
              height={64}
              className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#222a3d] text-[#c3c0ff] font-mono text-xs font-medium border border-indigo-500/20">
            {app.category}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="mt-5 text-xl font-bold text-slate-100 group-hover:text-indigo-200 transition-colors">
          {app.name}
        </h3>
        <p className="mt-2 text-sm text-slate-300/80 leading-relaxed min-h-[44px]">
          {app.description}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {app.tags.map((tag, tIdx) => (
            <span
              key={tIdx}
              className="px-2 py-0.5 rounded-md bg-[#222a3d]/80 text-slate-400 font-mono text-[11px] border border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer: Version & Action Link */}
      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
        <span className="font-mono text-xs text-slate-400">
          {app.version}
        </span>
        <a
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 rounded-lg bg-[#222a3d] hover:bg-indigo-600 text-slate-200 hover:text-white font-medium text-xs transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <span>실행하기</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.article>
  );
}
