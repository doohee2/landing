"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  AlertTriangle,
  CheckCircle2,
  Lock,
  LogOut,
  Trash2,
  X,
  Loader2,
  ShieldAlert,
  BookOpen,
  GraduationCap,
  Calendar,
  Layers,
  RefreshCw,
  Eye,
} from "lucide-react";
import Image from "next/image";

interface DeleteDataModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PersonalDataSummary {
  pdfReader: {
    total: number;
    memoCount: number;
    bookmarkCount: number;
  };
  studyHistory: {
    count: number;
  };
  notionToken: {
    hasToken: boolean;
    count: number;
  };
  wordLists: {
    count: number;
    titles: string[];
  };
  totalDeletableItems: number;
  totalAnonymizableItems: number;
  hasAnyData: boolean;
}

export function DeleteDataModal({ isOpen, onClose }: DeleteDataModalProps) {
  const { data: session, status } = useSession();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [dataSummary, setDataSummary] = useState<PersonalDataSummary | null>(null);
  const [summaryError, setSummaryError] = useState<string | null>(null);
  const [deletionResult, setDeletionResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // Fetch personal data list from server whenever the authenticated user opens the modal
  const fetchSummary = React.useCallback(async () => {
    if (!session?.user?.email) return;
    setIsLoadingSummary(true);
    setSummaryError(null);
    try {
      const res = await fetch("/api/account/summary", {
        method: "POST",
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setDataSummary(json.summary);
      } else {
        setSummaryError(json.error || "개인정보 목록을 불러오지 못했습니다.");
      }
    } catch {
      setSummaryError("네트워크 오류로 데이터를 조회할 수 없습니다.");
    } finally {
      setIsLoadingSummary(false);
    }
  }, [session?.user?.email]);

  useEffect(() => {
    let isMounted = true;
    if (isOpen && session?.user?.email) {
      // Defer to microtask to satisfy React 19 effect purity rules
      Promise.resolve().then(() => {
        if (isMounted) {
          void fetchSummary();
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [isOpen, session?.user?.email, fetchSummary]);

  const handleClose = () => {
    if (isDeleting) return;
    setDeletionResult(null);
    onClose();
  };

  const handleGoogleSignIn = async () => {
    await signIn("google");
  };

  const handleDeleteData = async () => {
    if (!session?.user?.email) return;
    setIsDeleting(true);
    try {
      const res = await fetch("/api/account/delete", {
        method: "POST",
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setDeletionResult({
          success: true,
          message: data.message || "모든 데이터가 성공적으로 영구 삭제 및 익명화되었습니다.",
        });
        // Sign out automatically to clear session
        await signOut({ redirect: false });
      } else {
        setDeletionResult({
          success: false,
          message: data.error || "데이터 삭제 중 오류가 발생했습니다.",
        });
      }
    } catch {
      setDeletionResult({
        success: false,
        message: "네트워크 통신 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-[#060e20]/80 backdrop-blur-md"
            onClick={handleClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-xl max-h-[90vh] flex flex-col rounded-2xl bg-[#0f172a] border border-white/10 shadow-2xl overflow-hidden z-10 my-auto"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#171f33]/70 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-100 text-base">
                    개인정보 조회 및 데이터 영구 삭제
                  </h3>
                  <span className="text-xs text-slate-400">
                    Google OAuth 본인 확인 기반 Supabase 실시간 연동
                  </span>
                </div>
              </div>
              <button
                onClick={handleClose}
                disabled={isDeleting}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors disabled:opacity-50 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-5">
              {/* Step 3: Deletion Completed Screen */}
              {deletionResult ? (
                <div className="text-center py-6">
                  {deletionResult.success ? (
                    <>
                      <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <CheckCircle2 className="w-7 h-7" />
                      </div>
                      <h4 className="text-lg font-bold text-slate-100 mb-2">
                        개인정보 삭제 및 익명화 완료
                      </h4>
                      <p className="text-sm text-slate-300 leading-relaxed mb-6">
                        {deletionResult.message}
                        <br />
                        <span className="text-xs text-emerald-400 mt-2 block font-medium">
                          ✓ 독서 기록·학습 이력·노션 토큰 영구 파기 완료
                          <br />
                          ✓ 공유 단어장 작성자 정보 &apos;anonymous&apos; 마스킹 완료
                        </span>
                        <span className="text-xs text-slate-400 mt-2 block">
                          안전을 위해 구글 연동 세션이 자동 로그아웃되었습니다.
                        </span>
                      </p>
                      <button
                        onClick={handleClose}
                        className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-600/20 cursor-pointer"
                      >
                        닫기
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                        <AlertTriangle className="w-7 h-7" />
                      </div>
                      <h4 className="text-lg font-bold text-slate-100 mb-2">
                        데이터 삭제 실패
                      </h4>
                      <p className="text-sm text-red-300 leading-relaxed mb-6">
                        {deletionResult.message}
                      </p>
                      <button
                        onClick={() => setDeletionResult(null)}
                        className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm transition-all cursor-pointer"
                      >
                        다시 시도하기
                      </button>
                    </>
                  )}
                </div>
              ) : status === "loading" ? (
                /* Loading Session State */
                <div className="py-12 flex flex-col items-center justify-center gap-3">
                  <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
                  <p className="text-sm text-slate-400">세션 정보를 확인하고 있습니다...</p>
                </div>
              ) : !session || !session.user ? (
                /* Step 1: Unauthenticated State */
                <div>
                  <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/20 mb-5">
                    <div className="flex items-start gap-3">
                      <Lock className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-indigo-200 mb-1">
                          구글 계정 본인 인증 필요
                        </h4>
                        <p className="text-xs text-indigo-200/80 leading-relaxed">
                          타인의 악의적인 데이터 삭제를 방지하고 사용 중인 개인정보를 정확히 조회하기 위해 구글 계정 본인 인증이 필요합니다.
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                    구글 로그인은 본인 소유권 확인 및 이메일 매칭 목적으로만 최소 기본 프로필(`openid email profile`)만을 요청합니다.
                  </p>

                  <button
                    onClick={handleGoogleSignIn}
                    className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-3 cursor-pointer"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        fill="#EA4335"
                      />
                    </svg>
                    <span>Google로 본인 인증하기</span>
                  </button>
                </div>
              ) : (
                /* Step 2: Authenticated State (Show personal data list) */
                <div className="space-y-4">
                  {/* Verified User Card */}
                  <div className="p-3.5 rounded-xl bg-[#171f33] border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {session.user.image ? (
                        <Image
                          src={session.user.image}
                          alt={session.user.name || "Profile"}
                          width={40}
                          height={40}
                          className="rounded-full ring-2 ring-indigo-500/30"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-indigo-600/30 text-indigo-300 font-bold flex items-center justify-center">
                          {session.user.name?.[0] || "U"}
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-semibold text-slate-100 flex items-center gap-1.5">
                          {session.user.name || "인증된 사용자"}
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            본인 인증됨
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 font-mono">
                          {session.user.email}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => signOut({ redirect: false })}
                      title="로그아웃"
                      className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Personal Data Section Header */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-indigo-400" />
                      <h4 className="text-sm font-bold text-slate-200">
                        보유 중인 개인정보 현황 (Supabase 실시간 조회)
                      </h4>
                    </div>
                    <button
                      onClick={fetchSummary}
                      disabled={isLoadingSummary}
                      title="새로고침"
                      className="p-1 rounded text-slate-400 hover:text-indigo-300 transition-colors cursor-pointer"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isLoadingSummary ? "animate-spin" : ""}`} />
                    </button>
                  </div>

                  {/* Personal Data List Container */}
                  {isLoadingSummary ? (
                    <div className="p-8 rounded-xl bg-[#171f33]/50 border border-white/5 flex flex-col items-center justify-center gap-2 text-slate-400">
                      <Loader2 className="w-6 h-6 animate-spin text-indigo-400" />
                      <p className="text-xs">데이터베이스에서 사용자 기록을 조회하고 있습니다...</p>
                    </div>
                  ) : summaryError ? (
                    <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/20 text-xs text-red-300">
                      {summaryError}
                    </div>
                  ) : dataSummary ? (
                    <div className="space-y-2.5">
                      {/* 1. PDF Metadata */}
                      <div className="p-3.5 rounded-xl bg-[#171f33]/80 border border-white/5 flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center shrink-0 mt-0.5">
                            <BookOpen className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-slate-100">
                                이북 리더기 앱 독서 기록
                              </span>
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-500/10 text-red-400 border border-red-500/20 font-mono">
                                [삭제 대상]
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                              테이블: pdf_metadata (user_id = {session.user.email})
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-slate-200">
                            총 {dataSummary.pdfReader.total}건
                          </span>
                          <div className="text-[11px] text-slate-400">
                            메모 {dataSummary.pdfReader.memoCount}개 · 북마크 {dataSummary.pdfReader.bookmarkCount}개
                          </div>
                        </div>
                      </div>

                      {/* 2. Study History */}
                      <div className="p-3.5 rounded-xl bg-[#171f33]/80 border border-white/5 flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center shrink-0 mt-0.5">
                            <GraduationCap className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-slate-100">
                                단어장 앱 학습 기록
                              </span>
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-500/10 text-red-400 border border-red-500/20 font-mono">
                                [삭제 대상]
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                              테이블: study_history (user_email = {session.user.email})
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-slate-200">
                            {dataSummary.studyHistory.count}건
                          </span>
                          <div className="text-[11px] text-slate-400">
                            학습 및 테스트 기록
                          </div>
                        </div>
                      </div>

                      {/* 3. Notion Tokens */}
                      <div className="p-3.5 rounded-xl bg-[#171f33]/80 border border-white/5 flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center shrink-0 mt-0.5">
                            <Calendar className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-slate-100">
                                스케줄 앱 노션 토큰
                              </span>
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-500/10 text-red-400 border border-red-500/20 font-mono">
                                [삭제 대상]
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                              테이블: user_notion_tokens (user_email = {session.user.email})
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`text-xs font-bold ${dataSummary.notionToken.hasToken ? "text-amber-400" : "text-slate-400"}`}>
                            {dataSummary.notionToken.hasToken ? "토큰 등록됨 (1건)" : "미등록 (0건)"}
                          </span>
                          <div className="text-[11px] text-slate-400">
                            연동 토큰 저장 여부
                          </div>
                        </div>
                      </div>

                      {/* 4. Word Lists (Anonymization) */}
                      <div className="p-3.5 rounded-xl bg-[#171f33]/80 border border-indigo-500/20 flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-[#c3c0ff] flex items-center justify-center shrink-0 mt-0.5">
                            <Layers className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-slate-100">
                                단어장 앱 단어 목록
                              </span>
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/10 text-[#c3c0ff] border border-indigo-500/20 font-mono">
                                [익명화 대상]
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                              테이블: word_lists (user_email → &apos;anonymous&apos;로 변경)
                            </p>
                            {dataSummary.wordLists.titles.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {dataSummary.wordLists.titles.slice(0, 3).map((title, i) => (
                                  <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-[#222a3d] text-slate-300">
                                    {title}
                                  </span>
                                ))}
                                {dataSummary.wordLists.titles.length > 3 && (
                                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#222a3d] text-slate-400">
                                    +{dataSummary.wordLists.titles.length - 3}개 더보기
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs font-bold text-[#c3c0ff]">
                            {dataSummary.wordLists.count}개 단어장
                          </span>
                          <div className="text-[10px] text-slate-400">
                            익명화 처리 예정
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {/* Warning Notice */}
                  <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30">
                    <div className="flex items-start gap-2.5">
                      <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-red-200">
                          데이터 영구 파기 및 익명화 안내
                        </h4>
                        <p className="text-[11px] text-red-200/90 leading-relaxed mt-0.5">
                          본 작업을 진행하면 위의 <strong>독서 기록, 학습 이력, 노션 토큰</strong>은 복구 불가능하게 물리적으로 삭제되며, <strong>단어 목록</strong>은 계정 식별자가 &apos;anonymous&apos;로 전환됩니다.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-1">
                    <button
                      onClick={handleClose}
                      disabled={isDeleting}
                      className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition-all disabled:opacity-50 cursor-pointer"
                    >
                      취소
                    </button>
                    <button
                      onClick={handleDeleteData}
                      disabled={isDeleting}
                      className="flex-1 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                    >
                      {isDeleting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>파기 및 익명화 진행 중...</span>
                        </>
                      ) : (
                        <>
                          <Trash2 className="w-4 h-4" />
                          <span>모든 데이터 영구 삭제</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
