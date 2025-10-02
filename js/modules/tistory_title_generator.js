// Tistory 블로그 제목 뽑기 모듈
const TistoryTitleGenerator = (function() {

    function initialize() {
        console.log('Tistory 제목 생성기 모듈 초기화');
        // 추후 자체 기능 구현 시 사용
    }

    // 공개 API
    return {
        initialize: initialize
    };
})();

// 전역으로 노출
window.TistoryTitleGenerator = TistoryTitleGenerator;
