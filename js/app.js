const CFG={nome:'Urban Vape',whatsapp:'',markup:1,frete:0}; // markup: 1 = preço do arquivo; 1.2 = +20%
const $=(s,e=document)=>e.querySelector(s),$$=(s,e=document)=>[...e.querySelectorAll(s)];
const brl=v=>v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const price=p=>+(p*CFG.markup).toFixed(2);
const th=(u,w=500)=>u+(u.includes('?')?'&':'?')+'width='+w;
const slug=s=>s.toLowerCase().normalize('NFD').replace(/[^a-z0-9]+/g,'-');
const load=()=>fetch('data/products.json').then(r=>r.json());
let cart=[];try{cart=JSON.parse(localStorage.getItem('uv_cart')||'[]')}catch{}
const save=()=>{try{localStorage.setItem('uv_cart',JSON.stringify(cart))}catch{}draw();window.onCart&&window.onCart()};
const count=()=>cart.reduce((a,i)=>a+i.q,0),total=()=>cart.reduce((a,i)=>a+i.q*i.price,0);
function add(it){const k=cart.find(i=>i.key===it.key);k?k.q+=it.q:cart.push(it);save()}
const card=p=>`<a class="card" href="produto.html?h=${encodeURIComponent(p.h)}"><img loading="lazy" src="${th(p.img)}" alt="${esc(p.name)}"><div><small>${esc(p.brand)}</small><h3>${esc(p.name)}</h3><p>${esc(p.sub)}</p><b>${p.pmin!==p.pmax?'a partir de ':''}${brl(price(p.pmin))}</b></div></a>`;
function openCart(o=true){$('#drawer').classList.toggle('on',o);$('#ov').classList.toggle('on',o)}
function draw(){
 $('#cc').textContent=count();
 $('#items').innerHTML=cart.length?cart.map((i,n)=>`<div class="it"><img src="${th(i.img,150)}" alt=""><div><b>${esc(i.title)}</b><br><small>${esc(i.label)}</small><br>${brl(i.price)}<br><span class="q"><button data-n="${n}" data-d="-1" aria-label="Menos">−</button><span>${i.q}</span><button data-n="${n}" data-d="1" aria-label="Mais">+</button></span></div><button class="x" data-n="${n}" data-d="0" aria-label="Remover">✕</button></div>`).join(''):'<p style="color:var(--mu);padding:20px">Seu carrinho está vazio.</p>';
 $('#sub').textContent=brl(total());$('#go').style.display=cart.length?'':'none';
}
document.body.insertAdjacentHTML('afterbegin',`<header><div class="wrap"><a class="logo" href="index.html"><img src="img/logo.jpg" alt="${CFG.nome}"></a><nav><a href="index.html#marcas">Marcas</a><button class="btn" id="cartbtn">Carrinho <i id="cc">0</i></button></nav></div></header>
<div id="ov"></div><aside id="drawer"><h2>Carrinho <button class="x" id="cls" aria-label="Fechar">✕</button></h2><div id="items"></div><div id="dfoot"><p><span>Subtotal</span><b id="sub"></b></p><a class="btn" id="go" href="checkout.html">Finalizar compra</a></div></aside>`);
document.body.insertAdjacentHTML('beforeend',`<footer><div class="wrap"><p>© ${new Date().getFullYear()} ${CFG.nome}. Venda proibida para menores de 18 anos. A nicotina causa dependência.</p></div></footer>`);
$('#cartbtn').onclick=()=>openCart();$('#cls').onclick=$('#ov').onclick=()=>openCart(false);
$('#items').onclick=e=>{const b=e.target.closest('[data-n]');if(!b)return;const i=cart[+b.dataset.n],d=+b.dataset.d;if(!d||i.q+d<1)cart.splice(+b.dataset.n,1);else i.q+=d;save()};
let ok=false;try{ok=localStorage.getItem('uv_18')==='1'}catch{}
if(!ok){document.body.insertAdjacentHTML('beforeend',`<div id="gate" role="dialog" aria-modal="true"><div><img src="img/logo.jpg" alt=""><h2>Você tem 18 anos ou mais?</h2><p>O conteúdo deste site é destinado apenas a maiores de idade.</p><button class="btn" id="y">Sim, tenho 18+</button><a class="btn ghost" href="https://www.google.com">Não</a></div></div>`);
 $('#y').onclick=()=>{try{localStorage.setItem('uv_18','1')}catch{}$('#gate').remove()}}
draw();
