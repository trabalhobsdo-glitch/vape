(async()=>{
 const P=await load(),h=new URLSearchParams(location.search).get('h'),p=P.find(x=>x.h===h),root=$('#pd');
 if(!p){root.innerHTML='<p style="padding:40px 0">Produto não encontrado. <a href="index.html" style="color:var(--neon)">Voltar à loja</a></p>';return}
 document.title=p.name+' | Urban Vape';
 const u1=[...new Set(p.vars.map(v=>v.o1).filter(Boolean))],u2=[...new Set(p.vars.map(v=>v.o2).filter(Boolean))];
 let s={o1:u1[0]||null,o2:u2[0]||null,q:1,img:p.img};
 const cur=()=>p.vars.find(v=>v.o1===s.o1&&v.o2===s.o2)||p.vars.find(v=>v.o1===s.o1)||p.vars[0];
 const opt=(n,l,k,sel)=>l.length>1||(l.length&&n)?`<div class="opt"><b>${esc(n||'Opção')}</b><div class="opts" data-k="${k}">${l.map(v=>`<button type="button" class="${v===sel?'on':''}">${esc(v)}</button>`).join('')}</div></div>`:'';
 function render(){const v=cur();if(v.img&&!s.manual)s.img=v.img;
  root.innerHTML=`<div><img class="main" src="${th(s.img,900)}" alt="${esc(p.name)}"><div class="th">${p.imgs.map(i=>`<img src="${th(i,150)}" data-i="${esc(i)}" alt="">`).join('')}</div></div>
  <div><a class="crumb" href="index.html#b-${slug(p.brand)}">‹ ${esc(p.brand)}</a><h1>${esc(p.name)}</h1><p style="color:var(--mu)">${esc(p.sub)}</p><div class="pr">${brl(price(v.p))}</div>
  ${opt(p.n1,u1,'o1',s.o1)}${opt(p.n2,u2,'o2',s.o2)}
  <div class="opt"><b>Quantidade</b><span class="q"><button id="m" aria-label="Menos">−</button><span>${s.q}</span><button id="pl" aria-label="Mais">+</button></span></div>
  <div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn" id="add">Adicionar ao carrinho</button><button class="btn ghost" id="buy">Comprar agora</button></div>
  <div class="desc">${p.desc}</div></div>`;
  $$('.opts').forEach(o=>o.onclick=e=>{const b=e.target.closest('button');if(!b)return;s[o.dataset.k]=b.textContent;s.manual=false;render()});
  $$('.th img').forEach(i=>i.onclick=()=>{s.img=i.dataset.i;s.manual=true;$('.main').src=th(s.img,900)});
  $('#m').onclick=()=>{s.q=Math.max(1,s.q-1);render()};$('#pl').onclick=()=>{s.q++;render()};
  const it=()=>({key:p.h+'|'+(v.o1||'')+'|'+(v.o2||''),h:p.h,title:p.name,label:[v.o1,v.o2].filter(Boolean).join(' · ')||p.sub,price:price(v.p),img:s.img,q:s.q});
  $('#add').onclick=()=>{add(it());openCart()};$('#buy').onclick=()=>{add(it());location.href='checkout.html'};
 }
 render();
 const rel=P.filter(x=>x.brand===p.brand&&x.h!==p.h);
 if(rel.length)$('#rel').innerHTML=`<section class="sec"><div class="sh"><h2>Mais ${esc(p.brand)}</h2></div><div class="row">${rel.map(card).join('')}</div></section>`;
})();
