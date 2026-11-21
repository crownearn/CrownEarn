/* CrownEarn Lucky Draw: floating button + draw page. Load after chat.js in index.html */
(function(){
if(window.LuckyDraw)return;
const L=(e,u)=>{try{return localStorage.getItem('lang')==='ur'?u:e}catch(x){return e}};
try{Object.assign(KIND,{draw_entry:'Lucky draw entry',draw_win:'Lucky draw prize',draw_refund:'Lucky draw refund'})}catch(e){}
(function w(){if(!window.LangAdd)return setTimeout(w,60);LangAdd({
'Lucky Draw':'لکی ڈرا','Lucky':'لکی','Draw':'ڈرا','Open draws':'کھلے ڈرا','Past winners':'پچھلے فاتح','Your points:':'آپ کے پوائنٹس:',
'Join':'شامل ہوں','Joined ✔':'شامل ✔','Entries closed':'انٹریاں بند','Winner coming soon':'فاتح کا اعلان جلد ہوگا','Free entry':'مفت انٹری',
'No draws right now. Check back soon!':'ابھی کوئی ڈرا نہیں۔ جلد دوبارہ دیکھیں!','No winners yet.':'ابھی کوئی فاتح نہیں۔',
'🎉 Congratulations! You won a lucky draw.':'🎉 مبارک ہو! آپ لکی ڈرا جیت گئے۔','How it works':'یہ کیسے کام کرتا ہے',
'Tap Join. When entries close, the winner is chosen and the prize points are added to their account.':'شامل ہوں دبائیں۔ انٹریاں بند ہونے پر فاتح چنا جاتا ہے اور انعام کے پوائنٹس اس کے اکاؤنٹ میں شامل ہو جاتے ہیں۔',
'Lucky draw entry':'لکی ڈرا انٹری','Lucky draw prize':'لکی ڈرا انعام','Lucky draw refund':'لکی ڈرا کی واپسی'},
[[/^🏆 (\d+) pts · PKR ([\d.]+)$/,(a,b)=>`🏆 ${a} پوائنٹس · ${b} روپے`],[/^Entry: (\d+) pts$/,n=>`انٹری: ${n} پوائنٹس`],[/^(\d+) joined$/,n=>`${n} شامل`],[/^Ends: (.+)$/,x=>`اختتام: ${x}`],[/^\+(\d+) pts$/,n=>`+${n} پوائنٹس`]])})();
let B=null;
const rsF=p=>{try{return rs(p)}catch(e){return Math.round(p*.01)}};
const when=t=>new Date(t).toLocaleString('en-GB',{day:'numeric',month:'short',hour:'numeric',minute:'2-digit'});
const ready=()=>typeof P!=='undefined'&&P&&typeof sb!=='undefined';
function card(d){
 const open=d.status==='open'&&!(d.ends_at&&new Date(d.ends_at)<Date.now());
 const act=d.joined?'<span class="tag">Joined ✔</span>':open?`<button onclick="LuckyDraw.join(${d.id})">Join</button>`:'<span class="tag">Entries closed</span>';
 return `<div class="card"><div class="gr"><span class="ic c1">🎁</span><div><b>${esc(d.title)}</b><div class="mute">${d.entry_cost>0?'Entry: '+d.entry_cost+' pts':'Free entry'}</div></div></div>
<div class="row" style="margin-top:10px"><span class="rw">🏆 ${d.prize_points} pts · PKR ${rsF(d.prize_points)}</span>${act}</div>
<div class="mute" style="margin-top:6px">${d.entries} joined</div>${d.ends_at?`<div class="mute">Ends: ${when(d.ends_at)}</div>`:''}${!open&&d.joined?'<div class="mute">Winner coming soon</div>':''}</div>`}
const wn=w=>`<div class="card row"><div><b>${esc(w.title)}</b><div class="mute">${esc(w.name)}${w.me?' (you)':''}</div></div><span class="rw">+${w.prize_points} pts</span></div>`;
function paint(){const e=document.getElementById('ldb');if(!e||!ready())return;const ds=(B&&B.draws)||[],ws=(B&&B.winners)||[];
 e.innerHTML=`<div class="row"><div class="hd gr" style="font-size:20px">🎰 Lucky Draw</div><button class="o" style="padding:4px 12px" onclick="LuckyDraw.close()" aria-label="Close">✕</button></div>
<div class="mute">Your points: <b>${P.points}</b></div>
${ws.some(w=>w.me)?'<div class="sum">🎉 Congratulations! You won a lucky draw.</div>':''}
<div class="sec">Open draws</div>${ds.map(card).join('')||'<div class="card mute">No draws right now. Check back soon!</div>'}
<div class="sec">Past winners</div>${ws.map(wn).join('')||'<div class="card mute">No winners yet.</div>'}
<div class="sum" style="margin-top:14px"><b>How it works</b><div class="mute">Tap Join. When entries close, the winner is chosen and the prize points are added to their account.</div></div>`}
function badge(){const b=document.getElementById('lbd');if(!b)return;const n=((B&&B.draws)||[]).filter(d=>d.status==='open'&&!d.joined).length;b.style.display=n?'inline-block':'none';b.textContent=n}
function mount(){if(document.getElementById('lfab'))return;
 document.body.insertAdjacentHTML('beforeend',`<button id="lfab" aria-label="Lucky Draw" onclick="LuckyDraw.open()" style="position:fixed;right:14px;bottom:calc(138px + env(safe-area-inset-bottom,0px));height:46px;border-radius:23px;border:2px solid var(--gold);background:#fff;color:#241b4b;box-shadow:0 6px 18px rgba(0,0,0,.25);z-index:25;display:flex;align-items:center;gap:6px;padding:0 12px 0 8px;font-weight:700;font-size:10px;line-height:1.1"><span style="font-size:24px">🎰</span><span style="text-align:left">Lucky<br>Draw</span><i id="lbd" style="display:none;position:absolute;top:-4px;right:-4px;min-width:18px;height:18px;border-radius:9px;background:#16b980;color:#fff;font:700 11px/18px sans-serif;text-align:center;font-style:normal;padding:0 4px"></i></button>`)}
async function loadB(silent){try{const{data,error}=await sb.rpc('draw_board');if(error)throw error;B=data||{draws:[],winners:[]};mount();badge();paint()}catch(e){if(!silent)toast(e.message||'Error')}}
function open(){if(document.getElementById('ld'))return;const d=document.createElement('div');d.id='ld';d.className='ov';d.style.zIndex=40;d.onclick=e=>{if(e.target===d)close()};d.innerHTML='<div class="sh" id="ldb" style="padding:14px"></div>';document.body.appendChild(d);paint();loadB()}
function close(){const d=document.getElementById('ld');if(d)d.remove()}
async function join(id){const d=((B&&B.draws)||[]).find(x=>x.id===id);if(!d)return;
 if(d.entry_cost>0&&!confirm(L(`Join this draw for ${d.entry_cost} points?`,`${d.entry_cost} پوائنٹس میں اس ڈرا میں شامل ہوں؟`)))return;
 const{error}=await sb.rpc('enter_draw',{p_draw:id});if(error){toast(error.message);return}
 toast(L('You joined the draw. Good luck! 🍀','آپ ڈرا میں شامل ہو گئے۔ نصیب اچھا ہو! 🍀'));
 try{if(typeof load==='function')await load()}catch(e){}await loadB()}
window.LuckyDraw={open,close,join};
(function init(){if(ready())loadB(true);else setTimeout(init,700)})();
setInterval(()=>{if(!document.hidden&&ready())loadB(true)},45000);
})();
