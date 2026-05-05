function renderProduct() {
  const galleryIdx = 0;
  const starsHTML = Array(5).fill(ICONS.star).join('');

  return `
    <div class="screen product-page fade-in">
      <div class="product__topbar">
        ${ICONS.clock}
        <span>Seu resgate expira em <span class="expire-time" data-timer="checkout">${formatTimeMM(AppState.checkoutTimer)}</span></span>
      </div>

      <div class="product__header">
        <div class="product__header-logos">
          <span style="font-weight:900;font-size:20px;font-style:italic;">NIKE</span>
          <span>×</span>
          <span style="font-weight:800;font-size:14px;">CazéTV</span>
        </div>
        <div class="product__header-secure">
          ${ICONS.lock}
          CHECKOUT SEGURO
        </div>
      </div>

      <div class="product__exchange-bar">
        Trocas e devoluções podem ser feitas em <strong>qualquer loja Nike</strong> do Brasil.
      </div>

      <div class="product__main">
        <div class="product__gallery">
          <div class="product__gallery-main">
            <img src="${PRODUCT_IMAGES[0]}" alt="Camisa Brasil Nike" id="gallery-main-img" />
            <div class="product__edition-tag">EDIÇÃO LIMITADA</div>
          </div>
          <div class="product__gallery-dots">
            ${PRODUCT_IMAGES.map((_, i) => `<div class="product__gallery-dot ${i === 0 ? 'active' : ''}" data-gallery="${i}"></div>`).join('')}
          </div>
          <div class="product__gallery-thumbs">
            ${PRODUCT_IMAGES.map((img, i) => `<div class="product__gallery-thumb ${i === 0 ? 'active' : ''}" data-gallery="${i}"><img src="${img}" alt="Thumb ${i+1}" /></div>`).join('')}
          </div>
        </div>

        <div class="product__info">
          <p class="product__category">CAMISA DE FUTEBOL MASCULINA · 2026/27</p>
          <h1 class="product__name">Camisa Brasil Nike I 2026/27</h1>
          <p class="product__tech">Nike Aero-FIT</p>

          <div class="product__rating">
            <div class="product__stars">${starsHTML}</div>
            <span class="product__rating-score">4.9</span>
            <span class="product__rating-count">(2.847 avaliações verificadas)</span>
          </div>

          <div class="product__price-row">
            <span class="product__price-old">R$ 249,90</span>
            <span class="product__price-discount">100%</span>
          </div>
          <div class="product__price-new">R$ 0,00</div>
          <p class="product__price-note">Disponível somente para sorteados</p>

          <p class="product__model-label">Modelo: <span>${AppState.selectedModel}</span></p>
          <div class="product__model-tabs">
            <button class="product__model-tab ${AppState.selectedModel === 'Masculina' ? 'active' : ''}" data-model="Masculina">Masculina</button>
            <button class="product__model-tab ${AppState.selectedModel === 'Feminina' ? 'active' : ''}" data-model="Feminina">Feminina</button>
          </div>

          <div class="product__size-header">
            <span class="product__size-label">Selecione o tamanho</span>
            <span class="product__size-guide" id="size-guide-btn" style="cursor:pointer;">Guia de medidas</span>
          </div>
          <div class="product__sizes">
            ${SIZES.map(s => `<button class="product__size-btn ${s === AppState.selectedSize ? 'active' : ''}" data-size="${s}">${s}</button>`).join('')}
          </div>

          <button class="product__buy-btn" id="product-buy">Resgatar Agora</button>

          <div class="product__trust-row">
            <div class="product__trust-item">${ICONS.lock} Pagamento seguro</div>
            <div class="product__trust-item">${ICONS.truck} Envio em 24h</div>
            <div class="product__trust-item">${ICONS.shield} Produto oficial Nike</div>
          </div>

          <div class="product__desc-section">
            <h3 class="product__desc-title">Descrição</h3>
            <p class="product__desc-text">Uma nova era de respirabilidade acabou de entrar em campo. Apresentamos a tecnologia Nike Aero-FIT. Esta camisa oficial do Brasil é leve e elástica, proporcionando uma excelente ventilação digna de um atleta profissional.</p>

            <h3 class="product__desc-title">Referência do design</h3>
            <p class="product__desc-text">Sem dúvida, a combinação de cores mais emblemática do futebol, o uniforme icônico do Brasil celebra a beleza natural do país e o estilo de jogo vibrante e cheio de energia da equipe.</p>

            <h3 class="product__desc-title">Respirabilidade máxima</h3>
            <p class="product__desc-text">A tecnologia Nike Aero-FIT foi desenvolvida para oferecer a máxima respirabilidade. Ela permite o fluxo de ar contra a pele para ajudar a manter o corpo fresco quando as temperaturas estão altas.</p>

            <h3 class="product__desc-title">Fidelidade ao original</h3>
            <p class="product__desc-text">Com a nossa coleção Match, você pode vestir o visual dos atletas profissionais, com detalhes de design autênticos e nossa tecnologia de ventilação.</p>

            <h3 class="product__desc-title">Detalhes do produto</h3>
            <div class="product__detail-item">${ICONS.check} Produto importado</div>
            <div class="product__detail-item">${ICONS.check} 100% poliéster</div>
            <div class="product__detail-item">${ICONS.check} Lavagem à máquina</div>
          </div>
        </div>
      </div>

      <div class="product__advantages">
        <div class="product__advantages-header">
          <h2 class="product__advantages-title">Vantagens no jogo</h2>
        </div>
        <div class="product__advantages-scroll">
          <div class="product__advantage-card">
            <img src="av torcedores/CARROSEL DE BAIXO1.webp" alt="Respirabilidade" />
            <h4>Uma nova era de respirabilidade</h4>
            <p>A tecnologia Aero-Fit permite a circulação de ar na pele, ajudando a manter o corpo fresco em temperaturas elevadas.</p>
          </div>
          <div class="product__advantage-card">
            <img src="av torcedores/CARROSEL DE BAIXO 2.webp" alt="Fiel aos profissionais" />
            <h4>Fiel aos profissionais</h4>
            <p>A nossa coleção Match permite que você use exatamente o que os profissionais usam.</p>
          </div>
          <div class="product__advantage-card">
            <img src="av torcedores/CARROSEL de baixo 3.webp" alt="Elasticidade" />
            <h4>Menos peso, mais elasticidade</h4>
            <p>A tecnologia Aero-Fit oferece leveza e elasticidade, proporcionando a mesma ventilação extraordinária que os profissionais têm.</p>
          </div>
        </div>
      </div>

      <div class="product__reviews">
        <div class="product__reviews-header">
          <h2 class="product__reviews-title">Avaliações de torcedores</h2>
        </div>
        <div class="product__reviews-scroll" id="reviews-scroll">
          <div class="product__review-card">
            <div class="review-stars">★★★★★</div>
            <p class="review-text">"Não acreditei que fui sorteado, achei que era golpe. Quando chegou eu chorei, juro!"</p>
            <p class="review-author">RAFAEL M. · SÃO PAULO, SP · ✓ ENTREGA VERIFICADA</p>
          </div>
          <div class="product__review-card">
            <div class="review-stars">★★★★★</div>
            <p class="review-text">"Não acreditei quando ganhei. Veste perfeito e o tecido é incrível."</p>
            <p class="review-author">CAMILA R. · RIO DE JANEIRO, RJ · ✓ ENTREGA VERIFICADA</p>
          </div>
          <div class="product__review-card">
            <div class="review-stars">★★★★★</div>
            <p class="review-text">"Promoção de verdade. Já estou esperando a Copa pra usar!"</p>
            <p class="review-author">LUCAS P. · BELO HORIZONTE, MG · ✓ ENTREGA VERIFICADA</p>
          </div>
          <div class="product__review-card">
            <div class="review-stars">★★★★★</div>
            <p class="review-text">"Ganhei e ainda não acredito. Veste igualzinho a dos jogadores, apaixonada!"</p>
            <p class="review-author">MARIANA S. · CURITIBA, PR · ✓ ENTREGA VERIFICADA</p>
          </div>
          <div class="product__review-card">
            <div class="review-stars">★★★★★</div>
            <p class="review-text">"Sorteio de verdade mesmo. Já tô contando os dias pra estrear na Copa!"</p>
            <p class="review-author">THIAGO A. · SALVADOR, BA · ✓ ENTREGA VERIFICADA</p>
          </div>
          <div class="product__review-card">
            <div class="review-stars">★★★★★</div>
            <p class="review-text">"Foi pro meu marido e ele quase chorou. Tecido perfeito, caimento incrível."</p>
            <p class="review-author">BEATRIZ O. · FORTALEZA, CE · ✓ ENTREGA VERIFICADA</p>
          </div>
          <div class="product__review-card">
            <div class="review-stars">★★★★★</div>
            <p class="review-text">"Achei que nunca ia ganhar nada na vida. Veio original Nike, bordado impecável!"</p>
            <p class="review-author">EDUARDO G. · PORTO ALEGRE, RS · ✓ ENTREGA VERIFICADA</p>
          </div>
          <div class="product__review-card">
            <div class="review-stars">★★★★★</div>
            <p class="review-text">"Resgate fácil demais, chegou rapidinho. Já tô ansiosa pra Copa começar!"</p>
            <p class="review-author">JULIANA T. · RECIFE, PE · ✓ ENTREGA VERIFICADA</p>
          </div>
          <div class="product__review-card">
            <div class="review-stars">★★★★★</div>
            <p class="review-text">"Quando vi o e-mail do sorteio quase caí da cadeira. Camisa surreal, vou usar muito!"</p>
            <p class="review-author">PEDRO H. · BRASÍLIA, DF · ✓ ENTREGA VERIFICADA</p>
          </div>
          <div class="product__review-card">
            <div class="review-stars">★★★★★</div>
            <p class="review-text">"Não acreditei quando ganhei o sorteio. Modelo feminino veste maravilhoso, recomendo!"</p>
            <p class="review-author">ANA CLARA F. · MANAUS, AM · ✓ ENTREGA VERIFICADA</p>
          </div>
          <div class="product__review-card">
            <div class="review-stars">★★★★★</div>
            <p class="review-text">"Achei que era pegadinha do Cazé, mas chegou tudo certinho. Já contando pra Copa!"</p>
            <p class="review-author">VINÍCIUS L. · GOIÂNIA, GO · ✓ ENTREGA VERIFICADA</p>
          </div>
          <div class="product__review-card">
            <div class="review-stars">★★★★★</div>
            <p class="review-text">"Ganhei e fiquei sem palavras. Veste perfeito, mal posso esperar pra usar no Mundial!"</p>
            <p class="review-author">LARISSA D. · BELÉM, PA · ✓ ENTREGA VERIFICADA</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function bindProductEvents() {
  // ---- Gallery: thumb/dot click ----
  let currentGalleryIdx = 0;
  function setGalleryImage(idx) {
    currentGalleryIdx = idx;
    const mainImg = document.getElementById('gallery-main-img');
    if (mainImg) mainImg.src = PRODUCT_IMAGES[idx];
    document.querySelectorAll('.product__gallery-dot').forEach((d, i) => d.classList.toggle('active', i === idx));
    document.querySelectorAll('.product__gallery-thumb').forEach((t, i) => t.classList.toggle('active', i === idx));
  }

  document.querySelectorAll('[data-gallery]').forEach(el => {
    el.addEventListener('click', () => setGalleryImage(parseInt(el.dataset.gallery)));
  });

  // ---- Gallery: touch swipe ----
  const galleryMain = document.querySelector('.product__gallery-main');
  if (galleryMain) {
    let startX = 0, startY = 0, diffX = 0;
    galleryMain.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });
    galleryMain.addEventListener('touchmove', (e) => {
      diffX = e.touches[0].clientX - startX;
    }, { passive: true });
    galleryMain.addEventListener('touchend', () => {
      if (Math.abs(diffX) > 50) {
        if (diffX < 0 && currentGalleryIdx < PRODUCT_IMAGES.length - 1) {
          setGalleryImage(currentGalleryIdx + 1);
        } else if (diffX > 0 && currentGalleryIdx > 0) {
          setGalleryImage(currentGalleryIdx - 1);
        }
      }
      diffX = 0;
    });
  }

  // ---- Model tabs ----
  document.querySelectorAll('[data-model]').forEach(tab => {
    tab.addEventListener('click', () => {
      AppState.selectedModel = tab.dataset.model;
      document.querySelectorAll('.product__model-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  // ---- Size buttons ----
  document.querySelectorAll('[data-size]').forEach(btn => {
    btn.addEventListener('click', () => {
      AppState.selectedSize = btn.dataset.size;
      document.querySelectorAll('.product__size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // ---- Size guide popup ----
  const sizeGuideBtn = document.getElementById('size-guide-btn');
  if (sizeGuideBtn) {
    sizeGuideBtn.addEventListener('click', () => {
      const overlay = document.createElement('div');
      overlay.className = 'size-guide-overlay';
      overlay.innerHTML = `
        <div class="size-guide-modal">
          <div class="size-guide-header">
            <h3>Guia de Medidas</h3>
            <button class="size-guide-close" id="size-guide-close">✕</button>
          </div>
          <table class="size-guide-table">
            <thead>
              <tr><th>Tamanho</th><th>Largura (cm)</th><th>Comprimento (cm)</th></tr>
            </thead>
            <tbody>
              <tr><td>PP</td><td>48</td><td>68</td></tr>
              <tr><td>P</td><td>50</td><td>70</td></tr>
              <tr><td>M</td><td>53</td><td>72</td></tr>
              <tr><td>G</td><td>56</td><td>74</td></tr>
              <tr><td>GG</td><td>60</td><td>78</td></tr>
            </tbody>
          </table>
          <p style="font-size:12px;color:#888;margin-top:12px;">Medidas aproximadas. Podem variar ±2cm.</p>
        </div>
      `;
      document.body.appendChild(overlay);
      overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
      document.getElementById('size-guide-close').addEventListener('click', () => overlay.remove());
    });
  }

  // ---- Buy button ----
  const buyBtn = document.getElementById('product-buy');
  if (buyBtn) {
    buyBtn.addEventListener('click', () => {
      showProcessingModal();
    });
  }
}

function showProcessingModal() {
  const overlay = document.createElement('div');
  overlay.className = 'processing-modal';
  overlay.innerHTML = `
    <div class="processing-modal__content">
      <div class="processing-modal__spinner"></div>
      <h3 class="processing-modal__title">PROCESSANDO SEU RESGATE</h3>
      <p class="processing-modal__sub">Reservando tamanho ${AppState.selectedSize}...</p>
      <div class="processing-modal__steps">
        <div class="processing-modal__step active" id="proc-step-1">
          ${ICONS.refresh}
          <span>Verificando disponibilidade...</span>
        </div>
        <div class="processing-modal__step" id="proc-step-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>
          <span>Reservando tamanho ${AppState.selectedSize}...</span>
        </div>
        <div class="processing-modal__step" id="proc-step-3">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>
          <span>Resgatando seu prêmio...</span>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  setTimeout(() => {
    const s1 = document.getElementById('proc-step-1');
    const s2 = document.getElementById('proc-step-2');
    if (s1) { s1.classList.remove('active'); s1.classList.add('done'); s1.querySelector('svg').outerHTML = ICONS.shield; }
    if (s2) { s2.classList.add('active'); }
  }, 1200);

  setTimeout(() => {
    const s2 = document.getElementById('proc-step-2');
    const s3 = document.getElementById('proc-step-3');
    if (s2) { s2.classList.remove('active'); s2.classList.add('done'); s2.querySelector('svg').outerHTML = ICONS.shield; }
    if (s3) { s3.classList.add('active'); }
  }, 2400);

  setTimeout(() => {
    overlay.remove();
    AppState.checkoutStep = 1;
    navigate('checkout');
  }, 3600);
}
