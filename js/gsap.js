gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

ScrollTrigger.config({ autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load', ignoreMobileResize: true });

const initSplitText = (selector, type = 'word') => {
  const els = document.querySelectorAll(selector);
  els.forEach((el) => {
    const text = el.innerText;
    if (type === 'word') {
      el.innerHTML = text
        .split(' ')
        .map((w) => `<span class="anim-word">${w}</span>`)
        .join(' ');
    } else {
      el.innerHTML = text
        .split('')
        .map((c) => `<span>${c === ' ' ? '&nbsp;' : c}</span>`)
        .join('');
    }
    el.classList.add('is-ready');
  });
};

window.addEventListener('load', () => {
  initSplitText('.about-section p', 'word');
  initSplitText('.skill-title', 'char');
  initSplitText('.experience-title', 'char');
  initSplitText('.sec-title', 'char');

  // -----------------------------------------------------------
  // 1. [side-menu]
  // -----------------------------------------------------------
  document.querySelectorAll('.side-menu_link').forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      if (!href || href === '#') return;

      const targetId = href.replace('#', '');

      if (targetId === 'hero' || targetId === 'home') {
        gsap.to(window, { duration: 2, scrollTo: { y: 0 }, ease: 'power2.inOut' });
        return;
      }

      const targetST = ScrollTrigger.getById(targetId);

      if (targetST) {
        const scrollRange = targetST.end - targetST.start;
        const offset = scrollRange * 0.8;

        gsap.to(window, {
          duration: 2,
          scrollTo: { y: targetST.start + offset },
          ease: 'power2.inOut',
          onComplete: () => {
            ScrollTrigger.update();
          },
        });
      } else {
        const targetEl = document.querySelector(href);
        if (targetEl) {
          gsap.to(window, {
            duration: 1.5,
            scrollTo: { y: targetEl, autoKill: false },
            ease: 'power2.inOut',
          });
        }
      }
    });
  });

  // -----------------------------------------------------------
  // 2. [Hero + About 섹션] - 줌인 전환 및 텍스트 낙하
  // -----------------------------------------------------------

  // 1. matchMedia 생성
  let mm = gsap.matchMedia();

  mm.add(
    {
      isDesktop: '(min-width: 1161px)',
      isTablet: '(max-width: 1160px) and (min-width: 766px)',
      isMobile: '(max-width: 765px)',
    },
    (context) => {
      let { isTablet, isMobile } = context.conditions;

      // 1. calc 대신 직접 px 값을 계산하는 함수 (리사이즈 대응)
        const getTopStart = () => {
          const vh = window.innerHeight;
          return (vh * 0.5) - 35;
        };

        const getBtmStart = () => {
          const vh = window.innerHeight;
          return isMobile ? (vh * 0.5) - 40 : (vh * 0.5) - 35;
        };
        
        console.log('getTopStart=', getTopStart);
        console.log('getBtmStart=', getBtmStart);
      const introTl = gsap.timeline();
      introTl
        .to('.hero-section', { scale: 50, z: 350, transformOrigin: 'center', ease: 'power1.inOut', duration: 2 })
        .to('.about-section', { scale: 1, ease: 'power1.inOut', duration: 2 }, '<')
        .to('.hero-section', { opacity: 0, zIndex: -1, duration: 0.1 })
        .fromTo('.quotation-top', { top: getTopStart, opacity: 0 }, { top: 0, opacity: 1, duration: 1, ease: 'power2.out' })
        .fromTo('.quotation-btm', { bottom: getBtmStart, opacity: 0 }, { bottom: 0, opacity: 1, duration: 1, ease: 'power2.out' },"<")
        .fromTo('.about-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 })
        .to('.anim-word', { opacity: 1, y: 0, stagger: { amount: 1.5, from: 'random' }, duration: 2, ease: 'power2.out' });

      // 4. ScrollTrigger 생성
      ScrollTrigger.create({
        id: 'about',
        animation: introTl,
        trigger: '.hero-section',
        start: 'top top',
        end: '+=2000',
        scrub: 1.5,
        pin: '.container',
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });
    },
  );

  // -----------------------------------------------------------
  // 3. [Skill 섹션]
  // -----------------------------------------------------------
  const title = document.querySelector('.skill-title');
  const chars = title.textContent.split('');

  title.innerHTML = chars.map((char) => `<span>${char === ' ' ? '&nbsp;' : char}</span>`).join('');

  gsap.to('.skill-title span', {
    scrollTrigger: {
      trigger: '.skill-section',
      start: 'top 80%',
      end: 'top 30%',
      scrub: 1,
    },
    opacity: 1,
    y: 100,
    stagger: 0.1,
    ease: 'power2.out',
  });

  const skillItems = document.querySelectorAll('.skill-list li');

  skillItems.forEach((li, index) => {
    const isOdd = (index + 1) % 2 !== 0;
    const elements = li.querySelectorAll('strong, p');

    gsap.set(elements, {
      x: isOdd ? -100 : 100,
      opacity: 0,
    });

    gsap.to(elements, {
      scrollTrigger: {
        trigger: li,
        start: 'top 95%',
        end: 'top 70%',
        scrub: 1,
      },
      x: 0,
      opacity: 1,
      stagger: 0.2,
      ease: 'power2.out',
    });
  });

  // -----------------------------------------------------------
  // 4. [Experience 섹션]
  // -----------------------------------------------------------
  const experiTitle = document.querySelector('.experience-title');
  if (experiTitle) {
    const experiChars = experiTitle.textContent.split('');
    experiTitle.innerHTML = experiChars.map((char) => `<span>${char === ' ' ? '&nbsp;' : char}</span>`).join('');

    gsap.to('.experience-title span', {
      scrollTrigger: {
        trigger: '.experience-section',
        start: 'top 80%',
        end: 'top 40%',
        scrub: 1,
      },
      opacity: 1,
      y: 100,
      stagger: 0.1,
      ease: 'none',
    });

    gsap.fromTo(
      '.experience-swiper',
      {
        y: 150,
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: '.experience-section',
          start: 'top 10%',
          end: 'top 10%',
          scrub: 1.5,
        },
        y: 0,
        opacity: 1,
        ease: 'power2.out',
      },
    );
  }
});

// 리사이즈
let rt;
window.addEventListener('resize', () => {
  clearTimeout(rt);
  rt = setTimeout(() => ScrollTrigger.refresh(), 200);
});
