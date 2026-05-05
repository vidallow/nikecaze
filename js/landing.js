function renderLanding() {
  return `
    <div class="screen landing fade-in">
      <div class="landing__badge">
        <span>CAZÉTV</span>
        <span>×</span>
        <span>NIKE</span>
      </div>

      <h1 class="landing__title">
        GANHE A CAMISA
        <span class="highlight">DA SELEÇÃO</span>
        2026
      </h1>

      <p class="landing__desc">
        Pela <strong>primeira vez na história</strong>, a <strong>Nike</strong> e a
        <strong class="neon-text">CazéTV</strong> se uniram para colocar a <strong>camisa oficial da Seleção</strong>
        nas mãos do torcedor de verdade. Responda 5 perguntas e concorra entre os
        <strong>1.000 escolhidos</strong> que vão vestir o manto antes da Copa.
      </p>

      <div class="landing__timer-pill">
        ${ICONS.clock}
        <span>ENCERRA EM</span>
        <span class="timer-value" data-timer="main">${formatTime(AppState.mainTimer)}</span>
      </div>

      <p class="landing__free">PARTICIPAÇÃO <strong>100% GRÁTIS</strong></p>

      <div class="landing__hero">
        <img src="imgs/Captura de Tela 2026-05-03 às 22.51.08.png" alt="Camisa da Seleção Brasileira 2026" />
        <div class="landing__hero-badge">EDIÇÃO 2026</div>
      </div>

      <button class="landing__cta" id="start-quiz-btn">
        COMEÇAR O QUIZ ${ICONS.arrow}
      </button>

      <div class="landing__stats">
        <div class="landing__stat">
          <div class="landing__stat-value">5</div>
          <div class="landing__stat-label">PERGUNTAS</div>
        </div>
        <div class="landing__stat">
          <div class="landing__stat-value">40s</div>
          <div class="landing__stat-label">DURAÇÃO</div>
        </div>
        <div class="landing__stat">
          <div class="landing__stat-value">${AppState.remainingSlots}</div>
          <div class="landing__stat-label">RESTANTES</div>
        </div>
      </div>
    </div>
  `;
}

function bindLandingEvents() {
  const btn = document.getElementById('start-quiz-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      AppState.quizStep = 0;
      AppState.quizAnswers = [];
      navigate('quiz');
    });
  }
}
