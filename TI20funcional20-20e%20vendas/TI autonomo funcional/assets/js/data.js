export const services = [
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

export const seed = {
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
    {id:'PAY-1001',client:'Carlos Mendes',requestId:'OS-2026-1003',method:'PIX',status:'Pago',amount:150,createdAt:'2026-09-03T17:40:00'},
    {id:'PAY-1002',client:'Marcos Silva',requestId:'OS-2026-1001',method:'Dinheiro',status:'Pendente',amount:150,createdAt:'2026-09-05T10:35:00'}
  ],
  feedbacks:[
    {id:'FDB-1001',client:'Carlos Mendes',requestId:'OS-2026-1003',rating:5,comment:'Serviço rápido e ficou perfeito.',createdAt:'2026-09-03T18:00:00'}
  ],
  notifications:[
    {id:'NOT-1001',text:'Novo chamado OS-2026-1002 criado por Ana Beatriz.',read:false,createdAt:'2026-09-07T15:00:00'},
    {id:'NOT-1002',text:'Pagamento PAY-1001 marcado como pago.',read:true,createdAt:'2026-09-03T17:40:00'}
  ],
  settings:{theme:'light'}
};
