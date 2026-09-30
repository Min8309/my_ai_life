[Uploading index.html…]()
# My AI Life (나의 AI 인생 시뮬레이터)



**My AI Life**는 사용자의 선택과 AI 동반자의 피드백을 통해 인생의 다양한 분기점과 시나리오를 경험해볼 수 있는 인터랙티브 라이프 시뮬레이션 웹 애플리케이션입니다.

---

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
