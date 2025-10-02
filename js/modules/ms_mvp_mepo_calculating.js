const MSMepoCalculating = (function() {
    function initialize() {
        const inputs = document.querySelectorAll('#ms-mepo-calculating input');
        inputs.forEach(input => {
            input.addEventListener('input', calculate);
        });
        calculate();
    }

    function calculate() {
        // 입력값 가져오기
        const mepoRate = parseFloat(document.getElementById('mepo-rate').value) || 0; // 메포 시세 (1억당 원)
        const waterRate = parseFloat(document.getElementById('water-rate-mepo').value) || 0; // 물통 시세 (1억당 원)
        const purchasedMeso = parseFloat(document.getElementById('purchased-meso').value) || 0; // 구매한 메소 (억)

        // 계산
        const cashUsed = (purchasedMeso * mepoRate); // 사용한 캐시 (원)
        const cashReceived = (purchasedMeso * waterRate); // 받은 캐시 (원)
        const profitLoss = cashReceived - cashUsed; // 손익 (원)
        const profitRate = cashUsed > 0 ? ((profitLoss / cashUsed) * 100) : 0; // 수익률 (%)

        // 결과 업데이트
        document.getElementById('cash-used-mepo').textContent = cashUsed.toLocaleString('ko-KR') + '원';
        document.getElementById('cash-received-mepo').textContent = cashReceived.toLocaleString('ko-KR') + '원';
        document.getElementById('profit-loss-mepo').textContent = profitLoss.toLocaleString('ko-KR') + '원';

        const profitLossElement = document.getElementById('profit-loss-mepo');
        if (profitLoss > 0) {
            profitLossElement.style.color = '#10b981';
        } else if (profitLoss < 0) {
            profitLossElement.style.color = '#ef4444';
        } else {
            profitLossElement.style.color = '#6b7280';
        }

        document.getElementById('profit-rate-mepo').textContent = profitRate.toFixed(2) + '%';
        const profitRateElement = document.getElementById('profit-rate-mepo');
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
