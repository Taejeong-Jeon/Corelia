// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
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

    // 라우터 초기화
    initializePage();

    // 모듈 초기화
    if (window.MSAccountBook) MSAccountBook.initialize();
    if (window.MSCalculatingMachine) MSCalculatingMachine.initialize();
    // MSMepoCalculating은 router.js에서 섹션 전환 시 초기화
    if (window.NovelGenerator) NovelGenerator.initialize();
    if (window.TistoryTitleGenerator) TistoryTitleGenerator.initialize();
    if (window.TistoryContentGenerator) TistoryContentGenerator.initialize();
});
