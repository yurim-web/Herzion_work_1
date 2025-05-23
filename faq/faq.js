// $(function () {
//   var selectedIdx;
//   var runCateSlide;

//   $(".faq-category").append(
//     '<a class="faq-category__item hover-line" href="/board/faq/list.html?board_no=3">전체</a>'
//   );
//   if ($("#board_category").length > 0) {
//     $("#board_category")
//       .find("option")
//       .each(function () {
//         if ($(this).val()) {
//           var cateCode = $(this).val();
//           var cateTxt = $(this).text();
//           $(".faq-category").append(
//             '<a class="faq-category__item hover-line" href="/board/faq/list.html?board_no=3&category_no=' +
//               cateCode +
//               '">' +
//               cateTxt +
//               "</a>"
//           );
//           if ($(this).is(":selected")) {
//             selectedIdx = $(this).index();
//           }
//         } else {
//           if ($(this).index() == 0) {
//             selectedIdx = 0;
//           }
//         }
//       });
//     $(".faq-category__item").eq(selectedIdx).addClass("on");
//   }

//   $(".faq__q").on("click", function () {
//     if (!$(this).hasClass("on")) {
//       $(".faq__q").removeClass("on");
//       $(this).addClass("on");
//       $(".faq__a").slideUp();
//       $(this).next(".faq__a").slideDown();
//     } else {
//       $(".faq__q").removeClass("on");
//       $(".faq__a").slideUp();
//     }
//   });

//   function categorySlide() {
//     var winWidth = $(window).outerWidth();
//     var slideWrap = $(".jsCateSlide");
//     if (winWidth < 768 && runCateSlide == undefined) {
//       if (slideWrap.find(".faq-category__item").length > 4) {
//         slideWrap.addClass("swiper-container");
//         slideWrap.find(".faq-category").addClass("swiper-wrapper");
//         slideWrap.find(".faq-category__item").addClass("swiper-slide");
//         runCateSlide = new Swiper(".jsCateSlide", {
//           freeMode: true,
//           slidesPerView: "auto",
//         });
//       }
//     } else if (winWidth >= 768 && runCateSlide != undefined) {
//       runCateSlide.destroy();
//       runCateSlide = undefined;
//       slideWrap.removeClass("swiper-container");
//       slideWrap.find(".faq-category").removeClass("swiper-wrapper");
//       slideWrap.find(".faq-category__item").removeClass("swiper-slide");
//     }
//   }

//   categorySlide();
//   $(window).on("resize", categorySlide);
//   runCateSlide.slideTo(selectedIdx);
// });

// 토글 기능

document.addEventListener("DOMContentLoaded", function () {
  // FAQ 아이템 토글 기능 (한 번에 하나만 열리도록)
  const faqItems = document.querySelectorAll(".faq_item_box");
  const faqAnswers = document.querySelectorAll(".faq_answer_box");
  const toggleArrows = document.querySelectorAll(".toggle_arrow");
  const moreButton = document.querySelector(".faq_more_btn");
  const ITEMS_PER_PAGE = 6;
  let currentlyShown = ITEMS_PER_PAGE;

  // more 버튼 표시/숨김 처리 함수
  function updateMoreButtonVisibility() {
    const faqListContainer = document.querySelector(".faq_list_container");
    const visibleArticles = faqListContainer.querySelectorAll(
      ".faq_item_container:not([style*='display: none'])"
    );

    if (visibleArticles.length <= ITEMS_PER_PAGE) {
      moreButton.style.display = "none";
    } else {
      moreButton.style.display = "block";
    }
  }

  faqItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      // 모든 항목 닫기
      faqItems.forEach((el, i) => {
        if (i !== index) {
          el.classList.remove("faq_item_box_toggle");
          faqAnswers[i].classList.remove("active");
          toggleArrows[i].classList.remove("active");
        }
      });
      // 현재 항목 토글
      const isActive = item.classList.contains("faq_item_box_toggle");
      if (isActive) {
        item.classList.remove("faq_item_box_toggle");
        faqAnswers[index].classList.remove("active");
        toggleArrows[index].classList.remove("active");
      } else {
        item.classList.add("faq_item_box_toggle");
        faqAnswers[index].classList.add("active");
        toggleArrows[index].classList.add("active");
      }
    });
  });

  // 초기 상태: 처음 6개만 보이게 설정
  const faqArticles = document.querySelectorAll(".faq_item_container");
  faqArticles.forEach((article, index) => {
    if (index >= ITEMS_PER_PAGE) {
      article.style.display = "none";
    }
  });

  // 더보기 버튼이 클릭되었을 때
  moreButton.addEventListener("click", () => {
    // 다음 6개 아이템 보이기
    for (
      let i = currentlyShown;
      i < currentlyShown + ITEMS_PER_PAGE && i < faqArticles.length;
      i++
    ) {
      faqArticles[i].style.display = "block";
    }

    currentlyShown += ITEMS_PER_PAGE;
    updateMoreButtonVisibility();
  });

  // 카테고리 변경 이벤트 감지
  const categorySelect = document.querySelector(
    "select[name='board_category']"
  );
  if (categorySelect) {
    categorySelect.addEventListener("change", function () {
      // 카테고리 변경 시 초기화
      currentlyShown = ITEMS_PER_PAGE;
      setTimeout(updateMoreButtonVisibility, 500); // Ajax 로딩 시간 고려
    });
  }

  // 초기 more 버튼 상태 설정
  updateMoreButtonVisibility();
});
