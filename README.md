# [김미소] Web Publisher Portfolio
> "기획의 의도를 이해하고, 개발의 효율을 고려하는 퍼블리셔 김미소입니다."

---

## 🚀 바로가기
- **배포 URL:** [https://pt-2026-ms.vercel.app/](https://pt-2026-ms.vercel.app/)
- **주요 역량:** 시맨틱 마크업, WAI-ARIA 기반 웹 접근성, GSAP 인터랙티브 구현, 유지보수가 용이한 공통 UI 설계

---

## 🛠 Tech Stacks

### Frontend & Library
- **Markup:** HTML5 (Semantic Markup), WAI-ARIA
- **Styling:** CSS3, SCSS (Mixin, Variable 활용), Flex
- **Scripting:** JavaScript
- **Animation:** GSAP (ScrollTrigger, ScrollToPlugin)
- **Library:** Swiper.js
- **DevOps:** Git, GitHub

## 📁 Project Structure
```
/
├── index.html          # 메인 페이지
├── scss/               # 스타일 소스 파일
│   ├── _variables.scss # 전역 변수 (Color, Z-index, Breakpoints)
│   ├── _utils.scss     # 공통 Mixin 및 유틸리티
│   ├── _index.scss     # 메인 레이아웃 및 컴포넌트 스타일
│   └── style.scss      # 스타일 통합 (Compile entry)
├── css/                # 컴파일된 실행 파일
│   ├── reset.css       # 스타일 초기화
│   └── XEIcon-2.2.0/   # 폰트 아이콘 라이브러리
├── js/                 # 인터랙션 제어
│   ├── index.js        # 메인 UI 기능 (모달, 메뉴 등)
│   └── gsap.js         # GSAP 스크롤 애니메이션 최적화
└── img/                # 프로젝트 리소스