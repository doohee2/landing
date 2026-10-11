# 🚀 Vibe Coding Showcase & Google OAuth Compliance Landing

> **아무거나 Studio**에서 제작한 바이브코딩 PWA 웹 애플리케이션 제품군을 소개하고, Google OAuth 배포 검수를 충족하기 위한 **통합 개인정보처리방침** 및 **구글 계정 본인 인증 기반 데이터 삭제 파이프라인**을 제공하는 공식 랜딩 페이지입니다.

---

## 📌 1. 프로젝트 개요 (Overview)

- **프로젝트명**: 아무거나 Studio Landing Page (Vibe Coding Showcase)
- **개발자 / 운영자**: doohee2 ([GitHub](https://github.com/doohee2))
- **브랜드 슬로건**: Indie Vibe Lab · 유쾌하고 간결한 인디 소프트웨어를 만들고 배포합니다.
- **핵심 목적**:
  1. 바이브코딩으로 제작된 6가지 실용 웹 애플리케이션 쇼케이스 제공.
  2. Google API 서비스 사용자 데이터 정책(Google API Services User Data Policy)을 엄격히 준수하는 **통합 개인정보처리방침** 공시.
  3. 구글 OAuth 검수 통과를 위한 **본인 확인 기반 계정 및 이용 데이터 즉시 영구 삭제 기능** 지원.

---

## 🛠️ 2. 기술 스택 & 개발 환경 (Tech Stack)

| 구분 | 기술 / 라이브러리 | 버전 / 비고 |
| :--- | :--- | :--- |
| **Framework** | **Next.js (App Router)** | v16+ (Turbopack 탑재) |
| **Core** | **React** | v19.3.0 |
| **Language** | **TypeScript** | v5.x (Strict Type Checking) |
| **Styling** | **Tailwind CSS** | v4 (`@tailwindcss/typography` 플러그인 내장) |
| **Icons** | **Lucide Icons** | 최신 SVG 벡터 아이콘 세트 |
| **Authentication** | **NextAuth.js v5 Beta** | `auth.js` (Google OAuth Provider, 최소 스코프) |
| **Animation** | **framer-motion** | v12+ (카드 호버, 아코디언, 모달 애니메이션) |
| **Markdown** | **react-markdown** | 개인정보처리방침 원문 동적 파싱 및 가독성 렌더링 |

---

## ✨ 3. 핵심 기능 명세 (Key Features)

### 3.1. 문구 및 메타데이터 중앙 집중 관리 (`config/site.ts`)
- 사이트 타이틀, 브랜드 소개, 히어로 슬로건, 신뢰 지표, FAQ 질문/답변, 푸터 정보 등을 `config/site.ts` 파일 한 곳에서 일괄 수정 가능.
- 6개 앱의 메타데이터(이름, 카테고리, 설명, URL, 아이콘 경로, 태그, 버전)를 객체 배열로 정의하여 손쉬운 확장 보장.

### 3.2. 6대 실용 PWA 웹 애플리케이션 쇼케이스
| 앱 이름 | 카테고리 | 핵심 기능 설명 | 서비스 링크 |
| :--- | :--- | :--- | :--- |
| **Simple Reader** | `PDF / Reading` | 어디서나 PDF 파일을 읽고, 책갈피 및 번역 메모를 관리하는 스마트 이북 리더기 | [바로가기](https://simple-reader-doohee2.vercel.app/) |
| **Word Smart** | `Language Study` | 영어, 일본어 한자, 한자 단어 공부 및 SRS 학습 기록, 시험지 PDF 출력을 지원하는 단어장 | [바로가기](https://word-smart-doohee2.vercel.app/) |
| **Simple Schedule** | `Productivity` | 구글 캘린더와 노션 습관 체크리스트를 연동하여 일정과 루틴을 관리하는 심플 스케줄러 | [바로가기](https://simple-schedule-doohee2.vercel.app/) |
| **My Drive Finder** | `Cloud Search` | 구글 드라이브 내 대용량 Excel, CSV 파일의 내용을 클라이언트 사이드에서 초고속 검색 | [바로가기](https://my-drive-finder-doohee2.vercel.app/) |
| **Lens Dictionary** | `OCR & Lexicon` | 카메라 스캔을 지원하는 오프라인 StarDict 영한/영영 사전 앱 | [바로가기](https://lens-dict-doohee2.vercel.app/) |
| **Subway Tracker** | `Transit Live` | 서울/수도권 지하철 실시간 도착 정보 및 도착 알람을 지원하는 위치 추적 앱 | [바로가기](https://subway-tracker-doohee2.vercel.app/) |

- 모든 카드는 `framer-motion` 호버 인터랙션과 함께 새 탭(`target="_blank" rel="noopener noreferrer"`)으로 안전하게 연결됩니다.

### 3.3. 개인정보처리방침 동적 마크다운 렌더링 (`/privacy`)
- `content/privacy-policy.md` 파일을 서버 컴포넌트(`app/privacy/page.tsx`)에서 Node.js `fs.readFileSync`로 직접 읽어와 렌더링합니다.
- `@tailwindcss/typography`의 `prose prose-indigo dark:prose-invert max-w-none` 클래스를 적용하여 데스크톱 및 모바일에서 최적의 가독성을 제공합니다.
- 마크다운 원본 문서를 수정하면 코드 수정 없이 즉시 페이지에 반영됩니다.

### 3.4. 구글 로그인 기반 계정 데이터 삭제 파이프라인
구글 개발자 검수(Verification)를 완벽히 통과하기 위한 3단계 UX 파이프라인을 지원합니다:
1. **모달 진입**: 상단 헤더, 메인 섹션, 푸터의 [데이터 삭제 요청] 버튼을 누르면 `DeleteDataModal` 실행.
2. **비로그인 상태 (1단계)**:
   - "타인의 악의적인 데이터 삭제를 방지하기 위해 구글 계정 본인 인증이 필요합니다." 안내 표시.
   - 구글 검수 최소 권한(`openid email profile`)만을 요청하는 Google 로그인 트리거 (`signIn('google')`).
3. **로그인 완료 상태 (2단계)**:
   - 인증된 사용자 정보(이메일, 프로필 사진, 본인 인증 뱃지) 명시.
   - 경고 문구: *"본 작업을 진행하면 Supabase 및 연동된 모든 앱의 학습 기록, 메모, 설정 데이터가 영구적으로 파기됩니다."*
   - [모든 데이터 영구 삭제] 버튼 클릭 시 `/api/account/delete`로 POST 요청 전송.
4. **삭제 완료 (3단계)**:
   - 200 OK 응답 수신 후 구글 세션을 자동 로그아웃(`signOut()`) 처리.
   - 사용자에게 영구 파기 완료 화면을 안내.

---

## 📁 4. 디렉터리 및 파일 구조 (Directory Structure)

```text
landing/
├── app/
│   ├── layout.tsx                # NextAuth SessionProvider 및 Inter/JetBrains Mono 폰트, 메타데이터
│   ├── page.tsx                  # 메인 랜딩 원페이지 (Hero, Apps, Privacy, Deletion, FAQ, Modal)
│   ├── privacy/
│   │   └── page.tsx              # 개인정보처리방침 전용 뷰 (서버 컴포넌트 마크다운 렌더링)
│   ├── globals.css               # Tailwind CSS v4 테마 토큰 및 @plugin typography 설정
│   └── api/
│       ├── auth/[...nextauth]/
│       │   └── route.ts          # NextAuth v5 API 라우트 핸들러 (GET, POST)
│       └── account/delete/
│           └── route.ts          # 세션 검증 후 실행되는 계정 데이터 영구 삭제 Mock API 라우트
├── components/
│   ├── Providers.tsx             # NextAuth SessionProvider 클라이언트 컴포넌트 래퍼
│   ├── Header.tsx                # 상단 GNB (로고, 데스크톱/모바일 메뉴, 모달 퀵 링크)
│   ├── Hero.tsx                  # 앰비언트 글로우, 메인 슬로건, 신뢰 지표 3종 카드
│   ├── AppCard.tsx               # 개별 앱 카드 컴포넌트 (framer-motion 호버, 아이콘, 외장 링크)
│   ├── AppGrid.tsx               # 6개 앱 쇼케이스 반응형 그리드
│   ├── PrivacySummary.tsx        # 메인 페이지용 4대 핵심 정책 요약 카드
│   ├── DeletionSection.tsx       # 데이터 파기 안내 및 구글 연동 삭제 절차 안내 섹션
│   ├── DeleteDataModal.tsx       # 구글 로그인 본인 확인 및 데이터 삭제 2단계 확인 모달
│   ├── FAQSection.tsx            # 인터랙티브 아코디언 FAQ 및 이메일 문의 카드
│   └── Footer.tsx                # 저작권, 개발자 정보(GitHub doohee2), 정책 바로가기 링크
├── config/
│   └── site.ts                   # 모든 문구, 브랜드 메타데이터, 앱 6종 설정을 중앙 관리하는 단일 진실 원천
├── content/
│   └── privacy-policy.md         # Google OAuth 검수 규격 통합 개인정보처리방침 마크다운 원문
├── auth.ts                       # NextAuth v5 설정 (Google Provider, least-privilege scope)
├── public/
│   └── icons/
│       └── apps/                 # 각 앱의 고화질 PNG 아이콘 에셋
├── package.json                  # 프로젝트 의존성 및 스크립트 정의
└── GEMINI.md                     # 본 개발 및 운영 문서
```

---

## 🔐 5. 환경 변수 설정 (Environment Variables)

구글 OAuth 연동을 위해 프로젝트 루트에 `.env.local` 파일을 생성하고 아래 키를 입력합니다:

```env
# NextAuth v5 Secret (openssl rand -base64 32 또는 임의의 난수 문자열)
AUTH_SECRET="your-nextauth-secret-key"

# Google Cloud Console OAuth 2.0 Client ID & Secret
AUTH_GOOGLE_ID="your-google-client-id.apps.googleusercontent.com"
AUTH_GOOGLE_SECRET="your-google-client-secret"

# 프로덕션 배포 시 필수 (로컬 개발 시 자동 감지)
NEXTAUTH_URL="https://your-domain.vercel.app"
```

> **구글 클라우드 콘솔 설정 가이드:**
> 1. [Google Cloud Console](https://console.cloud.google.com/) > **API 및 서비스** > **사용자 인증 정보** 이동
> 2. **승인된 자바스크립트 원본**:
>    - `http://localhost:3000`
>    - `https://your-domain.vercel.app`
> 3. **승인된 리디렉션 URI**:
>    - `http://localhost:3000/api/auth/callback/google`
>    - `https://your-domain.vercel.app/api/auth/callback/google`

---

## 💻 6. 실행 및 빌드 명령어 (Commands)

```bash
# 의존성 패키지 설치
npm install

# 로컬 개발 서버 실행 (Turbopack)
npm run dev

# 프로덕션 빌드 (TypeScript 검사 및 정적 사전 렌더링)
npm run build

# 빌드된 프로덕션 서버 실행
npm run start

# ESLint 코드 품질 및 컨벤션 검사
npm run lint
```

---

## 🔮 7. 향후 유지보수 및 확장 가이드 (Extension Guide)

### 1) Supabase 실 데이터 삭제 쿼리 연결
- `app/api/account/delete/route.ts` 파일의 `// TODO: Supabase delete queries` 주석 영역에 실제 Supabase 클라이언트 호출 쿼리를 삽입하면 즉시 프로덕션 삭제 시스템으로 전환됩니다.
```typescript
// 예시:
await supabase.from('user_profiles').delete().eq('email', userEmail);
await supabase.from('reading_notes').delete().eq('user_id', userId);
await supabase.from('vocab_records').delete().eq('user_id', userId);
```

### 2) 신규 애플리케이션 추가
1. `public/icons/apps/{앱영문이름}.png` 경로에 아이콘 이미지를 추가합니다.
2. `config/site.ts`의 `siteConfig.apps.list` 배열에 객체를 1개 추가하면 메인 화면의 쇼케이스 그리드에 즉시 반영됩니다.
