# 모잇 웹

혼자도 같이도, 오늘 뭐 먹을지 30초 안에 정하는 서비스 **모잇(MOEAT)**의 웹 애플리케이션입니다.

## 기술 구성

- Next.js
- TypeScript
- Tailwind CSS

## 로컬 실행

먼저 `moeat-server`를 8080 포트에서 실행한 뒤 다음 명령을 사용합니다.

```bash
npm install
cp .env.example .env.local
npm run dev
```

웹은 `http://localhost:3000`에서 열립니다.

## 검사

```bash
npm run format:check
npm run lint
npm run typecheck
npm test
npm run build
```
