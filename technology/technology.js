// Scientific Basis Swiper 초기화
const researchSwiper = new Swiper(".researchSwiper", {
  slidesPerView: 4,
  spaceBetween: 40,
  centeredSlides: false,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    type: "progressbar",
  },
  breakpoints: {
    320: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
  },
});

// 모바일 Thesis 스와이퍼 초기화
const mobileThesisSwiper = new Swiper(".mobileThesisSwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
