/**
 * 포트폴리오 통합 관리 스크립트
 */
const PortfolioManager = {
  // 1. 설정 및 변수 선언
  init() {
    // 모달 관련
    this.modalWrap = document.getElementById('modal-wrap');
    this.openBtns = document.querySelectorAll('.btn-open');
    this.closeBtn = document.querySelector('.close-btn');
    this.modalContents = document.querySelectorAll('.modal-content');

    // 사이드 메뉴 관련
    this.sideMenuBtn = document.querySelector('.btn-side-menu');
    this.sideMenuContent = document.querySelector('.side-menu-content');
    this.sideLinks = document.querySelectorAll('.side-menu-content a');

    this.savedScrollY = 0;

    // 초기 실행
    this.initSwiper();
    this.initEvents();
    this.setInitAria();
  },
  setInitAria() {
    // 이이콘 속성
    const XiIcons = document.querySelectorAll('[class*="xi-"]');
    XiIcons.forEach((icon) => icon.setAttribute('aria-hidden', 'true'));

    this.openBtns?.forEach((btn) => {
      btn.setAttribute('aria-haspopup', 'dialog');
      btn.setAttribute('aria-controls', 'modal-wrap');
      btn.setAttribute('aria-expanded', 'false');
    });

    // 사이드메뉴 속성
    this.sideMenuBtn?.setAttribute('aria-expanded', 'false');
    this.sideMenuBtn?.setAttribute('aria-controls', 'side-menu-list');
  },
  // 2. 스위퍼 실행 (경력 섹션)
  initSwiper() {
    const swiperTarget = document.querySelector('.experience-swiper');
    if (!swiperTarget) return;
    const slides = document.querySelectorAll('.swiper-slide .company');
    console.log(slides);
    this.mainSwiper = new Swiper('.experience-swiper', {
      effect: 'fade',
      fadeEffect: { crossFade: true },
      loop: true,
      speed: 600,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (idx, className) {
          const menu = slides[idx].innerHTML;
          return `<span class="${className}">${menu}</span>`;
        },
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  },

  // 3. 이벤트 리스너 (클릭 등)
  initEvents() {
    // [모달 열기]
    this.openBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault(); // 최상단 이동 방지
        const targetId = btn.getAttribute('data-target');
        this.openModal(targetId);
      });
    });

    // [모달 닫기] 버튼 & 배경 클릭
    this.closeBtn?.addEventListener('click', () => this.closeModal());
    this.modalWrap?.addEventListener('click', (e) => {
      if (e.target === this.modalWrap) this.closeModal();
    });

    // [ESC 키 닫기]
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
        this.toggleSideMenu(false);
      }
    });

    // [사이드 메뉴 토글]
    this.sideMenuBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggleSideMenu();
    });

    this.sideLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        this.toggleSideMenu(false);
      });
    });

    // [리사이즈 대응]
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1230) {
        this.toggleSideMenu(false);
      }
    });
  },

  // 모달 열기
  openModal(targetId) {
    const target = document.getElementById(targetId);
    if (!target || !this.modalWrap) return;

    this.modalWrap.showModal();

    // 클릭된 버튼의 상태를 true(열림)로 변경
    const currentBtn = document.querySelector(`[data-target="${targetId}"]`);
    currentBtn?.setAttribute('aria-expanded', 'true');

    this.modalContents.forEach((content) => content.classList.remove('active'));
    target.classList.add('active');
    this.lockScroll(true);
  },

  // 모달 닫기
  closeModal() {
    if (!this.modalWrap) return;

    // [추가] 모든 열기 버튼의 상태를 다시 false(닫힘)로 초기화
    this.openBtns.forEach((btn) => btn.setAttribute('aria-expanded', 'false'));

    this.modalWrap.close();
    this.lockScroll(false);
  },

  // 사이드 메뉴 토글
  toggleSideMenu(forceClose) {
    if (!this.sideMenuBtn || !this.sideMenuContent) return;

    const shouldOpen = forceClose !== undefined ? forceClose : !this.sideMenuBtn.classList.contains('active');

    this.sideMenuBtn.classList.toggle('active', shouldOpen);
    this.sideMenuContent.classList.toggle('active', shouldOpen);

    this.sideMenuBtn.setAttribute('aria-expanded', shouldOpen);
    this.sideMenuContent.setAttribute('data-open', shouldOpen);
  },

  lockScroll(isLock) {
    if (isLock) {
      this.savedScrollY = window.pageYOffset;
      document.body.style.top = `-${this.savedScrollY}px`;
    } else {
      document.body.style.top = '';
      window.scrollTo(0, this.savedScrollY);
    }
  },
};

// 모든 HTML이 로드된 후 실행
document.addEventListener('DOMContentLoaded', () => {
  PortfolioManager.init();
});
