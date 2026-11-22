/* CrownEarn Lucky Draw v2: VIP card on the Home screen + draw page. Load after chat.js in index.html */
(function(){
if(window.LuckyDraw)return;
const L=(e,u)=>{try{return localStorage.getItem('lang')==='ur'?u:e}catch(x){return e}};
try{Object.assign(KIND,{draw_entry:'Lucky draw entry',draw_win:'Lucky draw prize',draw_refund:'Lucky draw refund'})}catch(e){}
(function w(){if(!window.LangAdd)return setTimeout(w,60);LangAdd({
'Lucky Draw':'لکی ڈرا','VIP':'وی آئی پی','Open draws':'کھلے ڈرا','Past winners':'پچھلے فاتح','Your points:':'آپ کے پوائنٹس:',
'Join':'شامل ہوں','Join now':'ابھی شامل ہوں','Joined ✔':'شامل ✔','Joined ✔ Good luck 🍀':'شامل ✔ نصیب اچھا ہو 🍀','View all draws':'سب ڈرا دیکھیں',
'Entries closed':'انٹریاں بند','Winner coming soon':'فاتح کا اعلان جلد ہوگا','Free entry':'مفت انٹری','Next draw coming soon ✨':'اگلا ڈرا جلد آ رہا ہے ✨',
'No draws right now. Check back soon!':'ابھی کوئی ڈرا نہیں۔ جلد دوبارہ دیکھیں!','No winners yet.':'ابھی کوئی فاتح نہیں۔',
'🎉 Congratulations! You won a lucky draw.':'🎉 مبارک ہو! آپ لکی ڈرا جیت گئے۔','How it works':'یہ کیسے کام کرتا ہے',
'Tap Join. When entries close, the winner is chosen and the prize points are added to their account.':'شامل ہوں دبائیں۔ انٹریاں بند ہونے پر فاتح چنا جاتا ہے اور انعام کے پوائنٹس اس کے اکاؤنٹ میں شامل ہو جاتے ہیں۔',
'Lucky draw entry':'لکی ڈرا انٹری','Lucky draw prize':'لکی ڈرا انعام','Lucky draw refund':'لکی ڈرا کی واپسی'},
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
<div class="lkt"><span class="lkv">👑 VIP</span><b>Lucky Draw</b></div><div class="lkreels">${reel(0,1.7)}${reel(2,2.2)}${reel(4,2.7)}</div>${body}
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
