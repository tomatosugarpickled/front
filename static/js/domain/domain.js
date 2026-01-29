// 쿼리는 폴이치 바로 가능 겟엘레멘탈은 선언해줘야함
// 카테고리 파츠들 클릭하면 검은색으로 나머진 하얀색으로
const iconLinks = document.querySelectorAll("a[href=parts]");
let tempContainer = iconLinks[0].firstElementChild.firstElementChild;
let tempSvg = tempContainer.firstElementChild;

iconLinks.forEach((iconLink) => {
    iconLink.addEventListener("click", (e) => {
        e.preventDefault();
        tempContainer.style.backgroundColor = "rgba(140, 159, 186, 0.0800)";
        tempSvg.style.fill = "rgba(18, 19, 20, 0.4000)";

        const container = iconLink.firstElementChild.firstElementChild;
        const svg = container.firstElementChild;

        tempContainer = container;
        tempSvg = svg;

        container.style.backgroundColor = "black";
        svg.style.fill = "white";
    });
});

// 카테고리 파츠들 클릭하면 크기가 작아졌다 커짐
// const categoryParts = document.querySelectorAll(
//     ".first-wrap, .second-wrap, .third-wrap, .fourth-wrap, .fifth-wrap, .sixth-wrap"
// );

// categoryParts.forEach((wrap) => {
//     wrap.addEventListener("click", (e) => {
//         wrap.style.transform = "scale(0.3)";

//         wrap.style.transition = "transform 0.3s ease";

//         setTimeout(() => {
//             wrap.style.transform = "scale(1)";
//         });
//     });
// });

const categoryParts = document.querySelectorAll(
    ".first-wrap, .second-wrap, .third-wrap, .fourth-wrap, .fifth-wrap, .sixth-wrap",
);

categoryParts.forEach((wrap) => {
    // 꾹 누를 때 작아짐
    wrap.addEventListener("mousedown", () => {
        wrap.style.transition = "transform 0.2s ease";
        wrap.style.transform = "scale(0.9)";
    });

    // 손을 뗄 때 커짐
    wrap.addEventListener("mouseup", () => {
        wrap.style.transition = "transform 0.3s ease";
        wrap.style.transform = "scale(1)";
    });
});
// 펀딩 접기 펼치기   ".first-slide, .second-slide, .third-slide, .fourth-slide, .fifth-slide, .sixth-slide "    "a[href=slide]"
const fundingFold = document.querySelector(".close");
const fundings = document.querySelectorAll(
    ".first-slide, .second-slide, .third-slide, .fourth-slide, .fifth-slide, .sixth-slide",
);

fundings.forEach((funding) => {
    funding.style.display = "none";
});
fundingFold.textContent = "펼치기";

fundingFold.addEventListener("click", (e) => {
    if (fundingFold.textContent === "접기") {
        fundingFold.textContent = "펼치기";

        fundings.forEach((funding) => {
            funding.style.display = "none";
        });
    } else {
        fundingFold.textContent = "접기";

        fundings.forEach((funding) => {
            funding.style.display = "flex";
        });
    }
});

// footer 접기 펼치기
const footerContent = document.querySelector(".saupja-text-content");
const foldContent = document.querySelector(".fold-content");

footerContent.style.display = "none";
foldContent.textContent = "펼치기";

foldContent.addEventListener("click", (e) => {
    if (foldContent.textContent === "접기") {
        foldContent.textContent = "펼치기";
        footerContent.style.display = "none";
    } else {
        foldContent.textContent = "접기";
        footerContent.style.display = "block";
    }
});

//"박" 누르면 내프로필이랑 로그아웃 모달
const loginIcon2 = document.querySelector(".login-icon2");
const modalPark = document.querySelector(".modal-park");

modalPark.style.display = "none";

loginIcon2.addEventListener("click", (e) => {
    if (modalPark.style.display === "none") {
        modalPark.style.display = "block";
    } else {
        modalPark.style.display = "none";
    }
});

// 관리자모드에서 사이드 바 누르면 값 뿌리는 화면
// const categorys = document.querySelectorAll(
//     ".first-wrap, .second-wrap, .third-wrap, .fourth-wrap, .fifth-wrap, .sixth-wrap",
// );

// iamtot_ra
