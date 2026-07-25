# 브랜치 및 커밋 전략

## 브랜치

- `main`: 항상 배포 가능한 보호 브랜치
- `feat/<name>`: 기능 개발
- `fix/<name>`: 버그 수정
- `refactor/<name>`: 동작 변경 없는 구조 개선
- `chore/<name>`: 설정과 도구 변경

작업 브랜치는 최신 `main`에서 생성하고 Pull Request 검증 후 병합합니다. 병합이 끝난 브랜치는 삭제합니다.

## 커밋

Conventional Commits 형식을 사용합니다.

- `feat(scope): 새로운 기능`
- `fix(scope): 사용자에게 영향을 주는 오류 수정`
- `refactor(scope): 구조 개선`
- `chore(scope): 빌드 및 설정 변경`
- `test(scope): 테스트 추가 또는 변경`
- `docs(scope): 문서 변경`

커밋 하나에는 하나의 논리적 변경만 포함하며, 포맷 변경과 기능 변경을 섞지 않습니다.

## Pull Request

PR에는 변경 이유, 영향 범위, 검증 명령을 작성합니다. CI가 통과하고 리뷰가 끝난 뒤 커밋 이력을 보존하는 방식으로 `main`에 병합합니다.
