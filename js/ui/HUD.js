/**
 * MY AI LIFE - 상단 HUD 컴포넌트 (스탯 바 & 타임라인 인디케이터)
 */

export class HUD {
  constructor() {
    this.ageIndicatorEl = document.getElementById('hud-age-indicator');
    this.stageIndicatorEl = document.getElementById('hud-stage-indicator');
    
    this.meterFills = {
      money: document.getElementById('meter-fill-money'),
      career: document.getElementById('meter-fill-career'),
      skill: document.getElementById('meter-fill-skill'),
      relation: document.getElementById('meter-fill-relation'),
      time: document.getElementById('meter-fill-time'),
      life: document.getElementById('meter-fill-life')
    };

    this.meterValues = {
      money: document.getElementById('meter-val-money'),
      career: document.getElementById('meter-val-career'),
      skill: document.getElementById('meter-val-skill'),
      relation: document.getElementById('meter-val-relation'),
      time: document.getElementById('meter-val-time'),
      life: document.getElementById('meter-val-life')
    };
  }

  /**
   * HUD 상태 업데이트
   * @param {Object} status - 6대 스탯 { money, career, skill, relation, time, life }
   * @param {number} age - 현재 나이
   * @param {string} stage - 현재 연령대 ('10s', '20s' 등)
   */
  update(status, age, stage) {
    if (this.ageIndicatorEl && age) {
      this.ageIndicatorEl.textContent = `${age}세`;
    }
    if (this.stageIndicatorEl && stage) {
      const stageMap = { '10s': '10대', '20s': '20대', '30s': '30대', '40s': '40대', '50s': '50대' };
      this.stageIndicatorEl.textContent = stageMap[stage] || stage;
    }

    if (!status) return;

    for (const [key, value] of Object.entries(status)) {
      if (this.meterFills[key]) {
        this.meterFills[key].style.width = `${Math.min(100, Math.max(0, value))}%`;
      }
      if (this.meterValues[key]) {
        this.meterValues[key].textContent = Math.round(value);
      }
    }
  }
}
