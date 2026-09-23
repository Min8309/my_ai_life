/**
 * MY AI LIFE - 메인 애플리케이션 진입점 (App Controller)
 */
import { SCENARIOS } from './data/scenarios.js';
import { LifeEngine } from './engine/LifeEngine.js';
import { ParallelLifeEngine } from './engine/ParallelLifeEngine.js';
import { HUD } from './ui/HUD.js';
import { FactCardModal } from './ui/FactCardModal.js';
import { AICompanion } from './ui/AICompanion.js';
import { ReportView } from './ui/ReportView.js';

class App {
  constructor() {
    this.selectedStartIndex = 0;
    this.lifeEngine = null;
    this.parallelEngine = new ParallelLifeEngine(SCENARIOS);

    // UI 컴포넌트 초기화
    this.hud = new HUD();
    this.aiCompanion = new AICompanion();
    this.factModal = new FactCardModal((finalOptionId) => this.handleFinalChoice(finalOptionId));
    this.reportView = new ReportView(() => this.showScreen('start-screen'));

    // DOM 요소 캐싱
    this.screens = {
      start: document.getElementById('start-screen'),
      play: document.getElementById('play-screen'),
      report: document.getElementById('report-screen')
    };

    this.scenarioAgeBadge = document.getElementById('scenario-age-badge');
    this.scenarioTitleText = document.getElementById('scenario-title-text');
    this.scenarioSituationText = document.getElementById('scenario-situation-text');
    this.aiRationaleText = document.getElementById('ai-rationale-text');
    this.optionsContainer = document.getElementById('options-buttons-list');

    this.initEventListeners();
  }

  /**
   * 전역 이벤트 리스너 등록
   */
  initEventListeners() {
    // 시작 화면 연령대 선택 버튼
    const ageBtns = document.querySelectorAll('.age-btn');
    ageBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        ageBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.selectedStartIndex = parseInt(btn.dataset.startIndex, 10) || 0;
      });
    });

    // 시작 버튼
    const startBtn = document.getElementById('btn-start-game');
    if (startBtn) {
      startBtn.addEventListener('click', () => this.startGame());
    }
  }

  /**
   * 화면 전환 헬퍼
   */
  showScreen(screenId) {
    Object.values(this.screens).forEach(screen => {
      if (screen) screen.classList.remove('active');
    });

    const target = document.getElementById(screenId);
    if (target) target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * 새 게임 시작
   */
  startGame() {
    // 선택한 연령대부터 시작하도록 시나리오 슬라이스
    const activeScenarios = SCENARIOS.slice(this.selectedStartIndex);
    this.lifeEngine = new LifeEngine(activeScenarios);

    this.showScreen('play-screen');
    this.renderCurrentTurn();
  }

  /**
   * 현재 턴 렌더링
   */
  renderCurrentTurn() {
    const turnData = this.lifeEngine.startCurrentTurn();

    // 더 이상 시나리오가 없으면 엔딩으로 이동
    if (!turnData) {
      this.finishGame();
      return;
    }

    const { scenario, triggeredEffects } = turnData;

    // 1. HUD 업데이트
    this.hud.update(this.lifeEngine.status, scenario.age, scenario.stage);

    // 2. AI 컴패니언 및 나비효과 업데이트
    const persona = this.lifeEngine.getAIPersona();
    this.aiCompanion.updatePersona(persona);
    this.aiCompanion.renderTriggeredEffects(triggeredEffects);

    // 3. 시나리오 카드 바인딩
    const stageMap = { '10s': '10대', '20s': '20대', '30s': '30대', '40s': '40대', '50s': '50대' };
    this.scenarioAgeBadge.textContent = `${stageMap[scenario.stage] || scenario.stage} • ${scenario.age}세`;
    this.scenarioTitleText.textContent = scenario.title;
    this.scenarioSituationText.textContent = scenario.situation;

    // AI 권고
    this.aiRationaleText.textContent = scenario.aiRecommendation.rationale;

    // 4. 1차 선택지 버튼 렌더링
    this.optionsContainer.innerHTML = '';
    scenario.options.forEach(opt => {
      const isAiRec = scenario.aiRecommendation.recommendedOptionId === opt.id;
      const btn = document.createElement('button');
      btn.className = 'option-card-btn';
      btn.innerHTML = `
        <div class="option-info">
          <div class="option-title">
            <span>${opt.label}</span>
            ${isAiRec ? '<span class="ai-recommended-tag">AI 극효율 추천</span>' : ''}
          </div>
          <div class="option-desc">${opt.description}</div>
        </div>
        <div class="option-arrow">➔</div>
      `;

      btn.addEventListener('click', () => this.handleFirstChoice(opt.id));
      this.optionsContainer.appendChild(btn);
    });
  }

  /**
   * 1차 선택 처리 -> 팩트 카드 모달 오픈
   */
  handleFirstChoice(optionId) {
    const result = this.lifeEngine.makeFirstChoice(optionId);
    if (!result) return;

    // 팩트 카드 모달 열기 (2차 재고 단계 유도)
    this.factModal.open(result.selectedOption);
  }

  /**
   * 최종 선택 확정 처리
   */
  handleFinalChoice(finalOptionId) {
    const result = this.lifeEngine.finalizeChoice(finalOptionId);
    if (!result) return;

    // AI 피드백 대화창 업데이트
    const persona = this.lifeEngine.getAIPersona();
    this.aiCompanion.updatePersona(persona, result.aiComment);

    // HUD 업데이트
    const currentScenario = this.lifeEngine.getCurrentScenario();
    const nextAge = currentScenario ? currentScenario.age : 65;
    const nextStage = currentScenario ? currentScenario.stage : '50s';
    this.hud.update(result.updatedStatus, nextAge, nextStage);

    // 짧은 피드백 딜레이 후 다음 턴 진행
    setTimeout(() => {
      this.renderCurrentTurn();
    }, 900);
  }

  /**
   * 게임 종료 및 리포트 화면 렌더링
   */
  finishGame() {
    const myLifeReport = this.lifeEngine.getFinalReport();
    const aiLifeReport = this.parallelEngine.simulateFullAiLife();

    this.showScreen('report-screen');
    this.reportView.render(myLifeReport, aiLifeReport);
  }
}

// 애플리케이션 부팅
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
