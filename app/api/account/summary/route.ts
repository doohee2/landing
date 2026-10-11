import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { supabase } from "@/lib/supabase";

export async function POST() {
  try {
    // 1. Server-side session verification: Strictly get email from verified Google OAuth session
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

    // Security: Only use the server-verified email. Ignore any client-supplied parameters.
    const userEmail = session.user.email;

    // 2. Parallel queries to Supabase for all personal data categories
    const [pdfRes, studyRes, notionRes, wordRes] = await Promise.all([
      // (1) 이북 리더기 앱 독서 기록: pdf_metadata (user_id = userEmail)
      supabase
        .from("pdf_metadata")
        .select("id, type")
        .eq("user_id", userEmail),

      // (2) 단어장 앱 학습 기록: study_history (user_email = userEmail)
      supabase
        .from("study_history")
        .select("id", { count: "exact" })
        .eq("user_email", userEmail),

      // (3) 스케줄 앱: user_notion_tokens (user_email = userEmail)
      supabase
        .from("user_notion_tokens")
        .select("id, created_at")
        .eq("user_email", userEmail),

      // (4) 단어장 앱 단어 목록: word_lists (user_email = userEmail)
      supabase
        .from("word_lists")
        .select("id, title, lang")
        .eq("user_email", userEmail),
    ]);

    // Handle any Supabase errors gracefully
    if (pdfRes.error) console.error("Error querying pdf_metadata:", pdfRes.error);
    if (studyRes.error) console.error("Error querying study_history:", studyRes.error);
    if (notionRes.error) console.error("Error querying user_notion_tokens:", notionRes.error);
    if (wordRes.error) console.error("Error querying word_lists:", wordRes.error);

    // Parse (1) PDF Reading Records (Memos and Bookmarks)
    const pdfData = pdfRes.data || [];
    const memoCount = pdfData.filter((item) => item.type === "memo").length;
    const bookmarkCount = pdfData.filter((item) => item.type === "bookmark").length;
    const totalPdfRecords = pdfData.length;

    // Parse (2) Word Smart Study History Count
    const studyCount = studyRes.count ?? (studyRes.data ? studyRes.data.length : 0);

    // Parse (3) Schedule App Notion Tokens
    const notionTokens = notionRes.data || [];
    const hasNotionToken = notionTokens.length > 0;

    // Parse (4) Word Lists (to be anonymized to 'anonymous')
    const wordLists = wordRes.data || [];
    const wordListCount = wordLists.length;
    const wordListTitles = wordLists.map((item) => item.title).filter(Boolean);

    const totalDeletableItems = totalPdfRecords + studyCount + (hasNotionToken ? 1 : 0);
    const totalAnonymizableItems = wordListCount;

    return NextResponse.json({
      success: true,
      verifiedEmail: userEmail,
      summary: {
        pdfReader: {
          total: totalPdfRecords,
          memoCount,
          bookmarkCount,
        },
        studyHistory: {
          count: studyCount,
        },
        notionToken: {
          hasToken: hasNotionToken,
          count: notionTokens.length,
        },
        wordLists: {
          count: wordListCount,
          titles: wordListTitles,
        },
        totalDeletableItems,
        totalAnonymizableItems,
        hasAnyData: totalDeletableItems > 0 || totalAnonymizableItems > 0,
      },
    });
  } catch (error) {
    console.error("Account data summary retrieval error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "개인정보 목록 조회 중 서버 내부 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
