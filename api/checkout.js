// Função serverless da Vercel: POST /api/checkout
// O site envia { cliente, itens:[{h, variacao, q}] } SEM preços (o preço nunca deve vir do navegador).
// Aqui você: 1) recalcula o total lendo data/products.json, 2) cria a cobrança no seu provedor de
// pagamento usando a chave guardada em Environment Variables da Vercel, 3) responde { url } para redirecionar.
module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ erro: 'Método não permitido' });
  const { cliente, itens } = req.body || {};
  if (!cliente || !Array.isArray(itens) || !itens.length) return res.status(400).json({ erro: 'Pedido inválido' });
  // TODO: integrar o meio de pagamento (process.env.PAYMENT_API_KEY)
  return res.status(501).json({ erro: 'Pagamento ainda não configurado.' });
};
