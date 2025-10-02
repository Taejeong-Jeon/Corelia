// MVP작 계산기(메포) 모듈
const MSMepoCalculating = (function() {

    function initialize() {
        console.log('메포 계산기 모듈 초기화');

        // 입력 필드 이벤트 리스너
        const mepoRate = document.getElementById('mepo-rate');
        const waterRate = document.getElementById('water-rate-mepo');
        const purchasedMeso = document.getElementById('purchased-meso');

        if (mepoRate) {
            mepoRate.addEventListener('input', calculate);
        }
        if (waterRate) {
            waterRate.addEventListener('input', calculate);
        }
        if (purchasedMeso) {
            purchasedMeso.addEventListener('input', calculate);
        }
    }

    // 계산 함수
    function calculate() {
        // 입력값 가져오기
        const mepoRate = parseFloat(document.getElementById('mepo-rate').value) || 0;
        const waterRate = parseFloat(document.getElementById('water-rate-mepo').value) || 0;
        const purchasedMeso = parseFloat(document.getElementById('purchased-meso').value) || 0;

        // 계산
        const cashUsed = mepoRate * purchasedMeso;
        const cashReceived = waterRate * purchasedMeso;
        const profitLoss = cashReceived - cashUsed;
        const profitRate = cashUsed > 0 ? (profitLoss / cashUsed * 100) : 0;

        // 결과 업데이트
        document.getElementById('cash-used-mepo').textContent = `${cashUsed.toLocaleString()}원`;
        document.getElementById('cash-received-mepo').textContent = `${cashReceived.toLocaleString()}원`;

        const profitElement = document.getElementById('profit-loss-mepo');
        profitElement.textContent = `${profitLoss >= 0 ? '+' : ''}${profitLoss.toLocaleString()}원`;

        // 손익에 따른 색상 변경
        if (profitLoss > 0) {
            profitElement.style.color = '#10b981';
        } else if (profitLoss < 0) {
            profitElement.style.color = '#ef4444';
        } else {
            profitElement.style.color = '#6b7280';
        }

        // 수익률
        const profitRateElement = document.getElementById('profit-rate-mepo');
        profitRateElement.textContent = `${profitRate >= 0 ? '+' : ''}${profitRate.toFixed(2)}%`;

        if (profitRate > 0) {
            profitRateElement.style.color = '#10b981';
        } else if (profitRate < 0) {
            profitRateElement.style.color = '#ef4444';
        } else {
            profitRateElement.style.color = '#6b7280';
        }
    }

    // 초기화 버튼
    function reset() {
        document.getElementById('mepo-rate').value = '';
        document.getElementById('water-rate-mepo').value = '';
        document.getElementById('purchased-meso').value = '';

        document.getElementById('cash-used-mepo').textContent = '0원';
        document.getElementById('cash-received-mepo').textContent = '0원';
        document.getElementById('profit-loss-mepo').textContent = '0원';
        document.getElementById('profit-rate-mepo').textContent = '0%';
    }

    // 공개 API
    return {
        initialize: initialize,
        reset: reset
    };
})();

// 전역으로 노출
window.MSMepoCalculating = MSMepoCalculating;
