// 탭 전환 기능
document.addEventListener("DOMContentLoaded", function () {
    // 탭 요소들 가져오기
    const homeTab = document.querySelector(".team-detail-category-home");
    const postsTab = document.querySelector(".team-detail-category-post");
    const projectTab = document.querySelector(".team-detail-category-project");

    // 탭 콘텐츠 요소들 가져오기
    const homeContent = document.querySelector('[data-tab="home"]');
    const postsContent = document.querySelector('[data-tab="posts"]');
    const portfolioContent = document.querySelector('[data-tab="portfolio"]');

    // 요소가 존재하는지 확인
    if (!homeTab || !postsTab || !projectTab) {
        console.error("탭 요소를 찾을 수 없습니다.");
        return;
    }

    if (!homeContent || !postsContent) {
        console.error("탭 콘텐츠를 찾을 수 없습니다.");
        return;
    }

    // 모든 탭과 콘텐츠 숨기기 함수
    function hideAllTabs() {
        if (homeContent) homeContent.style.display = "none";
        if (postsContent) postsContent.style.display = "none";
        if (portfolioContent) portfolioContent.style.display = "none";

        // 모든 탭에서 active 클래스 제거
        homeTab.classList.remove("active");
        postsTab.classList.remove("active");
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

    // 더보기 버튼 기능
    setupSeeMoreButtons();

    // 팔로우 & 팀 참가요청 버튼 기능
    setupActionButtons();

    // 프로젝트 모달 기능
    setupProjectModal();
});

// 팔로우 & 팀 참가요청 버튼 설정 함수
function setupActionButtons() {
    // 팀 참가요청 버튼
    const joinButton = document.querySelector('.follow-button');
    if (joinButton) {
        const joinButtonText = joinButton.querySelector('.follow-button-text');
        joinButton.addEventListener('click', function() {
            if (joinButtonText.textContent === '팀 참가요청') {
                joinButtonText.textContent = '승인 대기중';
                joinButton.style.backgroundColor = '#6b7280';
                joinButton.style.cursor = 'default';
            } else if (joinButtonText.textContent === '승인 대기중') {
                joinButtonText.textContent = '팀 참가요청';
                joinButton.style.backgroundColor = '';
                joinButton.style.cursor = 'pointer';
            }
        });
    }

    // 메인 팔로우 버튼
    const followButton = document.querySelector('.contact-button');
    if (followButton) {
        const followButtonText = followButton.querySelector('.contact-button-text');
        followButton.addEventListener('click', function() {
            if (followButtonText.textContent === '팔로우') {
                followButtonText.textContent = '팔로잉';
                followButton.style.backgroundColor = '#6b7280';
            } else if (followButtonText.textContent === '팔로잉') {
                followButtonText.textContent = '팔로우';
                followButton.style.backgroundColor = '';
            }
        });
    }

    // 팀원 팔로우 버튼들
    const peopleFollowButtons = document.querySelectorAll('.people-follow-btn');
    peopleFollowButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (button.textContent === '팔로우') {
                button.textContent = '팔로잉';
                button.style.backgroundColor = '#6b7280';
                button.style.color = '#ffffff';
            } else if (button.textContent === '팔로잉') {
                button.textContent = '팔로우';
                button.style.backgroundColor = '';
                button.style.color = '';
            }
        });
    });
}

// 더보기 버튼 설정 함수
function setupSeeMoreButtons() {
    // 팀 프로필 about us 더보기 버튼
    const aboutUsMore = document.querySelector('.team-profile-aboutus-more');
    const aboutUsContent = document.querySelector('.team-profile-aboutus-content');

    if (aboutUsMore && aboutUsContent) {
        // 초기 상태: 텍스트 일부만 보이게 설정
        aboutUsContent.style.maxHeight = '60px';
        aboutUsContent.style.overflow = 'hidden';
        aboutUsContent.style.transition = 'max-height 0.3s ease';

        aboutUsMore.addEventListener('click', function() {
            if (aboutUsContent.style.maxHeight === '60px') {
                // 펼치기
                aboutUsContent.style.maxHeight = 'none';
                const height = aboutUsContent.scrollHeight + 'px';
                aboutUsContent.style.maxHeight = '60px';
                setTimeout(() => {
                    aboutUsContent.style.maxHeight = height;
                }, 10);
                aboutUsMore.textContent = '접기';
            } else {
                // 접기
                aboutUsContent.style.maxHeight = '60px';
                aboutUsMore.textContent = '더보기';
            }
        });
    }

    // 게시글 더보기 버튼들
    const feedSeeMoreButtons = document.querySelectorAll('.feed-content-seemore');

    feedSeeMoreButtons.forEach(button => {
        const textWrapper = button.previousElementSibling;

        if (textWrapper) {
            // 텍스트가 3줄보다 많은지 확인
            const originalHeight = textWrapper.scrollHeight;
            const visibleHeight = textWrapper.clientHeight;

            // 텍스트가 잘렸는지 확인
            if (originalHeight > visibleHeight) {
                button.style.display = 'block';

                button.addEventListener('click', function() {
                    if (!textWrapper.classList.contains('expanded')) {
                        // 펼치기
                        textWrapper.classList.add('expanded');
                        button.textContent = '접기';
                    } else {
                        // 접기
                        textWrapper.classList.remove('expanded');
                        button.textContent = '더보기';
                    }
                });
            } else {
                // 텍스트가 짧으면 더보기 버튼 숨기기
                button.style.display = 'none';
            }
        }
    });
}

// 프로젝트 모달 설정 함수
function setupProjectModal() {
    const projectCards = document.querySelectorAll('.project-list-item');
    const projectModal = document.getElementById('project-modal');
    const modalClose = document.querySelector('.project-modal-close');

    // 프로젝트 데이터 (실제로는 서버에서 가져올 데이터)
    const projectData = {
        1: {
            title: "헤킹/보안 기술 연구개발(R&D) - 사이버 보안 벤처",
            subtitle: "위협 분석 기반 선제 대응 실무지",
            description: "사이버 보안 분야의 최첨단 기술을 연구하고 개발하는 프로젝트입니다. 악성코드 분석, 침입 탐지 시스템 개발, 보안 취약점 연구 등을 수행하며, 실시간 위협 대응 체계를 구축합니다.",
            techStack: ["Python", "C++", "TensorFlow", "Kubernetes", "ElasticSearch"],
            teamExperience: "15년",
            teamComposition: "보안 전문가 4 : 개발자 3 : 분석가 2",
            workType: "상시 출근",
            projectStage: "운영 중",
            fundingStatus: "시리즈 A",
            timeline: "장기 프로젝트",
            tags: ["미들-C레벨", "상시 출근"]
        },
        2: {
            title: "IT보안 영업,기술 영업,프리 세일즈 - 보안 벤처기업",
            subtitle: "IT 보안 영업 및 기술영업 프리 세일즈",
            description: "기업 고객을 대상으로 보안 솔루션을 제안하고 판매하는 프로젝트입니다. 기술적 이해도를 바탕으로 고객의 보안 요구사항을 분석하고 최적의 솔루션을 설계합니다.",
            techStack: ["Salesforce", "Power BI", "Azure", "Office 365"],
            teamExperience: "10년",
            teamComposition: "영업 3 : 기술지원 2 : 마케팅 1",
            workType: "상시 출근",
            projectStage: "확장 단계",
            fundingStatus: "수익 창출 중",
            timeline: "연간 계약",
            tags: ["미들-시니어", "상시 출근"]
        },
        3: {
            title: "모의해킹 직무 담당자",
            subtitle: "웹/앱 모의해킹 및 모의침투",
            description: "기업의 IT 인프라와 애플리케이션에 대한 보안 취약점을 사전에 발견하고 개선방안을 제시하는 프로젝트입니다. 실제 해커의 관점에서 시스템을 테스트하고 보안을 강화합니다.",
            techStack: ["Metasploit", "Burp Suite", "Wireshark", "Kali Linux", "OWASP"],
            teamExperience: "20년",
            teamComposition: "화이트해커 5 : 보안컨설턴트 3",
            workType: "상시 출근",
            projectStage: "성숙 단계",
            fundingStatus: "자체 운영",
            timeline: "프로젝트 기반",
            tags: ["시니어-C레벨", "상시 출근"]
        },
        4: {
            title: "C&M 스타트업 플랫폼",
            subtitle: "인재와 자본의 간극을 잇다",
            description: "초기 창업 생태계의 핵심적인 불일치 문제를 해결하는 플랫폼입니다. 개발 능력이 없는 마케터와 비즈니스 감각이 부족한 개발자를 연결하고, 팀이 스타트업으로 성장하며 자본을 유치하는 통합 생태계를 구축합니다.",
            techStack: ["React", "Node.js", "PostgreSQL", "AWS", "Docker"],
            teamExperience: "12년",
            teamComposition: "개발 3 : 기획 2 : 디자인 1",
            workType: "리모트",
            projectStage: "MVP 개발 중",
            fundingStatus: "시드 라운드",
            timeline: "3-6개월",
            tags: ["풀스택", "리모트"]
        },
        5: {
            title: "AI 기반 SaaS 솔루션",
            subtitle: "차세대 비즈니스 자동화 플랫폼",
            description: "인공지능을 활용한 비즈니스 프로세스 자동화 솔루션입니다. 머신러닝 모델을 통해 반복적인 업무를 자동화하고, 데이터 기반 의사결정을 지원합니다.",
            techStack: ["Python", "TensorFlow", "FastAPI", "Redis", "MongoDB"],
            teamExperience: "8년",
            teamComposition: "AI 엔지니어 2 : 백엔드 2 : 프론트엔드 1",
            workType: "하이브리드",
            projectStage: "베타 테스트",
            fundingStatus: "시드 단계",
            timeline: "6개월",
            tags: ["시드 단계", "하이브리드"]
        },
        6: {
            title: "블록체인 핀테크 프로젝트",
            subtitle: "탈중앙화 금융 서비스 구축",
            description: "블록체인 기술을 활용한 탈중앙화 금융(DeFi) 서비스를 개발하는 프로젝트입니다. 스마트 컨트랙트를 통해 안전하고 투명한 금융 거래를 구현합니다.",
            techStack: ["Solidity", "Web3.js", "Ethereum", "IPFS", "Truffle"],
            teamExperience: "10년",
            teamComposition: "블록체인 개발 3 : 보안 2 : 금융전문가 1",
            workType: "리모트",
            projectStage: "개발 중",
            fundingStatus: "프리-A",
            timeline: "1년",
            tags: ["프리-A", "리모트"]
        }
    };

    // 프로젝트 카드 클릭 이벤트
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectId = card.dataset.projectId;
            const project = projectData[projectId];

            if (project) {
                // 모달에 데이터 채우기
                document.getElementById('modal-project-logo').src = '../../../static/image/stealen_logo.png';
                document.getElementById('modal-project-title').textContent = project.title;
                document.getElementById('modal-project-subtitle').textContent = project.subtitle;
                document.getElementById('modal-project-description').textContent = project.description;

                // 태그 업데이트
                const tagsContainer = document.getElementById('modal-project-tags');
                tagsContainer.innerHTML = '';
                project.tags.forEach(tag => {
                    const tagElement = document.createElement('span');
                    tagElement.className = 'project-tag';
                    tagElement.textContent = tag;
                    tagsContainer.appendChild(tagElement);
                });

                // 기술 스택 업데이트
                const techStackContainer = document.getElementById('modal-tech-stack');
                techStackContainer.innerHTML = '';
                project.techStack.forEach(tech => {
                    const techBadge = document.createElement('span');
                    techBadge.className = 'tech-badge';
                    techBadge.textContent = tech;
                    techStackContainer.appendChild(techBadge);
                });

                // 팀 정보 업데이트
                document.getElementById('modal-team-experience').textContent = project.teamExperience;
                document.getElementById('modal-team-composition').textContent = project.teamComposition;
                document.getElementById('modal-work-type').textContent = project.workType;

                // 프로젝트 상태 업데이트
                document.getElementById('modal-project-stage').textContent = project.projectStage;
                document.getElementById('modal-funding-status').textContent = project.fundingStatus;
                document.getElementById('modal-timeline').textContent = project.timeline;

                // 모달 표시
                projectModal.style.display = 'flex';
            }
        });
    });

    // 모달 닫기 버튼
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            projectModal.style.display = 'none';
        });
    }

    // 모달 외부 클릭시 닫기
    projectModal.addEventListener('click', function(e) {
        if (e.target === projectModal) {
            projectModal.style.display = 'none';
        }
    });

    // ESC 키로 모달 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && projectModal.style.display === 'flex') {
            projectModal.style.display = 'none';
        }
    });
}
