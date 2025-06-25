// ✅ 스크롤 이벤트에 따른 헤더 스타일 변경
// const headerLangSelect = document.getElementById("header_lang_select");
// const header = document.querySelector("header");

// if (header && headerLangSelect) {
//   window.addEventListener("scroll", () => {
//     if (window.scrollY > 50) {
//       // 헤더 배경 변경
//       header.style.backgroundColor = "rgba(255, 255, 255, 0.5)";

//       // 언어 선택 자연스럽게 숨김
//       headerLangSelect.style.opacity = "0";
//       headerLangSelect.style.visibility = "hidden";
//     } else {
//       // 헤더 배경 초기화
//       header.style.backgroundColor = "";

//       // 언어 선택 다시 표시
//       headerLangSelect.style.opacity = "1";
//       headerLangSelect.style.visibility = "visible";
//     }
//   });
// }

const header = document.querySelector("header");

if (header) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("header--scrolled"); // 숨김 상태 클래스 추가
      header.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
    } else {
      header.classList.remove("header--scrolled"); // 복구
      header.style.backgroundColor = "";
    }
  });
}

// Top 버튼 기능
const topBtn = document.getElementById("top_btn");
if (topBtn) {
  // 스크롤 이벤트에 따른 Top 버튼 표시 여부 조정
  window.addEventListener("scroll", () => {
    if (window.scrollY > 130) {
      topBtn.classList.add("visible");
    } else {
      topBtn.classList.remove("visible");
    }
  });

  // Top 버튼 클릭 이벤트
  topBtn.addEventListener("click", () => {
    console.log("top 버튼 클릭됨");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// 메뉴 토글 기능
const menuBtn = document.getElementById("menu_btn_mobile");
const menuCloseBtn = document.getElementById("menu_btn_mobile_close");
const mobileMenu = document.getElementById("mobile_menu");
const menuBackground = document.querySelector(".mobile_menu_background");

// menuBtn.addEventListener("click", () => {
//   console.log("메뉴 토글 클릭됨");
//   mobileMenu.classList.add("active");
//   menuBackground.classList.add("active");
//   menuBtn.style.display = "none";
//   menuCloseBtn.style.display = "block";
//   document.body.style.overflow = "hidden"; // 스크롤 방지
// });

// menuCloseBtn.addEventListener("click", () => {
//   console.log("메뉴 닫기 클릭됨");
//   mobileMenu.classList.remove("active");
//   menuBackground.classList.remove("active");
//   menuBtn.style.display = "block";
//   menuCloseBtn.style.display = "none";
//   document.body.style.overflow = ""; // 스크롤 복구
// });

// 언어 선택 기능
document.addEventListener("DOMContentLoaded", function () {
  const customDropdown = document.querySelector(".custom-lang-dropdown");
  const selectedLang = document.querySelector(".selected-lang");
  const selectArrow = document.querySelector(".select-arrow");
  const langOptions = document.querySelector(".lang-options");
  const langItems = langOptions.querySelectorAll("li");

  // 드롭다운 열기/닫기
  selectedLang.addEventListener("click", function (e) {
    // 드롭다운이 열려있지 않을 때만 열기
    if (!customDropdown.classList.contains("open")) {
      customDropdown.classList.add("open");
      selectArrow.classList.add("rotated");

      // 드롭다운에서 활성화된 언어 제거
      const activeLang = langOptions.querySelector(".active");
      if (activeLang) {
        langItems.forEach((item) => {
          if (item === activeLang) {
            item.style.display = "none"; // 활성화된 언어는 숨김
          } else {
            item.style.display = ""; // 나머지 언어는 보이게
          }
        });
      }
    } else {
      customDropdown.classList.remove("open");
      selectArrow.classList.remove("rotated");
      // 모든 언어 옵션 다시 보이게
      langItems.forEach((item) => {
        item.style.display = "";
      });
    }
  });

  // 언어 옵션 클릭 시
  langItems.forEach((item) => {
    const link = item.querySelector("a");
    if (link) {
      link.addEventListener("click", function (e) {
        // 페이지 이동은 기본 동작으로 두고,
        // 드롭다운만 닫기
        customDropdown.classList.remove("open");
        selectArrow.classList.remove("rotated");
        // active 클래스 관리(선택적으로)
        langItems.forEach((i) => i.classList.remove("active"));
        item.classList.add("active");
      });
    }
  });

  // 드롭다운 외부 클릭 시 닫기
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".custom-lang-dropdown")) {
      customDropdown.classList.remove("open");
      selectArrow.classList.remove("rotated");
    }
  });
});

// 모바엘메뉴버튼 관련 코드 js

// document.addEventListener("DOMContentLoaded", function () {
//   const openBtn = document.getElementById("menu_btn_mobile");
//   const closeBtn = document.getElementById("menu_btn_mobile_close");
//   const mobileMenu = document.getElementById("mobile_menu");

//   if (openBtn && closeBtn && mobileMenu) {
//     openBtn.addEventListener("click", () => {
//       openBtn.classList.add("hide"); // Menu 숨김 (애니메이션)
//       closeBtn.classList.add("show"); // X 보임 (애니메이션)
//       mobileMenu.classList.add("show"); // 메뉴 열기
//     });

//     closeBtn.addEventListener("click", () => {
//       openBtn.classList.remove("hide"); // Menu 다시 보임
//       closeBtn.classList.remove("show"); // X 숨김
//       mobileMenu.classList.remove("show"); // 메뉴 닫기
//     });
//   }
// });
