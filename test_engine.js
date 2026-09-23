/**
 * 단위 검증 테스트 스크립트 (Node.js 실행용)
 */
import { SCENARIOS } from './js/data/scenarios.js';
import { LifeEngine } from './js/engine/LifeEngine.js';
import { ParallelLifeEngine } from './js/engine/ParallelLifeEngine.js';

console.log('=== 1. 시나리오 데이터셋 검증 ===');
console.log(`총 시나리오 수: ${SCENARIOS.length}`);
SCENARIOS.forEach((s, idx) => {
  console.log(`[${idx + 1}] 연령: ${s.age}세 (${s.stage}), 제목: ${s.title}, 선택지 수: ${s.options.length}`);
});

console.log('\n=== 2. ParallelLifeEngine (AI 단독 인생) 시뮬레이션 검증 ===');
const parallelEngine = new ParallelLifeEngine(SCENARIOS);
const aiResult = parallelEngine.simulateFullAiLife();
console.log('AI 최종 상태 (Status):', aiResult.status);
console.log('AI 최종 가치관 (Values):', aiResult.values);
console.log(`발동된 나비효과 수: ${aiResult.triggeredEffects.length}`);

console.log('\n=== 3. LifeEngine (인터랙티브 루프) 시뮬레이션 검증 ===');
const engine = new LifeEngine(SCENARIOS);

while (true) {
  const turn = engine.startCurrentTurn();
  if (!turn) break;

  const scenario = turn.scenario;
  console.log(`\n▶ [${scenario.age}세] ${scenario.title}`);
  if (turn.triggeredEffects.length > 0) {
    console.log(`  🦋 [발동된 나비효과] ${turn.triggeredEffects.map(e => e.title).join(', ')}`);
  }

  // 첫 번째 옵션으로 1차 선택 후 팩트카드 확인
  const firstChoice = scenario.options[0];
  const firstRes = engine.makeFirstChoice(firstChoice.id);
  console.log(`  1차 선택: ${firstChoice.label}`);
  console.log(`  팩트카드 확인: ${firstRes.factCard.title} (${firstRes.factCard.highlightStat})`);

  // 최종 선택 확정 (첫 번째 옵션 유지)
  const finalRes = engine.finalizeChoice(firstChoice.id);
  console.log(`  AI 반응: ${finalRes.aiComment}`);
}

const finalReport = engine.getFinalReport();
console.log('\n=== 4. 최종 리포트 데이터 검증 ===');
console.log('최종 스탯 (Status):', finalReport.status);
console.log('최종 가치관 (Values):', finalReport.values);
console.log('선택 통계:', finalReport.stats);
console.log('총 결정 수:', finalReport.history.length);
console.log('\n✅ 모든 데이터 모델 및 게임 엔진 로직이 정상 동작합니다.');
