// 키워드 툴팁
const keywordIcon = document.querySelector(".keyword-icon");
const tooltipBox = document.querySelector(".tooltip-div-section");

keywordIcon.addEventListener("mouseenter", (e) => {
    tooltipBox.classList.add("active");
});
keywordIcon.addEventListener("mouseleave", (e) => {
    tooltipBox.classList.remove("active");
});

// 카테고리 Click Event
const CategorySelector = document.querySelectorAll(
    ".list-category-left-section > div",
);
CategorySelector.forEach((selector) => {
    selector.addEventListener("click", (e) => {
        CategorySelector.forEach((btn) => {
            btn.classList.remove("active");
        });

        const targetButton = e.target.closest("div");

        if (targetButton) {
            targetButton.classList.add("active");
        }
    });
});
