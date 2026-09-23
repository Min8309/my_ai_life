/**
 * MY AI LIFE - 게임 상수 및 초기 설정
 */

// 6대 Life Status 초기 기본값 (0~100)
export const INITIAL_STATUS = {
  money: 30,     // 💰 자산
  career: 10,    // 💼 커리어
  skill: 30,     // 📚 역량
  relation: 60,  // 🤝 관계
  time: 70,      // ⏳ 여유 시간
  life: 65       // 🌱 삶의 만족도 및 자아실현
};

// 가치관 축 정의 (0~100)
export const VALUE_KEYS = {
  stability: '안정',
  growth: '성장',
  wealth: '돈/자산',
  relation: '관계/가족',
  freedom: '자유/여가',
  challenge: '도전/모험'
};

// 초기 가치관 기본값
export const INITIAL_VALUES = {
  stability: 50,
  growth: 50,
  wealth: 50,
  relation: 50,
  freedom: 50,
  challenge: 50
};

// AI 파트너 페르소나 단계
export const AI_PERSONA_STAGES = {
  OPTIMIZER: {
    stage: '초반 (10~20대)',
    name: 'The Optimizer (최적화 분석관)',
    tagline: '데이터와 수치 기반의 극효율 경로를 도출합니다.',
    avatarIcon: '🤖'
  },
  CHALLENGER: {
    stage: '중반 (30~40대)',
    name: 'The Challenger (가치관 도전자)',
    tagline: '효율의 이면에 숨겨진 기회비용과 트레이드오프를 질문합니다.',
    avatarIcon: '⚡'
  },
  REFLECTOR: {
    stage: '후반 (50대 및 회고)',
    name: 'The Reflector (인생의 거울)',
    tagline: '당신이 쌓아온 선택의 궤적과 고유한 인간성을 비춥니다.',
    avatarIcon: '🪞'
  }
};
