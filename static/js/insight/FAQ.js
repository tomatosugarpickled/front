const listClicks = document.querySelectorAll(".guide-aside-single-line");
const badgeInner = document.getElementById("categories");
const navTitle = document.getElementById("guide-categories-text");
const categorySections = document.querySelectorAll(".guide-categories");

const contentDatasBadge = [
    "공지 사항 및 업데이트 안내",
    "계정 및 프로필",
    "소셜 및 네트워킹",
    "사용자 경험 보호 및 설정",
    "구독 및 광고 상품",
];

const contentDatasNavTitle = [
    "C&M 플랫폼 관련 공지 사항과 업데이트를 안내해 드립니다.",
    "C&M 계정과 프로필의 생성, 접근, 관리, 삭제 등 기본적인 이용 설정과 정책을 안내합니다.",
    "C&M에서 사용자 간 소통과 연결을 돕는 소셜 기능의 이용 방법과 설정을 안내합니다.",
    "원치 않는 상호작용을 제어하고, 프로필과 콘텐츠 공개 범위를 설정하는 방법을 안내합니다.",
    "C&M 내 개인 및 기업 구독과 광고 상품에 대한 정책을 안내합니다.",
];

console.log(categorySections);

DOMTokenList.prototype.filter = Array.prototype.filter;

// listClicks[0].style.backgroundColor = "#dfe5eb";
// listClicks[0].style.fontWeight = "900";

let tempSection = categorySections[0];
let tempList = listClicks[0];

listClicks[0].classList.add("focus-on");

console.log(tempList);

listClicks.forEach((list, i) => {
    list.addEventListener("click", (e) => {
        if (tempList) {
            tempList.classList.remove("focus-on");
            console.log(tempList.classList);
        }
        tempList = listClicks[i];
        listClicks[i].classList.add("focus-on");

        badgeInner.textContent = contentDatasBadge[i];
        navTitle.textContent = contentDatasNavTitle[i];

        if (tempSection) {
            tempSection.classList.remove("categories-on");
        }
        tempSection = categorySections[i];
        categorySections[i].classList.add("categories-on");
    });
});

// input 클릭시 색상 변경
const searchIcon = document.querySelector(".guide-header-search");
const searchInput = document.querySelector(".guide-header-search-input");

console.log(searchIcon);

searchInput.addEventListener("focus", (e) => {
    searchInput.style.transition = "background-color 0.3s ease";
    searchInput.style.backgroundColor = "white";
    searchInput.setAttribute("data-has-focus", "true");
    searchIcon.setAttribute("data-has-focus", "true");
});

searchInput.addEventListener("blur", () => {
    searchInput.style.backgroundColor = "";
    searchIcon.setAttribute("data-has-focus", "false");
});
