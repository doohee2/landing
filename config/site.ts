export interface AppItem {
  id: string;
  name: string;
  category: string;
  description: string;
  url: string;
  icon: string;
  tags: string[];
  version: string;
}

export interface MetricItem {
  title: string;
  description: string;
  iconName: 'widgets' | 'lock' | 'shield';
}

export interface PrivacyItem {
  title: string;
  description: string;
  detail: string;
  iconName: 'badge' | 'sync' | 'timer' | 'block';
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const siteConfig = {
  brand: {
    name: "아무거나",
    subName: "Studio",
    tagline: "Indie Vibe Lab",
    description: "가볍게 일상에서 사용 가능한 인디 소프트웨어를 만들고 배포합니다.",
    developer: "doohee2",
    githubUrl: "https://github.com/doohee2",
    email: "doohee2@gmail.com",
    copyright: "© 2026 아무거나 Studio · Vibe Coding. All rights reserved.",
    disclaimer: "본 사이트는 서비스 이용자의 개인정보 및 권리 보호 관련 법령을 준수합니다.",
  },
  nav: [
    { label: "앱 목록 (Apps)", href: "#apps-section" },
    { label: "개인정보처리방침 (Privacy)", href: "/privacy" },
    { label: "서비스 약관 (Terms)", href: "/terms" },
    { label: "데이터 삭제 (Data Deletion)", href: "#deletion-section" },
    { label: "FAQ (자주 묻는 질문)", href: "#faq-section" },
  ],
  hero: {
    pillBadge: "Vibe Coding Project · 아무거나",
    title: "생활의 편의를 위해 만든,\n‘아무거나’ 앱들을 만나보세요",
    subtitle: "인디 개발과 바이브 코딩으로 일상 속 작은 불편함을 해결하는 유용한 유틸리티 웹 애플리케이션 컬렉션입니다.",
    ctaExplore: "앱 둘러보기",
    ctaPrivacy: "개인정보처리방침 안내",
    ctaTerms: "서비스 이용약관",
    ctaDelete: "데이터 삭제 요청",
    metrics: [
      {
        title: "6가지 실용 앱",
        description: "엄선된 유틸리티 모음",
        iconName: "widgets",
      },
      {
        title: "안전한 구글 OAuth",
        description: "공식 Google OAuth 2.0 프로토콜",
      iconName: "lock",
      },
      {
        title: "투명한 데이터 관리",
        description: "언제든 즉시 영구 삭제 지원",
        iconName: "shield",
      },
    ] as MetricItem[],
  },
  apps: {
    badge: "Application Suite",
    title: "출시된 앱 모아보기",
    description: "각각의 목적에 맞춰 가볍고 직관적으로 설계된 '아무거나' 스튜디오의 자체 제작 앱입니다.",
    list: [
      {
        id: "simple-reader",
        name: "Simple Reader",
        category: "PDF / Reading",
        description: "언제 어디서나 PDF 파일을 읽고, 책갈피, 번역 메모 등을 관리하는 스마트 이북 리더기",
        url: "https://simple-reader-doohee2.vercel.app/",
        icon: "/icons/apps/simple-reader.png",
        tags: ["#PDF뷰어", "#메모공유", "#독서"],
        version: "v.beta · PWA, Next.js, OAuth, react-pdf",
      },
      {
        id: "word-smart",
        name: "Word Smart",
        category: "Language Study",
        description: "영어, 일본어 한자, 한자 단어들을 공부하고, 학습 기록과 시험지 PDF 출력을 지원하는 단어장 앱",
        url: "https://word-smart-doohee2.vercel.app/",
        icon: "/icons/apps/word-smart.png",
        tags: ["#단어학습", "#어학공부", "#기록관리"],
        version: "v.beta · PWA, Next.js, OAuth",
      },
      {
        id: "simple-schedule",
        name: "Simple Schedule",
        category: "Productivity",
        description: "구글 캘린더와 노션 습관 체크리스트를 연동하여 관리하는 심플 스케줄러",
        url: "https://simple-schedule-doohee2.vercel.app/",
        icon: "/icons/apps/simple-schedule.png",
        tags: ["#구글캘린더연동", "#노션체크리스트", "#일정관리"],
        version: "v.beta · PWA, Next.js, OAuth, Notion API",
      },
      {
        id: "my-drive-finder",
        name: "My Drive Finder",
        category: "Cloud Search",
        description: "구글 드라이브 내 대용량 Excel, CSV 파일의 내용을 클라이언트 캐시에서 검색하는 앱",
        url: "https://my-drive-finder-doohee2.vercel.app/",
        icon: "/icons/apps/my-drive-finder.png",
        tags: ["#구글드라이브", "#엑셀검색", "#CSV조회"],
        version: "v.beta · PWA, Next.js, OAuth",
      },
      {
        id: "lens-dictionary",
        name: "Lens Dictionary",
        category: "OCR & Lexicon",
        description: "카메라 스캔을 지원하는 오프라인 StarDict 영한/영영 사전 앱",
        url: "https://lens-dict-doohee2.vercel.app/",
        icon: "/icons/apps/lens-dictionary.png",
        tags: ["#카메라스캔", "#영한사전", "#스타딕지원"],
        version: "v.beta · PWA, Next.js, Tesseract, Cloud Vision API",
      },
      {
        id: "subway-tracker",
        name: "Subway Tracker",
        category: "Transit Live",
        description: "서울 지하철 실시간 도착 정보 및 도착 알람을 지원하는 위치 추적 앱",
        url: "https://subway-tracker-doohee2.vercel.app/",
        icon: "/icons/apps/subway-tracker.png",
        tags: ["#지하철도착정보", "#실시간조회", "#대중교통"],
        version: "v.beta · PWA, Next.js, 공공 데이터 API",
      },
    ] as AppItem[],
  },
  privacySummary: {
    badge: "Google OAuth Developer Policy",
    title: "개인정보처리방침 및 이용약관 요약",
    description: "앱들은 편리하고 일관된 사용자 환경을 위해 구글 OAuth(Google OAuth 2.0)를 지원하며, 구글 개발자 정책에 따른 개인정보처리방침과 이용약관을 투명하고 정직하게 공개합니다.",
    callout: "사용자의 승인 없이 계정 외 정보를 절대 수집하지 않으며, 구글 보안 표준 프로토콜을 전적으로 준수합니다.",
    viewFullPolicy: "개인정보처리방침 전문 보기",
    viewTermsPolicy: "서비스 이용약관 전문 보기",
    items: [
      {
        title: "수집 항목",
        description: "Google 계정 기본 프로필 정보",
        detail: "• 고유 식별자 ID, 이메일 주소, 이름",
        iconName: "badge",
      },
      {
        title: "수집 목적",
        description: "사용자 개별 식별 및 동기화 유지",
        detail: "• 다중 기기 간 개인 설정 및 세션 복원",
        iconName: "sync",
      },
      {
        title: "보유 및 이용 기간",
        description: "요청 즉시 파기",
        detail: "• 사용자 요청 시 데이터 무기한 보관 없음",
        iconName: "timer",
      },
      {
        title: "제3자 제공 방침",
        description: "외부 판매 및 상업적 제공 일체 없음",
        detail: "• 어떠한 경우에도 제3자에게 판매/제공 금지",
        iconName: "block",
      },
    ] as PrivacyItem[],
  },
  dataDeletion: {
    badge: "User Rights & Erasure",
    title: "개인정보 및 이용 기록 삭제 안내",
    description: "개인정보 삭제를 원할 경우, 구글 계정 로그인을 통해 간편한 본인확인을 거쳐 즉시 데이터 영구 삭제가 가능합니다.",
    immediateErasure: {
      badge: "[즉시 파기]",
      title: "사용 기록 및 환경 설정",
      description: "사용자의 학습 기록, 앱 사용 로그, 설정 정보 등 개인화 정보는 삭제 요청 즉시 데이터베이스에서 물리적 파기되어 복구 불가능합니다.",
      footer: "데이터 영구 삭제 보장",
    },
    anonymization: {
      badge: "[익명화 처리]",
      title: "단어장 데이터",
      description: "공유형 단어장 및 어학 코퍼스는 다른 사용자 생태계와의 연결 및 학습 호환성을 위해 작성자의 고유 식별자(이메일, ID)를 완전하게 익명화 처리합니다.",
      footer: "작성자 식별정보 영구 마스킹",
    },
    selfService: {
      badge: "Self Service",
      title: "데이터 삭제 요청 절차",
      description: "타인의 무단 삭제를 방지하기 위해 Google OAuth 인증으로 소유권을 확인한 후 원클릭으로 초기화합니다.",
      steps: [
        "하단 구글 계정 인증 클릭",
        "삭제 확인 및 파기 요청 진행",
        "즉시 파기 결과 확인",
      ],
      buttonText: "Google 계정으로 데이터 삭제 요청",
    },
  },
  faq: {
    badge: "FAQ & Help",
    title: "자주 묻는 질문",
    description: "이용자분들이 가장 궁금해하시는 점들을 투명하게 안내해 드립니다.",
    items: [
      {
        question: "구글 계정 로그인이 되지 않고 잘못된 접근으로 나옵니다.",
        answer: "현재 각 앱들은 테스트 용도로 등록된 이메일들에 대해서만 로그인이 가능하므로, 일부 앱들은 기능의 제한이 있습니다. 구글 OAuth 배포 심사 이후에 모든 구글 사용자가 이용가능합니다.",
      },
      {
        question: "모바일 PWA 앱이 무엇이죠? 왜 따로 등록해서 사용해야 하나요?",
        answer: "Progressive Web App(PWA)는 웹 기반으로 사용자가 스마트폰이나 PC에 설치해 네이티브 앱처럼 사용할 수 있는 애플리케이션입니다. 로컬 데이터의 안전한 관리와 사용자 편의를 위해 브라우저의 '홈 화면에 추가' 기능을 이용해 PWA 앱으로 등록 사용을 권장합니다.",
      },
      {
        question: "서비스는 어떤 인프라 환경에서 서비스가 제공되는 건가요?",
        answer: "각 앱 서비스는 모두 Next.js 서버리스 인프라 Vercel, 오픈소스 데이터베이스 Supabase 등의 무료 인프라를 이용해 제공됩니다. 따라서 추후 해당 업체의 정책 변경 시 서비스 제공 범위가 변동될 수 있습니다.",
      },
      {
        question: "앱들은 계속 유지보수 개발이 되는 건가요?",
        answer: "현재 안정적으로 기능이 제공되고 있으나, 바이브 코딩 및 인디 프로젝트 특성상 추후 기능 추가나 지속적인 업데이트 개선을 공식 약속할 수는 없습니다. 하지만 중요한 버그 수정과 API 변경에 대응하는 유지보수는 모니터링하여 대응하고 있습니다.",
      },
      {
        question: "개인정보는 안전한가요?",
        answer: "구글 계정 연동은 안전한 Google 공식 OAuth 2.0 인증을 통해 사용자 구분을 위해서만 사용되며, 주민등록번호, 비밀번호 등 민감한 개인정보는 일체 수집하거나 서버에 저장하지 않습니다. 자세한 사항은 상단의 개인정보처리방침을 참고해 주세요.",
      },
      {
        question: "구글 드라이브 파일 읽기, 쓰기 권한은 왜 필요한가요?",
        answer: "'Simple Reader', 'Word Smart', 'My Drive Finder'는 사용자가 선택한 PDF 파일, 단어장 파일 등의 열람 및 로컬 캐싱을 위해 읽기 권한(Scope: auth/drive.readonly)을, 'My Drive Finder'는 추가로 파일 수동 업로드를 위해 최소한의 읽기/쓰기 권한(Scope: auth/drive.file)을 클라이언트 브라우저 세션 내에서만 요청합니다. 두 앱 모두 사용자 동의 없이 외부 서버로 파일 원본이나 내용을 전송하지 않습니다.",
      },
      {
        question: "Is Korean the only supported language? 한글 외 외국어 지원은 불가능한가요?",
        answer: "We're sorry, but we don't currently plan to support other languages. 아쉽지만 현재 외국어 지원 예정은 없습니다.",
      },
    ] as FaqItem[],
    supportTitle: "더 궁금한 점이 있으신가요?",
    supportSubtitle: "버그 제보나 문의 사항은 언제든 개발자에게 메일로 전달해 주세요.",
    supportButton: "문의 메일 보내기",
  },
};
