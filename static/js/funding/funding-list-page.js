const openBtn = document.querySelectorAll(".funding-image-wrap");
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

// 모달 배너 클릭시 이미지 이동

const banner = document.querySelector(".modal-banner-image-wrap");
const slideImg = document.querySelectorAll(".modal-banner-image");
const count = slideImg.length;
let currentIdx = 0;

const BtnL = document.getElementById("left-btn");
const BtnR = document.getElementById("right-btn");

const slideWidth = 576;
const slideGap = 10;

banner.style.width = (slideWidth + slideGap) * count + "px";
BtnL.style.display = "none";

function moveSlide(num) {
    banner.style.transform = `translate(-${num * 586}px)`;
    banner.style.transition = `transform 0.5s`;
    currentIdx = num;
}

console.log(banner);

BtnL.addEventListener("click", (e) => {
    //
    if (currentIdx !== 0) {
        moveSlide(currentIdx - 1);
    }
    if (currentIdx === 0) {
        BtnL.style.display = "none";
    }
    if (currentIdx < 4) {
        BtnR.style.display = "";
    }
});

BtnR.addEventListener("click", (e) => {
    if (currentIdx !== count - 1) {
        moveSlide(currentIdx + 1);
    }
    if (currentIdx === 4) {
        BtnR.style.display = "none";
    }
    if (currentIdx >= 1) {
        BtnL.style.display = "";
    }
});
