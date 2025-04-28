// 버튼 클릭 효과
const inquiryBtn1 = document.getElementById("inquiry_btn_1");
const inquiryBtn2 = document.getElementById("inquiry_btn_2");
const inquiryBtn3 = document.getElementById("inquiry_btn_3");
const inquiryBtn4 = document.getElementById("inquiry_btn_4");
const inquirySections = document.querySelectorAll(".inquiry_section");
const mobileNextBtn = document.getElementById("inquiry_btn_mobile");
const firstsubmitBtn = document.getElementById("first_submit_btn");
const secondsubmitBtn = document.getElementById("second_submit_btn");
const firstmobileBtn = document.getElementById("inquiry_btn_mobile");

// 제출 버튼 초기 상태 설정
firstsubmitBtn.disabled = true;
firstsubmitBtn.style.color = "#999";

// 버튼 클릭 이벤트 핸들러
function handleButtonClick() {
  // 클릭한 버튼의 active 클래스 토글
  this.classList.toggle("active");

  // 활성화된 버튼 수 확인
  const activeButtons = [
    inquiryBtn1,
    inquiryBtn2,
    inquiryBtn3,
    inquiryBtn4,
  ].filter((btn) => btn.classList.contains("active")).length;

  // 최소 1개 이상의 버튼이 활성화되었을 때 제출 버튼 활성화
  if (activeButtons >= 1) {
    firstsubmitBtn.disabled = false;
    firstsubmitBtn.style.color = "#3C3C3C";
    firstmobileBtn.disabled = false;
    firstmobileBtn.style.color = "#ffff";
    firstmobileBtn.style.backgroundColor = "#000000";
  } else {
    firstsubmitBtn.disabled = true;
    firstsubmitBtn.style.color = "#999";
    firstmobileBtn.disabled = true;
    firstmobileBtn.style.color = "#999";
    firstmobileBtn.style.backgroundColor = "#ECECEC";
  }
}

// 첫 번째 제출 버튼 클릭 이벤트 핸들러
function handleFirstSubmit() {
  if (!firstsubmitBtn.disabled) {
    swiper.slideNext();
  }
}

// 첫 번째 제출 버튼 클릭 이벤트 리스너 추가
firstsubmitBtn.addEventListener("click", handleFirstSubmit);

// 데스크톱 버전 버튼 클릭 이벤트
[inquiryBtn1, inquiryBtn2, inquiryBtn3, inquiryBtn4].forEach((btn) => {
  btn.addEventListener("click", handleButtonClick);
});

// Swiper 초기화
const swiper = new Swiper(".inquiry_swiper", {
  allowTouchMove: false, // 사용자 터치로 슬라이드 이동 불가능
});

// 필수 입력 필드와 제출 버튼
const requiredInputs = document.querySelectorAll(
  ".information_input:not(.last_btn_box .information_input)"
);

// 입력 필드 변경 이벤트 리스너
requiredInputs.forEach((input) => {
  input.addEventListener("input", checkFormValidity);
});

// 폼 유효성 검사 함수
function checkFormValidity() {
  const allFilled = Array.from(requiredInputs).every(
    (input) => input.value.trim() !== ""
  );

  if (allFilled) {
    secondsubmitBtn.disabled = false;
    secondsubmitBtn.style.color = "#3C3C3C";
  } else {
    secondsubmitBtn.disabled = true;
    secondsubmitBtn.style.color = "#999";
  }
}

// 제출 버튼 클릭 이벤트
secondsubmitBtn.addEventListener("click", () => {
  if (!secondsubmitBtn.disabled) {
    swiper.slideNext();
  }
});

// 돌아가기 버튼 클릭 이벤트
const backBtn = document.getElementById("back_btn");
backBtn.addEventListener("click", () => {
  swiper.slideTo(0);
});

// 모바일 버전!!!!!!!!!!!!!!!!!!!!!!

// 모바일 버전 입력 필드와 다음 버튼
const mobileInputs = document.querySelectorAll(".input_mobile");
const nextBtnMobile = document.getElementById("next_btn_mobile");

// 다음 버튼 초기 상태 설정
nextBtnMobile.disabled = true;

// 입력 필드 변경 이벤트 리스너
mobileInputs.forEach((input) => {
  input.addEventListener("input", checkMobileFormValidity);
});

// 모바일 폼 유효성 검사 함수
function checkMobileFormValidity() {
  const allFilled = Array.from(mobileInputs).every(
    (input) => input.value.trim() !== ""
  );

  if (allFilled) {
    nextBtnMobile.disabled = false;
    nextBtnMobile.style.backgroundColor = "#000000";
    nextBtnMobile.style.color = "#ffffff";
  } else {
    nextBtnMobile.disabled = true;
    nextBtnMobile.style.backgroundColor = "#ECECEC";
  }
}

// 모바일 다음 버튼 클릭 이벤트
nextBtnMobile.addEventListener("click", () => {
  if (!nextBtnMobile.disabled) {
    swiper.slideNext();
  }
});

//모바일 버전 따로 돌아가는 버튼
const backBtnMobile = document.getElementById("back_btn_mobile");
backBtnMobile.addEventListener("click", () => {
  swiper.slideTo(0);
});

// 모바일 버전 다음 버튼 클릭 이벤트
mobileNextBtn.addEventListener("click", () => {
  inquirySections[1].scrollIntoView({ behavior: "smooth" });
});
