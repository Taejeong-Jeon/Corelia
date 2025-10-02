// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 사이드바 상태 복원
    const sidebarCollapsed = localStorage.getItem('sidebar-collapsed') === 'true';
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    if (sidebarCollapsed) {
        document.querySelector('.sidebar').classList.add('collapsed');
        hamburgerBtn.classList.add('active');
        hamburgerBtn.style.left = '0.75rem';
    } else {
        hamburgerBtn.style.left = '244px';
    }

    // 페이지 로드 시 로컬 스토리지에서 데이터 로드
    const localData = localStorage.getItem('ms-transactions');
    if (localData) {
        try {
            const transactions = JSON.parse(localData);
            console.log('페이지 로드 시 로컬 데이터 로드:', transactions);
        } catch (error) {
            console.error('로컬 데이터 파싱 실패:', error);
        }
    }

    // 모듈 초기화
    if (window.MSAccountBook) MSAccountBook.initialize();
    if (window.MSCalculatingMachine) MSCalculatingMachine.initialize();
    // MSMepoCalculating은 router.js에서 섹션 전환 시 초기화
    if (window.NovelGenerator) NovelGenerator.initialize();
    if (window.TistoryTitleGenerator) TistoryTitleGenerator.initialize();
    if (window.TistoryContentGenerator) TistoryContentGenerator.initialize();

    // 라우터 초기화 (모듈 로드 후)
    initializePage();
});

// 사이드바 토글 함수
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const hamburgerBtn = document.querySelector('.hamburger-btn');

    sidebar.classList.toggle('collapsed');
    hamburgerBtn.classList.toggle('active');

    // 햄버거 버튼 위치 조정
    const isCollapsed = sidebar.classList.contains('collapsed');
    if (isCollapsed) {
        hamburgerBtn.style.left = '0.75rem';
    } else {
        hamburgerBtn.style.left = '244px';
    }

    // 상태를 로컬 스토리지에 저장
    localStorage.setItem('sidebar-collapsed', isCollapsed);
}
