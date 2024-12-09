# nextjs-ai-video-generator

[유튜브 URL](https://www.youtube.com/watch?v=eMplIjZ80Zs&list=PLaBeGKL1tOU3Gl_x2EzOMPPpAWq9znZWt&index=1)

- npx shadcn@latest init

- NEON : Postgre DB + drizzle ORM

## configs : DB설정

./configs/db.ts
./configs/schema.ts
./drizzle.config.ts

### script 추가

- "db:push": "drizzle-kit push" : 스키마 사이트에 적용
- "db:studio": "drizzle-kit studio" 실행 후 표시되는 URL접속하면 스키마 및 데이터 조회 가능

## Authentication

사용자 관리

Clerk 사이트 : 10,000건까지는 공짜

next-auth ; 카카오 포함되므로 이걸 써야함.

### 폰트 변경

/app/layout.tsx

### 컬러셋 설정 변경

root folder ./tailwind.config.ts

### 아이콘

lucide icon : 일반 아이콘 등등

- npm i lucide-react

flaticon : 스피너 등등

### 구글 제미니

- ai.google.dev

- 프롬프트
  Write a script to generate 30 seconds video on topic : interesting historical story along with AI image prompt in Realistic format for each scene and give me result in JSON format with imagePrompt and Content Text as field.

### TTS (text to speach)

Google Cloud > console > text to speach

- npm install @google-cloud/text-to-speech

### audio mp3 저장 : Firebase

### Captions : Speech to Text

Assembly AI

- npm install assemblyai

  Free 50,000 video caption of 30sec video
  or
  Free 25,000 video caption of 60sec video

### Image AI

replicate.com

bytedance/sdxl-lightning-4step 이미지 생성 AI
714건/1달러

### 비디오 + 오디오 재생

// 프로젝트 생성부터

- npx create-video@latest --next // remotion lib

// 라이브러리 추가할 때

- npm i --save-exact remotion@4.0.236 @remotion/cli@4.0.236
- npm i @remotion/eslint-plugin
