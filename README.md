## Sloweat 🥗

멋쟁이사자처럼 (세미프로젝트)
Spring Boot + React 기반의 유료 구독형 식단 SNS 플랫폼입니다.
사용자는 식단을 공유하고 유료 구독을 통해 다른 유저의 식단을 구독할 수 있습니다.

### 🚀 Tech Stack
- Backend: Java 21, Spring Boot 3.5.3, JPA (Hibernate), MySQL
- Frontend: React.js, Axios

### 📁 프로젝트 구조
root/
├── backend/sloweat
│ ├── src/main/java/com/example/sloweat/
│ │ ├── domain/ (entity, dto, controller, service, repository)
│ │ ├── common/ (util, exception)
│ │ └── global/ (interceptor, filter)
├── frontend/
│ ├── public/
│ └── src/
│ ├── components/
│ ├── pages/
│ └── api/

---
## 🌿 Git Branch 전략

우리 프로젝트는 Git Flow 전략을 간소화한 형태로 브랜치를 관리합니다.  
주요 브랜치는 아래와 같이 구성됩니다:

### 📌 브랜치 종류

| 브랜치 | 설명 |
|--------|------|
| **main** | 실제 운영(배포)에 사용되는 브랜치 |
| **develop** | 개발용 통합 브랜치 (모든 기능 브랜치는 여기로 병합) |
| **feature/** | 단위 기능 개발 브랜치 (ex: feature/signup-api) |


### 🔄 브랜치 흐름 예시

```text
main ← develop ← feature
```
### 🛠 브랜치 이름 규칙
- 기능 개발: feature/{기능명}
- 예: feature/login-api, feature/user-profile

### 작업 방침 및 Pull Request
1. 모든 작업은 develop에서 파생된 feature 브랜치에서 진행
2. 기능 개발 완료 후 develop에 Pull Request (PR) 생성
3. PR은 최소 1명 이상의 코드 리뷰 후 병합

### ✏️ 예시 작업 흐름

```text
# 1. 로컬 develop 최신화
git checkout develop
git pull origin develop

# 2. 기능 브랜치 생성
git checkout -b feature/login-api

# 3. 작업 및 커밋 후 push
git push origin feature/login-api

# 4. GitHub에서 PR 생성 → 리뷰 후 develop에 merge
```

--- 
## 📝 Git Commit Convention

- 커밋 형식: `<type>: <subject>`
- 타입 예시: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`
- 예시: `feat: 식단 공유 기능 추가`


### ✅ 커밋 타입 (type)

| 타입 | 설명 |
|------|------|
| **feat** : 새로운 기능 추가
| **fix** : 버그 수정
| **docs** : 문서 수정 (README, API 명세 등)
| **style** : 코드 포맷팅, 세미콜론 누락 등 (로직 변경 없음)
| **refactor** : 코드 리팩토링 (기능 변경 없이 구조 개선)
| **test** : 테스트 코드 추가 또는 수정
| **chore** : 빌드, 패키지 매니저 설정 등 기타 변경
| **perf** : 성능 개선
| **ci** : CI/CD 관련 설정 수정