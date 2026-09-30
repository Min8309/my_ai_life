
# My AI Life (나의 AI 인생 시뮬레이터)



**My AI Life**는 사용자의 선택과 AI 동반자의 피드백을 통해 인생의 다양한 분기점과 시나리오를 경험해볼 수 있는 인터랙티브 라이프 시뮬레이션 웹 애플리케이션입니다.

---
http://localhost:8000

## 🌟 주요 기능

- **인터랙티브 시나리오 선택**: 생애 주기별 다양한 선택지와 분기 시스템 제공
- **능력치 & 지표 트래킹**: 건강, 자산, 행복도, 경력 등 실시간 HUD 및 상태 관리
- **AI 동반자 피드백**: 선택에 따른 AI 어시스턴트의 실시간 반응 및 조언
- **엔딩 및 리포트 뷰**: 시뮬레이션 종료 후 인생의 종합 성과 및 여정 리포트 제공
- **팩트 카드 시스템**: 현실 기반의 유용한 정보와 데이터 카드 제공

---

## 🛠️ 기술 스택

- **Frontend**: HTML5, Vanilla CSS, JavaScript (ES6+ Modules)
- **Architecture**: 모듈형 컴포넌트 구조 (`js/engine/`, `js/ui/`, `js/data/`)

---



## 📁 프로젝트 구조

```
my_ai_life/
├── css/
│   └── main.css             # 메인 스타일시트
├── js/
│   ├── data/
│   │   ├── constants.js     # 상수 및 기본 설정 데이터
│   │   └── scenarios.js     # 인생 시나리오 및 분기 데이터
│   ├── engine/
│   │   ├── LifeEngine.js    # 시뮬레이션 코어 엔진
│   │   └── ParallelLifeEngine.js # 병렬 시뮬레이션 엔진
│   ├── ui/
│   │   ├── AICompanion.js   # AI 동반자 UI 컴포넌트
│   │   ├── FactCardModal.js # 팩트 카드 모달 컴포넌트
│   │   ├── HUD.js           # 상태 표시줄(HUD) 컴포넌트
│   │   └── ReportView.js    # 결과 리포트 화면 컴포넌트
│   └── app.js               # 앱 엔트리포인트
├── index.html               # 메인 HTML
├── test_engine.js           # 엔진 테스트 스크립트
├── .gitignore               # Git 제외 설정
└── README.md                # 프로젝트 문서
```

이 프로젝트(My AI Life)에서 가장 핵심적인 역할을 담당하는 주요 코드들을 역할과 기능별로 정리해 드립니다.

1. 🧠 코어 시뮬레이션 엔진: 

LifeEngine.js
프로젝트의 전체 게임 로직과 상태를 총괄하는 가장 중요한 핵심 클래스입니다.

6대 라이프 지표 & 가치관 계산 (

applyStatusEffect
, 

applyValueWeights
):
자산(Money), 커리어(Career), 전문성(Skill), 인간관계(Relation), 여유시간(Time), 웰빙(Life) 지표를 0~100 범위로 실시간 갱신합니다.
나비효과 큐 시스템 (

processDelayedEffects
):
과거 연령대의 선택이 대기 큐(delayedEffectsQueue)에 저장되었다가, 미래 특정 나이에 도달했을 때 후속 효과와 스토리로 발동되는 인과관계 메커니즘을 처리합니다.
진화형 AI 페르소나 및 코멘터리 (

getAIPersona
, 

generateAICommentary
):
연령대에 따라 AI가 Optimizer(1020대) ➔ Challenger(3040대) ➔ Reflector(50대)로 진화하며 플레이어의 선택에 맞춤형 반응을 생성합니다.
OSMU(원 라이프 소스) 콘텐츠 자동 생성기 (

generateOsmuContent
):
플레이어가 걸어온 선택 궤적을 분석하여 웹툰 4~5컷 콘티, 60초 숏폼 릴스/쇼츠 대본, Google Vids AI 비디오 생성 프롬프트를 자동 조립합니다.
2. 🌌 AI 평행세계 시뮬레이터: 

ParallelLifeEngine.js
플레이어가 선택하는 동안, **"AI의 극효율 권고만을 100% 따랐을 때의 인생"**을 백그라운드에서 계산하는 엔진입니다.

전체 AI 인생 자동 연산 (

simulateFullAiLife
):
모든 시나리오의 AI 추천 옵션을 가상 실행하여 AI 평행우주의 최종 스탯과 나비효과 결과를 생성하고, 엔딩 화면에서 플레이어의 삶과 듀얼로 비교할 수 있게 합니다.
3. 📜 생애 시나리오 & 팩트 데이터: 

scenarios.js
게임의 모든 콘텐츠 데이터가 집약된 핵심 데이터셋입니다.

10대부터 50대까지의 인생 분기점 데이터 (

SCENARIOS
):
각 시나리오마다 상황 설명, AI의 극효율 추천과 이유, 3가지 선택지, 통계 기반 팩트 카드(Fact Card), **미래에 터지는 나비효과(Butterfly Effect)**가 유기적으로 정의되어 있습니다.
4. 🎮 메인 앱 컨트롤러: 

app.js
UI와 엔진 사이의 상호작용 및 2단계 선택 흐름(1차 선택 ➔ 팩트 카드 확인 ➔ 최종 결정)을 중재하는 메인 오케스트레이터입니다.

선택 및 턴 라이프사이클 관리 (

startGame
, 

handleFirstChoice
, 

handleFinalChoice
):
1차 선택 시 팩트 카드 모달을 띄우고, 최종 확정 후 

HUD
와 

AICompanion
을 갱신하며 다음 시나리오로 연결합니다.
5. 📊 결과 대시보드 & 시각화: 

ReportView.js
시뮬레이션 완료 후 최종 분석 결과를 시각화하는 컴포넌트입니다.

듀얼 지표 비교 & 타임라인 렌더링 (

render
, 

renderTimeline
):
나의 라이프 vs AI 평행 라이프 듀얼 바 차트, 가치관 분석, 인터랙티브 가로형 타임라인, OSMU 스튜디오를 렌더링합니다.
6. 📑 발표자료 자동화 스크립트: 

make_ppt.py
프로젝트의 기획 배경, AI 동반자 구조, 6대 지표, 비즈니스 모델, OSMU 전략 등을 12장의 완성도 높은 발표용 파워포인트(

My_AI_Life_Presentation.pptx
)로 자동 생성하는 Python 코드입니다.
