document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  // 텍스트 박스 애니메이션
  const txtBoxes = document.querySelectorAll(".txt_box");
  const tl = gsap.timeline({
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

    tl.to(
      fillText,
      {
        backgroundSize: "100% 100%",
        duration: 0.8,
        ease: "none",
      },
      index
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
      end: "+=200%",
      pin: true,
      pinSpacing: true,
      scrub: 0.3,
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
      { y: "1167", zIndex: 2 },
      { y: "0", duration: 0.3, ease: "power1.inOut" }
    )

    // 세 번째 카드 애니메이션
    .fromTo(
      ".mo_back_3",
      { y: "1340", zIndex: 3 },
      { y: "0", duration: 0.3, ease: "power1.inOut" }
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
  slidesPerView: "auto",
  spaceBetween: 90,
  loop: true,
  direction: "horizontal",
  centeredSlides: false,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  loop: false,
  breakpoints: {
    320: {
      spaceBetween: 40,
    },
    768: {
      spaceBetween: 60,
    },
    1024: {
      spaceBetween: 40,
    },
  },
});

// 앱 다운로드 모바일 스와이퍼 초기화
const appDownloadSwiper = new Swiper(".appDownloadSwiper", {
  slidesPerView: 1.1,
  spaceBetween: 18,
  centeredSlides: true,
  pagination: {
    el: ".appDownloadSwiper .swiper-pagination",
    clickable: true,
  },
});
