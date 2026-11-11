/* CrownEarn chat: voice notes, edit, delete, ticks, live updates (shared by app and admin) */
window.Chat=(()=>{
const E=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const $c=id=>document.getElementById(id);
const ic=(p,s=22)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${p}"/></svg>`;
const MIC=ic('M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11h-2z'),SEND=ic('M2 21l21-9L2 3v7l15 2-15 2z'),TRASH=ic('M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z'),PLAY=ic('M8 5v14l11-7z',18),PAUSE=ic('M6 5h4v14H6zm8 0h4v14h-4z',18);
let me='user',tid=null,ref='',list=[],rec=null,chunks=[],t0=0,tm=null,ch=null,busy=false,ED=null,stream=null,AU=null;const cache={};
const st=document.createElement('style');st.textContent=`.chw{border:1px solid var(--line);border-radius:16px;overflow:hidden;background:var(--card)}#chl{height:46vh;overflow:auto;padding:8px 10px;background:var(--soft,var(--bg))}.chb{max-width:82%;margin:3px 0;padding:6px 10px 4px;border-radius:14px;font-size:15px;line-height:1.4;word-break:break-word;width:fit-content}.chb.me{margin-left:auto;background:var(--pri);color:#fff;border-bottom-right-radius:4px}.chb.th{margin-right:auto;background:var(--card);color:var(--ink);border:1px solid var(--line);border-bottom-left-radius:4px}.chm{font-size:11px;opacity:.75;text-align:right;margin-top:2px}.chd{text-align:center;margin:10px 0 4px}.chd span{font-size:12px;background:var(--card);color:var(--mute);padding:2px 10px;border-radius:99px}.chbar{display:flex;gap:8px;align-items:center;padding:8px;border-top:1px solid var(--line)}.chbar input{flex:1;border-radius:99px!important;margin:0!important}.chbar button{width:44px;height:44px;padding:0;border-radius:50%;border:0;display:grid;place-items:center;flex:none;background:var(--pri);color:#fff}.chbar button.gh{background:var(--line);color:var(--mute)}.chrec{flex:1;display:flex;align-items:center;gap:8px;font-weight:700}.chdot{width:10px;height:10px;border-radius:50%;background:#e0475b;animation:chp 1s infinite}@keyframes chp{50%{opacity:.25}}@media(prefers-reduced-motion:reduce){.chdot{animation:none}}.chhint{font-weight:400;font-size:13px;color:var(--mute)}.chv{display:flex;align-items:center;gap:8px;min-width:200px}.chv button{width:38px;height:38px;border-radius:50%;padding:0;border:0;display:grid;place-items:center;flex:none}.chb.me .chv button{background:#fff;color:var(--pri)}.chb.th .chv button{background:var(--pri);color:#fff}.chbars{display:flex;align-items:center;gap:2px;height:28px;flex:1}.chbars i{width:3px;border-radius:2px;background:currentColor;opacity:.35}.chbars i.on{opacity:1}.chbar button:focus-visible,.chv button:focus-visible{outline:3px solid var(--gold,#ffc83d);outline-offset:2px}.bdg{background:#25d366;color:#fff;border-radius:99px;font-size:11px;font-style:normal;padding:0 6px;margin-left:3px;font-weight:700}`;document.head.appendChild(st);
const fmt=s=>Math.floor(s/60)+':'+String(s%60).padStart(2,'0');
const clock=d=>new Date(d).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
const day=d=>{const a=new Date(d).toDateString();return a===new Date().toDateString()?'Today':a===new Date(Date.now()-864e5).toDateString()?'Yesterday':new Date(d).toLocaleDateString([],{day:'numeric',month:'short'})};
const wave=id=>Array.from({length:30},(_,i)=>`<i style="height:${5+((id*37+i*53)%19)}px"></i>`).join('');
function bubble(m){const mine=m.sender===me;
 const body=m.deleted?'<i style="opacity:.7">🚫 This message was deleted</i>':m.kind==='voice'?`<div class="chv" data-vid="${m.id}"><button aria-label="Play voice message" onclick="event.stopPropagation();Chat.play(${m.id},this)">${PLAY}</button><div class="chbars">${wave(m.id)}</div><span class="chvd" style="font-size:12px;min-width:30px">${fmt(m.dur||0)}</span></div>`:E(m.body);
 const tick=mine&&!m.deleted?(m.seen?' <span style="color:#7ee6ff">✓✓</span>':' ✓'):'';
 return `<div class="chb ${mine?'me':'th'}" ${mine&&!m.deleted?`onclick="Chat.menu(${m.id})"`:''}>${m.ref?`<div style="font-size:11px;opacity:.75">${E(m.ref)}</div>`:''}${body}<div class="chm">${m.edited&&!m.deleted?'edited · ':''}${clock(m.created_at)}${tick}</div></div>`}
function draw(stick){const l=$c('chl');if(!l)return;const near=stick||l.scrollHeight-l.scrollTop-l.clientHeight<80;let h='',d='';list.forEach(m=>{const k=day(m.created_at);if(k!==d){d=k;h+=`<div class="chd"><span>${k}</span></div>`}h+=bubble(m)});l.innerHTML=h||'<div class="chd"><span>No messages yet. Say hello 👋</span></div>';if(near)l.scrollTop=l.scrollHeight;
 if(AU){const b=document.querySelector('[data-vid="'+AU.id+'"] button');if(b){AU.btn=b;b.innerHTML=AU.a.paused?PLAY:PAUSE}}}
async function load(stick){if(!tid)return;const{data}=await sb.from('messages').select('*').eq('user_id',tid).order('id');list=data||[];draw(stick);
 if(list.some(m=>m.sender!==me&&!m.seen)&&!document.hidden){await sb.rpc('mark_read',{p_user:tid});if(window.onChatSeen)onChatSeen()}}
function bar(){const b=$c('chb');if(!b)return;b.innerHTML=`<input id="chi" maxlength="500" placeholder="Message" oninput="Chat.typing()" onkeydown="if(event.key==='Enter')Chat.send()"><button id="cha" aria-label="Record voice message" onclick="Chat.act()">${MIC}</button>`}
function typing(){const i=$c('chi'),a=$c('cha');if(i&&a&&!rec){const t=!!i.value.trim();a.innerHTML=t?SEND:MIC;a.setAttribute('aria-label',t?'Send message':'Record voice message')}}
function stopAudio(){if(AU){AU.a.pause();const b=AU.btn;if(b)b.innerHTML=PLAY;mark(0);AU=null}}
function mark(p){if(!AU)return;const v=AU.btn&&AU.btn.closest('.chv');if(!v)return;const bs=v.querySelectorAll('.chbars i'),n=Math.round(p*bs.length);bs.forEach((x,i)=>x.classList.toggle('on',i<n))}
function close(){if(ch){sb.removeChannel(ch);ch=null}if(rec)stop(false);stopAudio();tid=null}
function open(el,t,who,r){close();me=who;tid=t;ref=r||'';ED=null;
 el.innerHTML='<div class="chw"><div id="chl"></div><div class="chbar" id="chb"></div></div>';bar();load(true);
 ch=sb.channel('chat'+t+Date.now()).on('postgres_changes',{event:'*',schema:'public',table:'messages',filter:'user_id=eq.'+t},()=>load()).subscribe()}
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
function menu(id){const m=list.find(x=>x.id===id);if(!m)return;const o=document.createElement('div');o.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:60;display:flex;align-items:flex-end;justify-content:center';o.onclick=e=>{if(e.target===o)o.remove()};
 const can=m.kind==='text'&&Date.now()-new Date(m.created_at)<9e5;
 o.innerHTML=`<div style="background:var(--card);color:var(--ink);width:100%;max-width:520px;border-radius:22px 22px 0 0;padding:16px;display:grid;gap:8px">${can?'<button class="o" id="mE">✏️ Edit (within 15 minutes)</button>':''}<button class="o" id="mD" style="color:#e0475b">🗑 Delete</button><button class="o" id="mC">Cancel</button></div>`;document.body.appendChild(o);
 const e2=$c('mE');if(e2)e2.onclick=()=>{ED=id;o.remove();const i=$c('chi');i.value=m.body;i.placeholder='Editing message…';i.focus();typing()};
 $c('mD').onclick=async()=>{o.remove();const r=await sb.rpc('delete_message',{p_id:id});if(r.error)toast(r.error.message);else load()};
 $c('mC').onclick=()=>o.remove()}
return{open,close,typing,act,send,stop,menu,play,ref:v=>{ref=v}}})();
