/**
 * MY AI LIFE - FACT CARD & 재고(Rethink) 모달 컴포넌트
 */

export class FactCardModal {
  constructor(onFinalizeCallback) {
    this.onFinalize = onFinalizeCallback;
    this.backdropEl = document.getElementById('fact-modal-backdrop');
    this.badgeEl = document.getElementById('modal-fact-badge');
    this.titleEl = document.getElementById('modal-fact-title');
    this.highlightStatEl = document.getElementById('modal-fact-highlight');
    this.riskStatEl = document.getElementById('modal-fact-risk');
    this.insightEl = document.getElementById('modal-fact-insight');
    this.rethinkPromptEl = document.getElementById('modal-rethink-prompt');
    this.btnMaintainEl = document.getElementById('btn-maintain-choice');
    this.btnChangeEl = document.getElementById('btn-change-choice');

    this.currentFirstOption = null;

    this.initEvents();
  }

  initEvents() {
    if (this.btnMaintainEl) {
      this.btnMaintainEl.addEventListener('click', () => {
        if (this.currentFirstOption) {
          this.close();
          this.onFinalize(this.currentFirstOption.id);
        }
      });
    }

    if (this.btnChangeEl) {
      this.btnChangeEl.addEventListener('click', () => {
        this.close();
        // 모달을 닫고 사용자가 다른 선택지를 클릭할 수 있도록 안내
        const dialogBox = document.getElementById('ai-dialog-text');
        if (dialogBox) {
          dialogBox.textContent = `[The Optimizer] 팩트 데이터를 바탕으로 결정을 재고하셨습니다. 다른 선택지를 신중하게 선택해 주세요.`;
        }
      });
    }
  }

  /**
   * 팩트 카드 오픈
   */
  open(firstChoiceOption) {
    this.currentFirstOption = firstChoiceOption;
    const fact = firstChoiceOption.factCard;

    if (!fact) {
      // 팩트 카드가 없는 경우 즉시 확정
      this.onFinalize(firstChoiceOption.id);
      return;
    }

    this.badgeEl.textContent = fact.badge || 'FACT DATA';
    this.titleEl.textContent = fact.title;
    this.highlightStatEl.textContent = `💡 핵심 지표: ${fact.highlightStat}`;
    this.riskStatEl.textContent = `⚠️ 내재 리스크: ${fact.riskStat}`;
    this.insightEl.textContent = fact.insight;

    this.rethinkPromptEl.innerHTML = `선택: <strong>[${firstChoiceOption.label}]</strong><br>현실 데이터를 확인했습니다. 그래도 이 선택을 유지하시겠습니까?`;

    this.backdropEl.classList.add('active');
  }

  close() {
    this.backdropEl.classList.remove('active');
  }
}
