# Urban Vape (loja estática + checkout)

Site em HTML/CSS/JS puro, sem build. Funciona direto na Vercel.

## Estrutura
- `index.html`: home (banner, marcas com carrossel horizontal, segundo banner)
- `produto.html`: página do produto (sabor, nicotina, quantidade)
- `checkout.html`: checkout próprio (dados, entrega com CEP automático, resumo)
- `data/products.json`: catálogo (gerado do CSV)
- `js/app.js`: **configurações no topo** (`CFG`: markup de preço, frete, WhatsApp), carrinho, filtro de idade
- `api/checkout.js`: ponto de entrada do pagamento (ainda não integrado)
- `img/`: logo e banners

## Subir
1. Envie esta pasta para o GitHub.
2. Na Vercel: Add New > Project > escolha o repositório > Deploy (sem configurar nada).
3. Guarde chaves de pagamento em Settings > Environment Variables e use em `api/checkout.js`.

## Testar local
`npx serve .` (abrir o index.html direto não carrega o catálogo).
