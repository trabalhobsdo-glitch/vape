(async()=>{
 const P=await load(),by={};P.forEach(p=>(by[p.brand]??=[]).push(p));
 const brands=Object.keys(by).sort((a,b)=>by[b].length-by[a].length||a.localeCompare(b));
 $('#chips').innerHTML=brands.map(b=>`<a href="#b-${slug(b)}">${esc(b)}</a>`).join('');
 const sec=b=>`<section id="b-${slug(b)}" class="sec"><div class="sh"><h2>${esc(b)}</h2><span>${by[b].length} produto${by[b].length>1?'s':''}</span><div class="ar"><button data-d="-1" aria-label="Anterior">‹</button><button data-d="1" aria-label="Próximo">›</button></div></div><div class="row">${by[b].map(card).join('')}</div></section>`;
 const root=$('#brands');root.innerHTML=brands.map(sec).join('');
 root.onclick=e=>{const b=e.target.closest('[data-d]');if(b){const r=b.closest('.sec').querySelector('.row');r.scrollBy({left:b.dataset.d*r.clientWidth*.8,behavior:'smooth'})}};
 $('#q').oninput=e=>{const t=e.target.value.trim().toLowerCase();
  if(!t){root.innerHTML=brands.map(sec).join('');return}
  const r=P.filter(p=>(p.title+' '+p.brand).toLowerCase().includes(t));
  root.innerHTML=`<div class="grid" style="padding-top:20px">${r.map(card).join('')||'<p style="color:var(--mu)">Nenhum produto encontrado.</p>'}</div>`};
})();
