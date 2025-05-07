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

// 첫 번째 다음 버튼 클릭 이벤트 핸들러
function handleFirstSubmit() {
  console.log("첫 번째 다음 버튼 클릭됨");
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
  preventInteractionOnTransition: true, // 전환 중 상호작용 방지
  speed: 0, // 전환 속도 0으로 설정
  initialSlide: 0, // 초기 슬라이드 설정
  loop: false, // 루프 비활성화
  on: {
    init: function () {
      console.log("Swiper 초기화됨");
    },
    slideChange: function () {
      console.log("현재 슬라이드:", this.activeIndex);
    },
  },
});

// 필수 입력 필드와 제출 버튼
const requiredInputs = document.querySelectorAll(".information_input");
const submitRequiredInputs = document.querySelectorAll(
  ".information_input:not(.last_btn_box .information_input)"
);

// 입력 필드 변경 이벤트 리스너
requiredInputs.forEach((input) => {
  input.addEventListener("input", checkFormValidity);
});

// 폼 유효성 검사 함수
function checkFormValidity() {
  const allFilled = Array.from(submitRequiredInputs).every(
    (input) => input.value.trim() !== ""
  );
  const allInputsFilled = Array.from(requiredInputs).every(
    (input) => input.value.trim() !== ""
  );

  if (allFilled) {
    console.log("제출가능");
    secondsubmitBtn.disabled = false;
    secondsubmitBtn.style.color = "#3C3C3C";
  } else {
    console.log("제출불가능");
    secondsubmitBtn.disabled = true;
    secondsubmitBtn.style.color = "#999";
  }

  // 모든 입력 필드가 채워졌을 때만 배경색 변경
  if (allInputsFilled) {
    requiredInputs.forEach((input) => {
      input.style.backgroundColor = "rgba(0, 0, 0, 0.04)";
    });
  } else {
    requiredInputs.forEach((input) => {
      input.style.backgroundColor = "";
    });
  }
}

// 제출 버튼 클릭 이벤트
secondsubmitBtn.addEventListener("click", () => {
  console.log("두 번째 제출 버튼 클릭됨");

  // 버튼이 비활성화되지 않았을 때만 다음 슬라이드로 이동
  if (!secondsubmitBtn.disabled) {
    console.log("다음 슬라이드로 이동");
    swiper.slideNext();
  } else {
    console.log("모든 필수 입력 필드를 채워주세요");
  }
});

//이전버튼
const secondbackBtn = document.getElementById("second_back_btn");
// 제출 버튼 클릭 이벤트
secondbackBtn.addEventListener("click", () => {
  console.log("이전 버튼 클릭됨");
  if (!secondbackBtn.disabled) {
    swiper.slidePrev();
  }
});

// 돌아가기 버튼 클릭 이벤트
const backBtn = document.getElementById("back_btn");
backBtn.addEventListener("click", () => {
  swiper.slideTo(0);
});

// 모바일 버전!!!!!!!!!!!!!!!!!!!!!!

// 모바일 버전 입력 필드와 다음 버튼
const mobileInputs = document.querySelectorAll(
  ".input_mobile, .input_mobile_long"
);
const mobileSubmitInputs = document.querySelectorAll(".input_mobile");
const nextBtnMobile = document.getElementById("next_btn_mobile");

// 다음 버튼 초기 상태 설정
nextBtnMobile.disabled = true;

// 입력 필드 변경 이벤트 리스너
mobileInputs.forEach((input) => {
  input.addEventListener("input", checkMobileFormValidity);
});

// 모바일 폼 유효성 검사 함수
function checkMobileFormValidity() {
  // 위의 4개 input이 모두 채워졌는지 확인
  const allFilled = Array.from(mobileSubmitInputs).every(
    (input) => input.value.trim() !== ""
  );

  // 모든 input이 채워졌을 때만 배경색 변경
  if (allFilled) {
    console.log("모두 채워짐");
    nextBtnMobile.disabled = false;
    nextBtnMobile.style.backgroundColor = "#000000";
    nextBtnMobile.style.color = "#ffffff";
  } else {
    console.log("안채워짐");
    nextBtnMobile.disabled = true;
    nextBtnMobile.style.backgroundColor = "#ECECEC";
    nextBtnMobile.style.color = "#999999";
  }

  // 수정 코드: 각 input이 비어있지 않으면 배경색 변경
  mobileInputs.forEach((input) => {
    if (input.value.trim() !== "") {
      input.style.backgroundColor = "rgba(0, 0, 0, 0.04)";
    } else {
      input.style.backgroundColor = "";
    }
  });
}

// 모바일 다음 버튼 클릭 이벤트
nextBtnMobile.addEventListener("click", () => {
  if (!nextBtnMobile.disabled) {
    swiper.slideNext();
  }
});

//모바일 버전 따로 돌아가는 버튼
const backBtnMobile = document.getElementById("back_btn_mobile");
if (backBtnMobile) {
  backBtnMobile.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("돌아가기 버튼 클릭됨");
    // 첫 페이지로 이동
    window.location.href = "contact.html";
  });
}

// 모바일 버전 다음 버튼 클릭 이벤트
mobileNextBtn.addEventListener("click", () => {
  inquirySections[1].scrollIntoView({ behavior: "smooth" });
});
