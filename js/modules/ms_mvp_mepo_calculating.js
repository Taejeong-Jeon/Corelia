const MSMepoCalculating = (function() {
    let isInitialized = false;

    function initialize() {
        console.log('MSMepoCalculating initialize called');
        const inputs = document.querySelectorAll('#ms-mepo-calculating input');
        console.log('Found inputs:', inputs.length);

        if (inputs.length === 0) {
            console.log('No inputs found, returning');
            return;
        }

        if (!isInitialized) {
            console.log('Adding event listeners');
            inputs.forEach(input => {
                input.addEventListener('input', calculate);
            });
            isInitialized = true;
        }
        calculate();
    }

    function calculate() {
        console.log('MSMepoCalculating calculate called');

        // 입력값 가져오기
        const mepoRateInput = document.getElementById('mepo-rate');
        const waterRateInput = document.getElementById('water-rate-mepo');
        const purchasedMesoInput = document.getElementById('purchased-meso');

        console.log('Input elements:', {
            mepoRate: mepoRateInput,
            waterRate: waterRateInput,
            purchasedMeso: purchasedMesoInput
        });

        if (!mepoRateInput || !waterRateInput || !purchasedMesoInput) {
            console.log('Missing input elements');
            return;
        }

        const mepoRate = parseFloat(mepoRateInput.value) || 0;
        const waterRate = parseFloat(waterRateInput.value) || 0;
        const purchasedMeso = parseFloat(purchasedMesoInput.value) || 0;

        console.log('Input values:', { mepoRate, waterRate, purchasedMeso });

        // 계산
        const cashUsed = purchasedMeso * mepoRate;
        const cashReceived = purchasedMeso * waterRate;
        const profitLoss = cashReceived - cashUsed;
        const profitRate = cashUsed > 0 ? ((profitLoss / cashUsed) * 100) : 0;

        console.log('Calculated values:', { cashUsed, cashReceived, profitLoss, profitRate });

        // 결과 업데이트
        const cashUsedElement = document.getElementById('cash-used-mepo');
        const cashReceivedElement = document.getElementById('cash-received-mepo');
        const profitLossElement = document.getElementById('profit-loss-mepo');
        const profitRateElement = document.getElementById('profit-rate-mepo');

        console.log('Output elements:', {
            cashUsed: cashUsedElement,
            cashReceived: cashReceivedElement,
            profitLoss: profitLossElement,
            profitRate: profitRateElement
        });

        if (!cashUsedElement || !cashReceivedElement || !profitLossElement || !profitRateElement) {
            console.log('Missing output elements');
            return;
        }

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

        console.log('Display updated successfully');
    }

    return {
        initialize: initialize
    };
})();

// 전역으로 노출
window.MSMepoCalculating = MSMepoCalculating;
