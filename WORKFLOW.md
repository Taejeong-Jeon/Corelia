# 개발 워크플로우 가이드

## 브랜치 전략

### 브랜치 네이밍 규칙
- `fix/문제-설명` - 버그 수정
- `feature/기능-설명` - 새 기능 추가
- `improve/개선-설명` - 기능 개선

### 예시
- `fix/메포-계산기-사용금액-미표시`
- `feature/MS-메인-총합산-배너`
- `improve/데이터-로딩-성능-개선`

## 커밋 메시지 규칙

### 형식
```
타입: 한글로 작성한 요약

## 변경 내용
- 변경 사항 1
- 변경 사항 2

## 문제 (버그 수정인 경우)
- 문제 설명

## 원인 (버그 수정인 경우)
- 원인 분석

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

### 타입
- `Fix`: 버그 수정
- `Add`: 새 기능 추가
- `Update`: 기존 기능 개선
- `Remove`: 기능 제거
- `Refactor`: 코드 리팩토링
- `Clean`: 불필요한 코드 정리

### 예시
```
Fix: MS 메인 섹션 새로고침 시 데이터 미표시 문제 수정

## 문제
- MS 메뉴 클릭 시에는 총 합산 데이터가 정상 표시
- 새로고침 시에는 데이터가 0원으로 표시

## 원인
- main.js에서 initializePage()가 모듈 초기화 전에 실행
- showSection()이 호출될 때 window.MSAccountBook이 아직 로드되지 않음

## 수정 내용
- initializePage() 호출을 모듈 초기화 이후로 이동
- 버전 업데이트: v1.0.4 → v1.0.5 (패치)

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

## 작업 프로세스

### 1. 브랜치 생성 및 작업
```bash
# 브랜치 생성
git checkout -b fix/문제-설명

# 작업 진행
# 파일 수정...

# 커밋
git add -A
git commit -m "Fix: 문제 수정"

# 원격 푸시
git push -u origin fix/문제-설명
```

### 2. Pull Request 생성
- GitHub에서 PR 생성
- 제목: 한글로 명확하게 작성
- 본문: 문제, 원인, 수정 내용 상세 작성
- 한글 작성 (파일명 제외)

### 3. 로컬 테스트 제공
- `http://localhost:8000` 로컬 서버 실행
- 사용자에게 테스트 요청

### 4. 승인 및 머지
```bash
# main 브랜치로 이동
git checkout main

# 작업 브랜치 머지
git merge fix/문제-설명

# 원격 푸시
git push origin main

# 로컬 브랜치 삭제
git branch -d fix/문제-설명

# 원격 브랜치 삭제
git push origin --delete fix/문제-설명
```

## 버전 관리 규칙

### Semantic Versioning (v{Major}.{Minor}.{Patch})

#### Major 버전 (1.x.x)
- **사용자가 직접 요청할 때만 증가**
- 대규모 변경이나 호환성 깨지는 변경

#### Minor 버전 (x.1.x)
- **새 메뉴 추가**
- 새로운 기능 추가
- 예: MS 메뉴 추가, AI 활용하기 메뉴 추가

#### Patch 버전 (x.x.1)
- **수정 및 개선**
- 버그 수정
- 기존 기능 개선
- 예: 계산기 버그 수정, UI 개선

### 예시
- v1.0.0 → v1.1.0: MS 메뉴 추가 (Minor - 새 메뉴)
- v1.1.0 → v1.1.1: 메포 계산기 버그 수정 (Patch - 수정)
- v1.1.1 → v1.1.2: 데이터 로딩 개선 (Patch - 개선)
- v1.1.2 → v2.0.0: 사용자 요청으로 Major 업데이트

## Git 작업 시 주의사항

### 절대 하지 말 것
- ❌ main 브랜치에 직접 커밋 (작업은 반드시 브랜치에서)
- ❌ force push (`git push --force`)
- ❌ 다른 사람의 커밋 amend
- ❌ PR 없이 머지

### 권장 사항
- ✅ 브랜치 생성 후 작업
- ✅ PR 생성 및 상세 설명 작성
- ✅ 로컬 테스트 후 푸시
- ✅ 승인 후 머지
- ✅ 머지 후 브랜치 삭제

## 문서 작성 규칙

### 모든 내용은 한글로 작성
- 커밋 메시지: 한글
- PR 제목/본문: 한글
- 이슈: 한글
- 문서: 한글

### 예외: 파일명 및 코드
- 파일명: 영문 (예: `index.html`, `style.css`)
- 변수명/함수명: 영문 (예: `updateMSTotalSummary`)
- 주석: 한글 가능

## 참고 링크
- Repository: https://github.com/Taejeong-Jeon/Corelia
- GitHub Pages: https://taejeong-jeon.github.io/Corelia/
