// 드롭다운 관리
class DropdownManager {
    constructor() {
        this.activeDropdown = null;
        this.init();
    }

    init() {
        // 모든 드롭다운 버튼에 이벤트 리스너 추가
        const dropdownButtons = document.querySelectorAll('.dropdown-button');
        dropdownButtons.forEach(button => {
            button.addEventListener('click', (e) => this.toggleDropdown(e));
        });

        // 드롭다운 아이템 클릭 이벤트
        const dropdownItems = document.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', (e) => this.selectItem(e));
        });

        // 외부 클릭 시 드롭다운 닫기
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown-wrapper')) {
                this.closeAllDropdowns();
            }
        });
    }

    toggleDropdown(e) {
        e.stopPropagation();
        const button = e.currentTarget;
        const dropdownType = button.dataset.dropdown;
        const menu = document.getElementById(`${dropdownType}-dropdown`);

        // 다른 드롭다운이 열려있으면 닫기
        if (this.activeDropdown && this.activeDropdown !== menu) {
            this.closeAllDropdowns();
        }

        // 현재 드롭다운 토글
        const isActive = menu.classList.contains('active');
        if (isActive) {
            menu.classList.remove('active');
            button.classList.remove('active');
            this.activeDropdown = null;
        } else {
            menu.classList.add('active');
            button.classList.add('active');
            this.activeDropdown = menu;
        }
    }

    selectItem(e) {
        const item = e.currentTarget;
        const value = item.dataset.value;
        const text = item.textContent;
        const menu = item.closest('.dropdown-menu');
        const wrapper = item.closest('.dropdown-wrapper');
        const button = wrapper.querySelector('.dropdown-button');
        const buttonText = button.querySelector('.dropdown-text');

        // 선택된 아이템 표시
        menu.querySelectorAll('.dropdown-item').forEach(i => {
            i.classList.remove('selected');
        });
        item.classList.add('selected');

        // 버튼 텍스트 업데이트
        buttonText.textContent = text;

        // 드롭다운 닫기
        menu.classList.remove('active');
        button.classList.remove('active');
        this.activeDropdown = null;

        // 필터 적용
        this.applyFilters();
    }

    closeAllDropdowns() {
        const allMenus = document.querySelectorAll('.dropdown-menu');
        const allButtons = document.querySelectorAll('.dropdown-button');
        
        allMenus.forEach(menu => menu.classList.remove('active'));
        allButtons.forEach(button => button.classList.remove('active'));
        this.activeDropdown = null;
    }

    applyFilters() {
        // 필터 적용 로직 (나중에 구현)
        console.log('Filters applied');
    }
}

// 검색 관리
class SearchManager {
    constructor() {
        this.keywordInput = document.getElementById('keyword-input');
        this.searchButton = document.querySelector('.search-button');
        this.resultsList = document.getElementById('results-list');
        this.resultsCount = document.querySelector('.results-count');
        
        this.init();
    }

    init() {
        // 검색 버튼 클릭
        this.searchButton.addEventListener('click', () => this.performSearch());

        // 엔터키로 검색
        this.keywordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch();
            }
        });
    }

    performSearch() {
        const keyword = this.keywordInput.value.trim();
        const location = this.getSelectedValue('location');
        const industry = this.getSelectedValue('industry');

        console.log('Search params:', { keyword, location, industry });

        // 임시 데이터로 결과 표시
        this.displayResults(this.getMockData(keyword, location, industry));
    }

    getSelectedValue(dropdownType) {
        const menu = document.getElementById(`${dropdownType}-dropdown`);
        const selected = menu.querySelector('.dropdown-item.selected');
        return selected ? selected.dataset.value : 'all';
    }

    getMockData(keyword, location, industry) {
        // 임시 목업 데이터
        const mockTeams = [
            {
                id: 1,
                name: '토스',
                description: '금융을 쉽고 간편하게',
                tags: ['핀테크', '서울', '500명+'],
                logo: ''
            },
            {
                id: 2,
                name: '당근마켓',
                description: '우리 동네 중고 직거래',
                tags: ['커머스', '서울', '300명+'],
                logo: ''
            },
            {
                id: 3,
                name: '배달의민족',
                description: '대한민국 1등 배달앱',
                tags: ['O2O', '서울', '1000명+'],
                logo: ''
            }
        ];

        // 간단한 필터링
        let filtered = mockTeams;

        if (keyword) {
            filtered = filtered.filter(team => 
                team.name.includes(keyword) || 
                team.description.includes(keyword)
            );
        }

        return filtered;
    }

    displayResults(teams) {
        // 결과 개수 업데이트
        this.resultsCount.textContent = teams.length;

        // 결과 리스트 초기화
        this.resultsList.innerHTML = '';

        if (teams.length === 0) {
            this.resultsList.innerHTML = `
                <div class="empty-state">
                    <p>검색 결과가 없습니다</p>
                </div>
            `;
            return;
        }

        // 팀 카드 생성
        teams.forEach(team => {
            const card = this.createTeamCard(team);
            this.resultsList.appendChild(card);
        });
    }

    createTeamCard(team) {
        const card = document.createElement('div');
        card.className = 'team-card';
        card.innerHTML = `
            <div class="team-logo"></div>
            <div class="team-info">
                <div class="team-name">${team.name}</div>
                <div class="team-description">${team.description}</div>
                <div class="team-tags">
                    ${team.tags.map(tag => `<span class="team-tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;

        card.addEventListener('click', () => {
            console.log('Team clicked:', team.id);
            // 팀 상세 페이지로 이동하는 로직 추가
        });

        return card;
    }
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    new DropdownManager();
    new SearchManager();
    
    console.log('Team list page initialized');
});
