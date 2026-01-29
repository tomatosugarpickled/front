// 공지사항 이미지 클릭시 modal 오른쪽에서 나오는 js
const openBtn = document.querySelectorAll(".event-image");
const clickBoxes = document.querySelectorAll(".find-box-body");
const modal = document.getElementById("modal");
const overlay = document.getElementById("modalOverlay");
const closeBtn = document.querySelector(".modal-icon");

openBtn.forEach((openBtn) =>
    openBtn.addEventListener("click", (e) => {
        modal.classList.add("open");
        overlay.classList.add("open");
        document.body.style.overflow = "hidden";
    }),
);

clickBoxes.forEach((clickBox) =>
    clickBox.addEventListener("click", (e) => {
        modal.classList.add("open");
        overlay.classList.add("open");
        document.body.style.overflow = "hidden";
    }),
);

closeBtn.addEventListener("click", (e) => {
    modal.classList.remove("open");
    overlay.classList.remove("open");
    document.body.style.overflow = "";
});

// 검색창 클릭하면 아이콘버튼이 나오고 버튼을 누르면 인풋의 내용을 제거하는 js
const inputClick = document.querySelector(".search-bar-input");
const inputButton = document.querySelector(".input-button");

inputClick.addEventListener("click", (e) => {
    inputButton.classList.remove("input-button-js");
});

inputButton.addEventListener("click", (e) => {
    inputClick.value = "";
    inputButton.classList.add("input-button-js");
});

// 모든 유형을 클릭하면 밑에 div박스 나오게 하는 js
const selects = document.querySelectorAll(".selectEvent");
const selectBoxes = document.querySelectorAll(".shadow-menu");

selects.forEach((select, i) => {
    select.addEventListener("click", (e) => {
        // 강사님 코드
        selectBoxes.forEach((previousSelectbox) => {
            previousSelectbox.style.opacity = 0;
        });
        selectBoxes[i].style.opacity = 1;
    });
});

// 필터 div박스 이동이나 스크롤 시 사라지게
const removeBoxes = document.querySelectorAll(".shadow-menu");
const removeMenu = document.querySelector(".div-container");

removeMenu.addEventListener("scroll", (e) => {
    removeBoxes.forEach((removeBox, i) => {
        removeBoxes[i].style.opacity = 0;
    });
});

// 필터div박스 안에서 체크 클릭 이벤트

const checks = document.querySelectorAll(".menu-scroll");
const checkicons = document.querySelectorAll(".checkclickoff");

checks.forEach((check, i) => {
    check.addEventListener("click", (e) => {
        checkicons[i].classList.toggle("checkclickoff");
    });
});
