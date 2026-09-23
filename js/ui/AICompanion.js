/**
 * MY AI LIFE - AI 파트너 및 나비효과 알림 UI 컴포넌트
 */

export class AICompanion {
  constructor() {
    this.avatarEl = document.getElementById('ai-avatar-icon');
    this.nameEl = document.getElementById('ai-persona-name');
    this.taglineEl = document.getElementById('ai-persona-tagline');
    this.dialogTextEl = document.getElementById('ai-dialog-text');
    this.butterflyListEl = document.getElementById('butterfly-events-list');
  }

  /**
   * AI 페르소나 및 대화창 업데이트
   */
  updatePersona(persona, customMessage) {
    if (this.avatarEl) this.avatarEl.textContent = persona.avatarIcon;
    if (this.nameEl) this.nameEl.textContent = persona.name;
    if (this.taglineEl) this.taglineEl.textContent = persona.tagline;
    if (this.dialogTextEl && customMessage) {
      this.dialogTextEl.textContent = customMessage;
    }
  }

  /**
   * 트리거된 나비효과 목록 렌더링
   */
  renderTriggeredEffects(effects) {
    if (!this.butterflyListEl) return;

    if (!effects || effects.length === 0) {
      this.butterflyListEl.innerHTML = `
        <div style="font-size:0.8rem; color:var(--text-muted); text-align:center; padding:10px;">
          과거의 선택들이 미래의 순간을 기다리고 있습니다.
        </div>
      `;
      return;
    }

    this.butterflyListEl.innerHTML = effects.map(item => `
      <div class="butterfly-item">
        <div class="butterfly-item-title">🦋 [과거 ${item.originAge || ''}세의 나비효과] ${item.title}</div>
        <div style="color:var(--text-sub); line-height:1.4;">${item.description}</div>
      </div>
    `).join('');
  }
}
