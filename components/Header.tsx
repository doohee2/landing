"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, Trash2, Shield, User, LogOut, ScrollText } from "lucide-react";
import { BrandLogoIcon } from "@/components/BrandLogoIcon";

interface HeaderProps {
  onOpenDeleteModal: () => void;
}

export function Header({ onOpenDeleteModal }: HeaderProps) {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-[#0b1326]/85 backdrop-blur-xl border-b border-white/5 shadow-[0_1px_8px_rgba(0,0,0,0.2)]">
      <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <BrandLogoIcon className="w-8 h-8 rounded-lg shadow-sm group-hover:scale-105 transition-transform duration-200 shrink-0" />
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-slate-100 tracking-tight group-hover:text-indigo-300 transition-colors">
              {siteConfig.brand.name}
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#3e37a9] text-[#b3b0ff] uppercase tracking-wider font-semibold border border-indigo-500/30">
              {siteConfig.brand.subName}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-3">
          <Link
            href="#apps-section"
            className="px-3 py-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors flex flex-col items-center text-center leading-tight"
          >
            <span className="text-xs font-semibold">앱 목록</span>
            <span className="text-[10px] font-mono text-slate-400">Apps</span>
          </Link>
          <Link
            href="/privacy"
            className="px-3 py-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1.5"
          >
            <Shield className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="flex flex-col items-start leading-tight">
              <span className="text-xs font-semibold">개인정보처리방침</span>
              <span className="text-[10px] font-mono text-slate-400">Privacy Policy</span>
            </span>
          </Link>
          <Link
            href="/terms"
            className="px-3 py-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1.5"
          >
            <ScrollText className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="flex flex-col items-start leading-tight">
              <span className="text-xs font-semibold">서비스 약관</span>
              <span className="text-[10px] font-mono text-slate-400">Terms of Service</span>
            </span>
          </Link>
          <button
            onClick={onOpenDeleteModal}
            className="px-3 py-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5 text-red-400 shrink-0" />
            <span className="flex flex-col items-start leading-tight text-left">
              <span className="text-xs font-semibold">데이터 삭제</span>
              <span className="text-[10px] font-mono text-slate-400">Delete Data</span>
            </span>
          </button>
          <Link
            href="#faq-section"
            className="px-3 py-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors flex flex-col items-center text-center leading-tight"
          >
            <span className="text-xs font-semibold">자주 묻는 질문</span>
            <span className="text-[10px] font-mono text-slate-400">FAQ</span>
          </Link>
        </nav>

        {/* User / Action Buttons */}
        <div className="flex items-center gap-2.5">
          {session?.user ? (
            <button
              onClick={handleSignOut}
              title={`${session.user.email || "사용자"} (클릭 시 로그아웃 / Click to Sign Out)`}
              className="flex items-center gap-2.5 px-3 py-1 rounded-xl bg-[#171f33] hover:bg-red-950/30 border border-indigo-500/30 hover:border-red-500/40 transition-all text-xs text-slate-200 shadow-sm cursor-pointer group"
            >
              {session.user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  referrerPolicy="no-referrer"
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-indigo-500/40 shrink-0"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[11px] font-bold shrink-0">
                  {session.user.email?.[0]?.toUpperCase() || "U"}
                </div>
              )}
              <div className="flex items-center gap-2 text-left">
                <span className="font-mono text-xs text-slate-200 group-hover:text-red-200 transition-colors">
                  {session.user.email}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-red-500/10 text-red-300 border border-red-500/20 font-medium group-hover:bg-red-500/20 transition-colors whitespace-nowrap">
                  <LogOut className="w-3 h-3 text-red-400 shrink-0" />
                  <span className="flex flex-col items-start leading-tight">
                    <span className="text-[10px] font-semibold">로그아웃</span>
                    <span className="text-[9px] font-mono text-red-300/80">Sign Out</span>
                  </span>
                </span>
              </div>
            </button>
          ) : (
            <button
              onClick={onOpenDeleteModal}
              className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-[#171f33] hover:bg-[#222a3d] text-indigo-200 border border-indigo-500/20 transition-colors cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span className="flex flex-col items-start leading-tight text-left">
                <span className="text-xs font-semibold">본인 인증 / 데이터 관리</span>
                <span className="text-[10px] font-mono text-indigo-300/80">Verify & Manage Data</span>
              </span>
            </button>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/5 bg-[#0b1326]/95 backdrop-blur-xl px-4 py-4 space-y-2">
          {session?.user && (
            <div
              onClick={() => {
                setMobileMenuOpen(false);
                void handleSignOut();
              }}
              className="mb-3 p-3 rounded-xl bg-[#171f33] hover:bg-red-950/30 border border-indigo-500/30 hover:border-red-500/40 flex items-center justify-between cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {session.user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 rounded-full object-cover shrink-0 ring-1 ring-indigo-500/40"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {session.user.email?.[0]?.toUpperCase() || "U"}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="text-xs font-mono text-slate-100 truncate">
                    {session.user.email}
                  </div>
                  <div className="text-[10px] text-red-300 font-medium flex items-center gap-1 mt-0.5">
                    <LogOut className="w-2.5 h-2.5 text-red-400" />
                    <span>터치하여 로그아웃</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <Link
            href="#apps-section"
            onClick={() => setMobileMenuOpen(false)}
            className="flex flex-col px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors leading-tight"
          >
            <span className="text-sm font-medium">앱 목록</span>
            <span className="text-xs font-mono text-slate-400 mt-0.5">Apps</span>
          </Link>
          <Link
            href="/privacy"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Shield className="w-4 h-4 text-indigo-400 shrink-0" />
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-medium">개인정보처리방침</span>
              <span className="text-xs font-mono text-slate-400 mt-0.5">Privacy Policy</span>
            </span>
          </Link>
          <Link
            href="/terms"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            <ScrollText className="w-4 h-4 text-indigo-400 shrink-0" />
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-medium">서비스 이용약관</span>
              <span className="text-xs font-mono text-slate-400 mt-0.5">Terms of Service</span>
            </span>
          </Link>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenDeleteModal();
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-red-300 hover:bg-red-500/10 transition-colors text-left cursor-pointer"
          >
            <Trash2 className="w-4 h-4 text-red-400 shrink-0" />
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-medium">데이터 삭제 요청</span>
              <span className="text-xs font-mono text-red-300/75 mt-0.5">Delete Data</span>
            </span>
          </button>
          <Link
            href="#faq-section"
            onClick={() => setMobileMenuOpen(false)}
            className="flex flex-col px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors leading-tight"
          >
            <span className="text-sm font-medium">자주 묻는 질문</span>
            <span className="text-xs font-mono text-slate-400 mt-0.5">FAQ</span>
          </Link>
        </div>
      )}
    </header>
  );
}
