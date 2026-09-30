/**
 * MY AI LIFE - 최종 리포트 및 패러럴 라이프 비교 대시보드 컴포넌트
 */
import { VALUE_KEYS } from '../data/constants.js';

export class ReportView {
  constructor(onRestartCallback) {
    this.onRestart = onRestartCallback;
    this.containerEl = document.getElementById('report-screen');
    this.restartBtn = document.getElementById('btn-restart-game');

    if (this.restartBtn) {
      this.restartBtn.addEventListener('click', () => {
        if (this.onRestart) this.onRestart();
      });
    }
  }

  /**
   * 최종 리포트 화면 렌더링
   * @param {Object} myLifeReport - 플레이어의 인생 결과 데이터
   * @param {Object} aiLifeReport - AI 단독 인생 결과 데이터
   */
  render(myLifeReport, aiLifeReport) {
    // 1. 핵심 통계 수치 바인딩
    document.getElementById('stat-ai-acceptance').textContent = `${myLifeReport.stats.aiAcceptanceRate}%`;
    document.getElementById('stat-ai-rejection').textContent = `${myLifeReport.stats.aiRejectionRate}%`;
    document.getElementById('stat-fact-change').textContent = `${myLifeReport.stats.factChangeRate}%`;

    // 2. 평행우주 듀얼 스탯 비교 렌더링
    this.renderDualMetrics('my-life-metrics', myLifeReport.status, '#10B981');
    this.renderDualMetrics('ai-life-metrics', aiLifeReport.status, '#00F0FF');

    // 3. 가치관 프로파일 바 렌더링
    this.renderValueProfile(myLifeReport.values);

    // 4. YOUR LIFE TIMELINE 가로형 타임라인 렌더링
    this.renderTimeline(myLifeReport.timeline);

    // 5. MY LIFE STORY 서사 렌더링
    this.renderLifeStory(myLifeReport.story);

    // 6. ONE LIFE SOURCE : OSMU 콘텐츠 렌더링
    this.renderOsmuStudio(myLifeReport.osmu);
  }

  /**
   * 가로형 인터랙티브 타임라인 렌더링
   */
  renderTimeline(timeline) {
    if (!timeline || timeline.length === 0) return;

    const trackContainer = document.getElementById('horizontal-timeline-track');
    if (!trackContainer) return;

    trackContainer.innerHTML = timeline.map((item, idx) => `
      <div class="timeline-node ${idx === 0 ? 'active' : ''}" data-index="${idx}">
        <div class="node-age-bubble">${item.age}세</div>
        <div class="node-icon-circle">${item.icon}</div>
        <div class="node-choice-name">${item.finalChoice.label.split('(')[0]}</div>
        <div class="node-tags-wrap">
          <span class="node-tag-ai">${item.aiRecommendation.tag}</span>
          <span class="node-tag-my">${item.finalChoice.tag}</span>
        </div>
      </div>
    `).join('');

    // 노드 클릭 이벤트 바인딩
    const nodes = trackContainer.querySelectorAll('.timeline-node');
    nodes.forEach(node => {
      node.addEventListener('click', () => {
        nodes.forEach(n => n.classList.remove('active'));
        node.classList.add('active');
        const index = parseInt(node.dataset.index, 10);
        this.renderTimelineInspector(timeline[index]);
      });
    });

    // 첫 번째 노드 기본 활성화
    this.renderTimelineInspector(timeline[0]);
  }

  /**
   * 타임라인 노드 상세 인스펙터 렌더링
   */
  renderTimelineInspector(item) {
    const container = document.getElementById('timeline-inspector-card');
    if (!container || !item) return;

    container.innerHTML = `
      <div class="inspector-header">
        <div class="inspector-title-wrap">
          <span class="inspector-age-badge">${item.age}세 사건</span>
          <h4 class="inspector-title">${item.scenarioTitle}</h4>
        </div>
        <div class="inspector-icon">${item.icon}</div>
      </div>

      <div class="inspector-grid">
        <!-- 1. AI 권고 -->
        <div class="inspector-box ai-box">
          <div class="box-label">🤖 AI 권고</div>
          <div class="box-value">${item.aiRecommendation.label}</div>
        </div>

        <!-- 2. 당신의 1차 선택 -->
        <div class="inspector-box first-box">
          <div class="box-label">👤 당신의 1차 선택</div>
          <div class="box-value">${item.firstChoice.label}</div>
        </div>

        <!-- 3. FACT CARD 데이터 -->
        <div class="inspector-box fact-box">
          <div class="box-label">📊 FACT CARD 핵심 데이터</div>
          <div class="box-value">${item.factCard ? item.factCard.highlightStat : '통계 데이터 확인 완료'}</div>
        </div>

        <!-- 4. 최종 확정 선택 -->
        <div class="inspector-box final-box">
          <div class="box-label">🔄 최종 결정</div>
          <div class="box-value ${item.isChangedFromFirst ? 'changed' : ''}">
            ${item.finalChoice.label} ${item.isChangedFromFirst ? '<span class="tag-changed">(1차 선택 번복)</span>' : '<span class="tag-maintained">(선택 유지)</span>'}
          </div>
        </div>
      </div>

      <!-- 5. 지연된 나비효과 (Butterfly Effect) -->
      ${item.butterflyEffect ? `
        <div class="inspector-butterfly-box">
          <div class="butterfly-title">🦋 [${item.butterflyEffect.triggerAge}세에 발동된 나비효과] ${item.butterflyEffect.title}</div>
          <div class="butterfly-desc">${item.butterflyEffect.description}</div>
        </div>
      ` : `
        <div class="inspector-butterfly-box empty">
          <div class="butterfly-desc">이 선택은 독립적인 경로로 남았습니다.</div>
        </div>
      `}
    `;
  }

  /**
   * OSMU 콘텐츠 스튜디오 렌더링 및 탭 이벤트 바인딩
   */
  renderOsmuStudio(osmu) {
    if (!osmu) return;

    // 1. 웹툰 콘티 렌더링
    const webtoonContainer = document.getElementById('webtoon-cuts-container');
    if (webtoonContainer && osmu.webtoonCuts) {
      webtoonContainer.innerHTML = osmu.webtoonCuts.map(cut => `
        <div class="webtoon-cut-card">
          <div class="cut-header">
            <span class="cut-num">CUT #${cut.cutNumber}</span>
            <span class="cut-age">${cut.age}세</span>
          </div>
          <h5 class="cut-title">${cut.title}</h5>
          <div class="cut-scene-desc">${cut.sceneDescription}</div>
          <div class="cut-dialogue-ai">${cut.aiDialogue}</div>
          <div class="cut-dialogue-user">${cut.userDialogue}</div>
          ${cut.factCaption ? `<div class="cut-fact-caption">${cut.factCaption}</div>` : ''}
          ${cut.butterflyNote ? `<div class="cut-butterfly-note">${cut.butterflyNote}</div>` : ''}
        </div>
      `).join('');
    }

    // 2. 숏폼 대본 렌더링
    const shortsContainer = document.getElementById('shorts-script-container');
    if (shortsContainer && osmu.shortsScript) {
      shortsContainer.innerHTML = osmu.shortsScript.map(row => `
        <div class="shorts-script-row">
          <div class="shorts-time">${row.timecode}</div>
          <div class="shorts-section">${row.section}</div>
          <div class="shorts-body">
            <div class="shorts-visual">🎬 <strong>화면:</strong> ${row.visual}</div>
            <div class="shorts-narration">🎙️ <strong>나레이션:</strong> "${row.narration}"</div>
          </div>
        </div>
      `).join('');
    }

    // 3. Google Vids 프롬프트 렌더링 및 복사 이벤트 바인딩
    const vidsPromptEl = document.getElementById('vids-prompt-preview-text');
    const copyBtn = document.getElementById('btn-copy-vids-prompt');
    if (vidsPromptEl && osmu.googleVidsPrompt) {
      vidsPromptEl.textContent = osmu.googleVidsPrompt;
    }

    if (copyBtn && osmu.googleVidsPrompt) {
      copyBtn.onclick = () => {
        navigator.clipboard.writeText(osmu.googleVidsPrompt).then(() => {
          const originalText = copyBtn.innerHTML;
          copyBtn.innerHTML = '✅ 프롬프트 복사 완료!';
          copyBtn.style.background = '#10B981';
          copyBtn.style.color = '#FFFFFF';
          setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.style.background = '';
            copyBtn.style.color = '';
          }, 2500);
        }).catch(err => {
          console.error('클립보드 복사 실패:', err);
          alert('프롬프트 복사에 실패했습니다. 텍스트를 직접 드래그하여 복사해 주세요.');
        });
      };
    }

    // 4. 탭 전환 이벤트 바인딩
    const tabBtns = document.querySelectorAll('.osmu-tab-btn');
    const tabContents = document.querySelectorAll('.osmu-tab-content');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        const targetTab = btn.dataset.tab;
        const targetContent = document.getElementById(`osmu-content-${targetTab}`);
        if (targetContent) targetContent.classList.add('active');
      });
    });
  }

  renderLifeStory(story) {
    if (!story) return;

    const timelineContainer = document.getElementById('story-timeline-list');
    const divergenceContainer = document.getElementById('story-ai-divergence');
    const conclusionContainer = document.getElementById('story-conclusion');

    if (timelineContainer && story.storyLines) {
      timelineContainer.innerHTML = story.storyLines.map(line => `
        <div class="story-timeline-item">
          <div class="story-age-tag">${line.age}세</div>
          <div class="story-line-content">
            <p class="story-line-text">${line.age}세, 당신은 <strong>${line.summary}</strong></p>
          </div>
        </div>
      `).join('');
    }

    if (divergenceContainer && story.aiDivergenceSummary) {
      divergenceContainer.innerHTML = `
        <div class="story-divergence-box">
          <span style="color:var(--neon-cyan); font-weight:700;">🤖 AI 파트너의 기록</span>
          <p>${story.aiDivergenceSummary}</p>
        </div>
      `;
    }

    if (conclusionContainer && story.conclusion) {
      conclusionContainer.innerHTML = `
        <div class="story-conclusion-box">
          <p>${story.conclusion}</p>
        </div>
      `;
    }
  }

  renderDualMetrics(containerId, status, barColor) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const metricLabels = {
      money: '💰 자산/소득',
      career: '💼 커리어/직무',
      skill: '📚 역량/지식',
      relation: '🤝 관계/가족',
      time: '⏳ 여가/시간',
      life: '🌱 삶의 만족/자유'
    };

    container.innerHTML = Object.entries(status).map(([key, val]) => `
      <div class="metric-row">
        <span class="metric-name">${metricLabels[key] || key}</span>
        <div class="metric-bar-wrap">
          <div class="metric-bar-val" style="width: ${Math.min(100, Math.max(0, val))}%; background: ${barColor};"></div>
        </div>
        <span class="metric-score">${Math.round(val)}</span>
      </div>
    `).join('');
  }

  renderValueProfile(values) {
    const container = document.getElementById('values-profile-grid');
    if (!container) return;

    container.innerHTML = Object.entries(values).map(([key, val]) => {
      const label = VALUE_KEYS[key] || key;
      const normalizedVal = Math.min(100, Math.max(0, val));
      return `
        <div class="value-item">
          <div class="value-label">
            <span>${label}</span>
            <span style="font-family:var(--font-mono); color:var(--neon-cyan);">${Math.round(normalizedVal)}</span>
          </div>
          <div class="value-bar-track">
            <div class="value-bar-fill" style="width: ${normalizedVal}%;"></div>
          </div>
        </div>
      `;
    }).join('');
  }
}
