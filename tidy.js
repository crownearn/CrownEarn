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
const row=(w,x)=>`<div class="card row"><span>${w} <b>PKR ${x.amount_pkr}</b> <span class="mute">${esc(x.method)}</span><div class="mute" style="font-size:12px">${dt(x.created_at)}</div></span>${TAG[x.status]}</div>`;
const rcpt=w=>`<div class="card"><b>✅ PKR ${w.amount_pkr} paid via ${esc(w.method)}</b><div class="mute">${w.note?'Transaction ID: '+esc(w.note):'Payment sent'} · ${new Date(w.created_at).toLocaleDateString()}</div></div>`;
const led=x=>`<div class="card row"><span>${KIND[x.kind]||esc(x.kind)}<div class="mute">${esc(x.note||'')}</div></span><b style="color:${(x.points<0||x.pkr<0)?'#e0475b':'var(--mint)'}">${x.points?(x.points>0?'+':'')+x.points+' pts':(x.pkr>0?'+':'')+'PKR '+x.pkr}</b></div>`;
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
window.Tidy={show,more,moreTasks,hideAnn};
let q=0;const app=document.getElementById('app');
if(app&&window.MutationObserver)new MutationObserver(()=>{if(q)return;q=1;requestAnimationFrame(()=>{q=0;if(typeof tab==='undefined')return;if(tab==='tasks')tasksPager(app);if(tab==='home')annDismiss(app)})}).observe(app,{childList:true,subtree:true});
})();
