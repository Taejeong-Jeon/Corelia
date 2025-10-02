// Tistory 블로그 내용 만들기 모듈
const TistoryContentGenerator = (function() {

    function initialize() {
        console.log('Tistory 내용 생성기 모듈 초기화');
        // 추후 자체 기능 구현 시 사용
    }

    // 공개 API
    return {
        initialize: initialize
    };
})();

// 전역으로 노출
window.TistoryContentGenerator = TistoryContentGenerator;
