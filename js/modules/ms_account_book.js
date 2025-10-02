// MS 가계부 모듈
const MSAccountBook = (function() {
    // 비공개 변수
    let currentYear = 2025;
    let currentMonth = 10;
    let transactions = [];

    // 거래 유형에 따른 필드 표시/숨김
    function toggleFields() {
        const transactionType = document.getElementById('transaction-type').value;

        // 모든 필드 숨기기
        document.getElementById('charge-fields').style.display = 'none';
        document.getElementById('convert-fields').style.display = 'none';
        document.getElementById('sell-fields').style.display = 'none';

        // 선택된 유형에 따라 필드 표시
        if (transactionType === 'charge') {
            document.getElementById('charge-fields').style.display = 'block';
            document.getElementById('charge-amount').required = true;
        } else if (transactionType === 'convert') {
            document.getElementById('convert-fields').style.display = 'block';
            document.getElementById('ms-account-mepo-rate').required = true;
            document.getElementById('meso-amount').required = true;
        } else if (transactionType === 'sell') {
            document.getElementById('sell-fields').style.display = 'block';
            document.getElementById('water-rate').required = true;
            document.getElementById('sell-meso').required = true;
        }

        // 다른 필드들의 required 해제
        document.getElementById('charge-amount').required = false;
        document.getElementById('ms-account-mepo-rate').required = false;
        document.getElementById('meso-amount').required = false;
        document.getElementById('water-rate').required = false;
        document.getElementById('sell-meso').required = false;
    }

    // 총 합산 업데이트
    function updateTotalSummary() {
        // 전체 거래 데이터 계산 (월별 제한 없음)
        const totalCharge = transactions
            .filter(t => t.type === 'charge')
            .reduce((sum, t) => sum + (parseInt(t.chargeAmount) || 0), 0);

        const totalSales = transactions
            .filter(t => t.type === 'sell')
            .reduce((sum, t) => sum + (parseInt(t.salesAmount) || 0), 0);

        const totalProfit = totalSales - totalCharge;

        // 총합 요약 업데이트 (MS 가계부 섹션)
        document.getElementById('total-charge-summary').textContent = `${totalCharge.toLocaleString()}원`;
        document.getElementById('total-sales-summary').textContent = `${totalSales.toLocaleString()}원`;

        const profitElement = document.getElementById('total-profit-summary');
        profitElement.textContent = `${totalProfit >= 0 ? '+' : ''}${totalProfit.toLocaleString()}원`;

        // 손익에 따른 색상 변경
        if (totalProfit > 0) {
            profitElement.style.color = '#28a745'; // 초록색 (수익)
        } else if (totalProfit < 0) {
            profitElement.style.color = '#dc3545'; // 빨간색 (손해)
        } else {
            profitElement.style.color = '#6c757d'; // 회색 (손익 없음)
        }
    }

    async function updateMSTotalSummary() {
        // Google Sheets에서 데이터 먼저 로드
        try {
            const sheetsData = await GoogleSheets.getAll();
            if (sheetsData && sheetsData.length > 0) {
                const sheetsTransactions = sheetsData.map(t => {
                    const formattedDate = t.date ? new Date(t.date).toISOString().split('T')[0] : '';

                    const safeInt = (val) => {
                        if (val === null || val === undefined || val === '') return undefined;
                        const num = parseInt(val);
                        return isNaN(num) ? undefined : num;
                    };

                    const safeFloat = (val) => {
                        if (val === null || val === undefined || val === '') return undefined;
                        const num = parseFloat(val);
                        return isNaN(num) ? undefined : num;
                    };

                    return {
                        id: String(t.id || ''),
                        date: formattedDate,
                        type: String(t.type || ''),
                        memo: String(t.memo || ''),
                        chargeAmount: safeInt(t.chargeAmount),
                        mepoRate: safeInt(t.mepoRate),
                        mesoAmount: safeFloat(t.mesoAmount),
                        convertCost: safeInt(t.convertCost),
                        waterRate: safeInt(t.waterRate),
                        sellMeso: safeFloat(t.sellMeso),
                        salesAmount: safeInt(t.salesAmount)
                    };
                });

                transactions = sheetsTransactions;
                localStorage.setItem('ms-transactions', JSON.stringify(transactions));
            }
        } catch (error) {
            console.error('Google Sheets 로드 실패:', error);
        }

        // 전체 거래 데이터 계산 (월별 제한 없음)
        console.log('MS 메인 섹션 - transactions:', transactions);

        const totalCharge = transactions
            .filter(t => t.type === 'charge')
            .reduce((sum, t) => sum + (parseInt(t.chargeAmount) || 0), 0);

        const totalSales = transactions
            .filter(t => t.type === 'sell')
            .reduce((sum, t) => sum + (parseInt(t.salesAmount) || 0), 0);

        console.log('MS 메인 섹션 - 총 충전:', totalCharge, '총 판매:', totalSales);

        const totalProfit = totalSales - totalCharge;

        // 총합 요약 업데이트 (MS 메인 섹션)
        document.getElementById('ms-total-charge-summary').textContent = `${totalCharge.toLocaleString()}원`;
        document.getElementById('ms-total-sales-summary').textContent = `${totalSales.toLocaleString()}원`;

        const profitElement = document.getElementById('ms-total-profit-summary');
        profitElement.textContent = `${totalProfit >= 0 ? '+' : ''}${totalProfit.toLocaleString()}원`;

        // 손익에 따른 색상 변경
        if (totalProfit > 0) {
            profitElement.style.color = '#28a745'; // 초록색 (수익)
        } else if (totalProfit < 0) {
            profitElement.style.color = '#dc3545'; // 빨간색 (손해)
        } else {
            profitElement.style.color = '#6c757d'; // 회색 (손익 없음)
        }
    }

    // MS 가계부 초기화
    function initialize() {
        // 오늘 날짜를 기본값으로 설정
        document.getElementById('transaction-date').value = new Date().toISOString().split('T')[0];

        // 폼 제출 이벤트 리스너
        document.getElementById('transaction-form').addEventListener('submit', handleTransactionSubmit);

        // 먼저 로컬 스토리지에서 데이터 로드
        const localData = localStorage.getItem('ms-transactions');
        if (localData) {
            try {
                transactions = JSON.parse(localData);
                console.log('로컬 데이터 로드 성공:', transactions);
                updateDashboard();
            } catch (error) {
                console.error('로컬 데이터 파싱 실패:', error);
                transactions = [];
            }
        }

        // Google Sheets에서 데이터 로드 시도
        loadTransactions();
    }

    // Google Sheets에서 거래 데이터 로드
    async function loadTransactions() {
        // 먼저 로컬 스토리지에서 데이터 로드하여 즉시 표시
        const localData = localStorage.getItem('ms-transactions');
        if (localData) {
            try {
                transactions = JSON.parse(localData);
                console.log('로컬 데이터 먼저 표시:', transactions);
                updateDashboard();
            } catch (error) {
                console.error('로컬 데이터 파싱 실패:', error);
                transactions = [];
            }
        }

        // 백그라운드에서 Google Sheets 데이터 로드
        try {
            const data = await GoogleSheets.load();

            // Google Sheets에 데이터가 있으면 사용
            if (data && Array.isArray(data) && data.length > 0) {
                // 데이터 정제: undefined나 빈 값 제거
                const sheetsTransactions = data.filter(t => t && t.id && t.date && t.type).map(t => {
                    // 날짜 형식 변환 (ISO 형식 -> YYYY-MM-DD)
                    let formattedDate = String(t.date || '');

                    // ISO 형식이거나 Date 객체인 경우 변환
                    if (formattedDate.includes('T') || formattedDate.includes('Z')) {
                        try {
                            const dateObj = new Date(formattedDate);
                            const year = dateObj.getFullYear();
                            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
                            const day = String(dateObj.getDate()).padStart(2, '0');
                            formattedDate = `${year}-${month}-${day}`;
                        } catch (e) {
                            console.error('날짜 변환 실패:', formattedDate, e);
                        }
                    }

                    // 안전한 값 변환
                    const safeInt = (val) => {
                        if (val === null || val === undefined || val === '') return undefined;
                        const num = parseInt(val);
                        return isNaN(num) ? undefined : num;
                    };

                    const safeFloat = (val) => {
                        if (val === null || val === undefined || val === '') return undefined;
                        const num = parseFloat(val);
                        return isNaN(num) ? undefined : num;
                    };

                    return {
                        id: String(t.id || ''),
                        date: formattedDate,
                        type: String(t.type || ''),
                        memo: String(t.memo || ''),
                        chargeAmount: safeInt(t.chargeAmount),
                        mepoRate: safeInt(t.mepoRate),
                        mesoAmount: safeFloat(t.mesoAmount),
                        convertCost: safeInt(t.convertCost),
                        waterRate: safeInt(t.waterRate),
                        sellMeso: safeFloat(t.sellMeso),
                        salesAmount: safeInt(t.salesAmount)
                    };
                });

                // Google Sheets 데이터로 업데이트
                transactions = sheetsTransactions;
                localStorage.setItem('ms-transactions', JSON.stringify(transactions));
                console.log('Google Sheets 데이터로 업데이트:', transactions);
                updateDashboard();
            } else {
                console.log('Google Sheets가 비어있음');
            }
        } catch (error) {
            console.error('Google Sheets 로드 실패:', error);
            console.log('로컬 데이터 계속 사용');
        }
    }

    // Google Sheets에 거래 데이터 저장
    async function saveTransaction(transaction) {
        console.log('데이터 저장 시작:', transaction);

        // 로컬에 먼저 저장
        const newTransaction = {
            ...transaction,
            id: Date.now().toString()
        };
        transactions.push(newTransaction);
        localStorage.setItem('ms-transactions', JSON.stringify(transactions));
        updateDashboard();

        // Google Sheets에 백그라운드로 저장
        await GoogleSheets.save(newTransaction);

        alert('저장되었습니다!');
    }

    // 월 변경 함수
    function changeMonth(direction) {
        currentMonth += direction;

        if (currentMonth > 12) {
            currentMonth = 1;
            currentYear++;
        } else if (currentMonth < 1) {
            currentMonth = 12;
            currentYear--;
        }

        updateMonthDisplay();
        updateDashboard();
    }

    // 월 표시 업데이트
    function updateMonthDisplay() {
        document.getElementById('current-month').textContent = `${currentYear}년 ${currentMonth}월`;
    }

    // 대시보드 업데이트
    function updateDashboard() {
        const monthTransactions = transactions.filter(t => {
            const date = new Date(t.date);
            return date.getFullYear() === currentYear && date.getMonth() + 1 === currentMonth;
        });

        // 충전 총액
        const totalCharge = monthTransactions
            .filter(t => t.type === 'charge')
            .reduce((sum, t) => sum + (parseInt(t.chargeAmount) || 0), 0);

        // 판매 총 금액
        const totalSales = monthTransactions
            .filter(t => t.type === 'sell')
            .reduce((sum, t) => sum + (parseInt(t.salesAmount) || 0), 0);

        // 손익 계산
        const profitLoss = totalSales - totalCharge;

        document.getElementById('total-charge').textContent = `${totalCharge.toLocaleString()}원`;
        document.getElementById('total-sales').textContent = `${totalSales.toLocaleString()}원`;

        const profitLossElement = document.getElementById('profit-loss');
        profitLossElement.textContent = `${profitLoss.toLocaleString()}원`;

        // 손익에 따른 색상 변경
        if (profitLoss > 0) {
            profitLossElement.style.color = '#007bff';
        } else if (profitLoss < 0) {
            profitLossElement.style.color = '#dc3545';
        } else {
            profitLossElement.style.color = '#6c757d';
        }

        updateTransactionTable();
        updateTotalSummary();
    }

    // 거래 제출 처리
    async function handleTransactionSubmit(e) {
        e.preventDefault();

        const transactionType = document.getElementById('transaction-type').value;
        const date = document.getElementById('transaction-date').value;
        const memo = document.getElementById('memo').value || '';

        let transaction = {
            id: Date.now().toString(),
            date: date,
            type: transactionType,
            memo: memo
        };

        if (transactionType === 'charge') {
            transaction.chargeAmount = parseInt(document.getElementById('charge-amount').value);
        } else if (transactionType === 'convert') {
            transaction.mepoRate = parseInt(document.getElementById('ms-account-mepo-rate').value);
            transaction.mesoAmount = parseFloat(document.getElementById('meso-amount').value);
            transaction.convertCost = transaction.mepoRate * transaction.mesoAmount;
        } else if (transactionType === 'sell') {
            transaction.waterRate = parseInt(document.getElementById('water-rate').value);
            transaction.sellMeso = parseFloat(document.getElementById('sell-meso').value);
            transaction.salesAmount = transaction.waterRate * transaction.sellMeso;
        }

        await saveTransaction(transaction);

        // 폼 초기화
        document.getElementById('transaction-form').reset();
        document.getElementById('transaction-date').value = new Date().toISOString().split('T')[0];
    }

    // 거래 테이블 업데이트
    function updateTransactionTable() {
        const tbody = document.getElementById('transaction-tbody');
        tbody.innerHTML = '';

        const monthTransactions = transactions.filter(t => {
            const date = new Date(t.date);
            return date.getFullYear() === currentYear && date.getMonth() + 1 === currentMonth;
        });

        monthTransactions.forEach(transaction => {
            const row = document.createElement('tr');
            let typeIcon, typeText, amountText, rateText, resultText, resultColor;

            if (transaction.type === 'charge') {
                typeIcon = '💰';
                typeText = '충전';
                amountText = `${parseInt(transaction.chargeAmount).toLocaleString()}원`;
                rateText = '-';
                resultText = '현금 충전';
                resultColor = '#6c757d';
            } else if (transaction.type === 'convert') {
                typeIcon = '🔄';
                typeText = '전환';
                amountText = `${transaction.mesoAmount}억 메소`;
                rateText = `${transaction.mepoRate.toLocaleString()}원/1억`;
                resultText = `${parseInt(transaction.convertCost).toLocaleString()}원 지출`;
                resultColor = '#ffc107';
            } else if (transaction.type === 'sell') {
                typeIcon = '💸';
                typeText = '판매';
                amountText = `${transaction.sellMeso}억 메소`;
                rateText = `${transaction.waterRate.toLocaleString()}원/1억`;
                resultText = `${parseInt(transaction.salesAmount).toLocaleString()}원 수입`;
                resultColor = '#28a745';
            }

            row.innerHTML = `
                <td>${transaction.date}</td>
                <td><span class="type-icon">${typeIcon}</span> ${typeText}</td>
                <td>${amountText}</td>
                <td>${rateText}</td>
                <td style="color: ${resultColor}">${resultText}</td>
                <td>${transaction.memo || '-'}</td>
                <td>
                    <button onclick="MSAccountBook.deleteTransaction('${transaction.id}')" class="delete-btn">삭제</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    // 거래 삭제
    async function deleteTransaction(id) {
        if (confirm('정말 삭제하시겠습니까?')) {
            try {
                const targetId = String(id);

                // 로컬에서 삭제
                transactions = transactions.filter(t => String(t.id) !== targetId);
                localStorage.setItem('ms-transactions', JSON.stringify(transactions));
                updateDashboard();

                // Google Sheets에서 삭제
                await GoogleSheets.remove(targetId);

                alert('거래가 삭제되었습니다!');
            } catch (error) {
                console.error('삭제 실패:', error);
                alert('삭제 중 오류가 발생했습니다.');
            }
        }
    }

    // 공개 API
    return {
        initialize: initialize,
        loadTransactions: loadTransactions,
        changeMonth: changeMonth,
        toggleFields: toggleFields,
        deleteTransaction: deleteTransaction,
        updateMSTotalSummary: updateMSTotalSummary
    };
})();

// 전역으로 노출
window.MSAccountBook = MSAccountBook;
