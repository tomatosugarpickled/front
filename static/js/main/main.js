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

// 피드 게시글 더보기 기능
const feedCards = document.querySelectorAll('.feed-card');

feedCards.forEach((card) => {
    const textWrapper = card.querySelector('.feed-content-text-wrapper');
    const seeMoreBtn = card.querySelector('.feed-content-seemore');

    if (textWrapper && seeMoreBtn) {
        // 텍스트가 잘렸는지 확인
        if (textWrapper.scrollHeight > textWrapper.clientHeight) {
            seeMoreBtn.classList.add('visible');
        }

        // 더보기 버튼 클릭 이벤트
        seeMoreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const seeMoreText = seeMoreBtn.querySelector('.seemore-text');

            if (textWrapper.classList.contains('expanded')) {
                // 접기
                textWrapper.classList.remove('expanded');
                seeMoreBtn.classList.remove('expanded');
                seeMoreText.textContent = '더보기';
            } else {
                // 펼치기
                textWrapper.classList.add('expanded');
                seeMoreBtn.classList.add('expanded');
                seeMoreText.textContent = '접기';
            }
        });
    }
});

// 알림 모달 기능
const notificationBell = document.getElementById('notification-bell');
const notificationModal = document.getElementById('notification-modal');
const clearAllBtn = document.getElementById('clear-all-notifications');
const notificationItems = document.querySelectorAll('.notification-item');
const notificationEmpty = document.querySelector('.notification-empty');

// 알림 벨 버튼 클릭
if (notificationBell && notificationModal) {
    notificationBell.addEventListener('click', (e) => {
        e.stopPropagation();
        notificationModal.classList.toggle('show');
    });

    // 모달 외부 클릭시 닫기
    document.addEventListener('click', (e) => {
        if (!notificationModal.contains(e.target) && !notificationBell.contains(e.target)) {
            notificationModal.classList.remove('show');
        }
    });

    // 모달 내부 클릭시 이벤트 전파 방지
    notificationModal.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// 모두 지우기 버튼
if (clearAllBtn) {
    clearAllBtn.addEventListener('click', () => {
        const items = document.querySelectorAll('.notification-item');
        items.forEach(item => {
            item.remove();
        });

        // 알림이 없을 때 메시지 표시
        if (notificationEmpty) {
            notificationEmpty.style.display = 'flex';
        }
    });
}

// 개별 알림 삭제 버튼
notificationItems.forEach(item => {
    const deleteBtn = item.querySelector('.notification-item-delete');

    if (deleteBtn) {
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            item.remove();

            // 모든 알림이 삭제되었는지 확인
            const remainingItems = document.querySelectorAll('.notification-item');
            if (remainingItems.length === 0 && notificationEmpty) {
                notificationEmpty.style.display = 'flex';
            }
        });
    }
});
