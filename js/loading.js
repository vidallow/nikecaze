function renderLoading() {
  return `
    <div class="screen loading-screen fade-in">
      <div class="loading-screen__spinner"></div>
      <h2 class="loading-screen__title">ANALISANDO SUAS RESPOSTAS</h2>
      <p class="loading-screen__desc">Aguarde um instante enquanto verificamos sua participação no sorteio oficial.</p>
      <div class="loading-screen__bar">
        <div class="loading-screen__bar-fill" id="loading-bar"></div>
      </div>
      <p class="loading-screen__status" id="loading-status">RESERVANDO SUA CAMISA OFICIAL...</p>
    </div>
  `;
}

function bindLoadingEvents() {
  const bar = document.getElementById('loading-bar');
  const status = document.getElementById('loading-status');
  const statuses = [
    'VERIFICANDO RESPOSTAS...',
    'CONSULTANDO DISPONIBILIDADE...',
    'RESERVANDO SUA CAMISA OFICIAL...'
  ];
  let progress = 0;
  let statusIdx = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 8 + 2;
    if (progress > 100) progress = 100;
    if (bar) bar.style.width = progress + '%';

    if (progress > 33 && statusIdx === 0) { statusIdx = 1; if (status) status.textContent = statuses[1]; }
    if (progress > 66 && statusIdx === 1) { statusIdx = 2; if (status) status.textContent = statuses[2]; }

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => navigate('result'), 600);
    }
  }, 200);
}
