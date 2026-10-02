# My AI Life (나의 AI 인생 시뮬레이터)

**My AI Life**는 사용자의 선택과 AI 동반자의 조언을 통해 인생의 여러 갈림길을 체험하는 인터랙티브 웹 시뮬레이션 프로젝트입니다. 사용자는 연령대별(10대~50대) 선택을 내리고, 현실 데이터와 AI의 극효율 권고를 비교하면서 자신의 가치관과 선택의 결과를 함께 살펴볼 수 있습니다.

---

## 🌐 웹 서비스 바로가기 (배포 주소)
- **GitHub Pages**: [https://min8309.github.io/my_ai_life/](https://min8309.github.io/my_ai_life/)
- **로컬 실행**: `http://localhost:8000` (로컬 서버 구동 시)

---

## 📌 주요 특징 및 기능

### 1. 🧬 라이프 시뮬레이션 & 나비효과
- 10대부터 50대까지의 생애 전환점별 분기점 탐험
- 6대 라이프 지표(자산, 커리어, 역량, 관계, 여유, 웰빙) 실시간 반영
- 나비효과 큐 시스템으로 과거의 선택이 10~20년 뒤 미래에 예측 불가능한 결과로 발동

### 2. 🤖 진화형 AI 동반자 (AI Companion)
- AI가 계산한 극효율 경로 및 통계적 이유 실시간 추천
- 연령대에 따른 AI 페르소나 진화: **Optimizer**(10~20대) ➔ **Challenger**(30~40대) ➔ **Reflector**(50대)
- AI 추천 수용률, 선택 번복률, 가치관 통계 제공

### 3. 🌌 AI 평행우주 듀얼 비교 리포트
- 내가 선택한 인생 vs AI의 극효율 권고만을 100% 따른 평행세계의 삶 듀얼 차트 비교
- 가치관 분석 및 연령대별 선택 타임라인 시각화
- OSMU 스튜디오: 나의 인생 궤적을 웹툰 콘티, 60초 숏폼 대본, 영상 프롬프트로 자동 변환

---

## 🧠 주요 핵심 모듈

1. **`js/engine/LifeEngine.js`**: 6대 지표 계산, 가치관 가중치, 나비효과 큐, AI 페르소나 및 코멘터리 생성, OSMU 콘텐츠 생성
2. **`js/engine/ParallelLifeEngine.js`**: AI 극효율 100% 가상 시뮬레이션 및 평행세계 비교 데이터 연산
3. **`js/data/scenarios.js`**: 10대~50대 분기별 시나리오, 현실 통계 팩트 카드(Fact Card), 나비효과 데이터셋
4. **`js/app.js`**: UI와 엔진 간의 상호작용 및 2단계 선택 흐름 오케스트레이션
5. **`js/ui/ReportView.js`**: 듀얼 바 차트, 인터랙티브 타임라인, OSMU 스튜디오 시각화
6. **`make_ppt.py`**: 프로젝트 기획 배경, 비즈니스 모델, OSMU 전략을 담은 12장 분량의 고품질 발표용 파워포인트 자동 생성 스크립트

---

## 🚀 로컬 실행 방법

### 방법 A: 브라우저로 바로 실행
별도 서버 없이 브라우저 주소창에 아래 경로를 입력하거나 `index.html` 파일을 더블클릭합니다.
```text
file:///C:/my%20ai%20life/index.html
```

### 방법 B: Windows 원클릭 실행
프로젝트 폴더의 `start_local_server.bat` 파일을 더블클릭하면 로컬 서버가 자동으로 구동되고 브라우저가 열립니다.

### 방법 C: 터미널 명령어로 로컬 서버 실행
```bash
python -m http.server 8000
```
접속 주소: `http://localhost:8000/`

---

## 📑 발표용 PPT 생성

Python 스크립트를 통해 발표용 파워포인트를 언제든지 새로 생성할 수 있습니다.

```bash
python make_ppt.py
```

생성 파일: `My_AI_Life_Presentation.pptx`

---

## 🛠 기술 스택

- **Frontend**: HTML5, CSS3 (Glassmorphism UI), Vanilla JavaScript (ES6 Modules)
- **Engine**: Client-Side Rule & Simulation Engine (No Backend / Serverless)
- **Automation**: Python 3, `python-pptx`
- **Hosting**: GitHub Pages

---

## 📄 라이선스
MIT License or 개인/팀 프로젝트 목적에 따라 자유롭게 활용 가능합니다.
