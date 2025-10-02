// MVP작 계산기(메포) 모듈
const MSMepoCalculating = (function() {

    function initialize() {
        // 입력 필드 이벤트 리스너
        const inputMepoRate = document.getElementById('mepo-rate');
        const inputWaterRate = document.getElementById('water-rate-mepo');
        const inputPurchasedMeso = document.getElementById('purchased-meso');

        if (inputMepoRate) {
            inputMepoRate.addEventListener('input', calculate);
        }

        if (inputWaterRate) {
            inputWaterRate.addEventListener('input', calculate);
        }

        if (inputPurchasedMeso) {
            inputPurchasedMeso.addEventListener('input', calculate);
        }
    }

    // 계산 함수
    function calculate() {
        // 입력값 가져오기
        const mepoRate = parseFloat(document.getElementById('mepo-rate').value) || 0;
        const waterRate = parseFloat(document.getElementById('water-rate-mepo').value) || 0;
        const purchasedMeso = parseFloat(document.getElementById('purchased-meso').value) || 0;

        // 사용 금액 = 메포 시세 × 구매한 메소
        const cashUsed = mepoRate * purchasedMeso;
        document.getElementById('cash-used-mepo').textContent = `${cashUsed.toLocaleString()}원`;

        // 판매 금액 = 물통 시세 × 구매한 메소
        const cashReceived = waterRate * purchasedMeso;
        document.getElementById('cash-received-mepo').textContent = `${cashReceived.toLocaleString()}원`;

        // 손익 계산
        const profitLoss = cashReceived - cashUsed;
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

        // 수익률 계산
        if (cashUsed > 0) {
            const profitRate = (profitLoss / cashUsed * 100).toFixed(2);
            document.getElementById('profit-rate-mepo').textContent = `${profitRate >= 0 ? '+' : ''}${profitRate}%`;
        } else {
            document.getElementById('profit-rate-mepo').textContent = '0%';
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
        calculate: calculate,
        reset: reset
    };
})();

// 전역으로 노출
window.MSMepoCalculating = MSMepoCalculating;
