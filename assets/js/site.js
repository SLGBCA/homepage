(function(){
 const toggle=document.querySelector('[data-menu-toggle]'), nav=document.querySelector('[data-mobile-nav]');
 if(toggle&&nav) toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',open?'true':'false');});
const festivalCards=[...document.querySelectorAll('[data-festival-card]')];
 if(festivalCards.length){
  const now=Date.now();
  const festivals=festivalCards.map(card=>({card,name:card.dataset.festivalName,start:new Date(card.dataset.start).getTime(),end:new Date(card.dataset.end).getTime()})).filter(item=>!Number.isNaN(item.start)&&!Number.isNaN(item.end));
  const active=festivals.find(item=>now>=item.start&&now<=item.end);
  const next=festivals.filter(item=>item.start>now).sort((a,b)=>a.start-b.start)[0];
  const status=document.getElementById('festival-status');
  if(active){active.card.classList.add('is-current');if(status)status.textContent='Now celebrating: '+active.name;}
  else if(next){if(status)status.textContent='Next festival: '+next.name+' · '+new Date(next.start).toLocaleDateString(undefined,{day:'numeric',month:'long',year:'numeric'});}
  else if(status){status.textContent='Festival dates will be announced soon.';}
  const countdown=document.getElementById('festival-countdown');
  const nextPuja=()=>{const nowMs=Date.now();return festivals.filter(item=>item.start>nowMs).sort((a,b)=>a.start-b.start)[0];};
  const renderCountdown=()=>{const upcoming=nextPuja();if(!countdown){return;}if(!upcoming){countdown.hidden=true;return;}countdown.hidden=false;countdown.setAttribute('aria-label','Countdown to '+upcoming.name);const remaining=Math.max(0,upcoming.start-Date.now());const days=Math.floor(remaining/86400000);const hours=Math.floor((remaining%86400000)/3600000);const minutes=Math.floor((remaining%3600000)/60000);const seconds=Math.floor((remaining%60000)/1000);const label=countdown.querySelector('[data-countdown-label]');if(label)label.textContent=upcoming.name+' begins in';const values={days,hours,mins:minutes,secs:seconds};Object.entries(values).forEach(([key,value])=>{const node=countdown.querySelector('[data-cd="'+key+'"]');if(node)node.textContent=key==='days'?String(value):String(value).padStart(2,'0');});};
  renderCountdown();
  window.setInterval(renderCountdown,1000);
 }
 const gallery=document.querySelector('[data-gallery-slideshow]');
 if(gallery){
  const slides=[...gallery.querySelectorAll('[data-gallery-slide]')];
  const dots=[...gallery.querySelectorAll('[data-gallery-dot]')];
  let current=0;
  const show=(index)=>{current=(index+slides.length)%slides.length;slides.forEach((slide,i)=>slide.classList.toggle('hidden',i!==current));dots.forEach((dot,i)=>{dot.classList.toggle('active',i===current);dot.setAttribute('aria-selected',i===current?'true':'false');});};
  gallery.querySelector('[data-gallery-prev]')?.addEventListener('click',()=>show(current-1));
  gallery.querySelector('[data-gallery-next]')?.addEventListener('click',()=>show(current+1));
  dots.forEach((dot,i)=>dot.addEventListener('click',()=>show(i)));
 }
})();
