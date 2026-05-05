module.exports = async function handler(req, res) {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch('https://app.sigilopay.com.br/api/v1/gateway/pix/receive', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-public-key': 'gustavovldc1_ffld5up1ql2tzflm',
        'x-secret-key': 'vhoud1jg9d0o2w3lv0kupvuwwe7c03odgrpmeokgbx9gmfcldq5w78xyb8xlewl9'
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(response.status).json(data);
  } catch (error) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(500).json({ error: 'Erro ao conectar com gateway de pagamento', details: error.message });
  }
};
