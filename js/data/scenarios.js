/**
 * MY AI LIFE - 10대~50대 연령별 사건 카드 및 팩트 데이터셋
 */

export const SCENARIOS = [
  // ==========================================
  // [10대] 진로와 정체성: 꿈 vs 안정
  // ==========================================
  {
    id: 'EVT_10_CAREER_DREAM',
    age: 17,
    stage: '10s',
    title: '진로의 첫 갈림길: 꿈인가 안정인가',
    situation: '고등학교 2학년입니다. 성적은 중상위권이며 디지털 콘텐츠와 영상 제작에 깊은 열정을 느끼고 있습니다. 부모님과 선생님은 취업이 안정적인 상경계열 또는 공학 계열 진학을 강력히 권하고 있습니다.',
    aiRecommendation: {
      recommendedOptionId: 'opt_stability',
      rationale: '현재 입시 데이터와 향후 10년 일자리 전망 지표 분석 결과, 공학/상경 계열 진학 시 취업 안정성 및 기대 소득 중앙값이 42% 더 높습니다. 경제적 리스크를 최소화하기 위해 전공 학업에 전념할 것을 권고합니다.',
      efficiencyScore: { opt_stability: 92, opt_balance: 74, opt_dream: 48 }
    },
    options: [
      {
        id: 'opt_stability',
        label: '안정적인 전공 진학 중심',
        description: '취업률 높은 학과 진학을 위해 학업과 내신 관리에 모든 시간을 투자합니다.',
        immediateEffect: { money: 0, career: +10, skill: +5, relation: +5, time: -15, life: -10 },
        valueWeights: { stability: +20, wealth: +10, challenge: -15, freedom: -10 },
        factCard: {
          title: '대한민국 전공별 취업률 및 초임 연봉 통계',
          badge: '교육부/한국교육개발원 통계',
          highlightStat: '이공/상경계열 평균 취업률 74.8% (인문/예체능 대비 +18.3%p)',
          riskStat: '직무 불만족 및 번아웃 경험 비율 43.2%',
          insight: '안정적 진학은 사회 진입 리스크를 줄이지만, 내적 동기 부재 시 장기적 직업 만족도가 급감할 수 있습니다.'
        },
        butterflyEffect: {
          triggerAge: 24,
          title: '안정적 진학의 결과',
          description: '17세 때 전공 학업에 매진한 결과, 경쟁력 있는 학벌과 학점을 확보해 안정적인 취업 기회를 얻었습니다.',
          effect: { career: +15, money: +10, life: -5 }
        }
      },
      {
        id: 'opt_balance',
        label: '학업과 콘텐츠 제작 병행',
        description: '학업 성적을 유지하면서 방과 후와 주말을 쪼개 영상 제작 및 포트폴리오를 쌓습니다.',
        immediateEffect: { money: -5, career: +5, skill: +20, relation: -5, time: -25, life: +5 },
        valueWeights: { growth: +20, challenge: +10, freedom: -15, stability: +5 },
        factCard: {
          title: '복수 역량(하이브리드형) 인재 시장 가치',
          badge: '글로벌 HR 트렌드 리포트',
          highlightStat: '전공 지식 + 디지털 창작 능력을 겸비한 인재 채용 선호도 68% 증가',
          riskStat: '수면 부족 및 학업/활동 양립 실패율 52%',
          insight: '병행은 높은 잠재력을 창출하지만, 극심한 시간 빈곤과 번아웃을 유발할 수 있습니다.'
        },
        butterflyEffect: {
          triggerAge: 24,
          title: '다재다능한 포트폴리오의 나비효과',
          description: '17세부터 쌓아온 영상 제작 포트폴리오와 전공 지식이 결합되어, 신사업 마케팅 분야의 독보적 인재로 부각되었습니다.',
          effect: { skill: +20, career: +15, life: +10 }
        }
      },
      {
        id: 'opt_dream',
        label: '꿈에 모든 것을 올인 (창작 전념)',
        description: '정형화된 입시를 최소화하고, 크리에이터 공모전과 독립 프로덕션 활동에 몰입합니다.',
        immediateEffect: { money: -10, career: -5, skill: +25, relation: -10, time: +10, life: +20 },
        valueWeights: { challenge: +25, freedom: +25, stability: -25, growth: +15 },
        factCard: {
          title: '예술/크리에이터 생태계 소득 분포',
          badge: '문화체육관광부 예술인 실태조사',
          highlightStat: '상위 5% 창작자의 소득 성장률은 일반 직장인의 4.2배',
          riskStat: '초기 3년간 하위 70%의 월평균 창작 소득 95만 원 미만',
          insight: '폭발적인 자아실현과 대박의 기회가 있으나, 초기 생존 확률이 극히 낮습니다.'
        },
        butterflyEffect: {
          triggerAge: 24,
          title: '야생에서 단련된 크리에이터',
          description: '수많은 공모전 탈락과 시련 속에서 독보적인 감각을 얻어, 독립 스튜디오를 직접 런칭했습니다.',
          effect: { skill: +25, freedom: +20, money: -10, stability: -15 }
        }
      }
    ]
  },

  // ==========================================
  // [20대] 생존과 독립: 기회 vs 현실
  // ==========================================
  {
    id: 'EVT_20_FIRST_JOB',
    age: 26,
    stage: '20s',
    title: '첫 커리어의 결정: 스타트업 vs 대기업 계약직',
    situation: '취업 전선에서 두 곳의 최종 제안을 받았습니다. 빠르게 성장 중이지만 야근이 많고 불안정한 AI 스타트업(정규직, 연봉 3,300만)과, 브랜드 파워가 높고 급여가 높지만 고용이 불안한 대기업(계약직, 연봉 4,200만)입니다.',
    aiRecommendation: {
      recommendedOptionId: 'opt_corp_contract',
      rationale: '초기 3년간의 자산 형성 복리 효과와 네임밸류를 계산하면, 대기업 계약직의 즉각적 경제 효율 점수가 32% 더 우세합니다. 청년기 시드머니 확보를 최우선으로 할 것을 제안합니다.',
      efficiencyScore: { opt_corp_contract: 89, opt_startup: 68, opt_freelance: 42 }
    },
    options: [
      {
        id: 'opt_corp_contract',
        label: '대기업 2년 계약직 (연봉 4,200만 / 네임밸류)',
        description: '높은 초기 연봉과 체계적인 시스템을 경험하며 시드머니를 모읍니다.',
        immediateEffect: { money: +25, career: +15, skill: +5, relation: 0, time: -10, life: -5 },
        valueWeights: { wealth: +20, stability: +15, challenge: -10 },
        factCard: {
          title: '대기업 계약직의 정규직 전환 및 이직 실태',
          badge: '고용노동부 청년고용조사',
          highlightStat: '계약 기간 동안 평균 저축액 동년배 대비 1.6배',
          riskStat: '계약 만료 후 동급 정규직 이직 성공률 24.3%',
          insight: '초기 자산 축적에는 유리하나, 2년 후 고용 절벽에 직면할 위험이 내포되어 있습니다.'
        },
        butterflyEffect: {
          triggerAge: 32,
          title: '계약직 커리어의 명과 암',
          description: '20대에 확보한 종잣돈은 주거 안정의 밑거름이 되었지만, 정규직 전환 실패로 인한 커리어 단절을 메우기 위해 치열한 재취업을 겪었습니다.',
          effect: { money: +15, career: -10, life: -5 }
        }
      },
      {
        id: 'opt_startup',
        label: '성장기 스타트업 정규직 (연봉 3,300만 / 폭풍 성장)',
        description: '낮은 연봉과 많은 업무량을 감수하고, 폭넓은 권한과 주도적인 실무 경험을 선택합니다.',
        immediateEffect: { money: +10, career: +10, skill: +25, relation: -5, time: -30, life: +5 },
        valueWeights: { growth: +25, challenge: +20, stability: -15, freedom: -10 },
        factCard: {
          title: '초기 스타트업 코어 멤버의 5년 후 커리어 궤적',
          badge: '스타트업 얼라이언스 리포트',
          highlightStat: '스타트업 스케일업 성공 시 스톡옵션 및 C레벨 이직률 31.2%',
          riskStat: '스타트업 3년 생존율 38.5% 및 주 52시간 초과 근무율 71%',
          insight: '폭발적인 역량 성장과 지분 보상의 기회가 있으나, 삶의 여유와 회사의 존속이 위태로울 수 있습니다.'
        },
        butterflyEffect: {
          triggerAge: 32,
          title: '스타트업 전설의 주역',
          description: '26세 때 뛰어든 스타트업이 유니콘으로 도약하며 팀 리더로 인정받아 업계에서 높은 몸값을 인정받게 되었습니다.',
          effect: { career: +25, skill: +15, money: +20 }
        }
      },
      {
        id: 'opt_freelance',
        label: '독립 프리랜서 및 1인 비즈니스 (자유로운 도전)',
        description: '어디에도 얽매이지 않고 개인 프로젝트와 외주를 통해 독자적인 생존력을 기릅니다.',
        immediateEffect: { money: -5, career: +5, skill: +15, relation: -10, time: +20, life: +15 },
        valueWeights: { freedom: +30, challenge: +20, stability: -30, wealth: -10 },
        factCard: {
          title: 'MZ세대 긱 워커(Gig Worker) 소득 안정성 통계',
          badge: '한국은행 금융경제연구',
          highlightStat: '시간 활용 자율성 및 직무 자율성 만족도 84.6%',
          riskStat: '소득 변동성 계수(월 소득 불규칙성) 직장인의 3.8배',
          insight: '극도의 자유와 주도성을 누릴 수 있지만, 사회적 안전망의 부재를 스스로 감당해야 합니다.'
        },
        butterflyEffect: {
          triggerAge: 32,
          title: '구축된 퍼스널 브랜딩',
          description: '20대부터 다져온 독자적 포트폴리오와 네트워크 덕분에 고단가 전문 컨설턴트로 자리매김했습니다.',
          effect: { freedom: +20, skill: +15, relation: +10 }
        }
      }
    ]
  },

  // ==========================================
  // [30대] 결합과 자산: 책임 vs 자유
  // ==========================================
  {
    id: 'EVT_30_LIFE_PIVOT',
    age: 34,
    stage: '30s',
    title: '삶의 무게중심: 주거 안정(영끌) vs 유연한 삶(자유/투자)',
    situation: '자산 약 9,000만 원을 모았습니다. 대출을 최대로 일으켜(영끌) 수도권 아파트 청약/매매로 내 집을 마련할 것인지, 아니면 전·월세를 유지하며 자본을 금융 투자 및 자기계발에 유동적으로 굴릴 것인지 중대한 결정의 순간입니다.',
    aiRecommendation: {
      recommendedOptionId: 'opt_buy_home',
      rationale: '거시경제 인플레이션 헷지와 주거 안정성 모델링 결과, 레버리지를 활용한 실거주 주택 마련이 10년 후 순자산 방어율에서 78%의 확률로 우위를 점합니다.',
      efficiencyScore: { opt_buy_home: 87, opt_invest_freedom: 72, opt_work_life_balance: 55 }
    },
    options: [
      {
        id: 'opt_buy_home',
        label: '최대 대출을 활용한 주택 마련 (자산 안정성 집중)',
        description: '월급의 상당 부분을 대출 원리금 상환에 투입하며 주거 안정과 부동산 자산을 확보합니다.',
        immediateEffect: { money: -20, career: +5, skill: 0, relation: +15, time: -15, life: -10 },
        valueWeights: { stability: +25, wealth: +20, freedom: -25, challenge: -15 },
        factCard: {
          title: '30대 가구 자산 구조 및 부채 상환 부담 통계',
          badge: '통계청 가계금융복지조사',
          highlightStat: '자가 보유 가구의 10년 평균 순자산 증가율 전월세 가구 대비 +44%',
          riskStat: '소득 대비 원리금 상환 비율(DSR) 40% 초과 시 삶의 만족도 38% 하락',
          insight: '확실한 자산 방패가 되지만, 매달 돌아오는 상환 압박으로 인해 커리어 전환이나 모험이 극히 제한됩니다.'
        },
        butterflyEffect: {
          triggerAge: 42,
          title: '부동산 가치 상승과 든든한 보금자리',
          description: '34세에 감수한 대출 상환의 고통을 지나 주택 가치가 안정되어 가족의 든든한 기반이 되었습니다.',
          effect: { money: +30, relation: +15, stability: +20 }
        }
      },
      {
        id: 'opt_invest_freedom',
        label: '전월세 유지 + 글로벌 분산 투자 및 유연성 확보',
        description: '부동산에 묶이지 않고 유동 자산을 주식/채권/신사업에 분산 투자하며 기회에 민첩하게 대응합니다.',
        immediateEffect: { money: +10, career: +5, skill: +10, relation: 0, time: +10, life: +10 },
        valueWeights: { freedom: +20, wealth: +15, growth: +15, stability: -15 },
        factCard: {
          title: '금융 자산 중심 포트폴리오의 유동성 효과',
          badge: '자본시장연구원 자산배분 리포트',
          highlightStat: '언제든 이직/해외이주/창업에 투입할 수 있는 유동성 지수 최상위',
          riskStat: '글로벌 자산 시장 폭락 시 원금 손실 위험 및 잦은 주거 이전 스트레스',
          insight: '인생의 기동성과 높은 기대수익을 확보하지만, 주거 불안정성과 시장 변동성의 파도를 견뎌야 합니다.'
        },
        butterflyEffect: {
          triggerAge: 42,
          title: '자유로운 자본 유동성의 결실',
          description: '부동산에 묶이지 않은 풍부한 유동성 덕분에 40대 초반 급부상한 신사업 기회에 과감히 베팅할 수 있었습니다.',
          effect: { money: +25, skill: +20, challenge: +15 }
        }
      },
      {
        id: 'opt_work_life_balance',
        label: '자산보다 현재의 가족·여가와 건강 우선 (워라밸)',
        description: '무리한 재테크보다 가족 및 연인과의 시간, 취미, 건강 관리에 삶의 자원을 배분합니다.',
        immediateEffect: { money: -5, career: -5, skill: 0, relation: +25, time: +25, life: +25 },
        valueWeights: { relation: +30, freedom: +20, stability: +10, wealth: -20 },
        factCard: {
          title: '30대 스트레스와 가족 관계가 노후 행복에 미치는 영향',
          badge: '하버드 성인발달연구 85년 추적',
          highlightStat: '30~40대에 다져진 친밀한 관계는 70대 건강 및 행복의 단일 최대 예측 변수',
          riskStat: '중장기 자산 형성 지연으로 인한 은퇴 시점 불안감 증가',
          insight: '돈으로 살 수 없는 관계와 건강의 토대를 쌓지만, 물질적 안전망 구축이 지연될 수 있습니다.'
        },
        butterflyEffect: {
          triggerAge: 42,
          title: '단단한 가족과 정신적 회복탄력성',
          description: '30대에 쌓아온 끈끈한 가족 관계와 건강한 정신 덕분에 40대의 직업적 위기 속에서도 흔들리지 않는 안식처를 지켰습니다.',
          effect: { relation: +25, life: +20, time: +10 }
        }
      }
    ]
  },

  // ==========================================
  // [40대] 버티기 vs 도전: 책임 vs 자아실현
  // ==========================================
  {
    id: 'EVT_40_AI_DISRUPTION',
    age: 45,
    stage: '40s',
    title: 'AI 대격변 시대: 현 직장 수성 vs AI 재교육 및 직무 전환',
    situation: '15년간 몸담아온 전문 분야에 생성형 AI와 자동화 시스템이 급격히 도입되며 기존 업무 방식이 근본부터 흔들리고 있습니다. 자녀 교육비와 대출 이자 등 부양 책임이 절정에 달한 상황에서 어떻게 대처하시겠습니까?',
    aiRecommendation: {
      recommendedOptionId: 'opt_keep_current',
      rationale: '40대 중반의 부양비 지출 곡선과 고정비용을 감안할 때, 당장의 안정적인 급여를 유지하며 조직 내 관리직 위치를 지키는 것이 파산 리스크를 최소화하는 길입니다.',
      efficiencyScore: { opt_keep_current: 85, opt_ai_reskill: 76, opt_independent_biz: 49 }
    },
    options: [
      {
        id: 'opt_keep_current',
        label: '현재 직무와 조직 내 입지 수성에 집중 (버티기)',
        description: '급격한 변화보다는 사내 정치와 관리자로서의 입지를 다져 정년까지 버티는 길을 택합니다.',
        immediateEffect: { money: +15, career: +5, skill: -15, relation: 0, time: -10, life: -10 },
        valueWeights: { stability: +25, wealth: +15, challenge: -25, growth: -20 },
        factCard: {
          title: '4050 화이트칼라 재직 기간 및 기술 대체율',
          badge: 'OECD 고용전망 보고서',
          highlightStat: '현재 소득 보전율 100% 유지 (단기 가계 재정 안정)',
          riskStat: '향후 5년 내 AI 자동화로 인한 중간 관리직 감축 예상률 34.6%',
          insight: '단기적으로 가계를 안전하게 지키지만, 기술 격차로 인해 갑작스러운 구조조정 시 취약해집니다.'
        },
        butterflyEffect: {
          triggerAge: 53,
          title: '조직 개편의 후폭풍',
          description: '45세 때 기술 변화를 외면한 대가로, 50대 초반 대규모 희망퇴직 대상 1순위에 오르며 급작스러운 위기를 맞았습니다.',
          effect: { career: -20, skill: -15, life: -15 }
        }
      },
      {
        id: 'opt_ai_reskill',
        label: '새벽/주말을 깎아 AI 재교육 및 신직무 전환 시도',
        description: '적지 않은 비용과 여가 시간을 희생하여 AI 도구 활용 능력과 신기술을 마스터합니다.',
        immediateEffect: { money: -15, career: +10, skill: +30, relation: -10, time: -30, life: +5 },
        valueWeights: { growth: +30, challenge: +25, freedom: -15, stability: +5 },
        factCard: {
          title: '중장년층 재교육(Reskilling) 성공자의 임금 및 고용 유지력',
          badge: '세계경제포럼(WEF) 미래 일자리 리포트',
          highlightStat: 'AI 활용 재교육 수료자의 50대 고용 유지 기간 +4.8년',
          riskStat: '학습 피로도 및 가사/육아 병행 난이도 최고조',
          insight: '극심한 체력적·정신적 압박을 수반하지만, 시대를 앞서가는 대체 불가능한 전문성을 확보합니다.'
        },
        butterflyEffect: {
          triggerAge: 53,
          title: 'AI 전환을 주도하는 50대 전문가',
          description: '45세에 피땀 흘려 배운 신기술 덕분에, 50대에 사내 디지털 혁신 총괄 임원으로 승진하거나 외부 전문 자문으로 발탁되었습니다.',
          effect: { career: +25, skill: +20, money: +25 }
        }
      },
      {
        id: 'opt_independent_biz',
        label: '그동안의 노하우를 바탕으로 독립 창업/컨설팅 도전',
        description: '회사에 의존하지 않고 내 이름으로 된 비즈니스를 시작하여 제2의 도약을 꾀합니다.',
        immediateEffect: { money: -25, career: +15, skill: +15, relation: -15, time: -20, life: +15 },
        valueWeights: { challenge: +30, freedom: +25, stability: -30, wealth: -15 },
        factCard: {
          title: '40대 전문직 창업 생존율 및 수익성',
          badge: '중소벤처기업부 창업기업 동향',
          highlightStat: '업계 10년 이상 경력자의 창업 생존율, 청년 창업 대비 2.1배',
          riskStat: '초기 2년 내 가계 부채 증가율 45%',
          insight: '자신의 운명을 스스로 통제하는 짜릿한 기회이나, 가계 재정 전체를 담보로 거는 도박이 될 수 있습니다.'
        },
        butterflyEffect: {
          triggerAge: 53,
          title: '안착한 독립 비즈니스',
          description: '45세에 감행한 독립 덕분에 정년 걱정 없는 나만의 비즈니스 파이프라인을 완성했습니다.',
          effect: { freedom: +25, money: +20, career: +15 }
        }
      }
    ]
  },

  // ==========================================
  // [50대] 관계 vs 노후: 자녀 지원 vs 노후 생존
  // ==========================================
  {
    id: 'EVT_50_RETIREMENT_DILEMMA',
    age: 56,
    stage: '50s',
    title: '인생 2막의 딜레마: 자녀 주거 지원 vs 온전한 노후 자금 사수',
    situation: '정년퇴직과 희망퇴직의 기로에 섰습니다. 퇴직금 및 은퇴 자산 2억 5천만 원이 마련되었습니다. 독립하는 자녀가 높은 전세금/주거비로 인해 큰 어려움을 호소하며 지원을 부탁해왔습니다. 당신은 어떻게 결정하시겠습니까?',
    aiRecommendation: {
      recommendedOptionId: 'opt_keep_pension',
      rationale: '향후 30년 기대여명 동안의 의료비 및 생활비 시뮬레이션 결과, 노후 자금을 자녀에게 증여할 시 70대 이후 빈곤층 진입 확률이 41% 급증합니다. 전액 노후 보전을 권고합니다.',
      efficiencyScore: { opt_keep_pension: 94, opt_partial_support: 70, opt_full_support: 35 }
    },
    options: [
      {
        id: 'opt_keep_pension',
        label: '노후 자금 전액 사수 (자기 완결형 은퇴)',
        description: '자녀의 자립을 원칙으로 삼고, 내 노후가 자녀의 짐이 되지 않도록 연금과 자산을 온전히 보존합니다.',
        immediateEffect: { money: +30, career: 0, skill: 0, relation: -20, time: +20, life: +10 },
        valueWeights: { stability: +30, wealth: +20, relation: -25, freedom: +15 },
        factCard: {
          title: '대한민국 노인 빈곤율 및 자녀 부양 의식 변화',
          badge: '보건복지부 / 통계청 고령자 통계',
          highlightStat: '자가 노후 준비 완료 노년층의 삶의 질 만족도 82.4%',
          riskStat: '자녀와의 정서적 거리감 및 단절감 경험 비율 28.5%',
          insight: '경제적으로 완벽한 독립과 자립을 지키지만, 가족과의 정서적 유대에 상처가 남을 수 있습니다.'
        },
        butterflyEffect: {
          triggerAge: 65,
          title: '품격 있는 황혼과 경제적 자립',
          description: '56세에 지켜낸 노후 자산 덕분에 자녀에게 손벌리지 않고 취미와 여행을 즐기며 당당한 황혼을 맞이했습니다.',
          effect: { money: +20, life: +20, freedom: +20 }
        }
      },
      {
        id: 'opt_partial_support',
        label: '절충안 (일부 지원 + 금융 교육/자립 조건)',
        description: '노후 자산의 30% 한도 내에서 지원하되, 나머지는 자녀 스스로 책임지도록 가이드를 제시합니다.',
        immediateEffect: { money: +10, career: 0, skill: +5, relation: +10, time: +10, life: +10 },
        valueWeights: { relation: +15, stability: +15, wealth: -10, growth: +10 },
        factCard: {
          title: '세대 간 자산 이전과 가족 유대감 상관관계',
          badge: '한국보건사회연구원 복지패널조사',
          highlightStat: '조건부/절충형 지원 시 자녀와의 유대감 및 자립 의지 양호 74%',
          riskStat: '은퇴 생활비 지출 예산 15~20% 축소 필요',
          insight: '가족의 사랑과 경제적 현실 사이에서 가장 균형 잡힌 타협점을 형성합니다.'
        },
        butterflyEffect: {
          triggerAge: 65,
          title: '화목한 세대 화합과 평온한 일상',
          description: '56세에 보여준 지혜로운 절충 덕분에 자녀는 자립에 성공했고, 주말마다 손주들의 웃음소리가 끊이지 않는 가정을 이루었습니다.',
          effect: { relation: +25, life: +20, stability: +10 }
        }
      },
      {
        id: 'opt_full_support',
        label: '자녀 주거 전폭 지원 (부모로서의 헌신)',
        description: '내 노후는 소일거리와 국민연금으로 버티더라도 자녀가 안정적으로 새 출발을 하도록 가진 것을 쏟아붓습니다.',
        immediateEffect: { money: -35, career: -10, skill: 0, relation: +30, time: -10, life: +5 },
        valueWeights: { relation: +35, stability: -30, wealth: -30, challenge: -10 },
        factCard: {
          title: '자녀 과다 지원 부모의 은퇴 후 재취업 실태',
          badge: '한국고용정보원 고령자 취업동향',
          highlightStat: '자녀 세대의 사회적 안착 및 극진한 감사와 효도',
          riskStat: '65세 이후 비자발적 단순노무직 재취업 비율 62.3%',
          insight: '가족에 대한 지극한 사랑을 실천하지만, 자신의 황혼이 신체적·경제적 노동에 묶이게 됩니다.'
        },
        butterflyEffect: {
          triggerAge: 65,
          title: '자녀의 성공과 묵묵한 헌신의 무게',
          description: '자녀는 부모의 희생 덕분에 훌륭히 안착했으나, 당신은 여전히 생활비를 위해 소일거리를 이어가고 있습니다.',
          effect: { relation: +25, money: -20, time: -15 }
        }
      }
    ]
  }
];
