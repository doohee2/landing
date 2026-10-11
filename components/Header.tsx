"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Menu, X, Trash2, Shield, User } from "lucide-react";

interface HeaderProps {
  onOpenDeleteModal: () => void;
}

export function Header({ onOpenDeleteModal }: HeaderProps) {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-[#0b1326]/85 backdrop-blur-xl border-b border-white/5 shadow-[0_1px_8px_rgba(0,0,0,0.2)]">
      <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-lg font-bold text-slate-100 tracking-tight group-hover:text-indigo-300 transition-colors">
            {siteConfig.brand.name}
          </span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#3e37a9] text-[#b3b0ff] uppercase tracking-wider font-semibold border border-indigo-500/30">
            {siteConfig.brand.subName}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-3">
          <Link
            href="#apps-section"
            className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            앱 목록 (Apps)
          </Link>
          <Link
            href="/privacy"
            className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1.5"
          >
            <Shield className="w-3.5 h-3.5 text-indigo-400" />
            <span>개인정보처리방침</span>
          </Link>
          <button
            onClick={onOpenDeleteModal}
            className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5 text-red-400" />
            <span>데이터 삭제</span>
          </button>
          <Link
            href="#faq-section"
            className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            FAQ
          </Link>
        </nav>

        {/* User / Action Buttons */}
        <div className="flex items-center gap-2.5">
          {session?.user ? (
            <button
              onClick={onOpenDeleteModal}
              title={`${session.user.name || "사용자"} (데이터 관리)`}
              className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full bg-[#171f33] hover:bg-[#222a3d] border border-white/10 transition-colors text-xs text-slate-200"
            >
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  width={26}
                  height={26}
                  className="rounded-full"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[10px]">
                  {session.user.name?.[0] || "U"}
                </div>
              )}
              <span className="hidden sm:inline-block max-w-[100px] truncate">
                {session.user.name}
              </span>
            </button>
          ) : (
            <button
              onClick={onOpenDeleteModal}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#171f33] hover:bg-[#222a3d] text-indigo-200 text-xs font-medium border border-indigo-500/20 transition-colors"
            >
              <User className="w-3.5 h-3.5 text-indigo-400" />
              <span>본인 인증 / 삭제</span>
            </button>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-white/5 transition-colors"
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/5 bg-[#0b1326]/95 backdrop-blur-xl px-4 py-4 space-y-2">
          <Link
            href="#apps-section"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            앱 목록 (Apps)
          </Link>
          <Link
            href="/privacy"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Shield className="w-4 h-4 text-indigo-400" />
            <span>개인정보처리방침 (Privacy)</span>
          </Link>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenDeleteModal();
            }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-red-300 hover:bg-red-500/10 transition-colors text-left"
          >
            <Trash2 className="w-4 h-4 text-red-400" />
            <span>데이터 삭제 요청 (Data Deletion)</span>
          </button>
          <Link
            href="#faq-section"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            FAQ (자주 묻는 질문)
          </Link>
        </div>
      )}
    </header>
  );
}
