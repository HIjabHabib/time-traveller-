// Time Traveler Layout JS
const root = document.documentElement;
const site = document.querySelector('.site');
const greetingEl = document.getElementById('greeting');
const timeEl = document.getElementById('time');
const descEl = document.getElementById('desc');
const ampmEl = document.getElementById('ampm');
const slider = document.getElementById('timeSlider');
const autoToggleBtn = document.getElementById('autoToggle');
const randomBtn = document.getElementById('randomize');

let auto = true;
let timer = null;

function pad(v){ return v.toString().padStart(2,'0'); }

function mapHourToTheme(hour){
  // 5–8 sunrise, 9–16 day, 17–19 sunset, 20–4 night
  if (hour >= 5 && hour <= 8) return 'sunrise';
  if (hour >= 9 && hour <= 16) return 'day';
  if (hour >= 17 && hour <= 19) return 'sunset';
  return 'night';
}

function describeTheme(theme, hour){
  switch(theme){
    case 'sunrise':
      return { greeting: 'Good morning', desc: 'A fresh sunrise lights the horizon.'};
    case 'day':
      return { greeting: 'Good day', desc: 'Bright day — be productive!'};
    case 'sunset':
      return { greeting: 'Good evening', desc: 'Warm tones and slow down.'};
    case 'night':
      return { greeting: 'Good night', desc: 'Stars and quiet hours.'};
    default:
      return { greeting:'Hello', desc:'' };
  }
}

function applyTheme(theme){
  // set class on body (.theme-*)
  document.body.classList.remove('theme-sunrise','theme-day','theme-sunset','theme-night');
  document.body.classList.add('theme-'+theme);

  // set CSS variables from computed styles of body for smooth transitions
  // (we used vars in CSS classes; just update greeting/desc text)
  const meta = describeTheme(theme);
  greetingEl.textContent = meta.greeting;
  descEl.textContent = meta.desc;
}

function updateTimeView(hour, minute, second){
  timeEl.textContent = `${pad(hour)}:${pad(minute)}:${pad(second)}`;
  ampmEl.textContent = hour < 12 ? 'AM' : 'PM';
}

// Main update using hour (0-23). If minute/second omitted, uses current time
function updateByHour(hour, minute = 0, second = 0){
  // set slider without firing input event
  slider.value = hour;

  const theme = mapHourToTheme(hour);
  applyTheme(theme);
  updateTimeView(hour, minute, second);

  // small decorative tweak: change title/subtitle accent color
  // (we rely on CSS var changes via the theme classes)
}

// Auto clock — uses real current time unless slider used
function startAuto(){
  if (timer) clearInterval(timer);
  timer = setInterval(()=>{
    if (!auto) return;
    const now = new Date();
    updateByHour(now.getHours(), now.getMinutes(), now.getSeconds());
  }, 1000);
  startAutoImmediate();
}
function startAutoImmediate(){
  const now = new Date();
  updateByHour(now.getHours(), now.getMinutes(), now.getSeconds());
}

// slider to simulate specific hour
slider.addEventListener('input', (e)=>{
  auto = false;
  const hr = parseInt(e.target.value, 10);
  updateByHour(hr, 0, 0);
});

// auto toggle
autoToggleBtn.addEventListener('click', ()=>{
  auto = !auto;
  autoToggleBtn.textContent = auto ? 'Pause Auto' : 'Resume Auto';
  if (auto) startAutoImmediate();
});

// randomize (random hour)
randomBtn.addEventListener('click', ()=>{
  const hr = Math.floor(Math.random()*24);
  auto = false;
  slider.value = hr;
  updateByHour(hr,0,0);
});

// initialize
(function init(){
  startAuto();
})();


