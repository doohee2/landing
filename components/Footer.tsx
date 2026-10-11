"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Mail, Shield, Trash2 } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

interface FooterProps {
  onOpenDeleteModal: () => void;
}

export function Footer({ onOpenDeleteModal }: FooterProps) {
  return (
    <footer className="w-full bg-[#060e20] border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Brand info */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2.5">
              <span className="text-base font-bold text-slate-100">
                {siteConfig.brand.name} {siteConfig.brand.subName}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#171f33] text-indigo-300 border border-indigo-500/20">
                {siteConfig.brand.tagline}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {siteConfig.brand.description}
            </p>
          </div>

          {/* Quick links & Contact */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <Link
              href="/privacy"
              className="hover:text-indigo-300 transition-colors flex items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5 text-indigo-400" />
              <span>개인정보처리방침</span>
            </Link>
            <span className="text-slate-700">·</span>
            <button
              onClick={onOpenDeleteModal}
              className="hover:text-red-400 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5 text-red-400" />
              <span>데이터 삭제 요청</span>
            </button>
            <span className="text-slate-700">·</span>
            <a
              href={siteConfig.brand.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-200 transition-colors flex items-center gap-1.5"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub ({siteConfig.brand.developer})</span>
            </a>
            <span className="text-slate-700">·</span>
            <a
              href={`mailto:${siteConfig.brand.email}`}
              className="hover:text-slate-200 transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{siteConfig.brand.email}</span>
            </a>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 pt-6 border-t border-white/5 text-xs text-slate-500">
          <p>{siteConfig.brand.copyright}</p>
          <p>{siteConfig.brand.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
