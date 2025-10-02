// Google Sheets API 유틸리티
const GoogleSheets = (function() {
    const API_URL = 'https://script.google.com/macros/s/AKfycby2GMpA4MUQ5wQGOdAAHXlQK9ZXw45QTEd8Xu0JtRCA_K3dJLReF09XsMemXaF1MRTYNA/exec';

    // 데이터 로드
    async function load() {
        try {
            console.log('Google Sheets 데이터 로드 시작...');
            const response = await fetch(API_URL);
            console.log('응답 상태:', response.status);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Google Sheets에서 로드된 데이터:', data);

            return data;
        } catch (error) {
            console.error('Google Sheets 로드 실패:', error);
            throw error;
        }
    }

    // 데이터 저장
    async function save(data) {
        try {
            console.log('Google Sheets 저장 시작:', data);

            fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: JSON.stringify(data)
            }).then(() => {
                console.log('Google Sheets 저장 요청 완료');
            }).catch(error => {
                console.log('Google Sheets 저장 요청 실패 (무시됨):', error);
            });

            return true;
        } catch (error) {
            console.error('Google Sheets 저장 실패:', error);
            throw error;
        }
    }

    // 데이터 삭제
    async function remove(id) {
        try {
            console.log('Google Sheets 삭제 시작:', id);

            fetch(`${API_URL}?action=delete&id=${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain',
                }
            }).then(() => {
                console.log('Google Sheets 삭제 요청 완료');
            }).catch(error => {
                console.log('Google Sheets 삭제 요청 실패 (무시됨):', error);
            });

            return true;
        } catch (error) {
            console.error('Google Sheets 삭제 실패:', error);
            throw error;
        }
    }

    // 공개 API
    return {
        load: load,
        save: save,
        remove: remove
    };
})();

// 전역으로 노출
window.GoogleSheets = GoogleSheets;
