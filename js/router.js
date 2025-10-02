// URL 업데이트 함수
function updateURL(path) {
    // 로컬 파일인지 확인
    if (window.location.protocol === 'file:') {
        // 로컬에서는 hash 사용
        window.location.hash = path;
    } else {
        // 온라인에서는 path 사용
        const baseUrl = window.location.origin + '/Corelia/';
        const newUrl = baseUrl + path;
        window.history.pushState({path: path}, '', newUrl);
    }
}

// URL에서 섹션 읽기
function getSectionFromURL() {
    // hash가 있으면 hash 우선 (404 리다이렉트 후)
    const hash = window.location.hash;
    if (hash === '#AI') return 'ai-tools';
    if (hash === '#MS-ACCOUNT') return 'ms-account';
    if (hash === '#MS-CALCULATING') return 'ms-calculating';
    if (hash === '#MS') return 'ms';

    // 로컬 파일이면 여기서 종료
    if (window.location.protocol === 'file:') {
        return 'main';
    }

    // 온라인에서는 path도 체크
    const path = window.location.pathname;
    if (path.includes('/AI')) return 'ai-tools';
    if (path.includes('/MS-ACCOUNT')) return 'ms-account';
    if (path.includes('/MS-CALCULATING')) return 'ms-calculating';
    if (path.includes('/MS')) return 'ms';

    return 'main';
}

// 페이지 로드 시 URL에 따라 섹션 설정
function initializePage() {
    let sectionId;

    // 404 리다이렉트 후 sessionStorage 확인
    const redirectPath = sessionStorage.getItem('redirectPath');
    if (redirectPath) {
        sessionStorage.removeItem('redirectPath');
        // URL을 깔끔하게 업데이트
        if (window.location.protocol !== 'file:') {
            window.history.replaceState({path: redirectPath}, '', '/Corelia/' + redirectPath);
        }
        // redirectPath로 직접 섹션 결정
        if (redirectPath === 'AI') sectionId = 'ai-tools';
        else if (redirectPath === 'MS-ACCOUNT') sectionId = 'ms-account';
        else if (redirectPath === 'MS-CALCULATING') sectionId = 'ms-calculating';
        else if (redirectPath === 'MS') sectionId = 'ms';
        else sectionId = 'main';
    } else {
        sectionId = getSectionFromURL();
    }

    showSection(sectionId);

    // 네비게이션 활성화 상태 설정
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));

    // 해당 섹션의 링크 활성화
    if (sectionId === 'ai-tools') {
        const aiLink = document.querySelector('a[href="/Corelia/AI"]');
        if (aiLink) {
            aiLink.classList.add('active');
            // AI 서브메뉴 열기
            const submenu = document.getElementById('ai-tools-submenu');
            const arrow = aiLink.querySelector('.submenu-arrow');
            if (submenu && arrow) {
                submenu.classList.add('active');
                arrow.textContent = '▲';
            }
        }
    } else if (sectionId === 'ms') {
        const msLink = document.querySelector('a[onclick*="ms"]');
        if (msLink) {
            msLink.classList.add('active');
            // MS 서브메뉴 열기
            const submenu = document.getElementById('ms-submenu');
            const arrow = msLink.querySelector('.submenu-arrow');
            if (submenu && arrow) {
                submenu.classList.add('active');
                arrow.textContent = '▲';
            }
        }
    } else if (sectionId === 'ms-account') {
        const msLink = document.querySelector('a[onclick*="ms"]');
        if (msLink) {
            msLink.classList.add('active');
            // MS 서브메뉴 열기
            const submenu = document.getElementById('ms-submenu');
            const arrow = msLink.querySelector('.submenu-arrow');
            if (submenu && arrow) {
                submenu.classList.add('active');
                arrow.textContent = '▲';
            }
        }
    }
}

function showSection(sectionId, event) {
    // 모든 섹션 숨기기
    const sections = document.querySelectorAll('.content-body');
    sections.forEach(section => section.classList.add('hidden'));

    // 선택된 섹션 보이기
    document.getElementById(sectionId).classList.remove('hidden');

    // 네비게이션 활성화 상태 업데이트
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));

    // 현재 클릭된 링크 활성화 (event가 있을 때만)
    if (event && event.currentTarget && event.currentTarget.classList) {
        event.currentTarget.classList.add('active');
    }

    // 페이지 제목 업데이트
    const titles = {
        'main': { title: 'Corelia', subtitle: 'Core + Intelligence' },
        'ai-tools': { title: 'AI 활용하기', subtitle: 'Corelia의 AI 도구들을 활용해보세요' },
        'ms': { title: 'MS', subtitle: '게임 관련 콘텐츠가 준비 중입니다' },
        'ms-account': { title: 'MS 가계부', subtitle: '메이플스토리 수익 관리 시스템' },
        'ms-calculating': { title: 'MVP작 계산기', subtitle: 'MVP작 거래 손익을 계산해보세요' }
    };

    document.getElementById('page-title').textContent = titles[sectionId].title;
    document.getElementById('page-subtitle').textContent = titles[sectionId].subtitle;

    // MS 가계부 섹션일 때 데이터 로드
    if (sectionId === 'ms-account') {
        if (window.MSAccountBook && window.MSAccountBook.loadTransactions) {
            window.MSAccountBook.loadTransactions();
        }
    }
}

function toggleSubmenu(menuId) {
    const submenu = document.getElementById(menuId + '-submenu');
    const navLink = event.currentTarget;
    const arrow = navLink.querySelector('.submenu-arrow');

    if (submenu && arrow) {
        if (submenu.classList.contains('active')) {
            submenu.classList.remove('active');
            arrow.textContent = '▼';
        } else {
            // 다른 서브메뉴들 닫기
            document.querySelectorAll('.submenu').forEach(menu => {
                menu.classList.remove('active');
            });
            document.querySelectorAll('.submenu-arrow').forEach(arrow => {
                arrow.textContent = '▼';
            });

            // 현재 서브메뉴 열기
            submenu.classList.add('active');
            arrow.textContent = '▲';
        }
    }
}

// 브라우저 뒤로가기/앞으로가기 처리
window.addEventListener('popstate', function(event) {
    initializePage();
});

// hash 변경 처리 (로컬 파일용)
window.addEventListener('hashchange', function(event) {
    initializePage();
});
