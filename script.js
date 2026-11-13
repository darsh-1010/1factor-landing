const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const ic=n=>`<svg class="i"><use href="#${n}"/></svg>`;

/* services — exact copy from the original */
const SVC=[
['globe','Cross-border liquidity','Export Finance','Pre and post-shipment credit lines for international trade fulfilment, connected to a global network of 100+ factoring agencies and lending institutions with non-recourse risk mitigation.',['Up to 90% of invoice value','48hr approvals','140+ countries']],
['ship','Procurement capital','Import Finance','Direct vendor payments against shipping documents and Letters of Credit with flexible repayment cycles and multi-currency settlement.',['Zero collateral options','Multi-currency settlement','LC-backed']],
['file','Purchase order capital','PO Finance','Fulfil large enterprise orders without depleting cash reserves. Funding against confirmed purchase orders for raw material, manufacturing and packaging costs.',['Up to 100% order coverage','Direct supplier escrow','PO-backed']],
['zap','Invoice capital acceleration','PID / SID Discounting','Purchase Invoice Discounting and Sales Invoice Discounting with instant digital verification and multi-lender competitive bidding.',['T+0/T+1 disbursal','Competitive rates','Digital verification']],
['trend','Revolving credit line','Unsecured Working Capital Finance','Flexible liquidity reserves for scaling inventory, operational overheads and market expansion — without pledging fixed assets.',['No collateral','Revolving drawdown','Fast sanctions']],
['building','Institutional exchange bidding','TReDS Finance Limit','Unified gateway to competitive multi-financier bidding across TReDS exchanges (TReDS/RXIL/Invoicemart/DTXL) for MSME receivables — collateral-free.',['MSME &amp; seller-centric','Multi-bank bidding','No collateral']],
['truck','Inter-state trade lines','Domestic Finance','End-to-end supply chain credit facilities covering tier-1 suppliers, distributors and corporate buyers across the country.',['Tier-1 to Tier-3 coverage','Automated collections','PAN-India']],
['layers','360° trade infrastructure','Full Supply Chain Services','The complete trade infrastructure suite: LC discounting, bill discounting, buyer-seller reverse factoring, trade credit &amp; marine insurance, currency hedging, voyage funding and digital logistics tracking.',['End-to-end OS','Insurance &amp; FX','Logistics support']]];
$('#svc').innerHTML=SVC.map((s,i)=>`<div class="card tilt rv" style="--i:${i%4}"><div class="ico">${ic(s[0])}</div><small class="k">${s[1]}</small><h3>${s[2]}</h3><p>${s[3]}</p><div class="chips">${s[4].map(c=>`<span>${c}</span>`).join('')}</div><a href="#contact" class="more">View &amp; Apply ${ic('arrow')}</a></div>`).join('');

/* mobile menu */
(()=>{const b=$('#burger'),l=$('.links'),t=v=>{l.classList.toggle('open',v);b.classList.toggle('x',v);b.setAttribute('aria-expanded',v)};
  b.addEventListener('click',()=>t(!l.classList.contains('open')));l.addEventListener('click',e=>{if(e.target.tagName==='A')t(false)})})();

/* currency ticker */
(()=>{const FX=[['USD/JPY','149.86','+0.18'],['EUR/INR','90.45','+0.09'],['CNY/USD','0.1386','-0.02'],['EUR/USD','1.0842','+0.12'],['USD/INR','83.42','+0.08'],['GBP/USD','1.2718','-0.05'],['USD/AED','3.6725','+0.01']];
  const h=FX.map(f=>`<div><span>${f[0]}</span><b>${f[1]}</b><em class="${f[2][0]=='-'?'dn':'up'}">${f[2]}%</em></div>`).join('');
  $('#tk').innerHTML=h;$('#tk2').innerHTML=h})();

/* expanding slides */
(()=>{
  const acc=$('#acc'),bar=$('#accbar'),imgs=['assets/port.jpg','assets/containers.jpg'];
  acc.innerHTML=SVC.map((s,i)=>`<div class="pn" style="--ry:${i<4?4:-4}deg"><div class="bg" style="background-image:url(${imgs[i%2]});--bp:${i%2?'60% center':'right center'}"></div><div class="t">${ic(s[0])}<span>${s[2]}</span></div><div class="body"><h3>${s[2]}</h3><p>${s[3]}</p><div class="chips">${s[4].map(c=>`<span>${c}</span>`).join('')}</div><a href="#contact" class="more">View &amp; Apply ${ic('arrow')}</a></div></div>`).join('');
  bar.innerHTML=SVC.map(()=>'<i></i>').join('');
  const ps=$$('.pn',acc),bs=$$('i',bar);let cur=0,t,hold=false;
  const go=i=>{cur=i;ps.forEach((p,k)=>{p.classList.toggle('on',k===i);p.style.setProperty('--ry',(k<i?5:-5)+'deg');bs[k].classList.remove('on')});void bar.offsetWidth;bs[i].classList.add('on')};
  const tick=()=>{clearTimeout(t);t=setTimeout(()=>{if(!hold)go((cur+1)%ps.length);tick()},5000)};
  ps.forEach((p,i)=>{p.addEventListener('mouseenter',()=>{hold=true;go(i)});p.addEventListener('click',()=>go(i))});
  acc.addEventListener('mouseleave',()=>{hold=false;tick()});
  go(0);tick();
})();

/* mouse-driven 3D depth in hero */
(()=>{const h=$('#hero'),fl=$$('.float'),st=$$('.stat');
  h.addEventListener('mousemove',e=>{const r=h.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    fl.forEach(f=>{f.style.setProperty('--ry',x*16+'deg');f.style.setProperty('--rx',-y*14+'deg')});
    st.forEach((c,i)=>{c.style.setProperty('--ry',x*8+'deg');c.style.setProperty('--rx',-y*8+'deg');c.style.setProperty('--z',(i%2?10:4)+'px')})});
  h.addEventListener('mouseleave',()=>[...fl,...st].forEach(f=>{f.style.setProperty('--ry','0deg');f.style.setProperty('--rx','0deg');f.style.setProperty('--z','0px')}))})();

/* hero route animation: node rings + dots travelling along the dashed routes */
(()=>{
  const NS='http://www.w3.org/2000/svg',nodes=$('#nodes'),dots=$('#dots');
  const mk=(t,a,p)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);(p||nodes).appendChild(e);return e};
  [[945,353],[1168,241],[1094,631],[1503,688],[1725,780],[1614,483],[1875,557],[1763,278],[1437,291],[1298,447]].forEach(([x,y],i)=>{
    mk('circle',{cx:x,cy:y,r:17,class:'ring'});
    const a=mk('path',{d:`M${x-17} ${y}A17 17 0 0 1 ${x} ${y-17}`,fill:'none',stroke:'#12f0e0','stroke-width':1.6,opacity:.8,class:'spin'});a.style.animationDuration=(4+i%4)+'s';
  });
  const C={g:'#22e08a',t:'#12c9bd',b:'#4f7cf0'};
  [[918,284,5,'g'],[1534,228,5,'b'],[1722,487,6,'t'],[1597,678,6,'t'],[1505,426,6,'g'],[1078,597,6,'b']].forEach(([x,y,r,c],i)=>{
    const e=mk('circle',{cx:x,cy:y,r,fill:C[c]},dots);e.classList.add('pulse');e.style.animationDelay=(-i*.5)+'s'});
  const runs=[['r1','g',7],['r1','t',11],['r2','b',8],['r3','g',9],['r3','t',13],['r4','g',10],['r4','b',14],['r5','t',8],['r5','g',12],['r6','b',6]];
  runs.forEach(([id,c,dur],i)=>{
    const d=mk('circle',{r:6,fill:C[c]},dots),m=document.createElementNS(NS,'animateMotion');
    m.setAttribute('dur',dur+'s');m.setAttribute('repeatCount','indefinite');m.setAttribute('begin',(-i*1.3)+'s');m.setAttribute('keyPoints','0;1;0');m.setAttribute('keyTimes','0;.5;1');m.setAttribute('calcMode','linear');
    const r=document.createElementNS(NS,'mpath');r.setAttribute('href','#'+id);m.appendChild(r);d.appendChild(m)});
})();

/* process timeline: line fills step by step, cards light up in turn */
(()=>{
  const tr=$('#track'),fill=$('.fill',tr),dots=$$('b',tr),cards=$$('#steps .card');let cur=-1,t,hold=false,started=false;
  const go=i=>{cur=i;fill.style.width=((i+.5)/4*100)+'%';dots.forEach((d,k)=>d.classList.toggle('on',k<=i));cards.forEach((c,k)=>c.classList.toggle('act',k===i))};
  const loop=()=>{clearTimeout(t);t=setTimeout(()=>{if(!hold){if(cur>=3){fill.style.transition='none';fill.style.width='0';void fill.offsetWidth;fill.style.transition='';dots.forEach(d=>d.classList.remove('on'));go(0)}else go(cur+1)}loop()},2200)};
  cards.forEach((c,i)=>{c.addEventListener('mouseenter',()=>{hold=true;go(i)});c.addEventListener('mouseleave',()=>{hold=false})});
  new IntersectionObserver((e,o)=>{if(e[0].isIntersecting&&!started){started=true;go(0);loop()}},{threshold:.4}).observe($('#steps'));
})();

/* scroll reveal */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
$$('.rv').forEach(el=>io.observe(el));
setTimeout(()=>$$('.rv').forEach(el=>{const r=el.getBoundingClientRect();if(r.top<innerHeight)el.classList.add('in')}),1200);

/* 3D tilt */
[...$$('.tilt'),$('#photo')].forEach(c=>{
  c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
    c.style.setProperty('--mx',x*100+'%');c.style.setProperty('--my',y*100+'%');
    c.style.transform=`perspective(900px) rotateX(${(.5-y)*8}deg) rotateY(${(x-.5)*10}deg) translateY(-4px)`;c.style.transitionDelay='0s'});
  c.addEventListener('mouseleave',()=>c.style.transform='')});
