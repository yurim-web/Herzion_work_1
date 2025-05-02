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
  // FAQ 아이템 토글 기능
  const faqItems = document.querySelectorAll(".faq_item_box");
  const faqAnswers = document.querySelectorAll(".faq_answer_box");
  const toggleArrows = document.querySelectorAll(".toggle_arrow");

  faqItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      item.classList.toggle("faq_item_box_toggle");
      faqAnswers[index].classList.toggle("active");
      toggleArrows[index].classList.toggle("active");
    });
  });

  // 더보기 기능 구현
  const faqListContainer = document.querySelector(".faq_list_container");
  const faqArticles = faqListContainer.querySelectorAll(".faq_item_container");
  const moreButton = document.querySelector(".faq_more_btn");
  const ITEMS_PER_PAGE = 6;
  let currentlyShown = ITEMS_PER_PAGE;

  // 초기 상태: 처음 6개만 보이게 설정
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
  });
});
