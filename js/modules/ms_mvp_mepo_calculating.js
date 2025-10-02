const MSMepoCalculating = (function() {
    let isInitialized = false;

    function initialize() {
        if (isInitialized) return;

        const inputs = document.querySelectorAll('#ms-mepo-calculating input');
        if (inputs.length === 0) return; // 요소가 없으면 종료

        inputs.forEach(input => {
            input.addEventListener('input', calculate);
        });
        isInitialized = true;
        calculate();
    }

    function calculate() {
        // 입력값 가져오기
        const mepoRateInput = document.getElementById('mepo-rate');
        const waterRateInput = document.getElementById('water-rate-mepo');
        const purchasedMesoInput = document.getElementById('purchased-meso');

        if (!mepoRateInput || !waterRateInput || !purchasedMesoInput) return;

        const mepoRate = parseFloat(mepoRateInput.value) || 0; // 메포 시세 (1억당 원)
        const waterRate = parseFloat(waterRateInput.value) || 0; // 물통 시세 (1억당 원)
        const purchasedMeso = parseFloat(purchasedMesoInput.value) || 0; // 구매한 메소 (억)

        // 계산
        const cashUsed = (purchasedMeso * mepoRate); // 사용한 캐시 (원)
        const cashReceived = (purchasedMeso * waterRate); // 받은 캐시 (원)
        const profitLoss = cashReceived - cashUsed; // 손익 (원)
        const profitRate = cashUsed > 0 ? ((profitLoss / cashUsed) * 100) : 0; // 수익률 (%)

        // 결과 업데이트
        const cashUsedElement = document.getElementById('cash-used-mepo');
        const cashReceivedElement = document.getElementById('cash-received-mepo');
        const profitLossElement = document.getElementById('profit-loss-mepo');
        const profitRateElement = document.getElementById('profit-rate-mepo');

        if (!cashUsedElement || !cashReceivedElement || !profitLossElement || !profitRateElement) return;

        cashUsedElement.textContent = cashUsed.toLocaleString('ko-KR') + '원';
        cashReceivedElement.textContent = cashReceived.toLocaleString('ko-KR') + '원';
        profitLossElement.textContent = profitLoss.toLocaleString('ko-KR') + '원';

        if (profitLoss > 0) {
            profitLossElement.style.color = '#10b981';
        } else if (profitLoss < 0) {
            profitLossElement.style.color = '#ef4444';
        } else {
            profitLossElement.style.color = '#6b7280';
        }

        profitRateElement.textContent = profitRate.toFixed(2) + '%';
        if (profitRate > 0) {
            profitRateElement.style.color = '#10b981';
        } else if (profitRate < 0) {
            profitRateElement.style.color = '#ef4444';
        } else {
            profitRateElement.style.color = '#6b7280';
        }
    }

    return {
        initialize: initialize
    };
})();
