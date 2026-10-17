import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { ArrowLeft, Shield, FileText, Trash2 } from "lucide-react";
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
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#171f33] hover:bg-[#222a3d] text-indigo-300 hover:text-white border border-white/5 transition-all text-xs font-semibold group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>메인 화면으로 돌아가기</span>
          </Link>

          <Link
            href="/?action=delete#deletion-section"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#171f33] hover:bg-red-950/40 text-red-300 hover:text-red-200 border border-red-500/20 hover:border-red-500/40 transition-all text-xs font-semibold group cursor-pointer"
          >
            <Trash2 className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" />
            <span>데이터 삭제 요청</span>
          </Link>
        </div>

        <div className="p-6 rounded-2xl bg-[#171f33] border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
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
      <main className="max-w-4xl mx-auto p-6 sm:p-12 rounded-3xl bg-[#171f33]/90 border border-white/10 shadow-2xl backdrop-blur-md">
        <article className="text-slate-200">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              table: ({ children }) => (
                <div className="my-6 w-full overflow-x-auto rounded-xl border border-slate-700/80 bg-[#0f172a] shadow-lg">
                  <table className="w-full text-left text-sm text-slate-200 border-collapse">
                    {children}
                  </table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="bg-[#1e293b] text-xs uppercase font-semibold text-white border-b border-slate-700">
                  {children}
                </thead>
              ),
              th: ({ children }) => (
                <th className="px-5 py-3.5 font-bold tracking-wider text-white">
                  {children}
                </th>
              ),
              tbody: ({ children }) => (
                <tbody className="divide-y divide-slate-800/90 bg-[#0f172a]/70">
                  {children}
                </tbody>
              ),
              tr: ({ children }) => (
                <tr className="hover:bg-slate-800/50 transition-colors">
                  {children}
                </tr>
              ),
              td: ({ children }) => (
                <td className="px-5 py-3.5 text-slate-200 leading-relaxed font-normal">
                  {children}
                </td>
              ),
              h1: ({ children }) => (
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-8 mb-4 tracking-tight border-b border-slate-700/70 pb-3">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-3 tracking-tight">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg sm:text-xl font-bold text-indigo-300 mt-8 mb-3 flex items-center gap-2">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed my-3 font-normal">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-outside pl-6 space-y-2 my-3 text-slate-200 text-sm sm:text-base">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-outside pl-6 space-y-2 my-3 text-slate-200 text-sm sm:text-base">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-slate-200 leading-relaxed pl-1">
                  {children}
                </li>
              ),
              strong: ({ children }) => (
                <strong className="font-bold text-white tracking-wide">
                  {children}
                </strong>
              ),
              code: ({ children }) => (
                <code className="px-1.5 py-0.5 rounded-md bg-[#222a3d] text-[#c3c0ff] border border-white/10 font-mono text-xs font-semibold">
                  {children}
                </code>
              ),
              hr: () => <hr className="my-8 border-slate-700/60" />,
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4 font-medium transition-colors"
                >
                  {children}
                </a>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </article>
      </main>

      {/* Bottom Navigation Links */}
      <div className="max-w-4xl mx-auto mt-8 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#171f33] hover:bg-[#222a3d] text-indigo-300 hover:text-white border border-white/5 transition-all text-xs font-semibold group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>메인 화면으로 돌아가기</span>
        </Link>

        <Link
          href="/?action=delete#deletion-section"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#171f33] hover:bg-red-950/40 text-red-300 hover:text-red-200 border border-red-500/20 hover:border-red-500/40 transition-all text-xs font-semibold group cursor-pointer"
        >
          <Trash2 className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" />
          <span>데이터 삭제 요청</span>
        </Link>
      </div>
    </div>
  );
}
