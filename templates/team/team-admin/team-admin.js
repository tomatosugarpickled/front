// 탭 전환 기능
document.addEventListener("DOMContentLoaded", function () {
    // 탭 요소들 가져오기
    const homeTab = document.querySelector(".team-detail-category-home");
    const postsTab = document.querySelector(".team-detail-category-post");
    const memberTab = document.querySelector(".team-detail-category-member");
    const projectTab = document.querySelector(".team-detail-category-project");

    // 탭 콘텐츠 요소들 가져오기
    const homeContent = document.querySelector('[data-tab="home"]');
    const postsContent = document.querySelector('[data-tab="posts"]');
    const portfolioContent = document.querySelector('[data-tab="portfolio"]');

    // 모든 탭과 콘텐츠 숨기기 함수
    function hideAllTabs() {
        homeContent.style.display = "none";
        postsContent.style.display = "none";
        if (portfolioContent) {
            portfolioContent.style.display = "none";
        }

        // 모든 탭에서 active 클래스 제거
        homeTab.classList.remove("active");
        postsTab.classList.remove("active");
        memberTab.classList.remove("active");
        projectTab.classList.remove("active");
    }

    // 홈 탭 클릭
    homeTab.addEventListener("click", function () {
        hideAllTabs();
        homeContent.style.display = "block";
        homeTab.classList.add("active");
    });

    // 게시글 탭 클릭
    postsTab.addEventListener("click", function () {
        hideAllTabs();
        postsContent.style.display = "block";
        postsTab.classList.add("active");
    });

    // 팀 관리 탭 클릭 (추후 구현)
    memberTab.addEventListener("click", function () {
        hideAllTabs();
        memberTab.classList.add("active");
        // 팀 관리 콘텐츠
    });

    // 포트폴리오 탭 클릭
    projectTab.addEventListener("click", function () {
        hideAllTabs();
        if (portfolioContent) {
            portfolioContent.style.display = "block";
        }
        projectTab.classList.add("active");
    });

    // 초기 상태: 홈 탭 활성화
    homeTab.classList.add("active");
});
