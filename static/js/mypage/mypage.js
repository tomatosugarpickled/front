// DOM이 로드된 후 실행
document.addEventListener("DOMContentLoaded", () => {
    console.log("mypage.js loaded");

    // 모달 열기 함수
    function openModal(modalId) {
        console.log(`Open Modal Request: ${modalId}`);
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = "flex";
            console.log("Modal display set to flex");
        } else {
            console.error(`ERROR: Modal with ID '${modalId}' not found!`);
            alert("오류: 모달창을 찾을 수 없습니다.");
        }
    }

    // 모달 닫기 함수
    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = "none";
        }
    }

    // 이벤트 위임 (Event Delegation) - 모든 클릭 이벤트를 body에서 감지
    document.body.addEventListener("click", (event) => {
        const target = event.target;

        // 1. 경력 등록 버튼 클릭 감지
        const careerBtn = target.closest(".user-content-history-registration");
        if (careerBtn) {
            console.log("Career button clicked (Delegate)");
            openModal("career-modal");
            return;
        }

        // 2. 학력 등록 버튼 클릭 감지
        const eduBtn = target.closest(".education-button-wrap");
        if (eduBtn) {
            console.log("Education button clicked (Delegate)");
            openModal("education-modal");
            return;
        }

        // 3. 개인정보 설정 버튼 클릭 감지
        const setBtn = target.closest(".profile-setting-content-div");
        if (setBtn) {
            openModal("setting-modal");
            return;
        }

        // 2. 개인정보 수정 버튼 클릭 감지
        const editBtn = target.closest(".change");
        if (editBtn) {
            openModal("form-modal");
            return;
        }

        // 3. 닫기 버튼 (X 아이콘)
        const closeBtn = target.closest(".close-modal-btn");
        if (closeBtn) {
            const modalId = closeBtn.getAttribute("data-modal");
            closeModal(modalId);
            return;
        }
        // 3. 취소 버튼
        const cancelBtn = target.closest(".cancel-btn");
        if (cancelBtn) {
            const modalId = cancelBtn.getAttribute("data-modal");
            closeModal(modalId);
            return;
        }

        // 4. 배경 클릭 시 닫기
        if (target.classList.contains("modal-overlay")) {
            target.style.display = "none";
            return;
        }
    });

    // ===================================
    // 데이터 처리 로직 (이전과 동일)
    // ===================================

    // 경력 저장 버튼
    const saveCareerBtn = document.getElementById("save-career-btn");
    /*
    if (saveCareerBtn) {
        saveCareerBtn.addEventListener("click", addCareerItem);
    }
    */

    // 학력 저장 버튼
    const saveEduBtn = document.getElementById("save-edu-btn");
    /*
    if (saveEduBtn) {
        saveEduBtn.addEventListener("click", addEducationItem);
    }
    */

    function addCareerItem() {
        const company = document.getElementById("career-company").value;
        const role = document.getElementById("career-role").value;
        const type = document.getElementById("career-type").value; // Added type
        const startYear = document.getElementById("career-start-year").value;
        const startMonth = document.getElementById("career-start-month").value;
        const endYear = document.getElementById("career-end-year").value;
        const endMonth = document.getElementById("career-end-month").value;
        const isCurrent = document.getElementById("career-current").checked;
        const description = document.getElementById("career-desc").value;

        if (!company || !role || startYear === "년도" || startMonth === "월") {
            alert("필수 정보를 입력해주세요 (소속, 역할, 시작일).");
            return;
        }

        // Period Formatting
        let periodStr = `${startYear}년 ${startMonth}월 - `;
        let totalMonths = 0;
        const start = new Date(startYear, startMonth - 1);
        let end;

        if (isCurrent) {
            periodStr += "현재";
            end = new Date(); // Current date for duration calculation
        } else if (endYear !== "년도" && endMonth !== "월") {
            periodStr += `${endYear}년 ${endMonth}월`;
            end = new Date(endYear, endMonth - 1);
        } else {
            periodStr += "진행중";
            end = new Date();
        }

        // Duration Calculation
        let years = end.getFullYear() - start.getFullYear();
        let months = end.getMonth() - start.getMonth();
        if (months < 0) {
            years--;
            months += 12;
        }
        // Basic duration string logic (e.g., "2년 3개월")
        let durationStr = "";
        if (years > 0) durationStr += `${years}년 `;
        if (months > 0) durationStr += `${months}개월`;
        if (durationStr === "") durationStr = "1개월 미만";

        // HTML Structure to match screenshot
        const itemHtml = `
            <div class="career-logo">
                 <img src="https://rocketpunch.com/assets/images/company-default-logo.png" alt="Company Logo" style="width: 24px; height: 24px; border-radius: 4px;">
            </div>
            <div class="career-info">
                <h4 class="career-role">${role}</h4>
                <p class="career-company-type">${company} ${type ? " · " + type : ""}</p>
                <p class="career-period">${periodStr} · ${durationStr}</p>
                <p class="career-description">${description}</p>
            </div>
        `;

        // Add to DOM
        const historyContainer = document.querySelector(
            ".user-content-history-content-wrap",
        );
        const newItemDiv = document.createElement("div");
        newItemDiv.className = "career-item"; // Apply new CSS class
        newItemDiv.innerHTML = itemHtml;

        // Add editing buttons (Edit pencil / Delete X) - Optional based on screenshot, but good for UX
        const editControls = document.createElement("div");
        editControls.style.marginLeft = "auto";
        editControls.innerHTML = `
            <button style="background:none; border:none; cursor:pointer; color:#94a3b8; font-size:16px;">✎</button>
        `;
        // newItemDiv.appendChild(editControls); // Uncomment if edit button needed immediately

        // Insert before the "+ Add" button or append
        const btn = document.querySelector(
            ".user-content-history-registration",
        );
        historyContainer.insertBefore(newItemDiv, btn);

        closeModal("career-modal");
        resetForm("career-modal"); // Ensure reset function exists or is called
    }

    // Helper to reset form (if not already existing or robust enough)
    function resetForm(modalId) {
        const modal = document.getElementById(modalId);
        const inputs = modal.querySelectorAll("input, select, textarea");
        inputs.forEach((input) => {
            if (input.type === "checkbox") {
                input.checked = false;
            } else if (input.tagName === "SELECT") {
                input.selectedIndex = 0;
            } else {
                input.value = "";
            }
        });
    }

    function addEducationItem() {
        // 학력 추가 로직 구현
        closeModal("education-modal");
    }

    // 날짜 초기화 필요시 여기에 추가
    function initDateSelects() {
        const yearSelects = document.querySelectorAll(".year-select");
        const monthSelects = document.querySelectorAll(".month-select");
        const currentYear = new Date().getFullYear();

        yearSelects.forEach((select) => {
            if (select.options.length > 1) return;
            for (let i = currentYear; i >= 1950; i--) {
                const option = document.createElement("option");
                option.value = i;
                option.text = `${i}년`;
                select.appendChild(option);
            }
        });

        monthSelects.forEach((select) => {
            if (select.options.length > 1) return;
            for (let i = 1; i <= 12; i++) {
                const option = document.createElement("option");
                option.value = i;
                option.text = `${i}월`;
                select.appendChild(option);
            }
        });
    }
    initDateSelects();

    // ===================================
    // 팔로우 버튼 토글 기능
    // ===================================

    // 방문자용 팔로우 버튼 토글
    const followButton = document.getElementById('follow-button');
    if (followButton) {
        followButton.addEventListener('click', (e) => {
            e.preventDefault();
            const buttonText = followButton.querySelector('.user-profile-edit-word');

            if (buttonText.textContent === '팔로우') {
                buttonText.textContent = '팔로잉';
                followButton.classList.add('following');
            } else {
                buttonText.textContent = '팔로우';
                followButton.classList.remove('following');
            }
        });
    }

    // 팔로워 리스트의 팔로우 버튼들 토글
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('follower-item-follow-btn')) {
            e.preventDefault();
            const button = e.target;

            if (button.textContent === '팔로우') {
                button.textContent = '팔로잉';
                button.classList.add('following');
            } else {
                button.textContent = '팔로우';
                button.classList.remove('following');
            }
        }
    });

    // ===================================
    // 탭 전환 기능 - 관심 팀목록 클릭시 팔로워 리스트 표시
    // ===================================

    const interestTab = document.getElementById('tab-interest-text');
    const followerListSection = document.getElementById('follower-list-section');
    const postsTab = document.getElementById('tab-posts-text');

    if (interestTab && followerListSection) {
        // 팔로워 탭의 부모 요소에 클릭 이벤트 추가
        const interestTabParent = interestTab.closest('.user-profile-tab-save-wrap');
        const postsTabParent = postsTab ? postsTab.closest('.user-profile-tab-mypost') : null;

        if (interestTabParent) {
            interestTabParent.addEventListener('click', (e) => {
                e.preventDefault();

                // 모든 탭 콘텐츠 숨기기
                const allTabs = document.querySelectorAll('[data-tab]');
                allTabs.forEach(tab => tab.style.display = 'none');

                // 팔로워 리스트 표시
                followerListSection.style.display = 'flex';
            });
        }

        if (postsTabParent) {
            postsTabParent.addEventListener('click', (e) => {
                e.preventDefault();

                // 모든 탭 콘텐츠 숨기기
                const allTabs = document.querySelectorAll('[data-tab]');
                allTabs.forEach(tab => tab.style.display = 'none');

                // 게시물 콘텐츠 표시
                const postsContent = document.querySelector('[data-tab="posts"]');
                if (postsContent) postsContent.style.display = 'block';
            });
        }
    }
});
