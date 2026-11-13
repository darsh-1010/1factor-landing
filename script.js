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


/* apply form: opens from every Apply / View & Apply button */
(()=>{
  const dlg=$('#apply'),form=$('#aform'),steps=$$('.stp',form),prog=$$('#mprog i'),
    next=$('#anext'),back=$('#aback'),sub=$('#asub'),err=$('#aerr'),done=$('#adone');
  let step=0,last=null;
  $('#aprod').insertAdjacentHTML('beforeend',SVC.map(s=>`<option>${s[2]}</option>`).join(''));
  const show=n=>{step=n;steps.forEach((s,i)=>s.hidden=i!==n);prog.forEach((p,i)=>p.classList.toggle('on',i<=n));
    back.hidden=n===0;next.hidden=n===2;sub.hidden=n!==2;err.hidden=true;
    if(n===2){const rows=[['Company',form.company.value],['Contact',form.name.value],['Email',form.email.value],['Phone',form.phone.value],['Product',form.product.value],['Limit',form.currency.value+' '+Number(form.amount.value).toLocaleString()],['Turnover',form.turnover.value],['Notes',form.message.value]].filter(r=>r[1].trim());
      const dl=$('#arev');dl.textContent='';rows.forEach(([k,v])=>{const a=document.createElement('dt'),b=document.createElement('dd');a.textContent=k;b.textContent=v;dl.append(a,b)})}};
  const valid=()=>{let ok=true,first;$$('input,select,textarea',steps[step]).forEach(f=>{const bad=!f.checkValidity();f.classList.toggle('bad',bad);if(bad&&!first)first=f;ok=ok&&!bad});if(first){first.focus();err.textContent='Please fill the highlighted fields.';err.hidden=false}else err.hidden=true;return ok};
  const open=(prod)=>{last=document.activeElement;form.reset();done.hidden=true;[...form.children].forEach(c=>{if(c!==done)c.style.display=''});$$('.bad',form).forEach(f=>f.classList.remove('bad'));
    if(prod&&[...form.product.options].some(o=>o.value===prod))form.product.value=prod;show(0);dlg.hidden=false;document.body.classList.add('mopen');setTimeout(()=>form.company.focus(),60)};
  const close=()=>{dlg.hidden=true;document.body.classList.remove('mopen');last&&last.focus()};
  $$('a[href="#contact"],.cta-card a[href^="mailto:"]').forEach(a=>{if(a.closest('.links'))return;a.addEventListener('click',e=>{e.preventDefault();
    const card=a.closest('.card,.pn');const t=card&&$('h3',card);open(t?t.textContent.trim():'')})});
  dlg.addEventListener('click',e=>{if(e.target.hasAttribute('data-close'))close()});
  addEventListener('keydown',e=>{if(e.key==='Escape'&&!dlg.hidden)close()});
  next.addEventListener('click',()=>valid()&&show(step+1));
  back.addEventListener('click',()=>show(step-1));
  form.addEventListener('submit',async e=>{e.preventDefault();if(!valid())return;
    const data=Object.fromEntries(new FormData(form));if(data.website)return close(); // honeypot
    sub.disabled=true;sub.textContent='Sending…';
    let msg='Our team will reach out within one business day.';
    try{const r=await fetch('/api/apply',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});if(!r.ok)throw 0}
    catch{ // no backend reachable (e.g. opened from file://): fall back to the visitor's email app
      const body=Object.entries(data).filter(([k,v])=>k!=='website'&&v).map(([k,v])=>k+': '+v).join('\n');
      location.href='mailto:info@1factor.com?subject='+encodeURIComponent('Finance limit application — '+data.company)+'&body='+encodeURIComponent(body);
      msg='Your email app should open with the application filled in. Press send to complete it.'}
    sub.disabled=false;sub.textContent='Submit application';
    [...form.children].forEach(c=>{if(c!==done)c.style.display='none'});done.hidden=false;$('#adonep').textContent=msg});
})();


/* smooth scroll (Lenis) + scroll-driven motion (GSAP). Page works fine without them. */
(()=>{
  if(!window.gsap||!window.Lenis||!window.ScrollTrigger||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  gsap.registerPlugin(ScrollTrigger);
  const lenis=new Lenis({duration:1.15,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t))});
  lenis.on('scroll',ScrollTrigger.update);
  gsap.ticker.add(t=>lenis.raf(t*1000));gsap.ticker.lagSmoothing(0);
  window.lenis=lenis;

  // anchor links glide instead of jumping (apply-form buttons already prevent default)
  document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a||e.defaultPrevented||a.getAttribute('href')==='#')return;
    const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();lenis.scrollTo(t,{offset:-56})}});
  // pause scrolling while the apply form is open
  new MutationObserver(()=>document.body.classList.contains('mopen')?lenis.stop():lenis.start()).observe(document.body,{attributes:true,attributeFilter:['class']});

  // top progress bar
  const bar=document.createElement('div');bar.id='sbar';document.body.append(bar);
  gsap.to(bar,{scaleX:1,ease:'none',scrollTrigger:{scrub:.3,start:0,end:'max'}});

  // hero parallax: copy drifts up and fades, routes and ticker-side cards lag behind
  gsap.to('.hero-l',{yPercent:-12,opacity:.25,ease:'none',scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:true}});
  gsap.to('#routes',{y:140,ease:'none',scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:true}});

  // image parallax
  gsap.fromTo('.photo img',{yPercent:-7,scale:1.14},{yPercent:7,ease:'none',scrollTrigger:{trigger:'.photo',start:'top bottom',end:'bottom top',scrub:true}});
  gsap.fromTo('.banner',{backgroundPositionY:'20%'},{backgroundPositionY:'80%',ease:'none',scrollTrigger:{trigger:'.banner',start:'top bottom',end:'bottom top',scrub:true}});

  // number count-up for the big stats ($4.2B+, 12,000+, 3.5 hrs, 100+)
  document.querySelectorAll('.big b').forEach(el=>{
    const m=el.textContent.match(/^([^0-9]*)([0-9][0-9,]*\.?[0-9]*)(.*)$/);if(!m)return;
    const end=parseFloat(m[2].replace(/,/g,'')),dec=(m[2].split('.')[1]||'').length,comma=m[2].includes(','),o={v:0};
    const fmt=v=>m[1]+(comma?Math.round(v).toLocaleString('en-US'):v.toFixed(dec))+m[3];
    el.textContent=fmt(0);
    gsap.to(o,{v:end,duration:1.8,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 90%',once:true},onUpdate:()=>el.textContent=fmt(o.v),onComplete:()=>el.textContent=m[1]+m[2]+m[3]});
  });

  // section eyebrows slide in from the left with a small stagger
  gsap.utils.toArray('section:not(#hero) .eyebrow').forEach(el=>gsap.from(el,{x:-24,opacity:0,duration:.8,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 92%',once:true}}));
})();
