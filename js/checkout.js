function paint(){
 $('#sum').innerHTML=cart.map(i=>`<p><span>${i.q}× ${esc(i.title)}<br><small style="color:var(--mu)">${esc(i.label)}</small></span><span>${brl(i.q*i.price)}</span></p>`).join('')+`<p><span>Frete</span><span>${CFG.frete?brl(CFG.frete):'a combinar'}</span></p><p class="t"><span>Total</span><span>${brl(total()+CFG.frete)}</span></p>`;
 $('#empty').style.display=cart.length?'none':'block';$('#ckf').style.display=cart.length?'':'none';
}
window.onCart=paint;paint();
$('#cep').onblur=async e=>{const c=e.target.value.replace(/\D/g,'');if(c.length!==8)return;
 try{const d=await(await fetch(`https://viacep.com.br/ws/${c}/json/`)).json();if(d.erro)return;
  const f=$('#ckf');f.rua.value=d.logradouro||'';f.bairro.value=d.bairro||'';f.cidade.value=d.localidade||'';f.uf.value=d.uf||''}catch{}};
$('#ckf').onsubmit=async e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target)),b=$('#pay'),m=$('#msg');
 b.disabled=true;m.style.color='var(--mu)';m.textContent='Enviando pedido…';
 try{const r=await fetch('/api/checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({cliente:d,itens:cart.map(i=>({h:i.h,variacao:i.label,q:i.q}))})});
  const j=await r.json().catch(()=>({}));
  if(r.ok&&j.url){location.href=j.url;return}
  m.style.color='#ff9a9a';m.textContent=j.erro||'Não foi possível finalizar o pedido agora.'}catch{m.style.color='#ff9a9a';m.textContent='Erro de conexão. Tente novamente.'}
 b.disabled=false};
