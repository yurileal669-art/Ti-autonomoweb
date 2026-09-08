/*
  Serviços TI Autônomo
  Aplicação 100% client-side em JavaScript puro.
  Compatível com abertura direta pelo index.html (file://) e com servidor local.
*/
(function () {
  'use strict';

  const services = [
    {id:1,name:'Limpeza interna',category:'Manutenção',computer:80,notebook:150},
    {id:2,name:'Troca de pasta térmica',category:'Manutenção',computer:50,notebook:70},
    {id:3,name:'Formatação completa',category:'Sistema',computer:150,notebook:150},
    {id:4,name:'Instalação de drivers',category:'Sistema',computer:50,notebook:50},
    {id:5,name:'Remoção de vírus/malware',category:'Segurança',computer:80,notebook:80},
    {id:6,name:'Backup de dados',category:'Dados',computer:80,notebook:80},
    {id:7,name:'Instalação de programas',category:'Sistema',computer:70,notebook:70},
    {id:8,name:'Atualização do sistema',category:'Sistema',computer:70,notebook:70},
    {id:9,name:'Configuração de rede Wi-Fi',category:'Rede',computer:70,notebook:70},
    {id:10,name:'Troca de HD/SSD',category:'Hardware',computer:120,notebook:150,parts:true},
    {id:11,name:'Adição de memória RAM',category:'Hardware',computer:80,notebook:80,parts:true},
    {id:12,name:'Troca de bateria',category:'Hardware',computer:null,notebook:80,parts:true},
    {id:13,name:'Troca de carregador',category:'Hardware',computer:null,notebook:50,parts:true},
    {id:14,name:'Configuração de e-mail',category:'Suporte',computer:70,notebook:70},
    {id:15,name:'Otimização de disco',category:'Sistema',computer:70,notebook:70},
    {id:16,name:'Recuperação de dados',category:'Dados',computer:200,notebook:200,from:true},
    {id:17,name:'Troca de display',category:'Hardware',computer:null,notebook:150,parts:true},
    {id:18,name:'Troca de teclado',category:'Hardware',computer:null,notebook:80,parts:true},
    {id:19,name:'Upgrade para SSD NVMe',category:'Hardware',computer:70,notebook:80,parts:true},
    {id:20,name:'Clonagem de disco',category:'Dados',computer:150,notebook:150}
  ];

  const seed = {
    clients:[
      {id:'CLI-1001',name:'Marcos Silva',phone:'(93) 99111-2233',email:'marcos@email.com',createdAt:'2026-08-18T10:00:00'},
      {id:'CLI-1002',name:'Ana Beatriz',phone:'(93) 99222-3344',email:'ana@email.com',createdAt:'2026-08-20T14:30:00'},
      {id:'CLI-1003',name:'Carlos Mendes',phone:'(93) 99333-4455',email:'carlos@email.com',createdAt:'2026-08-22T09:15:00'}
    ],
    quotes:[
      {id:'ORC-1001',client:'Marcos Silva',phone:'(93) 99111-2233',email:'marcos@email.com',equipment:'computer',items:[3,5],total:230,status:'Aprovado',createdAt:'2026-08-25T11:20:00',notes:'Computador lento e com pop-ups.'}
    ],
    requests:[
      {id:'OS-2026-1001',client:'Marcos Silva',phone:'(93) 99111-2233',service:'Formatação completa',priority:'Alta',status:'Em atendimento',description:'Computador muito lento e travando.',createdAt:'2026-09-05T10:30:00',updatedAt:'2026-09-06T09:10:00',dueAt:'2026-09-05T18:30:00',history:[{at:'2026-09-05T10:30:00',text:'Chamado aberto.'},{at:'2026-09-06T09:10:00',text:'Status alterado para Em atendimento.'}],comments:['Backup realizado antes da formatação.']},
      {id:'OS-2026-1002',client:'Ana Beatriz',phone:'(93) 99222-3344',service:'Configuração de rede Wi-Fi',priority:'Média',status:'Aberto',description:'Wi-Fi com quedas no quarto.',createdAt:'2026-09-07T15:00:00',updatedAt:'2026-09-07T15:00:00',dueAt:'2026-09-08T15:00:00',history:[{at:'2026-09-07T15:00:00',text:'Chamado aberto.'}],comments:[]},
      {id:'OS-2026-1003',client:'Carlos Mendes',phone:'(93) 99333-4455',service:'Troca de HD/SSD',priority:'Baixa',status:'Resolvido',description:'Upgrade para SSD.',createdAt:'2026-09-01T09:00:00',updatedAt:'2026-09-03T17:20:00',dueAt:'2026-09-04T09:00:00',history:[{at:'2026-09-01T09:00:00',text:'Chamado aberto.'},{at:'2026-09-03T17:20:00',text:'Chamado resolvido.'}],comments:['SSD instalado e sistema clonado.']}
    ],
    payments:[
      {id:'PAY-1001',client:'Carlos Mendes',requestId:'OS-2026-1003',method:'PIX',status:'Pago',amount:150,createdAt:'2026-09-03T17:40:00',origin:'Ordem de serviço'},
      {id:'PAY-1002',client:'Marcos Silva',requestId:'OS-2026-1001',method:'Dinheiro',status:'Pendente',amount:150,createdAt:'2026-09-05T10:35:00',origin:'Ordem de serviço'}
    ],
    sales:[],
    feedbacks:[
      {id:'FDB-1001',client:'Carlos Mendes',requestId:'OS-2026-1003',rating:5,comment:'Serviço rápido e ficou perfeito.',createdAt:'2026-09-03T18:00:00'}
    ],
    notifications:[
      {id:'NOT-1001',text:'Novo chamado OS-2026-1002 criado por Ana Beatriz.',read:false,createdAt:'2026-09-07T15:00:00'},
      {id:'NOT-1002',text:'Pagamento PAY-1001 marcado como pago.',read:true,createdAt:'2026-09-03T17:40:00'}
    ],
    settings:{theme:'light'}
  };

  const KEY='ti_autonomo_db_v2';
  const clone=v=>JSON.parse(JSON.stringify(v));
  const normalizeDB = (raw) => ({
    clients:Array.isArray(raw?.clients)?raw.clients:clone(seed.clients),
    quotes:Array.isArray(raw?.quotes)?raw.quotes:[],
    requests:Array.isArray(raw?.requests)?raw.requests:[],
    payments:Array.isArray(raw?.payments)?raw.payments:[],
    sales:Array.isArray(raw?.sales)?raw.sales:[],
    feedbacks:Array.isArray(raw?.feedbacks)?raw.feedbacks:[],
    notifications:Array.isArray(raw?.notifications)?raw.notifications:[],
    settings:raw?.settings&&typeof raw.settings==='object'?raw.settings:{theme:'light'}
  });
  function loadDB(){
    try{
      const current=localStorage.getItem(KEY);
      if(current) return normalizeDB(JSON.parse(current));
      const old=localStorage.getItem('ti_autonomo_db_v1');
      if(old){const migrated=normalizeDB(JSON.parse(old));saveDB(migrated);return migrated;}
    }catch(_e){}
    const fresh=clone(seed);saveDB(fresh);return fresh;
  }
  function saveDB(value){try{localStorage.setItem(KEY,JSON.stringify(value));}catch(_e){}}
  function resetDB(){const fresh=clone(seed);saveDB(fresh);return fresh;}
  function replaceDB(value){const clean=normalizeDB(value);saveDB(clean);return clean;}
  function uid(prefix){return `${prefix}-${Date.now().toString().slice(-7)}${Math.floor(Math.random()*90+10)}`;}

  let db=loadDB();
  const state={section:'dashboard',equipment:'computer',search:'',category:'all',selected:new Set(),requestSearch:'',requestStatus:'all',requestPriority:'all',clientSearch:''};
  const $=s=>document.querySelector(s);
  const $$=s=>Array.from(document.querySelectorAll(s));
  const money=new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'});
  const dt=v=>v?new Date(v).toLocaleString('pt-BR'):'—';
  const escapeHTML=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));

  function toast(msg){const el=$('#toast');if(!el)return;el.textContent=msg;el.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove('show'),2600);}
  function commit(msg){saveDB(db);renderAll();if(msg)toast(msg);}
  function notify(text){db.notifications.unshift({id:uid('NOT'),text,read:false,createdAt:new Date().toISOString()});}
  function slaHours(priority){return ({Baixa:72,Média:24,Alta:8,Crítica:4})[priority]||24;}
  function dueAt(priority){const d=new Date();d.setHours(d.getHours()+slaHours(priority));return d.toISOString();}
  function isOverdue(r){return !['Resolvido','Cancelado'].includes(r.status)&&new Date(r.dueAt)<new Date();}
  function statusClass(s){return s==='Aberto'?'open':s==='Em atendimento'?'progress':s==='Resolvido'?'resolved':s==='Cancelado'?'cancelled':'';}
  function priorityClass(p){return p==='Crítica'?'priority-critical':p==='Alta'?'priority-high':'';}
  function showSection(name){state.section=name;$$('.page-section').forEach(s=>s.classList.toggle('active',s.id===`section-${name}`));$$('.nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.section===name));window.scrollTo({top:0,behavior:'smooth'});renderAll();}
  function priceText(s,equipment){const v=s[equipment];if(v==null)return'Indisponível';return`${s.from?'A partir de ':''}${money.format(v)}${s.parts?' + peça':''}`;}
  function selectedServices(equipment=state.equipment){return services.filter(s=>state.selected.has(s.id)&&s[equipment]!=null);}
  function selectedTotal(equipment=state.equipment){return selectedServices(equipment).reduce((a,s)=>a+Number(s[equipment]||0),0);}

  function renderDashboard(){
    const open=db.requests.filter(r=>r.status==='Aberto').length;
    const progress=db.requests.filter(r=>r.status==='Em atendimento').length;
    const resolved=db.requests.filter(r=>r.status==='Resolvido').length;
    const overdue=db.requests.filter(isOverdue).length;
    const revenue=db.payments.filter(p=>p.status==='Pago').reduce((a,p)=>a+Number(p.amount||0),0);
    const pending=db.payments.filter(p=>p.status==='Pendente').reduce((a,p)=>a+Number(p.amount||0),0);
    const avg=db.feedbacks.length?db.feedbacks.reduce((a,f)=>a+Number(f.rating),0)/db.feedbacks.length:0;
    const metrics=[['Abertos',open],['Em atendimento',progress],['Resolvidos',resolved],['SLA vencido',overdue],['Recebido',money.format(revenue)],['A receber',money.format(pending)],['Clientes',db.clients.length],['Avaliação',avg?avg.toFixed(1)+'/5':'—']];
    $('#metrics-grid').innerHTML=metrics.map(([l,v])=>`<article class="metric-card"><span class="label">${l}</span><strong class="value">${v}</strong></article>`).join('');
    const recent=[...db.requests].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).slice(0,5);
    $('#recent-requests').innerHTML=recent.length?recent.map(r=>`<div class="item-row"><div><strong>${escapeHTML(r.id)} · ${escapeHTML(r.client)}</strong><span class="small muted">${escapeHTML(r.service)} · <span class="${priorityClass(r.priority)}">${r.priority}</span></span></div><div><span class="status ${statusClass(r.status)}">${r.status}</span><br><button class="link-btn request-detail" data-id="${r.id}">Abrir</button></div></div>`).join(''):'<div class="empty">Sem chamados.</div>';
    const actions=[];if(overdue)actions.push(`${overdue} chamado(s) com SLA vencido`);if(db.payments.some(p=>p.status==='Pendente'))actions.push('Existem pagamentos pendentes');if(db.notifications.some(n=>!n.read))actions.push('Há notificações não lidas');if(db.sales.length)actions.push(`${db.sales.length} venda(s) registrada(s)`);if(!actions.length)actions.push('Nenhuma pendência crítica no momento');
    $('#next-actions').innerHTML=actions.map(a=>`<div class="item-row"><strong>${escapeHTML(a)}</strong></div>`).join('');
  }

  function renderServices(){
    const cats=[...new Set(services.map(s=>s.category))].sort();
    const sel=$('#category-select');
    if(sel.options.length===1)cats.forEach(c=>sel.insertAdjacentHTML('beforeend',`<option>${escapeHTML(c)}</option>`));
    sel.value=state.category;$('#equipment-select').value=state.equipment;
    const q=state.search.toLowerCase();
    const visible=services.filter(s=>(state.category==='all'||s.category===state.category)&&`${s.name} ${s.category}`.toLowerCase().includes(q));
    $('#service-count').textContent=`${visible.length} serviço${visible.length!==1?'s':''}`;
    $('#service-grid').innerHTML=visible.map(s=>{const available=s[state.equipment]!=null,selected=state.selected.has(s.id);return`<article class="service-card"><div class="top"><span class="service-number">${String(s.id).padStart(2,'0')}</span><div><h3>${escapeHTML(s.name)}</h3><div class="small muted">${escapeHTML(s.category)} · ${available?'Disponível':'Indisponível'} para ${state.equipment==='computer'?'computador':'notebook'}</div></div></div><div class="bottom"><span class="price-chip">${priceText(s,state.equipment)}</span><button class="btn ${selected?'secondary':'primary'} service-toggle" data-id="${s.id}" ${available?'':'disabled'}>${selected?'Remover':'Adicionar'}</button></div></article>`}).join('');
    $('#service-empty').classList.toggle('hidden',visible.length>0);
    const count=selectedServices().length;$('#floating-cart-count').textContent=`${count} ${count===1?'item':'itens'}`;$('#floating-cart-total').textContent=money.format(selectedTotal());
    $('#floating-cart').classList.toggle('cart-active',count>0);
  }

  function renderQuote(){
    const eq=$('#quote-equipment');if(document.activeElement!==eq)eq.value=state.equipment;
    const chosen=selectedServices(state.equipment);
    $('#quote-items').innerHTML=chosen.map(s=>`<div class="item-row"><div><strong>${escapeHTML(s.name)}</strong><span class="small muted-light">${priceText(s,state.equipment)}</span></div><button class="icon-btn quote-remove" data-id="${s.id}">✕</button></div>`).join('');
    $('#quote-empty').classList.toggle('hidden',chosen.length>0);$('#quote-total').textContent=money.format(selectedTotal(state.equipment));$('#parts-note').classList.toggle('hidden',!chosen.some(s=>s.parts));
    const rows=[...db.quotes].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));$('#quote-history-count').textContent=`${rows.length} salvo${rows.length!==1?'s':''}`;
    $('#quote-history').innerHTML=rows.length?`<table><thead><tr><th>ID</th><th>Cliente</th><th>Equipamento</th><th>Total</th><th>Status</th><th>Data</th><th>Ação</th></tr></thead><tbody>${rows.map(q=>`<tr><td>${q.id}</td><td>${escapeHTML(q.client)}</td><td>${q.equipment==='computer'?'Computador':'Notebook'}</td><td>${money.format(q.total)}</td><td>${q.status}</td><td>${dt(q.createdAt)}</td><td><button class="link-btn quote-detail" data-id="${q.id}">Detalhes</button></td></tr>`).join('')}</tbody></table>`:'<div class="empty">Nenhum orçamento salvo.</div>';
  }

  function renderRequests(){
    const q=state.requestSearch.toLowerCase();
    const rows=[...db.requests].filter(r=>(state.requestStatus==='all'||r.status===state.requestStatus)&&(state.requestPriority==='all'||r.priority===state.requestPriority)&&`${r.id} ${r.client} ${r.service}`.toLowerCase().includes(q)).sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
    $('#requests-table').innerHTML=rows.length?`<table><thead><tr><th>ID</th><th>Cliente</th><th>Serviço</th><th>Prioridade</th><th>Status</th><th>SLA</th><th>Ação</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${r.id}</td><td>${escapeHTML(r.client)}</td><td>${escapeHTML(r.service)}</td><td class="${priorityClass(r.priority)}">${r.priority}</td><td><span class="status ${statusClass(r.status)}">${r.status}</span></td><td>${isOverdue(r)?'<strong class="priority-critical">Vencido</strong>':dt(r.dueAt)}</td><td><button class="link-btn request-detail" data-id="${r.id}">Abrir</button></td></tr>`).join('')}</tbody></table>`:'<div class="empty">Nenhum chamado encontrado.</div>';
  }

  function renderClients(){
    const q=state.clientSearch.toLowerCase();const rows=db.clients.filter(c=>`${c.name} ${c.phone} ${c.email}`.toLowerCase().includes(q));
    $('#clients-table').innerHTML=rows.length?`<table><thead><tr><th>ID</th><th>Nome</th><th>Telefone</th><th>E-mail</th><th>Chamados</th><th>Ação</th></tr></thead><tbody>${rows.map(c=>`<tr><td>${c.id}</td><td>${escapeHTML(c.name)}</td><td>${escapeHTML(c.phone)}</td><td>${escapeHTML(c.email)}</td><td>${db.requests.filter(r=>r.client===c.name).length}</td><td><button class="link-btn client-detail" data-id="${c.id}">Detalhes</button></td></tr>`).join('')}</tbody></table>`:'<div class="empty">Nenhum cliente encontrado.</div>';
  }

  function renderPayments(){
    const paid=db.payments.filter(p=>p.status==='Pago').reduce((a,p)=>a+Number(p.amount),0),pending=db.payments.filter(p=>p.status==='Pendente').reduce((a,p)=>a+Number(p.amount),0);
    $('#payments-summary').innerHTML=[['Recebido',money.format(paid)],['Pendente',money.format(pending)],['Vendas',db.sales.length]].map(([l,v])=>`<article class="metric-card"><span class="label">${l}</span><strong class="value">${v}</strong></article>`).join('');
    $('#payments-table').innerHTML=db.payments.length?`<table><thead><tr><th>ID</th><th>Cliente</th><th>Referência</th><th>Método</th><th>Status</th><th>Valor</th><th>Origem</th><th>Data</th><th>Ação</th></tr></thead><tbody>${[...db.payments].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).map(p=>`<tr><td>${p.id}</td><td>${escapeHTML(p.client)}</td><td>${escapeHTML(p.requestId||p.saleId||'—')}</td><td>${escapeHTML(p.method)}</td><td><span class="status ${p.status==='Pago'?'resolved':'open'}">${p.status}</span></td><td>${money.format(p.amount)}</td><td>${escapeHTML(p.origin||'Manual')}</td><td>${dt(p.createdAt)}</td><td>${p.saleId?`<button class="link-btn sale-receipt" data-id="${p.saleId}">Nota</button>`:p.status==='Pendente'?`<button class="link-btn mark-paid" data-id="${p.id}">Marcar pago</button>`:'—'}</td></tr>`).join('')}</tbody></table>`:'<div class="empty">Nenhum pagamento registrado.</div>';
  }

  function renderFeedback(){const avg=db.feedbacks.length?db.feedbacks.reduce((a,f)=>a+Number(f.rating),0)/db.feedbacks.length:0;$('#feedback-summary').innerHTML=[['Avaliação média',avg?avg.toFixed(1)+'/5':'—'],['Avaliações',db.feedbacks.length],['5 estrelas',db.feedbacks.filter(f=>Number(f.rating)===5).length]].map(([l,v])=>`<article class="metric-card"><span class="label">${l}</span><strong class="value">${v}</strong></article>`).join('');$('#feedback-list').innerHTML=db.feedbacks.length?[...db.feedbacks].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).map(f=>`<article class="card-note"><div class="panel-head"><strong>${escapeHTML(f.client)}</strong><span class="star">${'★'.repeat(Number(f.rating))}${'☆'.repeat(5-Number(f.rating))}</span></div><p>${escapeHTML(f.comment||'Sem comentário.')}</p><span class="small muted">${escapeHTML(f.requestId||'')} · ${dt(f.createdAt)}</span></article>`).join(''):'<div class="empty">Nenhum feedback registrado.</div>';}
  function renderNotifications(){const rows=[...db.notifications].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));$('#notifications-list').innerHTML=rows.length?rows.map(n=>`<article class="card-note ${n.read?'':'unread-note'}"><div class="panel-head"><strong>${n.read?'Lida':'Nova'}</strong>${n.read?'':`<button class="link-btn mark-read" data-id="${n.id}">Marcar lida</button>`}</div><p>${escapeHTML(n.text)}</p><span class="small muted">${dt(n.createdAt)}</span></article>`).join(''):'<div class="empty">Sem notificações.</div>';}
  function applyTheme(){document.documentElement.classList.toggle('theme-dark',db.settings?.theme==='dark');}
  function renderAll(){renderDashboard();renderServices();renderQuote();renderRequests();renderClients();renderPayments();renderFeedback();renderNotifications();applyTheme();}

  function openModal(title,html){$('#modal-title').textContent=title;$('#modal-body').innerHTML=html;$('#modal').classList.remove('hidden');$('#modal').setAttribute('aria-hidden','false');}
  function closeModal(){$('#modal').classList.add('hidden');$('#modal').setAttribute('aria-hidden','true');}

  function cartModal(){
    const chosen=selectedServices();
    if(!chosen.length){openModal('Carrinho de serviços','<div class="empty">Seu carrinho está vazio. Escolha um ou mais serviços no catálogo.</div><div class="action-row mt16"><button class="btn primary" data-cart-go-services>Escolher serviços</button></div>');return;}
    const rows=chosen.map(s=>`<div class="cart-line"><div><strong>${escapeHTML(s.name)}</strong><span class="small muted">${state.equipment==='computer'?'Computador':'Notebook'} · ${escapeHTML(s.category)}</span></div><div class="cart-line-actions"><strong>${money.format(s[state.equipment])}${s.parts?' + peça':''}</strong><button class="icon-btn cart-remove" data-id="${s.id}" title="Remover">✕</button></div></div>`).join('');
    openModal('Carrinho de serviços',`<div class="cart-summary"><div class="cart-equipment"><span>Equipamento</span><strong>${state.equipment==='computer'?'Computador':'Notebook'}</strong></div>${rows}<div class="receipt-total"><span>Total dos serviços</span><strong>${money.format(selectedTotal())}</strong></div>${chosen.some(s=>s.parts)?'<p class="small muted">* Serviços marcados com “+ peça” não incluem o valor do componente.</p>':''}<div class="action-row mt16"><button class="btn secondary" data-cart-go-services>Continuar escolhendo</button><button class="btn secondary" data-cart-go-quote>Salvar orçamento</button><button class="btn primary" id="cart-checkout">Finalizar venda</button></div></div>`);
  }

  function checkoutModal(){
    const chosen=selectedServices();if(!chosen.length)return toast('Adicione serviços ao carrinho primeiro.');
    openModal('Finalizar venda',`<form id="checkout-form">
      <div class="checkout-note"><strong>Venda demonstrativa</strong><span>Nenhuma cobrança real será realizada. Ao confirmar, o sistema gera uma nota com os serviços, valor e forma de pagamento.</span></div>
      <div class="form-grid-2 mt16">
        <label>Cliente<input name="client" required placeholder="Nome do cliente" value="${escapeHTML($('#quote-client')?.value||'')}"></label>
        <label>Telefone<input name="phone" placeholder="(93) 99999-9999" value="${escapeHTML($('#quote-phone')?.value||'')}"></label>
        <label>Equipamento<input value="${state.equipment==='computer'?'Computador':'Notebook'}" disabled></label>
        <label>Forma de pagamento<select name="method" id="checkout-method"><option value="PIX">PIX</option><option value="Cartão de Débito">Cartão de Débito</option><option value="Cartão de Crédito">Cartão de Crédito</option></select></label>
      </div>
      <div id="payment-detail" class="payment-detail mt16"></div>
      <div class="receipt-preview mt16">
        <h3>Resumo da venda</h3>
        ${chosen.map(s=>`<div class="receipt-row"><span>${escapeHTML(s.name)}</span><strong>${money.format(s[state.equipment])}${s.parts?' + peça':''}</strong></div>`).join('')}
        <div class="receipt-total"><span>Total</span><strong>${money.format(selectedTotal())}</strong></div>
      </div>
      <div class="action-row mt16"><button type="button" class="btn secondary" data-cart-back>Voltar ao carrinho</button><button class="btn primary" type="submit">Confirmar e gerar nota</button></div>
    </form>`);
    updatePaymentDetail('PIX');
  }

  function updatePaymentDetail(method){
    const el=$('#payment-detail');if(!el)return;
    if(method==='PIX')el.innerHTML=`<div class="payment-box pix-box"><div class="pix-symbol">PIX</div><div><strong>Pagamento via PIX</strong><p class="small muted">Simulação: confirme a venda para registrar o PIX como pago e gerar a nota.</p><code>chave-pix-demo@ti-autonomo</code></div></div>`;
    else el.innerHTML=`<div class="payment-box"><strong>${escapeHTML(method)}</strong><div class="form-grid-2 mt12"><label>Bandeira<select name="brand"><option>Visa</option><option>Mastercard</option><option>Elo</option><option>Hipercard</option></select></label><label>Final do cartão<input name="cardLast4" inputmode="numeric" maxlength="4" pattern="[0-9]{4}" placeholder="1234"></label></div><p class="small muted">Os dados são apenas demonstrativos e não são enviados a uma operadora.</p></div>`;
  }

  function finalizeSale(form){
    const data=new FormData(form);const chosen=selectedServices();if(!chosen.length)return toast('Carrinho vazio.');
    const client=String(data.get('client')||'').trim();if(!client)return toast('Informe o cliente.');
    const phone=String(data.get('phone')||'').trim();const method=String(data.get('method')||'PIX');
    const sale={id:uid('VEN'),receipt:`NOTA-${Date.now().toString().slice(-8)}`,client,phone,equipment:state.equipment,items:chosen.map(s=>({id:s.id,name:s.name,price:Number(s[state.equipment]),parts:!!s.parts})),total:selectedTotal(),method,brand:String(data.get('brand')||''),cardLast4:String(data.get('cardLast4')||''),createdAt:new Date().toISOString()};
    db.sales.unshift(sale);
    const payment={id:uid('PAY'),client,saleId:sale.id,requestId:'',method,status:'Pago',amount:sale.total,origin:'Venda direta',createdAt:sale.createdAt};db.payments.unshift(payment);
    if(!db.clients.some(c=>c.name.toLowerCase()===client.toLowerCase()))db.clients.push({id:uid('CLI'),name:client,phone,email:'',createdAt:sale.createdAt});
    notify(`Venda ${sale.id} concluída para ${client} via ${method}.`);
    state.selected.clear();saveDB(db);renderAll();showReceipt(sale,true);
  }

  function receiptText(sale){
    const cardInfo=sale.method.includes('Cartão')&&sale.cardLast4?`\nBandeira: ${sale.brand||'-'}\nFinal do cartão: **** ${sale.cardLast4}`:'';
    return `SERVIÇOS TI AUTÔNOMO\nCOMPROVANTE / NOTA DE SERVIÇOS\n${sale.receipt}\n\nData: ${dt(sale.createdAt)}\nCliente: ${sale.client}\nTelefone: ${sale.phone||'-'}\nEquipamento: ${sale.equipment==='computer'?'Computador':'Notebook'}\n\nSERVIÇOS\n${sale.items.map(i=>`- ${i.name}: ${money.format(i.price)}${i.parts?' + peça':''}`).join('\n')}\n\nTOTAL: ${money.format(sale.total)}\nFORMA DE PAGAMENTO: ${sale.method}${cardInfo}\nSTATUS: PAGAMENTO REGISTRADO\n\nObservação: comprovante gerado para demonstração do sistema. Não representa transação bancária real.\n`;
  }

  function showReceipt(sale,newSale=false){
    if(!sale)return;
    const card=sale.method.includes('Cartão')&&sale.cardLast4?`<div class="receipt-row"><span>Cartão</span><strong>${escapeHTML(sale.brand||'')} •••• ${escapeHTML(sale.cardLast4)}</strong></div>`:'';
    openModal(newSale?'Venda concluída':'Nota da venda',`<article id="sale-receipt" class="receipt-card"><div class="receipt-brand"><span class="badge">SERVIÇOS TI</span><h2>Nota de serviços</h2><p>${escapeHTML(sale.receipt)}</p></div><div class="receipt-row"><span>Data</span><strong>${dt(sale.createdAt)}</strong></div><div class="receipt-row"><span>Cliente</span><strong>${escapeHTML(sale.client)}</strong></div><div class="receipt-row"><span>Equipamento</span><strong>${sale.equipment==='computer'?'Computador':'Notebook'}</strong></div><div class="receipt-divider"></div>${sale.items.map(i=>`<div class="receipt-row"><span>${escapeHTML(i.name)}</span><strong>${money.format(i.price)}${i.parts?' + peça':''}</strong></div>`).join('')}<div class="receipt-divider"></div><div class="receipt-total"><span>Total</span><strong>${money.format(sale.total)}</strong></div><div class="receipt-row"><span>Pagamento</span><strong>${escapeHTML(sale.method)}</strong></div>${card}<div class="receipt-status">✓ Pagamento registrado</div><p class="small muted">Venda simulada para demonstração. Nenhuma transação bancária real foi processada.</p></article><div class="action-row mt16"><button class="btn secondary" id="download-sale-receipt" data-id="${sale.id}">Baixar nota TXT</button><button class="btn primary" id="finish-sale-flow">Concluir</button></div>`);
  }

  function requestForm(prefill={}){openModal('Novo chamado',`<form id="request-form"><div class="form-grid-2"><label>Cliente<input name="client" required value="${escapeHTML(prefill.client||'')}"></label><label>Telefone<input name="phone" value="${escapeHTML(prefill.phone||'')}"></label><label>Serviço<input name="service" required value="${escapeHTML(prefill.service||'')}"></label><label>Prioridade<select name="priority"><option>Baixa</option><option selected>Média</option><option>Alta</option><option>Crítica</option></select></label></div><label class="mt16">Descrição<textarea name="description" rows="5" required>${escapeHTML(prefill.description||'')}</textarea></label><div class="action-row mt16"><button class="btn primary" type="submit">Salvar chamado</button><button class="btn secondary" type="button" data-close-modal>Cancelar</button></div></form>`);}
  function clientForm(){openModal('Novo cliente',`<form id="client-form"><div class="form-grid-2"><label>Nome<input name="name" required></label><label>Telefone<input name="phone" required></label><label>E-mail<input name="email" type="email"></label></div><div class="action-row mt16"><button class="btn primary">Salvar cliente</button></div></form>`);}
  function paymentForm(){openModal('Registrar pagamento',`<form id="payment-form"><div class="form-grid-2"><label>Cliente<input name="client" required></label><label>Chamado<input name="requestId" placeholder="OS-..."></label><label>Método<select name="method"><option>PIX</option><option>Dinheiro</option><option>Cartão de Débito</option><option>Cartão de Crédito</option><option>Transferência</option></select></label><label>Status<select name="status"><option>Pendente</option><option>Pago</option></select></label><label>Valor<input name="amount" type="number" min="0" step="0.01" required></label></div><div class="action-row mt16"><button class="btn primary">Salvar pagamento</button></div></form>`);}
  function feedbackForm(){openModal('Registrar feedback',`<form id="feedback-form"><div class="form-grid-2"><label>Cliente<input name="client" required></label><label>Chamado<input name="requestId"></label><label>Avaliação<select name="rating"><option value="5">5</option><option value="4">4</option><option value="3">3</option><option value="2">2</option><option value="1">1</option></select></label></div><label class="mt16">Comentário<textarea name="comment" rows="4"></textarea></label><div class="action-row mt16"><button class="btn primary">Salvar feedback</button></div></form>`);}

  function requestDetail(id){const r=db.requests.find(x=>x.id===id);if(!r)return;openModal(`Chamado ${r.id}`,`<div class="grid-2"><div><p><strong>Cliente:</strong> ${escapeHTML(r.client)}</p><p><strong>Telefone:</strong> ${escapeHTML(r.phone||'—')}</p><p><strong>Serviço:</strong> ${escapeHTML(r.service)}</p><p><strong>Prioridade:</strong> ${r.priority}</p></div><div><label>Status<select id="detail-status">${['Aberto','Em atendimento','Aguardando cliente','Resolvido','Cancelado'].map(s=>`<option ${s===r.status?'selected':''}>${s}</option>`).join('')}</select></label><p><strong>SLA:</strong> ${isOverdue(r)?'<span class="priority-critical">Vencido</span>':dt(r.dueAt)}</p></div></div><p><strong>Descrição:</strong><br>${escapeHTML(r.description)}</p><h3>Histórico</h3><div class="stack">${(r.history||[]).map(h=>`<div class="item-row"><span>${escapeHTML(h.text)}</span><span class="small muted">${dt(h.at)}</span></div>`).join('')}</div><h3 class="mt16">Comentários</h3><div class="stack">${(r.comments||[]).map(c=>`<div class="item-row">${escapeHTML(c)}</div>`).join('')||'<div class="empty">Sem comentários.</div>'}</div><div class="form-grid-2 mt16"><label>Novo comentário<input id="detail-comment" placeholder="Registrar andamento..."></label><div class="action-row" style="align-items:end"><button id="save-request-update" class="btn primary" data-id="${r.id}">Salvar atualização</button><button id="download-request-txt" class="btn secondary" data-id="${r.id}">TXT</button></div></div>`);}
  function quoteDetail(id){const q=db.quotes.find(x=>x.id===id);if(!q)return;openModal(`Orçamento ${q.id}`,`<p><strong>Cliente:</strong> ${escapeHTML(q.client)}</p><p><strong>Contato:</strong> ${escapeHTML(q.phone||'—')} · ${escapeHTML(q.email||'—')}</p><p><strong>Equipamento:</strong> ${q.equipment==='computer'?'Computador':'Notebook'}</p><p><strong>Itens:</strong></p><div class="stack">${q.items.map(id=>{const s=services.find(x=>x.id===id);return s?`<div class="item-row"><span>${escapeHTML(s.name)}</span><strong>${priceText(s,q.equipment)}</strong></div>`:''}).join('')}</div><div class="total-row" style="color:#12221c;border-color:#d8e3dc"><span>Total</span><strong style="color:#087337">${money.format(q.total)}</strong></div><p><strong>Observações:</strong> ${escapeHTML(q.notes||'—')}</p><div class="action-row"><button class="btn secondary download-quote-txt" data-id="${q.id}">Baixar TXT</button><button class="btn primary sell-quote" data-id="${q.id}">Vender este orçamento</button></div>`);}
  function clientDetail(id){const c=db.clients.find(x=>x.id===id);if(!c)return;const req=db.requests.filter(r=>r.client===c.name);openModal(c.name,`<p><strong>Telefone:</strong> ${escapeHTML(c.phone)}</p><p><strong>E-mail:</strong> ${escapeHTML(c.email||'—')}</p><p><strong>Cliente desde:</strong> ${dt(c.createdAt)}</p><h3>Histórico de chamados</h3><div class="stack">${req.length?req.map(r=>`<div class="item-row"><span>${r.id} · ${escapeHTML(r.service)}</span><span class="status ${statusClass(r.status)}">${r.status}</span></div>`).join(''):'<div class="empty">Sem chamados.</div>'}</div>`);}

  function download(filename,content,type='text/plain;charset=utf-8'){const blob=new Blob([content],{type});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),500);}
  function requestTxt(r){return`SERVIÇOS TI AUTÔNOMO\nORDEM DE SERVIÇO ${r.id}\n\nCliente: ${r.client}\nTelefone: ${r.phone||'-'}\nServiço: ${r.service}\nPrioridade: ${r.priority}\nStatus: ${r.status}\nAbertura: ${dt(r.createdAt)}\nSLA: ${dt(r.dueAt)}\n\nDescrição:\n${r.description}\n\nHistórico:\n${(r.history||[]).map(h=>`- ${dt(h.at)} | ${h.text}`).join('\n')}\n\nComentários:\n${(r.comments||[]).map(c=>`- ${c}`).join('\n')||'-'}\n`;}
  function quoteTxt(q){return`SERVIÇOS TI AUTÔNOMO\nORÇAMENTO ${q.id}\n\nCliente: ${q.client}\nTelefone: ${q.phone||'-'}\nE-mail: ${q.email||'-'}\nEquipamento: ${q.equipment==='computer'?'Computador':'Notebook'}\n\nSERVIÇOS:\n${q.items.map(id=>{const s=services.find(x=>x.id===id);return s?`- ${s.name}: ${priceText(s,q.equipment)}`:''}).join('\n')}\n\nTotal estimado: ${money.format(q.total)}\nObservações: ${q.notes||'-'}\nData: ${dt(q.createdAt)}\n`;}
  function generalTxt(){const paid=db.payments.filter(p=>p.status==='Pago').reduce((a,p)=>a+Number(p.amount),0);return`SERVIÇOS TI AUTÔNOMO - RELATÓRIO GERAL\nGerado em: ${new Date().toLocaleString('pt-BR')}\n\nClientes: ${db.clients.length}\nChamados: ${db.requests.length}\nAbertos: ${db.requests.filter(r=>r.status==='Aberto').length}\nEm atendimento: ${db.requests.filter(r=>r.status==='Em atendimento').length}\nResolvidos: ${db.requests.filter(r=>r.status==='Resolvido').length}\nVendas: ${db.sales.length}\nFaturamento recebido: ${money.format(paid)}\nAvaliações: ${db.feedbacks.length}\n\nCHAMADOS\n${db.requests.map(r=>`${r.id} | ${r.client} | ${r.service} | ${r.priority} | ${r.status}`).join('\n')}\n\nVENDAS\n${db.sales.map(s=>`${s.id} | ${s.client} | ${money.format(s.total)} | ${s.method} | ${dt(s.createdAt)}`).join('\n')}\n`;}

  function wireStaticEvents(){
    $$('[data-section]').forEach(b=>b.addEventListener('click',()=>showSection(b.dataset.section)));
    $('#service-search').addEventListener('input',e=>{state.search=e.target.value.trim();renderServices();});
    $('#equipment-select').addEventListener('change',e=>{state.equipment=e.target.value;[...state.selected].forEach(id=>{const s=services.find(x=>x.id===id);if(s&&s[state.equipment]==null)state.selected.delete(id);});$('#quote-equipment').value=state.equipment;renderServices();renderQuote();});
    $('#category-select').addEventListener('change',e=>{state.category=e.target.value;renderServices();});
    $('#quote-equipment').addEventListener('change',e=>{state.equipment=e.target.value;[...state.selected].forEach(id=>{const s=services.find(x=>x.id===id);if(s&&s[state.equipment]==null)state.selected.delete(id);});$('#equipment-select').value=state.equipment;renderAll();});
    $('#floating-cart').addEventListener('click',cartModal);
    $('#clear-quote').addEventListener('click',()=>{state.selected.clear();renderAll();toast('Orçamento limpo.');});
    $('#request-search').addEventListener('input',e=>{state.requestSearch=e.target.value.trim();renderRequests();});
    $('#request-status-filter').addEventListener('change',e=>{state.requestStatus=e.target.value;renderRequests();});
    $('#request-priority-filter').addEventListener('change',e=>{state.requestPriority=e.target.value;renderRequests();});
    $('#client-search').addEventListener('input',e=>{state.clientSearch=e.target.value.trim();renderClients();});
    $('#quick-new-request').addEventListener('click',()=>requestForm());$('#open-request-form').addEventListener('click',()=>requestForm());$('#open-client-form').addEventListener('click',clientForm);$('#open-payment-form').addEventListener('click',paymentForm);$('#open-feedback-form').addEventListener('click',feedbackForm);
    $('#mark-all-read').addEventListener('click',()=>{db.notifications.forEach(n=>n.read=true);commit('Notificações marcadas como lidas.');});
    $('#theme-toggle').addEventListener('click',()=>{db.settings=db.settings||{};db.settings.theme=db.settings.theme==='dark'?'light':'dark';commit();});
    $('#save-quote').addEventListener('click',()=>{const chosen=selectedServices(state.equipment);if(!chosen.length)return toast('Adicione ao menos um serviço.');const client=$('#quote-client').value.trim();if(!client)return toast('Informe o nome do cliente.');const q={id:uid('ORC'),client,phone:$('#quote-phone').value.trim(),email:$('#quote-email').value.trim(),equipment:state.equipment,items:chosen.map(s=>s.id),total:selectedTotal(state.equipment),status:'Pendente',createdAt:new Date().toISOString(),notes:$('#quote-notes').value.trim()};db.quotes.unshift(q);if(client&&!db.clients.some(c=>c.name.toLowerCase()===client.toLowerCase()))db.clients.push({id:uid('CLI'),name:client,phone:q.phone,email:q.email,createdAt:new Date().toISOString()});notify(`Orçamento ${q.id} criado para ${client}.`);commit('Orçamento salvo.');});
    $('#create-request-from-quote').addEventListener('click',()=>{const chosen=selectedServices(state.equipment);requestForm({client:$('#quote-client').value.trim(),phone:$('#quote-phone').value.trim(),service:chosen.map(s=>s.name).join(', '),description:$('#quote-notes').value.trim()});});
    $('#export-txt').addEventListener('click',()=>download(`relatorio-ti-autonomo-${Date.now()}.txt`,generalTxt()));
    $('#export-csv').addEventListener('click',()=>{const head=['ID','Cliente','Telefone','Serviço','Prioridade','Status','Abertura','SLA'];const rows=db.requests.map(r=>[r.id,r.client,r.phone,r.service,r.priority,r.status,r.createdAt,r.dueAt]);const csv=[head,...rows].map(row=>row.map(v=>`"${String(v??'').replaceAll('"','""')}"`).join(';')).join('\n');download(`chamados-${Date.now()}.csv`,`\ufeff${csv}`,'text/csv;charset=utf-8');});
    $('#export-json').addEventListener('click',()=>download(`backup-ti-autonomo-${Date.now()}.json`,JSON.stringify(db,null,2),'application/json'));
    $('#import-json').addEventListener('click',()=>{const file=$('#import-json-file').files[0];if(!file)return toast('Selecione um arquivo JSON.');const reader=new FileReader();reader.onload=()=>{try{const parsed=JSON.parse(reader.result);db=replaceDB(parsed);renderAll();toast('Backup importado com sucesso.');}catch(_e){toast('Backup inválido.');}};reader.readAsText(file);});
    $('#reset-data').addEventListener('click',()=>{if(confirm('Restaurar os dados de demonstração? Os dados atuais serão apagados.')){db=resetDB();state.selected.clear();renderAll();toast('Dados restaurados.');}});
  }

  document.addEventListener('click',e=>{
    const serviceBtn=e.target.closest('.service-toggle');if(serviceBtn){const id=Number(serviceBtn.dataset.id);state.selected.has(id)?state.selected.delete(id):state.selected.add(id);renderAll();toast(state.selected.has(id)?'Serviço adicionado ao carrinho.':'Serviço removido.');return;}
    const cr=e.target.closest('.cart-remove');if(cr){state.selected.delete(Number(cr.dataset.id));renderAll();cartModal();return;}
    if(e.target.closest('[data-cart-go-services]')){closeModal();showSection('services');return;}
    if(e.target.closest('[data-cart-go-quote]')){closeModal();showSection('quote');return;}
    if(e.target.closest('[data-cart-back]')){cartModal();return;}
    if(e.target.closest('#cart-checkout')){checkoutModal();return;}
    const qr=e.target.closest('.quote-remove');if(qr){state.selected.delete(Number(qr.dataset.id));renderAll();return;}
    const rd=e.target.closest('.request-detail');if(rd)return requestDetail(rd.dataset.id);
    const qd=e.target.closest('.quote-detail');if(qd)return quoteDetail(qd.dataset.id);
    const cd=e.target.closest('.client-detail');if(cd)return clientDetail(cd.dataset.id);
    const mp=e.target.closest('.mark-paid');if(mp){const p=db.payments.find(x=>x.id===mp.dataset.id);if(p){p.status='Pago';notify(`Pagamento ${p.id} marcado como pago.`);commit('Pagamento atualizado.');}return;}
    const srct=e.target.closest('.sale-receipt');if(srct){const sale=db.sales.find(x=>x.id===srct.dataset.id);return showReceipt(sale);}
    const mr=e.target.closest('.mark-read');if(mr){const n=db.notifications.find(x=>x.id===mr.dataset.id);if(n){n.read=true;commit();}return;}
    const sr=e.target.closest('#save-request-update');if(sr){const r=db.requests.find(x=>x.id===sr.dataset.id);if(!r)return;const newStatus=$('#detail-status').value;const comment=$('#detail-comment').value.trim();if(newStatus!==r.status){r.status=newStatus;r.history.push({at:new Date().toISOString(),text:`Status alterado para ${newStatus}.`});}if(comment){r.comments.push(comment);r.history.push({at:new Date().toISOString(),text:'Novo comentário registrado.'});}r.updatedAt=new Date().toISOString();notify(`Chamado ${r.id} atualizado.`);commit('Chamado atualizado.');requestDetail(r.id);return;}
    const dr=e.target.closest('#download-request-txt');if(dr){const r=db.requests.find(x=>x.id===dr.dataset.id);if(r)download(`${r.id}.txt`,requestTxt(r));return;}
    const dq=e.target.closest('.download-quote-txt');if(dq){const q=db.quotes.find(x=>x.id===dq.dataset.id);if(q)download(`${q.id}.txt`,quoteTxt(q));return;}
    const sq=e.target.closest('.sell-quote');if(sq){const q=db.quotes.find(x=>x.id===sq.dataset.id);if(q){state.equipment=q.equipment;state.selected=new Set(q.items);$('#quote-client').value=q.client||'';$('#quote-phone').value=q.phone||'';$('#quote-email').value=q.email||'';renderAll();checkoutModal();}return;}
    const dsr=e.target.closest('#download-sale-receipt');if(dsr){const sale=db.sales.find(x=>x.id===dsr.dataset.id);if(sale)download(`${sale.receipt}.txt`,receiptText(sale));return;}
    if(e.target.closest('#finish-sale-flow')){closeModal();showSection('payments');return;}
    if(e.target.closest('[data-close-modal]')){closeModal();return;}
  });

  document.addEventListener('change',e=>{if(e.target.id==='checkout-method')updatePaymentDetail(e.target.value);});
  document.addEventListener('submit',e=>{
    e.preventDefault();const f=e.target;
    if(f.id==='checkout-form'){finalizeSale(f);return;}
    if(f.id==='request-form'){const d=new FormData(f),priority=d.get('priority');const r={id:`OS-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`,client:String(d.get('client')).trim(),phone:String(d.get('phone')||'').trim(),service:String(d.get('service')).trim(),priority,status:'Aberto',description:String(d.get('description')).trim(),createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),dueAt:dueAt(priority),history:[{at:new Date().toISOString(),text:'Chamado aberto.'}],comments:[]};db.requests.unshift(r);if(r.client&&!db.clients.some(c=>c.name.toLowerCase()===r.client.toLowerCase()))db.clients.push({id:uid('CLI'),name:r.client,phone:r.phone,email:'',createdAt:new Date().toISOString()});notify(`Novo chamado ${r.id} criado para ${r.client}.`);closeModal();commit('Chamado criado.');return;}
    if(f.id==='client-form'){const d=new FormData(f);db.clients.push({id:uid('CLI'),name:String(d.get('name')).trim(),phone:String(d.get('phone')).trim(),email:String(d.get('email')||'').trim(),createdAt:new Date().toISOString()});closeModal();commit('Cliente cadastrado.');return;}
    if(f.id==='payment-form'){const d=new FormData(f);const p={id:uid('PAY'),client:String(d.get('client')).trim(),requestId:String(d.get('requestId')||'').trim(),method:String(d.get('method')),status:String(d.get('status')),amount:Number(d.get('amount')),origin:'Registro manual',createdAt:new Date().toISOString()};db.payments.unshift(p);notify(`Pagamento ${p.id} registrado para ${p.client}.`);closeModal();commit('Pagamento registrado.');return;}
    if(f.id==='feedback-form'){const d=new FormData(f);db.feedbacks.unshift({id:uid('FDB'),client:String(d.get('client')).trim(),requestId:String(d.get('requestId')||'').trim(),rating:Number(d.get('rating')),comment:String(d.get('comment')||'').trim(),createdAt:new Date().toISOString()});closeModal();commit('Feedback registrado.');}
  });
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});

  function init(){wireStaticEvents();renderAll();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
