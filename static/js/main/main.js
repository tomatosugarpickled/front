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
const categoryParts = document.querySelectorAll(
    ".first-wrap, .second-wrap, .third-wrap, .fourth-wrap, .fifth-wrap, .sixth-wrap"
);

categoryParts.forEach((wrap) => {
    wrap.addEventListener("click", (e) => {
        wrap.style.transform = "scale(0.3)";

        wrap.style.transition = "transform 0.3s ease";

        setTimeout(() => {
            wrap.style.transform = "scale(1)";
        });
    });
});
// 펀딩 접기 펼치기   ".first-slide, .second-slide, .third-slide, .fourth-slide, .fifth-slide, .sixth-slide "    "a[href=slide]"
const fundingFold = document.querySelector(".close");
const fundings = document.querySelectorAll(
    ".first-slide, .second-slide, .third-slide, .fourth-slide, .fifth-slide, .sixth-slide"
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

//사이드바 로그인 전/후 차이 "설정"이 로그인 후에 생김 "로그인"이 로그인 후엔 박하민으로 나옴
