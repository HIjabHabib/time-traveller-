const el = (id)=>document.getElementById(id);
const body = document.body;
const greetingEl = el('greeting');
const subEl = el('sub');
const clockEl = el('clock');
const sunEl = el('sun');
const moonEl = el('moon');
const celestial = el('celestial');
function pad(n){return String(n).padStart(2,'0')}
function timeSegment(hour){if(hour>=5&&hour<8)return'dawn';if(hour>=8&&hour<12)return'morning';if(hour>=12&&hour<17)return'afternoon';if(hour>=17&&hour<20)return'dusk';return'night'}
function greetFor(hour){if(hour>=5&&hour<12)return['Good morning','Sunny vibes ahead!'];if(hour>=12&&hour<17)return['Good afternoon','Keep your energy high.'];if(hour>=17&&hour<20)return['Good evening','The sky is painting itself.'];return['Good night','Time to relax and reflect.']}
function setCelestialPosition(hour,minute){const total=hour+minute/60;const dayStart=4,dayEnd=20;let t;if(total>=dayStart&&total<=dayEnd){t=(total-dayStart)/(dayEnd-dayStart);}else{const nightSpan=(24-dayEnd)+dayStart;let nightPos=total>dayEnd?(total-dayEnd):(total+(24-dayEnd));t=nightPos/nightSpan;}const angle=-70+t*320;const radiusX=Math.min(window.innerWidth,1100)*0.45;const radiusY=160;const cx=document.querySelector('.stage').clientWidth/2;const cy=220;const rad=angle*Math.PI/180;const x=cx+radiusX*Math.cos(rad);const y=cy-radiusY*Math.sin(rad);celestial.style.left=x+'px';celestial.style.top=y+'px';const seg=timeSegment(Math.floor(total));if(seg==='night'){sunEl.style.display='none';moonEl.style.display='block';}else{sunEl.style.display='block';moonEl.style.display='none';}}
function applyTheme(hour){const seg=timeSegment(hour);body.setAttribute('data-time',seg);const [g,s]=greetFor(hour);greetingEl.textContent=g;subEl.textContent=s;}
function updateClock(now){const h=now.getHours();const m=now.getMinutes();const s=now.getSeconds();clockEl.textContent=`${pad(h)}:${pad(m)}:${pad(s)}`;applyTheme(h);setCelestialPosition(h,m);}
function init(simHour=null){let now=new Date();if(simHour!==null){now=new Date();now.setHours(simHour,0,0,0);}updateClock(now);if(simHour===null){window._timeInterval=setInterval(()=>updateClock(new Date()),1000);}}
const demoBtn=el('demoBtn');
const timeSelect=el('timeSelect');
demoBtn.addEventListener('click',()=>{const val=timeSelect.value;if(val==='now'){if(window._timeInterval)clearInterval(window._timeInterval);init(null);}else{if(window._timeInterval)clearInterval(window._timeInterval);init(Number(val));}});
timeSelect.addEventListener('change',()=>demoBtn.click());
window.addEventListener('resize',()=>{const parts=clockEl.textContent.split(':');if(parts.length===3)setCelestialPosition(Number(parts[0]),Number(parts[1]));});
init(null);
function themePaint(){const seg=body.getAttribute('data-time');if(seg==='dawn'||seg==='dusk'){sunEl.style.background='radial-gradient(circle at 30% 30%, #fff7cc 0%, #ffb86b 45%, #ff6b4a 100%)';sunEl.style.boxShadow='0 18px 50px rgba(255,130,60,0.25), inset 0 -8px 30px rgba(255,200,160,0.25)';}else if(seg==='morning'||seg==='afternoon'){sunEl.style.background='radial-gradient(circle at 30% 30%, #fff9e6 0%, #ffd05b 45%, #ff9d2f 100%)';sunEl.style.boxShadow='0 16px 46px rgba(255,150,40,0.22), inset 0 -6px 26px rgba(255,220,150,0.12)';}else{sunEl.style.background='linear-gradient(180deg,#ffd6a5, #ffb86b)';}
moonEl.style.display=body.getAttribute('data-time')==='night'?'block':'none';}
const obs=new MutationObserver(themePaint);obs.observe(body,{attributes:true,attributeFilter:['data-time']});themePaint();
