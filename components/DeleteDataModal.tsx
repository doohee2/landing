"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import Image from "next/image";

interface DeleteDataModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DeleteDataModal({ isOpen, onClose }: DeleteDataModalProps) {
  const { data: session, status } = useSession();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletionResult, setDeletionResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleClose = () => {
    if (isDeleting) return;
    setDeletionResult(null);
    onClose();
  };

  const handleGoogleSignIn = async () => {
    await signIn("google");
  };

  const handleDeleteData = async () => {
    if (!session?.user) return;
    setIsDeleting(true);
    try {
      const res = await fetch("/api/account/delete", {
        method: "POST",
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setDeletionResult({
          success: true,
          message: data.message || "모든 데이터가 성공적으로 영구 삭제되었습니다.",
        });
        // Sign out automatically
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
            className="relative w-full max-w-lg rounded-2xl bg-[#0f172a] border border-white/10 shadow-2xl overflow-hidden z-10"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#171f33]/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-100 text-base">
                    계정 데이터 삭제 요청
                  </h3>
                  <span className="text-xs text-slate-400">
                    Google OAuth 본인 확인 기반 영구 파기
                  </span>
                </div>
              </div>
              <button
                onClick={handleClose}
                disabled={isDeleting}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Step 3: Deletion Completed Screen */}
              {deletionResult ? (
                <div className="text-center py-4">
                  {deletionResult.success ? (
                    <>
                      <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <CheckCircle2 className="w-7 h-7" />
                      </div>
                      <h4 className="text-lg font-bold text-slate-100 mb-2">
                        데이터 삭제 완료
                      </h4>
                      <p className="text-sm text-slate-300 leading-relaxed mb-6">
                        {deletionResult.message}
                        <br />
                        <span className="text-xs text-slate-400 mt-2 block">
                          안전을 위해 구글 연동 세션이 자동 로그아웃되었습니다.
                        </span>
                      </p>
                      <button
                        onClick={handleClose}
                        className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-600/20"
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
                        className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm transition-all"
                      >
                        다시 시도하기
                      </button>
                    </>
                  )}
                </div>
              ) : status === "loading" ? (
                /* Loading State */
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
                          본인 인증 필요
                        </h4>
                        <p className="text-xs text-indigo-200/80 leading-relaxed">
                          타인의 악의적인 데이터 삭제를 방지하기 위해 구글 계정 본인 인증이 필요합니다. 연동 시 사용하신 Google 계정으로 먼저 인증해 주세요.
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                    구글 로그인은 본인 소유권 검증 목적으로만 최소한의 기본 프로필(`openid email profile`)만을 요청하며, 추가 개인정보는 일체 수집되지 않습니다.
                  </p>

                  <button
                    onClick={handleGoogleSignIn}
                    className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-3"
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
                /* Step 2: Authenticated State */
                <div>
                  {/* Verified User Card */}
                  <div className="p-3.5 rounded-xl bg-[#171f33] border border-white/5 flex items-center justify-between mb-4">
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
                      className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Warning Notice */}
                  <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 mb-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-bold text-red-200 mb-1">
                          영구 데이터 파기 경고
                        </h4>
                        <p className="text-xs text-red-200/90 leading-relaxed font-medium">
                          본 작업을 진행하면 Supabase 및 연동된 모든 앱의 학습 기록, 메모, 설정 데이터가 영구적으로 파기됩니다.
                        </p>
                        <p className="text-[11px] text-red-300/70 mt-2">
                          * 단어장 등 공용 기여 코퍼스는 식별자 해시 마스킹을 통해 즉시 익명화 처리됩니다.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleClose}
                      disabled={isDeleting}
                      className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm transition-all disabled:opacity-50"
                    >
                      취소
                    </button>
                    <button
                      onClick={handleDeleteData}
                      disabled={isDeleting}
                      className="flex-1 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-sm transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isDeleting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>파기 진행 중...</span>
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
