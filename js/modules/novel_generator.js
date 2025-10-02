// 소설 만들기 모듈
const NovelGenerator = (function() {

    function initialize() {
        console.log('소설 만들기 모듈 초기화');
        // 추후 자체 기능 구현 시 사용
    }

    // 공개 API
    return {
        initialize: initialize
    };
})();

// 전역으로 노출
window.NovelGenerator = NovelGenerator;
