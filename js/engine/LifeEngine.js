/**
 * MY AI LIFE - 코어 게임 엔진 (LifeEngine)
 */
import { INITIAL_STATUS, INITIAL_VALUES, AI_PERSONA_STAGES } from '../data/constants.js';

export class LifeEngine {
  constructor(scenarios) {
    this.scenarios = scenarios;
    this.currentScenarioIndex = 0;
    
    // 플레이어 실시간 상태
    this.status = { ...INITIAL_STATUS };
    this.values = { ...INITIAL_VALUES };
    
    // 선택 및 결정 히스토리
    this.history = [];
    
    // 지연된 나비효과 대기 큐: [{ triggerAge, title, description, effect, originScenarioTitle }]
    this.delayedEffectsQueue = [];
    
    // 활성화된 나비효과 기록 (현재 턴에 발동된 것)
    this.triggeredEffectsHistory = [];

    // 통계 지표
    this.stats = {
      totalDecisions: 0,
      aiAcceptedCount: 0,       // AI 추천을 따른 횟수
      aiRejectedCount: 0,       // AI 추천을 거절한 횟수
      firstChoiceChangedCount: 0 // 팩트 카드 확인 후 선택을 바꾼 횟수
    };

    // 현재 턴의 임시 선택 상태
    this.currentTurn = {
      scenario: null,
      firstChoiceOption: null,
      finalChoiceOption: null
    };
  }

  /**
   * 현재 시나리오 반환
   */
  getCurrentScenario() {
    if (this.currentScenarioIndex >= this.scenarios.length) {
      return null; // 모든 시나리오 종료 (엔딩)
    }
    return this.scenarios[this.currentScenarioIndex];
  }

  /**
   * 게임 시작 또는 다음 턴 준비
   */
  startCurrentTurn() {
    const scenario = this.getCurrentScenario();
    if (!scenario) return null;

    // 현재 연령에 트리거될 나비효과 검색 및 적용
    const triggeredEffects = this.processDelayedEffects(scenario.age);

    this.currentTurn = {
      scenario,
      firstChoiceOption: null,
      finalChoiceOption: null,
      triggeredEffects
    };

    return this.currentTurn;
  }

  /**
   * 1차 선택 기록
   */
  makeFirstChoice(optionId) {
    const scenario = this.currentTurn.scenario;
    const selectedOption = scenario.options.find(opt => opt.id === optionId);
    if (!selectedOption) return null;

    this.currentTurn.firstChoiceOption = selectedOption;
    return {
      selectedOption,
      factCard: selectedOption.factCard,
      aiRecommendation: scenario.aiRecommendation
    };
  }

  /**
   * 2차(최종) 선택 및 상태 확정
   * @param {string} finalOptionId - 최종 선택한 옵션 ID
   */
  finalizeChoice(finalOptionId) {
    const scenario = this.currentTurn.scenario;
    const finalOption = scenario.options.find(opt => opt.id === finalOptionId);
    if (!finalOption) return null;

    this.currentTurn.finalChoiceOption = finalOption;
    const isAiRecommended = scenario.aiRecommendation.recommendedOptionId === finalOption.id;
    const isChangedFromFirst = this.currentTurn.firstChoiceOption.id !== finalOption.id;

    // 1. 6대 Status 변화 적용
    this.applyStatusEffect(finalOption.immediateEffect);

    // 2. 가치관(Values) 가중치 반영
    this.applyValueWeights(finalOption.valueWeights);

    // 3. 나비효과 큐에 미래 지연 효과 등록
    if (finalOption.butterflyEffect) {
      this.delayedEffectsQueue.push({
        ...finalOption.butterflyEffect,
        originAge: scenario.age,
        originScenarioTitle: scenario.title
      });
    }

    // 4. 통계 누적
    this.stats.totalDecisions++;
    if (isAiRecommended) {
      this.stats.aiAcceptedCount++;
    } else {
      this.stats.aiRejectedCount++;
    }
    if (isChangedFromFirst) {
      this.stats.firstChoiceChangedCount++;
    }

    // 5. 결정 히스토리 저장
    const decisionRecord = {
      age: scenario.age,
      stage: scenario.stage,
      scenarioTitle: scenario.title,
      aiRecommendedOptionId: scenario.aiRecommendation.recommendedOptionId,
      firstChoice: this.currentTurn.firstChoiceOption,
      finalChoice: finalOption,
      isAiRecommended,
      isChangedFromFirst,
      snapshotStatus: { ...this.status },
      snapshotValues: { ...this.values }
    };
    this.history.push(decisionRecord);

    // 다음 시나리오로 인덱스 이동
    this.currentScenarioIndex++;

    return {
      decisionRecord,
      updatedStatus: { ...this.status },
      updatedValues: { ...this.values },
      aiComment: this.generateAICommentary(decisionRecord)
    };
  }

  /**
   * 6대 스탯 변화 적용 (0 ~ 100 범위로 클램핑)
   */
  applyStatusEffect(effect) {
    if (!effect) return;
    for (const key of Object.keys(this.status)) {
      if (effect[key] !== undefined) {
        this.status[key] = Math.max(0, Math.min(100, this.status[key] + effect[key]));
      }
    }
  }

  /**
   * 가치관 가중치 누적 반영 (0 ~ 100 범위)
   */
  applyValueWeights(weights) {
    if (!weights) return;
    for (const key of Object.keys(this.values)) {
      if (weights[key] !== undefined) {
        this.values[key] = Math.max(0, Math.min(100, this.values[key] + weights[key]));
      }
    }
  }

  /**
   * 특정 연령에 도달했을 때 대기 중이던 나비효과 발동
   */
  processDelayedEffects(currentAge) {
    const triggered = [];
    const remainingQueue = [];

    for (const item of this.delayedEffectsQueue) {
      if (item.triggerAge <= currentAge) {
        // 스탯 효과 반영
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

  /**
   * AI 페르소나 단계 및 실시간 코멘터리 생성
   */
  getAIPersona() {
    const scenario = this.getCurrentScenario();
    if (!scenario || scenario.age < 30) {
      return AI_PERSONA_STAGES.OPTIMIZER;
    } else if (scenario.age < 50) {
      return AI_PERSONA_STAGES.CHALLENGER;
    } else {
      return AI_PERSONA_STAGES.REFLECTOR;
    }
  }

  /**
   * 선택 후 AI 파트너의 반응 코멘트 생성
   */
  generateAICommentary(decision) {
    const persona = this.getAIPersona();
    const { isAiRecommended, isChangedFromFirst, finalChoice, age } = decision;

    if (age < 30) {
      // 초반 (Optimizer)
      if (isAiRecommended) {
        return `[The Optimizer] 합리적인 데이터 기반 판단입니다. 단기 효율 및 역량 지표가 기대 곡선에 부합하게 상승했습니다.`;
      } else {
        return `[The Optimizer] 효율성 통계와 다른 비선형 경로를 선택하셨습니다. 리스크가 존재하지만 고유한 경험 자산이 누적됩니다.`;
      }
    } else if (age < 50) {
      // 중반 (Challenger)
      if (isChangedFromFirst) {
        return `[The Challenger] 팩트 카드를 확인한 후 결정을 재고하셨군요. 현실의 데이터와 당신의 내면 가치가 치열하게 대화한 결과입니다.`;
      } else if (isAiRecommended) {
        return `[The Challenger] 계산된 안전과 성과를 택하셨습니다. 하지만 이것이 당신의 '자유'와 '시간'을 얼마나 희생시키는지 주시하겠습니다.`;
      } else {
        return `[The Challenger] 경제적 계산보다 삶의 철학을 우선하셨군요. 이 선택의 대가는 후일 당신만의 독창적 서사가 될 것입니다.`;
      }
    } else {
      // 후반 (Reflector)
      return `[The Reflector] 수십 년의 선택이 쌓여 당신만의 고유한 궤적이 완성되어 가고 있습니다. 효율과 행복은 결코 같은 단어가 아니었습니다.`;
    }
  }

  /**
   * 사용자의 선택 궤적을 바탕으로 'MY LIFE STORY' 서사 생성
   */
  generateLifeStory() {
    if (this.history.length === 0) return null;

    // 연령별 선택 서사 라인 구성
    const storyLines = this.history.map(record => {
      const { age, finalChoice, isAiRecommended } = record;
      return {
        age,
        choiceLabel: finalChoice.label,
        summary: this.getChoiceNarrativeSummary(age, finalChoice.id),
        isAiRecommended
      };
    });

    // AI 권고와의 괴리 요약
    const total = this.history.length;
    const aiRejectedCount = this.stats.aiRejectedCount;
    let aiDivergenceSummary = '';

    if (aiRejectedCount === total) {
      aiDivergenceSummary = `AI는 매 순간 데이터에 기반한 가장 효율적인 경로를 권했지만, 당신은 단 한 번도 그 길을 그대로 따르지 않았습니다.`;
    } else if (aiRejectedCount === 0) {
      aiDivergenceSummary = `당신은 데이터와 AI가 분석한 극효율의 길을 온전히 신뢰하며 걸어왔습니다.`;
    } else {
      aiDivergenceSummary = `당신은 ${total}번의 갈림길 중 ${aiRejectedCount}번은 AI의 계산을 거절하고 자신만의 가치를 선택했습니다.`;
    }

    // 최종 결말 서사 요약 (평가 없이 상태의 결과만을 시적으로 서술)
    const conclusion = this.generateStoryConclusion();

    return {
      title: '당신이 살아온 또 하나의 인생',
      storyLines,
      aiDivergenceSummary,
      conclusion
    };
  }

  /**
   * 각 연령별 선택의 자연스러운 문장 생성
   */
  getChoiceNarrativeSummary(age, optionId) {
    const map = {
      // 10대
      'opt_stability': '안정적인 진로를 위해 꿈을 잠시 미루고 정해진 학업에 매진했습니다.',
      'opt_balance': '현실의 공부를 놓지 않으면서도 밤을 쪼개 창작의 끈을 놓지 않았습니다.',
      'opt_dream': '안정적인 궤도 대신 가슴이 뛰는 창작과 열정의 세계로 뛰어들었습니다.',
      // 20대
      'opt_corp_contract': '초기 안정과 시드머니를 위해 대기업의 문을 두드렸습니다.',
      'opt_startup': '높은 연봉보다 스스로 성장할 수 있는 스타트업의 야생을 선택했습니다.',
      'opt_freelance': '어디에도 얽매이지 않고 나만의 이름으로 생존하는 자유를 택했습니다.',
      // 30대
      'opt_buy_home': '자유를 일부 묶어두더라도 가족의 든든한 보금자리와 자산을 마련했습니다.',
      'opt_invest_freedom': '부동산에 묶이지 않고 언제든 도전할 수 있는 유연한 자본과 삶을 유지했습니다.',
      'opt_work_life_balance': '물질적인 축적보다 사랑하는 사람들과 함께 호흡하는 시간을 우선했습니다.',
      // 40대
      'opt_keep_current': '가계의 안정을 위해 거센 변화의 바람 속에서도 묵묵히 자리를 지켰습니다.',
      'opt_ai_reskill': '잠을 줄여가며 새로운 기술을 배워 시대의 변화에 직접 부딪혔습니다.',
      'opt_independent_biz': '조직의 울타리를 벗어나 오랜 내공을 쏟아부은 나만의 사업을 시작했습니다.',
      // 50대
      'opt_keep_pension': '자립을 원칙으로 삼아 스스로의 존엄과 온전한 노후 자금을 지켰습니다.',
      'opt_partial_support': '사랑과 현실 사이에서 균형을 잡으며 지혜로운 절충의 길을 걸었습니다.',
      'opt_full_support': '자신의 황혼을 희생하더라도 자녀의 새로운 출발을 위해 모든 것을 내어주었습니다.'
    };

    return map[optionId] || '스스로 믿는 가치를 위해 중요한 결정을 내렸습니다.';
  }

  /**
   * 최종 스탯 기반 결말 서사 생성 (좋다/나쁘다 평가 배제)
   */
  generateStoryConclusion() {
    const { money, career, skill, relation, time, life } = this.status;

    const highlights = [];
    if (money >= 70) highlights.push('풍족한 자산');
    else if (money <= 30) highlights.push('많은 돈은 남지 않았지만');

    if (skill >= 70) highlights.push('언제든 다시 시작할 수 있는 깊은 역량');
    if (relation >= 70) highlights.push('곁을 지켜주는 든든한 사람들과의 관계');
    if (life >= 70 || time >= 70) highlights.push('누구에게도 얽매이지 않는 삶의 자유');
    if (career >= 70) highlights.push('스스로 일구어낸 단단한 커리어');

    if (highlights.length === 0) {
      return `50대가 된 당신의 손에는 수많은 선택들이 빚어낸 단 하나뿐인 인생의 궤적이 고스란히 남아 있습니다.`;
    }

    if (money <= 30) {
      const rest = highlights.filter(h => !h.includes('돈')).join(', ');
      return `그리고 50대가 된 당신에게 많은 돈은 남지 않았지만, ${rest ? rest + '이(가) 가득 남았습니다.' : '깊은 인생의 경험이 남았습니다.'}`;
    } else {
      return `그리고 50대가 된 당신의 곁에는 ${highlights.join(', ')}이(가) 함께하고 있습니다.`;
    }
  }

  /**
   * 인생 타임라인 인터랙티브 상세 데이터 생성 (나비효과 인과관계 매핑)
   */
  generateTimelineDetails() {
    return this.history.map((record, index) => {
      const { age, stage, scenarioTitle, aiRecommendedOptionId, firstChoice, finalChoice, isAiRecommended, isChangedFromFirst } = record;
      
      // 이 선택으로 인해 미래에 발동된 나비효과 찾기
      const triggeredEffect = this.triggeredEffectsHistory.find(eff => eff.originAge === age) || finalChoice.butterflyEffect || null;

      // 아이콘 매핑
      const iconMap = {
        17: '🎨',
        26: '💼',
        34: '🏠',
        45: '🚀',
        56: '👨‍👩‍👧'
      };

      const scenario = this.scenarios.find(s => s.age === age);
      const aiRecOption = scenario ? scenario.options.find(o => o.id === aiRecommendedOptionId) : null;

      return {
        stepIndex: index,
        age,
        stage,
        icon: iconMap[age] || '✨',
        scenarioTitle,
        aiRecommendation: {
          label: aiRecOption ? aiRecOption.label : '안정적 경로',
          tag: 'AI: ' + (aiRecOption ? aiRecOption.label.split(' ')[0] : '안정')
        },
        firstChoice: {
          label: firstChoice.label,
          tag: '1차: ' + firstChoice.label.split(' ')[0]
        },
        finalChoice: {
          label: finalChoice.label,
          tag: '나: ' + finalChoice.label.split(' ')[0]
        },
        factCard: firstChoice.factCard || finalChoice.factCard,
        butterflyEffect: triggeredEffect ? {
          triggerAge: triggeredEffect.triggerAge,
          title: triggeredEffect.title,
          description: triggeredEffect.description
        } : null,
        isAiRecommended,
        isChangedFromFirst
      };
    });
  }

  /**
   * One Life Source: OSMU(웹툰 콘티 & 숏폼 대본) 콘텐츠 자동 생성
   */
  generateOsmuContent() {
    const timeline = this.generateTimelineDetails();
    const story = this.generateLifeStory();

    // 1. 웹툰 4~5컷 콘티 스크립트 생성
    const webtoonCuts = timeline.map((item, idx) => {
      return {
        cutNumber: idx + 1,
        age: item.age,
        title: `${item.age}세: ${item.scenarioTitle}`,
        sceneDescription: `[장면] ${item.age}세의 주인공이 중대한 갈림길 앞에 서 있다. 옆에는 홀로그램 AI 파트너가 떠 있다.`,
        aiDialogue: `AI: "${item.aiRecommendation.label}이 데이터상 가장 효율적입니다."`,
        userDialogue: `주인공: "알지만... 나는 '${item.finalChoice.label}'을(를) 선택하겠어."`,
        factCaption: `[FACT OVERLAY] ${item.factCard ? item.factCard.highlightStat : ''}`,
        butterflyNote: item.butterflyEffect ? `[나비효과] ➔ ${item.butterflyEffect.triggerAge}세: ${item.butterflyEffect.title}` : ''
      };
    });

    // 2. 60초 숏폼 릴스/쇼츠 대본 생성
    const shortsScript = [
      {
        timecode: '00:00 - 00:05',
        section: 'HOOK',
        visual: '빠르게 돌아가는 타임라인 그래픽과 AI 홀로그램',
        narration: 'AI가 인생의 모든 정답을 알려준다면, 당신은 그 말을 따르시겠습니까?'
      },
      ...timeline.slice(0, 3).map((item, i) => ({
        timecode: `00:${String(5 + i * 12).padStart(2, '0')} - 00:${String(17 + i * 12).padStart(2, '0')}`,
        section: `${item.age}세의 갈림길`,
        visual: `${item.age}세 딜레마 선택 화면 및 AI 권고 vs 실제 선택 텍스트 팝업`,
        narration: `${item.age}세, AI는 ${item.aiRecommendation.label.split('(')[0]}을 권했지만 나는 ${item.finalChoice.label.split('(')[0]}을 선택했습니다.`
      })),
      {
        timecode: '00:45 - 00:55',
        section: 'BUTTERFLY REVEAL',
        visual: '과거 선택들이 나비효과로 이어져 최종 상태로 도달하는 다이내믹 그래프',
        narration: `${story ? story.conclusion : '그리고 수십 년 뒤, 나의 선택들이 만들어낸 또 하나의 인생이 완성되었습니다.'}`
      },
      {
        timecode: '00:55 - 01:00',
        section: 'OUTRO',
        visual: 'MY LIFE vs AI LIFE 듀얼 비교 화면 및 로고',
        narration: 'AI의 극효율 인생 vs 나의 선택. 당신이라면 어떤 삶을 사시겠습니까?'
      }
    ];

    // 3. Google Vids 비디오 생성 전용 프롬프트 생성
    const googleVidsPrompt = this.generateGoogleVidsPrompt(timeline, story);

    return {
      webtoonCuts,
      shortsScript,
      googleVidsPrompt
    };
  }

  /**
   * Google Vids (Help me create a video) 맞춤형 프롬프트 생성기
   */
  generateGoogleVidsPrompt(timeline, story) {
    const scenesText = timeline.map((item, idx) => {
      const rec = item.aiRecommendation.label.split('(')[0].trim();
      const choice = item.finalChoice.label.split('(')[0].trim();
      return `Scene ${idx + 2} (${item.age}세의 갈림길):
- Visual Concept: A person at age ${item.age} facing life dilemma, futuristic HUD showing AI advice '${rec}' vs actual human choice '${choice}'.
- Voiceover (나레이션): "${item.age}세, AI는 ${rec}을(를) 권했지만 나는 ${choice}을(를) 선택했습니다."
- On-Screen Text: "AI: ${rec} ➔ MY CHOICE: ${choice}"`;
    }).join('\n\n');

    const prompt = `[Google Vids AI Video Generation Prompt]

🎯 Video Title: "AI의 극효율 알고리즘 vs 나의 인생 선택" (My AI Life Story)
📐 Aspect Ratio: 9:16 Vertical (Shorts/Reels)
🎵 Tone & Style: Inspiring, Cinematic, Modern Tech with warm emotional soundtrack

🎬 Storyboard & Scenes:

Scene 1 (00:00 - 00:05 | Hook):
- Visual Concept: Rapid montage of life choices, glowing AI hologram interface vs human heartbeat.
- Voiceover (나레이션): "AI가 인생의 모든 정답을 알려준다면, 당신은 그 말을 따르시겠습니까?"
- On-Screen Text: "AI의 극효율 인생 vs 나의 선택"

${scenesText}

Scene ${timeline.length + 2} (결말 & 회고):
- Visual Concept: Dual radar chart comparing My Life vs AI Life, transitioning to an inspiring sunset and character smile.
- Voiceover (나레이션): "${story ? story.conclusion : '그리고 수십 년 뒤, 나의 선택들이 만들어낸 또 하나의 인생이 완성되었습니다.'}"
- On-Screen Text: "효율과 행복은 결코 같은 단어가 아니었다."

Scene ${timeline.length + 3} (Outro & CTA):
- Visual Concept: MY AI LIFE logo and interactive life simulation invitation.
- Voiceover (나레이션): "AI의 극효율 인생 vs 나의 선택. 당신이라면 어떤 삶을 사시겠습니까?"
- On-Screen Text: "MY AI LIFE | 나만의 인생을 시뮬레이션하세요"`;

    return prompt;
  }

  /**
   * 최종 리포트 데이터 요약 생성
   */
  getFinalReport() {
    const total = this.stats.totalDecisions || 1;
    const aiAcceptanceRate = Math.round((this.stats.aiAcceptedCount / total) * 100);
    const aiRejectionRate = 100 - aiAcceptanceRate;
    const factChangeRate = Math.round((this.stats.firstChoiceChangedCount / total) * 100);

    return {
      status: { ...this.status },
      values: { ...this.values },
      history: this.history,
      timeline: this.generateTimelineDetails(),
      story: this.generateLifeStory(),
      osmu: this.generateOsmuContent(),
      triggeredEffects: this.triggeredEffectsHistory,
      stats: {
        totalDecisions: this.stats.totalDecisions,
        aiAcceptanceRate,
        aiRejectionRate,
        factChangeRate
      }
    };
  }
}
