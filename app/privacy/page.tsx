import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { ArrowLeft, Shield, FileText } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침 (Privacy Policy) · 아무거나 Studio",
  description: "구글 OAuth 및 사용자 데이터 보호 정책을 준수하는 통합 개인정보처리방침",
};

export default function PrivacyPage() {
  const filePath = path.join(process.cwd(), "content", "privacy-policy.md");
  let content = "";
  try {
    content = fs.readFileSync(filePath, "utf-8");
  } catch (err) {
    console.error("Failed to read privacy-policy.md:", err);
    content = "# 개인정보처리방침을 불러올 수 없습니다.\n\n관리자에게 문의해 주세요.";
  }

  return (
    <div className="min-h-screen bg-[#0b1326] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Top Header Navigation */}
      <div className="max-w-4xl mx-auto mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#171f33] hover:bg-[#222a3d] text-indigo-300 hover:text-white border border-white/5 transition-all text-xs font-semibold mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>메인 화면으로 돌아가기</span>
        </Link>

        <div className="p-6 rounded-2xl bg-[#171f33] border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <span>통합 개인정보처리방침</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Google OAuth 2.0 검수 규격
                </span>
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                바이브코딩 웹 애플리케이션 제품군 공통 적용 방침
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-[#060e20] px-3 py-1.5 rounded-lg border border-white/5">
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            <span>최종 개정: 2026. 10. 10</span>
          </div>
        </div>
      </div>

      {/* Markdown Content Container */}
      <main className="max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl bg-[#171f33]/80 border border-white/5 shadow-2xl backdrop-blur-md">
        <article className="prose prose-indigo dark:prose-invert max-w-none prose-headings:text-slate-100 prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:text-slate-300 prose-p:leading-relaxed prose-li:text-slate-300 prose-table:text-sm prose-th:text-slate-200 prose-td:text-slate-300 prose-strong:text-indigo-200 prose-hr:border-white/10">
          <ReactMarkdown>{content}</ReactMarkdown>
        </article>
      </main>

      {/* Footer Back Link */}
      <div className="max-w-4xl mx-auto mt-12 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>메인 화면으로 돌아가기</span>
        </Link>
      </div>
    </div>
  );
}
