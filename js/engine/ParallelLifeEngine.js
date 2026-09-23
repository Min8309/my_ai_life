/**
 * MY AI LIFE - AI 평행우주 시뮬레이션 엔진 (ParallelLifeEngine)
 * AI가 극효율로 권고한 선택지만을 100% 따랐을 때의 인생 경로를 계산합니다.
 */
import { INITIAL_STATUS, INITIAL_VALUES } from '../data/constants.js';

export class ParallelLifeEngine {
  constructor(scenarios) {
    this.scenarios = scenarios;
    this.status = { ...INITIAL_STATUS };
    this.values = { ...INITIAL_VALUES };
    this.history = [];
    this.delayedEffectsQueue = [];
    this.triggeredEffectsHistory = [];
  }

  /**
   * AI 경로를 완전 시뮬레이션하여 최종 결과 반환
   */
  simulateFullAiLife() {
    this.status = { ...INITIAL_STATUS };
    this.values = { ...INITIAL_VALUES };
    this.history = [];
    this.delayedEffectsQueue = [];
    this.triggeredEffectsHistory = [];

    for (const scenario of this.scenarios) {
      // 1. 현재 연령의 나비효과 발동
      this.processDelayedEffects(scenario.age);

      // 2. AI 추천 옵션 검색
      const recommendedId = scenario.aiRecommendation.recommendedOptionId;
      const option = scenario.options.find(opt => opt.id === recommendedId);

      if (option) {
        // 스탯 및 가치관 반영
        this.applyStatusEffect(option.immediateEffect);
        this.applyValueWeights(option.valueWeights);

        // 지연 나비효과 등록
        if (option.butterflyEffect) {
          this.delayedEffectsQueue.push({
            ...option.butterflyEffect,
            originAge: scenario.age,
            originScenarioTitle: scenario.title
          });
        }

        this.history.push({
          age: scenario.age,
          stage: scenario.stage,
          scenarioTitle: scenario.title,
          chosenOption: option,
          snapshotStatus: { ...this.status },
          snapshotValues: { ...this.values }
        });
      }
    }

    // 최종 65세 이후 남아있는 나비효과 처리
    this.processDelayedEffects(70);

    return {
      status: { ...this.status },
      values: { ...this.values },
      history: this.history,
      triggeredEffects: this.triggeredEffectsHistory
    };
  }

  applyStatusEffect(effect) {
    if (!effect) return;
    for (const key of Object.keys(this.status)) {
      if (effect[key] !== undefined) {
        this.status[key] = Math.max(0, Math.min(100, this.status[key] + effect[key]));
      }
    }
  }

  applyValueWeights(weights) {
    if (!weights) return;
    for (const key of Object.keys(this.values)) {
      if (weights[key] !== undefined) {
        this.values[key] = Math.max(0, Math.min(100, this.values[key] + weights[key]));
      }
    }
  }

  processDelayedEffects(currentAge) {
    const triggered = [];
    const remainingQueue = [];

    for (const item of this.delayedEffectsQueue) {
      if (item.triggerAge <= currentAge) {
        if (item.effect) {
          this.applyStatusEffect(item.effect);
        }
        triggered.push(item);
        this.triggeredEffectsHistory.push(item);
      } else {
        remainingQueue.push(item);
      }
    }

    this.delayedEffectsQueue = remainingQueue;
    return triggered;
  }
}
