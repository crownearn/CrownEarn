const SB_URL='https://moumogjmoawzxgdpilyl.supabase.co',SB_KEY='sb_publishable_qkWWMMgwtQV9SqvY3FcBKw_MsaNjdTt';
window.addEventListener('error',e=>{const a=document.getElementById('app');if(a&&a.textContent.trim()==='Loading…')a.innerHTML='<div class="card">Something went wrong.<div class="mute">'+String(e.message).replace(/</g,'&lt;')+'</div></div>'});
if(typeof supabase==='undefined'){document.getElementById('app').innerHTML='<div class="card"><b>Could not load the app library.</b><div class="mute">Your network blocked a script file. Try Wi-Fi or mobile data, then reload the page.</div></div>';throw new Error('library missing')}
const sb=supabase.createClient(SB_URL,SB_KEY);
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const REF=(new URLSearchParams(location.search).get('ref')||(()=>{try{return localStorage.getItem('ref')}catch(e){return ''}})()||'').slice(0,12);
try{if(REF)localStorage.setItem('ref',REF)}catch(e){}
let U=null,P=null,D={cfg:{},refs:[]},tab='home',M='JazzCash',T='App install',mode=REF?'signup':'login',shown=0;
const rate=()=>+(D.cfg.pkr_per_point??0.01),rs=p=>Math.round(p*rate()),MINW=()=>D.cfg.min_withdraw_points||1000;
const ICON={'App install':'📲','Sign up':'📝','Survey':'📋','Other':'⭐'};
const KIND={daily_bonus:'Daily bonus',task_reward:'Task reward',deposit:'Deposit',withdraw_request:'Withdrawal',withdraw_refund:'Withdrawal refund',task_created:'Task created',task_refund:'Task refund',referral:'Friend commission',referral_bonus:'Friend bonus'};
const mascot=s=>`<svg width="${s}" height="${s}" viewBox="0 0 100 100" class="mas" aria-hidden="true"><circle cx="50" cy="50" r="44" fill="#ffc83d" stroke="#d99a00" stroke-width="6"/><circle cx="50" cy="50" r="33" fill="#ffd96b"/><circle cx="38" cy="45" r="5" fill="#4a3200"/><circle cx="62" cy="45" r="5" fill="#4a3200"/><circle cx="39.5" cy="43.5" r="1.8" fill="#fff"/><circle cx="63.5" cy="43.5" r="1.8" fill="#fff"/><ellipse cx="29" cy="58" rx="6" ry="4" fill="#ff8f8f" opacity=".6"/><ellipse cx="71" cy="58" rx="6" ry="4" fill="#ff8f8f" opacity=".6"/><path d="M40 58Q50 70 60 58" stroke="#4a3200" stroke-width="4" fill="none" stroke-linecap="round"/></svg>`;
function toast(m){const d=document.createElement('div');d.className='toast';d.textContent=m;document.body.appendChild(d);setTimeout(()=>d.remove(),3200)}
function boom(){if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;const c=document.createElement('div');c.className='cf';for(let i=0;i<44;i++){const s=document.createElement('i');s.style.cssText=`left:${Math.random()*100}%;background:${['#ffc83d','#6a4cf5','#16b980','#ff6b8b','#4dabf7'][i%5]};animation-delay:${Math.random()*.4}s;transform:rotate(${Math.random()*360}deg)`;c.appendChild(s)}document.body.appendChild(c);setTimeout(()=>c.remove(),2400)}
function countTo(el,to){const from=shown;let t0=null;shown=to;if(from===to||matchMedia('(prefers-reduced-motion:reduce)').matches){el.textContent=to;return}
const f=t=>{if(!t0)t0=t;const k=Math.min(1,(t-t0)/800);el.textContent=Math.round(from+(to-from)*k);if(k<1)requestAnimationFrame(f)};requestAnimationFrame(f)}
function win(a,b){$('sheet').innerHTML=`<div class="ov mid" onclick="closeW()"><div class="win">${mascot(110)}<div class="hd">${a}</div><div class="mute">${b}</div><button class="g w" style="margin-top:14px">Awesome!</button></div></div>`;boom()}
const closeW=()=>$('sheet').innerHTML='';
const go=t=>{tab=t;draw();scrollTo(0,0)};
function pick(b,fn){b.parentNode.querySelectorAll('button').forEach(x=>x.className='');b.className='on';fn()}
function sheet(t,sub,inner,btn,call){$('sheet').innerHTML=`<div class="ov" onclick="if(event.target===this)closeW()"><div class="sh"><div class="hd">${t}</div><div class="mute">${sub}</div>${inner}<button class="g w" style="margin-top:14px" onclick="${call}">${btn}</button></div></div>`}
const MS=`<div class="ms"><button class="on" onclick="pick(this,()=>M='JazzCash')">JazzCash</button><button onclick="pick(this,()=>M='Easypaisa')">Easypaisa</button></div>`;
async function rpc(n,a){const{error}=await sb.rpc(n,a);if(error){toast(error.message);return false}await load();return true}
async function load(){
 const q=(t,f)=>f(sb.from(t).select('*'));
 const[a,b,c,d,e,f,g,h]=await Promise.all([
  sb.from('profiles').select('*').eq('id',U.id).single(),sb.from('settings').select('*'),
  sb.from('tasks').select('*').order('id',{ascending:false}),sb.from('submissions').select('*').order('id',{ascending:false}),
  sb.from('deposits').select('*').eq('user_id',U.id).order('id',{ascending:false}),
  sb.from('withdrawals').select('*').eq('user_id',U.id).order('id',{ascending:false}),
  sb.from('ledger').select('*').eq('user_id',U.id).order('id',{ascending:false}).limit(30),sb.rpc('get_referrals')]);
 if(a.error||!a.data){$('app').innerHTML=`<div class="card">Could not load your account.<div class="mute">${esc(a.error?.message||'Profile not found')}</div><button class="o w" style="margin-top:10px" onclick="logout()">Log out</button></div>`;return}
 P=a.data;D.cfg=Object.fromEntries((b.data||[]).map(x=>[x.key,+x.value]));D.tasks=c.data||[];D.subs=d.data||[];D.deps=e.data||[];D.wds=f.data||[];D.led=g.data||[];D.refs=h.data||[];draw()}
async function logout(){await sb.auth.signOut();location.reload()}
/* ---------- auth ---------- */
function auth(){$('nav').innerHTML='';$('app').innerHTML=`<div class="card" style="text-align:center;margin-top:30px">${mascot(96)}<div class="hd" style="font-size:30px">CrownEarn</div><div class="mute">Complete tasks. Earn rewards. Withdraw to PKR.</div><div style="text-align:left">${mode==='signup'?`<label>Your name</label><input id="nm" placeholder="Name"><label>Referral code (optional)</label><input id="rf" value="${esc(REF)}" placeholder="Optional">`:''}<label>Email</label><input id="em" type="email" placeholder="you@email.com" autocomplete="email"><label>Password</label><input id="pw" type="password" placeholder="6+ characters" autocomplete="${mode==='signup'?'new-password':'current-password'}"></div><button class="g w" style="margin-top:16px" onclick="doAuth()">${mode==='signup'?'Create account':'Log in'}</button><p class="mute" style="margin-top:12px">${mode==='signup'?'Already have an account?':'New here?'} <a href="#" onclick="mode='${mode==='signup'?'login':'signup'}';auth();return false" style="color:var(--pri);font-weight:700">${mode==='signup'?'Log in':'Create account'}</a></p></div>`}
async function doAuth(){const em=$('em').value.trim(),pw=$('pw').value;
 if(!em||pw.length<6){toast('Enter your email and a password of 6+ characters');return}
 if(mode==='signup'){const{data,error}=await sb.auth.signUp({email:em,password:pw,options:{data:{name:($('nm').value.trim()||'Friend').slice(0,40),ref:($('rf').value||'').trim()}}});
  if(error){toast(error.message);return}
  if(!data.session){toast('Check your email to confirm, then log in');mode='login';auth();return}U=data.user}
 else{const{data,error}=await sb.auth.signInWithPassword({email:em,password:pw});if(error){toast(error.message);return}U=data.user}
 await load()}
/* ---------- tasks ---------- */
const avail=()=>D.tasks.filter(t=>t.status==='live'&&t.owner!==U.id&&t.done_count<t.slots);
function taskCard(t,k){const s=D.subs.find(x=>x.task_id===t.id&&x.user_id===U.id);
 const b=!s?`<button onclick="openS(${t.id})">Submit proof</button>`:s.status==='pending'?'<span class="tag">Under review</span>':s.status==='approved'?'<span class="tag">Done ✔</span>':'<span class="tag" style="background:#ffe0e6;color:#c0392b">Rejected</span>';
 return `<div class="card"><div class="gr"><span class="ic c${k%4}">${ICON[t.kind]||'⭐'}</span><div>${esc(t.title)}</div></div><div class="row" style="margin-top:10px"><span class="rw">+${t.reward_points} pts · PKR ${rs(t.reward_points)}</span><span class="gr" style="gap:8px">${t.link?`<a class="bt" href="${esc(t.link)}" target="_blank" rel="noopener noreferrer">Open</a>`:''}${b}</span></div></div>`}
const openS=id=>sheet('Submit proof','Do the task first, then paste a screenshot link or your username on that site.','<label>Proof</label><input id="pf" placeholder="Link or username">','Send proof',`sendS(${id})`);
async function sendS(id){const v=$('pf').value.trim();if(v.length<3){toast('Enter your proof');return}
 if(await rpc('submit_task',{p_task:id,p_proof:v})){closeW();toast('Proof sent. Points arrive after review.')}}
/* ---------- views ---------- */
function homeView(){const today=new Date().toISOString().slice(0,10),yest=new Date(Date.now()-864e5).toISOString().slice(0,10);
 const cl=P.last_claim===today,alive=cl||P.last_claim===yest,n=cl?P.streak:(alive?P.streak+1:1),filled=cl?((n-1)%7+1):((n-1)%7),bonus=n%7===0?200:(D.cfg.daily_bonus||50);
 const left=Math.max(0,MINW()-P.points),pct=Math.min(100,P.points/MINW()*100),av=avail();
 const days=[...Array(7)].map((_,i)=>`<b class="${i<filled?'d':(i===filled&&!cl?'t':'')}">${i<filled?'✔':(i===6?'🎁':i+1)}</b>`).join('');
 return `<div class="top"><div><div class="hd">Hello, ${esc(P.name)} 👋</div><div class="mute">How much will you earn today?</div></div><span class="chip">🪙 ${P.points}</span></div>
<div class="hero"><div class="hr"><div><small>Your earnings</small><div class="big"><span style="font-size:20px">PKR </span><span id="cnt">0</span></div></div>${mascot(92)}</div><div class="pb"><i style="width:${pct}%"></i></div><div class="bub">${left>0?`Coiny says: Great job! Only ${left} points left to withdraw 💪`:'Coiny says: Wow! You can withdraw now 🎉'}</div></div>
<div class="card"><div class="row"><b>Daily bonus 🎁</b><span class="tag">${alive?P.streak:0}-day streak 🔥</span></div><div class="days">${days}</div><button class="${cl?'o':'g'} w" ${cl?'disabled':''} onclick="claim()">${cl?'Come back tomorrow':'Claim daily bonus +'+bonus}</button></div>
<div class="qa"><button onclick="openD()"><span>➕</span>Deposit</button><button class="g" onclick="go('create')"><span>📣</span>Add task</button><button class="o" onclick="go('wallet')"><span>💸</span>Withdraw</button></div>
<div class="sec">Tasks for you</div>${av.slice(0,2).map(taskCard).join('')||'<div class="card mute">No tasks right now. Check back soon!</div>'}${av.length?'<button class="o w" style="margin-top:12px" onclick="go(\'tasks\')">See all tasks</button>':''}`}
