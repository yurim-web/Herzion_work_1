document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  const txtBoxes = document.querySelectorAll(".txt_box");

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".banner_section",
      start: isMobile ? "top" : "top",
      end: isMobile ? "150%" : "150%",
      scrub: isMobile ? 1 : 1,
      toggleActions: "play none none reverse",
    },
  });

  txtBoxes.forEach((box, index) => {
    const fillText = box.querySelector(".text-fill");

    tl.to(
      fillText,
      {
        backgroundSize: "100% 100%",
        duration: isMobile ? 0.3 : 1.7,
        ease: "none",
      },
      isMobile ? index * 0.4 : index
    );
  });

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

  // 모바일 카드 스크롤 애니메이션
  const motimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".clinical_results_mobile",
      start: "top top",
      end: "+=300%",
      pin: true,
      pinSpacing: true,
      scrub: 1,
    },
  });

  // 첫 번째 카드는 고정
  gsap.set(".section_box_mo:first-child", {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
  });

  // 두 번째 카드 애니메이션
  motimeline
    .fromTo(
      ".mo_back_2",
      {
        y: "100vh",
        zIndex: 2,
      },
      {
        y: "0",
        duration: 1,
        ease: "power2.inOut",
      }
    )

    // 세 번째 카드 애니메이션
    .fromTo(
      ".mo_back_3",
      {
        y: "100vh",
        zIndex: 3,
      },
      {
        y: "0",
        duration: 1,
        ease: "power2.inOut",
      }
    );
});

// 스와이퍼
// Scientific Basis Swiper 초기화
// const researchSwiper = new Swiper(".researchSwiper", {
//   spaceBetween: 60,
//   centeredSlides: false,
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//     type: "progressbar",
//   },
//   breakpoints: {
//     320: {
//       slidesPerView: 1,
//       spaceBetween: 40,
//     },
//     768: {
//       slidesPerView: 2,
//       spaceBetween: 40,
//     },
//     1024: {
//       slidesPerView: 3,
//       spaceBetween: 40,
//     },
//   },
// });

// 모바일 Thesis 스와이퍼 초기화
const mobileThesisSwiper = new Swiper(".mobileThesisSwiper", {
  slidesPerView: 1.2,
  spaceBetween: 40,
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
