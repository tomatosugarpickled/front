const totalPrice = document.querySelector(".funding-total-price");
const servicePrice = document.querySelector(".funding-price");
const plusPrice = document.getElementById("funding-plus-price").value;

console.log(totalPrice.innerHTML);
console.log(servicePrice.innerHTML);
console.log(plusPrice);

// ai가 짠 코드
// DOM 요소 선택
const totalPriceElement = document.querySelector(".funding-total-price");
const servicePriceElement = document.querySelector(".funding-price");
const plusPriceInput = document.getElementById("funding-plus-price");

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

// 총 가격 계산 및 업데이트
function updateTotalPrice() {
    // 서비스 가격 추출
    const servicePrice = extractNumber(servicePriceElement.innerHTML);

    // 입력된 추가 가격 추출
    const plusPrice = extractNumber(plusPriceInput.value);

    // 합계 계산
    const total = servicePrice + plusPrice;

    // 결과 표시 (원하는 포맷으로)
    totalPriceElement.innerHTML = formatPrice(total) + "원";

    // 디버깅용 로그
    console.log({
        servicePrice: servicePrice,
        plusPrice: plusPrice,
        total: total,
    });
}

// 이벤트 리스너 등록
plusPriceInput.addEventListener("input", updateTotalPrice);
plusPriceInput.addEventListener("change", updateTotalPrice);

// 페이지 로드 시 초기 계산
document.addEventListener("DOMContentLoaded", updateTotalPrice);
