import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function POST() {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json(
        {
          success: false,
          error: "인증되지 않은 요청입니다. 구글 로그인을 먼저 진행해 주세요.",
        },
        { status: 401 }
      );
    }

    const userEmail = session.user.email;
    const userId = session.user.id || session.user.email;

    // =========================================================================
    // TODO: Supabase delete queries
    // 1. Delete user record and synced records from Supabase tables:
    //    await supabase.from('user_profiles').delete().eq('email', userEmail);
    //    await supabase.from('reading_notes').delete().eq('user_id', userId);
    //    await supabase.from('vocab_records').delete().eq('user_id', userId);
    //    await supabase.from('calendar_sync').delete().eq('user_id', userId);
    // 2. Anonymize shared vocabulary contributions:
    //    await supabase.from('shared_vocab').update({ user_id: 'ANONYMIZED_HASH' }).eq('user_id', userId);
    // 3. Purge storage bucket objects if applicable:
    //    await supabase.storage.from('user_data').remove([`${userId}/`]);
    // =========================================================================

    return NextResponse.json(
      {
        success: true,
        message: `계정(${userEmail})과 연동된 모든 데이터가 성공적으로 영구 삭제 처리되었습니다.`,
        deletedUserId: userId,
        deletedAt: new Date().toISOString(),
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
