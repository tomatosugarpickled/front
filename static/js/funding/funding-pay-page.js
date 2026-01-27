// 닫기 눌르면 닫힘
const closeBtn = document.querySelector(
    ".funding-pay-header-area-close-button",
);
const background = document.querySelector(".funding-pay-container");

closeBtn.addEventListener("click", (e) => {
    background.style.opacity = "0";
});

// ai가 짠 코드
// DOM 요소 선택
const totalPriceElement = document.querySelector(".funding-total-price");
const servicePriceElement = document.querySelector(".funding-price");
const plusPriceInput = document.getElementById("funding-plus-price");

// // 숫자 추출 함수
// function extractNumber(str) {
//     // 문자열에서 숫자만 추출
//     const numbers = str.replace(/[^0-9]/g, "");
//     return parseInt(numbers) || 0;
// }

// // 가격 포맷 함수 (천 단위 콤마)
// function formatPrice(number) {
//     return number.toLocaleString("ko-KR");
// }

// // 총 가격 계산 및 업데이트
// function updateTotalPrice() {
//     // 서비스 가격 추출
//     const servicePrice = extractNumber(servicePriceElement.innerHTML);

//     // 입력된 추가 가격 추출
//     const plusPrice = extractNumber(plusPriceInput.value);

//     // 합계 계산
//     const total = servicePrice + plusPrice;

//     // 카운팅 증가

//     // 결과 표시 (원하는 포맷으로)
//     totalPriceElement.innerHTML = "₩" + formatPrice(total);

//     // 디버깅용 로그
//     console.log({
//         servicePrice: servicePrice,
//         plusPrice: plusPrice,
//         total: total,
//     });
// }

// // 이벤트 리스너 등록
// plusPriceInput.addEventListener("input", updateTotalPrice);
// plusPriceInput.addEventListener("change", updateTotalPrice);

// // 페이지 로드 시 초기 계산
// document.addEventListener("DOMContentLoaded", updateTotalPrice);

// 숫자 추출 함수
function extractNumber(str) {
    // 문자열에서 숫자만 추출
    const numbers = str.replace(/[^0-9]/g, "");
    return parseInt(numbers) || 0;
}

// 가격 포맷 함수 (천 단위 콤마)
function formatPrice(number) {
    return number.toLocaleString("ko-KR");
}

// 숫자 롤링 애니메이션 함수
function animateNumber(element, start, end, duration = 3000) {
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing 함수 (부드러운 감속 효과)
        const easeOutQuad = progress * (2 - progress);

        const current = start + (end - start) * easeOutQuad;

        element.innerHTML = "₩" + formatPrice(Math.floor(current));

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.innerHTML = "₩" + formatPrice(end);
        }
    }

    requestAnimationFrame(update);
}

// 총 가격 계산 및 업데이트
function updateTotalPrice() {
    // 서비스 가격 추출
    const servicePrice = extractNumber(servicePriceElement.innerHTML);

    // 입력된 추가 가격 추출
    const plusPrice = extractNumber(plusPriceInput.value);

    // 합계 계산
    const total = servicePrice + plusPrice;

    // 현재 표시된 가격 추출 (애니메이션 시작점)
    const currentTotal = extractNumber(totalPriceElement.innerHTML) || 0;

    // 숫자 롤링 애니메이션 실행
    animateNumber(totalPriceElement, currentTotal, total, 500);

    // 디버깅용 로그
    console.log({
        servicePrice: servicePrice,
        plusPrice: plusPrice,
        currentTotal: currentTotal,
        newTotal: total,
    });
}

// 이벤트 리스너 등록
plusPriceInput.addEventListener("input", updateTotalPrice);
plusPriceInput.addEventListener("change", updateTotalPrice);

// 페이지 로드 시 초기 계산
document.addEventListener("DOMContentLoaded", updateTotalPrice);

// 아이콘 클릭시 인풋에 value 날리기
const resetBtn = document.querySelector(".funding-pay-body-price-reset-button");

resetBtn.addEventListener("click", (e) => {
    location.reload(true);
});

// 주소 검색
function sample4_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function (data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var roadAddr = data.roadAddress; // 도로명 주소 변수
            var extraRoadAddr = ""; // 참고 항목 변수

            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
                extraRoadAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== "" && data.apartment === "Y") {
                extraRoadAddr +=
                    extraRoadAddr !== ""
                        ? ", " + data.buildingName
                        : data.buildingName;
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if (extraRoadAddr !== "") {
                extraRoadAddr = " (" + extraRoadAddr + ")";
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById("sample4_postcode").value = data.zonecode;
            document.getElementById("sample4_roadAddress").value = roadAddr;
            document.getElementById("sample4_jibunAddress").value =
                data.jibunAddress;

            // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
            // if (roadAddr !== "") {
            //     document.getElementById("sample4_extraAddress").value =
            //         extraRoadAddr;
            // } else {
            //     document.getElementById("sample4_extraAddress").value = "";
            // }

            var guideTextBox = document.getElementById("guide");
            // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
            if (data.autoRoadAddress) {
                var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
                guideTextBox.innerHTML =
                    "(예상 도로명 주소 : " + expRoadAddr + ")";
                guideTextBox.style.display = "block";
            } else if (data.autoJibunAddress) {
                var expJibunAddr = data.autoJibunAddress;
                guideTextBox.innerHTML =
                    "(예상 지번 주소 : " + expJibunAddr + ")";
                guideTextBox.style.display = "block";
            } else {
                guideTextBox.innerHTML = "";
                guideTextBox.style.display = "none";
            }
        },
    }).open({
        popupKey: "popup1", //팝업창 Key값 설정 (영문+숫자 추천)
        autoClose: true,
    });
}
