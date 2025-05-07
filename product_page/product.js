document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  const txtBoxes = document.querySelectorAll(".txt_box");
  let animationTimeline = null;

  // 모바일 여부 판별 함수
  function isMobileDevice() {
    return window.innerWidth <= 768;
  }

  // 기존 애니메이션 제거
  function killAnimation() {
    if (animationTimeline) {
      animationTimeline.kill();
      animationTimeline = null;
    }
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }

  // 애니메이션 초기화 함수
  function initAnimation() {
    if (isMobileDevice()) {
      killAnimation();
      return;
    }

    killAnimation(); // 혹시 있을 기존 타임라인 제거

    animationTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".banner_section",
        start: "top",
        end: "150%",
        scrub: 1,
        toggleActions: "play none none reverse",
      },
    });

    txtBoxes.forEach((box, index) => {
      const fillText = box.querySelector(".text-fill");
      animationTimeline.to(
        fillText,
        {
          backgroundSize: "100% 100%",
          duration: 1.7,
          ease: "none",
        },
        index
      );
    });
  }

  // 리사이즈 디바운싱 처리
  let resizeTimeout;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      initAnimation();
    }, 300);
  });

  // 첫 실행
  initAnimation();

  // 카드 스크롤 애니메이션
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".clinical_results",
      start: "top top",
      end: "+=200%",
      pin: true,
      pinSpacing: true,
      scrub: 0.3,
    },
  });

  // 첫 번째 카드는 고정
  gsap.set(".section_box:first-child", {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
  });

  // 두 번째 카드 애니메이션
  timeline
    .fromTo(
      ".section_box:nth-child(2)",
      { y: 0, zIndex: 2 },
      { y: -772, duration: 0.3, ease: "power1.inOut" }
    )

    // 세 번째 카드 애니메이션
    .fromTo(
      ".section_box:last-child",
      { y: 0, zIndex: 3 },
      { y: -772, duration: 0.3, ease: "power1.inOut" }
    );

  // // 모바일 카드 스크롤 애니메이션
  // const motimeline = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: ".clinical_results_mobile",
  //     start: "top top",
  //     end: "+=300%",
  //     pin: true,
  //     pinSpacing: true,
  //     scrub: true,
  //   },
  // });

  // // 첫 번째 카드는 고정
  // gsap.set(".section_box_mo:first-child", {
  //   position: "absolute",
  //   top: 0,
  //   left: 0,
  //   zIndex: 1,
  // });
  // motimeline
  //   // 두 번째 카드 올라옴 (0% ~ 50%)
  //   .fromTo(
  //     ".mo_back_2",
  //     { y: "1340px", zIndex: 2 },
  //     {
  //       y: "0vh",
  //       ease: "power2.inOut",
  //     },
  //     0 // 타임라인 시작점
  //   )
  //   // 세 번째 카드 올라옴 (50% ~ 100%)
  //   .fromTo(
  //     ".mo_back_3",
  //     { y: "100vh", zIndex: 3 },
  //     {
  //       y: "0vh",
  //       ease: "power2.inOut",
  //     },
  //     0.5 // 타임라인 중간부터
  //   );
});

// 모바일 Thesis 스와이퍼 초기화
const mobileThesisSwiper = new Swiper(".mobileThesisSwiper", {
  slidesPerView: 1,
  spaceBetween: 40,
  loop: true,
  direction: "horizontal",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1.2,
      spaceBetween: 40,
    },
    768: {
      slidesPerView: 1.2,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 1.2,
      spaceBetween: 40,
    },
  },
});

// 앱 다운로드 모바일 스와이퍼 초기화
const appDownloadSwiper = new Swiper(".appDownloadSwiper", {
  slidesPerView: 1.2,
  spaceBetween: 35,
  centeredSlides: true,
  loop: true,
  pagination: {
    el: ".appDownloadSwiper .swiper-pagination",
    clickable: true,
  },
  effect: "coverflow",
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: false,
  },
});
