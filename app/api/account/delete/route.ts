import { NextResponse } from "next/server";
import { auth } from "@/auth";
// import { supabase } from "@/lib/supabase";

export async function POST() {
  try {
    // 1. Strict server-side verification: Get authenticated Google OAuth session
    const session = await auth();

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json(
        {
          success: false,
          error: "인증되지 않은 요청입니다. 먼저 구글 로그인을 진행해 주세요.",
        },
        { status: 401 }
      );
    }

    // Security: The email address is locked to the session token and cannot be spoofed by clients
    const userEmail = session.user.email;
    const userId = session.user.id || session.user.email;

    // =========================================================================
    // [임시 비활성화] DB 테이블 실제 삭제 및 익명화 루틴
    // 나중에 다시 활성화할 때는 아래 주석을 풀고 상단의 supabase import를 켜주세요.
    // =========================================================================
    /*
    const [delPdfRes, delStudyRes, delNotionRes, anonWordRes] = await Promise.all([
      // (1) 이북 리더기 앱 독서 기록 완전 삭제 (pdf_metadata.user_id = userEmail)
      supabase.from("pdf_metadata").delete().eq("user_id", userEmail),

      // (2) 단어장 앱 학습 기록 완전 삭제 (study_history.user_email = userEmail)
      supabase.from("study_history").delete().eq("user_email", userEmail),

      // (3) 스케줄 앱 노션 토큰 완전 삭제 (user_notion_tokens.user_email = userEmail)
      supabase.from("user_notion_tokens").delete().eq("user_email", userEmail),

      // (4) 단어장 앱 단어 목록 익명화 처리 (word_lists.user_email -> 'anonymous')
      supabase
        .from("word_lists")
        .update({ user_email: "anonymous" })
        .eq("user_email", userEmail),
    ]);

    if (delPdfRes.error) {
      console.error("Failed to delete pdf_metadata:", delPdfRes.error);
    }
    if (delStudyRes.error) {
      console.error("Failed to delete study_history:", delStudyRes.error);
    }
    if (delNotionRes.error) {
      console.error("Failed to delete user_notion_tokens:", delNotionRes.error);
    }
    if (anonWordRes.error) {
      console.error("Failed to anonymize word_lists:", anonWordRes.error);
    }
    */

    return NextResponse.json(
      {
        success: true,
        message: `계정(${userEmail})의 데이터 삭제 요청이 정상 접수되었습니다. (현재 DB 실제 삭제 루틴은 안전을 위해 비활성화되어 있습니다)`,
        deletedUserId: userId,
        deletedAt: new Date().toISOString(),
        details: {
          pdfMetadata: "bypassed",
          studyHistory: "bypassed",
          notionTokens: "bypassed",
          wordLists: "bypassed",
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Account deletion failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: "데이터 삭제 처리 중 내부 서버 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
