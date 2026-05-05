function renderResult() {
  return `
    <div class="screen result fade-in">
      <div class="result__trophy">
        ${ICONS.trophy}
        <span class="result__trophy-star">✨</span>
      </div>

      <div class="result__badge">RESULTADO OFICIAL</div>

      <h1 class="result__title">
        PARABÉNS!
        <span class="result__title-highlight">VOCÊ FOI SORTEADO</span>
      </h1>

      <p class="result__subtitle">A camisa oficial da Seleção 2026 é sua.</p>

      <p class="result__desc">
        Entre os <strong>milhares de torcedores</strong> que participaram,
        <strong>você foi um dos 1.000 escolhidos</strong> pela Nike × CazéTV.
        Você provou que veste a camisa de verdade.
      </p>

      <div class="result__expire">
        ${ICONS.clock}
        <span>RESGATE EXPIRA EM</span>
        <span class="expire-time" data-timer="result">${formatTimeMM(AppState.resultTimer)}</span>
      </div>

      <button class="result__cta" id="result-cta">
        RESGATAR MINHA CAMISA AGORA ${ICONS.arrow}
      </button>

      <div class="result__shipping">
        ${ICONS.shield}
        <span>Envio oficial Nike</span>
      </div>

      <p class="result__warning">
        <span>⚠</span> SE VOCÊ SAIR DESTA PÁGINA, SUA CAMISA VOLTA PARA O SORTEIO.
      </p>

      <button class="result__back-link" id="result-back">VOLTAR PARA O INÍCIO</button>
    </div>
  `;
}

function bindResultEvents() {
  const cta = document.getElementById('result-cta');
  if (cta) {
    cta.addEventListener('click', () => navigate('product'));
  }
  const back = document.getElementById('result-back');
  if (back) {
    back.addEventListener('click', () => navigate('landing'));
  }
}
