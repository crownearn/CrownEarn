/* ===== admin ===== */
const SB_URL='https://moumogjmoawzxgdpilyl.supabase.co',SB_KEY='sb_publishable_qkWWMMgwtQV9SqvY3FcBKw_MsaNjdTt';
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function toast(m){const d=document.createElement('div');d.className='toast';d.textContent=m;document.body.appendChild(d);setTimeout(()=>d.remove(),3000)}
let sb,tab='inbox',D={dep:[],wd:[],tasks:[],subs:[],users:[],st:[],name:{},task:{}};
const NUM={pkr_per_point:'PKR per point (0.01 means PKR 10 per 1000 pts)',fee_percent:'Platform fee % on user tasks',min_withdraw_points:'Minimum withdrawal (points)',min_deposit:'Minimum deposit (PKR)',daily_bonus:'Daily bonus (points)',referral_percent:'Referral commission %',referral_first_bonus:'Referral bonus (points)',referral_min_tasks:'Tasks a friend must finish before the bonus'};
const nm=id=>esc(D.name[id]||'User');
const B=(c,t,fn)=>`<button class="${c}" onclick="${fn}">${t}</button>`;
const empty='<div class="mute">Nothing pending</div>';
async function rpc(n,a,msg){const{error}=await sb.rpc(n,a);if(error){toast(error.message);return}toast(msg||'Done');await load()}
async function load(){
 const[pr,dp,wd,tk,sm,st]=await Promise.all([
  sb.from('profiles').select('id,name,points,credit_pkr,is_admin,created_at,flag').order('created_at',{ascending:false}).limit(300),
  sb.from('deposits').select('*').eq('status','pending').order('id'),
  sb.from('withdrawals').select('*').eq('status','pending').order('id'),
  sb.from('tasks').select('*').order('id',{ascending:false}).limit(200),
  sb.from('submissions').select('*').eq('status','pending').order('id').limit(200),
  sb.from('settings').select('*')]);
 if(pr.error)pr.data=(await sb.from('profiles').select('id,name,points,credit_pkr,is_admin,created_at').order('created_at',{ascending:false}).limit(300)).data;
 D={users:pr.data||[],dep:dp.data||[],wd:wd.data||[],tasks:tk.data||[],subs:sm.data||[],st:st.data||[]};
 D.name=Object.fromEntries(D.users.map(u=>[u.id,u.name]));D.flagged=Object.fromEntries(D.users.filter(u=>u.flag).map(u=>[u.id,1]));D.task=Object.fromEntries(D.tasks.map(t=>[t.id,t]));if(window.loadX)await loadX();draw()}
function inbox(){
 const rev=D.tasks.filter(t=>t.status==='review'),ps=D.subs.filter(s=>(D.task[s.task_id]||{}).owner===null);
 return `<div class="row"><h1>Inbox</h1>${B('o','Refresh','load()')}</div>
<h2>Deposits (${D.dep.length})</h2>${D.dep.map(d=>`<div class="card"><div class="row"><b>PKR ${d.amount_pkr}</b><span class="tag">${esc(d.method)}</span></div><div class="mute">${nm(d.user_id)} ${B('o','Message',`openT('${d.user_id}','Deposit PKR ${d.amount_pkr}')`)} · Txn ID: <b>${esc(d.txn_id)}</b></div><div class="row" style="margin-top:8px">${B('ok','Approve',`rpc('review_deposit',{p_id:${d.id},p_ok:true},'Credit added')`)}${B('no','Reject',`rpc('review_deposit',{p_id:${d.id},p_ok:false},'Rejected')`)}</div></div>`).join('')||empty}
<h2>Withdrawals (${D.wd.length})</h2>${D.wd.map(w=>`<div class="card"><div class="row"><b>PKR ${w.amount_pkr}</b><span class="tag">${esc(w.method)}</span></div><div class="mute">${nm(w.user_id)} ${D.flagged&&D.flagged[w.user_id]?'<span class="tag" style="background:#ffe0e6;color:#8a1f2b">⚠ shared device</span>':''} ${B('o','Message',`openT('${w.user_id}','Withdrawal PKR ${w.amount_pkr}')`)} · Send to: <b>${esc(w.account_no)}</b> · Name: <b>${esc(w.account_name||'-')}</b></div><div class="mute">Send the money first, then press Mark paid.</div><div class="row" style="margin-top:8px">${B('ok','Mark paid',`rpc('review_withdraw',{p_id:${w.id},p_ok:true},'Marked paid')`)}${B('no','Reject and refund',`rpc('review_withdraw',{p_id:${w.id},p_ok:false},'Refunded to user')`)}</div></div>`).join('')||empty}
<h2>Tasks to review (${rev.length})</h2>${rev.map(t=>`<div class="card"><b>${esc(t.title)}</b><div class="mute">${nm(t.owner)} ${B('o','Message',`openT('${t.owner}','Task: ${esc(t.title).slice(0,25)}')`)} · ${esc(t.kind)} · PKR ${t.price_pkr} x ${t.slots} = PKR ${t.price_pkr*t.slots}</div><div class="mute"><a href="${esc(t.link)}" target="_blank" rel="noopener noreferrer" style="color:var(--pri)">${esc(t.link)}</a></div><div class="row" style="margin-top:8px">${B('ok','Approve',`rpc('review_task',{p_id:${t.id},p_ok:true},'Task is live')`)}${B('no','Reject',`rpc('review_task',{p_id:${t.id},p_ok:false},'Rejected and credit refunded')`)}</div></div>`).join('')||empty}
<h2>Proofs for your tasks (${ps.length})</h2>${ps.map(s=>`<div class="card"><b>${esc((D.task[s.task_id]||{}).title)}</b><div class="mute">${nm(s.user_id)} ${B('o','Message',`openT('${s.user_id}','Proof review')`)} · Proof: ${proofHtml(s.proof)}</div><div class="row" style="margin-top:8px">${B('ok','Approve',`rpc('review_submission',{p_id:${s.id},p_ok:true},'Points sent')`)}${B('no','Reject',`rpc('review_submission',{p_id:${s.id},p_ok:false},'Rejected')`)}</div></div>`).join('')||empty}`}
async function pub(){const t=$('tt').value.trim(),l=$('lk').value.trim(),p=+$('rp').value,n=+$('sl').value;
 if(t.length<5){toast('Enter a title');return}if(!/^https?:\/\/.{4,}/.test(l)){toast('Enter a link starting with https://');return}
 if(!(p>0)||!(n>0)){toast('Enter reward points and number of people');return}
 await rpc('admin_add_task',{p_title:t,p_kind:$('kd').value,p_link:l,p_points:p,p_slots:n},'Task published')}
function tasksV(){return `<h1>Add a task</h1><div class="card"><label>Type</label><select id="kd"><option>App install</option><option>Sign up</option><option>Survey</option><option>Other</option></select><label>Title</label><input id="tt" maxlength="80" placeholder="e.g. Install the app and open it"><label>Link</label><input id="lk" placeholder="https://"><label>Reward for the worker (points)</label><input id="rp" inputmode="numeric" value="500"><label>How many people can do it</label><input id="sl" inputmode="numeric" value="1000"><div style="margin-top:12px">${B('ok','Publish task','pub()')}</div></div>
<h2>All tasks</h2>${D.tasks.map(t=>`<div class="card"><div class="row"><b>${esc(t.title)}</b><span class="tag">${esc(t.status)}</span></div><div class="mute">${t.owner?nm(t.owner):'Platform'} · ${t.reward_points} pts · ${t.done_count} / ${t.slots} done</div>${!t.owner&&t.status==='live'?`<div style="margin-top:8px">${B('o','Close task',`rpc('admin_close_task',{p_id:${t.id}},'Closed')`)}</div>`:''}</div>`).join('')}`}
function usersV(){return `<h1>Users (${D.users.length})</h1>${D.users.map(u=>`<div class="card row"><div><b>${esc(u.name)}</b> ${u.is_admin?'<span class="tag">admin</span>':''} ${u.flag?'<span class="tag" style="background:#ffe0e6;color:#8a1f2b">⚠ shared device</span>':''}<div class="mute">Joined ${new Date(u.created_at).toLocaleDateString()}</div></div><div class="mute" style="text-align:right">${u.points} pts<br>Credit PKR ${u.credit_pkr}</div></div>`).join('')}`}
const sv=k=>D.st.find(x=>x.key===k)||{};
async function saveS(k){await rpc('set_setting',{p_key:k,p_value:+$('s_'+k).value},'Saved')}
async function saveGuide(l){await rpc('set_help_guide',{p_lang:l,p_text:$('g_'+l).value},'Saved')}
async function savePay(){await rpc('set_text_setting',{p_key:'pay_number',p_text:$('s_pay').value.trim()},'Saved')}
function settingsV(){return `<h1>Settings</h1><div class="card"><label style="margin-top:0">Deposit number shown to users</label><input id="s_pay" value="${esc(sv('pay_number').text_value||'')}" placeholder="03001234567 (Account name)"><div style="margin-top:8px">${B('ok','Save','savePay()')}</div></div><div class="card"><label style="margin-top:0">Support hours shown to users</label><input id="s_sh" value="${esc(sv('support_hours').text_value||'')}" placeholder="Daily 6 PM to 10 PM"><div style="margin-top:8px">${B('ok','Save','saveSH()')}</div></div>`+`<div class="card"><label style="margin-top:0">How-to guide shown to users (English)</label><textarea id="g_en" rows="14" style="width:100%;min-height:260px">${esc(sv('help_guide').text_value||'')}</textarea><div class="mute" style="margin:6px 0">Start a line with # for a heading, with - for a bullet. Leave a blank line between paragraphs.</div><div>${B('ok','Save',"saveGuide('en')")}</div></div><div class="card"><label style="margin-top:0">How-to guide shown to users (Urdu)</label><textarea id="g_ur" rows="14" dir="rtl" style="width:100%;text-align:right;min-height:260px">${esc(sv('help_guide_ur').text_value||'')}</textarea><div class="mute" style="margin:6px 0">Start a line with # for a heading, with - for a bullet. Leave a blank line between paragraphs.</div><div>${B('ok','Save',"saveGuide('ur')")}</div></div>`+Object.keys(NUM).map(k=>`<div class="card"><label style="margin-top:0">${NUM[k]}</label><div class="row" style="flex-wrap:nowrap"><input id="s_${k}" inputmode="decimal" value="${esc(sv(k).value)}">${B('ok','Save',`saveS('${k}')`)}</div></div>`).join('')+`
<div class="card"><button class="o" onclick="sb.auth.signOut().then(()=>location.href='index.html')">Log out</button> <a class="b o" href="index.html" style="background:var(--line);color:var(--ink)">Back to app</a></div>`}
function draw(){$('app').innerHTML={inbox,tasks:tasksV,users:usersV,msgs:msgsV,settings:settingsV}[tab]();
 const n=D.dep.length+D.wd.length+D.tasks.filter(t=>t.status==='review').length+D.subs.filter(s=>(D.task[s.task_id]||{}).owner===null).length;
 $('nav').innerHTML=[['inbox','Inbox'+(n?' ('+n+')':'')],['tasks','Tasks'],['users','Users'],['msgs','Messages'+(window.unreadA&&unreadA()?' ('+unreadA()+')':'')],['settings','Settings']].map(t=>`<button class="${tab===t[0]?'on':''}" onclick="tab='${t[0]}';draw();scrollTo(0,0)">${t[1]}</button>`).join('')}
(async()=>{try{
 if(typeof supabase==='undefined'){$('app').innerHTML='<div class="card"><b>Could not load the library.</b><div class="mute">Try Wi-Fi or mobile data, then refresh.</div></div>';return}
 sb=supabase.createClient(SB_URL,SB_KEY);
 const{data:{session}}=await sb.auth.getSession();
 if(!session){$('app').innerHTML='<div class="card"><b>Please log in first.</b><p class="mute">Open the main app, log in with your admin account, then come back here.</p><a class="b" href="index.html">Open the app</a></div>';return}
 const{data:me}=await sb.from('profiles').select('is_admin').eq('id',session.user.id).single();
 if(!me||!me.is_admin){$('app').innerHTML='<div class="card"><b>Admins only.</b><p class="mute">This account is not an admin yet.</p></div>';return}
 await load()}catch(e){$('app').innerHTML=`<div class="card">${esc(e.message)}</div>`}})();

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
async function load(stick){if(!tid)return;let q=sb.from('messages').select('*').eq('user_id',tid);if(me==='user')q=q.gte('created_at',new Date(Date.now()-864e5).toISOString());const{data}=await q.order('id');list=data||[];draw(stick);
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

/* ===== admin2 ===== */
/* Admin extras: messages (chat), screenshot viewing, users with email, task pictures */
let TH=null,TR='',MG=[],EM={},ST={},BL={};

function unreadA(){return MG.filter(m=>m.sender==='user'&&!m.seen).length}
const unreadOf=id=>MG.filter(m=>m.user_id===id&&m.sender==='user'&&!m.seen).length;
async function loadX(){const[m,e]=await Promise.all([sb.from('messages').select('*').order('id').limit(1500),sb.from('profiles').select('id,email,is_blocked')]);MG=m.data||[];EM=Object.fromEntries((e.data||[]).map(x=>[x.id,x.email||'']));BL=Object.fromEntries((e.data||[]).map(x=>[x.id,!!x.is_blocked]));try{ST=(await sb.rpc('admin_stats')).data||{}}catch(x){}}
const shrink=async(f,mx=320,q=.8)=>{const b=await createImageBitmap(f),s=Math.min(1,mx/Math.max(b.width,b.height)),c=document.createElement('canvas');c.width=Math.round(b.width*s);c.height=Math.round(b.height*s);c.getContext('2d').drawImage(b,0,0,c.width,c.height);return new Promise(r=>c.toBlob(r,'image/jpeg',q))};
function proofHtml(p){p=String(p||'');if(!p.startsWith('file:'))return esc(p);const[f,...n]=p.slice(5).split('|');return `<button class="o" style="padding:4px 12px" onclick="viewP('${esc(f)}')">View screenshot</button> ${esc(n.join(' '))}`}
async function viewP(f){const{data,error}=await sb.storage.from('proofs').createSignedUrl(f,300);if(error){toast(error.message);return}const d=document.createElement('div');d.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:20;display:flex;align-items:center;justify-content:center;padding:10px';d.onclick=()=>d.remove();d.innerHTML=`<img src="${data.signedUrl}" alt="Proof screenshot" style="max-width:100%;max-height:100%;border-radius:10px">`;document.body.appendChild(d)}
async function openT(u,r){TH=u;TR=r||'';tab='msgs';draw();scrollTo(0,0)}
const prev=m=>m.deleted?'Message deleted':m.kind==='voice'?'🎤 Voice message':esc(m.body.slice(0,60));
function msgsV(){
 if(TH){const u=D.users.find(x=>x.id===TH)||{};return `<div class="row"><h1>${esc(u.name||'User')}</h1><span>${B('no','Clear chat',`clearChat('${TH}')`)} ${B('o','Back','TH=null;draw()')}</span></div><div class="mute">${esc(EM[TH]||'')} · ${u.points||0} pts · Credit PKR ${u.credit_pkr||0}</div>${TR?`<div class="mute">About: <b>${esc(TR)}</b></div>`:''}<div id="chat" style="margin-top:10px"></div>`}
 const by={};MG.forEach(m=>{(by[m.user_id]=by[m.user_id]||[]).push(m)});
 const ids=Object.keys(by).sort((a,b)=>by[b][by[b].length-1].id-by[a][by[a].length-1].id);
 return `<div class="row"><h1>Messages</h1>${ids.length?B('no','Clear all chats','clearChat()'):''}</div>`+(ids.map(id=>{const l=by[id],last=l[l.length-1],un=unreadOf(id);return `<div class="card row" onclick="openT('${id}')" style="cursor:pointer"><div><b>${esc(D.name[id]||'User')}</b><div class="mute" style="${un?'font-weight:700;color:var(--ink)':''}">${last.sender==='admin'?'✓ ':''}${prev(last)}</div></div><div style="text-align:right"><div class="mute">${new Date(last.created_at).toLocaleDateString()}</div>${un?`<i class="bdg"></i>`:''}</div></div>`}).join('')||'<div class="mute">No messages yet</div>')}
function usersV(){return `<h1>Users (${D.users.length})</h1>`+D.users.map(u=>`<div class="card"><div class="row"><div><b>${esc(u.name)}</b> ${u.is_admin?'<span class="tag">admin</span>':''}${BL[u.id]?'<span class="tag" style="background:var(--bad);color:#fff">blocked</span>':''}<div class="mute">${esc(EM[u.id]||'')} · Joined ${new Date(u.created_at).toLocaleDateString()}</div></div><div class="mute" style="text-align:right">${u.points} pts<br>Credit PKR ${u.credit_pkr}</div></div><div style="margin-top:8px">${B('o','Message',`openT('${u.id}')`)} ${u.is_admin?'':BL[u.id]?B('ok','Unblock',`blk('${u.id}',false)`):B('no','Block',`blk('${u.id}',true)`)}</div></div>`).join('')}
async function saveSH(){await rpc('set_text_setting',{p_key:'support_hours',p_text:$('s_sh').value.trim()},'Saved')}
async function pub(){const t=$('tt').value.trim(),l=$('lk').value.trim(),p=+$('rp').value,n=+$('sl').value,f=$('lg')&&$('lg').files[0];
 if(t.length<5){toast('Enter a title');return}if(!/^https?:\/\/.{4,}/.test(l)){toast('Enter a link starting with https://');return}
 if(!(p>0)||!(n>0)){toast('Enter reward points and number of people');return}
 let logo=null;if(f){const{data:{session}}=await sb.auth.getSession(),path=session.user.id+'/'+Date.now()+'.jpg',up=await sb.storage.from('logos').upload(path,await shrink(f),{contentType:'image/jpeg'});if(up.error){toast(up.error.message);return}logo=path}
 await rpc('admin_add_task',{p_title:t,p_kind:$('kd').value,p_link:l,p_points:p,p_slots:n,p_logo:logo},'Task published')}
async function payW(id){const n=prompt('Enter the transaction ID of the payment you sent (the user will see it as a receipt):');if(n===null)return;if(n.trim().length<4){toast('Please enter a valid transaction ID');return}await rpc('review_withdraw',{p_id:id,p_ok:true,p_note:n.trim()},'Marked paid')}
async function blk(u,b){if(!confirm(b?'Block this user? They will not be able to submit tasks, deposit or withdraw.':'Unblock this user?'))return;await rpc('admin_block',{p_user:u,p_block:b},b?'User blocked':'User unblocked')}
async function rejW(id){const r=prompt('Reason for rejecting this proof (the user will see it):');if(r===null)return;await rpc('review_submission',{p_id:id,p_ok:false,p_reason:r.trim()||null},'Rejected')}
function statsHtml(){const r=+((D.st.find(x=>x.key==='pkr_per_point')||{}).value||0.01),s=ST||{},owed=Math.round((s.points||0)*r),sur=Math.round((s.dep_total||0)-(s.paid_total||0)-(s.credit||0)-owed);
 return `<div class="card"><b>Dashboard</b><div class="mute">Users: <b>${s.users||0}</b> (blocked ${s.blocked||0}) · Approved tasks (24h): <b>${s.done_today||0}</b></div><div class="mute">Deposited: <b>PKR ${s.dep_total||0}</b> · Paid out: <b>PKR ${s.paid_total||0}</b></div><div class="mute">Owed to users: points <b>PKR ${owed}</b> + task credit <b>PKR ${Math.round(s.credit||0)}</b></div><div class="mute">Waiting: deposits PKR ${s.pend_dep||0} · withdrawals PKR ${s.pend_wd||0}</div><div style="margin-top:6px;font-weight:700;color:${sur<0?'var(--bad)':'var(--ok)'}">Balance after paying everyone: PKR ${sur}${sur<0?' (more is owed than deposited)':''}</div></div>`}
const _inbox=inbox;inbox=function(){return statsHtml()+_inbox()};
function payCards(){return [['jazz','JazzCash'],['easy','Easypaisa']].map(([k,t])=>`<div class="card"><b>${t} account (shown to users when they deposit)</b><label>Number</label><input id="s_${k}n" inputmode="numeric" maxlength="11" value="${esc(sv('pay_'+k+'_number').text_value||'')}" placeholder="03XXXXXXXXX"><label>Account name</label><input id="s_${k}m" maxlength="60" value="${esc(sv('pay_'+k+'_name').text_value||'')}" placeholder="Name on your ${t} account"><div style="margin-top:8px">${B('ok','Save',`savePay2('${k}')`)}</div></div>`).join('')}
async function savePay2(k){const n=$('s_'+k+'n').value.trim(),m=$('s_'+k+'m').value.trim();for(const[key,val]of[['pay_'+k+'_number',n],['pay_'+k+'_name',m]]){const{error}=await sb.rpc('set_text_setting',{p_key:key,p_text:val});if(error){toast(error.message);return}}toast('Saved');await load()}
function announceCard(){return `<div class="card"><label style="margin-top:0">Announcement shown on every user's Home (leave empty to hide)</label><input id="s_an" maxlength="200" value="${esc(sv('announcement').text_value||'')}" placeholder="e.g. New tasks added today!"><div style="margin-top:8px">${B('ok','Save','saveAnn()')}</div></div>`}
async function saveAnn(){await rpc('set_text_setting',{p_key:'announcement',p_text:$('s_an').value.trim()},'Announcement saved')}
const _sv=settingsV;settingsV=function(){return _sv().replace(/<div class="card"><label style="margin-top:0">Deposit number shown to users<\/label>.*?<\/div><\/div>/,'').replace('<h1>Settings</h1>','<h1>Settings</h1>'+payCards()+announceCard())};
const _draw=draw;
draw=function(){_draw();document.querySelectorAll('button[onclick*="review_submission"][onclick*="p_ok:false"]').forEach(b=>{const m=/p_id:(\d+)/.exec(b.getAttribute('onclick'));if(m)b.setAttribute('onclick','rejW('+m[1]+')')});document.querySelectorAll('button[onclick*="review_withdraw"][onclick*="p_ok:true"]').forEach(b=>{const m=/p_id:(\d+)/.exec(b.getAttribute('onclick'));if(m)b.setAttribute('onclick','payW('+m[1]+')')});if(window.Chat){if(tab==='msgs'&&TH)Chat.open($('chat'),TH,'admin',TR);else Chat.close()}
 const tt=$('tt');if(tab==='tasks'&&tt&&!$('lg')){const lb=tt.previousElementSibling;if(lb)lb.insertAdjacentHTML('beforebegin','<label>Task picture (app icon, game logo or video thumbnail)</label><input id="lg" type="file" accept="image/*">')}};
window.onChatSeen=async()=>{await loadX();const nb=document.querySelectorAll('#nav button')[3];if(nb)nb.textContent='Messages'+(unreadA()?' ('+unreadA()+')':'')};
setInterval(async()=>{if(!sb||document.hidden||!D.users.length)return;await loadX();const nb=document.querySelectorAll('#nav button')[3];if(nb)nb.textContent='Messages'+(unreadA()?' ('+unreadA()+')':'');if(tab==='msgs'&&!TH)draw()},15000);
async function clearChat(u){if(!confirm(u?'Delete this whole chat? This cannot be undone.':'Delete ALL chats? This cannot be undone.'))return;
 const{error}=await sb.rpc('admin_clear_chat',{p_user:u||null});if(error){toast(error.message);return}
 try{const b=sb.storage.from('voice'),fl=u?[u]:((await b.list('',{limit:500})).data||[]).filter(f=>!f.id).map(f=>f.name);for(const f of fl){const{data:fs}=await b.list(f,{limit:500});if(fs&&fs.length)await b.remove(fs.map(x=>f+'/'+x.name))}}catch(e){}
 toast('Chat cleared');TH=null;await loadX();draw()}

/* ===== admin3 ===== */
/* Admin v3: Lucky Draw tab, user search + add/remove points, safer data loading. Load after admin2.js in admin.html */
let DR=[],DC={},EN={},OPEN=null,UR=[],UQ='',UO=null,UD={},NM={};
const UCOLS='id,name,email,points,credit_pkr,is_admin,is_blocked,created_at,streak';
async function fetchUsers(){const s=UQ.replace(/[^\p{L}\p{N}@.\-_ ]/gu,'').trim();
 let r=sb.from('profiles').select(UCOLS).order('created_at',{ascending:false}).limit(s.length>=2?30:20);
 if(s.length>=2)r=r.or('name.ilike.%'+s+'%,email.ilike.%'+s+'%');
 const{data,error}=await r;if(error){toast(error.message);return}
 UR=data||[];UR.forEach(u=>{EM[u.id]=u.email||'';NM[u.id]=u.name})}
async function fetchDetail(id){try{
 const[l,d,w,r]=await Promise.all([sb.from('ledger').select('*').eq('user_id',id).order('id',{ascending:false}).limit(8),
  sb.from('deposits').select('amount_pkr,status').eq('user_id',id).limit(500),
  sb.from('withdrawals').select('amount_pkr,status').eq('user_id',id).limit(500),
  sb.from('profiles').select('id',{count:'exact',head:true}).eq('referred_by',id)]);
 const sum=(a,st)=>(a.data||[]).filter(x=>x.status===st).reduce((t,x)=>t+Number(x.amount_pkr),0);
 UD[id]={led:l.data||[],dep:sum(d,'approved'),wd:sum(w,'paid'),wdp:sum(w,'pending'),refs:r.count||0}}catch(e){}}
loadX=async function(){try{
 const[m,sr,bl,dw]=await Promise.all([sb.from('messages').select('*').order('id',{ascending:false}).limit(1500),sb.rpc('admin_stats'),
  sb.from('profiles').select('id').eq('is_blocked',true).limit(1000),sb.from('draws').select('*').order('id',{ascending:false}).limit(50)]);
 MG=(m.data||[]).reverse();ST=sr.data||{};BL=Object.fromEntries((bl.data||[]).map(x=>[x.id,true]));DR=dw.data||[];
 try{const c=await sb.from('draw_entries').select('draw_id').limit(5000);DC={};(c.data||[]).forEach(x=>DC[x.draw_id]=(DC[x.draw_id]||0)+1)}catch(e){}
 await fetchUsers();
 D.users.forEach(u=>{NM[u.id]=u.name});
 const need=new Set();[...D.users,...UR].forEach(u=>need.add(u.id));MG.forEach(x=>need.add(x.user_id));
 [...D.dep,...D.wd,...D.subs].forEach(x=>need.add(x.user_id));D.tasks.forEach(x=>x.owner&&need.add(x.owner));DR.forEach(d=>d.winner_id&&need.add(d.winner_id));
 const miss=[...need].filter(id=>!(id in NM)||!(id in EM));
 for(let i=0;i<miss.length;i+=100){const r=await sb.from('profiles').select('id,name,email').in('id',miss.slice(i,i+100));(r.data||[]).forEach(p=>{NM[p.id]=p.name;EM[p.id]=p.email||''})}
 need.forEach(id=>{if(!(id in D.name)&&(id in NM))D.name[id]=NM[id]});
 if(UO)await fetchDetail(UO)}catch(e){console.error(e)}};
async function userSearch(q){UQ=q===undefined?$('uq').value.trim():q;UO=null;await fetchUsers();draw()}
async function openU(id){if(UO===id){UO=null;draw();return}UO=id;await fetchDetail(id);draw()}
const pr=()=>+(sv('pkr_per_point').value)||0.01;
function pv(){const v=+($('ap').value||0),e=$('apv');if(e)e.textContent=v?'= PKR '+(v*pr()).toFixed(2)+' (withdrawable)':''}
async function applyAdj(id){const p=Math.trunc(+($('ap').value||0)),c=+($('ac').value||0),n=$('an').value.trim(),u=UR.find(x=>x.id===id);
 if(!isFinite(p)||!isFinite(c)||(p===0&&c===0)){toast('Enter points or credit');return}if(n.length<3){toast('Enter a reason');return}
 if(!confirm('Change '+(u?u.name:'this user')+'?\n💰 Withdrawable points: '+p+(p?' (about PKR '+(p*pr()).toFixed(2)+')':'')+'\n🧾 Task credit: PKR '+c+'\nReason: '+n))return;
 await rpc('admin_adjust',{p_user:id,p_points:p,p_pkr:c,p_note:n},'Done')}
function detailV(u,d){return `<div style="margin-top:10px"><div class="mute">Deposited PKR ${d.dep} · Paid out PKR ${d.wd} · Pending PKR ${d.wdp} · Friends invited ${d.refs} · Streak ${u.streak||0}</div>
<div class="card" style="margin-top:8px"><b>Give or take away</b><div class="mute">Use a minus sign (-) to take away.</div><label>💰 Withdrawable points (the user CAN withdraw these)</label><input id="ap" inputmode="numeric" placeholder="e.g. 10000 or -500" oninput="pv()"><div class="mute" id="apv" style="margin-top:4px"></div><div class="mute">1 PKR = ${Math.round(1/pr())} points</div><label>🧾 Task credit in PKR (only for adding tasks, CANNOT be withdrawn)</label><input id="ac" inputmode="decimal" placeholder="e.g. 100 or -100"><label>Reason (the user will see it)</label><input id="an" maxlength="100" placeholder="e.g. Contest prize"><div style="margin-top:8px">${B('ok','Apply',`applyAdj('${u.id}')`)}</div></div>
<div class="mute" style="margin:8px 0 4px">Recent activity</div>${d.led.map(l=>`<div class="row mute"><span>${esc(l.kind)}${l.note?' · '+esc(l.note):''}</span><span>${l.points?(l.points>0?'+':'')+l.points+' pts':''} ${Number(l.pkr)?'PKR '+l.pkr:''}</span></div>`).join('')||'<div class="mute">No activity</div>'}</div>`}
function userCard(u){const d=UD[u.id],open=UO===u.id;
 return `<div class="card"><div class="row"><div><b>${esc(u.name)}</b> ${u.is_admin?'<span class="tag">admin</span>':''}${u.is_blocked?'<span class="tag" style="background:var(--bad);color:#fff">blocked</span>':''}<div class="mute">${esc(u.email||'')} · Joined ${new Date(u.created_at).toLocaleDateString()}</div></div><div class="mute" style="text-align:right">${u.points} pts<br>Credit PKR ${u.credit_pkr}</div></div>
<div style="margin-top:8px">${B('o',open?'Hide':'Details',`openU('${u.id}')`)} ${B('o','Message',`openT('${u.id}')`)} ${u.is_admin?'':u.is_blocked?B('ok','Unblock',`blk('${u.id}',false)`):B('no','Block',`blk('${u.id}',true)`)}</div>${open&&d?detailV(u,d):''}</div>`}
usersV=function(){return `<h1>Users${ST.users?' ('+ST.users+')':''}</h1><div class="card"><input id="uq" value="${esc(UQ)}" placeholder="Search by name or email" onkeydown="if(event.key==='Enter')userSearch()"><div style="margin-top:8px">${B('ok','Search','userSearch()')} ${UQ?B('o','Clear',"userSearch('')"):''}</div></div><div class="mute" style="margin:6px 0">${UQ?'Results':'Newest users'}</div>`+(UR.map(userCard).join('')||'<div class="mute">No users found</div>')};
function entriesV(d){const l=EN[d.id]||[],done=d.status==='drawn';
 return `<div style="margin-top:8px">${l.map(e=>`<div class="card row"><div><b>${esc(e.uname)}</b><div class="mute">${esc(e.uemail||'')}</div></div>${!done?B('ok','Winner',`pickW(${d.id},'${e.uid}')`):d.winner_id===e.uid?'<span class="tag">🏆 Winner</span>':''}</div>`).join('')||'<div class="mute">No entries yet</div>'}</div>`}
function drawsV(){
 return `<h1>Lucky Draw</h1><div class="card"><label style="margin-top:0">Title</label><input id="dt" placeholder="Weekend lucky draw"><label>Prize (points)</label><input id="dp" inputmode="numeric" placeholder="5000"><label>Entry cost (points, 0 = free)</label><input id="dc" inputmode="numeric" value="0"><label>Entries close at (optional)</label><input id="de" type="datetime-local"><div style="margin-top:10px">${B('ok','Create draw','createDraw()')}</div></div>`
 +(DR.map(d=>{const st=d.status==='drawn'?'Winner: '+nm(d.winner_id):d.status==='closed'?'Entries closed':'Open';
  return `<div class="card"><div class="row"><b>${esc(d.title)}</b><span class="tag">${st}</span></div><div class="mute">Prize ${d.prize_points} pts · Entry ${d.entry_cost} pts · ${DC[d.id]||0} joined${d.ends_at?' · closes '+new Date(d.ends_at).toLocaleString():''}</div><div class="row" style="margin-top:8px">${B('o',OPEN===d.id?'Hide entries':'Entries','showEntries('+d.id+')')}${d.status==='open'?B('o','Close entries','closeDraw('+d.id+')'):''}${d.status!=='drawn'?B('no','Cancel','cancelDraw('+d.id+')'):''}</div>${OPEN===d.id?entriesV(d):''}</div>`}).join('')||'<div class="mute" style="margin-top:10px">No draws yet</div>')}
async function createDraw(){const t=$('dt').value.trim(),p=+$('dp').value,c=+($('dc').value||0),e=$('de').value;
 if(t.length<3){toast('Enter a title');return}if(!(p>0)){toast('Enter the prize points');return}
 await rpc('admin_create_draw',{p_title:t,p_prize:p,p_cost:c,p_ends:e?new Date(e).toISOString():null},'Draw created')}
async function showEntries(id){if(OPEN===id){OPEN=null;draw();return}
 const{data,error}=await sb.rpc('admin_draw_entries',{p_draw:id});if(error){toast(error.message);return}EN[id]=data||[];OPEN=id;draw()}
async function closeDraw(id){await rpc('admin_close_draw',{p_id:id},'Entries closed')}
async function cancelDraw(id){if(!confirm('Cancel this draw? Entry points will be refunded to everyone.'))return;await rpc('admin_cancel_draw',{p_id:id},'Draw cancelled')}
async function pickW(id,uid){const d=DR.find(x=>x.id===id),e=(EN[id]||[]).find(x=>x.uid===uid);if(!d)return;
 if(!confirm('Give '+d.prize_points+' points to '+(e?e.uname:'this user')+'?'))return;
 await rpc('admin_pick_winner',{p_draw:id,p_user:uid},'Winner selected, points sent')}

/* ---- VIP dashboard tiles + settings grouped like the app (Wallet, Tasks, Referral...) ---- */
statsHtml=function(){const r=+((D.st.find(x=>x.key==='pkr_per_point')||{}).value||0.01),s=ST||{},owed=Math.round((s.points||0)*r),sur=Math.round((s.dep_total||0)-(s.paid_total||0)-(s.credit||0)-owed);
 const t=(i,v,l)=>`<div class="stl"><span>${i} ${l}</span><b>${v}</b></div>`;
 return `<div class="hd" style="margin-top:8px">Dashboard</div><div class="sg">${t('👥',s.users||0,'Users')}${t('✅',s.done_today||0,'Approved today')}${t('📥','PKR '+(s.dep_total||0),'Deposited')}${t('📤','PKR '+(s.paid_total||0),'Paid out')}${t('🪙','PKR '+owed,'Owed (points)')}${t('🧾','PKR '+Math.round(s.credit||0),'Owed (task credit)')}${t('⏳','PKR '+(s.pend_dep||0),'Deposits waiting')}${t('💸','PKR '+(s.pend_wd||0),'Withdrawals waiting')}<div class="stl w2 ${sur<0?'bad':'good'}"><span>${sur<0?'⚠️ More is owed than deposited':'🏦 Balance after paying everyone'}</span><b>PKR ${sur}</b></div></div>${s.blocked?`<div class="mute" style="margin-top:6px">Blocked users: ${s.blocked}</div>`:''}`};
let SO={};
function grp(k,ic,cl,title,sub,body){const o=SO[k]===undefined?k==='wallet':SO[k];
 return `<details class="grp" ${o?'open':''} ontoggle="SO['${k}']=this.open"><summary><span class="ic ${cl}">${ic}</span><div><div class="sec">${title}</div><div class="mute">${sub}</div></div></summary><div class="gb">${body}</div></details>`}
const numC=k=>`<div class="card"><label style="margin-top:0">${NUM[k]}</label><div class="row" style="flex-wrap:nowrap"><input id="s_${k}" inputmode="decimal" value="${esc(sv(k).value)}">${B('ok','Save',`saveS('${k}')`)}</div></div>`;
settingsV=function(){return `<h1>Settings</h1>`
 +grp('wallet','👛','c0','Wallet &amp; withdrawals','Point value, minimum withdrawal, minimum deposit',['pkr_per_point','min_withdraw_points','min_deposit'].map(numC).join(''))
 +grp('tasks','📋','c1','Tasks','Fee taken from tasks that users create',numC('fee_percent'))
 +grp('referral','🤝','c2','Referral','Commission and first-task bonus for inviting friends',['referral_percent','referral_first_bonus'].map(numC).join(''))
 +grp('bonus','🎁','c3','Daily bonus','Points users get for the daily claim',numC('daily_bonus'))
 +grp('pay','💳','c0','Payment accounts','Numbers shown to users when they deposit',payCards())
 +grp('news','📢','c1','Announcement &amp; support','Home announcement and support hours',announceCard()+`<div class="card"><label style="margin-top:0">Support hours shown to users</label><input id="s_sh" value="${esc(sv('support_hours').text_value||'')}" placeholder="Daily 6 PM to 10 PM"><div style="margin-top:8px">${B('ok','Save','saveSH()')}</div></div>`)
 +`<div class="card"><button class="o" onclick="sb.auth.signOut().then(()=>location.href='index.html')">Log out</button> <a class="b o" href="index.html">Back to app</a></div>`};
const _d3=draw;
draw=function(){const mine=tab==='draws';if(mine)tab='inbox';_d3();if(mine){tab='draws';$('app').innerHTML=drawsV()}
 const n=$('nav');if(n){if(mine)n.querySelectorAll('button.on').forEach(b=>b.classList.remove('on'));n.insertAdjacentHTML('beforeend',`<button class="${mine?'on':''}" onclick="tab='draws';draw();scrollTo(0,0)">Draw</button>`)}};

/* ===== admin4 ===== */
/* Admin: Auto cleanup settings (how many days to keep notifications and chat) + Clean now. Load after admin3.js in admin.html */
Object.assign(NUM,{notif_keep_days:'Delete notifications older than (days)',chat_keep_days:'Delete chat messages older than (days)'});
const _sv4=settingsV;
settingsV=function(){
 const g=grp('clean','🧹','c2','Auto cleanup','Keeps the app tidy: old notifications and chat messages are removed',numC('notif_keep_days')+numC('chat_keep_days')+`<div class="card"><div class="mute">Cleanup runs by itself. You can also run it now.</div><div style="margin-top:8px">${B('o','Clean now','cleanNow()')}</div></div>`);
 const m='<div class="card"><button class="o" onclick="sb.auth.signOut()',h=_sv4();return h.includes(m)?h.replace(m,g+m):h+g};
async function cleanNow(){const{data,error}=await sb.rpc('cleanup_old',{p_force:true});if(error){toast(error.message);return}toast('Cleaned: '+(data||0)+' old items removed')}
setTimeout(()=>{try{sb.rpc('cleanup_old')}catch(e){}},5000);
/* New-activity badges: red number on each tab, count in the browser tab title, and a toast when something new arrives */
(function(){
 const st=document.createElement('style');
 st.textContent='nav button{position:relative}.nbg{position:absolute;top:0;right:calc(50% - 24px);min-width:18px;height:18px;padding:0 5px;border-radius:9px;background:#e0475b;color:#fff;font:700 11px/18px sans-serif;font-style:normal;text-align:center;box-shadow:0 0 0 2px var(--card)}';
 document.head.appendChild(st);
 let prev=-1;const _d4=draw;
 draw=function(){_d4();const nav=document.getElementById('nav');if(!nav)return;let total=0;
  nav.querySelectorAll('button').forEach(b=>{const m=b.textContent.match(/\((\d+)\)/);
   if(m){total+=+m[1];b.innerHTML=b.innerHTML.replace(/\s*\(\d+\)/,'');b.insertAdjacentHTML('beforeend','<i class="nbg">'+m[1]+'</i>')}});
  document.title=(total?'('+total+') ':'')+'CrownEarn Admin';
  if(prev>=0&&total>prev&&typeof toast==='function')toast('🔔 New activity: '+(total-prev)+' new');
  prev=total};
})();
