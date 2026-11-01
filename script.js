window.VGI=[];
const vgBase=()=>{
const b=document.querySelector('.burger'),l=document.querySelector('.links');if(b&&!b._vg){b._vg=1;b.onclick=()=>l.classList.toggle('open')}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
document.querySelectorAll('.tilt').forEach(c=>{c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(700px) rotateY(${x*10}deg) rotateX(${-y*10}deg) translateY(-4px)`});c.addEventListener('mouseleave',()=>c.style.transform='')});
const cv=document.getElementById('embers');if(cv&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const x=cv.getContext('2d');let W,H,P=[];const rs=()=>{if(!cv.isConnected)return removeEventListener('resize',rs);W=cv.width=cv.offsetWidth;H=cv.height=cv.offsetHeight};rs();addEventListener('resize',rs);
for(let i=0;i<90;i++)P.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*2+.5,v:Math.random()*.6+.2,d:Math.random()*.6-.3,a:Math.random()});
(function f(){if(!cv.isConnected)return;x.clearRect(0,0,W,H);P.forEach(p=>{p.y-=p.v;p.x+=p.d;p.a+=.02;if(p.y<-5){p.y=H+5;p.x=Math.random()*W}x.beginPath();x.arc(p.x,p.y,p.r,0,7);x.fillStyle=`rgba(243,${180+Math.random()*30|0},90,${.4+.4*Math.sin(p.a)})`;x.shadowBlur=8;x.shadowColor='#f3d27a';x.fill()});requestAnimationFrame(f)})()}
};VGI.push(vgBase);
let vgShow=null;addEventListener('hashchange',()=>vgShow&&vgShow());
VGI.push(()=>{vgShow=null;const t=[...document.querySelectorAll('.tabs a')];if(!t.length)return;
const show=()=>{const h=location.hash.slice(1),id=t.some(a=>a.hash==='#'+h)?h:t[0].hash.slice(1);t.forEach(a=>a.classList.toggle('on',a.hash==='#'+id));document.querySelectorAll('.panel').forEach(p=>p.classList.toggle('on',p.id===id))};
t.forEach(a=>a.onclick=e=>{e.preventDefault();history.replaceState(history.state,'',a.hash);show()});vgShow=show;show()});
/* Raid times in visitor's local zone. Raids: 7-10 PM America/Los_Angeles. */
VGI.push(()=>{
const els=document.querySelectorAll('.raidtime');if(!els.length||!window.Intl)return;
const TZ='America/Los_Angeles',DAYS={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};
const local=Intl.DateTimeFormat().resolvedOptions().timeZone;
function offsetMin(tz,d){const p={};new Intl.DateTimeFormat('en-US',{timeZone:tz,hourCycle:'h23',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit'}).formatToParts(d).forEach(x=>p[x.type]=x.value);
 return (Date.UTC(+p.year,p.month-1,+p.day,+p.hour,+p.minute,+p.second)-d.getTime())/60000}
function laInstant(dow,hour){// next occurrence of dow at hour LA time
 const now=new Date();for(let i=0;i<8;i++){const g=new Date(Date.UTC(now.getUTCFullYear(),now.getUTCMonth(),now.getUTCDate()+i,12));
  const wd=new Intl.DateTimeFormat('en-US',{timeZone:TZ,weekday:'short'}).format(g);if(DAYS[wd]!==dow)continue;
  const p={};new Intl.DateTimeFormat('en-US',{timeZone:TZ,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(g).forEach(x=>p[x.type]=x.value);
  let t=Date.UTC(+p.year,p.month-1,+p.day,hour);t-=offsetMin(TZ,new Date(t))*60000;t=Date.UTC(+p.year,p.month-1,+p.day,hour)-offsetMin(TZ,new Date(t))*60000;return new Date(t)}}
const f=(d,o)=>new Intl.DateTimeFormat('en-US',Object.assign({timeZone:local},o)).format(d);
const hm=d=>{const s=f(d,{hour:'numeric',minute:'2-digit'});return s.replace(':00','')};
const zone=d=>{const p=new Intl.DateTimeFormat('en-US',{timeZone:local,timeZoneName:'short'}).formatToParts(d).find(x=>x.type==='timeZoneName');return p?p.value:local};
els.forEach(el=>{const days=el.dataset.days.split(',');let txt=[],range='',tz='';
 days.forEach(dn=>{const s=laInstant(DAYS[dn],19),e=new Date(s.getTime()+3*3600e3);txt.push(f(s,{weekday:'short'}));
  const a=hm(s),b=hm(e),ap=a.slice(-2)===b.slice(-2)?a.slice(0,-3):a;range=(ap+'–'+b).replace(/ /g,' ');
  range=range;const late=f(new Date(e-1),{weekday:'short'})!==f(s,{weekday:'short'});if(late&&range.indexOf('next day')<0)range+=' (ends next day)';tz=zone(s)});
 const sp=document.createElement('span');sp.className='localtime';sp.textContent='Your time: '+txt.join(' & ')+' '+range+' '+tz;el.parentNode.appendChild(sp)})});
document.addEventListener('DOMContentLoaded',()=>VGI.forEach(f=>{try{f()}catch(e){console.error(e)}}));
/* Vanguard audio: intro sfx (index), background music + UI sounds (all pages). Plain <audio> elements: works on file:// and hosted. Default muted. */
document.addEventListener('DOMContentLoaded',()=>{
const R=document.documentElement,KEY='vgSound',MT='vgMusicT';let on=false;try{on=localStorage.getItem(KEY)==='on'}catch(e){}
let btn=document.querySelector('.sound-toggle');
if(!btn){btn=document.createElement('button');btn.className='sound-toggle';btn.setAttribute('aria-label','Toggle sound');document.body.appendChild(btn)}
const mk=(f,fb)=>{const a=document.createElement('audio');a.preload='auto';a.src=f;a.dataset.fbk=fb||'';a.style.display='none';
 a.addEventListener('error',()=>{const d=window[a.dataset.fbk];if(!a.dataset.fb&&d){a.dataset.fb=1;a.src=d}});document.body.appendChild(a);return a};
const pool=[mk('sword-hit.wav','VG_SWORD_FALLBACK'),mk('sword-hit.wav','VG_SWORD_FALLBACK'),mk('shield-slam.wav','VG_SLAM_FALLBACK')];
const hov=[0,1,2].map(()=>mk('ui-hover.wav','VG_HOVER_FALLBACK')),clk=[0,1].map(()=>mk('ui-click.wav','VG_CLICK_FALLBACK'));
const mus=mk('music.mp3');mus.loop=true;mus.volume=0;mus.addEventListener('loadedmetadata',()=>{try{const t=+sessionStorage.getItem(MT);if(t&&t<mus.duration)mus.currentTime=t}catch(e){}},{once:true});const MV=.25;
const all=[...pool,...hov,...clk];let unlocked=false;
const fire=(a,v)=>{if(!on||!a)return;a._prime=false;try{a.pause();a.currentTime=0}catch(e){}a.muted=false;a.volume=v;
 const pr=a.play();if(pr&&pr.catch)pr.catch(err=>{const fb=window[a.dataset.fbk];if(!a.dataset.fb&&fb){a.dataset.fb=1;a.src=fb;a.play().catch(()=>{})}})};
const play=(v,i)=>fire(pool[i||0],v);
let hk=0,ck=0;
/* music */
let fadeT=null;const fade=(to,ms,done)=>{clearInterval(fadeT);const from=mus.volume,st=performance.now();fadeT=setInterval(()=>{const p=Math.min(1,(performance.now()-st)/ms);mus.volume=Math.max(0,Math.min(1,from+(to-from)*p));if(p>=1){clearInterval(fadeT);done&&done()}},40)};
const musicStart=()=>{if(!on||!unlocked)return;mus._prime=false;mus.muted=false;if(mus.paused){const pr=mus.play();if(pr&&pr.catch)pr.catch(()=>{})}fade(MV,2000)};
const musicStop=()=>fade(0,500,()=>mus.pause());
const save=()=>{try{if(!mus.paused)sessionStorage.setItem(MT,mus.currentTime)}catch(e){}};setInterval(save,1000);addEventListener('pagehide',save);
const introBusy=()=>R.classList.contains('intro');
/* unlock on first gesture: prime all sfx silently */
const unlock=()=>{if(unlocked)return;unlocked=true;[...all,mus].forEach(a=>{a._prime=true;a.muted=true;try{const pr=a.play();if(pr&&pr.then)pr.then(()=>{if(a._prime){a.pause();a.currentTime=0}a.muted=false;a._prime=false}).catch(()=>{a.muted=false});else a.muted=false}catch(e){a.muted=false}});
 document.removeEventListener('pointerdown',g,true);document.removeEventListener('keydown',g,true)};
const g=()=>{unlock();if(!introBusy())musicStart()};
document.addEventListener('pointerdown',g,true);document.addEventListener('keydown',g,true);
/* toggle */
const ui=()=>{btn.textContent=on?'🔊':'🔇';btn.title=on?'Sound on':'Sound off';btn.setAttribute('aria-pressed',on)};ui();
btn.addEventListener('click',()=>{unlock();on=!on;try{localStorage.setItem(KEY,on?'on':'off')}catch(e){}ui();if(on){play(.255,0);if(!introBusy())musicStart()}else{all.forEach(a=>{try{a.pause()}catch(e){}});musicStop()}});
/* UI sounds */
const SEL='nav a,.links a,.tiles .card,a.card,button,.btn,.tabs a,.burger';
const canHover=matchMedia('(hover: hover) and (pointer: fine)').matches;let lastH=0,lastEl=null;
if(canHover)document.addEventListener('mouseover',e=>{const el=e.target.closest&&e.target.closest(SEL);if(!el||el===btn||el.closest('.vg-splash'))return;
 if(e.relatedTarget&&el.contains(e.relatedTarget))return;const n=performance.now();if(el===lastEl&&n-lastH<600)return;if(n-lastH<90)return;lastH=n;lastEl=el;if(unlocked)fire(hov[hk++%hov.length],.3)});
document.addEventListener('mouseleave',()=>{lastEl=null});
document.addEventListener('click',e=>{const el=e.target.closest&&e.target.closest(SEL);if(!el||el===btn||el.closest('.vg-splash'))return;if(unlocked)fire(clk[ck++%clk.length],.5)});
/* intro (index) */
const run=()=>{try{sessionStorage.setItem('vgIntro','1')}catch(e){}
 [[390,.255,0],[1190,.28,1],[2200,.28,2]].forEach(([t,v,i])=>setTimeout(()=>play(v,i),t));
 setTimeout(musicStart,2500);setTimeout(()=>R.classList.remove('intro'),3500)};
const sp=document.querySelector('.vg-splash');
if(R.classList.contains('intro')){
 if(!sp||!R.classList.contains('intro-wait')){R.classList.remove('intro-wait');run()}
 else{const spk=sp.querySelector('.vg-spk'),ht=sp.querySelector('.vg-hint-txt'),eb=sp.querySelector('.vg-enter');
  const hb=sp.querySelector('.vg-hint');const sui=()=>{spk.textContent=on?'🔊':'🔇';ht.textContent=on?'Sound on':'Sound off';hb.setAttribute('aria-pressed',on)};sui();btn.addEventListener('click',e=>{e.stopPropagation();sui()});
  hb.addEventListener('click',e=>{e.stopPropagation();e.preventDefault();btn.click()});
  let done=false;const go=()=>{if(done)return;done=true;unlock();
   document.removeEventListener('keydown',kd);sp.classList.add('out');R.classList.remove('intro-wait');run();setTimeout(()=>sp.remove(),700)};
  const kd=e=>{if(e.key==='Enter'||e.key===' '||e.code==='Space'){if(e.target===btn||e.target===hb)return;e.preventDefault();go()}};
  eb.addEventListener('click',go);sp.addEventListener('click',e=>{if(e.target===sp)go()});document.addEventListener('keydown',kd);setTimeout(()=>eb.focus(),50)}}});

/* Client-side navigation (PJAX): keeps the single <audio> + mute button alive so music never restarts. Falls back to normal navigation on file:// or any error. */
(function(){if(location.protocol==='file:'||!window.fetch||!history.pushState)return;
const pageOf=u=>u.origin+u.pathname.replace(/\/index\.html$/,'/');
let busy=0,cur=pageOf(location);history.replaceState({vg:1},'',location.href);
async function go(url,push){const my=++busy;let html;
 try{const r=await fetch(url.href,{credentials:'same-origin'});if(!r.ok||!/html/.test(r.headers.get('content-type')||''))throw 0;html=await r.text()}catch(e){location.href=url.href;return}
 if(my!==busy)return;cur=pageOf(url);
 const d=new DOMParser().parseFromString(html,'text/html'),nm=d.querySelector('main'),om=document.querySelector('main');
 if(!nm||!om){location.href=url.href;return}
 om.replaceWith(document.importNode(nm,true));document.title=d.title;
 const nl=d.querySelector('nav .links'),ol=document.querySelector('nav .links');if(nl&&ol){ol.innerHTML=nl.innerHTML;ol.classList.remove('open')}
 const nf=d.querySelector('footer'),of=document.querySelector('footer');if(nf&&of)of.innerHTML=nf.innerHTML;
 document.body.className=d.body.className;
 if(push)history.pushState({vg:1},'',url.href);cur=pageOf(url);
 VGI.forEach(f=>{try{f()}catch(e){console.error(e)}});
 const h=url.hash&&document.getElementById(decodeURIComponent(url.hash.slice(1)));if(h)h.scrollIntoView();else scrollTo(0,0)}
document.addEventListener('click',e=>{if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
 const a=e.target.closest&&e.target.closest('a[href]');if(!a||a.target&&a.target!=='_self'||a.hasAttribute('download'))return;
 const raw=a.getAttribute('href');if(!raw||raw[0]==='#')return;
 const u=new URL(a.href,location.href);if(u.origin!==location.origin||!/(\/|\.html)$/.test(u.pathname))return;
 if(pageOf(u)===pageOf(location)&&u.hash)return; /* same-page anchor: let browser handle */
 e.preventDefault();go(u,true)});
addEventListener('popstate',()=>{const u=new URL(location.href);if(pageOf(u)!==cur)go(u,false)});
})();
