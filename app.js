/* ===== app1 ===== */
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
const mascot=s=>`<svg width="${s}" height="${s}" viewBox="0 0 100 100" class="mas" aria-hidden="true"><path d="M14 72L8 30l24 20 18-30 18 30 24-20-6 42z" fill="#f3c969" stroke="#c9962a" stroke-width="4" stroke-linejoin="round"/><rect x="14" y="76" width="72" height="12" rx="5" fill="#e3a93a" stroke="#c9962a" stroke-width="4"/><circle cx="8" cy="30" r="6" fill="#9be0ff"/><circle cx="50" cy="20" r="7" fill="#5b8dff"/><circle cx="92" cy="30" r="6" fill="#9be0ff"/><circle cx="50" cy="58" r="7" fill="#8a5cff"/><circle cx="30" cy="62" r="4" fill="#5b8dff"/><circle cx="70" cy="62" r="4" fill="#5b8dff"/></svg>`;
function toast(m){const d=document.createElement('div');d.className='toast';d.textContent=m;document.body.appendChild(d);setTimeout(()=>d.remove(),3200)}
function boom(){if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;const c=document.createElement('div');c.className='cf';for(let i=0;i<44;i++){const s=document.createElement('i');s.style.cssText=`left:${Math.random()*100}%;background:${['#ffc83d','#6a4cf5','#16b980','#ff6b8b','#4dabf7'][i%5]};animation-delay:${Math.random()*.4}s;transform:rotate(${Math.random()*360}deg)`;c.appendChild(s)}document.body.appendChild(c);setTimeout(()=>c.remove(),2400)}
function countTo(el,to){const from=shown;let t0=null;shown=to;if(from===to||matchMedia('(prefers-reduced-motion:reduce)').matches){el.textContent=to;return}
const f=t=>{if(!t0)t0=t;const k=Math.min(1,(t-t0)/800);el.textContent=Math.round(from+(to-from)*k);if(k<1)requestAnimationFrame(f)};requestAnimationFrame(f)}
function win(a,b){$('sheet').innerHTML=`<div class="ov mid" onclick="closeW()"><div class="win">${mascot(110)}<div class="hd">${a}</div><div class="mute">${b}</div><button class="g w" style="margin-top:14px">Awesome!</button></div></div>`;boom()}
const closeW=()=>$('sheet').innerHTML='';
const go=t=>{tab=t;draw();scrollTo(0,0)};
function pick(b,fn){b.parentNode.querySelectorAll('button').forEach(x=>x.className='');b.className='on';fn()}
function sheet(t,sub,inner,btn,call){$('sheet').innerHTML=`<div class="ov" onclick="if(event.target===this)closeW()"><div class="sh"><div class="hd">${t}</div><div class="mute">${sub}</div>${inner}<button class="g w" style="margin-top:14px" onclick="${call}">${btn}</button></div></div>`}
const PL={JazzCash:`<img class="pl" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAABwCAMAAADxPgR5AAAAYFBMVEX///////7//v7//v3//f3//vv//Pv/9uT+3ab/0Tn/zgn/xw3/xwz/xgv/xgr/xgf/xAz/wwD8uVH2f2PyUkPwNjTuJyvuJinuJSjuJCjuIyfuIybuICXtGiLtFyDtExhQ9QDAAAAEEklEQVR42u2ZbZOyIBSG0UQwU2NFXkzh///LB2zbyoRcpf3wDPeHHWe26eq8cfAcAKKioqKioqKioqK26gATeHD+N83yu7I0AC+5/oVLsDyfE7I8281DXwVGC8jrVyOEcXsVxghNP2OXPxNUEkKaAtvnR5yF4ZZ2F6VvUkNHW2TdvB0IQUHKsqwJscgfI7MMpLhlltELzhg3Mn/6QemBmg/m6XaPFuRU13Vp7CwQSBLw7TRMzXdzLmT/KCmYVHpC7gQa5ImUVyONwxBVivNn2E2Cq9E4Nt8LNMjGGglzkLcXxUXvFJe6wyDdDayrkpTIelP3vPeKDardljpPQGMkqXE7Kib9PN6bQG5LnBmwrhpCxzfmCakvLc5BEGBdnY50FF53TjkDwP6kuclLlGKqimxrJVpgOQPWp85JFCZbcrDjQF0Cno9nPiynDR/6HUXvtNAQl4F8ZHjHseYEGuJiGMXA0C7znECDXHCqvAx4L88FXDRR6P08p4X1uZubyHS7n+d26YuJYqQh7jROC1+iKFQAh/pcOjORB3Gouce4gc+1KAeUZp8EztLGGhiC5wE++9REMM0/DTzfgTZFQ9y6vS41QQxcg2+Aj4URqCbeAOufrJH21P64S+tjN4hbCLv888Dz8afxC0UD8fzAn7rgKlAVrrXwb4APMeTGpX8AvGepjWEgQV8dsntZBMtS6DtpHtrTgAL5FPrO0kHcm0Wgs3tttwjWnUzLf323eEnSKYhhzrYEoLKpHCHk/WMDDnN6wwSvaYdTYQS5Yfhy5vkVKkyDOiSoql0enV27Fc3yjxo4vwizAFGEADtT9Cllbk14ZxihO0WXXmbsCb7rJmV4nlNm4fVw500KgnxN7w32vuaxb16D9zD2pjaybQOog4mfh+cYKsiLaf0bAmmHv7hunI336BybSKkp+i3yYHDGnbWjIOrKOxhiSra/QtoRLMLGnZUDV70ZffGL7nAO1nYra91XSWqXO6v6SBXzzvYkGzVdO9sz7ahoSOMyz85oMer0m/Gl5KOxcsWxkyQJbkjlxNkBLbbz57cDWtFpuqIkD+DL4Fy5+T1nh+Z72kExbxyF7lYdrMiZK6eHTUKaWiNH19RbsF7biemKGCbmMKvKF2Y17S2qAsPvNQKY1ghaSTbbItg1ghi1bPG6LLVrn4qYnCnLU3WVeawaQuppG/SwKElBjumg1YUzLoSUUgjOmRiUHqflzMoR0VSDhd39kGaSfSLllZbAl1VQS5nSWo3jMIzKPjHaTjWY/eIMtUxcFEVpVRRfGOXX69TLai29rp9aSjsjStt2+mG/nAff7IDIKE9uG8TFz94uMandHd4eN8zbEgjh43Pi+axdV6Yvj5sa1FXrPpwagaioqKioqKioqP9D/wD0id5UP+RGMgAAAABJRU5ErkJggg==" width="26" height="26" alt="" decoding="async">`,Easypaisa:`<img class="pl" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAABwCAMAAADxPgR5AAAAYFBMVEX////+//7+/v79/f38/v38/Pzs7+7L3dN4zZwLwlcJw1cIwlcIwlUJwlMGw1Yov2gLwFcKwVcIwVUGv1NMr3YAsUddg20rKysFBQUDAwMBAgIBAQEAAQABAAAAAAIAAAC3BvZ3AAAGnklEQVR42u1Z53qDOBAE0RFgUURTLn7/t7zZFe64CDv34z5vki8OMR7N7myR8Lyvfe1rX/va1762wUQQHS0Q/wHY1ZUo+jNQsYDFSZL2sDRNkpgu/A1mQGgRoIZxfzQzDD2DfhwyCMAMYBZmGtmmmf8c+jT+MKQAu8SiAcaYE8N5GmfGJMiP4TEcHDktlK7MTBMWAsgPaRb0YoIbV9EWovj/kH6GJIKXwpmT2T80A0iQjD6AF/Vg9wSODCyH5G1EuHPYT/P+JRv347uIjDfuX7VpP6VvIQZueHDr/BbHQDjiAdEAMdheO+/hGXPfq0O8NR8jr1/HM8bM/LOunH6jUyMvMeNqYRltDZhRTldAp3lbGNH6kBCrZYxL6mgXc5uhcGoQfMqhExfqPk3imLsitaqVN22hCIWO83wtQdRo23MPRkX92g2jGTYIdYXguDd9wq0Ys4zg0QZyTBYlnzetDamBlB8vtG/MRKUSaOJ6DuiZ49m7twj1luDIzSBYGz0Y8Wf++TnJxpWhEJDofM6PVr2+7CCIBzMDcJ4XRIPk94RrDp7wkOOMFwWPvAGGhzvM3jmIFx41HL/7s6CAoPfmDBBrdUwM4dFHnACfNAHhoUSwS39/f20QHbtU5KXnEXwmu0jAH+eAoztgf15GEcJEBI8D8BZD4V1qdHpM0Er6EtAthoGXXAxp8z4V0VNJ/5BofheXuAFSCM89uh/jB5M8StxgJvvGsxvEG2XGjH10b48kjrXtokG55f2VZnjDkkaWDNftQ+x4txhf47nX0ttCOlEbPDWmgMzCxunt3OPcLQ7N/kw4M5EYB269B9dGMVrwuL/phxtqN2RKfdVcTvI2UcbhaMzsdo+zpeND6ePt9gXj09XFaWWPs4HgobjN68P1PE9s88p0amiL+rAsrZp/RDTGafDmxrlxewFE7IacATfNwVHk2zgOPHZSA351a7EFDxJNOeq8VyOxvgyIBOndjzMA2MdcTahqIT3A8sf8A3sGhxCkG45PAKgtRTqWSHrOteeAfK6waVdBgLtY+KcTEzgUCfgI0IxvHGNgoNmBYng6grJnQmbZK13Nx5R403I2JDZtRX0C1MkBkafD46kXHXpRytP+kLHsJmrkbrJxr+17AQC7KPAvzvVi8BzW9oujPWsjtYTBRsROK31RL4Qdgu3BJZVtawO2bkliO6XgAnVapYOFXqqV0leKw47/sP4oXiw6FAphg58m3jESbkVNq7rVtxq3p8/iYp45HkOHULdGKEPhzjDRLSjqe1klaHdIo4a4FnerdxtIQqYKPsUPEF+NiR/6iLxsQDL2fOeG3xFgRhxfvNe3gVe1Ki1J39WnuFUVWG740r2M19YVVpljnZ2jXxEOraXKMtXqLn7hXrwB/GSRWStYPG4+xf15DsRGK9zrP2QpQi/C+8GNvslyEo/w3ep3W9a4VRJJOrq4K/YA9JIdQpDnucwtorIad/CqEJ0uFa01zxXFhDwU3vD0A7oUp1qXRVFUVbUgAlDtnLYXnIp1DjdZv+qOyyV8C+O5m17wByap0m1WZoQHRElLJIap26xIqiurDOum9WaV1qpLLw+h7IOaTlORIKUsgLgDCm+PHfVln0KoJRnFEZ+IUqf1rqPnTYulabdrGY6CnUkJvKapy7qulXSL4Ek3DEgEVN1kWUWg1uyrVlKqK5llQJFNKwsANjVKRupexKmElxTEow5qiU/Oq4PRf/DZ+FJFIWXbtjm7BBTRTYVzn/LDAAWuzPOCWIIDC5+0jzjlRYNfSANcBTcANm0jmxL0ZF3pnetBlA2jHyM3mmIB5BRhvpI9TYCFrOuCrAFBYIJdhvjtki1dkU8UdxrRYUDWuyTJZ3AtORfXgNS0FlC2TQGGiOhmPEbstJSlykEKAiSD94pKNuRRCe4lcCjlG1k1iq7VVH034i2ISpWqIClkFpAZ1eADQnAivSBAWeNX3b6FZx+taV2VCm6t6xNgURNhiiXkAvEglkgciWRJvc3PSZYCQJW5VaS/M8CmaZAnDMjOBZ7KpCZ64t2nliEX57YipyIXQU2yT5HxNamFnInMqAFHrf4Djyyp/VDFrJB0lP6UdiiY9WIoNBU1Mb2jpvuRh7I+QaaYxtul4MChDVFtKHJScZnlDhZ6HzL7UL1TVD7hUsuU3dsSGDUSz3Vweiae0B4EdTt9ady1fO/JFLIV0m4vqDGRcauK+XIYeH9gvgjXaKDz+97fmQjCCFOG72PaiKIw+FOwr33ta1/72tf+p/Yv9QAm0nQ14GgAAAAASUVORK5CYII=" width="26" height="26" alt="" decoding="async">`};
const mbtn=(m,on,cb)=>`<button class="${on?'on':''}" onclick="pick(this,()=>{M='${m}';${cb||''}})">${PL[m]}<span>${m}</span></button>`;
const MSF=cb=>`<div class="ms">${mbtn('JazzCash',1,cb)}${mbtn('Easypaisa',0,cb)}</div>`,MS=MSF('');
async function rpc(n,a){const{error}=await sb.rpc(n,a);if(error){toast(error.message);return false}await load();return true}
const devId=()=>{try{let d=localStorage.getItem('ce_dev');if(!d){d=(window.crypto&&crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).slice(2,14));localStorage.setItem('ce_dev',d)}return d}catch(e){return ''}};
async function load(){
 if(!window.__dv){window.__dv=1;Promise.resolve(sb.rpc('register_device',{p_dev:devId()})).catch(()=>{})}
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
const EYE='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',EYE0='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M3 3l18 18"/></svg>';
const PWF=(id,ph,ac)=>`<div class="pwb"><input id="${id}" type="password" placeholder="${ph}" autocomplete="${ac}"><button type="button" class="eye" aria-label="Show password" onclick="togglePw('${id}',this)">${EYE}</button></div>`;
function togglePw(id,b){const i=$(id),s=i.type==='password';i.type=s?'text':'password';b.innerHTML=s?EYE0:EYE;b.setAttribute('aria-label',s?'Hide password':'Show password')}
function guideHtml(t){const o=[];let ul=[];const fl=()=>{if(ul.length){o.push('<ul>'+ul.map(x=>'<li>'+x+'</li>').join('')+'</ul>');ul=[]}};String(t||'').split(/\r?\n/).forEach(l=>{l=l.trim();if(!l){fl();return}if(l.startsWith('# ')){fl();o.push('<h3>'+esc(l.slice(2))+'</h3>')}else if(l.startsWith('- ')){ul.push(esc(l.slice(2)))}else{fl();o.push('<p>'+esc(l)+'</p>')}});fl();return o.join('')}
async function guideGet(){if(window.__gd&&Date.now()-window.__gd.t<3e5)return window.__gd;try{const{data}=await sb.from('settings').select('key,text_value').in('key',['help_guide','help_guide_ur']);const m=Object.fromEntries((data||[]).map(r=>[r.key,r.text_value||'']));window.__gd={t:Date.now(),en:m.help_guide||'',ur:m.help_guide_ur||''}}catch(e){window.__gd={t:Date.now(),en:'',ur:''}}return window.__gd}
const guideTxt=g=>{let ur=false;try{ur=localStorage.getItem('lang')==='ur'}catch(e){}return ur?(g.ur||g.en):(g.en||g.ur)};
async function guideBox(){const e=$('gbox');if(!e)return;const t=guideTxt(await guideGet());if(!t||!$('gbox'))return;$('gbox').innerHTML='<details class="gdw"><summary>How to use CrownEarn</summary><div class="gd">'+guideHtml(t)+'</div></details>'}
async function openGuide(){const t=guideTxt(await guideGet());if(!t){_openHelpChat();return}if($('gdp'))return;const d=document.createElement('div');d.id='gdp';d.className='ov';d.style.zIndex=40;d.onclick=e=>{if(e.target===d)d.remove()};d.innerHTML='<div class="sh" style="padding:14px;max-height:88vh;overflow:auto"><div class="row"><div class="hd" style="font-size:20px">How to use CrownEarn</div><button class="o" style="padding:4px 12px" onclick="$(\'gdp\').remove()" aria-label="Close">✕</button></div><div class="gd">'+guideHtml(t)+'</div><button class="g w" style="margin-top:14px" onclick="$(\'gdp\').remove();_openHelpChat()">Chat with Customer Service</button></div>';document.body.appendChild(d)}
async function proofLoad(){guideBox();try{const[a,b]=await Promise.all([sb.rpc('public_stats'),sb.rpc('recent_payouts')]);const st=Array.isArray(a.data)?a.data[0]:a.data,list=Array.isArray(b.data)?b.data:[],e=$('proof');if(!e)return;const n=st&&+st.paid_count||0,tot=st&&Math.round(+st.paid_total)||0;if(!n&&!list.length)return;
 e.innerHTML=(n?`<div class="proof">✓ <b>${n}</b> <span>withdrawals paid</span> · <span>PKR</span> <b>${tot}</b> <span>sent to members</span></div>`:'')+(list.length?`<div class="mute" style="margin:12px 0 4px;font-weight:700;text-align:left">Recent payouts ✅</div><div class="plist">${list.map(p=>`<div><span>${esc(p.name)}</span><span class="rw">PKR ${p.amt} paid</span></div>`).join('')}</div>`:'')+`<div class="paywith"><span>Withdraw to</span>${PL.JazzCash}${PL.Easypaisa}</div>`}catch(e){}}
function auth(){$('nav').innerHTML='';$('app').innerHTML=`<div class="card" style="text-align:center;margin-top:30px">${mascot(96)}<div class="hd" style="font-size:30px">CrownEarn</div><div class="mute">Complete tasks. Earn rewards. Withdraw to PKR.</div><div style="text-align:left">${mode==='signup'?`<label>Your name</label><input id="nm" placeholder="Name"><label>Referral code (optional)</label><input id="rf" value="${esc(REF)}" placeholder="Optional">`:''}<label>Email</label><input id="em" type="email" placeholder="you@email.com" autocomplete="email"><label>Password</label>${PWF('pw','6+ characters',mode==='signup'?'new-password':'current-password')}${mode==='signup'?'<label>Confirm password</label>'+PWF('pw2','Re-enter your password','new-password'):''}</div><button class="g w" style="margin-top:16px" onclick="doAuth()">${mode==='signup'?'Create account':'Log in'}</button><p class="mute" style="margin-top:12px">${mode==='signup'?'Already have an account?':'New here?'} <a href="#" onclick="mode='${mode==='signup'?'login':'signup'}';auth();return false" style="color:var(--pri);font-weight:700">${mode==='signup'?'Log in':'Create account'}</a></p><div id="proof"></div><div id="gbox" style="margin-top:12px;text-align:left"></div></div>`;proofLoad()}
async function doAuth(){const em=$('em').value.trim(),pw=$('pw').value;
 if(!em||pw.length<6){toast('Enter your email and a password of 6+ characters');return}
 if(mode==='signup'){if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)){toast('Enter a valid email');return}
  if(pw!==$('pw2').value){toast('Passwords do not match');return}
  const{data,error}=await sb.auth.signUp({email:em,password:pw,options:{data:{name:($('nm').value.trim()||'Friend').slice(0,40),ref:($('rf').value||'').trim(),dev:devId()}}});
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
 return `<div class="top"><div><div class="brand"><i><svg viewBox="0 0 24 24"><path d="M4 18l-1-10 5 4 4-7 4 7 5-4-1 10z"/></svg></i>CrownEarn</div><div class="hd">Hello, ${esc(P.name)} 👋</div><div class="mute">How much will you earn today?</div></div><span class="chip">🪙 ${P.points}</span></div>
<div class="hero"><div class="hr"><div><small>Your earnings</small><div class="big"><span style="font-size:20px">PKR </span><span id="cnt">0</span></div></div>${mascot(92)}</div><div class="pb"><i style="width:${pct}%"></i></div><div class="bub">${left>0?`CrownEarn says: Great job! Only ${left} points left to withdraw 💪`:'CrownEarn says: Wow! You can withdraw now 🎉'}</div></div>
<div class="card"><div class="row"><b>Daily bonus 🎁</b><span class="tag">${alive?P.streak:0}-day streak 🔥</span></div><div class="days">${days}</div><button class="${cl?'o':'g'} w" ${cl?'disabled':''} onclick="claim()">${cl?'Come back tomorrow':'Claim daily bonus +'+bonus}</button></div>
<div class="qa"><button onclick="go('wallet')"><span class="ib"><svg viewBox="0 0 24 24"><path d="M12 19V5M6 11l6-6 6 6"/></svg></span>Withdraw</button><button onclick="go('refer')"><span class="ib"><svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5"/><path d="M3 20c0-3.5 3-6 6-6s6 2.5 6 6M16 5a3.5 3.5 0 0 1 0 6.5M18 14c2 .8 3 2.8 3 6"/></svg></span>Referral</button><button onclick="window.LuckyDraw&&LuckyDraw.open()"><span class="ib"><svg viewBox="0 0 24 24"><path d="M4 9h16v4H4zM6 13v7h12v-7M12 9v11M12 9c-3 0-4-4-1-4 2 0 1 4 1 4zm0 0c3 0 4-4 1-4-2 0-1 4-1 4z"/></svg></span>Lucky Draw</button></div>
<div class="sec">Tasks for you</div>${av.slice(0,2).map(taskCard).join('')||'<div class="card mute">No tasks right now. Check back soon!</div>'}${av.length?'<button class="o w" style="margin-top:12px" onclick="go(\'tasks\')">See all tasks</button>':''}`}

/* ===== app2 ===== */
function tasksView(){const av=avail();return `<div class="hd" style="margin:4px 2px">Tasks 📋</div><div class="mute" style="margin:0 2px">${av.length} available · every proof is reviewed</div>${av.map(taskCard).join('')||'<div class="card mute">No tasks right now. Check back soon!</div>'}`}
function calc(){const p=+$('pr').value||0,n=+$('nw').value||0;$('sm').innerHTML=`Total cost: <b>PKR ${p*n}</b>`}
async function mk(){const t=$('tt').value.trim(),l=$('lk').value.trim(),p=+$('pr').value,n=+$('nw').value;
 if(t.length<5){toast('Enter a task title');return}if(!/^https?:\/\/.{4,}/.test(l)){toast('Enter a valid link starting with https://');return}
 if(!(p>=2)||!(n>=5)){toast('Minimum is PKR 2 per task and 5 people');return}
 if(p*n>P.credit_pkr){toast('Not enough credit. Please deposit first.');openD();return}
 if(await rpc('create_task',{p_title:t,p_kind:T,p_link:l,p_price:p,p_slots:n}))win('Task submitted 📣','It goes live after the admin reviews it')}
const ST={review:'Under review',live:'Live ✅',closed:'Completed',rejected:'Rejected'};
function createView(){const mine=D.tasks.filter(t=>t.owner===U.id),ids=new Set(mine.map(t=>t.id)),rev=D.subs.filter(s=>s.status==='pending'&&ids.has(s.task_id)&&s.user_id!==U.id);
 return `<div class="hd" style="margin:4px 2px">Add your task 📣</div><div class="mute" style="margin:0 2px">Paste your link, set the price, and people will complete it for you</div>
<div class="card row"><span>Task credit: <b>PKR ${P.credit_pkr}</b></span><button class="g" onclick="openD()">Deposit</button></div>
<div class="card"><label style="margin-top:0">Task type</label><div class="tp">${Object.keys(ICON).map(x=>`<button class="${T===x?'on':''}" onclick="pick(this,()=>T='${x}')">${x}</button>`).join('')}</div>
<div class="warn">App installs, sign-ups and surveys work best. Follow, subscribe or view tasks on YouTube or TikTok can break their policies.</div>
<label>Task title</label><input id="tt" maxlength="80" placeholder="e.g. Install my app and open it"><label>Link</label><input id="lk" placeholder="https://">
<div class="two"><div><label>Price per task (PKR)</label><input id="pr" inputmode="numeric" value="5" oninput="calc()"></div><div><label>Number of people</label><input id="nw" inputmode="numeric" value="20" oninput="calc()"></div></div>
<div class="sum" id="sm">Total cost: <b>PKR 100</b></div><button class="g w" style="margin-top:14px" onclick="mk()">Create task</button></div>
${rev.length?`<div class="sec">Proofs to review</div>${rev.map(s=>{const t=mine.find(x=>x.id===s.task_id);return `<div class="card"><b>${esc(t.title)}</b><div class="mute" style="word-break:break-all">Proof: ${esc(s.proof)}</div><div class="two" style="margin-top:10px"><button onclick="rv(${s.id},true)">Approve</button><button class="o" onclick="rv(${s.id},false)">Reject</button></div></div>`}).join('')}`:''}
${mine.length?`<div class="sec">My tasks</div>${mine.map(m=>`<div class="card"><div class="row"><b>${esc(m.title)}</b><span class="tag">${esc(m.kind)}</span></div><div class="mute">PKR ${m.price_pkr} per task · ${m.slots} people · ${ST[m.status]}</div><div class="pb" style="background:var(--soft);height:12px"><i style="width:${m.done_count/m.slots*100}%"></i></div><div class="mute">${m.done_count} / ${m.slots} done</div></div>`).join('')}`:''}`}
const rv=async(id,ok)=>{if(await rpc('review_submission',{p_id:id,p_ok:ok}))toast(ok?'Approved. Points sent to the user.':'Rejected.')};
async function claim(){const b=document.querySelector('.days+button');if(b)b.disabled=true;
 const{data,error}=await sb.rpc('claim_bonus');if(error){toast(error.message);if(b)b.disabled=false;return}await load();win('Daily bonus claimed 🎁','+'+data+' points · keep your streak going!')}
const openW=()=>{M='JazzCash';sheet('Withdraw',`You will receive: <b>PKR ${rs(P.points)}</b>`,MS+'<label>Account number</label><input id="ph" inputmode="numeric" maxlength="11" placeholder="03XXXXXXXXX"><div class="mute" style="margin-top:6px">Double-check your number before sending.</div>','Send request','confirmW()')};
async function confirmW(){const n=$('ph').value.trim();if(P.points<MINW()){toast('Minimum withdrawal is '+MINW()+' points');return}if(!/^03\d{9}$/.test(n)){toast('Enter a valid number, like 03001234567');return}
 const v=P.points;if(await rpc('request_withdraw',{p_method:M,p_account:n,p_points:v})){closeW();win('Request sent ✅','After review, PKR '+rs(v)+' will reach your '+M)}}
const openD=()=>{M='JazzCash';sheet('Make a deposit','Send the money, enter the transaction ID, and your credit is added after review.',MS+`<div class="sum">Send money to this number:<br><b dir="ltr">${esc(D.cfg.pay_number||'03XX-XXXXXXX')}</b></div><label>Amount (PKR)</label><input id="da" inputmode="numeric" placeholder="500"><label>Transaction ID</label><input id="dt" placeholder="1234567890">`,'Send request','reqD()')};
async function reqD(){const a=+$('da').value,t=$('dt').value.trim();if(!(a>=(D.cfg.min_deposit||100))){toast('Minimum deposit is PKR '+(D.cfg.min_deposit||100));return}if(t.length<6){toast('Enter the transaction ID');return}
 if(await rpc('request_deposit',{p_method:M,p_amount:a,p_txn:t})){closeW();tab='wallet';draw();toast('Request sent. Waiting for approval.')}}
const TAG={pending:'<span class="tag">Pending</span>',approved:'<span class="tag">Approved ✔</span>',paid:'<span class="tag">Paid ✔</span>',rejected:'<span class="tag" style="background:#ffe0e6;color:#c0392b">Rejected</span>'};
const refLink=()=>location.origin+location.pathname+'?ref='+P.ref_code;
function copyRef(){const l=refLink();(navigator.clipboard?navigator.clipboard.writeText(l):Promise.reject()).then(()=>toast('Link copied'),()=>prompt('Copy your link:',l))}
function inviteCard(){if(!P.ref_code)return '';const earned=D.refs.reduce((a,x)=>a+(+x.earned||0),0),msg='Join CrownEarn: complete simple tasks and earn PKR. '+refLink();
 return `<div class="sec">Invite friends 🤝</div><div class="card"><div>Earn <b>${D.cfg.referral_percent??10}%</b> of every task your friends complete, for as long as they use the app, plus <b>${D.cfg.referral_first_bonus??100} pts</b> when a friend completes ${D.cfg.referral_min_tasks||3} tasks.</div><div class="sum" style="word-break:break-all"><b dir="ltr">${esc(refLink())}</b></div><div class="two"><button class="g" onclick="copyRef()">Copy link</button><a class="bt" style="text-align:center" href="https://wa.me/?text=${encodeURIComponent(msg)}" target="_blank" rel="noopener noreferrer">WhatsApp</a></div><div class="mute" style="margin-top:8px">Your code: <b>${esc(P.ref_code)}</b> · ${D.refs.length} friends · ${earned} pts earned</div>${D.refs.map(x=>`<div class="row mute" style="margin-top:6px"><span>${esc(x.name)} · ${new Date(x.joined).toLocaleDateString()}</span><b>+${x.earned} pts</b></div>`).join('')}</div>`}
function walletView(){const can=P.points>=MINW(),pct=Math.min(100,P.points/MINW()*100),done=D.subs.filter(s=>s.user_id===U.id&&s.status==='approved').length,today=new Date().toISOString().slice(0,10),yest=new Date(Date.now()-864e5).toISOString().slice(0,10),alive=P.last_claim===today||P.last_claim===yest,st=alive?P.streak:0,lv=1+Math.floor((done*100+st*20)/200);
 const B=[['🌱','First task',done>=1],['🔥','3-day streak',st>=3],['💸','First withdrawal',D.wds.length>=1],['🏆','Gold member',done>=3]];
 return `<div class="card gr" style="margin-top:4px">${mascot(64)}<div style="flex:1"><div class="hd">${esc(P.name)} · Level ${lv}</div><div class="mute">${done} tasks done · ${D.wds.length} withdrawals</div></div></div>
<div class="wc" style="margin-top:14px"><small>My earnings (withdrawable)</small><div class="big"><span style="font-size:20px">PKR </span><span id="cnt">0</span></div><small>${P.points} pts · ${Math.round(1/rate())} pts = PKR 1</small><div class="pb"><i style="width:${pct}%"></i></div><button class="g w" style="margin-top:12px" ${can?'':'disabled'} onclick="openW()">Withdraw</button>${can?'':`<div style="font-size:13px;margin-top:6px;text-align:center">Earn ${MINW()-P.points} more points to withdraw</div>`}</div>
<div class="mc"><small>Task credit (deposit)</small><div class="big"><span style="font-size:20px">PKR </span>${P.credit_pkr}</div><small>Use it to give tasks to others</small><div class="two" style="margin-top:12px"><button class="g" onclick="openD()">Deposit</button><button class="o" onclick="go('create')">Add task</button></div></div>
${D.deps.length||D.wds.length?`<div class="sec">My requests</div>${D.deps.map(x=>`<div class="card row"><span>Deposit <b>PKR ${x.amount_pkr}</b> <span class="mute">${esc(x.method)}</span></span>${TAG[x.status]}</div>`).join('')}${D.wds.map(x=>`<div class="card row"><span>Withdraw <b>PKR ${x.amount_pkr}</b> <span class="mute">${esc(x.method)}</span></span>${TAG[x.status]}</div>`).join('')}`:''}
${inviteCard()}
<div class="sec">My badges</div><div class="card"><div class="bd">${B.map(b=>`<div class="${b[2]?'on':''}"><span>${b[0]}</span>${b[1]}</div>`).join('')}</div></div>
<div class="sec">Transactions</div>${D.led.map(x=>`<div class="card row"><span>${KIND[x.kind]||esc(x.kind)}<div class="mute">${esc(x.note||'')}</div></span><b style="color:${(x.points<0||x.pkr<0)?'#e0475b':'var(--mint)'}">${x.points?(x.points>0?'+':'')+x.points+' pts':(x.pkr>0?'+':'')+'PKR '+x.pkr}</b></div>`).join('')||'<div class="card mute">No transactions yet.</div>'}
${P.is_admin?'<a class="bt" style="display:block;text-align:center;margin-top:14px" href="admin.html">Open Admin Panel</a>':''}<button class="o w" style="margin-top:12px" onclick="logout()">Log out</button>`}
const tabs=[['home','🏠','Home'],['tasks','📋','Tasks'],['create','➕','Add Task'],['wallet','👤','Profile']];
function draw(){if(!P)return;$('app').innerHTML={home:homeView,tasks:tasksView,create:createView,wallet:walletView}[tab]();
 const c=$('cnt');if(c)countTo(c,rs(P.points));
 $('nav').innerHTML='<div>'+tabs.map(t=>`<button class="${tab===t[0]?'on':''}" onclick="go('${t[0]}')"><span>${t[1]}</span>${t[2]}</button>`).join('')+'</div>'}
(async()=>{try{const{data}=await Promise.race([sb.auth.getSession(),new Promise((_,r)=>setTimeout(()=>r(new Error('Timed out reaching the database. Check your internet.')),10000))]);if(data.session){U=data.session.user;await load()}else auth()}
catch(e){$('app').innerHTML=`<div class="card">Cannot reach the database.<div class="mute">${esc(e.message)}</div></div>`}})();

/* ===== app3 ===== */
/* CrownEarn extras: screenshot proofs, task pictures, Help chat, fresh deposit number */
let unread=0,helpRef='General',flt='All';
document.head.insertAdjacentHTML('beforeend','<meta name="theme-color" content="#6a4cf5"><link rel="icon" href="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 100 100%27%3E%3Ccircle cx=%2750%27 cy=%2750%27 r=%2744%27 fill=%27%23ffc83d%27 stroke=%27%23d99a00%27 stroke-width=%276%27/%3E%3Ccircle cx=%2738%27 cy=%2745%27 r=%275%27 fill=%27%234a3200%27/%3E%3Ccircle cx=%2762%27 cy=%2745%27 r=%275%27 fill=%27%234a3200%27/%3E%3Cpath d=%27M40 58Q50 70 60 58%27 stroke=%27%234a3200%27 stroke-width=%274%27 fill=%27none%27/%3E%3C/svg%3E">');
tabs.length=0;tabs.push(['home','🏠','Home'],['tasks','📋','Tasks'],['refer','🤝','Referral'],['wallet','👛','Wallet']);
function inviteCard(){return ''}



const shrink=async(f,mx=1280,q=.72)=>{const b=await createImageBitmap(f),s=Math.min(1,mx/Math.max(b.width,b.height)),c=document.createElement('canvas');c.width=Math.round(b.width*s);c.height=Math.round(b.height*s);c.getContext('2d').drawImage(b,0,0,c.width,c.height);return new Promise(r=>c.toBlob(r,'image/jpeg',q))};
const logoUrl=p=>sb.storage.from('logos').getPublicUrl(p).data.publicUrl;
function proofHtml(p){p=String(p||'');if(!p.startsWith('file:'))return esc(p);const[f,...n]=p.slice(5).split('|');return `<button class="o" style="padding:4px 12px" onclick="viewP('${esc(f)}')">View screenshot</button> ${esc(n.join(' '))}`}
async function viewP(f){const{data,error}=await sb.storage.from('proofs').createSignedUrl(f,300);if(error){toast(error.message);return}const d=document.createElement('div');d.className='ov mid';d.onclick=()=>d.remove();d.innerHTML=`<img src="${data.signedUrl}" alt="Proof screenshot" style="max-width:100%;max-height:90vh;border-radius:14px">`;document.body.appendChild(d)}
function taskCard(t,k){const s=D.subs.find(x=>x.task_id===t.id&&x.user_id===U.id);
 const b=!s?`<button onclick="openS2(${t.id})">Submit proof</button>`:s.status==='pending'?'<span class="tag">Under review</span>':s.status==='approved'?'<span class="tag">Done ✔</span>':`<span style="text-align:right"><span class="tag" style="background:#ffe0e6;color:#c0392b">Rejected</span>${s.reason?`<div class="mute" style="font-size:12px;max-width:140px">${esc(s.reason)}</div>`:''}${(s.tries||1)<3?`<div style="margin-top:4px"><button onclick="openS2(${t.id})" style="padding:4px 12px;font-size:13px">Try again</button></div>`:''}</span>`;
 const ic=t.logo?`<img class="ic" alt="" src="${esc(logoUrl(t.logo))}" style="object-fit:cover;padding:0">`:`<span class="ic c${k%4}">${ICON[t.kind]||'⭐'}</span>`;
 return `<div class="card"><div class="gr">${ic}<div>${esc(t.title)}</div></div><div class="row" style="margin-top:10px"><span class="rw">+${t.reward_points} pts · PKR ${rs(t.reward_points)}</span><span class="gr" style="gap:8px">${t.link?`<a class="bt" href="${esc(t.link)}" target="_blank" rel="noopener noreferrer">Open</a>`:''}${b}</span></div></div>`}
const openS2=id=>sheet('Submit proof','Do the task first, then upload a screenshot that shows it is done.','<label>Screenshot</label><input id="pf" type="file" accept="image/*"><label>Note (optional)</label><input id="pn" maxlength="80" placeholder="Username or comment">','Send proof',`sendS2(${id})`);
async function sendS2(id){const f=$('pf').files[0];if(!f){toast('Choose a screenshot first');return}
 const btn=document.querySelector('.sh .g'),reset=()=>{btn.disabled=false;btn.textContent='Send proof'};btn.disabled=true;btn.textContent='Uploading…';
 try{const h=[...new Uint8Array(await crypto.subtle.digest('SHA-256',await f.arrayBuffer()))].map(x=>x.toString(16).padStart(2,'0')).join(''),blob=await shrink(f),path=U.id+'/'+Date.now()+'.jpg',up=await sb.storage.from('proofs').upload(path,blob,{contentType:'image/jpeg'});if(up.error)throw up.error;
  const note=($('pn').value||'').trim().replace(/\|/g,' ');
  if(await rpc('submit_task',{p_task:id,p_proof:'file:'+path+(note?'|'+note:''),p_hash:h})){closeW();toast('Proof sent. Points arrive after review.')}else reset()}
 catch(e){toast(e.message||'Upload failed');reset()}}
async function mk(){const t=$('tt').value.trim(),l=$('lk').value.trim(),p=+$('pr').value,n=+$('nw').value,f=$('lg')&&$('lg').files[0];
 if(t.length<5){toast('Enter a task title');return}if(!/^https?:\/\/.{4,}/.test(l)){toast('Enter a valid link starting with https://');return}
 if(!(p>=2)||!(n>=5)){toast('Minimum is PKR 2 per task and 5 people');return}
 if(p*n>P.credit_pkr){toast('Not enough credit. Please deposit first.');openD2();return}
 let logo=null;if(f){const path=U.id+'/'+Date.now()+'.jpg',up=await sb.storage.from('logos').upload(path,await shrink(f,320,.8),{contentType:'image/jpeg'});if(up.error){toast(up.error.message);return}logo=path}
 if(await rpc('create_task',{p_title:t,p_kind:T,p_link:l,p_price:p,p_slots:n,p_logo:logo}))win('Task submitted 📣','It goes live after the admin reviews it')}
async function openD2(){M='JazzCash';let n='';try{const{data}=await sb.from('settings').select('text_value').eq('key','pay_number').single();n=(data&&data.text_value)||''}catch(e){}
 sheet('Make a deposit','Send the money, enter the transaction ID, and your credit is added after review.',MS+`<div class="sum">Send money to this number:<br><b dir="ltr">${esc(n||'03XX-XXXXXXX')}</b></div><label>Amount (PKR)</label><input id="da" inputmode="numeric" placeholder="500"><label>Transaction ID</label><input id="dt" placeholder="1234567890">`,'Send request','reqD()')}
function tasksView(){const all=avail(),av=flt==='All'?all:all.filter(t=>t.kind===flt);return `<div class="hd" style="margin:4px 2px">Tasks 📋</div><div class="mute" style="margin:0 2px">${all.length} available · every proof is reviewed</div><div class="tp">${['All',...Object.keys(ICON)].map(x=>`<button class="${flt===x?'on':''}" onclick="flt='${x}';draw()">${x}</button>`).join('')}</div>${av.map(taskCard).join('')||'<div class="card mute">No tasks in this category right now.</div>'}`}
const legalView=()=>`<div class="hd" style="margin:4px 2px">Terms and Privacy</div><div class="card"><b>Terms of use</b><p class="mute">• CrownEarn is a task platform. Points are earned only for tasks that are reviewed and approved.<br>• One person, one account. Fake accounts and repeated or false proofs lead to a permanent ban and loss of points.<br>• Withdrawals are reviewed and paid manually to JazzCash or Easypaisa. The minimum withdrawal and the rate are shown in the app and may change.<br>• Deposits are used only to pay for tasks you create. Rejected tasks are refunded to your task credit.<br>• Do not post tasks that break the rules of other platforms, or that are illegal, adult or misleading.<br>• We may reject proofs, tasks or withdrawals that look fraudulent.</p></div><div class="card"><b>Privacy</b><p class="mute">• We store your name, email, task activity, balances and messages so the app can work.<br>• Proof screenshots and voice notes are private. Only you, the task owner (for proofs) and the admin can see them.<br>• We do not sell your data. We never ask for your password or card details.<br>• Paid withdrawals may appear in the Recent payouts list with a masked name (like A***) and the amount.<br>• To delete your account or data, message us in Help.</p></div><button class="o w" onclick="go('wallet')">Back</button>`;
async function fetchHours(){try{const{data}=await sb.from('settings').select('text_value').eq('key','support_hours').single();const e=$('shrs');if(e&&data&&data.text_value){e.textContent=data.text_value;D.cfg.support_hours=data.text_value}}catch(e){}}
function helpView(){return `<div class="hd" style="margin:4px 2px">Help and support 💬</div><div class="card"><b>Support hours</b><div class="mute" id="shrs">${esc(D.cfg.support_hours||'Daily 6 PM to 10 PM (Pakistan time)')}</div><div class="mute">You can write at any time. We reply during support hours.</div></div><div class="tp">${['General','Withdrawal','Deposit','Task'].map(x=>`<button class="${helpRef===x?'on':''}" onclick="pick(this,()=>{helpRef='${x}';Chat.ref(helpRef)})">${x}</button>`).join('')}</div><div id="chat"></div>`}
const NI={home:'<svg viewBox="0 0 24 24"><path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z"/></svg>',tasks:'<svg viewBox="0 0 24 24"><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4v2h6V4M9 13l2 2 4-4"/></svg>',refer:'<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5"/><path d="M3 20c0-3.5 3-6 6-6s6 2.5 6 6M16 5a3.5 3.5 0 0 1 0 6.5M18 14c2 .8 3 2.8 3 6"/></svg>',wallet:'<svg viewBox="0 0 24 24"><path d="M4 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM4 7l11-3v3M16 14h2"/></svg>'};
const navDraw=()=>{$('nav').innerHTML='<div>'+tabs.map(t=>`<button class="${tab===t[0]?'on':''}" onclick="go('${t[0]}')"><span>${NI[t[0]]||t[1]}</span>${t[2]}</button>`).join('')+'</div>';if(window.fabBadge)fabBadge()};
function patch(){if(P.is_blocked)$('app').insertAdjacentHTML('afterbegin','<div class="warn" style="background:#ffe0e6;color:#8a1f2b">🚫 Your account is blocked. You cannot submit tasks, deposit or withdraw. Please contact support in Help.</div>');
 if(tab==='home'&&window.homeExtras){$('app').insertAdjacentHTML('afterbegin','<div id="ann"></div>');$('app').insertAdjacentHTML('beforeend','<div id="hx"></div>');homeExtras()}
 document.querySelectorAll('[onclick="openD()"]').forEach(b=>b.setAttribute('onclick','openD2()'));
 document.querySelectorAll('#app .mute').forEach(e=>{const t=e.textContent;if(t.startsWith('Proof: file:'))e.innerHTML='Proof: '+proofHtml(t.slice(7))});
 const paid=D.wds.filter(w=>w.status==='paid');if(tab==='wallet'){if(paid.length){const bd=[...document.querySelectorAll('#app .sec')].find(e=>e.textContent==='My badges');if(bd)bd.insertAdjacentHTML('beforebegin','<div class="sec">Payment receipts</div>'+paid.map(w=>`<div class="card"><b>✅ PKR ${w.amount_pkr} paid via ${esc(w.method)}</b><div class="mute">${w.note?'Transaction ID: '+esc(w.note):'Payment sent'} · ${new Date(w.created_at).toLocaleDateString()}</div></div>`).join(''))}$('app').insertAdjacentHTML('beforeend','<p class="mute" style="text-align:center;margin-top:14px"><a href="#" onclick="go(\'legal\');return false" style="color:var(--pri)">Terms and Privacy</a></p>')}
 const tt=$('tt');if(tab==='create'&&tt&&!$('lg')){const lb=tt.previousElementSibling;if(lb)lb.insertAdjacentHTML('beforebegin','<label>Task picture (app icon, game logo or video thumbnail)</label><input id="lg" type="file" accept="image/*">')}}
function draw(){if(!P)return;const V={home:homeView,tasks:tasksView,create:createView,wallet:walletView,help:helpView,legal:legalView,refer:()=>window.referView?referView():'<div class="card">Loading…</div>'};$('app').innerHTML=V[tab]();const c=$('cnt');if(c)countTo(c,rs(P.points));patch();navDraw();
 if(window.patch2)patch2();if(window.mountFab)mountFab()}
async function chkUnread(){if(!U)return;const{count}=await sb.from('messages').select('id',{count:'exact',head:true}).eq('user_id',U.id).eq('sender','admin').eq('seen',false);const n=count||0;if(n!==unread){unread=n;navDraw()}}
const markSeenLocal=async()=>{try{if(!U)return;const{data}=await sb.from('messages').select('created_at').eq('user_id',U.id).eq('sender','admin').order('created_at',{ascending:false}).limit(1);const t=data&&data[0]?+new Date(data[0].created_at)+1000:Date.now();localStorage.setItem('chatSeenAt',new Date(t).toISOString())}catch(e){}};
window.onChatSeen=()=>{unread=0;navDraw();markSeenLocal()};
setInterval(()=>{if(U&&!document.hidden)chkUnread()},12000);

/* ===== lucky ===== */
/* (also holds the Urdu text for "Try again") CrownEarn Lucky Draw v3: card on the Home screen + draw page. Load after chat.js in index.html */
(function(){
if(window.LuckyDraw)return;
const L=(e,u)=>{try{return localStorage.getItem('lang')==='ur'?u:e}catch(x){return e}};
try{Object.assign(KIND,{draw_entry:'Lucky draw entry',draw_win:'Lucky draw prize',draw_refund:'Lucky draw refund',admin_adjust:'Admin adjustment'})}catch(e){}
(function w(){if(!window.LangAdd)return setTimeout(w,60);LangAdd({
'Lucky Draw':'لکی ڈرا','Try again':'دوبارہ کوشش کریں','Open draws':'کھلے ڈرا','Past winners':'پچھلے فاتح','Your points:':'آپ کے پوائنٹس:',
'Join':'شامل ہوں','Join now':'ابھی شامل ہوں','Joined ✔':'شامل ✔','Joined ✔ Good luck 🍀':'شامل ✔ نصیب اچھا ہو 🍀','View all draws':'سب ڈرا دیکھیں',
'Entries closed':'انٹریاں بند','Winner coming soon':'فاتح کا اعلان جلد ہوگا','Free entry':'مفت انٹری','Next draw coming soon ✨':'اگلا ڈرا جلد آ رہا ہے ✨',
'No draws right now. Check back soon!':'ابھی کوئی ڈرا نہیں۔ جلد دوبارہ دیکھیں!','No winners yet.':'ابھی کوئی فاتح نہیں۔',
'🎉 Congratulations! You won a lucky draw.':'🎉 مبارک ہو! آپ لکی ڈرا جیت گئے۔','How it works':'یہ کیسے کام کرتا ہے',
'Tap Join. When entries close, the winner is chosen and the prize points are added to their account.':'شامل ہوں دبائیں۔ انٹریاں بند ہونے پر فاتح چنا جاتا ہے اور انعام کے پوائنٹس اس کے اکاؤنٹ میں شامل ہو جاتے ہیں۔',
'Lucky draw entry':'لکی ڈرا انٹری','Lucky draw prize':'لکی ڈرا انعام','Lucky draw refund':'لکی ڈرا کی واپسی','Admin adjustment':'ایڈمن کی تبدیلی'},
[[/^🏆 (\d+) pts · PKR ([\d.]+)$/,(a,b)=>`🏆 ${a} پوائنٹس · ${b} روپے`],[/^🏆 (\d+) pts$/,n=>`🏆 ${n} پوائنٹس`],[/^≈ PKR ([\d.]+)$/,x=>`≈ ${x} روپے`],
[/^Entry: (\d+) pts$/,n=>`انٹری: ${n} پوائنٹس`],[/^(\d+) joined$/,n=>`${n} شامل`],[/^Ends: (.+)$/,x=>`اختتام: ${x}`],[/^\+(\d+) pts$/,n=>`+${n} پوائنٹس`],
[/^🎉 (.+) won (\d+) pts$/,(n,p)=>`🎉 ${n} نے ${p} پوائنٹس جیتے`]])})();
let B=null;
const css=`.lk{position:relative;overflow:hidden;margin:14px 0;padding:16px 14px 14px;border-radius:22px;text-align:center;color:#fff;background:radial-gradient(circle at 50% 0%,#7a45ff 0%,#4a22b8 45%,#1d0b4d 100%);border:2px solid #ffd54a;box-shadow:0 0 0 3px rgba(255,213,74,.25),0 10px 28px rgba(106,76,245,.45),0 0 26px rgba(255,213,74,.35)}
.lk:after{content:"";position:absolute;inset:0;background:linear-gradient(110deg,transparent 35%,rgba(255,255,255,.3) 50%,transparent 65%);transform:translateX(-120%);animation:lksh 3.6s ease-in-out infinite;pointer-events:none}
.lkt{display:flex;align-items:center;justify-content:center;gap:8px;font-size:22px}
.lkt b,.lkg{background:linear-gradient(90deg,#ffe27a,#fff6c9,#ffbf1f);-webkit-background-clip:text;background-clip:text;color:transparent;font-weight:800}
.lkv{background:linear-gradient(180deg,#ffe27a,#ffbf1f);color:#4a2d00;border-radius:99px;padding:2px 10px;font-size:12px;font-weight:800}
.lkreels{display:flex;justify-content:center;gap:8px;margin:12px 0}
.lkr{width:46px;height:54px;border-radius:12px;background:#fff;overflow:hidden;box-shadow:inset 0 0 0 2px #ffd54a,0 4px 10px rgba(0,0,0,.35)}
.lkr div{display:flex;flex-direction:column;animation:lksp 2.2s linear infinite}
.lkr span{height:54px;line-height:54px;text-align:center;font-size:30px}
.lkp{font-size:34px;font-weight:800;color:#ffd54a;text-shadow:0 0 14px rgba(255,213,74,.7),0 2px 0 #8a5a00;line-height:1.1}
.lkn{opacity:.85;font-size:14px}.lkd{font-weight:700;font-size:17px;margin-top:6px}.lkm2{font-size:13px;opacity:.85;margin:2px 0 12px}
.lkrow{display:flex;gap:8px;justify-content:center;flex-wrap:wrap}
.lkb{background:linear-gradient(180deg,#ffe27a,#ffbf1f);color:#4a2d00;border:0;border-radius:14px;padding:10px 18px;font-weight:800;box-shadow:0 4px 0 #c78a00;cursor:pointer}
.lko{background:rgba(255,255,255,.14);color:#fff;border:1.5px solid rgba(255,255,255,.4);border-radius:14px;padding:10px 14px;font-weight:700;cursor:pointer}
.lkj{padding:10px 14px;border-radius:14px;background:rgba(22,185,128,.9);font-weight:800}.lkw{margin-top:10px;font-size:13px;color:#ffe9a6}
.lks{position:absolute;font-style:normal;font-size:16px;animation:lktw 2.2s ease-in-out infinite;pointer-events:none}
@keyframes lktw{0%,100%{opacity:.25;transform:scale(.8)}50%{opacity:1;transform:scale(1.2)}}
@keyframes lksh{55%,100%{transform:translateX(120%)}}@keyframes lksp{to{transform:translateY(-50%)}}
@media(prefers-reduced-motion:reduce){.lk:after,.lkr div,.lks{animation:none}}`;
document.head.insertAdjacentHTML('beforeend','<style id="lkcss">'+css+'</style>');
const rsF=p=>{try{return rs(p)}catch(e){return Math.round(p*.01)}};
const when=t=>new Date(t).toLocaleString('en-GB',{day:'numeric',month:'short',hour:'numeric',minute:'2-digit'});
const ready=()=>typeof P!=='undefined'&&P&&typeof sb!=='undefined';
const isOpen=d=>d.status==='open'&&!(d.ends_at&&new Date(d.ends_at)<Date.now());
const EM=['🍒','7️⃣','💎','🍀','👑','🎁'];
const reel=(o,s)=>{const l=[...EM.slice(o),...EM.slice(0,o)];return `<div class="lkr"><div style="animation-duration:${s}s">${[...l,...l].map(e=>`<span>${e}</span>`).join('')}</div></div>`};
function homeHtml(){const d=((B&&B.draws)||[]).filter(isOpen).sort((a,b)=>b.prize_points-a.prize_points)[0],w=((B&&B.winners)||[])[0];
 const body=d?`<div class="lkp">🏆 ${d.prize_points} pts</div><div class="lkn">≈ PKR ${rsF(d.prize_points)}</div><div class="lkd">${esc(d.title)}</div><div class="lkm2"><span>${d.entry_cost>0?'Entry: '+d.entry_cost+' pts':'Free entry'}</span> · <span>${d.entries} joined</span></div>`:'<div class="lkd" style="margin:14px 0 12px">Next draw coming soon ✨</div>';
 const act=d?(d.joined?'<span class="lkj">Joined ✔ Good luck 🍀</span>':`<button class="lkb" onclick="LuckyDraw.join(${d.id})">Join now 🍀</button>`):'';
 return `<div class="lk" id="lkHome"><i class="lks" style="top:10px;left:14px">✨</i><i class="lks" style="top:16px;right:16px;animation-delay:.6s">💎</i><i class="lks" style="bottom:56px;left:10px;animation-delay:1.1s">⭐</i><i class="lks" style="bottom:70px;right:12px;animation-delay:1.6s">✨</i>
<div class="lkt"><span>👑</span><b>Lucky Draw</b><span>👑</span></div><div class="lkreels">${reel(0,1.7)}${reel(2,2.2)}${reel(4,2.7)}</div>${body}
<div class="lkrow">${act}<button class="lko" onclick="LuckyDraw.open()">View all draws</button></div>${w?`<div class="lkw">🎉 ${esc(w.name)} won ${w.prize_points} pts</div>`:''}</div>`}
function inject(force){const app=document.getElementById('app');if(!app||!B)return;const qa=app.querySelector('.qa');if(!qa||!app.querySelector('.hero'))return;
 const ex=document.getElementById('lkHome');if(ex&&!force)return;if(ex)ex.remove();qa.insertAdjacentHTML('afterend',homeHtml())}
function card(d){const open=isOpen(d);
 const act=d.joined?'<span class="tag">Joined ✔</span>':open?`<button onclick="LuckyDraw.join(${d.id})">Join</button>`:'<span class="tag">Entries closed</span>';
 return `<div class="card"><div class="gr"><span class="ic c1">🎁</span><div><b>${esc(d.title)}</b><div class="mute">${d.entry_cost>0?'Entry: '+d.entry_cost+' pts':'Free entry'}</div></div></div>
<div class="row" style="margin-top:10px"><span class="rw">🏆 ${d.prize_points} pts · PKR ${rsF(d.prize_points)}</span>${act}</div>
<div class="mute" style="margin-top:6px">${d.entries} joined</div>${d.ends_at?`<div class="mute">Ends: ${when(d.ends_at)}</div>`:''}${!open&&d.joined?'<div class="mute">Winner coming soon</div>':''}</div>`}
const wn=w=>`<div class="card row"><div><b>${esc(w.title)}</b><div class="mute">${esc(w.name)}${w.me?' (you)':''}</div></div><span class="rw">+${w.prize_points} pts</span></div>`;
function paint(){const e=document.getElementById('ldb');if(!e||!ready())return;const ds=(B&&B.draws)||[],ws=(B&&B.winners)||[];
 e.innerHTML=`<div class="row"><div class="hd gr" style="font-size:20px">🎰 <span class="lkg">Lucky Draw</span></div><button class="o" style="padding:4px 12px" onclick="LuckyDraw.close()" aria-label="Close">✕</button></div>
<div class="mute">Your points: <b>${P.points}</b></div>
${ws.some(w=>w.me)?'<div class="sum">🎉 Congratulations! You won a lucky draw.</div>':''}
<div class="sec">Open draws</div>${ds.map(card).join('')||'<div class="card mute">No draws right now. Check back soon!</div>'}
<div class="sec">Past winners</div>${ws.map(wn).join('')||'<div class="card mute">No winners yet.</div>'}
<div class="sum" style="margin-top:14px"><b>How it works</b><div class="mute">Tap Join. When entries close, the winner is chosen and the prize points are added to their account.</div></div>`}
async function loadB(silent){try{const{data,error}=await sb.rpc('draw_board');if(error)throw error;B=data||{draws:[],winners:[]};inject(true);paint()}catch(e){if(!silent)toast(e.message||'Error')}}
function open(){if(document.getElementById('ld'))return;const d=document.createElement('div');d.id='ld';d.className='ov';d.style.zIndex=40;d.onclick=e=>{if(e.target===d)close()};d.innerHTML='<div class="sh" id="ldb" style="padding:14px"></div>';document.body.appendChild(d);paint();loadB()}
function close(){const d=document.getElementById('ld');if(d)d.remove()}
async function join(id){const d=((B&&B.draws)||[]).find(x=>x.id===id);if(!d)return;
 if(d.entry_cost>0&&!confirm(L(`Join this draw for ${d.entry_cost} points?`,`${d.entry_cost} پوائنٹس میں اس ڈرا میں شامل ہوں؟`)))return;
 const{error}=await sb.rpc('enter_draw',{p_draw:id});if(error){toast(error.message);return}
 toast(L('You joined the draw. Good luck! 🍀','آپ ڈرا میں شامل ہو گئے۔ نصیب اچھا ہو! 🍀'));
 try{if(typeof load==='function')await load()}catch(e){}await loadB()}
window.LuckyDraw={open,close,join};
let q=0;const app=document.getElementById('app');
if(app&&window.MutationObserver)new MutationObserver(()=>{if(q)return;q=1;requestAnimationFrame(()=>{q=0;inject()})}).observe(app,{childList:true});
(function init(){if(ready())loadB(true);else setTimeout(init,700)})();
setInterval(()=>{if(!document.hidden&&ready())loadB(true)},45000);
})();

/* ===== seo ===== */
/* CrownEarn SEO text: shows a short "About" section under the login card (what Google and new visitors read). Load after lucky.js in index.html */
(function(){
const HTML=`<section id="seoAbout" class="card" style="margin-top:14px;text-align:left">
<h1 class="hd" style="font-size:20px;margin:0 0 6px">Earn rewards by completing simple tasks</h1>
<p class="mute" style="margin:0">CrownEarn is a task-based rewards platform. Complete tasks such as app installs, sign-ups and surveys, earn points, and withdraw your earnings to JazzCash or Easypaisa in PKR.</p>
<h2 style="font-size:17px;margin:16px 0 4px">How it works</h2>
<p class="mute" style="margin:2px 0">1. Create a free account.</p>
<p class="mute" style="margin:2px 0">2. Pick a task, complete it, then upload a screenshot as proof.</p>
<p class="mute" style="margin:2px 0">3. After review, the points are added to your balance.</p>
<p class="mute" style="margin:2px 0">4. Withdraw to JazzCash or Easypaisa when you reach the minimum.</p>
<h2 style="font-size:17px;margin:16px 0 4px">Bonuses and friends</h2>
<p class="mute" style="margin:0">Claim a daily bonus, join Lucky Draws, check the weekly leaderboard, and invite friends to earn commission on their tasks.</p>
<h2 style="font-size:17px;margin:16px 0 4px">Questions</h2>
<h3 style="font-size:15px;margin:8px 0 2px">Is it free to join?</h3><p class="mute" style="margin:0">Yes. Creating an account is free.</p>
<h3 style="font-size:15px;margin:8px 0 2px">How do I get paid?</h3><p class="mute" style="margin:0">After your proof is approved, withdraw your points to JazzCash or Easypaisa.</p>
<h3 style="font-size:15px;margin:8px 0 2px">Can I add my own task?</h3><p class="mute" style="margin:0">Yes. Add credit, create your task, and other people complete it for you.</p>
<h3 style="font-size:15px;margin:8px 0 2px">How are withdrawals paid?</h3><p class="mute" style="margin:0">Withdrawals are reviewed and paid manually to your JazzCash or Easypaisa number during support hours.</p>\n<h3 style="font-size:15px;margin:8px 0 2px">What is the minimum withdrawal?</h3><p class="mute" style="margin:0">It is shown inside the app on the Wallet screen and may change.</p>\n<h3 style="font-size:15px;margin:8px 0 2px">Can I use one number for several accounts?</h3><p class="mute" style="margin:0">No. One JazzCash or Easypaisa number can be paid to one account only.</p>\n<h3 style="font-size:15px;margin:8px 0 2px">How do I contact support?</h3><p class="mute" style="margin:0">After you log in, tap the Customer Service button to chat with us.</p></section>`;
(function w(){if(!window.LangAdd)return setTimeout(w,60);LangAdd({
'Earn rewards by completing simple tasks':'آسان ٹاسک مکمل کر کے انعامات کمائیں',
'CrownEarn is a task-based rewards platform. Complete tasks such as app installs, sign-ups and surveys, earn points, and withdraw your earnings to JazzCash or Easypaisa in PKR.':'کراؤن ارن ٹاسک پر مبنی انعامی پلیٹ فارم ہے۔ ایپ انسٹال، سائن اپ اور سروے جیسے ٹاسک مکمل کریں، پوائنٹس کمائیں اور اپنی کمائی روپوں میں جاز کیش یا ایزی پیسہ میں نکلوائیں۔',
'How it works':'یہ کیسے کام کرتا ہے',
'1. Create a free account.':'1. مفت اکاؤنٹ بنائیں۔',
'2. Pick a task, complete it, then upload a screenshot as proof.':'2. ٹاسک چنیں، مکمل کریں، پھر ثبوت کے طور پر اسکرین شاٹ اپلوڈ کریں۔',
'3. After review, the points are added to your balance.':'3. جانچ کے بعد پوائنٹس آپ کے بیلنس میں شامل ہو جاتے ہیں۔',
'4. Withdraw to JazzCash or Easypaisa when you reach the minimum.':'4. کم از کم حد پوری ہونے پر جاز کیش یا ایزی پیسہ میں نکلوائیں۔',
'Bonuses and friends':'بونس اور دوست',
'Claim a daily bonus, join Lucky Draws, check the weekly leaderboard, and invite friends to earn commission on their tasks.':'روزانہ بونس لیں، لکی ڈرا میں شامل ہوں، ہفتہ وار لیڈر بورڈ دیکھیں اور دوستوں کو بلا کر ان کے ٹاسک پر کمیشن کمائیں۔',
'Questions':'سوالات','Is it free to join?':'کیا شامل ہونا مفت ہے؟','Yes. Creating an account is free.':'جی ہاں۔ اکاؤنٹ بنانا مفت ہے۔',
'How do I get paid?':'ادائیگی کیسے ملے گی؟','After your proof is approved, withdraw your points to JazzCash or Easypaisa.':'ثبوت منظور ہونے کے بعد اپنے پوائنٹس جاز کیش یا ایزی پیسہ میں نکلوائیں۔',
'Can I add my own task?':'کیا میں اپنا ٹاسک دے سکتا ہوں؟','Yes. Add credit, create your task, and other people complete it for you.':'جی ہاں۔ کریڈٹ ڈالیں، ٹاسک بنائیں اور دوسرے لوگ اسے مکمل کریں گے۔'})})();
const app=document.getElementById('app');if(!app)return;
function put(){if(!app.querySelector('#em')||document.getElementById('seoAbout'))return;const c=app.querySelector('.card');if(c)c.insertAdjacentHTML('afterend',HTML)}
if(window.MutationObserver)new MutationObserver(()=>requestAnimationFrame(put)).observe(app,{childList:true});
put();
})();

/* ===== chat ===== */
/* CrownEarn chat: voice notes, edit, delete, ticks, live updates (shared by app and admin) */
window.Chat=(()=>{
const E=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const $c=id=>document.getElementById(id);
const ic=(p,s=22)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${p}"/></svg>`;
const MIC=ic('M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11h-2z'),SEND=ic('M2 21l21-9L2 3v7l15 2-15 2z'),TRASH=ic('M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z'),PLAY=ic('M8 5v14l11-7z',18),PAUSE=ic('M6 5h4v14H6zm8 0h4v14h-4z',18);
let me='user',tid=null,ref='',list=[],rec=null,chunks=[],t0=0,tm=null,ch=null,busy=false,ED=null,stream=null,AU=null,pt=null,HRS=null;const cache={};
const st=document.createElement('style');st.textContent=`.chw{border:1px solid var(--line);border-radius:16px;overflow:hidden;background:var(--card)}#chl{height:46vh;overflow:auto;padding:8px 10px;background:var(--soft,var(--bg))}.chb{max-width:82%;margin:3px 0;padding:6px 10px 4px;border-radius:14px;font-size:15px;line-height:1.4;word-break:break-word;width:fit-content}.chb.me{margin-left:auto;background:var(--pri);color:#fff;border-bottom-right-radius:4px}.chb.th{margin-right:auto;background:var(--card);color:var(--ink);border:1px solid var(--line);border-bottom-left-radius:4px}.chm{font-size:11px;opacity:.75;text-align:right;margin-top:2px}.chd{text-align:center;margin:10px 0 4px}.chd span{font-size:12px;background:var(--card);color:var(--mute);padding:2px 10px;border-radius:99px}.chbar{display:flex;gap:8px;align-items:center;padding:8px;border-top:1px solid var(--line)}.chbar input{flex:1;border-radius:99px!important;margin:0!important}.chbar button{width:44px;height:44px;padding:0;border-radius:50%;border:0;display:grid;place-items:center;flex:none;background:var(--pri);color:#fff}.chbar button.gh{background:var(--line);color:var(--mute)}.chrec{flex:1;display:flex;align-items:center;gap:8px;font-weight:700}.chdot{width:10px;height:10px;border-radius:50%;background:#e0475b;animation:chp 1s infinite}@keyframes chp{50%{opacity:.25}}@media(prefers-reduced-motion:reduce){.chdot{animation:none}}.chhint{font-weight:400;font-size:13px;color:var(--mute)}.chv{display:flex;align-items:center;gap:8px;min-width:200px}.chv button{width:38px;height:38px;border-radius:50%;padding:0;border:0;display:grid;place-items:center;flex:none}.chb.me .chv button{background:#fff;color:var(--pri)}.chb.th .chv button{background:var(--pri);color:#fff}.chbars{display:flex;align-items:center;gap:2px;height:28px;flex:1}.chbars i{width:3px;border-radius:2px;background:currentColor;opacity:.35}.chbars i.on{opacity:1}.chbar button:focus-visible,.chv button:focus-visible{outline:3px solid var(--gold,#ffc83d);outline-offset:2px}.bdg{background:#25d366;color:#fff;border-radius:99px;font-size:11px;font-style:normal;padding:0 6px;margin-left:3px;font-weight:700}.chq{display:flex;gap:6px;overflow-x:auto;padding:8px 8px 2px;border-top:1px solid var(--line);scrollbar-width:none}.chq::-webkit-scrollbar{display:none}.chq button{flex:none;width:auto;height:auto;display:block;font-size:13px;line-height:1.3;padding:6px 12px;border-radius:99px;background:var(--soft,var(--bg));color:var(--pri);border:1.5px solid var(--line);border-bottom-width:1.5px;white-space:nowrap}.chq button:active{transform:none;background:var(--line)}.chk{vertical-align:-1px;margin-inline-start:3px}`;document.head.appendChild(st);
const fmt=s=>Math.floor(s/60)+':'+String(s%60).padStart(2,'0');
const clock=d=>new Date(d).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
const day=d=>{const a=new Date(d).toDateString();return a===new Date().toDateString()?'Today':a===new Date(Date.now()-864e5).toDateString()?'Yesterday':new Date(d).toLocaleDateString([],{day:'numeric',month:'short'})};
const wave=id=>Array.from({length:30},(_,i)=>`<i style="height:${5+((id*37+i*53)%19)}px"></i>`).join('');
const TK=on=>`<svg class="chk" width="19" height="12" viewBox="0 0 19 12.5" fill="none" stroke="${on?'#4fd1ff':'currentColor'}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="${on?'Seen':'Delivered'}"><path d="M1.2 6.8L4.6 10.2L11 2.6"/><path d="M9.2 9.6L9.8 10.2L16.4 2.6"/></svg>`;
function bubble(m){const mine=m.sender===me;
 const body=m.deleted?'<i style="opacity:.7">🚫 This message was deleted</i>':m.kind==='voice'?`<div class="chv" data-vid="${m.id}"><button aria-label="Play voice message" onclick="event.stopPropagation();Chat.play(${m.id},this)">${PLAY}</button><div class="chbars">${wave(m.id)}</div><span class="chvd" style="font-size:12px;min-width:30px">${fmt(m.dur||0)}</span></div>`:E(m.body);
 const tick=mine&&!m.deleted?' '+TK(m.seen):'';
 return `<div class="chb ${mine?'me':'th'}" ${mine&&!m.deleted?`onclick="Chat.menu(${m.id})"`:''}>${m.ref?`<div style="font-size:11px;opacity:.75">${E(m.ref)}</div>`:''}${body}<div class="chm">${m.edited&&!m.deleted?'edited · ':''}${clock(m.created_at)}${tick}</div></div>`}
function draw(stick){const l=$c('chl');if(!l)return;const near=stick||l.scrollHeight-l.scrollTop-l.clientHeight<80;let h='<div class="chd"><span>'+(me==='admin'?'Only you can clear this chat':'🔒 Messages are cleared after 24 hours')+'</span></div>',d='';list.forEach(m=>{const k=day(m.created_at);if(k!==d){d=k;h+=`<div class="chd"><span>${k}</span></div>`}h+=bubble(m)});l.innerHTML=h+(list.length?'':'<div class="chd"><span>No messages yet. Say hello 👋</span></div>');if(near)l.scrollTop=l.scrollHeight;
 if(AU){const b=document.querySelector('[data-vid="'+AU.id+'"] button');if(b){AU.btn=b;b.innerHTML=AU.a.paused?PLAY:PAUSE}}}
async function load(stick){if(!tid)return;let q=sb.from('messages').select('*').eq('user_id',tid);if(me==='user')q=q.gt('created_at',new Date(Math.max(Date.now()-864e5,+new Date((()=>{try{return localStorage.getItem('chatSeenAt')}catch(e){return 0}})()||0))).toISOString());const{data}=await q.order('id');list=data||[];draw(stick);
 if(list.some(m=>m.sender!==me&&!m.seen)&&!document.hidden){await sb.rpc('mark_read',{p_user:tid});if(window.onChatSeen)onChatSeen()}}
function bar(){const b=$c('chb');if(!b)return;b.innerHTML=`<input id="chi" maxlength="500" placeholder="Message" oninput="Chat.typing()" onkeydown="if(event.key==='Enter')Chat.send()"><button id="cha" aria-label="Record voice message" onclick="Chat.act()">${MIC}</button>`}
function typing(){const i=$c('chi'),a=$c('cha');if(i&&a&&!rec){const t=!!i.value.trim();a.innerHTML=t?SEND:MIC;a.setAttribute('aria-label',t?'Send message':'Record voice message')}}
function stopAudio(){if(AU){AU.a.pause();const b=AU.btn;if(b)b.innerHTML=PLAY;mark(0);AU=null}}
function mark(p){if(!AU)return;const v=AU.btn&&AU.btn.closest('.chv');if(!v)return;const bs=v.querySelectorAll('.chbars i'),n=Math.round(p*bs.length);bs.forEach((x,i)=>x.classList.toggle('on',i<n))}
function close(){if(ch){sb.removeChannel(ch);ch=null}if(pt){clearInterval(pt);pt=null}if(rec)stop(false);stopAudio();tid=null}
function open(el,t,who,r){close();me=who;tid=t;ref=r||'';ED=null;
 el.innerHTML='<div class="chw"><div id="chl"></div>'+(who==='user'?'<div class="chq" id="chq"></div><div class="chhint" id="chh" style="padding:4px 12px 0"></div>':'')+'<div class="chbar" id="chb"></div></div>';bar();load(true);if(who==='user')chips();
 ch=sb.channel('chat'+t+Date.now()).on('postgres_changes',{event:'*',schema:'public',table:'messages',filter:'user_id=eq.'+t},()=>load()).subscribe();
 pt=setInterval(()=>{if(tid&&!document.hidden&&!rec&&list.some(m=>m.sender===me&&!m.seen))load()},4000)}
async function send(){const i=$c('chi'),b=i&&i.value.trim();if(!b||busy)return;busy=true;let r;
 if(ED){r=await sb.rpc('edit_message',{p_id:ED,p_body:b});ED=null;i.placeholder='Message'}
 else r=me==='admin'?await sb.rpc('admin_reply',{p_user:tid,p_body:b,p_ref:ref||null}):await sb.rpc('send_message',{p_body:b,p_ref:ref||null});
 busy=false;if(r.error){toast(r.error.message);return}i.value='';typing();await load(true)}
function act(){const i=$c('chi');if(i&&i.value.trim())send();else start()}
async function start(){stopAudio();try{stream=await navigator.mediaDevices.getUserMedia({audio:true})}catch(e){toast('Please allow the microphone to send voice messages');return}
 const mt=['audio/webm;codecs=opus','audio/webm','audio/mp4','audio/ogg'].find(t=>window.MediaRecorder&&MediaRecorder.isTypeSupported(t))||'';
 rec=new MediaRecorder(stream,mt?{mimeType:mt}:{});chunks=[];rec.ondataavailable=e=>{if(e.data.size)chunks.push(e.data)};rec.start();t0=Date.now();
 $c('chb').innerHTML=`<button class="gh" aria-label="Cancel recording" onclick="Chat.stop(false)">${TRASH}</button><div class="chrec"><i class="chdot"></i><span id="cht">0:00</span><span class="chhint">Recording… tap send when done</span></div><button aria-label="Send voice message" onclick="Chat.stop(true)">${SEND}</button>`;
 tm=setInterval(()=>{const s=Math.round((Date.now()-t0)/1000),t=$c('cht');if(t)t.textContent=fmt(s);if(s>=120)stop(true)},500)}
function stop(sendIt){if(!rec)return;clearInterval(tm);const r=rec,dur=Math.round((Date.now()-t0)/1000),type=(r.mimeType||'audio/webm').split(';')[0];rec=null;
 r.onstop=async()=>{stream.getTracks().forEach(t=>t.stop());bar();if(!sendIt)return;if(dur<1){toast('Hold on a little longer');return}
  const path=tid+'/'+Date.now()+'.'+(type.includes('mp4')?'m4a':type.includes('ogg')?'ogg':'webm'),up=await sb.storage.from('voice').upload(path,new Blob(chunks,{type}),{contentType:type});
  if(up.error){toast(up.error.message);return}
  const x=me==='admin'?await sb.rpc('admin_voice',{p_user:tid,p_path:path,p_dur:dur,p_ref:ref||null}):await sb.rpc('send_voice',{p_path:path,p_dur:dur,p_ref:ref||null});
  if(x.error)toast(x.error.message);else load(true)};r.stop()}
async function play(id,btn){
 if(AU&&AU.id===id){if(AU.a.paused){AU.a.play();btn.innerHTML=PAUSE}else{AU.a.pause();btn.innerHTML=PLAY}return}
 stopAudio();const m=list.find(x=>x.id===id);if(!m)return;let url=cache[id];
 if(!url){const{data,error}=await sb.storage.from('voice').createSignedUrl(m.audio_path,3600);if(error){toast(error.message);return}url=cache[id]=data.signedUrl}
 const a=new Audio(url);AU={id,a,btn};btn.innerHTML=PAUSE;
 a.ontimeupdate=()=>{if(!AU)return;mark(a.duration?a.currentTime/a.duration:0);const v=AU.btn&&AU.btn.closest('.chv'),d=v&&v.querySelector('.chvd');if(d)d.textContent=fmt(Math.round(a.currentTime))};
 a.onended=()=>{if(!AU)return;const v=AU.btn&&AU.btn.closest('.chv'),d=v&&v.querySelector('.chvd');AU.btn.innerHTML=PLAY;mark(0);if(d)d.textContent=fmt(m.dur||0);AU=null};
 a.play().catch(()=>{toast('Could not play this message');stopAudio()})}
const QS={withdraw:['How do I withdraw?','پیسے کیسے نکلوائیں؟'],deposit:['How do I deposit?','ڈیپازٹ کیسے کریں؟'],rejected:['My proof was rejected','میرا ثبوت رد ہو گیا'],referral:['How does referral work?','ریفرل کیسے کام کرتا ہے؟'],agent:['Talk to an agent','ایجنٹ سے بات کریں']};
const lg=()=>{try{return localStorage.getItem('lang')==='ur'?1:0}catch(e){return 0}};
async function chips(){const q=$c('chq');if(!q)return;q.innerHTML=Object.keys(QS).map(k=>`<button onclick="Chat.faq('${k}')">${QS[k][lg()]}</button>`).join('');
 const h=$c('chh');if(!h)return;try{if(HRS===null){const{data}=await sb.from('settings').select('text_value').eq('key','support_hours').maybeSingle();HRS=(data&&data.text_value)||''}}catch(e){HRS=''}
 if(HRS)h.textContent=(lg()?'⏰ سپورٹ کے اوقات: ':'⏰ Support hours: ')+HRS}
async function faq(k){if(busy||me!=='user')return;busy=true;const r=await sb.rpc('bot_faq',{p_key:k,p_lang:lg()?'ur':'en'});busy=false;if(r.error){toast(r.error.message);return}await load(true)}
function menu(id){const m=list.find(x=>x.id===id);if(!m)return;const o=document.createElement('div');o.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:60;display:flex;align-items:flex-end;justify-content:center';o.onclick=e=>{if(e.target===o)o.remove()};
 const can=m.kind==='text'&&Date.now()-new Date(m.created_at)<9e5;
 o.innerHTML=`<div style="background:var(--card);color:var(--ink);width:100%;max-width:520px;border-radius:22px 22px 0 0;padding:16px;display:grid;gap:8px">${can?'<button class="o" id="mE">✏️ Edit (within 15 minutes)</button>':''}<button class="o" id="mD" style="color:#e0475b">🗑 Delete</button><button class="o" id="mC">Cancel</button></div>`;document.body.appendChild(o);
 const e2=$c('mE');if(e2)e2.onclick=()=>{ED=id;o.remove();const i=$c('chi');i.value=m.body;i.placeholder='Editing message…';i.focus();typing()};
 $c('mD').onclick=async()=>{o.remove();const r=await sb.rpc('delete_message',{p_id:id});if(r.error)toast(r.error.message);else load()};
 $c('mC').onclick=()=>o.remove()}
return{open,close,typing,act,send,stop,menu,play,faq,ref:v=>{ref=v}}})();

/* ===== ui2 ===== */
/* CrownEarn UI 2: Referral page, floating Help button with chat panel */





const WA=`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>`;
function referView(){
 const pct=D.cfg.referral_percent??10,fb=+D.cfg.referral_first_bonus||0,R=D.refs||[],earned=R.reduce((a,x)=>a+(+x.earned||0),0),act=R.filter(x=>+x.tasks>0).length;
 const link=refLink(),msg='Join CrownEarn: complete simple tasks and earn PKR. '+link;
 return `<div class="hd" style="margin:4px 2px">Referral 🤝</div><div class="mute" style="margin:0 2px">Invite friends. Earn commission whenever they earn.</div>
<div class="hero" style="display:block;text-align:center"><small>Your commission</small><div class="big">${pct}%</div><small>of every task your friends complete, for as long as they use the app${fb?`<br>+ ${fb} pts when a friend completes ${D.cfg.referral_min_tasks||3} tasks`:''}</small></div>
<div class="grid3"><div class="card"><b>${R.length}</b><span class="mute">Friends</span></div><div class="card"><b>${act}</b><span class="mute">Active</span></div><div class="card"><b>${earned}</b><span class="mute">Pts earned</span></div></div>
<div class="card"><b>Your link</b><div class="sum" style="word-break:break-all"><b dir="ltr">${esc(link)}</b></div><div class="two"><button class="g" onclick="copyRef()">Copy link</button><a href="https://wa.me/?text=${encodeURIComponent(msg)}" target="_blank" rel="noopener noreferrer" style="background:#25d366;color:#fff;display:inline-flex;align-items:center;justify-content:center;gap:8px;font-weight:700;border-radius:14px;padding:10px 14px;text-decoration:none;border-bottom:4px solid #1a9e4b">${WA} WhatsApp</a></div><div class="mute" style="margin-top:8px">Your code: <b>${esc(P.ref_code)}</b></div></div>
<div class="card"><b>How it works</b><div class="mute">1. Send your link to a friend, for example on WhatsApp.<br>2. They sign up and complete tasks.<br>3. You get ${pct}% extra on every approved task. For example, a friend earns 500 pts and you get ${Math.floor(500*pct/100)} pts. It does not reduce their earnings.</div></div>
<div class="sec">Your friends (${R.length})</div>${R.map(x=>`<div class="card"><div class="row"><b>${esc(x.name)} <span class="mute">· ID ${esc(x.fid||'')}</span></b><span class="rw">+${x.earned} pts</span></div><div class="mute">Joined ${new Date(x.joined).toLocaleDateString()} · ${x.tasks??0} tasks done${+x.tasks>0?' · active':' · not started yet'}</div></div>`).join('')||'<div class="card mute">No friends yet. Share your link to get started.</div>'}`}
const AGENT=n=>`<svg width="${n}" height="${n}" viewBox="0 0 64 64" aria-hidden="true"><path d="M12 62c0-12 9-18 20-18s20 6 20 18z" fill="#6a4cf5"/><rect x="28" y="40" width="8" height="8" rx="3" fill="#f2c09a"/><circle cx="32" cy="30" r="15" fill="#ffd9b3"/><path d="M17 29c0-10 6-17 15-17s15 7 15 17c-3-6-8-9-15-9s-12 3-15 9z" fill="#4a3200"/><path d="M15 31v-3c0-11 7-19 17-19s17 8 17 19v3" fill="none" stroke="#2b2b3a" stroke-width="3.5" stroke-linecap="round"/><rect x="10" y="28" width="7" height="12" rx="3.5" fill="#2b2b3a"/><rect x="47" y="28" width="7" height="12" rx="3.5" fill="#2b2b3a"/><path d="M50.5 39c0 7-6 10-13 10" fill="none" stroke="#2b2b3a" stroke-width="2.5" stroke-linecap="round"/><circle cx="36.5" cy="49" r="3" fill="#2b2b3a"/><circle cx="26.5" cy="31" r="2" fill="#4a3200"/><circle cx="37.5" cy="31" r="2" fill="#4a3200"/><ellipse cx="23" cy="36" rx="3" ry="2" fill="#ff9aa2" opacity=".7"/><ellipse cx="41" cy="36" rx="3" ry="2" fill="#ff9aa2" opacity=".7"/><path d="M27 38c2.5 3 7.5 3 10 0" fill="none" stroke="#4a3200" stroke-width="2" stroke-linecap="round"/></svg>`;
function fabBadge(){const b=$('fbd');if(b){b.style.display=unread?'inline-block':'none';b.textContent=''}}
function mountFab(){if(!P||$('fab'))return;document.body.insertAdjacentHTML('beforeend',`<button id="fab" aria-label="Customer service" onclick="openHelp()" style="position:fixed;right:14px;bottom:calc(82px + env(safe-area-inset-bottom,0px));height:46px;border-radius:23px;border:2px solid var(--gold);background:#fff;color:#241b4b;box-shadow:0 6px 18px rgba(0,0,0,.25);z-index:25;display:flex;align-items:center;gap:3px;padding:0 10px 0 3px;font-weight:700;font-size:10px;line-height:1.1">${AGENT(34)}<span style="text-align:left">Customer<br>Service</span><i class="bdg" id="fbd" style="position:absolute;top:-4px;right:-4px;display:none"></i></button>`);fabBadge()}
function openHelp(){if($('hp')||!window.Chat)return;const d=document.createElement('div');d.id='hp';d.className='ov';d.style.zIndex=40;d.onclick=e=>{if(e.target===d)closeHelp()};
 d.innerHTML=`<div class="sh" style="padding:14px"><div class="row"><div class="hd gr" style="font-size:20px">${AGENT(30)} Customer Service</div><button class="o" style="padding:4px 12px" onclick="closeHelp()" aria-label="Close">✕</button></div>${helpView().replace(/<div class="hd"[^>]*>.*?<\/div>/,'')}</div>`;
 document.body.appendChild(d);Chat.open($('chat'),U.id,'user',helpRef);fetchHours()}
function closeHelp(){if(window.Chat)Chat.close();const d=$('hp');if(d)d.remove()}
function patch2(){if(tab==='wallet'){const bd=[...document.querySelectorAll('#app .sec')].find(e=>e.textContent==='My badges');if(bd){const c=bd.nextElementSibling;if(c)c.remove();bd.remove()}}}

/* ===== extras ===== */
/* CrownEarn Home extras: announcement, missions, weekly top earners, recent payouts */
async function homeExtras(){
 const[a,b,r]=await Promise.all([sb.from('settings').select('text_value').eq('key','announcement').single(),sb.rpc('weekly_board'),sb.rpc('recent_payouts')]);
 if(tab!=='home')return;
 const an=a.data&&a.data.text_value,e1=$('ann');if(e1&&an)e1.innerHTML=`<div class="card" style="border:2px solid var(--gold)"><b>📢 Announcement</b><div>${esc(an)}</div></div>`;
 const bd=b.data||{},top=bd.top||[],me=bd.me,pay=Array.isArray(r.data)?r.data:[],hx=$('hx');if(!hx)return;
 const medal=i=>['🥇','🥈','🥉'][i]||(i+1)+'.';
 const done=D.subs.filter(s=>s.user_id===U.id&&s.status==='approved').length,mine=D.tasks.filter(t=>t.owner===U.id).length;
 const M=[['🌱','Complete your first task',done,1],['⭐','Complete 5 tasks',done,5],['🔥','Keep a 3-day streak',P.streak,3],['🤝','Invite a friend',D.refs.length,1],['📣','Give your first task',mine,1],['💸','Make your first withdrawal',D.wds.length,1]];
 const open=M.filter(m=>m[2]<m[3]).slice(0,3),st=P.streak,BG=[['🌱','First task',done>=1],['🔥','3-day streak',st>=3],['💸','First withdrawal',D.wds.length>=1],['🏆','Gold member',done>=3]],lv=1+Math.floor((done*100+st*20)/200);
 hx.innerHTML=`<div class="sec">Missions</div>${open.map(m=>`<div class="card"><div class="row"><span>${m[0]} ${m[1]}</span><span class="tag">${Math.min(m[2],m[3])}/${m[3]}</span></div><div class="pb" style="background:var(--soft);height:10px"><i style="width:${Math.min(100,m[2]/m[3]*100)}%"></i></div></div>`).join('')||'<div class="card mute">All missions complete. Well done! 🎉</div>'}
<div class="sec">Top earners this week 🏆</div><div class="card">${top.length?top.map((t,i)=>`<div class="row" style="${t.me?'font-weight:700':''}"><span>${medal(i)} ${esc(t.name)}${t.me?' (you)':''}</span><span class="mute">${t.pts} pts</span></div>`).join(''):'<div class="mute">No one yet. Complete a task to be first!</div>'}${me&&!top.some(t=>t.me)?`<div class="mute" style="margin-top:6px">You: #${me.rank} · ${me.pts} pts</div>`:''}</div>
<div class="sec">My badges · Level ${lv}</div><div class="card"><div class="bd">${BG.map(b=>`<div class="${b[2]?'on':''}"><span>${b[0]}</span>${b[1]}</div>`).join('')}</div></div>
${pay.length?`<div class="sec">Recent payouts ✅</div>${pay.map(p=>`<div class="card row"><span>${esc(p.name)}</span><span class="rw">PKR ${p.amt} paid</span></div>`).join('')}`:''}`}

/* ===== lang ===== */
/* CrownEarn Urdu: language switch, right-to-left layout, translations (part 1: main screens) */
(()=>{
const T={'Home':'ہوم','Tasks':'ٹاسکس','Add Task':'ٹاسک دیں','Referral':'ریفرل','Wallet':'والٹ',
'How much will you earn today?':'آج کتنا کمائیں گے؟','Your earnings':'آپ کی کمائی','PKR':'روپے',
'CrownEarn says: Wow! You can withdraw now':'پیسو کہتا ہے: واہ! اب آپ ودڈرا کر سکتے ہیں','Daily bonus':'روزانہ بونس','Come back tomorrow':'کل پھر آئیں',
'Deposit':'ڈپازٹ','Add task':'ٹاسک دیں','Withdraw':'ودڈرا','Tasks for you':'آپ کے لیے ٹاسکس','Open':'کھولیں','Under review':'جانچ جاری','See all tasks':'سب ٹاسکس دیکھیں','Submit proof':'ثبوت دیں','Done ✔':'مکمل ✔','Rejected':'رد',
'No tasks right now. Check back soon!':'ابھی کوئی ٹاسک نہیں۔ جلد دوبارہ دیکھیں!','All':'سب','App install':'ایپ انسٹال','Sign up':'سائن اپ','Survey':'سروے','Other':'دیگر','No tasks in this category right now.':'اس قسم میں ابھی کوئی ٹاسک نہیں۔',
'My earnings (withdrawable)':'میری کمائی (ودڈرا کے قابل)','Task credit (deposit)':'ٹاسک کریڈٹ (ڈپازٹ)','Use it to give tasks to others':'دوسروں کو ٹاسک دینے کے لیے','My requests':'میری درخواستیں','Pending':'انتظار میں','Paid ✔':'ادا ✔','Approved ✔':'منظور ✔',
'My badges':'میرے بیجز','First task':'پہلا ٹاسک','3-day streak':'3 دن کا سلسلہ','First withdrawal':'پہلا ودڈرا','Gold member':'گولڈ ممبر','Transactions':'لین دین','Task reward':'ٹاسک کا انعام','Daily bonus ':'روزانہ بونس','Withdrawal':'ودڈرا','Withdrawal refund':'ودڈرا کی واپسی','Task created':'ٹاسک بنایا','Task refund':'ٹاسک کی واپسی','Friend commission':'دوست کا کمیشن','Friend bonus':'دوست کا بونس',
'Log out':'لاگ آؤٹ','Open Admin Panel':'ایڈمن پینل کھولیں','Payment receipts':'ادائیگی کی رسیدیں','Payment sent':'ادائیگی بھیج دی گئی','Terms and Privacy':'شرائط اور پرائیویسی','No transactions yet.':'ابھی کوئی لین دین نہیں۔',
'Invite friends. Earn commission whenever they earn.':'دوستوں کو بلائیں۔ جب وہ کمائیں تو آپ کو کمیشن ملے۔','Your commission':'آپ کا کمیشن','of every task your friends complete, for as long as they use the app':'آپ کے دوستوں کے ہر مکمل ٹاسک کا، جب تک وہ ایپ استعمال کریں',
'Friends':'دوست','Active':'فعال','Pts earned':'کمائے پوائنٹس','Your link':'آپ کا لنک','Copy link':'لنک کاپی کریں','WhatsApp':'واٹس ایپ','Your code:':'آپ کا کوڈ:','How it works':'کیسے کام کرتا ہے',
'1. Send your link to a friend, for example on WhatsApp.':'1. اپنا لنک دوست کو بھیجیں، مثلاً واٹس ایپ پر۔','2. They sign up and complete tasks.':'2. وہ سائن اپ کر کے ٹاسک مکمل کرتے ہیں۔','No friends yet. Share your link to get started.':'ابھی کوئی دوست نہیں۔ شروع کرنے کے لیے اپنا لنک بھیجیں۔',
'Customer':'کسٹمر','Service':'سروس','Customer Service':'کسٹمر سروس','Support hours':'سپورٹ کے اوقات','You can write at any time. We reply during support hours.':'آپ کسی بھی وقت لکھ سکتے ہیں۔ ہم سپورٹ کے اوقات میں جواب دیں گے۔',
'General':'عمومی','Task':'ٹاسک','Message':'پیغام','🔒 Messages are cleared after 24 hours':'🔒 پیغام 24 گھنٹے بعد صاف ہو جاتے ہیں','No messages yet. Say hello 👋':'ابھی کوئی پیغام نہیں۔ سلام کریں 👋','Today':'آج','Yesterday':'کل',
'Missions':'مشنز','Complete your first task':'اپنا پہلا ٹاسک مکمل کریں','Complete 5 tasks':'5 ٹاسک مکمل کریں','Keep a 3-day streak':'3 دن کا سلسلہ رکھیں','Invite a friend':'دوست کو بلائیں','Give your first task':'اپنا پہلا ٹاسک دیں','Make your first withdrawal':'اپنا پہلا ودڈرا کریں',
'Top earners this week':'ہفتے کے بہترین کمانے والے','Recent payouts':'حالیہ ادائیگیاں','No one yet. Complete a task to be first!':'ابھی کوئی نہیں۔ ٹاسک مکمل کر کے پہلے بنیں!','All missions complete. Well done!':'سب مشن مکمل۔ شاباش!','Announcement':'اعلان'};
const P=[[/^Hello, (.+) 👋$/,n=>`السلام علیکم ${n} 👋`],[/^CrownEarn says: Great job! Only (\d+) points left to withdraw 💪$/,n=>`پیسو کہتا ہے: شاباش! ودڈرا میں بس ${n} پوائنٹس باقی 💪`],
[/^(\d+)-day streak 🔥$/,n=>`${n} دن کا سلسلہ 🔥`],[/^Claim daily bonus \+(\d+)$/,n=>`روزانہ بونس لیں +${n}`],[/^([+-]?\d+) pts · PKR (\d+)$/,(a,b)=>`${a} پوائنٹس · ${b} روپے`],
[/^(\d+) available · every proof is reviewed$/,n=>`${n} دستیاب · ہر ثبوت کی جانچ ہوتی ہے`],[/^(.+) · Level (\d+)$/,(n,l)=>`${n} · لیول ${l}`],[/^(\d+) tasks done · (\d+) withdrawals$/,(a,b)=>`${a} ٹاسک مکمل · ${b} ودڈرا`],
[/^(\d+) pts · (\d+) pts = PKR 1$/,(a,b)=>`${a} پوائنٹس · ${b} پوائنٹ = 1 روپیہ`],[/^Earn (\d+) more points to withdraw$/,n=>`ودڈرا کے لیے ${n} پوائنٹس اور کمائیں`],
[/^PKR (\d+)$/,n=>`${n} روپے`],[/^\+PKR (\d+)$/,n=>`+${n} روپے`],[/^([+-]?\d+) pts$/,n=>`${n} پوائنٹس`],[/^✅ PKR (\d+) paid via (.+)$/,(n,m)=>`✅ ${n} روپے ادا (${m} کے ذریعے)`],[/^Transaction ID: (.+)$/,x=>`ٹرانزیکشن آئی ڈی: ${x}`],
[/^\+ (\d+) pts when a friend completes (\d+) tasks$/,(n,k)=>`+ ${n} پوائنٹس جب دوست ${k} ٹاسک مکمل کرے`],
[/^3\. You get (\d+)% extra on every approved task\. For example, a friend earns 500 pts and you get (\d+) pts\. It does not reduce their earnings\.$/,(a,b)=>`3. آپ کو ہر منظور شدہ ٹاسک پر ${a}% اضافی ملتا ہے۔ مثلاً دوست 500 پوائنٹس کمائے تو آپ کو ${b} ملتے ہیں۔ اس سے ان کی کمائی کم نہیں ہوتی۔`],
[/^Your friends \((\d+)\)$/,n=>`آپ کے دوست (${n})`],[/^· ID (.+)$/,x=>`· آئی ڈی ${x}`],[/^Joined (.+) · (\d+) tasks done · (active|not started yet)$/,(d,n,a)=>`شامل ہوئے ${d} · ${n} ٹاسک مکمل · ${a==='active'?'فعال':'ابھی شروع نہیں کیا'}`],
[/^My badges · Level (\d+)$/,n=>`میرے بیجز · لیول ${n}`],[/^(.+) \(you\)$/,n=>`${n} (آپ)`],[/^You: #(\d+) · (\d+) pts$/,(r,p)=>`آپ: #${r} · ${p} پوائنٹس`]];
window.LangAdd=(t,p)=>{Object.assign(T,t);if(p)P.push(...p)};
const tr=s=>{const k=s.trim();if(!k)return null;if(T[k]!=null)return T[k];for(const[r,f]of P){const m=k.match(r);if(m)return f(...m.slice(1))}
 let m=k.match(/^([^\sA-Za-z0-9+\-.:(#]+) (.+)$/);if(m&&T[m[2]]!=null)return m[1]+' '+T[m[2]];
 m=k.match(/^(.+?) ([^\sA-Za-z0-9+\-.:)]+)$/);if(m&&T[m[1]]!=null)return T[m[1]]+' '+m[2];return null};
let lang='en';try{lang=localStorage.getItem('lang')||'en'}catch(e){}
function one(n){const k=n.__en!=null?n.__en:n.nodeValue;let out=k;if(lang==='ur'){const t=tr(k);if(t!=null)out=k.match(/^\s*/)[0]+t+k.match(/\s*$/)[0]}if(out!==n.nodeValue){if(n.__en==null)n.__en=k;n.nodeValue=out}}
function attrs(root){root.querySelectorAll('[placeholder],[aria-label]').forEach(e=>{for(const a of['placeholder','aria-label']){if(!e.hasAttribute(a))continue;const k=e['__'+a]!=null?e['__'+a]:e.getAttribute(a),t=lang==='ur'?tr(k):null,v=t!=null?t:k;if(v!==e.getAttribute(a)){if(e['__'+a]==null)e['__'+a]=k;e.setAttribute(a,v)}}})}
function apply(){const root=document.body;if(!root)return;const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){const p=n.parentNode&&n.parentNode.nodeName;if(p==='SCRIPT'||p==='STYLE')continue;one(n)}attrs(root);btn()}
function btn(){const a=document.getElementById('app');if(!a||document.getElementById('lt'))return;a.insertAdjacentHTML('afterbegin',`<div id="lt" style="display:flex;justify-content:flex-end"><button class="o" style="padding:2px 12px;font-size:13px;border-bottom-width:2px" onclick="Lang.toggle()" aria-label="Language">🌐 ${lang==='ur'?'English':'اردو'}</button></div>`)}
function mode(){const h=document.documentElement;h.lang=lang;h.dir=lang==='ur'?'rtl':'ltr';if(lang==='ur'&&!document.getElementById('lgs')){document.head.insertAdjacentHTML('beforeend','<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;600;700&display=swap"><style id="lgs">html[lang=ur] body,html[lang=ur] button,html[lang=ur] input,html[lang=ur] .hd,html[lang=ur] .sec,html[lang=ur] .big{font-family:"Noto Naskh Arabic","Sora",system-ui,sans-serif}html[lang=ur] input:not([inputmode]){text-align:start;unicode-bidi:plaintext}html[lang=ur] body{line-height:1.8}</style>')}}
function set(l){lang=l;try{localStorage.setItem('lang',l)}catch(e){}mode();const b=document.getElementById('lt');if(b)b.remove();apply()}
window.Lang={toggle:()=>set(lang==='ur'?'en':'ur'),set,tr};
let q=false;const go=()=>{if(q)return;q=true;requestAnimationFrame(()=>{q=false;apply()})};
mode();apply();if(window.MutationObserver)new MutationObserver(go).observe(document.body,{childList:true,subtree:true,characterData:true});
})();

/* ===== lang2 ===== */
/* CrownEarn Urdu part 2: Add Task form, login, terms, sheets, messages and errors */
(function w(){if(!window.LangAdd)return setTimeout(w,60);
const ST={'Under review':'جانچ جاری','Live ✅':'لائیو ✅','Completed':'مکمل','Rejected':'رد'};
LangAdd({
'Add your task':'اپنا ٹاسک دیں','Paste your link, set the price, and people will complete it for you':'اپنا لنک ڈالیں، قیمت طے کریں، لوگ آپ کا ٹاسک مکمل کریں گے','Task credit:':'ٹاسک کریڈٹ:','Task type':'ٹاسک کی قسم',
'App installs, sign-ups and surveys work best. Follow, subscribe or view tasks on YouTube or TikTok can break their policies.':'ایپ انسٹال، سائن اپ اور سروے بہتر چلتے ہیں۔ یوٹیوب یا ٹک ٹاک پر فالو، سبسکرائب یا ویوز کے ٹاسک ان کی پالیسی کے خلاف ہو سکتے ہیں۔',
'Task title':'ٹاسک کا عنوان','Link':'لنک','Price per task (PKR)':'قیمت فی ٹاسک (روپے)','Number of people':'لوگوں کی تعداد','Total cost:':'کل خرچ:','Create task':'ٹاسک بنائیں','Proofs to review':'جانچ کے لیے ثبوت','Approve':'منظور','Reject':'رد کریں','My tasks':'میرے ٹاسکس','Proof:':'ثبوت:','View screenshot':'اسکرین شاٹ دیکھیں',
'Task picture (app icon, game logo or video thumbnail)':'ٹاسک کی تصویر (ایپ آئیکن، گیم لوگو یا ویڈیو تھمب نیل)','e.g. Install my app and open it':'مثلاً: میرا ایپ انسٹال کریں اور کھولیں',
'Terms of use':'استعمال کی شرائط','Privacy':'پرائیویسی','Back':'واپس',
'• CrownEarn is a task platform. Points are earned only for tasks that are reviewed and approved.':'• کراؤن ارن ایک ٹاسک پلیٹ فارم ہے۔ پوائنٹس صرف ان ٹاسکس پر ملتے ہیں جن کی جانچ ہو کر منظوری ہو۔',
'• One person, one account. Fake accounts and repeated or false proofs lead to a permanent ban and loss of points.':'• ایک شخص، ایک اکاؤنٹ۔ جعلی اکاؤنٹ اور بار بار یا جھوٹے ثبوت پر مستقل پابندی لگے گی اور پوائنٹس ضبط ہوں گے۔',
'• Withdrawals are reviewed and paid manually to JazzCash or Easypaisa. The minimum withdrawal and the rate are shown in the app and may change.':'• ودڈرا کی جانچ ہوتی ہے اور ادائیگی ہاتھ سے JazzCash یا Easypaisa پر کی جاتی ہے۔ کم از کم ودڈرا اور ریٹ ایپ میں دکھائے جاتے ہیں اور بدل سکتے ہیں۔',
'• Deposits are used only to pay for tasks you create. Rejected tasks are refunded to your task credit.':'• ڈپازٹ صرف آپ کے بنائے ہوئے ٹاسکس کی ادائیگی کے لیے استعمال ہوتا ہے۔ رد شدہ ٹاسک کی رقم آپ کے ٹاسک کریڈٹ میں واپس آ جاتی ہے۔',
'• Do not post tasks that break the rules of other platforms, or that are illegal, adult or misleading.':'• ایسے ٹاسک نہ بنائیں جو دوسرے پلیٹ فارمز کے اصولوں کے خلاف ہوں، یا غیر قانونی، غیر اخلاقی یا گمراہ کن ہوں۔',
'• We may reject proofs, tasks or withdrawals that look fraudulent.':'• ہم مشکوک ثبوت، ٹاسک یا ودڈرا رد کر سکتے ہیں۔',
'• We store your name, email, task activity, balances and messages so the app can work.':'• ایپ چلانے کے لیے ہم آپ کا نام، ای میل، ٹاسک کی سرگرمی، بیلنس اور پیغامات محفوظ رکھتے ہیں۔',
'• Proof screenshots and voice notes are private. Only you, the task owner (for proofs) and the admin can see them.':'• ثبوت کے اسکرین شاٹ اور وائس پیغام نجی ہیں۔ صرف آپ، ٹاسک کا مالک (ثبوت کے لیے) اور ایڈمن انہیں دیکھ سکتے ہیں۔',
'• We do not sell your data. We never ask for your password or card details.':'• ہم آپ کا ڈیٹا نہیں بیچتے۔ ہم آپ کا پاس ورڈ یا کارڈ کی تفصیل کبھی نہیں مانگتے۔',
'• Paid withdrawals may appear in the Recent payouts list with a masked name (like A***) and the amount.':'• ادا شدہ ودڈرا "حالیہ ادائیگیاں" میں چھپے ہوئے نام (جیسے A***) اور رقم کے ساتھ نظر آ سکتے ہیں۔',
'• To delete your account or data, message us in Help.':'• اکاؤنٹ یا ڈیٹا مٹانے کے لیے Customer Service میں پیغام کریں۔',
'Complete tasks. Earn rewards. Withdraw to PKR.':'ٹاسک کریں۔ انعام کمائیں۔ روپوں میں نکالیں۔','Email':'ای میل','Password':'پاس ورڈ','Log in':'لاگ اِن','New here?':'نئے ہیں؟','Create account':'اکاؤنٹ بنائیں','Your name':'آپ کا نام','Referral code (optional)':'ریفرل کوڈ (اختیاری)','Already have an account?':'پہلے سے اکاؤنٹ ہے؟',
'6+ characters':'6 یا زیادہ حروف','Name':'نام','Optional':'اختیاری','Link or username':'لنک یا یوزرنیم','Username or comment':'یوزرنیم یا تبصرہ',
'You will receive:':'آپ کو ملیں گے:','Account number':'اکاؤنٹ نمبر','Double-check your number before sending.':'بھیجنے سے پہلے اپنا نمبر دوبارہ دیکھ لیں۔','Send request':'درخواست بھیجیں',
'Do the task first, then upload a screenshot that shows it is done.':'پہلے ٹاسک کریں، پھر اسکرین شاٹ اپلوڈ کریں جو ثبوت ہو کہ کام ہو گیا۔','Screenshot':'اسکرین شاٹ','Note (optional)':'نوٹ (اختیاری)','Send proof':'ثبوت بھیجیں','Awesome!':'شاباش!','Uploading…':'اپلوڈ ہو رہا ہے…',
'Make a deposit':'ڈپازٹ کریں','Send the money, enter the transaction ID, and your credit is added after review.':'رقم بھیجیں، ٹرانزیکشن آئی ڈی لکھیں، جانچ کے بعد آپ کا کریڈٹ شامل ہو جائے گا۔','Send money to this number:':'اس نمبر پر رقم بھیجیں:','Amount (PKR)':'رقم (روپے)','Transaction ID':'ٹرانزیکشن آئی ڈی',
'Recording… tap send when done':'ریکارڈنگ… ختم ہو تو بھیجیں دبائیں','🚫 This message was deleted':'🚫 یہ پیغام مٹا دیا گیا','✏️ Edit (within 15 minutes)':'✏️ ایڈٹ (15 منٹ کے اندر)','🗑 Delete':'🗑 ڈیلیٹ','Cancel':'منسوخ','Editing message…':'پیغام ایڈٹ ہو رہا ہے…',
'Request sent':'درخواست بھیج دی گئی','Task submitted':'ٹاسک جمع ہو گیا','Daily bonus claimed':'روزانہ بونس مل گیا','Link copied':'لنک کاپی ہو گیا','It goes live after the admin reviews it':'ایڈمن کی جانچ کے بعد یہ لائیو ہو جائے گا',
'Proof sent. Points arrive after review.':'ثبوت بھیج دیا گیا۔ جانچ کے بعد پوائنٹس ملیں گے۔','Request sent. Waiting for approval.':'درخواست بھیج دی گئی۔ منظوری کا انتظار ہے۔','Choose a screenshot first':'پہلے اسکرین شاٹ چنیں','Enter your proof':'اپنا ثبوت لکھیں',
'Enter a task title':'ٹاسک کا عنوان لکھیں','Enter a valid link starting with https://':'درست لنک لکھیں جو https:// سے شروع ہو','Minimum is PKR 2 per task and 5 people':'کم از کم 2 روپے فی ٹاسک اور 5 لوگ','Not enough credit. Please deposit first.':'کریڈٹ کم ہے۔ پہلے ڈپازٹ کریں۔',
'Enter a valid number, like 03001234567':'درست نمبر لکھیں، جیسے 03001234567','Enter the transaction ID':'ٹرانزیکشن آئی ڈی لکھیں','Enter your email and a password of 6+ characters':'اپنی ای میل اور 6 یا زیادہ حروف کا پاس ورڈ لکھیں','Check your email to confirm, then log in':'تصدیق کے لیے اپنی ای میل دیکھیں، پھر لاگ اِن کریں',
'Please allow the microphone to send voice messages':'وائس پیغام بھیجنے کے لیے مائیک کی اجازت دیں','Hold on a little longer':'تھوڑا اور ریکارڈ کریں','Could not play this message':'یہ پیغام چل نہیں سکا',
'Login required':'پہلے لاگ اِن کریں','Not enough credit':'کریڈٹ کم ہے','Not enough points':'پوائنٹس کم ہیں','Invalid account number':'اکاؤنٹ نمبر درست نہیں','Task not available':'ٹاسک دستیاب نہیں','You cannot do your own task':'آپ اپنا ٹاسک خود نہیں کر سکتے','Task is full':'ٹاسک بھر چکا ہے',
'This account is blocked. Please contact support in Help.':'یہ اکاؤنٹ بلاک ہے۔ براہ کرم Customer Service سے رابطہ کریں۔','This screenshot was already used. Please upload your own new screenshot.':'یہ اسکرین شاٹ پہلے استعمال ہو چکا ہے۔ اپنا نیا اسکرین شاٹ اپلوڈ کریں۔',
'Too many messages. Please wait a while.':'بہت زیادہ پیغام۔ تھوڑی دیر انتظار کریں۔','You can edit within 15 minutes':'آپ 15 منٹ کے اندر ایڈٹ کر سکتے ہیں','Invalid login credentials':'ای میل یا پاس ورڈ غلط ہے','User already registered':'یہ ای میل پہلے سے رجسٹرڈ ہے','Email not confirmed':'ای میل کی تصدیق نہیں ہوئی',
'Invalid title or link':'عنوان یا لنک درست نہیں','Message must be 1 to 500 characters':'پیغام 1 سے 500 حروف کا ہونا چاہیے'
},[
[/^PKR (\d+) per task · (\d+) people · (.+)$/,(a,b,s)=>`${a} روپے فی ٹاسک · ${b} لوگ · ${ST[s]||s}`],[/^(\d+) \/ (\d+) done$/,(a,b)=>`${a} / ${b} مکمل`],[/^edited · (.+)$/,x=>`ایڈٹ شدہ · ${x}`],
[/^After review, PKR (\d+) will reach your (.+)$/,(n,m)=>`جانچ کے بعد ${n} روپے آپ کے ${m} میں آئیں گے`],[/^\+(\d+) points · keep your streak going!$/,n=>`+${n} پوائنٹس · سلسلہ جاری رکھیں!`],
[/^Minimum deposit is PKR (\d+)$/,n=>`کم از کم ڈپازٹ ${n} روپے ہے`],[/^Minimum withdrawal is (\d+) points$/,n=>`کم از کم ودڈرا ${n} پوائنٹس ہے`]]);
if(window.Lang)Lang.set((function(){try{return localStorage.getItem('lang')||'en'}catch(e){return'en'}})());
})();

/* ===== notify ===== */
/* CrownEarn notifications: bell, list, live updates (English and Urdu) */
(()=>{
const lg=()=>{try{return localStorage.getItem('lang')==='ur'?'ur':'en'}catch(e){return'en'}};
const TPL={
deposit_ok:{en:d=>['Deposit approved ✅',`PKR ${d.amt} was added to your task credit.`],ur:d=>['ڈپازٹ منظور ✅',`${d.amt} روپے آپ کے ٹاسک کریڈٹ میں شامل ہو گئے۔`]},
deposit_no:{en:d=>['Deposit rejected ❌','We could not verify your deposit. Please check the transaction ID or contact Customer Service.'],ur:d=>['ڈپازٹ رد ❌','ہم آپ کا ڈپازٹ تصدیق نہیں کر سکے۔ ٹرانزیکشن آئی ڈی دیکھیں یا کسٹمر سروس سے رابطہ کریں۔']},
wd_paid:{en:d=>['Withdrawal paid 💸',`PKR ${d.amt} was sent to your ${d.method}.${d.txn?' Transaction ID: '+d.txn:''}`],ur:d=>['ودڈرا ادا ہو گیا 💸',`${d.amt} روپے آپ کے ${d.method} میں بھیج دیے گئے۔${d.txn?' ٹرانزیکشن آئی ڈی: '+d.txn:''}`]},
wd_no:{en:d=>['Withdrawal rejected ❌',`Your ${d.pts} points were returned to your balance. Contact Customer Service for details.`],ur:d=>['ودڈرا رد ❌',`آپ کے ${d.pts} پوائنٹس آپ کے بیلنس میں واپس آ گئے۔ تفصیل کے لیے کسٹمر سروس سے رابطہ کریں۔`]},
proof_ok:{en:d=>['Task approved ✅',`+${d.pts} points for "${d.title}".`],ur:d=>['ٹاسک منظور ✅',`"${d.title}" کے +${d.pts} پوائنٹس مل گئے۔`]},
proof_no:{en:d=>['Proof rejected ❌',`"${d.title}"${d.reason?': '+d.reason:'.'}`],ur:d=>['ثبوت رد ❌',`"${d.title}"${d.reason?': '+d.reason:'۔'}`]},
task_live:{en:d=>['Your task is live ⭐',`"${d.title}" was approved and is now visible to everyone.`],ur:d=>['آپ کا ٹاسک لائیو ہو گیا ⭐',`"${d.title}" منظور ہو گیا اور اب سب کو نظر آ رہا ہے۔`]},
task_no:{en:d=>['Task rejected ❌',`"${d.title}" was not approved. PKR ${d.amt} was returned to your task credit.`],ur:d=>['ٹاسک رد ❌',`"${d.title}" منظور نہیں ہوا۔ ${d.amt} روپے آپ کے ٹاسک کریڈٹ میں واپس آ گئے۔`]},
blocked:{en:()=>['Account blocked 🚫','Please contact Customer Service.'],ur:()=>['اکاؤنٹ بلاک 🚫','براہ کرم کسٹمر سروس سے رابطہ کریں۔']},
unblocked:{en:()=>['Account unblocked ✅','You can use the app again.'],ur:()=>['اکاؤنٹ بحال ✅','اب آپ ایپ دوبارہ استعمال کر سکتے ہیں۔']},
announcement:{en:d=>['Announcement 📢',d.text],ur:d=>['اعلان 📢',d.text]}};
const fmt=n=>{const t=TPL[n.kind];return t?t[lg()](n.data||{}):['Notification','']};
const ready=()=>typeof P!=='undefined'&&P&&typeof sb!=='undefined';
const keep=()=>((typeof D!=='undefined'&&D.cfg&&+D.cfg.notif_keep_days)||2)*864e5;
const cutAt=()=>{let c=0;try{c=+localStorage.getItem('ntClear')||0}catch(e){}return Math.max(Date.now()-keep(),c)};
function lazyClean(){try{const k='ntClean',l=+localStorage.getItem(k)||0;if(Date.now()-l>216e5){localStorage.setItem(k,String(Date.now()));sb.rpc('cleanup_old')}}catch(e){}}
let N=[],raf=0;
const unread=()=>{const t=new Date(P.notif_read_at||0);return N.filter(n=>new Date(n.created_at)>t).length};
function badge(){const b=document.getElementById('bdgN');if(!b||!ready())return;const u=unread();b.style.display=u?'inline-block':'none';b.textContent=''}
async function load(){if(!ready())return;const{data,error}=await sb.from('notifications').select('*').order('id',{ascending:false}).limit(40);if(error)return;const c=cutAt();N=(data||[]).filter(n=>new Date(n.created_at)>c);badge();lazyClean()}
function ensure(){if(!ready())return;const row=document.getElementById('lt'),b=document.getElementById('bell');
 if(b){if(row&&b.parentNode!==row){row.insertAdjacentElement('afterbegin',b);row.style.gap='6px';const nb=document.getElementById('nb');if(nb)nb.remove()}return}
 const html='<button id="bell" class="o" aria-label="Notifications" onclick="Notify.open()" style="padding:2px 10px;font-size:15px;border-bottom-width:2px">🔔<i class="bdg" id="bdgN" style="display:none;margin-left:2px"></i></button>';
 if(row){row.insertAdjacentHTML('afterbegin',html);row.style.gap='6px'}else{const a=document.getElementById('app');if(a)a.insertAdjacentHTML('afterbegin','<div id="nb" style="display:flex;justify-content:flex-end">'+html+'</div>')}badge()}
const when=d=>new Date(d).toLocaleString([],{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'});
async function open(){if(!ready())return;await load();const t0=new Date(P.notif_read_at||0),ur=lg()==='ur';
 const dy=Math.round(keep()/864e5),nt=N.length?`<div class="row" style="margin:6px 0"><span class="mute" style="font-size:12px;flex:1">${ur?dy+' دن سے پرانے نوٹیفکیشن خود ہٹ جاتے ہیں':'Older than '+dy+' day(s) are removed automatically'}</span><button class="o" style="padding:4px 12px" onclick="Notify.clear()">🗑 ${ur?'سب صاف کریں':'Clear all'}</button></div>`:'';
 const o=document.createElement('div');o.id='nl';o.className='ov';o.style.zIndex=40;o.onclick=e=>{if(e.target===o)o.remove()};
 o.innerHTML=`<div class="sh" style="padding:14px"><div class="row"><div class="hd" style="font-size:20px">🔔 ${ur?'نوٹیفکیشن':'Notifications'}</div><button class="o" style="padding:4px 12px" aria-label="Close" onclick="document.getElementById('nl').remove()">✕</button></div>${nt}${N.length?N.map(n=>{const[a,b]=fmt(n),nw=new Date(n.created_at)>t0;return `<div class="card" style="${nw?'border-color:var(--gold);border-width:2px':''}"><b>${esc(a)}</b><div>${esc(b)}</div><div class="mute" style="font-size:12px">${when(n.created_at)}</div></div>`}).join(''):`<div class="card mute">${ur?'ابھی کوئی نوٹیفکیشن نہیں۔':'No notifications yet.'}</div>`}</div>`;
 document.body.appendChild(o);
 if(unread()){await sb.rpc('mark_notifs_read');P.notif_read_at=new Date().toISOString();badge()}}
async function clear(){try{localStorage.setItem('ntClear',String(Date.now()))}catch(e){}await sb.rpc('clear_my_notifs');N=[];if(typeof P!=='undefined'&&P)P.notif_read_at=new Date().toISOString();badge();const o=document.getElementById('nl');if(o)o.remove();if(typeof toast==='function')toast(lg()==='ur'?'نوٹیفکیشن صاف ہو گئے':'Notifications cleared')}
window.Notify={open,load,clear};
const iv=setInterval(()=>{if(!ready())return;clearInterval(iv);load();
 try{sb.channel('notif'+Date.now()).on('postgres_changes',{event:'INSERT',schema:'public',table:'notifications'},p=>{load();const[a]=fmt(p.new);if(typeof toast==='function')toast(a)}).subscribe()}catch(e){}},500);
setInterval(()=>{if(ready()&&!document.hidden)load()},30000);
if(window.MutationObserver)new MutationObserver(()=>{if(raf)return;raf=1;requestAnimationFrame(()=>{raf=0;ensure()})}).observe(document.body,{childList:true,subtree:true});
})();

/* ===== alerts ===== */
/* CrownEarn phone alerts (they also arrive when the app is closed) */
(()=>{
const lg=()=>{try{return localStorage.getItem('lang')==='ur'?'ur':'en'}catch(e){return'en'}};
const S={en:{on:'Turn on phone alerts',off:'Turn off',is:'✅ Phone alerts are on',no:'Alerts are blocked. Allow notifications for this app in your phone settings.',na:'Phone alerts are not supported here. On iPhone, install the app to the Home Screen first.',hint:'Get alerts for payments, approvals and announcements even when the app is closed.',err:'Could not turn on alerts. Try again.'},
ur:{on:'فون پر الرٹ آن کریں',off:'بند کریں',is:'✅ فون الرٹ آن ہیں',no:'الرٹ بلاک ہیں۔ اپنے فون کی سیٹنگز میں اس ایپ کے نوٹیفکیشن کی اجازت دیں۔',na:'یہاں فون الرٹ ممکن نہیں۔ آئی فون پر پہلے ایپ کو ہوم اسکرین پر لگائیں۔',hint:'ادائیگی، منظوری اور اعلان کے الرٹ ایپ بند ہونے پر بھی ملیں۔',err:'الرٹ آن نہیں ہو سکے۔ دوبارہ کوشش کریں۔'}};
const ok=()=>'serviceWorker' in navigator&&'PushManager' in window&&'Notification' in window;
const ready=()=>typeof P!=='undefined'&&P&&typeof sb!=='undefined';
const key=s=>{const b=atob((s+'='.repeat((4-s.length%4)%4)).replace(/-/g,'+').replace(/_/g,'/'));return Uint8Array.from([...b].map(c=>c.charCodeAt(0)))};
const cur=async()=>(await navigator.serviceWorker.ready).pushManager.getSubscription();
async function save(s){const j=s.toJSON();await sb.rpc('save_push_sub',{p_endpoint:j.endpoint,p_p256dh:j.keys.p256dh,p_auth:j.keys.auth,p_lang:lg()})}
async function on(){const t=S[lg()];try{if(await Notification.requestPermission()!=='granted'){render();return}
 let k=(typeof D!=='undefined'&&D.cfg&&D.cfg.vapid_public)||'';
 if(!k){const{data}=await sb.from('settings').select('text_value').eq('key','vapid_public').single();k=data&&data.text_value}
 if(!k){toast(t.err);return}
 const r=await navigator.serviceWorker.ready;let s=await r.pushManager.getSubscription();
 if(!s)s=await r.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:key(k)});
 await save(s);render()}catch(e){toast(t.err)}}
async function off(){try{const s=await cur();if(s){const ep=s.endpoint;await s.unsubscribe();await sb.rpc('drop_push_sub',{p_endpoint:ep})}}catch(e){}render()}
async function render(){const box=document.getElementById('pa');if(!box)return;const t=S[lg()];let h;
 if(!ok())h=`<div class="mute">${t.na}</div>`;
 else if(Notification.permission==='denied')h=`<div class="mute">${t.no}</div>`;
 else{const s=await cur().catch(()=>null);h=s&&Notification.permission==='granted'?`<div class="row"><b>${t.is}</b><button class="o" style="padding:4px 12px" onclick="Alerts.off()">${t.off}</button></div>`:`<div class="mute" style="margin-bottom:8px">${t.hint}</div><button class="g w" onclick="Alerts.on()">🔔 ${t.on}</button>`}
 box.innerHTML=h}
window.Alerts={on,off};
let raf=0;new MutationObserver(()=>{if(raf)return;raf=1;requestAnimationFrame(()=>{raf=0;const sh=document.querySelector('#nl .sh');if(sh&&!document.getElementById('pa')){sh.firstElementChild.insertAdjacentHTML('afterend','<div class="card" id="pa" style="margin-top:10px"></div>');render()}})}).observe(document.body,{childList:true,subtree:true});
const iv=setInterval(async()=>{if(!ready())return;clearInterval(iv);if(ok()&&Notification.permission==='granted'){const s=await cur().catch(()=>null);if(s)save(s)}},1500);
})();

/* ===== names ===== */
/* CrownEarn: account name for deposits and withdrawals */
const acctMem=()=>{try{return JSON.parse(localStorage.getItem('acct')||'{}')}catch(e){return{}}};
const acctSave=o=>{try{localStorage.setItem('acct',JSON.stringify({...acctMem(),...o}))}catch(e){}};
let ACC={};
function showAcct(){const k=M==='Easypaisa'?'easy':'jazz',num=ACC['pay_'+k+'_number'],nm=ACC['pay_'+k+'_name'],e=$('acct');if(e)e.innerHTML=num?`Send money to this account:<br>Number: <b dir="ltr">${esc(num)}</b><br>Account name: <b>${esc(nm||'-')}</b>`:'Not set yet. Please contact Customer Service.'}
async function openD2(){M='JazzCash';ACC={};try{const{data}=await sb.from('settings').select('key,text_value').in('key',['pay_jazz_number','pay_jazz_name','pay_easy_number','pay_easy_name']);(data||[]).forEach(r=>{ACC[r.key]=r.text_value||''})}catch(e){}
 sheet('Make a deposit','Send the money, enter the transaction ID, and your credit is added after review.',MSF('showAcct()')+`<div class="sum" id="acct"></div><label>Amount (PKR)</label><input id="da" inputmode="numeric" placeholder="500"><label>Transaction ID</label><input id="dt" placeholder="1234567890">`,'Send request','reqD()');showAcct()}
const openW2=()=>{M='JazzCash';const L=acctMem();sheet('Withdraw',`You will receive: <b>PKR ${rs(P.points)}</b>`,MS+`<label>Account name (the name on your account)</label><input id="wn" maxlength="60" placeholder="Name" value="${esc(L.name||'')}"><label>Account number</label><input id="ph" inputmode="numeric" maxlength="11" placeholder="03XXXXXXXXX" value="${esc(L.num||'')}"><div class="mute" style="margin-top:6px">Double-check your name and number before sending.</div>`,'Send request','confirmW()')};
async function confirmW(){const n=$('ph').value.trim(),nm=$('wn').value.trim();
 if(P.points<MINW()){toast('Minimum withdrawal is '+MINW()+' points');return}
 if(nm.length<3){toast('Enter your account name');return}if(!/^03\d{9}$/.test(n)){toast('Enter a valid number, like 03001234567');return}
 const v=P.points;if(await rpc('request_withdraw',{p_method:M,p_account:n,p_points:v,p_name:nm})){acctSave({name:nm,num:n});closeW();win('Request sent ✅','After review, PKR '+rs(v)+' will reach your '+M)}}
new MutationObserver(()=>{document.querySelectorAll('[onclick="openW()"]').forEach(b=>b.setAttribute('onclick','openW2()'))}).observe(document.body,{childList:true,subtree:true});
(function w(){if(!window.LangAdd)return setTimeout(w,100);LangAdd({'Not set yet. Please contact Customer Service.':'ابھی مقرر نہیں۔ کسٹمر سروس سے رابطہ کریں۔','Send money to this account:':'اس اکاؤنٹ پر رقم بھیجیں:','Number:':'نمبر:','Account name:':'اکاؤنٹ کا نام:','Account name (the name on your account)':'اکاؤنٹ کا نام (آپ کے اکاؤنٹ پر لکھا نام)','Double-check your name and number before sending.':'بھیجنے سے پہلے اپنا نام اور نمبر دوبارہ دیکھ لیں۔','Enter your account name':'اپنے اکاؤنٹ کا نام لکھیں'})})();

/* ===== tidy ===== */
/* CrownEarn tidy-up: Profile tabs (Withdrawals, Deposits, Receipts, History) with Show more, Tasks Show more, hide announcement. Loaded by notify.js */
(function(){
if(window.Tidy)return;
const FIRST=5,STEP=10,TASKS=8;
const css=`.tdh{display:none}.tdm{margin:10px 0}.tp button i{font-style:normal;opacity:.8;margin-inline-start:4px;font-size:12px}.tdx{position:absolute;top:2px;right:4px;background:none;border:0;box-shadow:none;color:var(--mute);padding:2px 10px;font-size:18px}`;
document.head.insertAdjacentHTML('beforeend','<style id="tdcss">'+css+'</style>');
(function w(){if(!window.LangAdd)return setTimeout(w,60);LangAdd({'My activity':'میری سرگرمی','Withdrawals':'ودڈرا','Deposits':'ڈپازٹ','Receipts':'رسیدیں','History':'ہسٹری',
'No withdrawals yet.':'ابھی کوئی ودڈرا نہیں۔','No deposits yet.':'ابھی کوئی ڈپازٹ نہیں۔','No receipts yet.':'ابھی کوئی رسید نہیں۔','No transactions yet.':'ابھی کوئی لین دین نہیں۔'},
[[/^Show more \((\d+)\)$/,n=>`مزید دکھائیں (${n})`]])})();
const dt=d=>new Date(d).toLocaleDateString([],{day:'numeric',month:'short'});
const row=(w,x)=>`<div class="card row tx ${w==='Withdraw'?'out':'in'}"><span>${w} <b>PKR ${x.amount_pkr}</b> <span class="mute">${esc(x.method)}</span><div class="mute" style="font-size:12px">${dt(x.created_at)}</div></span>${TAG[x.status]}</div>`;
const rcpt=w=>`<div class="card rcp"><b>✅ PKR ${w.amount_pkr} paid via ${esc(w.method)}</b><div class="mute">${w.note?'Transaction ID: '+esc(w.note):'Payment sent'} · ${new Date(w.created_at).toLocaleDateString()}</div></div>`;
const led=x=>`<div class="card row tx ${(x.points<0||x.pkr<0)?'out':'in'}"><span>${KIND[x.kind]||esc(x.kind)}<div class="mute">${esc(x.note||'')}</div></span><b style="color:${(x.points<0||x.pkr<0)?'#e0475b':'var(--mint)'}">${x.points?(x.points>0?'+':'')+x.points+' pts':(x.pkr>0?'+':'')+'PKR '+x.pkr}</b></div>`;
function panel(k,items,empty,on){
 return `<div id="tp_${k}" ${on?'':'hidden'}>${items.map((h,i)=>`<div class="${i>=FIRST?'tdh':''}">${h}</div>`).join('')||`<div class="card mute">${empty}</div>`}${items.length>FIRST?`<button class="o w tdm" onclick="Tidy.more('${k}',this)">Show more (${items.length-FIRST})</button>`:''}</div>`}
function wallet(){
 const can=P.points>=MINW(),pct=Math.min(100,P.points/MINW()*100),done=D.subs.filter(s=>s.user_id===U.id&&s.status==='approved').length,today=new Date().toISOString().slice(0,10),yest=new Date(Date.now()-864e5).toISOString().slice(0,10),alive=P.last_claim===today||P.last_claim===yest,st=alive?P.streak:0,lv=1+Math.floor((done*100+st*20)/200);
 const wd=D.wds.map(x=>row('Withdraw',x)),dp=D.deps.map(x=>row('Deposit',x)),rc=D.wds.filter(w=>w.status==='paid').map(rcpt),tx=D.led.map(led);
 const T=[['wd','📤','Withdrawals',wd,'No withdrawals yet.'],['dp','📥','Deposits',dp,'No deposits yet.'],['rc','✅','Receipts',rc,'No receipts yet.'],['tx','📒','History',tx,'No transactions yet.']];
 const cur=(window.__wt&&T.some(t=>t[0]===window.__wt))?window.__wt:(wd.length?'wd':rc.length?'rc':dp.length?'dp':'tx');
 return `<div class="card gr" style="margin-top:4px">${mascot(64)}<div style="flex:1"><div class="hd">${esc(P.name)} · Level ${lv}</div><div class="mute">${done} tasks done · ${D.wds.length} withdrawals</div></div></div>
<div class="wc" style="margin-top:14px"><small>My earnings (withdrawable)</small><div class="big"><span style="font-size:20px">PKR </span><span id="cnt">0</span></div><small>${P.points} pts · ${Math.round(1/rate())} pts = PKR 1</small><div class="pb"><i style="width:${pct}%"></i></div><button class="g w" style="margin-top:12px" ${can?'':'disabled'} onclick="openW()">Withdraw</button>${can?'':`<div style="font-size:13px;margin-top:6px;text-align:center">Earn ${MINW()-P.points} more points to withdraw</div>`}</div>
<div class="mc"><small>Task credit (deposit)</small><div class="big"><span style="font-size:20px">PKR </span>${P.credit_pkr}</div><small>Use it to give tasks to others</small><div class="two" style="margin-top:12px"><button class="g" onclick="openD()">Deposit</button><button class="o" onclick="go('create')">Add task</button></div></div>
<div class="sec">My activity</div>
<div class="tp" id="tdtabs">${T.map(t=>`<button class="${t[0]===cur?'on':''}" onclick="Tidy.show('${t[0]}')">${t[1]} ${t[2]}<i>${t[3].length}</i></button>`).join('')}</div>
${T.map(t=>panel(t[0],t[3],t[4],t[0]===cur)).join('')}
${inviteCard()}
${P.is_admin?'<a class="bt" style="display:block;text-align:center;margin-top:14px" href="admin.html">Open Admin Panel</a>':''}<button class="o w" style="margin-top:12px" onclick="logout()">Log out</button>`}
window.walletView=wallet;
function show(k){window.__wt=k;document.querySelectorAll('[id^="tp_"]').forEach(p=>{p.hidden=p.id!=='tp_'+k});
 const b=document.querySelectorAll('#tdtabs button'),ks=['wd','dp','rc','tx'];b.forEach((x,i)=>x.classList.toggle('on',ks[i]===k))}
function more(k,btn){const p=document.getElementById('tp_'+k);if(!p)return;const h=[...p.querySelectorAll(':scope>.tdh')];h.slice(0,STEP).forEach(e=>e.classList.remove('tdh'));
 const left=h.length-STEP;if(left>0)btn.textContent='Show more ('+left+')';else btn.remove()}
function moreTasks(){const app=document.getElementById('app'),h=[...app.querySelectorAll(':scope>.card.tdh')];h.slice(0,TASKS).forEach(e=>e.classList.remove('tdh'));
 const b=document.getElementById('tdt'),left=h.length-TASKS;if(!b)return;if(left>0)b.textContent='Show more ('+left+')';else b.remove()}
function tasksPager(app){const tp=app.querySelector('.tp');if(!tp||tp.dataset.tdp)return;tp.dataset.tdp='1';const cs=[];for(let e=tp.nextElementSibling;e;e=e.nextElementSibling)if(e.classList.contains('card'))cs.push(e);
 if(cs.length<=TASKS)return;cs.slice(TASKS).forEach(e=>e.classList.add('tdh'));cs[cs.length-1].insertAdjacentHTML('afterend',`<button id="tdt" class="o w tdm" onclick="Tidy.moreTasks()">Show more (${cs.length-TASKS})</button>`)}
const annTxt=c=>{const d=c.querySelector(':scope>div');return d?d.textContent.trim():''};
function annDismiss(app){const c=app.querySelector('#ann .card');if(!c||c.dataset.tdx)return;c.dataset.tdx='1';let d='';try{d=localStorage.getItem('annX')||''}catch(e){}
 if(d&&d===annTxt(c)){c.remove();return}c.style.position='relative';c.insertAdjacentHTML('afterbegin','<button class="tdx" aria-label="Hide" onclick="Tidy.hideAnn(this)">✕</button>')}
function hideAnn(b){const c=b.closest('.card');try{localStorage.setItem('annX',annTxt(c))}catch(e){}c.remove()}
/* Customer Service badge: count only NEW admin messages from the last 24 hours, and mark everything as read when the chat opens */
window.chkUnread=async function(){if(typeof U==='undefined'||!U)return;
 const{count}=await sb.from('messages').select('id',{count:'exact',head:true}).eq('user_id',U.id).eq('sender','admin').eq('seen',false).gt('created_at',new Date(Math.max(Date.now()-864e5,+new Date((()=>{try{return localStorage.getItem('chatSeenAt')}catch(e){return 0}})()||0))).toISOString());
 const n=count||0;if(n!==unread){unread=n;navDraw()}};
if(window.Chat&&!Chat.__tidy){const op=Chat.open;Chat.open=function(el,t,who,r){const x=op.apply(this,arguments);
 if(who==='user'){try{Promise.resolve(sb.rpc('mark_read',{p_user:t})).then(()=>{if(window.onChatSeen)onChatSeen()})}catch(e){}}return x};Chat.__tidy=1}
window.Tidy={show,more,moreTasks,hideAnn};
let q=0;const app=document.getElementById('app');
if(app&&window.MutationObserver)new MutationObserver(()=>{if(q)return;q=1;requestAnimationFrame(()=>{q=0;if(typeof tab==='undefined')return;if(tab==='tasks')tasksPager(app);if(tab==='home')annDismiss(app)})}).observe(app,{childList:true,subtree:true});
})();

/* ===== login page additions: Urdu ===== */
(function w(){if(!window.LangAdd)return setTimeout(w,60);LangAdd({
'Confirm email':'ای میل کی تصدیق','Confirm password':'پاس ورڈ کی تصدیق','Re-enter your email':'ای میل دوبارہ لکھیں','Re-enter your password':'پاس ورڈ دوبارہ لکھیں',
'Show password':'پاس ورڈ دکھائیں','Hide password':'پاس ورڈ چھپائیں','Emails do not match':'دونوں ای میل ایک جیسی نہیں ہیں','Passwords do not match':'دونوں پاس ورڈ ایک جیسے نہیں ہیں','Enter a valid email':'درست ای میل لکھیں',
'withdrawals paid':'ودڈرا ادا ہو چکے','sent to members':'ممبرز کو بھیجے گئے','Withdraw to':'یہاں نکلوائیں',
'How are withdrawals paid?':'ودڈرا کی ادائیگی کیسے ہوتی ہے؟','Withdrawals are reviewed and paid manually to your JazzCash or Easypaisa number during support hours.':'ودڈرا کی جانچ ہوتی ہے اور سپورٹ کے اوقات میں آپ کے جاز کیش یا ایزی پیسہ نمبر پر ہاتھ سے ادائیگی کی جاتی ہے۔',
'What is the minimum withdrawal?':'کم از کم ودڈرا کتنا ہے؟','It is shown inside the app on the Wallet screen and may change.':'یہ ایپ کے اندر والٹ والی سکرین پر لکھا ہوتا ہے اور بدل بھی سکتا ہے۔',
'Can I use one number for several accounts?':'کیا ایک نمبر کئی اکاؤنٹس کے لیے استعمال ہو سکتا ہے؟','No. One JazzCash or Easypaisa number can be paid to one account only.':'نہیں۔ ایک جاز کیش یا ایزی پیسہ نمبر پر صرف ایک اکاؤنٹ کو ادائیگی ہو سکتی ہے۔',
'How do I contact support?':'سپورٹ سے رابطہ کیسے کروں؟','After you log in, tap the Customer Service button to chat with us.':'لاگ اِن کے بعد کسٹمر سروس کا بٹن دبا کر ہم سے چیٹ کریں۔'})})();

/* ===== help guide: Customer Service button shows the guide first ===== */
const _openHelpChat=openHelp;
openHelp=function(){if(arguments.length||$('hp')||$('gdp'))return _openHelpChat.apply(this,arguments);openGuide()};
(function w(){if(!window.LangAdd)return setTimeout(w,60);LangAdd({'How to use CrownEarn':'کراؤن ارن کیسے استعمال کریں','Chat with Customer Service':'کسٹمر سروس سے چیٹ کریں'})})();
