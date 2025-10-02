// MVP작 계산기 모듈
const MSCalculatingMachine = (function() {

    function initialize() {
        console.log('MVP작 계산기 모듈 초기화');

        // 입력 필드 이벤트 리스너
        const cashAmount = document.getElementById('cash-amount');
        const purchaseQuantity = document.getElementById('purchase-quantity');
        const sellingMesoPerItem = document.getElementById('selling-meso-per-item');
        const waterRate = document.getElementById('water-rate-calc');

        if (cashAmount) {
            cashAmount.addEventListener('input', calculate);
        }
        if (purchaseQuantity) {
            purchaseQuantity.addEventListener('input', calculate);
        }
        if (sellingMesoPerItem) {
            sellingMesoPerItem.addEventListener('input', calculate);
        }
        if (waterRate) {
            waterRate.addEventListener('input', calculate);
        }
    }

    // 계산 함수
    function calculate() {
        // 입력값 가져오기
        const cashAmount = parseFloat(document.getElementById('cash-amount').value) || 0;
        const purchaseQuantity = parseFloat(document.getElementById('purchase-quantity').value) || 0;
        const sellingMesoPerItem = parseFloat(document.getElementById('selling-meso-per-item').value) || 0;
        const waterRate = parseFloat(document.getElementById('water-rate-calc').value) || 0;

        // 총 사용 캐시 계산
        const totalCash = cashAmount * purchaseQuantity;
        document.getElementById('total-cash-used').textContent = `${totalCash.toLocaleString()}원`;

        // 총 판매 메소 계산
        const totalMeso = sellingMesoPerItem * purchaseQuantity;
        document.getElementById('total-meso-sold').textContent = `${totalMeso.toLocaleString()}억 메소`;

        // 현금 환산 (물통 시세 적용)
        const cashReceived = totalMeso * waterRate;
        document.getElementById('cash-received').textContent = `${cashReceived.toLocaleString()}원`;

        // 손익 계산
        const profitLoss = cashReceived - totalCash;
        const profitElement = document.getElementById('profit-loss-calc');
        profitElement.textContent = `${profitLoss >= 0 ? '+' : ''}${profitLoss.toLocaleString()}원`;

        // 손익에 따른 색상 변경
        if (profitLoss > 0) {
            profitElement.style.color = '#28a745'; // 초록색 (수익)
        } else if (profitLoss < 0) {
            profitElement.style.color = '#dc3545'; // 빨간색 (손해)
        } else {
            profitElement.style.color = '#6c757d'; // 회색 (손익 없음)
        }

        // 수익률 계산
        if (totalCash > 0) {
            const profitRate = (profitLoss / totalCash * 100).toFixed(2);
            document.getElementById('profit-rate').textContent = `${profitRate >= 0 ? '+' : ''}${profitRate}%`;
        } else {
            document.getElementById('profit-rate').textContent = '0%';
        }
    }

    // 초기화 버튼
    function reset() {
        document.getElementById('cash-amount').value = '';
        document.getElementById('purchase-quantity').value = '';
        document.getElementById('selling-meso-per-item').value = '';
        document.getElementById('water-rate-calc').value = '';

        document.getElementById('total-cash-used').textContent = '0원';
        document.getElementById('total-meso-sold').textContent = '0억 메소';
        document.getElementById('cash-received').textContent = '0원';
        document.getElementById('profit-loss-calc').textContent = '0원';
        document.getElementById('profit-rate').textContent = '0%';
    }

    // 공개 API
    return {
        initialize: initialize,
        calculate: calculate,
        reset: reset
    };
})();

// 전역으로 노출
window.MSCalculatingMachine = MSCalculatingMachine;
