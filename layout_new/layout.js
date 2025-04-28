// 스크롤 이벤트에 따른 헤더 스타일 변경
const header = document.querySelector("header");
if (header) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
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

menuBtn.addEventListener("click", () => {
  console.log("메뉴 토글 클릭됨");
  mobileMenu.classList.add("active");
  menuBackground.classList.add("active");
  menuBtn.style.display = "none";
  menuCloseBtn.style.display = "block";
  document.body.style.overflow = "hidden"; // 스크롤 방지
});

menuCloseBtn.addEventListener("click", () => {
  console.log("메뉴 닫기 클릭됨");
  mobileMenu.classList.remove("active");
  menuBackground.classList.remove("active");
  menuBtn.style.display = "block";
  menuCloseBtn.style.display = "none";
  document.body.style.overflow = ""; // 스크롤 복구
});
